import Link from 'next/link';
import { SchmackinnGeographyStudio } from '@/components/schmackinn/SchmackinnGeographyStudio';

export const metadata = {
  title: 'Schmackinn Geography Studio | Harmonic OS',
  description: 'Create and manage cities, districts, neighborhoods, campuses, and food zones for Flavor City.',
};

export default function SchmackinnGeographyPage() {
  return (
    <>
      <div className="fixed left-4 top-4 z-50"><Link href="/worlds/schmackinn" className="rounded-full border border-white/10 bg-black/75 px-4 py-3 text-sm font-black text-white/70 backdrop-blur-xl">← Schmackinn</Link></div>
      <SchmackinnGeographyStudio />
    </>
  );
}
