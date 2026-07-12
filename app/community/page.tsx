import { FrequencyDock } from '@/components/FrequencyDock';
import { WorldCommunity } from '@/components/community/WorldCommunity';

export const metadata = {
  title: 'Community Hub | Harmonic OS',
  description: 'One organized interaction layer connecting every Harmonic OS world.',
};

export default function CommunityHubPage() {
  return (
    <>
      <FrequencyDock />
      <WorldCommunity hub />
    </>
  );
}
