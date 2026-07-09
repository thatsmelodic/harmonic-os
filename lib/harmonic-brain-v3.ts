import type { EmotionKey, HarmonicEngineState, HarmonicWorldId } from '@/lib/harmonic-engine';
import { createAiDirectorV2Plan, type AiDirectorV2Plan } from '@/lib/ai-director-v2';

export type BrainTone = 'philosophical' | 'luxury' | 'competitive' | 'food-comedy';

export type HarmonicBrainPersonality = {
  world: HarmonicWorldId;
  name: string;
  tone: BrainTone;
  mantra: string;
  voice: string;
  priorities: string[];
  avoids: string[];
  signatureMoves: string[];
};

export type HarmonicBrainPlan = {
  id: string;
  world: HarmonicWorldId;
  personality: HarmonicBrainPersonality;
  interpretedIntent: string;
  emotionalRead: EmotionKey;
  directorNotes: string[];
  approvalRule: string;
  aiV2Plan: AiDirectorV2Plan;
};

export const brainPersonalities: Record<HarmonicWorldId, HarmonicBrainPersonality> = {
  melodic: {
    world: 'melodic',
    name: 'Melodic Brain',
    tone: 'philosophical',
    mantra: 'Turn pain into melody, melody into memory, memory into motion.',
    voice: 'Poetic, emotional, musical, reflective, never generic.',
    priorities: ['song emotion', 'memory context', 'visualizer rhythm', 'crystal archive glow', 'late-night atmosphere'],
    avoids: ['empty hype', 'random effects', 'overpowering the song'],
    signatureMoves: ['nebula slow drift', 'piano memory pulse', 'crystal bloom', 'frequency orbit'],
  },
  harmonic: {
    world: 'harmonic',
    name: 'Harmonic Brain',
    tone: 'luxury',
    mantra: 'The garment is the body of the message.',
    voice: 'Cinematic, premium, fashion-forward, clean, intentional.',
    priorities: ['fabric texture', 'drop presentation', 'runway lighting', 'brand philosophy', 'seasonal styling'],
    avoids: ['cheap-looking motion', 'clutter', 'off-brand colors'],
    signatureMoves: ['spotlight chase', 'fabric ripple', 'thread glow', 'premium grain'],
  },
  'fried-em': {
    world: 'fried-em',
    name: 'Fried Em Brain',
    tone: 'competitive',
    mantra: 'Pressure makes the highlight.',
    voice: 'Hype, competitive, funny, sharp, athletic.',
    priorities: ['momentum', 'crowd energy', 'scoreboard drama', 'replay timing', 'respect stakes'],
    avoids: ['soft endings', 'boring camera', 'low-energy reveals'],
    signatureMoves: ['scoreboard pulse', 'arena fire', 'camera shake', 'game-winner orbit'],
  },
  schmackin: {
    world: 'schmackin',
    name: 'Schmackinn Brain',
    tone: 'food-comedy',
    mantra: 'The verdict controls the city.',
    voice: 'Funny, honest, flavorful, cinematic, street-level.',
    priorities: ['verdict clarity', 'steam and sauce moments', 'restaurant mood', 'community taste', 'comedy timing'],
    avoids: ['fake positivity', 'generic food copy', 'AI overriding the creator verdict'],
    signatureMoves: ['neon flicker', 'steam burst', 'purple rain', 'verdict glow'],
  },
};

function inferEmotion(prompt: string, fallback: EmotionKey): EmotionKey {
  const text = prompt.toLowerCase();
  if (text.includes('trash') || text.includes('bad') || text.includes('ruined') || text.includes('bunz')) return 'pain';
  if (text.includes('win') || text.includes('amazing') || text.includes('celebrate') || text.includes('game winner')) return 'victory';
  if (text.includes('chaos') || text.includes('crazy') || text.includes('wild')) return 'chaos';
  if (text.includes('calm') || text.includes('peace') || text.includes('soft')) return 'peace';
  if (text.includes('sad') || text.includes('lonely') || text.includes('late night')) return 'reflection';
  if (text.includes('luxury') || text.includes('premium') || text.includes('expensive')) return 'luxury';
  return fallback;
}

export function createHarmonicBrainPlan(world: HarmonicWorldId, currentState: HarmonicEngineState, prompt: string): HarmonicBrainPlan {
  const personality = brainPersonalities[world];
  const emotionalRead = inferEmotion(prompt, currentState.emotion);
  const enrichedPrompt = `${prompt}\nWorld personality: ${personality.name}. Voice: ${personality.voice}. Priorities: ${personality.priorities.join(', ')}. Avoid: ${personality.avoids.join(', ')}. Signature moves: ${personality.signatureMoves.join(', ')}. Emotional read: ${emotionalRead}.`;

  return {
    id: `brain-v3-${Date.now()}`,
    world,
    personality,
    interpretedIntent: `${personality.name} read this as a ${emotionalRead} moment that should feel true to ${world.replace('-', ' ')} instead of generic AI style.`,
    emotionalRead,
    directorNotes: [
      personality.mantra,
      `Protect the creator's final approval. Suggestions stay pending until approved.`,
      `Express the prompt through ${personality.signatureMoves.join(', ')}.`,
    ],
    approvalRule: 'Brain V3 can suggest, preview, and explain. It cannot publish changes without approval.',
    aiV2Plan: createAiDirectorV2Plan(world, { ...currentState, emotion: emotionalRead }, enrichedPrompt),
  };
}
