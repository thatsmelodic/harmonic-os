'use client';

import { useMemo, useState } from 'react';

type UploadKind = 'song' | 'beat';

type Draft = {
  kind: UploadKind;
  title: string;
  artist: string;
  bpm: string;
  musicalKey: string;
  genre: string;
  mood: string;
  story: string;
  lyrics: string;
  audioName: string;
  coverName: string;
  license: string;
  stems: boolean;
  publishStatus: 'draft' | 'review' | 'published';
};

const initialDraft: Draft = {
  kind: 'song',
  title: '',
  artist: 'Melodic',
  bpm: '',
  musicalKey: '',
  genre: 'R&B',
  mood: 'Late Night',
  story: '',
  lyrics: '',
  audioName: '',
  coverName: '',
  license: 'Personal Use',
  stems: false,
  publishStatus: 'draft',
};

const moodProfiles: Record<string, { colors: string[]; lighting: string; particles: string; camera: string }> = {
  'Late Night': { colors: ['#7c3aed', '#ec4899', '#0f172a'], lighting: 'Low violet glow', particles: 'Soft crystal dust', camera: 'Slow orbit' },
  Healing: { colors: ['#67e8f9', '#f0abfc', '#fef3c7'], lighting: 'Warm sunrise bloom', particles: 'Floating light petals', camera: 'Gentle push-in' },
  Pressure: { colors: ['#ef4444', '#f97316', '#111827'], lighting: 'Hard red edge light', particles: 'Embers', camera: 'Tight handheld motion' },
  Motion: { colors: ['#22d3ee', '#8b5cf6', '#020617'], lighting: 'Neon streaks', particles: 'Speed trails', camera: 'Fast lateral sweep' },
  Confession: { colors: ['#d8b4fe', '#fda4af', '#18181b'], lighting: 'Single soft spotlight', particles: 'Falling glass fragments', camera: 'Still frame with slow zoom' },
};

