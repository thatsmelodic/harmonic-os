import { FrequencyDock } from '@/components/FrequencyDock';
import { CreatorMissionControl } from '@/components/studio/CreatorMissionControl';
import { AiDirectorV2Studio } from '@/components/studio/AiDirectorV2Studio';

export const metadata = {
  title: 'Creator Studio + Seasonal Holiday FX | Harmonic OS',
  description: 'Mission Control, AI Director V2, Brain V3, complete seasonal FX, and holiday/cultural event layers for Harmonic OS worlds.',
};

export default function StudioPage() {
  return (
    <main className="min-h-screen px-6 py-8 pb-28">
      <FrequencyDock />
      <CreatorMissionControl />
      <AiDirectorV2Studio />
    </main>
  );
}
