import type { ElementType, ReactNode } from 'react';

type Props = {
  as?: ElementType;
  children: ReactNode;
  className?: string;
  intensity?: 'subtle' | 'standard' | 'hero';
  interactive?: boolean;
};

export function GlowPanel({ as: Component = 'section', children, className = '', intensity = 'standard', interactive = false }: Props) {
  return (
    <Component className={`cinematic-glow-panel cinematic-glow-panel--${intensity} ${interactive ? 'cinematic-glow-panel--interactive' : ''} ${className}`}>
      {children}
    </Component>
  );
}
