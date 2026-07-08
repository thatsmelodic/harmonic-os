import { type HarmonicEngineState } from '@/lib/harmonic-engine';

export type EngineNodeId =
  | 'ai-director'
  | 'emotion'
  | 'environment'
  | 'lighting'
  | 'camera'
  | 'physics'
  | 'motion'
  | 'audio'
  | 'objects'
  | 'timeline'
  | 'frequency-dna'
  | 'world-output';

export type EngineNode = {
  id: EngineNodeId;
  label: string;
  role: string;
  signal: string;
  strength: number;
  x: number;
  y: number;
};

export type EngineEdge = {
  from: EngineNodeId;
  to: EngineNodeId;
  label: string;
};

export type EngineGraph = {
  nodes: EngineNode[];
  edges: EngineEdge[];
};

export function createEngineGraph(state: HarmonicEngineState): EngineGraph {
  const nodes: EngineNode[] = [
    {
      id: 'ai-director',
      label: 'AI Director',
      role: 'Translates your vibe into engine instructions.',
      signal: state.emotion,
      strength: Math.max(state.aura, state.motionIntensity),
      x: 50,
      y: 6,
    },
    {
      id: 'emotion',
      label: 'Emotion',
      role: 'Controls the feeling behind every system.',
      signal: state.emotion,
      strength: state.dna.emotion,
      x: 18,
      y: 24,
    },
    {
      id: 'environment',
      label: 'Environment',
      role: 'Builds the place the world lives inside.',
      signal: state.environment,
      strength: state.aura,
      x: 50,
      y: 24,
    },
    {
      id: 'audio',
      label: 'Audio',
      role: 'Defines tempo, ambience, and sound-reactive energy.',
      signal: `${state.audioReactivity}% reactive`,
      strength: state.audioReactivity,
      x: 82,
      y: 24,
    },
    {
      id: 'lighting',
      label: 'Lighting',
      role: 'Controls glow, bloom, shadow, and world color.',
      signal: state.lighting,
      strength: state.bloom,
      x: 18,
      y: 47,
    },
    {
      id: 'camera',
      label: 'Camera',
      role: 'Controls how the visitor visually moves through space.',
      signal: state.camera,
      strength: state.sectionDepth,
      x: 40,
      y: 47,
    },
    {
      id: 'physics',
      label: 'Physics',
      role: 'Controls gravity, drift, impact, steam, and softness.',
      signal: state.physics,
      strength: state.motionIntensity,
      x: 60,
      y: 47,
    },
    {
      id: 'motion',
      label: 'Motion',
      role: 'Controls transitions, hover behavior, speed, and rhythm.',
      signal: `${state.motionIntensity}% intensity`,
      strength: state.motionIntensity,
      x: 82,
      y: 47,
    },
    {
      id: 'objects',
      label: 'Objects',
      role: 'Controls symbols, props, icons, and world artifacts.',
      signal: `${state.objects.length} active`,
      strength: Math.min(100, state.objects.length * 14),
      x: 24,
      y: 70,
    },
    {
      id: 'timeline',
      label: 'Timeline',
      role: 'Controls cinematic moments over time.',
      signal: 'scene sequence',
      strength: state.sectionDepth,
      x: 50,
      y: 70,
    },
    {
      id: 'frequency-dna',
      label: 'Frequency DNA',
      role: 'Gives every world the same controls but a different soul.',
      signal: state.world,
      strength: Math.max(...Object.values(state.dna)),
      x: 76,
      y: 70,
    },
    {
      id: 'world-output',
      label: 'World Output',
      role: 'The final living page visitors experience.',
      signal: state.world,
      strength: 100,
      x: 50,
      y: 92,
    },
  ];

  const edges: EngineEdge[] = [
    { from: 'ai-director', to: 'emotion', label: 'feeling' },
    { from: 'ai-director', to: 'environment', label: 'scene' },
    { from: 'ai-director', to: 'audio', label: 'tempo' },
    { from: 'emotion', to: 'lighting', label: 'color' },
    { from: 'emotion', to: 'camera', label: 'pace' },
    { from: 'environment', to: 'physics', label: 'matter' },
    { from: 'audio', to: 'motion', label: 'rhythm' },
    { from: 'lighting', to: 'objects', label: 'reveal' },
    { from: 'camera', to: 'timeline', label: 'sequence' },
    { from: 'physics', to: 'timeline', label: 'behavior' },
    { from: 'motion', to: 'timeline', label: 'flow' },
    { from: 'frequency-dna', to: 'objects', label: 'symbols' },
    { from: 'frequency-dna', to: 'world-output', label: 'identity' },
    { from: 'objects', to: 'world-output', label: 'artifacts' },
    { from: 'timeline', to: 'world-output', label: 'cinema' },
  ];

  return { nodes, edges };
}
