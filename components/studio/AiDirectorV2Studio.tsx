'use client';

import { useState } from 'react';
import type { HarmonicEngineState, HarmonicWorldId } from '@/lib/harmonic-engine';
import { worldDefaults } from '@/lib/harmonic-engine';
import { bootRuntime, dispatchRuntimePatch, type HarmonicRuntimeSnapshot } from '@/lib/harmonic-signal-bus';
import { publishRuntimeSync } from '@/lib/harmonic-live-sync';
import { AiDirectorV2Panel } from '@/components/studio/AiDirectorV2Panel';
import { HarmonicBrainV3Panel } from '@/components/studio/HarmonicBrainV3Panel';
import { IntelligenceCompletionPanel } from '@/components/studio/IntelligenceCompletionPanel';
import { SeasonalFxHolidayPanel } from '@/components/studio/SeasonalFxHolidayPanel';
import { HarmonicRuntimePanel } from '@/components/engine/HarmonicRuntimePanel';

const worlds: HarmonicWorldId[] = ['melodic', 'harmonic', 'fried-em', 'schmackin'];

export function AiDirectorV2Studio() {
  const [activeWorld, setActiveWorld] = useState<HarmonicWorldId>('schmackin');
  const [runtime, setRuntime] = useState<HarmonicRuntimeSnapshot>(() => bootRuntime(worldDefaults.schmackin));
  const [prompt, setPrompt] = useState('Make this feel like a cinematic creator moment with a calm hook, tense build, chaotic peak, and victorious reveal.');

  function switchWorld(world: HarmonicWorldId) {
    const nextRuntime = bootRuntime(worldDefaults[world]);
    setActiveWorld(world);
    setRuntime(nextRuntime);
    publishRuntimeSync(nextRuntime, 'ai-v2-world-switcher');
  }

  function applyV2Patch(patch: Partial<HarmonicEngineState>, label: string) {
    setRuntime((current) => {
      const nextRuntime = dispatchRuntimePatch(current, `ai-v2-${label.toLowerCase().replace(/\s+/g, '-')}`, patch);
      publishRuntimeSync(nextRuntime, 'approved-ai-director-v2');
      return nextRuntime;
    });
  }

  return (
    <section className="harmonic-container py-8">
      <div className="rounded-[2.8rem] border border-purple-200/15 bg-[linear-gradient(135deg,rgba(183,108,255,.16),rgba(54,178,203,.06),rgba(0,0,0,.35))] p-5 shadow-purple-glow backdrop-blur-2xl sm:p-7">
        <div className="flex flex-wrap items-start justify-between gap-5">
          <div>
            <p className="text-xs font-black uppercase tracking-[.38em] text-purple-100/45">Optional AI Layer</p>
            <h2 className="mt-3 text-4xl font-black tracking-[-.08em] sm:text-6xl">AI Director V2 + Brain V3</h2>
            <p className="mt-4 max-w-4xl text-sm leading-7 text-purple-100/62 sm:text-base">
              Each world now has its own personality brain, creator memory, explain-why trust logic, approval-based event engine, complete seasons, and holiday/cultural overlays.
            </p>
          </div>
          <span className="rounded-full border border-purple-200/20 bg-black/30 px-5 py-3 text-sm font-black text-purple-100/65">Approval Required</span>
        </div>

        <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {worlds.map((world) => (
            <button key={world} type="button" onClick={() => switchWorld(world)} className="rounded-2xl border p-4 text-left transition hover:-translate-y-1" style={{ borderColor: activeWorld === world ? 'rgba(216,180,254,.72)' : 'rgba(255,255,255,.10)', background: activeWorld === world ? 'rgba(183,108,255,.18)' : 'rgba(255,255,255,.04)' }}>
              <p className="text-lg font-black capitalize">{world.replace('-', ' ')}</p>
              <p className="mt-2 font-mono text-xs uppercase tracking-[.18em] text-white/35">Brain personality target</p>
            </button>
          ))}
        </div>

        <label className="mt-6 grid gap-2 text-sm font-bold text-purple-100/70">
          Director Prompt
          <textarea value={prompt} onChange={(event) => setPrompt(event.target.value)} rows={3} className="w-full rounded-2xl border border-white/10 bg-black/40 px-4 py-4 text-purple-50 outline-none focus:border-purple-300" />
        </label>
      </div>

      <div className="mt-5 grid gap-5">
        <HarmonicBrainV3Panel world={activeWorld} baseState={runtime.state} prompt={prompt} />
        <SeasonalFxHolidayPanel world={activeWorld} onApply={applyV2Patch} />
        <IntelligenceCompletionPanel world={activeWorld} onApplyEvent={applyV2Patch} />
        <AiDirectorV2Panel world={activeWorld} baseState={runtime.state} prompt={prompt} onApply={applyV2Patch} />
        <HarmonicRuntimePanel snapshot={runtime} />
      </div>
    </section>
  );
}
