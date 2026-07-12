-- Phase 3 Living Worlds: reusable media assets and cloud-synced world design.

insert into storage.buckets (id, name, public)
values ('world-assets', 'world-assets', true)
on conflict (id) do update set public = true;

create table if not exists public.world_builder_designs (
  world text primary key,
  settings jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);

alter table public.world_builder_designs enable row level security;

drop policy if exists "World builder designs are publicly readable" on public.world_builder_designs;
create policy "World builder designs are publicly readable"
  on public.world_builder_designs for select using (true);

-- Writes are performed by server routes using the service role key.

drop policy if exists "World assets are publicly readable" on storage.objects;
create policy "World assets are publicly readable"
  on storage.objects for select
  using (bucket_id = 'world-assets');
