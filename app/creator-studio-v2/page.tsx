import { VisualCanvasStudio } from '@/components/studio/VisualCanvasStudio';
import { StudioSafetyShell } from '@/components/studio/StudioSafetyShell';

export const metadata = {
  title: 'Creator Studio | Harmonic OS',
  description: 'The unified visual command center for designing, previewing, saving, and publishing Harmonic OS worlds.',
};

export default function CreatorStudioPage(){
  return (
    <StudioSafetyShell>
      <VisualCanvasStudio />
    </StudioSafetyShell>
  );
}
