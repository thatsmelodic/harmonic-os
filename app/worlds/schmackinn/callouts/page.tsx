'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';
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
        <nav className="mb-8 flex flex-wrap items-center justify-between gap-3"><Link href="/worlds/schmackinn/map" className="rounded-full border border-white/10 bg-white/[.04] px-4 py-3 text-sm font-black text-white/70">← Flavor City Map</Link><Link href="/worlds/schmackinn" className="rounded-full border border-purple-200/20 bg-purple-300/10 px-4 py-3 text-sm font-black text-purple-100">Schmackinn World</Link></nav>

        <header className="rounded-[2.8rem] border border-purple-200/15 bg-black/50 p-7 shadow-[0_0_80px_rgba(183,108,255,.18)] backdrop-blur-2xl sm:p-10"><p className="text-xs font-black uppercase tracking-[.34em] text-purple-100/45">Profile User Side Feature</p><h1 className="mt-4 text-6xl font-black tracking-[-.08em] sm:text-8xl">📣 Call Melodic Out.</h1><p className="mt-5 max-w-3xl text-base leading-8 text-white/58">Profile users recommend places district by district. Every callout adds heat to the storefront. When the review drops, everyone who called it out gets notified and the best scouts earn discovery credit.</p></header>

        <section className="mt-6 grid gap-5 lg:grid-cols-[.85fr_1.15fr]">
          <aside className="h-fit rounded-[2.5rem] border border-white/10 bg-black/50 p-6 backdrop-blur-2xl lg:sticky lg:top-6"><p className="text-xs font-black uppercase tracking-[.24em] text-purple-100/45">Recommend a Spot</p><h2 className="mt-3 text-3xl font-black tracking-[-.05em]">Put the district on.</h2><div className="mt-5 grid gap-3"><input value={name} onChange={(event) => setName(event.target.value)} placeholder="Restaurant name" className="rounded-2xl border border-white/10 bg-black/55 px-4 py-4 text-white outline-none placeholder:text-white/25" /><select value={city} onChange={(event) => setCity(event.target.value)} className="rounded-2xl border border-white/10 bg-black px-4 py-4 text-white">{['Milwaukee','Baltimore','Chicago','Atlanta','Houston','New York'].map((item) => <option key={item}>{item}</option>)}</select><input value={district} onChange={(event) => setDistrict(event.target.value)} placeholder="District or neighborhood" className="rounded-2xl border border-white/10 bg-black/55 px-4 py-4 text-white outline-none" /><select value={category} onChange={(event) => setCategory(event.target.value)} className="rounded-2xl border border-white/10 bg-black px-4 py-4 text-white">{['Soul Food','Burgers','Chicken','Mexican','BBQ','Seafood','Breakfast','Dessert','Coffee'].map((item) => <option key={item}>{item}</option>)}</select><button onClick={submit} className="rounded-full bg-purple-300 px-5 py-4 text-sm font-black text-black">Add Callout +1 Heat</button>{notice && <p className="rounded-2xl border border-purple-200/15 bg-purple-300/10 p-4 text-sm text-purple-100">{notice}</p>}</div><p className="mt-5 text-xs leading-6 text-white/35">Production access will require a signed-in profile. Creators and admins can also close callouts when a review is published.</p></aside>

          <div className="grid gap-4">{open.map((item, index) => <article key={`${item.name}-${item.city}`} className="rounded-[2rem] border border-white/10 bg-black/45 p-6 backdrop-blur-xl"><div className="flex flex-wrap items-start justify-between gap-4"><div><p className="font-mono text-xs text-purple-100/40">#{index + 1} · {item.city} / {item.district}</p><h2 className="mt-3 text-3xl font-black tracking-[-.05em]">{item.name}</h2><p className="mt-2 text-sm text-white/45">{item.category} · discovered by {item.scout}</p></div><div className="text-right"><p className="text-4xl font-black text-orange-200">🔥 {item.heat}</p><p className="mt-1 text-xs text-white/35">callout heat</p></div></div><div className="mt-5 h-3 overflow-hidden rounded-full bg-white/10"><div className="h-full rounded-full bg-gradient-to-r from-purple-400 to-orange-300" style={{ width: `${Math.min(100, item.heat)}%` }} /></div><div className="mt-5 flex flex-wrap items-center justify-between gap-3"><span className="rounded-full border border-white/10 bg-white/[.04] px-3 py-2 text-xs font-black text-white/55">Scout accuracy {item.accuracy || 'New'}%</span><button onClick={() => setCallouts((items) => items.map((entry) => entry === item ? { ...entry, heat: entry.heat + 1 } : entry))} className="rounded-full border border-purple-200/20 bg-purple-300/10 px-4 py-3 text-sm font-black text-purple-100">Call This Out Too</button></div></article>)}</div>
        </section>

        <section className="mt-6 rounded-[2.5rem] border border-white/10 bg-black/45 p-6 backdrop-blur-xl"><p className="text-xs font-black uppercase tracking-[.24em] text-purple-100/45">Top Flavor Scouts</p><div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">{scouts.map((scout) => <div key={`${scout.scout}-${scout.name}`} className="rounded-2xl border border-white/10 bg-white/[.035] p-5"><p className="font-black">{scout.scout}</p><p className="mt-2 text-3xl font-black text-purple-100">{scout.accuracy}%</p><p className="mt-2 text-xs text-white/35">Recommendation accuracy</p></div>)}</div></section>
      </div>
    </main>
  );
}
