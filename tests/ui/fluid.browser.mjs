import assert from 'node:assert/strict';
import { test } from 'node:test';
import { startChromium } from '../helpers/chromium.mjs';

const baseUrl = process.env.UI_TEST_BASE_URL ?? 'http://localhost:3105';

test('fluid overlay loads on mouse movement, preserves interactions, and respects reduced motion', async () => {
  const browser = await startChromium(process.env.UI_TEST_CHROME);
  const { call, evaluate, waitFor } = browser;
  try {
    await call('Emulation.setDeviceMetricsOverride', { width: 1280, height: 900, deviceScaleFactor: 1, mobile: false });
    await call('Page.navigate', { url: baseUrl });
    await waitFor('document.readyState === "complete" && !!document.querySelector("[data-fluid-overlay]")');
    await waitFor('document.querySelector("[data-fluid-overlay]").dataset.fluidReady === "idle"');
    assert.equal(await evaluate('document.querySelector("[data-fluid-overlay]").dataset.fluidReady'), 'idle');
    await call('Input.dispatchMouseEvent', { type: 'mouseMoved', x: 500, y: 300 });
    await waitFor('document.querySelector("[data-fluid-overlay]").dataset.fluidReady === "true"');
    for (let x = 500; x < 900; x += 20) await call('Input.dispatchMouseEvent', { type: 'mouseMoved', x, y: 400 });
    assert.equal(
      await evaluate('getComputedStyle(document.querySelector("[data-fluid-overlay]")).pointerEvents'),
      'none',
    );
    assert.equal(await evaluate('document.elementFromPoint(800,400).tagName === "CANVAS"'), false);
    assert.equal(await evaluate('document.querySelector("[data-fluid-overlay]").getAttribute("aria-hidden")'), 'true');
    await evaluate('document.documentElement.dataset.theme="dark"');
    await evaluate('document.documentElement.dataset.theme="light"');
    await call('Emulation.setDeviceMetricsOverride', { width: 768, height: 900, deviceScaleFactor: 1, mobile: false });
    await waitFor('document.querySelector("[data-fluid-overlay]").dataset.fluidReady === "false"');
    assert.equal(await evaluate('getComputedStyle(document.querySelector("[data-fluid-overlay]")).display'), 'none');
    assert.equal(await evaluate('getComputedStyle(document.querySelector("h1")).opacity'), '1');
    await call('Input.dispatchMouseEvent', { type: 'mouseMoved', x: 600, y: 300 });
    assert.equal(await evaluate('document.querySelector("[data-fluid-overlay]").dataset.fluidReady'), 'false');
    await call('Emulation.setDeviceMetricsOverride', { width: 1280, height: 900, deviceScaleFactor: 1, mobile: false });
    await evaluate('new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve)))');
    await call('Input.dispatchMouseEvent', { type: 'mouseMoved', x: 650, y: 300 });
    await waitFor('document.querySelector("[data-fluid-overlay]").dataset.fluidReady === "true"');
    await call('Emulation.setEmulatedMedia', { features: [{ name: 'prefers-reduced-motion', value: 'reduce' }] });
    await waitFor('document.querySelector("[data-fluid-overlay]").dataset.fluidReady === "false"');
    assert.equal(await evaluate('getComputedStyle(document.querySelector("[data-fluid-overlay]")).display'), 'none');
    await call('Emulation.setEmulatedMedia', {
      features: [{ name: 'prefers-reduced-motion', value: 'no-preference' }],
    });
    await evaluate('new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve)))');
    await call('Input.dispatchMouseEvent', { type: 'mouseMoved', x: 600, y: 300 });
    await waitFor('document.querySelector("[data-fluid-overlay]").dataset.fluidReady === "true"');
    await call('Emulation.setEmulatedMedia', { features: [{ name: 'prefers-reduced-motion', value: 'reduce' }] });
    await call('Page.navigate', { url: baseUrl });
    await waitFor('document.readyState === "complete" && !!document.querySelector("[data-fluid-overlay]")');
    await call('Input.dispatchMouseEvent', { type: 'mouseMoved', x: 500, y: 300 });
    await waitFor('document.querySelector("[data-fluid-overlay]").dataset.fluidReady === "idle"');
    assert.equal(await evaluate('document.querySelector("[data-fluid-overlay]").dataset.fluidReady'), 'idle');
    await call('Emulation.setEmulatedMedia', {
      features: [{ name: 'prefers-reduced-motion', value: 'no-preference' }],
    });
    await evaluate('new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve)))');
    await evaluate(
      `window.fluidContextAttempts=0;const getContext=HTMLCanvasElement.prototype.getContext;HTMLCanvasElement.prototype.getContext=function(type,...args){if(type==='webgl2'){window.fluidContextAttempts++;return null;}return getContext.call(this,type,...args);}`,
    );
    await call('Input.dispatchMouseEvent', { type: 'mouseMoved', x: 550, y: 300 });
    await waitFor('document.querySelector("[data-fluid-overlay]").dataset.fluidReady === "false"');
    const attempts = await evaluate('window.fluidContextAttempts');
    assert.ok(attempts > 0);
    for (let x = 560; x < 650; x += 10) await call('Input.dispatchMouseEvent', { type: 'mouseMoved', x, y: 300 });
    assert.equal(await evaluate('window.fluidContextAttempts'), attempts);
    await call('Emulation.setDeviceMetricsOverride', { width: 390, height: 844, deviceScaleFactor: 1, mobile: true });
    await call('Page.navigate', { url: baseUrl });
    await waitFor('document.querySelector("[data-fluid-overlay]")?.dataset.fluidReady === "idle"');
    await evaluate(
      `window.mobileWebglAttempts=0;const original=HTMLCanvasElement.prototype.getContext;HTMLCanvasElement.prototype.getContext=function(type,...args){if(type==='webgl2')window.mobileWebglAttempts++;return original.call(this,type,...args);}`,
    );
    await call('Input.dispatchMouseEvent', { type: 'mouseMoved', x: 150, y: 300 });
    await evaluate('new Promise(resolve=>requestAnimationFrame(()=>requestAnimationFrame(resolve)))');
    assert.equal(
      await evaluate('window.mobileWebglAttempts'),
      0,
      'mobile must not create a WebGL context even with mouse input',
    );
    assert.equal(await evaluate('getComputedStyle(document.querySelector("h1")).opacity'), '1');
    assert.equal(await evaluate('getComputedStyle(document.querySelector("[data-fluid-overlay]")).display'), 'none');
    assert.deepEqual(browser.exceptions, []);
  } finally {
    await browser.close();
  }
});
