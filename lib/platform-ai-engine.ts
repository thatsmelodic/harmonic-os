export type AiSuggestionType = 'commerce' | 'world-effect' | 'community' | 'media' | 'event' | 'builder' | 'economy';
export type AiApprovalStatus = 'draft' | 'preview' | 'approved' | 'rejected' | 'edited';

export type AiSuggestion = {
  id: string;
  type: AiSuggestionType;
  title: string;
  preview: string;
  explainWhy: string;
  riskNote: string;
  status: AiApprovalStatus;
  affectedSystems: string[];
};

export const defaultAiSuggestions: AiSuggestion[] = [
  { id: 'ai-commerce-drop', type: 'commerce', title: 'Turn next upload into a drop event', preview: 'Attach hoodie showroom, countdown, community announcement, and commerce storm effect.', explainWhy: 'Content momentum converts better when the purchase path is part of the world experience.', riskNote: 'Needs inventory, pricing, and checkout confirmation before publishing.', status: 'preview', affectedSystems: ['commerce', 'world-effects', 'community'] },
  { id: 'ai-affiliate-room', type: 'economy', title: 'Open community promoter campaign', preview: 'Generate referral links for members and track sales from posts, rooms, and portals.', explainWhy: 'Your community can become a sales force while Harmonic earns platform fees on attributed sales.', riskNote: 'Needs clear split rules and anti-fraud limits.', status: 'draft', affectedSystems: ['economy', 'community', 'analytics'] },
  { id: 'ai-membership-vault', type: 'community', title: 'Create premium vault membership', preview: 'Unlock private media, voice notes, early drop links, and member-only event access.', explainWhy: 'Recurring revenue stabilizes creator income beyond one-time drops.', riskNote: 'Needs consistent content cadence to keep members subscribed.', status: 'preview', affectedSystems: ['community', 'commerce', 'media'] },
  { id: 'ai-world-fx', type: 'world-effect', title: 'Connect purchases to world reactions', preview: 'Trigger fireworks, city light pulse, referral ripple, and supporter badges after purchases.', explainWhy: 'Visible reactions make commerce feel emotional and shareable.', riskNote: 'Needs low-motion accessibility controls.', status: 'draft', affectedSystems: ['world-engine', 'effects', 'accessibility'] },
];

export function getAiGuardrails() {
  return [
    'AI cannot publish commerce, world, community, or economy changes without creator approval.',
    'Every suggestion must include a preview, explain-why note, risk note, and affected systems.',
    'Creators can approve, reject, or edit suggestions before anything goes live.',
    'AI should prioritize revenue without damaging trust, accessibility, or creator brand voice.',
    'Memory should learn from approved and rejected suggestions over time.',
  ];
}

export function getPendingAiSuggestions() {
  return defaultAiSuggestions.filter((suggestion) => suggestion.status === 'draft' || suggestion.status === 'preview');
}
