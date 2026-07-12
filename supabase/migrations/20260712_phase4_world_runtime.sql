-- Phase 4 Living Runtime: draft/preview/publish workflow, version history, and reusable assets.

alter table public.world_builder_designs
  add column if not exists draft_settings jsonb,
  add column if not exists live_settings jsonb,
  add column if not exists status text not null default 'draft' check (status in ('draft','private-preview','scheduled','live','archived')),
  add column if not exists scheduled_at timestamptz,
  add column if not exists published_at timestamptz;

update public.world_builder_designs
set live_settings = coalesce(live_settings, settings),
    draft_settings = coalesce(draft_settings, settings)
where live_settings is null or draft_settings is null;

create table if not exists public.world_builder_versions (
  id bigint generated always as identity primary key,
  world text not null,
  version_number integer not null,
  status text not null default 'draft',
  settings jsonb not null,
  note text not null default '',
  created_at timestamptz not null default now(),
  unique (world, version_number)
);

alter table public.world_builder_versions enable row level security;
drop policy if exists "World builder versions are publicly readable" on public.world_builder_versions;
create policy "World builder versions are publicly readable"
  on public.world_builder_versions for select using (true);

create table if not exists public.world_asset_library (
  id bigint generated always as identity primary key,
  name text not null,
  url text not null,
  media_type text not null check (media_type in ('image','video','audio')),
  category text not null default 'general',
  source_world text,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  unique (url)
);

alter table public.world_asset_library enable row level security;
drop policy if exists "World asset library is publicly readable" on public.world_asset_library;
create policy "World asset library is publicly readable"
  on public.world_asset_library for select using (true);

create index if not exists world_builder_versions_world_created_idx
  on public.world_builder_versions (world, created_at desc);
create index if not exists world_asset_library_category_idx
  on public.world_asset_library (category, created_at desc);
