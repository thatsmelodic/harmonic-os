import type { CameraMode, EmotionKey, HarmonicEngineState, HarmonicWorldId, LightingMode, PhysicsMode } from '@/lib/harmonic-engine';
import { translateVibeToEngine } from '@/lib/harmonic-engine';

export type AiDirectorMode = 'off' | 'suggest-only' | 'preview';

export type AiDirectorSuggestion = {
  id: string;
  label: string;
  field: keyof HarmonicEngineState;
  currentValue: string | number;
  suggestedValue: string | number;
  selected: boolean;
  reason: string;
};

export type AiDirectorPlan = {
  id: string;
  world: HarmonicWorldId;
  prompt: string;
  mode: AiDirectorMode;
  summary: string;
  suggestions: AiDirectorSuggestion[];
  previewState: HarmonicEngineState;
  createdAt: number;
};

const labels: Partial<Record<keyof HarmonicEngineState, string>> = {
  emotion: 'Emotion',
  lighting: 'Lighting',
  camera: 'Camera',
  physics: 'Physics',
  fog: 'Fog / Steam',
  bloom: 'Bloom',
  aura: 'Aura',
  particleDensity: 'Particles',
  motionIntensity: 'Motion',
  grain: 'Film Grain',
  crystalHeartIntensity: 'Logo / Crystal Glow',
  audioReactivity: 'Audio Reactivity',
};

const editableFields: Array<keyof HarmonicEngineState> = [
  'emotion',
  'lighting',
  'camera',
  'physics',
  'fog',
  'bloom',
  'aura',
  'particleDensity',
  'motionIntensity',
  'grain',
  'crystalHeartIntensity',
  'audioReactivity',
];

function suggestionReason(field: keyof HarmonicEngineState, prompt: string) {
  const lower = prompt.toLowerCase();
  if (field === 'emotion') return 'Sets the emotional direction without changing anything live until approved.';
  if (field === 'fog') return lower.includes('rain') || lower.includes('steam') ? 'Adds visible atmosphere for the scene you described.' : 'Controls how thick the world atmosphere feels.';
  if (field === 'camera') return 'Controls how the viewer moves through the world preview.';
  if (field === 'lighting') return 'Changes the cinematic grade of the world preview.';
  if (field === 'audioReactivity') return 'Prepares the world to respond more strongly to music, crowd, or ambience.';
  return 'Suggested by the AI Director based on your prompt.';
}

export function createAiDirectorPlan(world: HarmonicWorldId, currentState: HarmonicEngineState, prompt: string, mode: AiDirectorMode): AiDirectorPlan {
  const translated = translateVibeToEngine(world, prompt);
  const previewState = { ...currentState, ...translated } as HarmonicEngineState;

  const suggestions = editableFields
    .filter((field) => translated[field] !== undefined && translated[field] !== currentState[field])
    .map((field) => ({
      id: `${String(field)}-${Date.now()}`,
      label: labels[field] ?? String(field),
      field,
      currentValue: currentState[field] as string | number,
      suggestedValue: translated[field] as string | number,
      selected: true,
      reason: suggestionReason(field, prompt),
    }));

  return {
    id: `ai-plan-${Date.now()}`,
    world,
    prompt,
    mode,
    summary: suggestions.length ? `AI Director found ${suggestions.length} optional changes for ${world.replace('-', ' ')}.` : 'AI Director did not find changes that differ from the current runtime.',
    suggestions,
    previewState,
    createdAt: Date.now(),
  };
}

export function applySelectedSuggestions(currentState: HarmonicEngineState, suggestions: AiDirectorSuggestion[]) {
  return suggestions.reduce<Partial<HarmonicEngineState>>((patch, suggestion) => {
    if (!suggestion.selected) return patch;
    return { ...patch, [suggestion.field]: suggestion.suggestedValue };
  }, {});
}

export function coerceSuggestionValue(field: keyof HarmonicEngineState, value: string): string | number {
  const numericFields: Array<keyof HarmonicEngineState> = ['fog', 'bloom', 'aura', 'particleDensity', 'motionIntensity', 'grain', 'crystalHeartIntensity', 'audioReactivity', 'sectionDepth'];
  if (numericFields.includes(field)) return Math.max(0, Math.min(100, Number(value) || 0));
  return value as EmotionKey | LightingMode | CameraMode | PhysicsMode;
}
