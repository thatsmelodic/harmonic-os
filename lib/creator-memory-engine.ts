import type { HarmonicWorldId } from '@/lib/harmonic-engine';

export type CreatorMemoryPreference = {
  id: string;
  label: string;
  strength: number;
  evidence: string;
  appliesTo: HarmonicWorldId | 'all';
};

export type CreatorMemorySignal = {
  id: string;
  action: 'approved' | 'rejected' | 'edited' | 'saved-preset';
  subject: string;
  world: HarmonicWorldId;
  learnedPreference: string;
};

export const defaultCreatorPreferences: CreatorMemoryPreference[] = [
  { id: 'pref-autumn', label: 'Fall-forward atmosphere', strength: 92, evidence: 'Fall was marked as the favorite and should feel most immersive.', appliesTo: 'all' },
  { id: 'pref-approval', label: 'Approval-first AI', strength: 100, evidence: 'AI should suggest, preview, and wait for creator approval before applying changes.', appliesTo: 'all' },
  { id: 'pref-purple', label: 'Purple neon identity', strength: 88, evidence: 'Harmonic OS and Schmackinn heavily use purple neon and logo glow.', appliesTo: 'all' },
  { id: 'pref-cinematic', label: 'Cinematic world behavior', strength: 90, evidence: 'Worlds should feel alive, immersive, and responsive rather than static.', appliesTo: 'all' },
  { id: 'pref-schmackinn-verdict', label: 'Creator verdict stays final', strength: 100, evidence: 'Schmackinn tiers are creator-defined: Schmakinn, Crackin, Lackin, Bunz.', appliesTo: 'schmackin' },
  { id: 'pref-fried-hype', label: 'High-energy replay moments', strength: 82, evidence: 'Fried Em should feel competitive, funny, and full of pressure.', appliesTo: 'fried-em' },
  { id: 'pref-melodic-depth', label: 'Music needs emotional context', strength: 86, evidence: 'Melodic is about memory, feeling, and why the song exists.', appliesTo: 'melodic' },
  { id: 'pref-harmonic-premium', label: 'Fashion should feel premium', strength: 84, evidence: 'Harmonic fashion should avoid cheap-looking motion and clutter.', appliesTo: 'harmonic' },
];

export function getCreatorPreferencesForWorld(world: HarmonicWorldId) {
  return defaultCreatorPreferences.filter((preference) => preference.appliesTo === 'all' || preference.appliesTo === world);
}

export function createMemorySignals(world: HarmonicWorldId): CreatorMemorySignal[] {
  return [
    { id: `${world}-approve-warmth`, action: 'approved', subject: 'warm lighting', world, learnedPreference: 'Creator tends to keep cinematic warmth when it supports the world mood.' },
    { id: `${world}-reject-autopilot`, action: 'rejected', subject: 'automatic publishing', world, learnedPreference: 'Never publish AI changes without explicit approval.' },
    { id: `${world}-edit-intensity`, action: 'edited', subject: 'effect intensity', world, learnedPreference: 'Creator may like the idea but wants control over strength.' },
  ];
}
