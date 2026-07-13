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

type LandmarkExperience = {
  chapter: string;
  product: string;
  story: string;
  price?: string;
  action: string;
  href: string;
};

const beigeDynastyExperiences: LandmarkExperience[] = [
  {
    chapter: 'The Royal Arrival',
    product: 'Frequency Gate',
    story: 'Two mirrored forms become one entrance. Cross the gate to enter the royal fashion civilization of 2 Harmonic.',
    action: 'Enter the Dynasty',
    href: '/worlds/two-harmonic/collections',
  },
  {
    chapter: 'Chapter I · Ivory Frequency',
    product: 'Ivory Frequency Zip',
    story: 'Warm ivory, midnight contrast, royal structure, and a silhouette displayed like ceremonial armor.',
    price: '$185',
    action: 'Enter Ivory Garment Room',
    href: '/worlds/two-harmonic/collections#ivory-frequency-zip',
  },
  {
    chapter: 'Chapter I · Lavender Frequency',
    product: 'Lavender Frequency Zip',
    story: 'Beige stone surrounds a calm frequency expressed through lavender mist, reflection, water, and restrained light.',
    price: '$195',
    action: 'Enter Lavender Garment Room',
    href: '/worlds/two-harmonic/collections#lavender-frequency-zip',
  },
  {
    chapter: 'Chapter I · Foundation Piece',
    product: 'Becoming Tee',
    story: 'Unfinished stone transforms into a polished royal figure—the physical story of becoming.',
    price: '$78',
    action: 'Enter Becoming Courtyard',
    href: '/worlds/two-harmonic/collections#becoming-tee',
  },
  {
    chapter: 'Chapter I · Companion Piece',
    product: 'Legacy Pant',
    story: 'A ceremonial passage preserves every step, collection, and frequency that built the house.',
    price: '$145',
    action: 'Enter Legacy Passage',
    href: '/worlds/two-harmonic/collections#legacy-pant',
  },
];

