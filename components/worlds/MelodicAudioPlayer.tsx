'use client';

import { useEffect, useRef, useState } from 'react';

type Props = {
  title: string;
  artist?: string;
  src?: string | null;
  accent?: string;
};

export function MelodicAudioPlayer({ title, artist = 'Melodic', src, accent = '#c084fc' }: Props) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.85);

  useEffect(() => {
    setPlaying(false);
    setCurrentTime(0);
    setDuration(0);
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.load();
    }
  }, [src, title]);

  const toggle = async () => {
    const audio = audioRef.current;
    if (!audio || !src) return;
    if (audio.paused) {
      await audio.play();
      setPlaying(true);
    } else {
      audio.pause();
      setPlaying(false);
    }
  };

  const seek = (value: number) => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.currentTime = value;
    setCurrentTime(value);
  };

  const changeVolume = (value: number) => {
    const audio = audioRef.current;
    setVolume(value);
    if (audio) audio.volume = value;
  };

  return (
    <div className="rounded-[2rem] border border-white/10 bg-black/35 p-5 backdrop-blur-xl">
      {src && <audio ref={audioRef} src={src} preload="metadata" onLoadedMetadata={(event) => setDuration(event.currentTarget.duration || 0)} onTimeUpdate={(event) => setCurrentTime(event.currentTarget.currentTime)} onEnded={() => setPlaying(false)} />}
      <div className="flex items-center gap-4">
        <button onClick={toggle} disabled={!src} className="grid h-14 w-14 place-items-center rounded-full text-xl font-black text-black disabled:cursor-not-allowed disabled:opacity-35" style={{ background: accent }}>{playing ? 'Ⅱ' : '▶'}</button>
        <div className="min-w-0 flex-1"><p className="truncate text-lg font-black">{title}</p><p className="mt-1 text-xs font-black uppercase tracking-[.18em] text-white/35">{artist}</p></div>
        <div className="text-right font-mono text-xs text-white/40"><p>{formatTime(currentTime)}</p><p className="mt-1">{formatTime(duration)}</p></div>
      </div>
      <input aria-label="Seek through track" disabled={!src} type="range" min={0} max={duration || 0} step={0.1} value={Math.min(currentTime, duration || 0)} onChange={(event) => seek(Number(event.target.value))} className="mt-5 w-full" />
      <div className="mt-4 flex items-center gap-3"><span className="text-sm text-white/35">Volume</span><input aria-label="Volume" disabled={!src} type="range" min={0} max={1} step={0.01} value={volume} onChange={(event) => changeVolume(Number(event.target.value))} className="w-40 max-w-full" /></div>
      {!src && <p className="mt-4 rounded-2xl border border-white/10 bg-white/[.035] p-3 text-sm text-white/40">Audio playback is ready. This track needs a public storage URL from the upload pipeline before listeners can press play.</p>}
    </div>
  );
}

function formatTime(seconds: number) {
  if (!Number.isFinite(seconds) || seconds <= 0) return '0:00';
  const minutes = Math.floor(seconds / 60);
  const remainder = Math.floor(seconds % 60).toString().padStart(2, '0');
  return `${minutes}:${remainder}`;
}
