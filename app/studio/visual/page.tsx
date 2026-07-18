import { redirect } from 'next/navigation';

export const metadata = {
  title: 'Creator Studio | Harmonic OS',
  description: 'Unified Harmonic OS creator studio.',
};

export default function VisualCanvasPage(){
  redirect('/creator-studio-v2');
}
