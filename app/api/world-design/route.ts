import { NextResponse } from 'next/server';
import { supabaseRest } from '@/lib/server/supabase-rest';

function authorized(request: Request) {
  const expected = process.env.HARMONIC_STUDIO_SECRET || process.env.STUDIO_SECRET;
  return Boolean(expected && request.headers.get('x-harmonic-studio-key') === expected);
}

type DesignRow = {
  world: string;
  settings?: unknown;
  draft_settings?: unknown;
  live_settings?: unknown;
  status?: string;
  version?: number;
  published_at?: string | null;
};

type MediaLike={url?:unknown;width?:unknown;height?:unknown;x?:unknown;y?:unknown;opacity?:unknown;zIndex?:unknown;[key:string]:unknown};
type SettingsLike={media?:unknown;[key:string]:unknown};
function finite(value:unknown,fallback:number,min:number,max:number){const number=Number(value);return Number.isFinite(number)?Math.max(min,Math.min(max,number)):fallback;}
function validMedia(item:MediaLike){const url=item.url;return typeof url==='string'&&url.length>0&&!url.startsWith('blob:')&&!url.startsWith('data:');}
function sanitizeSettings(input:unknown){
  if(!input||typeof input!=='object')return input;
  const settings={...(input as SettingsLike)};
  const media=Array.isArray(settings.media)?settings.media:[];
  settings.media=media.filter((item):item is MediaLike=>Boolean(item&&typeof item==='object')).filter(validMedia).map(item=>({...item,x:finite(item.x,50,0,100),y:finite(item.y,50,0,100),width:finite(item.width,30,1,100),height:item.height===undefined?undefined:finite(item.height,30,1,100),opacity:finite(item.opacity,100,0,100),zIndex:finite(item.zIndex,1,-1000,1000)}));
  return settings;
}

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const mode = url.searchParams.get('mode') === 'draft' ? 'draft' : 'live';
    const world = url.searchParams.get('world');
    const query = world
      ? `select=world,settings,draft_settings,live_settings,status,version,published_at&world=eq.${encodeURIComponent(world)}`
      : 'select=world,settings,draft_settings,live_settings,status,version,published_at';
    const rows = await supabaseRest<DesignRow[]>({ path: 'world_builder_designs', query });
    const designs = Object.fromEntries(rows.map((row) => [row.world, sanitizeSettings(mode === 'draft' ? (row.draft_settings ?? row.live_settings ?? row.settings ?? {}) : (row.live_settings ?? row.settings ?? {}))]));
    let versions: unknown[] = [];
    if (world) versions = await supabaseRest<unknown[]>({ path: 'world_builder_versions', query: `select=id,world,version,label,settings,created_at&world=eq.${encodeURIComponent(world)}&order=created_at.desc&limit=20` });
    return NextResponse.json({ designs, records: rows, versions });
  } catch (error) {
    return NextResponse.json({ designs: {}, records: [], versions: [], error: error instanceof Error ? error.message : 'Unable to load designs' }, { status: 200 });
  }
}

export async function PUT(request: Request) {
  if (!authorized(request)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const body = await request.json() as { action?: string; world?: string; settings?: unknown; versionId?: number; label?: string };
  if (!body.world) return NextResponse.json({ error: 'world is required' }, { status: 400 });
  const action = body.action || 'save-draft';
  const existing = (await supabaseRest<DesignRow[]>({ path: 'world_builder_designs', query: `select=world,settings,draft_settings,live_settings,status,version,published_at&world=eq.${encodeURIComponent(body.world)}&limit=1` }))[0];

  if (action === 'save-draft') {
    if (!body.settings) return NextResponse.json({ error: 'settings are required' }, { status: 400 });
    const clean=sanitizeSettings(body.settings);
    await supabaseRest({ path: 'world_builder_designs', method: 'POST', query: 'on_conflict=world', prefer: 'resolution=merge-duplicates,return=minimal', body: { world: body.world, settings: existing?.settings ?? clean, draft_settings: clean, live_settings: existing?.live_settings ?? existing?.settings ?? clean, status: 'draft', version: existing?.version ?? 0, updated_at: new Date().toISOString() } });
    return NextResponse.json({ ok: true, status: 'draft-saved' });
  }

  if (action === 'publish') {
    const draft = sanitizeSettings(body.settings ?? existing?.draft_settings ?? existing?.live_settings ?? existing?.settings);
    if (!draft) return NextResponse.json({ error: 'No draft exists to publish' }, { status: 400 });
    const nextVersion = (existing?.version ?? 0) + 1;
    await supabaseRest({ path: 'world_builder_versions', method: 'POST', prefer: 'return=minimal', body: { world: body.world, version: nextVersion, label: body.label || `Version ${nextVersion}`, settings: draft } });
    await supabaseRest({ path: 'world_builder_designs', method: 'POST', query: 'on_conflict=world', prefer: 'resolution=merge-duplicates,return=minimal', body: { world: body.world, settings: draft, draft_settings: draft, live_settings: draft, status: 'live', version: nextVersion, published_at: new Date().toISOString(), updated_at: new Date().toISOString() } });
    return NextResponse.json({ ok: true, status: 'published', version: nextVersion });
  }

  if (action === 'restore') {
    if (!body.versionId) return NextResponse.json({ error: 'versionId is required' }, { status: 400 });
    const version = (await supabaseRest<Array<{ settings: unknown; version: number }>>({ path: 'world_builder_versions', query: `select=settings,version&id=eq.${body.versionId}&world=eq.${encodeURIComponent(body.world)}&limit=1` }))[0];
    if (!version) return NextResponse.json({ error: 'Version not found' }, { status: 404 });
    const clean=sanitizeSettings(version.settings);
    await supabaseRest({ path: 'world_builder_designs', method: 'POST', query: 'on_conflict=world', prefer: 'resolution=merge-duplicates,return=minimal', body: { world: body.world, settings: clean, draft_settings: clean, live_settings: clean, status: 'live', version: version.version, published_at: new Date().toISOString(), updated_at: new Date().toISOString() } });
    return NextResponse.json({ ok: true, status: 'restored', version: version.version, settings: clean });
  }

  return NextResponse.json({ error: 'Unknown action' }, { status: 400 });
}
