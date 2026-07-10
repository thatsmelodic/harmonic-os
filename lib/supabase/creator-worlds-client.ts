'use client';

import { createSupabaseBrowserClient, isSupabaseConfigured } from '@/lib/supabase/client';

export type CreatorWorldInput = {
  name: string;
  slug: string;
  category: string;
  icon: string;
  philosophy: string;
  description: string;
  progressionName: string;
  constitutionTitle: string;
  constitutionBody: string;
};

export type ExpansionApplicationInput = {
  requestedWorldName: string;
  requestedCategory: string;
  reasonForExpansion: string;
  differenceFromExisting: string;
  whyExistingWorldsAreNotEnough: string;
  communityBenefit: string;
};

async function requireUser() {
  if (!isSupabaseConfigured) throw new Error('Supabase is not configured.');
  const supabase = createSupabaseBrowserClient();
  const { data, error } = await supabase.auth.getUser();
  if (error) throw error;
  if (!data.user) throw new Error('Sign in before claiming a frequency.');
  return { supabase, user: data.user };
}

export async function getCreatorWorldStatus() {
  const { supabase, user } = await requireUser();
  const [{ data: profile, error: profileError }, { data: worlds, error: worldsError }] = await Promise.all([
    supabase.from('profiles').select('role, world_limit, creator_verified').eq('id', user.id).single(),
    supabase.from('creator_worlds').select('*').eq('owner_id', user.id).neq('status', 'archived').order('created_at', { ascending: true }),
  ]);
  if (profileError) throw profileError;
  if (worldsError) throw worldsError;
  return { profile, worlds: worlds ?? [], worldCount: worlds?.length ?? 0, worldLimit: profile.world_limit ?? 0 };
}

export async function claimCreatorWorld(input: CreatorWorldInput) {
  const { supabase, user } = await requireUser();
  const { data, error } = await supabase
    .from('creator_worlds')
    .insert({
      owner_id: user.id,
      name: input.name.trim(),
      slug: input.slug.trim(),
      category: input.category,
      icon: input.icon.trim() || '🌌',
      philosophy: input.philosophy.trim(),
      description: input.description.trim(),
      progression_name: input.progressionName.trim() || 'XP',
      constitution_title: input.constitutionTitle.trim() || 'Welcome',
      constitution_body: input.constitutionBody.trim(),
      status: 'draft',
      route: `/creator-worlds/${input.slug.trim()}`,
    })
    .select('*')
    .single();
  if (error) throw error;
  return data;
}

export async function submitExpansionApplication(input: ExpansionApplicationInput) {
  const { supabase, user } = await requireUser();
  const { data, error } = await supabase
    .from('world_expansion_applications')
    .insert({
      creator_id: user.id,
      requested_world_name: input.requestedWorldName.trim(),
      requested_category: input.requestedCategory,
      reason_for_expansion: input.reasonForExpansion.trim(),
      difference_from_existing: input.differenceFromExisting.trim(),
      why_existing_worlds_are_not_enough: input.whyExistingWorldsAreNotEnough.trim(),
      community_benefit: input.communityBenefit.trim(),
      requested_additional_slots: 1,
    })
    .select('*')
    .single();
  if (error) throw error;
  return data;
}
