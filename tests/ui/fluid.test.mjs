import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { runInNewContext } from 'node:vm';
import { test } from 'node:test';
import ts from 'typescript';

test('fluid runtime tracks mouse input, updates theme, sleeps, and disposes its resources', () => {
  const source = readFileSync(
    new URL('../../src/components/organisms/FluidOverlay/createFluidOverlay.ts', import.meta.url),
    'utf8',
  );
  const compiled = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.CommonJS } }).outputText;
  const events = new Map();
  const target = (prefix) => ({
    addEventListener: (name, handler) => events.set(prefix + name, handler),
    removeEventListener: (name) => events.delete(prefix + name),
  });
  const canvas = { ...target('canvas:'), dataset: {} };
  const document = { ...target('document:'), hidden: false, documentElement: {} };
  let now = 0,
    frame,
    observer,
    material,
    theme = 'light';
  const calls = { splats: [], steps: [], renders: 0, clears: 0, disposed: [] };
  const exports = {};
  const three = {
    Color: class {
      setStyle(value) {
        this.value = value;
      }
    },
    Vector2: class {
      set(x, y) {
        this.x = x;
        this.y = y;
      }
    },
    Uniform: class {
      constructor(value) {
        this.value = value;
      }
    },
    ShaderMaterial: class {
      constructor(options) {
        material = this;
        Object.assign(this, options);
      }
    },
    WebGLRenderer: class {
      extensions = { has: () => true };
      setClearColor() {}
      setPixelRatio() {}
      setSize() {}
      clear() {
        calls.clears++;
      }
      dispose() {
        calls.disposed.push('renderer');
      }
      getContext() {
        return { isContextLost: () => false };
      }
    },
  };
  const fluid = {
    FULLSCREEN_VERTEX: '',
    FluidSimulation: class {
      splatForce = 6;
      densityTexture = {};
      resize() {}
      addSplat(...args) {
        calls.splats.push(args);
      }
      step(dt) {
        calls.steps.push(dt);
      }
      dispose() {
        calls.disposed.push('fluid');
      }
    },
    FullscreenPass: class {
      render() {
        calls.renders++;
      }
      dispose() {
        calls.disposed.push('pass');
      }
    },
  };
  runInNewContext(compiled, {
    exports,
    require: (name) => {
      if (name === 'three') return three;
      if (name === './FluidHeading')
        return {
          createHeadingUniforms: () => ({ viewport: new three.Uniform(new three.Vector2()) }),
          FluidHeading: class {
            themeChanged() {}
            refresh() {}
            activate() {}
            deactivate() {}
            dispose() {}
          },
        };
      if (name === './fluidShader') return { FLUID_FRAGMENT: '' };
      return fluid;
    },
    window: target('window:'),
    document,
    innerWidth: 1000,
    innerHeight: 500,
    devicePixelRatio: 2,
    performance: { now: () => now },
    getComputedStyle: () => ({ getPropertyValue: (name) => `${theme}:${name}` }),
    MutationObserver: class {
      constructor(fn) {
        observer = fn;
      }
      observe() {}
      disconnect() {
        calls.disposed.push('observer');
      }
    },
    requestAnimationFrame: (fn) => {
      frame = fn;
      return 1;
    },
    cancelAnimationFrame: () => {
      frame = undefined;
    },
  });
  const dispose = exports.createFluidOverlay(canvas);
  const move = (x, pointerType = 'mouse') =>
    events.get('window:pointermove')({ clientX: x, clientY: 100, pointerId: 1, pointerType });
  move(100, 'touch');
  move(100);
  move(120);
  assert.equal(calls.splats.length, 1);
  assert.equal(calls.splats[0][0], 0.12);
  assert.equal(calls.splats[0][1], 0.8);
  assert.equal(calls.splats[0][2], 120);
  now = 20;
  frame(now);
  assert.equal(calls.renders, 1);
  assert.ok(calls.steps[0] <= 1 / 60);
  now = 5000;
  frame(now);
  assert.ok(calls.clears > 0);
  theme = 'dark';
  observer();
  assert.equal(material.uniforms.cobalt.value.value, 'dark:--brick-blue');
  document.hidden = true;
  events.get('document:visibilitychange')();
  move(140);
  assert.equal(calls.splats.length, 1);
  dispose();
  dispose();
  assert.equal(events.size, 0);
  assert.deepEqual(calls.disposed, ['observer', 'fluid', 'pass', 'renderer']);
  assert.equal(canvas.dataset.fluidReady, 'false');
});
