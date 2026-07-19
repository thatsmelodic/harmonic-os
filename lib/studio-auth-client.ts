'use client';

import { createSupabaseBrowserClient } from '@/lib/supabase/client';

const AUTH_REQUIRED_EVENT = 'harmonic:auth-required';
const AUTH_COMPLETE_EVENT = 'harmonic:auth-complete';
const AUTH_CANCELLED_EVENT = 'harmonic:auth-cancelled';

async function waitForInAppSignIn() {
  if (typeof window === 'undefined') throw new Error('Sign in is only available in the browser.');

  return new Promise<void>((resolve, reject) => {
    const cleanup = () => {
      window.removeEventListener(AUTH_COMPLETE_EVENT, complete);
      window.removeEventListener(AUTH_CANCELLED_EVENT, cancel);
    };
    const complete = () => { cleanup(); resolve(); };
    const cancel = () => { cleanup(); reject(new Error('Sign in was cancelled. Your work is still saved locally.')); };

    window.addEventListener(AUTH_COMPLETE_EVENT, complete, { once: true });
    window.addEventListener(AUTH_CANCELLED_EVENT, cancel, { once: true });
    window.dispatchEvent(new CustomEvent(AUTH_REQUIRED_EVENT));
  });
}

export async function getStudioAccessToken() {
  const supabase = createSupabaseBrowserClient();
  let { data, error } = await supabase.auth.getSession();
  if (error) throw error;

  if (!data.session?.access_token) {
    await waitForInAppSignIn();
    ({ data, error } = await supabase.auth.getSession());
    if (error) throw error;
  }

  const token = data.session?.access_token;
  if (!token) throw new Error('Sign in to your Harmonic OS account before saving, publishing, or uploading.');
  return token;
}

export async function studioAuthHeaders(extra?: HeadersInit) {
  const token = await getStudioAccessToken();
  return { ...Object.fromEntries(new Headers(extra).entries()), Authorization: `Bearer ${token}` };
}
