export type FriedEmEpisode = {
  slug: string;
  number: number;
  title: string;
  subtitle: string;
  description: string;
  duration: string;
  views: string;
  heat: number;
  court: string;
  opponent: string;
  result: string;
  score: string;
  publishedAt: string;
  youtubeId?: string;
  featuredPlayerSlugs: string[];
  moments: Array<{ time: string; label: string; description: string }>;
  tags: string[];
};

export const friedEmEpisodes: FriedEmEpisode[] = [
  {
    slug: 'they-wanted-smoke',
    number: 1,
    title: 'They Wanted Smoke',
    subtitle: 'My best friends called me out, so I fried them.',
    description: 'The first official Fried Em run. Trash talk turned into a full game, cameras came out, and every possession became personal.',
    duration: '12:48',
    views: '4.8K',
    heat: 97,
    court: 'The Park',
    opponent: 'The Homies',
    result: 'W',
    score: '21-11',
    publishedAt: '2026-07-01',
    featuredPlayerSlugs: ['melodic', 'jay-buckets'],
    moments: [
      { time: '02:14', label: 'First spark', description: 'The opening jumper flips the energy from friendly run to real competition.' },
      { time: '07:42', label: 'Momentum swing', description: 'Three straight stops push the Cooked Meter above 80%.' },
      { time: '11:56', label: 'Game point', description: 'A hesitation into a stepback closes the run.' },
    ],
    tags: ['1v1', 'trash-talk', 'game-point'],
  },
  {
    slug: 'no-excuses-at-the-park',
    number: 2,
    title: 'No Excuses at the Park',
    subtitle: 'First to 21. Loser hears about it all week.',
    description: 'A physical run with no soft calls, no resets, and no room for excuses once the score got close.',
    duration: '10:16',
    views: '3.2K',
    heat: 91,
    court: 'West Court',
    opponent: 'Jay Buckets',
    result: 'W',
    score: '21-18',
    publishedAt: '2026-07-04',
    featuredPlayerSlugs: ['melodic', 'jay-buckets'],
    moments: [
      { time: '03:08', label: 'Body work', description: 'Back-to-back drives force the defense to start helping early.' },
      { time: '06:35', label: 'Comeback warning', description: 'Jay cuts the lead to one and the whole park tightens up.' },
      { time: '09:44', label: 'Clutch finish', description: 'The final possession ends with a hard stop and transition bucket.' },
    ],
    tags: ['park-run', 'clutch', 'close-game'],
  },
  {
    slug: 'the-rematch',
    number: 3,
    title: 'The Rematch',
    subtitle: 'Same court. New energy. More pressure.',
    description: 'The rematch carries every argument from the first game back onto the blacktop. Both players know the cameras are rolling.',
    duration: '14:03',
    views: '5.1K',
    heat: 94,
    court: 'Center Court',
    opponent: 'Tone',
    result: 'W',
    score: '21-16',
    publishedAt: '2026-07-07',
    featuredPlayerSlugs: ['melodic', 'tone'],
    moments: [
      { time: '01:50', label: 'Immediate pressure', description: 'Tone attacks early and forces the pace higher than expected.' },
      { time: '08:20', label: 'Defensive stand', description: 'A chase-down block becomes the loudest moment of the episode.' },
      { time: '13:11', label: 'No doubt', description: 'The final run ends with separation and a clean finish at the rim.' },
    ],
    tags: ['rematch', 'defense', 'center-court'],
  },
];

export function getFriedEmEpisode(slug: string) {
  return friedEmEpisodes.find((episode) => episode.slug === slug);
}

export function getRelatedFriedEmEpisodes(slug: string, limit = 2) {
  return friedEmEpisodes.filter((episode) => episode.slug !== slug).slice(0, limit);
}
