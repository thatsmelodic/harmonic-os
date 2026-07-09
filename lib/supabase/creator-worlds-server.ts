import type { CreatorWorldDashboardData } from './creator-worlds-types';

const emptyDashboard: CreatorWorldDashboardData = {
  world: null,
  rooms: [],
  products: [],
  orders: [],
  approvals: [],
  analytics: [],
};

export function isSupabaseConfigured() {
  return Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);
}

export async function getCreatorWorldDashboardData(slug = 'melodic-universe'): Promise<CreatorWorldDashboardData> {
  if (!isSupabaseConfigured()) {
    return emptyDashboard;
  }

  try {
    const { createClient } = await import('@supabase/supabase-js');
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL as string,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string,
      { auth: { persistSession: false } },
    );

    const { data: world } = await supabase
      .from('creator_worlds')
      .select('*')
      .eq('slug', slug)
      .maybeSingle();

    if (!world) return emptyDashboard;

    const [rooms, products, approvals, analytics] = await Promise.all([
      supabase.from('creator_world_rooms').select('*').eq('world_id', world.id).order('sort_order', { ascending: true }),
      supabase.from('creator_products').select('*').eq('world_id', world.id).order('created_at', { ascending: false }),
      supabase.from('creator_ai_approvals').select('*').eq('world_id', world.id).order('created_at', { ascending: false }),
      supabase.from('creator_world_analytics_daily').select('*').eq('world_id', world.id).order('day', { ascending: false }).limit(14),
    ]);

    return {
      world,
      rooms: rooms.data ?? [],
      products: products.data ?? [],
      orders: [],
      approvals: approvals.data ?? [],
      analytics: analytics.data ?? [],
    } as CreatorWorldDashboardData;
  } catch (error) {
    console.error('Creator Worlds Supabase dashboard load failed:', error);
    return emptyDashboard;
  }
}

export function getCreatorWorldsIntegrationChecklist() {
  return [
    'Run the Creator Worlds migration in Supabase.',
    'Add NEXT_PUBLIC_SUPABASE_URL to Vercel environment variables.',
    'Add NEXT_PUBLIC_SUPABASE_ANON_KEY to Vercel environment variables.',
    'Seed at least one creator_worlds row with slug melodic-universe.',
    'Seed rooms, products, approvals, and analytics to test the dashboard.',
    'Redeploy Vercel after environment variables are saved.',
  ];
}
