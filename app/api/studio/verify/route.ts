import { NextResponse } from 'next/server';

function studioSecret() {
  return process.env.HARMONIC_STUDIO_SECRET || process.env.STUDIO_SECRET || '';
}

export async function POST(request: Request) {
  const configured = studioSecret();
  if (!configured) {
    return NextResponse.json({ error: 'Creator Studio access is not configured.' }, { status: 503 });
  }

  const supplied = request.headers.get('x-harmonic-studio-key') || '';
  if (supplied !== configured) {
    return NextResponse.json({ error: 'Owner access required.' }, { status: 401 });
  }

  return NextResponse.json({ ok: true, role: 'owner' });
}
