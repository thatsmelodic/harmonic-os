'use client';

import { useEffect, useState } from 'react';
import {
  applySeasonEmotion,
  getSeasonWorldSignal,
  seasonDefaults,
  type SeasonKey,
  type SeasonalHoliday,
  type SeasonalWeather,
  type SeasonState,
  type TimeOfDay,
} from '@/lib/harmonic-seasons';
import { type HarmonicWorldId } from '@/lib/harmonic-engine';
import { useSeason } from '@/components/seasons/SeasonProvider';
import {
  defaultClimateSettings,
  readGlobalClimate,
  saveGlobalClimate,
  type ClimateSettings,
} from '@/lib/world-climate';

const seasons: SeasonKey[] = ['spring', 'summer', 'autumn', 'winter'];
const times: TimeOfDay[] = ['morning', 'afternoon', 'evening', 'night'];
const weatherOptions: SeasonalWeather[] = ['clear', 'mist', 'drizzle', 'rain', 'wind', 'leaf-storm', 'first-frost', 'snow'];
const holidays: SeasonalHoliday[] = ['none', 'halloween', 'thanksgiving', 'black-friday', 'autumn-festival', 'winter-solstice', 'spring-bloom', 'summer-block-party'];
const worlds: HarmonicWorldId[] = ['melodic', 'harmonic', 'fried-em', 'schmackin'];

const climateModeBySeason: Record<SeasonKey, ClimateSettings['mode']> = {
  spring: 'spring',
  summer: 'summer',
  autumn: 'fall',
  winter: 'winter',
};

