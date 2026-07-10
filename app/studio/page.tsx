import Link from 'next/link';
import { FrequencyDock } from '@/components/FrequencyDock';
import { CreatorMissionControl } from '@/components/studio/CreatorMissionControl';
import { AiDirectorV2Studio } from '@/components/studio/AiDirectorV2Studio';

export const metadata = {
  title: 'Creator Studio + Creator Worlds | Harmonic OS',
  description: 'Mission Control, AI Director V2, Brain V3, Creator Worlds, progression systems, seasonal FX, and holiday/cultural event layers for Harmonic OS worlds.',
};

export default function StudioPage() {
  return (
    <main className="min-h-screen px-6 py-8 pb-28">
      <FrequencyDock />
      <section className="mx-auto mb-8 grid max-w-7xl gap-5 lg:grid-cols-2">
        <article className="rounded-[2rem] border border-orange-300/15 bg-orange-400/[.06] p-6 text-white shadow-[0_0_50px_rgba(255,122,26,.12)]">
          <p className="text-xs font-black uppercase tracking-[.3em] text-orange-200/45">Live World Control</p>
          <h1 className="mt-3 text-4xl font-black tracking-[-.06em]">Fried Em Creator CMS</h1>
          <p className="mt-2 max-w-2xl text-sm leading-7 text-white/50">Publish episodes, create Player Passports, and manage challenge outcomes through Supabase.</p>
          <Link href="/studio/fried-em" className="mt-5 inline-flex rounded-full bg-orange-400 px-6 py-3 text-sm font-black text-black shadow-[0_0_28px_rgba(255,122,26,.45)]">Open Fried Em CMS</Link>
        </article>
        <article className="rounded-[2rem] border border-violet-300/15 bg-violet-400/[.06] p-6 text-white shadow-[0_0_50px_rgba(139,92,246,.12)]">
          <p className="text-xs font-black uppercase tracking-[.3em] text-violet-200/45">Community Culture</p>
          <h2 className="mt-3 text-4xl font-black tracking-[-.06em]">Progression & Rewards</h2>
          <p className="mt-2 max-w-2xl text-sm leading-7 text-white/50">Rename XP for every world, customize level titles, write community constitutions, and create reward ladders.</p>
          <Link href="/studio/progression" className="mt-5 inline-flex rounded-full bg-violet-400 px-6 py-3 text-sm font-black text-black shadow-[0_0_28px_rgba(139,92,246,.45)]">Open Progression Studio</Link>
        </article>
      </section>
      <CreatorMissionControl />
      <AiDirectorV2Studio />
    </main>
  );
}
