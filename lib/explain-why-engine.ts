import type { HarmonicWorldId } from '@/lib/harmonic-engine';
import { brainPersonalities } from '@/lib/harmonic-brain-v3';
import { getCreatorPreferencesForWorld } from '@/lib/creator-memory-engine';

export type ExplainWhyNote = {
  id: string;
  title: string;
  explanation: string;
  trustRule: string;
};

export function explainSuggestion(world: HarmonicWorldId, suggestion: string): ExplainWhyNote {
  const brain = brainPersonalities[world];
  const preferences = getCreatorPreferencesForWorld(world).slice(0, 3);

  return {
    id: `why-${world}-${suggestion.toLowerCase().replace(/\s+/g, '-')}`,
    title: `Why ${brain.name} suggested ${suggestion}`,
    explanation: `${brain.name} suggested ${suggestion} because it matches ${brain.priorities.slice(0, 2).join(' and ')} while respecting creator preferences like ${preferences.map((preference) => preference.label).join(', ')}.`,
    trustRule: 'This is explanation only. It does not apply anything until the creator approves it.',
  };
}

export function createExplainWhySet(world: HarmonicWorldId) {
  return [
    explainSuggestion(world, 'stronger world atmosphere'),
    explainSuggestion(world, 'more intentional camera behavior'),
    explainSuggestion(world, 'world-specific object reactions'),
  ];
}
