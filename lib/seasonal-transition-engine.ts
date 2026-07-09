import type { HarmonicEngineState, HarmonicWorldId } from '@/lib/harmonic-engine';

export type SeasonKey = 'spring' | 'summer' | 'fall' | 'winter';

export type SeasonalTransition = {
  id: string;
  from: SeasonKey;
  to: SeasonKey;
  label: string;
  visualSteps: string[];
  audioSteps: string[];
  worldNotes: Record<HarmonicWorldId, string>;
  patch: Partial<HarmonicEngineState>;
};

export const seasonalTransitions: SeasonalTransition[] = [
  {
    id: 'summer-to-fall',
    from: 'summer',
    to: 'fall',
    label: 'Summer fades into Fall',
    visualSteps: ['Sunlight warms', 'Leaves begin drifting', 'Textures become softer', 'Fog gets nostalgic', 'Gold and purple accents rise'],
    audioSteps: ['Crowd noise softens', 'Wind layer appears', 'Warm keys enter', 'Bass becomes slower'],
    worldNotes: {
      melodic: 'Songs feel more reflective and memory-heavy.',
      harmonic: 'Hoodies, richer textures, and fall palettes move forward.',
      'fried-em': 'Outdoor runs shift into cooler gym energy and sunset courts.',
      schmackin: 'Comfort food, warm booths, rain, and steam become dominant.',
    },
    patch: { emotion: 'reflection', lighting: 'golden-hour', fog: 54, bloom: 70, particleDensity: 68, motionIntensity: 34 },
  },
  {
    id: 'fall-to-winter',
    from: 'fall',
    to: 'winter',
    label: 'Fall freezes into Winter',
    visualSteps: ['Leaves slow down', 'Blue light rises', 'Crystal frost appears', 'Fog becomes colder', 'Motion becomes quieter'],
    audioSteps: ['Wind thins', 'High shimmer appears', 'Ambience becomes quieter', 'Footsteps become sharper'],
    worldNotes: {
      melodic: 'The vault feels colder, clearer, and more intimate.',
      harmonic: 'Layered garments, icy highlights, and premium winter materials rise.',
      'fried-em': 'Arena lights sharpen and the gym feels more enclosed.',
      schmackin: 'Hot food, soup, coffee, and steam become more important.',
    },
    patch: { emotion: 'peace', lighting: 'moonlight', fog: 62, bloom: 58, particleDensity: 46, motionIntensity: 24 },
  },
  {
    id: 'winter-to-spring',
    from: 'winter',
    to: 'spring',
    label: 'Winter opens into Spring',
    visualSteps: ['Frost fades', 'Green accents return', 'Particles brighten', 'Fog clears', 'Motion becomes lighter'],
    audioSteps: ['Ambience opens', 'Soft percussion returns', 'Air feels lighter', 'Crowd movement increases'],
    worldNotes: {
      melodic: 'New songs feel like recovery, healing, and starting again.',
      harmonic: 'Fresh colorways and lighter materials move forward.',
      'fried-em': 'Runs move back outside with brighter daylight.',
      schmackin: 'Menus feel fresher, brighter, and more social.',
    },
    patch: { emotion: 'healing', lighting: 'golden-hour', fog: 28, bloom: 66, particleDensity: 58, motionIntensity: 42 },
  },
  {
    id: 'spring-to-summer',
    from: 'spring',
    to: 'summer',
    label: 'Spring heats into Summer',
    visualSteps: ['Light gets stronger', 'Crowds increase', 'Motion speeds up', 'Colors saturate', 'Nightlife glow appears'],
    audioSteps: ['Percussion rises', 'Crowd bed grows', 'Bass gets warmer', 'Energy becomes more public'],
    worldNotes: {
      melodic: 'Songs become louder, social, and release-ready.',
      harmonic: 'Tee drops, pop-ups, and bright campaigns move forward.',
      'fried-em': 'Outdoor runs, rivalries, and open gym energy rise.',
      schmackin: 'Food trucks, street food, and group reviews become dominant.',
    },
    patch: { emotion: 'freedom', lighting: 'spotlight', fog: 22, bloom: 74, particleDensity: 72, motionIntensity: 70 },
  },
];

export function getTransitionById(id: string) {
  return seasonalTransitions.find((transition) => transition.id === id) ?? seasonalTransitions[0];
}
