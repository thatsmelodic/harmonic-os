import Link from 'next/link';
import { bootRuntime } from '@/lib/harmonic-signal-bus';
import { worldDefaults } from '@/lib/harmonic-engine';
import { HarmonicEnginePreview } from '@/components/engine/HarmonicEnginePreview';
import { SeasonalWorldLayer } from '@/components/seasons/SeasonalWorldLayer';
import { RuntimeVisualDriver } from '@/components/runtime/RuntimeVisualDriver';
import { LivingWorldOverlay } from '@/components/runtime/LivingWorldOverlay';
import { WorldCopy } from '@/components/studio/WorldCopy';

const runtime = bootRuntime(worldDefaults.schmackin);

type FlavorFrequency = { name: string; meaning: string; color: string; description: string; reaction: string };

const frequencies: FlavorFrequency[] = [
  { name: 'Schmakinn', meaning: 'Frequency Found', color: 'Purple Crystal', description: 'Elite dishes. Top tier only.', reaction: 'The district glows, steam dances, and the restaurant enters the Hall of Harmony.' },
  { name: 'Crackin', meaning: 'Hidden Gem', color: 'Electric Gold', description: 'Solid eats. Really hittin.', reaction: 'The sign sparks gold, the crowd gets louder, and the table says run it back.' },
  { name: 'Lackin', meaning: 'Potential Lost', color: 'Molten Orange', description: 'Mid. Could be better.', reaction: 'The lights get uneven, steam fades, and the flavor signal starts slipping.' },
  { name: 'Bunz', meaning: 'Frequency Collapsed', color: 'Broken Charcoal', description: 'Not it. Save your money.', reaction: 'The menu glitches, smoke replaces steam, and the restaurant frequency collapses.' },
];

const rooms = [
  { href: '/worlds/schmackinn/reviews', icon: '🎥', label: 'Review Theater', description: 'Enter each review like a scene and watch the final verdict reshape the room.' },
  { href: '/worlds/schmackinn/map', icon: '🗺️', label: 'Flavor City', description: 'Explore interactive storefronts by city, district, category, verdict, and community heat.' },
  { href: '/worlds/schmackinn/flavor-lab', icon: '🧬', label: 'Flavor Lab', description: 'Change what matters to you and reveal the fingerprint behind every plate.' },
  { href: '/worlds/schmackinn/memories', icon: '🍽️', label: 'Food Memories', description: 'Archive the meals, people, jokes, cities, and moments that stayed with you.' },
  { href: '/worlds/schmackinn/callouts', icon: '📣', label: 'Callout Board', description: 'Profile users recommend district spots, build heat, and earn Flavor Scout credibility.' },
  { href: '/studio/schmackinn', icon: '⚙️', label: 'Creator Automation', description: 'One review prepares its restaurant, storefront, memory, Flavor DNA, and community record.' },
];

const flavorProfile = [
  { label: 'Flavor', value: 93 },
  { label: 'Comfort', value: 88 },
  { label: 'Culture', value: 100 },
  { label: 'Value', value: 84 },
  { label: 'Comedy', value: 91 },
  { label: 'Heat', value: 61 },
];

const districts = ['Soul Food Street', 'Asian Alley', 'Dessert District', 'Breakfast Block', 'Luxury Row', 'Food Trucks'];
const directorArc = ['Walk In: Curiosity', 'Order Arrives: Hope', 'First Bite: Judgment', 'Table Reaction: Comedy', 'Verdict: Frequency Reveal'];

