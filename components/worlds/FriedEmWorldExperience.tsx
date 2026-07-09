import Link from 'next/link';
import { bootRuntime } from '@/lib/harmonic-signal-bus';
import { worldDefaults } from '@/lib/harmonic-engine';
import { HarmonicEnginePreview } from '@/components/engine/HarmonicEnginePreview';
import { SeasonalWorldLayer } from '@/components/seasons/SeasonalWorldLayer';
import './FriedEmWorldExperience.module.css';

const runtime = bootRuntime(worldDefaults['fried-em']);

const challenges = [
  { title: 'Next Up', matchup: 'Homie Run', stakes: 'Respect on camera', heat: 82 },
  { title: 'Call-Out Board', matchup: 'Open Gym', stakes: 'Winner gets episode title', heat: 74 },
  { title: 'Rematch Alert', matchup: 'Best of 3', stakes: 'No excuses', heat: 91 },
];

const fryStats = [
  { label: 'Buckets', value: 87 },
  { label: 'Stops', value: 64 },
  { label: 'Crowd', value: 92 },
  { label: 'Momentum', value: 96 },
  { label: 'Heat', value: 100 },
];

const replayBeats = ['Tunnel opens', 'Scoreboard powers on', 'Lights ignite', 'Bass shakes', 'Ball bounces', 'Highlight replay'];

