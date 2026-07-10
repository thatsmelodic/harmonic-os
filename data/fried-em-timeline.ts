import type { ReputationEvent } from '@/lib/fried-em-reputation';

export const friedEmTimeline: ReputationEvent[] = [
  {
    id: 'melodic-game-1',
    playerSlug: 'melodic',
    type: 'game',
    title: 'Beat The Homies 21-11',
    description: 'Closed the first official Fried Em run with a game-point stepback.',
    createdAt: '2026-07-01T22:15:00Z',
    delta: { respect: 5, heat: 8, cookedMeter: 4, wins: 1, streak: 1 },
    href: '/worlds/fried-em/episodes/they-wanted-smoke',
  },
  {
    id: 'melodic-episode-1',
    playerSlug: 'melodic',
    type: 'episode',
    title: 'Episode 01 published',
    description: 'They Wanted Smoke entered the Episode Wall and became the first Fried Em chapter.',
    createdAt: '2026-07-02T02:00:00Z',
    delta: { respect: 2, heat: 3 },
    href: '/worlds/fried-em/episodes/they-wanted-smoke',
  },
  {
    id: 'jay-challenge-1',
    playerSlug: 'jay-buckets',
    type: 'challenge',
    title: 'Accepted the rematch',
    description: 'Jay Buckets accepted a first-to-21 rematch at West Court.',
    createdAt: '2026-07-05T18:30:00Z',
    delta: { respect: 2, heat: 2 },
    href: '/worlds/fried-em/challenges',
  },
  {
    id: 'tone-vote-1',
    playerSlug: 'tone',
    type: 'vote',
    title: 'Community heat rising',
    description: 'Tone crossed 200 matchup votes and moved into the top three on the Cooked Board.',
    createdAt: '2026-07-07T20:10:00Z',
    delta: { respect: 3, heat: 4 },
    href: '/worlds/fried-em/players/tone',
  },
  {
    id: 'melodic-streak-1',
    playerSlug: 'melodic',
    type: 'streak',
    title: 'Four-game win streak',
    description: 'Momentum bonus activated after four straight recorded wins.',
    createdAt: '2026-07-08T01:20:00Z',
    delta: { respect: 4, heat: 5, streak: 1 },
    href: '/worlds/fried-em/players/melodic',
  },
];

export function getPlayerTimeline(playerSlug: string) {
  return friedEmTimeline
    .filter((event) => event.playerSlug === playerSlug)
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
}
