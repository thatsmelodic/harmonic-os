'use client';

import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { harmonicWorlds, type HarmonicWorldConfig } from '@/data/world-engine';

type WeatherMode = 'none' | 'stars' | 'rain' | 'snow' | 'petals';
type MovementMode = 'still' | 'slow' | 'cinematic';

type UniverseSettings = {
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  glow: number;
  particles: number;
  movement: MovementMode;
  weather: WeatherMode;
  pulse: boolean;
  trails: boolean;
  reducedMotion: boolean;
};

const defaultSettings: UniverseSettings = {
  primary: '#b76cff',
  secondary: '#36b2cb',
  accent: '#f5d26b',
  background: '#05030a',
  glow: 72,
  particles: 34,
  movement: 'cinematic',
  weather: 'stars',
  pulse: true,
  trails: true,
  reducedMotion: false,
};

const STORAGE_KEY = 'harmonic-universe-settings-v1';

export function UniverseExperience() {
  const [settings, setSettings] = useState<UniverseSettings>(defaultSettings);
  const [booted, setBooted] = useState(false);
  const [controlsOpen, setControlsOpen] = useState(false);
  const [selectedWorld, setSelectedWorld] = useState<HarmonicWorldConfig>(harmonicWorlds[0]);
  const [stage, setStage] = useState(0);

  useEffect(() => {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        setSettings({ ...defaultSettings, ...JSON.parse(saved) });
      } catch {
        window.localStorage.removeItem(STORAGE_KEY);
      }
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
  }, [settings]);

  useEffect(() => {
    if (settings.reducedMotion) {
      setStage(4);
      return;
    }
    const timers = [
      window.setTimeout(() => setStage(1), 650),
      window.setTimeout(() => setStage(2), 1550),
      window.setTimeout(() => setStage(3), 2700),
      window.setTimeout(() => setStage(4), 4000),
    ];
    return () => timers.forEach(window.clearTimeout);
  }, [settings.reducedMotion]);

  const motionDuration = settings.reducedMotion || settings.movement === 'still' ? 0 : settings.movement === 'slow' ? 18 : 9;
  const particleCount = settings.reducedMotion ? 0 : Math.round(settings.particles / 2.5);

  const cssVars = useMemo(
    () =>
      ({
        '--u-primary': settings.primary,
        '--u-secondary': settings.secondary,
        '--u-accent': settings.accent,
        '--u-background': settings.background,
        '--u-glow': `${settings.glow / 100}`,
        '--u-motion': `${motionDuration}s`,
      }) as React.CSSProperties,
    [settings, motionDuration],
  );

  return (
    <main className="relative min-h-screen overflow-hidden text-white" style={{ ...cssVars, background: settings.background }}>
      <UniverseBackdrop settings={settings} count={particleCount} />

      <AnimatePresence>
        {!booted && (
          <motion.section
            className="fixed inset-0 z-50 grid place-items-center overflow-hidden bg-black"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.04 }}
            transition={{ duration: settings.reducedMotion ? 0 : 0.8 }}
          >
            <div className="relative grid place-items-center px-6 text-center">
              <motion.div
                className="absolute h-[28rem] w-[28rem] rounded-full blur-3xl"
                animate={{ opacity: [0.08, 0.26, 0.08], scale: [0.82, 1.16, 0.82] }}
                transition={{ duration: 2.2, repeat: Infinity }}
                style={{ background: settings.primary }}
              />

              <AnimatePresence mode="wait">
                {stage < 2 ? (
                  <motion.div key="heart" initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 1.7 }} className="relative">
                    <HeartCore pulse={settings.pulse} />
                    <p className="mt-7 text-[.65rem] font-black uppercase tracking-[.45em] text-white/35">The system has a heartbeat</p>
                  </motion.div>
                ) : (
                  <motion.div key="cup" initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} className="relative grid place-items-center">
                    <CupCore trails={settings.trails} />
                    <motion.p className="mt-8 text-[.65rem] font-black uppercase tracking-[.45em] text-white/35" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                      Every world is poured from one source
                    </motion.p>
                  </motion.div>
                )}
              </AnimatePresence>

              {stage >= 3 && (
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mt-10">
                  <h1 className="text-4xl font-black tracking-[-.08em] sm:text-6xl">Choose Your Frequency</h1>
                  <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-white/48">The heart powers the system. The cup carries the vision. The frequencies become worlds.</p>
                </motion.div>
              )}

              <button
                onClick={() => setBooted(true)}
                className="mt-10 rounded-full px-7 py-4 text-sm font-black text-black shadow-2xl transition hover:scale-105"
                style={{ background: settings.accent, boxShadow: `0 0 ${24 + settings.glow / 2}px ${settings.primary}88` }}
              >
                {stage >= 4 ? 'Enter Harmonic OS' : 'Skip Boot Sequence'}
              </button>
            </div>
          </motion.section>
        )}
      </AnimatePresence>

      <header className="relative z-20 mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-5 sm:px-8">
        <Link href="/universe" className="flex items-center gap-3">
          <div className="grid h-11 w-11 place-items-center rounded-full border border-white/10 bg-white/[.06] shadow-xl"><HeartMini /></div>
          <div>
            <p className="text-sm font-black tracking-[-.03em]">Harmonic OS</p>
            <p className="text-[.58rem] font-black uppercase tracking-[.2em] text-white/35">Choose your frequency</p>
          </div>
        </Link>
        <div className="flex items-center gap-2">
          <Link href="/commerce/beats" className="hidden rounded-full border border-white/10 bg-black/30 px-4 py-2 text-xs font-black text-white/65 backdrop-blur-xl sm:block">Commerce</Link>
          <button onClick={() => setControlsOpen(true)} className="rounded-full border border-white/10 bg-black/35 px-4 py-2 text-xs font-black text-white/75 backdrop-blur-xl">Tune Universe</button>
        </div>
      </header>

      <section className="relative z-10 mx-auto max-w-7xl px-5 pb-24 pt-8 sm:px-8 sm:pt-16">
        <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_.95fr]">
          <div>
            <p className="text-xs font-black uppercase tracking-[.36em] text-white/38">Cup → Heart → Frequency → World</p>
            <h1 className="mt-5 text-6xl font-black tracking-[-.1em] sm:text-8xl lg:text-9xl">The Universe Is Live.</h1>
            <p className="mt-6 max-w-2xl text-base leading-8 text-white/52">Music is the memory system. Fashion is the body. Food is the taste. Basketball is the fire. Business is the engine. The heart keeps every world in harmony.</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <button onClick={() => document.getElementById('frequency-map')?.scrollIntoView({ behavior: 'smooth' })} className="rounded-full px-6 py-3 text-sm font-black text-black" style={{ background: settings.accent }}>Explore Frequencies</button>
              <Link href="/creator-studio-v3" className="rounded-full border border-white/10 bg-white/[.04] px-6 py-3 text-sm font-black text-white/72">Creator Studio</Link>
            </div>
          </div>
          <div className="relative grid min-h-[26rem] place-items-center">
            <motion.div
              className="absolute h-80 w-80 rounded-full border border-white/10"
              animate={settings.reducedMotion || settings.movement === 'still' ? undefined : { rotate: 360 }}
              transition={{ duration: motionDuration || 20, repeat: Infinity, ease: 'linear' }}
              style={{ boxShadow: `0 0 ${60 + settings.glow}px ${settings.primary}33, inset 0 0 50px ${settings.secondary}22` }}
            />
            <motion.div animate={settings.pulse && !settings.reducedMotion ? { scale: [1, 1.055, 1] } : undefined} transition={{ duration: 1.8, repeat: Infinity }}>
              <CupCore trails={settings.trails} compact />
            </motion.div>
            {harmonicWorlds.map((world, index) => {
              const angle = (index / harmonicWorlds.length) * Math.PI * 2 - Math.PI / 2;
              const x = Math.cos(angle) * 155;
              const y = Math.sin(angle) * 155;
              return (
                <motion.button
                  key={world.slug}
                  onClick={() => setSelectedWorld(world)}
                  className="absolute grid h-14 w-14 place-items-center rounded-full border border-white/10 bg-black/60 text-xl backdrop-blur-xl"
                  style={{ x, y, boxShadow: `0 0 24px ${world.primary}55` }}
                  whileHover={{ scale: 1.18 }}
                  aria-label={`Select ${world.name}`}
                >
                  {world.rooms[0]?.icon}
                </motion.button>
              );
            })}
          </div>
        </div>

        <section id="frequency-map" className="scroll-mt-20 pt-28">
          <div className="flex flex-wrap items-end justify-between gap-5">
            <div>
              <p className="text-xs font-black uppercase tracking-[.34em] text-white/35">Universe Map</p>
              <h2 className="mt-3 text-5xl font-black tracking-[-.08em] sm:text-7xl">Five worlds. One heartbeat.</h2>
            </div>
            <p className="max-w-xl text-sm leading-7 text-white/45">Each world has a distinct visual frequency, room system, community purpose, and commerce path while sharing one operating system.</p>
          </div>

          <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-5">
            {harmonicWorlds.map((world) => (
              <WorldCard key={world.slug} world={world} active={selectedWorld.slug === world.slug} onSelect={() => setSelectedWorld(world)} />
            ))}
          </div>
        </section>

        <motion.section
          key={selectedWorld.slug}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-8 overflow-hidden rounded-[3rem] border border-white/10 bg-black/35 p-5 backdrop-blur-2xl sm:p-8"
          style={{ boxShadow: `0 0 ${50 + settings.glow}px ${selectedWorld.primary}22` }}
        >
          <div className="grid gap-8 xl:grid-cols-[.82fr_1.18fr]">
            <div>
              <p className="text-xs font-black uppercase tracking-[.3em] text-white/35">{selectedWorld.eyebrow}</p>
              <h3 className="mt-3 text-5xl font-black tracking-[-.08em]">{selectedWorld.name}</h3>
              <p className="mt-3 text-lg font-black" style={{ color: selectedWorld.secondary }}>{selectedWorld.handle}</p>
              <p className="mt-5 text-sm leading-7 text-white/55">{selectedWorld.philosophy}</p>
              <p className="mt-4 text-xs leading-6 text-white/38">Atmosphere: {selectedWorld.atmosphere}</p>
              <div className="mt-7 flex flex-wrap gap-3">
                <Link href={`/worlds/${selectedWorld.slug}`} className="rounded-full px-5 py-3 text-sm font-black text-black" style={{ background: selectedWorld.accent }}>Enter World</Link>
                {selectedWorld.slug === 'melodic' && <Link href="/commerce/beats" className="rounded-full border border-white/10 px-5 py-3 text-sm font-black text-white/70">Open Beat Vault</Link>}
              </div>
            </div>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {selectedWorld.rooms.map((room, index) => (
                <motion.article key={room.id} whileHover={{ y: -5 }} className="rounded-[1.7rem] border border-white/10 bg-white/[.035] p-4">
                  <div className="flex items-start justify-between gap-3"><span className="text-2xl">{room.icon}</span><span className="text-[.6rem] font-black text-white/25">0{index + 1}</span></div>
                  <p className="mt-4 text-[.6rem] font-black uppercase tracking-[.16em] text-white/28">{room.type}</p>
                  <h4 className="mt-2 text-lg font-black tracking-[-.04em] text-white/85">{room.label}</h4>
                  <p className="mt-2 text-xs leading-5 text-white/42">{room.description}</p>
                </motion.article>
              ))}
            </div>
          </div>
        </motion.section>

        <section className="mt-20 grid gap-5 lg:grid-cols-3">
          <SystemCard number="01" title="The Cup" body="The source vessel. It holds the creator’s experiences, ideas, pain, humor, business, and art before they pour into the universe." />
          <SystemCard number="02" title="The Heart" body="The system core. It opens navigation, identity, profile, notifications, inventory, and the active frequency in every world." />
          <SystemCard number="03" title="The Frequency" body="The user’s chosen path. Every color, sound, movement, room, and offer changes based on the world they enter." />
        </section>
      </section>

      <AnimatePresence>
        {controlsOpen && <UniverseControls settings={settings} setSettings={setSettings} onClose={() => setControlsOpen(false)} />}
      </AnimatePresence>

      <style jsx global>{`
        html { scroll-behavior: smooth; }
        @keyframes universeFloat { 0%,100% { transform: translate3d(0,0,0); } 50% { transform: translate3d(0,-18px,0); } }
        @keyframes universeFall { from { transform: translate3d(0,-10vh,0) rotate(0deg); } to { transform: translate3d(20px,110vh,0) rotate(360deg); } }
        @keyframes universeDrift { from { transform: translate3d(-10vw,0,0); } to { transform: translate3d(110vw,-8vh,0); } }
      `}</style>
    </main>
  );
}

