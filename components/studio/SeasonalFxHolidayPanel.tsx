'use client';

import { useEffect, useState } from 'react';
import type { HarmonicEngineState, HarmonicWorldId } from '@/lib/harmonic-engine';
import { holidayEventProfiles, seasonalFxProfiles } from '@/lib/seasonal-fx-engine';
import type { SeasonKey } from '@/lib/seasonal-transition-engine';
import {
  defaultClimateSettings,
  readGlobalClimate,
  saveGlobalClimate,
  type ClimateMode,
  type ClimateSettings,
} from '@/lib/world-climate';

const seasons: SeasonKey[] = ['spring', 'summer', 'fall', 'winter'];

export function SeasonalFxHolidayPanel({ world, onApply }: { world: HarmonicWorldId; onApply?: (patch: Partial<HarmonicEngineState>, label: string) => void }) {
  const [approvedIds, setApprovedIds] = useState<string[]>([]);
  const [climate, setClimate] = useState<ClimateSettings>(defaultClimateSettings);
  const [message, setMessage] = useState('');

  useEffect(() => setClimate(readGlobalClimate()), []);

  function toggle(id: string) {
    setApprovedIds((current) => current.includes(id) ? current.filter((item) => item !== id) : [...current, id]);
  }

  function activateSeason(season: SeasonKey) {
    const presets: Record<SeasonKey, Partial<ClimateSettings>> = {
      spring: { mode: 'spring', density: 30, particleSize: 58, speed: 13, wind: 24, glow: 8 },
      summer: { mode: 'summer', density: 20, particleSize: 34, speed: 16, wind: 10, glow: 22 },
      fall: { mode: 'fall', density: 34, particleSize: 70, speed: 11, wind: 46, glow: 6 },
      winter: { mode: 'winter', density: 42, particleSize: 48, speed: 15, wind: 18, glow: 16 },
    };
    const next = { ...climate, ...presets[season] };
    setClimate(next);
    saveGlobalClimate(next);
    const profile = seasonalFxProfiles[season];
    onApply?.(profile.patch, profile.title);
    setMessage(`${profile.title} is now the global Living Season for every world following Harmonic Engine.`);
  }

  function saveCustomVisual() {
    saveGlobalClimate(climate);
    setMessage('Global custom visual and climate motion saved. All connected worlds updated.');
  }

  return (
    <article className="rounded-[2rem] border border-purple-200/20 bg-[linear-gradient(135deg,rgba(183,108,255,.12),rgba(0,0,0,.35))] p-5 backdrop-blur-2xl">
      <p className="text-xs font-black uppercase tracking-[.28em] text-purple-100/50">Harmonic Engine / Global Climate</p>
      <h3 className="mt-3 text-3xl font-black tracking-[-.06em]">Living Seasons</h3>
      <p className="mt-2 max-w-3xl text-sm leading-7 text-white/58">This is now the master season system. Changes save globally and every world set to “Follow Harmonic Living Seasons” updates from the same atmosphere.</p>

      {message && <p className="mt-4 rounded-2xl border border-purple-200/15 bg-purple-300/10 px-4 py-3 text-sm text-purple-100/75">{message}</p>}

      <div className="mt-5 grid gap-4 lg:grid-cols-4">
        {seasons.map((season) => {
          const profile = seasonalFxProfiles[season];
          const active = climate.mode === season;
          return (
            <section key={profile.season} className={`rounded-2xl border p-4 ${active ? 'border-purple-200/45 bg-purple-300/10' : 'border-white/10 bg-black/25'}`}>
              <div className="flex flex-wrap items-start justify-between gap-3"><div><p className="text-xs font-black uppercase tracking-[.22em] text-white/35">{profile.season}</p><h4 className="mt-2 text-xl font-black tracking-[-.04em] text-white/82">{profile.title}</h4></div>{active && <span className="rounded-full bg-purple-300 px-3 py-1 text-[.65rem] font-black text-black">Global Active</span>}</div>
              <p className="mt-3 text-xs leading-6 text-white/50">{profile.identity}</p>
              <p className="mt-3 text-[.65rem] font-black uppercase tracking-[.16em] text-purple-100/45">{world.replace('-', ' ')} behavior</p>
              <p className="mt-1 text-xs leading-6 text-white/45">{profile.worldBehavior[world].join(' • ')}</p>
              <button type="button" onClick={() => activateSeason(season)} className="mt-4 rounded-full bg-purple-300 px-4 py-2 text-xs font-black text-black">Activate Globally</button>
            </section>
          );
        })}
      </div>

      <section className="mt-6 rounded-[1.8rem] border border-white/10 bg-black/25 p-5">
        <div className="flex flex-wrap items-end justify-between gap-4"><div><p className="text-xs font-black uppercase tracking-[.22em] text-purple-100/45">Custom Visual Studio</p><h4 className="mt-2 text-2xl font-black">Use your own atmosphere.</h4><p className="mt-2 text-sm text-white/45">Paste a transparent PNG, GIF, or SVG and it inherits the same movement across connected worlds.</p></div><button onClick={saveCustomVisual} className="rounded-full bg-purple-300 px-5 py-3 text-sm font-black text-black">Save Global Visual</button></div>
        <div className="mt-5 grid gap-4 lg:grid-cols-2">
          <label className="text-xs font-black uppercase tracking-[.16em] text-white/35">Effect mode<select value={climate.mode} onChange={(event) => setClimate({ ...climate, mode: event.target.value as ClimateMode })} className="mt-2 w-full rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-white"><option value="spring">Spring</option><option value="summer">Summer</option><option value="fall">Fall</option><option value="winter">Winter</option><option value="rain">Rain</option><option value="custom">Custom Visual</option><option value="off">Off</option></select></label>
          <label className="text-xs font-black uppercase tracking-[.16em] text-white/35">Custom image URL<input value={climate.customVisualUrl} onChange={(event) => setClimate({ ...climate, customVisualUrl: event.target.value })} placeholder="https://example.com/leaves.png" className="mt-2 w-full rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-white" /></label>
        </div>
        <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4"><Slider label="Size" value={climate.particleSize} min={12} max={240} suffix="px" onChange={(particleSize) => setClimate({ ...climate, particleSize })} /><Slider label="Density" value={climate.density} min={1} max={100} suffix="" onChange={(density) => setClimate({ ...climate, density })} /><Slider label="Wind" value={climate.wind} min={0} max={180} suffix="px" onChange={(wind) => setClimate({ ...climate, wind })} /><Slider label="Transition" value={climate.transitionDays} min={0} max={14} suffix=" days" onChange={(transitionDays) => setClimate({ ...climate, transitionDays })} /></div>
      </section>

      <div className="mt-6">
        <p className="text-xs font-black uppercase tracking-[.28em] text-white/40">Holiday + Cultural Event Layer</p>
        <div className="mt-4 grid gap-4 lg:grid-cols-3">
          {holidayEventProfiles.map((event) => {
            const approved = approvedIds.includes(event.id);
            return <section key={event.id} className="rounded-2xl border border-white/10 bg-black/25 p-4"><div className="flex flex-wrap items-start justify-between gap-3"><div><p className="text-xs font-black uppercase tracking-[.22em] text-white/35">{event.layer} / {event.timing}</p><h4 className="mt-2 text-xl font-black tracking-[-.04em] text-white/82">{event.title}</h4></div><button type="button" onClick={() => toggle(event.id)} className="rounded-full border border-purple-200/20 px-3 py-1 text-xs font-black text-purple-100/70">{approved ? 'Approved' : 'Approve'}</button></div>{event.respectfulNote && <p className="mt-3 rounded-xl border border-purple-200/10 bg-purple-200/[.05] p-3 text-xs leading-6 text-purple-100/58">{event.respectfulNote}</p>}<p className="mt-3 text-xs leading-6 text-white/45">{event.visualFx.join(' • ')}</p><button type="button" disabled={!approved || !onApply} onClick={() => onApply?.(event.patch, event.title)} className="mt-4 rounded-full bg-purple-300 px-4 py-2 text-xs font-black text-black disabled:opacity-35">Apply Event Layer</button></section>;
          })}
        </div>
      </div>
    </article>
  );
}

function Slider({ label, value, min, max, suffix, onChange }: { label: string; value: number; min: number; max: number; suffix: string; onChange: (value: number) => void }) {
  return <label className="text-xs font-black uppercase tracking-[.16em] text-white/35"><span className="flex justify-between"><span>{label}</span><span className="text-purple-100">{value}{suffix}</span></span><input type="range" min={min} max={max} value={value} onChange={(event) => onChange(Number(event.target.value))} className="mt-3 w-full" /></label>;
}
