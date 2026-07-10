'use client';

import { useEffect, useState } from 'react';
import {
  defaultClimateSettings,
  friedEmClimateStorageKey,
  type ClimateMode,
  type ClimateSettings,
} from '@/components/worlds/WorldClimateLayer';

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
  const [settings, setSettings] = useState<ClimateSettings>(defaultClimateSettings);
  const [message, setMessage] = useState('');

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(friedEmClimateStorageKey);
      if (saved) setSettings({ ...defaultClimateSettings, ...JSON.parse(saved) });
    } catch {
      setSettings(defaultClimateSettings);
    }
  }, []);

  const save = () => {
    window.localStorage.setItem(friedEmClimateStorageKey, JSON.stringify(settings));
    window.dispatchEvent(new Event('harmonic-climate-update'));
    setMessage('Climate visuals saved and pushed live on this device.');
  };

  const reset = () => {
    setSettings(defaultClimateSettings);
    window.localStorage.setItem(friedEmClimateStorageKey, JSON.stringify(defaultClimateSettings));
    window.dispatchEvent(new Event('harmonic-climate-update'));
    setMessage('Climate visuals reset to the Fried Em fall default.');
  };

  return (
    <section className="rounded-[2.8rem] border border-orange-300/15 bg-black/55 p-6 text-white shadow-[0_0_80px_rgba(255,122,26,.16)] backdrop-blur-2xl sm:p-10">
      <div>
        <p className="text-xs font-black uppercase tracking-[.34em] text-orange-200/45">World Climate Engine</p>
        <h1 className="mt-4 text-5xl font-black tracking-[-.07em] sm:text-7xl">Control the atmosphere.</h1>
        <p className="mt-4 max-w-3xl text-base leading-8 text-white/55">Choose a season, paste your own transparent PNG or GIF from online, and control how large, dense, fast, visible, and windy the effect feels.</p>
      </div>

      {message && <p className="mt-6 rounded-2xl border border-orange-300/15 bg-orange-400/10 px-4 py-3 text-sm text-orange-100/80">{message}</p>}

      <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_.9fr]">
        <div className="rounded-[2rem] border border-white/10 bg-white/[.035] p-6">
          <p className="text-xs font-black uppercase tracking-[.22em] text-white/30">Season / Effect</p>
          <div className="mt-4 flex flex-wrap gap-2">{modes.map((mode) => <button key={mode.id} onClick={() => setSettings({ ...settings, mode: mode.id })} className={`rounded-full px-4 py-2 text-xs font-black ${settings.mode === mode.id ? 'bg-orange-400 text-black' : 'border border-white/10 bg-white/[.04] text-white/55'}`}>{mode.label}</button>)}</div>

          {settings.mode === 'custom' && <label className="mt-5 block text-xs font-black uppercase tracking-[.16em] text-white/35">Custom image URL
            <input value={settings.customVisualUrl} onChange={(event) => setSettings({ ...settings, customVisualUrl: event.target.value })} placeholder="https://example.com/leaf.png" className="mt-2 w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-white outline-none" />
            <span className="mt-2 block normal-case tracking-normal text-white/30">Transparent PNGs and GIFs work best. The image will inherit the same falling, spinning, and wind effects.</span>
          </label>}

          <Slider label="Visual size" value={settings.particleSize} min={12} max={180} suffix="px" onChange={(particleSize) => setSettings({ ...settings, particleSize })} />
          <Slider label="Amount on screen" value={settings.density} min={1} max={100} suffix=" particles" onChange={(density) => setSettings({ ...settings, density })} />
          <Slider label="Fall speed" value={settings.speed} min={2} max={30} suffix="s" onChange={(speed) => setSettings({ ...settings, speed })} />
          <Slider label="Opacity" value={Math.round(settings.opacity * 100)} min={10} max={100} suffix="%" onChange={(opacity) => setSettings({ ...settings, opacity: opacity / 100 })} />
          <Slider label="Wind drift" value={settings.wind} min={0} max={120} suffix="px" onChange={(wind) => setSettings({ ...settings, wind })} />

          <div className="mt-6 flex flex-wrap gap-3"><button onClick={save} className="rounded-full bg-orange-400 px-6 py-3 text-sm font-black text-black">Save Climate</button><button onClick={reset} className="rounded-full border border-white/10 bg-white/[.04] px-6 py-3 text-sm font-black text-white/65">Reset</button></div>
        </div>

        <article className="relative min-h-[540px] overflow-hidden rounded-[2rem] border border-white/10 bg-[radial-gradient(circle_at_top,rgba(255,122,26,.22),transparent_24rem),linear-gradient(to_bottom,#120704,#020202)] p-6">
          <div className="absolute inset-x-0 bottom-0 h-44 bg-[linear-gradient(to_top,rgba(255,255,255,.06),transparent)]" />
          <p className="relative z-10 text-xs font-black uppercase tracking-[.22em] text-orange-200/45">Live Scale Preview</p>
          <h2 className="relative z-10 mt-3 text-4xl font-black tracking-[-.06em]">{settings.mode === 'custom' ? 'Your visual' : settings.mode}</h2>
          <div className="relative z-10 mt-5 rounded-2xl border border-white/10 bg-black/25 p-4 text-sm leading-7 text-white/50">Size can now go up to 180px, so leaves, snowflakes, logos, petals, or any other visual do not have to stay tiny.</div>
          <div className="absolute inset-0 flex items-center justify-center opacity-80">
            {settings.mode === 'custom' && settings.customVisualUrl ? <img src={settings.customVisualUrl} alt="Custom visual preview" style={{ width: settings.particleSize, height: settings.particleSize, objectFit: 'contain' }} /> : <span style={{ fontSize: settings.particleSize }}>{settings.mode === 'spring' ? '🌸' : settings.mode === 'summer' ? '☀️' : settings.mode === 'winter' ? '❄️' : settings.mode === 'rain' ? '💧' : settings.mode === 'off' ? '◌' : '🍂'}</span>}
          </div>
        </article>
      </div>
    </section>
  );
}

function Slider({ label, value, min, max, suffix, onChange }: { label: string; value: number; min: number; max: number; suffix: string; onChange: (value: number) => void }) {
  return <label className="mt-5 block text-xs font-black uppercase tracking-[.16em] text-white/35"><span className="flex justify-between gap-4"><span>{label}</span><span className="text-orange-200">{value}{suffix}</span></span><input type="range" min={min} max={max} value={value} onChange={(event) => onChange(Number(event.target.value))} className="mt-3 w-full" /></label>;
}
