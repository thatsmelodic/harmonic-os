import Link from 'next/link';
import { melodicWorldVisualDefaults, type MelodicWorldVisualState } from '@/lib/melodic-visuals';
import { MelodicVisualizer } from '@/components/worlds/MelodicVisualizer';
import { SeasonalWorldLayer } from '@/components/seasons/SeasonalWorldLayer';

const tracks = [
  { title: 'Lift U Up', type: 'R&B Frequency', bpm: '80 BPM', status: 'Memory Saved' },
  { title: 'Better Luck Nxt Time', type: 'R&B Frequency', bpm: 'Late Night', status: 'Vault Ready' },
  { title: 'Save The Apology', type: 'R&B Frequency', bpm: 'Confession', status: 'Writing Room' },
  { title: 'Barkin N Bitin', type: 'Trap Frequency', bpm: '170 BPM', status: 'High Energy' },
  { title: 'Big Guapo', type: 'Trap Frequency', bpm: 'Motion', status: 'Street Mode' },
];

const memoryNodes = [
  'Pain becomes melody',
  'Melody becomes memory',
  'Memory becomes motion',
  'Motion becomes release',
];

export function MelodicWorldExperience({ visualState = melodicWorldVisualDefaults }: { visualState?: MelodicWorldVisualState }) {
  return (
    <main className="melodic-world relative isolate min-h-screen overflow-hidden pb-28">
      <SeasonalWorldLayer world="melodic" />
      <div className="melodic-aurora absolute inset-0 -z-30" />
      <div className="frequency-grid absolute inset-0 -z-20 opacity-50" />
      <div className="melodic-ripple melodic-ripple-one" />
      <div className="melodic-ripple melodic-ripple-two" />
      <div className="frequency-scan" />

      <section className="harmonic-container py-8 sm:py-12">
        <nav className="mb-8 flex items-center justify-between gap-4">
          <Link href="/" className="rounded-full border border-white/15 bg-white/[.05] px-4 py-3 text-sm font-black text-white/70 transition hover:bg-white/15">
            ← Harmonic OS
          </Link>
          <p className="hidden font-mono text-xs uppercase tracking-[.32em] text-white/40 sm:block">96.6 FM / MELODIC</p>
        </nav>

        <div className="grid gap-8 lg:grid-cols-[1.05fr_.95fr] lg:items-center">
          <div className="glass-panel rounded-[2.5rem] p-6 sm:p-10">
            <p className="text-xs font-black uppercase tracking-[.42em] text-purple-100/45">Melodic Frequency</p>
            <h1 className="mt-5 text-5xl font-black leading-none tracking-[-.09em] text-[#f8f0ff] sm:text-7xl lg:text-8xl">
              Compose the Memory.
            </h1>
            <p className="mt-6 max-w-2xl text-xl font-black leading-tight tracking-[-.04em] text-white/88 sm:text-3xl">
              This world does not just store music. It turns your life into sound, then turns the sound into an archive.
            </p>
            <p className="mt-6 max-w-2xl text-base leading-8 text-white/64 sm:text-lg">
              Current vibe: {visualState.vibeName}. {visualState.vibeDescription}
            </p>

            <MelodicVisualizer settings={visualState.visualSettings} className="mt-8" label="Signal Visualizer" />
          </div>

          <aside className="glass-panel rounded-[2.5rem] p-6 sm:p-8">
            <div className="mb-6 flex items-center justify-between">
              <p className="text-xs font-black uppercase tracking-[.34em] text-white/40">Memory Loop</p>
              <span className="rounded-full border border-purple-200/20 px-3 py-1 font-mono text-xs text-purple-100/55">SEASON LIVE</span>
            </div>
            <div className="relative mx-auto grid aspect-square max-w-md place-items-center rounded-full border border-purple-200/10 bg-[radial-gradient(circle,rgba(183,108,255,.22),rgba(0,0,0,.22)_58%)]">
              <div className="melodic-orbit melodic-orbit-a" />
              <div className="melodic-orbit melodic-orbit-b" />
              <div className="crystal-heart grid h-44 w-44 place-items-center rounded-[3rem] border border-white/15 bg-black/35 sm:h-56 sm:w-56">
                <div className="absolute h-32 w-32 rounded-full bg-[rgba(183,108,255,.30)] blur-3xl" />
                <div className="relative text-center">
                  <p className="font-mono text-xs text-white/45">NOW TUNING</p>
                  <p className="mt-2 text-4xl font-black tracking-[-.07em] text-[#f8f0ff]">Melodic</p>
                  <p className="mt-2 font-mono text-xs text-purple-100/45">{visualState.tempo} BPM</p>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </section>

      <section className="harmonic-container py-8">
        <div className="mb-5">
          <p className="text-xs font-black uppercase tracking-[.34em] text-white/40">Music Vault</p>
          <h2 className="mt-3 text-3xl font-black tracking-[-.06em] sm:text-5xl">Track nodes inside the system</h2>
        </div>
        <div className="grid gap-4 lg:grid-cols-5">
          {tracks.map((track, index) => (
            <article key={track.title} className="melodic-track-card rounded-[2rem] border border-white/10 bg-white/[.05] p-5 backdrop-blur-xl">
              <p className="font-mono text-xs text-purple-100/45">0{index + 1}</p>
              <h3 className="mt-5 text-2xl font-black leading-none tracking-[-.05em]">{track.title}</h3>
              <p className="mt-3 text-sm text-white/55">{track.type}</p>
              <div className="mt-6 flex items-center justify-between gap-3">
                <span className="rounded-full bg-purple-200/10 px-3 py-1 font-mono text-xs text-purple-100/65">{track.bpm}</span>
                <span className="text-right text-xs font-black text-white/40">{track.status}</span>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="harmonic-container py-8">
        <div className="grid gap-5 lg:grid-cols-[.9fr_1.1fr]">
          <div className="glass-panel rounded-[2rem] p-6">
            <p className="text-xs font-black uppercase tracking-[.32em] text-white/40">Context Engine</p>
            <h2 className="mt-4 text-3xl font-black tracking-[-.05em]">Melodic remembers why the song exists.</h2>
            <p className="mt-4 text-sm leading-7 text-white/62">
              The Season Engine now sits above Melodic, adapting the world’s atmosphere from Mission Control.
            </p>
          </div>

          <div className="glass-panel rounded-[2rem] p-6">
            <p className="text-xs font-black uppercase tracking-[.32em] text-white/40">Frequency Chain</p>
            <div className="mt-5 grid gap-3 sm:grid-cols-4">
              {memoryNodes.map((node, index) => (
                <div key={node} className="rounded-2xl border border-white/10 bg-black/25 p-4">
                  <p className="font-mono text-xs text-[#d8b4fe]">0{index + 1}</p>
                  <p className="mt-3 text-sm font-bold leading-6 text-white/72">{node}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="harmonic-container py-8">
        <div className="rounded-[2.5rem] border border-purple-200/10 bg-[linear-gradient(135deg,rgba(183,108,255,.18),rgba(255,79,216,.08),rgba(255,255,255,.035))] p-6 shadow-purple-glow backdrop-blur-2xl sm:p-8">
          <p className="text-xs font-black uppercase tracking-[.34em] text-purple-100/45">Season Connected</p>
          <h2 className="mt-4 text-3xl font-black tracking-[-.06em] sm:text-5xl">This world now reads the global season.</h2>
          <p className="mt-4 max-w-3xl text-sm leading-7 text-white/65 sm:text-base">
            Change the Season Engine in Mission Control and this world follows.
          </p>
        </div>
      </section>
    </main>
  );
}