export function MelodicUploadStudio() {
  const [draft, setDraft] = useState<Draft>(initialDraft);
  const [message, setMessage] = useState('');
  const [analyzed, setAnalyzed] = useState(false);

  const profile = useMemo(() => moodProfiles[draft.mood] ?? moodProfiles['Late Night'], [draft.mood]);
  const canGenerate = Boolean(draft.title.trim() && draft.audioName);

  const analyze = () => {
    if (!canGenerate) {
      setMessage('Add a title and choose an audio file first.');
      return;
    }
    setAnalyzed(true);
    setMessage('Creative profile generated. Review the suggested world treatment before publishing.');
  };

  const saveDraft = () => {
    window.localStorage.setItem('harmonic:melodic-upload-draft', JSON.stringify({ ...draft, publishStatus: 'draft' }));
    setMessage('Draft saved on this device. Supabase storage and public publishing come in the production backend pass.');
  };

  const submitReview = () => {
    if (!canGenerate) {
      setMessage('Add a title and audio file before sending this release to review.');
      return;
    }
    setDraft((current) => ({ ...current, publishStatus: 'review' }));
    setMessage('Release moved to review. It is not public yet.');
  };

  return (
    <section className="rounded-[2.8rem] border border-purple-200/15 bg-black/55 p-5 text-white shadow-purple-glow backdrop-blur-2xl sm:p-8">
      <div className="flex flex-wrap items-end justify-between gap-5">
        <div>
          <p className="text-xs font-black uppercase tracking-[.34em] text-purple-100/45">Melodic Upload Studio</p>
          <h1 className="mt-4 text-5xl font-black tracking-[-.07em] sm:text-7xl">Upload once. Build the experience.</h1>
          <p className="mt-4 max-w-3xl text-base leading-8 text-white/55">Songs and beats enter through one guided pipeline. Add the audio, story, metadata, and creative direction before Harmonic OS generates the release structure.</p>
        </div>
        <span className="rounded-full border border-purple-200/20 bg-purple-300/10 px-4 py-2 text-xs font-black uppercase tracking-[.16em] text-purple-100">{draft.publishStatus}</span>
      </div>

      {message && <p className="mt-6 rounded-2xl border border-purple-200/15 bg-purple-300/10 px-4 py-3 text-sm text-purple-100/80">{message}</p>}

      <div className="mt-8 grid gap-6 xl:grid-cols-[1.05fr_.95fr]">
        <div className="grid gap-5">
          <article className="rounded-[2rem] border border-white/10 bg-white/[.035] p-5">
            <p className="text-xs font-black uppercase tracking-[.22em] text-white/30">1. Release Type</p>
            <div className="mt-4 grid grid-cols-2 gap-3">{(['song','beat'] as const).map((kind) => <button key={kind} onClick={() => setDraft({ ...draft, kind })} className={`rounded-[1.5rem] p-4 text-left ${draft.kind === kind ? 'bg-purple-300 text-black' : 'border border-white/10 bg-black/25 text-white/60'}`}><p className="text-2xl">{kind === 'song' ? '🎙️' : '🎛️'}</p><p className="mt-3 text-lg font-black capitalize">{kind}</p></button>)}</div>
          </article>

          <article className="rounded-[2rem] border border-white/10 bg-white/[.035] p-5">
            <p className="text-xs font-black uppercase tracking-[.22em] text-white/30">2. Files</p>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <label className="rounded-[1.5rem] border border-dashed border-purple-200/25 bg-black/25 p-5 text-sm font-black text-white/55">Audio file<input type="file" accept="audio/*" className="mt-3 block w-full text-xs" onChange={(event) => setDraft({ ...draft, audioName: event.target.files?.[0]?.name ?? '' })} /><span className="mt-3 block text-purple-100/65">{draft.audioName || 'No file selected'}</span></label>
              <label className="rounded-[1.5rem] border border-dashed border-purple-200/25 bg-black/25 p-5 text-sm font-black text-white/55">Cover art<input type="file" accept="image/*" className="mt-3 block w-full text-xs" onChange={(event) => setDraft({ ...draft, coverName: event.target.files?.[0]?.name ?? '' })} /><span className="mt-3 block text-purple-100/65">{draft.coverName || 'Optional'}</span></label>
            </div>
          </article>

          <article className="rounded-[2rem] border border-white/10 bg-white/[.035] p-5">
            <p className="text-xs font-black uppercase tracking-[.22em] text-white/30">3. Metadata</p>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <Field label="Title" value={draft.title} onChange={(title) => setDraft({ ...draft, title })} />
              <Field label="Artist / Producer" value={draft.artist} onChange={(artist) => setDraft({ ...draft, artist })} />
              <Field label="BPM" value={draft.bpm} onChange={(bpm) => setDraft({ ...draft, bpm })} />
              <Field label="Key" value={draft.musicalKey} onChange={(musicalKey) => setDraft({ ...draft, musicalKey })} />
              <SelectField label="Genre" value={draft.genre} options={['R&B','Trap','Hip-Hop','Soul','Experimental']} onChange={(genre) => setDraft({ ...draft, genre })} />
              <SelectField label="Mood" value={draft.mood} options={Object.keys(moodProfiles)} onChange={(mood) => setDraft({ ...draft, mood })} />
            </div>
          </article>

          <article className="rounded-[2rem] border border-white/10 bg-white/[.035] p-5">
            <p className="text-xs font-black uppercase tracking-[.22em] text-white/30">4. Memory + Rights</p>
            <label className="mt-4 block text-xs font-black uppercase tracking-[.16em] text-white/35">Story behind the release<textarea rows={5} value={draft.story} onChange={(event) => setDraft({ ...draft, story: event.target.value })} className="mt-2 w-full rounded-2xl border border-white/10 bg-black/30 p-4 text-sm font-normal normal-case tracking-normal text-white outline-none" /></label>
            {draft.kind === 'song' ? <label className="mt-4 block text-xs font-black uppercase tracking-[.16em] text-white/35">Lyrics<textarea rows={8} value={draft.lyrics} onChange={(event) => setDraft({ ...draft, lyrics: event.target.value })} className="mt-2 w-full rounded-2xl border border-white/10 bg-black/30 p-4 text-sm font-normal normal-case tracking-normal text-white outline-none" /></label> : <div className="mt-4 grid gap-4 sm:grid-cols-2"><SelectField label="Default license" value={draft.license} options={['Personal Use','Basic Lease','Premium Lease','Exclusive']} onChange={(license) => setDraft({ ...draft, license })} /><label className="flex items-center justify-between rounded-2xl border border-white/10 bg-black/30 p-4 text-sm font-black text-white/60">Stems available<input type="checkbox" checked={draft.stems} onChange={(event) => setDraft({ ...draft, stems: event.target.checked })} /></label></div>}
          </article>
        </div>

        <div className="grid gap-5 content-start">
          <article className="rounded-[2rem] border border-purple-200/15 bg-purple-300/[.07] p-6 shadow-purple-glow">
            <p className="text-xs font-black uppercase tracking-[.22em] text-purple-100/45">Creative Direction</p>
            <h2 className="mt-3 text-3xl font-black tracking-[-.05em]">Suggested world treatment</h2>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              <PreviewCard label="Lighting" value={profile.lighting} />
              <PreviewCard label="Particles" value={profile.particles} />
              <PreviewCard label="Camera" value={profile.camera} />
              <PreviewCard label="Page Type" value={draft.kind === 'song' ? 'Song Memory Page' : 'Beat License Page'} />
            </div>
            <div className="mt-5 flex gap-2">{profile.colors.map((color) => <span key={color} className="h-12 flex-1 rounded-xl border border-white/10" style={{ background: color }} />)}</div>
            <button onClick={analyze} className="mt-6 w-full rounded-full bg-purple-300 px-5 py-3 text-sm font-black text-black">Generate Creative Profile</button>
          </article>

          <article className="rounded-[2rem] border border-white/10 bg-white/[.035] p-6">
            <p className="text-xs font-black uppercase tracking-[.22em] text-white/30">Generated Experience</p>
            <div className="mt-5 grid gap-3">{[
              ['Release page', analyzed ? 'Ready to generate' : 'Waiting for analysis'],
              ['Memory archive entry', draft.story.trim() ? 'Story attached' : 'Needs story'],
              ['Lyrics / producer notes', draft.kind === 'song' ? (draft.lyrics.trim() ? 'Attached' : 'Optional') : 'Beat notes enabled'],
              ['Visual identity', analyzed ? draft.mood : 'Not generated'],
              ['Licensing', draft.kind === 'beat' ? draft.license : 'Not applicable'],
            ].map(([label,value]) => <div key={label} className="rounded-2xl border border-white/10 bg-black/25 p-4"><p className="text-xs font-black uppercase tracking-[.14em] text-white/30">{label}</p><p className="mt-2 text-sm font-black text-white/65">{value}</p></div>)}</div>
          </article>

          <div className="grid grid-cols-2 gap-3"><button onClick={saveDraft} className="rounded-full border border-white/10 bg-white/[.04] px-4 py-3 text-sm font-black text-white/65">Save Draft</button><button onClick={submitReview} className="rounded-full bg-white px-4 py-3 text-sm font-black text-black">Send to Review</button></div>
        </div>
      </div>
    </section>
  );
}

function Field({ label, value, onChange }: { label: string; value: string; onChange: (value: string) => void }) {
  return <label className="text-xs font-black uppercase tracking-[.16em] text-white/35">{label}<input value={value} onChange={(event) => onChange(event.target.value)} className="mt-2 w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-sm font-normal normal-case tracking-normal text-white outline-none" /></label>;
}

function SelectField({ label, value, options, onChange }: { label: string; value: string; options: string[]; onChange: (value: string) => void }) {
  return <label className="text-xs font-black uppercase tracking-[.16em] text-white/35">{label}<select value={value} onChange={(event) => onChange(event.target.value)} className="mt-2 w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-sm font-normal normal-case tracking-normal text-white outline-none">{options.map((option) => <option key={option}>{option}</option>)}</select></label>;
}

function PreviewCard({ label, value }: { label: string; value: string }) {
  return <div className="rounded-2xl border border-white/10 bg-black/25 p-4"><p className="text-xs font-black uppercase tracking-[.14em] text-white/30">{label}</p><p className="mt-2 text-sm font-black text-white/70">{value}</p></div>;
}
