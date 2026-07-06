export type PermissionLevel = 'guest' | 'profile' | 'harmonic-plus' | 'creator' | 'investor';
export type SeasonKey = 'spring' | 'summer' | 'fall' | 'winter';
export type PaletteKey = 'acid-wash' | 'pink-blossom' | 'cyber-wave' | 'nature-mode' | 'fall-drop';
export type ModuleKey = 'reviews' | 'comments' | 'ratings' | 'recommendations' | 'gallery' | 'video' | 'products' | 'calendar' | 'analytics' | 'qa';

export const permissionRank: Record<PermissionLevel, number> = {
  guest: 0,
  profile: 1,
  'harmonic-plus': 2,
  creator: 3,
  investor: 4,
};

export const kernel = {
  productName: 'Harmonic OS',
  version: '1.0-foundation',
  activeSeason: 'winter' as SeasonKey,
  activePalette: 'cyber-wave' as PaletteKey,
  defaultPermission: 'guest' as PermissionLevel,
  ai: {
    enabled: true,
    label: 'Harmonic AI',
    phase: 'MVP local routing layer',
    purpose: 'Brand-native assistant that reads the OS data model and routes visitors through worlds, modules, and creator tools.',
  },
};

export function canAccess(userLevel: PermissionLevel, requiredLevel: PermissionLevel) {
  return permissionRank[userLevel] >= permissionRank[requiredLevel];
}

export const moduleRegistry: Record<ModuleKey, { label: string; required: PermissionLevel; purpose: string }> = {
  reviews: { label: 'Reviews', required: 'profile', purpose: 'Community reviews for restaurants, products, songs, videos, and worlds.' },
  comments: { label: 'Comments', required: 'profile', purpose: 'Profile-gated discussion across all worlds.' },
  ratings: { label: 'Ratings', required: 'profile', purpose: 'Scores for food, drops, songs, games, and experiences.' },
  recommendations: { label: 'Recommendations', required: 'profile', purpose: 'Community suggestions for restaurants, videos, drops, and beats.' },
  gallery: { label: 'Gallery', required: 'guest', purpose: 'Public visual grids for outfits, food, photos, clips, and covers.' },
  video: { label: 'Video', required: 'guest', purpose: 'Embeds and video cards for creator media.' },
  products: { label: 'Products', required: 'guest', purpose: 'Shop cards, drop previews, inventory hooks, and collection links.' },
  calendar: { label: 'Calendar', required: 'creator', purpose: 'Creator-only launch planning and upload scheduling.' },
  analytics: { label: 'Analytics', required: 'creator', purpose: 'Creator and investor metrics for growth and business tracking.' },
  qa: { label: 'Q and A', required: 'profile', purpose: 'Community questions and answers with public read access.' },
};
