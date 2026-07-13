import type { CSSProperties, ReactNode } from 'react';
import type { WorldTone } from './types';

type Props = {
  tone: WorldTone;
  children: ReactNode;
  className?: string;
  atmosphere?: 'quiet' | 'editorial' | 'immersive';
  texture?: boolean;
};

export function CinematicWorldShell({ tone, children, className = '', atmosphere = 'immersive', texture = true }: Props) {
  const style = {
    '--cinematic-primary': tone.primary,
    '--cinematic-secondary': tone.secondary,
    '--cinematic-accent': tone.accent,
    '--cinematic-background': tone.background ?? '#050507',
    '--cinematic-surface': tone.surface ?? 'rgba(255,255,255,.055)',
    '--cinematic-text': tone.text ?? '#fffaf0',
    '--cinematic-muted': tone.muted ?? 'rgba(255,255,255,.62)',
    '--cinematic-glow': tone.glow ?? tone.primary,
  } as CSSProperties;

  return (
    <main className={`cinematic-world-shell cinematic-world-shell--${atmosphere} ${texture ? 'cinematic-world-shell--texture' : ''} ${className}`} style={style} data-world-shell>
      <div className="cinematic-world-shell__light cinematic-world-shell__light--primary" />
      <div className="cinematic-world-shell__light cinematic-world-shell__light--secondary" />
      <div className="cinematic-world-shell__grid" />
      {children}
    </main>
  );
}
