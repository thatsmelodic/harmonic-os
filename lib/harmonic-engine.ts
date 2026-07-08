export type HarmonicWorldId = 'melodic' | 'harmonic' | 'fried-em' | 'schmackin';

export type EmotionKey =
  | 'hope'
  | 'pain'
  | 'luxury'
  | 'victory'
  | 'chaos'
  | 'peace'
  | 'reflection'
  | 'pressure'
  | 'healing'
  | 'freedom';

export type EnvironmentMode =
  | 'nebula'
  | 'studio'
  | 'runway'
  | 'arena'
  | 'restaurant'
  | 'rooftop'
  | 'church'
  | 'dreamscape';

export type LightingMode =
  | 'purple-neon'
  | 'golden-hour'
  | 'moonlight'
  | 'candlelight'
  | 'arena-glow'
  | 'restaurant-warmth'
  | 'cosmic'
  | 'spotlight';

export type CameraMode = 'locked' | 'float' | 'slow-pan' | 'orbit' | 'dolly' | 'shake' | 'follow-cursor';
export type PhysicsMode = 'soft-float' | 'fabric-drift' | 'impact-snap' | 'steam-rise' | 'zero-gravity';
export type CreativeMode = 'composer' | 'designer' | 'director' | 'builder' | 'business';

export type FrequencyDNA = {
  memory: number;
  emotion: number;
  music: number;
  fashion: number;
  competition: number;
  food: number;
  community: number;
  business: number;
  motion: number;
  spirituality: number;
};

export type HarmonicEngineState = {
  world: HarmonicWorldId;
  creativeMode: CreativeMode;
  emotion: EmotionKey;
  environment: EnvironmentMode;
  lighting: LightingMode;
  camera: CameraMode;
  physics: PhysicsMode;
  aura: number;
  fog: number;
  bloom: number;
  grain: number;
  particleDensity: number;
  motionIntensity: number;
  audioReactivity: number;
  crystalHeartIntensity: number;
  cursorMagnetism: number;
  sectionDepth: number;
  objects: string[];
  dna: FrequencyDNA;
};

export const worldDNA: Record<HarmonicWorldId, FrequencyDNA> = {
  melodic: {
    memory: 98,
    emotion: 100,
    music: 100,
    fashion: 28,
    competition: 8,
    food: 0,
    community: 55,
    business: 48,
    motion: 66,
    spirituality: 82,
  },
  harmonic: {
    memory: 62,
    emotion: 74,
    music: 58,
    fashion: 100,
    competition: 12,
    food: 0,
    community: 72,
    business: 86,
    motion: 54,
    spirituality: 80,
  },
  'fried-em': {
    memory: 48,
    emotion: 58,
    music: 42,
    fashion: 26,
    competition: 100,
    food: 0,
    community: 88,
    business: 54,
    motion: 100,
    spirituality: 28,
  },
  schmackin: {
    memory: 54,
    emotion: 65,
    music: 32,
    fashion: 18,
    competition: 10,
    food: 100,
    community: 92,
    business: 58,
    motion: 48,
    spirituality: 22,
  },
};

export const worldDefaults: Record<HarmonicWorldId, HarmonicEngineState> = {
  melodic: {
    world: 'melodic',
    creativeMode: 'composer',
    emotion: 'healing',
    environment: 'nebula',
    lighting: 'purple-neon',
    camera: 'float',
    physics: 'soft-float',
    aura: 82,
    fog: 44,
    bloom: 88,
    grain: 18,
    particleDensity: 78,
    motionIntensity: 64,
    audioReactivity: 92,
    crystalHeartIntensity: 84,
    cursorMagnetism: 58,
    sectionDepth: 72,
    objects: ['piano', 'floating-notes', 'memory-orbs', 'crystal-heart'],
    dna: worldDNA.melodic,
  },
  harmonic: {
    world: 'harmonic',
    creativeMode: 'designer',
    emotion: 'luxury',
    environment: 'runway',
    lighting: 'golden-hour',
    camera: 'slow-pan',
    physics: 'fabric-drift',
    aura: 74,
    fog: 28,
    bloom: 70,
    grain: 12,
    particleDensity: 48,
    motionIntensity: 42,
    audioReactivity: 38,
    crystalHeartIntensity: 80,
    cursorMagnetism: 44,
    sectionDepth: 66,
    objects: ['fabric-panels', 'stitch-lines', 'garment-orbs', 'runway-light'],
    dna: worldDNA.harmonic,
  },
  'fried-em': {
    world: 'fried-em',
    creativeMode: 'director',
    emotion: 'pressure',
    environment: 'arena',
    lighting: 'arena-glow',
    camera: 'shake',
    physics: 'impact-snap',
    aura: 86,
    fog: 18,
    bloom: 74,
    grain: 36,
    particleDensity: 84,
    motionIntensity: 100,
    audioReactivity: 78,
    crystalHeartIntensity: 64,
    cursorMagnetism: 82,
    sectionDepth: 58,
    objects: ['scoreboard', 'rim-fire', 'court-lines', 'impact-rings'],
    dna: worldDNA['fried-em'],
  },
  schmackin: {
    world: 'schmackin',
    creativeMode: 'director',
    emotion: 'freedom',
    environment: 'restaurant',
    lighting: 'restaurant-warmth',
    camera: 'float',
    physics: 'steam-rise',
    aura: 72,
    fog: 38,
    bloom: 58,
    grain: 20,
    particleDensity: 64,
    motionIntensity: 56,
    audioReactivity: 42,
    crystalHeartIntensity: 52,
    cursorMagnetism: 48,
    sectionDepth: 46,
    objects: ['steam', 'sauce-drops', 'neon-menu', 'tier-badges'],
    dna: worldDNA.schmackin,
  },
};

