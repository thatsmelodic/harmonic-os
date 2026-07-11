'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';
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
        <nav className="mb-8 flex flex-wrap items-center justify-between gap-3"><Link href="/worlds/schmackinn" className="rounded-full border border-white/10 bg-white/[.04] px-4 py-3 text-sm font-black text-white/70">← Flavor District</Link><div className="flex gap-2"><Link href="/worlds/schmackinn/callouts" className="rounded-full border border-purple-200/20 bg-purple-300/10 px-4 py-3 text-sm font-black text-purple-100">📣 Callouts</Link><Link href="/worlds/schmackinn/reviews" className="rounded-full bg-purple-300 px-4 py-3 text-sm font-black text-black">Review Theater</Link></div></nav>

        <header className="rounded-[2.8rem] border border-purple-200/15 bg-black/50 p-7 shadow-[0_0_80px_rgba(183,108,255,.18)] backdrop-blur-2xl sm:p-10"><p className="text-xs font-black uppercase tracking-[.34em] text-purple-100/45">Flavor City Map</p><h1 className="mt-4 text-6xl font-black tracking-[-.08em] sm:text-8xl">Every bite leaves a building.</h1><p className="mt-5 max-w-3xl text-base leading-8 text-white/58">Reviewed restaurants become living storefronts. Their lighting, crowd, steam, and signal change with the verdict. Community callouts appear as hot requests until Melodic pulls up.</p></header>

        <section className="mt-6 grid gap-4 rounded-[2rem] border border-white/10 bg-black/45 p-5 backdrop-blur-xl lg:grid-cols-[1fr_auto_auto]">
          <div className="flex flex-wrap gap-2">{cities.map((item) => <button key={item} onClick={() => { setCity(item); setSelectedSlug(null); }} className={`rounded-full px-4 py-3 text-sm font-black ${city === item ? 'bg-purple-300 text-black' : 'border border-white/10 bg-white/[.04] text-white/60'}`}>{item}</button>)}</div>
          <select aria-label="Filter by verdict" value={verdict} onChange={(event) => setVerdict(event.target.value as typeof verdict)} className="rounded-full border border-white/10 bg-black px-4 py-3 text-sm font-black text-white"><option disabled>Verdict</option>{verdicts.map((item) => <option key={item}>{item}</option>)}</select>
          <select aria-label="Filter by food category" value={category} onChange={(event) => setCategory(event.target.value)} className="rounded-full border border-white/10 bg-black px-4 py-3 text-sm font-black text-white">{categories.map((item) => <option key={item}>{item}</option>)}</select>
        </section>

        <section className="mt-6 grid gap-5 lg:grid-cols-[1.25fr_.75fr]">
          <div className="relative min-h-[650px] overflow-hidden rounded-[2.6rem] border border-purple-200/15 bg-[radial-gradient(circle_at_center,rgba(126,34,206,.22),transparent_27rem),linear-gradient(145deg,#13061b,#07050a_55%,#170d04)] shadow-[0_0_90px_rgba(183,108,255,.16)]">
            <div className="absolute inset-0 opacity-25" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,.06) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.06) 1px,transparent 1px)', backgroundSize: '70px 70px', transform: 'rotate(-6deg) scale(1.2)' }} />
            <div className="absolute left-5 top-5 z-10 rounded-2xl border border-white/10 bg-black/60 p-4 backdrop-blur-xl"><p className="text-xs font-black uppercase tracking-[.2em] text-purple-100/45">{city} Food Passport</p><p className="mt-2 text-3xl font-black">{reviewedCount}/{totalCount}</p><div className="mt-3 h-2 w-44 overflow-hidden rounded-full bg-white/10"><div className="h-full bg-purple-300" style={{ width: `${totalCount ? (reviewedCount / totalCount) * 100 : 0}%` }} /></div></div>
            {visible.map((spot) => <button key={spot.slug} onClick={() => setSelectedSlug(spot.slug)} style={{ left: `${spot.x}%`, top: `${spot.y}%` }} className={`absolute z-10 -translate-x-1/2 -translate-y-1/2 rounded-[1.5rem] border p-3 text-left transition hover:z-20 hover:scale-110 ${verdictStyle[spot.verdict].glow}`}><div className="text-3xl">{spot.storefront}</div><p className="mt-2 max-w-32 text-xs font-black leading-tight">{spot.name}</p><p className="mt-1 text-[10px] uppercase tracking-[.14em] text-white/45">{spot.reviewed ? `${spot.score} · ${spot.verdict}` : `🔥 ${spot.callouts} callouts`}</p>{spot.hiddenGem && <span className="absolute -right-2 -top-2">💎</span>}</button>)}
            {!visible.length && <div className="absolute inset-0 grid place-items-center text-center"><div><p className="text-5xl">🗺️</p><h2 className="mt-4 text-3xl font-black">No storefronts match.</h2><p className="mt-2 text-white/45">Change the filters or call out a new spot.</p></div></div>}
            <div className="absolute bottom-5 left-5 right-5 flex flex-wrap gap-2">{districts.map((district) => <span key={district} className="rounded-full border border-white/10 bg-black/55 px-3 py-2 text-xs font-black text-white/55">{district}</span>)}</div>
          </div>

          <aside className="h-fit rounded-[2.5rem] border border-white/10 bg-black/50 p-6 backdrop-blur-2xl lg:sticky lg:top-6">
            {selected ? <><div className={`rounded-[2rem] border p-6 ${verdictStyle[selected.verdict].glow}`}><div className="flex items-start justify-between gap-4"><span className="text-6xl">{selected.storefront}</span><span className="rounded-full border border-white/10 bg-black/35 px-3 py-2 text-xs font-black">{selected.open ? '● OPEN' : 'CLOSED'}</span></div><p className="mt-6 text-xs font-black uppercase tracking-[.22em] text-white/40">{selected.district} · {selected.category} · {selected.price}</p><h2 className="mt-3 text-4xl font-black tracking-[-.06em]">{selected.name}</h2><p className="mt-3 text-sm leading-7 text-white/55">{selected.story}</p><div className="mt-5 grid grid-cols-2 gap-3"><div className="rounded-2xl border border-white/10 bg-black/30 p-4"><p className="text-xs text-white/35">Melodic</p><p className="mt-2 text-3xl font-black">{selected.reviewed ? selected.score : '—'}</p></div><div className="rounded-2xl border border-white/10 bg-black/30 p-4"><p className="text-xs text-white/35">Community</p><p className="mt-2 text-3xl font-black">{selected.communityScore}</p></div></div><p className="mt-5 text-sm font-black text-purple-100">{selected.reviewed ? `${selected.verdict}: ${verdictStyle[selected.verdict].label}` : `🔥 ${selected.callouts} people called this spot out`}</p></div><div className="mt-4 grid gap-3"><Link href={`/worlds/schmackinn/restaurants/${selected.slug}`} className="rounded-full bg-purple-300 px-5 py-4 text-center text-sm font-black text-black">Enter Restaurant</Link><Link href={selected.reviewed ? '/worlds/schmackinn/reviews' : '/worlds/schmackinn/callouts'} className="rounded-full border border-white/10 bg-white/[.04] px-5 py-4 text-center text-sm font-black text-white/65">{selected.reviewed ? 'Watch Review' : 'Add Your Callout'}</Link></div></> : <p className="text-white/45">Select a storefront.</p>}
          </aside>
        </section>
      </div>
    </main>
  );
}
