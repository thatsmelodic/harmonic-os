import { FriedEmParkExperience } from '@/components/worlds/FriedEmParkExperience';
import { WorldClimateLayer } from '@/components/worlds/WorldClimateLayer';

export const metadata = {
  title: 'Fried Em Park | Harmonic OS',
  description: 'Enter the living Fried Em blacktop and move between Center Court, Episode Wall, Cooked Board, Challenge Arena, and Film Room.',
};

export default function FriedEmWorldPage() {
  return (
    <>
      <FriedEmParkExperience />
      <WorldClimateLayer />
    </>
  );
}
