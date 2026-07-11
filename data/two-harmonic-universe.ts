export type CollectionStatus = 'concept' | 'sampling' | 'production' | 'released';

export type HarmonicCollection = {
  slug: string;
  name: string;
  chapter: string;
  melody: string;
  status: CollectionStatus;
  season: string;
  palette: string[];
  garments: number;
  story: string;
  symbol: string;
};

export const collections: HarmonicCollection[] = [
  {
    slug: 'lift-u-up',
    name: 'Lift U Up',
    chapter: 'Chapter I · Becoming',
    melody: 'Lift U Up',
    status: 'production',
    season: 'Fall',
    palette: ['#111111', '#36b2cb', '#f5e6c8'],
    garments: 4,
    story: 'A collection about carrying your own weight without forgetting the people who helped you stand.',
    symbol: '♬',
  },
  {
    slug: 'stitched-melodies',
    name: 'Stitched Melodies',
    chapter: 'The Founding Frequency',
    melody: 'Two hearts, one harmony',
    status: 'released',
    season: 'Core',
    palette: ['#d8d8d8', '#0a0a0a', '#f472b6'],
    garments: 6,
    story: 'The permanent language of 2 Harmonic: every garment carries a line, memory, or motivation worth wearing.',
    symbol: '∞',
  },
  {
    slug: 'duality',
    name: 'Duality',
    chapter: 'Chapter II · Reflection',
    melody: '2 / 2 = 1',
    status: 'concept',
    season: 'Winter',
    palette: ['#f5e6c8', '#7f1d1d', '#111827'],
    garments: 3,
    story: 'Opposing emotions share one body. The collection turns contrast into balance instead of conflict.',
    symbol: '2',
  },
];

export const fashionRooms = [
  { href: '/worlds/two-harmonic/collections', icon: '🧥', title: 'Collection Gallery', copy: 'Walk through every drop as a chapter, not a product grid.' },
  { href: '/worlds/two-harmonic/stitch-lab', icon: '🪡', title: 'Stitch Lab', copy: 'Build garments, placements, quotes, colors, trims, and stitched meaning.' },
  { href: '/worlds/two-harmonic/melody-sync', icon: '🎵', title: 'Melody Sync', copy: 'Connect songs, visuals, and release dates to the garments they inspired.' },
  { href: '/worlds/two-harmonic/archive', icon: '🗄️', title: 'Fashion Archive', copy: 'Preserve samples, campaigns, unreleased concepts, and the story behind each era.' },
  { href: '/worlds/two-harmonic/closet', icon: '🪞', title: 'Harmonic Closet', copy: 'Save owned pieces, build fits, and see how your wardrobe carries your frequency.' },
  { href: '/studio/two-harmonic', icon: '⚙️', title: 'Fashion House Studio', copy: 'Manage collections, products, music sync, campaigns, inventory, and release states.' },
];

export const stitchedPrinciples = [
  { title: 'Memory', copy: 'A garment should hold something you refuse to forget.' },
  { title: 'Melody', copy: 'Every collection has a sound, rhythm, and emotional key.' },
  { title: 'Duality', copy: 'Two opposing truths can still create one harmony.' },
  { title: 'Legacy', copy: 'The archive should show how the founder, brand, and community evolved together.' },
];
