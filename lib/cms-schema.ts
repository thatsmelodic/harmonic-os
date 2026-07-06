export type ContentStatus = 'draft' | 'scheduled' | 'published' | 'archived';
export type AssetType = 'image' | 'video' | 'audio' | 'document';
export type ContentWorld = 'melodic' | '2-harmonic' | 'fried-em' | 'schmackinn' | 'system';

export type CMSAsset = {
  id: string;
  type: AssetType;
  world: ContentWorld;
  title: string;
  url: string;
  alt?: string;
  createdAt: string;
};

export type CMSPageCopy = {
  id: string;
  route: string;
  label: string;
  headline: string;
  subheadline: string;
  primaryCta: string;
  secondaryCta?: string;
  status: ContentStatus;
  updatedAt: string;
};

export type SeasonSetting = {
  id: string;
  name: string;
  active: boolean;
  palette: string[];
  heroAssetId?: string;
  motionStyle: string;
  featuredWorld: ContentWorld;
};

export type CreatorControl = {
  id: string;
  title: string;
  description: string;
  route: string;
  status: 'ready' | 'planned' | 'needs-database';
};

export const creatorControls: CreatorControl[] = [
  { id: 'copy-editor', title: 'Copy Editor', description: 'Edit homepage, world pages, button labels, captions, and launch copy.', route: '/studio/copy', status: 'planned' },
  { id: 'asset-library', title: 'Asset Library', description: 'Upload and organize logos, cup graphics, product photos, beats, videos, and thumbnails.', route: '/studio/assets', status: 'needs-database' },
  { id: 'season-manager', title: 'Season Manager', description: 'Switch Spring, Summer, Fall, Winter, campaign themes, and visual moods.', route: '/studio/seasons', status: 'planned' },
  { id: 'world-manager', title: 'World Manager', description: 'Control which worlds are live, hidden, featured, or in development.', route: '/studio/worlds', status: 'planned' },
  { id: 'content-scheduler', title: 'Content Scheduler', description: 'Plan videos, drops, beats, reviews, and social campaigns.', route: '/studio/schedule', status: 'needs-database' },
  { id: 'community-manager', title: 'Community Manager', description: 'Moderate reviews, questions, comments, recommendations, and profiles.', route: '/studio/community', status: 'needs-database' },
];

export const defaultCopy: CMSPageCopy[] = [
  {
    id: 'home-hero',
    route: '/',
    label: 'Homepage Hero',
    headline: 'One Frequency. Many Worlds.',
    subheadline: 'Harmonic OS is the living hub for Melodic: music, fashion, basketball, food, business, community, and creator control inside one cinematic universe.',
    primaryCta: 'Enter the Worlds',
    secondaryCta: 'Open Creator Hub',
    status: 'published',
    updatedAt: '2026-07-05',
  },
];
