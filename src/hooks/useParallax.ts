'use client';

import { useEffect, useRef } from 'react';

const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/**
 * Scroll-driven parallax. Honours prefers-reduced-motion.
 *
 * anchor:
 *  - 'center' (default): offset is proportional to the element's distance from
 *    the viewport centre. Best for elements lower on the page (cards, footer) —
 *    they sit still when centred and drift as they enter/leave.
 *  - 'top': offset starts at 0 at the element's natural position and only grows
 *    as you scroll past it. Best for hero elements at the top of the page, so
 *    they begin in place and drift afterwards (no jump on load).
 *
 * `speed` is the fraction of scroll/distance to offset by (0.1–0.3 is subtle).
 */
export function useParallax<T extends HTMLElement>(speed = 0.15, anchor: 'center' | 'top' = 'center') {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;

    let raf = 0;
    let docTop = 0;

    // Element's layout position in the document (transform removed so we read
    // the true resting position, not a parallaxed one).
    const measureBase = () => {
      const prev = el.style.transform;
      el.style.transform = '';
      docTop = el.getBoundingClientRect().top + window.scrollY;
      el.style.transform = prev;
    };

    const update = () => {
      raf = 0;
      let offset: number;
      if (anchor === 'top') {
        offset = Math.max(0, window.scrollY - docTop) * speed;
      } else {
        const rect = el.getBoundingClientRect();
        offset = -(rect.top + rect.height / 2 - window.innerHeight / 2) * speed;
      }
      el.style.transform = `translate3d(0, ${offset.toFixed(2)}px, 0)`;
    };

    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };

    const onResize = () => {
      measureBase();
      onScroll();
    };

    el.style.willChange = 'transform';
    measureBase();
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onResize, { passive: true });

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [speed, anchor]);

  return ref;
}
