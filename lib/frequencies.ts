export type FrequencyId = 'melodic' | 'harmonic' | 'fried-em' | 'schmackin';

export type FrequencyWorld = {
  id: FrequencyId;
  label: string;
  signal: string;
  path: string;
  tagline: string;
  philosophy: string;
  hero: string;
  cta: string;
  palette: {
    primary: string;
    secondary: string;
    aura: string;
    text: string;
  };
  motion: string;
  sound: string;
  modules: string[];
  features: {
    title: string;
    description: string;
  }[];
  timeline: string[];
};

export const frequencies: FrequencyWorld[] = [
  {
    id: 'melodic',
    label: 'Melodic',
    signal: '96.6 FM',
    path: '/worlds/melodic',
    tagline: 'Music is the memory system.',
    hero: 'Where pain becomes records and records become portals.',
    cta: 'Enter the music vault',
    philosophy:
      'The Melodic world turns pain, prayer, love, and ambition into sound. Every record becomes a saved frequency from your life.',
    palette: {
      primary: '#b76cff',
      secondary: '#ff4fd8',
      aura: 'rgba(183,108,255,.28)',
      text: '#f8f0ff',
    },
    motion: 'slow glow, floating particles, smooth fades',
    sound: 'piano ambience, reversed vocals, soft 808 pulse',
    modules: ['Music Vault', 'Beat Library', 'Lyric Archive', 'Studio Sessions'],
    features: [
      { title: 'Release Console', description: 'A command center for singles, projects, videos, cover art, and rollout notes.' },
      { title: 'Beat Vault', description: 'A private archive for melodies, loops, moods, BPMs, and unfinished ideas.' },
      { title: 'Lyric Memory', description: 'A living notebook where bars, hooks, poems, and voice notes become searchable artifacts.' },
    ],
    timeline: ['Demo captured', 'Mix in progress', 'Visual world drafted', 'Frequency ready for release'],
  },
  {
    id: 'harmonic',
    label: 'Harmonic',
    signal: '22.2 FM',
    path: '/worlds/harmonic',
    tagline: 'Fashion is the body of the message.',
    hero: 'Every garment is a melody stitched into the physical world.',
    cta: 'Open the design archive',
    philosophy:
      'The Harmonic world stitches identity into fabric. Every garment is a melody you can wear outside your chest.',
    palette: {
      primary: '#f5dfb8',
      secondary: '#36b2cb',
      aura: 'rgba(245,223,184,.24)',
      text: '#fff8ea',
    },
    motion: 'stitched lines, soft fabric drift, clean reveals',
    sound: 'vinyl texture, zipper pulls, needle taps',
    modules: ['Drops', 'Mood Boards', 'Design Archive', 'Manufacturing Journey'],
    features: [
      { title: 'Drop System', description: 'Track hoodies, tees, colorways, inventory ideas, campaign copy, and launch windows.' },
      { title: 'Mood Board Room', description: 'Collect palettes, fabrics, references, sketches, and seasonal emotions in one place.' },
      { title: 'Manufacturing Ledger', description: 'Keep supplier notes, sample status, costs, tags, zippers, and quality decisions organized.' },
    ],
    timeline: ['Concept sketched', 'Palette selected', 'Sample requested', 'Drop enters production'],
  },
  {
    id: 'fried-em',
    label: 'Fried Em',
    signal: '30.0 FM',
    path: '/worlds/fried-em',
    tagline: 'Competition turns pressure into highlights.',
    hero: 'Where smoke turns into buckets and every run becomes an episode.',
    cta: 'Step on the court',
    philosophy:
      'The Fried Em world is where smoke becomes buckets. Trash talk, discipline, and heat all turn into proof on the court.',
    palette: {
      primary: '#ff7a1a',
      secondary: '#ff3434',
      aura: 'rgba(255,122,26,.27)',
      text: '#fff1e6',
    },
    motion: 'fast cuts, impact shakes, scoreboard pulses',
    sound: 'sneaker squeaks, rim hits, bass drops',
    modules: ['Episodes', 'Court Map', 'Player Cards', 'Challenges'],
    features: [
      { title: 'Episode Board', description: 'Plan matchups, titles, thumbnails, hooks, promos, and post-game breakdowns.' },
      { title: 'Player Cards', description: 'Build profiles for friends, rivals, strangers, stats, strengths, and signature moments.' },
      { title: 'Challenge System', description: 'Create hoop challenges, call-outs, rematches, and community runs with stakes.' },
    ],
    timeline: ['Smoke requested', 'Camera rolling', 'Buckets served', 'Highlight archived'],
  },
  {
    id: 'schmackin',
    label: 'Schmackin',
    signal: '88.8 FM',
    path: '/worlds/schmackin',
    tagline: 'Taste is a truth serum.',
    hero: 'The food world where every bite either sings or gets sent to buns.',
    cta: 'Open the tier list',
    philosophy:
      'The Schmackin world rates food like a lived experience. Sauce, steam, hunger, and laughter decide what survives the tier list.',
    palette: {
      primary: '#ff4040',
      secondary: '#ffd166',
      aura: 'rgba(255,64,64,.23)',
      text: '#fff3dd',
    },
    motion: 'steam rises, sauce drips, warm pop-ins',
    sound: 'sizzle, cup ice, wrapper crunch',
    modules: ['Reviews', 'Tier Lists', 'Restaurant Map', 'Hidden Gems'],
    features: [
      { title: 'Review Console', description: 'Organize restaurants, orders, clips, ratings, sauces, timestamps, and quotable reactions.' },
      { title: 'Tier List Engine', description: 'Rank food through Schmackin, Crackin, Mid, and Buns with notes for each bite.' },
      { title: 'Food Map', description: 'Track hidden gems, return spots, bad experiences, and places the community wants reviewed.' },
    ],
    timeline: ['Order secured', 'First bite logged', 'Sauce applied', 'Final tier locked'],
  },
];

export function getFrequency(id: FrequencyId) {
  return frequencies.find((frequency) => frequency.id === id) ?? frequencies[0];
}
