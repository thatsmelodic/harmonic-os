import Link from 'next/link';
import { notFound } from 'next/navigation';
import { FrequencyDock } from '@/components/FrequencyDock';

const worlds = {
  melodic: {
    number: '01',
    name: 'Melodic',
    signal: 'Music / Sound / Identity',
    headline: 'The source frequency.',
    copy: 'Songs, beats, visuals, and the creative identity behind the full Harmonic OS universe.',
    modules: ['Music vault', 'Beat previews', 'Visual drops', 'Behind the sound'],
  },
  '2-harmonic': {
    number: '02',
    name: '2 Harmonic',
    signal: 'Fashion / Stitched Melodies',
    headline: 'Wear the melody.',
    copy: 'Clothing drops, symbolism, collection stories, and the meaning stitched into every piece.',
    modules: ['Drop archive', 'Design codex', 'Lookbook', 'Shop entry'],
  },
  'fried-em': {
    number: '03',
    name: 'Fried Em',
    signal: 'Basketball / Competition',
    headline: 'Smoke on the court.',
    copy: 'Episodes, challenges, trash talk, highlights, and the full basketball entertainment world.',
    modules: ['Latest episode', 'Challenge board', 'Player files', 'Court clips'],
  },
  schmackinn: {
    number: '04',
    name: 'Schmackinn',
    signal: 'Food / Culture / Reviews',
    headline: 'Taste portal online.',
    copy: 'Food reviews, reactions, tier lists, culture, and personality-driven eating content.',
    modules: ['Food ratings', 'Review map', 'Tier list', 'Scraped videos'],
  },
};

type WorldSlug = keyof typeof worlds;

export function generateStaticParams() {
  return Object.keys(worlds).map((slug) => ({ slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const world = worlds[params.slug as WorldSlug];

  if (!world) {
    return { title: 'World Not Found | Harmonic OS' };
  }

  return {
    title: `${world.name} | Harmonic OS`,
    description: world.copy,
  };
}

export default function WorldPage({ params }: { params: { slug: string } }) {
  const world = worlds[params.slug as WorldSlug];

  if (!world) {
    notFound();
  }

  return (
    <main className="min-h-screen px-6 py-8 pb-28">
      <FrequencyDock />
      <div className="harmonic-container">
        <Link href="/#worlds" className="inline-flex rounded-full border border-white/15 px-5 py-3 text-sm font-bold text-purple-100/75 glass-panel">
          ← Back to OS
        </Link>

        <section className="grid min-h-[78vh] items-center gap-8 py-16 md:grid-cols-[1fr_.82fr]">
          <div>
            <p className="w-fit rounded-full os-badge px-4 py-2 text-xs uppercase tracking-[0.35em] text-purple-100/70">
              WORLD {world.number} · {world.signal}
            </p>
            <h1 className="mt-7 text-5xl font-black leading-[.92] tracking-tight neon-text md:text-8xl">{world.name}</h1>
            <h2 className="mt-6 text-3xl font-black md:text-5xl">{world.headline}</h2>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-purple-100/75">{world.copy}</p>
          </div>

          <div className="glass-panel rounded-[2.5rem] p-6 md:p-8">
            <div className="mb-6 flex items-center justify-between text-xs uppercase tracking-[0.25em] text-purple-100/50">
              <span>Portal Modules</span>
              <span>online</span>
            </div>
            <div className="grid gap-4">
              {world.modules.map((module) => (
                <div key={module} className="rounded-3xl border border-white/10 bg-white/5 p-5 transition hover:bg-white/10">
                  <div className="mb-3 h-3 w-3 rounded-full bg-purple-300 shadow-purple-glow" />
                  <h3 className="text-xl font-black">{module}</h3>
                  <p className="mt-2 text-sm leading-6 text-purple-100/60">Reserved portal space for the next Harmonic OS build phase.</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
