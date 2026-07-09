'use client';

import { useState } from 'react';
import type { HarmonicEngineState, HarmonicWorldId } from '@/lib/harmonic-engine';
import {
  compileApprovedAiV2Patch,
  createAiDirectorV2Plan,
  getAiV2PreviewState,
  type AiDirectorV2Plan,
  type AiV2ApprovalStatus,
} from '@/lib/ai-director-v2';
import { HarmonicEnginePreview } from '@/components/engine/HarmonicEnginePreview';

export function AiDirectorV2Panel({ world, baseState, prompt, onApply }: { world: HarmonicWorldId; baseState: HarmonicEngineState; prompt: string; onApply: (patch: Partial<HarmonicEngineState>, label: string) => void }) {
  const [plan, setPlan] = useState<AiDirectorV2Plan | null>(null);
  const [activeSceneId, setActiveSceneId] = useState<string>('');
  const previewState = getAiV2PreviewState(baseState, plan);
  const activeScene = plan?.scenes.find((scene) => scene.id === activeSceneId) ?? plan?.scenes[0];

  function generatePlan() {
    const nextPlan = createAiDirectorV2Plan(world, baseState, prompt);
    setPlan(nextPlan);
    setActiveSceneId(nextPlan.scenes[0]?.id ?? '');
  }

  function setSceneStatus(sceneId: string, status: AiV2ApprovalStatus) {
    setPlan((current) => current ? {
      ...current,
      scenes: current.scenes.map((scene) => scene.id === sceneId ? { ...scene, status, effects: scene.effects.map((effect) => ({ ...effect, status: status === 'approved' ? 'approved' : effect.status })) } : scene),
    } : current);
  }

  function setEffectStatus(sceneId: string, effectId: string, status: AiV2ApprovalStatus) {
    setPlan((current) => current ? {
      ...current,
      scenes: current.scenes.map((scene) => scene.id === sceneId ? { ...scene, effects: scene.effects.map((effect) => effect.id === effectId ? { ...effect, status } : effect) } : scene),
    } : current);
  }

  function applyApproved() {
    if (!plan) return;
    onApply(compileApprovedAiV2Patch(plan), 'AI Director V2 approved plan');
    setPlan(null);
  }

  return (
    <article className="rounded-[2rem] border border-purple-200/20 bg-[linear-gradient(135deg,rgba(183,108,255,.10),rgba(54,178,203,.05),rgba(0,0,0,.25))] p-5 backdrop-blur-2xl">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-xs font-black uppercase tracking-[.28em] text-purple-100/50">AI Director V2</p>
          <h3 className="mt-3 text-3xl font-black tracking-[-.06em]">Cinematic assistant, not autopilot.</h3>
          <p className="mt-2 max-w-3xl text-sm leading-7 text-white/58">Generate a multi-scene plan with editable camera, lighting, atmosphere, audio, object, and UI effects. Nothing applies until you approve it.</p>
        </div>
        <button type="button" onClick={generatePlan} className="rounded-full bg-purple-300 px-6 py-4 font-black text-black shadow-purple-glow">Generate V2 Plan</button>
      </div>

      {plan && (
        <div className="mt-5 grid gap-5 xl:grid-cols-[1fr_.9fr]">
          <div className="grid gap-4">
            <div className="rounded-2xl border border-white/10 bg-black/30 p-4">
              <p className="text-xs font-black uppercase tracking-[.22em] text-white/35">{plan.title}</p>
              <p className="mt-2 text-sm leading-7 text-white/58">{plan.summary}</p>
              <p className="mt-2 text-xs font-bold text-purple-100/55">{plan.safetyRule}</p>
            </div>

            <div className="grid gap-3 md:grid-cols-5">
              {plan.scenes.map((scene) => (
                <button key={scene.id} type="button" onClick={() => setActiveSceneId(scene.id)} className="rounded-2xl border p-4 text-left transition hover:-translate-y-1" style={{ borderColor: activeScene?.id === scene.id ? 'rgba(216,180,254,.70)' : 'rgba(255,255,255,.10)', background: scene.status === 'approved' ? 'rgba(183,108,255,.16)' : scene.status === 'rejected' ? 'rgba(255,80,80,.08)' : 'rgba(255,255,255,.035)' }}>
                  <p className="font-mono text-xs text-purple-100/55">0:{String(scene.time).padStart(2, '0')}</p>
                  <h4 className="mt-2 text-sm font-black leading-5 text-white/78">{scene.title}</h4>
                  <p className="mt-2 text-[.65rem] font-black uppercase tracking-[.18em] text-white/35">{scene.confidence}% confidence</p>
                </button>
              ))}
            </div>

            {activeScene && (
              <div className="rounded-2xl border border-white/10 bg-black/30 p-4">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <p className="font-mono text-xs text-purple-100/55">{activeScene.type} / 0:{String(activeScene.time).padStart(2, '0')}</p>
                    <h4 className="mt-2 text-2xl font-black tracking-[-.05em]">{activeScene.title}</h4>
                    <p className="mt-2 text-sm leading-7 text-white/55">{activeScene.description}</p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <button type="button" onClick={() => setSceneStatus(activeScene.id, 'approved')} className="rounded-full bg-purple-300 px-4 py-3 text-sm font-black text-black">Approve Scene</button>
                    <button type="button" onClick={() => setSceneStatus(activeScene.id, 'rejected')} className="rounded-full border border-white/10 px-4 py-3 text-sm font-black text-purple-100/70">Reject Scene</button>
                  </div>
                </div>

                <div className="mt-5 grid gap-3">
                  {activeScene.effects.map((effect) => (
                    <div key={effect.id} className="grid gap-3 rounded-2xl border border-white/10 bg-white/[.035] p-4 md:grid-cols-[1fr_auto] md:items-center">
                      <div>
                        <p className="text-sm font-black text-white/78">{effect.label}</p>
                        <p className="mt-1 text-xs font-black uppercase tracking-[.18em] text-purple-100/45">{effect.category} / {effect.status}</p>
                        <p className="mt-2 text-xs leading-6 text-white/45">{effect.reason}</p>
                      </div>
                      <div className="flex gap-2">
                        <button type="button" onClick={() => setEffectStatus(activeScene.id, effect.id, 'approved')} className="rounded-full border border-purple-200/25 px-3 py-2 text-xs font-black text-purple-100/75">Approve</button>
                        <button type="button" onClick={() => setEffectStatus(activeScene.id, effect.id, 'rejected')} className="rounded-full border border-white/10 px-3 py-2 text-xs font-black text-white/45">Reject</button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="flex flex-wrap gap-3">
              <button type="button" onClick={applyApproved} className="rounded-full bg-purple-300 px-6 py-4 font-black text-black shadow-purple-glow">Apply Approved V2 Changes</button>
              <button type="button" onClick={() => setPlan(null)} className="rounded-full border border-white/10 px-6 py-4 font-black text-purple-100/75 hover:bg-white/[.06]">Clear Plan</button>
            </div>
          </div>

          <div>
            <p className="mb-3 text-xs font-black uppercase tracking-[.26em] text-purple-100/45">V2 Approved Preview</p>
            <HarmonicEnginePreview state={previewState} />
          </div>
        </div>
      )}
    </article>
  );
}
