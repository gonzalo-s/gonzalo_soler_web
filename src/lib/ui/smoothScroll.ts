/** Native scrolling respects scroll-margin, and avoids competing animation frames. */
export function smoothScrollTo(targetElement: HTMLElement) {
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  targetElement.scrollIntoView({ behavior: reducedMotion ? 'instant' : 'smooth', block: 'start' });
}
