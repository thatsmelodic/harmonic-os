'use client';

import { useMemo, useState } from 'react';
import { HarmonicEnginePreview } from '@/components/engine/HarmonicEnginePreview';
import {
  mergeEngineState,
  translateVibeToEngine,
  worldDefaults,
  type CreativeMode,
  type EmotionKey,
  type EnvironmentMode,
  type HarmonicEngineState,
  type HarmonicWorldId,
} from '@/lib/harmonic-engine';

const worlds: HarmonicWorldId[] = ['melodic', 'harmonic', 'fried-em', 'schmackin'];
const creativeModes: CreativeMode[] = ['composer', 'designer', 'director', 'builder', 'business'];
const emotions: EmotionKey[] = ['hope', 'pain', 'luxury', 'victory', 'chaos', 'peace', 'reflection', 'pressure', 'healing', 'freedom'];
const environments: EnvironmentMode[] = ['nebula', 'studio', 'runway', 'arena', 'restaurant', 'rooftop', 'church', 'dreamscape'];

export function HarmonicEngineControlRoom() {
  const [activeWorld, setActiveWorld] = useState<HarmonicWorldId>('melodic');
  const [engineState, setEngineState] = useState<HarmonicEngineState>(worldDefaults.melodic);
  const [prompt, setPrompt] = useState('make this world feel like the calm after surviving your worst year');
  const [status, setStatus] = useState('Engine ready. Pick a world, describe a vibe, or tune the controls manually.');

  const activeHarmony = useMemo(
    () => Object.entries(engineState.dna).sort((a, b) => b[1] - a[1]).slice(0, 3),
    [engineState]
  );

  function switchWorld(world: HarmonicWorldId) {
    setActiveWorld(world);
    setEngineState(worldDefaults[world]);
    setStatus(`${world} loaded. Same mind, different harmony.`);
  }

  function patchState(patch: Partial<HarmonicEngineState>) {
    setEngineState((current) => mergeEngineState(current.world, { ...current, ...patch }));
  }

  function conductVibe() {
    const translated = translateVibeToEngine(activeWorld, prompt);
    setEngineState(translated);
    setStatus(`Vibe translated for ${activeWorld}: ${translated.emotion}, ${translated.environment}, ${translated.lighting}.`);
  }

  function addObject() {
    const objectName = window.prompt('Add object to this world: piano, smoke, sauce, moon, fabric, scoreboard...');
    if (!objectName) return;
    patchState({ objects: [...engineState.objects, objectName.trim()] });
  }

  function removeObject(object: string) {
    patchState({ objects: engineState.objects.filter((item) => item !== object) });
  }

  return (
    <section className="harmonic-container py-8">
      <div className="mb-6 rounded-[2.5rem] border border-white/10 bg-[linear-gradient(135deg,rgba(183,108,255,.16),rgba(54,178,203,.07),rgba(255,255,255,.035))] p-6 shadow-purple-glow backdrop-blur-2xl sm:p-8">
        <p className="text-xs font-black uppercase tracking-[.34em] text-purple-100/45">Harmonic Engine</p>
        <h1 className="mt-3 text-4xl font-black tracking-[-.07em] sm:text-6xl">One mind. Four harmonies.</h1>
        <p className="mt-4 max-w-4xl text-sm leading-7 text-purple-100/62 sm:text-base">
          This is the shared world-building system. Melodic, Harmonic, Fried Em, and Schmackin all inherit the same controls, but their Frequency DNA changes how those controls behave.
        </p>
      </div>

      <div className="grid gap-5 xl:grid-cols-[.9fr_1.1fr]">
        <div className="grid gap-5">
          <article className="rounded-[2rem] border border-white/10 bg-black/30 p-5">
            <p className="text-xs font-black uppercase tracking-[.28em] text-white/40">World Selector</p>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {worlds.map((world) => (
                <button
                  key={world}
                  type="button"
                  onClick={() => switchWorld(world)}
                  className="rounded-2xl border p-4 text-left transition hover:-translate-y-1"
                  style={{ borderColor: activeWorld === world ? 'rgba(216,180,254,.7)' : 'rgba(255,255,255,.1)', background: activeWorld === world ? 'rgba(183,108,255,.16)' : 'rgba(255,255,255,.04)' }}
                >
                  <p className="text-lg font-black capitalize">{world.replace('-', ' ')}</p>
                  <p className="mt-2 text-xs font-mono uppercase tracking-[.18em] text-white/40">{worldDefaults[world].creativeMode} mode</p>
                </button>
              ))}
            </div>
          </article>

          <article className="rounded-[2rem] border border-white/10 bg-black/30 p-5">
            <p className="text-xs font-black uppercase tracking-[.28em] text-white/40">AI Director Draft</p>
            <h2 className="mt-3 text-3xl font-black tracking-[-.05em]">Describe the world.</h2>
            <textarea
              value={prompt}
              onChange={(event) => setPrompt(event.target.value)}
              rows={5}
              className="mt-4 w-full rounded-2xl border border-white/10 bg-black/40 px-4 py-4 text-purple-50 outline-none focus:border-purple-300"
              placeholder="Make it feel like..."
            />
            <button type="button" onClick={conductVibe} className="mt-4 rounded-full bg-purple-300 px-6 py-4 font-black text-black shadow-purple-glow">
              Conduct World
            </button>
            <p className="mt-4 rounded-2xl border border-white/10 bg-white/[.045] p-4 text-sm leading-6 text-purple-100/62">{status}</p>
          </article>

          <article className="rounded-[2rem] border border-white/10 bg-black/30 p-5">
            <p className="text-xs font-black uppercase tracking-[.28em] text-white/40">Universal Controls</p>
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <SelectControl label="Creative Mode" value={engineState.creativeMode} options={creativeModes} onChange={(value) => patchState({ creativeMode: value as CreativeMode })} />
              <SelectControl label="Emotion" value={engineState.emotion} options={emotions} onChange={(value) => patchState({ emotion: value as EmotionKey })} />
              <SelectControl label="Environment" value={engineState.environment} options={environments} onChange={(value) => patchState({ environment: value as EnvironmentMode })} />
              <RangeControl label="Aura" value={engineState.aura} onChange={(value) => patchState({ aura: value })} />
              <RangeControl label="Fog" value={engineState.fog} onChange={(value) => patchState({ fog: value })} />
              <RangeControl label="Bloom" value={engineState.bloom} onChange={(value) => patchState({ bloom: value })} />
              <RangeControl label="Particles" value={engineState.particleDensity} onChange={(value) => patchState({ particleDensity: value })} />
              <RangeControl label="Motion" value={engineState.motionIntensity} onChange={(value) => patchState({ motionIntensity: value })} />
              <RangeControl label="Audio Reactivity" value={engineState.audioReactivity} onChange={(value) => patchState({ audioReactivity: value })} />
              <RangeControl label="Crystal Heart" value={engineState.crystalHeartIntensity} onChange={(value) => patchState({ crystalHeartIntensity: value })} />
            </div>
          </article>

          <article className="rounded-[2rem] border border-white/10 bg-black/30 p-5">
            <div className="flex items-center justify-between gap-3">
              <p className="text-xs font-black uppercase tracking-[.28em] text-white/40">Scene Objects</p>
              <button type="button" onClick={addObject} className="rounded-full border border-purple-200/20 px-4 py-2 text-xs font-black text-purple-100/70 hover:bg-purple-200/10">+ Add Object</button>
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              {engineState.objects.map((object) => (
                <button key={object} type="button" onClick={() => removeObject(object)} className="rounded-full border border-white/10 bg-white/[.045] px-3 py-2 text-xs font-bold text-white/60 hover:border-red-300/50">
                  {object.replace('-', ' ')} ×
                </button>
              ))}
            </div>
          </article>
        </div>

        <div className="grid gap-5">
          <HarmonicEnginePreview state={engineState} />

          <article className="rounded-[2rem] border border-white/10 bg-black/30 p-5">
            <p className="text-xs font-black uppercase tracking-[.28em] text-white/40">World Harmony</p>
            <div className="mt-4 grid gap-3 sm:grid-cols-3">
              {activeHarmony.map(([key, value]) => (
                <div key={key} className="rounded-2xl border border-white/10 bg-white/[.045] p-4">
                  <p className="text-xs font-black uppercase tracking-[.18em] text-white/35">{key}</p>
                  <p className="mt-2 text-3xl font-black tracking-[-.05em]">{value}%</p>
                </div>
              ))}
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}

function RangeControl({ label, value, onChange }: { label: string; value: number; onChange: (value: number) => void }) {
  return (
    <label className="grid gap-2 text-sm font-bold text-purple-100/70">
      {label}: {value}%
      <input type="range" min="0" max="100" value={value} onChange={(event) => onChange(Number(event.target.value))} />
    </label>
  );
}

function SelectControl({ label, value, options, onChange }: { label: string; value: string; options: string[]; onChange: (value: string) => void }) {
  return (
    <label className="grid gap-2 text-sm font-bold text-purple-100/70">
      {label}
      <select value={value} onChange={(event) => onChange(event.target.value)} className="rounded-2xl border border-white/10 bg-black/40 px-4 py-4 text-purple-50 outline-none focus:border-purple-300">
        {options.map((option) => <option key={option}>{option}</option>)}
      </select>
    </label>
  );
}
