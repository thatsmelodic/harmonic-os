import { VisualCanvasStudio } from '@/components/studio/VisualCanvasStudio';
import { StudioSafetyShell } from '@/components/studio/StudioSafetyShell';

export const metadata = {
  title: 'Visual Canvas | Harmonic Creator Studio',
  description: 'Direct manipulation visual editor for Harmonic OS worlds.',
};

export default function VisualCanvasPage(){
  return <StudioSafetyShell><VisualCanvasStudio /></StudioSafetyShell>;
}
