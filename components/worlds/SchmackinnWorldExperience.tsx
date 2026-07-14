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
const plates = [
  ['Jerk Mac Bowl','∞ ∞ ∞ ∞ ◇'],
  ['Philly Loaded Fries','∞ ∞ ∞ ∞'],
  ['Lemon Pepper Wings','∞ ∞ ∞ ◇'],
  ['Shrimp Alfredo Pasta','∞ ∞ ∞ ∞'],
];
const tiers = [
  {name:'SCHMACKINN',icon:'∞',desc:'Elite dishes.\nTop tier only.',tone:'border-fuchsia-400 text-fuchsia-300 shadow-fuchsia-500/20'},
  {name:'CRACKINN',icon:'ϟ',desc:'Solid eats.\nReally hittin\'.',tone:'border-yellow-300 text-yellow-300 shadow-yellow-400/20'},
  {name:'LACKINN',icon:'☹',desc:'Mid.\nCould be better.',tone:'border-orange-500 text-orange-400 shadow-orange-500/20'},
  {name:'BUNS',icon:'⌫',desc:'Not it.\nSave your money.',tone:'border-zinc-500 text-zinc-300 shadow-black/40'},
];

export function SchmackinnWorldExperience(){
  const state=runtime.state;
  const sections=[
    {id:'hero',node:<Hero/>},
    {id:'featured',node:<Featured/>},
    {id:'collections',node:<TierArchive/>},
    {id:'community',node:<Community/>},
  ];
  return <main className="world-customizable relative isolate min-h-screen overflow-hidden bg-[#020104] pb-10 text-white">
    <SeasonalWorldLayer world="schmackin"/>
    <RuntimeVisualDriver world="schmackin"/>
    <LivingWorldOverlay world="schmackin"/>
    <div className="pointer-events-none fixed inset-0 -z-30 bg-[radial-gradient(circle_at_73%_15%,rgba(168,85,247,.16),transparent_27%),radial-gradient(circle_at_20%_75%,rgba(217,70,239,.09),transparent_35%),linear-gradient(#010103,#050108)]"/>
    <div className="pointer-events-none fixed inset-0 -z-20 opacity-25 [background-image:linear-gradient(rgba(168,85,247,.06)_1px,transparent_1px),linear-gradient(90deg,rgba(168,85,247,.06)_1px,transparent_1px)] [background-size:36px_36px]"/>
    <Header/>
    <WorldStructuredRuntime world="schmackinn" sections={sections}/>
    <Footer/>
    <span className="sr-only">Runtime DNA {state.dna.food}</span>
  </main>;
}

function Header(){return <header className="sticky top-0 z-40 border-b border-fuchsia-300/15 bg-black/85 backdrop-blur-2xl"><div className="mx-auto flex max-w-[1500px] items-center justify-between gap-4 px-5 py-4 sm:px-8"><Link href="/" className="text-2xl font-black italic tracking-[-.06em] text-fuchsia-300 [text-shadow:0_0_18px_rgba(217,70,239,.8)]">HARMONIC OS</Link><nav className="hidden gap-7 text-[10px] font-black uppercase tracking-[.18em] text-white/65 md:flex"><Link href="/">Home</Link><Link href="/worlds">Worlds⌄</Link><Link href="/#overview">About</Link><Link href="/community">Community</Link><Link href="/shop">Shop</Link></nav><div className="grid h-11 w-11 place-items-center rounded-xl border border-fuchsia-300/40 text-3xl text-fuchsia-300 shadow-[0_0_20px_rgba(217,70,239,.3)]">∞</div></div></header>}
function Frame({children,className=''}:{children:React.ReactNode;className?:string}){return <section className={`mx-auto max-w-[1500px] px-4 py-2 sm:px-6 ${className}`}>{children}</section>}
function Panel({children,className=''}:{children:React.ReactNode;className?:string}){return <div className={`rounded-xl border border-fuchsia-300/20 bg-black/70 shadow-[0_0_30px_rgba(168,85,247,.08)] backdrop-blur-xl ${className}`}>{children}</div>}

