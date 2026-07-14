'use client';

import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './homepage.module.css';
import './homepage-media.css';
import { CreatorConfig, defaultCreatorConfig, loadCreatorConfig } from '../lib/creatorStudio';

export default function HomeExperience() {
  const router = useRouter();
  const [openWorld, setOpenWorld] = useState<string | null>(null);
  const [config, setConfig] = useState<CreatorConfig>(defaultCreatorConfig);

  useEffect(() => {
    const sync = () => setConfig(loadCreatorConfig());
    sync();
    window.addEventListener('storage', sync);
    window.addEventListener('harmonic-creator-update', sync);
    return () => { window.removeEventListener('storage', sync); window.removeEventListener('harmonic-creator-update', sync); };
  }, []);

  const worlds = useMemo(() => config.worlds.filter((world) => world.visible), [config.worlds]);
  const active = worlds.find((world) => world.id === openWorld) ?? null;
  const theme = {
    '--accent': config.accent, '--page-bg': config.background, '--surface': config.surface, '--page-text': config.text,
    '--heading-font': config.headingFont, '--body-font': config.bodyFont, '--heading-scale': String(config.headingScale),
    '--card-radius': `${config.cardRadius}px`, '--glow-strength': String(config.glowStrength), '--background-overlay': String(config.backgroundOverlay),
  } as React.CSSProperties;

  return (
    <main className={styles.page} style={theme}>
      {config.backgroundMedia && config.backgroundMediaKind === 'video' && <video className="managed-home-bg" src={config.backgroundMedia} autoPlay loop muted playsInline />}
      {config.backgroundMedia && config.backgroundMediaKind !== 'video' && <img className="managed-home-bg" src={config.backgroundMedia} alt="" />}
      {config.backgroundMedia && <div className="managed-home-overlay" aria-hidden="true" />}
      <div className={styles.noise} aria-hidden="true" />
      <header className={styles.topbar}>
        <button className={styles.brand} type="button" onClick={() => setOpenWorld(null)}>
          {config.logoMedia ? <img className="managed-brand-image" src={config.logoMedia} alt="" /> : <span className={styles.brandMark}>∞</span>}<span>{config.brandName}</span>
        </button>
        <nav className={styles.nav} aria-label="Primary navigation"><button type="button" onClick={() => setOpenWorld(null)}>Home</button><a href="#worlds">Worlds</a><a href="#overview">About</a><a href="#community">Community</a><a href="/worlds/two-harmonic">Shop</a></nav>
        <div className={styles.statusArea}>{config.showWeather && <div className={styles.weather}><span>{config.weatherIcon}</span><div><strong>{config.weatherValue}</strong><small>{config.weatherLabel}</small></div></div>}<a className={styles.studioLink} href="/creator-studio">Creator Studio</a>{config.logoMedia ? <img className="managed-nav-logo-image" src={config.logoMedia} alt="" /> : <span className={styles.navLogo}>∞</span>}</div>
      </header>

      <section className={styles.hero}><div><p className={styles.eyebrow}>{config.eyebrow}</p><h1>{config.headline}</h1><p className={styles.tagline}>{config.tagline}</p></div>{config.logoMedia ? <img className="managed-hero-logo-image" src={config.logoMedia} alt="" /> : <div className={styles.heroLogo} aria-hidden="true">∞</div>}</section>
      <section className={styles.overview} id="overview"><span>{config.overviewTitle}</span><p>{config.overviewText}</p></section>
      <section className={styles.sourceFlow}><button className={styles.sourceCard} type="button" onClick={() => setOpenWorld(null)}>{config.sourceMedia ? <img className="managed-source-image" src={config.sourceMedia} alt="" /> : <span className={styles.crown}>♛</span>}<strong>{config.sourceName}</strong><small>{config.sourceSubtitle}</small><p>{config.sourceDescription}</p></button><span className={styles.flowLine} aria-hidden="true" /></section>

      <section className={styles.worldSection} id="worlds">
        <div className={styles.worldGrid} style={{ '--world-count': worlds.length } as React.CSSProperties}>
          {worlds.map((world) => { const isOpen = openWorld === world.id; return <button key={world.id} type="button" className={`${styles.worldCard} ${isOpen ? styles.worldCardOpen : ''}`} style={{ '--world-color': world.color } as React.CSSProperties} aria-expanded={isOpen} onClick={() => setOpenWorld(isOpen ? null : world.id)}><span className={styles.worldPrompt}>{world.prompt}</span>{world.iconMedia ? <img className="managed-world-icon-image" src={world.iconMedia} alt="" /> : <span className={styles.worldIcon}>{world.icon}</span>}<span className={styles.worldName}>{world.name}</span><span className={styles.worldFrequency}>{world.frequency}</span><span className={styles.expandLabel}>{isOpen ? 'Close frequency' : 'Open frequency'}</span></button>; })}
        </div>
        <div className={`${styles.dropdown} ${active ? styles.dropdownOpen : ''}`} aria-live="polite">{active && <div className={styles.dropdownInner} style={{ '--world-color': active.color } as React.CSSProperties}><div className={styles.dropdownLead}>{active.iconMedia ? <img className="managed-dropdown-icon-image" src={active.iconMedia} alt="" /> : <span className={styles.dropdownIcon}>{active.icon}</span>}<div><small>{active.frequency}</small><h2>{active.name}</h2></div></div><p>{active.summary}</p><ul>{active.items.map((item) => <li key={item}>{item}</li>)}</ul><button type="button" onClick={() => router.push(active.href)}>Enter {active.name}</button></div>}</div>
      </section>

      <section className={styles.community} id="community"><span className={styles.communityIcon}>♙♙♙</span><div><h2>{config.communityTitle}</h2><p>{config.communityText}</p></div><div className={styles.communityLinks}><span>Engage</span><i /><span>Support</span><i /><span>Create</span><i /><span>Elevate</span></div></section>
      <footer className={styles.footer}><span>{config.footerLeft}</span><div className={styles.wave}>⌁⌁⌁⌁⌁</div><span>{config.footerRight}</span></footer>
    </main>
  );
}