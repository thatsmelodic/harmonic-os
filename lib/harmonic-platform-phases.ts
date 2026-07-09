export type HarmonicPhaseId = 'creator-platform' | 'intelligence' | 'creator-economy';
export type HarmonicFeatureStatus = 'foundation' | 'wired' | 'commerce-ready' | 'future-backend';

export type HarmonicPlatformFeature = {
  id: string;
  title: string;
  emoji: string;
  status: HarmonicFeatureStatus;
  purpose: string;
  capabilities: string[];
  creatorWorldImpact: string;
  revenueImpact: string;
};

export type HarmonicPlatformPhase = {
  id: HarmonicPhaseId;
  title: string;
  subtitle: string;
  priority: number;
  features: HarmonicPlatformFeature[];
};

export const harmonicPlatformPhases: HarmonicPlatformPhase[] = [
  {
    id: 'creator-platform',
    title: 'Phase 1 — Creator Platform',
    subtitle: 'The main product surface: creators build worlds instead of profiles.',
    priority: 1,
    features: [
      { id: 'creator-worlds-v3', title: 'Creator Worlds V3', emoji: '🌍', status: 'wired', purpose: 'Give creators ownable living worlds with identity, categories, modules, activity, and monetization paths.', capabilities: ['world ownership', 'category lanes', 'world identity', 'visibility modes', 'module unlocks', 'activity score'], creatorWorldImpact: 'This is the platform centerpiece. Every other feature plugs into the creator world.', revenueImpact: 'World subscriptions, category add-ons, platform plans, and future transaction fees.' },
      { id: 'world-dashboard', title: 'World Dashboard', emoji: '📊', status: 'wired', purpose: 'Creator command center for world health, revenue readiness, approvals, activity, and next steps.', capabilities: ['health score', 'revenue readiness', 'approval queue', 'module status', 'activity feed', 'growth prompts'], creatorWorldImpact: 'Creators always know what to improve next.', revenueImpact: 'Premium analytics and dashboard upgrades.' },
      { id: 'world-builder', title: 'World Builder', emoji: '🏗️', status: 'foundation', purpose: 'Builder surface for layout, atmosphere, portals, seasonal overlays, and world rooms.', capabilities: ['hero layout', 'portal placement', 'room blocks', 'theme presets', 'season overlays', 'commerce zones'], creatorWorldImpact: 'Creators customize their universe without needing to code.', revenueImpact: 'Template packs, premium layouts, FX packs, and module marketplace sales.' },
      { id: 'personal-ai', title: 'Personal AI Assistant', emoji: '🤖', status: 'wired', purpose: 'World-specific assistant that follows creator rules, explains suggestions, and requires approval.', capabilities: ['creator tone', 'category awareness', 'approval-first edits', 'explain-why reasoning', 'content suggestions', 'revenue-aware prompts'], creatorWorldImpact: 'Every world gets a unique assistant instead of generic AI.', revenueImpact: 'Premium AI personalities, advanced assistant tiers, and category-specific assistants.' },
      { id: 'community-hub', title: 'Community Hub', emoji: '💬', status: 'foundation', purpose: 'Discord-style community layer with channels, roles, announcements, premium rooms, and moderation.', capabilities: ['public channels', 'member rooms', 'premium vault', 'announcements', 'roles', 'moderation queue'], creatorWorldImpact: 'Turns worlds into communities people return to.', revenueImpact: 'Paid channels, subscriptions, member tiers, and community upgrades.' },
      { id: 'interactive-media', title: 'Interactive Media System', emoji: '🎥', status: 'foundation', purpose: 'Media uploads influence the world through mood, category, event triggers, and audience reactions.', capabilities: ['upload pipeline', 'mood tags', 'world reactions', 'media vault', 'viewer triggers', 'exclusive content'], creatorWorldImpact: 'Posts become world events, not static uploads.', revenueImpact: 'Paywalled media, vault subscriptions, release events, and premium content.' },
      { id: 'collab-portals', title: 'Collaboration Portals', emoji: '🤝', status: 'foundation', purpose: 'Connect worlds for crossover events, collab drops, shared rooms, and split-ready commerce.', capabilities: ['guest portals', 'shared events', 'collab drops', 'cross-world chat', 'media swaps', 'split hooks'], creatorWorldImpact: 'Creators grow together while keeping their own identity.', revenueImpact: 'Collab fees, revenue splits, joint drops, and marketplace bundles.' },
      { id: 'native-commerce', title: 'Native Commerce', emoji: '💰', status: 'commerce-ready', purpose: 'Commerce should feel like entering a room in the world, not leaving to a generic checkout.', capabilities: ['drop rooms', 'digital products', 'memberships', 'tickets', 'licensing hooks', 'world storefronts'], creatorWorldImpact: 'Sales become part of the world experience.', revenueImpact: 'Transaction fees, subscriptions, storefront upgrades, and marketplace commissions.' },
      { id: 'module-store', title: 'Module Store', emoji: '🧩', status: 'commerce-ready', purpose: 'Creators install optional modules so every world does not feel the same.', capabilities: ['module catalog', 'install states', 'pricing models', 'FX packs', 'AI packs', 'commerce modules'], creatorWorldImpact: 'Creators build what they need and upgrade over time.', revenueImpact: 'Marketplace sales, monthly modules, premium templates, and rev-share modules.' },
    ],
  },
  {
    id: 'intelligence',
    title: 'Phase 2 — Intelligence',
    subtitle: 'The brain layer that makes Harmonic OS feel alive and trustworthy.',
    priority: 2,
    features: [
      { id: 'creator-memory', title: 'Creator Memory Engine', emoji: '🧠', status: 'wired', purpose: 'Remember creator preferences, brand rules, style patterns, rejected changes, and approval habits.', capabilities: ['preference memory', 'style rules', 'approval history', 'rejection learning', 'brand context', 'world context'], creatorWorldImpact: 'AI gets more useful without taking control away.', revenueImpact: 'Premium memory tiers, advanced assistant plans, and creator workflow upgrades.' },
      { id: 'event-engine', title: 'Harmonic Event Engine', emoji: '⚡', status: 'wired', purpose: 'Turn uploads, drops, seasons, holidays, collabs, and milestones into world events.', capabilities: ['event triggers', 'seasonal events', 'holiday overlays', 'creator events', 'approval patches', 'world reactions'], creatorWorldImpact: 'Worlds evolve instead of staying static.', revenueImpact: 'Paid event rooms, ticketing, event boosts, and sponsored creator events.' },
      { id: 'intelligence-completion', title: 'Intelligence Completion Engine', emoji: '💡', status: 'wired', purpose: 'Explain what the system is suggesting, why it matters, and what changes before approval.', capabilities: ['explain-why', 'suggestion cards', 'risk notes', 'before/after reasoning', 'approval safety', 'creator editing'], creatorWorldImpact: 'Creators trust the system because they understand it.', revenueImpact: 'Premium AI workflow, advanced creative direction, and platform retention.' },
      { id: 'universal-runtime', title: 'Universal Runtime', emoji: '🌀', status: 'foundation', purpose: 'One runtime for all worlds so future worlds scale without rebuilding the engine every time.', capabilities: ['world state', 'runtime patches', 'live sync', 'season patching', 'event patching', 'cross-world state'], creatorWorldImpact: 'Every world can react to the same operating system signals.', revenueImpact: 'Scalable platform infrastructure for many creators and paid modules.' },
      { id: 'world-interaction', title: 'World Interaction Engine', emoji: '🌐', status: 'wired', purpose: 'Let worlds influence each other through approved ripples, portals, and collab triggers.', capabilities: ['world ripples', 'target world patches', 'collab prompts', 'cross-world event logic', 'portal triggers', 'shared campaigns'], creatorWorldImpact: 'Worlds become an ecosystem instead of isolated pages.', revenueImpact: 'Collab monetization, cross-world bundles, marketplace discovery, and event commerce.' },
    ],
  },
  {
    id: 'creator-economy',
    title: 'Phase 3 — Creator Economy',
    subtitle: 'The money layer: passport, marketplace, licensing, analytics, rankings, and revenue sharing.',
    priority: 3,
    features: [
      { id: 'creator-passport', title: 'Creator Passport', emoji: '🎫', status: 'foundation', purpose: 'Identity layer for users moving through worlds, collecting access, achievements, memberships, and purchases.', capabilities: ['visitor identity', 'member access', 'achievement history', 'owned items', 'world memberships', 'cross-world travel'], creatorWorldImpact: 'Visitors become citizens of the ecosystem.', revenueImpact: 'Memberships, retention, loyalty, paid access, and unlock systems.' },
      { id: 'frequency-marketplace', title: 'Frequency Marketplace', emoji: '🛍️', status: 'commerce-ready', purpose: 'Marketplace for themes, FX, AI personalities, templates, modules, music packs, and creator assets.', capabilities: ['module listings', 'template listings', 'AI packs', 'FX packs', 'creator assets', 'install flow'], creatorWorldImpact: 'Creators can buy tools and sell their own world assets.', revenueImpact: 'Marketplace commissions, subscriptions, paid listings, and rev-share modules.' },
      { id: 'licensing', title: 'Licensing Engine', emoji: '📜', status: 'foundation', purpose: 'Usage-rights layer for beats, templates, themes, modules, clips, and creator IP.', capabilities: ['license tiers', 'usage terms', 'confirmation codes', 'creator ownership notes', 'download access', 'renewal logic'], creatorWorldImpact: 'Creators can sell rights without confusion.', revenueImpact: 'License fees, renewals, marketplace commissions, and creator business tools.' },
      { id: 'revenue-sharing', title: 'Revenue Sharing', emoji: '🤲', status: 'foundation', purpose: 'Track splits for collabs, modules, marketplaces, events, and platform fees.', capabilities: ['split rules', 'collab shares', 'platform take rate', 'module commissions', 'event splits', 'audit trail'], creatorWorldImpact: 'Collabs become easier and less messy.', revenueImpact: 'Enables scalable commerce and partnership transactions.' },
      { id: 'analytics-rankings', title: 'Analytics + Rankings', emoji: '📈', status: 'wired', purpose: 'Rank worlds by activity, growth, engagement, category strength, revenue readiness, and community health.', capabilities: ['overall ranking', 'category ranking', 'fastest growing', 'most active', 'commerce readiness', 'community score'], creatorWorldImpact: 'Discovery becomes based on world momentum.', revenueImpact: 'Premium analytics, featured discovery, and growth tools.' },
    ],
  },
];

export function getAllPlatformFeatures() {
  return harmonicPlatformPhases.flatMap((phase) => phase.features.map((feature) => ({ ...feature, phaseId: phase.id, phaseTitle: phase.title })));
}

export function getCreatorWorldsFeatureCount() {
  return getAllPlatformFeatures().length;
}
