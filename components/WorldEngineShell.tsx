import Link from 'next/link';
import { FrequencyDock } from '@/components/FrequencyDock';
import type { HarmonicWorldConfig } from '@/data/world-engine';

export function WorldEngineShell({ world }: { world: HarmonicWorldConfig }) {
  return (
    <main className="min-h-screen px-6 py-8 pb-28" style={{ ['--world-primary' as string]: world.primary, ['--world-secondary' as string]: world.secondary, ['--world-accent' as string]: world.accent }}>
      <FrequencyDock />
      <section className="harmonic-container grid gap-5 py-8">
        <article className="overflow-hidden rounded-[3.4rem] border border-white/10 p-5 shadow-purple-glow backdrop-blur-2xl sm:p-8" style={{ background: `radial-gradient(circle at 18% 8%, ${world.primary}55, transparent 34%), radial-gradient(circle at 82% 2%, ${world.secondary}42, transparent 35%), linear-gradient(135deg, rgba(255,255,255,.06), rgba(0,0,0,.55))` }}>
          <div className="flex flex-wrap items-start justify-between gap-5">
            <div>
              <p className="text-xs font-black uppercase tracking-[.38em] text-white/45">{world.eyebrow}</p>
              <h1 className="mt-3 text-5xl font-black tracking-[-.09em] text-white sm:text-7xl">{world.name}</h1>
              <p className="mt-3 text-xl font-black" style={{ color: world.secondary }}>{world.handle}</p>
              <p className="mt-4 max-w-5xl text-sm leading-7 text-white/62 sm:text-base">{world.tagline}</p>
              <p className="mt-3 max-w-5xl text-sm leading-7 text-white/45">{world.philosophy}</p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link href="/worlds" className="rounded-full border border-white/10 px-5 py-3 text-sm font-black text-white/75 hover:bg-white/[.06]">Universe Map</Link>
              <Link href="/creator-studio-v3" className="rounded-full px-5 py-3 text-sm font-black text-black shadow-purple-glow" style={{ background: world.accent }}>Studio</Link>
            </div>
          </div>
          <div className="mt-8 grid gap-3 md:grid-cols-3">
            {world.metrics.map((metric) => (
              <div key={metric.label} className="rounded-2xl border border-white/10 bg-black/30 p-4">
                <p className="text-[.65rem] font-black uppercase tracking-[.16em] text-white/30">{metric.label}</p>
                <p className="mt-2 text-2xl font-black tracking-[-.06em] text-white">{metric.value}</p>
              </div>
            ))}
          </div>
        </article>

        <section className="rounded-[2.6rem] border border-white/10 bg-black/30 p-5 backdrop-blur-2xl">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-xs font-black uppercase tracking-[.28em] text-white/40">Entry Sequence</p>
              <h2 className="mt-2 text-3xl font-black tracking-[-.07em] text-white/90">{world.entry}</h2>
            </div>
            <span className="rounded-full border border-white/10 px-3 py-1 text-[.65rem] font-black uppercase tracking-[.14em] text-white/45">{world.atmosphere}</span>
          </div>
          <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {world.rooms.map((room, index) => (
              <article key={room.id} className="group rounded-[2rem] border border-white/10 bg-white/[.035] p-4 transition hover:-translate-y-1 hover:bg-white/[.06]">
                <div className="flex items-start justify-between gap-3">
                  <span className="text-3xl">{room.icon}</span>
                  <span className="grid h-8 w-8 place-items-center rounded-full text-xs font-black text-black" style={{ background: world.secondary }}>{index + 1}</span>
                </div>
                <p className="mt-4 text-[.65rem] font-black uppercase tracking-[.18em] text-white/30">{room.type}</p>
                <h3 className="mt-2 text-2xl font-black tracking-[-.06em] text-white/88">{room.label}</h3>
                <p className="mt-3 text-xs leading-6 text-white/48">{room.description}</p>
                <button className="mt-5 rounded-full px-4 py-2 text-xs font-black text-black" style={{ background: world.accent }}>{room.cta}</button>
              </article>
            ))}
          </div>
        </section>
      </section>
    </main>
  );
}
