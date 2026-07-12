import { notFound } from 'next/navigation';
import { FrequencyDock } from '@/components/FrequencyDock';
import { WorldCommunity } from '@/components/community/WorldCommunity';

const worlds = ['melodic', 'harmonic', 'fried-em', 'schmackinn', 'business'] as const;
type WorldKey = (typeof worlds)[number];

export function generateStaticParams() {
  return worlds.map((world) => ({ world }));
}

export default async function CommunityWorldPage({ params }: { params: Promise<{ world: string }> }) {
  const { world } = await params;
  if (!worlds.includes(world as WorldKey)) notFound();

  return (
    <>
      <FrequencyDock />
      <WorldCommunity world={world as WorldKey} />
    </>
  );
}
