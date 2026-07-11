import { NextResponse } from 'next/server';
import { requireStudioSecret, supabaseRest } from '@/lib/server/supabase-rest';

const COLLECTION_SLUG = 'beige-frequency';

type CollectionRow = {
  slug: string;
  name: string;
  status: 'private-preview' | 'coming-soon' | 'live' | 'archived';
  release_date: string | null;
  private_access_label: string;
  private_access_description: string;
  campaign_video_url: string | null;
  audio_url: string | null;
};

type GarmentRow = {
  slug: string;
  name: string;
  price_cents: number;
  image_url: string | null;
  campaign_video_url: string | null;
  audio_url: string | null;
  release_date: string | null;
  private_access_required: boolean;
  reservations_enabled: boolean;
};

type InventoryRow = { garment_slug: string; size: string; quantity: number; reserved: number };

export async function GET() {
  try {
    const [collections, garments, inventory] = await Promise.all([
      supabaseRest<CollectionRow[]>({ path: 'two_harmonic_collections', query: `slug=eq.${COLLECTION_SLUG}&select=*` }),
      supabaseRest<GarmentRow[]>({ path: 'two_harmonic_garments', query: `collection_slug=eq.${COLLECTION_SLUG}&select=*` }),
      supabaseRest<InventoryRow[]>({ path: 'two_harmonic_inventory', query: 'select=*' }),
    ]);
    const collection = collections[0];
    if (!collection) return NextResponse.json({ error: 'Collection not found' }, { status: 404 });

    const garmentSettings = Object.fromEntries(garments.map((garment) => [garment.slug, {
      price: garment.price_cents / 100,
      imageUrl: garment.image_url ?? '',
      campaignVideoUrl: garment.campaign_video_url ?? '',
      audioUrl: garment.audio_url ?? '',
      releaseDate: garment.release_date ?? '',
      privateAccessRequired: garment.private_access_required,
      reservationsEnabled: garment.reservations_enabled,
      inventory: Object.fromEntries(inventory.filter((item) => item.garment_slug === garment.slug).map((item) => [item.size, Math.max(0, item.quantity - item.reserved)])),
    }]));

    return NextResponse.json({
      collectionName: collection.name,
      dropStatus: collection.status,
      releaseDate: collection.release_date ?? '',
      privateAccessLabel: collection.private_access_label,
      privateAccessDescription: collection.private_access_description,
      campaignVideoUrl: collection.campaign_video_url ?? '',
      audioUrl: collection.audio_url ?? '',
      garments: garmentSettings,
      source: 'supabase',
    });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : 'Unable to load settings' }, { status: 503 });
  }
}

export async function PUT(request: Request) {
  try {
    requireStudioSecret(request);
    const settings = await request.json();

    await supabaseRest({
      path: 'two_harmonic_collections',
      method: 'POST',
      query: 'on_conflict=slug',
      prefer: 'resolution=merge-duplicates,return=minimal',
      body: {
        slug: COLLECTION_SLUG,
        name: settings.collectionName,
        status: settings.dropStatus,
        release_date: settings.releaseDate || null,
        private_access_label: settings.privateAccessLabel,
        private_access_description: settings.privateAccessDescription,
        campaign_video_url: settings.campaignVideoUrl || null,
        audio_url: settings.audioUrl || null,
        updated_at: new Date().toISOString(),
      },
    });

    for (const [slug, garment] of Object.entries(settings.garments ?? {}) as Array<[string, any]>) {
      await supabaseRest({
        path: 'two_harmonic_garments', method: 'POST', query: 'on_conflict=slug', prefer: 'resolution=merge-duplicates,return=minimal',
        body: {
          slug, collection_slug: COLLECTION_SLUG, name: slug, price_cents: Math.round(Number(garment.price) * 100),
          image_url: garment.imageUrl || null, campaign_video_url: garment.campaignVideoUrl || null,
          audio_url: garment.audioUrl || null, release_date: garment.releaseDate || null,
          private_access_required: Boolean(garment.privateAccessRequired), reservations_enabled: Boolean(garment.reservationsEnabled),
          updated_at: new Date().toISOString(),
        },
      });
      for (const [size, quantity] of Object.entries(garment.inventory ?? {})) {
        await supabaseRest({
          path: 'two_harmonic_inventory', method: 'POST', query: 'on_conflict=garment_slug,size', prefer: 'resolution=merge-duplicates,return=minimal',
          body: { garment_slug: slug, size, quantity: Math.max(0, Number(quantity) || 0), reserved: 0, updated_at: new Date().toISOString() },
        });
      }
    }

    return NextResponse.json({ ok: true, syncedAt: new Date().toISOString() });
  } catch (error) {
    if (error instanceof Error && error.message === 'UNAUTHORIZED_STUDIO') return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    return NextResponse.json({ error: error instanceof Error ? error.message : 'Unable to publish settings' }, { status: 500 });
  }
}
