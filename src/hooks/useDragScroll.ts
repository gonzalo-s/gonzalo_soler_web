'use client';

import { useRef, useEffect } from 'react';

export default function useDragScroll<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);
  const animationFrame = useRef<number | null>(null);

  useEffect(() => {
    const container = ref.current;
    if (!container) return;

    const handleMouseDown = (e: MouseEvent) => {
      isDragging.current = true;
      startX.current = e.pageX - container.offsetLeft;
      scrollLeft.current = container.scrollLeft;

      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    };

    const handleMouseUp = () => {
      isDragging.current = false;
      if (animationFrame.current) {
        cancelAnimationFrame(animationFrame.current);
        animationFrame.current = null;
      }

      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging.current || !container) return;

      if (animationFrame.current) return;

      animationFrame.current = requestAnimationFrame(() => {
        const x = e.pageX - container.offsetLeft;
        const walk = (x - startX.current) * 1.5;
        container.scrollLeft = scrollLeft.current - walk;
        animationFrame.current = null;
      });
    };

    container.addEventListener('mousedown', handleMouseDown);

    return () => {
      container.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      if (animationFrame.current) cancelAnimationFrame(animationFrame.current);
    };
  }, []);

  return ref;
}
