import Link from 'next/link';
import { FrequencyDock } from '@/components/FrequencyDock';
import { getCreatorWorldDashboardData, isSupabaseConfigured } from '@/lib/supabase/creator-worlds-server';

export const metadata = {
  title: 'Creator Studio v2 | Harmonic OS',
  description: 'The Creator Studio v2 command center for building, monetizing, and launching creator worlds.',
};

const studioPanels = [
  {
    eyebrow: 'World Identity',
    title: 'Shape the universe',
    body: 'Define the creator name, URL, avatar, banner, story, category, tone, visibility, and launch promise.',
    actions: ['Name', 'Handle', 'Tagline', 'Category', 'Banner', 'Avatar'],
    glow: 'purple',
  },
  {
    eyebrow: 'Room Builder',
    title: 'Compose the map',
    body: 'Add rooms like music, store, videos, community, members, live events, vaults, courses, and AI office.',
    actions: ['Add room', 'Reorder', 'Permissions', 'Effects', 'Preview', 'Publish'],
    glow: 'cyan',
  },
  {
    eyebrow: 'Visual Designer',
    title: 'Tune the frequency',
    body: 'Control fog, glow, particles, snow, rain, petals, camera motion, lighting, time of day, and low-motion accessibility.',
    actions: ['Glow', 'Particles', 'Weather', 'Lighting', 'Motion', 'Season'],
    glow: 'purple',
  },
  {
    eyebrow: 'AI Brain',
    title: 'Train the guide',
    body: 'Build an approval-first world assistant that answers questions, explains products, recommends content, and protects creator intent.',
    actions: ['Personality', 'Knowledge', 'Rules', 'Voice', 'Actions', 'Approvals'],
    glow: 'cyan',
  },
  {
    eyebrow: 'Commerce',
    title: 'Attach the money system',
    body: 'Sell products, memberships, drops, tickets, beat licenses, modules, services, and affiliate-enabled community offers.',
    actions: ['Products', 'Memberships', 'Tickets', 'Licenses', 'Splits', 'Checkout'],
    glow: 'purple',
  },
  {
    eyebrow: 'Analytics',
    title: 'Read the world pulse',
    body: 'Track visits, active members, orders, revenue, platform fee, promoter payout, creator net, and community energy.',
    actions: ['Visits', 'Revenue', 'Pulse', 'Members', 'Orders', 'Trends'],
    glow: 'cyan',
  },
];

const launchChecklist = [
  'World identity complete',
  'At least three rooms active',
  'One monetization path created',
  'AI assistant rules reviewed',
  'Low-motion experience verified',
  'Publish preview approved',
];

function money(cents: number | null | undefined) {
  return `$${(Number(cents ?? 0) / 100).toFixed(2)}`;
}

