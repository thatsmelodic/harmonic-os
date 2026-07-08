import { WorldPage, generateWorldMetadata } from '@/components/WorldPage';
import { getFrequency } from '@/lib/frequencies';

export const metadata = generateWorldMetadata('fried-em');

export default function FriedEmWorldPage() {
  return <WorldPage world={getFrequency('fried-em')} />;
}
