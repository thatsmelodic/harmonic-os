'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';

const possessions = [
  { time: '2:14', team: 'Melodic', action: 'Stepback three', score: '17–15', heat: 8 },
  { time: '1:48', team: 'Tone', action: 'Downhill finish', score: '17–17', heat: 6 },
  { time: '1:03', team: 'Melodic', action: 'Defensive stop', score: '17–17', heat: 5 },
  { time: '0:42', team: 'Melodic', action: 'Corner jumper', score: '19–17', heat: 7 },
];

export default function FriedEmCenterCourtPage() {
  const [home, setHome] = useState(19);
  const [away, setAway] = useState(17);
  const [spectators, setSpectators] = useState(78);
  const [reaction, setReaction] = useState('');
  const winner = useMemo(() => home >= 21 ? 'Melodic' : away >= 21 ? 'Tone' : null, [home, away]);

  const react = (value: string) => {
    setReaction(value);
    setSpectators((current) => current + 1);
  };

  return (
    <main className="fried-em-world min-h-screen px-4 py-8 text-white sm:px-6">
      <div className="mx-auto max-w-7xl">
        <nav className="mb-8 flex flex-wrap items-center justify-between gap-3">
          <Link href="/worlds/fried-em" className="rounded-full border border-white/10 bg-white/[.04] px-4 py-3 text-sm font-black text-white/70">← Back to Park</Link>
          <div className="flex gap-2"><Link href="/worlds/fried-em/challenges" className="rounded-full border border-white/10 bg-white/[.04] px-4 py-3 text-sm font-black text-white/70">Challenge Arena</Link><Link href="/worlds/fried-em/seasons" className="rounded-full border border-white/10 bg-white/[.04] px-4 py-3 text-sm font-black text-white/70">Season One</Link></div>
        </nav>

        <section className="overflow-hidden rounded-[2.8rem] border border-orange-300/15 bg-black/55 shadow-[0_0_90px_rgba(255,122,26,.18)] backdrop-blur-2xl">
          <div className="grid min-h-[520px] place-items-center bg-[radial-gradient(circle_at_center,rgba(255,122,26,.25),transparent_22rem),linear-gradient(to_bottom,#120704,#020202)] p-6">
            <div className="w-full max-w-5xl">
              <div className="flex flex-wrap items-center justify-between gap-4"><div><p className="text-xs font-black uppercase tracking-[.3em] text-red-300">● Live Now</p><h1 className="mt-3 text-5xl font-black tracking-[-.07em] sm:text-7xl">Center Court</h1></div><div className="rounded-full border border-white/10 bg-white/[.05] px-4 py-2 text-sm font-black text-white/65">{spectators} watching</div></div>

              <div className="mt-8 grid items-center gap-5 md:grid-cols-[1fr_auto_1fr]">
                <Team name="Melodic" record="8–1" score={home} onScore={() => setHome((value) => Math.min(21, value + 1))} />
                <div className="text-center"><p className="text-xs font-black uppercase tracking-[.25em] text-white/30">First to 21</p><p className="mt-3 text-4xl font-black text-orange-200">VS</p><p className="mt-3 text-sm text-white/35">Game point pressure</p></div>
                <Team name="Tone" record="5–3" score={away} onScore={() => setAway((value) => Math.min(21, value + 1))} />
              </div>

              {winner && <div className="mt-6 rounded-[1.7rem] border border-orange-300/20 bg-orange-400/10 p-5 text-center"><p className="text-xs font-black uppercase tracking-[.2em] text-orange-200/55">Final</p><h2 className="mt-2 text-4xl font-black">{winner} keeps court.</h2></div>}

              <div className="mt-8 grid gap-4 lg:grid-cols-[1.2fr_.8fr]">
                <article className="rounded-[2rem] border border-white/10 bg-black/45 p-6"><p className="text-xs font-black uppercase tracking-[.22em] text-orange-200/45">Possession Feed</p><div className="mt-4 grid gap-3">{possessions.map((item) => <div key={`${item.time}-${item.action}`} className="grid grid-cols-[auto_1fr_auto] items-center gap-4 rounded-2xl border border-white/10 bg-white/[.035] p-4"><span className="font-mono text-xs text-white/35">{item.time}</span><div><p className="font-black">{item.team}</p><p className="mt-1 text-sm text-white/45">{item.action}</p></div><div className="text-right"><p className="font-black text-orange-200">{item.score}</p><p className="mt-1 text-xs text-white/30">Heat +{item.heat}</p></div></div>)}</div></article>
                <article className="rounded-[2rem] border border-white/10 bg-black/45 p-6"><p className="text-xs font-black uppercase tracking-[.22em] text-orange-200/45">Crowd Control</p><h2 className="mt-3 text-3xl font-black">Who got next?</h2><div className="mt-5 grid grid-cols-2 gap-3">{['🔥 Heat', '👏 Respect', '🍳 Cooked', '🎯 Clutch'].map((item) => <button key={item} onClick={() => react(item)} className="rounded-2xl border border-white/10 bg-white/[.04] p-4 text-sm font-black transition hover:border-orange-300/30 hover:bg-orange-400/10">{item}</button>)}</div>{reaction && <p className="mt-4 text-sm text-orange-100/70">Reaction sent: {reaction}</p>}<Link href="/worlds/fried-em/challenges" className="mt-5 inline-flex rounded-full bg-orange-400 px-5 py-3 text-sm font-black text-black">Call Next</Link></article>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

function Team({ name, record, score, onScore }: { name: string; record: string; score: number; onScore: () => void }) {
  return <article className="rounded-[2rem] border border-white/10 bg-white/[.045] p-6 text-center"><p className="text-xs font-black uppercase tracking-[.2em] text-white/35">{record}</p><h2 className="mt-3 text-4xl font-black tracking-[-.05em]">{name}</h2><p className="mt-4 text-8xl font-black tracking-[-.09em] text-orange-100">{score}</p><button onClick={onScore} className="mt-5 rounded-full border border-orange-300/20 bg-orange-400/10 px-4 py-2 text-sm font-black text-orange-100">+1 Point</button></article>;
}
