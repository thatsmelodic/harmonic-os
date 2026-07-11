'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';
import { WorldCopy } from '@/components/studio/WorldCopy';
import { cities, restaurants, verdictStyle, type SchmackinnVerdict } from '@/data/schmackinn-universe';

const verdicts: Array<'All' | SchmackinnVerdict> = ['All', 'Schmakinn', 'Crackin', 'Lackin', 'Bunz'];
const categories = ['All', 'Burgers', 'Chicken', 'Soul Food', 'Mexican', 'Loaded Fries'];

export default function SchmackinnMapPage() {
  const [city, setCity] = useState<(typeof cities)[number]>('Milwaukee');
  const [verdict, setVerdict] = useState<(typeof verdicts)[number]>('All');
  const [category, setCategory] = useState('All');
  const [selectedSlug, setSelectedSlug] = useState<string | null>(null);

  const visible = useMemo(() => restaurants.filter((spot) => spot.city === city && (verdict === 'All' || spot.verdict === verdict) && (category === 'All' || spot.category === category)), [city, verdict, category]);
  const selected = restaurants.find((spot) => spot.slug === selectedSlug) ?? visible[0];
  const districts = Array.from(new Set(restaurants.filter((spot) => spot.city === city).map((spot) => spot.district)));
  const reviewedCount = restaurants.filter((spot) => spot.city === city && spot.reviewed).length;
  const totalCount = restaurants.filter((spot) => spot.city === city).length;

  return (
    <main className="schmackinn-world relative min-h-screen overflow-hidden px-4 py-8 pb-28 text-white sm:px-6">
      <div className="schmackinn-aurora absolute inset-0 -z-30" /><div className="restaurant-rain absolute inset-0 -z-20 opacity-35" /><div className="steam-cloud steam-one" />
      <div className="mx-auto max-w-7xl">
        <nav className="mb-8 flex flex-wrap items-center justify-between gap-3"><Link href="/worlds/schmackinn" className="world-secondary-action rounded-full border px-4 py-3 text-sm font-black">← Flavor District</Link><div className="flex gap-2"><Link href="/worlds/schmackinn/callouts" className="world-secondary-action rounded-full border px-4 py-3 text-sm font-black">📣 Callouts</Link><Link href="/worlds/schmackinn/reviews" className="world-primary-action rounded-full px-4 py-3 text-sm font-black">Review Theater</Link></div></nav>

        <header className="glass-panel rounded-[2.8rem] border p-7 backdrop-blur-2xl sm:p-10">
          <p className="world-accent-text text-xs font-black uppercase tracking-[.34em]"><WorldCopy world="schmackinn" field="mapEyebrow" fallback="Flavor City Map" /></p>
          <h1 className="mt-4 text-6xl font-black tracking-[-.08em] sm:text-8xl"><WorldCopy world="schmackinn" field="mapTitle" fallback="Every bite leaves a building." /></h1>
          <p className="world-muted-text mt-5 max-w-3xl text-base leading-8"><WorldCopy world="schmackinn" field="mapDescription" fallback="Reviewed restaurants become living storefronts. Their lighting, crowd, steam, and signal change with the verdict. Community callouts appear as hot requests until Melodic pulls up." /></p>
        </header>

        <section className="glass-panel mt-6 grid gap-4 rounded-[2rem] border p-5 backdrop-blur-xl lg:grid-cols-[1fr_auto_auto]">
          <div className="flex flex-wrap gap-2">{cities.map((item) => <button key={item} onClick={() => { setCity(item); setSelectedSlug(null); }} className={`rounded-full px-4 py-3 text-sm font-black ${city === item ? 'world-primary-action' : 'world-secondary-action border'}`}>{item}</button>)}</div>
          <select aria-label="Filter by verdict" value={verdict} onChange={(event) => setVerdict(event.target.value as typeof verdict)} className="world-surface rounded-full border px-4 py-3 text-sm font-black"><option disabled>Verdict</option>{verdicts.map((item) => <option key={item}>{item}</option>)}</select>
          <select aria-label="Filter by food category" value={category} onChange={(event) => setCategory(event.target.value)} className="world-surface rounded-full border px-4 py-3 text-sm font-black">{categories.map((item) => <option key={item}>{item}</option>)}</select>
        </section>

        <section className="mt-6 grid gap-5 lg:grid-cols-[1.25fr_.75fr]">
          <div className="relative min-h-[650px] overflow-hidden rounded-[2.6rem] border shadow-[0_0_90px_color-mix(in_srgb,var(--world-glow)_20%,transparent)]" style={{ background: 'radial-gradient(circle at center,color-mix(in srgb,var(--world-primary) 22%,transparent),transparent 27rem),linear-gradient(145deg,var(--world-surface),var(--world-background) 55%,color-mix(in srgb,var(--world-secondary) 16%,var(--world-background)))', borderColor: 'var(--world-border)' }}>
            <div className="absolute inset-0 opacity-25" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,.06) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.06) 1px,transparent 1px)', backgroundSize: '70px 70px', transform: 'rotate(-6deg) scale(1.2)' }} />
            <div className="glass-panel absolute left-5 top-5 z-10 rounded-2xl border p-4 backdrop-blur-xl"><p className="world-accent-text text-xs font-black uppercase tracking-[.2em]">{city} Food Passport</p><p className="mt-2 text-3xl font-black">{reviewedCount}/{totalCount}</p><div className="mt-3 h-2 w-44 overflow-hidden rounded-full bg-white/10"><div className="h-full" style={{ width: `${totalCount ? (reviewedCount / totalCount) * 100 : 0}%`, background: 'var(--world-primary)' }} /></div></div>
            {visible.map((spot) => <button key={spot.slug} onClick={() => setSelectedSlug(spot.slug)} style={{ left: `${spot.x}%`, top: `${spot.y}%` }} className={`absolute z-10 -translate-x-1/2 -translate-y-1/2 rounded-[1.5rem] border p-3 text-left transition hover:z-20 hover:scale-110 ${verdictStyle[spot.verdict].glow}`}><div className="text-3xl">{spot.storefront}</div><p className="mt-2 max-w-32 text-xs font-black leading-tight">{spot.name}</p><p className="mt-1 text-[10px] uppercase tracking-[.14em] text-white/45">{spot.reviewed ? `${spot.score} · ${spot.verdict}` : `🔥 ${spot.callouts} callouts`}</p>{spot.hiddenGem && <span className="absolute -right-2 -top-2">💎</span>}</button>)}
            {!visible.length && <div className="absolute inset-0 grid place-items-center text-center"><div><p className="text-5xl">🗺️</p><h2 className="mt-4 text-3xl font-black">No storefronts match.</h2><p className="world-muted-text mt-2">Change the filters or call out a new spot.</p></div></div>}
            <div className="absolute bottom-5 left-5 right-5 flex flex-wrap gap-2">{districts.map((district) => <span key={district} className="world-secondary-action rounded-full border px-3 py-2 text-xs font-black">{district}</span>)}</div>
          </div>

          <aside className="glass-panel h-fit rounded-[2.5rem] border p-6 backdrop-blur-2xl lg:sticky lg:top-6">
            {selected ? <><div className={`rounded-[2rem] border p-6 ${verdictStyle[selected.verdict].glow}`}><div className="flex items-start justify-between gap-4"><span className="text-6xl">{selected.storefront}</span><span className="rounded-full border border-white/10 bg-black/35 px-3 py-2 text-xs font-black">{selected.open ? '● OPEN' : 'CLOSED'}</span></div><p className="mt-6 text-xs font-black uppercase tracking-[.22em] text-white/40">{selected.district} · {selected.category} · {selected.price}</p><h2 className="mt-3 text-4xl font-black tracking-[-.06em]">{selected.name}</h2><p className="world-muted-text mt-3 text-sm leading-7">{selected.story}</p><div className="mt-5 grid grid-cols-2 gap-3"><div className="world-surface rounded-2xl border p-4"><p className="text-xs text-white/35">Melodic</p><p className="mt-2 text-3xl font-black">{selected.reviewed ? selected.score : '—'}</p></div><div className="world-surface rounded-2xl border p-4"><p className="text-xs text-white/35">Community</p><p className="mt-2 text-3xl font-black">{selected.communityScore}</p></div></div><p className="world-accent-text mt-5 text-sm font-black">{selected.reviewed ? `${selected.verdict}: ${verdictStyle[selected.verdict].label}` : `🔥 ${selected.callouts} people called this spot out`}</p></div><div className="mt-4 grid gap-3"><Link href={`/worlds/schmackinn/restaurants/${selected.slug}`} className="world-primary-action rounded-full px-5 py-4 text-center text-sm font-black"><WorldCopy world="schmackinn" field="primaryCta" fallback="Enter Restaurant" /></Link><Link href={selected.reviewed ? '/worlds/schmackinn/reviews' : '/worlds/schmackinn/callouts'} className="world-secondary-action rounded-full border px-5 py-4 text-center text-sm font-black">{selected.reviewed ? 'Watch Review' : 'Add Your Callout'}</Link></div></> : <p className="world-muted-text">Select a storefront.</p>}
          </aside>
        </section>
      </div>
    </main>
  );
}
