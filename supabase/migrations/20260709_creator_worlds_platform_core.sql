-- Creator Worlds platform core
-- Run in Supabase SQL editor or through Supabase migrations before wiring live commerce.
-- This creates the first backend foundation for worlds, rooms, commerce, referrals, approvals, and analytics.

create extension if not exists pgcrypto;

create table if not exists public.creator_worlds (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid references auth.users(id) on delete cascade,
  slug text unique not null,
  name text not null,
  handle text,
  tagline text,
  status text not null default 'draft' check (status in ('draft', 'testing', 'published', 'archived')),
  visibility text not null default 'public' check (visibility in ('public', 'unlisted', 'private')),
  primary_color text default '#b76cff',
  secondary_color text default '#36b2cb',
  atmosphere text default 'cinematic neon',
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists public.creator_world_rooms (
  id uuid primary key default gen_random_uuid(),
  world_id uuid not null references public.creator_worlds(id) on delete cascade,
  slug text not null,
  name text not null,
  room_type text not null check (room_type in ('studio', 'community', 'storefront', 'vault', 'event', 'portal', 'ai', 'marketplace')),
  access_level text not null default 'public' check (access_level in ('public', 'members', 'premium', 'ticketed', 'creator', 'admin')),
  description text,
  effect_preset text,
  sort_order integer default 0,
  is_active boolean default true,
  created_at timestamptz default now(),
  updated_at timestamptz default now(),
  unique(world_id, slug)
);

create table if not exists public.creator_products (
  id uuid primary key default gen_random_uuid(),
  world_id uuid not null references public.creator_worlds(id) on delete cascade,
  seller_id uuid references auth.users(id) on delete set null,
  title text not null,
  description text,
  product_type text not null check (product_type in ('membership', 'physical-product', 'digital-product', 'ticket', 'license', 'module', 'service')),
  status text not null default 'draft' check (status in ('draft', 'active', 'sold-out', 'archived')),
  price_cents integer not null check (price_cents >= 0),
  currency text not null default 'usd',
  inventory integer,
  platform_fee_bps integer not null default 1000 check (platform_fee_bps >= 0 and platform_fee_bps <= 5000),
  metadata jsonb default '{}'::jsonb,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists public.creator_memberships (
  id uuid primary key default gen_random_uuid(),
  world_id uuid not null references public.creator_worlds(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  tier text not null default 'member',
  status text not null default 'active' check (status in ('active', 'past_due', 'canceled', 'trialing')),
  stripe_subscription_id text,
  started_at timestamptz default now(),
  current_period_end timestamptz,
  unique(world_id, user_id, tier)
);

create table if not exists public.creator_referrals (
  id uuid primary key default gen_random_uuid(),
  code text unique not null,
  source text not null default 'affiliate-link' check (source in ('direct', 'community-post', 'voice-room', 'collab-portal', 'affiliate-link', 'marketplace-feature')),
  seller_world_id uuid references public.creator_worlds(id) on delete cascade,
  promoter_world_id uuid references public.creator_worlds(id) on delete set null,
  promoter_user_id uuid references auth.users(id) on delete set null,
  item_id uuid references public.creator_products(id) on delete cascade,
  promoter_share_bps integer default 0 check (promoter_share_bps >= 0 and promoter_share_bps <= 5000),
  collaborator_share_bps integer default 0 check (collaborator_share_bps >= 0 and collaborator_share_bps <= 5000),
  is_active boolean default true,
  created_at timestamptz default now()
);

create table if not exists public.creator_orders (
  id uuid primary key default gen_random_uuid(),
  buyer_id uuid references auth.users(id) on delete set null,
  product_id uuid not null references public.creator_products(id) on delete restrict,
  world_id uuid not null references public.creator_worlds(id) on delete restrict,
  referral_id uuid references public.creator_referrals(id) on delete set null,
  quantity integer not null default 1 check (quantity > 0),
  subtotal_cents integer not null check (subtotal_cents >= 0),
  platform_fee_cents integer not null default 0 check (platform_fee_cents >= 0),
  promoter_cents integer not null default 0 check (promoter_cents >= 0),
  collaborator_cents integer not null default 0 check (collaborator_cents >= 0),
  creator_net_cents integer not null default 0 check (creator_net_cents >= 0),
  currency text not null default 'usd',
  status text not null default 'pending' check (status in ('pending', 'paid', 'refunded', 'failed', 'canceled')),
  stripe_checkout_session_id text,
  stripe_payment_intent_id text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists public.creator_ai_approvals (
  id uuid primary key default gen_random_uuid(),
  world_id uuid not null references public.creator_worlds(id) on delete cascade,
  created_by uuid references auth.users(id) on delete set null,
  suggestion_type text not null check (suggestion_type in ('commerce', 'world-effect', 'community', 'media', 'event', 'builder', 'economy')),
  title text not null,
  preview text not null,
  explain_why text,
  risk_note text,
  affected_systems text[] default '{}',
  status text not null default 'draft' check (status in ('draft', 'preview', 'approved', 'rejected', 'edited', 'published')),
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists public.creator_world_events (
  id uuid primary key default gen_random_uuid(),
  world_id uuid not null references public.creator_worlds(id) on delete cascade,
  room_id uuid references public.creator_world_rooms(id) on delete set null,
  event_type text not null check (event_type in ('drop-launch', 'purchase', 'membership', 'ticket-sale', 'media-premiere', 'community-spike', 'collab-sale', 'seasonal', 'holiday')),
  title text not null,
  description text,
  effect_payload jsonb default '{}'::jsonb,
  starts_at timestamptz,
  ends_at timestamptz,
  created_at timestamptz default now()
);

create table if not exists public.creator_world_analytics_daily (
  id uuid primary key default gen_random_uuid(),
  world_id uuid not null references public.creator_worlds(id) on delete cascade,
  day date not null,
  visits integer default 0,
  active_members integer default 0,
  orders integer default 0,
  gross_revenue_cents integer default 0,
  platform_revenue_cents integer default 0,
  promoter_payout_cents integer default 0,
  creator_net_cents integer default 0,
  approval_count integer default 0,
  community_pulse integer default 0,
  created_at timestamptz default now(),
  unique(world_id, day)
);

alter table public.creator_worlds enable row level security;
alter table public.creator_world_rooms enable row level security;
alter table public.creator_products enable row level security;
alter table public.creator_memberships enable row level security;
alter table public.creator_referrals enable row level security;
alter table public.creator_orders enable row level security;
alter table public.creator_ai_approvals enable row level security;
alter table public.creator_world_events enable row level security;
alter table public.creator_world_analytics_daily enable row level security;

drop policy if exists "Public can view published worlds" on public.creator_worlds;
create policy "Public can view published worlds" on public.creator_worlds for select using (status = 'published' or visibility in ('public', 'unlisted'));

drop policy if exists "Owners manage their worlds" on public.creator_worlds;
create policy "Owners manage their worlds" on public.creator_worlds for all using (auth.uid() = owner_id) with check (auth.uid() = owner_id);

drop policy if exists "Public can view active public rooms" on public.creator_world_rooms;
create policy "Public can view active public rooms" on public.creator_world_rooms for select using (is_active = true and access_level = 'public');

drop policy if exists "World owners manage rooms" on public.creator_world_rooms;
create policy "World owners manage rooms" on public.creator_world_rooms for all using (exists (select 1 from public.creator_worlds w where w.id = world_id and w.owner_id = auth.uid())) with check (exists (select 1 from public.creator_worlds w where w.id = world_id and w.owner_id = auth.uid()));

drop policy if exists "Public can view active products" on public.creator_products;
create policy "Public can view active products" on public.creator_products for select using (status = 'active');

drop policy if exists "Sellers manage products" on public.creator_products;
create policy "Sellers manage products" on public.creator_products for all using (auth.uid() = seller_id) with check (auth.uid() = seller_id);

drop policy if exists "Members view their memberships" on public.creator_memberships;
create policy "Members view their memberships" on public.creator_memberships for select using (auth.uid() = user_id);

drop policy if exists "Buyers view their orders" on public.creator_orders;
create policy "Buyers view their orders" on public.creator_orders for select using (auth.uid() = buyer_id);

drop policy if exists "World owners view approvals" on public.creator_ai_approvals;
create policy "World owners view approvals" on public.creator_ai_approvals for select using (exists (select 1 from public.creator_worlds w where w.id = world_id and w.owner_id = auth.uid()));

drop policy if exists "World owners manage approvals" on public.creator_ai_approvals;
create policy "World owners manage approvals" on public.creator_ai_approvals for all using (exists (select 1 from public.creator_worlds w where w.id = world_id and w.owner_id = auth.uid())) with check (exists (select 1 from public.creator_worlds w where w.id = world_id and w.owner_id = auth.uid()));

create index if not exists creator_worlds_slug_idx on public.creator_worlds(slug);
create index if not exists creator_world_rooms_world_idx on public.creator_world_rooms(world_id);
create index if not exists creator_products_world_idx on public.creator_products(world_id);
create index if not exists creator_orders_world_idx on public.creator_orders(world_id);
create index if not exists creator_referrals_code_idx on public.creator_referrals(code);
create index if not exists creator_analytics_world_day_idx on public.creator_world_analytics_daily(world_id, day desc);
