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

export const visualizerStyles: VisualizerStyle[] = ['Bars', 'Bubbles', 'Logo Pulse', 'Image Particles'];
export const visualizerSizes: VisualizerSize[] = ['Small', 'Medium', 'Large', 'Full Width'];
export const particleShapes: ParticleShape[] = ['Circle', 'Heart', 'Logo', 'Custom Image'];

export const sizeClasses: Record<VisualizerSize, string> = {
  Small: 'h-24',
  Medium: 'h-40',
  Large: 'h-56',
  'Full Width': 'h-72',
};
