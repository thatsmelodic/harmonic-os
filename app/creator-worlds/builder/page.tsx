import Link from 'next/link';
import { FrequencyDock } from '@/components/FrequencyDock';
import { getCreatorWorldDashboardData, isSupabaseConfigured } from '@/lib/supabase/creator-worlds-server';

export const metadata = {
  title: 'Creator World Builder | Harmonic OS',
  description: 'Build, customize, monetize, and launch creator worlds inside Harmonic OS.',
};

const builderSteps = [
  {
    title: 'World Identity',
    body: 'Name, handle, tagline, description, category, public status, and creator promise.',
    fields: ['World name', 'Handle', 'Tagline', 'Category', 'Visibility', 'Launch status'],
  },
  {
    title: 'Visual Atmosphere',
    body: 'Colors, seasonal effects, background motion, room glow, low-motion mode, and world energy.',
    fields: ['Primary color', 'Secondary color', 'Atmosphere', 'Effect preset', 'Motion level', 'Season pack'],
  },
  {
    title: 'Room Layout',
    body: 'Choose the rooms your audience can enter and what each room is allowed to do.',
    fields: ['Studio', 'Community', 'Storefront', 'Vault', 'Event stage', 'AI office'],
  },
  {
    title: 'Monetization',
    body: 'Build memberships, products, tickets, licenses, modules, and referral-enabled offers.',
    fields: ['Membership', 'Product', 'Ticket', 'License', 'Module', 'Platform fee'],
  },
  {
    title: 'AI Personality',
    body: 'Give each world an approval-first assistant that helps visitors and supports the creator.',
    fields: ['Assistant name', 'Tone', 'Rules', 'Knowledge', 'Approval mode', 'Risk notes'],
  },
  {
    title: 'Launch Controls',
    body: 'Preview, checklist, publish readiness, analytics goals, and launch event timeline.',
    fields: ['Preview URL', 'Checklist', 'Launch date', 'Announcement', 'Analytics target', 'Publish'],
  },
];

const mockControls = [
  { label: 'World URL', value: '/creator-worlds/melodic-universe' },
  { label: 'Creator Handle', value: '@thatsmelodic' },
  { label: 'Status', value: 'Published alpha' },
  { label: 'Main Color', value: '#b76cff' },
  { label: 'Accent Color', value: '#36b2cb' },
  { label: 'Atmosphere', value: 'Purple-neon living world' },
];

function money(cents: number | null | undefined) {
  return `$${(Number(cents ?? 0) / 100).toFixed(2)}`;
}

