import Link from 'next/link';
import { FriedEmClimateStudio } from '@/components/studio/FriedEmClimateStudio';

export const metadata = {
  title: 'Fried Em Climate Studio | Harmonic OS',
  description: 'Control seasons, weather, custom visual particles, size, density, speed, opacity, and wind for Fried Em.',
};

export default function FriedEmClimateStudioPage() {
  return (
    <main className="fried-em-world min-h-screen px-4 py-8 pb-28 sm:px-6">
      <div className="mx-auto max-w-7xl">
        <nav className="mb-8 flex flex-wrap items-center justify-between gap-3 text-white">
          <Link href="/studio/fried-em" className="rounded-full border border-white/10 bg-white/[.04] px-4 py-3 text-sm font-black text-white/70">← Fried Em CMS</Link>
          <Link href="/worlds/fried-em" className="rounded-full border border-white/10 bg-white/[.04] px-4 py-3 text-sm font-black text-white/70">Preview Park</Link>
        </nav>
        <FriedEmClimateStudio />
      </div>
    </main>
  );
}
