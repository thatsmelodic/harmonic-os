import Link from 'next/link';
import { FrequencyDock } from '@/components/FrequencyDock';
import { getCreatorWorldDashboardData, isSupabaseConfigured } from '@/lib/supabase/creator-worlds-server';

export const metadata = {
  title: 'Creator Studio v3 | Harmonic OS',
  description: 'Creator Studio v3 world composer for live room sequencing, preview, AI training, commerce, analytics, and publishing.',
};

const composerModules = [
  { key: '01', title: 'Identity Layer', icon: '🌍', body: 'Set the world promise: name, handle, avatar, banner, categories, intro copy, and public frequency.', status: 'Foundation' },
  { key: '02', title: 'Room Sequencer', icon: '🧩', body: 'Arrange rooms like notes on a timeline. Studio, store, vault, community, events, portals, and AI office become a playable map.', status: 'Composer' },
  { key: '03', title: 'Live Preview', icon: '👁️', body: 'Preview what visitors feel before publishing: hero, room cards, transitions, atmosphere, CTAs, and monetization rails.', status: 'Visual' },
  { key: '04', title: 'AI Trainer', icon: '🤖', body: 'Control the assistant personality, permissions, knowledge, approval mode, risk notes, and what it can recommend.', status: 'Approval-first' },
  { key: '05', title: 'Commerce Builder', icon: '💰', body: 'Attach products, memberships, tickets, licenses, modules, bundles, affiliate codes, and platform revenue splits to rooms.', status: 'Capital' },
  { key: '06', title: 'Pulse Analytics', icon: '📊', body: 'Track world health like a frequency board: visits, revenue, orders, active members, AI approvals, and community pulse.', status: 'Live' },
  { key: '07', title: 'Publish Rail', icon: '🚀', body: 'Stage, preview, approve, announce, launch, and roll back worlds without breaking the creator experience.', status: 'Launch' },
];

const worldTimeline = [
  { room: 'Intro Gate', type: 'identity', note: 'Visitor lands in the world and learns the frequency.' },
  { room: 'Studio Listening Room', type: 'music', note: 'Music, voice notes, media premieres, and timestamp reactions.' },
  { room: 'Community Plaza', type: 'community', note: 'Announcements, roles, quests, messages, and live pulse.' },
  { room: 'Drop Showroom', type: 'commerce', note: 'Products, merch, licenses, tickets, and membership offers.' },
  { room: 'AI Office', type: 'assistant', note: 'Creator-approved assistant guidance and recommendations.' },
  { room: 'Launch Stage', type: 'event', note: 'Seasonal moments, premieres, live events, and world reactions.' },
];

const visualControls = ['Purple Neon', 'Cyan Accent', 'Petals', 'Snow', 'Rain', 'Fog', 'Glow', 'Low Motion', 'Holiday FX', 'Launch Flash'];
const aiRules = ['Approval first', 'Never autopilot', 'Explain why', 'Show risk', 'Respect creator tone', 'No hidden publishing'];

function money(cents: number | null | undefined) {
  return `$${(Number(cents ?? 0) / 100).toFixed(2)}`;
}

