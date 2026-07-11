'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';
import { LuxuryFashionHouseExperience } from '@/components/two-harmonic/LuxuryFashionHouseExperience';

const categories = ['All', 'First Wear', 'Everyday Frequency', 'Studio Session', 'Travel', 'Milestone'];
const memories = [
  { id: 'launch-film', title: 'Beige Frequency Launch Film', wearer: '2 Harmonic', city: 'Milwaukee', category: 'First Wear', garment: 'Ivory Frequency Zip', videoUrl: '' },
  { id: 'community-01', title: 'Your memory belongs here', wearer: 'Community', city: 'Worldwide', category: 'Everyday Frequency', garment: 'Lavender Frequency Zip', videoUrl: '' },
];

export default function LivingClosetPage() {
  const [filter, setFilter] = useState('All');
  const filtered = useMemo(() => filter === 'All' ? memories : memories.filter((memory) => memory.category === filter), [filter]);

  return (
    <main className="two-harmonic-world relative min-h-screen overflow-hidden px-4 py-8 pb-28 sm:px-6" data-world-shell>
      <LuxuryFashionHouseExperience />
      <div className="absolute inset-0 -z-30 bg-[radial-gradient(circle_at_20%_15%,rgba(231,207,157,.14),transparent_27rem),radial-gradient(circle_at_80%_45%,rgba(168,85,247,.1),transparent_30rem),linear-gradient(145deg,#090705,#17110c_55%,#070506)]" />
      <div className="mx-auto max-w-7xl">
        <nav className="mb-8 flex flex-wrap items-center justify-between gap-3">
          <Link href="/worlds/two-harmonic" className="rounded-full border border-[#d8c7aa]/20 bg-black/25 px-4 py-3 text-sm font-black text-[#d8c7aa]">← Fashion House</Link>
          <Link href="/studio/two-harmonic" className="rounded-full bg-[#e7cf9d] px-5 py-3 text-sm font-black text-[#1a120a]">Upload a Closet Memory</Link>
        </nav>

        <header className="rounded-[3rem] border border-[#8c785f] bg-black/35 p-7 backdrop-blur-2xl sm:p-11">
          <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-end">
            <div><p className="text-xs font-black uppercase tracking-[.38em] text-[#b9a78c]">The Living Closet</p><h1 className="mt-4 text-6xl font-black tracking-[-.09em] text-[#f5efe4] sm:text-8xl">The brand in motion.</h1><p className="mt-5 max-w-3xl text-lg leading-8 text-[#c8b99f]">No product photos. No follower competition. Only videos of real people wearing 2 Harmonic and adding their own memory to the garment.</p></div>
            <img src="/identity/two-harmonic-mark-gold.svg" alt="2 Harmonic Living Closet" className="h-36 w-28 object-contain drop-shadow-[0_0_28px_rgba(231,207,157,.25)]" />
          </div>
          <div className="mt-8 flex flex-wrap gap-2">{categories.map((category) => <button key={category} onClick={() => setFilter(category)} className={`rounded-full border px-4 py-2 text-xs font-black uppercase tracking-[.14em] ${filter === category ? 'border-[#e7cf9d] bg-[#e7cf9d] text-[#1a120a]' : 'border-[#d8c7aa]/20 bg-black/20 text-[#d8c7aa]'}`}>{category}</button>)}</div>
        </header>

        <section className="mt-6 grid gap-5 md:grid-cols-2">
          {filtered.map((memory) => <article key={memory.id} className="overflow-hidden rounded-[2.6rem] border border-[#8c785f]/65 bg-black/35 backdrop-blur-xl">
            <div className="relative aspect-[9/12] overflow-hidden bg-[radial-gradient(circle,rgba(231,207,157,.14),transparent_45%),linear-gradient(145deg,#17110c,#080605)]">
              {memory.videoUrl ? <video src={memory.videoUrl} controls playsInline className="h-full w-full object-cover" /> : <div className="grid h-full place-items-center p-8 text-center"><div><img src="/identity/two-harmonic-mark-gold.svg" alt="" className="mx-auto h-44 w-36 object-contain opacity-60" /><p className="mt-7 text-xs font-black uppercase tracking-[.28em] text-[#b9a78c]">Video memory slot</p><p className="mx-auto mt-3 max-w-sm text-sm leading-7 text-[#8f7d65]">This frame activates only when an approved wearing-the-brand video is uploaded.</p></div></div>}
              <span className="absolute left-5 top-5 rounded-full border border-[#e7cf9d]/30 bg-black/50 px-3 py-2 text-[10px] font-black uppercase tracking-[.18em] text-[#e7cf9d]">{memory.category}</span>
            </div>
            <div className="p-6"><p className="text-xs font-black uppercase tracking-[.18em] text-[#9f8a6d]">{memory.city} · {memory.garment}</p><h2 className="mt-3 text-3xl font-black tracking-[-.05em] text-[#f5efe4]">{memory.title}</h2><p className="mt-3 text-sm text-[#b9a78c]">Worn by {memory.wearer}</p></div>
          </article>)}
        </section>

        <section className="mt-8 rounded-[2.8rem] border border-[#8c785f]/65 bg-[#d8c7aa]/5 p-7 text-center sm:p-10">
          <p className="text-xs font-black uppercase tracking-[.3em] text-[#b9a78c]">Closet Standard</p>
          <h2 className="mt-4 text-4xl font-black tracking-[-.06em] text-[#f5efe4]">Every upload must show the garment living.</h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-[#a9967a]">Walking, performing, traveling, hooping, celebrating, creating, or simply existing with confidence. Static product images do not enter this archive.</p>
        </section>
      </div>
    </main>
  );
}
