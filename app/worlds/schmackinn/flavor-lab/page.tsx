'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';

const dishes = [
  { name: 'Hot Honey Wings', icon: '🍗', flavor: 92, value: 86, comfort: 78, culture: 81, heat: 88, texture: 90 },
  { name: 'Sunday Soul Plate', icon: '🍽️', flavor: 95, value: 89, comfort: 100, culture: 100, heat: 42, texture: 84 },
  { name: 'Midnight Smash Burger', icon: '🍔', flavor: 94, value: 82, comfort: 91, culture: 76, heat: 54, texture: 96 },
  { name: 'Loaded Truffle Fries', icon: '🍟', flavor: 73, value: 48, comfort: 80, culture: 51, heat: 20, texture: 69 },
];

const signals = ['flavor', 'value', 'comfort', 'culture', 'heat', 'texture'] as const;
type Signal = typeof signals[number];

function verdict(score: number) {
  if (score >= 90) return { name: 'Schmakinn', note: 'Frequency found. Elite execution.' };
  if (score >= 76) return { name: 'Crackin', note: 'Worth running back.' };
  if (score >= 55) return { name: 'Lackin', note: 'The potential showed, but the frequency slipped.' };
  return { name: 'Bunz', note: 'Save your money.' };
}

export default function SchmackinnFlavorLabPage() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [weights, setWeights] = useState<Record<Signal, number>>({ flavor: 30, value: 15, comfort: 15, culture: 15, heat: 10, texture: 15 });
  const active = dishes[activeIndex];
  const totalWeight = Object.values(weights).reduce((sum, value) => sum + value, 0) || 1;
  const score = useMemo(() => Math.round(signals.reduce((sum, key) => sum + active[key] * weights[key], 0) / totalWeight), [active, totalWeight, weights]);
  const result = verdict(score);

  return (
    <main className="schmackinn-world relative min-h-screen overflow-hidden px-4 py-8 pb-28 text-white sm:px-6">
      <div className="schmackinn-aurora absolute inset-0 -z-30" />
      <div className="restaurant-rain absolute inset-0 -z-20 opacity-30" />
      <div className="steam-cloud steam-one" />
      <div className="mx-auto max-w-7xl">
        <nav className="mb-8 flex flex-wrap items-center justify-between gap-3">
          <Link href="/worlds/schmackinn" className="rounded-full border border-white/10 bg-white/[.04] px-4 py-3 text-sm font-black text-white/70">← Flavor District</Link>
          <div className="flex gap-2"><Link href="/worlds/schmackinn/reviews" className="rounded-full border border-white/10 bg-white/[.04] px-4 py-3 text-sm font-black text-white/70">Review Theater</Link><Link href="/worlds/schmackinn/memories" className="rounded-full border border-purple-200/20 bg-purple-300/10 px-4 py-3 text-sm font-black text-purple-100">Food Memories</Link></div>
        </nav>

        <header className="rounded-[2.8rem] border border-purple-200/15 bg-black/50 p-7 shadow-[0_0_80px_rgba(183,108,255,.18)] backdrop-blur-2xl sm:p-10">
          <p className="text-xs font-black uppercase tracking-[.34em] text-purple-100/45">Flavor Lab</p>
          <h1 className="mt-4 text-6xl font-black tracking-[-.08em] sm:text-8xl">Taste has a fingerprint.</h1>
          <p className="mt-5 max-w-3xl text-base leading-8 text-white/58">Break every dish into the signals that actually shaped the experience. You control what matters most; Harmonic calculates the pattern, but your final verdict remains yours.</p>
        </header>

        <section className="mt-6 grid gap-5 lg:grid-cols-[.82fr_1.18fr]">
          <div className="grid gap-4">{dishes.map((dish, index) => <button key={dish.name} onClick={() => setActiveIndex(index)} className={`rounded-[1.8rem] border p-5 text-left backdrop-blur-xl transition hover:-translate-y-1 ${index === activeIndex ? 'border-purple-200/35 bg-purple-300/10' : 'border-white/10 bg-black/40'}`}><div className="flex items-center gap-4"><span className="text-5xl">{dish.icon}</span><div><p className="font-mono text-xs text-purple-100/40">SPECIMEN 0{index + 1}</p><h2 className="mt-2 text-2xl font-black tracking-[-.05em]">{dish.name}</h2></div></div></button>)}</div>

          <article className="rounded-[2.2rem] border border-purple-200/15 bg-black/50 p-6 shadow-[0_0_80px_rgba(183,108,255,.16)] backdrop-blur-2xl sm:p-8">
            <div className="flex flex-wrap items-start justify-between gap-5"><div><p className="text-xs font-black uppercase tracking-[.24em] text-purple-100/45">Active Dish</p><h2 className="mt-2 text-4xl font-black tracking-[-.06em]">{active.icon} {active.name}</h2></div><div className="rounded-[1.5rem] border border-purple-200/20 bg-purple-300/10 px-5 py-4 text-right"><p className="text-xs font-black uppercase tracking-[.18em] text-purple-100/45">Lab Signal</p><p className="mt-1 text-4xl font-black text-purple-100">{score}</p><p className="mt-1 text-sm font-black">{result.name}</p></div></div>

            <div className="mt-7 grid gap-4 sm:grid-cols-2">{signals.map((key) => <label key={key} className="rounded-2xl border border-white/10 bg-white/[.035] p-4"><div className="flex items-center justify-between"><span className="text-xs font-black uppercase tracking-[.16em] text-white/45">{key}</span><span className="font-black text-purple-100">{active[key]} · {weights[key]}%</span></div><div className="mt-3 h-2 overflow-hidden rounded-full bg-white/10"><div className="h-full rounded-full bg-purple-300" style={{ width: `${active[key]}%` }} /></div><input className="mt-4 w-full accent-purple-300" type="range" min="0" max="40" value={weights[key]} onChange={(event) => setWeights((current) => ({ ...current, [key]: Number(event.target.value) }))} /></label>)}</div>

            <div className="mt-6 rounded-[1.7rem] border border-white/10 bg-white/[.035] p-5"><p className="text-xs font-black uppercase tracking-[.2em] text-white/35">Why it landed here</p><p className="mt-3 text-lg font-black text-white/80">{result.note}</p><p className="mt-2 text-sm leading-7 text-white/48">Your weighting makes this score personal. A comfort-food lover and a value hunter can experience the same plate differently without either verdict being erased.</p></div>
          </article>
        </section>
      </div>
    </main>
  );
}
