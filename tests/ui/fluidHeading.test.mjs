import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { runInNewContext } from 'node:vm';
import { test } from 'node:test';
import ts from 'typescript';

test('heading texture is cached, refreshed only when changed, and restores HTML on teardown', async () => {
  const source = readFileSync(
    new URL('../../src/components/organisms/FluidOverlay/FluidHeading.ts', import.meta.url),
    'utf8',
  );
  const compiled = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.CommonJS } }).outputText;
  const timers = new Map();
  const settlements = [];
  const events = new Map(),
    frames = new Map();
  let nextFrame = 0,
    contentChanged,
    resized,
    selected = false,
    theme = 'light';
  const calls = { raster: 0, uploads: 0, disposed: 0 };
  const rect = { left: 100, top: 100, bottom: 200, width: 400, height: 100 };
  const attributes = new Map();
  const element = {
    textContent: 'CMS heading',
    getBoundingClientRect: () => rect,
    setAttribute: (name, value) => attributes.set(name, value),
    removeAttribute: (name) => attributes.delete(name),
  };
  const target = (prefix) => ({
    addEventListener: (name, callback) => events.set(prefix + name, callback),
    removeEventListener: (name) => events.delete(prefix + name),
  });
  const three = {
    CanvasTexture: class {
      constructor(image) {
        this.image = image;
      }
      set needsUpdate(value) {
        if (value) calls.uploads++;
      }
      dispose() {
        calls.disposed++;
      }
    },
    Uniform: class {
      constructor(value) {
        this.value = value;
      }
    },
    Vector2: class {
      set(x, y) {
        this.x = x;
        this.y = y;
      }
    },
    Vector4: class {
      set(...values) {
        this.values = values;
      }
    },
  };
  const raster = {
    HEADING_PADDING: 24,
    waitForHeadingColors: () => new Promise((resolve) => settlements.push(resolve)),
    headingSignature: () => `${element.textContent}/${rect.width}/${theme}`,
    rasterizeHeading: (_, canvas) => {
      calls.raster++;
      canvas.width = rect.width;
      canvas.height = rect.height;
      return true;
    },
  };
  const exports = {};
  runInNewContext(compiled, {
    exports,
    require: (name) => (name === 'three' ? three : raster),
    document: {
      ...target('document:'),
      hidden: false,
      querySelector: () => element,
      querySelectorAll: () => [element],
      getElementById: () => ({}),
      createElement: () => ({}),
      getSelection: () => ({
        isCollapsed: !selected,
        rangeCount: 1,
        getRangeAt: () => ({ intersectsNode: () => selected }),
      }),
      fonts: { ...target('fonts:'), ready: Promise.resolve() },
    },
    window: {
      ...target('window:'),
      setTimeout: (fn) => {
        timers.set(1, fn);
        return 1;
      },
      clearTimeout: (id) => timers.delete(id),
    },
    innerWidth: 1000,
    innerHeight: 500,
    ResizeObserver: class {
      constructor(fn) {
        resized = fn;
      }
      observe() {}
      disconnect() {}
    },
    MutationObserver: class {
      constructor(fn) {
        contentChanged = fn;
      }
      observe() {}
      disconnect() {}
    },
    requestAnimationFrame: (fn) => {
      frames.set(++nextFrame, fn);
      return nextFrame;
    },
    cancelAnimationFrame: (id) => frames.delete(id),
  });
  const flush = () => {
    for (const [id, fn] of [...frames]) {
      frames.delete(id);
      fn();
    }
  };
  const uniforms = exports.createHeadingUniforms();
  uniforms.viewport.value.set(985, 500);
  const heading = new exports.FluidHeading(uniforms);
  await Promise.resolve();
  flush();
  assert.equal(calls.raster, 1);
  heading.activate();
  assert.equal(
    uniforms.headingRect.value.values[0],
    (rect.left - 24) / 985,
    'heading positions use the displayed canvas width, excluding the scrollbar',
  );
  assert.equal(uniforms.headingEnabled.value, 1);
  assert.equal(attributes.get('data-fluid-text-active'), 'true');
  resized();
  flush();
  heading.refresh();
  flush();
  assert.equal(calls.raster, 1, 'unchanged layout must not rerasterize');
  assert.equal(calls.uploads, 1, 'unchanged layout must not upload the texture');
  events.get('fonts:loadingdone')();
  flush();
  assert.equal(calls.raster, 2, 'loaded fonts invalidate the texture even if CSS is unchanged');
  theme = 'dark';
  heading.themeChanged();
  flush();
  assert.equal(attributes.has('data-fluid-text-active'), false, 'HTML remains visible while theme colors transition');
  assert.equal(calls.raster, 2, 'do not capture intermediate theme colors');
  settlements.shift()();
  await Promise.resolve();
  flush();
  assert.equal(calls.raster, 3);
  theme = 'light';
  heading.themeChanged();
  flush();
  theme = 'dark';
  heading.themeChanged();
  flush();
  settlements.shift()();
  await Promise.resolve();
  flush();
  assert.equal(calls.raster, 3, 'a cancelled theme refresh must not paint stale colors');
  settlements.shift()();
  await Promise.resolve();
  flush();
  assert.equal(calls.raster, 4, 'the latest theme refresh must invalidate the cached texture');
  element.textContent = 'Updated CMS heading';
  contentChanged();
  flush();
  assert.equal(calls.raster, 5);
  rect.top = -200;
  rect.bottom = -100;
  events.get('window:scroll')();
  assert.equal(attributes.has('data-fluid-text-active'), false, 'scrolling immediately restores native text');
  timers.get(1)();
  flush();
  assert.equal(uniforms.headingEnabled.value, 0);
  assert.equal(attributes.has('data-fluid-text-active'), false);
  rect.top = 100;
  rect.bottom = 200;
  events.get('window:scroll')();
  assert.equal(attributes.has('data-fluid-text-active'), false, 'scrolling immediately restores native text');
  timers.get(1)();
  flush();
  assert.equal(uniforms.headingEnabled.value, 1);
  assert.equal(calls.raster, 5, 'scrolling must reuse the texture');
  rect.width = 350;
  resized();
  flush();
  assert.equal(calls.raster, 6);
  assert.equal(calls.disposed, 2, 'resize replaces the old immutable GPU texture');
  selected = true;
  events.get('document:selectionchange')();
  assert.equal(uniforms.headingEnabled.value, 0);
  assert.equal(attributes.has('data-fluid-text-active'), false);
  heading.dispose();
  assert.equal(events.size, 0);
  assert.equal(calls.disposed, 3);
  assert.equal(attributes.has('data-fluid-text-active'), false);
});
