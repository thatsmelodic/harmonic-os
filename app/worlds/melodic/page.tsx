import { WorldPage, generateWorldMetadata } from '@/components/WorldPage';
import { getFrequency } from '@/lib/frequencies';

export const metadata = generateWorldMetadata('melodic');

export default function MelodicWorldPage() {
  return <WorldPage world={getFrequency('melodic')} />;
}
