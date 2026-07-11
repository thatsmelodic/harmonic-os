export type CollectionStatus = 'concept' | 'sampling' | 'production' | 'released';

export type HarmonicGarment = {
  slug: string;
  name: string;
  type: string;
  color: string;
  price: number;
  status: 'preview' | 'available' | 'sold-out';
  symbol: string;
  material: string;
  detail: string;
  lyric: string;
  edition: string;
  fit: string;
  construction: string[];
  experience: string[];
};

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
  mood: string[];
  atmosphere: string;
};

export const beigeGarments: HarmonicGarment[] = [
  {
    slug: 'quiet-luxury-pullover',
    name: 'Quiet Luxury Pullover',
    type: 'Heavyweight Hoodie',
    color: 'Warm Beige',
    price: 175,
    status: 'preview',
    symbol: '∞',
    material: '500 GSM custom-milled brushed cotton',
    detail: 'A sculpted heavyweight silhouette with raised tonal embroidery, custom interlocked-heart hardware, and a soft architectural drape.',
    lyric: 'Lift yourself without losing your softness.',
    edition: 'Chapter I numbered edition',
    fit: 'Relaxed luxury fit · structured shoulder · cropped-clean hem',
    construction: ['Double-layer hood', 'Tonal 3D embroidery', 'Custom heart hardware', 'Reinforced bound seams', 'Interior melody label'],
    experience: ['Digital authenticity card', 'Lift U Up listening chapter', 'Collector packaging', 'Living Closet video eligibility'],
  },
  {
    slug: 'frequency-zip',
    name: 'Frequency Zip',
    type: 'Luxury Zip Hoodie',
    color: 'Stone Cream',
    price: 195,
    status: 'preview',
    symbol: '♬',
    material: '480 GSM custom cotton fleece with satin hood lining',
    detail: 'The hero zip-up: custom two-way hardware, sculpted cuffs, tonal stitched melody, and a silhouette designed to feel composed from every angle.',
    lyric: 'The melody lives between every opening and closing.',
    edition: 'Chapter I hero garment',
    fit: 'Relaxed unisex fit · controlled volume · premium stacked body',
    construction: ['Custom two-way zipper', 'Satin-lined hood', 'Sculpted rib cuffs', 'Tonal back melody stitch', 'Hidden interior testimony pocket'],
    experience: ['Numbered garment certificate', 'Exclusive song visual', 'Luxury magnetic packaging', 'Early archive access'],
  },
  {
    slug: 'becoming-tee',
    name: 'Becoming Tee',
    type: 'Premium Tee',
    color: 'Soft Sand',
    price: 78,
    status: 'preview',
    symbol: '2',
    material: '300 GSM compact combed cotton',
    detail: 'A dense, structured tee with a precise neckline, relaxed body, puff-embroidered chest mark, and a hidden interior quote.',
    lyric: 'Becoming is still a frequency.',
    edition: 'Chapter I foundation piece',
    fit: 'Boxy premium fit · dropped shoulder · balanced length',
    construction: ['Dense compact jersey', 'Puff embroidered mark', 'Reinforced collar', 'Hidden interior quote', 'Archive hem label'],
    experience: ['Digital garment story', 'Collection soundtrack access', 'Collector packaging', 'Living Closet video eligibility'],
  },
  {
    slug: 'legacy-pant',
    name: 'Legacy Pant',
    type: 'Relaxed Sweatpant',
    color: 'Walnut Beige',
    price: 145,
    status: 'preview',
    symbol: '÷',
    material: '480 GSM cotton fleece',
    detail: 'A composed relaxed pant with a deep taper, tonal side melody, custom drawcord tips, and stitched archive coordinates.',
    lyric: 'What carried you becomes part of what you carry.',
    edition: 'Chapter I companion piece',
    fit: 'Relaxed thigh · controlled stack · articulated taper',
    construction: ['Custom metal drawcord tips', 'Tonal side embroidery', 'Deep reinforced pockets', 'Archive coordinate stitch', 'Structured waistband'],
    experience: ['Digital authenticity card', 'Collection soundtrack access', 'Collector packaging', 'Living Closet video eligibility'],
  },
];

export function getBeigeGarment(slug: string) {
  return beigeGarments.find((garment) => garment.slug === slug);
}

export const collections: HarmonicCollection[] = [
  {
    slug: 'lift-u-up',
    name: 'Beige Frequency',
    chapter: 'Chapter I · Lift U Up',
    melody: 'Lift U Up',
    status: 'production',
    season: 'Fall',
    palette: ['#d8c7aa', '#f5efe4', '#6f5a45'],
    garments: 4,
    story: 'Quiet confidence tailored into warm neutrals. Luxury without noise, softness without weakness, and music stitched into every layer.',
    symbol: '♬',
    mood: ['Luxury', 'Calm', 'Swag', 'Warmth'],
    atmosphere: 'Brushed brass, walnut shadows, soft fabric movement, low amber light, and Lift U Up breathing through the room.',
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
    mood: ['Identity', 'Memory', 'Community'],
    atmosphere: 'Gallery white, black stone, pink thread light, and a heartbeat-like bass pulse.',
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
    mood: ['Contrast', 'Reflection', 'Balance'],
    atmosphere: 'Cold glass, red reflections, mirrored silhouettes, and two melodies resolving into one chord.',
  },
];

export const fashionRooms = [
  { href: '/worlds/two-harmonic/collections', icon: '🧥', title: 'Collection Gallery', copy: 'Walk through every drop as a chapter, not a product grid.' },
  { href: '/worlds/two-harmonic/stitch-lab', icon: '🪡', title: 'Stitch Lab', copy: 'Build garments, placements, quotes, colors, trims, and stitched meaning.' },
  { href: '/worlds/two-harmonic/melody-sync', icon: '🎵', title: 'Melody Sync', copy: 'Connect songs, visuals, and release dates to the garments they inspired.' },
  { href: '/worlds/two-harmonic/archive', icon: '🗄️', title: 'Fashion Archive', copy: 'Preserve samples, campaigns, unreleased concepts, and the story behind each era.' },
  { href: '/worlds/two-harmonic/closet', icon: '🎥', title: 'Living Closet', copy: 'Watch community videos of real people wearing 2 Harmonic and adding their own memory to the garment.' },
  { href: '/studio/two-harmonic', icon: '⚙️', title: 'Fashion House Studio', copy: 'Manage collections, products, music sync, campaigns, inventory, and release states.' },
];

export const stitchedPrinciples = [
  { title: 'Memory', copy: 'A garment should hold something you refuse to forget.' },
  { title: 'Melody', copy: 'Every collection has a sound, rhythm, and emotional key.' },
  { title: 'Duality', copy: 'Two opposing truths can still create one harmony.' },
  { title: 'Legacy', copy: 'The archive should show how the founder, brand, and community evolved together.' },
];