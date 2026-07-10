import Link from 'next/link';
import { FrequencyDock } from '@/components/FrequencyDock';
import { CreatorMissionControl } from '@/components/studio/CreatorMissionControl';
import { AiDirectorV2Studio } from '@/components/studio/AiDirectorV2Studio';

export const metadata = {
  title: 'Creator Studio + Creator Worlds | Harmonic OS',
  description: 'Mission Control, AI Director V2, Brain V3, Creator Worlds, seasonal FX, and holiday/cultural event layers for Harmonic OS worlds.',
};

export default function StudioPage() {
  return (
    <main className="min-h-screen px-6 py-8 pb-28">
      <FrequencyDock />
      <section className="mx-auto mb-8 max-w-7xl rounded-[2rem] border border-orange-300/15 bg-orange-400/[.06] p-6 text-white shadow-[0_0_50px_rgba(255,122,26,.12)]">
        <p className="text-xs font-black uppercase tracking-[.3em] text-orange-200/45">Live World Control</p>
        <div className="mt-3 flex flex-wrap items-center justify-between gap-5">
          <div><h1 className="text-4xl font-black tracking-[-.06em]">Fried Em Creator CMS</h1><p className="mt-2 max-w-2xl text-sm leading-7 text-white/50">Publish episodes, create Player Passports, and manage challenge outcomes through Supabase.</p></div>
          <Link href="/studio/fried-em" className="rounded-full bg-orange-400 px-6 py-3 text-sm font-black text-black shadow-[0_0_28px_rgba(255,122,26,.45)]">Open Fried Em CMS</Link>
        </div>
      </section>
      <CreatorMissionControl />
      <AiDirectorV2Studio />
    </main>
  );
}
