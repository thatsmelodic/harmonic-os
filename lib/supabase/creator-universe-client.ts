'use client';

import { createSupabaseBrowserClient, isSupabaseConfigured } from '@/lib/supabase/client';

export type ClaimWorldInput = {
  name: string;
  slug: string;
  category: string;
  icon: string;
  tagline: string;
  philosophy: string;
  constitution: string;
  progressionName: string;
  progressionIcon: string;
};

export type ExpansionApplicationInput = {
  requestedWorldName: string;
  requestedCategory: string;
  requestedIcon: string;
  needReason: string;
  differentiation: string;
  existingWorldFitExplanation: string;
  communityBenefit: string;
};

function client() {
  if (!isSupabaseConfigured) throw new Error('Supabase is not configured.');
  return createSupabaseBrowserClient();
}

export async function getCreatorUniverseSummary() {
  const supabase = client();
  const { data: authData, error: authError } = await supabase.auth.getUser();
  if (authError) throw authError;
  if (!authData.user) throw new Error('Sign in to manage creator worlds.');

  const [{ data: profile, error: profileError }, { data: worlds, error: worldsError }, { data: applications, error: applicationsError }] = await Promise.all([
    supabase.from('profiles').select('id, role, world_limit, display_name, username').eq('id', authData.user.id).single(),
    supabase.from('creator_worlds').select('id, slug, name, category, icon, status, visibility, created_at').eq('owner_id', authData.user.id).neq('status', 'archived').order('created_at', { ascending: true }),
    supabase.from('creator_world_expansion_applications').select('*').eq('applicant_id', authData.user.id).order('created_at', { ascending: false }),
  ]);

  if (profileError) throw profileError;
  if (worldsError) throw worldsError;
  if (applicationsError) throw applicationsError;

  return { user: authData.user, profile, worlds: worlds ?? [], applications: applications ?? [] };
}

export async function claimCreatorWorld(input: ClaimWorldInput) {
  const supabase = client();
  const { data, error } = await supabase.rpc('claim_creator_world', {
    p_name: input.name,
    p_slug: input.slug,
    p_category: input.category,
    p_icon: input.icon,
    p_tagline: input.tagline,
    p_philosophy: input.philosophy,
    p_constitution: input.constitution,
    p_progression_name: input.progressionName,
    p_progression_icon: input.progressionIcon,
  });
  if (error) {
    if (error.message.includes('WORLD_LIMIT_REACHED')) throw new Error('You reached your current world limit. Use Expand Your Universe to request another frequency.');
    throw error;
  }
  return data;
}

export async function submitUniverseExpansion(input: ExpansionApplicationInput) {
  const supabase = client();
  const { data: authData, error: authError } = await supabase.auth.getUser();
  if (authError) throw authError;
  if (!authData.user) throw new Error('Sign in before applying for expansion.');

  const { data, error } = await supabase.from('creator_world_expansion_applications').insert({
    applicant_id: authData.user.id,
    requested_world_name: input.requestedWorldName.trim(),
    requested_category: input.requestedCategory.trim(),
    requested_icon: input.requestedIcon.trim() || '🌌',
    need_reason: input.needReason.trim(),
    differentiation: input.differentiation.trim(),
    existing_world_fit_explanation: input.existingWorldFitExplanation.trim(),
    community_benefit: input.communityBenefit.trim(),
  }).select('*').single();
  if (error) throw error;
  return data;
}

export async function listExpansionApplicationsForAdmin() {
  const supabase = client();
  const { data, error } = await supabase.from('creator_world_expansion_applications').select('*, profiles!creator_world_expansion_applications_applicant_id_fkey(username, display_name, email, world_limit, role)').order('created_at', { ascending: false });
  if (error) throw error;
  return data ?? [];
}

export async function reviewExpansionApplication(applicationId: string, status: 'under_review' | 'approved' | 'denied' | 'needs_info', adminNotes: string) {
  const supabase = client();
  const { data, error } = await supabase.rpc('review_world_expansion_application', {
    p_application_id: applicationId,
    p_status: status,
    p_admin_notes: adminNotes || null,
  });
  if (error) throw error;
  return data;
}
