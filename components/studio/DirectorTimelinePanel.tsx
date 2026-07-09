'use client';

import { useState } from 'react';
import type { HarmonicEngineState } from '@/lib/harmonic-engine';
import {
  createDefaultDirectorTimeline,
  getKeyframePreviewState,
  timelineSummary,
  updateKeyframePatch,
  type DirectorTimelineKeyframe,
} from '@/lib/director-timeline';
import { HarmonicEnginePreview } from '@/components/engine/HarmonicEnginePreview';

const editableFields: Array<keyof HarmonicEngineState> = ['fog', 'bloom', 'aura', 'particleDensity', 'motionIntensity', 'audioReactivity', 'crystalHeartIntensity'];

export function DirectorTimelinePanel({ baseState, onApplyKeyframe }: { baseState: HarmonicEngineState; onApplyKeyframe: (patch: Partial<HarmonicEngineState>, label: string) => void }) {
  const [timeline, setTimeline] = useState(() => createDefaultDirectorTimeline());
  const [activeId, setActiveId] = useState(timeline.keyframes[0]?.id ?? '');
  const activeKeyframe = timeline.keyframes.find((keyframe) => keyframe.id === activeId) ?? timeline.keyframes[0];
  const previewState = activeKeyframe ? getKeyframePreviewState(baseState, activeKeyframe) : baseState;

  function updateActive(next: DirectorTimelineKeyframe) {
    setTimeline((current) => ({ ...current, keyframes: current.keyframes.map((keyframe) => keyframe.id === next.id ? next : keyframe) }));
  }

  function toggleApproved(id: string) {
    setTimeline((current) => ({ ...current, keyframes: current.keyframes.map((keyframe) => keyframe.id === id ? { ...keyframe, approved: !keyframe.approved } : keyframe) }));
  }

  return (
    <article className="rounded-[2rem] border border-white/10 bg-black/35 p-5 backdrop-blur-2xl">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-xs font-black uppercase tracking-[.28em] text-white/40">Director Timeline</p>
          <h3 className="mt-3 text-3xl font-black tracking-[-.06em]">Keyframe the experience.</h3>
          <p className="mt-2 text-sm leading-7 text-white/55">{timelineSummary(timeline)}</p>
        </div>
        <button type="button" onClick={() => setTimeline(createDefaultDirectorTimeline())} className="rounded-full border border-white/10 px-4 py-3 text-sm font-black text-purple-100/75 hover:bg-white/[.06]">Reset Timeline</button>
      </div>

      <div className="mt-5 overflow-x-auto pb-2">
        <div className="relative min-w-[620px] rounded-2xl border border-white/10 bg-black/30 p-4">
          <div className="absolute left-4 right-4 top-1/2 h-px bg-white/10" />
          <div className="relative flex items-center justify-between gap-3">
            {timeline.keyframes.map((keyframe) => (
              <button key={keyframe.id} type="button" onClick={() => setActiveId(keyframe.id)} className="relative grid min-w-32 gap-2 rounded-2xl border p-3 text-left transition hover:-translate-y-1" style={{ borderColor: activeId === keyframe.id ? 'rgba(216,180,254,.70)' : 'rgba(255,255,255,.10)', background: keyframe.approved ? 'rgba(183,108,255,.12)' : 'rgba(255,255,255,.035)' }}>
                <span className="font-mono text-xs text-purple-100/55">0:{String(keyframe.time).padStart(2, '0')}</span>
                <strong className="text-sm leading-5 text-white/78">{keyframe.label}</strong>
                <span className="text-[.65rem] font-black uppercase tracking-[.18em] text-white/35">{keyframe.track}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {activeKeyframe && (
        <div className="mt-5 grid gap-5 xl:grid-cols-[.9fr_1.1fr]">
          <div className="rounded-2xl border border-white/10 bg-black/25 p-4">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="font-mono text-xs text-purple-100/55">0:{String(activeKeyframe.time).padStart(2, '0')} / {activeKeyframe.track}</p>
                <h4 className="mt-2 text-2xl font-black tracking-[-.05em]">{activeKeyframe.label}</h4>
                <p className="mt-2 text-sm leading-7 text-white/55">{activeKeyframe.description}</p>
              </div>
              <label className="flex items-center gap-2 text-xs font-black uppercase tracking-[.18em] text-white/45">
                <input type="checkbox" checked={activeKeyframe.approved} onChange={() => toggleApproved(activeKeyframe.id)} /> Approved
              </label>
            </div>

            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              {editableFields.map((field) => (
                <label key={field} className="grid gap-2 text-sm font-bold text-purple-100/70">
                  {String(field)}
                  <input
                    value={String(activeKeyframe.patch[field] ?? baseState[field] ?? '')}
                    onChange={(event) => updateActive(updateKeyframePatch(activeKeyframe, field, event.target.value))}
                    className="rounded-xl border border-white/10 bg-black/40 px-3 py-3 text-sm text-purple-50 outline-none focus:border-purple-300"
                  />
                </label>
              ))}
            </div>

            <div className="mt-5 flex flex-wrap gap-3">
              <button type="button" onClick={() => onApplyKeyframe(activeKeyframe.patch, activeKeyframe.label)} disabled={!activeKeyframe.approved} className="rounded-full bg-purple-300 px-6 py-4 font-black text-black shadow-purple-glow disabled:cursor-not-allowed disabled:opacity-35">Apply This Keyframe</button>
              <button type="button" onClick={() => toggleApproved(activeKeyframe.id)} className="rounded-full border border-white/10 px-6 py-4 font-black text-purple-100/75 hover:bg-white/[.06]">{activeKeyframe.approved ? 'Unapprove' : 'Approve'}</button>
            </div>
          </div>

          <div>
            <p className="mb-3 text-xs font-black uppercase tracking-[.26em] text-purple-100/45">Keyframe Preview</p>
            <HarmonicEnginePreview state={previewState} />
          </div>
        </div>
      )}
    </article>
  );
}
