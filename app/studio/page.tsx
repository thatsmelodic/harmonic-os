import Link from 'next/link';
import { FrequencyDock } from '@/components/FrequencyDock';
import { CreatorMissionControl } from '@/components/studio/CreatorMissionControl';
import { AiDirectorV2Studio } from '@/components/studio/AiDirectorV2Studio';

export const metadata = {
  title: 'Creator Studio + Creator Worlds | Harmonic OS',
  description: 'Mission Control, Creator Worlds, progression systems, universe expansion, AI direction, and live world management for Harmonic OS.',
};

export default function StudioPage() {
  return (
    <main className="min-h-screen px-6 py-8 pb-28">
      <FrequencyDock />
      <section className="mx-auto mb-8 grid max-w-7xl gap-5 lg:grid-cols-3">
        <article className="rounded-[2rem] border border-cyan-300/15 bg-cyan-400/[.06] p-6 text-white shadow-[0_0_50px_rgba(54,178,203,.12)]">
          <p className="text-xs font-black uppercase tracking-[.3em] text-cyan-200/45">World Ownership</p>
          <h1 className="mt-3 text-4xl font-black tracking-[-.06em]">Creator Universe</h1>
          <p className="mt-2 text-sm leading-7 text-white/50">Claim up to three frequencies, see your world capacity, and apply to Expand Your Universe.</p>
          <Link href="/studio/universe" className="mt-5 inline-flex rounded-full bg-cyan-400 px-6 py-3 text-sm font-black text-black shadow-[0_0_28px_rgba(54,178,203,.45)]">Manage Your Universe</Link>
        </article>
        <article className="rounded-[2rem] border border-orange-300/15 bg-orange-400/[.06] p-6 text-white shadow-[0_0_50px_rgba(255,122,26,.12)]">
          <p className="text-xs font-black uppercase tracking-[.3em] text-orange-200/45">Live World Control</p>
          <h2 className="mt-3 text-4xl font-black tracking-[-.06em]">Fried Em CMS</h2>
          <p className="mt-2 text-sm leading-7 text-white/50">Publish episodes, create Player Passports, and manage challenge outcomes through Supabase.</p>
          <Link href="/studio/fried-em" className="mt-5 inline-flex rounded-full bg-orange-400 px-6 py-3 text-sm font-black text-black shadow-[0_0_28px_rgba(255,122,26,.45)]">Open Fried Em CMS</Link>
        </article>
        <article className="rounded-[2rem] border border-violet-300/15 bg-violet-400/[.06] p-6 text-white shadow-[0_0_50px_rgba(139,92,246,.12)]">
          <p className="text-xs font-black uppercase tracking-[.3em] text-violet-200/45">Community Culture</p>
          <h2 className="mt-3 text-4xl font-black tracking-[-.06em]">Progression & Rewards</h2>
          <p className="mt-2 text-sm leading-7 text-white/50">Rename XP, customize level titles, write constitutions, and create reward ladders.</p>
          <Link href="/studio/progression" className="mt-5 inline-flex rounded-full bg-violet-400 px-6 py-3 text-sm font-black text-black shadow-[0_0_28px_rgba(139,92,246,.45)]">Open Progression Studio</Link>
        </article>
      </section>
      <section className="mx-auto mb-8 max-w-7xl text-right">
        <Link href="/studio/admin/expansion" className="inline-flex rounded-full border border-amber-300/20 bg-amber-400/10 px-4 py-2 text-xs font-black text-amber-100">Founder: Review Expansion Applications</Link>
      </section>
      <CreatorMissionControl />
      <AiDirectorV2Studio />
    </main>
  );
}
