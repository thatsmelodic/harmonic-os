import { WorldPage, generateWorldMetadata } from '@/components/WorldPage';
import { getFrequency } from '@/lib/frequencies';

export const metadata = generateWorldMetadata('harmonic');

export default function HarmonicWorldPage() {
  return <WorldPage world={getFrequency('harmonic')} />;
}
