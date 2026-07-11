-- Scalable Schmackinn universe: cities, districts, restaurants, reviews, callouts, scouts, memories.

create table if not exists public.schmackinn_cities (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  name text not null,
  state_region text,
  country text default 'US',
  description text,
  map_center_x numeric default 50,
  map_center_y numeric default 50,
  is_active boolean default true,
  sort_order integer default 0,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists public.schmackinn_districts (
  id uuid primary key default gen_random_uuid(),
  city_id uuid not null references public.schmackinn_cities(id) on delete cascade,
  slug text not null,
  name text not null,
  description text,
  district_type text default 'neighborhood',
  icon text default '📍',
  accent text,
  is_active boolean default true,
  sort_order integer default 0,
  created_at timestamptz default now(),
  updated_at timestamptz default now(),
  unique(city_id, slug)
);

create table if not exists public.schmackinn_restaurants (
  id uuid primary key default gen_random_uuid(),
  district_id uuid not null references public.schmackinn_districts(id) on delete restrict,
  slug text unique not null,
  name text not null,
  category text not null,
  price_tier text default '$$' check (price_tier in ('$', '$$', '$$$', '$$$$')),
  address text,
  latitude numeric,
  longitude numeric,
  map_x numeric default 50,
  map_y numeric default 50,
  storefront_visual text default '🍽️',
  storefront_image_url text,
  interior_image_url text,
  featured_dish text,
  story text,
  melodic_verdict text check (melodic_verdict in ('Schmakinn','Crackin','Lackin','Bunz')),
  melodic_score integer check (melodic_score between 0 and 100),
  community_score integer check (community_score between 0 and 100),
  is_hidden_gem boolean default false,
  is_open boolean default true,
  is_reviewed boolean default false,
  is_active boolean default true,
  created_by uuid references auth.users(id) on delete set null,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists public.schmackinn_reviews (
  id uuid primary key default gen_random_uuid(),
  restaurant_id uuid not null references public.schmackinn_restaurants(id) on delete cascade,
  creator_id uuid references auth.users(id) on delete set null,
  title text not null,
  dish_name text not null,
  video_url text,
  thumbnail_url text,
  verdict text not null check (verdict in ('Schmakinn','Crackin','Lackin','Bunz')),
  flavor integer default 0 check (flavor between 0 and 100),
  texture integer default 0 check (texture between 0 and 100),
  freshness integer default 0 check (freshness between 0 and 100),
  comfort integer default 0 check (comfort between 0 and 100),
  value integer default 0 check (value between 0 and 100),
  culture integer default 0 check (culture between 0 and 100),
  presentation integer default 0 check (presentation between 0 and 100),
  portion integer default 0 check (portion between 0 and 100),
  creativity integer default 0 check (creativity between 0 and 100),
  consistency integer default 0 check (consistency between 0 and 100),
  story text,
  published_at timestamptz,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists public.schmackinn_callouts (
  id uuid primary key default gen_random_uuid(),
  restaurant_id uuid not null references public.schmackinn_restaurants(id) on delete cascade,
  profile_id uuid not null references auth.users(id) on delete cascade,
  note text,
  status text default 'open' check (status in ('open','completed','dismissed')),
  created_at timestamptz default now(),
  unique(restaurant_id, profile_id)
);

create table if not exists public.schmackinn_scout_profiles (
  profile_id uuid primary key references auth.users(id) on delete cascade,
  successful_discoveries integer default 0,
  total_callouts integer default 0,
  accuracy numeric default 0,
  rank_name text default 'Flavor Rookie',
  updated_at timestamptz default now()
);

create table if not exists public.schmackinn_food_memories (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid not null references auth.users(id) on delete cascade,
  restaurant_id uuid not null references public.schmackinn_restaurants(id) on delete cascade,
  review_id uuid references public.schmackinn_reviews(id) on delete set null,
  title text,
  memory_text text,
  visited_at date,
  people text[],
  created_at timestamptz default now()
);

create index if not exists schmackinn_districts_city_idx on public.schmackinn_districts(city_id);
create index if not exists schmackinn_restaurants_district_idx on public.schmackinn_restaurants(district_id);
create index if not exists schmackinn_reviews_restaurant_idx on public.schmackinn_reviews(restaurant_id);
create index if not exists schmackinn_callouts_restaurant_idx on public.schmackinn_callouts(restaurant_id);

alter table public.schmackinn_cities enable row level security;
alter table public.schmackinn_districts enable row level security;
alter table public.schmackinn_restaurants enable row level security;
alter table public.schmackinn_reviews enable row level security;
alter table public.schmackinn_callouts enable row level security;
alter table public.schmackinn_scout_profiles enable row level security;
alter table public.schmackinn_food_memories enable row level security;

create policy "public read active schmackinn cities" on public.schmackinn_cities for select using (is_active = true);
create policy "public read active schmackinn districts" on public.schmackinn_districts for select using (is_active = true);
create policy "public read active schmackinn restaurants" on public.schmackinn_restaurants for select using (is_active = true);
create policy "public read published schmackinn reviews" on public.schmackinn_reviews for select using (published_at is not null);
create policy "profiles create own callouts" on public.schmackinn_callouts for insert with check (auth.uid() = profile_id);
create policy "profiles read callouts" on public.schmackinn_callouts for select using (true);
create policy "profiles manage own memories" on public.schmackinn_food_memories for all using (auth.uid() = profile_id) with check (auth.uid() = profile_id);
create policy "profiles read own scout profile" on public.schmackinn_scout_profiles for select using (auth.uid() = profile_id);

-- Seed starter cities and districts. These are editable starter records, not limits.
insert into public.schmackinn_cities (slug, name, state_region, sort_order) values
  ('milwaukee','Milwaukee','Wisconsin',1),
  ('baltimore','Baltimore','Maryland',2),
  ('chicago','Chicago','Illinois',3)
on conflict (slug) do nothing;

insert into public.schmackinn_districts (city_id, slug, name, sort_order)
select c.id, seed.slug, seed.name, seed.sort_order
from public.schmackinn_cities c
join (values
  ('milwaukee','downtown','Downtown',1),
  ('milwaukee','east-side','East Side',2),
  ('milwaukee','bay-view','Bay View',3),
  ('milwaukee','south-side','South Side',4),
  ('baltimore','fells-point','Fells Point',1),
  ('baltimore','federal-hill','Federal Hill',2),
  ('baltimore','inner-harbor','Inner Harbor',3),
  ('baltimore','towson','Towson',4),
  ('chicago','south-loop','South Loop',1),
  ('chicago','west-loop','West Loop',2),
  ('chicago','hyde-park','Hyde Park',3)
) as seed(city_slug, slug, name, sort_order) on seed.city_slug = c.slug
on conflict (city_id, slug) do nothing;