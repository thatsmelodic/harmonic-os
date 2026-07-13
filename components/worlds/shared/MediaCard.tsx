import type { ReactNode } from 'react';
import { GlowPanel } from './GlowPanel';

type Props = {
  eyebrow?: string;
  title: string;
  copy?: string;
  meta?: string;
  media?: ReactNode;
  action?: ReactNode;
  className?: string;
};

export function MediaCard({ eyebrow, title, copy, meta, media, action, className = '' }: Props) {
  return (
    <GlowPanel as="article" interactive className={`cinematic-media-card ${className}`}>
      {media && <div className="cinematic-media-card__media">{media}</div>}
      <div className="cinematic-media-card__body">
        {eyebrow && <p className="cinematic-eyebrow">{eyebrow}</p>}
        <h3>{title}</h3>
        {copy && <p>{copy}</p>}
        <div className="cinematic-media-card__footer">
          {meta && <span>{meta}</span>}
          {action}
        </div>
      </div>
    </GlowPanel>
  );
}
