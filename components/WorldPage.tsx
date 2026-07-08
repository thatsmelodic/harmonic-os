import type { CSSProperties } from 'react';
import Link from 'next/link';
import { frequencies, type FrequencyId, type FrequencyWorld } from '@/lib/frequencies';

type WorldPageProps = {
  world: FrequencyWorld;
};

export function WorldPage({ world }: WorldPageProps) {
  const siblingWorlds = frequencies.filter((frequency) => frequency.id !== world.id);

  return (
    <main
      className="relative isolate min-h-screen overflow-hidden pb-28"
      style={
        {
          '--frequency-primary': world.palette.primary,
          '--frequency-secondary': world.palette.secondary,
          '--frequency-aura': world.palette.aura,
          '--frequency-text': world.palette.text,
        } as CSSProperties
      }
    >
      <div className="frequency-grid absolute inset-0 -z-20 opacity-60" />
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_50%_10%,var(--frequency-aura),transparent_34rem)]" />
      <div className="frequency-scan" />

      <section className="harmonic-container py-8 sm:py-12">
        <nav className="mb-8 flex items-center justify-between gap-4">
          <Link href="/" className="rounded-full border border-white/15 bg-white/[.05] px-4 py-3 text-sm font-black text-white/70 transition hover:bg-white/15">
            ← Harmonic OS
          </Link>
          <p className="hidden font-mono text-xs uppercase tracking-[.32em] text-white/40 sm:block">{world.signal}</p>
        </nav>

        <div className="grid gap-8 lg:grid-cols-[1.08fr_.92fr] lg:items-center">
          <div className="glass-panel rounded-[2.25rem] p-6 sm:p-9">
            <p className="text-xs font-black uppercase tracking-[.38em] text-white/45">Frequency World</p>
            <h1 className="mt-4 text-5xl font-black leading-none tracking-[-.09em] sm:text-7xl lg:text-8xl" style={{ color: world.palette.text }}>
              {world.label}
            </h1>
            <p className="mt-5 max-w-2xl text-2xl font-black leading-tight tracking-[-.04em] text-white/90 sm:text-4xl">
              {world.hero}
            </p>
            <p className="mt-6 max-w-2xl text-base leading-8 text-white/66 sm:text-lg">
              {world.philosophy}
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <a href="#modules" className="rounded-full bg-[var(--frequency-primary)] px-5 py-3 text-sm font-black text-black shadow-[0_0_34px_var(--frequency-aura)] transition hover:scale-[1.03]">
                {world.cta}
              </a>
              <Link href="/#worlds" className="rounded-full border border-white/15 px-5 py-3 text-sm font-black text-white/70 transition hover:bg-white/10">
                Switch frequency
              </Link>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-xl">
            <div className="rounded-[2.25rem] border border-white/15 bg-black/45 p-5 shadow-purple-glow backdrop-blur-2xl">
              <div className="mb-5 flex items-center justify-between gap-3">
                <p className="text-xs font-black uppercase tracking-[.28em] text-white/45">World Kernel</p>
                <span className="rounded-full border border-white/10 px-3 py-1 font-mono text-xs text-white/45">LIVE</span>
              </div>
              <div className="grid aspect-square place-items-center rounded-[2rem] border border-white/10 bg-[radial-gradient(circle,var(--frequency-aura),rgba(0,0,0,.28)_58%)]">
                <div className="crystal-heart grid h-44 w-44 place-items-center rounded-[3rem] border border-white/15 bg-black/35 sm:h-56 sm:w-56">
                  <div className="absolute h-32 w-32 rounded-full bg-[var(--frequency-aura)] blur-3xl" />
                  <div className="relative text-center">
                    <p className="font-mono text-xs text-white/45">{world.signal}</p>
                    <p className="mt-2 text-3xl font-black tracking-[-.06em]" style={{ color: world.palette.text }}>
                      {world.label}
                    </p>
                  </div>
                </div>
              </div>
              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                <div className="rounded-2xl border border-white/10 bg-white/[.04] p-4">
                  <p className="text-xs font-black uppercase tracking-[.22em] text-white/40">Motion</p>
                  <p className="mt-2 text-sm leading-6 text-white/68">{world.motion}</p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/[.04] p-4">
                  <p className="text-xs font-black uppercase tracking-[.22em] text-white/40">Sound</p>
                  <p className="mt-2 text-sm leading-6 text-white/68">{world.sound}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="modules" className="harmonic-container py-8">
        <div className="mb-5 flex items-end justify-between gap-4">
          <div>
            <p className="text-xs font-black uppercase tracking-[.34em] text-white/40">Core Modules</p>
            <h2 className="mt-3 text-3xl font-black tracking-[-.06em] sm:text-5xl">What this world controls</h2>
          </div>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {world.features.map((feature) => (
            <article key={feature.title} className="portal-sheen rounded-[2rem] border border-white/12 bg-white/[.055] p-5 backdrop-blur-xl transition hover:-translate-y-1 hover:bg-white/[.08]">
              <span className="mb-5 block h-2 w-12 rounded-full bg-[var(--frequency-primary)] shadow-[0_0_24px_var(--frequency-aura)]" />
              <h3 className="text-2xl font-black tracking-[-.04em]">{feature.title}</h3>
              <p className="mt-3 text-sm leading-7 text-white/62">{feature.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="harmonic-container py-8">
        <div className="grid gap-5 lg:grid-cols-[.85fr_1.15fr]">
          <div className="glass-panel rounded-[2rem] p-6">
            <p className="text-xs font-black uppercase tracking-[.32em] text-white/40">Module Stack</p>
            <div className="mt-5 flex flex-wrap gap-2">
              {world.modules.map((module) => (
                <span key={module} className="rounded-full border border-white/10 bg-black/30 px-4 py-2 text-xs font-black text-white/65">
                  {module}
                </span>
              ))}
            </div>
          </div>

          <div className="glass-panel rounded-[2rem] p-6">
            <p className="text-xs font-black uppercase tracking-[.32em] text-white/40">World Timeline</p>
            <div className="mt-5 grid gap-3 sm:grid-cols-4">
              {world.timeline.map((item, index) => (
                <div key={item} className="rounded-2xl border border-white/10 bg-black/25 p-4">
                  <p className="font-mono text-xs text-[var(--frequency-primary)]">0{index + 1}</p>
                  <p className="mt-3 text-sm font-bold leading-6 text-white/72">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="harmonic-container py-8">
        <p className="mb-4 text-xs font-black uppercase tracking-[.32em] text-white/40">Other Frequencies</p>
        <div className="grid gap-3 sm:grid-cols-3">
          {siblingWorlds.map((frequency) => (
            <Link key={frequency.id} href={frequency.path} className="rounded-3xl border border-white/10 bg-white/[.045] p-4 transition hover:-translate-y-1 hover:bg-white/[.08]">
              <div className="flex items-center justify-between gap-3">
                <span className="font-black">{frequency.label}</span>
                <span className="font-mono text-xs text-white/35">{frequency.signal}</span>
              </div>
              <p className="mt-2 text-sm leading-6 text-white/55">{frequency.tagline}</p>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}

export function generateWorldMetadata(id: FrequencyId) {
  const world = frequencies.find((frequency) => frequency.id === id) ?? frequencies[0];
  return {
    title: `${world.label} | Harmonic OS`,
    description: world.hero,
  };
}
