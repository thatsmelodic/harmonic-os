export type CreatorWorldDashboardMetric = {
  id: string;
  label: string;
  value: string;
  trend: string;
  note: string;
};

export type CreatorWorldDashboardAlert = {
  id: string;
  title: string;
  type: 'ai' | 'commerce' | 'community' | 'event' | 'builder';
  priority: 'low' | 'medium' | 'high';
  message: string;
  action: string;
};

export type CreatorWorldDashboardModule = {
  id: string;
  title: string;
  status: 'active' | 'draft' | 'locked' | 'ready';
  description: string;
};

export type CreatorWorldDashboard = {
  worldName: string;
  ownerHandle: string;
  healthScore: number;
  revenueReadiness: number;
  communityPulse: number;
  metrics: CreatorWorldDashboardMetric[];
  alerts: CreatorWorldDashboardAlert[];
  modules: CreatorWorldDashboardModule[];
  nextActions: string[];
};

export function createCreatorWorldDashboard(): CreatorWorldDashboard {
  return {
    worldName: 'Melodic Universe',
    ownerHandle: '@thatsmelodic',
    healthScore: 88,
    revenueReadiness: 72,
    communityPulse: 81,
    metrics: [
      { id: 'visits', label: 'World Visits', value: '12.8K', trend: '+18%', note: 'Projected from world activity, content drops, and community return behavior.' },
      { id: 'members', label: 'Active Members', value: '1.4K', trend: '+11%', note: 'Members interacting with rooms, media, comments, and creator updates.' },
      { id: 'revenue', label: 'Revenue Potential', value: '$2.4K+', trend: '+24%', note: 'Estimated from memberships, drops, modules, events, and licensing readiness.' },
      { id: 'approvals', label: 'Approval Queue', value: '7', trend: 'Ready', note: 'AI suggestions, event patches, builder updates, and commerce prompts awaiting approval.' },
    ],
    alerts: [
      { id: 'ai-drop', title: 'AI suggests a drop room', type: 'ai', priority: 'high', message: 'Your fashion and music lanes are both warm. A limited drop room could connect the next release to merchandise.', action: 'Preview suggestion' },
      { id: 'community-spike', title: 'Community activity is rising', type: 'community', priority: 'medium', message: 'Members are reacting to food and music rooms. Open a premium lounge before the next upload.', action: 'Create member room' },
      { id: 'commerce-ready', title: 'Commerce path almost ready', type: 'commerce', priority: 'high', message: 'Memberships, event tickets, and limited drops are prepared conceptually. Checkout and licensing wiring are the next build steps.', action: 'Prepare commerce engine' },
      { id: 'season-event', title: 'Seasonal event available', type: 'event', priority: 'medium', message: 'Fall masterpiece and holiday overlays can be attached to creator events once approved.', action: 'Open event planner' },
    ],
    modules: [
      { id: 'builder', title: 'World Builder', status: 'ready', description: 'Layout, portals, atmosphere, seasonal overrides, and room blocks.' },
      { id: 'ai', title: 'Personal AI', status: 'active', description: 'Approval-first assistant with explain-why logic and creator rules.' },
      { id: 'community', title: 'Community Hub', status: 'draft', description: 'Channels, roles, premium rooms, announcements, and moderation.' },
      { id: 'media', title: 'Interactive Media', status: 'ready', description: 'Uploads become world events with mood and category reactions.' },
      { id: 'commerce', title: 'Native Commerce', status: 'draft', description: 'Drop rooms, memberships, tickets, digital products, and licensing hooks.' },
      { id: 'marketplace', title: 'Module Store', status: 'locked', description: 'Marketplace for themes, FX, AI personalities, and world modules.' },
    ],
    nextActions: [
      'Connect World Builder controls to real creator settings.',
      'Create approval queue for AI, events, commerce, and builder changes.',
      'Wire community rooms and premium access logic.',
      'Prepare native commerce engine with memberships, drops, tickets, and licensing.',
    ],
  };
}
