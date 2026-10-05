'use client';

import { useEffect, useState } from 'react';
import type { RefObject } from 'react';
import { advanceAutoScroll } from '@/lib/ui/autoScroll';

export default function useAutoScroll(ref: RefObject<HTMLElement | null>, enabled: boolean, paused: boolean) {
  const [available, setAvailable] = useState(false);
  useEffect(() => {
    const element = ref.current;
    if (!element || !enabled) return;
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    let visible = false;
    let hovering = element.matches(':hover');
    let focused = element.contains(document.activeElement);
    let interacting = false;
    let frame = 0;
    let timer = 0;
    let previousTime = 0;
    let holdUntil = 0;
    let position = element.scrollLeft;
    let direction: 1 | -1 = 1;
    const canRun = () =>
      !paused &&
      !preference.matches &&
      !document.hidden &&
      visible &&
      !hovering &&
      !focused &&
      !interacting &&
      element.scrollWidth > element.clientWidth;
    const tick = (time: number) => {
      frame = 0;
      if (!canRun()) return;
      if (previousTime && time >= holdUntil) {
        const next = advanceAutoScroll(
          position,
          direction,
          time - previousTime,
          element.scrollWidth - element.clientWidth,
        );
        position = next.position;
        direction = next.direction;
        element.scrollLeft = position;
        if (next.atEdge) holdUntil = time + 1000;
      }
      previousTime = time;
      frame = window.requestAnimationFrame(tick);
    };
    const sync = () => {
      setAvailable(!preference.matches && element.scrollWidth > element.clientWidth);
      if (frame) window.cancelAnimationFrame(frame);
      frame = 0;
      previousTime = 0;
      position = element.scrollLeft;
      if (canRun()) frame = window.requestAnimationFrame(tick);
    };
    const enter = () => {
      hovering = true;
      sync();
    };
    const leave = () => {
      hovering = false;
      sync();
    };
    const focus = () => {
      focused = true;
      sync();
    };
    const blur = (event: FocusEvent) => {
      focused = element.contains(event.relatedTarget as Node | null);
      sync();
    };
    const interact = () => {
      interacting = true;
      window.clearTimeout(timer);
      sync();
      timer = window.setTimeout(() => {
        interacting = false;
        sync();
      }, 3000);
    };
    const visibility = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      sync();
    });
    const size = new ResizeObserver(sync);
    visibility.observe(element);
    size.observe(element);
    element.addEventListener('pointerenter', enter);
    element.addEventListener('pointerleave', leave);
    element.addEventListener('focusin', focus);
    element.addEventListener('focusout', blur);
    element.addEventListener('pointerdown', interact, { passive: true });
    element.addEventListener('pointerup', interact, { passive: true });
    element.addEventListener('wheel', interact, { passive: true });
    element.addEventListener('load', sync, true);
    document.addEventListener('visibilitychange', sync);
    preference.addEventListener('change', sync);
    sync();
    return () => {
      visibility.disconnect();
      size.disconnect();
      window.cancelAnimationFrame(frame);
      window.clearTimeout(timer);
      element.removeEventListener('pointerenter', enter);
      element.removeEventListener('pointerleave', leave);
      element.removeEventListener('focusin', focus);
      element.removeEventListener('focusout', blur);
      element.removeEventListener('pointerdown', interact);
      element.removeEventListener('pointerup', interact);
      element.removeEventListener('wheel', interact);
      element.removeEventListener('load', sync, true);
      document.removeEventListener('visibilitychange', sync);
      preference.removeEventListener('change', sync);
    };
  }, [ref, enabled, paused]);
  return enabled && available;
}
