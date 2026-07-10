-- Fried Em live platform foundation
-- Run through Supabase migrations or paste into the SQL Editor.

create table if not exists public.fried_em_players (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid references auth.users(id) on delete set null,
  slug text not null unique,
  name text not null,
  handle text not null unique,
  badge text not null default 'Rookie',
  bio text not null default '',
  wins integer not null default 0 check (wins >= 0),
  losses integer not null default 0 check (losses >= 0),
  respect integer not null default 50 check (respect between 0 and 100),
  heat integer not null default 50 check (heat between 0 and 100),
  cooked_meter integer not null default 50 check (cooked_meter between 0 and 100),
  clutch integer not null default 50 check (clutch between 0 and 100),
  game_iq integer not null default 50 check (game_iq between 0 and 100),
  stops integer not null default 0 check (stops >= 0),
  buckets integer not null default 0 check (buckets >= 0),
  win_streak integer not null default 0,
  signature_move text,
  recent_victim text,
  highlights text[] not null default '{}',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.fried_em_episodes (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  episode_number integer not null unique,
  title text not null,
  subtitle text not null default '',
  description text not null default '',
  duration text,
  views_count integer not null default 0 check (views_count >= 0),
  heat integer not null default 50 check (heat between 0 and 100),
  court text,
  opponent text,
  result text check (result in ('W', 'L', 'D')),
  score text,
  published_at timestamptz,
  youtube_id text,
  tags text[] not null default '{}',
  status text not null default 'draft' check (status in ('draft', 'published', 'archived')),
  created_by uuid references auth.users(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.fried_em_episode_players (
  episode_id uuid not null references public.fried_em_episodes(id) on delete cascade,
  player_id uuid not null references public.fried_em_players(id) on delete cascade,
  role text not null default 'player',
  primary key (episode_id, player_id)
);

create table if not exists public.fried_em_episode_moments (
  id uuid primary key default gen_random_uuid(),
  episode_id uuid not null references public.fried_em_episodes(id) on delete cascade,
  timestamp_label text not null,
  label text not null,
  description text not null default '',
  sort_order integer not null default 0
);

create table if not exists public.fried_em_challenges (
  id uuid primary key default gen_random_uuid(),
  challenger_user_id uuid references auth.users(id) on delete set null,
  challenger_name text not null,
  opponent_name text not null,
  matchup text not null,
  court text not null,
  scheduled_for timestamptz,
  date_label text,
  time_label text,
  stakes text not null default '',
  status text not null default 'pending' check (status in ('pending', 'accepted', 'scheduled', 'live', 'completed', 'archived')),
  heat integer not null default 50 check (heat between 0 and 100),
  winner_name text,
  score text,
  episode_id uuid references public.fried_em_episodes(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.fried_em_challenge_votes (
  challenge_id uuid not null references public.fried_em_challenges(id) on delete cascade,
  voter_id uuid not null references auth.users(id) on delete cascade,
  created_at timestamptz not null default now(),
  primary key (challenge_id, voter_id)
);

create table if not exists public.fried_em_reputation_events (
  id uuid primary key default gen_random_uuid(),
  player_id uuid not null references public.fried_em_players(id) on delete cascade,
  event_type text not null check (event_type in ('game', 'episode', 'vote', 'challenge', 'streak', 'admin')),
  title text not null,
  description text not null default '',
  respect_delta integer not null default 0,
  heat_delta integer not null default 0,
  cooked_meter_delta integer not null default 0,
  wins_delta integer not null default 0,
  losses_delta integer not null default 0,
  streak_delta integer not null default 0,
  href text,
  source_challenge_id uuid references public.fried_em_challenges(id) on delete set null,
  source_episode_id uuid references public.fried_em_episodes(id) on delete set null,
  created_at timestamptz not null default now()
);

create index if not exists fried_em_players_rank_idx on public.fried_em_players (heat desc, respect desc, cooked_meter desc);
create index if not exists fried_em_episodes_status_idx on public.fried_em_episodes (status, published_at desc);
create index if not exists fried_em_challenges_status_idx on public.fried_em_challenges (status, created_at desc);
create index if not exists fried_em_reputation_player_idx on public.fried_em_reputation_events (player_id, created_at desc);

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists fried_em_players_updated_at on public.fried_em_players;
create trigger fried_em_players_updated_at before update on public.fried_em_players for each row execute function public.set_updated_at();
drop trigger if exists fried_em_episodes_updated_at on public.fried_em_episodes;
create trigger fried_em_episodes_updated_at before update on public.fried_em_episodes for each row execute function public.set_updated_at();
drop trigger if exists fried_em_challenges_updated_at on public.fried_em_challenges;
create trigger fried_em_challenges_updated_at before update on public.fried_em_challenges for each row execute function public.set_updated_at();

alter table public.fried_em_players enable row level security;
alter table public.fried_em_episodes enable row level security;
alter table public.fried_em_episode_players enable row level security;
alter table public.fried_em_episode_moments enable row level security;
alter table public.fried_em_challenges enable row level security;
alter table public.fried_em_challenge_votes enable row level security;
alter table public.fried_em_reputation_events enable row level security;

drop policy if exists "fried_em_players_public_read" on public.fried_em_players;
create policy "fried_em_players_public_read" on public.fried_em_players for select using (true);
drop policy if exists "fried_em_episodes_public_read" on public.fried_em_episodes;
create policy "fried_em_episodes_public_read" on public.fried_em_episodes for select using (status = 'published' or auth.role() = 'authenticated');
drop policy if exists "fried_em_episode_players_public_read" on public.fried_em_episode_players;
create policy "fried_em_episode_players_public_read" on public.fried_em_episode_players for select using (true);
drop policy if exists "fried_em_episode_moments_public_read" on public.fried_em_episode_moments;
create policy "fried_em_episode_moments_public_read" on public.fried_em_episode_moments for select using (true);
drop policy if exists "fried_em_challenges_public_read" on public.fried_em_challenges;
create policy "fried_em_challenges_public_read" on public.fried_em_challenges for select using (true);
drop policy if exists "fried_em_reputation_public_read" on public.fried_em_reputation_events;
create policy "fried_em_reputation_public_read" on public.fried_em_reputation_events for select using (true);

drop policy if exists "fried_em_challenges_auth_insert" on public.fried_em_challenges;
create policy "fried_em_challenges_auth_insert" on public.fried_em_challenges for insert to authenticated with check (challenger_user_id = auth.uid());
drop policy if exists "fried_em_challenges_owner_update" on public.fried_em_challenges;
create policy "fried_em_challenges_owner_update" on public.fried_em_challenges for update to authenticated using (challenger_user_id = auth.uid()) with check (challenger_user_id = auth.uid());

drop policy if exists "fried_em_votes_auth_read" on public.fried_em_challenge_votes;
create policy "fried_em_votes_auth_read" on public.fried_em_challenge_votes for select using (true);
drop policy if exists "fried_em_votes_auth_insert" on public.fried_em_challenge_votes;
create policy "fried_em_votes_auth_insert" on public.fried_em_challenge_votes for insert to authenticated with check (voter_id = auth.uid());
drop policy if exists "fried_em_votes_delete_own" on public.fried_em_challenge_votes;
create policy "fried_em_votes_delete_own" on public.fried_em_challenge_votes for delete to authenticated using (voter_id = auth.uid());

-- Creator/admin writes. Existing profiles.role controls privileged management.
drop policy if exists "fried_em_creator_manage_players" on public.fried_em_players;
create policy "fried_em_creator_manage_players" on public.fried_em_players for all to authenticated using (exists (select 1 from public.profiles p where p.id = auth.uid() and p.role in ('creator','admin'))) with check (exists (select 1 from public.profiles p where p.id = auth.uid() and p.role in ('creator','admin')));
drop policy if exists "fried_em_creator_manage_episodes" on public.fried_em_episodes;
create policy "fried_em_creator_manage_episodes" on public.fried_em_episodes for all to authenticated using (exists (select 1 from public.profiles p where p.id = auth.uid() and p.role in ('creator','admin'))) with check (exists (select 1 from public.profiles p where p.id = auth.uid() and p.role in ('creator','admin')));
drop policy if exists "fried_em_creator_manage_episode_players" on public.fried_em_episode_players;
create policy "fried_em_creator_manage_episode_players" on public.fried_em_episode_players for all to authenticated using (exists (select 1 from public.profiles p where p.id = auth.uid() and p.role in ('creator','admin'))) with check (exists (select 1 from public.profiles p where p.id = auth.uid() and p.role in ('creator','admin')));
drop policy if exists "fried_em_creator_manage_moments" on public.fried_em_episode_moments;
create policy "fried_em_creator_manage_moments" on public.fried_em_episode_moments for all to authenticated using (exists (select 1 from public.profiles p where p.id = auth.uid() and p.role in ('creator','admin'))) with check (exists (select 1 from public.profiles p where p.id = auth.uid() and p.role in ('creator','admin')));
drop policy if exists "fried_em_creator_manage_challenges" on public.fried_em_challenges;
create policy "fried_em_creator_manage_challenges" on public.fried_em_challenges for all to authenticated using (exists (select 1 from public.profiles p where p.id = auth.uid() and p.role in ('creator','admin'))) with check (exists (select 1 from public.profiles p where p.id = auth.uid() and p.role in ('creator','admin')));
drop policy if exists "fried_em_creator_manage_reputation" on public.fried_em_reputation_events;
create policy "fried_em_creator_manage_reputation" on public.fried_em_reputation_events for all to authenticated using (exists (select 1 from public.profiles p where p.id = auth.uid() and p.role in ('creator','admin'))) with check (exists (select 1 from public.profiles p where p.id = auth.uid() and p.role in ('creator','admin')));

-- Enable realtime for the interactive rooms. Ignore duplicate membership errors if rerun manually.
do $$
begin
  alter publication supabase_realtime add table public.fried_em_challenges;
exception when duplicate_object then null;
end $$;
do $$
begin
  alter publication supabase_realtime add table public.fried_em_challenge_votes;
exception when duplicate_object then null;
end $$;
do $$
begin
  alter publication supabase_realtime add table public.fried_em_players;
exception when duplicate_object then null;
end $$;
