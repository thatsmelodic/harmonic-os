-- Harmonic OS Phase 5: identity, community, fair quests, events, AI, and analytics
-- Creator marketplace/payout features are intentionally excluded until owner workflows are verified.

create extension if not exists pgcrypto;

-- 1) Harmonic identity with user-controlled public display
alter table public.profiles
  add column if not exists display_name text,
  add column if not exists bio text not null default '',
  add column if not exists avatar_url text,
  add column if not exists location_text text,
  add column if not exists social_links jsonb not null default '{}'::jsonb,
  add column if not exists favorite_worlds text[] not null default '{}',
  add column if not exists profile_modules jsonb not null default '{"bio":true,"favorite_worlds":true,"resonance":true,"activity":false,"location":false,"social_links":true,"saved_items":false,"achievements":true}'::jsonb,
  add column if not exists profile_is_public boolean not null default true;

create table if not exists public.user_follows (
  follower_id uuid not null references auth.users(id) on delete cascade,
  following_id uuid not null references auth.users(id) on delete cascade,
  created_at timestamptz not null default now(),
  primary key (follower_id, following_id),
  check (follower_id <> following_id)
);

create table if not exists public.user_saved_items (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  world_id text references public.worlds(id) on delete cascade,
  item_type text not null check (item_type in ('song','episode','restaurant','review','product','collection','event','post','custom')),
  item_id text not null,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  unique (user_id, item_type, item_id)
);

