export type DistrictId = 'universe' | 'two-harmonic' | 'fried-em' | 'schmackinn' | 'melodic' | 'business';

export type DistrictScene = {
  id: DistrictId;
  name: string;
  eyebrow: string;
  description: string;
  href: string;
  accent: string;
  accentSoft: string;
  skyTop: string;
  skyBottom: string;
  fog: string;
  architecture: 'city' | 'court' | 'fashion' | 'food' | 'studio' | 'finance';
  primaryAction: string;
  secondaryAction?: { label: string; href: string };
  landmarks: string[];
};

export const districtScenes: Record<DistrictId, DistrictScene> = {
  universe: {
    id: 'universe',
    name: 'Harmonic City',
    eyebrow: 'One city · six frequencies',
    description: 'A living skyline where fashion, food, basketball, music, and business move through one shared heartbeat.',
    href: '/worlds',
    accent: '#f3d08f',
    accentSoft: 'rgba(243,208,143,.24)',
    skyTop: '#090b18',
    skyBottom: '#24152d',
    fog: 'rgba(148,116,255,.17)',
    architecture: 'city',
    primaryAction: 'Enter the city',
    secondaryAction: { label: 'Creator Studio', href: '/studio' },
    landmarks: ['2 Harmonic', 'Fried Em', 'Schmackinn', 'Melodic', 'Business'],
  },
  'two-harmonic': {
    id: 'two-harmonic',
    name: '2 Harmonic',
    eyebrow: 'The Beige Dynasty · Royal Fashion Civilization',
    description: 'An Egyptian-inspired luxury kingdom where desert camouflage, royalty, music, and modern streetwear are stitched into one living frequency.',
    href: '/worlds/two-harmonic/collections',
    accent: '#e6b85c',
    accentSoft: 'rgba(230,184,92,.24)',
    skyTop: '#33261b',
    skyBottom: '#c3925f',
    fog: 'rgba(235,203,150,.22)',
    architecture: 'fashion',
    primaryAction: 'Enter the royal showroom',
    secondaryAction: { label: 'Melody Sync', href: '/worlds/two-harmonic/melody-sync' },
    landmarks: ['Frequency Gate', 'Ivory Palace', 'Lavender Temple', 'Becoming Courtyard', 'Legacy Passage'],
  },
  'fried-em': {
    id: 'fried-em',
    name: 'Fried Em',
    eyebrow: 'Orange Dawn · Blacktop District',
    description: 'A city park of chain nets, long shadows, drifting dust, animated scoreboards, moving silhouettes, and pressure before the first check-up.',
    href: '/worlds/fried-em',
    accent: '#ff6b24',
    accentSoft: 'rgba(255,107,36,.24)',
    skyTop: '#5e1f1a',
    skyBottom: '#f18b43',
    fog: 'rgba(255,132,72,.16)',
    architecture: 'court',
    primaryAction: 'Step on the court',
    secondaryAction: { label: 'Watch episodes', href: '/worlds/fried-em/episodes' },
    landmarks: ['Center Court', 'Cooked Board', 'Challenge Arena', 'Film Room'],
  },
  schmackinn: {
    id: 'schmackinn',
    name: 'Schmackinn',
    eyebrow: 'After Hours · Flavor City',
    description: 'A rain-soaked restaurant district with neon storefronts, food-truck steam, wet pavement reflections, glowing menus, and memories attached to every plate.',
    href: '/worlds/schmackinn',
    accent: '#ff4fb8',
    accentSoft: 'rgba(255,79,184,.24)',
    skyTop: '#171024',
    skyBottom: '#4a214a',
    fog: 'rgba(164,80,255,.2)',
    architecture: 'food',
    primaryAction: 'Enter Flavor City',
    secondaryAction: { label: 'Restaurant map', href: '/worlds/schmackinn' },
    landmarks: ['Review Row', 'Food Truck Alley', 'Recipe Archive', 'Community Picks'],
  },
  melodic: {
    id: 'melodic',
    name: 'Melodic',
    eyebrow: 'Night Session · Recording Complex',
    description: 'A midnight studio skyline of glass booths, giant speaker towers, moving meters, floating notes, chrome reflections, and windows pulsing with low-frequency light.',
    href: '/worlds/melodic',
    accent: '#8d83ff',
    accentSoft: 'rgba(141,131,255,.24)',
    skyTop: '#070916',
    skyBottom: '#1d2348',
    fog: 'rgba(94,90,255,.2)',
    architecture: 'studio',
    primaryAction: 'Enter the session',
    secondaryAction: { label: 'Music archive', href: '/worlds/melodic' },
    landmarks: ['Main Booth', 'Beat Lab', 'Memory Archive', 'Listening Tower'],
  },
  business: {
    id: 'business',
    name: 'Business',
    eyebrow: 'Morning Glass · Financial District',
    description: 'A quiet skyline of glass, steel, morning reflection, private rooms, live systems, and executive calm moving above the city.',
    href: '/worlds/business',
    accent: '#d7bc82',
    accentSoft: 'rgba(215,188,130,.22)',
    skyTop: '#111827',
    skyBottom: '#526071',
    fog: 'rgba(190,205,220,.15)',
    architecture: 'finance',
    primaryAction: 'Enter the district',
    landmarks: ['Capital Tower', 'Strategy Room', 'Market Floor', 'Founder Suite'],
  },
};

export const districtOrder: DistrictId[] = ['two-harmonic', 'fried-em', 'schmackinn', 'melodic', 'business'];
