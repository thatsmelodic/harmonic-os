-- Creator Worlds starter seed
-- Run after 20260709_creator_worlds_platform_core.sql succeeds.
-- Safe to rerun. Seeds Melodic Universe, starter rooms, monetization items, AI approvals, events, and analytics.

insert into public.creator_worlds (
  slug,
  name,
  handle,
  tagline,
  status,
  visibility,
  primary_color,
  secondary_color,
  atmosphere
) values (
  'melodic-universe',
  'Melodic Universe',
  '@thatsmelodic',
  'One creator. Many frequencies. Choose your frequency.',
  'published',
  'public',
  '#b76cff',
  '#36b2cb',
  'cinematic purple-neon living world'
)
on conflict (slug) do update set
  name = excluded.name,
  handle = excluded.handle,
  tagline = excluded.tagline,
  status = excluded.status,
  visibility = excluded.visibility,
  primary_color = excluded.primary_color,
  secondary_color = excluded.secondary_color,
  atmosphere = excluded.atmosphere,
  updated_at = now();

with w as (
  select id from public.creator_worlds where slug = 'melodic-universe'
)
insert into public.creator_world_rooms (
  world_id,
  slug,
  name,
  room_type,
  access_level,
  description,
  effect_preset,
  sort_order,
  is_active
)
select w.id, room.slug, room.name, room.room_type, room.access_level, room.description, room.effect_preset, room.sort_order, true
from w
cross join (values
  ('studio-listening-room', 'Studio Listening Room', 'studio', 'public', 'Songs, previews, lyrics, voice notes, timestamp reactions, and listening parties.', 'media-premiere-pulse', 10),
  ('community-plaza', 'Community Plaza', 'community', 'public', 'Inclusive public hub for announcements, roles, quests, welcomes, and community pulse.', 'crowd-intelligence', 20),
  ('members-lounge', 'Members Lounge', 'community', 'members', 'Private room for supporters, polls, behind-the-scenes posts, early decisions, and badges.', 'membership-aura', 30),
  ('premium-vault', 'Premium Vault', 'vault', 'premium', 'Unreleased music, private videos, downloadable files, early links, and paid unlocks.', 'vault-glow', 40),
  ('drop-showroom', 'Drop Showroom', 'storefront', 'public', '2 Harmonic drops, lookbooks, colorway voting, inventory, preorders, and checkout paths.', 'commerce-storm', 50),
  ('event-stage', 'Event Stage', 'event', 'ticketed', 'Listening parties, Fried Em runs, food events, launch days, and seasonal experiences.', 'drop-launch-sequence', 60),
  ('collab-portal', 'Collab Portal', 'portal', 'creator', 'Cross-world traffic, affiliate attribution, shared drops, creator partnerships, and revenue splits.', 'referral-ripple', 70),
  ('ai-office', 'AI Office', 'ai', 'creator', 'Approval-first AI suggestions, previews, risk notes, content guidance, and world strategy.', 'ai-director-glow', 80)
) as room(slug, name, room_type, access_level, description, effect_preset, sort_order)
on conflict (world_id, slug) do update set
  name = excluded.name,
  room_type = excluded.room_type,
  access_level = excluded.access_level,
  description = excluded.description,
  effect_preset = excluded.effect_preset,
  sort_order = excluded.sort_order,
  is_active = true,
  updated_at = now();

with w as (
  select id from public.creator_worlds where slug = 'melodic-universe'
)
insert into public.creator_products (
  world_id,
  title,
  description,
  product_type,
  status,
  price_cents,
  currency,
  inventory,
  platform_fee_bps,
  metadata
)
select w.id, product.title, product.description, product.product_type, product.status, product.price_cents, 'usd', product.inventory, product.platform_fee_bps, product.metadata::jsonb
from w
cross join (values
  ('Frequency Pass Membership', 'Monthly supporter pass for members lounge, private drops, early content, and premium community access.', 'membership', 'active', 999, null, 1000, '{"unlocks":["members-lounge","supporter-badge","early-drops"]}'),
  ('Fall Masterpiece Hoodie Drop', '2 Harmonic fall hoodie showroom item for preorder testing and drop storytelling.', 'physical-product', 'draft', 8500, 60, 800, '{"sizes":["S","M","L"],"world":"2harmonic","drop":"fall-masterpiece"}'),
  ('Basic Beat License', 'Starter beat license product for testing music commerce and downloadable licensing.', 'license', 'draft', 3500, null, 1200, '{"license":"basic","delivery":"digital"}'),
  ('Fried Em Live Run Ticket', 'Ticketed event product for basketball content, live runs, and replay access.', 'ticket', 'draft', 1500, 100, 1000, '{"world":"fried-em","access":"event-stage"}'),
  ('Creator World Theme Pack', 'Installable world style pack for marketplace and module-store testing.', 'module', 'draft', 2500, null, 1500, '{"module":"theme","installable":true}')
) as product(title, description, product_type, status, price_cents, inventory, platform_fee_bps, metadata)
on conflict do nothing;

