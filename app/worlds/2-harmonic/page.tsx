import { redirect } from 'next/navigation';

export const metadata = {
  title: '2 Harmonic | Harmonic OS',
  description: 'Enter the 2 Harmonic fashion world and collection showroom.',
};

export default function TwoHarmonicCanonicalPage() {
  redirect('/worlds/two-harmonic/collections');
}