export default async function CreatorWorldBuilderPage() {
  const configured = isSupabaseConfigured();
  const data = await getCreatorWorldDashboardData('melodic-universe');
  const analytics = data.analytics[0];
  const live = configured && Boolean(data.world);

  const revenueCards = [
    { label: 'Gross Revenue', value: money(analytics?.gross_revenue_cents) },
    { label: 'Platform Revenue', value: money(analytics?.platform_revenue_cents) },
    { label: 'Creator Net', value: money(analytics?.creator_net_cents) },
    { label: 'Promoter Payout', value: money(analytics?.promoter_payout_cents) },
  ];

  return (
    <main className="min-h-screen px-6 py-8 pb-28">
      <FrequencyDock />
      <section className="harmonic-container grid gap-5 py-8">
        <article className="rounded-[3rem] border border-purple-200/15 bg-[radial-gradient(circle_at_18%_10%,rgba(183,108,255,.3),transparent_34%),radial-gradient(circle_at_82%_0%,rgba(54,178,203,.18),transparent_34%),linear-gradient(135deg,rgba(255,255,255,.06),rgba(0,0,0,.48))] p-5 shadow-purple-glow backdrop-blur-2xl sm:p-8">
          <div className="flex flex-wrap items-start justify-between gap-5">
            <div>
              <p className="text-xs font-black uppercase tracking-[.38em] text-purple-100/45">Creator Worlds MVP</p>
              <h1 className="mt-3 text-5xl font-black tracking-[-.09em] sm:text-7xl">World Builder</h1>
              <p className="mt-4 max-w-5xl text-sm leading-7 text-purple-100/62 sm:text-base">The builder turns Creator Worlds into a product: creators can shape identity, rooms, monetization, AI behavior, launch state, and analytics from one command center.</p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link href="/creator-worlds/melodic-universe" className="rounded-full bg-purple-300 px-5 py-3 text-sm font-black text-black shadow-purple-glow">Preview World</Link>
              <Link href="/creator-worlds/live-dashboard" className="rounded-full border border-white/10 px-5 py-3 text-sm font-black text-purple-100/75 hover:bg-white/[.06]">Live Data</Link>
            </div>
          </div>
          <div className="mt-7 grid gap-3 md:grid-cols-3">
            <StatusCard label="Backend" value={live ? 'Live' : 'Fallback'} note={live ? 'Supabase data is connected.' : 'Waiting on env/deploy or database access.'} />
            <StatusCard label="Rooms Loaded" value={String(data.rooms.length)} note="World rooms are the navigation layer." />
            <StatusCard label="Offers Loaded" value={String(data.products.length)} note="Products power world monetization." />
          </div>
        </article>

        <div className="grid gap-5 xl:grid-cols-[.9fr_1.1fr]">
          <section className="rounded-[2.4rem] border border-cyan-200/15 bg-black/30 p-5 backdrop-blur-2xl">
            <p className="text-xs font-black uppercase tracking-[.28em] text-cyan-100/50">Builder Controls</p>
            <div className="mt-5 grid gap-3">
              {mockControls.map((control) => (
                <div key={control.label} className="rounded-2xl border border-white/10 bg-white/[.035] p-4">
                  <p className="text-[.65rem] font-black uppercase tracking-[.16em] text-white/30">{control.label}</p>
                  <p className="mt-2 text-sm font-black text-cyan-100/75">{control.value}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-[2.4rem] border border-purple-200/15 bg-black/30 p-5 backdrop-blur-2xl">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <p className="text-xs font-black uppercase tracking-[.28em] text-purple-100/50">Builder Phases</p>
              <span className="rounded-full border border-purple-200/15 px-3 py-1 text-[.65rem] font-black uppercase tracking-[.14em] text-purple-100/55">MVP surface</span>
            </div>
            <div className="mt-5 grid gap-4 md:grid-cols-2">
              {builderSteps.map((step, index) => (
                <article key={step.title} className="rounded-2xl border border-white/10 bg-white/[.035] p-4">
                  <div className="flex items-center justify-between gap-3">
                    <h2 className="text-lg font-black text-white/82">{step.title}</h2>
                    <span className="grid h-8 w-8 place-items-center rounded-full bg-purple-300 text-xs font-black text-black">{index + 1}</span>
                  </div>
                  <p className="mt-3 text-xs leading-6 text-white/48">{step.body}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {step.fields.map((field) => (
                      <span key={field} className="rounded-full border border-white/10 bg-black/30 px-3 py-1 text-[.65rem] font-black uppercase tracking-[.12em] text-white/38">{field}</span>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          </section>
        </div>

        <div className="grid gap-5 xl:grid-cols-2">
          <section className="rounded-[2.4rem] border border-purple-200/15 bg-black/30 p-5 backdrop-blur-2xl">
            <p className="text-xs font-black uppercase tracking-[.28em] text-purple-100/50">Rooms From Database</p>
            <div className="mt-5 grid gap-3">
              {(data.rooms.length ? data.rooms : [{ id: 'fallback', name: 'No live rooms yet', access_level: 'setup', room_type: 'setup', description: 'Rooms will appear after deployment reads Supabase.' }]).slice(0, 6).map((room: any) => (
                <article key={room.id} className="rounded-2xl border border-white/10 bg-white/[.035] p-4">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <h2 className="text-base font-black text-white/82">{room.name}</h2>
                    <span className="text-[.65rem] font-black uppercase tracking-[.14em] text-purple-100/45">{room.access_level}</span>
                  </div>
                  <p className="mt-2 text-xs leading-6 text-white/48">{room.description}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="rounded-[2.4rem] border border-cyan-200/15 bg-black/30 p-5 backdrop-blur-2xl">
            <p className="text-xs font-black uppercase tracking-[.28em] text-cyan-100/50">Revenue Model</p>
            <div className="mt-5 grid gap-3 md:grid-cols-2">
              {revenueCards.map((card) => <MiniStat key={card.label} {...card} />)}
            </div>
            <div className="mt-5 rounded-2xl border border-white/10 bg-white/[.035] p-4">
              <h2 className="text-lg font-black text-white/82">Capital Logic</h2>
              <p className="mt-3 text-xs leading-6 text-white/48">Every world should support direct sales, memberships, affiliate traffic, creator collaborations, and platform revenue. This MVP screen makes that revenue architecture visible before checkout is fully wired.</p>
            </div>
          </section>
        </div>
      </section>
    </main>
  );
}

function StatusCard({ label, value, note }: { label: string; value: string; note: string }) {
  return <div className="rounded-2xl border border-white/10 bg-black/30 p-4"><p className="text-xs font-black uppercase tracking-[.2em] text-white/35">{label}</p><p className="mt-2 text-3xl font-black tracking-[-.06em] text-purple-100">{value}</p><p className="mt-2 text-xs leading-6 text-white/45">{note}</p></div>;
}

function MiniStat({ label, value }: { label: string; value: string }) {
  return <div className="rounded-2xl border border-white/10 bg-white/[.035] p-4"><p className="text-[.65rem] font-black uppercase tracking-[.16em] text-white/30">{label}</p><p className="mt-2 text-2xl font-black text-cyan-100/80">{value}</p></div>;
}
