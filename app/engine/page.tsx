import Link from 'next/link';
import { FrequencyDock } from '@/components/FrequencyDock';
import { HarmonicEngineBuilder } from '@/components/engine/HarmonicEngineBuilder';

export const metadata = {
  title: 'Harmonic Engine | Harmonic OS',
  description: 'Shared world-building engine for every Harmonic OS frequency.',
};

export default function EnginePage() {
  return (
    <main className="min-h-screen px-6 py-8 pb-28">
      <FrequencyDock />
      <div className="harmonic-container">
        <Link href="/studio" className="inline-flex rounded-full border border-white/15 px-5 py-3 text-sm font-bold text-purple-100/75 glass-panel">
          Back to Creator Studio
        </Link>
      </div>
      <HarmonicEngineBuilder />
    </main>
  );
}
