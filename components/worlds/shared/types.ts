import type { CSSProperties, ReactNode } from 'react';

export type WorldTone = {
  id: string;
  name: string;
  href?: string;
  eyebrow?: string;
  primary: string;
  secondary: string;
  accent: string;
  background?: string;
  surface?: string;
  text?: string;
  muted?: string;
  glow?: string;
};

export type PolymorphicChildren = {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
};
