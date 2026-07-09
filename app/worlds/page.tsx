import Link from 'next/link';
import { FrequencyDock } from '@/components/FrequencyDock';
import { harmonicWorlds } from '@/data/world-engine';

export const metadata = {
  title: 'Universe Map | Harmonic OS',
  description: 'Explore Harmonic OS worlds: Melodic, Fried Em, Schmackin, 2 Harmonic, and Business.',
};

export default function WorldsPage() {
  return (
    <main className="min-h-screen px-6 py-8 pb-28">
      <FrequencyDock />
      <section className="harmonic-container grid gap-5 py-8">
        <article className="rounded-[3.2rem] border border-purple-200/15 bg-[radial-gradient(circle_at_18%_10%,rgba(183,108,255,.28),transparent_34%),radial-gradient(circle_at_82%_0%,rgba(54,178,203,.18),transparent_34%),linear-gradient(135deg,rgba(255,255,255,.06),rgba(0,0,0,.5))] p-5 shadow-purple-glow backdrop-blur-2xl sm:p-8">
          <p className="text-xs font-black uppercase tracking-[.38em] text-purple-100/45">Explore Frequencies</p>
          <h1 className="mt-3 text-5xl font-black tracking-[-.09em] sm:text-7xl">Universe Map</h1>
          <p className="mt-4 max-w-5xl text-sm leading-7 text-purple-100/62 sm:text-base">Harmonic OS is not one website. It is a universe map where every creator world has its own rooms, economy, story, and frequency.</p>
        </article>

        <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
          {harmonicWorlds.map((world) => (
            <Link key={world.slug} href={`/worlds/${world.slug}`} className="group rounded-[2.2rem] border border-white/10 bg-black/30 p-5 backdrop-blur-2xl transition hover:-translate-y-1 hover:bg-white/[.05]" style={{ boxShadow: `0 0 48px ${world.primary}22` }}>
              <div className="grid h-24 place-items-center rounded-[1.8rem] border border-white/10" style={{ background: `radial-gradient(circle, ${world.primary}55, rgba(0,0,0,.4))` }}>
                <span className="text-4xl">{world.rooms[0]?.icon}</span>
              </div>
              <p className="mt-5 text-[.65rem] font-black uppercase tracking-[.18em] text-white/35">{world.eyebrow}</p>
              <h2 className="mt-2 text-2xl font-black tracking-[-.06em] text-white/88">{world.name}</h2>
              <p className="mt-3 text-xs leading-6 text-white/48">{world.tagline}</p>
              <div className="mt-5 rounded-full px-4 py-2 text-center text-xs font-black text-black" style={{ background: world.accent }}>Enter World</div>
            </Link>
          ))}
        </section>
      </section>
    </main>
  );
}
