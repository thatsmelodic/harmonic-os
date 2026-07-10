'use client';

import { createSupabaseBrowserClient, isSupabaseConfigured } from '@/lib/supabase/client';

export type FriedEmChallengeRow = {
  id: string;
  challenger_user_id: string | null;
  challenger_name: string;
  opponent_name: string;
  matchup: string;
  court: string;
  scheduled_for: string | null;
  date_label: string | null;
  time_label: string | null;
  stakes: string;
  status: 'pending' | 'accepted' | 'scheduled' | 'live' | 'completed' | 'archived';
  heat: number;
  winner_name: string | null;
  score: string | null;
  episode_id: string | null;
  created_at: string;
  updated_at: string;
  vote_count?: number;
};

export type CreateChallengeInput = {
  challengerName: string;
  opponentName: string;
  matchup: string;
  court: string;
  date?: string;
  time?: string;
  stakes?: string;
};

function buildScheduledFor(date?: string, time?: string) {
  if (!date) return null;
  const value = `${date}T${time || '00:00'}:00`;
  const parsed = new Date(value);
  return Number.isNaN(parsed.getTime()) ? null : parsed.toISOString();
}

export async function getCurrentFriedEmUser() {
  if (!isSupabaseConfigured) return null;
  const supabase = createSupabaseBrowserClient();
  const { data, error } = await supabase.auth.getUser();
  if (error) throw error;
  return data.user;
}

export async function listFriedEmChallenges(): Promise<FriedEmChallengeRow[]> {
  if (!isSupabaseConfigured) return [];
  const supabase = createSupabaseBrowserClient();
  const { data, error } = await supabase
    .from('fried_em_challenges')
    .select('*, fried_em_challenge_votes(count)')
    .order('created_at', { ascending: false });

  if (error) throw error;

  return (data ?? []).map((row: any) => ({
    ...row,
    vote_count: Array.isArray(row.fried_em_challenge_votes)
      ? Number(row.fried_em_challenge_votes[0]?.count ?? 0)
      : 0,
  }));
}

export async function createFriedEmChallenge(input: CreateChallengeInput) {
  if (!isSupabaseConfigured) throw new Error('Supabase is not configured.');
  const supabase = createSupabaseBrowserClient();
  const { data: authData, error: authError } = await supabase.auth.getUser();
  if (authError) throw authError;
  if (!authData.user) throw new Error('Sign in before submitting a challenge.');

  const { data, error } = await supabase
    .from('fried_em_challenges')
    .insert({
      challenger_user_id: authData.user.id,
      challenger_name: input.challengerName.trim(),
      opponent_name: input.opponentName.trim(),
      matchup: input.matchup,
      court: input.court,
      scheduled_for: buildScheduledFor(input.date, input.time),
      date_label: input.date || 'TBD',
      time_label: input.time || 'TBD',
      stakes: input.stakes?.trim() || '',
      status: input.date ? 'scheduled' : 'pending',
      heat: 50,
    })
    .select('*')
    .single();

  if (error) throw error;
  return data as FriedEmChallengeRow;
}

export async function voteForFriedEmChallenge(challengeId: string) {
  if (!isSupabaseConfigured) throw new Error('Supabase is not configured.');
  const supabase = createSupabaseBrowserClient();
  const { data: authData, error: authError } = await supabase.auth.getUser();
  if (authError) throw authError;
  if (!authData.user) throw new Error('Sign in before voting.');

  const { error } = await supabase
    .from('fried_em_challenge_votes')
    .insert({ challenge_id: challengeId, voter_id: authData.user.id });

  if (error) {
    if (error.code === '23505') throw new Error('You already voted for this matchup.');
    throw error;
  }
}

export function subscribeToFriedEmChallenges(onChange: () => void) {
  if (!isSupabaseConfigured) return () => undefined;
  const supabase = createSupabaseBrowserClient();
  const channel = supabase
    .channel('fried-em-challenge-arena')
    .on('postgres_changes', { event: '*', schema: 'public', table: 'fried_em_challenges' }, onChange)
    .on('postgres_changes', { event: '*', schema: 'public', table: 'fried_em_challenge_votes' }, onChange)
    .subscribe();

  return () => {
    void supabase.removeChannel(channel);
  };
}
