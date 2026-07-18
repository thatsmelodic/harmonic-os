import { OwnerStudioGate } from '@/components/studio/OwnerStudioGate';
import { StudioSafetyShell } from '@/components/studio/StudioSafetyShell';
import { VisualCanvasStudio } from '@/components/studio/VisualCanvasStudio';

export const metadata = {
  title: 'Creator Studio | Harmonic OS',
  description: 'Private unified workspace for visually editing, previewing, saving, and publishing Harmonic OS.',
};

export default function CreatorStudioPage() {
  return (
    <OwnerStudioGate>
      <StudioSafetyShell>
        <VisualCanvasStudio />
      </StudioSafetyShell>
    </OwnerStudioGate>
  );
}
