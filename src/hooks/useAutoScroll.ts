'use client';

import { useEffect } from 'react';
import type { RefObject } from 'react';
import { advanceAutoScroll } from '@/lib/ui/autoScroll';

export default function useAutoScroll(ref: RefObject<HTMLElement | null>, enabled: boolean) {
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
    let cycleWidth = 0;
    let position = element.scrollLeft;
    const canRun = () =>
      !preference.matches &&
      !document.hidden &&
      visible &&
      !hovering &&
      !focused &&
      !interacting &&
      cycleWidth > element.clientWidth;
    const tick = (time: number) => {
      frame = 0;
      if (!canRun()) return;
      if (previousTime) {
        position = advanceAutoScroll(position, time - previousTime, cycleWidth);
        element.scrollLeft = position;
      }
      previousTime = time;
      frame = window.requestAnimationFrame(tick);
    };
    const sync = () => {
      const originals = element.querySelectorAll<HTMLElement>('[data-scroll-original]');
      const first = originals[0];
      const last = originals[originals.length - 1];
      const gap = parseFloat(getComputedStyle(element).columnGap) || 0;
      cycleWidth = first && last ? last.offsetLeft + last.offsetWidth - first.offsetLeft + gap : 0;
      element.dataset.loop = String(!preference.matches && cycleWidth > element.clientWidth);
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
  }, [ref, enabled]);
}
