'use client';

import { createSupabaseBrowserClient, isSupabaseConfigured } from '@/lib/supabase/client';

export type ProgressionSettingsInput = {
  worldId: string;
  currencyName: string;
  currencyIcon: string;
  levelNames: string[];
  constitutionTitle: string;
  constitutionBody: string;
  constitutionRequired: boolean;
  earningEnabled: boolean;
  purchaseMultiplier: number;
  watchMultiplier: number;
};

export type RewardInput = {
  worldId: string;
  threshold: number;
  title: string;
  description: string;
  rewardType: 'badge' | 'discount' | 'access' | 'merch' | 'experience' | 'custom';
  discountPercent?: number;
};

async function requireCreator() {
  if (!isSupabaseConfigured) throw new Error('Supabase is not configured.');
  const supabase = createSupabaseBrowserClient();
  const { data: authData, error: authError } = await supabase.auth.getUser();
  if (authError) throw authError;
  if (!authData.user) throw new Error('Sign in to use Creator Studio.');

  const { data: profile, error: profileError } = await supabase.from('profiles').select('role').eq('id', authData.user.id).single();
  if (profileError) throw profileError;
  if (!['creator', 'admin'].includes(profile.role)) throw new Error('Creator or admin access is required.');
  return { supabase, user: authData.user };
}

export async function saveProgressionSettings(input: ProgressionSettingsInput) {
  const { supabase, user } = await requireCreator();
  const { data, error } = await supabase
    .from('world_progression_settings')
    .upsert({
      world_id: input.worldId,
      currency_name: input.currencyName.trim(),
      currency_icon: input.currencyIcon.trim() || '⭐',
      level_names: input.levelNames.filter(Boolean),
      constitution_title: input.constitutionTitle.trim(),
      constitution_body: input.constitutionBody.trim(),
      constitution_required: input.constitutionRequired,
      earning_enabled: input.earningEnabled,
      purchase_multiplier: input.purchaseMultiplier,
      watch_multiplier: input.watchMultiplier,
      creator_id: user.id,
    }, { onConflict: 'world_id' })
    .select('*')
    .single();
  if (error) throw error;
  return data;
}

export async function addProgressionReward(input: RewardInput) {
  const { supabase } = await requireCreator();
  const { data, error } = await supabase
    .from('world_rewards')
    .insert({
      world_id: input.worldId,
      threshold: input.threshold,
      title: input.title.trim(),
      description: input.description.trim(),
      reward_type: input.rewardType,
      discount_percent: input.discountPercent ?? null,
      active: true,
    })
    .select('*')
    .single();
  if (error) throw error;
  return data;
}

export async function listProgressionRewards(worldId: string) {
  const { supabase } = await requireCreator();
  const { data, error } = await supabase
    .from('world_rewards')
    .select('*')
    .eq('world_id', worldId)
    .order('threshold', { ascending: true });
  if (error) throw error;
  return data ?? [];
}
