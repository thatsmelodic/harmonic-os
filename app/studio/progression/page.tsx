import Link from 'next/link';
import { HarmonicProgressionStudio } from '@/components/studio/HarmonicProgressionStudio';

export const metadata = {
  title: 'Progression Studio | Harmonic OS',
  description: 'Rename world progress, customize levels, write community constitutions, and create creator rewards.',
};

export default function ProgressionStudioPage() {
  return (
    <main className="min-h-screen px-4 py-8 pb-28 sm:px-6">
      <div className="mx-auto max-w-7xl">
        <nav className="mb-8 flex flex-wrap items-center justify-between gap-3 text-white">
          <Link href="/studio" className="rounded-full border border-white/10 bg-white/[.04] px-4 py-3 text-sm font-black text-white/70">← Creator Studio</Link>
          <Link href="/" className="rounded-full border border-white/10 bg-white/[.04] px-4 py-3 text-sm font-black text-white/70">Universe Map</Link>
        </nav>
        <HarmonicProgressionStudio />
      </div>
    </main>
  );
}