export function FriedEmWorldExperience() {
  const state = runtime.state;

  return (
    <main className="fried-em-world relative isolate min-h-screen overflow-hidden pb-28">
      <SeasonalWorldLayer world="fried-em" season="autumn" />
      <div className="fried-em-aurora absolute inset-0 -z-30" />
      <div className="court-grid absolute inset-0 -z-20 opacity-50" />
      <div className="arena-light arena-light-left" />
      <div className="arena-light arena-light-right" />
      <div className="frequency-scan" />

      <section className="harmonic-container py-8 sm:py-12">
        <nav className="mb-8 flex items-center justify-between gap-4">
          <Link href="/" className="rounded-full border border-white/15 bg-white/[.05] px-4 py-3 text-sm font-black text-white/70 transition hover:bg-white/15">← Harmonic OS</Link>
          <p className="hidden font-mono text-xs uppercase tracking-[.32em] text-white/40 sm:block">30.0 FM / FRIED EM</p>
        </nav>

        <div className="grid gap-8 lg:grid-cols-[1.05fr_.95fr] lg:items-center">
          <div className="glass-panel fried-panel rounded-[2.5rem] p-6 sm:p-10">
            <p className="text-xs font-black uppercase tracking-[.42em] text-orange-200/55">Fried Em Frequency</p>
            <h1 className="mt-5 text-5xl font-black leading-none tracking-[-.09em] text-orange-50 sm:text-7xl lg:text-8xl">Welcome to Pressure.</h1>
            <p className="mt-6 max-w-2xl text-xl font-black leading-tight tracking-[-.04em] text-white/88 sm:text-3xl">This is the arena where heat turns into buckets and every run becomes an episode.</p>
            <p className="mt-6 max-w-2xl text-base leading-8 text-white/64 sm:text-lg">Autumn shifts Fried Em into hoodie runs, sunset blacktop energy, cold breath, streetlights, and leaves sliding across the court.</p>
            <div className="mt-8 grid gap-3 sm:grid-cols-3"><Metric label="Competition" value={state.dna.competition} /><Metric label="Motion" value={state.dna.motion} /><Metric label="Community" value={state.dna.community} /></div>
          </div>

          <aside className="scoreboard rounded-[2.5rem] border border-orange-200/15 bg-black/55 p-6 shadow-[0_0_60px_rgba(255,122,26,.20)] backdrop-blur-2xl sm:p-8">
            <div className="mb-6 flex items-center justify-between"><p className="text-xs font-black uppercase tracking-[.34em] text-white/40">Arena Runtime</p><span className="rounded-full border border-orange-200/20 px-3 py-1 font-mono text-xs text-orange-200/60">AUTUMN RUN</span></div>
            <div className="rounded-[2rem] border border-orange-200/10 bg-[radial-gradient(circle,rgba(255,122,26,.22),rgba(0,0,0,.38)_62%)] p-5">
              <div className="grid grid-cols-2 gap-4 text-center"><div className="rounded-2xl border border-white/10 bg-black/35 p-5"><p className="font-mono text-xs text-white/40">HOME</p><p className="mt-2 text-6xl font-black tracking-[-.08em] text-orange-200">21</p></div><div className="rounded-2xl border border-white/10 bg-black/35 p-5"><p className="font-mono text-xs text-white/40">RIVALS</p><p className="mt-2 text-6xl font-black tracking-[-.08em] text-white/75">11</p></div></div>
              <div className="mt-5 rounded-2xl border border-white/10 bg-black/35 p-4"><div className="mb-2 flex justify-between text-xs font-black uppercase tracking-[.2em] text-white/45"><span>Momentum Engine</span><span>96%</span></div><div className="h-3 overflow-hidden rounded-full bg-white/10"><div className="h-full rounded-full bg-orange-400 shadow-[0_0_28px_rgba(255,122,26,.85)]" style={{ width: '96%' }} /></div></div>
            </div>
          </aside>
        </div>
      </section>

      <section className="harmonic-container py-8"><div className="grid gap-4 lg:grid-cols-5">{fryStats.map((stat) => <div key={stat.label} className="fried-stat rounded-[2rem] border border-white/10 bg-white/[.05] p-5 backdrop-blur-xl"><p className="text-xs font-black uppercase tracking-[.22em] text-white/35">{stat.label}</p><p className="mt-3 text-5xl font-black tracking-[-.07em] text-orange-100">{stat.value}%</p></div>)}</div></section>

      <section className="harmonic-container py-8"><div className="mb-5"><p className="text-xs font-black uppercase tracking-[.34em] text-white/40">Challenge Board</p><h2 className="mt-3 text-3xl font-black tracking-[-.06em] sm:text-5xl">Who is getting fried?</h2></div><div className="grid gap-4 lg:grid-cols-3">{challenges.map((challenge, index) => <article key={challenge.title} className="challenge-card rounded-[2rem] border border-white/10 bg-black/35 p-5 backdrop-blur-xl"><p className="font-mono text-xs text-orange-200/45">0{index + 1}</p><h3 className="mt-4 text-3xl font-black tracking-[-.05em]">{challenge.title}</h3><p className="mt-3 text-xl font-black text-orange-200">{challenge.matchup}</p><p className="mt-3 text-sm leading-7 text-white/55">{challenge.stakes}</p><div className="mt-5 h-2 overflow-hidden rounded-full bg-white/10"><div className="h-full rounded-full bg-red-500" style={{ width: `${challenge.heat}%` }} /></div></article>)}</div></section>

      <section className="harmonic-container py-8"><div className="grid gap-5 lg:grid-cols-[.85fr_1.15fr]"><div className="glass-panel rounded-[2rem] p-6"><p className="text-xs font-black uppercase tracking-[.32em] text-white/40">Cinematic Replay</p><h2 className="mt-4 text-3xl font-black tracking-[-.05em]">Big plays trigger the world.</h2><p className="mt-4 text-sm leading-7 text-white/62">A highlight can later trigger slow motion, camera orbit, bass drop, fire burst, crowd eruption, and scoreboard shake through the same Signal Bus.</p></div><div className="glass-panel rounded-[2rem] p-6"><p className="text-xs font-black uppercase tracking-[.32em] text-white/40">Arena Timeline</p><div className="mt-5 grid gap-3 sm:grid-cols-6">{replayBeats.map((beat, index) => <div key={beat} className="rounded-2xl border border-white/10 bg-black/25 p-4"><p className="font-mono text-xs text-orange-200">0{index + 1}</p><p className="mt-3 text-sm font-bold leading-6 text-white/72">{beat}</p></div>)}</div></div></div></section>

      <section className="harmonic-container py-8"><HarmonicEnginePreview state={state} /></section>
    </main>
  );
}

function Metric({ label, value }: { label: string; value: number }) {
  return <div className="rounded-2xl border border-white/10 bg-white/[.04] p-4"><p className="text-xs font-black uppercase tracking-[.2em] text-white/35">{label}</p><p className="mt-2 text-3xl font-black tracking-[-.05em]">{value}%</p></div>;
}
