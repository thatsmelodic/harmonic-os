import { FrequencyDock } from '@/components/FrequencyDock';
import { CreatorMissionControl } from '@/components/studio/CreatorMissionControl';

export const metadata = {
  title: 'Creator Studio 2.0 | Harmonic OS',
  description: 'Mission Control cockpit for Harmonic OS worlds.',
};

export default function StudioPage() {
  return (
    <main className="min-h-screen px-6 py-8 pb-28">
      <FrequencyDock />
      <CreatorMissionControl />
    </main>
  );
}
