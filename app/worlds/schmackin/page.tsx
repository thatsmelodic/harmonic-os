import { WorldPage, generateWorldMetadata } from '@/components/WorldPage';
import { getFrequency } from '@/lib/frequencies';

export const metadata = generateWorldMetadata('schmackin');

export default function SchmackinWorldPage() {
  return <WorldPage world={getFrequency('schmackin')} />;
}
