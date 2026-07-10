import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getFriedEmEpisode } from '@/data/fried-em-episodes';
import { getFriedEmPlayer } from '@/data/fried-em-players';
import { friedEmSeasons, getFriedEmSeason } from '@/data/fried-em-seasons';

export function generateStaticParams() {
  return friedEmSeasons.map((season) => ({ slug: season.slug }));
}

export default async function FriedEmSeasonPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const season = getFriedEmSeason(slug);
  if (!season) notFound();

  const episodes = season.episodeSlugs.map(getFriedEmEpisode).filter(Boolean);
  const players = season.featuredPlayerSlugs.map(getFriedEmPlayer).filter(Boolean);

  return (
    <main className="fried-em-world min-h-screen px-4 py-8 text-white sm:px-6">
      <div className="mx-auto max-w-6xl">
        <nav className="mb-8 flex flex-wrap items-center justify-between gap-3">
          <Link href="/worlds/fried-em/seasons" className="rounded-full border border-white/10 bg-white/[.04] px-4 py-3 text-sm font-black text-white/70">← Seasons</Link>
          <Link href="/worlds/fried-em" className="rounded-full border border-white/10 bg-white/[.04] px-4 py-3 text-sm font-black text-white/70">Back to Park</Link>
        </nav>

        <header className="rounded-[2.8rem] border border-orange-300/15 bg-black/50 p-7 shadow-[0_0_80px_rgba(255,122,26,.16)] backdrop-blur-2xl sm:p-10">
          <div className="flex flex-wrap items-start justify-between gap-5">
            <div>
              <p className="text-xs font-black uppercase tracking-[.34em] text-orange-200/45">Season {String(season.number).padStart(2, '0')}</p>
              <h1 className="mt-4 text-6xl font-black tracking-[-.08em] sm:text-8xl">{season.title}</h1>
              <p className="mt-4 text-xl font-black text-orange-200">{season.subtitle}</p>
            </div>
            <span className="rounded-full border border-orange-300/20 bg-orange-400/10 px-4 py-2 text-xs font-black uppercase tracking-[.18em] text-orange-100">{season.status}</span>
          </div>
          <p className="mt-6 max-w-3xl text-base leading-8 text-white/55">{season.description}</p>
          <div className="mt-6 grid gap-3 sm:grid-cols-3"><Mini label="Episodes" value={String(episodes.length)} /><Mini label="Players" value={String(players.length)} /><Mini label="Started" value={season.startDate} /></div>
        </header>

        <section className="mt-6 grid gap-5 lg:grid-cols-[1.15fr_.85fr]">
          <article className="rounded-[2rem] border border-white/10 bg-black/40 p-6 backdrop-blur-xl">
            <p className="text-xs font-black uppercase tracking-[.24em] text-orange-200/45">Season Theme</p>
            <h2 className="mt-3 text-3xl font-black tracking-[-.05em]">The atmosphere</h2>
            <p className="mt-4 text-sm leading-7 text-white/50">{season.theme}</p>
          </article>
          <article className="rounded-[2rem] border border-white/10 bg-black/40 p-6 backdrop-blur-xl">
            <p className="text-xs font-black uppercase tracking-[.24em] text-orange-200/45">Rules</p>
            <div className="mt-4 grid gap-3">{season.rules.map((rule, index) => <div key={rule} className="rounded-2xl border border-white/10 bg-white/[.035] p-4"><span className="font-mono text-xs text-orange-200/45">0{index + 1}</span><p className="mt-2 text-sm leading-6 text-white/60">{rule}</p></div>)}</div>
          </article>
        </section>

        <section className="mt-6">
          <div className="flex items-end justify-between gap-4"><div><p className="text-xs font-black uppercase tracking-[.24em] text-orange-200/45">Season Storyline</p><h2 className="mt-3 text-4xl font-black tracking-[-.06em]">Episodes</h2></div><Link href="/worlds/fried-em/episodes" className="text-sm font-black text-orange-200">Full Episode Wall →</Link></div>
          <div className="mt-4 grid gap-4 lg:grid-cols-3">{episodes.map((episode) => episode && <Link key={episode.slug} href={`/worlds/fried-em/episodes/${episode.slug}`} className="rounded-[1.8rem] border border-white/10 bg-black/40 p-5 transition hover:border-orange-300/30"><p className="text-xs text-white/35">EP. {String(episode.number).padStart(2, '0')}</p><h3 className="mt-2 text-2xl font-black">{episode.title}</h3><p className="mt-2 text-sm text-white/48">{episode.subtitle}</p><div className="mt-4 flex justify-between text-xs text-orange-200/70"><span>{episode.result} · {episode.score}</span><span>Heat {episode.heat}</span></div></Link>)}</div>
        </section>

        <section className="mt-6">
          <div className="flex items-end justify-between gap-4"><div><p className="text-xs font-black uppercase tracking-[.24em] text-orange-200/45">MVP Race</p><h2 className="mt-3 text-4xl font-black tracking-[-.06em]">Featured players</h2></div><Link href="/worlds/fried-em/players" className="text-sm font-black text-orange-200">Cooked Board →</Link></div>
          <div className="mt-4 grid gap-4 lg:grid-cols-3">{players.map((player, index) => player && <Link key={player.slug} href={`/worlds/fried-em/players/${player.slug}`} className="rounded-[1.8rem] border border-white/10 bg-black/40 p-5 transition hover:border-orange-300/30"><p className="text-xs font-black uppercase tracking-[.18em] text-orange-200/45">MVP Rank #{index + 1}</p><h3 className="mt-3 text-3xl font-black">{player.name}</h3><p className="mt-2 text-sm text-orange-200">{player.badge} · {player.record}</p><div className="mt-4 h-2 overflow-hidden rounded-full bg-white/10"><div className="h-full rounded-full bg-orange-400" style={{ width: `${player.heat}%` }} /></div><p className="mt-2 text-xs text-white/35">Heat {player.heat} · Respect {player.respect}</p></Link>)}</div>
        </section>
      </div>
    </main>
  );
}

function Mini({ label, value }: { label: string; value: string }) {
  return <div className="rounded-2xl border border-white/10 bg-white/[.035] p-4"><p className="text-[.65rem] font-black uppercase tracking-[.16em] text-white/30">{label}</p><p className="mt-2 text-xl font-black">{value}</p></div>;
}
