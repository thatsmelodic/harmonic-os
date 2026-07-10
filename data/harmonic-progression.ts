export type HarmonicProgressionDefault = {
  worldId: string;
  worldName: string;
  currencyName: string;
  currencyIcon: string;
  levelNames: string[];
  constitutionTitle: string;
  constitutionBody: string;
  defaultActions: Array<{ action: string; amount: number }>;
  defaultRewards: Array<{ threshold: number; title: string; description: string; rewardType: 'badge' | 'discount' | 'access' | 'merch' | 'experience' }>;
};

export const harmonicProgressionDefaults: HarmonicProgressionDefault[] = [
  {
    worldId: 'melodic',
    worldName: 'Melodic Universe',
    currencyName: 'Frequency',
    currencyIcon: '🎵',
    levelNames: ['Listener', 'Supporter', 'Vibe', 'Frequency', 'Composer', 'Producer', 'Conductor', 'Virtuoso', 'Legend'],
    constitutionTitle: 'Choose Your Frequency',
    constitutionBody: 'We create with intention. We listen deeply. We respect the process. Every sound carries a story, and every member helps shape the universe.',
    defaultActions: [
      { action: 'Watch a music video', amount: 15 },
      { action: 'Finish a project', amount: 100 },
      { action: 'License a beat', amount: 250 },
      { action: 'Leave a thoughtful comment', amount: 5 },
    ],
    defaultRewards: [
      { threshold: 100, title: 'Listener Badge', description: 'Unlock a visible supporter badge.', rewardType: 'badge' },
      { threshold: 500, title: 'Early Listening', description: 'Hear selected releases before the public.', rewardType: 'access' },
      { threshold: 2000, title: 'Beat Discount', description: 'Receive 10% off eligible beat licenses.', rewardType: 'discount' },
      { threshold: 5000, title: 'Studio Session', description: 'Enter a private creator session or livestream.', rewardType: 'experience' },
    ],
  },
  {
    worldId: 'fried-em',
    worldName: 'Fried Em',
    currencyName: 'Heat',
    currencyIcon: '🔥',
    levelNames: ['Rookie', 'Hooper', 'Starter', 'Bucket', 'Cooker', 'Dawg', 'Problem', 'Legend', 'GOAT'],
    constitutionTitle: 'Welcome to Pressure',
    constitutionBody: 'We compete. We talk trash. We respect the game. Every bucket is earned. Every loss teaches. Every season creates legends.',
    defaultActions: [
      { action: 'Watch an episode', amount: 15 },
      { action: 'Complete a season', amount: 100 },
      { action: 'Vote on a matchup', amount: 10 },
      { action: 'Win an official challenge', amount: 400 },
      { action: 'Attend a live run', amount: 150 },
    ],
    defaultRewards: [
      { threshold: 100, title: 'Park Badge', description: 'Show your first official Fried Em badge.', rewardType: 'badge' },
      { threshold: 500, title: 'Early Episode Access', description: 'Watch selected episodes before public release.', rewardType: 'access' },
      { threshold: 1000, title: 'Challenge Priority', description: 'Move higher in official challenge review.', rewardType: 'access' },
      { threshold: 3000, title: 'Merch Discount', description: 'Receive 15% off eligible Fried Em merchandise.', rewardType: 'discount' },
      { threshold: 5000, title: 'Play on Fried Em', description: 'Become eligible for a creator-approved appearance.', rewardType: 'experience' },
    ],
  },
  {
    worldId: 'schmackinn',
    worldName: 'Schmackinn',
    currencyName: 'Flavor',
    currencyIcon: '🍔',
    levelNames: ['Hungry', 'Foodie', 'Taster', 'Critic', 'Chef', 'Connoisseur', 'Flavor God'],
    constitutionTitle: 'If It Hit, It Is Schmackin',
    constitutionBody: 'We keep reviews honest, energy real, and taste personal. Respect the food, respect the people, and never fake the flavor.',
    defaultActions: [
      { action: 'Watch a review', amount: 15 },
      { action: 'Rate a restaurant', amount: 10 },
      { action: 'Submit a restaurant', amount: 25 },
      { action: 'Attend a food event', amount: 150 },
    ],
    defaultRewards: [
      { threshold: 250, title: 'Foodie Badge', description: 'Unlock a visible community badge.', rewardType: 'badge' },
      { threshold: 1000, title: 'Vote the Next Spot', description: 'Unlock priority restaurant voting.', rewardType: 'access' },
      { threshold: 3000, title: 'Community Merch', description: 'Unlock an exclusive merchandise reward.', rewardType: 'merch' },
      { threshold: 7000, title: 'Eat With the Creator', description: 'Become eligible for a creator-approved food episode.', rewardType: 'experience' },
    ],
  },
  {
    worldId: '2-harmonic',
    worldName: '2 Harmonic',
    currencyName: 'Harmony',
    currencyIcon: '👕',
    levelNames: ['Listener', 'Supporter', 'Stitched Soul', 'Collector', 'Designer', 'Visionary', 'Legend'],
    constitutionTitle: 'Wear Your Melody',
    constitutionBody: 'Every person carries a melody. We wear what moves us, create with purpose, and choose harmony without pretending life has no contrast.',
    defaultActions: [
      { action: 'View a collection', amount: 10 },
      { action: 'Purchase merchandise', amount: 250 },
      { action: 'Attend a drop', amount: 150 },
      { action: 'Submit approved fan art', amount: 100 },
    ],
    defaultRewards: [
      { threshold: 100, title: 'Stitched Supporter', description: 'Unlock a 2 Harmonic supporter badge.', rewardType: 'badge' },
      { threshold: 500, title: 'Early Drop Access', description: 'Enter selected drops before public release.', rewardType: 'access' },
      { threshold: 2000, title: 'Harmony Discount', description: 'Receive 15% off eligible products.', rewardType: 'discount' },
      { threshold: 5000, title: 'Limited Piece', description: 'Unlock eligibility for a limited community item.', rewardType: 'merch' },
      { threshold: 10000, title: 'Design With Melodic', description: 'Become eligible for a creator-approved design session.', rewardType: 'experience' },
    ],
  },
  {
    worldId: 'investor',
    worldName: 'Harmonic Business',
    currencyName: 'Capital',
    currencyIcon: '📈',
    levelNames: ['Observer', 'Supporter', 'Builder', 'Operator', 'Strategist', 'Partner', 'Visionary'],
    constitutionTitle: 'Build What Outlives You',
    constitutionBody: 'We value clarity, ownership, discipline, and long-term thinking. Capital is more than money; it is trust, attention, skill, and action.',
    defaultActions: [
      { action: 'Read an update', amount: 10 },
      { action: 'Attend a founder event', amount: 100 },
      { action: 'Complete a learning track', amount: 75 },
      { action: 'Support a verified launch', amount: 250 },
    ],
    defaultRewards: [
      { threshold: 100, title: 'Builder Badge', description: 'Unlock a visible business community badge.', rewardType: 'badge' },
      { threshold: 1000, title: 'Private Updates', description: 'Access selected founder notes and behind-the-scenes updates.', rewardType: 'access' },
      { threshold: 5000, title: 'Strategy Session', description: 'Become eligible for a creator-approved strategy session.', rewardType: 'experience' },
    ],
  },
];

export function getProgressionDefault(worldId: string) {
  return harmonicProgressionDefaults.find((world) => world.worldId === worldId);
}
