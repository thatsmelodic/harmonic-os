import { NextResponse } from 'next/server';
import { supabaseRest } from '@/lib/server/supabase-rest';

function authorized(request: Request) {
  const expected = process.env.HARMONIC_STUDIO_SECRET || process.env.STUDIO_SECRET;
  return Boolean(expected && request.headers.get('x-harmonic-studio-key') === expected);
}

export async function GET(request: Request) {
  const url = new URL(request.url);
  const world = url.searchParams.get('world');
  if (!world) return NextResponse.json({ error: 'world is required' }, { status: 400 });
  try {
    const [designs, versions, assets] = await Promise.all([
      supabaseRest<Array<Record<string, unknown>>>({
        path: 'world_builder_designs',
        query: `select=world,draft_settings,live_settings,status,scheduled_at,published_at,updated_at&world=eq.${encodeURIComponent(world)}`,
      }),
      supabaseRest<Array<Record<string, unknown>>>({
        path: 'world_builder_versions',
        query: `select=id,world,version_number,status,note,created_at&world=eq.${encodeURIComponent(world)}&order=version_number.desc&limit=30`,
      }),
      supabaseRest<Array<Record<string, unknown>>>({
        path: 'world_asset_library',
        query: 'select=id,name,url,media_type,category,source_world,metadata,created_at&order=created_at.desc&limit=100',
      }),
    ]);
    return NextResponse.json({ design: designs[0] ?? null, versions, assets });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : 'Unable to load Phase 4 data' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  if (!authorized(request)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const body = await request.json() as {
    action?: 'save-draft' | 'publish' | 'schedule' | 'archive' | 'restore' | 'add-asset';
    world?: string;
    settings?: unknown;
    status?: string;
    scheduledAt?: string | null;
    versionId?: number;
    note?: string;
    asset?: { name: string; url: string; mediaType: 'image' | 'video' | 'audio'; category?: string; metadata?: unknown };
  };
  if (!body.action) return NextResponse.json({ error: 'action is required' }, { status: 400 });

  if (body.action === 'add-asset') {
    if (!body.asset?.name || !body.asset.url) return NextResponse.json({ error: 'asset name and url are required' }, { status: 400 });
    await supabaseRest({
      path: 'world_asset_library', method: 'POST', query: 'on_conflict=url', prefer: 'resolution=merge-duplicates,return=minimal',
      body: { name: body.asset.name, url: body.asset.url, media_type: body.asset.mediaType, category: body.asset.category || 'general', source_world: body.world || null, metadata: body.asset.metadata || {} },
    });
    return NextResponse.json({ ok: true });
  }

  if (!body.world) return NextResponse.json({ error: 'world is required' }, { status: 400 });

  if (body.action === 'restore') {
    if (!body.versionId) return NextResponse.json({ error: 'versionId is required' }, { status: 400 });
    const versions = await supabaseRest<Array<{ settings: unknown }>>({ path: 'world_builder_versions', query: `select=settings&id=eq.${body.versionId}&limit=1` });
    if (!versions[0]) return NextResponse.json({ error: 'Version not found' }, { status: 404 });
    await supabaseRest({ path: 'world_builder_designs', method: 'POST', query: 'on_conflict=world', prefer: 'resolution=merge-duplicates,return=minimal', body: { world: body.world, settings: versions[0].settings, draft_settings: versions[0].settings, updated_at: new Date().toISOString() } });
    return NextResponse.json({ ok: true, settings: versions[0].settings });
  }

  if (!body.settings) return NextResponse.json({ error: 'settings are required' }, { status: 400 });
  const now = new Date().toISOString();
  const countRows = await supabaseRest<Array<{ version_number: number }>>({ path: 'world_builder_versions', query: `select=version_number&world=eq.${encodeURIComponent(body.world)}&order=version_number.desc&limit=1` });
  const versionNumber = (countRows[0]?.version_number ?? 0) + 1;
  const status = body.action === 'publish' ? 'live' : body.action === 'schedule' ? 'scheduled' : body.action === 'archive' ? 'archived' : 'draft';
  const designPayload: Record<string, unknown> = { world: body.world, settings: body.settings, draft_settings: body.settings, status, updated_at: now };
  if (body.action === 'publish') Object.assign(designPayload, { live_settings: body.settings, published_at: now, scheduled_at: null });
  if (body.action === 'schedule') Object.assign(designPayload, { scheduled_at: body.scheduledAt || null });
  if (body.action === 'archive') Object.assign(designPayload, { scheduled_at: null });

  await supabaseRest({ path: 'world_builder_designs', method: 'POST', query: 'on_conflict=world', prefer: 'resolution=merge-duplicates,return=minimal', body: designPayload });
  await supabaseRest({ path: 'world_builder_versions', method: 'POST', prefer: 'return=minimal', body: { world: body.world, version_number: versionNumber, status, settings: body.settings, note: body.note || '' } });
  return NextResponse.json({ ok: true, versionNumber, status });
}
