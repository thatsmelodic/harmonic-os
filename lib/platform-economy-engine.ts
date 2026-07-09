export type AttributionSource = 'direct' | 'community-post' | 'voice-room' | 'collab-portal' | 'affiliate-link' | 'marketplace-feature';

export type RevenueSplitInput = {
  subtotalCents: number;
  platformFeeBps: number;
  promoterShareBps?: number;
  collaboratorShareBps?: number;
};

export type RevenueSplit = {
  subtotalCents: number;
  harmonicPlatformCents: number;
  promoterCents: number;
  collaboratorCents: number;
  creatorNetCents: number;
};

export type AttributionRecord = {
  id: string;
  source: AttributionSource;
  sellerWorldId: string;
  promoterWorldId?: string;
  promoterUserId?: string;
  buyerUserId?: string;
  itemId: string;
  note: string;
};

export const exampleAttributions: AttributionRecord[] = [
  { id: 'attrib-community-hoodie', source: 'community-post', sellerWorldId: '2harmonic', promoterWorldId: 'melodic', promoterUserId: 'fan-promoter-001', itemId: 'fall-hoodie-drop', note: 'Fan promoted hoodie in members lounge. Sale should credit fan promoter and Harmonic platform.' },
  { id: 'attrib-collab-ticket', source: 'collab-portal', sellerWorldId: 'fried-em', promoterWorldId: 'schmackinn', itemId: 'fried-em-ticket', note: 'Food world sent traffic through a collab portal to a basketball ticket.' },
  { id: 'attrib-marketplace-license', source: 'marketplace-feature', sellerWorldId: 'melodic', itemId: 'beat-license-basic', note: 'Marketplace placement created the sale. Harmonic earns marketplace/platform fee.' },
];

export function calculateRevenueSplit(input: RevenueSplitInput): RevenueSplit {
  const subtotalCents = Math.max(0, Math.round(input.subtotalCents));
  const harmonicPlatformCents = Math.round((subtotalCents * input.platformFeeBps) / 10000);
  const promoterCents = Math.round((subtotalCents * (input.promoterShareBps ?? 0)) / 10000);
  const collaboratorCents = Math.round((subtotalCents * (input.collaboratorShareBps ?? 0)) / 10000);
  const creatorNetCents = subtotalCents - harmonicPlatformCents - promoterCents - collaboratorCents;
  return { subtotalCents, harmonicPlatformCents, promoterCents, collaboratorCents, creatorNetCents };
}

export function getEconomyRules() {
  return [
    'Harmonic earns a platform share on every marketplace, commerce, ticket, membership, module, and licensing transaction processed through the platform.',
    'Creators earn the seller share after platform, promoter, collaborator, refund, and processing rules are applied.',
    'Promoters earn only when tracked referrals convert into approved sales.',
    'Cross-world sales can pay the seller, promoter world, collaborator, and Harmonic in one split rule.',
    'Every split must be visible to creators before activation to protect trust.',
  ];
}
