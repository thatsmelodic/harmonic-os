import Link from 'next/link';
import { notFound } from 'next/navigation';
import { friedEmPlayers, getFriedEmPlayer } from '@/data/fried-em-players';

export function generateStaticParams() {
  return friedEmPlayers.map((player) => ({ slug: player.slug }));
}

export default async function FriedEmPlayerPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const player = getFriedEmPlayer(slug);

  if (!player) notFound();

  const stats = [
    ['Respect', player.respect],
    ['Heat', player.heat],
    ['Cooked', player.cookedMeter],
    ['Clutch', player.clutch],
    ['IQ', player.iq],
    ['Stops', player.stops],
    ['Buckets', player.buckets],
  ] as const;

  return (
    <main className="fried-em-world min-h-screen px-4 py-8 text-white sm:px-6">
      <div className="mx-auto max-w-6xl">
        <nav className="mb-8 flex flex-wrap items-center justify-between gap-3">
          <Link href="/worlds/fried-em#leaderboard" className="rounded-full border border-white/10 bg-white/[.04] px-4 py-3 text-sm font-black text-white/70">← Cooked Board</Link>
          <Link href="/" className="rounded-full border border-white/10 bg-white/[.04] px-4 py-3 text-sm font-black text-white/70">Universe Map</Link>
        </nav>

        <section className="overflow-hidden rounded-[2.8rem] border border-orange-300/15 bg-black/50 p-6 shadow-[0_0_80px_rgba(255,122,26,.18)] backdrop-blur-2xl sm:p-10">
          <div className="grid gap-8 lg:grid-cols-[1fr_.8fr] lg:items-center">
            <div>
              <p className="text-xs font-black uppercase tracking-[.34em] text-orange-200/45">Fried Em Player Passport</p>
              <h1 className="mt-4 text-6xl font-black tracking-[-.08em] sm:text-8xl">{player.name}</h1>
              <p className="mt-3 text-xl font-black text-orange-200">{player.handle}</p>
              <div className="mt-5 flex flex-wrap gap-3">
                <span className="rounded-full border border-orange-300/20 bg-orange-400/10 px-4 py-2 text-sm font-black text-orange-100">{player.badge}</span>
                <span className="rounded-full border border-white/10 bg-white/[.04] px-4 py-2 text-sm font-black text-white/70">Record {player.record}</span>
              </div>
              <p className="mt-6 max-w-2xl text-base leading-8 text-white/58">{player.bio}</p>
            </div>

            <div className="rounded-[2rem] border border-white/10 bg-[radial-gradient(circle_at_center,rgba(255,122,26,.22),rgba(0,0,0,.5)_68%)] p-6 text-center">
              <p className="text-xs font-black uppercase tracking-[.25em] text-white/35">Cooked Meter</p>
              <p className="mt-3 text-8xl font-black tracking-[-.09em] text-orange-200">{player.cookedMeter}</p>
              <div className="mt-5 h-3 overflow-hidden rounded-full bg-white/10"><div className="h-full rounded-full bg-orange-400 shadow-[0_0_26px_rgba(255,122,26,.85)]" style={{ width: `${player.cookedMeter}%` }} /></div>
              <div className="mt-6 grid grid-cols-2 gap-3"><MiniStat label="Wins" value={player.wins} /><MiniStat label="Losses" value={player.losses} /></div>
            </div>
          </div>
        </section>

        <section className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map(([label, value]) => <StatCard key={label} label={label} value={value} />)}
        </section>

        <section className="mt-6 grid gap-5 lg:grid-cols-2">
          <article className="rounded-[2rem] border border-white/10 bg-black/40 p-6 backdrop-blur-xl">
            <p className="text-xs font-black uppercase tracking-[.25em] text-orange-200/45">Scouting Report</p>
            <h2 className="mt-4 text-3xl font-black tracking-[-.05em]">Signature move</h2>
            <p className="mt-3 text-xl font-black text-orange-200">{player.signatureMove}</p>
            <p className="mt-5 text-sm leading-7 text-white/50">Most recent victim: <strong className="text-white/80">{player.recentVictim}</strong></p>
          </article>

          <article className="rounded-[2rem] border border-white/10 bg-black/40 p-6 backdrop-blur-xl">
            <p className="text-xs font-black uppercase tracking-[.25em] text-orange-200/45">Highlight Resume</p>
            <div className="mt-4 grid gap-3">{player.highlights.map((highlight, index) => <div key={highlight} className="rounded-2xl border border-white/10 bg-white/[.035] p-4"><span className="font-mono text-xs text-orange-200/45">0{index + 1}</span><p className="mt-2 font-black">{highlight}</p></div>)}</div>
          </article>
        </section>
      </div>
    </main>
  );
}

function StatCard({ label, value }: { label: string; value: number }) {
  return <article className="rounded-[1.7rem] border border-white/10 bg-white/[.04] p-5 backdrop-blur-xl"><p className="text-xs font-black uppercase tracking-[.2em] text-white/35">{label}</p><p className="mt-3 text-5xl font-black tracking-[-.07em] text-orange-100">{value}</p></article>;
}

function MiniStat({ label, value }: { label: string; value: number }) {
  return <div className="rounded-2xl border border-white/10 bg-black/35 p-4"><p className="text-xs font-black uppercase tracking-[.18em] text-white/35">{label}</p><p className="mt-2 text-3xl font-black">{value}</p></div>;
}
