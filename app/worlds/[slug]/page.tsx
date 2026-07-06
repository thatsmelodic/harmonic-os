import Link from 'next/link';
import { notFound } from 'next/navigation';
import { FrequencyDock } from '@/components/FrequencyDock';
import { ModuleCard } from '@/components/os/ModuleCard';
import { frequencies, getFrequency } from '@/lib/frequency-engine';

const portalActions: Record<string, { label: string; href: string; tone: 'primary' | 'secondary' }[]> = {
  melodic: [
    { label: 'Open Beat Vault', href: '/beats', tone: 'primary' },
    { label: 'Return to OS', href: '/#worlds', tone: 'secondary' },
  ],
  '2-harmonic': [
    { label: 'Open Shop Portal', href: '/shop', tone: 'primary' },
    { label: 'Return to OS', href: '/#worlds', tone: 'secondary' },
  ],
  'fried-em': [
    { label: 'Open Creator Hub', href: '/hub', tone: 'primary' },
    { label: 'Return to OS', href: '/#worlds', tone: 'secondary' },
  ],
  schmackinn: [
    { label: 'Open Schmackinn+', href: '/community/schmackinn', tone: 'primary' },
    { label: 'Return to OS', href: '/#worlds', tone: 'secondary' },
  ],
};

const portalCopy: Record<string, { signal: string; directive: string; atmosphere: string }> = {
  melodic: {
    signal: 'Sound becomes interface.',
    directive: 'Enter the source frequency for beats, songs, visuals, release energy, and the music identity that powers every world.',
    atmosphere: 'Studio glow, waveforms, late-night purple, and cyan reflections.',
  },
  '2-harmonic': {
    signal: 'Meaning becomes material.',
    directive: 'Enter the fashion frequency for stitched melodies, drops, lookbooks, symbols, and wearable stories.',
    atmosphere: 'Acid wash texture, chrome edges, clean product light, and cyan pulse.',
  },
  'fried-em': {
    signal: 'Pressure becomes performance.',
    directive: 'Enter the basketball frequency for episodes, challenges, rankings, court clips, and competitive energy.',
    atmosphere: 'Scoreboard fire, court light, fast cuts, and victory heat.',
  },
  schmackinn: {
    signal: 'Taste becomes culture.',
    directive: 'Enter the food frequency for reviews, restaurant energy, recommendations, questions, and community scores.',
    atmosphere: 'Restaurant neon, plate closeups, hot pink glow, and real reactions.',
  },
};

type PageProps = {
  params: {
    slug: string;
  };
};

export function generateStaticParams() {
  return frequencies.map((frequency) => ({ slug: frequency.slug }));
}

export function generateMetadata({ params }: PageProps) {
  const frequency = getFrequency(params.slug);

  if (!frequency) {
    return {
      title: 'World Not Found | Harmonic OS',
    };
  }

  return {
    title: `${frequency.name} | Harmonic OS`,
    description: frequency.tagline,
  };
}

