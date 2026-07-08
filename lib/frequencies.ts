export type FrequencyId = 'melodic' | 'harmonic' | 'fried-em' | 'schmackin';

export type FrequencyWorld = {
  id: FrequencyId;
  label: string;
  signal: string;
  tagline: string;
  philosophy: string;
  palette: {
    primary: string;
    secondary: string;
    aura: string;
    text: string;
  };
  motion: string;
  sound: string;
  modules: string[];
};

export const frequencies: FrequencyWorld[] = [
  {
    id: 'melodic',
    label: 'Melodic',
    signal: '96.6 FM',
    tagline: 'Music is the memory system.',
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
  },
  {
    id: 'harmonic',
    label: 'Harmonic',
    signal: '22.2 FM',
    tagline: 'Fashion is the body of the message.',
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
  },
  {
    id: 'fried-em',
    label: 'Fried Em',
    signal: '30.0 FM',
    tagline: 'Competition turns pressure into highlights.',
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
  },
  {
    id: 'schmackin',
    label: 'Schmackin',
    signal: '88.8 FM',
    tagline: 'Taste is a truth serum.',
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
  },
];

export function getFrequency(id: FrequencyId) {
  return frequencies.find((frequency) => frequency.id === id) ?? frequencies[0];
}
