/** Rasterize only the heading's laid-out text, including CMS spans and line breaks. */
export const HEADING_PADDING = 24;
const MAX_TEXTURE_SIZE = 2048;

type TextRun = { text: string; rect: DOMRect; style: CSSStyleDeclaration };

/** Cheap cache key: style reads on text parents, never glyph/layout reconstruction. */
export function headingSignature(element: HTMLElement): string {
  const bounds = element.getBoundingClientRect();
  const parts = [element.textContent, bounds.width, bounds.height, Math.min(devicePixelRatio || 1, 1.5)];
  const walker = document.createTreeWalker(element, NodeFilter.SHOW_TEXT);
  const parents = new Set<Element>();
  let node: Node | null;
  while ((node = walker.nextNode())) if (node.parentElement) parents.add(node.parentElement);
  for (const parent of parents) {
    const style = getComputedStyle(parent);
    parts.push(
      style.font,
      style.fontSize,
      style.fontWeight,
      style.fontStyle,
      style.fontFamily,
      style.color,
      style.backgroundImage,
      style.letterSpacing,
      style.lineHeight,
      style.direction,
    );
  }
  return parts.join('|');
}

function readTextRuns(element: HTMLElement): TextRun[] {
  const runs: TextRun[] = [];
  const walker = document.createTreeWalker(element, NodeFilter.SHOW_TEXT);
  const range = document.createRange();
  const segmenter = new Intl.Segmenter(undefined, { granularity: 'grapheme' });
  let node: Node | null;
  while ((node = walker.nextNode())) {
    const parent = node.parentElement;
    if (!parent || !node.textContent) continue;
    const style = getComputedStyle(parent);
    if (style.display === 'none' || style.visibility === 'hidden') continue;
    let run: TextRun | undefined;
    for (const { segment, index } of segmenter.segment(node.textContent)) {
      range.setStart(node, index);
      range.setEnd(node, index + segment.length);
      const rect = range.getBoundingClientRect();
      // Collapsed whitespace and explicit newlines have no painted width.
      if (!rect.width || !rect.height || segment === '\n') continue;
      if (run && Math.abs(run.rect.top - rect.top) < 1) {
        run.text += segment;
        const left = Math.min(run.rect.left, rect.left);
        const right = Math.max(run.rect.right, rect.right);
        run.rect.x = left;
        run.rect.width = right - left;
      } else {
        run = { text: segment, rect, style };
        runs.push(run);
      }
    }
  }
  return runs;
}

export function rasterizeHeading(element: HTMLElement, canvas: HTMLCanvasElement): boolean {
  const bounds = element.getBoundingClientRect();
  if (!bounds.width || !bounds.height) return false;
  const context = canvas.getContext('2d');
  // Keep HTML text on browsers that cannot accurately reproduce its tracking.
  if (!context || !('letterSpacing' in context)) return false;
  const width = bounds.width + HEADING_PADDING * 2;
  const height = bounds.height + HEADING_PADDING * 2;
  const scale = Math.min(devicePixelRatio || 1, 1.5, MAX_TEXTURE_SIZE / width, MAX_TEXTURE_SIZE / height);
  const runs = readTextRuns(element);
  if (!runs.length) return false;
  canvas.width = Math.ceil(width * scale);
  canvas.height = Math.ceil(height * scale);
  context.setTransform(scale, 0, 0, scale, 0, 0);
  context.textBaseline = 'alphabetic';
  let gradient: CanvasGradient | undefined;
  if (element.hasAttribute('data-fluid-gradient')) {
    gradient = context.createLinearGradient(HEADING_PADDING, 0, width - HEADING_PADDING, 0);
    const theme = getComputedStyle(document.documentElement);
    gradient.addColorStop(0, theme.getPropertyValue('--brand-3').trim());
    gradient.addColorStop(1, theme.getPropertyValue('--brand-2').trim());
  }
  for (const { text, rect, style } of runs) {
    context.font = `${style.fontStyle} ${style.fontWeight} ${style.fontSize} ${style.fontFamily}`;
    context.fillStyle = gradient ?? style.color;
    context.letterSpacing = style.letterSpacing === 'normal' ? '0px' : style.letterSpacing;
    context.direction = style.direction === 'rtl' ? 'rtl' : 'ltr';
    context.textAlign = 'left';
    const ascent = context.measureText(text).fontBoundingBoxAscent;
    if (!Number.isFinite(ascent)) return false;
    context.fillText(text, rect.left - bounds.left + HEADING_PADDING, rect.top - bounds.top + HEADING_PADDING + ascent);
  }
  return true;
}

/** Wait for inherited theme colors to settle without rasterizing every transition frame. */
export function colorTransitionTime(element: HTMLElement | null): number {
  let duration = 0;
  for (let parent: HTMLElement | null = element; parent; parent = parent.parentElement) {
    const style = getComputedStyle(parent);
    const durations = style.transitionDuration.split(',');
    const delays = style.transitionDelay.split(',');
    const milliseconds = (value: string) => parseFloat(value) * (value.trim().endsWith('ms') ? 1 : 1000) || 0;
    style.transitionProperty.split(',').forEach((property, index) => {
      if (property.trim() === 'color' || property.trim() === 'all') {
        duration = Math.max(
          duration,
          milliseconds(durations[index % durations.length]) + milliseconds(delays[index % delays.length]),
        );
      }
    });
  }
  return duration;
}

/** CSS transition completion is more reliable than an estimated wall-clock delay. */
export async function waitForHeadingColors(element: HTMLElement | null): Promise<void> {
  const transitions: Animation[] = [];
  for (let parent: HTMLElement | null = element; parent; parent = parent.parentElement) {
    if (typeof parent.getAnimations !== 'function') {
      await new Promise<void>((resolve) => window.setTimeout(resolve, colorTransitionTime(element) + 32));
      return;
    }
    transitions.push(
      ...parent
        .getAnimations()
        .filter((animation) => 'transitionProperty' in animation && animation.transitionProperty === 'color'),
    );
  }
  await Promise.allSettled(transitions.map((transition) => transition.finished));
}
