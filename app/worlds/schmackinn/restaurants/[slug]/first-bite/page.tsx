'use client';

import Link from 'next/link';
import { use, useMemo, useState } from 'react';
import { getRestaurant, verdictStyle } from '@/data/schmackinn-universe';
import { WorldCopy } from '@/components/studio/WorldCopy';

const steps = [
  { label: 'Drive Up', icon: '🚗', copy: 'The storefront comes into focus and the district atmosphere fades in.' },
  { label: 'Walk In', icon: '🚪', copy: 'The door opens. Kitchen noise, music, and crowd energy enter the mix.' },
  { label: 'Food Arrives', icon: '🍽️', copy: 'The plate lands. Steam rises and the camera locks onto the featured dish.' },
  { label: 'First Bite', icon: '🥄', copy: 'Texture, flavor, freshness, comfort, value, and culture enter the engine.' },
  { label: 'Reaction', icon: '😮‍💨', copy: 'The room pauses while the real reaction takes over the scene.' },
  { label: 'Verdict Reveal', icon: '⚡', copy: 'The restaurant frequency is revealed and the entire environment responds.' },
];

export default function FirstBitePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const restaurant = getRestaurant(slug);
  const [step, setStep] = useState(0);
  const [communityVote, setCommunityVote] = useState<'agree' | 'disagree' | null>(null);
  const current = steps[step];
  const finished = step === steps.length - 1;
  const mood = useMemo(() => restaurant ? verdictStyle[restaurant.verdict] : null, [restaurant]);
  if (!restaurant || !mood) return <main className="min-h-screen bg-black p-10 text-white">Restaurant not found.</main>;

  return (
    <main className="schmackinn-world relative min-h-screen overflow-hidden px-4 py-8 pb-28 sm:px-6" style={{ color: 'var(--world-text)', background: 'var(--world-background)' }}>
      <div className="schmackinn-aurora absolute inset-0 -z-30" /><div className="restaurant-rain absolute inset-0 -z-20 opacity-30" /><div className="steam-cloud steam-one" /><div className="steam-cloud steam-two" />
      <div className="mx-auto max-w-6xl">
        <nav className="mb-8 flex items-center justify-between gap-3"><Link href={`/worlds/schmackinn/restaurants/${restaurant.slug}`} className="world-secondary-action rounded-full border px-4 py-3 text-sm font-black">← Exit Sequence</Link><p className="world-accent-text text-xs font-black uppercase tracking-[.22em]"><WorldCopy world="schmackinn" field="firstBiteTitle" fallback="First Bite Director" /></p></nav>
        <section className="overflow-hidden rounded-[3rem] border" style={{ borderColor: finished ? 'var(--world-primary)' : 'var(--world-border)', background: 'color-mix(in srgb, var(--world-surface) 86%, transparent)', boxShadow: finished ? '0 0 90px color-mix(in srgb, var(--world-glow) 30%, transparent)' : undefined }}>
          <div className="relative grid min-h-[620px] place-items-center p-6 text-center sm:p-10">
            <div className="absolute inset-0 transition-all duration-700" style={{ opacity: finished ? 1 : .45, background: finished ? 'radial-gradient(circle,color-mix(in srgb,var(--world-primary) 34%,transparent),transparent 28rem),linear-gradient(to bottom,var(--world-surface),var(--world-background))' : 'radial-gradient(circle,color-mix(in srgb,var(--world-text) 8%,transparent),transparent 24rem),linear-gradient(to bottom,var(--world-surface),var(--world-background))' }} />
            <div className="relative z-10 max-w-3xl">
              <p className="world-accent-text text-xs font-black uppercase tracking-[.34em]">{restaurant.name} · Scene {step + 1}/{steps.length}</p>
              <div className="mt-8 text-8xl sm:text-9xl">{finished ? restaurant.storefront : current.icon}</div>
              <h1 className="mt-6 text-5xl font-black tracking-[-.08em] sm:text-8xl">{finished ? restaurant.verdict : current.label}</h1>
              <p className="world-muted-text mx-auto mt-5 max-w-2xl text-base leading-8">{finished ? mood.atmosphere : current.copy}</p>
              {finished ? <div className="mt-8 grid gap-3 sm:grid-cols-3"><Stat label="Final Score" value={restaurant.score} /><Stat label="Featured Dish" value={restaurant.featuredDish} small /><Stat label="Community Heat" value={`🔥 ${restaurant.callouts}`} /></div> : <div className="mx-auto mt-8 flex max-w-xl gap-2">{steps.map((_, index) => <div key={index} className="h-2 flex-1 rounded-full" style={{ background: index <= step ? 'var(--world-primary)' : 'color-mix(in srgb,var(--world-text) 10%,transparent)' }} />)}</div>}
              <div className="mt-8 flex flex-wrap justify-center gap-3">
                {step > 0 && <button onClick={() => setStep((value) => value - 1)} className="world-secondary-action rounded-full border px-6 py-4 text-sm font-black">Previous Scene</button>}
                {!finished && <button onClick={() => setStep((value) => Math.min(steps.length - 1, value + 1))} className="world-primary-action rounded-full px-7 py-4 text-sm font-black"><WorldCopy world="schmackinn" field="primaryCta" fallback="Continue Sequence →" /></button>}
                {finished && <><button onClick={() => setCommunityVote('agree')} className={`rounded-full px-6 py-4 text-sm font-black ${communityVote === 'agree' ? 'world-primary-action' : 'world-secondary-action border'}`}>I Agree</button><button onClick={() => setCommunityVote('disagree')} className={`rounded-full px-6 py-4 text-sm font-black ${communityVote === 'disagree' ? 'world-primary-action' : 'world-secondary-action border'}`}>Different Frequency</button><Link href="/worlds/schmackinn/memories" className="world-secondary-action rounded-full border px-6 py-4 text-sm font-black">Save Food Memory</Link></>}
              </div>
              {communityVote && <p className="world-accent-text mt-4 text-sm font-black">Community verdict saved: {communityVote === 'agree' ? 'same frequency' : 'different frequency'}.</p>}
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

function Stat({ label, value, small = false }: { label: string; value: string | number; small?: boolean }) {
  return <div className="world-surface rounded-2xl border p-5" style={{ borderColor: 'var(--world-border)' }}><p className="world-muted-text text-xs">{label}</p><p className={`mt-2 font-black ${small ? 'text-xl' : 'text-4xl'}`}>{value}</p></div>;
}
