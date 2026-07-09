import type { EmotionKey, HarmonicEngineState, HarmonicWorldId } from '@/lib/harmonic-engine';
import { getWorldPersonalityReaction } from '@/lib/world-personality';

export type LivingWorldLayer = 'environment' | 'crowd' | 'camera' | 'audio' | 'objects' | 'events' | 'ripple';

export type LivingWorldState = {
  world: HarmonicWorldId;
  emotion: EmotionKey;
  headline: string;
  summary: string;
  layers: Record<LivingWorldLayer, string>;
  intensity: number;
  population: number;
  weatherBehavior: string;
  cameraBehavior: string;
  audioMix: string[];
  objectBehaviors: string[];
  activeEvent: string;
  crossWorldRipple: string;
};

const baseObjectBehaviors: Record<HarmonicWorldId, string[]> = {
  melodic: ['Visualizer bends to emotion', 'Crystal memories brighten', 'Vault nodes float', 'Constellations drift'],
  harmonic: ['Fabric ripples', 'Runway lights chase', 'Garment cards glow', 'Threads move like soundwaves'],
  'fried-em': ['Scoreboard pulses', 'Court reflections brighten', 'Arena lights sweep', 'Ball trail intensifies'],
  schmackin: ['Neon sign flickers', 'Steam layers thicken', 'Menu cards glow', 'Rain reflections stretch'],
};

const worldEvents: Record<HarmonicWorldId, Partial<Record<EmotionKey, string>>> = {
  melodic: {
    chaos: 'Vault Distortion Session',
    victory: 'Anthem Release Moment',
    reflection: 'Late Night Memory Playback',
    peace: 'Soft Frequency Listening Room',
    luxury: 'Velvet Archive Premiere',
  },
  harmonic: {
    chaos: 'Runway Surge',
    victory: 'Collection Drop Celebration',
    reflection: 'Studio Textile Archive',
    peace: 'Balanced Fit Showcase',
    luxury: 'Premium Cut Presentation',
  },
  'fried-em': {
    chaos: 'Gym Eruption',
    victory: 'Game Winner Replay',
    reflection: 'Empty Court Echo',
    peace: 'Quiet Run',
    pressure: 'Possession Pressure',
  },
  schmackin: {
    chaos: 'Friday Night Kitchen Rush',
    victory: 'Schmakinn District Celebration',
    reflection: 'Late Plate Rain Mood',
    peace: 'Comfort Booth Hour',
    pain: 'Bunz Warning Signal',
  },
};

const rippleMap: Record<HarmonicWorldId, string> = {
  melodic: 'Melodic signal can inspire colors, transitions, and atmosphere across the other worlds.',
  harmonic: 'Fashion drops can recolor the OS, unlock new textures, and influence visual identity everywhere.',
  'fried-em': 'Big highlights can raise OS energy, trigger crowd modes, and push victory lighting into other worlds.',
  schmackin: 'Food verdicts can shift city mood, trend flavors, and influence palettes across Harmonic OS.',
};

function populationFromRuntime(runtime: HarmonicEngineState) {
  return Math.min(100, Math.round((runtime.audioReactivity + runtime.particleDensity + runtime.motionIntensity) / 3));
}

function cameraFromRuntime(runtime: HarmonicEngineState) {
  if (runtime.camera === 'shake') return 'Unstable handheld energy with pressure shakes and sudden pushes.';
  if (runtime.camera === 'orbit') return 'Slow orbit around the main world object like a cinematic reveal.';
  if (runtime.camera === 'dolly') return 'Smooth forward motion with premium cinematic pacing.';
  if (runtime.camera === 'slow-pan') return 'Slow panoramic movement with reflective timing.';
  if (runtime.camera === 'follow-cursor') return 'Interactive camera attention following user motion.';
  return 'Locked cinematic framing with subtle breathing motion.';
}

function weatherFromRuntime(runtime: HarmonicEngineState) {
  if (runtime.fog > 72) return 'Heavy atmosphere: fog, steam, or haze dominates the scene.';
  if (runtime.motionIntensity > 80) return 'Active atmosphere: wind, particles, and environmental motion increase.';
  if (runtime.bloom > 80) return 'Glowing atmosphere: light blooms and reflections become more dramatic.';
  return 'Balanced atmosphere: world ambience stays present without overpowering the content.';
}

function audioFromRuntime(world: HarmonicWorldId, runtime: HarmonicEngineState) {
  const common = [`${runtime.emotion} mood bed`, `${runtime.audioReactivity}% audio reactivity`, `${runtime.motionIntensity}% movement accents`];
  if (world === 'schmackin') return ['restaurant room tone', 'city rain', 'kitchen movement', ...common];
  if (world === 'fried-em') return ['court bounce', 'crowd layer', 'scoreboard hum', ...common];
  if (world === 'harmonic') return ['runway ambience', 'camera flashes', 'fabric movement', ...common];
  return ['vinyl texture', 'studio ambience', 'memory sparkle', ...common];
}

export function compileLivingWorldState(world: HarmonicWorldId, runtime: HarmonicEngineState): LivingWorldState {
  const reaction = getWorldPersonalityReaction(world, runtime.emotion);
  const population = populationFromRuntime(runtime);
  const activeEvent = worldEvents[world]?.[runtime.emotion] ?? 'Ambient World Pulse';

  return {
    world,
    emotion: runtime.emotion,
    headline: reaction.headline,
    summary: reaction.description,
    intensity: reaction.intensity,
    population,
    weatherBehavior: weatherFromRuntime(runtime),
    cameraBehavior: cameraFromRuntime(runtime),
    audioMix: audioFromRuntime(world, runtime),
    objectBehaviors: baseObjectBehaviors[world],
    activeEvent,
    crossWorldRipple: rippleMap[world],
    layers: {
      environment: weatherFromRuntime(runtime),
      crowd: population > 75 ? 'High population density with active background life.' : population > 45 ? 'Moderate population density with visible movement.' : 'Low population density with quiet ambience.',
      camera: cameraFromRuntime(runtime),
      audio: audioFromRuntime(world, runtime).join(' + '),
      objects: baseObjectBehaviors[world].join(' • '),
      events: activeEvent,
      ripple: rippleMap[world],
    },
  };
}