function UniverseBackdrop({ settings, count }: { settings: UniverseSettings; count: number }) {
  const particles = useMemo(() => Array.from({ length: count }, (_, i) => ({
    id: i,
    left: (i * 37) % 100,
    top: (i * 61) % 100,
    size: 2 + (i % 5),
    delay: (i % 11) * 0.7,
    duration: 8 + (i % 9),
  })), [count]);

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      <div className="absolute inset-0 opacity-70" style={{ background: `radial-gradient(circle at 20% 10%, ${settings.primary}22, transparent 38%), radial-gradient(circle at 85% 18%, ${settings.secondary}18, transparent 34%), radial-gradient(circle at 50% 90%, ${settings.accent}0f, transparent 34%)` }} />
      {particles.map((p) => (
        <span
          key={p.id}
          className="absolute rounded-full"
          style={{
            left: `${p.left}%`, top: `${p.top}%`, width: p.size, height: p.size,
            background: p.id % 2 ? settings.secondary : settings.primary,
            opacity: 0.18 + (p.id % 4) * 0.08,
            boxShadow: `0 0 ${8 + p.size}px currentColor`,
            animation: settings.movement === 'still' ? undefined : `universeFloat ${p.duration}s ease-in-out ${p.delay}s infinite`,
          }}
        />
      ))}
      {settings.weather !== 'none' && !settings.reducedMotion && Array.from({ length: 18 }, (_, i) => (
        <span
          key={`weather-${i}`}
          className="absolute"
          style={{
            left: `${(i * 29) % 100}%`, top: '-5%',
            color: settings.weather === 'petals' ? '#ff9fcf' : '#ffffff',
            opacity: settings.weather === 'rain' ? 0.22 : 0.35,
            fontSize: settings.weather === 'rain' ? 14 : 10 + (i % 8),
            animation: `universeFall ${6 + (i % 7)}s linear ${(i % 8) * 0.7}s infinite`,
          }}
        >
          {settings.weather === 'snow' ? '✦' : settings.weather === 'petals' ? '❀' : settings.weather === 'rain' ? '│' : '·'}
        </span>
      ))}
    </div>
  );
}

