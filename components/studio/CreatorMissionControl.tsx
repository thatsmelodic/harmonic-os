'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';
import {
  type CameraMode,
  type EmotionKey,
  type EnvironmentMode,
  type HarmonicEngineState,
  type HarmonicWorldId,
  type LightingMode,
  type PhysicsMode,
  translateVibeToEngine,
  worldDefaults,
} from '@/lib/harmonic-engine';
import { bootRuntime, dispatchRuntimePatch, type HarmonicRuntimeSnapshot } from '@/lib/harmonic-signal-bus';
import { publishRuntimeSync } from '@/lib/harmonic-live-sync';
import { HarmonicEnginePreview } from '@/components/engine/HarmonicEnginePreview';
import { HarmonicRuntimePanel } from '@/components/engine/HarmonicRuntimePanel';
import { SeasonMissionControl } from '@/components/studio/SeasonMissionControl';

const worlds: HarmonicWorldId[] = ['melodic', 'harmonic', 'fried-em', 'schmackin'];
const emotions: EmotionKey[] = ['hope', 'pain', 'luxury', 'victory', 'chaos', 'peace', 'reflection', 'pressure', 'healing', 'freedom'];
const environments: EnvironmentMode[] = ['nebula', 'studio', 'runway', 'arena', 'restaurant', 'rooftop', 'church', 'dreamscape'];
const lightingModes: LightingMode[] = ['purple-neon', 'golden-hour', 'moonlight', 'candlelight', 'arena-glow', 'restaurant-warmth', 'cosmic', 'spotlight'];
const cameraModes: CameraMode[] = ['locked', 'float', 'slow-pan', 'orbit', 'dolly', 'shake', 'follow-cursor'];
const physicsModes: PhysicsMode[] = ['soft-float', 'fabric-drift', 'impact-snap', 'steam-rise', 'zero-gravity'];

const workspaceMap: Record<HarmonicWorldId, string[]> = {
  melodic: ['Director', 'Audio', 'Visualizer', 'Memory', 'Release'],
  harmonic: ['Runway', 'Materials', 'Lighting', 'Camera', 'Drop'],
  'fried-em': ['Momentum', 'Replay', 'Scoreboard', 'Crowd', 'Challenge'],
  schmackin: ['Flavor', 'Steam', 'Verdict', 'District', 'Community'],
};

const worldLinks: Record<HarmonicWorldId, string> = {
  melodic: '/worlds/melodic',
  harmonic: '/worlds/harmonic',
  'fried-em': '/worlds/fried-em',
  schmackin: '/worlds/schmackin',
};

