'use client';

import { getSeasonWorldSignal, seasonDefaults, type SeasonKey } from '@/lib/harmonic-seasons';
import { type HarmonicWorldId } from '@/lib/harmonic-engine';
import { useSeason } from '@/components/seasons/SeasonProvider';
import './SeasonalWorldLayer.css';

type SeasonalWorldLayerProps = {
  world: HarmonicWorldId;
  season?: SeasonKey;
};

const leafCount = 18;

export function SeasonalWorldLayer({ world, season }: SeasonalWorldLayerProps) {
  const seasonContext = useSeason();
  const seasonState = season ? seasonDefaults[season] : seasonContext.season;
  const signal = getSeasonWorldSignal(seasonState, world);
  const activeLeafCount = Math.max(4, Math.round((seasonState.leafDensity / 100) * leafCount));

  return (
    <div className={`seasonal-world-layer season-${seasonState.season} weather-${seasonState.weather} holiday-${seasonState.holiday}`} aria-hidden="true">
      <div className="seasonal-sky" />
      <div className="seasonal-tree-beacon" style={{ opacity: 0.35 + seasonState.harmonicTreeGlow / 155 }}>
        <div className="seasonal-tree-symbol">♜</div>
        <div className="seasonal-tree-pulse" />
      </div>
      {seasonState.season === 'autumn' && (
        <div className="autumn-leaf-field">
          {Array.from({ length: activeLeafCount }).map((_, index) => (
            <span
              key={index}
              className="autumn-leaf"
              style={{
                left: `${(index * 13) % 100}%`,
                animationDelay: `${index * 340}ms`,
                animationDuration: `${Math.max(4, 11 - seasonState.windIntensity / 20) + (index % 7)}s`,
                opacity: 0.28 + (index % 5) * 0.1,
              }}
            >
              {index % 3 === 0 ? '🍂' : index % 3 === 1 ? '🍁' : '✦'}
            </span>
          ))}
        </div>
      )}
      <div className="seasonal-world-signal">
        <p>{seasonState.name}</p>
        <span>{signal}</span>
      </div>
    </div>
  );
}
