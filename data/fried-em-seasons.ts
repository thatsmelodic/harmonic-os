export type FriedEmSeasonStatus = 'upcoming' | 'active' | 'completed';

export type FriedEmSeason = {
  slug: string;
  number: number;
  title: string;
  subtitle: string;
  description: string;
  status: FriedEmSeasonStatus;
  startDate: string;
  endDate?: string;
  champion?: string;
  mvp?: string;
  episodeSlugs: string[];
  featuredPlayerSlugs: string[];
  theme: string;
  rules: string[];
};

export const friedEmSeasons: FriedEmSeason[] = [
  {
    slug: 'season-one-pressure',
    number: 1,
    title: 'Pressure Makes Legends',
    subtitle: 'The first official Fried Em season.',
    description: 'Every callout, episode, ranking shift, and signature moment builds toward one champion and one season MVP.',
    status: 'active',
    startDate: '2026-07-01',
    episodeSlugs: ['they-wanted-smoke', 'no-excuses-at-the-park', 'the-rematch'],
    featuredPlayerSlugs: ['melodic', 'jay-buckets', 'tone'],
    theme: 'Night blacktop, scoreboard glow, smoke, pressure, and winner-keeps-court energy.',
    rules: [
      'Official games must be recorded or verified by a creator.',
      'Completed challenges affect records, Respect, Heat, and Cooked Meter.',
      'Community votes influence matchup priority and MVP momentum.',
      'The final Cooked Board determines playoff seeding.',
    ],
  },
];

export function getFriedEmSeason(slug: string) {
  return friedEmSeasons.find((season) => season.slug === slug);
}
