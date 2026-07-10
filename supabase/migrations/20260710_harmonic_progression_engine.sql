-- Harmonic OS customizable progression, rewards, and community constitution engine

create table if not exists public.world_progression_settings (
  id uuid primary key default gen_random_uuid(),
  world_id text not null unique references public.worlds(id) on delete cascade,
  currency_name text not null default 'XP',
  currency_icon text not null default '⭐',
  level_names text[] not null default array['Level 1','Level 2','Level 3'],
  constitution_title text not null default 'Welcome',
  constitution_body text not null default '',
  constitution_required boolean not null default true,
  earning_enabled boolean not null default true,
  purchase_multiplier numeric(8,2) not null default 1.00 check (purchase_multiplier >= 0),
  watch_multiplier numeric(8,2) not null default 1.00 check (watch_multiplier >= 0),
  creator_id uuid references auth.users(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.world_progression_actions (
  id uuid primary key default gen_random_uuid(),
  world_id text not null references public.worlds(id) on delete cascade,
  action_key text not null,
  action_label text not null,
  points_amount integer not null default 0 check (points_amount >= 0),
  daily_limit integer,
  requires_verification boolean not null default false,
  active boolean not null default true,
  created_at timestamptz not null default now(),
  unique(world_id, action_key)
);

create table if not exists public.world_rewards (
  id uuid primary key default gen_random_uuid(),
  world_id text not null references public.worlds(id) on delete cascade,
  threshold integer not null check (threshold >= 0),
  title text not null,
  description text not null default '',
  reward_type text not null check (reward_type in ('badge','discount','access','merch','experience','custom')),
  discount_percent numeric(5,2) check (discount_percent between 0 and 100),
  inventory_limit integer,
  redemption_code text,
  active boolean not null default true,
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.user_world_progress (
  user_id uuid not null references auth.users(id) on delete cascade,
  world_id text not null references public.worlds(id) on delete cascade,
  points bigint not null default 0 check (points >= 0),
  lifetime_points bigint not null default 0 check (lifetime_points >= 0),
  current_level integer not null default 1 check (current_level >= 1),
  joined_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  primary key(user_id, world_id)
);

create table if not exists public.progression_ledger (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  world_id text not null references public.worlds(id) on delete cascade,
  action_key text not null,
  points_delta integer not null,
  source_type text not null default 'system',
  source_id text,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create table if not exists public.user_reward_unlocks (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  reward_id uuid not null references public.world_rewards(id) on delete cascade,
  unlocked_at timestamptz not null default now(),
  redeemed_at timestamptz,
  unique(user_id, reward_id)
);

create table if not exists public.world_memberships (
  user_id uuid not null references auth.users(id) on delete cascade,
  world_id text not null references public.worlds(id) on delete cascade,
  constitution_version integer not null default 1,
  accepted_at timestamptz not null default now(),
  primary key(user_id, world_id)
);

create index if not exists world_rewards_world_threshold_idx on public.world_rewards(world_id, threshold);
create index if not exists progression_ledger_user_world_idx on public.progression_ledger(user_id, world_id, created_at desc);
create index if not exists user_world_progress_points_idx on public.user_world_progress(world_id, points desc);

alter table public.world_progression_settings enable row level security;
alter table public.world_progression_actions enable row level security;
alter table public.world_rewards enable row level security;
alter table public.user_world_progress enable row level security;
alter table public.progression_ledger enable row level security;
alter table public.user_reward_unlocks enable row level security;
alter table public.world_memberships enable row level security;

create policy "progression_settings_public_read" on public.world_progression_settings for select using (true);
create policy "progression_actions_public_read" on public.world_progression_actions for select using (active = true or auth.role() = 'authenticated');
create policy "world_rewards_public_read" on public.world_rewards for select using (active = true or auth.role() = 'authenticated');
create policy "user_world_progress_read_own" on public.user_world_progress for select using (user_id = auth.uid());
create policy "progression_ledger_read_own" on public.progression_ledger for select using (user_id = auth.uid());
create policy "reward_unlocks_read_own" on public.user_reward_unlocks for select using (user_id = auth.uid());
create policy "memberships_read_own" on public.world_memberships for select using (user_id = auth.uid());
create policy "memberships_insert_own" on public.world_memberships for insert to authenticated with check (user_id = auth.uid());

create policy "creator_manage_progression_settings" on public.world_progression_settings for all to authenticated
using (exists (select 1 from public.profiles p where p.id = auth.uid() and p.role in ('creator','admin')))
with check (exists (select 1 from public.profiles p where p.id = auth.uid() and p.role in ('creator','admin')));

create policy "creator_manage_progression_actions" on public.world_progression_actions for all to authenticated
using (exists (select 1 from public.profiles p where p.id = auth.uid() and p.role in ('creator','admin')))
with check (exists (select 1 from public.profiles p where p.id = auth.uid() and p.role in ('creator','admin')));

create policy "creator_manage_world_rewards" on public.world_rewards for all to authenticated
using (exists (select 1 from public.profiles p where p.id = auth.uid() and p.role in ('creator','admin')))
with check (exists (select 1 from public.profiles p where p.id = auth.uid() and p.role in ('creator','admin')));

create or replace function public.award_world_progress(
  p_user_id uuid,
  p_world_id text,
  p_action_key text,
  p_points integer,
  p_source_type text default 'system',
  p_source_id text default null,
  p_metadata jsonb default '{}'::jsonb
)
returns public.user_world_progress
language plpgsql
security definer
set search_path = public
as $$
declare
  updated_progress public.user_world_progress;
begin
  if p_points = 0 then
    raise exception 'Points delta cannot be zero';
  end if;

  insert into public.progression_ledger(user_id, world_id, action_key, points_delta, source_type, source_id, metadata)
  values (p_user_id, p_world_id, p_action_key, p_points, p_source_type, p_source_id, p_metadata);

  insert into public.user_world_progress(user_id, world_id, points, lifetime_points, current_level)
  values (p_user_id, p_world_id, greatest(p_points, 0), greatest(p_points, 0), 1)
  on conflict (user_id, world_id) do update set
    points = greatest(0, public.user_world_progress.points + p_points),
    lifetime_points = public.user_world_progress.lifetime_points + greatest(p_points, 0),
    current_level = greatest(1, floor(sqrt(greatest(0, public.user_world_progress.lifetime_points + greatest(p_points, 0)) / 100.0))::integer + 1),
    updated_at = now()
  returning * into updated_progress;

  insert into public.user_reward_unlocks(user_id, reward_id)
  select p_user_id, r.id
  from public.world_rewards r
  where r.world_id = p_world_id and r.active = true and r.threshold <= updated_progress.lifetime_points
  on conflict (user_id, reward_id) do nothing;

  return updated_progress;
end;
$$;

grant execute on function public.award_world_progress(uuid, text, text, integer, text, text, jsonb) to authenticated;

drop trigger if exists world_progression_settings_updated_at on public.world_progression_settings;
create trigger world_progression_settings_updated_at before update on public.world_progression_settings for each row execute function public.set_updated_at();
drop trigger if exists world_rewards_updated_at on public.world_rewards;
create trigger world_rewards_updated_at before update on public.world_rewards for each row execute function public.set_updated_at();
drop trigger if exists user_world_progress_updated_at on public.user_world_progress;
create trigger user_world_progress_updated_at before update on public.user_world_progress for each row execute function public.set_updated_at();

do $$ begin alter publication supabase_realtime add table public.user_world_progress; exception when duplicate_object then null; end $$;
do $$ begin alter publication supabase_realtime add table public.user_reward_unlocks; exception when duplicate_object then null; end $$;