function UniverseControls({ settings, setSettings, onClose }: { settings: UniverseSettings; setSettings: React.Dispatch<React.SetStateAction<UniverseSettings>>; onClose: () => void }) {
  const patch = <K extends keyof UniverseSettings>(key: K, value: UniverseSettings[K]) => setSettings((current) => ({ ...current, [key]: value }));
  const colorFields: Array<[keyof Pick<UniverseSettings, 'primary' | 'secondary' | 'accent' | 'background'>, string]> = [
    ['primary', 'Primary glow'], ['secondary', 'Secondary glow'], ['accent', 'CTA / gold'], ['background', 'Background'],
  ];

  return (
    <motion.aside initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} transition={{ type: 'spring', damping: 28, stiffness: 240 }} className="fixed inset-y-0 right-0 z-[70] w-full max-w-md overflow-y-auto border-l border-white/10 bg-[#09070f]/95 p-5 shadow-2xl backdrop-blur-2xl">
      <div className="flex items-center justify-between gap-4">
        <div><p className="text-[.65rem] font-black uppercase tracking-[.24em] text-white/35">Universe Control Center</p><h2 className="mt-2 text-3xl font-black tracking-[-.06em]">Tune the frequency</h2></div>
        <button onClick={onClose} className="grid h-10 w-10 place-items-center rounded-full border border-white/10 text-xl">×</button>
      </div>

      <ControlSection title="Color System">
        <div className="grid grid-cols-2 gap-3">
          {colorFields.map(([key, label]) => (
            <label key={key} className="rounded-2xl border border-white/10 bg-white/[.035] p-3 text-xs font-black text-white/55">
              {label}
              <input type="color" value={settings[key]} onChange={(event) => patch(key, event.target.value)} className="mt-3 h-10 w-full cursor-pointer rounded-lg border-0 bg-transparent" />
            </label>
          ))}
        </div>
      </ControlSection>

      <ControlSection title="Light & Density">
        <Range label="Glow intensity" value={settings.glow} onChange={(value) => patch('glow', value)} />
        <Range label="Particle density" value={settings.particles} onChange={(value) => patch('particles', value)} />
      </ControlSection>

      <ControlSection title="Movement">
        <div className="grid grid-cols-3 gap-2">
          {(['still', 'slow', 'cinematic'] as MovementMode[]).map((mode) => <Choice key={mode} active={settings.movement === mode} onClick={() => patch('movement', mode)}>{mode}</Choice>)}
        </div>
        <Toggle label="Heart pulse" checked={settings.pulse} onChange={(value) => patch('pulse', value)} />
        <Toggle label="Frequency trails" checked={settings.trails} onChange={(value) => patch('trails', value)} />
        <Toggle label="Reduced motion" checked={settings.reducedMotion} onChange={(value) => patch('reducedMotion', value)} />
      </ControlSection>

      <ControlSection title="Atmosphere / Weather">
        <div className="grid grid-cols-3 gap-2">
          {(['none', 'stars', 'rain', 'snow', 'petals'] as WeatherMode[]).map((mode) => <Choice key={mode} active={settings.weather === mode} onClick={() => patch('weather', mode)}>{mode}</Choice>)}
        </div>
      </ControlSection>

      <div className="mt-6 grid grid-cols-2 gap-3">
        <button onClick={() => setSettings(defaultSettings)} className="rounded-full border border-white/10 px-4 py-3 text-xs font-black text-white/65">Reset Defaults</button>
        <button onClick={onClose} className="rounded-full px-4 py-3 text-xs font-black text-black" style={{ background: settings.accent }}>Save & Close</button>
      </div>
      <p className="mt-4 text-xs leading-6 text-white/30">Settings save locally on this device. Database-backed creator presets can be connected later through Creator Studio.</p>
    </motion.aside>
  );
}

