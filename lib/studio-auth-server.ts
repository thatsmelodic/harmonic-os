type SupabaseUser = { id: string; email?: string | null; app_metadata?: Record<string, unknown>; user_metadata?: Record<string, unknown> };

export async function requireStudioUser(request: Request): Promise<SupabaseUser> {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL?.replace(/\/$/, '');
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !anonKey) throw new Error('Supabase authentication is not configured.');

  const authorization = request.headers.get('authorization') || '';
  if (!authorization.startsWith('Bearer ')) throw new Error('AUTH_REQUIRED');

  const response = await fetch(`${url}/auth/v1/user`, {
    headers: { apikey: anonKey, Authorization: authorization },
    cache: 'no-store',
  });
  if (!response.ok) throw new Error('AUTH_REQUIRED');

  const user = await response.json() as SupabaseUser;
  const allowed = (process.env.HARMONIC_OWNER_EMAILS || process.env.HARMONIC_OWNER_EMAIL || '')
    .split(',').map(value => value.trim().toLowerCase()).filter(Boolean);
  if (allowed.length && !allowed.includes((user.email || '').toLowerCase())) throw new Error('OWNER_REQUIRED');
  return user;
}

export function studioAuthError(error: unknown) {
  const message = error instanceof Error ? error.message : '';
  if (message === 'AUTH_REQUIRED') return { error: 'Sign in to your Harmonic OS account first.', status: 401 };
  if (message === 'OWNER_REQUIRED') return { error: 'This account does not have creator-owner access.', status: 403 };
  return { error: message || 'Authorization failed.', status: 500 };
}
