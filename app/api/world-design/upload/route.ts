import { NextResponse } from 'next/server';

const BUCKET = 'world-assets';
const MAX_BYTES = 100 * 1024 * 1024;

function getEnv() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL?.replace(/\/$/, '');
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const studioSecret = process.env.HARMONIC_STUDIO_SECRET || process.env.STUDIO_SECRET;
  if (!url || !serviceKey || !studioSecret) throw new Error('World asset storage is not configured');
  return { url, serviceKey, studioSecret };
}

function authHeaders(serviceKey: string) {
  return {
    apikey: serviceKey,
    Authorization: `Bearer ${serviceKey}`,
  };
}

async function ensureBucket(url: string, serviceKey: string) {
  const existing = await fetch(`${url}/storage/v1/bucket/${BUCKET}`, {
    headers: authHeaders(serviceKey),
    cache: 'no-store',
  });

  if (existing.ok) return;
  if (existing.status !== 404 && existing.status !== 400) {
    throw new Error(`Storage check failed: ${await existing.text()}`);
  }

  const created = await fetch(`${url}/storage/v1/bucket`, {
    method: 'POST',
    headers: {
      ...authHeaders(serviceKey),
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      id: BUCKET,
      name: BUCKET,
      public: true,
      file_size_limit: MAX_BYTES,
      allowed_mime_types: ['image/*', 'video/*'],
    }),
  });

  if (!created.ok && created.status !== 409) {
    throw new Error(`Storage bucket could not be created: ${await created.text()}`);
  }
}

export async function POST(request: Request) {
  try {
    const { url, serviceKey, studioSecret } = getEnv();
    if (request.headers.get('x-harmonic-studio-key') !== studioSecret) {
      return NextResponse.json({ error: 'Owner authorization is required.' }, { status: 401 });
    }

    const form = await request.formData();
    const file = form.get('file');
    const world = String(form.get('world') || 'global').replace(/[^a-z0-9-]/gi, '-');

    if (!(file instanceof File)) {
      return NextResponse.json({ error: 'Choose an image, GIF, or video file.' }, { status: 400 });
    }
    if (!file.type.startsWith('image/') && !file.type.startsWith('video/')) {
      return NextResponse.json({ error: 'Only images, GIFs, and videos are supported.' }, { status: 400 });
    }
    if (file.size <= 0) {
      return NextResponse.json({ error: 'The selected file is empty.' }, { status: 400 });
    }
    if (file.size > MAX_BYTES) {
      return NextResponse.json({ error: 'Media must be 100 MB or smaller.' }, { status: 413 });
    }

    await ensureBucket(url, serviceKey);

    const safeName = file.name.replace(/[^a-z0-9._-]/gi, '-');
    const objectPath = `${world}/${crypto.randomUUID()}-${safeName}`;
    const response = await fetch(`${url}/storage/v1/object/${BUCKET}/${objectPath}`, {
      method: 'POST',
      headers: {
        ...authHeaders(serviceKey),
        'Content-Type': file.type || 'application/octet-stream',
        'x-upsert': 'false',
      },
      body: file,
    });

    if (!response.ok) {
      const details = await response.text();
      return NextResponse.json({ error: `Upload failed: ${details}` }, { status: response.status });
    }

    return NextResponse.json({
      ok: true,
      url: `${url}/storage/v1/object/public/${BUCKET}/${objectPath}`,
      path: objectPath,
      name: file.name,
      size: file.size,
      mimeType: file.type,
      type: file.type.startsWith('video/') ? 'video' : 'image',
    });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Upload service failed.' },
      { status: 500 },
    );
  }
}
