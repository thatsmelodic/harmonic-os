export type CreatorWorldStatus = 'draft' | 'testing' | 'published' | 'archived';
export type CreatorWorldVisibility = 'public' | 'unlisted' | 'private';
export type CreatorRoomType = 'studio' | 'community' | 'storefront' | 'vault' | 'event' | 'portal' | 'ai' | 'marketplace';
export type CreatorRoomAccess = 'public' | 'members' | 'premium' | 'ticketed' | 'creator' | 'admin';
export type CreatorProductType = 'membership' | 'physical-product' | 'digital-product' | 'ticket' | 'license' | 'module' | 'service';
export type CreatorProductStatus = 'draft' | 'active' | 'sold-out' | 'archived';
export type CreatorOrderStatus = 'pending' | 'paid' | 'refunded' | 'failed' | 'canceled';
export type CreatorApprovalStatus = 'draft' | 'preview' | 'approved' | 'rejected' | 'edited' | 'published';
export type CreatorSuggestionType = 'commerce' | 'world-effect' | 'community' | 'media' | 'event' | 'builder' | 'economy';

export type CreatorWorld = {
  id: string;
  owner_id: string | null;
  slug: string;
  name: string;
  handle: string | null;
  tagline: string | null;
  status: CreatorWorldStatus;
  visibility: CreatorWorldVisibility;
  primary_color: string | null;
  secondary_color: string | null;
  atmosphere: string | null;
  created_at: string | null;
  updated_at: string | null;
};

export type CreatorWorldRoom = {
  id: string;
  world_id: string;
  slug: string;
  name: string;
  room_type: CreatorRoomType;
  access_level: CreatorRoomAccess;
  description: string | null;
  effect_preset: string | null;
  sort_order: number | null;
  is_active: boolean | null;
  created_at: string | null;
  updated_at: string | null;
};

export type CreatorProduct = {
  id: string;
  world_id: string;
  seller_id: string | null;
  title: string;
  description: string | null;
  product_type: CreatorProductType;
  status: CreatorProductStatus;
  price_cents: number;
  currency: string;
  inventory: number | null;
  platform_fee_bps: number;
  metadata: Record<string, unknown> | null;
  created_at: string | null;
  updated_at: string | null;
};

export type CreatorOrder = {
  id: string;
  buyer_id: string | null;
  product_id: string;
  world_id: string;
  referral_id: string | null;
  quantity: number;
  subtotal_cents: number;
  platform_fee_cents: number;
  promoter_cents: number;
  collaborator_cents: number;
  creator_net_cents: number;
  currency: string;
  status: CreatorOrderStatus;
  stripe_checkout_session_id: string | null;
  stripe_payment_intent_id: string | null;
  created_at: string | null;
  updated_at: string | null;
};

export type CreatorAiApproval = {
  id: string;
  world_id: string;
  created_by: string | null;
  suggestion_type: CreatorSuggestionType;
  title: string;
  preview: string;
  explain_why: string | null;
  risk_note: string | null;
  affected_systems: string[] | null;
  status: CreatorApprovalStatus;
  created_at: string | null;
  updated_at: string | null;
};

export type CreatorWorldAnalyticsDaily = {
  id: string;
  world_id: string;
  day: string;
  visits: number | null;
  active_members: number | null;
  orders: number | null;
  gross_revenue_cents: number | null;
  platform_revenue_cents: number | null;
  promoter_payout_cents: number | null;
  creator_net_cents: number | null;
  approval_count: number | null;
  community_pulse: number | null;
  created_at: string | null;
};

export type CreatorWorldDashboardData = {
  world: CreatorWorld | null;
  rooms: CreatorWorldRoom[];
  products: CreatorProduct[];
  orders: CreatorOrder[];
  approvals: CreatorAiApproval[];
  analytics: CreatorWorldAnalyticsDaily[];
};
