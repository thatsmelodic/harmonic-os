import Link from 'next/link';

const memories = [
  { date: '2026', title: 'Lift U Up', chapter: 'Elevation', type: 'Song Memory', note: 'A record about refusing to let pain decide the ending.' },
  { date: '2026', title: 'Save The Apology', chapter: 'Aftermath', type: 'Writing Memory', note: 'The words arrived after trust already changed shape.' },
  { date: '2026', title: 'Barkin N Bitin', chapter: 'Pressure', type: 'Performance Memory', note: 'Confidence became armor, then rhythm.' },
  { date: '2025', title: 'Melodic Bible', chapter: 'Foundation', type: 'Philosophy', note: 'The original language behind frequency, harmony, memory, and motion.' },
  { date: '2022', title: '2 Harmonic Begins', chapter: 'Origin', type: 'World Memory', note: 'The philosophy first learned how to become something people could wear.' },
];

export default function MelodicMemoryArchivePage() {
  return (
    <main className="melodic-world relative min-h-screen overflow-hidden px-4 py-8 pb-28 text-white sm:px-6">
      <div className="melodic-aurora absolute inset-0 -z-20" />
      <div className="frequency-grid absolute inset-0 -z-10 opacity-30" />
      <div className="mx-auto max-w-7xl">
        <nav className="mb-8 flex flex-wrap items-center justify-between gap-3"><Link href="/worlds/melodic" className="rounded-full border border-white/10 bg-white/[.04] px-4 py-3 text-sm font-black text-white/70">← Melodic Universe</Link><Link href="/worlds/melodic/writing-room" className="rounded-full border border-purple-200/20 bg-purple-300/10 px-4 py-3 text-sm font-black text-purple-100">Writing Room</Link></nav>

        <header className="rounded-[2.8rem] border border-purple-200/15 bg-black/50 p-7 shadow-purple-glow backdrop-blur-2xl sm:p-10">
          <p className="text-xs font-black uppercase tracking-[.34em] text-purple-100/45">Memory Archive</p>
          <h1 className="mt-4 text-6xl font-black tracking-[-.08em] sm:text-8xl">Nothing meaningful disappears.</h1>
          <p className="mt-5 max-w-3xl text-base leading-8 text-white/58">Songs, writings, philosophies, releases, performances, and world-building moments become one living timeline instead of getting lost across separate platforms.</p>
        </header>

        <section className="mt-6 grid gap-4">{memories.map((memory, index) => <article key={`${memory.title}-${memory.date}`} className="group grid gap-5 rounded-[2rem] border border-white/10 bg-black/42 p-5 backdrop-blur-xl transition hover:border-purple-200/25 md:grid-cols-[110px_1fr_auto] md:items-center"><div><p className="font-mono text-xs text-purple-100/40">0{index + 1}</p><p className="mt-2 text-3xl font-black tracking-[-.05em]">{memory.date}</p></div><div><p className="text-xs font-black uppercase tracking-[.2em] text-purple-100/45">{memory.type} · {memory.chapter}</p><h2 className="mt-3 text-3xl font-black tracking-[-.05em]">{memory.title}</h2><p className="mt-3 max-w-3xl text-sm leading-7 text-white/48">{memory.note}</p></div><button className="rounded-full border border-white/10 bg-white/[.04] px-4 py-3 text-sm font-black text-white/60">Open Memory</button></article>)}</section>

        <section className="mt-6 grid gap-5 lg:grid-cols-3">{[['Songs Saved','5'],['World Chapters','4'],['Years Remembered','5']].map(([label,value]) => <article key={label} className="rounded-[1.8rem] border border-white/10 bg-black/42 p-6 text-center backdrop-blur-xl"><p className="text-5xl font-black tracking-[-.07em] text-purple-100">{value}</p><p className="mt-3 text-xs font-black uppercase tracking-[.2em] text-white/35">{label}</p></article>)}</section>
      </div>
    </main>
  );
}
