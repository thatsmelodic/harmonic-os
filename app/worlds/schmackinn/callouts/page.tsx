'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';
import { WorldCopy } from '@/components/studio/WorldCopy';
import { restaurants } from '@/data/schmackinn-universe';

type Callout = { name: string; city: string; district: string; category: string; heat: number; scout: string; accuracy: number; reviewed: boolean };

const seed: Callout[] = [
  ...restaurants.map((spot) => ({ name: spot.name, city: spot.city, district: spot.district, category: spot.category, heat: spot.callouts, scout: spot.hiddenGem ? '@GemFinder' : '@FlavorCrew', accuracy: spot.hiddenGem ? 94 : 82, reviewed: spot.reviewed })),
  { name: 'Smokehouse 414', city: 'Milwaukee', district: 'North Side', category: 'BBQ', heat: 74, scout: '@SauceScout', accuracy: 91, reviewed: false },
];

export default function SchmackinnCalloutsPage() {
  const [callouts, setCallouts] = useState(seed);
  const [name, setName] = useState('');
  const [city, setCity] = useState('Milwaukee');
  const [district, setDistrict] = useState('Downtown');
  const [category, setCategory] = useState('Soul Food');
  const [notice, setNotice] = useState('');

  const open = useMemo(() => [...callouts].filter((item) => !item.reviewed).sort((a, b) => b.heat - a.heat), [callouts]);
  const scouts = useMemo(() => [...callouts].sort((a, b) => b.accuracy - a.accuracy).slice(0, 4), [callouts]);

  const submit = () => {
    if (!name.trim()) { setNotice('Add the restaurant name first.'); return; }
    const match = callouts.find((item) => item.name.toLowerCase() === name.trim().toLowerCase());
    if (match) setCallouts((items) => items.map((item) => item === match ? { ...item, heat: item.heat + 1 } : item));
    else setCallouts((items) => [...items, { name: name.trim(), city, district, category, heat: 1, scout: '@You', accuracy: 0, reviewed: false }]);
    setNotice(`${name.trim()} was called out. The storefront heat just increased.`);
    setName('');
  };

  return (
    <main className="schmackinn-world relative min-h-screen overflow-hidden px-4 py-8 pb-28 text-white sm:px-6">
      <div className="schmackinn-aurora absolute inset-0 -z-30" /><div className="restaurant-rain absolute inset-0 -z-20 opacity-35" />
      <div className="mx-auto max-w-7xl">
        <nav className="mb-8 flex flex-wrap items-center justify-between gap-3"><Link href="/worlds/schmackinn/map" className="world-secondary-action rounded-full border px-4 py-3 text-sm font-black">← Flavor City Map</Link><Link href="/worlds/schmackinn" className="world-secondary-action rounded-full border px-4 py-3 text-sm font-black">Schmackinn World</Link></nav>

        <header className="glass-panel rounded-[2.8rem] border p-7 backdrop-blur-2xl sm:p-10"><p className="world-accent-text text-xs font-black uppercase tracking-[.34em]">Profile User Side Feature</p><h1 className="mt-4 text-6xl font-black tracking-[-.08em] sm:text-8xl"><WorldCopy world="schmackinn" field="communityTitle" fallback="📣 Call Melodic Out." /></h1><p className="world-muted-text mt-5 max-w-3xl text-base leading-8"><WorldCopy world="schmackinn" field="communityDescription" fallback="Profile users recommend places district by district. Every callout adds heat to the storefront. When the review drops, everyone who called it out gets notified and the best scouts earn discovery credit." /></p></header>

        <section className="mt-6 grid gap-5 lg:grid-cols-[.85fr_1.15fr]">
          <aside className="glass-panel h-fit rounded-[2.5rem] border p-6 backdrop-blur-2xl lg:sticky lg:top-6"><p className="world-accent-text text-xs font-black uppercase tracking-[.24em]">Recommend a Spot</p><h2 className="mt-3 text-3xl font-black tracking-[-.05em]">Put the district on.</h2><div className="mt-5 grid gap-3"><input value={name} onChange={(event) => setName(event.target.value)} placeholder="Restaurant name" className="world-surface rounded-2xl border px-4 py-4 outline-none placeholder:text-white/25" /><select value={city} onChange={(event) => setCity(event.target.value)} className="world-surface rounded-2xl border px-4 py-4">{['Milwaukee','Baltimore','Chicago','Atlanta','Houston','New York'].map((item) => <option key={item}>{item}</option>)}</select><input value={district} onChange={(event) => setDistrict(event.target.value)} placeholder="District or neighborhood" className="world-surface rounded-2xl border px-4 py-4 outline-none" /><select value={category} onChange={(event) => setCategory(event.target.value)} className="world-surface rounded-2xl border px-4 py-4">{['Soul Food','Burgers','Chicken','Mexican','BBQ','Seafood','Breakfast','Dessert','Coffee'].map((item) => <option key={item}>{item}</option>)}</select><button onClick={submit} className="world-primary-action rounded-full px-5 py-4 text-sm font-black">Add Callout +1 Heat</button>{notice && <p className="world-secondary-action rounded-2xl border p-4 text-sm">{notice}</p>}</div><p className="world-muted-text mt-5 text-xs leading-6">Production access will require a signed-in profile. Creators and admins can also close callouts when a review is published.</p></aside>

          <div className="grid gap-4">{open.map((item, index) => <article key={`${item.name}-${item.city}`} className="glass-panel rounded-[2rem] border p-6 backdrop-blur-xl"><div className="flex flex-wrap items-start justify-between gap-4"><div><p className="world-accent-text font-mono text-xs">#{index + 1} · {item.city} / {item.district}</p><h2 className="mt-3 text-3xl font-black tracking-[-.05em]">{item.name}</h2><p className="world-muted-text mt-2 text-sm">{item.category} · discovered by {item.scout}</p></div><div className="text-right"><p className="world-accent-text text-4xl font-black">🔥 {item.heat}</p><p className="world-muted-text mt-1 text-xs">callout heat</p></div></div><div className="mt-5 h-3 overflow-hidden rounded-full bg-white/10"><div className="h-full rounded-full" style={{ width: `${Math.min(100, item.heat)}%`, background: 'linear-gradient(90deg,var(--world-primary),var(--world-secondary))' }} /></div><div className="mt-5 flex flex-wrap items-center justify-between gap-3"><span className="world-secondary-action rounded-full border px-3 py-2 text-xs font-black">Scout accuracy {item.accuracy || 'New'}%</span><button onClick={() => setCallouts((items) => items.map((entry) => entry === item ? { ...entry, heat: entry.heat + 1 } : entry))} className="world-secondary-action rounded-full border px-4 py-3 text-sm font-black">Call This Out Too</button></div></article>)}</div>
        </section>

        <section className="glass-panel mt-6 rounded-[2.5rem] border p-6 backdrop-blur-xl"><p className="world-accent-text text-xs font-black uppercase tracking-[.24em]">Top Flavor Scouts</p><div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">{scouts.map((scout) => <div key={`${scout.scout}-${scout.name}`} className="world-surface rounded-2xl border p-5"><p className="font-black">{scout.scout}</p><p className="world-accent-text mt-2 text-3xl font-black">{scout.accuracy}%</p><p className="world-muted-text mt-2 text-xs">Recommendation accuracy</p></div>)}</div></section>
      </div>
    </main>
  );
}
