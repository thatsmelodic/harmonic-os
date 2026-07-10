export type FriedEmPlayer = {
  slug: string;
  name: string;
  handle: string;
  badge: string;
  record: string;
  wins: number;
  losses: number;
  respect: number;
  heat: number;
  cookedMeter: number;
  clutch: number;
  iq: number;
  stops: number;
  buckets: number;
  signatureMove: string;
  recentVictim: string;
  bio: string;
  highlights: string[];
};

export const friedEmPlayers: FriedEmPlayer[] = [
  {
    slug: 'melodic',
    name: 'Melodic',
    handle: '@friedem',
    badge: 'Head Chef',
    record: '8-1',
    wins: 8,
    losses: 1,
    respect: 94,
    heat: 96,
    cookedMeter: 96,
    clutch: 92,
    iq: 88,
    stops: 64,
    buckets: 87,
    signatureMove: 'Hesitation into stepback',
    recentVictim: 'Jay Buckets',
    bio: 'Creator of Fried Em. Plays with pace, pressure, and enough confidence to turn every run into an episode.',
    highlights: ['Game-point stepback', 'Three straight stops', '21-11 park win'],
  },
  {
    slug: 'jay-buckets',
    name: 'Jay Buckets',
    handle: '@jaybuckets',
    badge: 'Microwave',
    record: '6-2',
    wins: 6,
    losses: 2,
    respect: 86,
    heat: 88,
    cookedMeter: 88,
    clutch: 84,
    iq: 80,
    stops: 58,
    buckets: 84,
    signatureMove: 'Quick pull-up jumper',
    recentVictim: 'Tone',
    bio: 'Dangerous once the first shot falls. Scores in bursts and can flip the whole park in two possessions.',
    highlights: ['Four straight jumpers', 'Comeback from 16-10', 'Overtime winner'],
  },
  {
    slug: 'tone',
    name: 'Tone',
    handle: '@tone',
    badge: 'Hot Hand',
    record: '5-3',
    wins: 5,
    losses: 3,
    respect: 79,
    heat: 82,
    cookedMeter: 82,
    clutch: 78,
    iq: 82,
    stops: 61,
    buckets: 77,
    signatureMove: 'Inside-out drive',
    recentVictim: 'Dre',
    bio: 'Momentum player with a strong first step and enough defensive energy to change a run fast.',
    highlights: ['Seven-point scoring burst', 'Chase-down block', 'Winner-keeps-court streak'],
  },
];

export function getFriedEmPlayer(slug: string) {
  return friedEmPlayers.find((player) => player.slug === slug);
}
