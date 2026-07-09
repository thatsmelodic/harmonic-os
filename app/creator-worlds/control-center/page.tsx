import Link from 'next/link';
import { FrequencyDock } from '@/components/FrequencyDock';

export const metadata = {
  title: 'Creator Worlds Control Center | Harmonic OS',
  description: 'Creator Worlds control center for world identity, rooms, monetization readiness, approvals, effects, and launch wiring.',
};

const worldProfile = {
  name: 'Melodic Universe',
  handle: '@thatsmelodic',
  status: 'Launch Testing',
  archetype: 'Music, fashion, food, basketball, community, and creator economy hub',
  philosophy: 'Choose your frequency. Build a world that moves like the creator behind it.',
};

const controlMetrics = [
  { label: 'World Readiness', value: '78%', note: 'Foundation is live. Payments, auth roles, database persistence, and real approvals are next.' },
  { label: 'Revenue Paths', value: '10+', note: 'Memberships, drops, tickets, licenses, modules, services, affiliates, and marketplace fees.' },
  { label: 'Rooms Planned', value: '7', note: 'Studio, Plaza, Vault, Showroom, Event Stage, Collab Portal, AI Office.' },
  { label: 'Approval Items', value: '6', note: 'AI, builder, commerce, community, event, and world-effect suggestions.' },
];

const rooms = [
  { title: 'Studio Listening Room', access: 'Public', purpose: 'Songs, previews, lyrics, voice notes, reactions, and listening parties.', next: 'Connect media uploads and timestamp reactions.' },
  { title: 'Community Plaza', access: 'Public', purpose: 'Announcements, public chat, welcome flow, quests, roles, and inclusive onboarding.', next: 'Connect authenticated member profiles.' },
  { title: 'Members Lounge', access: 'Members', purpose: 'Private community, polls, behind-the-scenes, early decisions, and supporter badges.', next: 'Connect membership billing and access control.' },
  { title: 'Premium Vault', access: 'Premium', purpose: 'Unreleased songs, private videos, files, early links, exclusive media, and paid content.', next: 'Connect purchases and vault unlocks.' },
  { title: 'Drop Showroom', access: 'Public / Members', purpose: '2 Harmonic drops, product stories, colorway voting, preorders, and checkout paths.', next: 'Connect Stripe checkout and inventory.' },
  { title: 'Event Stage', access: 'Ticketed', purpose: 'Listening parties, Fried Em runs, food events, launch days, and seasonal moments.', next: 'Connect event tickets and live rooms.' },
  { title: 'Collab Portal', access: 'Creators', purpose: 'Cross-world traffic, affiliate attribution, shared drops, and creator partnerships.', next: 'Connect split rules and referral tracking.' },
];

const monetization = [
  { title: 'Platform Fee', status: 'Modeled', detail: 'Harmonic earns a fee when sales happen through the platform.' },
  { title: 'Creator Seller Share', status: 'Modeled', detail: 'Creator receives seller net after platform, promoter, collaborator, and processing rules.' },
  { title: 'Community Promotion Share', status: 'Modeled', detail: 'Fans or communities can earn commissions when tracked promotion converts.' },
  { title: 'Memberships', status: 'Needs Stripe', detail: 'Recurring room access, vault access, private content, and premium supporter benefits.' },
  { title: 'Drops + Tickets', status: 'Needs Checkout', detail: 'Physical products, events, limited rooms, and ticketed experiences.' },
  { title: 'Licenses + Modules', status: 'Needs Marketplace', detail: 'Beat licenses, world themes, templates, AI personalities, and module sales.' },
];

const approvalQueue = [
  { title: 'Publish Drop Showroom', system: 'Commerce', action: 'Preview checkout room, inventory, price, platform fee, and drop effects.' },
  { title: 'Open Members Lounge', system: 'Community', action: 'Preview membership perks, rules, roles, and access requirements.' },
  { title: 'Activate Commerce Storm', system: 'World FX', action: 'Preview fireworks, store glow, crowd density, and low-motion fallback.' },
  { title: 'Launch Affiliate Campaign', system: 'Economy', action: 'Preview promoter split, tracking link, abuse guardrails, and dashboard reporting.' },
  { title: 'Create Media Premiere', system: 'Interactive Media', action: 'Preview watch room, timestamp reactions, voice notes, and AI feedback summary.' },
  { title: 'Enable Premium Vault', system: 'Membership', action: 'Preview vault content, unlock rules, paid access, and member badge.' },
];

const effects = [
  'Commerce Storm: store lights pulse when sales spike.',
  'Referral Ripple: promoter room sends visible ripple to seller world after conversion.',
  'Membership Aura: members lounge unlocks with supporter badge animation.',
  'Seasonal Weather: rain, leaves, snow, petals, fog, and holiday overlays.',
  'Crowd Intelligence: room activity increases glow, ambience, and crowd density.',
  'Portal Surge: collab portal intensifies during cross-world events.',
];

const productionWiring = [
  'Supabase schema: worlds, rooms, products, orders, memberships, referrals, events, approvals.',
  'Stripe Checkout: products, memberships, tickets, receipts, refunds, and customer portal.',
  'Stripe Connect: creator payout accounts, payout schedules, platform fee rules.',
  'Auth + roles: creator, fan, member, premium, moderator, collaborator, admin.',
  'Approval actions: preview, approve, edit, reject, publish, rollback.',
  'Analytics: revenue, conversion source, traffic, active rooms, community pulse, retention.',
];

