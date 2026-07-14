'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import styles from './studio.module.css';
import { CREATOR_STUDIO_KEY, CreatorConfig, defaultCreatorConfig, loadCreatorConfig } from '../../lib/creatorStudio';

const fontOptions = [
  'Arial Black, Impact, sans-serif',
  'Arial, Helvetica, sans-serif',
  'Georgia, Times New Roman, serif',
  'Trebuchet MS, Arial, sans-serif',
  'Courier New, monospace',
];

export default function CreatorStudioPage() {
  const [config, setConfig] = useState<CreatorConfig>(defaultCreatorConfig);
  const [selectedWorld, setSelectedWorld] = useState(0);
  const [saved, setSaved] = useState(false);

  useEffect(() => setConfig(loadCreatorConfig()), []);
  const world = config.worlds[selectedWorld];

  const previewStyle = useMemo(() => ({
    '--preview-accent': config.accent,
    '--preview-bg': config.background,
    '--preview-surface': config.surface,
    '--preview-text': config.text,
    '--preview-heading': config.headingFont,
    '--preview-body': config.bodyFont,
  } as React.CSSProperties), [config]);

  const patch = <K extends keyof CreatorConfig>(key: K, value: CreatorConfig[K]) => {
    setConfig((current) => ({ ...current, [key]: value }));
    setSaved(false);
  };

  const patchWorld = (key: keyof typeof world, value: string | string[] | boolean) => {
    setConfig((current) => ({
      ...current,
      worlds: current.worlds.map((item, index) => index === selectedWorld ? { ...item, [key]: value } : item),
    }));
    setSaved(false);
  };

  const save = () => {
    localStorage.setItem(CREATOR_STUDIO_KEY, JSON.stringify(config));
    window.dispatchEvent(new Event('harmonic-creator-update'));
    setSaved(true);
  };

  const reset = () => {
    setConfig(defaultCreatorConfig);
    localStorage.removeItem(CREATOR_STUDIO_KEY);
    setSaved(false);
  };

  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <div><small>Harmonic OS</small><h1>Creator Studio</h1><p>Edit the homepage and see every change before saving.</p></div>
        <div className={styles.headerActions}><Link href="/">View Homepage</Link><button onClick={save}>{saved ? 'Saved' : 'Save Changes'}</button></div>
      </header>

      <section className={styles.workspace}>
        <aside className={styles.controls}>
          <details open><summary>Brand & Copy</summary>
            <label>Brand name<input value={config.brandName} onChange={(e) => patch('brandName', e.target.value)} /></label>
            <label>Eyebrow<input value={config.eyebrow} onChange={(e) => patch('eyebrow', e.target.value)} /></label>
            <label>Headline<input value={config.headline} onChange={(e) => patch('headline', e.target.value)} /></label>
            <label>Tagline<input value={config.tagline} onChange={(e) => patch('tagline', e.target.value)} /></label>
            <label>Overview title<input value={config.overviewTitle} onChange={(e) => patch('overviewTitle', e.target.value)} /></label>
            <label>Overview text<textarea value={config.overviewText} onChange={(e) => patch('overviewText', e.target.value)} /></label>
          </details>

          <details open><summary>Typography</summary>
            <label>Heading font<select value={config.headingFont} onChange={(e) => patch('headingFont', e.target.value)}>{fontOptions.map((font) => <option key={font}>{font}</option>)}</select></label>
            <label>Body font<select value={config.bodyFont} onChange={(e) => patch('bodyFont', e.target.value)}>{fontOptions.map((font) => <option key={font}>{font}</option>)}</select></label>
            <label>Heading scale <output>{config.headingScale.toFixed(2)}</output><input type="range" min="0.7" max="1.35" step="0.01" value={config.headingScale} onChange={(e) => patch('headingScale', Number(e.target.value))} /></label>
          </details>

          <details open><summary>Colors & Shape</summary>
            <div className={styles.colorGrid}>
              <label>Accent<input type="color" value={config.accent} onChange={(e) => patch('accent', e.target.value)} /></label>
              <label>Background<input type="color" value={config.background} onChange={(e) => patch('background', e.target.value)} /></label>
              <label>Surface<input type="color" value={config.surface} onChange={(e) => patch('surface', e.target.value)} /></label>
              <label>Text<input type="color" value={config.text} onChange={(e) => patch('text', e.target.value)} /></label>
            </div>
            <label>Card radius <output>{config.cardRadius}px</output><input type="range" min="0" max="36" value={config.cardRadius} onChange={(e) => patch('cardRadius', Number(e.target.value))} /></label>
            <label>Glow strength <output>{config.glowStrength.toFixed(1)}</output><input type="range" min="0" max="2" step="0.1" value={config.glowStrength} onChange={(e) => patch('glowStrength', Number(e.target.value))} /></label>
          </details>

          <details open><summary>Weather Widget</summary>
            <label className={styles.toggle}><input type="checkbox" checked={config.showWeather} onChange={(e) => patch('showWeather', e.target.checked)} /> Show weather/status widget</label>
            <label>Icon<input value={config.weatherIcon} onChange={(e) => patch('weatherIcon', e.target.value)} /></label>
            <label>Location/label<input value={config.weatherLabel} onChange={(e) => patch('weatherLabel', e.target.value)} /></label>
            <label>Value<input value={config.weatherValue} onChange={(e) => patch('weatherValue', e.target.value)} /></label>
          </details>

          <details open><summary>World Icons & Content</summary>
            <div className={styles.worldTabs}>{config.worlds.map((item, index) => <button className={index === selectedWorld ? styles.activeTab : ''} key={item.id} onClick={() => setSelectedWorld(index)}>{item.name}</button>)}</div>
            <label className={styles.toggle}><input type="checkbox" checked={world.visible} onChange={(e) => patchWorld('visible', e.target.checked)} /> Visible</label>
            <label>Prompt<input value={world.prompt} onChange={(e) => patchWorld('prompt', e.target.value)} /></label>
            <label>Name<input value={world.name} onChange={(e) => patchWorld('name', e.target.value)} /></label>
            <label>Frequency<input value={world.frequency} onChange={(e) => patchWorld('frequency', e.target.value)} /></label>
            <label>Icon or emoji<input value={world.icon} onChange={(e) => patchWorld('icon', e.target.value)} /></label>
            <label>World color<input type="color" value={world.color} onChange={(e) => patchWorld('color', e.target.value)} /></label>
            <label>Summary<textarea value={world.summary} onChange={(e) => patchWorld('summary', e.target.value)} /></label>
            <label>Dropdown items<textarea value={world.items.join('\n')} onChange={(e) => patchWorld('items', e.target.value.split('\n').filter(Boolean))} /></label>
            <label>Destination route<input value={world.href} onChange={(e) => patchWorld('href', e.target.value)} /></label>
          </details>

          <details><summary>Community & Footer</summary>
            <label>Community title<input value={config.communityTitle} onChange={(e) => patch('communityTitle', e.target.value)} /></label>
            <label>Community text<input value={config.communityText} onChange={(e) => patch('communityText', e.target.value)} /></label>
            <label>Footer left<input value={config.footerLeft} onChange={(e) => patch('footerLeft', e.target.value)} /></label>
            <label>Footer right<input value={config.footerRight} onChange={(e) => patch('footerRight', e.target.value)} /></label>
          </details>

          <div className={styles.bottomActions}><button onClick={reset}>Reset Defaults</button><button onClick={save}>{saved ? 'Saved' : 'Save Changes'}</button></div>
        </aside>

        <section className={styles.preview} style={previewStyle}>
          <div className={styles.previewBar}><span>Live Homepage Preview</span><strong>{config.weatherIcon} {config.weatherValue}</strong></div>
          <div className={styles.previewCanvas}>
            <small>{config.eyebrow}</small>
            <h2 style={{ transform: `scale(${config.headingScale})`, transformOrigin: 'left center' }}>{config.headline}</h2>
            <p>{config.tagline}</p>
            <div className={styles.previewCards}>{config.worlds.filter((item) => item.visible).map((item) => <article key={item.id} style={{ borderColor: item.color, borderRadius: config.cardRadius }}><span style={{ color: item.color }}>{item.icon}</span><strong>{item.name}</strong><small>{item.frequency}</small></article>)}</div>
          </div>
        </section>
      </section>
    </main>
  );
}
