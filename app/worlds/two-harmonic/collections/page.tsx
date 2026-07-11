'use client';

import Link from 'next/link';
import { useState } from 'react';
import { beigeGarments, collections } from '@/data/two-harmonic-universe';
import { WorldCopy } from '@/components/studio/WorldCopy';

const collection = collections[0];

export default function TwoHarmonicCollectionsPage() {
  const [active, setActive] = useState(beigeGarments[0]);
  const [view, setView] = useState<'front' | 'detail' | 'story'>('front');

  return (
    <main className="two-harmonic-world relative min-h-screen overflow-hidden px-4 py-8 pb-28 sm:px-6" data-world-shell>
      <div className="absolute inset-0 -z-30" style={{ background: 'radial-gradient(circle_at_25%_15%,rgba(245,239,228,.18),transparent_24rem),radial-gradient(circle_at_78%_45%,rgba(111,90,69,.22),transparent_28rem),linear-gradient(145deg,#17120e,#2a2119_50%,#0d0a08)' }} />
      <div className="absolute inset-0 -z-20 opacity-20" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,.05) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.05) 1px,transparent 1px)', backgroundSize: '80px 80px' }} />
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"><span className="absolute left-[12%] top-[18%] text-5xl opacity-15">♪</span><span className="absolute right-[18%] top-[32%] text-6xl opacity-10">♬</span><span className="absolute bottom-[18%] left-[28%] text-4xl opacity-10">∞</span></div>

      <div className="mx-auto max-w-7xl">
        <nav className="mb-8 flex flex-wrap items-center justify-between gap-3">
          <Link href="/worlds/two-harmonic" className="rounded-full border px-4 py-3 text-sm font-black" style={{ borderColor: 'var(--world-border)', background: 'color-mix(in srgb,var(--world-surface) 72%,transparent)', color: 'var(--world-muted)' }}>← Fashion House</Link>
          <Link href="/worlds/two-harmonic/melody-sync" className="world-primary-action rounded-full px-5 py-3 text-sm font-black">Experience the Frequency</Link>
        </nav>

        <header className="rounded-[3rem] border p-7 sm:p-11" style={{ borderColor: '#8c785f', background: 'linear-gradient(135deg,rgba(45,36,28,.92),rgba(19,15,12,.96))', boxShadow: '0 0 100px rgba(216,199,170,.12)' }}>
          <p className="text-xs font-black uppercase tracking-[.38em] text-[#d8c7aa]">{collection.chapter}</p>
          <div className="mt-5 grid gap-6 lg:grid-cols-[1fr_auto] lg:items-end">
            <div><h1 className="text-6xl font-black tracking-[-.09em] text-[#f5efe4] sm:text-8xl"><WorldCopy world="two-harmonic" field="collectionTitle" fallback="Beige Frequency" /></h1><p className="mt-5 max-w-3xl text-lg leading-8 text-[#d8c7aa]"><WorldCopy world="two-harmonic" field="collectionDescription" fallback={collection.story} /></p></div>
            <div className="flex flex-wrap gap-2 lg:max-w-xs lg:justify-end">{collection.mood.map((mood) => <span key={mood} className="rounded-full border border-[#d8c7aa]/25 bg-[#d8c7aa]/10 px-4 py-2 text-xs font-black uppercase tracking-[.16em] text-[#f5efe4]">{mood}</span>)}</div>
          </div>
        </header>

        <section className="mt-6 grid gap-5 lg:grid-cols-[.72fr_1.28fr]">
          <aside className="grid h-fit gap-3 rounded-[2.5rem] border p-5 lg:sticky lg:top-5" style={{ borderColor: '#6f5a45', background: 'rgba(20,16,13,.82)' }}>
            <p className="px-2 text-xs font-black uppercase tracking-[.25em] text-[#b9a78c]">Garment Pedestals</p>
            {beigeGarments.map((garment) => <button key={garment.slug} onClick={() => { setActive(garment); setView('front'); }} className={`rounded-[1.8rem] border p-4 text-left transition ${active.slug === garment.slug ? 'border-[#e4d6c0] bg-[#d8c7aa]/12' : 'border-white/8 bg-white/[.025] hover:bg-white/[.06]'}`}><div className="flex items-center gap-4"><span className="grid h-16 w-16 place-items-center rounded-2xl bg-[#d8c7aa]/10 text-4xl text-[#f5efe4]">{garment.symbol}</span><div><p className="text-[10px] font-black uppercase tracking-[.18em] text-[#a9967a]">{garment.type}</p><h2 className="mt-1 text-xl font-black text-[#f5efe4]">{garment.name}</h2><p className="mt-1 text-sm text-[#b9a78c]">{garment.color} · ${garment.price}</p></div></div></button>)}
          </aside>

          <article className="overflow-hidden rounded-[3rem] border" style={{ borderColor: '#8c785f', background: 'linear-gradient(145deg,rgba(45,36,28,.95),rgba(14,11,9,.98))', boxShadow: '0 0 90px rgba(216,199,170,.1)' }}>
            <div className="relative grid min-h-[560px] place-items-center overflow-hidden p-8 text-center">
              <div className="absolute inset-0 opacity-70" style={{ background: 'radial-gradient(circle,rgba(245,239,228,.18),transparent 25rem),linear-gradient(to bottom,rgba(111,90,69,.2),transparent)' }} />
              <div className="absolute left-6 top-6 flex gap-2">{(['front','detail','story'] as const).map((item) => <button key={item} onClick={() => setView(item)} className={`rounded-full border px-4 py-2 text-xs font-black uppercase tracking-[.14em] ${view === item ? 'border-[#f5efe4] bg-[#f5efe4] text-[#241b14]' : 'border-[#d8c7aa]/25 bg-black/20 text-[#d8c7aa]'}`}>{item}</button>)}</div>
              <div className="relative z-10 max-w-3xl">
                {view === 'front' && <><div className="mx-auto grid h-72 w-72 place-items-center rounded-[4rem] border border-[#d8c7aa]/25 bg-[#d8c7aa]/8 text-[10rem] text-[#f5efe4] shadow-[0_0_80px_rgba(245,239,228,.08)]">{active.symbol}</div><p className="mt-7 text-xs font-black uppercase tracking-[.26em] text-[#b9a78c]">{active.color}</p><h2 className="mt-3 text-5xl font-black tracking-[-.07em] text-[#f5efe4] sm:text-7xl">{active.name}</h2><p className="mx-auto mt-4 max-w-2xl text-base leading-8 text-[#c8b99f]">{active.detail}</p></>}
                {view === 'detail' && <><p className="text-8xl">🪡</p><h2 className="mt-6 text-5xl font-black tracking-[-.07em] text-[#f5efe4]">Material carries memory.</h2><p className="mx-auto mt-5 max-w-2xl text-xl font-black text-[#d8c7aa]">{active.material}</p><p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-[#b9a78c]">Every trim, seam, weight, and placement is treated like instrumentation. Nothing is decoration without meaning.</p></>}
                {view === 'story' && <><p className="text-8xl">♬</p><p className="mt-6 text-xs font-black uppercase tracking-[.26em] text-[#b9a78c]">The melody inside this garment</p><blockquote className="mx-auto mt-4 max-w-2xl text-4xl font-black leading-tight tracking-[-.05em] text-[#f5efe4]">“{active.lyric}”</blockquote><p className="mx-auto mt-5 max-w-xl text-sm leading-7 text-[#b9a78c]">This line is not marketing copy. It is the emotional key that guides the garment, campaign, and connected song.</p></>}
              </div>
            </div>
            <div className="grid gap-3 border-t border-[#8c785f]/45 p-6 sm:grid-cols-3"><div className="rounded-2xl border border-[#d8c7aa]/15 bg-black/20 p-4"><p className="text-xs uppercase tracking-[.16em] text-[#a9967a]">State</p><p className="mt-2 text-xl font-black text-[#f5efe4]">Preview</p></div><div className="rounded-2xl border border-[#d8c7aa]/15 bg-black/20 p-4"><p className="text-xs uppercase tracking-[.16em] text-[#a9967a]">Connected Melody</p><p className="mt-2 text-xl font-black text-[#f5efe4]">Lift U Up</p></div><Link href="/worlds/two-harmonic/melody-sync" className="grid place-items-center rounded-2xl bg-[#f5efe4] p-4 text-center text-sm font-black text-[#241b14]">Hear This Garment →</Link></div>
          </article>
        </section>
      </div>
    </main>
  );
}