-- Harmonic Commerce: Beat licensing backend
-- Run after Creator Worlds platform core migration.
-- Safe to rerun: tables/indexes are idempotent and policies are replaced.

create extension if not exists pgcrypto;

create table if not exists public.commerce_beats (
  id uuid primary key default gen_random_uuid(),
  world_id uuid references public.creator_worlds(id) on delete cascade,
  producer_id uuid references auth.users(id) on delete set null,
  slug text unique not null,
  title text not null,
  producer_name text not null,
  bpm integer check (bpm > 0),
  musical_key text,
  genre text,
  mood text,
  tags text[] default '{}',
  cover_url text,
  preview_url text,
  master_mp3_url text,
  master_wav_url text,
  stems_url text,
  status text not null default 'draft' check (status in ('draft','active','sold-exclusive','archived')),
  is_exclusive_available boolean not null default true,
  stripe_product_id text,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.commerce_license_tiers (
  id uuid primary key default gen_random_uuid(),
  beat_id uuid not null references public.commerce_beats(id) on delete cascade,
  tier_key text not null check (tier_key in ('free-tagged','basic-lease','premium-lease','unlimited-lease','exclusive-rights')),
  name text not null,
  price_cents integer not null check (price_cents >= 0),
  currency text not null default 'usd',
  files_included text[] not null default '{}',
  rights_granted text[] not null default '{}',
  usage_limits jsonb not null default '{}'::jsonb,
  agreement_summary text not null,
  agreement_template_version text not null default '1.0',
  is_active boolean not null default true,
  stripe_price_id text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique(beat_id, tier_key)
);

create table if not exists public.commerce_orders (
  id uuid primary key default gen_random_uuid(),
  order_number text unique not null default ('HOS-' || upper(substr(replace(gen_random_uuid()::text, '-', ''), 1, 12))),
  buyer_id uuid references auth.users(id) on delete set null,
  seller_id uuid references auth.users(id) on delete set null,
  world_id uuid references public.creator_worlds(id) on delete set null,
  beat_id uuid references public.commerce_beats(id) on delete restrict,
  license_tier_id uuid references public.commerce_license_tiers(id) on delete restrict,
  quantity integer not null default 1 check (quantity > 0),
  subtotal_cents integer not null check (subtotal_cents >= 0),
  platform_fee_cents integer not null default 0 check (platform_fee_cents >= 0),
  processor_fee_cents integer not null default 0 check (processor_fee_cents >= 0),
  promoter_cents integer not null default 0 check (promoter_cents >= 0),
  collaborator_cents integer not null default 0 check (collaborator_cents >= 0),
  creator_net_cents integer not null default 0 check (creator_net_cents >= 0),
  currency text not null default 'usd',
  status text not null default 'pending' check (status in ('pending','checkout-created','paid','fulfilled','refunded','failed','canceled')),
  stripe_checkout_session_id text,
  stripe_payment_intent_id text,
  stripe_customer_id text,
  customer_email text,
  referral_code text,
  paid_at timestamptz,
  fulfilled_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.commerce_license_agreements (
  id uuid primary key default gen_random_uuid(),
  order_id uuid unique not null references public.commerce_orders(id) on delete cascade,
  beat_id uuid not null references public.commerce_beats(id) on delete restrict,
  license_tier_id uuid not null references public.commerce_license_tiers(id) on delete restrict,
  buyer_id uuid references auth.users(id) on delete set null,
  producer_id uuid references auth.users(id) on delete set null,
  buyer_legal_name text,
  producer_legal_name text,
  beat_title text not null,
  license_name text not null,
  agreement_version text not null default '1.0',
  agreement_terms jsonb not null default '{}'::jsonb,
  producer_credit text,
  publishing_split jsonb not null default '{}'::jsonb,
  effective_at timestamptz not null default now(),
  pdf_storage_path text,
  pdf_generated_at timestamptz,
  buyer_acknowledged_at timestamptz,
  producer_acknowledged_at timestamptz,
  status text not null default 'pending' check (status in ('pending','generated','active','void','refunded','superseded')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.commerce_downloads (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references public.commerce_orders(id) on delete cascade,
  buyer_id uuid references auth.users(id) on delete set null,
  file_type text not null check (file_type in ('tagged-mp3','mp3','wav','stems','agreement-pdf','bonus')),
  storage_path text not null,
  download_token_hash text,
  expires_at timestamptz,
  max_downloads integer not null default 5 check (max_downloads > 0),
  download_count integer not null default 0 check (download_count >= 0),
  last_downloaded_at timestamptz,
  revoked_at timestamptz,
  created_at timestamptz not null default now()
);

create table if not exists public.commerce_checkout_events (
  id uuid primary key default gen_random_uuid(),
  order_id uuid references public.commerce_orders(id) on delete cascade,
  stripe_event_id text unique,
  event_type text not null,
  payload jsonb not null default '{}'::jsonb,
  processed_at timestamptz,
  processing_error text,
  created_at timestamptz not null default now()
);

create table if not exists public.commerce_creator_vault_daily (
  id uuid primary key default gen_random_uuid(),
  creator_id uuid references auth.users(id) on delete cascade,
  world_id uuid references public.creator_worlds(id) on delete cascade,
  day date not null,
  beat_views integer not null default 0,
  preview_plays integer not null default 0,
  checkout_starts integer not null default 0,
  paid_orders integer not null default 0,
  gross_revenue_cents integer not null default 0,
  platform_revenue_cents integer not null default 0,
  creator_net_cents integer not null default 0,
  active_licenses integer not null default 0,
  exclusive_sales integer not null default 0,
  created_at timestamptz not null default now(),
  unique(creator_id, world_id, day)
);

alter table public.commerce_beats enable row level security;
alter table public.commerce_license_tiers enable row level security;
alter table public.commerce_orders enable row level security;
alter table public.commerce_license_agreements enable row level security;
alter table public.commerce_downloads enable row level security;
alter table public.commerce_checkout_events enable row level security;
alter table public.commerce_creator_vault_daily enable row level security;

drop policy if exists "Public can view active beats" on public.commerce_beats;
create policy "Public can view active beats" on public.commerce_beats for select using (status = 'active');

drop policy if exists "Producers manage beats" on public.commerce_beats;
create policy "Producers manage beats" on public.commerce_beats for all using (auth.uid() = producer_id) with check (auth.uid() = producer_id);

drop policy if exists "Public can view active license tiers" on public.commerce_license_tiers;
create policy "Public can view active license tiers" on public.commerce_license_tiers for select using (
  is_active = true and exists (
    select 1 from public.commerce_beats b where b.id = beat_id and b.status = 'active'
  )
);

drop policy if exists "Producers manage license tiers" on public.commerce_license_tiers;
create policy "Producers manage license tiers" on public.commerce_license_tiers for all using (
  exists (select 1 from public.commerce_beats b where b.id = beat_id and b.producer_id = auth.uid())
) with check (
  exists (select 1 from public.commerce_beats b where b.id = beat_id and b.producer_id = auth.uid())
);

drop policy if exists "Buyers view their commerce orders" on public.commerce_orders;
create policy "Buyers view their commerce orders" on public.commerce_orders for select using (auth.uid() = buyer_id);

drop policy if exists "Sellers view their commerce orders" on public.commerce_orders;
create policy "Sellers view their commerce orders" on public.commerce_orders for select using (auth.uid() = seller_id);

drop policy if exists "Buyers view their agreements" on public.commerce_license_agreements;
create policy "Buyers view their agreements" on public.commerce_license_agreements for select using (auth.uid() = buyer_id);

drop policy if exists "Producers view their agreements" on public.commerce_license_agreements;
create policy "Producers view their agreements" on public.commerce_license_agreements for select using (auth.uid() = producer_id);

drop policy if exists "Buyers view their downloads" on public.commerce_downloads;
create policy "Buyers view their downloads" on public.commerce_downloads for select using (auth.uid() = buyer_id and revoked_at is null);

drop policy if exists "Creators view their vault analytics" on public.commerce_creator_vault_daily;
create policy "Creators view their vault analytics" on public.commerce_creator_vault_daily for select using (auth.uid() = creator_id);

create index if not exists commerce_beats_slug_idx on public.commerce_beats(slug);
create index if not exists commerce_beats_world_status_idx on public.commerce_beats(world_id, status);
create index if not exists commerce_license_tiers_beat_idx on public.commerce_license_tiers(beat_id);
create index if not exists commerce_orders_buyer_idx on public.commerce_orders(buyer_id, created_at desc);
create index if not exists commerce_orders_seller_idx on public.commerce_orders(seller_id, created_at desc);
create index if not exists commerce_orders_status_idx on public.commerce_orders(status, created_at desc);
create index if not exists commerce_agreements_order_idx on public.commerce_license_agreements(order_id);
create index if not exists commerce_downloads_order_idx on public.commerce_downloads(order_id);
create index if not exists commerce_checkout_events_order_idx on public.commerce_checkout_events(order_id);
create index if not exists commerce_vault_creator_day_idx on public.commerce_creator_vault_daily(creator_id, day desc);
