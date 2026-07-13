import { CinematicDistrictScene } from '@/components/cinematic/CinematicDistrictScene';
import { SchmackinnWorldExperience } from '@/components/worlds/SchmackinnWorldExperience';

export const metadata = {
  title: 'Schmackinn | Harmonic OS',
  description: 'A living food universe for Flavor City, restaurant reviews, callouts, memories, and creator automation.',
};

export default function SchmackinnWorldPage() {
  return (
    <>
      <CinematicDistrictScene district="schmackinn" compact />
      <div id="district-content"><SchmackinnWorldExperience /></div>
    </>
  );
}
