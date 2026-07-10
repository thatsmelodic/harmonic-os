import Link from 'next/link';
import { friedEmEpisodes } from '@/data/fried-em-episodes';

export const metadata = {
  title: 'Fried Em Episode Wall | Harmonic OS',
  description: 'Watch Fried Em episodes, browse matchups, heat, scores, and signature moments.',
};

export default function FriedEmEpisodesPage() {
  return (
    <main className="fried-em-world min-h-screen px-4 py-8 text-white sm:px-6">
      <div className="mx-auto max-w-6xl">
        <nav className="mb-8 flex flex-wrap items-center justify-between gap-3">
          <Link href="/worlds/fried-em#episodes" className="rounded-full border border-white/10 bg-white/[.04] px-4 py-3 text-sm font-black text-white/70">← Fried Em Park</Link>
          <Link href="/worlds/fried-em/players" className="rounded-full border border-white/10 bg-white/[.04] px-4 py-3 text-sm font-black text-white/70">Player Passports</Link>
        </nav>

        <header className="rounded-[2.8rem] border border-orange-300/15 bg-black/50 p-7 shadow-[0_0_80px_rgba(255,122,26,.16)] backdrop-blur-2xl sm:p-10">
          <p className="text-xs font-black uppercase tracking-[.34em] text-orange-200/45">Episode Engine</p>
          <h1 className="mt-4 text-6xl font-black tracking-[-.08em] sm:text-8xl">Episode Wall</h1>
          <p className="mt-5 max-w-2xl text-base leading-8 text-white/55">Every run becomes part of the Fried Em timeline. Matchups, scores, players, heat, and signature moments all live here.</p>
        </header>

        <section className="mt-6 grid gap-5 lg:grid-cols-3">
          {friedEmEpisodes.map((episode) => (
            <Link key={episode.slug} href={`/worlds/fried-em/episodes/${episode.slug}`} className="group overflow-hidden rounded-[2rem] border border-white/10 bg-black/40 backdrop-blur-xl transition hover:-translate-y-2 hover:border-orange-300/30">
              <div className="relative grid aspect-video place-items-center bg-[radial-gradient(circle_at_center,rgba(255,122,26,.32),rgba(0,0,0,.82)_68%)]">
                <span className="text-6xl transition group-hover:scale-110">▶</span>
                <span className="absolute left-3 top-3 rounded-full border border-orange-300/20 bg-black/55 px-3 py-2 text-xs font-black text-orange-100">EP. {String(episode.number).padStart(2, '0')}</span>
                <span className="absolute bottom-3 right-3 rounded-lg bg-black/70 px-2 py-1 font-mono text-xs">{episode.duration}</span>
              </div>
              <div className="p-5">
                <div className="flex items-center justify-between gap-3 text-xs text-white/35"><span>{episode.views} views</span><span>{episode.result} · {episode.score}</span></div>
                <h2 className="mt-3 text-3xl font-black tracking-[-.05em]">{episode.title}</h2>
                <p className="mt-2 text-sm leading-6 text-white/50">{episode.subtitle}</p>
                <div className="mt-5 flex items-center justify-between"><span className="rounded-full border border-orange-300/20 bg-orange-400/10 px-3 py-2 text-xs font-black text-orange-100">Heat {episode.heat}</span><span className="text-sm font-black text-orange-200">Open Episode →</span></div>
              </div>
            </Link>
          ))}
        </section>
      </div>
    </main>
  );
}
