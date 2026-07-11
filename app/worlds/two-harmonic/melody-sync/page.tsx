'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';
import { beigeGarments } from '@/data/two-harmonic-universe';
import { WorldCopy } from '@/components/studio/WorldCopy';

const beats = [
  { label: 'Silence', note: 'The room clears so the garment can speak first.' },
  { label: 'Pulse', note: 'A low rhythm wakes the stitched heart and hardware.' },
  { label: 'Lift', note: 'The melody rises while the garment moves into light.' },
  { label: 'Memory', note: 'Lyrics become fragments around the piece.' },
  { label: 'Frequency', note: 'Song, garment, and meaning resolve into one release.' },
];

export default function MelodySyncPage() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [garmentIndex, setGarmentIndex] = useState(0);
  const garment = beigeGarments[garmentIndex];
  const beat = beats[activeIndex];
  const intensity = useMemo(() => 18 + activeIndex * 16, [activeIndex]);

  const advance = () => {
    setIsPlaying(true);
    setActiveIndex((current) => Math.min(beats.length - 1, current + 1));
  };

  return (
    <main className="two-harmonic-world relative min-h-screen overflow-hidden px-4 py-8 pb-28 sm:px-6" data-world-shell>
      <div className="absolute inset-0 -z-30 transition-all duration-700" style={{ background: `radial-gradient(circle at center,rgba(245,239,228,${intensity / 160}),transparent 30rem),radial-gradient(circle at 75% 30%,rgba(111,90,69,.24),transparent 25rem),linear-gradient(145deg,#0c0907,#231a13 55%,#090706)` }} />
      <div className="absolute inset-0 -z-20 opacity-30" style={{ backgroundImage: 'repeating-linear-gradient(90deg,transparent 0 44px,rgba(216,199,170,.05) 45px 46px)' }} />
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">{['♪','♬','∞','2','♩','÷'].map((symbol, index) => <span key={symbol} className="absolute transition-all duration-700" style={{ left: `${12 + index * 14}%`, top: `${18 + (index % 3) * 24}%`, fontSize: `${28 + activeIndex * 6}px`, opacity: isPlaying ? .08 + activeIndex * .025 : .03, transform: `translateY(${isPlaying ? -activeIndex * (8 + index) : 0}px)` }}>{symbol}</span>)}</div>

      <div className="mx-auto max-w-7xl">
        <nav className="mb-8 flex flex-wrap items-center justify-between gap-3">
          <Link href="/worlds/two-harmonic/collections" className="rounded-full border border-[#d8c7aa]/20 bg-black/25 px-4 py-3 text-sm font-black text-[#d8c7aa]">← Beige Frequency</Link>
          <Link href="/worlds/two-harmonic" className="rounded-full border border-[#d8c7aa]/20 bg-[#d8c7aa]/8 px-4 py-3 text-sm font-black text-[#f5efe4]">Fashion House</Link>
        </nav>

        <header className="rounded-[3rem] border border-[#8c785f] bg-black/35 p-7 backdrop-blur-2xl sm:p-11">
          <p className="text-xs font-black uppercase tracking-[.38em] text-[#b9a78c]">Melody Sync Chamber</p>
          <h1 className="mt-4 text-6xl font-black tracking-[-.09em] text-[#f5efe4] sm:text-8xl"><WorldCopy world="two-harmonic" field="melodyTitle" fallback="Hear what the garment remembers." /></h1>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-[#c8b99f]"><WorldCopy world="two-harmonic" field="melodyDescription" fallback="Music is not background decoration in 2 Harmonic. It is the emotional blueprint that decides the collection's pace, lighting, movement, language, and release." /></p>
        </header>

        <section className="mt-6 grid gap-5 lg:grid-cols-[.8fr_1.2fr]">
          <aside className="h-fit rounded-[2.5rem] border border-[#8c785f]/70 bg-black/35 p-5 backdrop-blur-xl lg:sticky lg:top-5">
            <p className="text-xs font-black uppercase tracking-[.24em] text-[#a9967a]">Choose Garment</p>
            <div className="mt-4 grid gap-3">{beigeGarments.map((item, index) => <button key={item.slug} onClick={() => { setGarmentIndex(index); setActiveIndex(0); setIsPlaying(false); }} className={`rounded-[1.7rem] border p-4 text-left ${garmentIndex === index ? 'border-[#f5efe4] bg-[#d8c7aa]/12' : 'border-white/8 bg-white/[.025]'}`}><p className="text-[10px] font-black uppercase tracking-[.16em] text-[#a9967a]">{item.type}</p><div className="mt-2 flex items-center justify-between gap-4"><h2 className="text-lg font-black text-[#f5efe4]">{item.name}</h2><span className="text-2xl">{item.symbol}</span></div></button>)}</div>
            <div className="mt-5 rounded-[1.8rem] border border-[#d8c7aa]/15 bg-[#d8c7aa]/6 p-5"><p className="text-xs font-black uppercase tracking-[.18em] text-[#a9967a]">Stitched Line</p><p className="mt-3 text-xl font-black leading-8 text-[#f5efe4]">“{garment.lyric}”</p></div>
          </aside>

          <article className="overflow-hidden rounded-[3rem] border border-[#8c785f] bg-black/40 shadow-[0_0_100px_rgba(216,199,170,.1)] backdrop-blur-2xl">
            <div className="relative grid min-h-[650px] place-items-center overflow-hidden p-8 text-center">
              <div className="absolute inset-0 transition-all duration-700" style={{ background: `radial-gradient(circle,rgba(245,239,228,${.08 + activeIndex * .035}),transparent ${20 + activeIndex * 3}rem),linear-gradient(to bottom,rgba(111,90,69,${.06 + activeIndex * .03}),transparent)` }} />
              <div className="relative z-10 max-w-3xl">
                <p className="text-xs font-black uppercase tracking-[.3em] text-[#b9a78c]">Lift U Up · Movement {activeIndex + 1}/{beats.length}</p>
                <div className={`mx-auto mt-8 grid h-72 w-72 place-items-center rounded-[4rem] border border-[#d8c7aa]/25 bg-[#d8c7aa]/8 text-[10rem] text-[#f5efe4] transition-all duration-700 ${isPlaying ? 'scale-105' : ''}`} style={{ boxShadow: `0 0 ${40 + activeIndex * 18}px rgba(245,239,228,${.05 + activeIndex * .025})` }}>{garment.symbol}</div>
                <h2 className="mt-7 text-5xl font-black tracking-[-.07em] text-[#f5efe4] sm:text-7xl">{beat.label}</h2>
                <p className="mx-auto mt-4 max-w-xl text-base leading-8 text-[#c8b99f]">{beat.note}</p>

                <div className="mx-auto mt-8 flex max-w-2xl gap-2">{beats.map((_, index) => <div key={index} className="h-2 flex-1 rounded-full transition-all" style={{ background: index <= activeIndex ? '#f5efe4' : 'rgba(255,255,255,.1)' }} />)}</div>

                <div className="mt-8 flex flex-wrap justify-center gap-3">
                  {activeIndex > 0 && <button onClick={() => setActiveIndex((value) => Math.max(0, value - 1))} className="rounded-full border border-[#d8c7aa]/20 bg-black/20 px-6 py-4 text-sm font-black text-[#d8c7aa]">Previous Movement</button>}
                  {activeIndex < beats.length - 1 ? <button onClick={advance} className="rounded-full bg-[#f5efe4] px-7 py-4 text-sm font-black text-[#241b14]">{isPlaying ? 'Continue the Song →' : 'Begin Lift U Up →'}</button> : <Link href="/worlds/two-harmonic/collections" className="rounded-full bg-[#f5efe4] px-7 py-4 text-sm font-black text-[#241b14]">Enter the Collection</Link>}
                </div>
              </div>
            </div>

            <div className="grid gap-3 border-t border-[#8c785f]/45 p-6 sm:grid-cols-3"><div className="rounded-2xl border border-[#d8c7aa]/15 bg-black/20 p-4"><p className="text-xs uppercase tracking-[.16em] text-[#a9967a]">Song</p><p className="mt-2 text-xl font-black text-[#f5efe4]">Lift U Up</p></div><div className="rounded-2xl border border-[#d8c7aa]/15 bg-black/20 p-4"><p className="text-xs uppercase tracking-[.16em] text-[#a9967a]">Mood Key</p><p className="mt-2 text-xl font-black text-[#f5efe4]">Calm Confidence</p></div><div className="rounded-2xl border border-[#d8c7aa]/15 bg-black/20 p-4"><p className="text-xs uppercase tracking-[.16em] text-[#a9967a]">Collection</p><p className="mt-2 text-xl font-black text-[#f5efe4]">Beige Frequency</p></div></div>
          </article>
        </section>
      </div>
    </main>
  );
}