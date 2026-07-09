export type WorldRoomType = 'studio' | 'storefront' | 'community' | 'event' | 'vault' | 'portal' | 'marketplace';
export type WorldEffectTrigger = 'purchase' | 'membership' | 'ticket-sale' | 'drop-launch' | 'community-spike' | 'collab-sale' | 'media-premiere';

export type WorldRoom = {
  id: string;
  worldId: string;
  title: string;
  type: WorldRoomType;
  access: 'public' | 'members' | 'premium' | 'creator' | 'ticketed';
  description: string;
  revenuePurpose: string;
};

export type WorldEffect = {
  id: string;
  trigger: WorldEffectTrigger;
  title: string;
  visual: string;
  audio?: string;
  commerceImpact: string;
};

export const defaultWorldRooms: WorldRoom[] = [
  { id: 'melodic-studio', worldId: 'melodic', title: 'Studio Listening Room', type: 'studio', access: 'public', description: 'Songs, listening parties, lyrics, visualizers, voice notes, and feedback.', revenuePurpose: 'Beat licenses, memberships, digital drops, listening events.' },
  { id: 'harmonic-showroom', worldId: '2harmonic', title: 'Drop Showroom', type: 'storefront', access: 'public', description: 'Clothing drops, lookbooks, colorway voting, early access, and checkout paths.', revenuePurpose: 'Product sales, preorder access, premium drop rooms.' },
  { id: 'community-plaza', worldId: 'creator-worlds', title: 'Community Plaza', type: 'community', access: 'public', description: 'Inclusive hub for chat, announcements, roles, support corners, quests, and badges.', revenuePurpose: 'Member tiers, premium rooms, paid events.' },
  { id: 'premium-vault', worldId: 'creator-worlds', title: 'Premium Vault', type: 'vault', access: 'premium', description: 'Unreleased media, private files, creator notes, exclusive links, and member perks.', revenuePurpose: 'Subscriptions, unlocks, exclusive drops.' },
  { id: 'collab-portal', worldId: 'creator-worlds', title: 'Collab Portal', type: 'portal', access: 'members', description: 'Cross-world traffic, shared events, guest creators, and referral attribution.', revenuePurpose: 'Collab revenue splits and referral sales.' },
];

export const defaultWorldEffects: WorldEffect[] = [
  { id: 'commerce-storm', trigger: 'purchase', title: 'Commerce Storm', visual: 'Storefront lights pulse, fireworks trigger, checkout room glows, crowd density rises.', audio: 'Soft crowd swell and register chime.', commerceImpact: 'Makes product sales feel like world events.' },
  { id: 'referral-ripple', trigger: 'collab-sale', title: 'Referral Ripple', visual: 'A ripple travels from promoter room to seller world showing conversion source.', audio: 'Portal shimmer.', commerceImpact: 'Makes community promotion visible and rewarding.' },
  { id: 'membership-aura', trigger: 'membership', title: 'Membership Aura', visual: 'Members lounge unlocks with ring light and supporter badge animation.', audio: 'Warm unlock tone.', commerceImpact: 'Makes paid membership feel valuable immediately.' },
  { id: 'drop-launch', trigger: 'drop-launch', title: 'Drop Launch Sequence', visual: 'Countdown ends, portal opens, city lighting shifts to drop palette.', audio: 'Cinematic riser.', commerceImpact: 'Turns launch day into an event, not a product grid.' },
  { id: 'media-premiere', trigger: 'media-premiere', title: 'Media Premiere Pulse', visual: 'World lighting reacts to timestamp reactions and voice note spikes.', audio: 'Room ambience follows crowd energy.', commerceImpact: 'Connects engagement to tickets, merch, memberships, and vault unlocks.' },
];

export function getRoomsForWorld(worldId: string) {
  return defaultWorldRooms.filter((room) => room.worldId === worldId || room.worldId === 'creator-worlds');
}

export function getEffectsForTrigger(trigger: WorldEffectTrigger) {
  return defaultWorldEffects.filter((effect) => effect.trigger === trigger);
}
