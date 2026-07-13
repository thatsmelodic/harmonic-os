export type UniverseWorld = {
  id: string;
  name: string;
  frequency: string;
  href: string;
  description: string;
  color: string;
  accent: string;
  orbit: number;
  delay: string;
  glyph: string;
};

export type HeartMaterialPreset = {
  name: string;
  primary: string;
  secondary: string;
};

export type HeartMaterial = {
  primary: string;
  secondary: string;
};

export type CameraState = {
  x: number;
  y: number;
  z: number;
};
