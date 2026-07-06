import type { ModuleKey, PaletteKey, PermissionLevel, SeasonKey } from './harmonic-kernel';

export type FrequencyWorld = {
  slug: string;
  name: string;
  frequency: string;
  tagline: string;
  route: string;
  accent: string;
  palette: PaletteKey;
  seasonBias: SeasonKey[];
  publicModules: ModuleKey[];
  profileModules: ModuleKey[];
  creatorModules: ModuleKey[];
  minimumAccess: PermissionLevel;
};

export const frequencies: FrequencyWorld[] = [
  {
    slug: 'melodic',
    name: 'Melodic',
    frequency: '528 Hz',
    tagline: 'The source frequency for music, beats, lyrics, and visuals.',
    route: '/worlds/melodic',
    accent: '#8b5cf6',
    palette: 'cyber-wave',
    seasonBias: ['winter', 'summer'],
    publicModules: ['video', 'gallery'],
    profileModules: ['comments', 'ratings'],
    creatorModules: ['calendar', 'analytics'],
    minimumAccess: 'guest',
  },
  {
    slug: '2-harmonic',
    name: '2 Harmonic',
    frequency: '741 Hz',
    tagline: 'The fashion world for drops, symbolism, collections, and shop systems.',
    route: '/worlds/2-harmonic',
    accent: '#36b2cb',
    palette: 'acid-wash',
    seasonBias: ['fall', 'spring'],
    publicModules: ['products', 'gallery'],
    profileModules: ['comments', 'ratings'],
    creatorModules: ['calendar', 'analytics'],
    minimumAccess: 'guest',
  },
  {
    slug: 'fried-em',
    name: 'Fried Em',
    frequency: '963 Hz',
    tagline: 'The competitive basketball world for clips, challenges, rankings, and episodes.',
    route: '/worlds/fried-em',
    accent: '#f97316',
    palette: 'fall-drop',
    seasonBias: ['fall', 'summer'],
    publicModules: ['video', 'gallery'],
    profileModules: ['comments', 'ratings', 'recommendations'],
    creatorModules: ['calendar', 'analytics'],
    minimumAccess: 'guest',
  },
  {
    slug: 'schmackinn',
    name: 'Schmackinn',
    frequency: '396 Hz',
    tagline: 'The food world for reviews, recommendations, questions, restaurants, and community scores.',
    route: '/worlds/schmackinn',
    accent: '#ff5bc8',
    palette: 'pink-blossom',
    seasonBias: ['summer', 'winter'],
    publicModules: ['reviews', 'ratings', 'gallery'],
    profileModules: ['comments', 'recommendations', 'qa'],
    creatorModules: ['calendar', 'analytics'],
    minimumAccess: 'guest',
  },
];

export function getFrequency(slug: string) {
  return frequencies.find((frequency) => frequency.slug === slug);
}
