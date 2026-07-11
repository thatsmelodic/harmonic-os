'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';
import { useAtmosphere } from '@/components/atmosphere/AtmosphereProvider';
import { resolveAtmosphere, type AtmosphereWorldId, type ParticlePreset } from '@/lib/harmonic-atmosphere';

const worlds: Array<{ id: AtmosphereWorldId; label: string; signal: string }> = [
  { id: 'home', label: 'Homepage', signal: 'Universal signal' },
  { id: 'melodic', label: 'Melodic', signal: 'Notes, lyrics and memory' },
  { id: 'fried-em', label: 'Fried Em', signal: 'Heat, smoke and court energy' },
  { id: 'schmackinn', label: 'Schmackinn', signal: 'Steam, herbs and flavor' },
  { id: 'two-harmonic', label: '2 Harmonic', signal: 'Thread, fabric and identity' },
];

const particles: ParticlePreset[] = ['adaptive', 'notes', 'leaves', 'snow', 'sparks', 'lettuce', 'thread', 'petals', 'custom'];

export default function AtmosphereStudioPage() {
  const { state, updateGlobal, updateWorld, setWorldMode, applyGlobalToAll, resetAtmosphere } = useAtmosphere();
  const [activeWorld, setActiveWorld] = useState<AtmosphereWorldId>('home');
  const entry = state.worlds[activeWorld];
  const settings = useMemo(() => resolveAtmosphere(state, activeWorld), [state, activeWorld]);
  const patch = entry.useGlobal ? updateGlobal : (value: Parameters<typeof updateWorld>[1]) => updateWorld(activeWorld, value);

  return (
    <main className="relative min-h-screen px-4 py-8 pb-32 text-white sm:px-6">
      <div className="mx-auto max-w-7xl">
        <nav className="mb-7 flex flex-wrap items-center justify-between gap-3">
          <Link href="/studio" className="rounded-full border border-white/10 bg-black/35 px-4 py-3 text-sm font-black text-white/70">← Creator Studio</Link>
          <div className="flex flex-wrap gap-2"><button onClick={applyGlobalToAll} className="rounded-full bg-purple-300 px-4 py-3 text-sm font-black text-black">Apply Global to All</button><button onClick={resetAtmosphere} className="rounded-full border border-white/10 bg-black/35 px-4 py-3 text-sm font-black text-white/60">Reset</button></div>
        </nav>

        <header className="rounded-[2.6rem] border border-purple-200/15 bg-black/50 p-7 shadow-[0_0_90px_rgba(150,90,255,.18)] backdrop-blur-2xl sm:p-10">
          <p className="text-xs font-black uppercase tracking-[.36em] text-purple-100/45">Harmonic Atmosphere Studio</p>
          <h1 className="mt-4 text-5xl font-black tracking-[-.08em] sm:text-8xl">One climate. Every world speaks it differently.</h1>
          <p className="mt-5 max-w-3xl text-base leading-8 text-white/55">Set the global season once, then let each universe translate it through its own visual language—or break away with a world override.</p>
        </header>

        <section className="mt-6 grid gap-5 lg:grid-cols-[.72fr_1.28fr]">
          <aside className="rounded-[2.2rem] border border-white/10 bg-black/45 p-5 backdrop-blur-2xl">
            <p className="text-xs font-black uppercase tracking-[.25em] text-white/35">Atmosphere Channels</p>
            <div className="mt-4 grid gap-3">{worlds.map((world) => <button key={world.id} onClick={() => setActiveWorld(world.id)} className={`rounded-[1.5rem] border p-4 text-left transition ${activeWorld === world.id ? 'border-purple-200/35 bg-purple-300/12' : 'border-white/10 bg-white/[.025]'}`}><p className="font-black">{world.label}</p><p className="mt-1 text-xs text-white/40">{world.signal}</p></button>)}</div>
          </aside>

          <div className="rounded-[2.2rem] border border-white/10 bg-black/45 p-5 backdrop-blur-2xl sm:p-7">
            <div className="flex flex-wrap items-center justify-between gap-4"><div><p className="text-xs font-black uppercase tracking-[.25em] text-purple-100/45">Active Channel</p><h2 className="mt-2 text-4xl font-black tracking-[-.06em]">{worlds.find((world) => world.id === activeWorld)?.label}</h2></div><label className="flex items-center gap-3 rounded-full border border-white/10 bg-white/[.04] px-4 py-3 text-sm font-black"><input type="checkbox" checked={entry.useGlobal} onChange={(event) => setWorldMode(activeWorld, event.target.checked)} /> Use Global Settings</label></div>

            <div className="mt-7 grid gap-4 sm:grid-cols-2">
              <Select label="Season" value={settings.season} options={['spring','summer','autumn','winter']} onChange={(value) => patch({ season: value as typeof settings.season })} />
              <Select label="Time of Day" value={settings.time} options={['dawn','day','sunset','night']} onChange={(value) => patch({ time: value as typeof settings.time })} />
              <Select label="Weather" value={settings.weather} options={['clear','rain','snow','mist','wind']} onChange={(value) => patch({ weather: value as typeof settings.weather })} />
              <Select label="Particle Language" value={settings.particlePreset} options={particles} onChange={(value) => patch({ particlePreset: value as ParticlePreset })} />
              <Range label="Particle Size" value={settings.particleSize} onChange={(value) => patch({ particleSize: value })} />
              <Range label="Particle Amount" value={settings.particleAmount} onChange={(value) => patch({ particleAmount: value })} />
              <Range label="Particle Speed" value={settings.particleSpeed} onChange={(value) => patch({ particleSpeed: value })} />
              <Range label="Glow" value={settings.glow} onChange={(value) => patch({ glow: value })} />
              <Range label="Background Blur" value={settings.blur} onChange={(value) => patch({ blur: value })} />
              <label className="rounded-2xl border border-white/10 bg-white/[.03] p-4"><span className="text-xs font-black uppercase tracking-[.18em] text-white/40">Audio Reactive</span><div className="mt-4"><input type="checkbox" checked={settings.audioReactive} onChange={(event) => patch({ audioReactive: event.target.checked })} /> <span className="ml-2 text-sm text-white/60">Pulse with active music</span></div></label>
            </div>

            <div className="mt-4 grid gap-4 sm:grid-cols-2"><TextField label="Background image / video URL" value={settings.backgroundUrl} onChange={(value) => patch({ backgroundUrl: value })} /><TextField label="Custom particle image URL" value={settings.customParticleUrl} onChange={(value) => patch({ customParticleUrl: value, particlePreset: 'custom' })} /></div>
          </div>
        </section>
      </div>
    </main>
  );
}

