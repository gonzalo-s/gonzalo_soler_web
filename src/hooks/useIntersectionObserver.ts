'use client';

import { useEffect, useState } from 'react';

export function useIntersectionObserver(
  options: IntersectionObserverInit = { threshold: 0.2 },
): [(node: Element | null) => void, boolean] {
  const [isVisible, setIsVisible] = useState(false);
  const [element, setElement] = useState<Element | null>(null);

  useEffect(() => {
    if (!element) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        observer.disconnect(); // Stop observing once visible
      }
    }, options);

    observer.observe(element);

    return () => observer.disconnect();
  }, [element, options]);

  return [setElement, isVisible];
}
