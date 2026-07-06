import Link from 'next/link';
import { FrequencyDock } from '@/components/FrequencyDock';

const modeCards = [
  ['Melodic Mode', 'Music drops, beat previews, visuals, and song world planning.'],
  ['Drop Mode', '2 Harmonic product launches, lookbooks, captions, and shop updates.'],
  ['Fried Mode', 'Basketball episodes, promo clips, matchups, and court challenges.'],
  ['Schmack Mode', 'Food reviews, tier lists, locations, reactions, and upload planning.'],
  ['Campaign Mode', 'Cross-platform rollouts for YouTube, TikTok, Instagram, Patreon, and the site.'],
  ['Night Build Mode', 'Private planning space for ideas, unfinished concepts, and next moves.'],
];

const panels = [
  ['Launch Queue', 'Next drops, videos, songs, and announcements waiting to go live.'],
  ['Upload Bay', 'A future space for images, beats, clips, product photos, and brand assets.'],
  ['Link Station', 'All social links, shop links, support links, and world-specific destinations.'],
  ['Content Calendar', 'A home for Fried Em, Schmackinn, Melodic, and 2 Harmonic posting schedules.'],
];

export const metadata = {
  title: 'Creator Hub | Harmonic OS',
  description: 'The creator command console for Harmonic OS modes, controls, and launch planning.',
};

export default function HubPage() {
  return (
    <main className="min-h-screen px-6 py-8 pb-28">
      <FrequencyDock />
      <div className="harmonic-container">
        <Link href="/" className="inline-flex rounded-full border border-white/15 px-5 py-3 text-sm font-bold text-purple-100/75 glass-panel">← Back to OS</Link>

        <section className="py-16">
          <p className="w-fit rounded-full os-badge px-4 py-2 text-xs uppercase tracking-[0.35em] text-purple-100/70">Harmonic OS · Creator Console</p>
          <h1 className="mt-7 text-5xl font-black leading-[.92] tracking-tight neon-text md:text-8xl">Creator Hub</h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-purple-100/75">This is your control room: modes, launch queue, uploads, links, content calendar, shop, beats, and every world you operate.</p>
        </section>

        <section className="grid gap-5 md:grid-cols-3">
          {modeCards.map(([title, copy]) => (
            <article key={title} className="glass-panel rounded-[2rem] p-6 transition hover:-translate-y-1 hover:shadow-purple-glow">
              <div className="mb-5 h-3 w-3 rounded-full bg-purple-300 shadow-purple-glow" />
              <h2 className="text-2xl font-black">{title}</h2>
              <p className="mt-4 leading-7 text-purple-100/65">{copy}</p>
              <button className="mt-6 rounded-full border border-white/15 px-5 py-3 text-sm font-black text-purple-100/75">Activate Mode</button>
            </article>
          ))}
        </section>

        <section className="mt-8 grid gap-5 md:grid-cols-4">
          {panels.map(([title, copy]) => (
            <article key={title} className="glass-panel rounded-[2rem] p-6">
              <p className="text-xs uppercase tracking-[0.25em] text-purple-200/45">Panel</p>
              <h2 className="mt-3 text-2xl font-black">{title}</h2>
              <p className="mt-4 leading-7 text-purple-100/65">{copy}</p>
            </article>
          ))}
        </section>
      </div>
    </main>
  );
}
