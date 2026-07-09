export type HarmonicWorldSlug = 'melodic' | 'fried-em' | 'schmackin' | 'two-harmonic' | 'business';

export type HarmonicWorldRoom = {
  id: string;
  label: string;
  icon: string;
  type: string;
  description: string;
  cta: string;
};

export type HarmonicWorldConfig = {
  slug: HarmonicWorldSlug;
  name: string;
  eyebrow: string;
  handle: string;
  tagline: string;
  philosophy: string;
  primary: string;
  secondary: string;
  accent: string;
  atmosphere: string;
  entry: string;
  rooms: HarmonicWorldRoom[];
  metrics: { label: string; value: string }[];
};

export const harmonicWorlds: HarmonicWorldConfig[] = [
  {
    slug: 'melodic',
    name: 'Melodic Universe',
    eyebrow: 'Music Frequency',
    handle: '@thatsmelodic',
    tagline: 'One creator. Many frequencies. Choose your frequency.',
    philosophy: 'Music is the memory system. Every song, beat, lyric, and room is a portal into the world that made it.',
    primary: '#b76cff',
    secondary: '#36b2cb',
    accent: '#f5d26b',
    atmosphere: 'purple-neon, cinematic, late-night studio, living memory',
    entry: 'Enter through the studio gate and move between music, beats, story, video, merch, and hidden rooms.',
    rooms: [
      { id: 'home', label: 'Home Gate', icon: '🌌', type: 'landing', description: 'The cinematic intro into Melodic Universe.', cta: 'Enter' },
      { id: 'music', label: 'Music Room', icon: '🎵', type: 'media', description: 'Singles, albums, snippets, listening parties, and release stories.', cta: 'Listen' },
      { id: 'beat-vault', label: 'Beat Vault', icon: '🎹', type: 'commerce', description: 'Beat licenses, packs, melodies, and producer tools.', cta: 'Open Vault' },
      { id: 'story', label: 'Story Room', icon: '📖', type: 'lore', description: 'Lyrics, journal entries, philosophies, and the Melodic Bible energy.', cta: 'Read' },
      { id: 'gallery', label: 'Gallery', icon: '📸', type: 'visual', description: 'Photos, covers, rollout art, studio scenes, and visual memories.', cta: 'View' },
      { id: 'secret', label: 'Secret Frequency', icon: '🔒', type: 'hidden', description: 'Hidden easter eggs, unreleased ideas, and future drops.', cta: 'Unlock' },
    ],
    metrics: [
      { label: 'Rooms', value: '6' },
      { label: 'Primary Offer', value: 'Beat Vault' },
      { label: 'Mood', value: 'Late Night' },
    ],
  },
  {
    slug: 'fried-em',
    name: 'Fried Em',
    eyebrow: 'Basketball Frequency',
    handle: '@friedem',
    tagline: 'They wanted smoke, so we served it hot.',
    philosophy: 'A digital park where hoopers get called out, cooked, ranked, replayed, and remembered.',
    primary: '#ff6b35',
    secondary: '#f8f1d8',
    accent: '#191919',
    atmosphere: 'blacktop lights, heatwaves, scoreboard glow, smoke and skillet energy',
    entry: 'Step onto the park, pick a court, watch episodes, check leaderboards, and call next.',
    rooms: [
      { id: 'park', label: 'The Park', icon: '🏀', type: 'landing', description: 'Main Fried Em court with episode and challenge entry points.', cta: 'Check Ball' },
      { id: 'episodes', label: 'Episode Wall', icon: '🎥', type: 'media', description: 'Fried Em episodes, highlights, trailers, and behind-the-scenes clips.', cta: 'Watch' },
      { id: 'leaderboard', label: 'Cooked Board', icon: '🔥', type: 'ranking', description: 'Player rankings, cooked meter, wins, losses, and signature moments.', cta: 'Rank Up' },
      { id: 'challenges', label: 'Challenge Arena', icon: '⚔️', type: 'community', description: 'Callouts, matchups, RSVP games, and community challenges.', cta: 'Call Out' },
      { id: 'film-room', label: 'Film Room', icon: '🎞️', type: 'analysis', description: 'Breakdowns, player scouting, best plays, and game storylines.', cta: 'Study' },
    ],
    metrics: [
      { label: 'Rooms', value: '5' },
      { label: 'Main Mechanic', value: 'Challenges' },
      { label: 'Mood', value: 'Heated' },
    ],
  },
  {
    slug: 'schmackin',
    name: 'Schmackin',
    eyebrow: 'Food Frequency',
    handle: '@schmackin',
    tagline: 'If it hit, it is Schmackin. If it miss, it is buns.',
    philosophy: 'A neon food district where reviews become quests, restaurants become rooms, and every bite has a rating.',
    primary: '#ff4d8d',
    secondary: '#ffd166',
    accent: '#36b2cb',
    atmosphere: 'neon food district, sauce glow, late-night car review, city appetite',
    entry: 'Walk into the district, watch reviews, rank plates, find restaurants, and unlock food quests.',
    rooms: [
      { id: 'district', label: 'Food District', icon: '🍔', type: 'landing', description: 'Main food world with latest reviews and featured spots.', cta: 'Eat' },
      { id: 'reviews', label: 'Review Wall', icon: '🎥', type: 'media', description: 'Food videos, car reviews, mukbang moments, and sauce reactions.', cta: 'Watch' },
      { id: 'tier-list', label: 'Tier Kitchen', icon: '📊', type: 'ranking', description: 'Schmackin, Crackin, Mid, Buns rankings for every food spot.', cta: 'Rank' },
      { id: 'map', label: 'Food Map', icon: '🗺️', type: 'discovery', description: 'Restaurant locations, hidden gems, city filters, and food trails.', cta: 'Explore' },
      { id: 'quests', label: 'Food Quests', icon: '🎯', type: 'community', description: 'Audience challenges, next places to try, and city missions.', cta: 'Vote' },
    ],
    metrics: [
      { label: 'Rooms', value: '5' },
      { label: 'Main Mechanic', value: 'Tier List' },
      { label: 'Mood', value: 'Saucy' },
    ],
  },
  {
    slug: 'two-harmonic',
    name: '2 Harmonic',
    eyebrow: 'Fashion Frequency',
    handle: '@2harmonic',
    tagline: 'Stitched melodies for the ones choosing harmony.',
    philosophy: 'A virtual showroom where clothes sing, collections feel like albums, and every garment carries a frequency.',
    primary: '#111111',
    secondary: '#d8c7a3',
    accent: '#d9273e',
    atmosphere: 'luxury streetwear gallery, cream walls, red glow, stitched infinity',
    entry: 'Enter the showroom, move through collections, see the process, and shop the drop.',
    rooms: [
      { id: 'showroom', label: 'Showroom', icon: '👕', type: 'landing', description: 'Cinematic 2 Harmonic product world and drop entrance.', cta: 'Enter' },
      { id: 'collections', label: 'Collections', icon: '🧥', type: 'commerce', description: 'Fall, basics, limited melody drops, archive, and restocks.', cta: 'Shop' },
      { id: 'design-lab', label: 'Design Lab', icon: '✂️', type: 'process', description: 'Mood boards, sketches, manufacturer notes, samples, and palettes.', cta: 'Study' },
      { id: 'lookbook', label: 'Lookbook', icon: '📸', type: 'visual', description: 'Photoshoots, outfits, model stories, and styling ideas.', cta: 'View' },
      { id: 'community', label: 'Symphony Circle', icon: '🤝', type: 'community', description: 'Supporters, model calls, drops, feedback, and early access.', cta: 'Join' },
    ],
    metrics: [
      { label: 'Rooms', value: '5' },
      { label: 'Main Mechanic', value: 'Drops' },
      { label: 'Mood', value: 'Luxury' },
    ],
  },
  {
    slug: 'business',
    name: 'Harmonic Business',
    eyebrow: 'Capital Frequency',
    handle: '@harmonicos',
    tagline: 'The pitch room for the platform, the brand, and the business engine.',
    philosophy: 'A professional world for investors, sponsors, partners, press, metrics, and the vision behind the universe.',
    primary: '#36b2cb',
    secondary: '#b76cff',
    accent: '#f5d26b',
    atmosphere: 'clean investor deck, neon command room, metrics and momentum',
    entry: 'Enter the capital room to understand the product, traction, revenue logic, and partnership opportunities.',
    rooms: [
      { id: 'pitch', label: 'Pitch Room', icon: '📈', type: 'deck', description: 'Problem, solution, market, product, moat, and roadmap.', cta: 'Pitch' },
      { id: 'metrics', label: 'Metrics Wall', icon: '📊', type: 'analytics', description: 'Traction, deployments, content, revenue goals, and growth indicators.', cta: 'View Data' },
      { id: 'partners', label: 'Partner Lounge', icon: '🤝', type: 'partnership', description: 'Sponsor packages, brand partnerships, creator deals, and collaborations.', cta: 'Partner' },
      { id: 'press', label: 'Press Kit', icon: '📰', type: 'media', description: 'Founder story, brand assets, screenshots, bios, and media contact.', cta: 'Download' },
      { id: 'roadmap', label: 'Roadmap', icon: '🛣️', type: 'planning', description: 'World engine, creator economy, AI layer, mobile app, and public launch path.', cta: 'Plan' },
    ],
    metrics: [
      { label: 'Rooms', value: '5' },
      { label: 'Main Mechanic', value: 'Pitch' },
      { label: 'Mood', value: 'Investor' },
    ],
  },
];

export function getWorldBySlug(slug: string) {
  return harmonicWorlds.find((world) => world.slug === slug);
}
