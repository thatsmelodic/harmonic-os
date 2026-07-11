-- 2 Harmonic production commerce and content foundation
-- Run through Supabase migrations before enabling live reservations.

create table if not exists public.two_harmonic_collections (
  slug text primary key,
  name text not null,
  status text not null default 'private-preview' check (status in ('private-preview','coming-soon','live','archived')),
  release_date timestamptz,
  private_access_label text not null default 'Enter the private release room.',
  private_access_description text not null default '',
  campaign_video_url text,
  audio_url text,
  settings jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.two_harmonic_garments (
  slug text primary key,
  collection_slug text not null references public.two_harmonic_collections(slug) on delete cascade,
  name text not null,
  price_cents integer not null check (price_cents >= 0),
  image_url text,
  campaign_video_url text,
  audio_url text,
  release_date timestamptz,
  private_access_required boolean not null default true,
  reservations_enabled boolean not null default true,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.two_harmonic_inventory (
  garment_slug text not null references public.two_harmonic_garments(slug) on delete cascade,
  size text not null,
  quantity integer not null default 0 check (quantity >= 0),
  reserved integer not null default 0 check (reserved >= 0 and reserved <= quantity),
  updated_at timestamptz not null default now(),
  primary key (garment_slug, size)
);

create table if not exists public.two_harmonic_private_access (
  id uuid primary key default gen_random_uuid(),
  email text not null,
  collection_slug text not null references public.two_harmonic_collections(slug) on delete cascade,
  user_id uuid references auth.users(id) on delete set null,
  source text not null default 'fashion-house',
  created_at timestamptz not null default now(),
  unique (lower(email), collection_slug)
);

create table if not exists public.two_harmonic_reservations (
  id uuid primary key default gen_random_uuid(),
  garment_slug text not null references public.two_harmonic_garments(slug) on delete restrict,
  size text not null,
  email text not null,
  user_id uuid references auth.users(id) on delete set null,
  unit_price_cents integer not null check (unit_price_cents >= 0),
  status text not null default 'reserved' check (status in ('reserved','checkout-created','paid','expired','cancelled','fulfilled')),
  payment_provider text,
  payment_reference text,
  expires_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.two_harmonic_closet_videos (
  id uuid primary key default gen_random_uuid(),
  garment_slug text not null references public.two_harmonic_garments(slug) on delete cascade,
  user_id uuid references auth.users(id) on delete set null,
  wearer_name text not null,
  city text,
  category text not null default 'Everyday Frequency',
  title text not null,
  video_url text not null,
  thumbnail_url text,
  status text not null default 'pending' check (status in ('pending','approved','rejected','archived')),
  featured boolean not null default false,
  created_at timestamptz not null default now(),
  reviewed_at timestamptz
);

create index if not exists two_harmonic_garments_collection_idx on public.two_harmonic_garments(collection_slug);
create index if not exists two_harmonic_reservations_email_idx on public.two_harmonic_reservations(lower(email));
create index if not exists two_harmonic_closet_status_idx on public.two_harmonic_closet_videos(status, featured, created_at desc);

create or replace function public.reserve_two_harmonic_garment(
  p_garment_slug text,
  p_size text,
  p_email text,
  p_user_id uuid default null,
  p_minutes integer default 20
) returns public.two_harmonic_reservations
language plpgsql
security definer
set search_path = public
as $$
declare
  v_garment public.two_harmonic_garments;
  v_inventory public.two_harmonic_inventory;
  v_reservation public.two_harmonic_reservations;
begin
  select * into v_garment from public.two_harmonic_garments where slug = p_garment_slug for update;
  if not found or not v_garment.reservations_enabled then
    raise exception 'Garment is not available for reservation';
  end if;

  select * into v_inventory from public.two_harmonic_inventory
    where garment_slug = p_garment_slug and size = p_size for update;
  if not found or (v_inventory.quantity - v_inventory.reserved) <= 0 then
    raise exception 'Selected size is sold out';
  end if;

  update public.two_harmonic_inventory
    set reserved = reserved + 1, updated_at = now()
    where garment_slug = p_garment_slug and size = p_size;

  insert into public.two_harmonic_reservations (
    garment_slug, size, email, user_id, unit_price_cents, expires_at
  ) values (
    p_garment_slug, p_size, lower(trim(p_email)), p_user_id, v_garment.price_cents,
    now() + make_interval(mins => greatest(5, least(p_minutes, 60)))
  ) returning * into v_reservation;

  return v_reservation;
end;
$$;

alter table public.two_harmonic_collections enable row level security;
alter table public.two_harmonic_garments enable row level security;
alter table public.two_harmonic_inventory enable row level security;
alter table public.two_harmonic_private_access enable row level security;
alter table public.two_harmonic_reservations enable row level security;
alter table public.two_harmonic_closet_videos enable row level security;

create policy "Public reads active collections" on public.two_harmonic_collections for select using (status <> 'archived');
create policy "Public reads released garments" on public.two_harmonic_garments for select using (true);
create policy "Public reads inventory availability" on public.two_harmonic_inventory for select using (true);
create policy "Public reads approved closet videos" on public.two_harmonic_closet_videos for select using (status = 'approved');
create policy "Users submit closet videos" on public.two_harmonic_closet_videos for insert to authenticated with check (auth.uid() = user_id);
create policy "Users read own reservations" on public.two_harmonic_reservations for select to authenticated using (auth.uid() = user_id);

insert into public.two_harmonic_collections (slug, name, status)
values ('beige-frequency', 'Beige Frequency', 'private-preview')
on conflict (slug) do nothing;

insert into public.two_harmonic_garments (slug, collection_slug, name, price_cents)
values
  ('ivory-frequency-zip', 'beige-frequency', 'Ivory Frequency Zip', 18500),
  ('lavender-frequency-zip', 'beige-frequency', 'Lavender Frequency Zip', 19500)
on conflict (slug) do nothing;

insert into public.two_harmonic_inventory (garment_slug, size, quantity)
select garment_slug, size, quantity from (values
  ('ivory-frequency-zip','S',8),('ivory-frequency-zip','M',12),('ivory-frequency-zip','L',10),('ivory-frequency-zip','XL',5),
  ('lavender-frequency-zip','S',8),('lavender-frequency-zip','M',12),('lavender-frequency-zip','L',10),('lavender-frequency-zip','XL',5)
) as seed(garment_slug,size,quantity)
on conflict (garment_slug,size) do nothing;