export function SeasonMissionControl() {
  const { season, setSeasonKey, updateSeason } = useSeason();
  const [previewWorld, setPreviewWorld] = useState<HarmonicWorldId>('schmackin');
  const [climate, setClimate] = useState<ClimateSettings>(defaultClimateSettings);
  const [message, setMessage] = useState('');

  useEffect(() => setClimate(readGlobalClimate()), []);

  function changeSeason(nextSeason: SeasonKey) {
    setSeasonKey(nextSeason);
    const nextClimate = { ...climate, mode: climateModeBySeason[nextSeason] };
    setClimate(nextClimate);
    saveGlobalClimate(nextClimate);
    setMessage(`${seasonDefaults[nextSeason].name} is now active globally.`);
  }

  function patch(patchState: Partial<SeasonState>) {
    updateSeason(patchState);
  }

  function patchClimate(patchState: Partial<ClimateSettings>) {
    const next = { ...climate, ...patchState };
    setClimate(next);
    saveGlobalClimate(next);
  }

  const particleLabel = season.season === 'autumn' ? 'Leaves' : season.season === 'winter' ? 'Snow' : season.season === 'spring' ? 'Petals' : 'Summer Particles';

  return (
    <section className="mt-5 rounded-[2.5rem] border border-orange-200/10 bg-[linear-gradient(135deg,rgba(255,159,28,.16),rgba(183,108,255,.10),rgba(255,255,255,.035))] p-5 shadow-purple-glow backdrop-blur-2xl sm:p-7">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-xs font-black uppercase tracking-[.34em] text-orange-100/50">Season Engine</p>
          <h2 className="mt-3 text-3xl font-black tracking-[-.06em] sm:text-5xl">Living Seasons</h2>
          <p className="mt-3 max-w-3xl text-sm leading-7 text-orange-50/62">Season selection, atmosphere, weather, particle sizing, density, wind, and world interpretation now live together in one control center.</p>
        </div>
        <div className="rounded-2xl border border-orange-200/15 bg-black/30 p-4 text-right"><p className="font-mono text-xs uppercase tracking-[.22em] text-white/35">Global Active</p><p className="mt-1 text-2xl font-black tracking-[-.05em] text-orange-100">{season.name}</p></div>
      </div>

      {message && <p className="mt-4 rounded-2xl border border-orange-200/15 bg-orange-300/10 px-4 py-3 text-sm text-orange-50/75">{message}</p>}

      <div className="mt-5 grid gap-3 sm:grid-cols-4">{seasons.map((item) => <button key={item} type="button" onClick={() => changeSeason(item)} className="rounded-2xl border p-4 text-left capitalize transition hover:-translate-y-1" style={{ borderColor: season.season === item ? 'rgba(255,159,28,.72)' : 'rgba(255,255,255,.10)', background: season.season === item ? 'rgba(255,159,28,.15)' : 'rgba(255,255,255,.04)' }}><p className="text-lg font-black">{item}</p><p className="mt-2 text-xs font-mono uppercase tracking-[.18em] text-white/35">{seasonDefaults[item].philosophy.split(',')[0]}</p></button>)}</div>

      <div className="mt-5 grid gap-5 xl:grid-cols-[.95fr_1.05fr]">
        <div className="grid gap-5">
          <SeasonPanel title="Atmosphere" eyebrow="Weather + Time">
            <SelectControl label="Time of Day" value={season.timeOfDay} options={times} onChange={(value) => patch({ timeOfDay: value as TimeOfDay })} />
            <SelectControl label="Weather" value={season.weather} options={weatherOptions} onChange={(value) => patch({ weather: value as SeasonalWeather })} />
            <SelectControl label="Holiday / Event" value={season.holiday} options={holidays} onChange={(value) => patch({ holiday: value as SeasonalHoliday })} />
            <RangeControl label="Season Arrival" value={season.arrivalProgress} onChange={(value) => patch({ arrivalProgress: value })} />
          </SeasonPanel>

          <SeasonPanel title={`${season.name} Detail Center`} eyebrow="Season Visual Controls">
            <p className="text-sm leading-6 text-white/45">“Particles” means the individual falling visuals—leaves, snowflakes, petals, embers, or your uploaded image.</p>
            <PixelRangeControl label={`${particleLabel} Size`} value={climate.particleSize} min={12} max={240} suffix="px" onChange={(particleSize) => patchClimate({ particleSize })} />
            <RangeControl label={`${particleLabel} Amount`} value={climate.density} onChange={(density) => patchClimate({ density })} />
            <RangeControl label="Wind Intelligence" value={season.windIntensity} onChange={(value) => { patch({ windIntensity: value }); patchClimate({ wind: Math.round(value * 1.8) }); }} />
            <RangeControl label="Visual Opacity" value={Math.round(climate.opacity * 100)} onChange={(opacity) => patchClimate({ opacity: opacity / 100 })} />
            <PixelRangeControl label="Glow" value={climate.glow} min={0} max={40} suffix="px" onChange={(glow) => patchClimate({ glow })} />
            <PixelRangeControl label="Rotation" value={climate.rotation} min={0} max={1080} suffix="°" onChange={(rotation) => patchClimate({ rotation })} />
            <RangeControl label="Scent Visualization" value={season.scentIntensity} onChange={(value) => patch({ scentIntensity: value })} />
            <RangeControl label="Wildlife Presence" value={season.wildlifeDensity} onChange={(value) => patch({ wildlifeDensity: value })} />
            <RangeControl label="Harmonic Tree Glow" value={season.harmonicTreeGlow} onChange={(value) => patch({ harmonicTreeGlow: value })} />
            <button type="button" onClick={() => updateSeason(applySeasonEmotion(season, 'chaos pressure'))} className="rounded-full border border-orange-200/20 px-5 py-3 text-sm font-black text-orange-100/75 hover:bg-orange-200/10">Simulate Chaotic Wind</button>
          </SeasonPanel>
        </div>

        <div className="grid gap-5 content-start">
          <article className="relative overflow-hidden rounded-[2.5rem] border border-orange-200/10 bg-black/35 p-5 backdrop-blur-2xl">
            <div className="absolute inset-0 opacity-40" style={{ background: `radial-gradient(circle at 30% 15%, ${season.palette.glow}, transparent 26rem), radial-gradient(circle at 82% 25%, ${season.palette.accent}, transparent 22rem), ${season.palette.shadow}` }} />
            <div className="relative z-10"><p className="text-xs font-black uppercase tracking-[.32em] text-white/40">Season Preview</p><h3 className="mt-3 text-4xl font-black tracking-[-.07em]">{season.name}</h3><p className="mt-3 text-sm leading-7 text-white/62">{season.philosophy}</p><div className="mt-6 grid gap-3 sm:grid-cols-4"><Metric label={particleLabel} value={climate.density} /><Metric label="Size" value={climate.particleSize} suffix="px" /><Metric label="Wind" value={season.windIntensity} /><Metric label="Tree" value={season.harmonicTreeGlow} /></div><div className="mt-6 rounded-[2rem] border border-white/10 bg-black/30 p-5"><p className="text-xs font-black uppercase tracking-[.28em] text-white/40">Harmonic Tree</p><div className="mt-5 grid place-items-center rounded-[2rem] border border-white/10 bg-[radial-gradient(circle,rgba(255,159,28,.25),rgba(183,108,255,.12),rgba(0,0,0,.38)_68%)] p-8"><div className="season-tree text-center text-7xl" style={{ filter: `drop-shadow(0 0 ${season.harmonicTreeGlow / 2}px ${season.palette.glow})` }}>♜</div><p className="mt-4 text-sm leading-6 text-white/55">The Harmonic Tree changes with seasons, releases, holidays, community events, and milestones.</p></div></div></div>
          </article>

          <article className="rounded-[2rem] border border-white/10 bg-black/35 p-5 backdrop-blur-2xl"><div className="flex flex-wrap items-center justify-between gap-3"><p className="text-xs font-black uppercase tracking-[.28em] text-white/40">World Interpretation</p><select value={previewWorld} onChange={(event) => setPreviewWorld(event.target.value as HarmonicWorldId)} className="rounded-full border border-white/10 bg-black/40 px-4 py-3 text-sm font-black text-orange-50 outline-none">{worlds.map((world) => <option key={world}>{world}</option>)}</select></div><h3 className="mt-4 text-3xl font-black capitalize tracking-[-.05em]">{previewWorld.replace('-', ' ')}</h3><p className="mt-3 text-sm leading-7 text-white/62">{getSeasonWorldSignal(season, previewWorld)}</p></article>

          <article className="rounded-[2rem] border border-white/10 bg-black/35 p-5 backdrop-blur-2xl"><p className="text-xs font-black uppercase tracking-[.28em] text-white/40">Seasonal AI Instincts</p><div className="mt-4 grid gap-2 sm:grid-cols-2">{season.aiInstincts.map((instinct) => <div key={instinct} className="rounded-2xl border border-white/10 bg-white/[.045] p-4 text-sm font-bold leading-6 text-white/62">{instinct}</div>)}</div></article>
        </div>
      </div>
    </section>
  );
}

