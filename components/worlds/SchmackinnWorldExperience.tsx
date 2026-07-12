'use client';

import Link from 'next/link';
import { bootRuntime } from '@/lib/harmonic-signal-bus';
import { worldDefaults } from '@/lib/harmonic-engine';
import { RuntimeVisualDriver } from '@/components/runtime/RuntimeVisualDriver';
import { LivingWorldOverlay } from '@/components/runtime/LivingWorldOverlay';
import { SeasonalWorldLayer } from '@/components/seasons/SeasonalWorldLayer';
import { WorldCopy } from '@/components/studio/WorldCopy';
import { WorldStructuredRuntime } from '@/components/runtime/WorldStructuredRuntime';

const runtime = bootRuntime(worldDefaults.schmackin);
const tiers = [
  ['SCHMACKINN','Elite dishes. Top tier only.','✧','border-fuchsia-400/70 text-fuchsia-200 shadow-fuchsia-500/20'],
  ['CRACKINN','Solid eats. Really hittin.','ϟ','border-yellow-300/70 text-yellow-200 shadow-yellow-400/20'],
  ['LACKINN','Mid. Could be better.','☹','border-orange-400/70 text-orange-200 shadow-orange-500/20'],
  ['BUNS','Not it. Save your money.','⌫','border-zinc-500 text-zinc-300 shadow-black/40'],
] as const;
const plates = ['Jerk Mac Bowl','Philly Loaded Fries','Lemon Pepper Wings','Shrimp Alfredo Pasta'];

export function SchmackinnWorldExperience() {
  const state = runtime.state;
  const sections = [
    { id: 'hero', node: <Hero /> },
    { id: 'featured', node: <Featured /> },
    { id: 'collections', node: <TierArchive /> },
    { id: 'community', node: <Community /> },
    { id: 'archive', node: <Archive /> },
    { id: 'commerce', node: <Commerce /> },
    { id: 'audio', node: <AudioLayer /> },
  ];

  return (
    <main className="world-customizable relative isolate min-h-screen overflow-hidden bg-[#030305] pb-24 text-white">
      <SeasonalWorldLayer world="schmackin" />
      <RuntimeVisualDriver world="schmackin" />
      <LivingWorldOverlay world="schmackin" />
      <div className="pointer-events-none absolute inset-0 -z-20 bg-[radial-gradient(circle_at_70%_15%,rgba(168,85,247,.24),transparent_32%),radial-gradient(circle_at_18%_60%,rgba(124,58,237,.12),transparent_38%),linear-gradient(#030305,#07020b)]" />
      <div className="pointer-events-none absolute inset-0 -z-10 opacity-25 [background-image:linear-gradient(rgba(168,85,247,.08)_1px,transparent_1px),linear-gradient(90deg,rgba(168,85,247,.08)_1px,transparent_1px)] [background-size:40px_40px]" />
      <Header />
      <WorldStructuredRuntime world="schmackinn" sections={sections} />
      <footer className="mx-auto mt-8 flex max-w-7xl items-center justify-between border-t border-fuchsia-300/15 px-5 py-8 text-[10px] font-black uppercase tracking-[.36em] text-fuchsia-200/55 sm:px-8">
        <span>Stay in tune.</span><span className="text-xl text-fuchsia-300">⌁⌁⌁</span><span>Stay in harmony.</span>
      </footer>
      <span className="sr-only">Runtime DNA {state.dna.food}</span>
    </main>
  );
}

