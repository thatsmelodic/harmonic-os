'use client';

import { useMemo, useState } from 'react';
import {
  mergeEngineState,
  translateVibeToEngine,
  type CreativeMode,
  type EmotionKey,
  type HarmonicEngineState,
  type HarmonicWorldId,
} from '@/lib/harmonic-engine';
import { HarmonicWorldShell } from '@/components/engine/HarmonicWorldShell';

const worlds: HarmonicWorldId[] = ['melodic', 'harmonic', 'fried-em', 'schmackin'];
const emotions: EmotionKey[] = ['hope', 'pain', 'luxury', 'victory', 'chaos', 'peace', 'reflection', 'pressure', 'healing', 'freedom'];
const creativeModes: CreativeMode[] = ['composer', 'designer', 'director', 'builder', 'business'];

export function HarmonicEngineBuilder() {
  const [world, setWorld] = useState<HarmonicWorldId>('melodic');
  const [prompt, setPrompt] = useState('make this feel like the calm after surviving your worst year');
  const [engineState, setEngineState] = useState<HarmonicEngineState>(() => mergeEngineState('melodic'));

  const dnaEntries = useMemo(() => Object.entries(engineState.dna), [engineState.dna]);

  function updateWorld(nextWorld: HarmonicWorldId) {
    setWorld(nextWorld);
    setEngineState(mergeEngineState(nextWorld, { creativeMode: engineState.creativeMode }));
  }

  function updateEngine<K extends keyof HarmonicEngineState>(key: K, value: HarmonicEngineState[K]) {
    setEngineState((current) => mergeEngineState(world, { ...current, [key]: value }));
  }

  function conductVibe() {
    setEngineState(translateVibeToEngine(world, prompt));
  }

  return (
    <section className="mt-6 rounded-[2.5rem] border border-white/10 bg-[linear-gradient(135deg,rgba(255,255,255,.10),rgba(255,255,255,.035))] p-5 shadow-purple-glow backdrop-blur-2xl sm:p-7">
      <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-xs font-black uppercase tracking-[.34em] text-purple-100/45">Harmonic Engine</p>
          <h2 className="mt-3 text-3xl font-black tracking-[-.06em] sm:text-5xl">Shared world builder brain</h2>
          <p className="mt-3 max-w-3xl text-sm leading-7 text-purple-100/62">
            These controls are the universal mind for every world. Same engine, different Frequency DNA, different harmony.
          </p>
        </div>
        <span className="rounded-full border border-white/10 px-4 py-2 font-mono text-xs text-white/50">ENGINE v0.1</span>
      </div>

      <div className="grid gap-5 xl:grid-cols-[.92fr_1.08fr]">
        <div className="grid gap-5">
          <article className="rounded-[2rem] border border-white/10 bg-black/30 p-5">
            <p className="text-xs font-black uppercase tracking-[.28em] text-white/40">AI Director Preview</p>
            <textarea
              value={prompt}
              onChange={(event) => setPrompt(event.target.value)}
              rows={4}
              className="mt-4 w-full rounded-2xl border border-white/10 bg-black/40 px-4 py-4 text-purple-50 outline-none focus:border-purple-300"
              placeholder="Tell the OS the feeling..."
            />
            <button type="button" onClick={conductVibe} className="mt-4 rounded-full bg-purple-300 px-6 py-4 font-black text-black shadow-purple-glow">
              Translate Vibe Into Engine
            </button>
          </article>

          <article className="rounded-[2rem] border border-white/10 bg-black/30 p-5">
            <p className="text-xs font-black uppercase tracking-[.28em] text-white/40">Core Controls</p>
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <SelectControl label="World" value={world} options={worlds} onChange={(value) => updateWorld(value as HarmonicWorldId)} />
              <SelectControl label="Creative Mode" value={engineState.creativeMode} options={creativeModes} onChange={(value) => updateEngine('creativeMode', value as CreativeMode)} />
              <SelectControl label="Emotion" value={engineState.emotion} options={emotions} onChange={(value) => updateEngine('emotion', value as EmotionKey)} />
              <SelectControl label="Camera" value={engineState.camera} options={['locked', 'float', 'slow-pan', 'orbit', 'dolly', 'shake', 'follow-cursor']} onChange={(value) => updateEngine('camera', value as any)} />
              <SelectControl label="Environment" value={engineState.environment} options={['nebula', 'studio', 'runway', 'arena', 'restaurant', 'rooftop', 'church', 'dreamscape']} onChange={(value) => updateEngine('environment', value as any)} />
              <SelectControl label="Lighting" value={engineState.lighting} options={['purple-neon', 'golden-hour', 'moonlight', 'candlelight', 'arena-glow', 'restaurant-warmth', 'cosmic', 'spotlight']} onChange={(value) => updateEngine('lighting', value as any)} />
              <SelectControl label="Physics" value={engineState.physics} options={['soft-float', 'fabric-drift', 'impact-snap', 'steam-rise', 'zero-gravity']} onChange={(value) => updateEngine('physics', value as any)} />
            </div>
          </article>

          <article className="rounded-[2rem] border border-white/10 bg-black/30 p-5">
            <p className="text-xs font-black uppercase tracking-[.28em] text-white/40">Fine Tuning</p>
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <RangeControl label="Aura" value={engineState.aura} onChange={(value) => updateEngine('aura', value)} />
              <RangeControl label="Fog" value={engineState.fog} onChange={(value) => updateEngine('fog', value)} />
              <RangeControl label="Bloom" value={engineState.bloom} onChange={(value) => updateEngine('bloom', value)} />
              <RangeControl label="Grain" value={engineState.grain} onChange={(value) => updateEngine('grain', value)} />
              <RangeControl label="Particles" value={engineState.particleDensity} onChange={(value) => updateEngine('particleDensity', value)} />
              <RangeControl label="Motion" value={engineState.motionIntensity} onChange={(value) => updateEngine('motionIntensity', value)} />
              <RangeControl label="Audio Reactivity" value={engineState.audioReactivity} onChange={(value) => updateEngine('audioReactivity', value)} />
              <RangeControl label="Crystal Heart" value={engineState.crystalHeartIntensity} onChange={(value) => updateEngine('crystalHeartIntensity', value)} />
              <RangeControl label="Cursor Magnetism" value={engineState.cursorMagnetism} onChange={(value) => updateEngine('cursorMagnetism', value)} />
              <RangeControl label="Section Depth" value={engineState.sectionDepth} onChange={(value) => updateEngine('sectionDepth', value)} />
            </div>
          </article>
        </div>

        <div className="grid gap-5">
          <HarmonicWorldShell world={world} state={engineState} className="min-h-[38rem] rounded-[2.5rem] border border-white/10">
            <div className="relative z-10 p-6 sm:p-8">
              <p className="text-xs font-black uppercase tracking-[.34em] text-white/45">Live Engine Preview</p>
              <h3 className="mt-4 text-5xl font-black capitalize tracking-[-.08em] sm:text-7xl">{world.replace('-', ' ')}</h3>
              <p className="mt-5 max-w-xl text-sm leading-7 text-white/62">
                {engineState.emotion} emotion · {engineState.environment} environment · {engineState.lighting} lighting · {engineState.physics} physics.
              </p>
              <div className="mt-7 grid gap-3 sm:grid-cols-2">
                {engineState.objects.map((object) => (
                  <div key={object} className="rounded-2xl border border-white/10 bg-black/30 p-4 text-sm font-bold text-white/62">{object}</div>
                ))}
              </div>
            </div>
          </HarmonicWorldShell>

          <article className="rounded-[2rem] border border-white/10 bg-black/30 p-5">
            <p className="text-xs font-black uppercase tracking-[.28em] text-white/40">Frequency DNA</p>
            <div className="mt-5 grid gap-3">
              {dnaEntries.map(([key, value]) => (
                <div key={key} className="grid gap-2">
                  <div className="flex items-center justify-between gap-3 text-xs font-bold uppercase tracking-[.2em] text-white/45">
                    <span>{key}</span>
                    <span>{value}%</span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-white/10">
                    <div className="h-full rounded-full bg-purple-300 shadow-[0_0_18px_rgba(216,180,254,.75)]" style={{ width: `${value}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}

function SelectControl(props: { label: string; value: string; options: string[]; onChange: (value: string) => void }) {
  return (
    <label className="grid gap-2 text-sm font-bold text-purple-100/70">
      {props.label}
      <select value={props.value} onChange={(event) => props.onChange(event.target.value)} className="rounded-2xl border border-white/10 bg-black/40 px-4 py-4 text-purple-50 outline-none focus:border-purple-300">
        {props.options.map((option) => <option key={option}>{option}</option>)}
      </select>
    </label>
  );
}

function RangeControl(props: { label: string; value: number; onChange: (value: number) => void }) {
  return (
    <label className="grid gap-2 text-sm font-bold text-purple-100/70">
      {props.label}: {props.value}%
      <input type="range" min="0" max="100" value={props.value} onChange={(event) => props.onChange(Number(event.target.value))} />
    </label>
  );
}
