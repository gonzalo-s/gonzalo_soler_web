'use client';

import { ChangeEvent, MouseEvent, useEffect, useRef, useState } from 'react';
import clsx from 'clsx';
import { ICONS } from '@/constants/icons';
import styles from './audioPlayer.module.scss';

type AudioPlayerProps = {
  url: string;
  title: string;
  caption?: string;
};

// Decorative waveform bar heights (0–1). Deterministic so render is stable.
const BAR_COUNT = 32;
const BAR_HEIGHTS = Array.from({ length: BAR_COUNT }, (_, i) => 0.3 + 0.7 * Math.abs(Math.sin(i * 1.7)));

function formatTime(seconds: number): string {
  if (!Number.isFinite(seconds)) return '0:00';
  const minutes = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${minutes}:${secs.toString().padStart(2, '0')}`;
}

export default function AudioPlayer({ url, title, caption }: AudioPlayerProps) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [hoverBars, setHoverBars] = useState<number | null>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const onLoadedMetadata = () => setDuration(audio.duration || 0);
    const onTimeUpdate = () => setCurrentTime(audio.currentTime);
    const onEnded = () => {
      setIsPlaying(false);
      setCurrentTime(0);
    };

    audio.addEventListener('loadedmetadata', onLoadedMetadata);
    audio.addEventListener('timeupdate', onTimeUpdate);
    audio.addEventListener('ended', onEnded);
    return () => {
      audio.removeEventListener('loadedmetadata', onLoadedMetadata);
      audio.removeEventListener('timeupdate', onTimeUpdate);
      audio.removeEventListener('ended', onEnded);
    };
  }, []);

  function togglePlay() {
    const audio = audioRef.current;
    if (!audio) return;
    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      void audio.play();
      setIsPlaying(true);
    }
  }

  function stop() {
    const audio = audioRef.current;
    if (!audio) return;
    audio.pause();
    audio.currentTime = 0;
    setIsPlaying(false);
    setCurrentTime(0);
  }

  function seek(event: ChangeEvent<HTMLInputElement>) {
    const audio = audioRef.current;
    if (!audio) return;
    const time = Number(event.target.value);
    audio.currentTime = time;
    setCurrentTime(time);
  }

  function handleHover(event: MouseEvent<HTMLDivElement>) {
    const rect = event.currentTarget.getBoundingClientRect();
    const ratio = Math.min(Math.max((event.clientX - rect.left) / rect.width, 0), 1);
    setHoverBars(Math.round(ratio * BAR_COUNT));
  }

  const progress = duration > 0 ? currentTime / duration : 0;
  const playedBars = Math.round(progress * BAR_COUNT);

  return (
    <div className={styles.player} role="group" aria-label={title}>
      <audio ref={audioRef} src={url} preload="metadata" />

      <div className={styles.player__head}>
        <span className={styles.player__title}>{title}</span>
        {caption && <span className={styles.player__caption}>{caption}</span>}
      </div>

      <div className={styles.player__wave} onMouseMove={handleHover} onMouseLeave={() => setHoverBars(null)}>
        {BAR_HEIGHTS.map((height, i) => (
          <span
            key={i}
            aria-hidden="true"
            className={clsx(
              styles.player__bar,
              hoverBars !== null
                ? i < hoverBars && styles['player__bar--preview']
                : i < playedBars && styles['player__bar--played'],
            )}
            style={{ height: `${Math.round(height * 100)}%` }}
          />
        ))}
        <input
          type="range"
          className={styles.player__seek}
          min={0}
          max={duration || 0}
          step={0.1}
          value={currentTime}
          onChange={seek}
          aria-label="Seek"
        />
      </div>

      <div className={styles.player__time} aria-hidden="true">
        <span>{formatTime(currentTime)}</span>
        <span>{formatTime(duration)}</span>
      </div>

      <div className={styles.player__controls}>
        <button
          type="button"
          className={styles.player__button}
          onClick={togglePlay}
          aria-label={isPlaying ? 'Pause spoken résumé' : 'Play spoken résumé'}
        >
          <span aria-hidden="true">{isPlaying ? ICONS.pause : ICONS.play}</span>
        </button>

        <button type="button" className={styles.player__button} onClick={stop} aria-label="Stop spoken résumé">
          <span aria-hidden="true">{ICONS.stop}</span>
        </button>
      </div>
    </div>
  );
}
