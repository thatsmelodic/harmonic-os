import Link from 'next/link';
import { FrequencyDock } from '@/components/FrequencyDock';
import { getCreatorWorldDashboardData, isSupabaseConfigured } from '@/lib/supabase/creator-worlds-server';

export const metadata = {
  title: 'Melodic Universe | Creator Worlds',
  description: 'Live Creator World for Melodic Universe inside Harmonic OS.',
};

const fallback = {
  world: {
    name: 'Melodic Universe',
    handle: '@thatsmelodic',
    tagline: 'One creator. Many frequencies. Choose your frequency.',
    atmosphere: 'cinematic purple-neon living world',
  },
};

function money(cents: number | null | undefined) {
  return `$${(Number(cents ?? 0) / 100).toFixed(2)}`;
}

export default async function MelodicUniverseWorldPage() {
  const configured = isSupabaseConfigured();
  const data = await getCreatorWorldDashboardData('melodic-universe');
  const world = data.world ?? fallback.world;
  const analytics = data.analytics[0];
  const live = configured && Boolean(data.world);

  const stats = [
    { label: 'Data Mode', value: live ? 'Live' : 'Fallback', note: live ? 'Supabase is feeding this world.' : 'Set Vercel env vars to activate live data.' },
    { label: 'Rooms', value: String(data.rooms.length), note: 'Studio, plaza, vault, storefront, portal, AI office.' },
    { label: 'Products', value: String(data.products.length), note: 'Memberships, drops, tickets, licenses, modules.' },
    { label: 'Revenue Pulse', value: money(analytics?.gross_revenue_cents), note: 'Starter analytics from the seed layer.' },
  ];

  return (
    <main className="min-h-screen px-6 py-8 pb-28">
      <FrequencyDock />
      <section className="harmonic-container grid gap-5 py-8">
        <article className="overflow-hidden rounded-[3rem] border border-purple-200/15 bg-[radial-gradient(circle_at_20%_10%,rgba(183,108,255,.28),transparent_35%),radial-gradient(circle_at_80%_0%,rgba(54,178,203,.18),transparent_32%),linear-gradient(135deg,rgba(255,255,255,.06),rgba(0,0,0,.42))] p-5 shadow-purple-glow backdrop-blur-2xl sm:p-8">
          <div className="flex flex-wrap items-start justify-between gap-5">
            <div>
              <p className="text-xs font-black uppercase tracking-[.38em] text-purple-100/45">Creator World</p>
              <h1 className="mt-3 text-5xl font-black tracking-[-.09em] sm:text-7xl">{world.name}</h1>
              <p className="mt-3 text-xl font-black text-cyan-100/70">{world.handle}</p>
              <p className="mt-4 max-w-5xl text-sm leading-7 text-purple-100/62 sm:text-base">{world.tagline}</p>
              <p className="mt-2 text-sm leading-7 text-white/42">Atmosphere: {world.atmosphere}</p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link href="/creator-worlds/live-dashboard" className="rounded-full bg-purple-300 px-5 py-3 text-sm font-black text-black shadow-purple-glow">Live Dashboard</Link>
              <Link href="/creator-worlds/control-center" className="rounded-full border border-white/10 px-5 py-3 text-sm font-black text-purple-100/75 hover:bg-white/[.06]">Control Center</Link>
            </div>
          </div>
          <div className="mt-8 grid gap-3 md:grid-cols-4">{stats.map((stat) => <Stat key={stat.label} {...stat} />)}</div>
        </article>

        <div className="grid gap-5 xl:grid-cols-[1.2fr_.8fr]">
          <section className="rounded-[2.4rem] border border-cyan-200/15 bg-black/30 p-5 backdrop-blur-2xl">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <p className="text-xs font-black uppercase tracking-[.28em] text-cyan-100/50">World Rooms</p>
              <span className="rounded-full border border-cyan-200/15 px-3 py-1 text-[.65rem] font-black uppercase tracking-[.14em] text-cyan-100/55">{data.rooms.length} active</span>
            </div>
            <div className="mt-5 grid gap-4 md:grid-cols-2">
              {(data.rooms.length ? data.rooms : [{ id: 'fallback', name: 'Run seed + env vars', access_level: 'setup', room_type: 'setup', description: 'Rooms will appear here after Supabase is connected to Vercel.' }]).map((room: any) => (
                <article key={room.id} className="rounded-2xl border border-white/10 bg-white/[.035] p-4">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <h2 className="text-lg font-black text-white/82">{room.name}</h2>
                    <span className="text-[.65rem] font-black uppercase tracking-[.14em] text-cyan-100/45">{room.access_level}</span>
                  </div>
                  <p className="mt-2 text-xs font-black uppercase tracking-[.14em] text-white/30">{room.room_type}</p>
                  <p className="mt-3 text-xs leading-6 text-white/48">{room.description}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="rounded-[2.4rem] border border-purple-200/15 bg-black/30 p-5 backdrop-blur-2xl">
            <p className="text-xs font-black uppercase tracking-[.28em] text-purple-100/50">Economy Pulse</p>
            <div className="mt-5 grid gap-3">
              <MiniStat label="Visits" value={String(analytics?.visits ?? 0)} />
              <MiniStat label="Active Members" value={String(analytics?.active_members ?? 0)} />
              <MiniStat label="Orders" value={String(analytics?.orders ?? 0)} />
              <MiniStat label="Platform Revenue" value={money(analytics?.platform_revenue_cents)} />
              <MiniStat label="Creator Net" value={money(analytics?.creator_net_cents)} />
              <MiniStat label="Community Pulse" value={`${analytics?.community_pulse ?? 0}%`} />
            </div>
          </section>
        </div>

        <div className="grid gap-5 xl:grid-cols-2">
          <section className="rounded-[2.4rem] border border-purple-200/15 bg-black/30 p-5 backdrop-blur-2xl">
            <p className="text-xs font-black uppercase tracking-[.28em] text-purple-100/50">Products + Offers</p>
            <div className="mt-5 grid gap-3">
              {(data.products.length ? data.products : [{ id: 'fallback-product', title: 'No live offers yet', product_type: 'setup', status: 'pending', price_cents: 0, description: 'Seed data and Vercel env vars will activate live offers.' }]).map((product: any) => (
                <article key={product.id} className="rounded-2xl border border-white/10 bg-white/[.035] p-4">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <h2 className="text-base font-black text-white/82">{product.title}</h2>
                    <span className="text-sm font-black text-purple-100/70">{money(product.price_cents)}</span>
                  </div>
                  <p className="mt-2 text-xs font-black uppercase tracking-[.14em] text-white/30">{product.product_type} • {product.status}</p>
                  <p className="mt-3 text-xs leading-6 text-white/48">{product.description}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="rounded-[2.4rem] border border-cyan-200/15 bg-black/30 p-5 backdrop-blur-2xl">
            <p className="text-xs font-black uppercase tracking-[.28em] text-cyan-100/50">AI Director Suggestions</p>
            <div className="mt-5 grid gap-3">
              {(data.approvals.length ? data.approvals : [{ id: 'fallback-approval', title: 'No live AI suggestions yet', suggestion_type: 'setup', preview: 'Approval suggestions will appear after Supabase is connected.' }]).map((approval: any) => (
                <article key={approval.id} className="rounded-2xl border border-white/10 bg-white/[.035] p-4">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <h2 className="text-base font-black text-white/82">{approval.title}</h2>
                    <span className="text-[.65rem] font-black uppercase tracking-[.14em] text-cyan-100/45">{approval.suggestion_type}</span>
                  </div>
                  <p className="mt-3 text-xs leading-6 text-white/48">{approval.preview}</p>
                </article>
              ))}
            </div>
          </section>
        </div>
      </section>
    </main>
  );
}

function Stat({ label, value, note }: { label: string; value: string; note: string }) {
  return <div className="rounded-2xl border border-white/10 bg-black/30 p-4"><p className="text-xs font-black uppercase tracking-[.2em] text-white/35">{label}</p><p className="mt-2 text-3xl font-black tracking-[-.06em] text-purple-100">{value}</p><p className="mt-2 text-xs leading-6 text-white/45">{note}</p></div>;
}

function MiniStat({ label, value }: { label: string; value: string }) {
  return <div className="flex items-center justify-between gap-4 rounded-xl border border-white/10 bg-white/[.035] p-3"><span className="text-xs font-black uppercase tracking-[.14em] text-white/35">{label}</span><strong className="text-sm text-cyan-100/75">{value}</strong></div>;
}
