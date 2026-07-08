import { defaultCopy } from '@/lib/cms-schema';
import { frequencies } from '@/lib/frequencies';
import { HarmonicMark } from './HarmonicMark';
import { NeonCup } from './NeonCup';

const heroCopy = defaultCopy.find((copy) => copy.id === 'home-hero') ?? defaultCopy[0];
const portals = frequencies.filter((frequency) => frequency.key !== 'os');

export function IdentityHero() {
  const [firstLine, secondLine] = heroCopy.headline.split('. ');

  return (
    <section className="relative min-h-screen overflow-hidden px-6 py-12 md:py-16">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_18%,rgba(139,92,246,0.32),transparent_32%),radial-gradient(circle_at_85%_70%,rgba(54,178,203,0.17),transparent_26%),linear-gradient(180deg,#030006,#090012_64%,#030006)]" />
      <div className="absolute inset-0 opacity-25 [background-image:linear-gradient(rgba(255,255,255,.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.08)_1px,transparent_1px)] [background-size:54px_54px]" />
      <div className="frequency-scan" />
      <NeonCup className="absolute right-4 top-20 opacity-65 md:right-16 md:top-20" />

      <div className="harmonic-container relative grid min-h-[78vh] items-center gap-10 md:grid-cols-[.9fr_1.1fr]">
        <div className="animate-rise flex flex-col items-center text-center md:items-start md:text-left">
          <p className="rounded-full border border-white/15 bg-white/5 px-5 py-3 text-xs font-black uppercase tracking-[0.35em] text-purple-100/65 backdrop-blur-xl">Harmonic OS · Live Alpha</p>
          <div className="my-8 md:hidden">
            <HarmonicMark size={190} />
          </div>
          <h1 className="max-w-4xl text-5xl font-black leading-[.9] tracking-tight text-purple-50 drop-shadow-[0_0_28px_rgba(216,180,254,0.55)] sm:text-6xl md:text-8xl">
            {firstLine}.<br />{secondLine}
          </h1>
          <p className="mt-6 max-w-2xl text-base font-semibold leading-7 text-purple-100/72 sm:text-lg sm:leading-8">
            {heroCopy.subheadline}
          </p>
          <div className="mt-8 flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
            <a href="#worlds" className="rounded-full bg-purple-200 px-7 py-4 text-center text-sm font-black text-black shadow-purple-glow transition hover:-translate-y-0.5 hover:bg-purple-100">{heroCopy.primaryCta}</a>
            <a href="/hub" className="rounded-full border border-white/15 bg-white/5 px-7 py-4 text-center text-sm font-black text-purple-100/80 backdrop-blur-xl transition hover:-translate-y-0.5 hover:border-purple-200/55 hover:bg-white/10">{heroCopy.secondaryCta}</a>
          </div>

          <div className="mt-8 grid w-full max-w-2xl gap-3 text-left sm:grid-cols-3">
            {['Boot sequence online', 'Frequency engine live', 'Four worlds synced'].map((status) => (
              <div key={status} className="rounded-2xl border border-white/10 bg-white/[0.045] px-4 py-3 text-xs font-black uppercase tracking-[0.18em] text-purple-100/50 backdrop-blur-xl">
                {status}
              </div>
            ))}
          </div>
        </div>

        <div className="animate-rise-delay hidden md:grid place-items-center">
          <div className="relative">
            <HarmonicMark size={360} />
            <div className="absolute -bottom-8 left-1/2 w-[420px] -translate-x-1/2 rounded-full border border-white/10 bg-white/5 px-8 py-4 text-center text-sm font-black uppercase tracking-[0.28em] text-purple-100/55 backdrop-blur-xl">A Melodic Universe</div>
          </div>
        </div>
      </div>

      <div id="worlds" className="harmonic-container relative pb-16 md:pb-20">
        <div className="mb-5 flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.35em] text-purple-200/45">World Select</p>
            <h2 className="mt-2 text-3xl font-black md:text-5xl">Choose a frequency.</h2>
          </div>
          <p className="max-w-lg text-sm leading-6 text-purple-100/55">Each portal opens a different expression of the same creative source.</p>
        </div>
        <div className="grid gap-4 md:grid-cols-4">
          {portals.map((portal) => (
            <a key={portal.key} href={portal.href} className="portal-sheen group rounded-[2rem] border border-white/10 bg-white/[0.06] p-5 backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-purple-200/40 hover:shadow-purple-glow">
              <div className="mb-6 h-20 rounded-[1.5rem] border border-white/10" style={{ background: `linear-gradient(135deg, ${portal.primary}33, rgba(255,255,255,.06), ${portal.secondary}22)` }} />
              <p className="text-xs uppercase tracking-[0.25em] text-purple-200/45">{portal.signal}</p>
              <h3 className="mt-3 text-2xl font-black text-purple-50">{portal.world}</h3>
              <p className="mt-3 min-h-[3rem] text-sm leading-6 text-purple-100/55">{portal.tagline}</p>
              <p className="mt-5 text-sm font-bold text-purple-100/55 transition group-hover:text-purple-100">Enter World</p>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
