import Link from 'next/link';
import { friedEmSeasons } from '@/data/fried-em-seasons';

export const metadata = {
  title: 'Fried Em Seasons | Harmonic OS',
  description: 'Browse Fried Em seasons, episodes, rankings, champions, and MVP races.',
};

export default function FriedEmSeasonsPage() {
  return (
    <main className="fried-em-world min-h-screen px-4 py-8 text-white sm:px-6">
      <div className="mx-auto max-w-6xl">
        <nav className="mb-8 flex flex-wrap items-center justify-between gap-3">
          <Link href="/worlds/fried-em" className="rounded-full border border-white/10 bg-white/[.04] px-4 py-3 text-sm font-black text-white/70">← Fried Em Park</Link>
          <Link href="/worlds/fried-em/episodes" className="rounded-full border border-white/10 bg-white/[.04] px-4 py-3 text-sm font-black text-white/70">Episode Wall</Link>
        </nav>

        <header className="rounded-[2.8rem] border border-orange-300/15 bg-black/50 p-7 shadow-[0_0_80px_rgba(255,122,26,.16)] backdrop-blur-2xl sm:p-10">
          <p className="text-xs font-black uppercase tracking-[.34em] text-orange-200/45">Season Engine</p>
          <h1 className="mt-4 text-6xl font-black tracking-[-.08em] sm:text-8xl">Every run means something.</h1>
          <p className="mt-5 max-w-3xl text-base leading-8 text-white/55">Seasons connect episodes, challenges, rankings, MVP races, and championships into one continuous Fried Em storyline.</p>
        </header>

        <section className="mt-6 grid gap-5">
          {friedEmSeasons.map((season) => (
            <Link key={season.slug} href={`/worlds/fried-em/seasons/${season.slug}`} className="group rounded-[2.2rem] border border-white/10 bg-black/40 p-6 backdrop-blur-xl transition hover:-translate-y-1 hover:border-orange-300/30 sm:p-8">
              <div className="flex flex-wrap items-start justify-between gap-5">
                <div>
                  <p className="text-xs font-black uppercase tracking-[.24em] text-orange-200/45">Season {String(season.number).padStart(2, '0')}</p>
                  <h2 className="mt-3 text-4xl font-black tracking-[-.06em] sm:text-6xl">{season.title}</h2>
                  <p className="mt-3 text-lg font-black text-orange-200">{season.subtitle}</p>
                  <p className="mt-5 max-w-3xl text-sm leading-7 text-white/50">{season.description}</p>
                </div>
                <span className="rounded-full border border-orange-300/20 bg-orange-400/10 px-4 py-2 text-xs font-black uppercase tracking-[.18em] text-orange-100">{season.status}</span>
              </div>
              <div className="mt-6 grid gap-3 sm:grid-cols-3"><Mini label="Episodes" value={String(season.episodeSlugs.length)} /><Mini label="Players" value={String(season.featuredPlayerSlugs.length)} /><Mini label="Started" value={season.startDate} /></div>
              <span className="mt-6 inline-flex text-sm font-black text-orange-200 transition group-hover:translate-x-1">Enter Season →</span>
            </Link>
          ))}
        </section>
      </div>
    </main>
  );
}

function Mini({ label, value }: { label: string; value: string }) {
  return <div className="rounded-2xl border border-white/10 bg-white/[.035] p-4"><p className="text-[.65rem] font-black uppercase tracking-[.16em] text-white/30">{label}</p><p className="mt-2 text-xl font-black">{value}</p></div>;
}