export function CinematicDistrictScene({ district = 'universe', compact = false, showDistrictRail = true }: Props) {
  const scene = districtScenes[district];
  const rootRef = useRef<HTMLElement | null>(null);
  const [loaded, setLoaded] = useState(false);
  const [camera, setCamera] = useState({ x: 0, y: 0 });
  const [activeLandmark, setActiveLandmark] = useState(0);
  const [soundOn, setSoundOn] = useState(false);
  const [quality, setQuality] = useState<'cinematic' | 'performance'>('cinematic');
  const [webglEnabled, setWebglEnabled] = useState(true);
  const [dynastyEntered, setDynastyEntered] = useState(district !== 'two-harmonic');
  const audioRef = useRef<AudioContext | null>(null);

  const buildings = useMemo(() => Array.from({ length: compact ? 14 : 24 }, (_, index) => ({
    index,
    height: 24 + ((index * 37) % 54),
    width: 5 + ((index * 13) % 8),
    depth: 18 + ((index * 19) % 48),
    offset: ((index * 17) % 96) - 48,
  })), [compact]);

  const landmarkExperience = district === 'two-harmonic' ? beigeDynastyExperiences[activeLandmark % beigeDynastyExperiences.length] : null;

  useEffect(() => {
    const timer = window.setTimeout(() => setLoaded(true), 180);
    try {
      const canvas = document.createElement('canvas');
      setWebglEnabled(Boolean(canvas.getContext('webgl2') || canvas.getContext('webgl')));
    } catch {
      setWebglEnabled(false);
    }
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (district !== 'two-harmonic') return;
    const timer = window.setTimeout(() => setDynastyEntered(true), 3600);
    return () => window.clearTimeout(timer);
  }, [district]);

  useEffect(() => {
    const element = rootRef.current;
    if (!element || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const onPointerMove = (event: PointerEvent) => {
      const bounds = element.getBoundingClientRect();
      setCamera({
        x: ((event.clientX - bounds.left) / bounds.width - 0.5) * 2,
        y: ((event.clientY - bounds.top) / bounds.height - 0.5) * 2,
      });
    };
    const onPointerLeave = () => setCamera({ x: 0, y: 0 });
    element.addEventListener('pointermove', onPointerMove);
    element.addEventListener('pointerleave', onPointerLeave);
    return () => {
      element.removeEventListener('pointermove', onPointerMove);
      element.removeEventListener('pointerleave', onPointerLeave);
    };
  }, []);

  const playTone = (index: number) => {
    if (!soundOn) return;
    const AudioContextCtor = window.AudioContext || (window as typeof window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (!AudioContextCtor) return;
    const context = audioRef.current ?? new AudioContextCtor();
    audioRef.current = context;
    const oscillator = context.createOscillator();
    const gain = context.createGain();
    oscillator.type = district === 'fried-em' ? 'square' : district === 'schmackinn' ? 'triangle' : 'sine';
    oscillator.frequency.value = district === 'two-harmonic' ? 72 + index * 18 : 92 + index * 26;
    gain.gain.setValueAtTime(0.0001, context.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.055, context.currentTime + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.0001, context.currentTime + 0.48);
    oscillator.connect(gain).connect(context.destination);
    oscillator.start();
    oscillator.stop(context.currentTime + 0.5);
  };

  const selectLandmark = (index: number) => {
    setActiveLandmark(index);
    window.setTimeout(() => playTone(index), 20);
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
      {webglEnabled && <WebGLDistrictCanvas district={district} accent={scene.accent} skyTop={scene.skyTop} skyBottom={scene.skyBottom} activeLandmark={activeLandmark} quality={quality} onSelectLandmark={selectLandmark} />}

      <div className={styles.sky} style={{ opacity: webglEnabled ? 0.16 : 1 }} />
      <div className={styles.sun} />
      <div className={styles.stars} style={{ opacity: webglEnabled ? 0.16 : undefined }} />
      <div className={styles.clouds}><span /><span /><span /></div>
      <div className={styles.mountains} style={{ opacity: webglEnabled ? 0.14 : undefined }}><span /><span /><span /></div>
      <div className={styles.farCity} style={{ opacity: webglEnabled ? 0.12 : undefined }} />

      {!webglEnabled && <div className={styles.worldCamera}><div className={styles.groundGrid} /><div className={styles.road}><span /><span /><span /></div><div className={styles.buildings}>{buildings.map((building) => <span key={building.index} className={styles.building} style={{ '--h': `${building.height}%`, '--w': `${building.width}%`, '--z': `${building.depth}px`, '--x': `${building.offset}%`, '--delay': `${building.index * -0.17}s` } as React.CSSProperties}><i /></span>)}</div><div className={styles.heroLandmark}><div className={styles.landmarkCore}><span className={styles.landmarkGlow} /><span className={styles.landmarkSign}>{scene.name}</span><span className={styles.landmarkPulse} /></div></div></div>}

      <div className={styles.rain} />
      <div className={styles.dust} />
      <div className={styles.fog} />
      <div className={styles.vignette} />
      <div className={styles.grain} />

      {district === 'two-harmonic' && !dynastyEntered && (
        <div style={{ position: 'absolute', inset: 0, zIndex: 30, display: 'grid', placeItems: 'center', background: 'radial-gradient(circle at 50% 52%, rgba(214,170,69,.18), rgba(20,14,10,.94) 62%)', backdropFilter: 'blur(5px)', transition: 'opacity .8s ease' }}>
          <div style={{ textAlign: 'center', maxWidth: 650, padding: 32 }}>
            <p style={{ letterSpacing: '.38em', textTransform: 'uppercase', fontSize: 11, color: '#d6aa45' }}>2 Harmonic · Chapter I</p>
            <h2 style={{ margin: '10px 0', fontSize: 'clamp(44px,8vw,104px)', lineHeight: .86, color: '#eadfca' }}>The Beige Dynasty</h2>
            <p style={{ color: 'rgba(234,223,202,.78)', lineHeight: 1.6 }}>A royal fashion civilization built from desert camouflage, Egyptian monumentality, music, duality, and legacy.</p>
            <button type="button" onClick={() => { setDynastyEntered(true); selectLandmark(0); }} style={{ marginTop: 22, border: '1px solid rgba(214,170,69,.8)', borderRadius: 999, padding: '13px 22px', background: '#d6aa45', color: '#15100b', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '.12em', cursor: 'pointer' }}>Open the Frequency Gate</button>
          </div>
        </div>
      )}

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
        <div className={styles.actions}><Link href={scene.href} className={styles.primary}>{scene.primaryAction}<span>↗</span></Link>{scene.secondaryAction && <Link href={scene.secondaryAction.href} className={styles.secondary}>{scene.secondaryAction.label}</Link>}</div>
      </div>

      <div className={styles.landmarkNavigator}>
        <div className={styles.navigatorHeader}><span>Camera route</span><strong>{String(activeLandmark + 1).padStart(2, '0')}</strong></div>
        <div className={styles.landmarkButtons}>{scene.landmarks.map((landmark, index) => <button key={landmark} type="button" onClick={() => selectLandmark(index)} className={index === activeLandmark ? styles.activeLandmark : ''}><span>{String(index + 1).padStart(2, '0')}</span>{landmark}</button>)}</div>
      </div>

      {landmarkExperience && dynastyEntered && (
        <aside style={{ position: 'absolute', zIndex: 18, right: 'clamp(20px,4vw,64px)', bottom: 'clamp(86px,12vh,150px)', width: 'min(360px,calc(100vw - 40px))', padding: 20, border: '1px solid rgba(214,170,69,.42)', borderRadius: 20, background: 'linear-gradient(145deg,rgba(18,14,10,.86),rgba(75,55,34,.68))', boxShadow: '0 28px 80px rgba(0,0,0,.34)', backdropFilter: 'blur(18px)' }}>
          <p style={{ margin: 0, color: '#d6aa45', fontSize: 10, letterSpacing: '.22em', textTransform: 'uppercase' }}>{landmarkExperience.chapter}</p>
          <h3 style={{ margin: '8px 0 6px', color: '#eadfca', fontSize: 27 }}>{landmarkExperience.product}</h3>
          <p style={{ margin: 0, color: 'rgba(234,223,202,.72)', lineHeight: 1.5, fontSize: 13 }}>{landmarkExperience.story}</p>
          <div style={{ display: 'flex', gap: 10, alignItems: 'center', marginTop: 16 }}>
            {landmarkExperience.price && <strong style={{ color: '#f0cf91', fontSize: 18 }}>{landmarkExperience.price}</strong>}
            <Link href={landmarkExperience.href} style={{ marginLeft: 'auto', padding: '11px 14px', borderRadius: 999, background: '#eadfca', color: '#21170e', fontWeight: 800, fontSize: 11, textTransform: 'uppercase', letterSpacing: '.08em' }}>{landmarkExperience.action}</Link>
          </div>
        </aside>
      )}

      {showDistrictRail && <nav className={styles.districtRail} aria-label="District navigation">{districtOrder.map((id) => { const item = districtScenes[id]; const active = district === id; return <Link key={id} href={item.href} className={active ? styles.activeDistrict : ''} style={active ? { borderColor: item.accent, boxShadow: `0 0 24px ${item.accentSoft}`, color: item.accent } : undefined}><span style={{ background: item.accent }} />{item.name}</Link>; })}</nav>}

      <div className={styles.scrollCue}><span />Move the camera · click a royal landmark</div>
    </section>
  );
}
