import { CreatorStudioWorkbench } from '@/components/studio/CreatorStudioWorkbench';
import { OwnerStudioGate } from '@/components/studio/OwnerStudioGate';

export const metadata = {
  title: 'Creator Studio | Harmonic OS',
  description: 'Private owner workspace for editing and publishing Harmonic OS.',
};

export default function CreatorStudioPage() {
  return (
    <OwnerStudioGate>
      <CreatorStudioWorkbench />
    </OwnerStudioGate>
  );
}
