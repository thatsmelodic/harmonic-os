export type World = {
  name: string;
  signal: string;
  description: string;
  accent: string;
  callsToAction: string[];
};

export const worlds: World[] = [
  {
    name: 'Melodic',
    signal: 'Music / Sound / Identity',
    description: 'The frequency source: songs, beats, videos, and the creative identity behind the universe.',
    accent: '#b76cff',
    callsToAction: ['Listen', 'Watch', 'Follow'],
  },
  {
    name: '2 Harmonic',
    signal: 'Fashion / Stitched Melodies',
    description: 'The clothing world built around harmony, duality, original quotes, and wearable meaning.',
    accent: '#36b2cb',
    callsToAction: ['Shop', 'View Drops', 'Read Meaning'],
  },
  {
    name: 'Fried Em',
    signal: 'Basketball / Competition',
    description: 'Hooping content, challenges, trash talk, cooked moments, and good energy on the court.',
    accent: '#ff7a2f',
    callsToAction: ['Watch Episodes', 'Challenge', 'Follow'],
  },
  {
    name: 'Schmackinn',
    signal: 'Food / Culture / Reviews',
    description: 'Food reviews and reactions with personality, taste, humor, and real-world culture.',
    accent: '#ff4fd8',
    callsToAction: ['Watch Reviews', 'Suggest Spots', 'Follow'],
  },
];

export const socialGroups = [
  {
    title: 'Melodic',
    links: ['Instagram', 'TikTok', 'YouTube', 'Twitch', 'Patreon', 'Snapchat'],
  },
  {
    title: '2 Harmonic',
    links: ['Instagram', 'Shop', 'Website'],
  },
  {
    title: 'Fried Em',
    links: ['YouTube', 'TikTok', 'Instagram'],
  },
  {
    title: 'Schmackinn',
    links: ['YouTube', 'TikTok', 'Instagram'],
  },
  {
    title: 'Support',
    links: ['Cash App', 'Patreon'],
  },
];

export const biblePreview = {
  eyebrow: 'The Harmonic Bible',
  title: 'The OS has lore.',
  body: 'The Cup pours creative frequency. The frequency forms the Heart. The Heart opens many worlds from one source.',
};