function Hero(){return <Frame><Panel className="overflow-hidden"><div className="grid min-h-[390px] lg:grid-cols-[.9fr_1.1fr]"><div className="flex flex-col justify-center p-7 sm:p-10"><p className="text-5xl font-black italic leading-[.9] tracking-[-.07em] text-white sm:text-7xl">GOT THE <span className="block text-fuchsia-400 [text-shadow:0_0_25px_rgba(217,70,239,.75)]">MUNCHIES?</span></p><p className="mt-8 text-lg text-fuchsia-200/70">Welcome to</p><h1 className="text-4xl font-black tracking-[.03em] text-fuchsia-400"><WorldCopy world="schmackinn" field="title" fallback="SCHMACKINN"/></h1><p className="mt-3 max-w-md text-sm leading-6 text-white/65"><WorldCopy world="schmackinn" field="subtitle" fallback="Real reviews. Real opinions. Find your next obsession."/></p><Link href="/worlds/schmackinn/reviews" className="mt-7 w-fit rounded border border-fuchsia-400/60 px-6 py-3 text-xs font-black uppercase tracking-[.15em] text-fuchsia-200 shadow-[0_0_22px_rgba(217,70,239,.18)]">Explore the world</Link></div><div className="relative min-h-[330px] overflow-hidden bg-[linear-gradient(135deg,#120018,#22002f_60%,#050307)]"><div className="absolute inset-0 bg-[radial-gradient(circle_at_55%_50%,rgba(217,70,239,.38),transparent_28%),linear-gradient(115deg,transparent_30%,rgba(232,121,249,.13),transparent_70%)]"/><div className="absolute inset-0 opacity-70 [background-image:linear-gradient(90deg,transparent_0_56%,rgba(236,72,153,.15)_57%,transparent_58%),linear-gradient(0deg,transparent_0_80%,rgba(255,255,255,.05)_81%,transparent_82%)] [background-size:120px_120px]"/><div className="absolute left-1/2 top-1/2 h-48 w-72 -translate-x-1/2 -translate-y-1/2 rotate-[-14deg]"><div className="absolute left-0 top-6 h-24 w-40 rounded-[3rem] border-[10px] border-fuchsia-300 shadow-[0_0_24px_#d946ef,inset_0_0_16px_#d946ef]"/><div className="absolute right-0 top-0 h-40 w-28 rounded-full border-[10px] border-fuchsia-300 shadow-[0_0_28px_#d946ef,inset_0_0_18px_#d946ef]"/><div className="absolute bottom-0 right-5 h-16 w-20 rounded-[50%] border-b-[10px] border-fuchsia-300 shadow-[0_10px_24px_#d946ef]"/></div><p className="absolute right-7 top-7 rounded border border-fuchsia-300/20 bg-black/60 px-4 py-2 text-xs font-black uppercase tracking-[.2em] text-fuchsia-200">Good food<br/>Good mood</p></div></div></Panel></Frame>}

function Featured(){return <Frame><div className="grid gap-3 lg:grid-cols-[1.4fr_.6fr]"><Panel className="p-4"><p className="text-xs font-black uppercase tracking-[.18em] text-fuchsia-200">☆ Featured Review</p><div className="mt-4 grid gap-4 sm:grid-cols-[1.05fr_.95fr]"><div className="relative min-h-52 overflow-hidden rounded-lg bg-[radial-gradient(circle_at_50%_35%,#b45309,#7c2d12_40%,#210905_70%)]"><div className="absolute inset-0 grid place-items-center text-7xl">🍗</div><button aria-label="Play review" className="absolute left-1/2 top-1/2 grid h-14 w-14 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-fuchsia-300/60 bg-black/75 text-xl text-fuchsia-300 shadow-[0_0_22px_rgba(217,70,239,.5)]">▶</button></div><div className="flex flex-col justify-center"><h2 className="text-3xl font-black">THE HOT SPOT</h2><p className="mt-2 text-white/55">Chicken & Waffles</p><p className="mt-7 text-[10px] font-black uppercase text-fuchsia-300">Schmackinn</p><p className="mt-2 text-2xl tracking-[.16em] text-fuchsia-300">∞ ∞ ∞ ∞ ◇</p><Link href="/worlds/schmackinn/reviews" className="mt-5 w-fit rounded border border-fuchsia-300/40 px-4 py-2 text-[10px] font-black uppercase tracking-[.15em]">Watch now</Link></div></div></Panel><Panel className="p-4"><p className="text-xs font-black uppercase tracking-[.18em] text-fuchsia-200">Trending Plates</p><div className="mt-4 space-y-2">{plates.map(([plate,rating])=><div key={plate} className="flex items-center gap-3 border-b border-white/8 pb-2"><div className="grid h-11 w-16 place-items-center rounded bg-amber-950 text-xl">🍽</div><p className="flex-1 text-xs font-bold">{plate}</p><span className="text-[10px] tracking-widest text-fuchsia-300">{rating}</span></div>)}</div></Panel></div></Frame>}