function ControlSection({ title, children }: { title: string; children: React.ReactNode }) {
  return <section className="mt-6 rounded-[1.8rem] border border-white/10 bg-white/[.025] p-4"><h3 className="text-xs font-black uppercase tracking-[.2em] text-white/38">{title}</h3><div className="mt-4 grid gap-4">{children}</div></section>;
}

function Range({ label, value, onChange }: { label: string; value: number; onChange: (value: number) => void }) {
  return <label className="text-xs font-black text-white/55"><div className="mb-2 flex justify-between"><span>{label}</span><span>{value}%</span></div><input type="range" min="0" max="100" value={value} onChange={(e) => onChange(Number(e.target.value))} className="w-full accent-purple-300" /></label>;
}

function Toggle({ label, checked, onChange }: { label: string; checked: boolean; onChange: (checked: boolean) => void }) {
  return <label className="flex cursor-pointer items-center justify-between gap-4 rounded-xl border border-white/10 bg-black/20 p-3 text-xs font-black text-white/55"><span>{label}</span><input type="checkbox" checked={checked} onChange={(e) => onChange(e.target.checked)} className="h-4 w-4 accent-purple-300" /></label>;
}

function Choice({ active, onClick, children }: { active: boolean; onClick: () => void; children: string }) {
  return <button onClick={onClick} className={`rounded-xl border px-3 py-2 text-[.65rem] font-black uppercase tracking-[.12em] ${active ? 'border-purple-300 bg-purple-300 text-black' : 'border-white/10 bg-black/20 text-white/45'}`}>{children}</button>;
}

