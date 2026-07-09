'use client';

import { getRuntimeCssVars, useHarmonicRuntime } from '@/hooks/useHarmonicRuntime';
import type { HarmonicWorldId } from '@/lib/harmonic-engine';

export function RuntimeVisualDriver({ world }: { world: HarmonicWorldId }) {
  const runtime = useHarmonicRuntime(world);

  return (
    <div
      className={`runtime-visual-driver runtime-emotion-${runtime.emotion} runtime-lighting-${runtime.lighting} runtime-camera-${runtime.camera}`}
      style={getRuntimeCssVars(runtime)}
      aria-hidden="true"
    >
      <div className="runtime-aura-layer" />
      <div className="runtime-fog-layer" />
      <div className="runtime-bloom-layer" />
      <div className="runtime-pulse-ring" />
      <div className="runtime-readout-chip">
        <span>{runtime.emotion}</span>
        <small>{runtime.lighting}</small>
      </div>
    </div>
  );
}
