import Link from 'next/link';
import { FrequencyDock } from '@/components/FrequencyDock';
import { CreatorWorldsCoreV2Panel } from '@/components/studio/CreatorWorldsCoreV2Panel';
import { CreatorWorldsPrioritySprint } from '@/components/studio/CreatorWorldsPrioritySprint';
import { CreatorWorldsPanel } from '@/components/studio/CreatorWorldsPanel';

export const metadata = {
  title: 'Creator Worlds Platform | Harmonic OS',
  description: 'Dedicated Creator Worlds platform page for creator dashboards, world building, AI assistants, communities, media, collabs, rankings, modules, and native commerce.',
};

export default function CreatorWorldsPage() {
  return (
    <main className="min-h-screen px-6 py-8 pb-28">
      <FrequencyDock />
      <section className="harmonic-container py-8">
        <div className="rounded-[2.8rem] border border-purple-200/15 bg-[linear-gradient(135deg,rgba(183,108,255,.18),rgba(54,178,203,.07),rgba(0,0,0,.42))] p-5 shadow-purple-glow backdrop-blur-2xl sm:p-7">
          <div className="flex flex-wrap items-start justify-between gap-5">
            <div>
              <p className="text-xs font-black uppercase tracking-[.38em] text-purple-100/45">Platform Layer</p>
              <h1 className="mt-3 text-5xl font-black tracking-[-.09em] sm:text-7xl">Creator Worlds</h1>
              <p className="mt-4 max-w-5xl text-sm leading-7 text-purple-100/62 sm:text-base">
                The monetizable creator universe system for Harmonic OS. Creators do not just get pages; they get living worlds with dashboards, builder tools, personal AI, community, interactive media, collabs, rankings, modules, and native commerce paths.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link href="/studio" className="rounded-full bg-purple-300 px-5 py-3 text-sm font-black text-black shadow-purple-glow">Open Studio</Link>
              <Link href="/worlds" className="rounded-full border border-white/10 px-5 py-3 text-sm font-black text-purple-100/75 hover:bg-white/[.06]">Explore Worlds</Link>
            </div>
          </div>

          <div className="mt-6 grid gap-3 md:grid-cols-4">
            <HeroStat label="Creator Type" value="World Owner" />
            <HeroStat label="Revenue Paths" value="9+" />
            <HeroStat label="AI Control" value="Approval" />
            <HeroStat label="Commerce" value="Native" />
          </div>
        </div>
      </section>

      <section className="harmonic-container grid gap-5">
        <CreatorWorldsCoreV2Panel />
        <CreatorWorldsPrioritySprint />
        <CreatorWorldsPanel />
      </section>
    </main>
  );
}

function HeroStat({ label, value }: { label: string; value: string }) {
  return <div className="rounded-2xl border border-white/10 bg-black/30 p-4"><p className="text-xs font-black uppercase tracking-[.2em] text-white/35">{label}</p><p className="mt-2 text-3xl font-black tracking-[-.06em] text-purple-100">{value}</p></div>;
}