function WorldCard({ world, active, onSelect }: { world: HarmonicWorldConfig; active: boolean; onSelect: () => void }) {
  return (
    <button onClick={onSelect} className={`rounded-[2rem] border p-4 text-left transition ${active ? 'border-white/35 bg-white/[.08]' : 'border-white/10 bg-black/30 hover:-translate-y-1 hover:bg-white/[.045]'}`} style={{ boxShadow: active ? `0 0 38px ${world.primary}35` : undefined }}>
      <div className="grid h-24 place-items-center rounded-[1.5rem] border border-white/10" style={{ background: `radial-gradient(circle, ${world.primary}50, rgba(0,0,0,.45))` }}><span className="text-4xl">{world.rooms[0]?.icon}</span></div>
      <p className="mt-4 text-[.58rem] font-black uppercase tracking-[.17em] text-white/30">{world.eyebrow}</p>
      <h3 className="mt-2 text-xl font-black tracking-[-.05em] text-white/85">{world.name}</h3>
      <p className="mt-2 text-xs leading-5 text-white/40">{world.tagline}</p>
    </button>
  );
}

function SystemCard({ number, title, body }: { number: string; title: string; body: string }) {
  return <article className="rounded-[2rem] border border-white/10 bg-black/30 p-5 backdrop-blur-xl"><p className="text-xs font-black text-white/25">{number}</p><h3 className="mt-4 text-2xl font-black tracking-[-.06em]">{title}</h3><p className="mt-3 text-sm leading-7 text-white/45">{body}</p></article>;
}

