import Link from 'next/link';
import { FrequencyDock } from '@/components/FrequencyDock';
import { VersionOneDashboard } from '@/components/VersionOneDashboard';
import { V1Roadmap } from '@/components/V1Roadmap';
import { OSDesktop } from '@/components/os/OSDesktop';

export const metadata = {
  title: 'Creator Hub | Harmonic OS',
  description: 'The version 1.0 creator command console for Harmonic OS.',
};

export default function HubPage() {
  return (
    <main className="min-h-screen px-6 py-8 pb-28">
      <FrequencyDock />
      <div className="harmonic-container">
        <Link href="/" className="inline-flex rounded-full border border-white/15 px-5 py-3 text-sm font-bold text-purple-100/75 glass-panel">Back to OS</Link>
      </div>
      <OSDesktop />
      <VersionOneDashboard />
      <V1Roadmap />
    </main>
  );
}
