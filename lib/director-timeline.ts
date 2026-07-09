import type { CameraMode, EmotionKey, HarmonicEngineState, LightingMode, PhysicsMode } from '@/lib/harmonic-engine';

export type TimelineTrack = 'emotion' | 'camera' | 'lighting' | 'weather' | 'audio' | 'particles' | 'objects' | 'event';

export type DirectorTimelineKeyframe = {
  id: string;
  time: number;
  label: string;
  track: TimelineTrack;
  patch: Partial<HarmonicEngineState>;
  description: string;
  approved: boolean;
};

export type DirectorTimeline = {
  id: string;
  title: string;
  duration: number;
  keyframes: DirectorTimelineKeyframe[];
};

export function createDefaultDirectorTimeline(): DirectorTimeline {
  return {
    id: `timeline-${Date.now()}`,
    title: 'Upload Emotional Arc',
    duration: 40,
    keyframes: [
      {
        id: 'kf-calm-open',
        time: 0,
        label: 'Open Warm',
        track: 'emotion',
        patch: { emotion: 'peace', lighting: 'restaurant-warmth', camera: 'slow-pan', fog: 24, bloom: 48, motionIntensity: 24 },
        description: 'Start soft and welcoming before the content starts moving.',
        approved: true,
      },
      {
        id: 'kf-build',
        time: 10,
        label: 'Build Curiosity',
        track: 'camera',
        patch: { emotion: 'reflection', camera: 'dolly', fog: 42, aura: 62, particleDensity: 48, audioReactivity: 55 },
        description: 'Push the camera and atmosphere forward as anticipation rises.',
        approved: true,
      },
      {
        id: 'kf-chaos',
        time: 24,
        label: 'Chaos Peak',
        track: 'event',
        patch: { emotion: 'chaos', camera: 'shake', physics: 'impact-snap', fog: 76, bloom: 82, particleDensity: 88, motionIntensity: 92, audioReactivity: 88 },
        description: 'The moment where the world reacts loudest.',
        approved: true,
      },
      {
        id: 'kf-reveal',
        time: 34,
        label: 'Verdict Reveal',
        track: 'lighting',
        patch: { emotion: 'victory', camera: 'orbit', lighting: 'spotlight', bloom: 90, aura: 88, crystalHeartIntensity: 92, motionIntensity: 60 },
        description: 'Reveal the final feeling with a bigger cinematic finish.',
        approved: true,
      },
    ],
  };
}

export function getKeyframePreviewState(base: HarmonicEngineState, keyframe: DirectorTimelineKeyframe): HarmonicEngineState {
  return { ...base, ...keyframe.patch } as HarmonicEngineState;
}

export function updateKeyframePatch(keyframe: DirectorTimelineKeyframe, field: keyof HarmonicEngineState, value: string | number): DirectorTimelineKeyframe {
  return {
    ...keyframe,
    patch: {
      ...keyframe.patch,
      [field]: normalizeTimelineValue(field, value),
    },
  };
}

export function normalizeTimelineValue(field: keyof HarmonicEngineState, value: string | number) {
  const numericFields: Array<keyof HarmonicEngineState> = ['fog', 'bloom', 'aura', 'particleDensity', 'motionIntensity', 'grain', 'crystalHeartIntensity', 'audioReactivity', 'sectionDepth'];
  if (numericFields.includes(field)) return Math.max(0, Math.min(100, Number(value) || 0));
  return value as EmotionKey | CameraMode | LightingMode | PhysicsMode;
}

export function timelineSummary(timeline: DirectorTimeline) {
  const approvedCount = timeline.keyframes.filter((keyframe) => keyframe.approved).length;
  return `${approvedCount}/${timeline.keyframes.length} approved keyframes across ${timeline.duration}s`;
}
