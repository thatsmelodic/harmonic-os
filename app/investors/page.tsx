import Link from 'next/link';
import { FrequencyDock } from '@/components/FrequencyDock';

const metrics = [
  ['Brand Worlds', '4'],
  ['Revenue Streams', '8'],
  ['Active Branches', 'Media · Fashion · Food · Hoops'],
  ['Roadmap Stage', 'V1 Build'],
];

const sections = [
  ['Ecosystem', '2 Harmonic, Melodic, Fried Em, and Schmackinn operate as connected worlds instead of isolated pages.'],
  ['Commerce', 'Shop portal, product drops, collection stories, wishlist behavior, and future checkout flow.'],
  ['Community', 'Profiles, reviews, Q&A, comments, recommendations, badges, voting, and saved content.'],
  ['Media Engine', 'YouTube, TikTok, Instagram, Patreon, music, food reviews, basketball content, and brand campaigns.'],
];

export const metadata = {
  title: 'Investor Mode | Harmonic OS',
  description: 'Investor-safe pitch layer for Harmonic OS.',
};

export default function InvestorsPage() {
  return (
    <main className="min-h-screen px-6 py-8 pb-28">
      <FrequencyDock />
      <div className="harmonic-container">
        <Link href="/hub" className="inline-flex rounded-full border border-white/15 px-5 py-3 text-sm font-bold text-purple-100/75 glass-panel">← Back to Hub</Link>

        <section className="py-16">
          <p className="w-fit rounded-full os-badge px-4 py-2 text-xs uppercase tracking-[0.35em] text-purple-100/70">Investor Mode · Clean View</p>
          <h1 className="mt-7 text-5xl font-black leading-[.92] tracking-tight neon-text md:text-8xl">The Business Case</h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-purple-100/75">A pitch-ready view of Harmonic OS: the creator ecosystem, revenue paths, audience growth, roadmap, and why the worlds matter together.</p>
        </section>

        <section className="grid gap-5 md:grid-cols-4">
          {metrics.map(([label, value]) => (
            <article key={label} className="glass-panel rounded-[2rem] p-6">
              <p className="text-xs uppercase tracking-[0.25em] text-purple-200/45">{label}</p>
              <h2 className="mt-4 text-3xl font-black">{value}</h2>
            </article>
          ))}
        </section>

        <section className="mt-8 grid gap-5 md:grid-cols-2">
          {sections.map(([title, copy]) => (
            <article key={title} className="glass-panel rounded-[2rem] p-6">
              <h2 className="text-3xl font-black">{title}</h2>
              <p className="mt-4 leading-7 text-purple-100/65">{copy}</p>
            </article>
          ))}
        </section>
      </div>
    </main>
  );
}
