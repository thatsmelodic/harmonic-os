'use client';

import { createSupabaseBrowserClient } from '@/lib/supabase/client';

export async function getStudioAccessToken() {
  const supabase = createSupabaseBrowserClient();
  const { data, error } = await supabase.auth.getSession();
  if (error) throw error;
  const token = data.session?.access_token;
  if (!token) throw new Error('Sign in to your Harmonic OS account before saving, publishing, or uploading.');
  return token;
}

export async function studioAuthHeaders(extra?: HeadersInit) {
  const token = await getStudioAccessToken();
  return { ...Object.fromEntries(new Headers(extra).entries()), Authorization: `Bearer ${token}` };
}
