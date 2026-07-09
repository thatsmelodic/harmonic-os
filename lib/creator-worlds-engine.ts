export type CreatorWorldCategory = 'music' | 'fashion' | 'basketball' | 'food' | 'business' | 'community' | 'gaming' | 'film' | 'fitness';
export type CreatorWorldVisibility = 'draft' | 'private' | 'invite-only' | 'public';
export type CreatorWorldModuleId = 'ai-assistant' | 'media-vault' | 'world-chat' | 'collabs' | 'analytics' | 'events' | 'commerce-ready' | 'marketplace-ready' | 'licensing-ready';

export type CreatorWorldPricing = {
  baseMonthly: number;
  includedCategories: number;
  extraCategoryMonthly: number;
  estimatedMonthly: number;
  platformTakeRate: number;
};

export type CreatorWorldBlueprint = {
  id: string;
  name: string;
  ownerHandle: string;
  tagline: string;
  visibility: CreatorWorldVisibility;
  categories: CreatorWorldCategory[];
  vibe: string;
  aiPersonality: string;
  primaryColor: string;
  secondaryColor: string;
  modules: CreatorWorldModuleId[];
  pricing: CreatorWorldPricing;
  monetization: string[];
  collaborationModes: string[];
  rankingSignals: string[];
  mediaSystem: string[];
  communitySystem: string[];
};

export const categoryDefinitions: Record<CreatorWorldCategory, { label: string; unlocks: string[]; monetization: string[] }> = {
  music: { label: 'Music', unlocks: ['music vault', 'song pages', 'release events', 'playlist rooms'], monetization: ['beats', 'licenses', 'stems', 'exclusive vault access'] },
  fashion: { label: 'Fashion', unlocks: ['lookbooks', 'drop pages', 'showroom mode', 'seasonal styling'], monetization: ['clothing drops', 'preorders', 'limited capsules', 'digital lookbooks'] },
  basketball: { label: 'Basketball', unlocks: ['arena mode', 'challenge boards', 'replay timelines', 'ranked runs'], monetization: ['tournament entry', 'training sessions', 'merch', 'memberships'] },
  food: { label: 'Food', unlocks: ['review districts', 'tier lists', 'restaurant maps', 'food events'], monetization: ['food merch', 'restaurant collabs', 'sponsored reviews', 'community tours'] },
  business: { label: 'Business', unlocks: ['pitch rooms', 'founder updates', 'offer pages', 'investor mode'], monetization: ['consulting', 'courses', 'templates', 'memberships'] },
  community: { label: 'Community', unlocks: ['world chat', 'events', 'member roles', 'community quests'], monetization: ['subscriptions', 'event tickets', 'premium channels', 'donations'] },
  gaming: { label: 'Gaming', unlocks: ['quest boards', 'streams', 'team pages', 'leaderboards'], monetization: ['subs', 'clips', 'team merch', 'tournaments'] },
  film: { label: 'Film', unlocks: ['cinema room', 'trailers', 'episodes', 'director notes'], monetization: ['screenings', 'behind-the-scenes', 'memberships', 'downloads'] },
  fitness: { label: 'Fitness', unlocks: ['program rooms', 'progress boards', 'challenge events', 'coach mode'], monetization: ['plans', 'coaching', 'memberships', 'events'] },
};

export const defaultCreatorWorldModules: CreatorWorldModuleId[] = ['ai-assistant', 'media-vault', 'world-chat', 'collabs', 'analytics', 'events', 'commerce-ready', 'marketplace-ready'];
export const defaultCreatorWorldCategories: CreatorWorldCategory[] = ['music', 'fashion', 'food'];

export function calculateCreatorWorldPricing(categoryCount: number): CreatorWorldPricing {
  const baseMonthly = 29;
  const includedCategories = 1;
  const extraCategoryMonthly = 12;
  const paidExtraCategories = Math.max(0, categoryCount - includedCategories);
  return {
    baseMonthly,
    includedCategories,
    extraCategoryMonthly,
    estimatedMonthly: baseMonthly + paidExtraCategories * extraCategoryMonthly,
    platformTakeRate: 8,
  };
}

export function createCreatorWorldBlueprint(input?: Partial<CreatorWorldBlueprint>): CreatorWorldBlueprint {
  const categories: CreatorWorldCategory[] = input?.categories?.length ? input.categories : defaultCreatorWorldCategories;
  return {
    id: input?.id ?? `creator-world-${Date.now()}`,
    name: input?.name ?? 'Melodic Universe',
    ownerHandle: input?.ownerHandle ?? '@thatsmelodic',
    tagline: input?.tagline ?? 'One creator. Many frequencies. A world that moves with the art.',
    visibility: input?.visibility ?? 'draft',
    categories,
    vibe: input?.vibe ?? 'cinematic, purple-neon, fall-first, living-world energy',
    aiPersonality: input?.aiPersonality ?? 'assistant director: helpful, creative, approval-first, never autopilot',
    primaryColor: input?.primaryColor ?? '#b76cff',
    secondaryColor: input?.secondaryColor ?? '#36b2cb',
    modules: input?.modules ?? defaultCreatorWorldModules,
    pricing: calculateCreatorWorldPricing(categories.length),
    monetization: input?.monetization ?? ['subscriptions', 'drops', 'digital downloads', 'events', 'collabs', 'licensing'],
    collaborationModes: input?.collaborationModes ?? ['guest world portals', 'shared events', 'collab drops', 'media swaps', 'cross-world chat'],
    rankingSignals: input?.rankingSignals ?? ['activity', 'uploads', 'community replies', 'event attendance', 'collabs', 'sales readiness'],
    mediaSystem: input?.mediaSystem ?? ['videos', 'short clips', 'audio', 'lookbooks', 'event recaps', 'exclusive drops'],
    communitySystem: input?.communitySystem ?? ['channels', 'roles', 'announcements', 'creator posts', 'member quests', 'moderation queue'],
  };
}

export function getCreatorWorldRevenueIdeas(world: CreatorWorldBlueprint) {
  return [
    `${world.name} subscription for exclusive rooms and drops`,
    `Category add-ons at $${world.pricing.extraCategoryMonthly}/mo per extra lane`,
    `Marketplace packs: themes, FX, AI personalities, templates`,
    `Creator collab fee split through approved world-to-world events`,
    `Commerce-ready product rooms once the commerce engine lands`,
  ];
}
