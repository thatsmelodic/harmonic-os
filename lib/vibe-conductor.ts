import { type MelodicVisualSettings, melodicVisualDefaults } from '@/lib/melodic-visuals';

export type VibeConductorResult = {
  name: string;
  description: string;
  ambience: string;
  cursor: string;
  transition: string;
  tempo: number;
  ambientAudio: boolean;
  visualSettings: MelodicVisualSettings;
};

const presets: Record<string, VibeConductorResult> = {
  pain: {
    name: 'Purple Pain Memory',
    description: 'Dark, emotional, slow-moving, like the room is remembering what happened.',
    ambience: 'Purple Rain',
    cursor: 'Echo Ripple',
    transition: 'Fade on Beat',
    tempo: 72,
    ambientAudio: true,
    visualSettings: {
      ...melodicVisualDefaults,
      visualizerStyle: 'Bubbles',
      visualizerSize: 'Large',
      particleShape: 'Heart',
      particleDensity: 52,
      particleSpeed: 28,
      glowIntensity: 64,
      waveThickness: 62,
      orbCount: 10,
      motionStrength: 34,
      cardBlur: 30,
    },
  },
  luxury: {
    name: 'Luxury Studio Glow',
    description: 'Clean, expensive, cinematic, like a private studio with purple glass and gold light.',
    ambience: 'Nebula Studio',
    cursor: 'Crystal Pulse',
    transition: 'Frequency Shift',
    tempo: 92,
    ambientAudio: true,
    visualSettings: {
      ...melodicVisualDefaults,
      visualizerStyle: 'Logo Pulse',
      visualizerSize: 'Large',
      particleShape: 'Logo',
      particleDensity: 68,
      particleSpeed: 42,
      glowIntensity: 92,
      waveThickness: 42,
      orbCount: 14,
      motionStrength: 58,
      cardBlur: 34,
    },
  },
  trap: {
    name: 'Trap Motion Frequency',
    description: 'Fast, aggressive, bright pulses, like the whole room is jumping with the 808.',
    ambience: 'Late Night Room',
    cursor: 'Wave Trail',
    transition: 'Tape Rewind',
    tempo: 156,
    ambientAudio: true,
    visualSettings: {
      ...melodicVisualDefaults,
      visualizerStyle: 'Bars',
      visualizerSize: 'Full Width',
      particleShape: 'Circle',
      particleDensity: 100,
      particleSpeed: 96,
      glowIntensity: 100,
      waveThickness: 22,
      orbCount: 24,
      motionStrength: 100,
      cardBlur: 14,
    },
  },
  heaven: {
    name: 'Heavenly Lift Frequency',
    description: 'Soft, uplifting, glowing, like the sound is opening the ceiling.',
    ambience: 'Memory Archive',
    cursor: 'Floating Notes',
    transition: 'Ripple Dissolve',
    tempo: 84,
    ambientAudio: true,
    visualSettings: {
      ...melodicVisualDefaults,
      visualizerStyle: 'Image Particles',
      visualizerSize: 'Large',
      particleShape: 'Custom Image',
      particleDensity: 74,
      particleSpeed: 36,
      glowIntensity: 88,
      waveThickness: 70,
      orbCount: 18,
      motionStrength: 48,
      cardBlur: 28,
    },
  },
};

export function conductMelodicVibe(input: string): VibeConductorResult {
  const vibe = input.toLowerCase();

  if (vibe.includes('pain') || vibe.includes('sad') || vibe.includes('heartbreak') || vibe.includes('dark')) return presets.pain;
  if (vibe.includes('luxury') || vibe.includes('expensive') || vibe.includes('clean') || vibe.includes('cinematic')) return presets.luxury;
  if (vibe.includes('trap') || vibe.includes('hard') || vibe.includes('aggressive') || vibe.includes('808') || vibe.includes('motion')) return presets.trap;
  if (vibe.includes('heaven') || vibe.includes('uplift') || vibe.includes('angel') || vibe.includes('light') || vibe.includes('spiritual')) return presets.heaven;

  return {
    name: 'Custom Melodic Translation',
    description: 'A balanced Melodic setting created from your vibe prompt. Full AI interpretation comes after the API layer is connected.',
    ambience: 'Nebula Studio',
    cursor: 'Echo Ripple',
    transition: 'Frequency Shift',
    tempo: 96,
    ambientAudio: true,
    visualSettings: melodicVisualDefaults,
  };
}
