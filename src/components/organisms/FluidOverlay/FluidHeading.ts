import { CanvasTexture, LinearFilter, SRGBColorSpace, Uniform, Vector2, Vector4 } from 'three';
import { HEADING_PADDING, waitForHeadingColors, headingSignature, rasterizeHeading } from './rasterizeHeading';

function visibleFluidText(): HTMLElement | null {
  return (
    [...document.querySelectorAll<HTMLElement>('h1[data-fluid-heading], [data-fluid-footer]')].find((element) => {
      const rect = element.getBoundingClientRect();
      return rect.width > 0 && rect.bottom > 0 && rect.top < innerHeight;
    }) ?? null
  );
}

function createHeadingTexture(canvas: HTMLCanvasElement) {
  const texture = new CanvasTexture(canvas);
  texture.colorSpace = SRGBColorSpace;
  texture.minFilter = texture.magFilter = LinearFilter;
  texture.generateMipmaps = false;
  return texture;
}

export function createHeadingUniforms() {
  const canvas = document.createElement('canvas');
  canvas.width = canvas.height = 1;
  return {
    headingTexture: new Uniform(createHeadingTexture(canvas)),
    headingRect: new Uniform(new Vector4()),
    headingEnabled: new Uniform(0),
    viewport: new Uniform(new Vector2()),
  };
}

type HeadingUniforms = ReturnType<typeof createHeadingUniforms>;

/** One cached texture; no DOM reads or texture uploads in the animation loop. */
export class FluidHeading {
  private element: HTMLElement | null = null;
  private cachedText = '';
  private signature = '';
  private textureWidth = 1;
  private textureHeight = 1;
  private dirty = true;
  private fontsReady = false;
  private active = false;
  private disposed = false;
  private captureFrame = 0;
  private themeFrame = 0;
  private themeVersion = 0;
  private scrollTimer = 0;
  private scrolling = false;
  private colorsSettling = false;
  private readonly resizeObserver: ResizeObserver;
  private readonly contentObserver: MutationObserver;

  constructor(
    private readonly uniforms: HeadingUniforms,
    private readonly redraw: () => void = () => undefined,
  ) {
    this.resizeObserver = new ResizeObserver(() => this.refresh());
    this.contentObserver = new MutationObserver(() => {
      const next = visibleFluidText();
      if (next !== this.element || next?.textContent !== this.cachedText) this.refresh();
    });
    const main = document.getElementById('main-content');
    if (main) this.contentObserver.observe(main, { childList: true, subtree: true, characterData: true });
    window.addEventListener('scroll', this.onScroll, { passive: true });
    window.addEventListener('wheel', this.onScroll, { passive: true });
    window.addEventListener('touchstart', this.onScroll, { passive: true });
    document.addEventListener('selectionchange', this.onSelection);
    document.fonts.ready.then(() => {
      this.fontsReady = true;
      this.onFonts();
    });
    document.fonts.addEventListener('loadingdone', this.onFonts);
  }

  refresh() {
    if (this.disposed) return;
    this.dirty = true;
    this.restore();
    if (!this.captureFrame) this.captureFrame = requestAnimationFrame(() => this.capture());
  }

  themeChanged() {
    if (this.disposed) return;
    const version = ++this.themeVersion;
    this.colorsSettling = true;
    this.dirty = true;
    this.signature = '';
    this.restore();
    cancelAnimationFrame(this.themeFrame);
    this.themeFrame = requestAnimationFrame(() => {
      this.themeFrame = 0;
      void waitForHeadingColors(visibleFluidText()).then(() => {
        if (this.disposed || version !== this.themeVersion) return;
        this.colorsSettling = false;
        this.refresh();
      });
    });
  }

  activate() {
    this.active = true;
    if (this.dirty) this.refresh();
    else this.position();
  }

  deactivate() {
    this.active = false;
    this.restore();
  }

