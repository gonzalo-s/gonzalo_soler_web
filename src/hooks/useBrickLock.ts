'use client';

import { useEffect, useRef } from 'react';
import { getBrickLockState } from '@/lib/ui/brickLock';

export default function useBrickLock() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const art = ref.current;
    if (!art) return;
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    let frame = 0;
    let previous = '';
    const update = () => {
      frame = 0;
      const top = art.getBoundingClientRect().top + window.scrollY;
      const state = getBrickLockState(window.scrollY, top, window.innerHeight, preference.matches);
      const signature = `${state.lift}/${state.rotation}`;
      if (signature === previous) return;
      previous = signature;
      art.style.setProperty('--yellow-lift', state.lift);
      art.style.setProperty('--yellow-rotation', state.rotation);
      art.dataset.locked = String(state.locked);
    };
    const schedule = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };
    const observer = new ResizeObserver(schedule);
    observer.observe(art);
    update();
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    preference.addEventListener('change', schedule);
    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
      preference.removeEventListener('change', schedule);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);
  return ref;
}
