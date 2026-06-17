export function smoothScrollTo(targetElement: HTMLElement, duration = 500) {
  const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
  const startPosition = window.pageYOffset;
  const distance = targetPosition - startPosition;
  let startTime: number | null = null;

  function easeOutQuad(elapsedTime: number, startValue: number, changeInValue: number, totalDuration: number) {
    const time = elapsedTime / totalDuration;
    return -changeInValue * time * (time - 2) + startValue;
  }

  function animation(currentTime: number) {
    if (startTime === null) startTime = currentTime;
    const timeElapsed = currentTime - startTime;
    const run = easeOutQuad(timeElapsed, startPosition, distance, duration);
    window.scrollTo(0, run);
    if (timeElapsed < duration) requestAnimationFrame(animation);
  }

  requestAnimationFrame(animation);
}
