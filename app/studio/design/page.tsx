import Link from 'next/link';
import { WorldDesignStudio } from '@/components/studio/WorldDesignStudio';

export const metadata = {
  title: 'World Design & Copy Studio | Harmonic OS',
  description: 'Organized visual identity, color, title, label, and publishing controls for every Harmonic OS world.',
};

export default function WorldDesignPage() {
  return (
    <main className="min-h-screen px-4 py-8 sm:px-6">
      <div className="mx-auto mb-5 max-w-7xl"><Link href="/studio" className="inline-flex rounded-full border border-white/10 bg-black/45 px-4 py-3 text-sm font-black text-white/65">← Creator Studio</Link></div>
      <WorldDesignStudio />
    </main>
  );
}
