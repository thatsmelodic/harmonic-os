'use client';

import { useMemo, useState } from 'react';
import {
  type HarmonicWorldId,
  type EmotionKey,
  type HarmonicEngineState,
  mergeEngineState,
  translateVibeToEngine,
  worldDefaults,
} from '@/lib/harmonic-engine';
import { HarmonicEnginePreview } from '@/components/engine/HarmonicEnginePreview';

const worlds: HarmonicWorldId[] = ['melodic', 'harmonic', 'fried-em', 'schmackin'];
const emotions: EmotionKey[] = ['hope', 'pain', 'luxury', 'victory', 'chaos', 'peace', 'reflection', 'pressure', 'healing', 'freedom'];

export function HarmonicEngineBuilder() {
  const [world, setWorld] = useState<HarmonicWorldId>('melodic');
  const [prompt, setPrompt] = useState('make it feel like surviving your worst year and turning it into purple light');
  const [state, setState] = useState<HarmonicEngineState>(worldDefaults.melodic);

  const worldOptions = useMemo(() => worlds.map((item) => ({ value: item, label: item.replace('-', ' ') })), []);

  function changeWorld(nextWorld: HarmonicWorldId) {
    setWorld(nextWorld);
    setState(worldDefaults[nextWorld]);
  }

  function updateState(patch: Partial<HarmonicEngineState>) {
    setState((current) => mergeEngineState(current.world, { ...current, ...patch }));
  }

  function conductPrompt() {
    setState(translateVibeToEngine(world, prompt));
  }

  return (
    <section className="harmonic-container py-8">
      <div className="mb-6 rounded-[2.5rem] border border-white/10 bg-[linear-gradient(135deg,rgba(183,108,255,.18),rgba(54,178,203,.06),rgba(255,255,255,.035))] p-6 shadow-purple-glow backdrop-blur-2xl">
        <p className="text-xs font-black uppercase tracking-[.36em] text-purple-100/45">Harmonic Engine</p>
        <h1 className="mt-3 text-4xl font-black tracking-[-.08em] sm:text-6xl">One mind. Four worlds.</h1>
        <p className="mt-4 max-w-4xl text-sm leading-7 text-purple-100/62 sm:text-base">
          This is the shared control brain for Harmonic OS. Every world uses the same engine controls, but each world expresses them through its own Frequency DNA.
        </p>
      </div>

      <div className="grid gap-5 xl:grid-cols-[.9fr_1.1fr]">
        <div className="grid gap-5">
          <article className="rounded-[2rem] border border-white/10 bg-black/35 p-5 backdrop-blur-2xl">
            <p className="text-xs font-black uppercase tracking-[.28em] text-white/40">AI Director Prototype</p>
            <h2 className="mt-3 text-3xl font-black tracking-[-.05em]">Describe the atmosphere.</h2>
            <textarea
              value={prompt}
              onChange={(event) => setPrompt(event.target.value)}
              rows={5}
              className="mt-4 w-full rounded-2xl border border-white/10 bg-black/40 px-4 py-4 text-purple-50 outline-none focus:border-purple-300"
              placeholder="Tell Harmonic OS the feeling..."
            />
            <button type="button" onClick={conductPrompt} className="mt-4 rounded-full bg-purple-300 px-6 py-4 font-black text-black shadow-purple-glow">
              Conduct Engine
            </button>
          </article>

          <article className="rounded-[2rem] border border-white/10 bg-black/35 p-5 backdrop-blur-2xl">
            <p className="text-xs font-black uppercase tracking-[.28em] text-white/40">World Selector</p>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {worldOptions.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => changeWorld(option.value)}
                  className="rounded-2xl border px-4 py-4 text-left font-black capitalize transition hover:-translate-y-1"
                  style={{
                    borderColor: state.world === option.value ? 'rgba(216,180,254,.65)' : 'rgba(255,255,255,.10)',
                    background: state.world === option.value ? 'rgba(183,108,255,.15)' : 'rgba(255,255,255,.04)',
                  }}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </article>

          <article className="rounded-[2rem] border border-white/10 bg-black/35 p-5 backdrop-blur-2xl">
            <p className="text-xs font-black uppercase tracking-[.28em] text-white/40">Emotional Engine</p>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {emotions.map((emotion) => (
                <button
                  key={emotion}
                  type="button"
                  onClick={() => updateState({ emotion })}
                  className="rounded-2xl border border-white/10 bg-white/[.045] px-4 py-3 text-left text-sm font-black capitalize text-white/70 transition hover:bg-white/[.08]"
                >
                  {emotion}
                </button>
              ))}
            </div>
          </article>

          <article className="rounded-[2rem] border border-white/10 bg-black/35 p-5 backdrop-blur-2xl">
            <p className="text-xs font-black uppercase tracking-[.28em] text-white/40">Manual Core Controls</p>
            <div className="mt-4 grid gap-4">
              <RangeControl label="Aura" value={state.aura} onChange={(value) => updateState({ aura: value })} />
              <RangeControl label="Fog" value={state.fog} onChange={(value) => updateState({ fog: value })} />
              <RangeControl label="Bloom" value={state.bloom} onChange={(value) => updateState({ bloom: value })} />
              <RangeControl label="Particle Density" value={state.particleDensity} onChange={(value) => updateState({ particleDensity: value })} />
              <RangeControl label="Motion Intensity" value={state.motionIntensity} onChange={(value) => updateState({ motionIntensity: value })} />
              <RangeControl label="Crystal Heart" value={state.crystalHeartIntensity} onChange={(value) => updateState({ crystalHeartIntensity: value })} />
            </div>
          </article>
        </div>

        <HarmonicEnginePreview state={state} />
      </div>
    </section>
  );
}

function RangeControl(props: { label: string; value: number; onChange: (value: number) => void }) {
  return (
    <label className="grid gap-2 text-sm font-bold text-purple-100/70">
      <span className="flex justify-between"><span>{props.label}</span><span>{props.value}%</span></span>
      <input type="range" min="0" max="100" value={props.value} onChange={(event) => props.onChange(Number(event.target.value))} />
    </label>
  );
}
