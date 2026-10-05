/** Positive scrollLeft moves the track visually right-to-left; wrap at an identical copy. */
export function advanceAutoScroll(position: number, elapsedMs: number, cycleWidth: number) {
  if (cycleWidth <= 0) return 0;
  const next = position + Math.min(100, Math.max(0, elapsedMs)) * 0.02;
  return ((next % cycleWidth) + cycleWidth) % cycleWidth;
}
