import type { HarmonicEngineState, HarmonicWorldId } from '@/lib/harmonic-engine';
import { createAiDirectorPlan } from '@/lib/ai-director-approval';
import { createDefaultDirectorTimeline, type DirectorTimelineKeyframe } from '@/lib/director-timeline';

export type AiV2SceneType = 'hook' | 'build' | 'peak' | 'reveal' | 'outro';
export type AiV2ApprovalStatus = 'pending' | 'approved' | 'rejected';

export type AiDirectorV2Effect = {
  id: string;
  label: string;
  category: 'camera' | 'lighting' | 'atmosphere' | 'audio' | 'objects' | 'ui';
  patch: Partial<HarmonicEngineState>;
  reason: string;
  status: AiV2ApprovalStatus;
};

export type AiDirectorV2Scene = {
  id: string;
  type: AiV2SceneType;
  time: number;
  title: string;
  description: string;
  confidence: number;
  status: AiV2ApprovalStatus;
  effects: AiDirectorV2Effect[];
};

export type AiDirectorV2Plan = {
  id: string;
  world: HarmonicWorldId;
  prompt: string;
  title: string;
  summary: string;
  safetyRule: string;
  scenes: AiDirectorV2Scene[];
  createdAt: number;
};

function worldObjectLabel(world: HarmonicWorldId) {
  if (world === 'schmackin') return 'neon sign, steam, menu, and city rain';
  if (world === 'fried-em') return 'scoreboard, court lights, crowd, and ball trail';
  if (world === 'harmonic') return 'fabric, runway lights, garment cards, and camera flashes';
  return 'visualizer, crystal memories, vault nodes, and constellations';
}

function scenePatch(type: AiV2SceneType, base: HarmonicEngineState): Partial<HarmonicEngineState> {
  const defaults: Record<AiV2SceneType, Partial<HarmonicEngineState>> = {
    hook: { emotion: 'hope', camera: 'slow-pan', lighting: 'golden-hour', fog: 22, bloom: 46, motionIntensity: 24, audioReactivity: 38 },
    build: { emotion: 'reflection', camera: 'dolly', fog: 44, bloom: 58, aura: 64, particleDensity: 54, audioReactivity: 58 },
    peak: { emotion: 'chaos', camera: 'shake', physics: 'impact-snap', fog: 78, bloom: 84, particleDensity: 88, motionIntensity: 94, audioReactivity: 90 },
    reveal: { emotion: 'victory', camera: 'orbit', lighting: 'spotlight', bloom: 92, aura: 88, crystalHeartIntensity: 94, motionIntensity: 64 },
    outro: { emotion: 'peace', camera: 'slow-pan', lighting: base.lighting, fog: 30, bloom: 52, particleDensity: 32, motionIntensity: 24 },
  };

  return defaults[type];
}

function makeEffect(scene: AiV2SceneType, world: HarmonicWorldId, category: AiDirectorV2Effect['category'], patch: Partial<HarmonicEngineState>, index: number): AiDirectorV2Effect {
  const labels = {
    camera: `${scene} camera move`,
    lighting: `${scene} lighting grade`,
    atmosphere: `${scene} atmosphere shift`,
    audio: `${scene} audio intensity`,
    objects: `${scene} object reaction`,
    ui: `${scene} interface pulse`,
  };

  return {
    id: `effect-${scene}-${category}-${index}`,
    label: labels[category],
    category,
    patch,
    reason: `Suggested for ${world.replace('-', ' ')} so the ${worldObjectLabel(world)} react to the ${scene} moment without going live until approved.`,
    status: 'pending',
  };
}

export function createAiDirectorV2Plan(world: HarmonicWorldId, currentState: HarmonicEngineState, prompt: string): AiDirectorV2Plan {
  const timeline = createDefaultDirectorTimeline();
  const types: AiV2SceneType[] = ['hook', 'build', 'peak', 'reveal', 'outro'];

  const scenes = types.map((type, index) => {
    const keyframe = timeline.keyframes[Math.min(index, timeline.keyframes.length - 1)] as DirectorTimelineKeyframe | undefined;
    const patch = scenePatch(type, currentState);
    const assistedPlan = createAiDirectorPlan(world, currentState, `${prompt} ${type}`, 'preview');
    const mergedPatch = { ...patch, ...assistedPlan.suggestions.reduce<Partial<HarmonicEngineState>>((acc, suggestion) => ({ ...acc, [suggestion.field]: suggestion.suggestedValue }), {}) };

    return {
      id: `scene-${type}-${Date.now()}-${index}`,
      type,
      time: keyframe?.time ?? index * 8,
      title: type === 'hook' ? 'Opening Hook' : type === 'build' ? 'Rising Build' : type === 'peak' ? 'Emotional Peak' : type === 'reveal' ? 'Verdict Reveal' : 'Outro Cooldown',
      description: `AI V2 cinematic scene for ${world.replace('-', ' ')} based on: ${prompt}`,
      confidence: Math.min(96, 72 + index * 5),
      status: 'pending' as AiV2ApprovalStatus,
      effects: [
        makeEffect(type, world, 'camera', pickPatch(mergedPatch, ['camera', 'motionIntensity']), index),
        makeEffect(type, world, 'lighting', pickPatch(mergedPatch, ['lighting', 'bloom', 'aura', 'crystalHeartIntensity']), index),
        makeEffect(type, world, 'atmosphere', pickPatch(mergedPatch, ['fog', 'particleDensity', 'physics']), index),
        makeEffect(type, world, 'audio', pickPatch(mergedPatch, ['audioReactivity']), index),
      ],
    };
  });

  return {
    id: `ai-v2-${Date.now()}`,
    world,
    prompt,
    title: 'AI Director V2 Cinematic Plan',
    summary: `Generated ${scenes.length} editable scenes. Nothing applies until selected scenes/effects are approved.`,
    safetyRule: 'Assistant-only: preview, edit, approve, then apply. No automatic live changes.',
    scenes,
    createdAt: Date.now(),
  };
}

function pickPatch(patch: Partial<HarmonicEngineState>, fields: Array<keyof HarmonicEngineState>) {
  return fields.reduce<Partial<HarmonicEngineState>>((acc, field) => {
    if (patch[field] === undefined) return acc;
    return { ...acc, [field]: patch[field] };
  }, {});
}

export function compileApprovedAiV2Patch(plan: AiDirectorV2Plan) {
  return plan.scenes.reduce<Partial<HarmonicEngineState>>((patch, scene) => {
    if (scene.status !== 'approved') return patch;
    const scenePatch = scene.effects.reduce<Partial<HarmonicEngineState>>((effectPatch, effect) => {
      if (effect.status === 'rejected') return effectPatch;
      return { ...effectPatch, ...effect.patch };
    }, {});
    return { ...patch, ...scenePatch };
  }, {});
}

export function getAiV2PreviewState(base: HarmonicEngineState, plan: AiDirectorV2Plan | null) {
  if (!plan) return base;
  return { ...base, ...compileApprovedAiV2Patch(plan) } as HarmonicEngineState;
}
