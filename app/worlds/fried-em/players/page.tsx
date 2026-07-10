import Link from 'next/link';
import { friedEmPlayers } from '@/data/fried-em-players';

export const metadata = {
  title: 'Fried Em Players | Harmonic OS',
  description: 'Browse Fried Em player passports, records, respect, heat, and Cooked Meter rankings.',
};

export default function FriedEmPlayersPage() {
  return (
    <main className="fried-em-world min-h-screen px-4 py-8 text-white sm:px-6">
      <div className="mx-auto max-w-6xl">
        <nav className="mb-8 flex flex-wrap items-center justify-between gap-3">
          <Link href="/worlds/fried-em#leaderboard" className="rounded-full border border-white/10 bg-white/[.04] px-4 py-3 text-sm font-black text-white/70">← Fried Em Park</Link>
          <Link href="/" className="rounded-full border border-white/10 bg-white/[.04] px-4 py-3 text-sm font-black text-white/70">Universe Map</Link>
        </nav>

        <header className="rounded-[2.8rem] border border-orange-300/15 bg-black/50 p-7 shadow-[0_0_80px_rgba(255,122,26,.16)] backdrop-blur-2xl sm:p-10">
          <p className="text-xs font-black uppercase tracking-[.34em] text-orange-200/45">Cooked Board Registry</p>
          <h1 className="mt-4 text-6xl font-black tracking-[-.08em] sm:text-8xl">Player Passports</h1>
          <p className="mt-5 max-w-2xl text-base leading-8 text-white/55">Every player carries a living Fried Em identity: record, respect, heat, game IQ, signature move, recent victims, and highlight history.</p>
        </header>

        <section className="mt-6 grid gap-5 lg:grid-cols-3">
          {friedEmPlayers.map((player, index) => (
            <Link key={player.slug} href={`/worlds/fried-em/players/${player.slug}`} className="group rounded-[2rem] border border-white/10 bg-black/40 p-6 backdrop-blur-xl transition hover:-translate-y-2 hover:border-orange-300/30 hover:bg-orange-400/[.06]">
              <div className="flex items-start justify-between gap-4"><span className="text-4xl font-black text-orange-200">#{index + 1}</span><span className="rounded-full border border-orange-300/20 bg-orange-400/10 px-3 py-2 text-xs font-black text-orange-100">{player.badge}</span></div>
              <h2 className="mt-6 text-4xl font-black tracking-[-.06em]">{player.name}</h2>
              <p className="mt-2 font-black text-orange-200">{player.handle}</p>
              <div className="mt-6 grid grid-cols-3 gap-3 text-center"><Mini label="Record" value={player.record} /><Mini label="Respect" value={String(player.respect)} /><Mini label="Heat" value={String(player.heat)} /></div>
              <div className="mt-5"><div className="mb-2 flex justify-between text-xs font-black uppercase tracking-[.16em] text-white/35"><span>Cooked Meter</span><span>{player.cookedMeter}%</span></div><div className="h-2 overflow-hidden rounded-full bg-white/10"><div className="h-full rounded-full bg-orange-400 shadow-[0_0_24px_rgba(255,122,26,.75)]" style={{ width: `${player.cookedMeter}%` }} /></div></div>
              <p className="mt-5 text-sm leading-7 text-white/48">Signature move: <strong className="text-white/75">{player.signatureMove}</strong></p>
              <span className="mt-6 inline-flex text-sm font-black text-orange-200 transition group-hover:translate-x-1">Open Passport →</span>
            </Link>
          ))}
        </section>
      </div>
    </main>
  );
}

function Mini({ label, value }: { label: string; value: string }) {
  return <div className="rounded-2xl border border-white/10 bg-white/[.035] p-3"><p className="text-[.62rem] font-black uppercase tracking-[.14em] text-white/30">{label}</p><p className="mt-2 text-xl font-black">{value}</p></div>;
}
