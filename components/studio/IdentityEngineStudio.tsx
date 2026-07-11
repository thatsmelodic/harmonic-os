'use client';

import { useState } from 'react';
import { FrequencyMark } from '@/components/identity/FrequencyMark';
import { useIdentity } from '@/components/identity/IdentityProvider';
import { identityRegistry, type IdentityWorld, type MarkMotion, type MetallicFinish } from '@/lib/harmonic-identity';

const worlds = Object.keys(identityRegistry) as IdentityWorld[];
const motions: MarkMotion[] = ['float', 'pulse', 'orbit', 'drift', 'still'];
const finishes: MetallicFinish[] = ['none', 'gold', 'silver', 'pearl', 'chrome'];

export function IdentityEngineStudio() {
  const { identity, overrides, activeCollection, setActiveCollection, setWorldOverride, resetWorldIdentity } = useIdentity();
  const [world, setWorld] = useState<IdentityWorld>('two-harmonic');
  const base = identityRegistry[world];
  const current = { ...base, ...overrides[world], mark: { ...base.mark, ...(overrides[world].mark ?? {}) } };

  return (
    <div className="mx-auto max-w-7xl pb-28 text-white">
      <header className="rounded-[2.7rem] border border-white/10 bg-black/45 p-7 backdrop-blur-2xl sm:p-10">
        <p className="text-xs font-black uppercase tracking-[.34em] text-white/35">Harmonic Identity Engine</p>
        <h1 className="mt-4 text-5xl font-black tracking-[-.08em] sm:text-8xl">Every world wears its frequency.</h1>
        <p className="mt-5 max-w-3xl text-base leading-8 text-white/52">Frequency Marks, collection overrides, glow, motion, metallic finishes, particles, typography, and lighting live in one dedicated identity department.</p>
      </header>

      <div className="mt-6 grid gap-5 lg:grid-cols-[280px_1fr]">
        <aside className="h-fit rounded-[2rem] border border-white/10 bg-black/45 p-4 lg:sticky lg:top-5">
          <p className="px-2 text-xs font-black uppercase tracking-[.22em] text-white/35">World Identity</p>
          <div className="mt-3 grid gap-2">{worlds.map((item) => <button key={item} onClick={() => setWorld(item)} className={`rounded-2xl border p-4 text-left ${world === item ? 'border-white/25 bg-white/10' : 'border-white/8 bg-white/[.025]'}`}><p className="font-black">{identityRegistry[item].name}</p><p className="mt-1 text-xs text-white/35">{identityRegistry[item].mark.label}</p></button>)}</div>
        </aside>

        <main className="grid gap-5">
          <section className="identity-surface rounded-[2.5rem] border p-6 sm:p-8">
            <div className="grid gap-6 lg:grid-cols-[.7fr_1.3fr] lg:items-center">
              <div className="grid place-items-center rounded-[2rem] border border-white/10 bg-black/25 p-8"><FrequencyMark showLabel /></div>
              <div><p className="text-xs font-black uppercase tracking-[.24em] text-white/35">Editing {base.name}</p><h2 className="identity-heading mt-3 text-4xl">Frequency Mark</h2><div className="mt-5 grid gap-4 sm:grid-cols-2"><Field label="Logo / Mark URL" value={current.mark.imageUrl ?? ''} onChange={(value) => setWorldOverride(world, { mark: { imageUrl: value } })} /><Field label="Fallback Symbol" value={current.mark.symbol} onChange={(value) => setWorldOverride(world, { mark: { symbol: value } })} /><Select label="Motion" value={current.mark.motion} options={motions} onChange={(value) => setWorldOverride(world, { mark: { motion: value as MarkMotion } })} /><Select label="Metallic Finish" value={current.mark.metallic} options={finishes} onChange={(value) => setWorldOverride(world, { mark: { metallic: value as MetallicFinish } })} /><Color label="Mark Glow" value={current.mark.glow} onChange={(value) => setWorldOverride(world, { mark: { glow: value } })} /><label className="rounded-2xl border border-white/10 bg-white/[.025] p-4"><span className="text-xs font-black uppercase tracking-[.16em] text-white/35">Mark Scale</span><input type="range" min="0.7" max="1.7" step="0.05" value={current.mark.scale} onChange={(event) => setWorldOverride(world, { mark: { scale: Number(event.target.value) } })} className="mt-5 w-full" /><p className="mt-2 text-sm text-white/45">{current.mark.scale.toFixed(2)}×</p></label></div></div>
            </div>
          </section>

          <section className="rounded-[2.5rem] border border-white/10 bg-black/45 p-6 sm:p-8">
            <p className="text-xs font-black uppercase tracking-[.24em] text-white/35">World Signature</p>
            <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4"><Color label="Primary" value={current.primary} onChange={(value) => setWorldOverride(world, { primary: value })} /><Color label="Secondary" value={current.secondary} onChange={(value) => setWorldOverride(world, { secondary: value })} /><Color label="Accent" value={current.accent} onChange={(value) => setWorldOverride(world, { accent: value })} /><Color label="Ambient Light" value={current.ambient} onChange={(value) => setWorldOverride(world, { ambient: value })} /></div>
          </section>

          {world === 'two-harmonic' && <section className="rounded-[2.5rem] border border-amber-200/15 bg-amber-300/[.05] p-6 sm:p-8"><p className="text-xs font-black uppercase tracking-[.24em] text-amber-100/45">Collection Override</p><h2 className="mt-3 text-3xl font-black">Beige Frequency</h2><p className="mt-3 max-w-2xl text-sm leading-7 text-white/45">Activate the beige logo, champagne glow, luxury typography, thread, linen fibers, music notes, and collection lighting as one synchronized identity.</p><div className="mt-5 flex flex-wrap gap-3"><button onClick={() => setActiveCollection(activeCollection === 'beige-frequency' ? undefined : 'beige-frequency')} className="rounded-full bg-amber-100 px-5 py-4 text-sm font-black text-black">{activeCollection === 'beige-frequency' ? 'Disable Beige Override' : 'Activate Beige Frequency'}</button><button onClick={() => resetWorldIdentity(world)} className="rounded-full border border-white/10 bg-white/[.04] px-5 py-4 text-sm font-black">Reset World Identity</button></div></section>}
        </main>
      </div>
    </div>
  );
}