function Select({ label, value, options, onChange }: { label: string; value: string; options: readonly string[]; onChange: (value: string) => void }) { return <label className="rounded-2xl border border-white/10 bg-white/[.03] p-4"><span className="text-xs font-black uppercase tracking-[.18em] text-white/40">{label}</span><select value={value} onChange={(event) => onChange(event.target.value)} className="mt-3 w-full rounded-xl border border-white/10 bg-black/55 p-3 font-black text-white">{options.map((option) => <option key={option} value={option}>{option}</option>)}</select></label>; }
function Range({ label, value, onChange }: { label: string; value: number; onChange: (value: number) => void }) { return <label className="rounded-2xl border border-white/10 bg-white/[.03] p-4"><span className="flex justify-between text-xs font-black uppercase tracking-[.18em] text-white/40"><span>{label}</span><span>{value}%</span></span><input type="range" min="0" max="100" value={value} onChange={(event) => onChange(Number(event.target.value))} className="mt-4 w-full" /></label>; }
function TextField({ label, value, onChange }: { label: string; value: string; onChange: (value: string) => void }) { return <label className="rounded-2xl border border-white/10 bg-white/[.03] p-4"><span className="text-xs font-black uppercase tracking-[.18em] text-white/40">{label}</span><input value={value} onChange={(event) => onChange(event.target.value)} placeholder="https://..." className="mt-3 w-full rounded-xl border border-white/10 bg-black/55 p-3 text-sm text-white" /></label>; }