function Header(){return <header className="sticky top-0 z-40 border-b border-fuchsia-300/15 bg-black/80 backdrop-blur-2xl"><div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-4 sm:px-8"><Link href="/" className="text-xl font-black italic tracking-[-.06em] text-fuchsia-300 [text-shadow:0_0_18px_rgba(217,70,239,.75)]">HARMONIC OS</Link><nav className="hidden gap-6 text-[10px] font-black uppercase tracking-[.18em] text-white/65 md:flex"><Link href="/">Home</Link><Link href="/worlds">Worlds</Link><Link href="/community">Community</Link><Link href="/shop">Shop</Link></nav><div className="grid h-10 w-10 place-items-center rounded-xl border border-fuchsia-300/40 text-fuchsia-300 shadow-[0_0_20px_rgba(217,70,239,.25)]">∞</div></div></header>}

function Frame({children,className=''}:{children:React.ReactNode;className?:string}){return <section className={`mx-auto max-w-7xl px-5 py-5 sm:px-8 ${className}`}>{children}</section>}
function Panel({children,className=''}:{children:React.ReactNode;className?:string}){return <div className={`rounded-[1.4rem] border border-fuchsia-300/20 bg-black/65 shadow-[0_0_35px_rgba(168,85,247,.08)] backdrop-blur-xl ${className}`}>{children}</div>}

function Hero(){return <Frame><Panel className="overflow-hidden"><div className="grid min-h-[440px] lg:grid-cols-[.9fr_1.1fr]"><div className="flex flex-col justify-center p-7 sm:p-10"><p className="text-4xl font-black italic leading-none tracking-[-.08em] text-white sm:text-6xl">GOT THE <span className="block text-fuchsia-400 [text-shadow:0_0_24px_rgba(217,70,239,.7)]">MUNCHIES?</span></p><p className="mt-8 text-lg text-fuchsia-200/70">Welcome to</p><h1 className="text-4xl font-black tracking-[.03em] text-fuchsia-400"><WorldCopy world="schmackinn" field="title" fallback="SCHMACKINN" /></h1><p className="mt-3 max-w-md text-sm leading-6 text-white/65"><WorldCopy world="schmackinn" field="subtitle" fallback="Real reviews. Real opinions. Find your next obsession." /></p><Link href="/worlds/schmackinn/reviews" className="mt-7 w-fit rounded-lg border border-fuchsia-400/60 px-6 py-3 text-xs font-black uppercase tracking-[.15em] text-fuchsia-200 shadow-[0_0_22px_rgba(217,70,239,.18)]">Explore the world</Link></div><div className="relative min-h-[320px] overflow-hidden bg-[radial-gradient(circle_at_50%_45%,rgba(217,70,239,.45),transparent_24%),linear-gradient(135deg,#09000f,#160025_55%,#030305)]"><div className="absolute inset-0 opacity-45 [background-image:linear-gradient(115deg,transparent_35%,rgba(232,121,249,.15),transparent_65%)]"/><div className="absolute left-1/2 top-1/2 grid h-48 w-48 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border-[12px] border-fuchsia-300 text-8xl text-fuchsia-200 shadow-[0_0_35px_#d946ef,inset_0_0_30px_#d946ef] rotate-[-18deg]">◔</div><p className="absolute bottom-8 right-8 rounded border border-fuchsia-300/30 bg-black/60 px-4 py-2 text-xs font-black uppercase tracking-[.2em] text-fuchsia-200">Good food · Good mood</p></div></div></Panel></Frame>}

function Featured(){return <Frame><div className="grid gap-4 lg:grid-cols-[1.35fr_.65fr]"><Panel className="p-5"><p className="text-xs font-black uppercase tracking-[.2em] text-fuchsia-200">☆ Featured Review</p><div className="mt-4 grid gap-5 sm:grid-cols-[1.1fr_.9fr]"><div className="grid min-h-56 place-items-center rounded-xl bg-[radial-gradient(circle_at_50%_35%,#9a3412,#3f1307_45%,#100705)] text-7xl shadow-inner">🍗</div><div className="flex flex-col justify-center"><h2 className="text-3xl font-black">THE HOT SPOT</h2><p className="mt-2 text-white/55">Chicken & Waffles</p><p className="mt-6 text-xs font-black uppercase text-fuchsia-300">Schmackinn</p><p className="mt-2 text-2xl tracking-[.18em] text-fuchsia-300">∞ ∞ ∞ ∞ ◇</p><Link href="/worlds/schmackinn/reviews" className="mt-5 w-fit rounded border border-fuchsia-300/40 px-4 py-2 text-[10px] font-black uppercase tracking-[.16em]">Watch now</Link></div></div></Panel><Panel className="p-5"><p className="text-xs font-black uppercase tracking-[.2em] text-fuchsia-200">Trending Plates</p><div className="mt-4 space-y-3">{plates.map((plate,index)=><div key={plate} className="flex items-center gap-3 border-b border-white/8 pb-3"><div className="grid h-12 w-16 place-items-center rounded-lg bg-amber-950 text-xl">🍽️</div><p className="flex-1 text-sm font-bold">{plate}</p><span className="text-xs text-fuchsia-300">{'∞'.repeat(4-index%2)}</span></div>)}</div></Panel></div></Frame>}

function TierArchive(){return <Frame><Panel className="p-5"><p className="text-xs font-black uppercase tracking-[.2em] text-fuchsia-200">☆ Tier Archive</p><div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">{tiers.map(([name,desc,icon,style])=><Link href="/worlds/schmackinn/reviews" key={name} className={`rounded-xl border bg-black/70 p-5 text-center shadow-[0_0_28px_var(--tw-shadow-color)] transition hover:-translate-y-1 ${style}`}><p className="text-2xl font-black">{name}</p><p className="my-5 text-5xl">{icon}</p><p className="text-xs leading-5 text-white/55">{desc}</p></Link>)}</div></Panel></Frame>}

function Community(){return <Frame><div className="grid gap-4 lg:grid-cols-3"><Panel className="p-5"><p className="text-xs font-black uppercase tracking-[.2em] text-fuchsia-200">Restaurant Map</p><div className="mt-4 h-48 rounded-xl bg-[radial-gradient(circle_at_30%_40%,#d946ef_0_3px,transparent_4px),radial-gradient(circle_at_70%_65%,#a855f7_0_3px,transparent_4px),linear-gradient(135deg,#0b0610,#17061d)] bg-[length:100%_100%] p-4"><Link href="/worlds/schmackinn/map" className="mt-32 inline-block rounded border border-fuchsia-300/40 px-3 py-2 text-[10px] font-black uppercase">Explore map</Link></div></Panel><Panel className="p-5"><p className="text-xs font-black uppercase tracking-[.2em] text-fuchsia-200">Community Picks</p><div className="mt-4 space-y-4">{['That jerk bowl CRACKIN','Shrimp Alfredo hits','Wings were buns'].map((text)=><div key={text} className="flex gap-3"><div className="h-9 w-9 rounded-full bg-fuchsia-900"/><div><p className="text-xs text-white/70">{text}</p><p className="text-[10px] uppercase text-fuchsia-300">Schmackinn</p></div></div>)}</div></Panel><Panel className="p-5"><p className="text-xs font-black uppercase tracking-[.2em] text-fuchsia-200">Hidden Recipe Archive</p><p className="mt-5 text-sm leading-6 text-white/60">Exclusive recipes from our favorite spots.</p><div className="mt-8 flex items-end justify-between"><span className="rounded border border-fuchsia-300/40 px-3 py-2 text-[10px] font-black uppercase">Coming soon</span><span className="text-6xl text-fuchsia-300">♨</span></div></Panel></div></Frame>}
function Archive(){return <Frame><Panel className="p-6"><p className="text-xs font-black uppercase tracking-[.2em] text-fuchsia-200">Food Memory Archive</p><h2 className="mt-3 text-3xl font-black">Every plate leaves a frequency.</h2><p className="mt-3 max-w-2xl text-sm leading-7 text-white/55">Save the restaurants, jokes, people, cities, and first bites that became part of the story.</p></Panel></Frame>}
function Commerce(){return <Frame><Panel className="flex flex-wrap items-center justify-between gap-5 p-6"><div><p className="text-xs font-black uppercase tracking-[.2em] text-fuchsia-200">Flavor Pass</p><h2 className="mt-2 text-3xl font-black">Unlock private tastings and drops.</h2></div><Link href="/shop" className="rounded-lg bg-fuchsia-400 px-6 py-3 text-xs font-black uppercase tracking-[.15em] text-black">Enter shop</Link></Panel></Frame>}
function AudioLayer(){return <Frame><Panel className="flex items-center gap-4 p-4"><button className="grid h-12 w-12 place-items-center rounded-full bg-fuchsia-500 text-black">▶</button><div className="flex-1"><p className="text-xs font-black uppercase tracking-[.18em] text-fuchsia-200">Schmackinn Frequency</p><div className="mt-2 h-1 rounded-full bg-gradient-to-r from-fuchsia-500 via-purple-400 to-transparent"/></div><span className="text-xs text-white/40">LIVE</span></Panel></Frame>}
