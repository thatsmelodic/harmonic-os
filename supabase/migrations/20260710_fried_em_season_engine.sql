-- Fried Em Season Engine

create table if not exists public.fried_em_seasons (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  season_number integer not null unique,
  title text not null,
  subtitle text not null default '',
  description text not null default '',
  status text not null default 'upcoming' check (status in ('upcoming', 'active', 'completed')),
  start_date date not null,
  end_date date,
  champion_player_id uuid references public.fried_em_players(id) on delete set null,
  mvp_player_id uuid references public.fried_em_players(id) on delete set null,
  theme text not null default '',
  rules text[] not null default '{}',
  created_by uuid references auth.users(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.fried_em_episodes
  add column if not exists season_id uuid references public.fried_em_seasons(id) on delete set null;

create table if not exists public.fried_em_season_players (
  season_id uuid not null references public.fried_em_seasons(id) on delete cascade,
  player_id uuid not null references public.fried_em_players(id) on delete cascade,
  seed integer,
  season_wins integer not null default 0,
  season_losses integer not null default 0,
  season_respect integer not null default 0,
  season_heat integer not null default 0,
  mvp_votes integer not null default 0,
  primary key (season_id, player_id)
);

create index if not exists fried_em_seasons_status_idx on public.fried_em_seasons(status, season_number desc);
create index if not exists fried_em_episodes_season_idx on public.fried_em_episodes(season_id, episode_number);

alter table public.fried_em_seasons enable row level security;
alter table public.fried_em_season_players enable row level security;

drop policy if exists "fried_em_seasons_public_read" on public.fried_em_seasons;
create policy "fried_em_seasons_public_read" on public.fried_em_seasons for select using (true);

drop policy if exists "fried_em_season_players_public_read" on public.fried_em_season_players;
create policy "fried_em_season_players_public_read" on public.fried_em_season_players for select using (true);

drop policy if exists "fried_em_creator_manage_seasons" on public.fried_em_seasons;
create policy "fried_em_creator_manage_seasons" on public.fried_em_seasons for all to authenticated
using (exists (select 1 from public.profiles p where p.id = auth.uid() and p.role in ('creator','admin')))
with check (exists (select 1 from public.profiles p where p.id = auth.uid() and p.role in ('creator','admin')));

drop policy if exists "fried_em_creator_manage_season_players" on public.fried_em_season_players;
create policy "fried_em_creator_manage_season_players" on public.fried_em_season_players for all to authenticated
using (exists (select 1 from public.profiles p where p.id = auth.uid() and p.role in ('creator','admin')))
with check (exists (select 1 from public.profiles p where p.id = auth.uid() and p.role in ('creator','admin')));

drop trigger if exists fried_em_seasons_updated_at on public.fried_em_seasons;
create trigger fried_em_seasons_updated_at before update on public.fried_em_seasons for each row execute function public.set_updated_at();

do $$
begin
  alter publication supabase_realtime add table public.fried_em_seasons;
exception when duplicate_object then null;
end $$;