export default function CreatorWorldsControlCenterPage() {
  return (
    <main className="min-h-screen px-6 py-8 pb-28">
      <FrequencyDock />
      <section className="harmonic-container grid gap-5 py-8">
        <article className="rounded-[2.8rem] border border-purple-200/15 bg-[linear-gradient(135deg,rgba(183,108,255,.18),rgba(54,178,203,.08),rgba(0,0,0,.42))] p-5 shadow-purple-glow backdrop-blur-2xl sm:p-7">
          <div className="flex flex-wrap items-start justify-between gap-5">
            <div>
              <p className="text-xs font-black uppercase tracking-[.38em] text-purple-100/45">Creator Worlds Command</p>
              <h1 className="mt-3 text-5xl font-black tracking-[-.09em] sm:text-7xl">Control Center</h1>
              <p className="mt-4 max-w-5xl text-sm leading-7 text-purple-100/62 sm:text-base">{worldProfile.name} is in {worldProfile.status}. This is the management surface for rooms, approvals, monetization, effects, and production wiring.</p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link href="/launch-lab" className="rounded-full bg-purple-300 px-5 py-3 text-sm font-black text-black shadow-purple-glow">Launch Lab</Link>
              <Link href="/creator-worlds" className="rounded-full border border-white/10 px-5 py-3 text-sm font-black text-purple-100/75 hover:bg-white/[.06]">Creator Worlds</Link>
            </div>
          </div>
          <div className="mt-6 rounded-2xl border border-white/10 bg-black/25 p-4"><p className="text-xs font-black uppercase tracking-[.2em] text-white/35">World Identity</p><p className="mt-2 text-xl font-black text-white/85">{worldProfile.handle}</p><p className="mt-2 text-sm leading-7 text-white/55">{worldProfile.archetype}</p><p className="mt-2 text-sm leading-7 text-purple-100/58">{worldProfile.philosophy}</p></div>
          <div className="mt-6 grid gap-3 md:grid-cols-4">{controlMetrics.map((metric) => <Stat key={metric.label} {...metric} />)}</div>
        </article>

        <article className="rounded-[2rem] border border-cyan-200/15 bg-black/30 p-5 backdrop-blur-2xl">
          <p className="text-xs font-black uppercase tracking-[.28em] text-cyan-100/50">World Rooms</p>
          <div className="mt-5 grid gap-4 xl:grid-cols-3">{rooms.map((room) => <section key={room.title} className="rounded-2xl border border-white/10 bg-white/[.035] p-4"><div className="flex flex-wrap items-center justify-between gap-3"><h2 className="text-lg font-black text-white/82">{room.title}</h2><span className="rounded-full border border-cyan-200/15 px-3 py-1 text-[.65rem] font-black uppercase tracking-[.14em] text-cyan-100/55">{room.access}</span></div><p className="mt-3 text-xs leading-6 text-white/48">{room.purpose}</p><p className="mt-3 text-xs leading-6 text-cyan-100/52">Next: {room.next}</p></section>)}</div>
        </article>

        <div className="grid gap-5 xl:grid-cols-2">
          <article className="rounded-[2rem] border border-purple-200/15 bg-black/30 p-5 backdrop-blur-2xl"><p className="text-xs font-black uppercase tracking-[.28em] text-purple-100/50">Monetization Control</p><div className="mt-4 grid gap-3">{monetization.map((item) => <section key={item.title} className="rounded-xl border border-white/10 bg-white/[.035] p-3"><div className="flex flex-wrap items-center justify-between gap-2"><strong className="text-sm text-white/80">{item.title}</strong><span className="text-[.65rem] font-black uppercase tracking-[.14em] text-purple-100/45">{item.status}</span></div><p className="mt-2 text-xs leading-6 text-white/48">{item.detail}</p></section>)}</div></article>
          <article className="rounded-[2rem] border border-cyan-200/15 bg-black/30 p-5 backdrop-blur-2xl"><p className="text-xs font-black uppercase tracking-[.28em] text-cyan-100/50">Approval Queue</p><div className="mt-4 grid gap-3">{approvalQueue.map((item) => <section key={item.title} className="rounded-xl border border-white/10 bg-white/[.035] p-3"><div className="flex flex-wrap items-center justify-between gap-2"><strong className="text-sm text-white/80">{item.title}</strong><span className="text-[.65rem] font-black uppercase tracking-[.14em] text-cyan-100/45">{item.system}</span></div><p className="mt-2 text-xs leading-6 text-white/48">{item.action}</p></section>)}</div></article>
        </div>

        <div className="grid gap-5 xl:grid-cols-2">
          <article className="rounded-[2rem] border border-purple-200/15 bg-black/30 p-5 backdrop-blur-2xl"><p className="text-xs font-black uppercase tracking-[.28em] text-purple-100/50">Immersive Effects Queue</p><div className="mt-4 grid gap-3">{effects.map((item) => <p key={item} className="rounded-xl border border-white/10 bg-white/[.035] p-3 text-xs leading-6 text-white/50">{item}</p>)}</div></article>
          <article className="rounded-[2rem] border border-cyan-200/15 bg-black/30 p-5 backdrop-blur-2xl"><p className="text-xs font-black uppercase tracking-[.28em] text-cyan-100/50">Production Wiring</p><div className="mt-4 grid gap-3">{productionWiring.map((item) => <p key={item} className="rounded-xl border border-white/10 bg-white/[.035] p-3 text-xs leading-6 text-white/50">{item}</p>)}</div></article>
        </div>
      </section>
    </main>
  );
}

function Stat({ label, value, note }: { label: string; value: string; note: string }) {
  return <div className="rounded-2xl border border-white/10 bg-black/30 p-4"><p className="text-xs font-black uppercase tracking-[.2em] text-white/35">{label}</p><p className="mt-2 text-3xl font-black tracking-[-.06em] text-purple-100">{value}</p><p className="mt-2 text-xs leading-6 text-white/45">{note}</p></div>;
}
