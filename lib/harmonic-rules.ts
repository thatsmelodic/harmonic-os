import { type EmotionKey, type HarmonicEngineState, type HarmonicWorldId } from '@/lib/harmonic-engine';
import { type HarmonicSignal, type HarmonicSignalType } from '@/lib/harmonic-signal-bus';

export type HarmonicRule = {
  id: string;
  label: string;
  description: string;
  when: {
    signal?: HarmonicSignalType;
    emotion?: EmotionKey;
    world?: HarmonicWorldId;
  };
  apply: (state: HarmonicEngineState, signal: HarmonicSignal) => Partial<HarmonicEngineState>;
};

function clamp(value: number) {
  return Math.max(0, Math.min(100, Math.round(value)));
}

function dnaScale(state: HarmonicEngineState, key: keyof HarmonicEngineState['dna'], amount: number) {
  return Math.round(amount * (state.dna[key] / 100));
}

export const harmonicRules: HarmonicRule[] = [
  {
    id: 'pain-atmosphere',
    label: 'Pain Atmosphere',
    description: 'Pain slows the world, raises fog, lowers bloom, and softens motion.',
    when: { signal: 'EMOTION_CHANGED', emotion: 'pain' },
    apply: (state) => ({
      fog: clamp(state.fog + dnaScale(state, 'emotion', 24)),
      bloom: clamp(state.bloom - 22),
      motionIntensity: clamp(state.motionIntensity - 26),
      camera: 'slow-pan',
      physics: 'soft-float',
      lighting: 'moonlight',
    }),
  },
  {
    id: 'healing-light',
    label: 'Healing Light',
    description: 'Healing opens aura, increases bloom, and makes particles breathe.',
    when: { signal: 'EMOTION_CHANGED', emotion: 'healing' },
    apply: (state) => ({
      aura: clamp(state.aura + dnaScale(state, 'spirituality', 18)),
      bloom: clamp(state.bloom + 18),
      particleDensity: clamp(state.particleDensity + dnaScale(state, 'emotion', 12)),
      motionIntensity: clamp(state.motionIntensity + 6),
      lighting: 'purple-neon',
      physics: 'soft-float',
    }),
  },
  {
    id: 'victory-surge',
    label: 'Victory Surge',
    description: 'Victory intensifies bloom, camera, motion, and Crystal Heart energy.',
    when: { signal: 'EMOTION_CHANGED', emotion: 'victory' },
    apply: (state) => ({
      bloom: clamp(state.bloom + 24),
      motionIntensity: clamp(state.motionIntensity + dnaScale(state, 'motion', 20)),
      crystalHeartIntensity: clamp(state.crystalHeartIntensity + 18),
      particleDensity: clamp(state.particleDensity + 16),
      camera: state.world === 'fried-em' ? 'shake' : 'orbit',
      lighting: state.world === 'fried-em' ? 'arena-glow' : 'spotlight',
    }),
  },
  {
    id: 'luxury-polish',
    label: 'Luxury Polish',
    description: 'Luxury cleans grain, smooths movement, and adds glassy bloom.',
    when: { signal: 'EMOTION_CHANGED', emotion: 'luxury' },
    apply: (state) => ({
      grain: clamp(state.grain - 18),
      bloom: clamp(state.bloom + 12),
      aura: clamp(state.aura + 8),
      fog: clamp(state.fog - 8),
      motionIntensity: clamp(state.motionIntensity - 4),
      camera: 'dolly',
      lighting: 'spotlight',
    }),
  },
  {
    id: 'pressure-impact',
    label: 'Pressure Impact',
    description: 'Pressure sharpens movement, camera response, and cursor magnetism.',
    when: { signal: 'EMOTION_CHANGED', emotion: 'pressure' },
    apply: (state) => ({
      motionIntensity: clamp(state.motionIntensity + 22),
      cursorMagnetism: clamp(state.cursorMagnetism + 24),
      particleDensity: clamp(state.particleDensity + 10),
      grain: clamp(state.grain + 12),
      camera: 'follow-cursor',
      physics: 'impact-snap',
    }),
  },
  {
    id: 'melodic-memory',
    label: 'Melodic Memory Breath',
    description: 'Melodic turns emotion into audio reactivity, aura, and memory particles.',
    when: { signal: 'EMOTION_CHANGED', world: 'melodic' },
    apply: (state) => ({
      audioReactivity: clamp(state.audioReactivity + dnaScale(state, 'music', 10)),
      aura: clamp(state.aura + dnaScale(state, 'memory', 10)),
      particleDensity: clamp(state.particleDensity + 8),
      physics: 'soft-float',
    }),
  },
  {
    id: 'fried-em-amplifier',
    label: 'Fried Em Amplifier',
    description: 'Fried Em turns emotion into impact, scoreboard energy, and motion.',
    when: { signal: 'EMOTION_CHANGED', world: 'fried-em' },
    apply: (state) => ({
      motionIntensity: clamp(state.motionIntensity + 16),
      audioReactivity: clamp(state.audioReactivity + 14),
      cursorMagnetism: clamp(state.cursorMagnetism + 10),
      physics: 'impact-snap',
      camera: state.emotion === 'pain' ? 'slow-pan' : 'shake',
    }),
  },
  {
    id: 'schmackin-warmth',
    label: 'Schmackin Warmth',
    description: 'Schmackin turns emotion into warmth, steam, and soft restaurant motion.',
    when: { signal: 'EMOTION_CHANGED', world: 'schmackin' },
    apply: (state) => ({
      fog: clamp(state.fog + 10),
      bloom: clamp(state.bloom + 8),
      particleDensity: clamp(state.particleDensity + 8),
      physics: 'steam-rise',
      lighting: 'restaurant-warmth',
    }),
  },
  {
    id: 'harmonic-fabric',
    label: 'Harmonic Fabric Drift',
    description: 'Harmonic turns emotion into fabric motion and runway atmosphere.',
    when: { signal: 'EMOTION_CHANGED', world: 'harmonic' },
    apply: (state) => ({
      sectionDepth: clamp(state.sectionDepth + 10),
      aura: clamp(state.aura + 8),
      physics: 'fabric-drift',
      camera: state.emotion === 'luxury' ? 'dolly' : 'slow-pan',
    }),
  },
];

export function getTriggeredRules(state: HarmonicEngineState, signal: HarmonicSignal) {
  return harmonicRules.filter((rule) => {
    if (rule.when.signal && rule.when.signal !== signal.type) return false;
    if (rule.when.emotion && rule.when.emotion !== state.emotion) return false;
    if (rule.when.world && rule.when.world !== state.world) return false;
    return true;
  });
}

export function applyTriggeredRules(state: HarmonicEngineState, signal: HarmonicSignal) {
  const triggered = getTriggeredRules(state, signal);
  const patch = triggered.reduce<Partial<HarmonicEngineState>>((currentPatch, rule) => ({
    ...currentPatch,
    ...rule.apply({ ...state, ...currentPatch }, signal),
  }), {});

  return { triggered, patch };
}
