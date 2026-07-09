import { mergeEngineState, type HarmonicEngineState } from '@/lib/harmonic-engine';
import { applyTriggeredRules } from '@/lib/harmonic-rules';

export type HarmonicSignalType =
  | 'WORLD_BOOTED'
  | 'VIBE_CONDUCTED'
  | 'EMOTION_CHANGED'
  | 'ENVIRONMENT_CHANGED'
  | 'LIGHTING_CHANGED'
  | 'CAMERA_CHANGED'
  | 'PHYSICS_CHANGED'
  | 'AUDIO_CHANGED'
  | 'OBJECTS_CHANGED'
  | 'TIMELINE_CHANGED'
  | 'RULES_APPLIED'
  | 'DNA_APPLIED'
  | 'WORLD_RENDERED';

export type HarmonicSignal = {
  id: string;
  type: HarmonicSignalType;
  source: string;
  target: string;
  message: string;
  at: number;
  patch?: Partial<HarmonicEngineState>;
};

export type HarmonicRuntimeSnapshot = {
  state: HarmonicEngineState;
  signals: HarmonicSignal[];
};

export function createSignal(type: HarmonicSignalType, source: string, target: string, message: string, patch?: Partial<HarmonicEngineState>): HarmonicSignal {
  return {
    id: `${type}-${Date.now()}-${Math.random().toString(16).slice(2)}`,
    type,
    source,
    target,
    message,
    at: Date.now(),
    patch,
  };
}

export function bootRuntime(state: HarmonicEngineState): HarmonicRuntimeSnapshot {
  return {
    state,
    signals: [
      createSignal('WORLD_BOOTED', 'kernel', 'signal-bus', `${state.world} runtime booted`),
      createSignal('DNA_APPLIED', 'frequency-dna', 'world-output', `${state.world} DNA applied to shared controls`),
      createSignal('WORLD_RENDERED', 'signal-bus', 'world-output', `${state.world} rendered through Harmonic Runtime`),
    ],
  };
}

export function dispatchSignal(snapshot: HarmonicRuntimeSnapshot, signal: HarmonicSignal): HarmonicRuntimeSnapshot {
  const nextState = signal.patch ? mergeEngineState(snapshot.state.world, { ...snapshot.state, ...signal.patch }) : snapshot.state;
  return {
    state: nextState,
    signals: [signal, ...snapshot.signals].slice(0, 18),
  };
}

export function signalFromPatch(source: string, patch: Partial<HarmonicEngineState>): HarmonicSignal {
  if (patch.emotion) return createSignal('EMOTION_CHANGED', source, 'emotion-node', `Emotion changed to ${patch.emotion}`, patch);
  if (patch.environment) return createSignal('ENVIRONMENT_CHANGED', source, 'environment-node', `Environment changed to ${patch.environment}`, patch);
  if (patch.lighting) return createSignal('LIGHTING_CHANGED', source, 'lighting-node', `Lighting changed to ${patch.lighting}`, patch);
  if (patch.camera) return createSignal('CAMERA_CHANGED', source, 'camera-node', `Camera changed to ${patch.camera}`, patch);
  if (patch.physics) return createSignal('PHYSICS_CHANGED', source, 'physics-node', `Physics changed to ${patch.physics}`, patch);
  if (patch.audioReactivity !== undefined) return createSignal('AUDIO_CHANGED', source, 'audio-node', `Audio reactivity changed to ${patch.audioReactivity}%`, patch);
  if (patch.objects) return createSignal('OBJECTS_CHANGED', source, 'objects-node', `Scene objects updated`, patch);

  return createSignal('VIBE_CONDUCTED', source, 'signal-bus', 'Runtime state updated', patch);
}

export function deriveRuntimeReaction(state: HarmonicEngineState, signal: HarmonicSignal): HarmonicSignal[] {
  const reactions: HarmonicSignal[] = [];

  if (signal.type === 'EMOTION_CHANGED') {
    reactions.push(createSignal('LIGHTING_CHANGED', 'emotion-node', 'lighting-node', `${state.emotion} emotion recalculated lighting as ${state.lighting}`));
    reactions.push(createSignal('CAMERA_CHANGED', 'emotion-node', 'camera-node', `${state.emotion} emotion recalculated camera as ${state.camera}`));
  }

  if (signal.type === 'ENVIRONMENT_CHANGED') {
    reactions.push(createSignal('PHYSICS_CHANGED', 'environment-node', 'physics-node', `${state.environment} environment recalculated physics as ${state.physics}`));
  }

  if (signal.type === 'VIBE_CONDUCTED') {
    reactions.push(createSignal('DNA_APPLIED', 'frequency-dna', 'signal-bus', `${state.world} DNA weighted the vibe translation`));
    reactions.push(createSignal('WORLD_RENDERED', 'signal-bus', 'world-output', 'World output regenerated from runtime signals'));
  }

  if (signal.type !== 'WORLD_RENDERED') {
    reactions.push(createSignal('WORLD_RENDERED', signal.target, 'world-output', 'World output refreshed'));
  }

  return reactions;
}

export function dispatchRuntimePatch(snapshot: HarmonicRuntimeSnapshot, source: string, patch: Partial<HarmonicEngineState>): HarmonicRuntimeSnapshot {
  const primary = signalFromPatch(source, patch);
  const afterPrimary = dispatchSignal(snapshot, primary);
  const ruleResult = applyTriggeredRules(afterPrimary.state, primary);
  const stateAfterRules = ruleResult.triggered.length
    ? mergeEngineState(afterPrimary.state.world, { ...afterPrimary.state, ...ruleResult.patch })
    : afterPrimary.state;

  const ruleSignal = ruleResult.triggered.length
    ? createSignal(
        'RULES_APPLIED',
        'rules-engine',
        'signal-bus',
        `${ruleResult.triggered.length} rule${ruleResult.triggered.length === 1 ? '' : 's'} applied: ${ruleResult.triggered.map((rule) => rule.label).join(', ')}`,
        ruleResult.patch
      )
    : null;

  const reactions = deriveRuntimeReaction(stateAfterRules, primary);

  return {
    state: stateAfterRules,
    signals: [
      ...reactions,
      ...(ruleSignal ? [ruleSignal] : []),
      primary,
      ...snapshot.signals,
    ].slice(0, 18),
  };
}
