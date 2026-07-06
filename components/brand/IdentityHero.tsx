import { HarmonicMark } from './HarmonicMark';
import { NeonCup } from './NeonCup';

const portals = [
  ['Melodic', 'Music / Sound / Identity', '/worlds/melodic'],
  ['2 Harmonic', 'Fashion / Stitched Melodies', '/worlds/2-harmonic'],
  ['Fried Em', 'Basketball / Smoke / Victory', '/worlds/fried-em'],
  ['Schmackinn', 'Food / Reviews / Culture', '/worlds/schmackinn'],
];

export function IdentityHero() {
  return (
    <section className="relative min-h-screen overflow-hidden px-6 py-16">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(139,92,246,0.28),transparent_32%),radial-gradient(circle_at_85%_70%,rgba(54,178,203,0.15),transparent_26%),linear-gradient(180deg,#030006,#090012)]" />
      <div className="absolute inset-0 opacity-25 [background-image:linear-gradient(rgba(255,255,255,.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.08)_1px,transparent_1px)] [background-size:54px_54px]" />
      <NeonCup className="absolute right-5 top-24 opacity-70 md:right-16 md:top-20" />

      <div className="harmonic-container relative grid min-h-[80vh] items-center gap-10 md:grid-cols-[.9fr_1.1fr]">
        <div className="flex flex-col items-center text-center md:items-start md:text-left">
          <p className="rounded-full border border-white/15 bg-white/5 px-5 py-3 text-xs font-black uppercase tracking-[0.35em] text-purple-100/65 backdrop-blur-xl">Harmonic OS · Live Alpha</p>
          <div className="my-8 md:hidden">
            <HarmonicMark size={190} />
          </div>
          <h1 className="max-w-4xl text-5xl font-black leading-[.9] tracking-tight text-purple-50 drop-shadow-[0_0_28px_rgba(216,180,254,0.55)] md:text-8xl">
            One Frequency.<br />Many Worlds.
          </h1>
          <p className="mt-6 max-w-2xl text-lg font-semibold leading-8 text-purple-100/72">
            Harmonic OS is the living hub for Melodic: music, fashion, basketball, food, business, community, and creator control inside one cinematic universe.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a href="#worlds" className="rounded-full bg-purple-200 px-7 py-4 text-sm font-black text-black shadow-purple-glow">Enter the Worlds</a>
            <a href="/hub" className="rounded-full border border-white/15 bg-white/5 px-7 py-4 text-sm font-black text-purple-100/80 backdrop-blur-xl">Open Creator Hub</a>
          </div>
        </div>

        <div className="hidden md:grid place-items-center">
          <div className="relative">
            <HarmonicMark size={360} />
            <div className="absolute -bottom-8 left-1/2 w-[420px] -translate-x-1/2 rounded-full border border-white/10 bg-white/5 px-8 py-4 text-center text-sm font-black uppercase tracking-[0.28em] text-purple-100/55 backdrop-blur-xl">A Melodic Universe</div>
          </div>
        </div>
      </div>

      <div id="worlds" className="harmonic-container relative pb-20">
        <div className="grid gap-4 md:grid-cols-4">
          {portals.map(([name, signal, href]) => (
            <a key={name} href={href} className="group rounded-[2rem] border border-white/10 bg-white/[0.06] p-5 backdrop-blur-xl transition hover:-translate-y-1 hover:border-purple-200/40 hover:shadow-purple-glow">
              <div className="mb-6 h-20 rounded-[1.5rem] border border-white/10 bg-gradient-to-br from-purple-300/20 via-white/5 to-cyan-300/10" />
              <p className="text-xs uppercase tracking-[0.25em] text-purple-200/45">{signal}</p>
              <h2 className="mt-3 text-2xl font-black text-purple-50">{name}</h2>
              <p className="mt-4 text-sm font-bold text-purple-100/55 transition group-hover:text-purple-100">Enter World</p>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
