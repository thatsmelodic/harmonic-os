'use client';

import { useEffect, useMemo, useState } from 'react';

export type ClimateMode = 'off' | 'spring' | 'summer' | 'fall' | 'winter' | 'rain' | 'custom';

export type ClimateSettings = {
  mode: ClimateMode;
  customVisualUrl: string;
  particleSize: number;
  density: number;
  speed: number;
  opacity: number;
  wind: number;
};

export const friedEmClimateStorageKey = 'harmonic:climate:fried-em';

export const defaultClimateSettings: ClimateSettings = {
  mode: 'fall',
  customVisualUrl: '',
  particleSize: 42,
  density: 24,
  speed: 12,
  opacity: 0.82,
  wind: 18,
};

function readSettings(): ClimateSettings {
  if (typeof window === 'undefined') return defaultClimateSettings;
  try {
    const saved = window.localStorage.getItem(friedEmClimateStorageKey);
    return saved ? { ...defaultClimateSettings, ...JSON.parse(saved) } : defaultClimateSettings;
  } catch {
    return defaultClimateSettings;
  }
}

const builtInVisuals: Record<Exclude<ClimateMode, 'off' | 'custom'>, string> = {
  spring: '🌸',
  summer: '☀️',
  fall: '🍂',
  winter: '❄️',
  rain: '💧',
};

export function WorldClimateLayer() {
  const [settings, setSettings] = useState<ClimateSettings>(defaultClimateSettings);

  useEffect(() => {
    setSettings(readSettings());
    const sync = () => setSettings(readSettings());
    window.addEventListener('harmonic-climate-update', sync);
    window.addEventListener('storage', sync);
    return () => {
      window.removeEventListener('harmonic-climate-update', sync);
      window.removeEventListener('storage', sync);
    };
  }, []);

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
      {settings.mode === 'summer' && <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_12%,rgba(255,181,76,.18),transparent_34rem)] mix-blend-screen" />}
      {settings.mode === 'rain' && <div className="absolute inset-0 bg-[linear-gradient(115deg,transparent,rgba(120,180,255,.06),transparent)]" />}
      {particles.map((particle) => (
        <span
          key={particle.id}
          className="absolute -top-24 animate-[harmonicWeatherFall_linear_infinite] will-change-transform"
          style={{
            left: `${particle.left}%`,
            animationDelay: `${particle.delay}s`,
            animationDuration: `${particle.duration}s`,
            opacity: settings.opacity,
            ['--harmonic-drift' as string]: `${particle.drift}px`,
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
          50% { transform: translate3d(var(--harmonic-drift),52vh,0) rotate(180deg); }
          100% { transform: translate3d(calc(var(--harmonic-drift) * -0.5),112vh,0) rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
