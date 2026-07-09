'use client';

import { useEffect, useMemo, useState } from 'react';
import { worldDefaults, type HarmonicEngineState, type HarmonicWorldId } from '@/lib/harmonic-engine';
import { readRuntimeSync, subscribeRuntimeSync } from '@/lib/harmonic-live-sync';

export function useHarmonicRuntime(world: HarmonicWorldId) {
  const fallback = useMemo(() => worldDefaults[world], [world]);
  const [runtimeState, setRuntimeState] = useState<HarmonicEngineState>(fallback);

  useEffect(() => {
    const stored = readRuntimeSync();
    if (stored?.world === world) setRuntimeState(stored.state);

    return subscribeRuntimeSync((payload) => {
      if (payload.world === world) setRuntimeState(payload.state);
    });
  }, [world]);

  return runtimeState;
}

export function getRuntimeCssVars(state: HarmonicEngineState): React.CSSProperties {
  return {
    '--runtime-aura': `${state.aura}%`,
    '--runtime-aura-opacity': `${state.aura / 100}`,
    '--runtime-fog': `${state.fog}%`,
    '--runtime-fog-opacity': `${state.fog / 100}`,
    '--runtime-bloom': `${state.bloom}%`,
    '--runtime-bloom-radius': `${Math.max(18, state.bloom * 0.9)}px`,
    '--runtime-grain': `${state.grain}%`,
    '--runtime-particles': `${state.particleDensity}%`,
    '--runtime-motion': `${state.motionIntensity}%`,
    '--runtime-motion-scale': `${0.8 + state.motionIntensity / 250}`,
    '--runtime-logo-glow': `${Math.max(16, state.crystalHeartIntensity * 0.9)}px`,
  } as React.CSSProperties;
}
