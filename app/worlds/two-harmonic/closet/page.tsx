'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';
import { LuxuryFashionHouseExperience } from '@/components/two-harmonic/LuxuryFashionHouseExperience';

const memories = [
  { id: 'launch-film', wearer: 'Melodic', city: 'Baltimore', garment: 'Ivory Frequency Zip', thread: 'First Wear', date: 'Chapter I', poster: 'linear-gradient(145deg,#d9c7aa,#17110d 68%)', accent: '#ead7b3', videoUrl: '' },
  { id: 'studio-session', wearer: 'Community Memory 002', city: 'Milwaukee', garment: 'Lavender Frequency Zip', thread: 'Studio Session', date: 'Coming Soon', poster: 'linear-gradient(145deg,#b6a4cd,#09070d 70%)', accent: '#c7b3e4', videoUrl: '' },
  { id: 'airport-fit', wearer: 'Community Memory 003', city: 'Chicago', garment: 'Ivory Frequency Zip', thread: 'Travel', date: 'Coming Soon', poster: 'linear-gradient(145deg,#efe6d7,#16120f 72%)', accent: '#f5ead8', videoUrl: '' },
  { id: 'night-walk', wearer: 'Community Memory 004', city: 'Atlanta', garment: 'Lavender Frequency Zip', thread: 'Everyday Frequency', date: 'Coming Soon', poster: 'linear-gradient(145deg,#79658d,#070509 72%)', accent: '#d8c1ef', videoUrl: '' },
];

const filters = ['All', 'First Wear', 'Studio Session', 'Travel', 'Everyday Frequency'];

