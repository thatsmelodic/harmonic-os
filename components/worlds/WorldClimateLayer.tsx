'use client';

import { useEffect, useMemo, useState } from 'react';
import {
  climateUpdateEvent,
  defaultClimateSettings,
  resolveWorldClimate,
  type ClimateMode,
  type ClimateSettings,
} from '@/lib/world-climate';

const builtInVisuals: Record<Exclude<ClimateMode, 'off' | 'custom'>, string> = {
  spring: '🌸',
  summer: '✨',
  fall: '🍂',
  winter: '❄️',
  rain: '💧',
};

export function WorldClimateLayer({ worldId = 'fried-em' }: { worldId?: string }) {
  const [settings, setSettings] = useState<ClimateSettings>(defaultClimateSettings);

  useEffect(() => {
    const sync = () => setSettings(resolveWorldClimate(worldId));
    sync();
    window.addEventListener(climateUpdateEvent, sync);
    window.addEventListener('storage', sync);
    return () => {
      window.removeEventListener(climateUpdateEvent, sync);
      window.removeEventListener('storage', sync);
    };
  }, [worldId]);

  const particles = useMemo(() => Array.from({ length: Math.max(0, Math.min(100, settings.density)) }, (_, index) => ({
    id: index,
    left: (index * 37.17) % 100,
    delay: -((index * 1.73) % Math.max(2, settings.speed)),
    duration: Math.max(2, settings.speed * (0.65 + ((index % 7) / 10))),
    drift: ((index % 2 ? 1 : -1) * settings.wind * (0.55 + ((index % 5) / 10))),
    scale: 0.72 + ((index % 6) / 10),
  })), [settings]);

  if (settings.mode === 'off') return null;

  const custom = settings.mode === 'custom' && settings.customVisualUrl.trim();
  const symbol = settings.mode !== 'custom' ? builtInVisuals[settings.mode] : '';

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-[45] overflow-hidden">
      {settings.mode === 'summer' && <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_12%,rgba(255,181,76,.2),transparent_34rem)] mix-blend-screen" />}
      {settings.mode === 'winter' && <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(145,190,255,.08),transparent_45%)]" />}
      {settings.mode === 'rain' && <div className="absolute inset-0 bg-[linear-gradient(115deg,transparent,rgba(120,180,255,.08),transparent)]" />}
      {particles.map((particle) => (
        <span
          key={particle.id}
          className="absolute -top-24 animate-[harmonicWeatherFall_linear_infinite] will-change-transform"
          style={{
            left: `${particle.left}%`,
            animationDelay: `${particle.delay}s`,
            animationDuration: `${particle.duration}s`,
            opacity: settings.opacity,
            filter: settings.glow ? `drop-shadow(0 0 ${settings.glow}px rgba(255,255,255,.55))` : undefined,
            ['--harmonic-drift' as string]: `${particle.drift}px`,
            ['--harmonic-rotation' as string]: `${settings.rotation}deg`,
            transform: `scale(${particle.scale})`,
          }}
        >
          {custom ? (
            <img src={settings.customVisualUrl} alt="" draggable={false} style={{ width: `${settings.particleSize}px`, height: `${settings.particleSize}px`, objectFit: 'contain' }} />
          ) : (
            <span style={{ fontSize: `${settings.particleSize}px`, lineHeight: 1 }}>{symbol}</span>
          )}
        </span>
      ))}
      <style jsx global>{`
        @keyframes harmonicWeatherFall {
          0% { transform: translate3d(0,-12vh,0) rotate(0deg); }
          50% { transform: translate3d(var(--harmonic-drift),52vh,0) rotate(calc(var(--harmonic-rotation) * .5)); }
          100% { transform: translate3d(calc(var(--harmonic-drift) * -0.5),112vh,0) rotate(var(--harmonic-rotation)); }
        }
      `}</style>
    </div>
  );
}
