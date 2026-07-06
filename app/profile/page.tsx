import Link from 'next/link';
import { FrequencyDock } from '@/components/FrequencyDock';
import { permissionLevels } from '@/data/harmonic-os';

const profileFeatures = ['Reviews', 'Recommendations', 'Comments', 'Q&A', 'Favorites', 'Votes', 'Badges', 'Saved Worlds'];

export const metadata = {
  title: 'Harmonic Profile | Harmonic OS',
  description: 'Profile layer for Harmonic OS community permissions.',
};

export default function ProfilePage() {
  return (
    <main className="min-h-screen px-6 py-8 pb-28">
      <FrequencyDock />
      <div className="harmonic-container">
        <Link href="/" className="inline-flex rounded-full border border-white/15 px-5 py-3 text-sm font-bold text-purple-100/75 glass-panel">← Back to OS</Link>

        <section className="grid gap-8 py-16 md:grid-cols-[1fr_.85fr] md:items-center">
          <div>
            <p className="w-fit rounded-full os-badge px-4 py-2 text-xs uppercase tracking-[0.35em] text-purple-100/70">Community Identity Layer</p>
            <h1 className="mt-7 text-5xl font-black leading-[.92] tracking-tight neon-text md:text-8xl">Harmonic Profile</h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-purple-100/75">Guests can explore. Profiles unlock participation. This keeps reviews, comments, Q&A, voting, recommendations, and community features clean.</p>
          </div>
          <div className="glass-panel rounded-[2.5rem] p-6">
            <div className="mx-auto mb-5 h-24 w-24 rounded-full border border-purple-200/25 bg-purple-300/10 shadow-purple-glow" />
            <h2 className="text-center text-3xl font-black">@YourFrequency</h2>
            <p className="mt-2 text-center text-purple-100/55">Favorite World: Schmackinn</p>
            <div className="mt-6 grid grid-cols-2 gap-3">
              {profileFeatures.map((feature) => (
                <div key={feature} className="rounded-2xl bg-white/5 p-3 text-center text-sm text-purple-100/65">{feature}</div>
              ))}
            </div>
          </div>
        </section>

        <section className="grid gap-5 md:grid-cols-5">
          {permissionLevels.map(([level, copy]) => (
            <article key={level} className="glass-panel rounded-[2rem] p-5">
              <h2 className="text-xl font-black">{level}</h2>
              <p className="mt-3 text-sm leading-6 text-purple-100/60">{copy}</p>
            </article>
          ))}
        </section>
      </div>
    </main>
  );
}
