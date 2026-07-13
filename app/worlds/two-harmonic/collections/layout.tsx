import type { ReactNode } from 'react';
import { CinematicDistrictScene } from '@/components/cinematic/CinematicDistrictScene';

export default function TwoHarmonicCollectionsLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <CinematicDistrictScene district="two-harmonic" compact />
      <div id="district-content">{children}</div>
    </>
  );
}
