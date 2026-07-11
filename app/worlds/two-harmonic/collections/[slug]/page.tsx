'use client';

import Link from 'next/link';
import { use, useState } from 'react';
import { getBeigeGarment } from '@/data/two-harmonic-universe';

const sizes = ['S', 'M', 'L', 'XL'];

export default function TwoHarmonicGarmentPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const garment = getBeigeGarment(slug);
  const [size, setSize] = useState('M');
  const [chapter, setChapter] = useState<'craft' | 'melody' | 'ownership'>('craft');

  if (!garment) return <main className="min-h-screen bg-black p-10 text-white">Garment not found.</main>;

  return (
    <main className="two-harmonic-world relative min-h-screen overflow-hidden px-4 py-8 pb-28 text-[#f5efe4] sm:px-6" data-world-shell>
      <div className="absolute inset-0 -z-30" style={{ background: 'radial-gradient(circle at 72% 20%,rgba(245,239,228,.16),transparent 28rem),radial-gradient(circle at 16% 62%,rgba(111,90,69,.24),transparent 30rem),linear-gradient(145deg,#0c0907,#211912 52%,#0b0806)' }} />
      <div className="absolute inset-0 -z-20 opacity-20" style={{ backgroundImage: 'linear-gradient(rgba(216,199,170,.08) 1px,transparent 1px),linear-gradient(90deg,rgba(216,199,170,.08) 1px,transparent 1px)', backgroundSize: '88px 88px' }} />

      <div className="mx-auto max-w-7xl">
        <nav className="mb-8 flex flex-wrap items-center justify-between gap-3">
          <Link href="/worlds/two-harmonic/collections" className="rounded-full border border-[#d8c7aa]/20 bg-black/20 px-4 py-3 text-sm font-black text-[#d8c7aa]">← Beige Frequency</Link>
          <Link href="/worlds/two-harmonic/melody-sync" className="rounded-full bg-[#f5efe4] px-5 py-3 text-sm font-black text-[#241b14]">Experience Lift U Up</Link>
        </nav>

        <section className="grid gap-6 lg:grid-cols-[1.08fr_.92fr]">
          <div className="relative min-h-[720px] overflow-hidden rounded-[3.4rem] border border-[#d8c7aa]/25 bg-[linear-gradient(145deg,rgba(48,38,29,.94),rgba(13,10,8,.98))] shadow-[0_0_120px_rgba(216,199,170,.12)]">
            <div className="absolute inset-0" style={{ background: 'radial-gradient(circle,rgba(245,239,228,.17),transparent 26rem)' }} />
            <div className="absolute left-7 top-7 rounded-full border border-[#d8c7aa]/20 bg-black/25 px-4 py-2 text-xs font-black uppercase tracking-[.22em] text-[#d8c7aa]">{garment.edition}</div>
            <div className="relative z-10 grid min-h-[720px] place-items-center p-8 text-center">
              <div>
                <div className="mx-auto grid h-80 w-80 place-items-center rounded-[5rem] border border-[#e4d6c0]/25 bg-[#d8c7aa]/8 text-[12rem] shadow-[0_0_100px_rgba(245,239,228,.08)]">{garment.symbol}</div>
                <p className="mt-8 text-xs font-black uppercase tracking-[.28em] text-[#b9a78c]">{garment.color} · {garment.type}</p>
                <p className="mt-3 text-sm text-[#8f7b62]">Move slowly. Luxury lives in the details.</p>
              </div>
            </div>
          </div>

          <aside className="h-fit rounded-[3.2rem] border border-[#8c785f] bg-[linear-gradient(145deg,rgba(43,34,27,.96),rgba(14,11,9,.98))] p-6 shadow-[0_0_100px_rgba(216,199,170,.1)] sm:p-8 lg:sticky lg:top-5">
            <p className="text-xs font-black uppercase tracking-[.32em] text-[#c9b693]">2 Harmonic · Chapter I</p>
            <h1 className="mt-4 text-5xl font-black leading-[.92] tracking-[-.08em] sm:text-7xl">{garment.name}</h1>
            <p className="mt-5 text-3xl font-black text-[#e6d8c2]">${garment.price}</p>
            <p className="mt-5 text-base leading-8 text-[#b9a78c]">{garment.detail}</p>

            <div className="mt-7 rounded-[1.8rem] border border-[#d8c7aa]/16 bg-black/20 p-5">
              <p className="text-xs font-black uppercase tracking-[.2em] text-[#a9967a]">Select Size</p>
              <div className="mt-4 grid grid-cols-4 gap-2">{sizes.map((item) => <button key={item} onClick={() => setSize(item)} className={`rounded-xl border px-3 py-3 text-sm font-black ${size === item ? 'border-[#f5efe4] bg-[#f5efe4] text-[#241b14]' : 'border-[#d8c7aa]/20 bg-white/[.025] text-[#d8c7aa]'}`}>{item}</button>)}</div>
              <p className="mt-3 text-xs leading-5 text-[#8f7b62]">Selected: {size} · Fit guidance will be connected to Studio before checkout goes live.</p>
            </div>

            <div className="mt-5 grid grid-cols-3 gap-2">{(['craft','melody','ownership'] as const).map((item) => <button key={item} onClick={() => setChapter(item)} className={`rounded-xl border px-3 py-3 text-xs font-black uppercase tracking-[.12em] ${chapter === item ? 'border-[#d8c7aa] bg-[#d8c7aa]/12 text-[#f5efe4]' : 'border-[#d8c7aa]/15 text-[#9e8b70]'}`}>{item}</button>)}</div>

            <div className="mt-4 min-h-[250px] rounded-[1.8rem] border border-[#d8c7aa]/16 bg-black/20 p-5">
              {chapter === 'craft' && <><p className="text-xs font-black uppercase tracking-[.2em] text-[#a9967a]">Construction Standard</p><h2 className="mt-3 text-2xl font-black">Built to justify the feeling.</h2><p className="mt-3 text-sm leading-7 text-[#b9a78c]">{garment.material}. The price is supported by silhouette, fabric weight, custom details, finishing, packaging, and the complete collection experience.</p><div className="mt-4 grid gap-2">{garment.construction.map((item) => <div key={item} className="flex items-center gap-3 text-sm text-[#d8c7aa]"><span>✦</span><span>{item}</span></div>)}</div></>}
              {chapter === 'melody' && <><p className="text-xs font-black uppercase tracking-[.2em] text-[#a9967a]">Stitched Melody</p><blockquote className="mt-4 text-3xl font-black leading-tight tracking-[-.04em]">“{garment.lyric}”</blockquote><p className="mt-5 text-sm leading-7 text-[#b9a78c]">Lift U Up is not background music. It is the emotional architecture of the garment—the calm, the rise, and the memory carried after the song ends.</p></>}
              {chapter === 'ownership' && <><p className="text-xs font-black uppercase tracking-[.2em] text-[#a9967a]">Ownership Experience</p><h2 className="mt-3 text-2xl font-black">The garment is only the first chapter.</h2><div className="mt-4 grid gap-2">{garment.experience.map((item) => <div key={item} className="flex items-center gap-3 text-sm text-[#d8c7aa]"><span>∞</span><span>{item}</span></div>)}</div><p className="mt-5 text-xs leading-6 text-[#8f7b62]">Living Closet means approved videos of real people wearing 2 Harmonic—not a digital inventory or outfit builder.</p></>}
            </div>

            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              <button className="rounded-full bg-[#f5efe4] px-5 py-4 text-sm font-black text-[#241b14]">Join Private Access</button>
              <button className="rounded-full border border-[#d8c7aa]/25 bg-[#d8c7aa]/8 px-5 py-4 text-sm font-black text-[#f5efe4]">Save This Piece</button>
            </div>
            <p className="mt-4 text-center text-xs leading-5 text-[#806f59]">Preview experience only. Payments, inventory, shipping, and reservations will be activated during production commerce wiring.</p>
          </aside>
        </section>

        <section className="mt-8 rounded-[3rem] border border-[#8c785f]/55 bg-[#17110d]/80 p-7 sm:p-10">
          <p className="text-xs font-black uppercase tracking-[.3em] text-[#a9967a]">Why It Commands The Price</p>
          <h2 className="mt-4 max-w-4xl text-4xl font-black tracking-[-.06em] sm:text-6xl">A $150–$200 zip-up cannot feel ordinary anywhere.</h2>
          <div className="mt-7 grid gap-4 md:grid-cols-4">{[
            ['Material', 'Premium weight and hand feel should be obvious before anyone reads the product copy.'],
            ['Construction', 'Custom hardware, intentional seams, lining, embroidery, and finishing must withstand inspection.'],
            ['Story', 'Lift U Up gives the piece emotional meaning that continues through campaign, packaging, and archive.'],
            ['Service', 'Presentation, access, delivery, authenticity, and after-purchase care must match the garment.'],
          ].map(([title, copy]) => <article key={title} className="rounded-[1.8rem] border border-[#d8c7aa]/14 bg-black/20 p-5"><h3 className="text-xl font-black">{title}</h3><p className="mt-3 text-sm leading-7 text-[#a9967a]">{copy}</p></article>)}</div>
        </section>
      </div>
    </main>
  );
}