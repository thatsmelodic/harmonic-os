import { NextResponse } from 'next/server';
import { supabaseRest } from '@/lib/server/supabase-rest';

function authorized(request: Request) {
  const expected = process.env.HARMONIC_STUDIO_SECRET || process.env.STUDIO_SECRET;
  return Boolean(expected && request.headers.get('x-harmonic-studio-key') === expected);
}

export async function GET() {
  try {
    const rows = await supabaseRest<Array<{ world:string; settings:unknown; live_settings?:unknown }>>({
      path:'world_builder_designs',
      query:'select=world,settings,live_settings',
    });
    return NextResponse.json({ designs:Object.fromEntries(rows.map((row)=>[row.world,row.live_settings ?? row.settings])) });
  } catch (error) {
    return NextResponse.json({ designs:{}, error:error instanceof Error?error.message:'Unable to load designs' }, { status:200 });
  }
}

export async function PUT(request: Request) {
  if (!authorized(request)) return NextResponse.json({ error:'Unauthorized' }, { status:401 });
  const body = await request.json() as { world?:string; settings?:unknown };
  if (!body.world || !body.settings) return NextResponse.json({ error:'world and settings are required' }, { status:400 });
  const now = new Date().toISOString();
  await supabaseRest({
    path:'world_builder_designs', method:'POST', query:'on_conflict=world', prefer:'resolution=merge-duplicates,return=minimal',
    body:{ world:body.world, settings:body.settings, draft_settings:body.settings, live_settings:body.settings, status:'live', published_at:now, updated_at:now },
  });
  return NextResponse.json({ ok:true });
}
