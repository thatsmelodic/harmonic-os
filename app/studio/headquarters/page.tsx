import Link from 'next/link';
import { UniversalCreatorHeadquarters } from '@/components/studio/UniversalCreatorHeadquarters';

export const metadata = {
  title: 'Creator Headquarters | Harmonic OS',
  description: 'Manage content, community, commerce, analytics, rewards, and settings for every creator world.',
};

export default function CreatorHeadquartersPage() {
  return (
    <main className="min-h-screen px-4 py-8 pb-28 sm:px-6">
      <div className="mx-auto max-w-7xl">
        <nav className="mb-8 flex flex-wrap items-center justify-between gap-3 text-white">
          <Link href="/studio" className="rounded-full border border-white/10 bg-white/[.04] px-4 py-3 text-sm font-black text-white/70">← Creator Studio</Link>
          <Link href="/studio/universe" className="rounded-full border border-white/10 bg-white/[.04] px-4 py-3 text-sm font-black text-white/70">Creator Universe</Link>
        </nav>
        <UniversalCreatorHeadquarters />
      </div>
    </main>
  );
}
