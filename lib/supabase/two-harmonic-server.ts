export type TwoHarmonicInventory = {
  size: string;
  quantity: number;
  reserved: number;
};

export type TwoHarmonicGarment = {
  slug: string;
  name: string;
  price_cents: number;
  image_url: string | null;
  release_date: string | null;
  private_access_required: boolean;
  reservations_enabled: boolean;
  two_harmonic_inventory: TwoHarmonicInventory[];
};

export type TwoHarmonicCollection = {
  slug: string;
  name: string;
  status: 'private-preview' | 'coming-soon' | 'live' | 'archived';
  release_date: string | null;
  private_access_label: string;
  private_access_description: string;
  campaign_video_url: string | null;
  audio_url: string | null;
  settings: Record<string, unknown>;
  two_harmonic_garments: TwoHarmonicGarment[];
};

export type TwoHarmonicCatalogData = {
  collections: TwoHarmonicCollection[];
  configured: boolean;
  error: string | null;
};

export function isTwoHarmonicConfigured() {
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

export async function getTwoHarmonicCatalog(): Promise<TwoHarmonicCatalogData> {
  if (!isTwoHarmonicConfigured()) {
    return {
      collections: [],
      configured: false,
      error: 'Supabase environment variables are missing.',
    };
  }

  try {
    const supabase = await getClient();
    const { data, error } = await supabase
      .from('two_harmonic_collections')
      .select(`
        slug,
        name,
        status,
        release_date,
        private_access_label,
        private_access_description,
        campaign_video_url,
        audio_url,
        settings,
        two_harmonic_garments (
          slug,
          name,
          price_cents,
          image_url,
          release_date,
          private_access_required,
          reservations_enabled,
          two_harmonic_inventory (
            size,
            quantity,
            reserved
          )
        )
      `)
      .neq('status', 'archived')
      .order('created_at', { ascending: true });

    if (error) throw error;

    return {
      collections: (data ?? []) as TwoHarmonicCollection[],
      configured: true,
      error: null,
    };
  } catch (error) {
    console.error('2 Harmonic catalog load failed:', error);

    return {
      collections: [],
      configured: true,
      error: 'The 2 Harmonic catalog could not be loaded.',
    };
  }
}

export function formatTwoHarmonicMoney(cents: number) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(cents / 100);
}
