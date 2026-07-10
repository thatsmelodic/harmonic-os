import Link from 'next/link';
import { CreatorUniverseStudio } from '@/components/studio/CreatorUniverseStudio';

export const metadata = {
  title: 'Creator Universe | Harmonic OS',
  description: 'Claim up to three creator worlds and apply to Expand Your Universe beyond the default limit.',
};

export default function CreatorUniversePage() {
  return (
    <main className="min-h-screen px-4 py-8 pb-28 sm:px-6">
      <div className="mx-auto max-w-7xl">
        <nav className="mb-8 flex flex-wrap items-center justify-between gap-3 text-white">
          <Link href="/studio" className="rounded-full border border-white/10 bg-white/[.04] px-4 py-3 text-sm font-black text-white/70">← Creator Studio</Link>
          <Link href="/creator-worlds" className="rounded-full border border-white/10 bg-white/[.04] px-4 py-3 text-sm font-black text-white/70">Creator Worlds</Link>
        </nav>
        <CreatorUniverseStudio />
      </div>
    </main>
  );
}