export function CreatorMissionControl() {
  const [activeWorld, setActiveWorld] = useState<HarmonicWorldId>('schmackin');
  const [runtime, setRuntime] = useState(() => bootRuntime(worldDefaults.schmackin));
  const [directorPrompt, setDirectorPrompt] = useState('Make this upload feel warm at first, uncomfortable after the bite, then funny by the verdict.');
  const [activePanel, setActivePanel] = useState('Director');
  const state = runtime.state;

  const liveReadout = useMemo(() => [
    { label: 'Emotion', value: state.emotion },
    { label: 'Particles', value: `${state.particleDensity}%` },
    { label: 'Audio', value: `${state.audioReactivity}%` },
    { label: 'Motion', value: `${state.motionIntensity}%` },
    { label: 'Aura', value: `${state.aura}%` },
    { label: 'Runtime', value: 'LIVE' },
  ], [state]);

  function commitRuntime(nextRuntime: HarmonicRuntimeSnapshot, source: string) {
    publishRuntimeSync(nextRuntime, source);
    return nextRuntime;
  }

  function switchWorld(world: HarmonicWorldId) {
    const nextRuntime = bootRuntime(worldDefaults[world]);
    setActiveWorld(world);
    setRuntime(nextRuntime);
    publishRuntimeSync(nextRuntime, 'world-switcher');
    setActivePanel(workspaceMap[world][0]);
  }

  function patch(patchState: Partial<HarmonicEngineState>, source = 'mission-control') {
    setRuntime((current) => commitRuntime(dispatchRuntimePatch(current, source, patchState), source));
  }

  function conductDirector() {
    const translated = translateVibeToEngine(activeWorld, directorPrompt);
    setRuntime((current) => commitRuntime(dispatchRuntimePatch(current, 'studio-ai-director', translated), 'studio-ai-director'));
  }

  return (
    <section className="harmonic-container py-8">
      <div className="rounded-[2.8rem] border border-white/10 bg-[linear-gradient(135deg,rgba(183,108,255,.20),rgba(54,178,203,.06),rgba(255,255,255,.035))] p-5 shadow-purple-glow backdrop-blur-2xl sm:p-7">
        <div className="flex flex-wrap items-start justify-between gap-5">
          <div>
            <p className="text-xs font-black uppercase tracking-[.38em] text-purple-100/45">Creator Studio 2.0</p>
            <h1 className="mt-3 text-4xl font-black tracking-[-.08em] sm:text-6xl">Mission Control</h1>
            <p className="mt-4 max-w-4xl text-sm leading-7 text-purple-100/62 sm:text-base">
              The cockpit for Harmonic OS. Switch worlds, direct atmosphere, tune environment, lighting, camera, seasons, and watch the runtime publish through the live Signal Bus.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link href="/engine" className="rounded-full bg-purple-300 px-5 py-3 text-sm font-black text-black shadow-purple-glow">Engine</Link>
            <Link href={worldLinks[activeWorld]} className="rounded-full border border-white/10 px-5 py-3 text-sm font-black text-purple-100/75 hover:bg-white/[.06]">View World</Link>
          </div>
        </div>

        <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {worlds.map((world) => (
            <button key={world} type="button" onClick={() => switchWorld(world)} className="rounded-2xl border p-4 text-left transition hover:-translate-y-1" style={{ borderColor: activeWorld === world ? 'rgba(216,180,254,.72)' : 'rgba(255,255,255,.10)', background: activeWorld === world ? 'rgba(183,108,255,.18)' : 'rgba(255,255,255,.04)' }}>
              <p className="text-lg font-black capitalize">{world.replace('-', ' ')}</p>
              <p className="mt-2 font-mono text-xs uppercase tracking-[.18em] text-white/35">{worldDefaults[world].creativeMode} workspace</p>
            </button>
          ))}
        </div>

        <div className="mt-5 grid gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {liveReadout.map((item) => (
            <div key={item.label} className="rounded-2xl border border-white/10 bg-black/30 p-4">
              <p className="text-xs font-black uppercase tracking-[.2em] text-white/35">{item.label}</p>
              <p className="mt-2 text-xl font-black capitalize tracking-[-.04em] text-white/80">{item.value}</p>
            </div>
          ))}
        </div>
      </div>

      <SeasonMissionControl />

      <div className="mt-5 grid gap-5 xl:grid-cols-[.36fr_.64fr]">
        <aside className="grid gap-5 content-start">
          <article className="rounded-[2rem] border border-white/10 bg-black/35 p-5 backdrop-blur-2xl">
            <p className="text-xs font-black uppercase tracking-[.28em] text-white/40">Workspace</p>
            <div className="mt-4 grid gap-2">
              {workspaceMap[activeWorld].map((panel) => (
                <button key={panel} type="button" onClick={() => setActivePanel(panel)} className="rounded-2xl border px-4 py-3 text-left text-sm font-black transition" style={{ borderColor: activePanel === panel ? 'rgba(216,180,254,.65)' : 'rgba(255,255,255,.10)', background: activePanel === panel ? 'rgba(183,108,255,.16)' : 'rgba(255,255,255,.035)' }}>{panel}</button>
              ))}
            </div>
          </article>

          <ControlPanel title="Environment" eyebrow="World Atmosphere">
            <SelectControl label="Environment" value={state.environment} options={environments} onChange={(value) => patch({ environment: value as EnvironmentMode })} />
            <RangeControl label="Fog / Steam / Smoke" value={state.fog} onChange={(value) => patch({ fog: value })} />
            <RangeControl label="Aura" value={state.aura} onChange={(value) => patch({ aura: value })} />
            <RangeControl label="Particles" value={state.particleDensity} onChange={(value) => patch({ particleDensity: value })} />
          </ControlPanel>

          <ControlPanel title="Lighting" eyebrow="Cinematic Grade">
            <SelectControl label="Lighting Mode" value={state.lighting} options={lightingModes} onChange={(value) => patch({ lighting: value as LightingMode })} />
            <RangeControl label="Bloom" value={state.bloom} onChange={(value) => patch({ bloom: value })} />
            <RangeControl label="Grain" value={state.grain} onChange={(value) => patch({ grain: value })} />
            <RangeControl label="Crystal / Logo Glow" value={state.crystalHeartIntensity} onChange={(value) => patch({ crystalHeartIntensity: value })} />
          </ControlPanel>

          <ControlPanel title="Camera" eyebrow="Director Lens">
            <SelectControl label="Camera Mode" value={state.camera} options={cameraModes} onChange={(value) => patch({ camera: value as CameraMode })} />
            <SelectControl label="Physics" value={state.physics} options={physicsModes} onChange={(value) => patch({ physics: value as PhysicsMode })} />
            <RangeControl label="Motion" value={state.motionIntensity} onChange={(value) => patch({ motionIntensity: value })} />
            <RangeControl label="Depth" value={state.sectionDepth} onChange={(value) => patch({ sectionDepth: value })} />
          </ControlPanel>
        </aside>

        <div className="grid gap-5 content-start">
          <article className="rounded-[2rem] border border-white/10 bg-black/35 p-5 backdrop-blur-2xl">
            <p className="text-xs font-black uppercase tracking-[.28em] text-white/40">Director Workspace</p>
            <h2 className="mt-3 text-3xl font-black tracking-[-.06em]">Tell the OS what the experience should feel like.</h2>
            <textarea value={directorPrompt} onChange={(event) => setDirectorPrompt(event.target.value)} rows={4} className="mt-4 w-full rounded-2xl border border-white/10 bg-black/40 px-4 py-4 text-purple-50 outline-none focus:border-purple-300" placeholder="Example: make this review slowly become chaotic before the Bunz reveal..." />
            <div className="mt-4 flex flex-wrap gap-3">
              <button type="button" onClick={conductDirector} className="rounded-full bg-purple-300 px-6 py-4 font-black text-black shadow-purple-glow">Conduct Runtime</button>
              <button type="button" onClick={() => patch({ emotion: 'chaos', particleDensity: 88, motionIntensity: 92 }, 'quick-preset')} className="rounded-full border border-white/10 px-6 py-4 font-black text-purple-100/75 hover:bg-white/[.06]">Chaos Preset</button>
              <button type="button" onClick={() => patch({ emotion: 'luxury', bloom: 88, grain: 6 }, 'quick-preset')} className="rounded-full border border-white/10 px-6 py-4 font-black text-purple-100/75 hover:bg-white/[.06]">Luxury Preset</button>
            </div>
          </article>

          <article className="rounded-[2rem] border border-white/10 bg-black/35 p-5 backdrop-blur-2xl">
            <p className="text-xs font-black uppercase tracking-[.28em] text-white/40">Emotion Matrix</p>
            <div className="mt-4 grid gap-2 sm:grid-cols-5">
              {emotions.map((emotion) => <button key={emotion} type="button" onClick={() => patch({ emotion }, 'emotion-matrix')} className="rounded-2xl border border-white/10 bg-white/[.04] px-3 py-3 text-sm font-black capitalize text-white/65 hover:bg-purple-200/10">{emotion}</button>)}
            </div>
          </article>

          <HarmonicEnginePreview state={state} />
          <HarmonicRuntimePanel snapshot={runtime} />
        </div>
      </div>
    </section>
  );
}

