'use client';

import { useHarmonicRuntime } from '@/hooks/useHarmonicRuntime';
import { compileLivingWorldState } from '@/lib/living-world-engine';
import type { HarmonicWorldId } from '@/lib/harmonic-engine';

export function LivingWorldOverlay({ world }: { world: HarmonicWorldId }) {
  const runtime = useHarmonicRuntime(world);
  const living = compileLivingWorldState(world, runtime);

  return (
    <aside className="living-world-overlay" aria-label="Living World Engine status">
      <div className="living-world-orb" />
      <p className="living-world-eyebrow">Living World Engine</p>
      <h3>{living.headline}</h3>
      <p>{living.summary}</p>
      <div className="living-world-grid">
        <span>Event</span><strong>{living.activeEvent}</strong>
        <span>Population</span><strong>{living.population}%</strong>
        <span>Camera</span><strong>{living.cameraBehavior}</strong>
        <span>Ripple</span><strong>{living.crossWorldRipple}</strong>
      </div>
    </aside>
  );
}
