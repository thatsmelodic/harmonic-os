import Link from 'next/link';
import { FriedEmCreatorCMS } from '@/components/studio/FriedEmCreatorCMS';

export const metadata = {
  title: 'Fried Em Creator CMS | Harmonic OS',
  description: 'Create Fried Em episodes and players, and manage challenge outcomes from Creator Studio.',
};

export default function FriedEmCreatorCMSPage() {
  return (
    <main className="fried-em-world min-h-screen px-4 py-8 pb-28 sm:px-6">
      <div className="mx-auto max-w-7xl">
        <nav className="mb-8 flex flex-wrap items-center justify-between gap-3 text-white">
          <Link href="/studio" className="rounded-full border border-white/10 bg-white/[.04] px-4 py-3 text-sm font-black text-white/70">← Creator Studio</Link>
          <div className="flex flex-wrap gap-2">
            <Link href="/worlds/fried-em" className="rounded-full border border-white/10 bg-white/[.04] px-4 py-3 text-sm font-black text-white/70">Open Fried Em</Link>
            <Link href="/worlds/fried-em/challenges" className="rounded-full border border-white/10 bg-white/[.04] px-4 py-3 text-sm font-black text-white/70">Challenge Arena</Link>
          </div>
        </nav>
        <FriedEmCreatorCMS />
      </div>
    </main>
  );
}
