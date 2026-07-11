type SupabaseRequest = {
  path: string;
  method?: 'GET' | 'POST' | 'PATCH' | 'DELETE';
  body?: unknown;
  query?: string;
  prefer?: string;
};

function getSupabaseEnv() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !serviceKey) throw new Error('Supabase server environment is not configured');
  return { url: url.replace(/\/$/, ''), serviceKey };
}

export async function supabaseRest<T>({ path, method = 'GET', body, query = '', prefer }: SupabaseRequest): Promise<T> {
  const { url, serviceKey } = getSupabaseEnv();
  const response = await fetch(`${url}/rest/v1/${path}${query ? `?${query}` : ''}`, {
    method,
    headers: {
      apikey: serviceKey,
      Authorization: `Bearer ${serviceKey}`,
      'Content-Type': 'application/json',
      ...(prefer ? { Prefer: prefer } : {}),
    },
    body: body === undefined ? undefined : JSON.stringify(body),
    cache: 'no-store',
  });

  if (!response.ok) {
    const detail = await response.text();
    throw new Error(`Supabase ${method} ${path} failed (${response.status}): ${detail}`);
  }

  if (response.status === 204) return undefined as T;
  const text = await response.text();
  return (text ? JSON.parse(text) : undefined) as T;
}

export function requireStudioSecret(request: Request) {
  const expected = process.env.HARMONIC_STUDIO_SECRET;
  const supplied = request.headers.get('x-harmonic-studio-key');
  if (!expected || !supplied || supplied !== expected) {
    throw new Error('UNAUTHORIZED_STUDIO');
  }
}
