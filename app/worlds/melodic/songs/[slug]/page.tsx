import Link from 'next/link';
import { notFound } from 'next/navigation';

const songs = {
  'lift-u-up': { title: 'Lift U Up', type: 'R&B Frequency', mood: 'Healing', bpm: 80, key: 'E minor', story: 'A late-night record about choosing elevation over collapse. The song carries the feeling of reaching for somebody while also trying not to lose yourself.', colors: ['#67e8f9','#c084fc','#fef3c7'], dna: [['Healing',88],['Hope',82],['Pain',61],['Love',74]], lines: ['Elevation over collapse','The memory becomes motion','Hope stays louder than the fall'] },
  'better-luck-nxt-time': { title: 'Better Luck Nxt Time', type: 'R&B Frequency', mood: 'Distance', bpm: 76, key: 'C# minor', story: 'A reflection on timing, closure, and what could not be forced. It lives between acceptance and the part of you that still wonders what would have happened.', colors: ['#312e81','#7c3aed','#f0abfc'], dna: [['Distance',91],['Reflection',86],['Love',68],['Closure',59]], lines: ['Timing became the villain','Distance kept the receipts','Closure never sounded final'] },
  'save-the-apology': { title: 'Save The Apology', type: 'R&B Frequency', mood: 'Confession', bpm: 82, key: 'A minor', story: 'An apology that arrives after the damage already became memory. The record sits in the tension between accountability and realizing some doors stay closed.', colors: ['#d8b4fe','#fda4af','#18181b'], dna: [['Regret',92],['Confession',89],['Love',63],['Anger',51]], lines: ['The apology came after the echo','Truth arrived late','Some doors remember the slam'] },
  'barkin-n-bitin': { title: 'Barkin N Bitin', type: 'Trap Frequency', mood: 'Pressure', bpm: 170, key: 'F minor', story: 'Aggression, confidence, and motion translated into rhythm. This frequency is built to feel like pressure entering the room before the first line lands.', colors: ['#ef4444','#f97316','#111827'], dna: [['Pressure',95],['Confidence',90],['Rage',77],['Motion',84]], lines: ['Pressure got a pulse','Confidence became armor','Every bar lands forward'] },
  'big-guapo': { title: 'Big Guapo', type: 'Trap Frequency', mood: 'Motion', bpm: 146, key: 'G minor', story: 'A flex record built around momentum, presence, and hunger. It captures the feeling of moving like the destination already belongs to you.', colors: ['#22d3ee','#8b5cf6','#020617'], dna: [['Motion',94],['Hunger',88],['Confidence',86],['Victory',72]], lines: ['Momentum became identity','Presence arrived first','The destination felt familiar'] },
} as const;

type SongSlug = keyof typeof songs;

export function generateStaticParams() { return Object.keys(songs).map((slug) => ({ slug })); }

export default async function MelodicSongPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const song = songs[slug as SongSlug];
  if (!song) notFound();

  return (
    <main className="melodic-world relative min-h-screen overflow-hidden px-4 py-8 pb-28 text-white sm:px-6">
      <div className="frequency-grid absolute inset-0 -z-20 opacity-35" />
      <div className="absolute inset-0 -z-30" style={{ background: `radial-gradient(circle at 20% 15%, ${song.colors[0]}44, transparent 30rem), radial-gradient(circle at 80% 25%, ${song.colors[1]}33, transparent 28rem), #050407` }} />
      <div className="mx-auto max-w-7xl">
        <nav className="mb-8 flex flex-wrap items-center justify-between gap-3"><Link href="/worlds/melodic/vault" className="rounded-full border border-white/10 bg-white/[.04] px-4 py-3 text-sm font-black text-white/70">← Music Vault</Link><Link href="/worlds/melodic" className="rounded-full border border-purple-200/20 bg-purple-300/10 px-4 py-3 text-sm font-black text-purple-100">Melodic Universe</Link></nav>

        <section className="grid gap-6 lg:grid-cols-[1.05fr_.95fr]">
          <article className="rounded-[2.8rem] border border-white/10 bg-black/45 p-7 backdrop-blur-2xl sm:p-10">
            <p className="text-xs font-black uppercase tracking-[.34em] text-purple-100/45">Song Memory</p>
            <h1 className="mt-4 text-6xl font-black tracking-[-.08em] sm:text-8xl">{song.title}</h1>
            <p className="mt-4 text-lg font-black text-purple-100/70">{song.type} · {song.mood} · {song.bpm} BPM · {song.key}</p>
            <p className="mt-7 max-w-3xl text-base leading-8 text-white/58">{song.story}</p>
            <div className="mt-8 grid gap-3 sm:grid-cols-3">{song.lines.map((line, index) => <div key={line} className="rounded-[1.5rem] border border-white/10 bg-white/[.035] p-4"><p className="font-mono text-xs text-purple-100/35">0{index + 1}</p><p className="mt-3 text-sm font-black leading-6 text-white/70">{line}</p></div>)}</div>
          </article>

          <aside className="rounded-[2.8rem] border border-purple-200/15 bg-black/50 p-6 shadow-purple-glow backdrop-blur-2xl">
            <div className="grid aspect-square place-items-center rounded-[2rem] border border-white/10" style={{ background: `radial-gradient(circle, ${song.colors[0]}55, ${song.colors[1]}22 50%, transparent 70%)` }}><div className="text-center"><div className="mx-auto h-36 w-36 rounded-full border border-purple-100/25 bg-white/[.04] shadow-[0_0_80px_rgba(183,108,255,.35)]" /><p className="mt-5 font-mono text-xs uppercase tracking-[.22em] text-white/35">Audio visualizer ready</p></div></div>
            <div className="mt-5 grid grid-cols-2 gap-3"><button className="rounded-full bg-purple-300 px-4 py-3 text-sm font-black text-black">Play Song</button><button className="rounded-full border border-white/10 bg-white/[.04] px-4 py-3 text-sm font-black text-white/65">Save Memory</button></div>
          </aside>
        </section>

        <section className="mt-6 grid gap-5 lg:grid-cols-[.9fr_1.1fr]">
          <article className="rounded-[2rem] border border-white/10 bg-black/42 p-6 backdrop-blur-xl"><p className="text-xs font-black uppercase tracking-[.25em] text-purple-100/45">Frequency DNA</p><div className="mt-5 grid gap-4">{song.dna.map(([label,value]) => <div key={label}><div className="flex justify-between text-sm font-black"><span>{label}</span><span className="text-purple-100">{value}%</span></div><div className="mt-2 h-3 overflow-hidden rounded-full bg-white/10"><div className="h-full rounded-full bg-purple-300" style={{ width: `${value}%` }} /></div></div>)}</div></article>
          <article className="rounded-[2rem] border border-white/10 bg-black/42 p-6 backdrop-blur-xl"><p className="text-xs font-black uppercase tracking-[.25em] text-purple-100/45">Inside the Record</p><div className="mt-5 grid gap-3 sm:grid-cols-2">{['Lyrics','Creator Notes','Credits','Production Details','Fan Interpretations','Related Frequencies'].map((item) => <button key={item} className="rounded-[1.4rem] border border-white/10 bg-white/[.035] p-4 text-left text-sm font-black text-white/65">{item} →</button>)}</div></article>
        </section>
      </div>
    </main>
  );
}
