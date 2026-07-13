import Link from 'next/link';
import type { ReactNode } from 'react';
import type { WorldTone } from './types';

type NavItem = { href: string; label: string };

type Props = {
  tone: WorldTone;
  items?: NavItem[];
  actions?: ReactNode;
  className?: string;
};

export function WorldNav({ tone, items = [], actions, className = '' }: Props) {
  return (
    <nav className={`cinematic-world-nav ${className}`} aria-label={`${tone.name} navigation`}>
      <Link href="/" className="cinematic-world-nav__brand">
        <span className="cinematic-world-nav__mark" style={{ background: `radial-gradient(circle, ${tone.primary}, ${tone.secondary})` }} />
        <span>
          <strong>{tone.name}</strong>
          <small>{tone.eyebrow ?? 'Harmonic OS Frequency'}</small>
        </span>
      </Link>
      {items.length > 0 && <div className="cinematic-world-nav__links">{items.map((item) => <Link key={item.href} href={item.href}>{item.label}</Link>)}</div>}
      {actions && <div className="cinematic-world-nav__actions">{actions}</div>}
    </nav>
  );
}
