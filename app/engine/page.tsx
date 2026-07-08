import Link from 'next/link';
import { FrequencyDock } from '@/components/FrequencyDock';
import { HarmonicEngineControlRoom } from '@/components/engine/HarmonicEngineControlRoom';

export default function EnginePage() {
  return (
    <main className="min-h-screen px-6 py-8 pb-28">
      <FrequencyDock />
      <div className="harmonic-container">
        <Link href="/studio" className="inline-flex rounded-full border border-white/15 px-5 py-3 text-sm font-bold text-purple-100/75 glass-panel">
          Back to Creator Studio
        </Link>
      </div>
      <HarmonicEngineControlRoom />
    </main>
  );
}
