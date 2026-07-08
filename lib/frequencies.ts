export type FrequencyKey = 'os' | 'melodic' | 'harmonic' | 'fried-em' | 'schmackinn';

export type Frequency = {
  key: FrequencyKey;
  label: string;
  world: string;
  href: string;
  signal: string;
  tagline: string;
  primary: string;
  secondary: string;
  accent: string;
  motion: 'fluid' | 'woven' | 'impact' | 'sizzle' | 'system';
};

export const frequencies: Frequency[] = [
  {
    key: 'os',
    label: 'OS',
    world: 'Harmonic OS',
    href: '/',
    signal: 'Core / Kernel / Harmony',
    tagline: 'The living hub where every world returns to the same source.',
    primary: '#b76cff',
    secondary: '#36b2cb',
    accent: '#ff4fd8',
    motion: 'system',
  },
  {
    key: 'melodic',
    label: 'Melodic',
    world: 'Melodic',
    href: '/worlds/melodic',
    signal: 'Music / Sound / Identity',
    tagline: 'Songs, beats, visuals, and the source frequency.',
    primary: '#9b5cff',
    secondary: '#d8b4fe',
    accent: '#58d6ff',
    motion: 'fluid',
  },
  {
    key: 'harmonic',
    label: '2Harmonic',
    world: '2 Harmonic',
    href: '/worlds/2-harmonic',
    signal: 'Fashion / Stitched Melodies',
    tagline: 'Drops, symbols, lookbooks, and wearable meaning.',
    primary: '#f7e7c6',
    secondary: '#d19a5a',
    accent: '#36b2cb',
    motion: 'woven',
  },
  {
    key: 'fried-em',
    label: 'Fried Em',
    world: 'Fried Em',
    href: '/worlds/fried-em',
    signal: 'Basketball / Smoke / Victory',
    tagline: 'Episodes, challenges, court energy, and competitive smoke.',
    primary: '#ff7a1a',
    secondary: '#ffd166',
    accent: '#ff2f2f',
    motion: 'impact',
  },
  {
    key: 'schmackinn',
    label: 'Schmackinn',
    world: 'Schmackinn',
    href: '/worlds/schmackinn',
    signal: 'Food / Reviews / Culture',
    tagline: 'Taste tests, restaurant lore, reactions, and community scores.',
    primary: '#ff4d3d',
    secondary: '#ffb15c',
    accent: '#ffe1a6',
    motion: 'sizzle',
  },
];

export const defaultFrequency = frequencies[0];

export function getFrequency(key: FrequencyKey | string | null | undefined) {
  return frequencies.find((frequency) => frequency.key === key) ?? defaultFrequency;
}