-- 3) World-based community
create table if not exists public.community_posts (
  id uuid primary key default gen_random_uuid(),
  author_id uuid not null references auth.users(id) on delete cascade,
  world_id text not null references public.worlds(id) on delete cascade,
  category text not null default 'general',
  title text,
  body text not null default '',
  media jsonb not null default '[]'::jsonb,
  status text not null default 'published' check (status in ('draft','published','hidden','removed')),
  is_pinned boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.community_comments (
  id uuid primary key default gen_random_uuid(),
  post_id uuid not null references public.community_posts(id) on delete cascade,
  author_id uuid not null references auth.users(id) on delete cascade,
  parent_comment_id uuid references public.community_comments(id) on delete cascade,
  body text not null,
  status text not null default 'published' check (status in ('published','hidden','removed')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.community_reactions (
  user_id uuid not null references auth.users(id) on delete cascade,
  target_type text not null check (target_type in ('post','comment')),
  target_id uuid not null,
  reaction text not null check (reaction in ('resonate','fire','love','insightful','funny')),
  created_at timestamptz not null default now(),
  primary key (user_id, target_type, target_id, reaction)
);

create table if not exists public.community_reports (
  id uuid primary key default gen_random_uuid(),
  reporter_id uuid not null references auth.users(id) on delete cascade,
  target_type text not null check (target_type in ('post','comment','profile')),
  target_id text not null,
  reason text not null,
  details text not null default '',
  status text not null default 'open' check (status in ('open','reviewing','resolved','dismissed')),
  created_at timestamptz not null default now()
);

-- 5) Fair Resonance and Harmonic Quests
create table if not exists public.user_resonance (
  user_id uuid primary key references auth.users(id) on delete cascade,
  creativity integer not null default 0 check (creativity >= 0),
  community integer not null default 0 check (community >= 0),
  loyalty integer not null default 0 check (loyalty >= 0),
  exploration integer not null default 0 check (exploration >= 0),
  archive integer not null default 0 check (archive >= 0),
  updated_at timestamptz not null default now()
);

create table if not exists public.resonance_ledger (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  category text not null check (category in ('creativity','community','loyalty','exploration','archive')),
  points integer not null check (points > 0),
  action_key text not null,
  source_type text not null default 'system',
  source_id text,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  check (action_key not in ('purchase','checkout','spend','subscription_payment'))
);

create table if not exists public.harmonic_quests (
  id uuid primary key default gen_random_uuid(),
  world_id text references public.worlds(id) on delete set null,
  title text not null,
  description text not null default '',
  quest_type text not null default 'individual' check (quest_type in ('individual','community')),
  starts_at timestamptz,
  ends_at timestamptz,
  active boolean not null default true,
  minimum_objectives integer not null default 1 check (minimum_objectives >= 1),
  badge_name text,
  badge_art_url text,
  created_by uuid references auth.users(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.harmonic_quest_objectives (
  id uuid primary key default gen_random_uuid(),
  quest_id uuid not null references public.harmonic_quests(id) on delete cascade,
  objective_key text not null,
  title text not null,
  description text not null default '',
  verification_type text not null default 'automatic' check (verification_type in ('automatic','self_attested','moderated')),
  target_count integer not null default 1 check (target_count >= 1),
  resonance_category text check (resonance_category in ('creativity','community','loyalty','exploration','archive')),
  resonance_points integer not null default 0 check (resonance_points >= 0),
  alternative_group text,
  sort_order integer not null default 0,
  unique (quest_id, objective_key),
  check (objective_key not in ('purchase','checkout','spend','buy_product','paid_membership'))
);

create table if not exists public.user_quest_progress (
  user_id uuid not null references auth.users(id) on delete cascade,
  quest_id uuid not null references public.harmonic_quests(id) on delete cascade,
  objective_id uuid not null references public.harmonic_quest_objectives(id) on delete cascade,
  progress integer not null default 0 check (progress >= 0),
  completed_at timestamptz,
  verification_status text not null default 'pending' check (verification_status in ('pending','verified','rejected')),
  evidence jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now(),
  primary key (user_id, objective_id)
);

create table if not exists public.user_quest_completions (
  user_id uuid not null references auth.users(id) on delete cascade,
  quest_id uuid not null references public.harmonic_quests(id) on delete cascade,
  completed_at timestamptz not null default now(),
  badge_visible boolean not null default true,
  primary key (user_id, quest_id)
);

-- 7) Events
create table if not exists public.harmonic_events (
  id uuid primary key default gen_random_uuid(),
  world_id text references public.worlds(id) on delete set null,
  host_id uuid not null references auth.users(id) on delete cascade,
  title text not null,
  description text not null default '',
  event_type text not null check (event_type in ('listening_party','basketball_run','food_meetup','popup','fashion_show','workshop','premiere','community','custom')),
  format text not null default 'in_person' check (format in ('in_person','online','hybrid')),
  starts_at timestamptz not null,
  ends_at timestamptz,
  timezone text not null default 'America/New_York',
  location_name text,
  location_address text,
  online_url text,
  capacity integer check (capacity is null or capacity > 0),
  cover_url text,
  status text not null default 'scheduled' check (status in ('draft','scheduled','live','completed','cancelled')),
  accessibility_notes text not null default '',
  alternative_participation text not null default '',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.event_rsvps (
  event_id uuid not null references public.harmonic_events(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  status text not null default 'going' check (status in ('going','interested','waitlisted','cancelled','attended','no_show')),
  guests integer not null default 0 check (guests between 0 and 10),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  primary key (event_id, user_id)
);

-- 8) Harmony AI foundation: permissioned requests and auditable outputs
create table if not exists public.harmony_ai_requests (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete set null,
  world_id text references public.worlds(id) on delete set null,
  task_type text not null check (task_type in ('tag_suggestion','description_draft','community_summary','related_content','post_draft','business_insight','custom')),
  input jsonb not null default '{}'::jsonb,
  allowed_context jsonb not null default '{}'::jsonb,
  status text not null default 'queued' check (status in ('queued','processing','completed','failed','cancelled')),
  model text,
  output jsonb,
  error_message text,
  created_at timestamptz not null default now(),
  completed_at timestamptz
);

create table if not exists public.user_ai_permissions (
  user_id uuid primary key references auth.users(id) on delete cascade,
  allow_saved_items boolean not null default false,
  allow_activity_history boolean not null default false,
  allow_profile_preferences boolean not null default true,
  allow_location boolean not null default false,
  updated_at timestamptz not null default now()
);

-- 9) First-party analytics foundation
create table if not exists public.analytics_events (
  id bigint generated always as identity primary key,
  user_id uuid references auth.users(id) on delete set null,
  anonymous_id text,
  session_id text,
  event_name text not null,
  world_id text references public.worlds(id) on delete set null,
  object_type text,
  object_id text,
  properties jsonb not null default '{}'::jsonb,
  occurred_at timestamptz not null default now(),
  check (user_id is not null or anonymous_id is not null)
);

create table if not exists public.analytics_daily_worlds (
  day date not null,
  world_id text not null references public.worlds(id) on delete cascade,
  views bigint not null default 0,
  unique_visitors bigint not null default 0,
  saves bigint not null default 0,
  comments bigint not null default 0,
  follows bigint not null default 0,
  rsvps bigint not null default 0,
  quest_completions bigint not null default 0,
  primary key (day, world_id)
);

create index if not exists community_posts_world_created_idx on public.community_posts(world_id, created_at desc);
create index if not exists community_comments_post_created_idx on public.community_comments(post_id, created_at);
create index if not exists resonance_ledger_user_created_idx on public.resonance_ledger(user_id, created_at desc);
create index if not exists quest_progress_user_idx on public.user_quest_progress(user_id, quest_id);
create index if not exists harmonic_events_start_idx on public.harmonic_events(starts_at, status);
create index if not exists analytics_events_world_time_idx on public.analytics_events(world_id, occurred_at desc);
create index if not exists analytics_events_name_time_idx on public.analytics_events(event_name, occurred_at desc);

-- RLS
alter table public.user_follows enable row level security;
alter table public.user_saved_items enable row level security;
alter table public.community_posts enable row level security;
alter table public.community_comments enable row level security;
alter table public.community_reactions enable row level security;
alter table public.community_reports enable row level security;
alter table public.user_resonance enable row level security;
alter table public.resonance_ledger enable row level security;
alter table public.harmonic_quests enable row level security;
alter table public.harmonic_quest_objectives enable row level security;
alter table public.user_quest_progress enable row level security;
alter table public.user_quest_completions enable row level security;
alter table public.harmonic_events enable row level security;
alter table public.event_rsvps enable row level security;
alter table public.harmony_ai_requests enable row level security;
alter table public.user_ai_permissions enable row level security;
alter table public.analytics_events enable row level security;
alter table public.analytics_daily_worlds enable row level security;

create policy "public_profiles_read_visible" on public.profiles for select using (profile_is_public = true or id = auth.uid());
create policy "profiles_update_own_phase5" on public.profiles for update to authenticated using (id = auth.uid()) with check (id = auth.uid());

create policy "follows_public_read" on public.user_follows for select using (true);
create policy "follows_manage_own" on public.user_follows for all to authenticated using (follower_id = auth.uid()) with check (follower_id = auth.uid());
create policy "saved_items_manage_own" on public.user_saved_items for all to authenticated using (user_id = auth.uid()) with check (user_id = auth.uid());

create policy "community_posts_public_read" on public.community_posts for select using (status = 'published' or author_id = auth.uid());
create policy "community_posts_insert_own" on public.community_posts for insert to authenticated with check (author_id = auth.uid());
create policy "community_posts_update_own" on public.community_posts for update to authenticated using (author_id = auth.uid()) with check (author_id = auth.uid());
create policy "community_posts_delete_own" on public.community_posts for delete to authenticated using (author_id = auth.uid());
create policy "community_comments_public_read" on public.community_comments for select using (status = 'published' or author_id = auth.uid());
create policy "community_comments_insert_own" on public.community_comments for insert to authenticated with check (author_id = auth.uid());
create policy "community_comments_update_own" on public.community_comments for update to authenticated using (author_id = auth.uid()) with check (author_id = auth.uid());
create policy "community_reactions_public_read" on public.community_reactions for select using (true);
create policy "community_reactions_manage_own" on public.community_reactions for all to authenticated using (user_id = auth.uid()) with check (user_id = auth.uid());
create policy "community_reports_insert_own" on public.community_reports for insert to authenticated with check (reporter_id = auth.uid());
create policy "community_reports_read_own" on public.community_reports for select to authenticated using (reporter_id = auth.uid());

create policy "resonance_public_read" on public.user_resonance for select using (true);
create policy "resonance_ledger_read_own" on public.resonance_ledger for select to authenticated using (user_id = auth.uid());
create policy "quests_public_read" on public.harmonic_quests for select using (active = true);
create policy "quest_objectives_public_read" on public.harmonic_quest_objectives for select using (true);
create policy "quest_progress_manage_own" on public.user_quest_progress for all to authenticated using (user_id = auth.uid()) with check (user_id = auth.uid());
create policy "quest_completions_public_read" on public.user_quest_completions for select using (badge_visible = true or user_id = auth.uid());

create policy "events_public_read" on public.harmonic_events for select using (status in ('scheduled','live','completed') or host_id = auth.uid());
create policy "events_owner_insert" on public.harmonic_events for insert to authenticated with check (host_id = auth.uid());
create policy "events_owner_update" on public.harmonic_events for update to authenticated using (host_id = auth.uid()) with check (host_id = auth.uid());
create policy "event_rsvps_public_read" on public.event_rsvps for select using (true);
create policy "event_rsvps_manage_own" on public.event_rsvps for all to authenticated using (user_id = auth.uid()) with check (user_id = auth.uid());

create policy "ai_requests_manage_own" on public.harmony_ai_requests for all to authenticated using (user_id = auth.uid()) with check (user_id = auth.uid());
create policy "ai_permissions_manage_own" on public.user_ai_permissions for all to authenticated using (user_id = auth.uid()) with check (user_id = auth.uid());
create policy "analytics_insert_client" on public.analytics_events for insert to anon, authenticated with check (user_id is null or user_id = auth.uid());
create policy "analytics_read_owner" on public.analytics_events for select to authenticated using (exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin'));
create policy "analytics_daily_read_owner" on public.analytics_daily_worlds for select to authenticated using (exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin'));

-- Fair award function. Purchases and spending are explicitly rejected.
create or replace function public.award_resonance(
  p_user_id uuid,
  p_category text,
  p_points integer,
  p_action_key text,
  p_source_type text default 'system',
  p_source_id text default null,
  p_metadata jsonb default '{}'::jsonb
)
returns public.user_resonance
language plpgsql
security definer
set search_path = public
as $$
declare result public.user_resonance;
begin
  if p_points <= 0 then raise exception 'Resonance points must be positive'; end if;
  if p_category not in ('creativity','community','loyalty','exploration','archive') then raise exception 'Invalid resonance category'; end if;
  if p_action_key in ('purchase','checkout','spend','subscription_payment','buy_product','paid_membership') then raise exception 'Frequency cannot be purchased'; end if;

  insert into public.resonance_ledger(user_id, category, points, action_key, source_type, source_id, metadata)
  values (p_user_id, p_category, p_points, p_action_key, p_source_type, p_source_id, p_metadata);

  insert into public.user_resonance(user_id) values (p_user_id)
  on conflict (user_id) do nothing;

  update public.user_resonance set
    creativity = creativity + case when p_category='creativity' then p_points else 0 end,
    community = community + case when p_category='community' then p_points else 0 end,
    loyalty = loyalty + case when p_category='loyalty' then p_points else 0 end,
    exploration = exploration + case when p_category='exploration' then p_points else 0 end,
    archive = archive + case when p_category='archive' then p_points else 0 end,
    updated_at = now()
  where user_id = p_user_id
  returning * into result;

  return result;
end;
$$;

revoke all on function public.award_resonance(uuid,text,integer,text,text,text,jsonb) from public;
grant execute on function public.award_resonance(uuid,text,integer,text,text,text,jsonb) to service_role;

-- updated_at triggers
create trigger community_posts_updated_at before update on public.community_posts for each row execute function public.set_updated_at();
create trigger community_comments_updated_at before update on public.community_comments for each row execute function public.set_updated_at();
create trigger user_resonance_updated_at before update on public.user_resonance for each row execute function public.set_updated_at();
create trigger harmonic_quests_updated_at before update on public.harmonic_quests for each row execute function public.set_updated_at();
create trigger quest_progress_updated_at before update on public.user_quest_progress for each row execute function public.set_updated_at();
create trigger harmonic_events_updated_at before update on public.harmonic_events for each row execute function public.set_updated_at();
create trigger event_rsvps_updated_at before update on public.event_rsvps for each row execute function public.set_updated_at();
create trigger ai_permissions_updated_at before update on public.user_ai_permissions for each row execute function public.set_updated_at();

-- Realtime community and event updates
do $$ begin alter publication supabase_realtime add table public.community_posts; exception when duplicate_object then null; end $$;
do $$ begin alter publication supabase_realtime add table public.community_comments; exception when duplicate_object then null; end $$;
do $$ begin alter publication supabase_realtime add table public.community_reactions; exception when duplicate_object then null; end $$;
do $$ begin alter publication supabase_realtime add table public.user_quest_progress; exception when duplicate_object then null; end $$;
do $$ begin alter publication supabase_realtime add table public.harmonic_events; exception when duplicate_object then null; end $$;
do $$ begin alter publication supabase_realtime add table public.event_rsvps; exception when duplicate_object then null; end $$;
