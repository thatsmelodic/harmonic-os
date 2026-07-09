import type { CreatorWorldCategory } from '@/lib/creator-worlds-engine';

export type CreatorWorldCoreMetric = {
  id: string;
  label: string;
  value: string;
  note: string;
};

export type CreatorWorldBuilderBlock = {
  id: string;
  label: string;
  zone: 'hero' | 'portal' | 'media' | 'community' | 'commerce' | 'event';
  description: string;
  revenueImpact: string;
};

export type CreatorWorldAssistantRule = {
  id: string;
  rule: string;
  reason: string;
};

export type CreatorWorldChannel = {
  id: string;
  name: string;
  purpose: string;
  access: 'public' | 'members' | 'premium' | 'moderator';
};

export type CreatorWorldMediaPipelineStep = {
  id: string;
  label: string;
  description: string;
  worldEffect: string;
};

export type CreatorWorldCommercePath = {
  id: string;
  label: string;
  buyerExperience: string;
  creatorRevenue: string;
  platformRevenue: string;
};

export type CreatorWorldCoreSystem = {
  metrics: CreatorWorldCoreMetric[];
  builderBlocks: CreatorWorldBuilderBlock[];
  assistantRules: CreatorWorldAssistantRule[];
  communityChannels: CreatorWorldChannel[];
  mediaPipeline: CreatorWorldMediaPipelineStep[];
  commercePaths: CreatorWorldCommercePath[];
};

export function createCreatorWorldCoreSystem(categories: CreatorWorldCategory[]): CreatorWorldCoreSystem {
  return {
    metrics: [
      { id: 'world-health', label: 'World Health', value: '86%', note: 'Measures setup completeness, activity, modules, content flow, and revenue readiness.' },
      { id: 'monthly-potential', label: 'Monthly Potential', value: '$2.4K+', note: 'Early estimate from memberships, drops, events, and category add-ons.' },
      { id: 'active-lanes', label: 'Active Lanes', value: String(categories.length), note: 'Each category lane unlocks its own world rooms, modules, and monetization paths.' },
      { id: 'automation-safety', label: 'Approval Safety', value: '100%', note: 'AI can suggest and preview, but creator approval is required before publishing changes.' },
    ],
    builderBlocks: [
      { id: 'living-hero', label: 'Living Hero', zone: 'hero', description: 'The first immersive scene visitors enter, tied to season, events, and creator mood.', revenueImpact: 'High conversion entry point for subscriptions and drops.' },
      { id: 'category-portals', label: 'Category Portals', zone: 'portal', description: 'Doors into music, fashion, food, basketball, business, or community rooms.', revenueImpact: 'Supports paid category expansion and creator upsells.' },
      { id: 'media-vault', label: 'Media Vault', zone: 'media', description: 'Videos, songs, lookbooks, private drops, and exclusive creator files.', revenueImpact: 'Powers memberships, paywalled content, and release events.' },
      { id: 'community-plaza', label: 'Community Plaza', zone: 'community', description: 'Chat, announcements, roles, member quests, and creator updates.', revenueImpact: 'Turns visitors into returning members.' },
      { id: 'native-storefront', label: 'Native Storefront', zone: 'commerce', description: 'World-themed product rooms instead of generic product grids.', revenueImpact: 'Foundation for drops, tickets, subscriptions, and digital sales.' },
      { id: 'event-stage', label: 'Event Stage', zone: 'event', description: 'Seasonal events, collabs, live drops, challenges, and creator milestones.', revenueImpact: 'Monetizes time-sensitive moments and community participation.' },
    ],
    assistantRules: [
      { id: 'approval-first', rule: 'Never publish without creator approval.', reason: 'Creator remains the director and protects trust.' },
      { id: 'world-aware', rule: 'Suggestions must match the creator world categories and tone.', reason: 'A food world, music world, and fashion world should not feel generic.' },
      { id: 'explain-why', rule: 'Every major suggestion needs a plain-language reason.', reason: 'Creators need to understand why the assistant suggested it before applying.' },
      { id: 'revenue-aware', rule: 'Suggest revenue paths without forcing sales behavior.', reason: 'Commerce should feel native to the world, not spammy.' },
    ],
    communityChannels: [
      { id: 'announcements', name: 'announcements', purpose: 'Creator updates, releases, drops, and world changes.', access: 'public' },
      { id: 'members-lounge', name: 'members-lounge', purpose: 'Core audience conversation and behind-the-scenes access.', access: 'members' },
      { id: 'premium-vault', name: 'premium-vault', purpose: 'Paid content, exclusive drops, unreleased media, and private links.', access: 'premium' },
      { id: 'collab-room', name: 'collab-room', purpose: 'World-to-world crossover planning and creator partnerships.', access: 'members' },
      { id: 'mod-queue', name: 'mod-queue', purpose: 'Review reports, comments, and community safety before escalation.', access: 'moderator' },
    ],
    mediaPipeline: [
      { id: 'upload', label: 'Upload', description: 'Creator uploads a video, song, lookbook, review, or event recap.', worldEffect: 'Creates a draft world event and updates media vault.' },
      { id: 'analyze', label: 'Analyze', description: 'System reads category, tone, emotion, and audience intent.', worldEffect: 'Suggests season, lighting, portal, and community placements.' },
      { id: 'preview', label: 'Preview', description: 'Creator sees the proposed world changes before they go live.', worldEffect: 'Protects approval-first control.' },
      { id: 'publish', label: 'Publish', description: 'Approved media becomes part of the world timeline.', worldEffect: 'Updates rankings, activity, and community feed.' },
    ],
    commercePaths: [
      { id: 'membership', label: 'World Membership', buyerExperience: 'Join the world for exclusive rooms and premium media.', creatorRevenue: 'Monthly recurring subscriptions.', platformRevenue: 'Platform fee and premium plan upgrade.' },
      { id: 'drops', label: 'Limited Drops', buyerExperience: 'Enter a themed drop room instead of a normal product page.', creatorRevenue: 'Clothing, digital products, tickets, or bundles.', platformRevenue: 'Transaction take rate.' },
      { id: 'events', label: 'Paid Events', buyerExperience: 'Buy access to tournaments, listening rooms, pop-ups, or creator streams.', creatorRevenue: 'Ticket sales and community upsells.', platformRevenue: 'Event processing and promotion tools.' },
      { id: 'licensing', label: 'Licensing', buyerExperience: 'Purchase usage rights for beats, templates, themes, or world modules.', creatorRevenue: 'License fees and recurring usage rights.', platformRevenue: 'Marketplace commission.' },
    ],
  };
}