export default function WorldPortalPage({ params }: PageProps) {
  const frequency = getFrequency(params.slug);

  if (!frequency) notFound();

  const copy = portalCopy[frequency.slug];
  const actions = portalActions[frequency.slug] ?? [{ label: 'Return to OS', href: '/#worlds', tone: 'primary' as const }];

  return (
    <main className="min-h-screen overflow-hidden px-6 py-8 pb-28">
      <FrequencyDock />

      <section className="harmonic-container relative grid min-h-[82vh] items-center gap-8 py-12 md:grid-cols-[1.05fr_.95fr]">
        <div className="pointer-events-none absolute inset-0 -z-10 rounded-[3rem] opacity-70" style={{ background: `radial-gradient(circle at 18% 18%, ${frequency.accent}33, transparent 28rem), radial-gradient(circle at 82% 68%, ${frequency.accent}22, transparent 24rem)` }} />
        <div className="pointer-events-none absolute left-1/2 top-10 -z-10 h-[38rem] w-[38rem] -translate-x-1/2 rounded-full blur-3xl" style={{ backgroundColor: `${frequency.accent}18` }} />

        <div>
          <Link href="/#worlds" className="inline-flex rounded-full border border-white/15 bg-white/5 px-5 py-3 text-sm font-black text-purple-100/75 backdrop-blur-xl">
            Back to World Select
          </Link>

          <div className="mt-10 flex flex-wrap items-center gap-3">
            <span className="rounded-full os-badge px-4 py-2 text-xs uppercase tracking-[0.3em] text-purple-100/65">Frequency Portal</span>
            <span className="rounded-full border border-white/10 px-4 py-2 text-xs font-black uppercase tracking-[0.25em] text-purple-100/45">{frequency.frequency}</span>
          </div>

          <h1 className="mt-7 text-6xl font-black leading-[.88] tracking-tight neon-text md:text-8xl">
            {frequency.name}
          </h1>
          <p className="mt-5 text-xl font-black text-purple-100/75 md:text-2xl">{copy.signal}</p>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-purple-100/68">{copy.directive}</p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            {actions.map((action) => (
              <Link
                key={action.href}
                href={action.href}
                className={action.tone === 'primary'
                  ? 'rounded-full bg-purple-200 px-7 py-4 text-center text-sm font-black text-black shadow-purple-glow'
                  : 'rounded-full border border-white/15 bg-white/5 px-7 py-4 text-center text-sm font-black text-purple-100/80 backdrop-blur-xl'}
              >
                {action.label}
              </Link>
            ))}
          </div>
        </div>

        <div className="glass-panel relative overflow-hidden rounded-[2.75rem] p-6 md:p-8">
          <div className="absolute right-0 top-0 h-48 w-48 rounded-full blur-3xl" style={{ backgroundColor: `${frequency.accent}33` }} />
          <p className="text-xs uppercase tracking-[0.35em] text-purple-200/45">Portal Atmosphere</p>
          <h2 className="mt-4 text-3xl font-black text-purple-50">{frequency.tagline}</h2>
          <p className="mt-4 leading-7 text-purple-100/62">{copy.atmosphere}</p>

          <div className="mt-8 grid gap-3">
            <div className="rounded-3xl border border-white/10 bg-black/25 p-5">
              <p className="text-xs uppercase tracking-[0.25em] text-purple-100/40">Palette</p>
              <div className="mt-4 flex items-center gap-3">
                <span className="h-12 w-12 rounded-2xl border border-white/10 shadow-purple-glow" style={{ backgroundColor: frequency.accent }} />
                <div>
                  <h3 className="font-black text-purple-50">{frequency.palette}</h3>
                  <p className="text-sm text-purple-100/50">Active portal color and visual mood.</p>
                </div>
              </div>
            </div>

            <div className="rounded-3xl border border-white/10 bg-black/25 p-5">
              <p className="text-xs uppercase tracking-[0.25em] text-purple-100/40">Season Bias</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {frequency.seasonBias.map((season) => (
                  <span key={season} className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-black text-purple-100/60">{season}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="harmonic-container pb-16">
        <div className="mb-7 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.4em] text-purple-200/60">Portal Modules</p>
            <h2 className="mt-3 text-4xl font-black md:text-6xl">Tools this world can open.</h2>
          </div>
          <p className="max-w-xl leading-7 text-purple-100/58">Public modules are visible now. Profile and creator modules are preserved as locked architecture for the next layers.</p>
        </div>

        <div className="grid gap-5 lg:grid-cols-3">
          <div className="glass-panel rounded-[2rem] p-5">
            <p className="mb-4 text-xs uppercase tracking-[0.3em] text-purple-200/45">Public</p>
            <div className="grid gap-4">
              {frequency.publicModules.map((module) => <ModuleCard key={module} module={module} userLevel="guest" compact />)}
            </div>
          </div>

          <div className="glass-panel rounded-[2rem] p-5">
            <p className="mb-4 text-xs uppercase tracking-[0.3em] text-purple-200/45">Profile</p>
            <div className="grid gap-4">
              {frequency.profileModules.map((module) => <ModuleCard key={module} module={module} userLevel="guest" compact />)}
            </div>
          </div>

          <div className="glass-panel rounded-[2rem] p-5">
            <p className="mb-4 text-xs uppercase tracking-[0.3em] text-purple-200/45">Creator</p>
            <div className="grid gap-4">
              {frequency.creatorModules.map((module) => <ModuleCard key={module} module={module} userLevel="guest" compact />)}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
