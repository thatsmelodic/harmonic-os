'use client';

import { createSupabaseBrowserClient, isSupabaseConfigured } from '@/lib/supabase/client';

async function requireAdmin() {
  if (!isSupabaseConfigured) throw new Error('Supabase is not configured.');
  const supabase = createSupabaseBrowserClient();
  const { data: authData, error: authError } = await supabase.auth.getUser();
  if (authError) throw authError;
  if (!authData.user) throw new Error('Sign in to open the admin review panel.');

  const { data: profile, error: profileError } = await supabase.from('profiles').select('role').eq('id', authData.user.id).single();
  if (profileError) throw profileError;
  if (profile.role !== 'admin') throw new Error('Admin access is required.');

  return { supabase, user: authData.user };
}

export async function listExpansionApplications() {
  const { supabase } = await requireAdmin();
  const { data, error } = await supabase
    .from('world_expansion_applications')
    .select('*, profiles!world_expansion_applications_creator_id_fkey(display_name, username, email, role, world_limit)')
    .order('created_at', { ascending: true });
  if (error) throw error;
  return data ?? [];
}

export async function updateExpansionApplication(input: {
  id: string;
  status: 'under_review' | 'denied' | 'more_information';
  adminNotes?: string;
}) {
  const { supabase, user } = await requireAdmin();
  const { data, error } = await supabase
    .from('world_expansion_applications')
    .update({
      status: input.status,
      admin_notes: input.adminNotes?.trim() || null,
      reviewed_by: user.id,
      reviewed_at: input.status === 'under_review' ? null : new Date().toISOString(),
    })
    .eq('id', input.id)
    .select('*')
    .single();
  if (error) throw error;
  return data;
}

export async function approveExpansionApplication(id: string, adminNotes?: string) {
  const { supabase } = await requireAdmin();
  const { data, error } = await supabase.rpc('approve_world_expansion', {
    p_application_id: id,
    p_admin_notes: adminNotes?.trim() || null,
  });
  if (error) throw error;
  return data;
}
