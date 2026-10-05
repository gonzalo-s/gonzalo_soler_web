export const LOCKED_LIFT = '-10.694390715667312%';
export const LOCKED_ROTATION = '-0.258164deg';

export function getBrickLockState(scrollY: number, elementTop: number, viewportHeight: number, reducedMotion = false) {
  const start = Math.max(0, elementTop - viewportHeight * 0.7);
  const distance = Math.max(1, Math.min(viewportHeight * 0.4, 320));
  const progress = reducedMotion ? 1 : Math.min(1, Math.max(0, (scrollY - start) / distance));
  return {
    lift: progress === 1 ? LOCKED_LIFT : `${-30 + 19.305609284332688 * progress}%`,
    rotation: progress === 1 ? LOCKED_ROTATION : `${-2 + 1.741836 * progress}deg`,
    locked: progress === 1,
  };
}
