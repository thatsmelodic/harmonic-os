import type { CreatorWorldCategory, CreatorWorldModuleId } from '@/lib/creator-worlds-engine';

export type CreatorWorldPlatformSystemId = 'dashboard' | 'builder' | 'personal-ai' | 'community' | 'interactive-media' | 'collaboration-portals' | 'rankings' | 'module-store' | 'native-commerce';

export type CreatorWorldPlatformSystem = {
  id: CreatorWorldPlatformSystemId;
  title: string;
  emoji: string;
  purpose: string;
  features: string[];
  creatorValue: string;
  revenuePath: string;
  modulesUnlocked: CreatorWorldModuleId[];
};

export type CreatorWorldRanking = {
  id: string;
  label: string;
  category: CreatorWorldCategory | 'overall';
  scoreFormula: string[];
};

export type CreatorWorldModuleStoreItem = {
  id: string;
  title: string;
  type: 'theme' | 'ai-personality' | 'fx-pack' | 'commerce' | 'community' | 'analytics' | 'media';
  priceModel: 'free' | 'one-time' | 'monthly' | 'revenue-share';
  description: string;
};

export const creatorWorldPlatformSystems: CreatorWorldPlatformSystem[] = [
  {
    id: 'dashboard',
    title: 'World Dashboard',
    emoji: '🌍',
    purpose: 'The creator home base for managing activity, modules, media, revenue readiness, and world health.',
    features: ['world health score', 'recent activity', 'category performance', 'module status', 'approval queue', 'revenue readiness checklist'],
    creatorValue: 'Creators know exactly what their world needs next instead of guessing.',
    revenuePath: 'Premium dashboards and advanced analytics become paid plan upgrades.',
    modulesUnlocked: ['analytics', 'events'],
  },
  {
    id: 'builder',
    title: 'World Builder',
    emoji: '🏗️',
    purpose: 'A customizable builder for layout, portals, atmosphere, themes, seasonal overlays, and world identity.',
    features: ['layout blocks', 'atmosphere controls', 'portal placement', 'theme presets', 'season overlays', 'approval-first AI edits'],
    creatorValue: 'Creators can shape a world without needing to code.',
    revenuePath: 'Theme packs, premium layouts, and world templates become marketplace items.',
    modulesUnlocked: ['marketplace-ready', 'ai-assistant'],
  },
  {
    id: 'personal-ai',
    title: 'Personal AI Assistant',
    emoji: '🤖',
    purpose: 'A unique assistant for each creator world with memory, tone, category awareness, and approval-first editing.',
    features: ['world voice', 'creator rules', 'suggestion previews', 'explain-why notes', 'approval queue', 'content planning'],
    creatorValue: 'Each creator gets an assistant that understands their world instead of generic prompts.',
    revenuePath: 'Advanced AI personalities and category-specific assistants can be premium add-ons.',
    modulesUnlocked: ['ai-assistant'],
  },
  {
    id: 'community',
    title: 'Community Hub',
    emoji: '💬',
    purpose: 'Discord-style text/voice structure for channels, announcements, roles, events, and moderation.',
    features: ['channels', 'roles', 'announcements', 'member quests', 'event rooms', 'moderation queue'],
    creatorValue: 'Worlds become communities, not just pages.',
    revenuePath: 'Paid channels, member roles, private rooms, and community subscriptions.',
    modulesUnlocked: ['world-chat'],
  },
  {
    id: 'interactive-media',
    title: 'Interactive Media System',
    emoji: '🎥',
    purpose: 'Media uploads influence the world through mood, category, engagement, and approved AI suggestions.',
    features: ['video impact score', 'mood tags', 'world reactions', 'viewer interactions', 'clip rooms', 'exclusive media vaults'],
    creatorValue: 'Videos stop being static posts and become world events.',
    revenuePath: 'Premium media vaults, exclusive drops, paywalled videos, and creator subscriptions.',
    modulesUnlocked: ['media-vault', 'events'],
  },
  {
    id: 'collaboration-portals',
    title: 'Collaboration Portals',
    emoji: '🤝',
    purpose: 'Connect creator worlds for crossover events, shared drops, media swaps, and community collaborations.',
    features: ['world invites', 'shared events', 'collab drops', 'guest portals', 'split-ready commerce hooks', 'cross-world chat'],
    creatorValue: 'Creators can grow together while each world keeps its own identity.',
    revenuePath: 'Collab fees, revenue splits, joint events, and marketplace bundles.',
    modulesUnlocked: ['collabs', 'licensing-ready'],
  },
  {
    id: 'rankings',
    title: 'World Rankings',
    emoji: '📈',
    purpose: 'Rank worlds by activity, category, growth, engagement, collaboration, and revenue readiness.',
    features: ['overall leaderboard', 'category rankings', 'fastest growing', 'most active', 'collab score', 'featured worlds'],
    creatorValue: 'Discovery becomes merit-based instead of only follower-count based.',
    revenuePath: 'Featured placements and analytics upgrades can become monetized later without pay-to-win ranking.',
    modulesUnlocked: ['analytics'],
  },
  {
    id: 'module-store',
    title: 'Module Store',
    emoji: '🧩',
    purpose: 'Creators install optional systems instead of every world being forced into the same layout.',
    features: ['module cards', 'install states', 'pricing models', 'creator templates', 'AI packs', 'FX packs'],
    creatorValue: 'Every creator can build only what they need.',
    revenuePath: 'Marketplace sales, subscriptions, rev-share modules, and premium templates.',
    modulesUnlocked: ['marketplace-ready'],
  },
  {
    id: 'native-commerce',
    title: 'Native Commerce',
    emoji: '💰',
    purpose: 'Commerce that feels native to the world instead of generic checkout pages.',
    features: ['world storefronts', 'drop rooms', 'digital products', 'event tickets', 'subscriptions', 'licensing hooks'],
    creatorValue: 'Buying feels like part of the experience, not leaving the world.',
    revenuePath: 'Platform take rate, subscriptions, licensing, creator storefronts, and marketplace transactions.',
    modulesUnlocked: ['commerce-ready', 'licensing-ready'],
  },
];

