import { redirect } from 'next/navigation';

export const metadata = {
  title: 'Creator Studio | Harmonic OS',
  description: 'Unified Harmonic OS creator studio.',
};

export default function CreatorStudioV2Page(){
  redirect('/creator-studio');
}
