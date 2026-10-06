'use client';

import { useEffect, useRef } from 'react';
import styles from './fluidOverlay.module.scss';

export default function FluidOverlay() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.dataset.fluidReady = 'idle';
    const motion = matchMedia('(prefers-reduced-motion: reduce)');
    const desktop = matchMedia('(min-width: 1100px)');
    let stop: (() => void) | undefined;
    let generation = 0;
    let loading = false;
    let alive = true;
    let unavailable = false;
    const start = async (event: PointerEvent) => {
      if (
        event.pointerType !== 'mouse' ||
        !desktop.matches ||
        motion.matches ||
        stop ||
        loading ||
        !alive ||
        unavailable
      )
        return;
      loading = true;
      const version = generation;
      try {
        const { createFluidOverlay } = await import('./createFluidOverlay');
        if (alive && version === generation && desktop.matches && !motion.matches) stop = createFluidOverlay(canvas);
      } catch {
        // WebGL is optional: unsupported devices retain the complete static site.
        unavailable = true;
        canvas.dataset.fluidReady = 'false';
      } finally {
        loading = false;
      }
    };
    const preferenceChanged = () => {
      generation++;
      stop?.();
      stop = undefined;
      window.removeEventListener('pointermove', start);
      if (desktop.matches && !motion.matches) window.addEventListener('pointermove', start, { passive: true });
    };
    preferenceChanged();
    desktop.addEventListener('change', preferenceChanged);
    motion.addEventListener('change', preferenceChanged);
    return () => {
      alive = false;
      generation++;
      stop?.();
      window.removeEventListener('pointermove', start);
      motion.removeEventListener('change', preferenceChanged);
      desktop.removeEventListener('change', preferenceChanged);
    };
  }, []);
  return <canvas ref={canvasRef} className={styles.overlay} aria-hidden="true" data-fluid-overlay />;
}