function ControlPanel({ title, eyebrow, children }: { title: string; eyebrow: string; children: React.ReactNode }) {
  return <article className="rounded-[2rem] border border-white/10 bg-black/35 p-5 backdrop-blur-2xl"><p className="text-xs font-black uppercase tracking-[.28em] text-white/40">{eyebrow}</p><h3 className="mt-2 text-2xl font-black tracking-[-.05em]">{title}</h3><div className="mt-4 grid gap-4">{children}</div></article>;
}

function RangeControl(props: { label: string; value: number; onChange: (value: number) => void }) {
  return <label className="grid gap-2 text-sm font-bold text-purple-100/70"><span className="flex justify-between"><span>{props.label}</span><span>{props.value}%</span></span><input type="range" min="0" max="100" value={props.value} onChange={(event) => props.onChange(Number(event.target.value))} /></label>;
}

function SelectControl(props: { label: string; value: string; options: string[]; onChange: (value: string) => void }) {
  return <label className="grid gap-2 text-sm font-bold text-purple-100/70">{props.label}<select value={props.value} onChange={(event) => props.onChange(event.target.value)} className="rounded-2xl border border-white/10 bg-black/40 px-4 py-4 text-purple-50 outline-none focus:border-purple-300">{props.options.map((option) => <option key={option}>{option}</option>)}</select></label>;
}
