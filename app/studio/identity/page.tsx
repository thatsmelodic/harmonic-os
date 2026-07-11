import Link from 'next/link';
import { IdentityEngineStudio } from '@/components/studio/IdentityEngineStudio';

export const metadata = {
  title: 'Identity Engine Studio | Harmonic OS',
  description: 'Frequency Marks, collection overrides, motion, metallic finish, particles, typography, and lighting for every Harmonic world.',
};

export default function IdentityStudioPage() {
  return (
    <main className="min-h-screen px-4 py-8 sm:px-6">
      <div className="mx-auto mb-5 max-w-7xl"><Link href="/studio" className="inline-flex rounded-full border border-white/10 bg-white/[.04] px-4 py-3 text-sm font-black text-white/65">← Creator Headquarters</Link></div>
      <IdentityEngineStudio />
    </main>
  );
}
