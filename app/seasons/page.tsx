import Link from 'next/link';
import { FrequencyDock } from '@/components/FrequencyDock';
import { seasons } from '@/data/harmonic-os';

export const metadata = {
  title: 'Season Engine | Harmonic OS',
  description: 'Seasonal UI system for Harmonic OS.',
};

export default function SeasonsPage() {
  return (
    <main className="min-h-screen px-6 py-8 pb-28">
      <FrequencyDock />
      <div className="harmonic-container">
        <Link href="/hub" className="inline-flex rounded-full border border-white/15 px-5 py-3 text-sm font-bold text-purple-100/75 glass-panel">← Back to Hub</Link>

        <section className="py-16">
          <p className="w-fit rounded-full os-badge px-4 py-2 text-xs uppercase tracking-[0.35em] text-purple-100/70">Season Engine</p>
          <h1 className="mt-7 text-5xl font-black leading-[.92] tracking-tight neon-text md:text-8xl">The OS changes with time.</h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-purple-100/75">Seasons are not wallpapers. They change color, motion, featured worlds, mood, campaigns, and what the homepage pushes first.</p>
        </section>

        <section className="grid gap-5 md:grid-cols-4">
          {seasons.map((season) => (
            <article key={season.name} className="glass-panel rounded-[2rem] p-6">
              <div className="mb-6 flex gap-2">
                {season.palette.map((color) => <span key={color} className="h-10 flex-1 rounded-xl border border-white/10" style={{ backgroundColor: color }} />)}
              </div>
              <h2 className="text-3xl font-black">{season.name}</h2>
              <p className="mt-4 leading-7 text-purple-100/65">{season.role}</p>
              <button className="mt-6 rounded-full border border-white/15 px-5 py-3 text-sm font-black text-purple-100/75">Preview Season</button>
            </article>
          ))}
        </section>
      </div>
    </main>
  );
}