export default function LivingClosetPage() {
  const [activeFilter, setActiveFilter] = useState('All');
  const [selected, setSelected] = useState(memories[0]);
  const visible = useMemo(() => activeFilter === 'All' ? memories : memories.filter((memory) => memory.thread === activeFilter), [activeFilter]);

  return (
    <main className="two-harmonic-world relative min-h-screen overflow-hidden bg-[#080604] px-4 py-8 pb-28 text-[#f5efe4] sm:px-6" data-world-shell>
      <LuxuryFashionHouseExperience />
      <div className="absolute inset-0 -z-30" style={{ background: 'radial-gradient(circle at 18% 15%,rgba(216,199,170,.16),transparent 28rem),radial-gradient(circle at 82% 40%,rgba(156,128,181,.14),transparent 30rem),linear-gradient(145deg,#080604,#18110c 58%,#050403)' }} />
      <div className="absolute inset-0 -z-20 opacity-20" style={{ backgroundImage: 'linear-gradient(rgba(216,199,170,.05) 1px,transparent 1px),linear-gradient(90deg,rgba(216,199,170,.05) 1px,transparent 1px)', backgroundSize: '88px 88px' }} />

      <div className="mx-auto max-w-7xl">
        <nav className="mb-8 flex flex-wrap items-center justify-between gap-3">
          <Link href="/worlds/two-harmonic" className="rounded-full border border-[#d8c7aa]/20 bg-black/25 px-4 py-3 text-sm font-black text-[#d8c7aa]">← Fashion House</Link>
          <Link href="/studio/two-harmonic" className="rounded-full bg-[#f5efe4] px-5 py-3 text-sm font-black text-[#241b14]">Submit a Closet Memory</Link>
        </nav>

        <header className="overflow-hidden rounded-[3rem] border border-[#8c785f]/70 bg-black/35 p-7 backdrop-blur-2xl sm:p-11">
          <div className="grid gap-7 lg:grid-cols-[1fr_auto] lg:items-end">
            <div>
              <p className="text-xs font-black uppercase tracking-[.38em] text-[#b9a78c]">The Living Closet</p>
              <h1 className="mt-4 max-w-5xl text-6xl font-black leading-[.88] tracking-[-.09em] sm:text-8xl">The clothes move because the people do.</h1>
              <p className="mt-6 max-w-3xl text-lg leading-8 text-[#c8b99f]">Only approved videos of real people wearing 2 Harmonic live here. No follower counts. No digital inventory. Every clip becomes another memory stitched into the garment&apos;s history.</p>
            </div>
            <div className="rounded-[2rem] border border-[#d8c7aa]/18 bg-[#d8c7aa]/7 p-5 lg:max-w-xs">
              <img src="/identity/two-harmonic-mark-gold.svg" alt="2 Harmonic Living Closet" className="mx-auto h-24 w-20 object-contain" />
              <p className="mt-4 text-xs font-black uppercase tracking-[.2em] text-[#a9967a]">Upload Standard</p>
              <p className="mt-3 text-sm leading-7 text-[#d8c7aa]">Vertical or cinematic video, visible garment, original footage, optional city and occasion. Every submission enters creator review before publication.</p>
            </div>
          </div>
        </header>

        <section className="mt-6 flex flex-wrap gap-2">
          {filters.map((filter) => <button key={filter} onClick={() => setActiveFilter(filter)} className={`rounded-full border px-4 py-2 text-xs font-black uppercase tracking-[.14em] transition ${activeFilter === filter ? 'border-[#f5efe4] bg-[#f5efe4] text-[#241b14]' : 'border-[#d8c7aa]/20 bg-black/20 text-[#b9a78c] hover:border-[#d8c7aa]/45'}`}>{filter}</button>)}
        </section>

        <section className="mt-6 grid gap-5 lg:grid-cols-[1.15fr_.85fr]">
          <div className="grid gap-4 sm:grid-cols-2">
            {visible.map((memory, index) => <button key={memory.id} onClick={() => setSelected(memory)} className={`group relative min-h-[440px] overflow-hidden rounded-[2.5rem] border text-left transition duration-500 hover:-translate-y-2 ${selected.id === memory.id ? 'border-[#f5efe4]/70' : 'border-[#d8c7aa]/16'}`} style={{ background: memory.poster }}>
              <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(3,2,2,.95),transparent_62%)]" />
              <div className="absolute inset-0 opacity-0 transition duration-500 group-hover:opacity-100" style={{ background: `radial-gradient(circle at 50% 32%,${memory.accent}33,transparent 42%)` }} />
              <div className="absolute left-5 top-5 grid h-16 w-16 place-items-center rounded-full border border-white/20 bg-black/30 text-xl backdrop-blur-xl transition group-hover:scale-110">▶</div>
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <p className="text-[10px] font-black uppercase tracking-[.2em]" style={{ color: memory.accent }}>{memory.thread} · {memory.city}</p>
                <h2 className="mt-2 text-2xl font-black">{memory.wearer}</h2>
                <p className="mt-2 text-sm text-white/65">{memory.garment}</p>
              </div>
              <span className="absolute right-5 top-5 text-xs font-black text-white/45">0{index + 1}</span>
            </button>)}
          </div>

          <aside className="h-fit rounded-[3rem] border border-[#8c785f]/65 bg-black/45 p-6 backdrop-blur-2xl lg:sticky lg:top-5 sm:p-8">
            <p className="text-xs font-black uppercase tracking-[.24em] text-[#a9967a]">Selected Memory</p>
            <div className="mt-5 grid aspect-[4/5] place-items-center overflow-hidden rounded-[2.4rem] border border-white/10" style={{ background: selected.poster }}>
              {selected.videoUrl ? <video src={selected.videoUrl} controls playsInline className="h-full w-full object-cover" /> : <div className="grid h-24 w-24 place-items-center rounded-full border border-white/30 bg-black/30 text-3xl backdrop-blur-xl">▶</div>}
            </div>
            <p className="mt-6 text-xs font-black uppercase tracking-[.2em]" style={{ color: selected.accent }}>{selected.thread}</p>
            <h2 className="mt-3 text-4xl font-black tracking-[-.06em]">{selected.wearer}</h2>
            <div className="mt-5 grid grid-cols-2 gap-3">
              <div className="rounded-2xl border border-[#d8c7aa]/14 bg-white/[.025] p-4"><p className="text-[10px] uppercase tracking-[.16em] text-[#8f7b62]">City</p><p className="mt-2 font-black">{selected.city}</p></div>
              <div className="rounded-2xl border border-[#d8c7aa]/14 bg-white/[.025] p-4"><p className="text-[10px] uppercase tracking-[.16em] text-[#8f7b62]">Archive Date</p><p className="mt-2 font-black">{selected.date}</p></div>
            </div>
            <div className="mt-3 rounded-2xl border border-[#d8c7aa]/14 bg-white/[.025] p-4"><p className="text-[10px] uppercase tracking-[.16em] text-[#8f7b62]">Garment</p><p className="mt-2 font-black">{selected.garment}</p></div>
            <p className="mt-5 text-sm leading-7 text-[#9f8b72]">When real uploads are connected, this player will stream the approved clip, preserve its garment relationship, and add it to the collection archive automatically.</p>
          </aside>
        </section>
      </div>
    </main>
  );
}
