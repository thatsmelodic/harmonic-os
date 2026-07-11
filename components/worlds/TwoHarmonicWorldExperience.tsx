'use client';

import Link from 'next/link';
import { WorldCopy } from '@/components/studio/WorldCopy';
import { FrequencyMark } from '@/components/identity/FrequencyMark';
import { LuxuryFashionHouseExperience } from '@/components/two-harmonic/LuxuryFashionHouseExperience';
import { collections, fashionRooms, stitchedPrinciples } from '@/data/two-harmonic-universe';
import type { TwoHarmonicCollection } from '@/lib/supabase/two-harmonic-server';

const statusLabel = {
  concept: 'CONCEPT',
  sampling: 'SAMPLING',
  production: 'IN PRODUCTION',
  released: 'RELEASED',
} as const;

const liveStatusLabel = {
  'private-preview': 'PRIVATE PREVIEW',
  'coming-soon': 'COMING SOON',
  live: 'LIVE',
  archived: 'ARCHIVED',
} as const;

type Props = {
  liveCollections?: TwoHarmonicCollection[];
  catalogConfigured?: boolean;
  catalogError?: string | null;
};

function money(cents: number) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(cents / 100);
}

export function TwoHarmonicWorldExperience({ liveCollections = [], catalogConfigured = false, catalogError = null }: Props) {
  const hasLiveCatalog = liveCollections.length > 0;
  const liveGarmentCount = liveCollections.reduce((total, collection) => total + collection.two_harmonic_garments.length, 0);

  return (
    <main className="two-harmonic-world relative isolate min-h-screen overflow-hidden px-4 py-8 pb-28 sm:px-6" data-world-shell>
      <LuxuryFashionHouseExperience />
      <div className="absolute inset-0 -z-30" style={{ background: 'radial-gradient(circle at 18% 14%, color-mix(in srgb,var(--identity-primary) 24%,transparent), transparent 28rem),radial-gradient(circle at 82% 35%,color-mix(in srgb,var(--identity-secondary) 14%,transparent),transparent 30rem),linear-gradient(145deg,var(--identity-ambient),color-mix(in srgb,var(--world-surface) 72%,var(--identity-ambient)))' }} />
      <div className="absolute inset-0 -z-20 opacity-25" style={{ backgroundImage: 'linear-gradient(90deg,transparent 49%,color-mix(in srgb,var(--identity-primary) 14%,transparent) 50%,transparent 51%),linear-gradient(transparent 49%,color-mix(in srgb,var(--identity-secondary) 10%,transparent) 50%,transparent 51%)', backgroundSize: '72px 72px' }} />
      <div className="absolute left-[8%] top-28 -z-10 text-8xl opacity-10">🧵</div>
      <div className="absolute right-[10%] top-[38%] -z-10 text-9xl opacity-10">♬</div>

      <div className="mx-auto max-w-7xl">
        <nav className="mb-8 flex flex-wrap items-center justify-between gap-3">
          <Link href="/" className="rounded-full border px-4 py-3 text-sm font-black" style={{ borderColor: 'var(--world-border)', background: 'color-mix(in srgb,var(--world-surface) 70%,transparent)', color: 'var(--world-muted)' }}>← Harmonic OS</Link>
          <div className="flex items-center gap-3">
            <img src="/identity/two-harmonic-mark-blue.svg" alt="2 Harmonic core mark" className="h-10 w-8 object-contain opacity-80" />
            <div className="flex flex-wrap gap-2">
              <Link href="/worlds/two-harmonic/collections" className="world-primary-action rounded-full px-4 py-3 text-sm font-black">Collections</Link>
              <Link href="/studio/two-harmonic" className="world-secondary-action rounded-full border px-4 py-3 text-sm font-black">Fashion House Studio</Link>
            </div>
          </div>
        </nav>

        <section className="grid gap-6 lg:grid-cols-[1.08fr_.92fr] lg:items-stretch">
          <div className="glass-panel rounded-[3rem] border p-7 sm:p-11" style={{ borderColor: 'var(--world-border)', boxShadow: '0 0 90px color-mix(in srgb,var(--identity-mark-glow) 18%,transparent)' }}>
            <div className="flex items-center gap-4"><img src="/identity/two-harmonic-mark-gold.svg" alt="Beige Frequency mark" className="h-16 w-12 object-contain" /><p className="text-xs font-black uppercase tracking-[.38em]" style={{ color: 'var(--identity-accent)' }}>The Fashion House</p></div>
            <h1 className="mt-5 max-w-4xl text-6xl font-black leading-[.88] tracking-[-.09em] sm:text-8xl"><WorldCopy world="two-harmonic" field="title" fallback="Stitched Melodies." /></h1>
            <p className="mt-6 max-w-3xl text-xl font-black leading-tight tracking-[-.04em] sm:text-3xl"><WorldCopy world="two-harmonic" field="subtitle" fallback="Where songs become garments, garments become memory, and memory becomes legacy." /></p>
            <p className="mt-6 max-w-2xl text-base leading-8" style={{ color: 'var(--world-muted)' }}>2 Harmonic is the soul of Harmonic OS. Every collection is a chapter. Every garment carries a melody. Music, fashion, philosophy, and community move as one release.</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/worlds/two-harmonic/collections" className="world-primary-action rounded-full px-6 py-4 text-sm font-black"><WorldCopy world="two-harmonic" field="primaryCta" fallback="Enter the Fashion House" /></Link>
              <Link href="/worlds/two-harmonic/melody-sync" className="world-secondary-action rounded-full border px-6 py-4 text-sm font-black"><WorldCopy world="two-harmonic" field="secondaryCta" fallback="Hear the Collection" /></Link>
            </div>
          </div>

          <aside className="relative overflow-hidden rounded-[3rem] border p-6 sm:p-8" style={{ borderColor: 'var(--world-border)', background: 'linear-gradient(145deg,color-mix(in srgb,var(--world-surface) 92%,transparent),color-mix(in srgb,var(--identity-primary) 10%,var(--identity-ambient)))', boxShadow: '0 0 90px color-mix(in srgb,var(--identity-mark-glow) 22%,transparent)' }}>
            <div className="flex items-center justify-between"><p className="text-xs font-black uppercase tracking-[.3em]" style={{ color: 'var(--world-muted)' }}>Now Tailoring</p><span className="rounded-full border px-3 py-1 font-mono text-xs" style={{ borderColor: 'var(--world-border)', color: 'var(--identity-accent)' }}>{hasLiveCatalog ? 'DATABASE LIVE' : 'LIVING DROP'}</span></div>
            <div className="mt-8 grid min-h-[360px] place-items-center rounded-[2.4rem] border" style={{ borderColor: 'var(--world-border)', background: 'radial-gradient(circle,color-mix(in srgb,var(--identity-primary) 24%,transparent),transparent 58%)' }}>
              <div className="text-center"><FrequencyMark className="mx-auto" /><h2 className="mt-6 text-4xl font-black tracking-[-.07em]">{hasLiveCatalog ? liveCollections[0].name : 'Lift U Up'}</h2><p className="mt-2 text-sm font-black uppercase tracking-[.2em]" style={{ color: 'var(--identity-accent)' }}>{hasLiveCatalog ? liveStatusLabel[liveCollections[0].status] : 'Song + Collection Sync'}</p></div>
            </div>
            <div className="mt-4 grid grid-cols-3 gap-3">{[['Garments',hasLiveCatalog ? String(liveGarmentCount).padStart(2, '0') : '04'],['Chapter','01'],['State',hasLiveCatalog ? 'Cloud' : 'Production']].map(([label,value]) => <div key={label} className="rounded-2xl border p-4" style={{ borderColor: 'var(--world-border)', background: 'color-mix(in srgb,var(--world-surface) 75%,transparent)' }}><p className="text-[10px] font-black uppercase tracking-[.16em]" style={{ color: 'var(--world-muted)' }}>{label}</p><p className="mt-2 text-xl font-black">{value}</p></div>)}</div>
          </aside>
        </section>

        <section className="py-10">
          <p className="text-xs font-black uppercase tracking-[.32em]" style={{ color: 'var(--world-muted)' }}>Fashion House Rooms</p>
          <h2 className="mt-3 text-4xl font-black tracking-[-.07em] sm:text-6xl">Build the brand from thread to legacy.</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{fashionRooms.map((room) => <Link key={room.href} href={room.href} className="glass-panel group rounded-[2rem] border p-5 transition hover:-translate-y-2" style={{ borderColor: 'var(--world-border)' }}><span className="text-4xl">{room.icon}</span><h3 className="mt-5 text-2xl font-black tracking-[-.05em]">{room.title}</h3><p className="mt-3 text-sm leading-7" style={{ color: 'var(--world-muted)' }}>{room.copy}</p><p className="mt-5 text-sm font-black" style={{ color: 'var(--identity-accent)' }}>Enter Room →</p></Link>)}</div>
        </section>

        <section className="py-8">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div><p className="text-xs font-black uppercase tracking-[.32em]" style={{ color: 'var(--world-muted)' }}>Active Collections</p><h2 className="mt-3 text-4xl font-black tracking-[-.07em] sm:text-6xl">The collection is alive.</h2></div>
            <span className="rounded-full border px-4 py-2 text-xs font-black uppercase tracking-[.18em]" style={{ borderColor: 'var(--world-border)', color: catalogError ? '#fca5a5' : 'var(--identity-accent)' }}>{catalogError ? 'Cloud connection needs attention' : hasLiveCatalog ? 'Synced with Supabase' : catalogConfigured ? 'No live collection yet' : 'Preview data'}</span>
          </div>

          {hasLiveCatalog ? (
            <div className="mt-6 grid gap-5 lg:grid-cols-2">
              {liveCollections.map((collection) => {
                const available = collection.two_harmonic_garments.reduce((total, garment) => total + garment.two_harmonic_inventory.reduce((sum, item) => sum + Math.max(0, item.quantity - item.reserved), 0), 0);
                return <article key={collection.slug} className="overflow-hidden rounded-[2.3rem] border" style={{ borderColor: 'var(--world-border)', background: 'color-mix(in srgb,var(--world-surface) 86%,transparent)' }}><div className="grid aspect-[16/7] place-items-center" style={{ background: 'radial-gradient(circle,color-mix(in srgb,var(--identity-primary) 28%,transparent),transparent 58%),linear-gradient(145deg,#d8c7aa,#17120d)' }}><img src="/identity/two-harmonic-mark-gold.svg" alt="2 Harmonic collection mark" className="h-40 w-32 object-contain" /></div><div className="p-6"><div className="flex flex-wrap items-center justify-between gap-3"><p className="text-xs font-black uppercase tracking-[.18em]" style={{ color: 'var(--identity-accent)' }}>Cloud Collection</p><span className="rounded-full border px-3 py-1 text-[10px] font-black" style={{ borderColor: 'var(--world-border)' }}>{liveStatusLabel[collection.status]}</span></div><h3 className="mt-3 text-3xl font-black tracking-[-.06em]">{collection.name}</h3><p className="mt-3 text-sm leading-7" style={{ color: 'var(--world-muted)' }}>{collection.private_access_description || collection.private_access_label}</p><div className="mt-5 grid gap-3 sm:grid-cols-2">{collection.two_harmonic_garments.map((garment) => <Link key={garment.slug} href={`/worlds/two-harmonic/collections/${collection.slug}`} className="rounded-2xl border p-4 transition hover:-translate-y-1" style={{ borderColor: 'var(--world-border)', background: 'color-mix(in srgb,var(--identity-ambient) 55%,transparent)' }}><div className="flex items-start justify-between gap-3"><div><h4 className="font-black">{garment.name}</h4><p className="mt-1 text-sm" style={{ color: 'var(--world-muted)' }}>{money(garment.price_cents)}</p></div><span className="text-xs font-black" style={{ color: 'var(--identity-accent)' }}>{garment.reservations_enabled ? 'RESERVE' : 'PREVIEW'}</span></div><div className="mt-3 flex flex-wrap gap-2">{garment.two_harmonic_inventory.map((item) => <span key={item.size} className="rounded-full border px-2 py-1 text-[10px] font-black" style={{ borderColor: 'var(--world-border)' }}>{item.size} · {Math.max(0, item.quantity - item.reserved)}</span>)}</div></Link>)}</div><div className="mt-5 flex items-center justify-between"><p className="text-sm font-black">{available} pieces available</p><Link href={`/worlds/two-harmonic/collections/${collection.slug}`} className="text-sm font-black" style={{ color: 'var(--identity-accent)' }}>Open Chapter →</Link></div></div></article>;
              })}
            </div>
          ) : (
            <div className="mt-5 grid gap-5 lg:grid-cols-3">{collections.map((collection, index) => <article key={collection.slug} className="overflow-hidden rounded-[2.3rem] border" style={{ borderColor: 'var(--world-border)', background: 'color-mix(in srgb,var(--world-surface) 86%,transparent)' }}><div className="grid aspect-[4/3] place-items-center" style={{ background: `radial-gradient(circle,${collection.palette[1]}55,transparent 58%),linear-gradient(145deg,${collection.palette[0]},${collection.palette[2]})` }}>{index === 0 ? <img src="/identity/two-harmonic-mark-gold.svg" alt="Beige Frequency" className="h-44 w-36 object-contain" /> : <span className="text-8xl text-white">{collection.symbol}</span>}</div><div className="p-6"><div className="flex items-center justify-between gap-3"><p className="text-xs font-black uppercase tracking-[.18em]" style={{ color: 'var(--identity-accent)' }}>{collection.chapter}</p><span className="rounded-full border px-3 py-1 text-[10px] font-black" style={{ borderColor: 'var(--world-border)' }}>{statusLabel[collection.status]}</span></div><h3 className="mt-3 text-3xl font-black tracking-[-.06em]">{collection.name}</h3><p className="mt-3 text-sm leading-7" style={{ color: 'var(--world-muted)' }}>{collection.story}</p><div className="mt-5 flex items-center justify-between"><p className="text-sm font-black">{collection.garments} garments</p><Link href={`/worlds/two-harmonic/collections/${collection.slug}`} className="text-sm font-black" style={{ color: 'var(--identity-accent)' }}>Open Chapter →</Link></div></div></article>)}</div>
          )}
        </section>

        <section className="py-8">
          <div className="rounded-[2.8rem] border p-7 sm:p-10" style={{ borderColor: 'var(--world-border)', background: 'linear-gradient(135deg,color-mix(in srgb,var(--identity-primary) 12%,var(--world-surface)),color-mix(in srgb,var(--identity-secondary) 8%,var(--identity-ambient)))' }}>
            <div className="flex items-center gap-5"><img src="/identity/two-harmonic-mark-blue.svg" alt="2 Harmonic core identity" className="h-24 w-20 object-contain" /><div><p className="text-xs font-black uppercase tracking-[.32em]" style={{ color: 'var(--identity-accent)' }}>The 2 Harmonic Constitution</p><h2 className="mt-4 text-4xl font-black tracking-[-.07em] sm:text-6xl">Clothes should say something before you do.</h2></div></div>
            <div className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{stitchedPrinciples.map((item) => <div key={item.title} className="rounded-[1.8rem] border p-5" style={{ borderColor: 'var(--world-border)', background: 'color-mix(in srgb,var(--identity-ambient) 52%,transparent)' }}><h3 className="text-xl font-black">{item.title}</h3><p className="mt-3 text-sm leading-7" style={{ color: 'var(--world-muted)' }}>{item.copy}</p></div>)}</div>
          </div>
        </section>
      </div>
    </main>
  );
}
