'use client';

import { useEffect } from 'react';
import { smoothScrollTo } from '@/components/utils/smoothScroll';

/**
 * Scrolls to the section matching the URL hash when the page mounts.
 *
 * In-page nav clicks are handled by Button's own smooth-scroll, but arriving
 * here from another route (e.g. clicking "Projects" on a project page, which
 * navigates to `/#projects`) needs this: the App Router lands at the top and
 * does not reliably scroll to the hash on a cross-route navigation.
 */
function HashScrollHandler() {
  useEffect(() => {
    const targetId = window.location.hash.replace('#', '');
    if (!targetId) return;

    // Defer until the sections have mounted and laid out.
    const raf = requestAnimationFrame(() => {
      const targetElement = document.getElementById(targetId);
      if (targetElement) smoothScrollTo(targetElement);
    });

    return () => cancelAnimationFrame(raf);
  }, []);

  return null;
}

export default HashScrollHandler;
