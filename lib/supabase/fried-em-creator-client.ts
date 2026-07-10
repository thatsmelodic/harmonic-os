'use client';

import { createSupabaseBrowserClient, isSupabaseConfigured } from '@/lib/supabase/client';

export type CreatorEpisodeInput = {
  title: string;
  slug: string;
  episodeNumber: number;
  subtitle: string;
  description: string;
  youtubeId: string;
  court: string;
  opponent: string;
  result: 'W' | 'L' | 'D';
  score: string;
  heat: number;
  status: 'draft' | 'published' | 'archived';
};

export type CreatorPlayerInput = {
  name: string;
  slug: string;
  handle: string;
  badge: string;
  bio: string;
  wins: number;
  losses: number;
  respect: number;
  heat: number;
  cookedMeter: number;
  clutch: number;
  gameIq: number;
  signatureMove: string;
};

async function requireCreator() {
  if (!isSupabaseConfigured) throw new Error('Supabase is not configured.');
  const supabase = createSupabaseBrowserClient();
  const { data: authData, error: authError } = await supabase.auth.getUser();
  if (authError) throw authError;
  if (!authData.user) throw new Error('Sign in to use Creator Studio.');

  const { data: profile, error: profileError } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', authData.user.id)
    .single();
  if (profileError) throw profileError;
  if (!['creator', 'admin'].includes(profile.role)) throw new Error('Creator or admin access is required.');

  return { supabase, user: authData.user };
}

export async function createCreatorEpisode(input: CreatorEpisodeInput) {
  const { supabase, user } = await requireCreator();
  const { data, error } = await supabase
    .from('fried_em_episodes')
    .insert({
      title: input.title.trim(),
      slug: input.slug.trim(),
      episode_number: input.episodeNumber,
      subtitle: input.subtitle.trim(),
      description: input.description.trim(),
      youtube_id: input.youtubeId.trim() || null,
      court: input.court.trim(),
      opponent: input.opponent.trim(),
      result: input.result,
      score: input.score.trim(),
      heat: input.heat,
      status: input.status,
      published_at: input.status === 'published' ? new Date().toISOString() : null,
      created_by: user.id,
    })
    .select('*')
    .single();
  if (error) throw error;
  return data;
}

export async function createCreatorPlayer(input: CreatorPlayerInput) {
  const { supabase, user } = await requireCreator();
  const { data, error } = await supabase
    .from('fried_em_players')
    .insert({
      owner_id: user.id,
      name: input.name.trim(),
      slug: input.slug.trim(),
      handle: input.handle.trim(),
      badge: input.badge.trim(),
      bio: input.bio.trim(),
      wins: input.wins,
      losses: input.losses,
      respect: input.respect,
      heat: input.heat,
      cooked_meter: input.cookedMeter,
      clutch: input.clutch,
      game_iq: input.gameIq,
      signature_move: input.signatureMove.trim(),
    })
    .select('*')
    .single();
  if (error) throw error;
  return data;
}

export async function listCreatorChallenges() {
  const { supabase } = await requireCreator();
  const { data, error } = await supabase
    .from('fried_em_challenges')
    .select('id, challenger_name, opponent_name, matchup, court, status, scheduled_for, winner_name, score, created_at')
    .order('created_at', { ascending: false });
  if (error) throw error;
  return data ?? [];
}

export async function updateCreatorChallenge(input: {
  id: string;
  status: 'pending' | 'accepted' | 'scheduled' | 'live' | 'completed' | 'archived';
  winnerName?: string;
  score?: string;
}) {
  const { supabase } = await requireCreator();
  const { data, error } = await supabase
    .from('fried_em_challenges')
    .update({ status: input.status, winner_name: input.winnerName?.trim() || null, score: input.score?.trim() || null })
    .eq('id', input.id)
    .select('*')
    .single();
  if (error) throw error;
  return data;
}