export function SchmackinnWorldExperience() {
  const state = runtime.state;

  return (
    <main className="schmackinn-world world-customizable relative isolate min-h-screen overflow-hidden pb-28">
      <SeasonalWorldLayer world="schmackin" />
      <RuntimeVisualDriver world="schmackin" />
      <LivingWorldOverlay world="schmackin" />
      <div className="schmackinn-aurora absolute inset-0 -z-30" />
      <div className="restaurant-rain absolute inset-0 -z-20 opacity-50" />
      <div className="steam-cloud steam-one" />
      <div className="steam-cloud steam-two" />
      <div className="frequency-scan" />

      <section className="harmonic-container py-8 sm:py-12">
        <nav className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <Link href="/" className="rounded-full border border-white/15 bg-white/[.05] px-4 py-3 text-sm font-black text-white/70 transition hover:bg-white/15">← Harmonic OS</Link>
          <div className="flex flex-wrap gap-2">
            <Link href="/worlds/schmackinn/map" className="world-primary-action rounded-full px-4 py-3 text-sm font-black transition">Flavor City</Link>
            <Link href="/worlds/schmackinn/callouts" className="world-secondary-action rounded-full border px-4 py-3 text-sm font-black">📣 Callouts</Link>
            <Link href="/studio/schmackinn" className="rounded-full border border-white/10 bg-white/[.04] px-4 py-3 text-sm font-black text-white/70">Creator Studio</Link>
          </div>
        </nav>

        <div className="grid gap-8 lg:grid-cols-[1.05fr_.95fr] lg:items-center">
          <div className="glass-panel schmackinn-panel rounded-[2.5rem] p-6 sm:p-10">
            <p className="world-accent-text text-xs font-black uppercase tracking-[.42em]"><WorldCopy world="schmackinn" field="eyebrow" fallback="Flavor District" /></p>
            <h1 className="mt-5 text-5xl font-black leading-none tracking-[-.09em] sm:text-7xl lg:text-8xl"><WorldCopy world="schmackinn" field="title" fallback="What does life taste like?" /></h1>
            <p className="mt-6 max-w-2xl text-xl font-black leading-tight tracking-[-.04em] sm:text-3xl"><WorldCopy world="schmackinn" field="subtitle" fallback="Schmackinn is a living food city where every review becomes a storefront, a frequency, a memory, and a community event." /></p>
            <p className="world-muted-text mt-6 max-w-2xl text-base leading-8 sm:text-lg">Explore real districts, enter living restaurants, experience the first bite, call out the next spot, and preserve every meal that meant something.</p>
            <div className="mt-8 grid gap-3 sm:grid-cols-3"><Metric label="Food DNA" value={state.dna.food} /><Metric label="Community" value={state.dna.community} /><Metric label="Culture" value={state.dna.emotion} /></div>
          </div>

          <aside className="living-sign world-glow rounded-[2.5rem] border border-purple-200/15 bg-black/55 p-6 backdrop-blur-2xl sm:p-8">
            <div className="mb-6 flex items-center justify-between"><p className="text-xs font-black uppercase tracking-[.34em] text-white/40">Neon Verdict</p><span className="rounded-full border border-purple-200/20 px-3 py-1 font-mono text-xs text-purple-100/60">LIVING</span></div>
            <div className="logo-verdict-grid rounded-[2rem] border border-purple-200/10 bg-[radial-gradient(circle,rgba(183,108,255,.22),rgba(0,0,0,.38)_62%)] p-5"><div className="harmonic-food-logo mx-auto grid h-44 w-44 place-items-center rounded-[3rem] border border-purple-200/20 bg-black/35 text-7xl font-black text-purple-200 sm:h-56 sm:w-56">⧖</div><p className="mt-5 text-center text-3xl font-black tracking-[-.06em] text-purple-100">Schmakinn</p><p className="mt-2 text-center text-sm leading-6 text-white/55">The city responds to your verdict, but your voice always remains final.</p></div>
          </aside>
        </div>
      </section>

      <section className="harmonic-container py-8"><div className="mb-5"><p className="text-xs font-black uppercase tracking-[.34em] text-white/40">World Systems</p><h2 className="mt-3 text-3xl font-black tracking-[-.06em] sm:text-5xl"><WorldCopy world="schmackinn" field="systemsTitle" fallback="The complete food universe." /></h2></div><div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{rooms.map((room) => <Link key={room.href} href={room.href} className="group rounded-[2rem] border border-white/10 bg-black/35 p-5 backdrop-blur-xl transition hover:-translate-y-2 hover:border-purple-200/30 hover:bg-purple-300/[.06]"><span className="text-4xl">{room.icon}</span><h3 className="mt-5 text-2xl font-black tracking-[-.05em]">{room.label}</h3><p className="mt-3 text-sm leading-6 text-white/50">{room.description}</p><p className="world-primary-text mt-5 text-sm font-black">Enter System →</p></Link>)}</div></section>

      <section className="harmonic-container py-8"><div className="mb-5"><p className="text-xs font-black uppercase tracking-[.34em] text-white/40">Flavor Frequencies</p><h2 className="mt-3 text-3xl font-black tracking-[-.06em] sm:text-5xl">Your tier list is the law</h2></div><div className="grid gap-4 lg:grid-cols-4">{frequencies.map((frequency) => <Link href="/worlds/schmackinn/reviews" key={frequency.name} className={`flavor-frequency flavor-${frequency.name.toLowerCase()} rounded-[2rem] border border-white/10 bg-black/35 p-5 backdrop-blur-xl transition hover:-translate-y-1 hover:border-purple-200/25`}><p className="text-xs font-black uppercase tracking-[.24em] text-white/35">{frequency.color}</p><h3 className="mt-4 text-3xl font-black tracking-[-.06em]">{frequency.name}</h3><p className="mt-2 text-sm font-black text-white/60">{frequency.meaning}</p><p className="mt-4 text-sm leading-7 text-white/55">{frequency.description}</p><p className="mt-5 rounded-2xl border border-white/10 bg-white/[.045] p-4 text-xs leading-6 text-white/52">{frequency.reaction}</p></Link>)}</div></section>

      <section className="harmonic-container py-8"><div className="grid gap-5 lg:grid-cols-[.95fr_1.05fr]"><Link href="/worlds/schmackinn/flavor-lab" className="glass-panel rounded-[2rem] p-6 transition hover:-translate-y-1 hover:border-purple-200/25"><p className="text-xs font-black uppercase tracking-[.32em] text-white/40">Flavor Engine</p><h2 className="mt-4 text-3xl font-black tracking-[-.05em]">Metrics describe the experience, not your verdict.</h2><div className="mt-5 grid gap-3 sm:grid-cols-2">{flavorProfile.map((item) => <div key={item.label} className="rounded-2xl border border-white/10 bg-black/25 p-4"><div className="mb-2 flex justify-between text-xs font-black uppercase tracking-[.18em] text-white/45"><span>{item.label}</span><span>{item.value}%</span></div><div className="h-2 overflow-hidden rounded-full bg-white/10"><div className="h-full rounded-full world-primary-action" style={{ width: `${item.value}%` }} /></div></div>)}</div></Link><div className="glass-panel rounded-[2rem] p-6"><p className="text-xs font-black uppercase tracking-[.32em] text-white/40">Schmackinn Districts</p><h2 className="mt-4 text-3xl font-black tracking-[-.05em]">Explore the city by appetite.</h2><div className="mt-5 grid gap-3 sm:grid-cols-3">{districts.map((district, index) => <Link href="/worlds/schmackinn/map" key={district} className="district-card rounded-2xl border border-white/10 bg-black/25 p-4 transition hover:border-purple-200/25 hover:bg-purple-300/10"><p className="font-mono text-xs text-purple-100/50">0{index + 1}</p><p className="mt-3 text-sm font-bold leading-6 text-white/72">{district}</p></Link>)}</div></div></div></section>

      <section className="harmonic-container py-8"><div className="grid gap-5 lg:grid-cols-[.85fr_1.15fr]"><div className="glass-panel rounded-[2rem] p-6"><p className="text-xs font-black uppercase tracking-[.32em] text-white/40">Assistant, not judge</p><h2 className="mt-4 text-3xl font-black tracking-[-.05em]">You score the food. The OS directs the world.</h2><p className="mt-4 text-sm leading-7 text-white/62">Upload analysis can suggest emotional arcs, pacing, comedy peaks, atmosphere, district placement, and Flavor DNA. It never overrides your Schmakinn, Crackin, Lackin, or Bunz verdict.</p></div><div className="glass-panel rounded-[2rem] p-6"><p className="text-xs font-black uppercase tracking-[.32em] text-white/40">First-Bite Director Arc</p><div className="mt-5 grid gap-3 sm:grid-cols-5">{directorArc.map((beat, index) => <div key={beat} className="rounded-2xl border border-white/10 bg-black/25 p-4"><p className="font-mono text-xs text-purple-100">0{index + 1}</p><p className="mt-3 text-sm font-bold leading-6 text-white/72">{beat}</p></div>)}</div></div></div></section>

      <section className="harmonic-container py-8"><HarmonicEnginePreview state={state} /></section>
    </main>
  );
}

function Metric({ label, value }: { label: string; value: number }) {
  return <div className="rounded-2xl border border-white/10 bg-white/[.04] p-4"><p className="text-xs font-black uppercase tracking-[.2em] text-white/35">{label}</p><p className="mt-2 text-3xl font-black tracking-[-.05em]">{value}%</p></div>;
}
