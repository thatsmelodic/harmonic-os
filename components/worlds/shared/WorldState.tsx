import { GlowPanel } from './GlowPanel';
import { WorldActionButton } from './WorldActionButton';

type Props = {
  title: string;
  copy: string;
  actionLabel?: string;
  actionHref?: string;
  tone?: 'loading' | 'empty' | 'error';
};

export function WorldState({ title, copy, actionLabel, actionHref, tone = 'empty' }: Props) {
  return (
    <GlowPanel className={`cinematic-world-state cinematic-world-state--${tone}`}>
      <span className="cinematic-world-state__orb" />
      <h3>{title}</h3>
      <p>{copy}</p>
      {actionLabel && actionHref && <WorldActionButton href={actionHref} variant="secondary">{actionLabel}</WorldActionButton>}
    </GlowPanel>
  );
}