function HeartCore({ pulse = false }: { pulse?: boolean }) {
  return <motion.div animate={pulse ? { scale: [1, 1.1, 1] } : undefined} transition={{ duration: 1.2, repeat: Infinity }} className="relative h-28 w-32"><span className="absolute left-1/2 top-5 h-20 w-20 -translate-x-1/2 rotate-45 rounded-[1.2rem_2.2rem_1.2rem_2.2rem]" style={{ background: 'linear-gradient(135deg,var(--u-primary),var(--u-secondary))', boxShadow: '0 0 55px color-mix(in srgb,var(--u-primary) 70%,transparent)' }} /><span className="absolute left-[18px] top-[10px] h-20 w-20 rounded-full" style={{ background: 'var(--u-primary)' }} /><span className="absolute right-[18px] top-[10px] h-20 w-20 rounded-full" style={{ background: 'var(--u-secondary)' }} /></motion.div>;
}

function HeartMini() {
  return <span className="text-xl" style={{ color: 'var(--u-primary)' }}>♥</span>;
}

function CupCore({ trails = false, compact = false }: { trails?: boolean; compact?: boolean }) {
  const scale = compact ? 'scale-75' : '';
  return (
    <div className={`relative ${scale}`}>
      {trails && <><span className="absolute left-1/2 top-0 h-40 w-2 -translate-x-10 -translate-y-28 rotate-12 rounded-full blur-sm" style={{ background: 'linear-gradient(to bottom,transparent,var(--u-primary))' }} /><span className="absolute left-1/2 top-0 h-40 w-2 translate-x-8 -translate-y-28 -rotate-12 rounded-full blur-sm" style={{ background: 'linear-gradient(to bottom,transparent,var(--u-secondary))' }} /></>}
      <div className="relative h-40 w-36 rounded-b-[3.8rem] rounded-t-[1.4rem] border-2 border-white/30 bg-white/[.04] backdrop-blur-xl" style={{ boxShadow: '0 0 55px color-mix(in srgb,var(--u-primary) 35%,transparent), inset 0 -45px 55px color-mix(in srgb,var(--u-primary) 28%,transparent)' }}>
        <div className="absolute inset-x-3 bottom-3 h-20 rounded-b-[3rem] rounded-t-[55%]" style={{ background: 'linear-gradient(135deg,var(--u-primary),var(--u-secondary))', opacity: 'calc(.4 + var(--u-glow) * .45)' }} />
        <div className="absolute -right-11 top-8 h-20 w-16 rounded-r-full border-2 border-l-0 border-white/30" />
        <div className="absolute left-1/2 top-14 -translate-x-1/2 text-3xl font-black text-white/80">♥</div>
      </div>
    </div>
  );
}
