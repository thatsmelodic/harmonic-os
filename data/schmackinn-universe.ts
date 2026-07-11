export type SchmackinnVerdict = 'Schmakinn' | 'Crackin' | 'Lackin' | 'Bunz';

export type Restaurant = {
  slug: string;
  name: string;
  city: string;
  district: string;
  category: string;
  price: '$' | '$$' | '$$$';
  verdict: SchmackinnVerdict;
  score: number;
  communityScore: number;
  callouts: number;
  hiddenGem: boolean;
  reviewed: boolean;
  open: boolean;
  x: number;
  y: number;
  storefront: string;
  featuredDish: string;
  story: string;
  flavor: { flavor: number; texture: number; freshness: number; comfort: number; value: number; culture: number };
};

export const cities = ['Milwaukee', 'Baltimore', 'Chicago'] as const;

export const restaurants: Restaurant[] = [
  { slug: 'oscars-pub', name: "Oscar's Pub", city: 'Milwaukee', district: 'South Side', category: 'Burgers', price: '$$', verdict: 'Schmakinn', score: 96, communityScore: 92, callouts: 43, hiddenGem: true, reviewed: true, open: true, x: 18, y: 66, storefront: '🍔', featuredDish: 'Big O Burger', story: 'A neighborhood staple with heavyweight flavor and no wasted motion.', flavor: { flavor: 97, texture: 93, freshness: 88, comfort: 96, value: 94, culture: 95 } },
  { slug: 'el-rey', name: 'El Rey', city: 'Milwaukee', district: 'South Side', category: 'Mexican', price: '$', verdict: 'Crackin', score: 86, communityScore: 89, callouts: 31, hiddenGem: false, reviewed: true, open: true, x: 36, y: 72, storefront: '🌮', featuredDish: 'Steak Tacos', story: 'Fast, loud, affordable, and built for repeat visits.', flavor: { flavor: 88, texture: 82, freshness: 91, comfort: 86, value: 96, culture: 94 } },
  { slug: 'heavens-table', name: "Heaven's Table", city: 'Milwaukee', district: 'Downtown', category: 'Soul Food', price: '$$', verdict: 'Schmakinn', score: 94, communityScore: 95, callouts: 86, hiddenGem: true, reviewed: true, open: false, x: 54, y: 42, storefront: '🍗', featuredDish: 'Fried Chicken Plate', story: 'Comfort food that carries memory, culture, and Sunday energy.', flavor: { flavor: 95, texture: 92, freshness: 89, comfort: 100, value: 90, culture: 100 } },
  { slug: 'crafty-cow', name: 'Crafty Cow', city: 'Milwaukee', district: 'Bay View', category: 'Chicken', price: '$$', verdict: 'Crackin', score: 84, communityScore: 82, callouts: 24, hiddenGem: false, reviewed: true, open: true, x: 72, y: 68, storefront: '🥪', featuredDish: 'Nashville Chicken Sandwich', story: 'A creative chicken stop with heat, crunch, and personality.', flavor: { flavor: 87, texture: 94, freshness: 84, comfort: 85, value: 79, culture: 81 } },
  { slug: 'midnight-burger-club', name: 'Midnight Burger Club', city: 'Baltimore', district: 'Fells Point', category: 'Burgers', price: '$$', verdict: 'Schmakinn', score: 95, communityScore: 90, callouts: 58, hiddenGem: true, reviewed: true, open: true, x: 24, y: 34, storefront: '🌙', featuredDish: 'Double Smash Burger', story: 'Late-night energy, crispy edges, and a sauce worth arguing about.', flavor: { flavor: 96, texture: 95, freshness: 86, comfort: 94, value: 84, culture: 91 } },
  { slug: 'late-plate', name: 'Late Plate', city: 'Baltimore', district: 'Downtown', category: 'Loaded Fries', price: '$', verdict: 'Lackin', score: 58, communityScore: 64, callouts: 19, hiddenGem: false, reviewed: true, open: true, x: 61, y: 48, storefront: '🍟', featuredDish: 'Loaded Fries', story: 'The concept had promise, but the execution lost the signal.', flavor: { flavor: 61, texture: 49, freshness: 55, comfort: 68, value: 52, culture: 67 } },
  { slug: 'community-pick', name: 'Community Pick', city: 'Chicago', district: 'South Loop', category: 'Soul Food', price: '$$', verdict: 'Crackin', score: 82, communityScore: 91, callouts: 127, hiddenGem: true, reviewed: false, open: true, x: 48, y: 50, storefront: '📣', featuredDish: 'Waiting on the first bite', story: 'The loudest open callout in the district. The community wants this reviewed next.', flavor: { flavor: 0, texture: 0, freshness: 0, comfort: 0, value: 0, culture: 0 } },
];

export const verdictStyle: Record<SchmackinnVerdict, { glow: string; label: string; atmosphere: string }> = {
  Schmakinn: { glow: 'border-purple-300/50 bg-purple-400/20 shadow-[0_0_55px_rgba(192,132,252,.42)]', label: 'Frequency Found', atmosphere: 'Purple crystal glow, steam, crowd energy, Hall of Harmony status.' },
  Crackin: { glow: 'border-yellow-300/45 bg-yellow-300/15 shadow-[0_0_45px_rgba(253,224,71,.3)]', label: 'Run It Back', atmosphere: 'Warm gold light, active tables, and sparks around the sign.' },
  Lackin: { glow: 'border-orange-300/30 bg-orange-400/10', label: 'Signal Slipping', atmosphere: 'Muted lights, thinner crowd, and a weakened flavor signal.' },
  Bunz: { glow: 'border-zinc-500/35 bg-zinc-800/45', label: 'Frequency Collapsed', atmosphere: 'Flicker, static, playful smoke, and an empty lot.' },
};

export function getRestaurant(slug: string) {
  return restaurants.find((restaurant) => restaurant.slug === slug);
}
