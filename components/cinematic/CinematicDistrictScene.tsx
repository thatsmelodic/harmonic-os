'use client';

import Link from 'next/link';
import { useEffect, useMemo, useRef, useState } from 'react';
import { districtOrder, districtScenes, type DistrictId } from '@/data/cinematic-districts';
import { WebGLDistrictCanvas } from './WebGLDistrictCanvas';
import styles from './CinematicDistrictScene.module.css';

type Props = {
  district?: DistrictId;
  compact?: boolean;
  showDistrictRail?: boolean;
};

export function CinematicDistrictScene({ district = 'universe', compact = false, showDistrictRail = true }: Props) {
  const scene = districtScenes[district];
  const rootRef = useRef<HTMLElement | null>(null);
  const [loaded, setLoaded] = useState(false);
  const [camera, setCamera] = useState({ x: 0, y: 0 });
  const [activeLandmark, setActiveLandmark] = useState(0);
  const [soundOn, setSoundOn] = useState(false);
  const [quality, setQuality] = useState<'cinematic' | 'performance'>('cinematic');
  const [webglEnabled, setWebglEnabled] = useState(true);
  const audioRef = useRef<AudioContext | null>(null);

  const buildings = useMemo(() => Array.from({ length: compact ? 14 : 24 }, (_, index) => ({
    index,
    height: 24 + ((index * 37) % 54),
    width: 5 + ((index * 13) % 8),
    depth: 18 + ((index * 19) % 48),
    offset: ((index * 17) % 96) - 48,
  })), [compact]);

  useEffect(() => {
    const timer = window.setTimeout(() => setLoaded(true), 180);
    try {
      const canvas = document.createElement('canvas');
      const context = canvas.getContext('webgl2') || canvas.getContext('webgl');
      setWebglEnabled(Boolean(context));
    } catch {
      setWebglEnabled(false);
    }
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    const element = rootRef.current;
    if (!element) return;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) return;

    const onPointerMove = (event: PointerEvent) => {
      const bounds = element.getBoundingClientRect();
      const x = ((event.clientX - bounds.left) / bounds.width - 0.5) * 2;
      const y = ((event.clientY - bounds.top) / bounds.height - 0.5) * 2;
      setCamera({ x, y });
    };
    const onPointerLeave = () => setCamera({ x: 0, y: 0 });
    element.addEventListener('pointermove', onPointerMove);
    element.addEventListener('pointerleave', onPointerLeave);
    return () => {
      element.removeEventListener('pointermove', onPointerMove);
      element.removeEventListener('pointerleave', onPointerLeave);
    };
  }, []);

  const playTone = () => {
    if (!soundOn) return;
    const AudioContextCtor = window.AudioContext || (window as typeof window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (!AudioContextCtor) return;
    const context = audioRef.current ?? new AudioContextCtor();
    audioRef.current = context;
    const oscillator = context.createOscillator();
    const gain = context.createGain();
    oscillator.type = district === 'fried-em' ? 'square' : district === 'schmackinn' ? 'triangle' : 'sine';
    oscillator.frequency.value = 92 + activeLandmark * 26;
    gain.gain.setValueAtTime(0.0001, context.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.055, context.currentTime + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.0001, context.currentTime + 0.35);
    oscillator.connect(gain).connect(context.destination);
    oscillator.start();
    oscillator.stop(context.currentTime + 0.4);
  };

  const selectLandmark = (index: number) => {
    setActiveLandmark(index);
    window.setTimeout(playTone, 20);
  };

  return (
    <section
      ref={rootRef}
      className={`${styles.scene} ${styles[scene.architecture]} ${compact ? styles.compact : ''} ${quality === 'performance' ? styles.performance : ''} ${loaded ? styles.loaded : ''}`}
      style={{
        '--accent': scene.accent,
        '--accent-soft': scene.accentSoft,
        '--sky-top': scene.skyTop,
        '--sky-bottom': scene.skyBottom,
        '--fog': scene.fog,
        '--camera-x': camera.x,
        '--camera-y': camera.y,
      } as React.CSSProperties}
      aria-label={`${scene.name} cinematic district`}
    >
      {webglEnabled && (
        <WebGLDistrictCanvas
          district={district}
          accent={scene.accent}
          skyTop={scene.skyTop}
          skyBottom={scene.skyBottom}
          activeLandmark={activeLandmark}
          quality={quality}
        />
      )}

      <div className={styles.sky} style={{ opacity: webglEnabled ? 0.16 : 1 }} />
      <div className={styles.sun} />
      <div className={styles.stars} style={{ opacity: webglEnabled ? 0.16 : undefined }} />
      <div className={styles.clouds}><span /><span /><span /></div>
      <div className={styles.mountains} style={{ opacity: webglEnabled ? 0.14 : undefined }}><span /><span /><span /></div>
      <div className={styles.farCity} style={{ opacity: webglEnabled ? 0.12 : undefined }} />

      {!webglEnabled && (
        <div className={styles.worldCamera}>
          <div className={styles.groundGrid} />
          <div className={styles.road}><span /><span /><span /></div>
          <div className={styles.buildings}>
            {buildings.map((building) => (
              <span
                key={building.index}
                className={styles.building}
                style={{
                  '--h': `${building.height}%`,
                  '--w': `${building.width}%`,
                  '--z': `${building.depth}px`,
                  '--x': `${building.offset}%`,
                  '--delay': `${building.index * -0.17}s`,
                } as React.CSSProperties}
              ><i /></span>
            ))}
          </div>

          <div className={styles.heroLandmark}>
            <div className={styles.landmarkCore}>
              <span className={styles.landmarkGlow} />
              <span className={styles.landmarkSign}>{scene.name}</span>
              <span className={styles.landmarkPulse} />
            </div>
          </div>

          {scene.architecture === 'court' && <div className={styles.courtSet}><span className={styles.backboard} /><span className={styles.rim} /><span className={styles.courtLines} /><span className={styles.ball} /></div>}
          {scene.architecture === 'fashion' && <div className={styles.runwaySet}><span className={styles.runway} /><span className={styles.fabricOne} /><span className={styles.fabricTwo} /></div>}
          {scene.architecture === 'food' && <div className={styles.foodSet}><span className={styles.restaurant} /><span className={styles.truck} /><span className={styles.steamOne} /><span className={styles.steamTwo} /></div>}
          {scene.architecture === 'studio' && <div className={styles.studioSet}><span className={styles.speakerLeft} /><span className={styles.speakerRight} /><span className={styles.waveform} /></div>}
          {scene.architecture === 'finance' && <div className={styles.financeSet}><span /><span /><span /></div>}
        </div>
      )}

      <div className={styles.rain} />
      <div className={styles.dust} />
      <div className={styles.fog} />
      <div className={styles.vignette} />
      <div className={styles.grain} />

      <header className={styles.topbar}>
        <Link href="/" className={styles.brand}><span className={styles.brandMark}>∞</span><span>Harmonic OS</span></Link>
        <div className={styles.controls}>
          <button type="button" onClick={() => setSoundOn((value) => !value)}>{soundOn ? 'Sound on' : 'Sound off'}</button>
          <button type="button" onClick={() => setQuality((value) => value === 'cinematic' ? 'performance' : 'cinematic')}>{quality === 'cinematic' ? 'Cinematic' : 'Performance'}</button>
          <button type="button" onClick={() => setWebglEnabled((value) => !value)}>{webglEnabled ? '3D on' : '3D off'}</button>
          <Link href="/worlds">City map</Link>
        </div>
      </header>

      <div className={styles.copy}>
        <p className={styles.eyebrow}>{scene.eyebrow}</p>
        <h1>{scene.name}</h1>
        <p className={styles.description}>{scene.description}</p>
        <div className={styles.actions}>
          <Link href={scene.href} className={styles.primary}>{scene.primaryAction}<span>↗</span></Link>
          {scene.secondaryAction && <Link href={scene.secondaryAction.href} className={styles.secondary}>{scene.secondaryAction.label}</Link>}
        </div>
      </div>

      <div className={styles.landmarkNavigator}>
        <div className={styles.navigatorHeader}><span>Camera route</span><strong>{String(activeLandmark + 1).padStart(2, '0')}</strong></div>
        <div className={styles.landmarkButtons}>
          {scene.landmarks.map((landmark, index) => (
            <button key={landmark} type="button" onClick={() => selectLandmark(index)} className={index === activeLandmark ? styles.activeLandmark : ''}>
              <span>{String(index + 1).padStart(2, '0')}</span>{landmark}
            </button>
          ))}
        </div>
      </div>

      {showDistrictRail && (
        <nav className={styles.districtRail} aria-label="District navigation">
          {districtOrder.map((id) => {
            const item = districtScenes[id];
            return <Link key={id} href={item.href} className={district === id ? styles.activeDistrict : ''}><span style={{ background: item.accent }} />{item.name}</Link>;
          })}
        </nav>
      )}

      <div className={styles.scrollCue}><span />Move the camera · choose a landmark</div>
    </section>
  );
}
