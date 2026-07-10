import type { FriedEmChallenge } from '@/data/fried-em-challenges';
import type { FriedEmPlayer } from '@/data/fried-em-players';

export type ReputationDelta = {
  respect: number;
  heat: number;
  cookedMeter: number;
  wins: number;
  losses: number;
  streak: number;
};

export type ReputationEvent = {
  id: string;
  playerSlug: string;
  type: 'game' | 'episode' | 'vote' | 'challenge' | 'streak';
  title: string;
  description: string;
  createdAt: string;
  delta: Partial<ReputationDelta>;
  href?: string;
};

const clamp = (value: number, min = 0, max = 100) => Math.min(max, Math.max(min, value));

export function calculateChallengeDelta(challenge: FriedEmChallenge, playerName: string): ReputationDelta {
  const completed = challenge.status === 'completed';
  const won = completed && challenge.winner === playerName;
  const lost = completed && Boolean(challenge.winner) && challenge.winner !== playerName;
  const heatBase = Math.round(challenge.heat / 18);
  const voteBonus = Math.min(5, Math.floor(challenge.votes / 100));

  return {
    respect: completed ? (won ? 5 + voteBonus : lost ? -2 : 1) : 0,
    heat: completed ? (won ? heatBase + voteBonus : lost ? -Math.max(1, Math.round(heatBase / 2)) : 0) : 0,
    cookedMeter: completed ? (won ? Math.max(2, Math.round(challenge.heat / 24)) : lost ? -3 : 0) : 0,
    wins: won ? 1 : 0,
    losses: lost ? 1 : 0,
    streak: won ? 1 : lost ? -1 : 0,
  };
}

export function applyReputationDelta(player: FriedEmPlayer, delta: ReputationDelta): FriedEmPlayer {
  return {
    ...player,
    wins: player.wins + delta.wins,
    losses: player.losses + delta.losses,
    record: `${player.wins + delta.wins}-${player.losses + delta.losses}`,
    respect: clamp(player.respect + delta.respect),
    heat: clamp(player.heat + delta.heat),
    cookedMeter: clamp(player.cookedMeter + delta.cookedMeter),
  };
}

export function calculateRankScore(player: FriedEmPlayer) {
  const games = Math.max(1, player.wins + player.losses);
  const winRate = player.wins / games;
  return Math.round(
    player.respect * 0.26 +
    player.heat * 0.24 +
    player.cookedMeter * 0.22 +
    player.clutch * 0.12 +
    player.iq * 0.08 +
    winRate * 100 * 0.08,
  );
}

export function rankFriedEmPlayers(players: FriedEmPlayer[]) {
  return [...players]
    .map((player) => ({ ...player, rankScore: calculateRankScore(player) }))
    .sort((a, b) => b.rankScore - a.rankScore)
    .map((player, index) => ({ ...player, rank: index + 1 }));
}

export function formatDelta(value: number) {
  if (value > 0) return `+${value}`;
  return String(value);
}