with w as (
  select id from public.creator_worlds where slug = 'melodic-universe'
)
insert into public.creator_ai_approvals (
  world_id,
  suggestion_type,
  title,
  preview,
  explain_why,
  risk_note,
  affected_systems,
  status
)
select w.id, approval.suggestion_type, approval.title, approval.preview, approval.explain_why, approval.risk_note, approval.affected_systems, approval.status
from w
cross join (values
  ('commerce', 'Turn next upload into a drop event', 'Attach hoodie showroom, countdown, community announcement, and Commerce Storm effect.', 'Content momentum converts better when purchase paths are built into the world experience.', 'Needs inventory, price, and checkout confirmation before publishing.', array['commerce','world-effects','community'], 'preview'),
  ('economy', 'Open community promoter campaign', 'Generate referral codes for supporters and track sales from posts, rooms, and portals.', 'Your community becomes a sales force while Harmonic earns platform fees on attributed sales.', 'Needs clear split rules and fraud limits.', array['economy','community','analytics'], 'draft'),
  ('community', 'Create premium vault membership', 'Unlock private media, voice notes, early drop links, and member-only event access.', 'Recurring revenue stabilizes creator income beyond one-time drops.', 'Needs consistent content cadence.', array['community','commerce','media'], 'preview'),
  ('world-effect', 'Connect purchases to world reactions', 'Trigger fireworks, city light pulse, referral ripple, and supporter badges after purchases.', 'Commerce feels emotional, visible, and shareable when the world reacts.', 'Needs low-motion accessibility controls.', array['world-engine','effects','accessibility'], 'draft')
) as approval(suggestion_type, title, preview, explain_why, risk_note, affected_systems, status)
on conflict do nothing;

with w as (
  select id from public.creator_worlds where slug = 'melodic-universe'
), plaza as (
  select r.id from public.creator_world_rooms r join w on r.world_id = w.id where r.slug = 'community-plaza' limit 1
)
insert into public.creator_world_events (
  world_id,
  room_id,
  event_type,
  title,
  description,
  effect_payload,
  starts_at
)
select w.id, plaza.id, 'drop-launch', 'Melodic Universe Alpha Launch', 'Starter launch event for testing world reactions, rooms, commerce hooks, and community pulse.', '{"effect":"drop-launch-sequence","palette":"purple-neon","lowMotion":true}'::jsonb, now()
from w, plaza
where not exists (
  select 1 from public.creator_world_events e where e.world_id = w.id and e.title = 'Melodic Universe Alpha Launch'
);

with w as (
  select id from public.creator_worlds where slug = 'melodic-universe'
)
insert into public.creator_world_analytics_daily (
  world_id,
  day,
  visits,
  active_members,
  orders,
  gross_revenue_cents,
  platform_revenue_cents,
  promoter_payout_cents,
  creator_net_cents,
  approval_count,
  community_pulse
)
select w.id, current_date, 128, 24, 3, 11499, 1150, 575, 9774, 4, 72
from w
on conflict (world_id, day) do update set
  visits = excluded.visits,
  active_members = excluded.active_members,
  orders = excluded.orders,
  gross_revenue_cents = excluded.gross_revenue_cents,
  platform_revenue_cents = excluded.platform_revenue_cents,
  promoter_payout_cents = excluded.promoter_payout_cents,
  creator_net_cents = excluded.creator_net_cents,
  approval_count = excluded.approval_count,
  community_pulse = excluded.community_pulse;
