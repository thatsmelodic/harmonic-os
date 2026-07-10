'use client';

import { useEffect, useState } from 'react';
import {
  defaultClimateSettings,
  readWorldClimate,
  saveWorldClimate,
  type ClimateMode,
  type ClimateSettings,
  type WorldClimatePreference,
} from '@/lib/world-climate';

const modes: Array<{ id: ClimateMode; label: string }> = [
  { id: 'off', label: 'Off' },
  { id: 'spring', label: 'Spring' },
  { id: 'summer', label: 'Summer' },
  { id: 'fall', label: 'Fall' },
  { id: 'winter', label: 'Winter' },
  { id: 'rain', label: 'Rain' },
  { id: 'custom', label: 'Custom Visual' },
];

export function FriedEmClimateStudio() {
  const [preference, setPreference] = useState<WorldClimatePreference>({ followGlobal: true, override: defaultClimateSettings });
  const [message, setMessage] = useState('');
  const settings = preference.override;

  useEffect(() => {
    setPreference(readWorldClimate('fried-em'));
  }, []);

  const patchSettings = (patch: Partial<ClimateSettings>) => setPreference((current) => ({ ...current, override: { ...current.override, ...patch } }));

  const save = () => {
    saveWorldClimate('fried-em', preference);
    setMessage(preference.followGlobal ? 'Fried Em now follows the global Living Seasons engine.' : 'Fried Em custom climate override saved.');
  };

  const reset = () => {
    const next = { followGlobal: true, override: defaultClimateSettings };
    setPreference(next);
    saveWorldClimate('fried-em', next);
    setMessage('Fried Em reset to follow the global Living Seasons engine.');
  };

  return (
    <section className="rounded-[2.8rem] border border-orange-300/15 bg-black/55 p-6 text-white shadow-[0_0_80px_rgba(255,122,26,.16)] backdrop-blur-2xl sm:p-10">
      <div>
        <p className="text-xs font-black uppercase tracking-[.34em] text-orange-200/45">World Climate Override</p>
        <h1 className="mt-4 text-5xl font-black tracking-[-.07em] sm:text-7xl">Follow the world—or break away.</h1>
        <p className="mt-4 max-w-3xl text-base leading-8 text-white/55">Living Seasons controls the global atmosphere. Fried Em can follow it automatically or use a custom override with its own weather, visuals, scale, motion, and transition timing.</p>
      </div>

      {message && <p className="mt-6 rounded-2xl border border-orange-300/15 bg-orange-400/10 px-4 py-3 text-sm text-orange-100/80">{message}</p>}

      <div className="mt-8 rounded-[1.8rem] border border-white/10 bg-white/[.035] p-5">
        <label className="flex items-center justify-between gap-4"><span><span className="block text-sm font-black">Follow Harmonic Living Seasons</span><span className="mt-1 block text-xs text-white/35">When enabled, global Spring, Summer, Fall, Winter, weather, and custom particles control Fried Em.</span></span><input type="checkbox" checked={preference.followGlobal} onChange={(event) => setPreference({ ...preference, followGlobal: event.target.checked })} className="h-5 w-5" /></label>
      </div>

      <div className={`mt-6 grid gap-6 lg:grid-cols-[1fr_.9fr] ${preference.followGlobal ? 'opacity-45' : ''}`}>
        <div className="rounded-[2rem] border border-white/10 bg-white/[.035] p-6">
          <p className="text-xs font-black uppercase tracking-[.22em] text-white/30">Fried Em Override</p>
          <div className="mt-4 flex flex-wrap gap-2">{modes.map((mode) => <button disabled={preference.followGlobal} key={mode.id} onClick={() => patchSettings({ mode: mode.id })} className={`rounded-full px-4 py-2 text-xs font-black ${settings.mode === mode.id ? 'bg-orange-400 text-black' : 'border border-white/10 bg-white/[.04] text-white/55'}`}>{mode.label}</button>)}</div>

          {settings.mode === 'custom' && <label className="mt-5 block text-xs font-black uppercase tracking-[.16em] text-white/35">Custom image URL
            <input disabled={preference.followGlobal} value={settings.customVisualUrl} onChange={(event) => patchSettings({ customVisualUrl: event.target.value })} placeholder="https://example.com/leaf.png" className="mt-2 w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-white outline-none" />
            <span className="mt-2 block normal-case tracking-normal text-white/30">Transparent PNGs, GIFs, or SVGs inherit the same falling, spinning, wind, glow, and scale behavior.</span>
          </label>}

          <Slider disabled={preference.followGlobal} label="Visual size" value={settings.particleSize} min={12} max={240} suffix="px" onChange={(particleSize) => patchSettings({ particleSize })} />
          <Slider disabled={preference.followGlobal} label="Amount on screen" value={settings.density} min={1} max={100} suffix=" particles" onChange={(density) => patchSettings({ density })} />
          <Slider disabled={preference.followGlobal} label="Fall speed" value={settings.speed} min={2} max={30} suffix="s" onChange={(speed) => patchSettings({ speed })} />
          <Slider disabled={preference.followGlobal} label="Opacity" value={Math.round(settings.opacity * 100)} min={10} max={100} suffix="%" onChange={(opacity) => patchSettings({ opacity: opacity / 100 })} />
          <Slider disabled={preference.followGlobal} label="Wind drift" value={settings.wind} min={0} max={180} suffix="px" onChange={(wind) => patchSettings({ wind })} />
          <Slider disabled={preference.followGlobal} label="Rotation" value={settings.rotation} min={0} max={1080} suffix="°" onChange={(rotation) => patchSettings({ rotation })} />
          <Slider disabled={preference.followGlobal} label="Glow" value={settings.glow} min={0} max={40} suffix="px" onChange={(glow) => patchSettings({ glow })} />
          <Slider disabled={preference.followGlobal} label="Transition duration" value={settings.transitionDays} min={0} max={14} suffix=" days" onChange={(transitionDays) => patchSettings({ transitionDays })} />

          <div className="mt-6 flex flex-wrap gap-3"><button onClick={save} className="rounded-full bg-orange-400 px-6 py-3 text-sm font-black text-black">Save Climate Behavior</button><button onClick={reset} className="rounded-full border border-white/10 bg-white/[.04] px-6 py-3 text-sm font-black text-white/65">Reset to Global</button></div>
        </div>

        <article className="relative min-h-[540px] overflow-hidden rounded-[2rem] border border-white/10 bg-[radial-gradient(circle_at_top,rgba(255,122,26,.22),transparent_24rem),linear-gradient(to_bottom,#120704,#020202)] p-6">
          <p className="relative z-10 text-xs font-black uppercase tracking-[.22em] text-orange-200/45">Override Preview</p>
          <h2 className="relative z-10 mt-3 text-4xl font-black tracking-[-.06em]">{preference.followGlobal ? 'Following Living Seasons' : settings.mode === 'custom' ? 'Your visual' : settings.mode}</h2>
          <div className="relative z-10 mt-5 rounded-2xl border border-white/10 bg-black/25 p-4 text-sm leading-7 text-white/50">Custom visuals can scale up to 240px and inherit wind, rotation, glow, opacity, and transition behavior.</div>
          {!preference.followGlobal && <div className="absolute inset-0 flex items-center justify-center opacity-80">{settings.mode === 'custom' && settings.customVisualUrl ? <img src={settings.customVisualUrl} alt="Custom visual preview" style={{ width: settings.particleSize, height: settings.particleSize, objectFit: 'contain', filter: `drop-shadow(0 0 ${settings.glow}px rgba(255,255,255,.6))` }} /> : <span style={{ fontSize: settings.particleSize }}>{settings.mode === 'spring' ? '🌸' : settings.mode === 'summer' ? '✨' : settings.mode === 'winter' ? '❄️' : settings.mode === 'rain' ? '💧' : settings.mode === 'off' ? '◌' : '🍂'}</span>}</div>}
        </article>
      </div>
    </section>
  );
}

function Slider({ label, value, min, max, suffix, onChange, disabled = false }: { label: string; value: number; min: number; max: number; suffix: string; onChange: (value: number) => void; disabled?: boolean }) {
  return <label className="mt-5 block text-xs font-black uppercase tracking-[.16em] text-white/35"><span className="flex justify-between gap-4"><span>{label}</span><span className="text-orange-200">{value}{suffix}</span></span><input disabled={disabled} type="range" min={min} max={max} value={value} onChange={(event) => onChange(Number(event.target.value))} className="mt-3 w-full" /></label>;
}
