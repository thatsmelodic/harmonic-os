'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';

const tracks = [
  { title: 'Lift U Up', type: 'R&B', mood: 'Healing', bpm: 80, status: 'Memory Saved', story: 'A late-night record about choosing elevation over collapse.' },
  { title: 'Better Luck Nxt Time', type: 'R&B', mood: 'Distance', bpm: 76, status: 'Vault Ready', story: 'A reflection on timing, closure, and what could not be forced.' },
  { title: 'Save The Apology', type: 'R&B', mood: 'Confession', bpm: 82, status: 'Writing Room', story: 'An apology that arrives after the damage already became memory.' },
  { title: 'Barkin N Bitin', type: 'Trap', mood: 'Pressure', bpm: 170, status: 'High Energy', story: 'Aggression, confidence, and motion translated into rhythm.' },
  { title: 'Big Guapo', type: 'Trap', mood: 'Motion', bpm: 146, status: 'Street Mode', story: 'A flex record built around momentum, presence, and hunger.' },
];

export default function MelodicVaultPage() {
  const [filter, setFilter] = useState<'All' | 'R&B' | 'Trap'>('All');
  const [active, setActive] = useState(tracks[0]);
  const visible = useMemo(() => filter === 'All' ? tracks : tracks.filter((track) => track.type === filter), [filter]);

  return (
    <main className="melodic-world relative min-h-screen overflow-hidden px-4 py-8 pb-28 text-white sm:px-6">
      <div className="melodic-aurora absolute inset-0 -z-20" />
      <div className="frequency-grid absolute inset-0 -z-10 opacity-40" />
      <div className="mx-auto max-w-7xl">
        <nav className="mb-8 flex flex-wrap items-center justify-between gap-3"><Link href="/worlds/melodic" className="rounded-full border border-white/10 bg-white/[.04] px-4 py-3 text-sm font-black text-white/70">← Melodic Universe</Link><Link href="/beats" className="rounded-full border border-purple-200/20 bg-purple-300/10 px-4 py-3 text-sm font-black text-purple-100">Beat Store</Link></nav>

        <header className="rounded-[2.8rem] border border-purple-200/15 bg-black/50 p-7 shadow-purple-glow backdrop-blur-2xl sm:p-10">
          <p className="text-xs font-black uppercase tracking-[.34em] text-purple-100/45">Music Vault</p>
          <h1 className="mt-4 text-6xl font-black tracking-[-.08em] sm:text-8xl">Every song remembers.</h1>
          <p className="mt-5 max-w-3xl text-base leading-8 text-white/58">Browse Melodic’s catalog by frequency, mood, and memory. Every record can later connect to lyrics, visualizers, behind-the-song stories, beat licensing, and cross-world moments.</p>
          <div className="mt-6 flex flex-wrap gap-2">{(['All','R&B','Trap'] as const).map((item) => <button key={item} onClick={() => setFilter(item)} className={`rounded-full px-4 py-2 text-sm font-black ${filter === item ? 'bg-purple-300 text-black' : 'border border-white/10 bg-white/[.04] text-white/55'}`}>{item}</button>)}</div>
        </header>

        <section className="mt-6 grid gap-5 lg:grid-cols-[1.05fr_.95fr]">
          <div className="grid gap-4">{visible.map((track, index) => <button key={track.title} onClick={() => setActive(track)} className={`rounded-[1.8rem] border p-5 text-left backdrop-blur-xl transition hover:-translate-y-1 ${active.title === track.title ? 'border-purple-200/35 bg-purple-300/10' : 'border-white/10 bg-black/40'}`}><div className="flex items-start justify-between gap-4"><div><p className="font-mono text-xs text-purple-100/45">0{index + 1} · {track.type} · {track.bpm} BPM</p><h2 className="mt-3 text-3xl font-black tracking-[-.05em]">{track.title}</h2><p className="mt-2 text-sm text-white/45">{track.mood}</p></div><span className="rounded-full border border-white/10 px-3 py-1 text-xs font-black text-white/45">{track.status}</span></div></button>)}</div>

          <article className="sticky top-6 h-fit rounded-[2.2rem] border border-purple-200/15 bg-black/50 p-6 shadow-purple-glow backdrop-blur-2xl">
            <p className="text-xs font-black uppercase tracking-[.28em] text-purple-100/45">Now Tuning</p>
            <h2 className="mt-4 text-5xl font-black tracking-[-.07em]">{active.title}</h2>
            <p className="mt-3 text-sm font-black text-purple-100/65">{active.type} · {active.mood} · {active.bpm} BPM</p>
            <div className="mt-6 grid aspect-square place-items-center rounded-[2rem] border border-white/10 bg-[radial-gradient(circle,rgba(183,108,255,.28),transparent_60%),rgba(255,255,255,.025)]"><div className="text-center"><div className="mx-auto h-28 w-28 rounded-full border border-purple-200/25 bg-purple-300/10 shadow-[0_0_60px_rgba(183,108,255,.35)]" /><p className="mt-5 font-mono text-xs uppercase tracking-[.2em] text-white/35">Visualizer awaiting audio</p></div></div>
            <p className="mt-6 text-sm leading-7 text-white/55">{active.story}</p>
            <div className="mt-6 grid grid-cols-2 gap-3"><button className="rounded-full bg-purple-300 px-4 py-3 text-sm font-black text-black">Play Memory</button><button className="rounded-full border border-white/10 bg-white/[.04] px-4 py-3 text-sm font-black text-white/65">Open Story</button></div>
          </article>
        </section>
      </div>
    </main>
  );
}
