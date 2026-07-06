-- Harmonic OS Supabase foundation
-- Run this in Supabase SQL Editor before using Creator Studio write features.

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text,
  username text unique,
  role text default 'profile' check (role in ('profile', 'creator', 'investor', 'admin')),
  favorite_frequency text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists public.cms_copy (
  id text primary key,
  route text not null,
  label text not null,
  headline text not null,
  subheadline text not null,
  primary_cta text not null,
  secondary_cta text,
  status text default 'published',
  updated_at timestamptz default now()
);

create table if not exists public.assets (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  asset_type text not null check (asset_type in ('image', 'video', 'audio', 'document')),
  world text default 'system',
  bucket text not null,
  path text not null,
  public_url text,
  created_by uuid references auth.users(id),
  created_at timestamptz default now()
);

create table if not exists public.seasons (
  id text primary key,
  name text not null,
  active boolean default false,
  palette text[] default '{}',
  motion_style text default 'soft glow',
  featured_world text default 'system',
  updated_at timestamptz default now()
);

create table if not exists public.worlds (
  id text primary key,
  name text not null,
  tagline text not null,
  description text not null,
  route text not null default '/',
  theme_color text default '#8b5cf6',
  logo_asset_url text,
  active boolean default true,
  sort_order integer default 0,
  updated_at timestamptz default now()
);

insert into public.cms_copy (id, route, label, headline, subheadline, primary_cta, secondary_cta)
values (
  'home-hero',
  '/',
  'Homepage Hero',
  'One Frequency. Many Worlds.',
  'Harmonic OS is the living hub for Melodic: music, fashion, basketball, food, business, community, and creator control inside one cinematic universe.',
  'Enter the Worlds',
  'Open Creator Hub'
)
on conflict (id) do nothing;

insert into public.seasons (id, name, active, palette, motion_style, featured_world)
values
  ('spring', 'Spring', false, array['#70e000', '#b7ff6a', '#f5fff0'], 'flowers, growth, soft motion', '2-harmonic'),
  ('summer', 'Summer', false, array['#ffd166', '#ff7a00', '#00c2ff'], 'bright energy and fast motion', 'fried-em'),
  ('fall', 'Fall', false, array['#f97316', '#7c2d12', '#f5e6d3'], 'leaves, hoodies, warm cinematic light', '2-harmonic'),
  ('winter', 'Winter', true, array['#8b5cf6', '#dbeafe', '#05000a'], 'frosted glass and purple neon', 'melodic')
on conflict (id) do nothing;

insert into public.worlds (id, name, tagline, description, route, theme_color, active, sort_order)
values
  ('melodic', 'Melodic', 'Music / Sound / Identity', 'The sound world for beats, songs, sonic direction, and creative identity.', '/beats', '#8b5cf6', true, 1),
  ('2-harmonic', '2 Harmonic', 'Fashion / Stitched Melodies', 'The fashion world for drops, lookbooks, product storytelling, and wearable melodies.', '/shop', '#36b2cb', true, 2),
  ('fried-em', 'Fried Em', 'Basketball / Smoke / Victory', 'The competitive basketball world for clips, challenges, rankings, and episodes.', '/hub', '#f97316', true, 3),
  ('schmackinn', 'Schmackinn', 'Food / Reviews / Culture', 'The food world for reviews, questions, restaurants, and eating-channel personality.', '/community/schmackinn', '#22c55e', true, 4),
  ('beats', 'Beats', 'Vault / Drops / Licensing', 'The beat drop world for previews, stems, covers, and audio snippets.', '/beats', '#d946ef', true, 5),
  ('investor', 'Investor', 'Business / Strategy / Growth', 'The business world for deck pages, financial thinking, brand strategy, and platform growth.', '/investor', '#facc15', false, 6)
on conflict (id) do nothing;

alter table public.profiles enable row level security;
alter table public.cms_copy enable row level security;
alter table public.assets enable row level security;
alter table public.seasons enable row level security;
alter table public.worlds enable row level security;

drop policy if exists "profiles_select_own" on public.profiles;
create policy "profiles_select_own" on public.profiles for select using (auth.uid() = id);
drop policy if exists "profiles_insert_own" on public.profiles;
create policy "profiles_insert_own" on public.profiles for insert with check (auth.uid() = id);
drop policy if exists "profiles_update_own" on public.profiles;
create policy "profiles_update_own" on public.profiles for update using (auth.uid() = id);

drop policy if exists "cms_copy_public_read" on public.cms_copy;
create policy "cms_copy_public_read" on public.cms_copy for select using (true);
drop policy if exists "cms_copy_auth_write" on public.cms_copy;
create policy "cms_copy_auth_write" on public.cms_copy for update using (auth.role() = 'authenticated');

drop policy if exists "assets_public_read" on public.assets;
create policy "assets_public_read" on public.assets for select using (true);
drop policy if exists "assets_auth_insert" on public.assets;
create policy "assets_auth_insert" on public.assets for insert with check (auth.role() = 'authenticated');

drop policy if exists "seasons_public_read" on public.seasons;
create policy "seasons_public_read" on public.seasons for select using (true);
drop policy if exists "seasons_auth_update" on public.seasons;
create policy "seasons_auth_update" on public.seasons for update using (auth.role() = 'authenticated');

drop policy if exists "worlds_public_read" on public.worlds;
create policy "worlds_public_read" on public.worlds for select using (true);
drop policy if exists "worlds_auth_update" on public.worlds;
create policy "worlds_auth_update" on public.worlds for update using (auth.role() = 'authenticated');

insert into storage.buckets (id, name, public)
values
  ('brand-assets', 'brand-assets', true),
  ('world-media', 'world-media', true),
  ('shop-assets', 'shop-assets', true),
  ('beats', 'beats', true),
  ('community-uploads', 'community-uploads', true)
on conflict (id) do nothing;

drop policy if exists "public_read_brand_assets" on storage.objects;
create policy "public_read_brand_assets" on storage.objects for select using (bucket_id in ('brand-assets', 'world-media', 'shop-assets', 'beats', 'community-uploads'));
drop policy if exists "authenticated_upload_assets" on storage.objects;
create policy "authenticated_upload_assets" on storage.objects for insert with check (auth.role() = 'authenticated');
