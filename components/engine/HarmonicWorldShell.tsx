import type { CSSProperties, ReactNode } from 'react';
import { mergeEngineState, type HarmonicEngineState, type HarmonicWorldId } from '@/lib/harmonic-engine';

type HarmonicWorldShellProps = {
  world: HarmonicWorldId;
  state?: Partial<HarmonicEngineState>;
  children: ReactNode;
  className?: string;
};

const lightingMap: Record<string, string> = {
  'purple-neon': 'rgba(183,108,255,.30)',
  'golden-hour': 'rgba(255,209,102,.22)',
  moonlight: 'rgba(120,160,255,.18)',
  candlelight: 'rgba(255,170,80,.18)',
  'arena-glow': 'rgba(255,122,26,.25)',
  'restaurant-warmth': 'rgba(255,64,64,.18)',
  cosmic: 'rgba(54,178,203,.20)',
  spotlight: 'rgba(245,223,184,.20)',
};

export function HarmonicWorldShell({ world, state, children, className = '' }: HarmonicWorldShellProps) {
  const engine = mergeEngineState(world, state);
  const light = lightingMap[engine.lighting] ?? lightingMap['purple-neon'];

  return (
    <main
      className={`harmonic-engine-shell engine-${engine.world} engine-emotion-${engine.emotion} relative isolate min-h-screen overflow-hidden ${className}`}
      data-world={engine.world}
      data-emotion={engine.emotion}
      data-environment={engine.environment}
      style={
        {
          '--engine-light': light,
          '--engine-aura': `${engine.aura}%`,
          '--engine-fog': `${engine.fog}%`,
          '--engine-bloom': `${engine.bloom}%`,
          '--engine-grain': `${engine.grain}%`,
          '--engine-motion': `${engine.motionIntensity}%`,
          '--engine-particles': `${engine.particleDensity}%`,
          '--engine-depth': `${engine.sectionDepth}%`,
        } as CSSProperties
      }
    >
      <div className="engine-environment absolute inset-0 -z-30" />
      <div className="engine-lighting absolute inset-0 -z-20" />
      <div className="engine-fog absolute inset-0 -z-10" />
      <div className="engine-grain pointer-events-none absolute inset-0 z-0" />
      <div className="engine-scan pointer-events-none absolute inset-0 z-0" />
      {children}
    </main>
  );
}
