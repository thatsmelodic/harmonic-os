-- Harmonic OS world visual settings
-- Run this in Supabase SQL Editor after the foundation schema.

create table if not exists public.world_visual_settings (
  id text primary key,
  world text not null,
  vibe_name text not null default 'Manual Mode',
  vibe_prompt text not null default '',
  vibe_description text not null default '',
  ambience text not null default 'Nebula Studio',
  cursor_effect text not null default 'Echo Ripple',
  transition_style text not null default 'Frequency Shift',
  tempo integer not null default 80,
  ambient_audio boolean not null default true,
  visual_settings jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.world_visual_settings enable row level security;

drop policy if exists "World visual settings are publicly readable" on public.world_visual_settings;
create policy "World visual settings are publicly readable"
  on public.world_visual_settings
  for select
  using (true);

drop policy if exists "Authenticated creators can manage world visual settings" on public.world_visual_settings;
create policy "Authenticated creators can manage world visual settings"
  on public.world_visual_settings
  for all
  using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

insert into public.world_visual_settings (
  id,
  world,
  vibe_name,
  vibe_prompt,
  vibe_description,
  ambience,
  cursor_effect,
  transition_style,
  tempo,
  ambient_audio,
  visual_settings
)
values (
  'melodic-main',
  'melodic',
  'Default Melodic Frequency',
  'purple memory, healing light, emotional music world',
  'The default saved visual state for the Melodic world.',
  'Nebula Studio',
  'Echo Ripple',
  'Frequency Shift',
  80,
  true,
  '{
    "visualizerStyle": "Bubbles",
    "visualizerSize": "Large",
    "particleShape": "Heart",
    "particleDensity": 78,
    "particleSpeed": 58,
    "glowIntensity": 82,
    "waveThickness": 48,
    "orbCount": 16,
    "motionStrength": 72,
    "cardBlur": 22,
    "logoUrl": "",
    "customImageUrl": ""
  }'::jsonb
)
on conflict (id) do nothing;
