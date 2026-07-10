import Link from 'next/link';
import { MelodicUploadStudio } from '@/components/studio/MelodicUploadStudio';

export const metadata = {
  title: 'Melodic Upload Studio | Harmonic OS',
  description: 'Upload songs and beats, define their memory, metadata, licensing, and creative world treatment.',
};

export default function MelodicUploadStudioPage() {
  return (
    <main className="melodic-world relative min-h-screen overflow-hidden px-4 py-8 pb-28 sm:px-6">
      <div className="melodic-aurora absolute inset-0 -z-20" />
      <div className="frequency-grid absolute inset-0 -z-10 opacity-35" />
      <div className="mx-auto max-w-7xl">
        <nav className="mb-8 flex flex-wrap items-center justify-between gap-3 text-white">
          <Link href="/worlds/melodic" className="rounded-full border border-white/10 bg-white/[.04] px-4 py-3 text-sm font-black text-white/70">← Melodic Universe</Link>
          <div className="flex flex-wrap gap-2"><Link href="/worlds/melodic/vault" className="rounded-full border border-white/10 bg-white/[.04] px-4 py-3 text-sm font-black text-white/70">Music Vault</Link><Link href="/worlds/melodic/writing-room" className="rounded-full border border-white/10 bg-white/[.04] px-4 py-3 text-sm font-black text-white/70">Writing Room</Link></div>
        </nav>
        <MelodicUploadStudio />
      </div>
    </main>
  );
}
