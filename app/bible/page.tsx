import Link from 'next/link';
import { FrequencyDock } from '@/components/FrequencyDock';
import { HarmonicBiblePreview } from '@/components/HarmonicBiblePreview';

export const metadata = {
  title: 'Harmonic Bible | Harmonic OS',
  description: 'The symbols, philosophy, lore, and world meaning behind Harmonic OS.',
};

export default function BiblePage() {
  return (
    <main className="min-h-screen pb-28 text-white">
      <FrequencyDock />

      <header className="harmonic-container pt-12 md:pt-20">
        <div className="rounded-[2.6rem] border border-white/10 bg-black/35 p-7 backdrop-blur-2xl md:p-10">
          <p className="text-xs font-black uppercase tracking-[.36em] text-purple-200/50">Harmonic OS · Philosophy Layer</p>
          <h1 className="mt-4 text-5xl font-black tracking-[-.07em] md:text-8xl">The Harmonic Bible</h1>
          <p className="mt-5 max-w-3xl text-base leading-8 text-purple-100/62">
            One dedicated place for the symbols, origin story, philosophy, and meaning connecting every world inside Harmonic OS.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Link href="/universe" className="rounded-full bg-purple-200 px-5 py-3 text-sm font-black text-black transition hover:-translate-y-0.5 hover:bg-purple-100">
              Open World Directory
            </Link>
            <Link href="/studio" className="rounded-full border border-white/15 px-5 py-3 text-sm font-black text-white/75 transition hover:bg-white/10 hover:text-white">
              Open Creator Studio
            </Link>
          </div>
        </div>
      </header>

      <HarmonicBiblePreview />
    </main>
  );
}
