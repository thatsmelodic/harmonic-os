'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';

const generatedSystems = [
  'Restaurant page',
  'Flavor City storefront',
  'Review Theater entry',
  'Flavor Lab profile',
  'Food Memory entry',
  'District placement',
  'Community page',
  'Search index record',
  'Share page metadata',
  'Matching callout completion',
];

export default function SchmackinnStudioPage() {
  const [title, setTitle] = useState('');
  const [restaurant, setRestaurant] = useState('');
  const [dish, setDish] = useState('');
  const [city, setCity] = useState('Milwaukee');
  const [district, setDistrict] = useState('Downtown');
  const [verdict, setVerdict] = useState('Schmakinn');
  const [score, setScore] = useState(90);
  const [published, setPublished] = useState(false);

  const slug = useMemo(() => restaurant.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') || 'new-restaurant', [restaurant]);

  const publish = () => {
    if (!title.trim() || !restaurant.trim() || !dish.trim()) return;
    setPublished(true);
  };

  return (
    <main className="min-h-screen bg-[#080408] px-4 py-8 pb-28 text-white sm:px-6">
      <div className="mx-auto max-w-7xl">
        <nav className="mb-8 flex flex-wrap items-center justify-between gap-3"><Link href="/worlds/schmackinn" className="rounded-full border border-white/10 bg-white/[.04] px-4 py-3 text-sm font-black text-white/70">← Schmackinn World</Link><Link href="/worlds/schmackinn/map" className="rounded-full border border-purple-200/20 bg-purple-300/10 px-4 py-3 text-sm font-black text-purple-100">Preview Flavor City</Link></nav>

        <header className="rounded-[2.8rem] border border-purple-200/15 bg-[radial-gradient(circle_at_top,rgba(192,132,252,.18),transparent_28rem),#100712] p-7 shadow-[0_0_80px_rgba(183,108,255,.15)] sm:p-10"><p className="text-xs font-black uppercase tracking-[.34em] text-purple-100/45">Creator Automation</p><h1 className="mt-4 text-6xl font-black tracking-[-.08em] sm:text-8xl">One upload builds the district.</h1><p className="mt-5 max-w-3xl text-base leading-8 text-white/58">Complete the review once. Harmonic OS prepares every connected Schmackinn surface so the upload becomes a restaurant, storefront, review, memory, flavor profile, and community event.</p></header>

        <section className="mt-6 grid gap-5 lg:grid-cols-[1fr_.9fr]">
          <div className="rounded-[2.5rem] border border-white/10 bg-black/45 p-6 sm:p-8"><p className="text-xs font-black uppercase tracking-[.24em] text-purple-100/45">Review Details</p><div className="mt-5 grid gap-3 sm:grid-cols-2"><input value={title} onChange={(event) => setTitle(event.target.value)} placeholder="Episode title" className="rounded-2xl border border-white/10 bg-black/60 px-4 py-4 text-white outline-none sm:col-span-2" /><input value={restaurant} onChange={(event) => setRestaurant(event.target.value)} placeholder="Restaurant" className="rounded-2xl border border-white/10 bg-black/60 px-4 py-4 text-white outline-none" /><input value={dish} onChange={(event) => setDish(event.target.value)} placeholder="Featured dish" className="rounded-2xl border border-white/10 bg-black/60 px-4 py-4 text-white outline-none" /><select value={city} onChange={(event) => setCity(event.target.value)} className="rounded-2xl border border-white/10 bg-black px-4 py-4 text-white">{['Milwaukee','Baltimore','Chicago','Atlanta','Houston','New York'].map((item) => <option key={item}>{item}</option>)}</select><input value={district} onChange={(event) => setDistrict(event.target.value)} placeholder="District" className="rounded-2xl border border-white/10 bg-black/60 px-4 py-4 text-white outline-none" /><select value={verdict} onChange={(event) => setVerdict(event.target.value)} className="rounded-2xl border border-white/10 bg-black px-4 py-4 text-white">{['Schmakinn','Crackin','Lackin','Bunz'].map((item) => <option key={item}>{item}</option>)}</select><label className="rounded-2xl border border-white/10 bg-black/45 p-4"><span className="text-xs font-black uppercase tracking-[.16em] text-white/35">Final score {score}</span><input type="range" min="0" max="100" value={score} onChange={(event) => setScore(Number(event.target.value))} className="mt-4 w-full" /></label><label className="rounded-2xl border border-dashed border-white/15 bg-white/[.03] p-5 text-sm text-white/45 sm:col-span-2">Upload review video, thumbnail, storefront image, interior image, and menu assets here when storage is connected.</label></div><button onClick={publish} className="mt-5 w-full rounded-full bg-purple-300 px-6 py-4 text-sm font-black text-black">Generate Schmackinn Universe Entry</button>{published && (!title.trim() || !restaurant.trim() || !dish.trim()) && <p className="mt-3 text-sm text-orange-200">Episode title, restaurant, and dish are required.</p>}</div>

          <aside className="rounded-[2.5rem] border border-white/10 bg-black/45 p-6 sm:p-8"><p className="text-xs font-black uppercase tracking-[.24em] text-purple-100/45">Automation Preview</p><div className="mt-5 rounded-[2rem] border border-purple-200/15 bg-purple-300/10 p-5"><p className="text-xs text-purple-100/45">Generated route</p><p className="mt-2 break-all font-mono text-sm text-purple-100">/worlds/schmackinn/restaurants/{slug}</p><h2 className="mt-5 text-3xl font-black tracking-[-.05em]">{restaurant || 'Restaurant Name'}</h2><p className="mt-2 text-sm text-white/50">{dish || 'Featured dish'} · {city} / {district}</p><p className="mt-4 text-4xl font-black">{verdict} {score}</p></div><div className="mt-5 grid gap-2">{generatedSystems.map((system, index) => <div key={system} className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/[.035] p-4"><span className="text-sm font-black text-white/65">{system}</span><span className={published ? 'text-green-300' : 'text-white/25'}>{published ? '✓' : `0${index + 1}`}</span></div>)}</div>{published && <p className="mt-5 rounded-2xl border border-green-300/15 bg-green-300/10 p-4 text-sm text-green-100">Generation preview completed. Database and storage wiring will make these records permanent during the production backend pass.</p>}</aside>
        </section>
      </div>
    </main>
  );
}
