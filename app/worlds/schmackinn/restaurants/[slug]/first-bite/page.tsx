'use client';

import Link from 'next/link';
import { use, useMemo, useState } from 'react';
import { getRestaurant, verdictStyle } from '@/data/schmackinn-universe';

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
    <main className="schmackinn-world relative min-h-screen overflow-hidden px-4 py-8 pb-28 text-white sm:px-6">
      <div className="schmackinn-aurora absolute inset-0 -z-30" /><div className="restaurant-rain absolute inset-0 -z-20 opacity-30" /><div className="steam-cloud steam-one" /><div className="steam-cloud steam-two" />
      <div className="mx-auto max-w-6xl">
        <nav className="mb-8 flex items-center justify-between gap-3"><Link href={`/worlds/schmackinn/restaurants/${restaurant.slug}`} className="rounded-full border border-white/10 bg-white/[.04] px-4 py-3 text-sm font-black text-white/70">← Exit Sequence</Link><p className="text-xs font-black uppercase tracking-[.22em] text-purple-100/45">First Bite Director</p></nav>

        <section className={`overflow-hidden rounded-[3rem] border ${finished ? mood.glow : 'border-purple-200/15 bg-black/50'}`}>
          <div className="relative grid min-h-[620px] place-items-center p-6 text-center sm:p-10">
            <div className={`absolute inset-0 transition-all duration-700 ${finished ? 'opacity-100' : 'opacity-40'}`} style={{ background: finished ? 'radial-gradient(circle,rgba(192,132,252,.34),transparent 28rem),linear-gradient(to bottom,#180a22,#050206)' : 'radial-gradient(circle,rgba(255,255,255,.08),transparent 24rem),linear-gradient(to bottom,#120716,#030203)' }} />
            <div className="relative z-10 max-w-3xl">
              <p className="text-xs font-black uppercase tracking-[.34em] text-purple-100/45">{restaurant.name} · Scene {step + 1}/{steps.length}</p>
              <div className="mt-8 text-8xl sm:text-9xl">{finished ? restaurant.storefront : current.icon}</div>
              <h1 className="mt-6 text-5xl font-black tracking-[-.08em] sm:text-8xl">{finished ? restaurant.verdict : current.label}</h1>
              <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-white/58">{finished ? mood.atmosphere : current.copy}</p>

              {finished ? <div className="mt-8 grid gap-3 sm:grid-cols-3"><div className="rounded-2xl border border-white/10 bg-black/35 p-5"><p className="text-xs text-white/35">Final Score</p><p className="mt-2 text-5xl font-black">{restaurant.score}</p></div><div className="rounded-2xl border border-white/10 bg-black/35 p-5"><p className="text-xs text-white/35">Featured Dish</p><p className="mt-2 text-xl font-black">{restaurant.featuredDish}</p></div><div className="rounded-2xl border border-white/10 bg-black/35 p-5"><p className="text-xs text-white/35">Community Heat</p><p className="mt-2 text-4xl font-black">🔥 {restaurant.callouts}</p></div></div> : <div className="mx-auto mt-8 flex max-w-xl gap-2">{steps.map((_, index) => <div key={index} className={`h-2 flex-1 rounded-full ${index <= step ? 'bg-purple-300' : 'bg-white/10'}`} />)}</div>}

              <div className="mt-8 flex flex-wrap justify-center gap-3">
                {step > 0 && <button onClick={() => setStep((value) => value - 1)} className="rounded-full border border-white/10 bg-white/[.04] px-6 py-4 text-sm font-black text-white/65">Previous Scene</button>}
                {!finished && <button onClick={() => setStep((value) => Math.min(steps.length - 1, value + 1))} className="rounded-full bg-purple-300 px-7 py-4 text-sm font-black text-black">Continue Sequence →</button>}
                {finished && <><button onClick={() => setCommunityVote('agree')} className={`rounded-full px-6 py-4 text-sm font-black ${communityVote === 'agree' ? 'bg-purple-300 text-black' : 'border border-white/10 bg-white/[.04] text-white/65'}`}>I Agree</button><button onClick={() => setCommunityVote('disagree')} className={`rounded-full px-6 py-4 text-sm font-black ${communityVote === 'disagree' ? 'bg-orange-300 text-black' : 'border border-white/10 bg-white/[.04] text-white/65'}`}>Different Frequency</button><Link href="/worlds/schmackinn/memories" className="rounded-full border border-purple-200/20 bg-purple-300/10 px-6 py-4 text-sm font-black text-purple-100">Save Food Memory</Link></>}
              </div>
              {communityVote && <p className="mt-4 text-sm font-black text-purple-100">Community verdict saved: {communityVote === 'agree' ? 'same frequency' : 'different frequency'}.</p>}
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
