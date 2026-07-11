import { NextResponse } from 'next/server';
import { supabaseRest } from '@/lib/server/supabase-rest';

export async function POST(request: Request) {
  try {
    const { garmentSlug, size, email } = await request.json();
    if (!garmentSlug || !size || !email || !String(email).includes('@')) {
      return NextResponse.json({ error: 'Garment, size, and valid email are required' }, { status: 400 });
    }

    const reservations = await supabaseRest<any[]>({
      path: 'rpc/reserve_two_harmonic_garment',
      method: 'POST',
      body: {
        p_garment_slug: String(garmentSlug),
        p_size: String(size),
        p_email: String(email).trim().toLowerCase(),
        p_user_id: null,
        p_minutes: 20,
      },
    });

    const reservation = Array.isArray(reservations) ? reservations[0] : reservations;
    return NextResponse.json({
      ok: true,
      reservation: {
        id: reservation?.id,
        status: reservation?.status,
        expiresAt: reservation?.expires_at,
        unitPrice: Number(reservation?.unit_price_cents ?? 0) / 100,
      },
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Reservation failed';
    const soldOut = message.toLowerCase().includes('sold out') || message.toLowerCase().includes('not available');
    return NextResponse.json({ error: message }, { status: soldOut ? 409 : 500 });
  }
}
