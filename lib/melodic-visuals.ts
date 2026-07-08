export type VisualizerStyle = 'Bars' | 'Bubbles' | 'Logo Pulse' | 'Image Particles';
export type VisualizerSize = 'Small' | 'Medium' | 'Large' | 'Full Width';
export type ParticleShape = 'Circle' | 'Heart' | 'Logo' | 'Custom Image';

export type MelodicVisualSettings = {
  visualizerStyle: VisualizerStyle;
  visualizerSize: VisualizerSize;
  particleShape: ParticleShape;
  particleDensity: number;
  particleSpeed: number;
  glowIntensity: number;
  waveThickness: number;
  orbCount: number;
  motionStrength: number;
  cardBlur: number;
  logoUrl: string;
  customImageUrl: string;
};

export type MelodicWorldVisualState = {
  vibeName: string;
  vibePrompt: string;
  vibeDescription: string;
  ambience: string;
  cursor: string;
  transition: string;
  tempo: number;
  ambientAudio: boolean;
  visualSettings: MelodicVisualSettings;
};

export const melodicVisualDefaults: MelodicVisualSettings = {
  visualizerStyle: 'Bubbles',
  visualizerSize: 'Large',
  particleShape: 'Heart',
  particleDensity: 78,
  particleSpeed: 58,
  glowIntensity: 82,
  waveThickness: 48,
  orbCount: 16,
  motionStrength: 72,
  cardBlur: 22,
  logoUrl: '',
  customImageUrl: '',
};

export const melodicWorldVisualDefaults: MelodicWorldVisualState = {
  vibeName: 'Default Melodic Frequency',
  vibePrompt: 'purple memory, healing light, emotional music world',
  vibeDescription: 'The default saved visual state for the Melodic world.',
  ambience: 'Nebula Studio',
  cursor: 'Echo Ripple',
  transition: 'Frequency Shift',
  tempo: 80,
  ambientAudio: true,
  visualSettings: melodicVisualDefaults,
};

export const visualizerStyles: VisualizerStyle[] = ['Bars', 'Bubbles', 'Logo Pulse', 'Image Particles'];
export const visualizerSizes: VisualizerSize[] = ['Small', 'Medium', 'Large', 'Full Width'];
export const particleShapes: ParticleShape[] = ['Circle', 'Heart', 'Logo', 'Custom Image'];

export const sizeClasses: Record<VisualizerSize, string> = {
  Small: 'h-24',
  Medium: 'h-40',
  Large: 'h-56',
  'Full Width': 'h-72',
};

export function normalizeMelodicVisualSettings(settings: Partial<MelodicVisualSettings> | null | undefined): MelodicVisualSettings {
  return {
    ...melodicVisualDefaults,
    ...(settings ?? {}),
  };
}

export function normalizeMelodicWorldVisualState(row: any): MelodicWorldVisualState {
  if (!row) return melodicWorldVisualDefaults;

  return {
    vibeName: row.vibe_name ?? melodicWorldVisualDefaults.vibeName,
    vibePrompt: row.vibe_prompt ?? melodicWorldVisualDefaults.vibePrompt,
    vibeDescription: row.vibe_description ?? melodicWorldVisualDefaults.vibeDescription,
    ambience: row.ambience ?? melodicWorldVisualDefaults.ambience,
    cursor: row.cursor_effect ?? melodicWorldVisualDefaults.cursor,
    transition: row.transition_style ?? melodicWorldVisualDefaults.transition,
    tempo: row.tempo ?? melodicWorldVisualDefaults.tempo,
    ambientAudio: row.ambient_audio ?? melodicWorldVisualDefaults.ambientAudio,
    visualSettings: normalizeMelodicVisualSettings(row.visual_settings),
  };
}
