export type FriedEmChallengeStatus = 'pending' | 'accepted' | 'scheduled' | 'live' | 'completed' | 'archived';

export type FriedEmChallenge = {
  id: string;
  challenger: string;
  opponent: string;
  matchup: string;
  court: string;
  date: string;
  time: string;
  stakes: string;
  status: FriedEmChallengeStatus;
  heat: number;
  votes: number;
  winner?: string;
  score?: string;
  episodeSlug?: string;
};

export const friedEmChallenges: FriedEmChallenge[] = [
  {
    id: 'winner-keeps-court',
    challenger: 'Melodic',
    opponent: 'Jay Buckets',
    matchup: '1v1',
    court: 'Center Court',
    date: '2026-07-12',
    time: '8:00 PM',
    stakes: 'Winner keeps court and gets the episode title.',
    status: 'scheduled',
    heat: 94,
    votes: 312,
  },
  {
    id: 'best-of-three-rematch',
    challenger: 'Tone',
    opponent: 'Melodic',
    matchup: 'Best of 3',
    court: 'West Court',
    date: '2026-07-16',
    time: '7:30 PM',
    stakes: 'No excuses. Loser accepts the Cooked Board caption.',
    status: 'accepted',
    heat: 88,
    votes: 246,
  },
  {
    id: 'open-gym-callout',
    challenger: 'Jay Buckets',
    opponent: 'Open Challenge',
    matchup: 'King of the Court',
    court: 'The Park',
    date: 'TBD',
    time: 'TBD',
    stakes: 'First challenger to five wins takes the spotlight.',
    status: 'pending',
    heat: 81,
    votes: 174,
  },
  {
    id: 'first-fried-em-run',
    challenger: 'Melodic',
    opponent: 'The Homies',
    matchup: '1v1 Rotation',
    court: 'The Park',
    date: '2026-07-01',
    time: '6:30 PM',
    stakes: 'Respect and bragging rights.',
    status: 'completed',
    heat: 97,
    votes: 488,
    winner: 'Melodic',
    score: '21-11',
    episodeSlug: 'they-wanted-smoke',
  },
];

export const challengeStatusOrder: FriedEmChallengeStatus[] = ['pending', 'accepted', 'scheduled', 'live', 'completed', 'archived'];
