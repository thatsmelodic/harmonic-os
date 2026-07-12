'use client';

import { useMemo } from 'react';
import { usePathname } from 'next/navigation';
import './living-world-environment.css';

type EnvironmentId = 'os' | 'melodic' | 'fried-em' | 'schmackinn' | 'two-harmonic' | 'business';

const profiles: Record<EnvironmentId, {
  label: string;
  className: string;
  atmosphere: string;
}> = {
  os: { label: 'Harmonic sky', className: 'environment-os', atmosphere: 'stars' },
  melodic: { label: 'Melodic night studio', className: 'environment-melodic', atmosphere: 'notes' },
  'fried-em': { label: 'Fried Em dawn blacktop', className: 'environment-fried-em', atmosphere: 'dust' },
  schmackinn: { label: 'Schmackinn rain district', className: 'environment-schmackinn', atmosphere: 'rain' },
  'two-harmonic': { label: '2 Harmonic desert fashion house', className: 'environment-two-harmonic', atmosphere: 'petals' },
  business: { label: 'Business skyline', className: 'environment-business', atmosphere: 'haze' },
};

function inferEnvironment(pathname: string): EnvironmentId {
  if (pathname.startsWith('/worlds/melodic') || pathname.startsWith('/studio/melodic')) return 'melodic';
  if (pathname.startsWith('/worlds/fried-em') || pathname.startsWith('/studio/fried-em')) return 'fried-em';
  if (pathname.startsWith('/worlds/schmackinn') || pathname.startsWith('/studio/schmackinn')) return 'schmackinn';
  if (pathname.startsWith('/worlds/2-harmonic') || pathname.startsWith('/worlds/two-harmonic') || pathname.startsWith('/studio/two-harmonic') || pathname.startsWith('/shop')) return 'two-harmonic';
  if (pathname.startsWith('/worlds/business') || pathname.startsWith('/investor')) return 'business';
  return 'os';
}

export function LivingWorldEnvironment() {
  const pathname = usePathname();
  const id = inferEnvironment(pathname);
  const profile = profiles[id];
  const particles = useMemo(() => Array.from({ length: 26 }, (_, index) => index), []);

  return (
    <div className={`living-world-environment ${profile.className}`} aria-label={profile.label} aria-hidden="true">
      <div className="living-sky" />
      <div className="living-horizon" />
      <div className="living-light living-light-one" />
      <div className="living-light living-light-two" />
      <div className={`living-atmosphere atmosphere-${profile.atmosphere}`}>
        {particles.map((particle) => <i key={particle} style={{ '--particle-index': particle } as React.CSSProperties} />)}
      </div>
      <div className="living-grain" />
      <div className="living-vignette" />
    </div>
  );
}
