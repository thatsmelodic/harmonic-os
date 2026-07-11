'use client';

import { usePathname } from 'next/navigation';
import { useMemo } from 'react';
import { resolveAtmosphere, worldFromPathname } from '@/lib/harmonic-atmosphere';
import { useAtmosphere } from './AtmosphereProvider';
import './GlobalAtmosphereLayer.css';

const glyphs = {
  notes: ['♪', '♫', '♬', '♩'],
  leaves: ['🍂', '🍁', '✦', '◆'],
  snow: ['❄', '✦', '·', '❅'],
  sparks: ['✦', '•', '✧', '⋆'],
  lettuce: ['🥬', '🌿', '·', '✦'],
  thread: ['〰', '∞', '✦', '⌁'],
  petals: ['✿', '❀', '·', '✦'],
  custom: [''],
} as const;

export function GlobalAtmosphereLayer() {
  const pathname = usePathname();
  const { state } = useAtmosphere();
  const world = worldFromPathname(pathname);
  const settings = resolveAtmosphere(state, world);
  const count = Math.max(6, Math.round((settings.particleAmount / 100) * 36));
  const items = glyphs[settings.particlePreset as keyof typeof glyphs] ?? glyphs.sparks;

  const particles = useMemo(() => Array.from({ length: count }), [count]);

  return (
    <div
      className={`harmonic-atmosphere atmosphere-${world} season-${settings.season} time-${settings.time} weather-${settings.weather}`}
      style={{
        '--atmosphere-glow': settings.glow / 100,
        '--atmosphere-blur': `${settings.blur}px`,
        '--particle-size': `${12 + settings.particleSize * 0.55}px`,
        '--particle-speed': `${Math.max(5, 20 - settings.particleSpeed * 0.13)}s`,
        backgroundImage: settings.backgroundUrl ? `linear-gradient(rgba(0,0,0,.18),rgba(0,0,0,.28)),url(${settings.backgroundUrl})` : undefined,
      } as React.CSSProperties}
      data-audio-reactive={settings.audioReactive}
      aria-hidden="true"
    >
      <div className="atmosphere-light" />
      <div className="atmosphere-weather" />
      <div className="atmosphere-particles">
        {particles.map((_, index) => (
          <span
            key={index}
            className="atmosphere-particle"
            style={{
              left: `${(index * 17 + 7) % 100}%`,
              animationDelay: `${(index % 12) * -0.9}s`,
              animationDuration: `${Math.max(4, 13 - settings.particleSpeed / 15 + (index % 6))}s`,
              opacity: 0.22 + (index % 5) * 0.12,
              transform: `scale(${0.65 + (index % 5) * 0.18})`,
            }}
          >
            {settings.particlePreset === 'custom' && settings.customParticleUrl ? (
              <img src={settings.customParticleUrl} alt="" />
            ) : items[index % items.length]}
          </span>
        ))}
      </div>
    </div>
  );
}
