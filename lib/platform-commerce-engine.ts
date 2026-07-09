export type CommerceItemType = 'membership' | 'physical-product' | 'digital-product' | 'ticket' | 'license' | 'module' | 'service';
export type CommerceItemStatus = 'draft' | 'active' | 'sold-out' | 'archived';

export type CommerceItem = {
  id: string;
  worldId: string;
  sellerId: string;
  title: string;
  type: CommerceItemType;
  status: CommerceItemStatus;
  priceCents: number;
  currency: 'usd';
  inventory?: number;
  platformFeeBps: number;
  unlocks: string[];
};

export type CommerceQuote = {
  subtotalCents: number;
  platformFeeCents: number;
  sellerGrossCents: number;
  totalCents: number;
  harmonicRevenueCents: number;
};

export const defaultCommerceItems: CommerceItem[] = [
  { id: 'melodic-membership', worldId: 'melodic', sellerId: 'thatsmelodic', title: 'Frequency Pass Membership', type: 'membership', status: 'active', priceCents: 999, currency: 'usd', platformFeeBps: 1000, unlocks: ['members-lounge', 'premium-vault', 'early-drops'] },
  { id: 'fall-hoodie-drop', worldId: '2harmonic', sellerId: 'thatsmelodic', title: 'Fall Masterpiece Hoodie Drop', type: 'physical-product', status: 'draft', priceCents: 8500, currency: 'usd', inventory: 60, platformFeeBps: 800, unlocks: ['drop-showroom', 'drop-chat', 'supporter-badge'] },
  { id: 'beat-license-basic', worldId: 'melodic', sellerId: 'thatsmelodic', title: 'Basic Beat License', type: 'license', status: 'draft', priceCents: 3500, currency: 'usd', platformFeeBps: 1200, unlocks: ['download-access', 'license-certificate'] },
  { id: 'fried-em-ticket', worldId: 'fried-em', sellerId: 'thatsmelodic', title: 'Fried Em Live Run Ticket', type: 'ticket', status: 'draft', priceCents: 1500, currency: 'usd', platformFeeBps: 1000, unlocks: ['event-room', 'live-chat', 'replay-access'] },
];

export function calculateCommerceQuote(item: CommerceItem, quantity = 1): CommerceQuote {
  const safeQuantity = Math.max(1, Math.floor(quantity));
  const subtotalCents = item.priceCents * safeQuantity;
  const platformFeeCents = Math.round((subtotalCents * item.platformFeeBps) / 10000);
  return {
    subtotalCents,
    platformFeeCents,
    sellerGrossCents: subtotalCents - platformFeeCents,
    totalCents: subtotalCents,
    harmonicRevenueCents: platformFeeCents,
  };
}

export function formatMoney(cents: number) {
  return `$${(cents / 100).toFixed(2)}`;
}

export function getCommerceReadinessChecklist() {
  return [
    'Create products, memberships, tickets, digital products, modules, licenses, and services.',
    'Attach every item to a creator world and seller profile.',
    'Calculate Harmonic platform fee on every platform-enabled sale.',
    'Connect checkout provider next: Stripe Checkout, Stripe Connect, customer portal, receipts, refunds.',
    'Trigger world effects when purchases, memberships, and drop milestones happen.',
  ];
}
