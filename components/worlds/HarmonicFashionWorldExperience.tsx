import Link from 'next/link';
import { bootRuntime } from '@/lib/harmonic-signal-bus';
import { worldDefaults } from '@/lib/harmonic-engine';
import { HarmonicEnginePreview } from '@/components/engine/HarmonicEnginePreview';
import { SeasonalWorldLayer } from '@/components/seasons/SeasonalWorldLayer';
import { RuntimeVisualDriver } from '@/components/runtime/RuntimeVisualDriver';
import { LivingWorldOverlay } from '@/components/runtime/LivingWorldOverlay';

const drops = [
  { title: 'Acid Wash Base Tee', status: 'Foundation Drop', detail: 'Front mark, back connection marks, sleeve loop language.' },
  { title: 'Pink Zip-Up Hoodie', status: 'Sample Vision', detail: 'Soft frequency, custom zipper pull, stitched identity.' },
  { title: 'Gray Zip-Up Hoodie', status: 'Sample Vision', detail: 'Neutral canvas, teal accents, everyday balance.' },
  { title: 'Melody Collection', status: 'Future Archive', detail: 'Quote-led garments where each piece carries a life frequency.' },
];

const process = ['Mood Board', 'Palette', 'Sample', 'Shoot', 'Drop', 'Archive'];
const runtime = bootRuntime(worldDefaults.harmonic);

export function HarmonicFashionWorldExperience() {
  const state = runtime.state;

  return (
    <main className="harmonic-fashion-world relative isolate min-h-screen overflow-hidden pb-28">
      <SeasonalWorldLayer world="harmonic" />
      <RuntimeVisualDriver world="harmonic" />
      <LivingWorldOverlay world="harmonic" />
      <div className="harmonic-fashion-aurora absolute inset-0 -z-30" />
      <div className="frequency-grid absolute inset-0 -z-20 opacity-40" />
      <div className="fashion-thread fashion-thread-one" />
      <div className="fashion-thread fashion-thread-two" />
      <div className="frequency-scan" />

      <section className="harmonic-container py-8 sm:py-12">
        <nav className="mb-8 flex items-center justify-between gap-4">
          <Link href="/" className="rounded-full border border-white/15 bg-white/[.05] px-4 py-3 text-sm font-black text-white/70 transition hover:bg-white/15">← Harmonic OS</Link>
          <p className="hidden font-mono text-xs uppercase tracking-[.32em] text-white/40 sm:block">22.2 FM / HARMONIC</p>
        </nav>

        <div className="grid gap-8 lg:grid-cols-[1.05fr_.95fr] lg:items-center">
          <div className="glass-panel rounded-[2.5rem] p-6 sm:p-10">
            <p className="text-xs font-black uppercase tracking-[.42em] text-[#f5dfb8]/55">Harmonic Frequency</p>
            <h1 className="mt-5 text-5xl font-black leading-none tracking-[-.09em] text-[#fff8ea] sm:text-7xl lg:text-8xl">Stitch the Signal.</h1>
            <p className="mt-6 max-w-2xl text-xl font-black leading-tight tracking-[-.04em] text-white/88 sm:text-3xl">Fashion is where the melody becomes physical — identity sewn into fabric, color, texture, and motion.</p>
            <p className="mt-6 max-w-2xl text-base leading-8 text-white/64 sm:text-lg">The Living World Engine now controls runway life, fabric behavior, lighting, camera pace, shopping energy, and cross-world drop ripples.</p>
            <div className="mt-8 grid gap-3 sm:grid-cols-3"><Metric label="Fashion DNA" value={state.dna.fashion} /><Metric label="Business" value={state.dna.business} /><Metric label="Spirit" value={state.dna.spirituality} /></div>
          </div>

          <aside className="glass-panel rounded-[2.5rem] p-6 sm:p-8">
            <div className="mb-6 flex items-center justify-between"><p className="text-xs font-black uppercase tracking-[.34em] text-white/40">Design Kernel</p><span className="rounded-full border border-[#f5dfb8]/20 px-3 py-1 font-mono text-xs text-[#f5dfb8]/60">LIVING</span></div>
            <div className="relative mx-auto grid aspect-square max-w-md place-items-center rounded-[3rem] border border-[#f5dfb8]/10 bg-[radial-gradient(circle,rgba(245,223,184,.18),rgba(54,178,203,.08)_45%,rgba(0,0,0,.28)_70%)]"><div className="fabric-card fabric-card-a" /><div className="fabric-card fabric-card-b" /><div className="relative rounded-[2.5rem] border border-white/15 bg-black/35 px-8 py-8 text-center backdrop-blur-xl"><p className="font-mono text-xs text-white/45">NOW TUNING</p><p className="mt-2 text-4xl font-black tracking-[-.07em] text-[#fff8ea]">Harmonic</p><p className="mt-2 font-mono text-xs text-[#f5dfb8]/55">{state.physics.replace('-', ' ')}</p></div></div>
          </aside>
        </div>
      </section>

      <section className="harmonic-container py-8"><div className="mb-5"><p className="text-xs font-black uppercase tracking-[.34em] text-white/40">Drop System</p><h2 className="mt-3 text-3xl font-black tracking-[-.06em] sm:text-5xl">Garments inside the archive</h2></div><div className="grid gap-4 lg:grid-cols-4">{drops.map((drop, index) => <article key={drop.title} className="harmonic-drop-card rounded-[2rem] border border-white/10 bg-white/[.05] p-5 backdrop-blur-xl"><p className="font-mono text-xs text-[#f5dfb8]/45">0{index + 1}</p><h3 className="mt-5 text-2xl font-black leading-none tracking-[-.05em]">{drop.title}</h3><p className="mt-3 text-sm font-black text-[#36b2cb]/75">{drop.status}</p><p className="mt-4 text-sm leading-7 text-white/55">{drop.detail}</p></article>)}</div></section>

      <section className="harmonic-container py-8"><div className="grid gap-5 lg:grid-cols-[.9fr_1.1fr]"><div className="glass-panel rounded-[2rem] p-6"><p className="text-xs font-black uppercase tracking-[.32em] text-white/40">2Harmonic Philosophy</p><h2 className="mt-4 text-3xl font-black tracking-[-.05em]">The garment is the body of the message.</h2><p className="mt-4 text-sm leading-7 text-white/62">Harmonic transforms the Melodic Bible into wearable form: balance, duality, stitched melodies, and the idea that every person carries a frequency worth expressing.</p></div><div className="glass-panel rounded-[2rem] p-6"><p className="text-xs font-black uppercase tracking-[.32em] text-white/40">Production Flow</p><div className="mt-5 grid gap-3 sm:grid-cols-6">{process.map((item, index) => <div key={item} className="rounded-2xl border border-white/10 bg-black/25 p-4"><p className="font-mono text-xs text-[#f5dfb8]">0{index + 1}</p><p className="mt-3 text-sm font-bold leading-6 text-white/72">{item}</p></div>)}</div></div></div></section>

      <section className="harmonic-container py-8"><HarmonicEnginePreview state={state} /></section>
    </main>
  );
}

function Metric({ label, value }: { label: string; value: number }) {
  return <div className="rounded-2xl border border-white/10 bg-white/[.04] p-4"><p className="text-xs font-black uppercase tracking-[.2em] text-white/35">{label}</p><p className="mt-2 text-3xl font-black tracking-[-.05em]">{value}%</p></div>;
}
