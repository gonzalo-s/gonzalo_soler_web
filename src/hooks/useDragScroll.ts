'use client';

import { useEffect, useRef } from 'react';

/** Mouse dragging supplements native touch and keyboard scrolling. */
export default function useDragScroll<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    let dragging = false;
    let startX = 0;
    let startScroll = 0;
    let latestX = 0;
    let frame = 0;
    const stop = () => {
      dragging = false;
      if (frame) window.cancelAnimationFrame(frame);
      frame = 0;
    };
    const start = (event: PointerEvent) => {
      if (event.pointerType !== 'mouse' || event.button !== 0) return;
      if ((event.target as Element).closest('a, button, input, select, textarea')) return;
      event.preventDefault();
      dragging = true;
      startX = event.clientX;
      startScroll = element.scrollLeft;
      element.setPointerCapture(event.pointerId);
    };
    const move = (event: PointerEvent) => {
      if (!dragging) return;
      latestX = event.clientX;
      if (frame) return;
      frame = window.requestAnimationFrame(() => {
        element.scrollLeft = startScroll - (latestX - startX) * 1.5;
        frame = 0;
      });
    };
    element.addEventListener('pointerdown', start);
    element.addEventListener('pointermove', move);
    element.addEventListener('pointerup', stop);
    element.addEventListener('pointercancel', stop);
    element.addEventListener('lostpointercapture', stop);
    return () => {
      stop();
      element.removeEventListener('pointerdown', start);
      element.removeEventListener('pointermove', move);
      element.removeEventListener('pointerup', stop);
      element.removeEventListener('pointercancel', stop);
      element.removeEventListener('lostpointercapture', stop);
    };
  }, []);
  return ref;
}
