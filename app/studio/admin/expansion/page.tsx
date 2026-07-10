import Link from 'next/link';
import { UniverseExpansionAdmin } from '@/components/studio/UniverseExpansionAdmin';

export const metadata = {
  title: 'Universe Expansion Review | Harmonic OS',
  description: 'Review creator requests to expand beyond the three-world limit.',
};

export default function UniverseExpansionAdminPage() {
  return (
    <main className="min-h-screen px-4 py-8 pb-28 sm:px-6">
      <div className="mx-auto max-w-7xl">
        <nav className="mb-8 flex flex-wrap items-center justify-between gap-3 text-white">
          <Link href="/studio" className="rounded-full border border-white/10 bg-white/[.04] px-4 py-3 text-sm font-black text-white/70">← Creator Studio</Link>
          <Link href="/studio/universe" className="rounded-full border border-white/10 bg-white/[.04] px-4 py-3 text-sm font-black text-white/70">Creator Universe</Link>
        </nav>
        <UniverseExpansionAdmin />
      </div>
    </main>
  );
}
