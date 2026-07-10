import Link from 'next/link';

const breakdowns = [
  { title: 'How the lane opened', tag: 'Spacing', description: 'Early drives forced the low defender to help. Once the defense collapsed, the weak-side corner became the cleanest read.', stats: ['6 paint touches', '4 help rotations', '3 open kick-outs'] },
  { title: 'The momentum swing', tag: 'Defense', description: 'Three straight stops changed the pace of the game. The possession pressure made every next shot feel heavier.', stats: ['3 consecutive stops', '2 forced turnovers', '8–0 run'] },
  { title: 'The finishing move', tag: 'Footwork', description: 'The hesitation froze the defender upright. One hard downhill step created the separation needed for the game-point finish.', stats: ['1.2s advantage', '2 direction changes', 'Game point'] },
];

export default function FriedEmFilmRoomPage() {
  return (
    <main className="fried-em-world min-h-screen px-4 py-8 text-white sm:px-6">
      <div className="mx-auto max-w-7xl">
        <nav className="mb-8 flex flex-wrap items-center justify-between gap-3"><Link href="/worlds/fried-em" className="rounded-full border border-white/10 bg-white/[.04] px-4 py-3 text-sm font-black text-white/70">← Back to Park</Link><Link href="/worlds/fried-em/episodes" className="rounded-full border border-white/10 bg-white/[.04] px-4 py-3 text-sm font-black text-white/70">Episode Wall</Link></nav>
        <header className="rounded-[2.8rem] border border-orange-300/15 bg-black/55 p-7 shadow-[0_0_80px_rgba(255,122,26,.16)] backdrop-blur-2xl sm:p-10"><p className="text-xs font-black uppercase tracking-[.34em] text-orange-200/45">Film Room</p><h1 className="mt-4 text-6xl font-black tracking-[-.08em] sm:text-8xl">See what decided the game.</h1><p className="mt-5 max-w-3xl text-base leading-8 text-white/55">Every episode becomes more than footage. The Film Room turns possessions into reads, patterns, tendencies, and storylines.</p></header>

        <section className="mt-6 grid gap-5 lg:grid-cols-[1.2fr_.8fr]">
          <article className="rounded-[2rem] border border-white/10 bg-black/45 p-6"><div className="aspect-video rounded-[1.5rem] border border-white/10 bg-[radial-gradient(circle_at_center,rgba(255,122,26,.22),transparent_20rem),#080402] grid place-items-center"><div className="text-center"><p className="text-6xl">▶</p><p className="mt-3 text-sm font-black text-white/40">Game tape ready for breakdown</p></div></div><div className="mt-5 flex flex-wrap gap-3">{['Full Game', 'Offense', 'Defense', 'Clutch', 'Slow Motion'].map((item, index) => <button key={item} className={`rounded-full px-4 py-2 text-xs font-black ${index === 0 ? 'bg-orange-400 text-black' : 'border border-white/10 bg-white/[.04] text-white/55'}`}>{item}</button>)}</div></article>
          <article className="rounded-[2rem] border border-white/10 bg-black/45 p-6"><p className="text-xs font-black uppercase tracking-[.22em] text-orange-200/45">Scouting Snapshot</p><h2 className="mt-3 text-3xl font-black">Melodic</h2><div className="mt-5 grid gap-3">{[['Primary tendency','Attack left after hesitation'],['Counter','Stepback when defender opens hips'],['Cold zone','Deep right wing'],['Pressure response','Improves after consecutive stops']].map(([label,value]) => <div key={label} className="rounded-2xl border border-white/10 bg-white/[.035] p-4"><p className="text-xs font-black uppercase tracking-[.15em] text-white/30">{label}</p><p className="mt-2 text-sm font-black text-white/75">{value}</p></div>)}</div></article>
        </section>

        <section className="mt-6 grid gap-5 lg:grid-cols-3">{breakdowns.map((item, index) => <article key={item.title} className="rounded-[2rem] border border-white/10 bg-black/45 p-6"><div className="flex items-center justify-between"><span className="text-xs font-mono text-white/25">0{index + 1}</span><span className="rounded-full border border-orange-300/20 bg-orange-400/10 px-3 py-1 text-[.65rem] font-black uppercase tracking-[.16em] text-orange-100">{item.tag}</span></div><h2 className="mt-5 text-3xl font-black tracking-[-.05em]">{item.title}</h2><p className="mt-4 text-sm leading-7 text-white/48">{item.description}</p><div className="mt-5 grid gap-2">{item.stats.map((stat) => <div key={stat} className="rounded-xl border border-white/10 bg-white/[.035] px-3 py-2 text-sm font-black text-white/60">{stat}</div>)}</div><button className="mt-5 text-sm font-black text-orange-200">Open Breakdown →</button></article>)}</section>

        <section className="mt-6 rounded-[2rem] border border-white/10 bg-black/45 p-6"><div className="flex flex-wrap items-end justify-between gap-4"><div><p className="text-xs font-black uppercase tracking-[.22em] text-orange-200/45">Next Study</p><h2 className="mt-3 text-4xl font-black tracking-[-.06em]">Connect every breakdown to the story.</h2><p className="mt-3 max-w-3xl text-sm leading-7 text-white/48">Film Room analysis can later feed Player Passports, matchup predictions, challenges, and Creator Studio scouting notes.</p></div><Link href="/worlds/fried-em/players" className="rounded-full bg-orange-400 px-5 py-3 text-sm font-black text-black">Open Player Passports</Link></div></section>
      </div>
    </main>
  );
}