export const emotionPresets: Record<EmotionKey, Partial<HarmonicEngineState>> = {
  hope: { lighting: 'golden-hour', aura: 76, fog: 20, bloom: 84, motionIntensity: 48 },
  pain: { lighting: 'moonlight', aura: 44, fog: 64, bloom: 52, motionIntensity: 28 },
  luxury: { lighting: 'spotlight', aura: 78, fog: 18, bloom: 76, grain: 8 },
  victory: { lighting: 'arena-glow', aura: 88, fog: 14, bloom: 90, motionIntensity: 90 },
  chaos: { camera: 'shake', physics: 'impact-snap', aura: 100, fog: 28, bloom: 100, motionIntensity: 100 },
  peace: { camera: 'slow-pan', physics: 'soft-float', aura: 56, fog: 34, bloom: 58, motionIntensity: 22 },
  reflection: { lighting: 'candlelight', aura: 60, fog: 52, bloom: 48, grain: 30 },
  pressure: { lighting: 'arena-glow', camera: 'follow-cursor', aura: 82, motionIntensity: 86, cursorMagnetism: 88 },
  healing: { lighting: 'purple-neon', aura: 82, fog: 44, bloom: 88, motionIntensity: 64 },
  freedom: { lighting: 'golden-hour', camera: 'float', aura: 72, fog: 18, bloom: 72, motionIntensity: 58 },
};

export function mergeEngineState(world: HarmonicWorldId, patch: Partial<HarmonicEngineState> = {}): HarmonicEngineState {
  const base = worldDefaults[world];
  const emotionPatch = patch.emotion ? emotionPresets[patch.emotion] : emotionPresets[base.emotion];

  return {
    ...base,
    ...emotionPatch,
    ...patch,
    world,
    dna: worldDNA[world],
  };
}

export function translateVibeToEngine(world: HarmonicWorldId, prompt: string): HarmonicEngineState {
  const text = prompt.toLowerCase();
  let emotion: EmotionKey = worldDefaults[world].emotion;

  if (text.includes('pain') || text.includes('heartbreak') || text.includes('lonely')) emotion = 'pain';
  if (text.includes('heal') || text.includes('survive') || text.includes('calm')) emotion = 'healing';
  if (text.includes('luxury') || text.includes('expensive') || text.includes('clean')) emotion = 'luxury';
  if (text.includes('win') || text.includes('victory') || text.includes('champion')) emotion = 'victory';
  if (text.includes('chaos') || text.includes('crazy') || text.includes('wild')) emotion = 'chaos';
  if (text.includes('peace') || text.includes('soft') || text.includes('quiet')) emotion = 'peace';
  if (text.includes('pressure') || text.includes('intense') || text.includes('locked in')) emotion = 'pressure';
  if (text.includes('free') || text.includes('open') || text.includes('outside')) emotion = 'freedom';

  const environment = text.includes('church')
    ? 'church'
    : text.includes('roof')
      ? 'rooftop'
      : text.includes('dream')
        ? 'dreamscape'
        : worldDefaults[world].environment;

  return mergeEngineState(world, { emotion, environment });
}
