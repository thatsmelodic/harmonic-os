'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';

const verdicts = [
  { name: 'Schmakinn', score: 95, color: 'from-purple-400 to-fuchsia-300', meaning: 'Elite. The frequency was found.' },
  { name: 'Crackin', score: 82, color: 'from-yellow-300 to-orange-300', meaning: 'Solid. Worth running back.' },
  { name: 'Lackin', score: 58, color: 'from-orange-400 to-red-400', meaning: 'Potential was there, execution slipped.' },
  { name: 'Bunz', score: 24, color: 'from-zinc-500 to-zinc-800', meaning: 'Save your money.' },
];

const reviews = [
  { place: 'Midnight Burger Club', dish: 'Double smash burger', city: 'Baltimore', verdict: 'Schmakinn', flavor: 96, value: 84, culture: 91 },
  { place: 'Golden Wok', dish: 'Hot honey wings', city: 'Milwaukee', verdict: 'Crackin', flavor: 87, value: 92, culture: 78 },
  { place: 'Sunday Table', dish: 'Mac, greens & fried chicken', city: 'Chicago', verdict: 'Schmakinn', flavor: 94, value: 89, culture: 100 },
  { place: 'Late Plate', dish: 'Loaded fries', city: 'Baltimore', verdict: 'Lackin', flavor: 61, value: 52, culture: 67 },
];

export default function SchmackinnReviewsPage() {
  const [active, setActive] = useState(reviews[0]);
  const verdict = useMemo(() => verdicts.find((item) => item.name === active.verdict)!, [active]);

  return (
    <main className="schmackinn-world relative min-h-screen overflow-hidden px-4 py-8 pb-28 text-white sm:px-6">
      <div className="schmackinn-aurora absolute inset-0 -z-30" />
      <div className="restaurant-rain absolute inset-0 -z-20 opacity-40" />
      <div className="steam-cloud steam-one" /><div className="steam-cloud steam-two" />
      <div className="mx-auto max-w-7xl">
        <nav className="mb-8 flex flex-wrap items-center justify-between gap-3"><Link href="/worlds/schmackinn" className="rounded-full border border-white/10 bg-white/[.04] px-4 py-3 text-sm font-black text-white/70">← Flavor District</Link><Link href="/worlds/schmackinn/map" className="rounded-full border border-purple-200/20 bg-purple-300/10 px-4 py-3 text-sm font-black text-purple-100">Explore the City</Link></nav>

        <header className="rounded-[2.8rem] border border-purple-200/15 bg-black/50 p-7 shadow-[0_0_80px_rgba(183,108,255,.18)] backdrop-blur-2xl sm:p-10"><p className="text-xs font-black uppercase tracking-[.34em] text-purple-100/45">Review Theater</p><h1 className="mt-4 text-6xl font-black tracking-[-.08em] sm:text-8xl">Every bite gets a verdict.</h1><p className="mt-5 max-w-3xl text-base leading-8 text-white/58">Reviews are not buried in a feed. Each one becomes a living scene with flavor, value, culture, comedy, and the final frequency reveal.</p></header>

        <section className="mt-6 grid gap-5 lg:grid-cols-[.9fr_1.1fr]">
          <div className="grid gap-4">{reviews.map((review, index) => <button key={review.place} onClick={() => setActive(review)} className={`rounded-[1.8rem] border p-5 text-left backdrop-blur-xl transition hover:-translate-y-1 ${active.place === review.place ? 'border-purple-200/35 bg-purple-300/10' : 'border-white/10 bg-black/40'}`}><p className="font-mono text-xs text-purple-100/40">0{index + 1} · {review.city}</p><h2 className="mt-3 text-3xl font-black tracking-[-.05em]">{review.place}</h2><p className="mt-2 text-sm text-white/45">{review.dish}</p><span className="mt-4 inline-flex rounded-full border border-white/10 px-3 py-1 text-xs font-black text-white/60">{review.verdict}</span></button>)}</div>

          <article className="sticky top-6 h-fit overflow-hidden rounded-[2.2rem] border border-purple-200/15 bg-black/50 shadow-[0_0_80px_rgba(183,108,255,.16)] backdrop-blur-2xl">
            <div className={`grid aspect-video place-items-center bg-gradient-to-br ${verdict.color}`}><div className="text-center text-black"><p className="text-xs font-black uppercase tracking-[.25em] opacity-55">First Bite Camera</p><p className="mt-3 text-7xl">🍽️</p><p className="mt-4 text-4xl font-black tracking-[-.06em]">{active.dish}</p></div></div>
            <div className="p-6"><p className="text-xs font-black uppercase tracking-[.24em] text-purple-100/45">Final Frequency</p><div className="mt-3 flex flex-wrap items-end justify-between gap-4"><div><h2 className="text-5xl font-black tracking-[-.07em]">{verdict.name}</h2><p className="mt-2 text-sm text-white/45">{verdict.meaning}</p></div><p className="text-5xl font-black text-purple-100">{verdict.score}</p></div><div className="mt-6 grid gap-3 sm:grid-cols-3">{[['Flavor',active.flavor],['Value',active.value],['Culture',active.culture]].map(([label,value]) => <div key={label} className="rounded-2xl border border-white/10 bg-white/[.035] p-4"><p className="text-xs font-black uppercase tracking-[.16em] text-white/30">{label}</p><p className="mt-2 text-3xl font-black">{value}%</p></div>)}</div><div className="mt-6 grid grid-cols-2 gap-3"><button className="rounded-full bg-purple-300 px-4 py-3 text-sm font-black text-black">Watch Review</button><button className="rounded-full border border-white/10 bg-white/[.04] px-4 py-3 text-sm font-black text-white/65">Save Spot</button></div></div>
          </article>
        </section>
      </div>
    </main>
  );
}