function Field({ label, value, onChange }: { label: string; value: string; onChange: (value: string) => void }) { return <label className="rounded-2xl border border-white/10 bg-white/[.025] p-4"><span className="text-xs font-black uppercase tracking-[.16em] text-white/35">{label}</span><input value={value} onChange={(event) => onChange(event.target.value)} className="mt-3 w-full rounded-xl border border-white/10 bg-black/35 px-4 py-3 text-white outline-none" /></label>; }
function Color({ label, value, onChange }: { label: string; value: string; onChange: (value: string) => void }) { return <label className="rounded-2xl border border-white/10 bg-white/[.025] p-4"><span className="text-xs font-black uppercase tracking-[.16em] text-white/35">{label}</span><div className="mt-3 flex gap-3"><input type="color" value={value} onChange={(event) => onChange(event.target.value)} className="h-12 w-14 bg-transparent" /><input value={value} onChange={(event) => onChange(event.target.value)} className="min-w-0 flex-1 rounded-xl border border-white/10 bg-black/35 px-3 font-mono text-sm" /></div></label>; }
function Select({ label, value, options, onChange }: { label: string; value: string; options: string[]; onChange: (value: string) => void }) { return <label className="rounded-2xl border border-white/10 bg-white/[.025] p-4"><span className="text-xs font-black uppercase tracking-[.16em] text-white/35">{label}</span><select value={value} onChange={(event) => onChange(event.target.value)} className="mt-3 w-full rounded-xl border border-white/10 bg-black px-4 py-3 text-white">{options.map((item) => <option key={item}>{item}</option>)}</select></label>; }
