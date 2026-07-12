import { TwoHarmonicWorldExperience } from '@/components/worlds/TwoHarmonicWorldExperience';
import { getTwoHarmonicCatalog } from '@/lib/supabase/two-harmonic-server';

export const metadata = {
  title: '2 Harmonic | Harmonic OS',
  description: 'The Fashion House where music, garments, memory, and legacy become Stitched Melodies.',
};

export const revalidate = 60;

export default async function TwoHarmonicCanonicalPage() {
  const catalog = await getTwoHarmonicCatalog();

  return (
    <TwoHarmonicWorldExperience
      liveCollections={catalog.collections}
      catalogConfigured={catalog.configured}
      catalogError={catalog.error}
    />
  );
}
