'use client';

import { useEffect, useRef } from 'react';

const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/**
 * Interactive 3D tilt. The referenced element rotates toward the pointer and
 * lifts slightly, then eases back on leave. `max` is the peak rotation in
 * degrees. Pointer-only and honours prefers-reduced-motion, so keyboard/touch
 * users fall back to the CSS hover/focus styles untouched.
 */
export function useTilt<T extends HTMLElement>(max = 7, lift = 6) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;

    let raf = 0;

    const onMove = (event: PointerEvent) => {
      if (event.pointerType !== 'mouse') return;
      const rect = el.getBoundingClientRect();
      const px = (event.clientX - rect.left) / rect.width;
      const py = (event.clientY - rect.top) / rect.height;
      const rotateX = (0.5 - py) * max * 2;
      const rotateY = (px - 0.5) * max * 2;

      if (raf) cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        el.style.transform = `perspective(900px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateY(-${lift}px)`;
      });
    };

    const reset = () => {
      if (raf) cancelAnimationFrame(raf);
      el.style.transform = '';
    };

    el.style.transformStyle = 'preserve-3d';
    el.addEventListener('pointermove', onMove);
    el.addEventListener('pointerleave', reset);
    el.addEventListener('pointercancel', reset);

    return () => {
      el.removeEventListener('pointermove', onMove);
      el.removeEventListener('pointerleave', reset);
      el.removeEventListener('pointercancel', reset);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [max, lift]);

  return ref;
}
