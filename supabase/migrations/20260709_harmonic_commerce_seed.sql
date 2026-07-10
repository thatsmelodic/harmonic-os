-- Harmonic Commerce starter catalog seed
-- Run after 20260709_harmonic_commerce_beat_licensing.sql

with melodic_world as (
  select id from public.creator_worlds where slug = 'melodic-universe' limit 1
)
insert into public.commerce_beats (
  world_id, slug, title, producer_name, bpm, musical_key, genre, mood, tags, cover_url, status, is_exclusive_available, metadata
)
select melodic_world.id, beat.slug, beat.title, 'Melodic', beat.bpm, beat.musical_key, beat.genre, beat.mood, beat.tags, beat.cover_url, 'active', true, beat.metadata::jsonb
from melodic_world
cross join (values
  ('lift-u-up', 'Lift U Up', 92, 'A minor', 'R&B', 'warm, emotional, hopeful', array['rnb','soul','uplift','melodic'], '/covers/lift-u-up.jpg', '{"featured":true,"audioPending":true}'),
  ('better-luck-next-time', 'Better Luck Next Time', 80, 'E minor', 'R&B', 'late-night, reflective, toxic love', array['rnb','late-night','toxic-love'], '/covers/better-luck-next-time.jpg', '{"featured":true,"audioPending":true}'),
  ('save-the-apology', 'Save The Apology', 84, 'D minor', 'R&B', 'hurt, detached, cinematic', array['rnb','heartbreak','cinematic'], '/covers/save-the-apology.jpg', '{"featured":false,"audioPending":true}'),
  ('barkin-n-bitin', 'Barkin N Bitin', 170, 'F minor', 'Trap', 'aggressive, dark, energetic', array['trap','170bpm','dark','bounce'], '/covers/barkin-n-bitin.jpg', '{"featured":true,"audioPending":true}'),
  ('big-guapo', 'Big Guapo', 168, 'G minor', 'Trap', 'flex, villain, confident', array['trap','flex','villain'], '/covers/big-guapo.jpg', '{"featured":true,"audioPending":true}')
) as beat(slug,title,bpm,musical_key,genre,mood,tags,cover_url,metadata)
on conflict (slug) do update set
  title = excluded.title,
  bpm = excluded.bpm,
  musical_key = excluded.musical_key,
  genre = excluded.genre,
  mood = excluded.mood,
  tags = excluded.tags,
  cover_url = excluded.cover_url,
  status = 'active',
  is_exclusive_available = true,
  metadata = excluded.metadata,
  updated_at = now();

with tier_data as (
  select * from (values
    ('free-tagged','Free Tagged Preview',0,array['Tagged MP3 preview'],array['Non-commercial writing and demo use only'],'{"streams":0,"videos":0,"commercial":false}'::jsonb,'For demos and writing only. No public monetized release.'),
    ('basic-lease','Basic Lease',3500,array['Untagged MP3','License PDF'],array['Commercial streaming','Monetized social use','Credit required'],'{"streams":50000,"videos":1,"exclusive":false}'::jsonb,'Affordable commercial lease while producer retains ownership.'),
    ('premium-lease','Premium Lease',7500,array['Untagged WAV','Untagged MP3','License PDF'],array['Commercial streaming','Music video use','Paid performance use'],'{"streams":250000,"videos":2,"exclusive":false}'::jsonb,'Higher quality lease with WAV delivery and stronger usage limits.'),
    ('unlimited-lease','Unlimited Lease',15000,array['Untagged WAV','Untagged MP3','Trackout stems when available','License PDF'],array['Unlimited commercial streaming','Unlimited music videos','Paid performance use'],'{"streams":null,"videos":null,"exclusive":false}'::jsonb,'Best non-exclusive license for artists expecting growth.'),
    ('exclusive-rights','Exclusive Rights',50000,array['Untagged WAV','Untagged MP3','Trackout stems','Exclusive agreement PDF'],array['Exclusive commercial use','Unlimited streams','Beat removed from public sale'],'{"streams":null,"videos":null,"exclusive":true}'::jsonb,'Exclusive buyer receives sole commercial use after purchase.')
  ) as t(tier_key,name,price_cents,files_included,rights_granted,usage_limits,agreement_summary)
)
insert into public.commerce_license_tiers (
  beat_id,tier_key,name,price_cents,currency,files_included,rights_granted,usage_limits,agreement_summary,is_active
)
select b.id,t.tier_key,t.name,t.price_cents,'usd',t.files_included,t.rights_granted,t.usage_limits,t.agreement_summary,true
from public.commerce_beats b
cross join tier_data t
where b.slug in ('lift-u-up','better-luck-next-time','save-the-apology','barkin-n-bitin','big-guapo')
on conflict (beat_id,tier_key) do update set
  name = excluded.name,
  price_cents = excluded.price_cents,
  files_included = excluded.files_included,
  rights_granted = excluded.rights_granted,
  usage_limits = excluded.usage_limits,
  agreement_summary = excluded.agreement_summary,
  is_active = true,
  updated_at = now();

with melodic_world as (
  select id from public.creator_worlds where slug = 'melodic-universe' limit 1
)
insert into public.commerce_creator_vault_daily (
  creator_id,world_id,day,beat_views,preview_plays,checkout_starts,paid_orders,gross_revenue_cents,platform_revenue_cents,creator_net_cents,active_licenses,exclusive_sales
)
select null, melodic_world.id, current_date, 312, 184, 12, 4, 33500, 3350, 28475, 4, 0
from melodic_world
on conflict (creator_id,world_id,day) do nothing;
