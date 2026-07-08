'use client';

import { useMemo, useState } from 'react';
import { MelodicVisualizer } from '@/components/worlds/MelodicVisualizer';
import { conductMelodicVibe } from '@/lib/vibe-conductor';
import {
  melodicVisualDefaults,
  particleShapes,
  visualizerSizes,
  visualizerStyles,
  type MelodicVisualSettings,
  type ParticleShape,
  type VisualizerSize,
  type VisualizerStyle,
} from '@/lib/melodic-visuals';

type TrackStatus = 'Draft' | 'Writing Room' | 'Vault Ready' | 'Released';

type TrackDraft = {
  title: string;
  bpm: string;
  mood: string;
  status: TrackStatus;
  context: string;
};

const startingTracks: TrackDraft[] = [
  { title: 'Lift U Up', bpm: '80 BPM', mood: 'R&B / healing / late night', status: 'Vault Ready', context: 'A record tied to encouragement, elevation, and the softer side of the Melodic universe.' },
  { title: 'Barkin N Bitin', bpm: '170 BPM', mood: 'Trap / motion / pressure', status: 'Writing Room', context: 'High-energy mode for when the frequency switches from reflection into hunger.' },
];

const ambienceModes = ['Nebula Studio', 'Late Night Room', 'Purple Rain', 'Memory Archive'];
const cursorModes = ['Echo Ripple', 'Floating Notes', 'Wave Trail', 'Crystal Pulse'];
const transitionModes = ['Fade on Beat', 'Ripple Dissolve', 'Tape Rewind', 'Frequency Shift'];

