'use client';

import type { HeartMaterial, HeartMaterialPreset } from './types';
import styles from './UniverseExperience.module.css';

type Props = {
  material: HeartMaterial;
  presets: HeartMaterialPreset[];
  onMaterialChange: (material: HeartMaterial) => void;
};

export function HeartMaterialControls({ material, presets, onMaterialChange }: Props) {
  return (
    <aside className={styles.controlPanel} aria-label="Heart material controls">
      <div>
        <p className={styles.panelKicker}>Heart material lab</p>
        <h2>Official core identity</h2>
        <p>The visitor-facing controls update the heart material immediately without changing Creator Studio brand settings.</p>
      </div>
      <div className={styles.presetGrid}>
        {presets.map((preset) => (
          <button key={preset.name} type="button" onClick={() => onMaterialChange({ primary: preset.primary, secondary: preset.secondary })}>
            <span style={{ background: `linear-gradient(135deg, ${preset.primary}, ${preset.secondary})` }} />
            {preset.name}
          </button>
        ))}
      </div>
      <div className={styles.colorInputs}>
        <label>Primary<input type="color" value={material.primary} onChange={(event) => onMaterialChange({ ...material, primary: event.target.value })} /></label>
        <label>Highlight<input type="color" value={material.secondary} onChange={(event) => onMaterialChange({ ...material, secondary: event.target.value })} /></label>
      </div>
    </aside>
  );
}
