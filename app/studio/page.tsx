import { FrequencyDock } from '@/components/FrequencyDock';
import { CreatorMissionControl } from '@/components/studio/CreatorMissionControl';
import { AiDirectorV2Studio } from '@/components/studio/AiDirectorV2Studio';

export const metadata = {
  title: 'Creator Studio 2.0 + Brain V3 | Harmonic OS',
  description: 'Mission Control, AI Director V2, and Harmonic Brain V3 personality intelligence for Harmonic OS worlds.',
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
