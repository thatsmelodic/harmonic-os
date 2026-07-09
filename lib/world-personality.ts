import type { EmotionKey, HarmonicWorldId } from '@/lib/harmonic-engine';

export type WorldPersonalityReaction = {
  headline: string;
  description: string;
  intensity: number;
  visualMode: 'steam' | 'spotlight' | 'crystal' | 'fabric' | 'fire' | 'rain' | 'memory' | 'luxury';
};

const fallback: WorldPersonalityReaction = {
  headline: 'Frequency Shift',
  description: 'The world is recalibrating to the active runtime signal.',
  intensity: 56,
  visualMode: 'crystal',
};

const reactions: Record<HarmonicWorldId, Partial<Record<EmotionKey, WorldPersonalityReaction>>> = {
  melodic: {
    chaos: { headline: 'Distorted Memory', description: 'Notes bend, particles orbit faster, and the vault feels unstable.', intensity: 88, visualMode: 'memory' },
    victory: { headline: 'Anthem Mode', description: 'The visualizer opens up like a chorus and the crystal memories glow brighter.', intensity: 92, visualMode: 'crystal' },
    reflection: { headline: 'Late Night Archive', description: 'Particles slow down, piano energy rises, and the nebula deepens.', intensity: 72, visualMode: 'memory' },
    peace: { headline: 'Soft Frequency', description: 'The world quiets into soft bloom, floating dust, and slow orbiting memory.', intensity: 58, visualMode: 'crystal' },
    luxury: { headline: 'Velvet Playback', description: 'The archive becomes polished, cinematic, and smooth around the signal.', intensity: 70, visualMode: 'luxury' },
  },
  harmonic: {
    chaos: { headline: 'Runway Surge', description: 'Threads whip, fabric ripples, and lights chase across the collection.', intensity: 84, visualMode: 'fabric' },
    victory: { headline: 'Drop Celebration', description: 'The runway brightens and every garment feels like a release moment.', intensity: 94, visualMode: 'spotlight' },
    reflection: { headline: 'Textile Memory', description: 'The studio slows into warm texture, quiet thread movement, and soft fabric glow.', intensity: 68, visualMode: 'fabric' },
    peace: { headline: 'Balanced Fit', description: 'The world settles into clean composition, gentle light, and calm materials.', intensity: 56, visualMode: 'luxury' },
    luxury: { headline: 'Premium Cut', description: 'Spotlights soften, textures sharpen, and the whole runway feels expensive.', intensity: 86, visualMode: 'luxury' },
  },
  'fried-em': {
    chaos: { headline: 'Gym Eruption', description: 'Crowd energy spikes, lights pulse, and the scoreboard starts shaking.', intensity: 96, visualMode: 'fire' },
    victory: { headline: 'Game Winner', description: 'Arena bloom hits hard, the court shines, and the world celebrates the bucket.', intensity: 100, visualMode: 'fire' },
    reflection: { headline: 'Empty Court Echo', description: 'The crowd drops out, the court cools down, and the moment feels earned.', intensity: 62, visualMode: 'spotlight' },
    peace: { headline: 'Quiet Run', description: 'The arena softens into controlled motion and clean focus.', intensity: 50, visualMode: 'spotlight' },
    pressure: { headline: 'Possession Pressure', description: 'The lights tighten, the ball feels heavier, and every movement matters.', intensity: 90, visualMode: 'fire' },
  },
  schmackin: {
    chaos: { headline: 'Kitchen Panic', description: 'Steam bursts, neon flickers, rain gets heavier, and the table reacts.', intensity: 94, visualMode: 'steam' },
    victory: { headline: 'Schmakinn Celebration', description: 'The district glows purple and the restaurant enters top tier energy.', intensity: 96, visualMode: 'steam' },
    reflection: { headline: 'Late Plate Mood', description: 'The windows fog, steam slows, and the city rain feels nostalgic.', intensity: 70, visualMode: 'rain' },
    peace: { headline: 'Comfort Booth', description: 'Warm light, soft steam, and calm ambience settle around the review.', intensity: 58, visualMode: 'steam' },
    pain: { headline: 'Bunz Warning', description: 'The menu glitches, color drains, and the flavor signal starts collapsing.', intensity: 82, visualMode: 'rain' },
  },
};

export function getWorldPersonalityReaction(world: HarmonicWorldId, emotion: EmotionKey): WorldPersonalityReaction {
  return reactions[world]?.[emotion] ?? fallback;
}