function SeasonPanel({ title, eyebrow, children }: { title: string; eyebrow: string; children: React.ReactNode }) { return <article className="rounded-[2rem] border border-white/10 bg-black/35 p-5 backdrop-blur-2xl"><p className="text-xs font-black uppercase tracking-[.28em] text-white/40">{eyebrow}</p><h3 className="mt-2 text-2xl font-black tracking-[-.05em]">{title}</h3><div className="mt-4 grid gap-4">{children}</div></article>; }
function Metric({ label, value, suffix = '%' }: { label: string; value: number; suffix?: string }) { return <div className="rounded-2xl border border-white/10 bg-white/[.045] p-4"><p className="text-xs font-black uppercase tracking-[.18em] text-white/35">{label}</p><p className="mt-2 text-3xl font-black tracking-[-.05em]">{value}{suffix}</p></div>; }
function RangeControl(props: { label: string; value: number; onChange: (value: number) => void }) { return <label className="grid gap-2 text-sm font-bold text-orange-100/70"><span className="flex justify-between"><span>{props.label}</span><span>{props.value}%</span></span><input type="range" min="0" max="100" value={props.value} onChange={(event) => props.onChange(Number(event.target.value))} /></label>; }
function PixelRangeControl(props: { label: string; value: number; min: number; max: number; suffix: string; onChange: (value: number) => void }) { return <label className="grid gap-2 text-sm font-bold text-orange-100/70"><span className="flex justify-between"><span>{props.label}</span><span>{props.value}{props.suffix}</span></span><input type="range" min={props.min} max={props.max} value={props.value} onChange={(event) => props.onChange(Number(event.target.value))} /></label>; }
function SelectControl(props: { label: string; value: string; options: string[]; onChange: (value: string) => void }) { return <label className="grid gap-2 text-sm font-bold text-orange-100/70">{props.label}<select value={props.value} onChange={(event) => props.onChange(event.target.value)} className="rounded-2xl border border-white/10 bg-black/40 px-4 py-4 text-orange-50 outline-none focus:border-orange-300">{props.options.map((option) => <option key={option}>{option}</option>)}</select></label>; }
