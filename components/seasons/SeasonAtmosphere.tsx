import { seasonDefaults, type SeasonKey } from '@/lib/harmonic-seasons';
import './SeasonAtmosphere.css';

type SeasonAtmosphereProps = {
  season?: SeasonKey;
  intensity?: number;
};

const leafCount = 18;

export function SeasonAtmosphere({ season = 'autumn', intensity = 1 }: SeasonAtmosphereProps) {
  const state = seasonDefaults[season];
  const showLeaves = state.leafDensity > 10;
  const showFrost = state.weather === 'first-frost' || state.weather === 'snow';

  return (
    <div
      className={`season-atmosphere season-${season} weather-${state.weather} time-${state.timeOfDay}`}
      aria-hidden="true"
      style={
        {
          '--season-glow': state.palette.glow,
          '--season-accent': state.palette.accent,
          '--season-shadow': state.palette.shadow,
          '--season-intensity': intensity,
          '--season-wind': `${Math.max(8, state.windIntensity / 3)}s`,
          '--season-leaf-opacity': state.leafDensity / 100,
        } as React.CSSProperties
      }
    >
      <div className="season-sky-wash" />
      <div className="season-harmonic-tree">
        <span>♜</span>
      </div>
      {showLeaves && (
        <div className="season-leaves">
          {Array.from({ length: leafCount }).map((_, index) => (
            <span
              key={index}
              className="season-leaf"
              style={{
                left: `${(index * 13) % 100}%`,
                animationDelay: `${index * -0.72}s`,
                animationDuration: `${8 + (index % 7)}s`,
              }}
            >
              🍂
            </span>
          ))}
        </div>
      )}
      {showFrost && <div className="season-frost" />}
      <div className="season-scent-ribbons" />
    </div>
  );
}