export default async function CreatorStudioV2Page() {
  const configured = isSupabaseConfigured();
  const data = await getCreatorWorldDashboardData('melodic-universe');
  const analytics = data.analytics[0];
  const live = configured && Boolean(data.world);

  const topStats = [
    { label: 'Studio Mode', value: live ? 'Live' : 'Fallback' },
    { label: 'Rooms', value: String(data.rooms.length) },
    { label: 'Offers', value: String(data.products.length) },
    { label: 'Revenue', value: money(analytics?.gross_revenue_cents) },
  ];

  return (
    <main className="min-h-screen px-6 py-8 pb-28">
      <FrequencyDock />
      <section className="harmonic-container grid gap-5 py-8">
        <article className="rounded-[3.2rem] border border-purple-200/15 bg-[radial-gradient(circle_at_18%_10%,rgba(183,108,255,.32),transparent_36%),radial-gradient(circle_at_80%_0%,rgba(54,178,203,.22),transparent_35%),linear-gradient(135deg,rgba(255,255,255,.06),rgba(0,0,0,.5))] p-5 shadow-purple-glow backdrop-blur-2xl sm:p-8">
          <div className="flex flex-wrap items-start justify-between gap-5">
            <div>
              <p className="text-xs font-black uppercase tracking-[.38em] text-purple-100/45">Command Center</p>
              <h1 className="mt-3 text-5xl font-black tracking-[-.09em] sm:text-7xl">Creator Studio v2</h1>
              <p className="mt-4 max-w-5xl text-sm leading-7 text-purple-100/62 sm:text-base">A creator should not feel like they are filling out boring forms. They should feel like they are composing a living universe: rooms, visuals, AI, commerce, community, analytics, and launch controls in one operating system.</p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link href="/creator-worlds/builder" className="rounded-full bg-purple-300 px-5 py-3 text-sm font-black text-black shadow-purple-glow">Open Builder</Link>
              <Link href="/creator-worlds/melodic-universe" className="rounded-full border border-white/10 px-5 py-3 text-sm font-black text-purple-100/75 hover:bg-white/[.06]">Preview World</Link>
            </div>
          </div>
          <div className="mt-8 grid gap-3 md:grid-cols-4">
            {topStats.map((stat) => (
              <div key={stat.label} className="rounded-2xl border border-white/10 bg-black/30 p-4">
                <p className="text-xs font-black uppercase tracking-[.2em] text-white/35">{stat.label}</p>
                <p className="mt-2 text-3xl font-black tracking-[-.06em] text-purple-100">{stat.value}</p>
              </div>
            ))}
          </div>
        </article>

        <section className="grid gap-4 lg:grid-cols-3">
          {studioPanels.map((panel) => (
            <article key={panel.title} className={`rounded-[2.2rem] border ${panel.glow === 'purple' ? 'border-purple-200/15' : 'border-cyan-200/15'} bg-black/30 p-5 backdrop-blur-2xl`}>
              <p className={`text-xs font-black uppercase tracking-[.28em] ${panel.glow === 'purple' ? 'text-purple-100/50' : 'text-cyan-100/50'}`}>{panel.eyebrow}</p>
              <h2 className="mt-3 text-2xl font-black tracking-[-.06em] text-white/85">{panel.title}</h2>
              <p className="mt-3 text-xs leading-6 text-white/48">{panel.body}</p>
              <div className="mt-5 flex flex-wrap gap-2">
                {panel.actions.map((action) => (
                  <span key={action} className="rounded-full border border-white/10 bg-white/[.035] px-3 py-1 text-[.65rem] font-black uppercase tracking-[.12em] text-white/38">{action}</span>
                ))}
              </div>
            </article>
          ))}
        </section>

        <div className="grid gap-5 xl:grid-cols-[1fr_.8fr]">
          <section className="rounded-[2.4rem] border border-purple-200/15 bg-black/30 p-5 backdrop-blur-2xl">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <p className="text-xs font-black uppercase tracking-[.28em] text-purple-100/50">Live World Rooms</p>
              <span className="rounded-full border border-purple-200/15 px-3 py-1 text-[.65rem] font-black uppercase tracking-[.14em] text-purple-100/55">from Supabase</span>
            </div>
            <div className="mt-5 grid gap-3 md:grid-cols-2">
              {(data.rooms.length ? data.rooms : [{ id: 'fallback-room', name: 'No live rooms yet', room_type: 'setup', access_level: 'setup', description: 'Rooms appear here once the deployed app can read Supabase.' }]).slice(0, 8).map((room: any) => (
                <article key={room.id} className="rounded-2xl border border-white/10 bg-white/[.035] p-4">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <h3 className="text-base font-black text-white/82">{room.name}</h3>
                    <span className="text-[.65rem] font-black uppercase tracking-[.14em] text-purple-100/45">{room.access_level}</span>
                  </div>
                  <p className="mt-2 text-xs font-black uppercase tracking-[.14em] text-white/30">{room.room_type}</p>
                  <p className="mt-3 text-xs leading-6 text-white/48">{room.description}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="rounded-[2.4rem] border border-cyan-200/15 bg-black/30 p-5 backdrop-blur-2xl">
            <p className="text-xs font-black uppercase tracking-[.28em] text-cyan-100/50">Launch Checklist</p>
            <div className="mt-5 grid gap-3">
              {launchChecklist.map((item, index) => (
                <div key={item} className="flex items-center justify-between gap-4 rounded-2xl border border-white/10 bg-white/[.035] p-4">
                  <span className="text-xs leading-6 text-white/55">{item}</span>
                  <span className="grid h-7 w-7 place-items-center rounded-full bg-cyan-200/15 text-xs font-black text-cyan-100/70">{index + 1}</span>
                </div>
              ))}
            </div>
            <div className="mt-5 rounded-2xl border border-white/10 bg-[linear-gradient(135deg,rgba(54,178,203,.14),rgba(183,108,255,.08))] p-4">
              <h3 className="text-lg font-black text-white/82">Publish Philosophy</h3>
              <p className="mt-3 text-xs leading-6 text-white/48">The creator should approve every meaningful AI or commerce action. Harmonic can suggest, preview, explain, and stage — but the creator chooses the frequency.</p>
            </div>
          </section>
        </div>
      </section>
    </main>
  );
}
