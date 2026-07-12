import Link from 'next/link';
import { Phase4LivingRuntimeStudio } from '@/components/studio/Phase4LivingRuntimeStudio';

export const metadata = {
  title: 'Living Runtime Engine | Harmonic OS',
  description: 'Phase 4 layout, motion, presets, versions, assets, and device preview controls.',
};

export default function Phase4Page() {
  return (
    <main className="min-h-screen px-4 py-8 sm:px-6">
      <div className="mx-auto mb-5 flex max-w-7xl flex-wrap gap-3">
        <Link href="/studio/design" className="inline-flex rounded-full border border-white/10 bg-black/45 px-4 py-3 text-sm font-black text-white/65">← World Design & Copy</Link>
        <Link href="/studio" className="inline-flex rounded-full border border-white/10 bg-black/45 px-4 py-3 text-sm font-black text-white/65">Creator Studio</Link>
      </div>
      <Phase4LivingRuntimeStudio />
    </main>
  );
}
