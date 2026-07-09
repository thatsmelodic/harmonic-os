import { getSeasonWorldSignal, seasonDefaults, type SeasonKey } from '@/lib/harmonic-seasons';
import { type HarmonicWorldId } from '@/lib/harmonic-engine';
import './SeasonalWorldLayer.css';

type SeasonalWorldLayerProps = {
  world: HarmonicWorldId;
  season?: SeasonKey;
};

const leafCount = 18;

export function SeasonalWorldLayer({ world, season = 'autumn' }: SeasonalWorldLayerProps) {
  const seasonState = seasonDefaults[season];
  const signal = getSeasonWorldSignal(seasonState, world);

  return (
    <div className={`seasonal-world-layer season-${seasonState.season}`} aria-hidden="true">
      <div className="seasonal-sky" />
      <div className="seasonal-tree-beacon">
        <div className="seasonal-tree-symbol">♜</div>
        <div className="seasonal-tree-pulse" />
      </div>
      {seasonState.season === 'autumn' && (
        <div className="autumn-leaf-field">
          {Array.from({ length: leafCount }).map((_, index) => (
            <span
              key={index}
              className="autumn-leaf"
              style={{
                left: `${(index * 13) % 100}%`,
                animationDelay: `${index * 340}ms`,
                animationDuration: `${7 + (index % 7)}s`,
                opacity: 0.38 + (index % 5) * 0.1,
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