export default async function CreatorStudioV3Page() {
  const configured = isSupabaseConfigured();
  const data = await getCreatorWorldDashboardData('melodic-universe');
  const analytics = data.analytics[0];
  const live = configured && Boolean(data.world);

  const pulse = [
    { label: 'Live Mode', value: live ? 'Connected' : 'Fallback' },
    { label: 'Rooms', value: String(data.rooms.length) },
    { label: 'Offers', value: String(data.products.length) },
    { label: 'AI Items', value: String(data.approvals.length) },
    { label: 'Revenue', value: money(analytics?.gross_revenue_cents) },
    { label: 'Community Pulse', value: `${analytics?.community_pulse ?? 0}%` },
  ];

  return (
    <main className="min-h-screen px-6 py-8 pb-28">
      <FrequencyDock />
      <section className="harmonic-container grid gap-5 py-8">
        <article className="overflow-hidden rounded-[3.4rem] border border-purple-200/15 bg-[radial-gradient(circle_at_18%_8%,rgba(183,108,255,.34),transparent_34%),radial-gradient(circle_at_82%_2%,rgba(54,178,203,.24),transparent_35%),radial-gradient(circle_at_50%_100%,rgba(255,180,90,.08),transparent_36%),linear-gradient(135deg,rgba(255,255,255,.06),rgba(0,0,0,.52))] p-5 shadow-purple-glow backdrop-blur-2xl sm:p-8">
          <div className="flex flex-wrap items-start justify-between gap-5">
            <div>
              <p className="text-xs font-black uppercase tracking-[.38em] text-purple-100/45">World Composer</p>
              <h1 className="mt-3 text-5xl font-black tracking-[-.09em] sm:text-7xl">Creator Studio v3</h1>
              <p className="mt-4 max-w-5xl text-sm leading-7 text-purple-100/62 sm:text-base">GarageBand for creator worlds. A creator composes the map, visuals, AI, commerce, community, analytics, and launch behavior like arranging a song — every room is a note, every action is a frequency.</p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link href="/creator-studio-v2" className="rounded-full border border-white/10 px-5 py-3 text-sm font-black text-purple-100/75 hover:bg-white/[.06]">Studio v2</Link>
              <Link href="/creator-worlds/melodic-universe" className="rounded-full bg-purple-300 px-5 py-3 text-sm font-black text-black shadow-purple-glow">Preview World</Link>
            </div>
          </div>
          <div className="mt-8 grid gap-3 md:grid-cols-3 xl:grid-cols-6">
            {pulse.map((item) => <Pulse key={item.label} {...item} />)}
          </div>
        </article>

        <section className="grid gap-4 lg:grid-cols-7">
          {composerModules.map((module) => (
            <article key={module.title} className="rounded-[2rem] border border-white/10 bg-black/30 p-4 backdrop-blur-2xl lg:col-span-1">
              <div className="flex items-center justify-between gap-3">
                <span className="text-2xl">{module.icon}</span>
                <span className="rounded-full border border-white/10 bg-white/[.035] px-2 py-1 text-[.58rem] font-black uppercase tracking-[.12em] text-white/35">{module.key}</span>
              </div>
              <p className="mt-4 text-[.65rem] font-black uppercase tracking-[.18em] text-purple-100/45">{module.status}</p>
              <h2 className="mt-2 text-lg font-black tracking-[-.04em] text-white/85">{module.title}</h2>
              <p className="mt-3 text-xs leading-6 text-white/45">{module.body}</p>
            </article>
          ))}
        </section>

        <div className="grid gap-5 xl:grid-cols-[1.1fr_.9fr]">
          <section className="rounded-[2.6rem] border border-cyan-200/15 bg-black/30 p-5 backdrop-blur-2xl">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <p className="text-xs font-black uppercase tracking-[.28em] text-cyan-100/50">Room Sequencer</p>
              <span className="rounded-full border border-cyan-200/15 px-3 py-1 text-[.65rem] font-black uppercase tracking-[.14em] text-cyan-100/55">Drag-and-drop model</span>
            </div>
            <div className="mt-5 grid gap-3">
              {worldTimeline.map((item, index) => (
                <article key={item.room} className="grid gap-3 rounded-2xl border border-white/10 bg-white/[.035] p-4 md:grid-cols-[3rem_1fr_auto] md:items-center">
                  <div className="grid h-12 w-12 place-items-center rounded-2xl bg-cyan-200/15 text-sm font-black text-cyan-100/80">{index + 1}</div>
                  <div>
                    <h3 className="text-base font-black text-white/85">{item.room}</h3>
                    <p className="mt-2 text-xs leading-6 text-white/45">{item.note}</p>
                  </div>
                  <span className="rounded-full border border-white/10 px-3 py-1 text-[.65rem] font-black uppercase tracking-[.14em] text-white/38">{item.type}</span>
                </article>
              ))}
            </div>
          </section>

          <section className="rounded-[2.6rem] border border-purple-200/15 bg-black/30 p-5 backdrop-blur-2xl">
            <p className="text-xs font-black uppercase tracking-[.28em] text-purple-100/50">Live Preview Stack</p>
            <div className="mt-5 rounded-[2rem] border border-white/10 bg-[radial-gradient(circle_at_30%_10%,rgba(183,108,255,.2),transparent_42%),linear-gradient(135deg,rgba(255,255,255,.05),rgba(0,0,0,.5))] p-5">
              <p className="text-[.65rem] font-black uppercase tracking-[.18em] text-white/35">Previewing</p>
              <h2 className="mt-2 text-3xl font-black tracking-[-.07em] text-white/88">Melodic Universe</h2>
              <p className="mt-3 text-xs leading-6 text-white/48">One creator. Many frequencies. Choose your frequency.</p>
              <div className="mt-5 grid gap-2 sm:grid-cols-2">
                {(data.rooms.length ? data.rooms : []).slice(0, 4).map((room: any) => (
                  <div key={room.id} className="rounded-xl border border-white/10 bg-black/30 p-3">
                    <p className="text-xs font-black text-purple-100/70">{room.name}</p>
                    <p className="mt-1 text-[.65rem] uppercase tracking-[.12em] text-white/30">{room.room_type}</p>
                  </div>
                ))}
                {!data.rooms.length && <p className="text-xs leading-6 text-white/45">Live rooms will render here after Supabase is readable from deployment.</p>}
              </div>
            </div>
            <div className="mt-5 flex flex-wrap gap-2">
              {visualControls.map((control) => <Chip key={control}>{control}</Chip>)}
            </div>
          </section>
        </div>

        <div className="grid gap-5 xl:grid-cols-3">
          <section className="rounded-[2.4rem] border border-purple-200/15 bg-black/30 p-5 backdrop-blur-2xl">
            <p className="text-xs font-black uppercase tracking-[.28em] text-purple-100/50">AI Trainer</p>
            <h2 className="mt-3 text-2xl font-black tracking-[-.06em] text-white/85">Approval-first assistant</h2>
            <p className="mt-3 text-xs leading-6 text-white/48">The AI can suggest, guide, explain, and stage actions — but the creator approves meaningful changes before publish.</p>
            <div className="mt-5 flex flex-wrap gap-2">{aiRules.map((rule) => <Chip key={rule}>{rule}</Chip>)}</div>
          </section>

          <section className="rounded-[2.4rem] border border-cyan-200/15 bg-black/30 p-5 backdrop-blur-2xl">
            <p className="text-xs font-black uppercase tracking-[.28em] text-cyan-100/50">Commerce Builder</p>
            <div className="mt-5 grid gap-3">
              {(data.products.length ? data.products : [{ id: 'fallback-offer', title: 'Membership / product offers', product_type: 'setup', status: 'draft', price_cents: 0 }]).slice(0, 4).map((product: any) => (
                <div key={product.id} className="rounded-2xl border border-white/10 bg-white/[.035] p-4">
                  <div className="flex items-center justify-between gap-4"><p className="text-sm font-black text-white/80">{product.title}</p><p className="text-sm font-black text-cyan-100/70">{money(product.price_cents)}</p></div>
                  <p className="mt-2 text-[.65rem] font-black uppercase tracking-[.14em] text-white/30">{product.product_type} • {product.status}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-[2.4rem] border border-purple-200/15 bg-black/30 p-5 backdrop-blur-2xl">
            <p className="text-xs font-black uppercase tracking-[.28em] text-purple-100/50">Publish Rail</p>
            <div className="mt-5 grid gap-3">
              {['Stage changes', 'Preview world', 'AI risk review', 'Creator approval', 'Launch announcement', 'Publish'].map((step, index) => (
                <div key={step} className="flex items-center justify-between gap-4 rounded-2xl border border-white/10 bg-white/[.035] p-4">
                  <p className="text-xs font-black uppercase tracking-[.12em] text-white/45">{step}</p>
                  <span className="grid h-7 w-7 place-items-center rounded-full bg-purple-300 text-xs font-black text-black">{index + 1}</span>
                </div>
              ))}
            </div>
          </section>
        </div>
      </section>
    </main>
  );
}

function Pulse({ label, value }: { label: string; value: string }) {
  return <div className="rounded-2xl border border-white/10 bg-black/30 p-4"><p className="text-[.65rem] font-black uppercase tracking-[.16em] text-white/30">{label}</p><p className="mt-2 text-2xl font-black tracking-[-.06em] text-purple-100">{value}</p></div>;
}

function Chip({ children }: { children: string }) {
  return <span className="rounded-full border border-white/10 bg-white/[.035] px-3 py-1 text-[.65rem] font-black uppercase tracking-[.12em] text-white/38">{children}</span>;
}
