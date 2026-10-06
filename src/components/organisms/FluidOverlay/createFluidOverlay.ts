import { Color, ShaderMaterial, Uniform, WebGLRenderer } from 'three';
import { FluidSimulation, FullscreenPass, FULLSCREEN_VERTEX } from 'three-fluid-fx';
import { createHeadingUniforms, FluidHeading } from './FluidHeading';
import { FLUID_FRAGMENT } from './fluidShader';

/** Transparent adaptation of the minimal density-overlay example. */
export function createFluidOverlay(canvas: HTMLCanvasElement): () => void {
  const renderer = new WebGLRenderer({ canvas, alpha: true, antialias: false, powerPreference: 'low-power' });
  if (!renderer.extensions.has('EXT_color_buffer_float')) {
    renderer.dispose();
    throw new Error('Floating-point render targets are unavailable.');
  }
  renderer.setClearColor(0, 0);
  const fluid = new FluidSimulation(renderer, {
    profile: 'balanced',
    bfecc: false,
    splatRadius: 0.001,
    splatForce: 6,
    reflectWalls: true,
    densityDissipation: 0.96,
  });
  const material = new ShaderMaterial({
    vertexShader: FULLSCREEN_VERTEX,
    fragmentShader: FLUID_FRAGMENT,
    uniforms: {
      ...createHeadingUniforms(),
      density: new Uniform(fluid.densityTexture),
      velocity: new Uniform(fluid.velocityTexture),
      cobalt: new Uniform(new Color()),
      amber: new Uniform(new Color()),
    },
    transparent: true,
    depthTest: false,
    depthWrite: false,
  });
  const pass = new FullscreenPass(material);
  const heading = new FluidHeading(material.uniforms as ReturnType<typeof createHeadingUniforms>, () => {
    if (!renderer.getContext().isContextLost()) pass.render(renderer, null);
  });
  const updateTheme = () => {
    const css = getComputedStyle(document.documentElement);
    material.uniforms.cobalt.value.setStyle(css.getPropertyValue('--brick-blue').trim());
    material.uniforms.amber.value.setStyle('#9bb4fa');
    heading.themeChanged();
  };
  const themeObserver = new MutationObserver(updateTheme);
  themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
  updateTheme();
  let previous: { x: number; y: number; id: number } | undefined;
  let lastFrame = 0;
  let frame = 0;
  let disposed = false;
  let activeUntil = 0;
  const draw = (time: number) => {
    frame = 0;
    if (disposed || document.hidden) return;
    fluid.step(Math.min((time - lastFrame) / 1000 || 1 / 60, 1 / 60));
    lastFrame = time;
    material.uniforms.density.value = fluid.densityTexture;
    material.uniforms.velocity.value = fluid.velocityTexture;
    pass.render(renderer, null);
    if (time < activeUntil) frame = requestAnimationFrame(draw);
    else {
      heading.deactivate();
      renderer.clear();
    }
  };
  const wake = () => {
    activeUntil = performance.now() + 4000;
    heading.activate();
    if (!frame && !document.hidden) {
      lastFrame = performance.now();
      frame = requestAnimationFrame(draw);
    }
  };
  const resetPointer = () => {
    previous = undefined;
  };
  const move = (event: PointerEvent) => {
    if (event.pointerType !== 'mouse' || document.hidden) return;
    const current = { x: event.clientX, y: event.clientY, id: event.pointerId };
    if (previous && previous.id === current.id) {
      const dx = current.x - previous.x;
      const dy = previous.y - current.y;
      if (Math.abs(dx) + Math.abs(dy) > 0 && Math.hypot(dx, dy) < 200) {
        fluid.addSplat(
          current.x / material.uniforms.viewport.value.x,
          1 - current.y / material.uniforms.viewport.value.y,
          dx * fluid.splatForce,
          dy * fluid.splatForce,
        );
        wake();
      }
    }
    previous = current;
  };
  const resize = () => {
    renderer.setPixelRatio(Math.min(devicePixelRatio || 1, 1.5));
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    renderer.setSize(width, height, false);
    fluid.resize(width, height);
    material.uniforms.viewport.value.set(width, height);
    heading.refresh();
    resetPointer();
  };
  const visibility = () => {
    resetPointer();
    cancelAnimationFrame(frame);
    frame = 0;
    heading.deactivate();
    renderer.clear();
  };
  const contextLost = (event: Event) => {
    event.preventDefault();
    dispose();
  };
  const dispose = () => {
    if (disposed) return;
    disposed = true;
    cancelAnimationFrame(frame);
    themeObserver.disconnect();
    window.removeEventListener('pointermove', move);
    window.removeEventListener('pointerout', resetPointer);
    window.removeEventListener('blur', resetPointer);
    window.removeEventListener('resize', resize);
    document.removeEventListener('visibilitychange', visibility);
    canvas.removeEventListener('webglcontextlost', contextLost);
    if (!renderer.getContext().isContextLost()) renderer.clear();
    heading.dispose();
    fluid.dispose();
    pass.dispose();
    renderer.dispose();
    canvas.dataset.fluidReady = 'false';
  };
  resize();
  window.addEventListener('pointermove', move, { passive: true });
  window.addEventListener('pointerout', resetPointer);
  window.addEventListener('blur', resetPointer);
  window.addEventListener('resize', resize);
  document.addEventListener('visibilitychange', visibility);
  canvas.addEventListener('webglcontextlost', contextLost);
  canvas.dataset.fluidReady = 'true';
  return dispose;
}
