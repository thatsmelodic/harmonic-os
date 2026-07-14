export const CREATOR_STUDIO_KEY = 'harmonic-creator-studio-v1';

export type WorldConfig = {
  id: string;
  prompt: string;
  name: string;
  frequency: string;
  icon: string;
  href: string;
  color: string;
  items: string[];
  summary: string;
  visible: boolean;
};

export type CreatorConfig = {
  brandName: string;
  eyebrow: string;
  headline: string;
  tagline: string;
  overviewTitle: string;
  overviewText: string;
  sourceName: string;
  sourceSubtitle: string;
  sourceDescription: string;
  accent: string;
  background: string;
  surface: string;
  text: string;
  headingFont: string;
  bodyFont: string;
  headingScale: number;
  cardRadius: number;
  glowStrength: number;
  showWeather: boolean;
  weatherIcon: string;
  weatherLabel: string;
  weatherValue: string;
  communityTitle: string;
  communityText: string;
  footerLeft: string;
  footerRight: string;
  worlds: WorldConfig[];
};

export const defaultCreatorConfig: CreatorConfig = {
  brandName: 'Harmonic OS',
  eyebrow: 'The connected multimedia ecosystem',
  headline: 'Harmonic OS',
  tagline: 'One Frequency. Many Worlds.',
  overviewTitle: 'Overview',
  overviewText: 'Harmonic OS is a multimedia ecosystem under the Melodic brand. Each world represents a different frequency of expression — all connected by the same purpose: Inspire. Entertain. Elevate.',
  sourceName: 'Melodic',
  sourceSubtitle: 'The Source',
  sourceDescription: 'Vision. Purpose. Creation.',
  accent: '#b85fff',
  background: '#020105',
  surface: '#08030f',
  text: '#f7efff',
  headingFont: 'Arial Black, Impact, sans-serif',
  bodyFont: 'Arial, Helvetica, sans-serif',
  headingScale: 1,
  cardRadius: 12,
  glowStrength: 1,
  showWeather: true,
  weatherIcon: '☁',
  weatherLabel: 'Baltimore',
  weatherValue: '72°',
  communityTitle: 'Harmonic Community',
  communityText: 'One community. Different frequencies.',
  footerLeft: 'Stay in tune.',
  footerRight: 'Stay in harmony.',
  worlds: [
    { id: 'melodic', prompt: 'Hear something?', name: 'Melodic', frequency: 'Music Frequency', icon: '♪', href: '/worlds/melodic', color: '#a952ff', items: ['Beats & Songs', 'Studio Sessions', 'Behind The Sound', 'Melodic Voices'], summary: 'The source frequency for music, performance, studio sessions, releases, and the creative process behind Melodic.', visible: true },
    { id: 'two-harmonic', prompt: 'Ready to resonate?', name: '2 Harmonic', frequency: 'Fashion Frequency', icon: '∞', href: '/worlds/two-harmonic', color: '#57bfff', items: ['Collections', 'Drops', 'Behind The Stitch', 'Harmonic Souls'], summary: 'The fashion world of stitched melodies, collection stories, garment design, drops, and community expression.', visible: true },
    { id: 'fried-em', prompt: 'Feeling competitive?', name: 'Fried Em', frequency: 'Hoops Frequency', icon: '◉', href: '/worlds/fried-em', color: '#ff8b2b', items: ['Game Highlights', 'Training', 'Challenges', 'Behind The Grind'], summary: 'Basketball, competition, smoke, training, highlights, challenges, and the grind behind every bucket.', visible: true },
    { id: 'schmackinn', prompt: 'Got the munchies?', name: 'Schmackinn', frequency: 'Food Frequency', icon: '◒', href: '/worlds/schmackinn', color: '#c05cff', items: ['Food Reviews', 'Tier Lists', 'Restaurant Map', 'Community Picks'], summary: 'Real food reviews, honest rankings, restaurant discoveries, community picks, and the Schmackinn tier archive.', visible: true },
  ],
};

export function loadCreatorConfig(): CreatorConfig {
  if (typeof window === 'undefined') return defaultCreatorConfig;
  try {
    const raw = window.localStorage.getItem(CREATOR_STUDIO_KEY);
    if (!raw) return defaultCreatorConfig;
    const parsed = JSON.parse(raw) as Partial<CreatorConfig>;
    return { ...defaultCreatorConfig, ...parsed, worlds: parsed.worlds ?? defaultCreatorConfig.worlds };
  } catch {
    return defaultCreatorConfig;
  }
}
