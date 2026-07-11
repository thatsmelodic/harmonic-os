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
  { slug: 'quiet-luxury-pullover', name: 'Quiet Luxury Pullover', type: 'Heavyweight Hoodie', color: 'Warm Beige', price: 118, status: 'preview', symbol: '∞', material: '460 GSM brushed cotton', detail: 'Raised tonal embroidery, custom interlocked-heart hardware, and a calm oversized drape.', lyric: 'Lift yourself without losing your softness.' },
  { slug: 'frequency-zip', name: 'Frequency Zip', type: 'Luxury Zip Hoodie', color: 'Stone Cream', price: 128, status: 'preview', symbol: '♬', material: '420 GSM cotton fleece', detail: 'Two-way custom zipper, tonal stitched melody, satin-lined hood, and sculpted cuffs.', lyric: 'The melody lives between every opening and closing.' },
  { slug: 'becoming-tee', name: 'Becoming Tee', type: 'Premium Tee', color: 'Soft Sand', price: 58, status: 'preview', symbol: '2', material: '280 GSM combed cotton', detail: 'Structured neckline, relaxed body, puff-embroidered chest mark, and hidden interior quote.', lyric: 'Becoming is still a frequency.' },
  { slug: 'legacy-pant', name: 'Legacy Pant', type: 'Relaxed Sweatpant', color: 'Walnut Beige', price: 96, status: 'preview', symbol: '÷', material: '440 GSM cotton fleece', detail: 'Deep taper, tonal side melody, custom drawcord tips, and stitched archive coordinates.', lyric: 'What carried you becomes part of what you carry.' },
];

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
  { href: '/worlds/two-harmonic/closet', icon: '🪞', title: 'Harmonic Closet', copy: 'Save owned pieces, build fits, and see how your wardrobe carries your frequency.' },
  { href: '/studio/two-harmonic', icon: '⚙️', title: 'Fashion House Studio', copy: 'Manage collections, products, music sync, campaigns, inventory, and release states.' },
];

export const stitchedPrinciples = [
  { title: 'Memory', copy: 'A garment should hold something you refuse to forget.' },
  { title: 'Melody', copy: 'Every collection has a sound, rhythm, and emotional key.' },
  { title: 'Duality', copy: 'Two opposing truths can still create one harmony.' },
  { title: 'Legacy', copy: 'The archive should show how the founder, brand, and community evolved together.' },
];