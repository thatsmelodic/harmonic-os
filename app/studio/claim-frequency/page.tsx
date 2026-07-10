import Link from 'next/link';
import { ClaimFrequencyStudio } from '@/components/studio/ClaimFrequencyStudio';

export const metadata = {
  title: 'Claim Your Frequency | Harmonic OS',
  description: 'Found creator worlds, view world limits, and apply to Expand Your Universe.',
};

export default function ClaimFrequencyPage() {
  return (
    <main className="min-h-screen px-4 py-8 pb-28 sm:px-6">
      <div className="mx-auto max-w-7xl">
        <nav className="mb-8 flex flex-wrap items-center justify-between gap-3 text-white">
          <Link href="/studio" className="rounded-full border border-white/10 bg-white/[.04] px-4 py-3 text-sm font-black text-white/70">← Creator Studio</Link>
          <Link href="/studio/progression" className="rounded-full border border-white/10 bg-white/[.04] px-4 py-3 text-sm font-black text-white/70">Progression Studio</Link>
        </nav>
        <ClaimFrequencyStudio />
      </div>
    </main>
  );
}
