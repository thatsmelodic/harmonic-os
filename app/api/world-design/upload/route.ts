import { NextResponse } from 'next/server';

function getEnv() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL?.replace(/\/$/, '');
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const studioSecret = process.env.HARMONIC_STUDIO_SECRET || process.env.STUDIO_SECRET;
  if (!url || !serviceKey || !studioSecret) throw new Error('World asset storage is not configured');
  return { url, serviceKey, studioSecret };
}

export async function POST(request: Request) {
  const { url, serviceKey, studioSecret } = getEnv();
  if (request.headers.get('x-harmonic-studio-key') !== studioSecret) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const form = await request.formData();
  const file = form.get('file');
  const world = String(form.get('world') || 'global').replace(/[^a-z0-9-]/gi, '-');
  if (!(file instanceof File)) return NextResponse.json({ error: 'A file is required' }, { status: 400 });
  if (!file.type.startsWith('image/') && !file.type.startsWith('video/')) return NextResponse.json({ error: 'Only images, GIFs, and videos are supported' }, { status: 400 });
  if (file.size > 50 * 1024 * 1024) return NextResponse.json({ error: 'Asset must be 50 MB or smaller' }, { status: 400 });

  const safeName = file.name.replace(/[^a-z0-9._-]/gi, '-');
  const objectPath = `${world}/${Date.now()}-${safeName}`;
  const response = await fetch(`${url}/storage/v1/object/world-assets/${objectPath}`, {
    method: 'POST',
    headers: {
      apikey: serviceKey,
      Authorization: `Bearer ${serviceKey}`,
      'Content-Type': file.type || 'application/octet-stream',
      'x-upsert': 'false',
    },
    body: file,
  });

  if (!response.ok) return NextResponse.json({ error: await response.text() }, { status: response.status });
  return NextResponse.json({ url: `${url}/storage/v1/object/public/world-assets/${objectPath}`, type: file.type.startsWith('video/') ? 'video' : 'image' });
}
