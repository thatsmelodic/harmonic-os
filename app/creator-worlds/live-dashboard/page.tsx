import Link from 'next/link';
import { FrequencyDock } from '@/components/FrequencyDock';
import { getCreatorWorldDashboardData, getCreatorWorldsIntegrationChecklist, isSupabaseConfigured } from '@/lib/supabase/creator-worlds-server';

export const metadata = {
  title: 'Creator Worlds Live Dashboard | Harmonic OS',
  description: 'Live Supabase-backed Creator Worlds dashboard bridge for testing database integration, rooms, products, approvals, and analytics.',
};

const fallbackWorld = {
  name: 'Melodic Universe',
  handle: '@thatsmelodic',
  status: 'fallback',
  tagline: 'Choose your frequency. Build the world that moves with the art.',
};

export default async function CreatorWorldsLiveDashboardPage() {
  const configured = isSupabaseConfigured();
  const data = await getCreatorWorldDashboardData('melodic-universe');
  const world = data.world ?? fallbackWorld;
  const checklist = getCreatorWorldsIntegrationChecklist();
  const isLive = configured && Boolean(data.world);

  const cards = [
    { label: 'Supabase Env', value: configured ? 'Connected' : 'Missing', note: configured ? 'Environment variables are present.' : 'Add Supabase URL and anon key in Vercel.' },
    { label: 'World Row', value: data.world ? 'Found' : 'Fallback', note: data.world ? 'Database returned melodic-universe.' : 'Seed a creator_worlds row with slug melodic-universe.' },
    { label: 'Rooms', value: String(data.rooms.length), note: data.rooms.length ? 'Live rooms loaded from Supabase.' : 'No live rooms loaded yet.' },
    { label: 'Products', value: String(data.products.length), note: data.products.length ? 'Live products loaded from Supabase.' : 'No live products loaded yet.' },
    { label: 'Approvals', value: String(data.approvals.length), note: data.approvals.length ? 'Live AI approvals loaded from Supabase.' : 'No live approvals loaded yet.' },
    { label: 'Analytics Days', value: String(data.analytics.length), note: data.analytics.length ? 'Live analytics loaded from Supabase.' : 'No analytics rows loaded yet.' },
  ];

  return (
    <main className="min-h-screen px-6 py-8 pb-28">
      <FrequencyDock />
      <section className="harmonic-container grid gap-5 py-8">
        <article className="rounded-[2.8rem] border border-purple-200/15 bg-[linear-gradient(135deg,rgba(183,108,255,.18),rgba(54,178,203,.08),rgba(0,0,0,.42))] p-5 shadow-purple-glow backdrop-blur-2xl sm:p-7">
          <div className="flex flex-wrap items-start justify-between gap-5">
            <div>
              <p className="text-xs font-black uppercase tracking-[.38em] text-purple-100/45">Supabase Bridge</p>
              <h1 className="mt-3 text-5xl font-black tracking-[-.09em] sm:text-7xl">Live Creator Dashboard</h1>
              <p className="mt-4 max-w-5xl text-sm leading-7 text-purple-100/62 sm:text-base">This page tests whether Creator Worlds is pulling real data from Supabase. If the migration and environment variables are active, the cards below shift from fallback to live.</p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link href="/creator-worlds/control-center" className="rounded-full bg-purple-300 px-5 py-3 text-sm font-black text-black shadow-purple-glow">Control Center</Link>
              <Link href="/launch-lab" className="rounded-full border border-white/10 px-5 py-3 text-sm font-black text-purple-100/75 hover:bg-white/[.06]">Launch Lab</Link>
            </div>
          </div>
          <div className="mt-6 rounded-2xl border border-white/10 bg-black/25 p-4">
            <p className="text-xs font-black uppercase tracking-[.2em] text-white/35">Status</p>
            <p className="mt-2 text-3xl font-black tracking-[-.06em] text-purple-100">{isLive ? 'Live Data Connected' : 'Fallback Mode'}</p>
            <p className="mt-2 text-sm leading-7 text-white/55">World: {world.name} {world.handle ? `(${world.handle})` : ''}</p>
            <p className="mt-1 text-sm leading-7 text-purple-100/55">{world.tagline}</p>
          </div>
          <div className="mt-6 grid gap-3 md:grid-cols-3">{cards.map((card) => <Stat key={card.label} {...card} />)}</div>
        </article>

        <div className="grid gap-5 xl:grid-cols-2">
          <section className="rounded-[2rem] border border-cyan-200/15 bg-black/30 p-5 backdrop-blur-2xl">
            <p className="text-xs font-black uppercase tracking-[.28em] text-cyan-100/50">Live Rooms</p>
            <div className="mt-4 grid gap-3">
              {(data.rooms.length ? data.rooms : [{ id: 'fallback-room', name: 'No live rooms yet', access_level: 'fallback', room_type: 'setup', description: 'Seed creator_world_rooms after running the migration.' }]).map((room: any) => (
                <div key={room.id} className="rounded-xl border border-white/10 bg-white/[.035] p-3">
                  <div className="flex flex-wrap items-center justify-between gap-2"><strong className="text-sm text-white/80">{room.name}</strong><span className="text-[.65rem] font-black uppercase tracking-[.14em] text-cyan-100/45">{room.access_level}</span></div>
                  <p className="mt-2 text-xs leading-6 text-white/48">{room.description}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-[2rem] border border-purple-200/15 bg-black/30 p-5 backdrop-blur-2xl">
            <p className="text-xs font-black uppercase tracking-[.28em] text-purple-100/50">Live Products</p>
            <div className="mt-4 grid gap-3">
              {(data.products.length ? data.products : [{ id: 'fallback-product', title: 'No live products yet', status: 'setup', product_type: 'setup', price_cents: 0 }]).map((product: any) => (
                <div key={product.id} className="rounded-xl border border-white/10 bg-white/[.035] p-3">
                  <div className="flex flex-wrap items-center justify-between gap-2"><strong className="text-sm text-white/80">{product.title}</strong><span className="text-[.65rem] font-black uppercase tracking-[.14em] text-purple-100/45">{product.status}</span></div>
                  <p className="mt-2 text-xs leading-6 text-white/48">{product.product_type} • ${(Number(product.price_cents ?? 0) / 100).toFixed(2)}</p>
                </div>
              ))}
            </div>
          </section>
        </div>

        <div className="grid gap-5 xl:grid-cols-2">
          <section className="rounded-[2rem] border border-purple-200/15 bg-black/30 p-5 backdrop-blur-2xl">
            <p className="text-xs font-black uppercase tracking-[.28em] text-purple-100/50">AI Approval Feed</p>
            <div className="mt-4 grid gap-3">
              {(data.approvals.length ? data.approvals : [{ id: 'fallback-approval', title: 'No live approvals yet', suggestion_type: 'setup', preview: 'Seed creator_ai_approvals to test approval workflows.' }]).map((approval: any) => (
                <div key={approval.id} className="rounded-xl border border-white/10 bg-white/[.035] p-3">
                  <div className="flex flex-wrap items-center justify-between gap-2"><strong className="text-sm text-white/80">{approval.title}</strong><span className="text-[.65rem] font-black uppercase tracking-[.14em] text-purple-100/45">{approval.suggestion_type}</span></div>
                  <p className="mt-2 text-xs leading-6 text-white/48">{approval.preview}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-[2rem] border border-cyan-200/15 bg-black/30 p-5 backdrop-blur-2xl">
            <p className="text-xs font-black uppercase tracking-[.28em] text-cyan-100/50">Integration Checklist</p>
            <div className="mt-4 grid gap-3">{checklist.map((item) => <p key={item} className="rounded-xl border border-white/10 bg-white/[.035] p-3 text-xs leading-6 text-white/50">{item}</p>)}</div>
          </section>
        </div>
      </section>
    </main>
  );
}

function Stat({ label, value, note }: { label: string; value: string; note: string }) {
  return <div className="rounded-2xl border border-white/10 bg-black/30 p-4"><p className="text-xs font-black uppercase tracking-[.2em] text-white/35">{label}</p><p className="mt-2 text-3xl font-black tracking-[-.06em] text-purple-100">{value}</p><p className="mt-2 text-xs leading-6 text-white/45">{note}</p></div>;
}
