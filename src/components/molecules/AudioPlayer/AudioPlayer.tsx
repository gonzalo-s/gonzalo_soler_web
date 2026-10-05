'use client';

import { useRef, useState } from 'react';
import type { ChangeEvent, MouseEvent } from 'react';
import clsx from 'clsx';
import IconButton from '@/components/atoms/IconButton/IconButton';
import { ICONS } from '@/constants/icons';
import styles from './audioPlayer.module.scss';

export type AudioPlayerProps = { url: string; title: string; caption?: string };
const BAR_COUNT = 32;
const BAR_HEIGHTS = Array.from({ length: BAR_COUNT }, (_, index) => 0.3 + 0.7 * Math.abs(Math.sin(index * 1.7)));

function formatTime(seconds: number) {
  if (!Number.isFinite(seconds) || seconds < 0) return '0:00';
  return `${Math.floor(seconds / 60)}:${Math.floor(seconds % 60)
    .toString()
    .padStart(2, '0')}`;
}

export default function AudioPlayer({ url, title, caption }: AudioPlayerProps) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [hoverBars, setHoverBars] = useState<number | null>(null);
  const [error, setError] = useState<string>();

  async function togglePlay() {
    const audio = audioRef.current;
    if (!audio) return;
    if (!audio.paused) {
      audio.pause();
      return;
    }
    setError(undefined);
    try {
      await audio.play();
    } catch {
      setError('Audio could not play. Please try again.');
    }
  }
  function stop() {
    const audio = audioRef.current;
    if (!audio) return;
    audio.pause();
    audio.currentTime = 0;
    setCurrentTime(0);
  }
  function seek(event: ChangeEvent<HTMLInputElement>) {
    const audio = audioRef.current;
    if (!audio || duration <= 0) return;
    const time = Math.min(duration, Math.max(0, Number(event.target.value)));
    audio.currentTime = time;
    setCurrentTime(time);
  }
  function preview(event: MouseEvent<HTMLDivElement>) {
    const rect = event.currentTarget.getBoundingClientRect();
    if (rect.width <= 0) return;
    const ratio = Math.min(1, Math.max(0, (event.clientX - rect.left) / rect.width));
    setHoverBars(Math.round(ratio * BAR_COUNT));
  }
  const playedBars = Math.round((duration > 0 ? currentTime / duration : 0) * BAR_COUNT);

  return (
    <div className={styles.player} role="group" aria-label={title}>
      <audio
        ref={audioRef}
        src={url}
        preload="metadata"
        onLoadStart={() => {
          setPlaying(false);
          setCurrentTime(0);
          setDuration(0);
          setError(undefined);
        }}
        onDurationChange={(event) => {
          const value = event.currentTarget.duration;
          setDuration(Number.isFinite(value) ? value : 0);
        }}
        onTimeUpdate={(event) => setCurrentTime(event.currentTarget.currentTime)}
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onEnded={(event) => {
          setPlaying(false);
          setCurrentTime(0);
          event.currentTarget.currentTime = 0;
        }}
        onError={() => {
          setPlaying(false);
          setError('Audio is unavailable. Please try again later.');
        }}
      />
      <div className={styles.player__head}>
        <span className={styles.player__title}>{title}</span>
        {caption && <span className={styles.player__caption}>{caption}</span>}
      </div>
      <div className={styles.player__wave} onMouseMove={preview} onMouseLeave={() => setHoverBars(null)}>
        {BAR_HEIGHTS.map((height, index) => (
          <span
            key={index}
            aria-hidden="true"
            className={clsx(
              styles.player__bar,
              hoverBars !== null
                ? index < hoverBars && styles['player__bar--preview']
                : index < playedBars && styles['player__bar--played'],
            )}
            style={{ height: `${Math.round(height * 100)}%` }}
          />
        ))}
        <input
          type="range"
          className={styles.player__seek}
          min={0}
          max={duration}
          step={0.1}
          value={currentTime}
          disabled={duration <= 0}
          onChange={seek}
          aria-label={`Seek ${title}`}
          aria-valuetext={`${formatTime(currentTime)} of ${formatTime(duration)}`}
        />
      </div>
      <div className={styles.player__time} aria-hidden="true">
        <span>{formatTime(currentTime)}</span>
        <span>{formatTime(duration)}</span>
      </div>
      <div className={styles.player__controls}>
        <IconButton
          className={styles.player__button}
          onClick={togglePlay}
          aria-label={playing ? 'Pause spoken résumé' : 'Play spoken résumé'}
        >
          {playing ? ICONS.pause : ICONS.play}
        </IconButton>
        <IconButton className={styles.player__button} onClick={stop} aria-label="Stop spoken résumé">
          {ICONS.stop}
        </IconButton>
      </div>
      {error && (
        <p className={styles.player__caption} role="status">
          {error}
        </p>
      )}
    </div>
  );
}