function TierArchive(){return <Frame><Panel className="p-4"><p className="text-xs font-black uppercase tracking-[.18em] text-fuchsia-200">☆ Tier Archive</p><div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">{tiers.map((tier)=><Link href="/worlds/schmackinn/reviews" key={tier.name} className={`rounded-xl border bg-black/80 p-5 text-center shadow-[0_0_24px_var(--tw-shadow-color)] transition hover:-translate-y-1 ${tier.tone}`}><p className="text-xl font-black">{tier.name}</p><p className="my-4 text-5xl">{tier.icon}</p><p className="whitespace-pre-line text-xs leading-5 text-white/55">{tier.desc}</p></Link>)}</div></Panel></Frame>}

function Community(){return <Frame><div className="grid gap-3 lg:grid-cols-3"><Panel className="p-4"><p className="text-xs font-black uppercase tracking-[.18em] text-fuchsia-200"><WorldCopy world="schmackinn" field="mapTitle" fallback="Restaurant Map"/></p><div className="relative mt-4 h-44 overflow-hidden rounded-lg bg-[linear-gradient(135deg,#0b0610,#17061d)]"><div className="absolute inset-0 opacity-50 [background-image:linear-gradient(rgba(168,85,247,.15)_1px,transparent_1px),linear-gradient(90deg,rgba(168,85,247,.15)_1px,transparent_1px)] [background-size:22px_22px]"/>{[[24,40],[55,28],[71,57],[39,68],[78,25]].map(([x,y],i)=><span key={i} className="absolute text-xl text-fuchsia-400 [text-shadow:0_0_12px_#d946ef]" style={{left:`${x}%`,top:`${y}%`}}>⌖</span>)}<Link href="/worlds/schmackinn/map" className="absolute bottom-3 left-3 rounded border border-fuchsia-300/40 px-3 py-2 text-[10px] font-black uppercase">Explore map</Link></div></Panel><Panel className="p-4"><p className="text-xs font-black uppercase tracking-[.18em] text-fuchsia-200"><WorldCopy world="schmackinn" field="communityTitle" fallback="Community Picks"/></p><div className="mt-4 space-y-4">{['That jerk bowl CRACKIN','Shrimp Alfredo hits','Wings were buns'].map((text,index)=><div key={text} className="flex items-center gap-3"><div className="grid h-9 w-9 place-items-center rounded-full bg-fuchsia-900 text-xs">{index+1}</div><div className="flex-1"><p className="text-xs text-white/75">{text}</p><p className="text-[9px] uppercase tracking-wider text-fuchsia-300">Schmackinn</p></div><span className="text-[10px] text-fuchsia-300">∞∞∞</span></div>)}</div></Panel><Panel className="p-4"><p className="text-xs font-black uppercase tracking-[.18em] text-fuchsia-200"><WorldCopy world="schmackinn" field="archiveTitle" fallback="Hidden Recipe Archive"/></p><p className="mt-5 text-sm leading-6 text-white/60"><WorldCopy world="schmackinn" field="archiveDescription" fallback="Exclusive recipes from our favorite spots."/></p><div className="mt-8 flex items-end justify-between"><span className="rounded border border-fuchsia-300/40 px-3 py-2 text-[10px] font-black uppercase">Coming soon</span><span className="text-6xl text-fuchsia-300">♨</span></div></Panel></div></Frame>}

function Footer(){return <footer className="mx-auto mt-4 flex max-w-[1500px] flex-wrap items-center justify-between gap-4 border-t border-fuchsia-300/15 px-5 py-7 text-[10px] font-black uppercase tracking-[.32em] text-fuchsia-200/55 sm:px-8"><span>Stay in tune.</span><span className="text-lg text-fuchsia-300">⌁⌁⌁</span><span className="text-3xl text-fuchsia-300">∞</span><span>Stay in harmony.</span><span className="tracking-[.15em]">◎ ◇ ▶ ◖</span></footer>}
