'use client';

import { useMemo, useState } from 'react';

type TrackStatus = 'Draft' | 'Writing Room' | 'Vault Ready' | 'Released';

type TrackDraft = {
  title: string;
  bpm: string;
  mood: string;
  status: TrackStatus;
  context: string;
};

const startingTracks: TrackDraft[] = [
  {
    title: 'Lift U Up',
    bpm: '80 BPM',
    mood: 'R&B / healing / late night',
    status: 'Vault Ready',
    context: 'A record tied to encouragement, elevation, and the softer side of the Melodic universe.',
  },
  {
    title: 'Barkin N Bitin',
    bpm: '170 BPM',
    mood: 'Trap / motion / pressure',
    status: 'Writing Room',
    context: 'High-energy mode for when the frequency switches from reflection into hunger.',
  },
];

const ambienceModes = ['Nebula Studio', 'Late Night Room', 'Purple Rain', 'Memory Archive'];
const cursorModes = ['Echo Ripple', 'Floating Notes', 'Wave Trail', 'Crystal Pulse'];
const transitionModes = ['Fade on Beat', 'Ripple Dissolve', 'Tape Rewind', 'Frequency Shift'];

export function MelodicControlRoom() {
  const [ambience, setAmbience] = useState(ambienceModes[0]);
  const [cursor, setCursor] = useState(cursorModes[0]);
  const [transition, setTransition] = useState(transitionModes[0]);
  const [particleDensity, setParticleDensity] = useState(72);
  const [tempo, setTempo] = useState(80);
  const [ambientAudio, setAmbientAudio] = useState(true);
  const [tracks, setTracks] = useState<TrackDraft[]>(startingTracks);
  const [draft, setDraft] = useState<TrackDraft>({
    title: '',
    bpm: '',
    mood: '',
    status: 'Draft',
    context: '',
  });

  const activeSignal = useMemo(() => {
    if (tempo < 90) return 'slow, emotional, floating';
    if (tempo < 135) return 'balanced, cinematic, rising';
    return 'fast, charged, high-motion';
  }, [tempo]);

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
            This is the first Creator Studio control room. Right now it previews how the controls will feel. Next we connect these settings to Supabase so the Melodic world updates from saved data.
          </p>
        </div>
        <a href="/worlds/melodic" className="rounded-full bg-purple-300 px-5 py-3 text-sm font-black text-black shadow-purple-glow">
          View Melodic
        </a>
      </div>

      <div className="grid gap-5 xl:grid-cols-[.95fr_1.05fr]">
        <div className="grid gap-5">
          <article className="rounded-[2rem] border border-white/10 bg-black/30 p-5">
            <p className="text-xs font-black uppercase tracking-[.28em] text-white/40">World Behavior</p>
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <label className="grid gap-2 text-sm font-bold text-purple-100/70">
                Background Theme
                <select value={ambience} onChange={(event) => setAmbience(event.target.value)} className="rounded-2xl border border-white/10 bg-black/40 px-4 py-4 text-purple-50 outline-none focus:border-purple-300">
                  {ambienceModes.map((mode) => <option key={mode}>{mode}</option>)}
                </select>
              </label>
              <label className="grid gap-2 text-sm font-bold text-purple-100/70">
                Cursor Effect
                <select value={cursor} onChange={(event) => setCursor(event.target.value)} className="rounded-2xl border border-white/10 bg-black/40 px-4 py-4 text-purple-50 outline-none focus:border-purple-300">
                  {cursorModes.map((mode) => <option key={mode}>{mode}</option>)}
                </select>
              </label>
              <label className="grid gap-2 text-sm font-bold text-purple-100/70 sm:col-span-2">
                Transition Style
                <select value={transition} onChange={(event) => setTransition(event.target.value)} className="rounded-2xl border border-white/10 bg-black/40 px-4 py-4 text-purple-50 outline-none focus:border-purple-300">
                  {transitionModes.map((mode) => <option key={mode}>{mode}</option>)}
                </select>
              </label>
              <label className="grid gap-2 text-sm font-bold text-purple-100/70">
                Particle Density: {particleDensity}%
                <input type="range" min="0" max="100" value={particleDensity} onChange={(event) => setParticleDensity(Number(event.target.value))} />
              </label>
              <label className="grid gap-2 text-sm font-bold text-purple-100/70">
                Tempo Feel: {tempo} BPM
                <input type="range" min="60" max="170" value={tempo} onChange={(event) => setTempo(Number(event.target.value))} />
              </label>
            </div>
            <button type="button" onClick={() => setAmbientAudio((current) => !current)} className="mt-5 rounded-full border border-purple-200/20 px-5 py-3 text-sm font-black text-purple-100/80 hover:bg-purple-200/10">
              Ambient Audio: {ambientAudio ? 'Enabled' : 'Disabled'}
            </button>
          </article>

          <article className="rounded-[2rem] border border-white/10 bg-black/30 p-5">
            <p className="text-xs font-black uppercase tracking-[.28em] text-white/40">Add Track Memory</p>
            <div className="mt-5 grid gap-4">
              <input value={draft.title} onChange={(event) => setDraft({ ...draft, title: event.target.value })} placeholder="Song / beat title" className="rounded-2xl border border-white/10 bg-black/40 px-4 py-4 text-purple-50 outline-none focus:border-purple-300" />
              <div className="grid gap-4 sm:grid-cols-3">
                <input value={draft.bpm} onChange={(event) => setDraft({ ...draft, bpm: event.target.value })} placeholder="BPM" className="rounded-2xl border border-white/10 bg-black/40 px-4 py-4 text-purple-50 outline-none focus:border-purple-300" />
                <input value={draft.mood} onChange={(event) => setDraft({ ...draft, mood: event.target.value })} placeholder="Mood / genre" className="rounded-2xl border border-white/10 bg-black/40 px-4 py-4 text-purple-50 outline-none focus:border-purple-300" />
                <select value={draft.status} onChange={(event) => setDraft({ ...draft, status: event.target.value as TrackStatus })} className="rounded-2xl border border-white/10 bg-black/40 px-4 py-4 text-purple-50 outline-none focus:border-purple-300">
                  <option>Draft</option>
                  <option>Writing Room</option>
                  <option>Vault Ready</option>
                  <option>Released</option>
                </select>
              </div>
              <textarea value={draft.context} onChange={(event) => setDraft({ ...draft, context: event.target.value })} placeholder="What life moment, emotion, or chapter created this?" rows={4} className="rounded-2xl border border-white/10 bg-black/40 px-4 py-4 text-purple-50 outline-none focus:border-purple-300" />
              <button type="button" onClick={addTrack} className="rounded-full bg-purple-300 px-6 py-4 font-black text-black shadow-purple-glow">
                Add to Local Preview
              </button>
            </div>
          </article>
        </div>

        <div className="grid gap-5">
          <article className="rounded-[2rem] border border-white/10 bg-black/30 p-5">
            <p className="text-xs font-black uppercase tracking-[.28em] text-white/40">Live Preview</p>
            <div className="mt-5 rounded-[2rem] border border-purple-200/10 bg-[radial-gradient(circle_at_50%_0%,rgba(183,108,255,.34),rgba(0,0,0,.28)_62%)] p-5">
              <div className="mb-4 flex items-center justify-between gap-3">
                <p className="font-mono text-xs text-purple-100/55">96.6 FM</p>
                <p className="font-mono text-xs text-purple-100/45">{activeSignal}</p>
              </div>
              <h3 className="text-4xl font-black tracking-[-.07em]">{ambience}</h3>
              <p className="mt-3 text-sm leading-7 text-purple-100/62">
                Cursor: {cursor}. Transition: {transition}. Particles: {particleDensity}%. Ambient audio: {ambientAudio ? 'on' : 'off'}.
              </p>
              <div className="mt-6 flex h-24 items-end gap-2 rounded-2xl bg-black/30 p-4">
                {[34, 72, 56, 88, 46, 96, 64, 78, 52, 84].map((height, index) => (
                  <span key={index} className="melodic-bar flex-1 rounded-full bg-purple-300" style={{ height: `${Math.max(12, (height * particleDensity) / 100)}%`, animationDelay: `${index * 70}ms` }} />
                ))}
              </div>
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
                    <div>
                      <p className="font-mono text-xs text-purple-100/45">0{index + 1}</p>
                      <h3 className="mt-2 text-2xl font-black tracking-[-.05em]">{track.title}</h3>
                    </div>
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
