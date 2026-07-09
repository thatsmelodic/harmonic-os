'use client';

import { getRuntimeCssVars, useHarmonicRuntime } from '@/hooks/useHarmonicRuntime';
import type { HarmonicWorldId } from '@/lib/harmonic-engine';
import { getWorldPersonalityReaction } from '@/lib/world-personality';

export function RuntimeVisualDriver({ world }: { world: HarmonicWorldId }) {
  const runtime = useHarmonicRuntime(world);
  const reaction = getWorldPersonalityReaction(world, runtime.emotion);

  return (
    <div
      className={`runtime-visual-driver runtime-emotion-${runtime.emotion} runtime-lighting-${runtime.lighting} runtime-camera-${runtime.camera} runtime-mode-${reaction.visualMode}`}
      style={getRuntimeCssVars(runtime)}
      aria-hidden="true"
    >
      <div className="runtime-aura-layer" />
      <div className="runtime-fog-layer" />
      <div className="runtime-bloom-layer" />
      <div className="runtime-pulse-ring" />
      <div className="runtime-personality-burst" style={{ opacity: reaction.intensity / 220 }} />
      <div className="runtime-readout-chip">
        <span>{reaction.headline}</span>
        <small>{reaction.description}</small>
      </div>
    </div>
  );
}
