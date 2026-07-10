import Link from 'next/link';
import { notFound } from 'next/navigation';
import { friedEmEpisodes, getFriedEmEpisode, getRelatedFriedEmEpisodes } from '@/data/fried-em-episodes';
import { getFriedEmPlayer } from '@/data/fried-em-players';

export function generateStaticParams() {
  return friedEmEpisodes.map((episode) => ({ slug: episode.slug }));
}

export default async function FriedEmEpisodePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const episode = getFriedEmEpisode(slug);

  if (!episode) notFound();

  const related = getRelatedFriedEmEpisodes(slug);
  const players = episode.featuredPlayerSlugs.map(getFriedEmPlayer).filter(Boolean);

  return (
    <main className="fried-em-world min-h-screen px-4 py-8 text-white sm:px-6">
      <div className="mx-auto max-w-6xl">
        <nav className="mb-8 flex flex-wrap items-center justify-between gap-3">
          <Link href="/worlds/fried-em/episodes" className="rounded-full border border-white/10 bg-white/[.04] px-4 py-3 text-sm font-black text-white/70">← Episode Wall</Link>
          <Link href="/worlds/fried-em" className="rounded-full border border-white/10 bg-white/[.04] px-4 py-3 text-sm font-black text-white/70">Back to Park</Link>
        </nav>

        <section className="overflow-hidden rounded-[2.8rem] border border-orange-300/15 bg-black/50 shadow-[0_0_80px_rgba(255,122,26,.16)] backdrop-blur-2xl">
          <div className="grid min-h-[420px] place-items-center bg-[radial-gradient(circle_at_center,rgba(255,122,26,.28),rgba(0,0,0,.86)_72%)]">
            {episode.youtubeId ? (
              <iframe className="aspect-video w-full" src={`https://www.youtube.com/embed/${episode.youtubeId}`} title={episode.title} allowFullScreen />
            ) : (
              <div className="text-center"><p className="text-7xl">▶</p><p className="mt-4 text-sm font-black text-white/45">Video source ready to connect</p></div>
            )}
          </div>
          <div className="p-6 sm:p-10">
            <div className="flex flex-wrap items-center gap-3 text-xs font-black uppercase tracking-[.18em] text-white/35"><span>Episode {String(episode.number).padStart(2, '0')}</span><span>•</span><span>{episode.court}</span><span>•</span><span>{episode.duration}</span></div>
            <h1 className="mt-4 text-5xl font-black tracking-[-.07em] sm:text-7xl">{episode.title}</h1>
            <p className="mt-4 text-xl font-black text-orange-200">{episode.subtitle}</p>
            <p className="mt-6 max-w-3xl text-base leading-8 text-white/55">{episode.description}</p>
            <div className="mt-6 flex flex-wrap gap-3"><span className="rounded-full border border-orange-300/20 bg-orange-400/10 px-4 py-2 text-sm font-black text-orange-100">Heat {episode.heat}</span><span className="rounded-full border border-white/10 bg-white/[.04] px-4 py-2 text-sm font-black text-white/70">{episode.result} · {episode.score}</span><span className="rounded-full border border-white/10 bg-white/[.04] px-4 py-2 text-sm font-black text-white/70">vs. {episode.opponent}</span></div>
          </div>
        </section>

        <section className="mt-6 grid gap-5 lg:grid-cols-[1.15fr_.85fr]">
          <article className="rounded-[2rem] border border-white/10 bg-black/40 p-6 backdrop-blur-xl">
            <p className="text-xs font-black uppercase tracking-[.25em] text-orange-200/45">Signature Moments</p>
            <div className="mt-5 grid gap-3">{episode.moments.map((moment) => <div key={moment.time} className="rounded-2xl border border-white/10 bg-white/[.035] p-4"><div className="flex items-center justify-between gap-3"><span className="font-mono text-sm text-orange-200">{moment.time}</span><span className="text-sm font-black">{moment.label}</span></div><p className="mt-3 text-sm leading-6 text-white/50">{moment.description}</p></div>)}</div>
          </article>

          <article className="rounded-[2rem] border border-white/10 bg-black/40 p-6 backdrop-blur-xl">
            <p className="text-xs font-black uppercase tracking-[.25em] text-orange-200/45">Featured Players</p>
            <div className="mt-5 grid gap-3">{players.map((player) => player && <Link key={player.slug} href={`/worlds/fried-em/players/${player.slug}`} className="rounded-2xl border border-white/10 bg-white/[.035] p-4 transition hover:border-orange-300/30"><p className="text-lg font-black">{player.name}</p><p className="mt-1 text-sm text-orange-200">{player.badge} · {player.record}</p><p className="mt-2 text-xs text-white/35">Cooked Meter {player.cookedMeter}%</p></Link>)}</div>
          </article>
        </section>

        <section className="mt-6">
          <p className="text-xs font-black uppercase tracking-[.25em] text-orange-200/45">Related Episodes</p>
          <div className="mt-4 grid gap-4 lg:grid-cols-2">{related.map((item) => <Link key={item.slug} href={`/worlds/fried-em/episodes/${item.slug}`} className="rounded-[1.8rem] border border-white/10 bg-black/40 p-5 transition hover:border-orange-300/30"><p className="text-xs text-white/35">EP. {String(item.number).padStart(2, '0')}</p><h2 className="mt-2 text-2xl font-black">{item.title}</h2><p className="mt-2 text-sm text-white/48">{item.subtitle}</p></Link>)}</div>
        </section>
      </div>
    </main>
  );
}
