-- Creator identity, world ownership limits, and Expand Your Universe applications

alter table public.profiles drop constraint if exists profiles_role_check;
alter table public.profiles add constraint profiles_role_check
  check (role in ('profile','member','creator','verified_creator','harmonic_partner','investor','admin'));

alter table public.profiles
  add column if not exists display_name text,
  add column if not exists bio text default '',
  add column if not exists avatar_url text,
  add column if not exists banner_url text,
  add column if not exists creator_verified boolean not null default false,
  add column if not exists world_limit integer not null default 0 check (world_limit >= 0),
  add column if not exists creator_headline text,
  add column if not exists creator_philosophy text;

update public.profiles
set world_limit = case
  when role = 'admin' then 999
  when role in ('creator','verified_creator','harmonic_partner') then greatest(world_limit, 3)
  else world_limit
end;

alter table public.creator_worlds
  add column if not exists category text not null default 'general',
  add column if not exists icon text not null default '🌌',
  add column if not exists philosophy text not null default '',
  add column if not exists constitution text not null default '',
  add column if not exists progression_name text not null default 'XP',
  add column if not exists progression_icon text not null default '⭐',
  add column if not exists founder_title text not null default 'Founder';

create table if not exists public.creator_world_expansion_applications (
  id uuid primary key default gen_random_uuid(),
  applicant_id uuid not null references auth.users(id) on delete cascade,
  requested_world_name text not null,
  requested_category text not null,
  requested_icon text not null default '🌌',
  need_reason text not null,
  differentiation text not null,
  existing_world_fit_explanation text not null,
  community_benefit text not null,
  status text not null default 'pending' check (status in ('pending','under_review','approved','denied','needs_info')),
  admin_notes text,
  reviewed_by uuid references auth.users(id) on delete set null,
  reviewed_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.creator_world_limit_grants (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  application_id uuid references public.creator_world_expansion_applications(id) on delete set null,
  previous_limit integer not null,
  new_limit integer not null,
  granted_by uuid not null references auth.users(id) on delete restrict,
  reason text,
  created_at timestamptz not null default now()
);

create index if not exists creator_worlds_owner_idx on public.creator_worlds(owner_id, created_at desc);
create index if not exists expansion_applications_status_idx on public.creator_world_expansion_applications(status, created_at desc);
create index if not exists expansion_applications_applicant_idx on public.creator_world_expansion_applications(applicant_id, created_at desc);

alter table public.creator_world_expansion_applications enable row level security;
alter table public.creator_world_limit_grants enable row level security;

create policy "Applicants read own expansion applications" on public.creator_world_expansion_applications
for select using (applicant_id = auth.uid());

create policy "Applicants create expansion applications" on public.creator_world_expansion_applications
for insert to authenticated with check (applicant_id = auth.uid());

create policy "Admins manage expansion applications" on public.creator_world_expansion_applications
for all to authenticated
using (exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin'))
with check (exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin'));

create policy "Users read own world limit grants" on public.creator_world_limit_grants
for select using (user_id = auth.uid());

create policy "Admins manage world limit grants" on public.creator_world_limit_grants
for all to authenticated
using (exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin'))
with check (exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin'));

create or replace function public.claim_creator_world(
  p_name text,
  p_slug text,
  p_category text,
  p_icon text,
  p_tagline text,
  p_philosophy text,
  p_constitution text,
  p_progression_name text,
  p_progression_icon text
)
returns public.creator_worlds
language plpgsql
security definer
set search_path = public
as $$
declare
  caller_profile public.profiles;
  owned_count integer;
  created_world public.creator_worlds;
begin
  if auth.uid() is null then raise exception 'Authentication required'; end if;

  select * into caller_profile from public.profiles where id = auth.uid() for update;
  if caller_profile.id is null then raise exception 'Profile not found'; end if;

  if caller_profile.role in ('profile','member','investor') then
    update public.profiles set role = 'creator', world_limit = greatest(world_limit, 3), updated_at = now() where id = auth.uid()
    returning * into caller_profile;
  end if;

  select count(*) into owned_count from public.creator_worlds where owner_id = auth.uid() and status <> 'archived';
  if owned_count >= caller_profile.world_limit then
    raise exception 'WORLD_LIMIT_REACHED';
  end if;

  insert into public.creator_worlds(owner_id, slug, name, category, icon, tagline, philosophy, constitution, progression_name, progression_icon, status, visibility)
  values (auth.uid(), lower(trim(p_slug)), trim(p_name), trim(p_category), coalesce(nullif(trim(p_icon),''),'🌌'), trim(p_tagline), trim(p_philosophy), trim(p_constitution), coalesce(nullif(trim(p_progression_name),''),'XP'), coalesce(nullif(trim(p_progression_icon),''),'⭐'), 'draft', 'private')
  returning * into created_world;

  return created_world;
end;
$$;

grant execute on function public.claim_creator_world(text,text,text,text,text,text,text,text,text) to authenticated;

create or replace function public.review_world_expansion_application(
  p_application_id uuid,
  p_status text,
  p_admin_notes text default null
)
returns public.creator_world_expansion_applications
language plpgsql
security definer
set search_path = public
as $$
declare
  app public.creator_world_expansion_applications;
  old_limit integer;
begin
  if not exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin') then
    raise exception 'Admin access required';
  end if;
  if p_status not in ('under_review','approved','denied','needs_info') then
    raise exception 'Invalid review status';
  end if;

  update public.creator_world_expansion_applications
  set status = p_status, admin_notes = p_admin_notes, reviewed_by = auth.uid(), reviewed_at = now(), updated_at = now()
  where id = p_application_id
  returning * into app;

  if app.id is null then raise exception 'Application not found'; end if;

  if p_status = 'approved' then
    select world_limit into old_limit from public.profiles where id = app.applicant_id for update;
    update public.profiles set world_limit = old_limit + 1, role = case when role = 'admin' then role else 'harmonic_partner' end, updated_at = now() where id = app.applicant_id;
    insert into public.creator_world_limit_grants(user_id, application_id, previous_limit, new_limit, granted_by, reason)
    values (app.applicant_id, app.id, old_limit, old_limit + 1, auth.uid(), p_admin_notes);
  end if;

  return app;
end;
$$;

grant execute on function public.review_world_expansion_application(uuid,text,text) to authenticated;

drop trigger if exists creator_world_expansion_updated_at on public.creator_world_expansion_applications;
create trigger creator_world_expansion_updated_at before update on public.creator_world_expansion_applications for each row execute function public.set_updated_at();
