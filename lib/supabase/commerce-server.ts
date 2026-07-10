export type CommerceLicenseTier = {
  id: string;
  beat_id: string;
  tier_key: string;
  name: string;
  price_cents: number;
  currency: string;
  files_included: string[];
  rights_granted: string[];
  usage_limits: Record<string, unknown>;
  agreement_summary: string;
  is_active: boolean;
};

export type CommerceBeat = {
  id: string;
  world_id: string | null;
  slug: string;
  title: string;
  producer_name: string;
  bpm: number | null;
  musical_key: string | null;
  genre: string | null;
  mood: string | null;
  tags: string[];
  cover_url: string | null;
  preview_url: string | null;
  status: string;
  is_exclusive_available: boolean;
  commerce_license_tiers?: CommerceLicenseTier[];
};

export type CommerceCatalogData = {
  beats: CommerceBeat[];
  configured: boolean;
  error: string | null;
};

export function isCommerceConfigured() {
  return Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);
}

async function getClient() {
  const { createClient } = await import('@supabase/supabase-js');
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL as string,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string,
    { auth: { persistSession: false } },
  );
}

export async function getCommerceCatalog(): Promise<CommerceCatalogData> {
  if (!isCommerceConfigured()) return { beats: [], configured: false, error: 'Supabase environment variables are missing.' };

  try {
    const supabase = await getClient();
    const { data, error } = await supabase
      .from('commerce_beats')
      .select('*, commerce_license_tiers(*)')
      .eq('status', 'active')
      .order('created_at', { ascending: false });

    if (error) throw error;

    return {
      beats: (data ?? []).map((beat: CommerceBeat) => ({
        ...beat,
        commerce_license_tiers: (beat.commerce_license_tiers ?? [])
          .filter((tier) => tier.is_active)
          .sort((a, b) => a.price_cents - b.price_cents),
      })),
      configured: true,
      error: null,
    };
  } catch (error) {
    console.error('Harmonic Commerce catalog load failed:', error);
    return { beats: [], configured: true, error: 'The commerce catalog could not be loaded.' };
  }
}

export async function getCommerceBeat(slug: string): Promise<{ beat: CommerceBeat | null; configured: boolean; error: string | null }> {
  if (!isCommerceConfigured()) return { beat: null, configured: false, error: 'Supabase environment variables are missing.' };

  try {
    const supabase = await getClient();
    const { data, error } = await supabase
      .from('commerce_beats')
      .select('*, commerce_license_tiers(*)')
      .eq('slug', slug)
      .eq('status', 'active')
      .maybeSingle();

    if (error) throw error;
    if (!data) return { beat: null, configured: true, error: null };

    return {
      beat: {
        ...data,
        commerce_license_tiers: (data.commerce_license_tiers ?? [])
          .filter((tier: CommerceLicenseTier) => tier.is_active)
          .sort((a: CommerceLicenseTier, b: CommerceLicenseTier) => a.price_cents - b.price_cents),
      },
      configured: true,
      error: null,
    };
  } catch (error) {
    console.error('Harmonic Commerce beat load failed:', error);
    return { beat: null, configured: true, error: 'This beat could not be loaded.' };
  }
}

export function formatCommerceMoney(cents: number, currency = 'usd') {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: currency.toUpperCase() }).format(cents / 100);
}