  private restore() {
    const enabled = this.uniforms.headingEnabled.value === 1;
    this.uniforms.headingEnabled.value = 0;
    this.element?.removeAttribute('data-fluid-text-active');
    if (enabled) this.redraw();
  }

  private capture() {
    this.captureFrame = 0;
    if (this.disposed || document.hidden || this.colorsSettling || this.scrolling || !this.fontsReady) return;
    const next = visibleFluidText();
    if (!next) {
      this.restore();
      return;
    }
    if (next !== this.element) {
      this.restore();
      this.resizeObserver.disconnect();
      this.element = next;
      this.signature = '';
      if (next) this.resizeObserver.observe(next);
    }
    if (!this.element) return;
    const bounds = this.element.getBoundingClientRect();
    if (bounds.bottom <= 0 || bounds.top >= innerHeight) return;
    try {
      const signature = headingSignature(this.element);
      const canvas = this.uniforms.headingTexture.value.image as HTMLCanvasElement;
      if (signature !== this.signature) {
        if (!rasterizeHeading(this.element, canvas)) return;
        // WebGL texture storage is immutable: replace only when dimensions change.
        if (canvas.width !== this.textureWidth || canvas.height !== this.textureHeight) {
          this.uniforms.headingTexture.value.dispose();
          this.uniforms.headingTexture.value = createHeadingTexture(canvas);
          this.textureWidth = canvas.width;
          this.textureHeight = canvas.height;
        }
        this.uniforms.headingTexture.value.needsUpdate = true;
        this.signature = signature;
      }
      this.cachedText = this.element.textContent ?? '';
      this.dirty = false;
      this.position();
    } catch {
      // The decorative rasterization must never make the actual heading disappear.
      this.restore();
    }
  }

  private position() {
    if (!this.element || this.disposed) return;
    if (this.scrolling) {
      this.restore();
      return;
    }
    const rect = this.element.getBoundingClientRect();
    const selection = document.getSelection();
    const selected =
      selection &&
      !selection.isCollapsed &&
      selection.rangeCount > 0 &&
      selection.getRangeAt(0).intersectsNode(this.element);
    if (!this.active || this.dirty || this.colorsSettling || selected || rect.bottom <= 0 || rect.top >= innerHeight) {
      this.restore();
      return;
    }
    this.uniforms.headingRect.value.set(
      (rect.left - HEADING_PADDING) / this.uniforms.viewport.value.x,
      1 - (rect.bottom + HEADING_PADDING) / this.uniforms.viewport.value.y,
      (rect.width + HEADING_PADDING * 2) / this.uniforms.viewport.value.x,
      (rect.height + HEADING_PADDING * 2) / this.uniforms.viewport.value.y,
    );
    this.uniforms.headingEnabled.value = 1;
    this.element.setAttribute('data-fluid-text-active', 'true');
    this.redraw();
  }

  private readonly onScroll = () => {
    this.scrolling = true;
    this.restore();
    window.clearTimeout(this.scrollTimer);
    this.scrollTimer = window.setTimeout(() => {
      this.scrolling = false;
      this.refresh();
    }, 120);
  };

  private readonly onSelection = () => this.position();
  private readonly onFonts = () => {
    // A font can change glyph metrics without changing computed CSS or the box size.
    this.signature = '';
    this.refresh();
  };

  dispose() {
    this.disposed = true;
    this.deactivate();
    this.themeVersion++;
    window.clearTimeout(this.scrollTimer);
    cancelAnimationFrame(this.captureFrame);
    cancelAnimationFrame(this.themeFrame);
    this.resizeObserver.disconnect();
    this.contentObserver.disconnect();
    window.removeEventListener('scroll', this.onScroll);
    window.removeEventListener('wheel', this.onScroll);
    window.removeEventListener('touchstart', this.onScroll);
    document.removeEventListener('selectionchange', this.onSelection);
    document.fonts.removeEventListener('loadingdone', this.onFonts);
    this.uniforms.headingTexture.value.dispose();
  }
}
