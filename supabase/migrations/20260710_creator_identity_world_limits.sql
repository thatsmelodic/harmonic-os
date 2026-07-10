-- Creator identity, world ownership limits, and Expand Your Universe applications

alter table public.profiles
  drop constraint if exists profiles_role_check;

alter table public.profiles
  add constraint profiles_role_check
  check (role in ('profile','member','creator','verified_creator','harmonic_partner','admin'));

alter table public.profiles
  add column if not exists display_name text,
  add column if not exists bio text not null default '',
  add column if not exists avatar_url text,
  add column if not exists banner_url text,
  add column if not exists creator_verified boolean not null default false,
  add column if not exists world_limit integer not null default 0 check (world_limit >= 0),
  add column if not exists creator_since timestamptz;

update public.profiles
set role = case when role = 'profile' then 'member' else role end,
    world_limit = case
      when role in ('creator','verified_creator') and world_limit = 0 then 3
      when role = 'harmonic_partner' and world_limit = 0 then 4
      when role = 'admin' and world_limit = 0 then 999
      else world_limit
    end;

create table if not exists public.creator_worlds (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null references auth.users(id) on delete cascade,
  slug text not null unique,
  name text not null,
  category text not null,
  icon text not null default '🌌',
  philosophy text not null default '',
  description text not null default '',
  status text not null default 'draft' check (status in ('draft','active','paused','archived')),
  progression_name text not null default 'XP',
  constitution_title text not null default 'Welcome',
  constitution_body text not null default '',
  route text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.world_expansion_applications (
  id uuid primary key default gen_random_uuid(),
  creator_id uuid not null references auth.users(id) on delete cascade,
  requested_world_name text not null,
  requested_category text not null,
  reason_for_expansion text not null,
  difference_from_existing text not null,
  why_existing_worlds_are_not_enough text not null,
  community_benefit text not null,
  requested_additional_slots integer not null default 1 check (requested_additional_slots between 1 and 3),
  status text not null default 'pending' check (status in ('pending','under_review','approved','denied','more_information')),
  admin_notes text,
  reviewed_by uuid references auth.users(id) on delete set null,
  reviewed_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists creator_worlds_owner_idx on public.creator_worlds(owner_id, created_at desc);
create index if not exists expansion_applications_creator_idx on public.world_expansion_applications(creator_id, created_at desc);
create index if not exists expansion_applications_status_idx on public.world_expansion_applications(status, created_at asc);

create or replace function public.can_create_creator_world(p_user_id uuid)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select (
    select count(*) from public.creator_worlds cw
    where cw.owner_id = p_user_id and cw.status <> 'archived'
  ) < coalesce((select p.world_limit from public.profiles p where p.id = p_user_id), 0);
$$;

create or replace function public.enforce_creator_world_limit()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  if not public.can_create_creator_world(new.owner_id) then
    raise exception 'World limit reached. Use Expand Your Universe to request another world.';
  end if;
  return new;
end;
$$;

drop trigger if exists enforce_creator_world_limit_trigger on public.creator_worlds;
create trigger enforce_creator_world_limit_trigger
before insert on public.creator_worlds
for each row execute function public.enforce_creator_world_limit();

create or replace function public.approve_world_expansion(p_application_id uuid, p_admin_notes text default null)
returns public.world_expansion_applications
language plpgsql
security definer
set search_path = public
as $$
declare
  app public.world_expansion_applications;
  caller_role text;
begin
  select role into caller_role from public.profiles where id = auth.uid();
  if caller_role <> 'admin' then raise exception 'Admin access required'; end if;

  select * into app from public.world_expansion_applications where id = p_application_id for update;
  if not found then raise exception 'Application not found'; end if;

  update public.profiles
  set world_limit = world_limit + app.requested_additional_slots,
      role = case when role in ('creator','verified_creator') then 'harmonic_partner' else role end,
      updated_at = now()
  where id = app.creator_id;

  update public.world_expansion_applications
  set status = 'approved', admin_notes = p_admin_notes, reviewed_by = auth.uid(), reviewed_at = now(), updated_at = now()
  where id = p_application_id
  returning * into app;

  return app;
end;
$$;

grant execute on function public.approve_world_expansion(uuid, text) to authenticated;

alter table public.creator_worlds enable row level security;
alter table public.world_expansion_applications enable row level security;

create policy "creator_worlds_public_read" on public.creator_worlds for select using (status = 'active' or owner_id = auth.uid());
create policy "creator_worlds_owner_insert" on public.creator_worlds for insert to authenticated with check (owner_id = auth.uid());
create policy "creator_worlds_owner_update" on public.creator_worlds for update to authenticated using (owner_id = auth.uid()) with check (owner_id = auth.uid());
create policy "creator_worlds_owner_delete" on public.creator_worlds for delete to authenticated using (owner_id = auth.uid());

create policy "expansion_applications_owner_read" on public.world_expansion_applications for select using (creator_id = auth.uid() or exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin'));
create policy "expansion_applications_owner_insert" on public.world_expansion_applications for insert to authenticated with check (creator_id = auth.uid());
create policy "expansion_applications_owner_update" on public.world_expansion_applications for update to authenticated using (creator_id = auth.uid() and status in ('pending','more_information')) with check (creator_id = auth.uid());
create policy "expansion_applications_admin_update" on public.world_expansion_applications for update to authenticated using (exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin')) with check (exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin'));

create trigger creator_worlds_updated_at before update on public.creator_worlds for each row execute function public.set_updated_at();
create trigger expansion_applications_updated_at before update on public.world_expansion_applications for each row execute function public.set_updated_at();