export const creatorWorldRankings: CreatorWorldRanking[] = [
  { id: 'overall-active', label: 'Most Active Worlds', category: 'overall', scoreFormula: ['uploads', 'community replies', 'event attendance', 'approved updates'] },
  { id: 'fastest-growing', label: 'Fastest Growing Worlds', category: 'overall', scoreFormula: ['new members', 'return visits', 'shares', 'collabs'] },
  { id: 'music-worlds', label: 'Top Music Worlds', category: 'music', scoreFormula: ['song drops', 'listens', 'vault saves', 'playlist activity'] },
  { id: 'food-worlds', label: 'Top Food Worlds', category: 'food', scoreFormula: ['reviews', 'map saves', 'community picks', 'restaurant reactions'] },
  { id: 'fashion-worlds', label: 'Top Fashion Worlds', category: 'fashion', scoreFormula: ['lookbook views', 'drop saves', 'style votes', 'collection activity'] },
  { id: 'basketball-worlds', label: 'Top Basketball Worlds', category: 'basketball', scoreFormula: ['highlights', 'challenge accepts', 'replay views', 'event attendance'] },
];

export const creatorWorldModuleStore: CreatorWorldModuleStoreItem[] = [
  { id: 'fall-masterpiece-pack', title: 'Fall Masterpiece FX Pack', type: 'fx-pack', priceModel: 'one-time', description: 'Leaves, rain, fog, warm light, hoodie-forward atmosphere, and nostalgic particles.' },
  { id: 'schmackinn-food-world-kit', title: 'Food Review World Kit', type: 'theme', priceModel: 'monthly', description: 'Tier lists, restaurant maps, steam layers, verdict cards, and community food picks.' },
  { id: 'melodic-vault-kit', title: 'Melodic Vault Kit', type: 'media', priceModel: 'monthly', description: 'Audio rooms, song vaults, visualizers, release events, and memory nodes.' },
  { id: 'community-pro', title: 'Community Pro Channels', type: 'community', priceModel: 'monthly', description: 'Roles, private channels, announcements, quests, and moderation queue.' },
  { id: 'commerce-showroom', title: 'Native Commerce Showroom', type: 'commerce', priceModel: 'revenue-share', description: 'World-native product rooms, drop pages, tickets, subscriptions, and licensing hooks.' },
  { id: 'creator-ai-voice-pack', title: 'Creator AI Voice Pack', type: 'ai-personality', priceModel: 'monthly', description: 'Custom assistant tone, approval-first edits, explain-why logic, and world memory.' },
];

export function getPlatformSystemCompletion() {
  return Math.round((creatorWorldPlatformSystems.length / 9) * 100);
}