export function MelodicControlRoom() {
  const [ambience, setAmbience] = useState(ambienceModes[0]);
  const [cursor, setCursor] = useState(cursorModes[0]);
  const [transition, setTransition] = useState(transitionModes[0]);
  const [tempo, setTempo] = useState(80);
  const [ambientAudio, setAmbientAudio] = useState(true);
  const [visualSettings, setVisualSettings] = useState<MelodicVisualSettings>(melodicVisualDefaults);
  const [vibePrompt, setVibePrompt] = useState('make it feel like purple pain turning into healing light');
  const [vibeName, setVibeName] = useState('Manual Mode');
  const [vibeDescription, setVibeDescription] = useState('Use the controls below or let the Vibe Conductor translate a mood into settings.');
  const [tracks, setTracks] = useState<TrackDraft[]>(startingTracks);
  const [draft, setDraft] = useState<TrackDraft>({ title: '', bpm: '', mood: '', status: 'Draft', context: '' });

  const activeSignal = useMemo(() => {
    if (tempo < 90) return 'slow, emotional, floating';
    if (tempo < 135) return 'balanced, cinematic, rising';
    return 'fast, charged, high-motion';
  }, [tempo]);

  function setVisual<K extends keyof MelodicVisualSettings>(key: K, value: MelodicVisualSettings[K]) {
    setVisualSettings((current) => ({ ...current, [key]: value }));
  }

  function runVibeConductor() {
    const result = conductMelodicVibe(vibePrompt);
    setAmbience(result.ambience);
    setCursor(result.cursor);
    setTransition(result.transition);
    setTempo(result.tempo);
    setAmbientAudio(result.ambientAudio);
    setVisualSettings((current) => ({
      ...result.visualSettings,
      logoUrl: current.logoUrl,
      customImageUrl: current.customImageUrl,
    }));
    setVibeName(result.name);
    setVibeDescription(result.description);
  }

  function addTrack() {
    if (!draft.title.trim()) return;
    setTracks((current) => [draft, ...current]);
    setDraft({ title: '', bpm: '', mood: '', status: 'Draft', context: '' });
  }

  return (
    <section className="melodic-control-room mt-6 rounded-[2.5rem] border border-purple-200/10 bg-[linear-gradient(135deg,rgba(183,108,255,.18),rgba(255,79,216,.06),rgba(255,255,255,.035))] p-5 shadow-purple-glow backdrop-blur-2xl sm:p-7">
      <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-xs font-black uppercase tracking-[.34em] text-purple-100/45">Melodic Command Center</p>
          <h2 className="mt-3 text-3xl font-black tracking-[-.06em] sm:text-5xl">Control the music world</h2>
          <p className="mt-3 max-w-3xl text-sm leading-7 text-purple-100/62">
            The Vibe Conductor is the first step toward AI-controlled world building: describe a mood, and Harmonic OS translates it into lighting, motion, particles, and visualizer behavior.
          </p>
        </div>
        <a href="/worlds/melodic" className="rounded-full bg-purple-300 px-5 py-3 text-sm font-black text-black shadow-purple-glow">View Melodic</a>
      </div>

      <article className="mb-5 rounded-[2rem] border border-purple-200/15 bg-black/35 p-5">
        <div className="grid gap-5 lg:grid-cols-[1fr_.85fr] lg:items-end">
          <div>
            <p className="text-xs font-black uppercase tracking-[.32em] text-purple-100/45">Vibe Conductor</p>
            <h3 className="mt-3 text-3xl font-black tracking-[-.05em]">Tell the OS the feeling.</h3>
            <p className="mt-3 text-sm leading-7 text-purple-100/60">
              Try: “dark heartbreak but heavenly,” “luxury purple studio,” “hard trap 808 motion,” or “uplifting angelic healing.”
            </p>
            <textarea
              value={vibePrompt}
              onChange={(event) => setVibePrompt(event.target.value)}
              rows={4}
              className="mt-4 w-full rounded-2xl border border-white/10 bg-black/40 px-4 py-4 text-purple-50 outline-none focus:border-purple-300"
              placeholder="Describe the world vibe..."
            />
            <button type="button" onClick={runVibeConductor} className="mt-4 rounded-full bg-purple-300 px-6 py-4 font-black text-black shadow-purple-glow">
              Conduct Vibe
            </button>
          </div>
          <div className="rounded-[2rem] border border-white/10 bg-white/[.045] p-5">
            <p className="text-xs font-black uppercase tracking-[.28em] text-white/40">Translation</p>
            <h4 className="mt-3 text-2xl font-black tracking-[-.04em]">{vibeName}</h4>
            <p className="mt-3 text-sm leading-7 text-white/58">{vibeDescription}</p>
            <div className="mt-4 grid gap-2 text-xs font-mono text-purple-100/55">
              <p>Ambience: {ambience}</p>
              <p>Cursor: {cursor}</p>
              <p>Transition: {transition}</p>
              <p>Tempo: {tempo} BPM</p>
            </div>
          </div>
        </div>
      </article>

      <div className="grid gap-5 xl:grid-cols-[.95fr_1.05fr]">
        <div className="grid gap-5">
          <article className="rounded-[2rem] border border-white/10 bg-black/30 p-5">
            <p className="text-xs font-black uppercase tracking-[.28em] text-white/40">World Behavior</p>
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <SelectControl label="Background Theme" value={ambience} options={ambienceModes} onChange={setAmbience} />
              <SelectControl label="Cursor Effect" value={cursor} options={cursorModes} onChange={setCursor} />
              <label className="grid gap-2 text-sm font-bold text-purple-100/70 sm:col-span-2">Transition Style
                <select value={transition} onChange={(event) => setTransition(event.target.value)} className="rounded-2xl border border-white/10 bg-black/40 px-4 py-4 text-purple-50 outline-none focus:border-purple-300">
                  {transitionModes.map((mode) => <option key={mode}>{mode}</option>)}
                </select>
              </label>
              <RangeControl label="Tempo Feel" value={tempo} min={60} max={170} onChange={setTempo} suffix=" BPM" />
              <button type="button" onClick={() => setAmbientAudio((current) => !current)} className="rounded-2xl border border-purple-200/20 px-5 py-3 text-sm font-black text-purple-100/80 hover:bg-purple-200/10">
                Ambient Audio: {ambientAudio ? 'Enabled' : 'Disabled'}
              </button>
            </div>
          </article>

          <article className="rounded-[2rem] border border-white/10 bg-black/30 p-5">
            <p className="text-xs font-black uppercase tracking-[.28em] text-white/40">Melodic Visual Lab</p>
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <label className="grid gap-2 text-sm font-bold text-purple-100/70">Visualizer Style
                <select value={visualSettings.visualizerStyle} onChange={(event) => setVisual('visualizerStyle', event.target.value as VisualizerStyle)} className="rounded-2xl border border-white/10 bg-black/40 px-4 py-4 text-purple-50 outline-none focus:border-purple-300">
                  {visualizerStyles.map((mode) => <option key={mode}>{mode}</option>)}
                </select>
              </label>
              <label className="grid gap-2 text-sm font-bold text-purple-100/70">Visualizer Size
                <select value={visualSettings.visualizerSize} onChange={(event) => setVisual('visualizerSize', event.target.value as VisualizerSize)} className="rounded-2xl border border-white/10 bg-black/40 px-4 py-4 text-purple-50 outline-none focus:border-purple-300">
                  {visualizerSizes.map((mode) => <option key={mode}>{mode}</option>)}
                </select>
              </label>
              <label className="grid gap-2 text-sm font-bold text-purple-100/70">Bubble Shape
                <select value={visualSettings.particleShape} onChange={(event) => setVisual('particleShape', event.target.value as ParticleShape)} className="rounded-2xl border border-white/10 bg-black/40 px-4 py-4 text-purple-50 outline-none focus:border-purple-300">
                  {particleShapes.map((mode) => <option key={mode}>{mode}</option>)}
                </select>
              </label>
              <RangeControl label="Particle Density" value={visualSettings.particleDensity} min={0} max={100} onChange={(value) => setVisual('particleDensity', value)} suffix="%" />
              <RangeControl label="Orb Count" value={visualSettings.orbCount} min={4} max={30} onChange={(value) => setVisual('orbCount', value)} />
              <RangeControl label="Particle Speed" value={visualSettings.particleSpeed} min={0} max={100} onChange={(value) => setVisual('particleSpeed', value)} suffix="%" />
              <RangeControl label="Glow Intensity" value={visualSettings.glowIntensity} min={0} max={100} onChange={(value) => setVisual('glowIntensity', value)} suffix="%" />
              <RangeControl label="Wave Thickness" value={visualSettings.waveThickness} min={8} max={80} onChange={(value) => setVisual('waveThickness', value)} suffix="%" />
              <RangeControl label="Motion Strength" value={visualSettings.motionStrength} min={0} max={100} onChange={(value) => setVisual('motionStrength', value)} suffix="%" />
              <RangeControl label="Card Glass Blur" value={visualSettings.cardBlur} min={0} max={40} onChange={(value) => setVisual('cardBlur', value)} suffix="px" />
              <label className="grid gap-2 text-sm font-bold text-purple-100/70 sm:col-span-2">Logo URL Preview
                <input value={visualSettings.logoUrl} onChange={(event) => setVisual('logoUrl', event.target.value)} placeholder="Paste logo/image URL to preview logo particles" className="rounded-2xl border border-white/10 bg-black/40 px-4 py-4 text-purple-50 outline-none focus:border-purple-300" />
              </label>
              <label className="grid gap-2 text-sm font-bold text-purple-100/70 sm:col-span-2">Custom Image URL Preview
                <input value={visualSettings.customImageUrl} onChange={(event) => setVisual('customImageUrl', event.target.value)} placeholder="Paste any image URL for custom particle bubbles" className="rounded-2xl border border-white/10 bg-black/40 px-4 py-4 text-purple-50 outline-none focus:border-purple-300" />
              </label>
            </div>
          </article>

          <article className="rounded-[2rem] border border-white/10 bg-black/30 p-5">
            <p className="text-xs font-black uppercase tracking-[.28em] text-white/40">Add Track Memory</p>
            <div className="mt-5 grid gap-4">
              <input value={draft.title} onChange={(event) => setDraft({ ...draft, title: event.target.value })} placeholder="Song / beat title" className="rounded-2xl border border-white/10 bg-black/40 px-4 py-4 text-purple-50 outline-none focus:border-purple-300" />
              <div className="grid gap-4 sm:grid-cols-3">
                <input value={draft.bpm} onChange={(event) => setDraft({ ...draft, bpm: event.target.value })} placeholder="BPM" className="rounded-2xl border border-white/10 bg-black/40 px-4 py-4 text-purple-50 outline-none focus:border-purple-300" />
                <input value={draft.mood} onChange={(event) => setDraft({ ...draft, mood: event.target.value })} placeholder="Mood / genre" className="rounded-2xl border border-white/10 bg-black/40 px-4 py-4 text-purple-50 outline-none focus:border-purple-300" />
                <select value={draft.status} onChange={(event) => setDraft({ ...draft, status: event.target.value as TrackStatus })} className="rounded-2xl border border-white/10 bg-black/40 px-4 py-4 text-purple-50 outline-none focus:border-purple-300">
                  <option>Draft</option><option>Writing Room</option><option>Vault Ready</option><option>Released</option>
                </select>
              </div>
              <textarea value={draft.context} onChange={(event) => setDraft({ ...draft, context: event.target.value })} placeholder="What life moment, emotion, or chapter created this?" rows={4} className="rounded-2xl border border-white/10 bg-black/40 px-4 py-4 text-purple-50 outline-none focus:border-purple-300" />
              <button type="button" onClick={addTrack} className="rounded-full bg-purple-300 px-6 py-4 font-black text-black shadow-purple-glow">Add to Local Preview</button>
            </div>
          </article>
        </div>

        <div className="grid gap-5">
          <article className="rounded-[2rem] border border-white/10 bg-black/30 p-5" style={{ backdropFilter: `blur(${visualSettings.cardBlur}px)` }}>
            <p className="text-xs font-black uppercase tracking-[.28em] text-white/40">Live Visual Preview</p>
            <div className="mt-5 rounded-[2rem] border border-purple-200/10 bg-[radial-gradient(circle_at_50%_0%,rgba(183,108,255,.34),rgba(0,0,0,.28)_62%)] p-5">
              <div className="mb-4 flex items-center justify-between gap-3">
                <p className="font-mono text-xs text-purple-100/55">96.6 FM</p>
                <p className="font-mono text-xs text-purple-100/45">{activeSignal}</p>
              </div>
              <h3 className="text-4xl font-black tracking-[-.07em]">{ambience}</h3>
              <p className="mt-3 text-sm leading-7 text-purple-100/62">
                {visualSettings.visualizerStyle} · {visualSettings.visualizerSize} · {visualSettings.particleShape} · glow {visualSettings.glowIntensity}% · motion {visualSettings.motionStrength}%.
              </p>
              <MelodicVisualizer settings={visualSettings} className="mt-6" label="Creator Studio Preview" />
            </div>
          </article>

          <article className="rounded-[2rem] border border-white/10 bg-black/30 p-5">
            <div className="flex items-center justify-between gap-3">
              <p className="text-xs font-black uppercase tracking-[.28em] text-white/40">Track Memories</p>
              <span className="rounded-full border border-white/10 px-3 py-1 font-mono text-xs text-white/45">{tracks.length} nodes</span>
            </div>
            <div className="mt-5 grid gap-3">
              {tracks.map((track, index) => (
                <article key={`${track.title}-${index}`} className="rounded-2xl border border-white/10 bg-white/[.045] p-4">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div><p className="font-mono text-xs text-purple-100/45">0{index + 1}</p><h3 className="mt-2 text-2xl font-black tracking-[-.05em]">{track.title}</h3></div>
                    <span className="rounded-full bg-purple-200/10 px-3 py-1 text-xs font-black text-purple-100/65">{track.status}</span>
                  </div>
                  <p className="mt-3 text-sm text-purple-100/58">{track.bpm} · {track.mood}</p>
                  <p className="mt-3 text-sm leading-6 text-white/55">{track.context}</p>
                </article>
              ))}
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}

function RangeControl(props: { label: string; value: number; min: number; max: number; suffix?: string; onChange: (value: number) => void }) {
  return (
    <label className="grid gap-2 text-sm font-bold text-purple-100/70">
      {props.label}: {props.value}{props.suffix ?? ''}
      <input type="range" min={props.min} max={props.max} value={props.value} onChange={(event) => props.onChange(Number(event.target.value))} />
    </label>
  );
}

function SelectControl(props: { label: string; value: string; options: string[]; onChange: (value: string) => void }) {
  return (
    <label className="grid gap-2 text-sm font-bold text-purple-100/70">
      {props.label}
      <select value={props.value} onChange={(event) => props.onChange(event.target.value)} className="rounded-2xl border border-white/10 bg-black/40 px-4 py-4 text-purple-50 outline-none focus:border-purple-300">
        {props.options.map((option) => <option key={option}>{option}</option>)}
      </select>
    </label>
  );
}
