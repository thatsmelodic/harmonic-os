import type { HarmonicEngineState, HarmonicWorldId } from '@/lib/harmonic-engine';

export type HarmonicEventTrigger = {
  id: string;
  label: string;
  condition: string;
  then: string[];
  patch: Partial<HarmonicEngineState>;
  approved: boolean;
};

export const eventTemplates: Record<HarmonicWorldId, HarmonicEventTrigger[]> = {
  schmackin: [
    { id: 'schmackin-top-tier', label: 'Schmakinn Verdict', condition: 'Restaurant tier is Schmakinn', then: ['Steam increases', 'Purple neon brightens', 'City reflections stretch', 'Verdict glow activates'], patch: { emotion: 'victory', bloom: 90, aura: 90, fog: 70, particleDensity: 76 }, approved: false },
    { id: 'schmackin-low-tier', label: 'Low Tier Warning', condition: 'Restaurant tier is low', then: ['Menu glitches', 'Warmth drops', 'Rain gets heavier', 'Flavor signal fades'], patch: { emotion: 'pain', bloom: 34, aura: 38, fog: 82, grain: 48 }, approved: false },
  ],
  'fried-em': [
    { id: 'fried-game-winner', label: 'Game Winner', condition: 'Highlight is a game winner', then: ['Crowd rises', 'Scoreboard pulses', 'Camera orbits', 'Arena lights flare'], patch: { emotion: 'victory', camera: 'orbit', bloom: 94, aura: 88, motionIntensity: 86 }, approved: false },
    { id: 'fried-pressure', label: 'Possession Pressure', condition: 'Score is close late', then: ['Crowd quiets', 'Lights tighten', 'Camera pushes in', 'Audio tension rises'], patch: { emotion: 'pressure', camera: 'dolly', bloom: 64, fog: 46, audioReactivity: 88 }, approved: false },
  ],
  melodic: [
    { id: 'melodic-release', label: 'Song Release', condition: 'New song is published', then: ['Crystals brighten', 'Visualizer expands', 'Memory nodes unlock', 'Nebula deepens'], patch: { emotion: 'victory', camera: 'slow-pan', bloom: 88, aura: 92, audioReactivity: 96 }, approved: false },
    { id: 'melodic-late-night', label: 'Late Night Playback', condition: 'Track mood is reflective', then: ['Particles slow', 'Piano memory rises', 'Fog softens', 'Archive glow dims'], patch: { emotion: 'reflection', bloom: 58, aura: 64, fog: 52, motionIntensity: 24 }, approved: false },
  ],
  harmonic: [
    { id: 'harmonic-drop', label: 'Collection Drop', condition: 'New drop goes live', then: ['Runway lights chase', 'Fabric ripples', 'Product cards glow', 'Premium grain increases'], patch: { emotion: 'luxury', lighting: 'spotlight', bloom: 82, aura: 78, crystalHeartIntensity: 86 }, approved: false },
    { id: 'harmonic-fall', label: 'Fall Lookbook', condition: 'Season is fall', then: ['Warm light increases', 'Leaves drift', 'Hoodies move forward', 'Texture becomes softer'], patch: { emotion: 'reflection', lighting: 'golden-hour', bloom: 68, fog: 36, particleDensity: 62 }, approved: false },
  ],
};

export function getEventsForWorld(world: HarmonicWorldId) {
  return eventTemplates[world];
}
