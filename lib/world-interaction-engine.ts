import type { HarmonicEngineState, HarmonicWorldId } from '@/lib/harmonic-engine';

export type WorldRipple = {
  id: string;
  sourceWorld: HarmonicWorldId;
  targetWorld: HarmonicWorldId;
  trigger: string;
  result: string;
  patch: Partial<HarmonicEngineState>;
  approved: boolean;
};

export const worldRipples: WorldRipple[] = [
  {
    id: 'schmackin-to-harmonic-foodwear',
    sourceWorld: 'schmackin',
    targetWorld: 'harmonic',
    trigger: 'A review earns a top-tier food verdict.',
    result: 'Harmonic receives a food-inspired colorway and hoodie/drop concept prompt.',
    patch: { emotion: 'luxury', lighting: 'restaurant-warmth', bloom: 76, aura: 80, particleDensity: 48 },
    approved: false,
  },
  {
    id: 'schmackin-to-melodic-playlist',
    sourceWorld: 'schmackin',
    targetWorld: 'melodic',
    trigger: 'A late-night food review has a warm or reflective mood.',
    result: 'Melodic receives a comfort-food playlist mood and soft memory visualizer state.',
    patch: { emotion: 'reflection', camera: 'slow-pan', bloom: 58, fog: 48, audioReactivity: 74 },
    approved: false,
  },
  {
    id: 'fried-to-melodic-intro',
    sourceWorld: 'fried-em',
    targetWorld: 'melodic',
    trigger: 'A Fried Em highlight reaches victory energy.',
    result: 'Melodic creates a hype intro music direction for future Fried Em videos.',
    patch: { emotion: 'victory', bloom: 86, aura: 78, motionIntensity: 76, audioReactivity: 92 },
    approved: false,
  },
  {
    id: 'melodic-to-harmonic-merch',
    sourceWorld: 'melodic',
    targetWorld: 'harmonic',
    trigger: 'A song or vault memory becomes a release moment.',
    result: 'Harmonic receives merch/drop direction tied to the track mood.',
    patch: { emotion: 'luxury', lighting: 'spotlight', bloom: 82, crystalHeartIntensity: 90, particleDensity: 52 },
    approved: false,
  },
  {
    id: 'harmonic-to-schmackin-pop-up',
    sourceWorld: 'harmonic',
    targetWorld: 'schmackin',
    trigger: 'A fashion drop enters event mode.',
    result: 'Schmackinn creates a pop-up food/community event atmosphere around the drop.',
    patch: { emotion: 'victory', lighting: 'purple-neon', bloom: 84, aura: 86, fog: 58 },
    approved: false,
  },
];

export function getRipplesFromWorld(world: HarmonicWorldId) {
  return worldRipples.filter((ripple) => ripple.sourceWorld === world);
}

export function getRipplesToWorld(world: HarmonicWorldId) {
  return worldRipples.filter((ripple) => ripple.targetWorld === world);
}
