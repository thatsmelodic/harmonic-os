'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';

const memories = [
  { id: 1, place: 'Sunday Table', dish: 'Fried chicken, mac & greens', city: 'Chicago', date: 'Jun 22, 2026', people: 'Family table', verdict: 'Schmakinn', note: 'The kind of plate that tastes like somebody remembered you were coming.', emoji: '🍗', color: 'from-amber-300/25 to-orange-500/10' },
  { id: 2, place: 'Midnight Burger Club', dish: 'Double smash burger', city: 'Baltimore', date: 'Jul 02, 2026', people: 'The crew', verdict: 'Schmakinn', note: 'The review stopped being serious after the sauce hit.', emoji: '🍔', color: 'from-purple-400/25 to-fuchsia-400/10' },
  { id: 3, place: 'Golden Wok', dish: 'Hot honey wings', city: 'Milwaukee', date: 'May 18, 2026', people: 'Solo mission', verdict: 'Crackin', note: 'Cheap, loud flavor, and worth the drive back home.', emoji: '🥡', color: 'from-yellow-300/25 to-red-400/10' },
  { id: 4, place: 'Late Plate', dish: 'Loaded fries', city: 'Baltimore', date: 'Apr 14, 2026', people: 'After the game', verdict: 'Lackin', note: 'The memory was better than the food—and that still counts for something.', emoji: '🍟', color: 'from-orange-400/20 to-zinc-600/10' },
];

export default function SchmackinnMemoriesPage() {
  const [filter, setFilter] = useState('All');
  const [selected, setSelected] = useState(memories[0]);
  const visible = useMemo(() => filter === 'All' ? memories : memories.filter((memory) => memory.verdict === filter), [filter]);

  return (
    <main className="schmackinn-world relative min-h-screen overflow-hidden px-4 py-8 pb-28 text-white sm:px-6">
      <div className="schmackinn-aurora absolute inset-0 -z-30" />
      <div className="restaurant-rain absolute inset-0 -z-20 opacity-25" />
      <div className="steam-cloud steam-two" />
      <div className="mx-auto max-w-7xl">
        <nav className="mb-8 flex flex-wrap items-center justify-between gap-3"><Link href="/worlds/schmackinn" className="rounded-full border border-white/10 bg-white/[.04] px-4 py-3 text-sm font-black text-white/70">← Flavor District</Link><Link href="/worlds/schmackinn/flavor-lab" className="rounded-full border border-purple-200/20 bg-purple-300/10 px-4 py-3 text-sm font-black text-purple-100">Flavor Lab</Link></nav>

        <header className="rounded-[2.8rem] border border-purple-200/15 bg-black/50 p-7 shadow-[0_0_80px_rgba(183,108,255,.18)] backdrop-blur-2xl sm:p-10"><p className="text-xs font-black uppercase tracking-[.34em] text-purple-100/45">Food Memories</p><h1 className="mt-4 text-6xl font-black tracking-[-.08em] sm:text-8xl">Some meals feed the archive.</h1><p className="mt-5 max-w-3xl text-base leading-8 text-white/58">The plate, the people, the city, the joke at the table, and how life felt that day stay connected. Schmackinn remembers more than a score.</p></header>

        <div className="mt-6 flex flex-wrap gap-2">{['All','Schmakinn','Crackin','Lackin','Bunz'].map((item) => <button key={item} onClick={() => setFilter(item)} className={`rounded-full border px-4 py-3 text-sm font-black ${filter === item ? 'border-purple-200/30 bg-purple-300 text-black' : 'border-white/10 bg-white/[.04] text-white/60'}`}>{item}</button>)}</div>

        <section className="mt-6 grid gap-5 lg:grid-cols-[.9fr_1.1fr]">
          <div className="grid gap-4">{visible.map((memory) => <button key={memory.id} onClick={() => setSelected(memory)} className={`overflow-hidden rounded-[1.9rem] border p-5 text-left backdrop-blur-xl transition hover:-translate-y-1 ${selected.id === memory.id ? 'border-purple-200/35 bg-purple-300/10' : 'border-white/10 bg-black/40'}`}><div className="flex items-center gap-4"><div className={`grid h-20 w-20 shrink-0 place-items-center rounded-[1.4rem] bg-gradient-to-br ${memory.color} text-5xl`}>{memory.emoji}</div><div><p className="font-mono text-xs text-purple-100/40">{memory.date} · {memory.city}</p><h2 className="mt-2 text-2xl font-black tracking-[-.05em]">{memory.place}</h2><p className="mt-1 text-sm text-white/45">{memory.dish}</p></div></div></button>)}</div>

          <article className="sticky top-6 h-fit overflow-hidden rounded-[2.3rem] border border-purple-200/15 bg-black/50 shadow-[0_0_80px_rgba(183,108,255,.16)] backdrop-blur-2xl"><div className={`grid aspect-video place-items-center bg-gradient-to-br ${selected.color}`}><div className="text-center"><p className="text-8xl">{selected.emoji}</p><p className="mt-4 text-xs font-black uppercase tracking-[.28em] text-white/45">Memory Playback</p></div></div><div className="p-6 sm:p-8"><div className="flex flex-wrap items-start justify-between gap-4"><div><p className="text-xs font-black uppercase tracking-[.22em] text-purple-100/45">{selected.city} · {selected.date}</p><h2 className="mt-2 text-4xl font-black tracking-[-.06em]">{selected.place}</h2><p className="mt-2 text-white/50">{selected.dish}</p></div><span className="rounded-full border border-purple-200/20 bg-purple-300/10 px-4 py-2 text-sm font-black text-purple-100">{selected.verdict}</span></div><blockquote className="mt-6 rounded-[1.7rem] border border-white/10 bg-white/[.035] p-5 text-xl font-black leading-8 text-white/82">“{selected.note}”</blockquote><div className="mt-5 grid gap-3 sm:grid-cols-2"><div className="rounded-2xl border border-white/10 bg-white/[.03] p-4"><p className="text-xs font-black uppercase tracking-[.18em] text-white/30">Shared With</p><p className="mt-2 font-black">{selected.people}</p></div><div className="rounded-2xl border border-white/10 bg-white/[.03] p-4"><p className="text-xs font-black uppercase tracking-[.18em] text-white/30">Archive State</p><p className="mt-2 font-black">Saved to your table</p></div></div><div className="mt-6 grid grid-cols-2 gap-3"><Link href="/worlds/schmackinn/reviews" className="rounded-full bg-purple-300 px-4 py-3 text-center text-sm font-black text-black">Replay Review</Link><button className="rounded-full border border-white/10 bg-white/[.04] px-4 py-3 text-sm font-black text-white/65">Share Memory</button></div></div></article>
        </section>
      </div>
    </main>
  );
}
