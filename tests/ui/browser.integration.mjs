import assert from 'node:assert/strict';
import { test } from 'node:test';
import { startChromium } from '../helpers/chromium.mjs';

const baseUrl = process.env.UI_TEST_BASE_URL ?? 'http://localhost:3105';

test('portfolio UI interactions and server rendering', async (t) => {
  const browser = await startChromium(process.env.UI_TEST_CHROME);
  const { call, evaluate, waitFor } = browser;
  const navigate = async (path) => {
    await call('Page.navigate', { url: `${baseUrl}${path}` });
    await waitFor('document.readyState === "complete" && !!document.querySelector("h1")');
  };
  try {
    await t.test('HTML contains the content before JavaScript runs', async () => {
      const html = await (await fetch(baseUrl)).text();
      assert.match(html, /<h1/);
      assert.match(html, /Frontend Developer/);
      assert.ok((html.match(/<article/g) ?? []).length >= 6);
    });
    await call('Emulation.setDeviceMetricsOverride', { width: 1440, height: 900, deviceScaleFactor: 1, mobile: false });
    await navigate('/');
    await waitFor('!!document.querySelector("[data-locked]")');
    await t.test('chips keep their spacing and isolated rounded icons', async () => {
      const value = await evaluate(
        `(()=>{const chip=document.querySelector('article li');const icon=chip.querySelector('span[aria-hidden="true"]');return {padding:getComputedStyle(chip).padding,radius:getComputedStyle(icon).borderRadius,overflow:getComputedStyle(icon).overflow,src:icon.querySelector('img').getAttribute('src')}})()`,
      );
      assert.equal(value.padding, '8px 16px');
      assert.equal(value.radius, '8px');
      assert.equal(value.overflow, 'hidden');
      assert.match(value.src, /^\/icons\/stack\//);
    });
    await t.test('bricks clamp to the approved locked state and glow', async () => {
      await evaluate(
        `document.documentElement.style.scrollBehavior='auto';const art=document.querySelector('[data-locked]');scrollTo(0,art.getBoundingClientRect().top+scrollY+320)`,
      );
      await waitFor('document.querySelector("[data-locked]").dataset.locked === "true"');
      assert.deepEqual(
        await evaluate(
          `(()=>{const art=document.querySelector('[data-locked]');return [art.style.getPropertyValue('--yellow-lift'),art.style.getPropertyValue('--yellow-rotation')]})()`,
        ),
        ['-10.694390715667312%', '-0.258164deg'],
      );
    });
    await t.test('email links reveal their own addresses without empty anchors', async () => {
      await waitFor(`document.querySelectorAll('a[href^="mailto:"]').length >= 2`);
      assert.equal(
        await evaluate(
          `[...document.querySelectorAll('a[href^="mailto:"]')].every(link=>link.textContent.includes('@'))`,
        ),
        true,
      );
    });
    await t.test('audio playback rejection keeps its play state and reports the problem', async () => {
      await evaluate(
        `HTMLMediaElement.prototype.play=()=>Promise.reject(new Error('blocked'));document.querySelector('button[aria-label="Play spoken résumé"]').click()`,
      );
      await waitFor('!!document.querySelector("[role=status]")');
      assert.equal(await evaluate(`!!document.querySelector('button[aria-label="Play spoken résumé"]')`), true);
    });
    await call('Emulation.setDeviceMetricsOverride', { width: 390, height: 844, deviceScaleFactor: 1, mobile: true });
    await navigate('/');
    await waitFor('!!document.querySelector("[data-locked]")');
    await t.test('closed mobile menu is inert; opening and Escape manage focus', async () => {
      assert.equal(
        await evaluate(
          `document.getElementById(document.querySelector('button[aria-controls]').getAttribute('aria-controls')).inert`,
        ),
        true,
      );
      await evaluate(`document.querySelector('button[aria-controls]').click()`);
      await waitFor('document.querySelector("button[aria-controls]").getAttribute("aria-expanded") === "true"');
      await waitFor(
        `document.getElementById(document.querySelector('button[aria-controls]').getAttribute('aria-controls')).contains(document.activeElement)`,
      );
      await evaluate(`document.dispatchEvent(new KeyboardEvent('keydown',{key:'Escape',bubbles:true}))`);
      await waitFor('document.querySelector("button[aria-controls]").getAttribute("aria-expanded") === "false"');
      assert.equal(await evaluate('document.activeElement === document.querySelector("button[aria-controls]")'), true);
      await evaluate(`document.querySelector('button[aria-controls]').click()`);
      await waitFor('document.querySelector("button[aria-controls]").getAttribute("aria-expanded") === "true"');
      await evaluate(
        `const menu=document.getElementById(document.querySelector('button[aria-controls]').getAttribute('aria-controls'));const link=menu.querySelector('a');link.addEventListener('click',e=>e.preventDefault(),{once:true});link.click()`,
      );
      await waitFor('document.querySelector("button[aria-controls]").getAttribute("aria-expanded") === "false"');
    });
    await t.test('mobile layout fits the viewport and chip list can scroll by keyboard', async () => {
      assert.equal(await evaluate('document.documentElement.scrollWidth <= innerWidth'), true);
      const scroll = await evaluate(
        `(()=>{const list=document.querySelector('ul[tabindex="0"]');list.scrollLeft=0;list.dispatchEvent(new KeyboardEvent('keydown',{key:'ArrowRight',bubbles:true}));return list.scrollLeft})()`,
      );
      assert.ok(scroll > 0);
    });
    await t.test('technology track loops with no controls and pauses on hover and focus', async () => {
      await call('Input.dispatchMouseEvent', { type: 'mouseMoved', x: 0, y: 0 });
      await evaluate(
        `document.activeElement.blur();document.querySelector('ul[tabindex="0"]').scrollIntoView({behavior:'instant',block:'center'})`,
      );
      await waitFor(`document.querySelector('ul[tabindex="0"]').dataset.loop === 'true'`);
      assert.equal(
        await evaluate(`!!document.querySelector('button[aria-label="Pause technology scrolling"]')`),
        false,
      );
      assert.equal(
        await evaluate(`getComputedStyle(document.querySelector('ul[tabindex="0"]')).scrollbarWidth`),
        'none',
      );
      assert.equal(
        await evaluate(
          `[...document.querySelectorAll('[data-scroll-copy]')].every(chip=>chip.getAttribute('aria-hidden')==='true')`,
        ),
        true,
      );
      const moving = await evaluate(
        `(async()=>{const list=document.querySelector('ul[tabindex="0"]');const before=list.scrollLeft;await new Promise(r=>setTimeout(r,600));return list.scrollLeft-before})()`,
      );
      assert.ok(moving > 0);
      const point = await evaluate(
        `(()=>{const rect=document.querySelector('ul[tabindex="0"]').getBoundingClientRect();return {x:rect.x+20,y:rect.y+20}})()`,
      );
      await call('Input.dispatchMouseEvent', { type: 'mouseMoved', ...point });
      const hovered = await evaluate(
        `(async()=>{const list=document.querySelector('ul[tabindex="0"]');const before=list.scrollLeft;await new Promise(r=>setTimeout(r,350));return list.scrollLeft-before})()`,
      );
      assert.equal(hovered, 0);
      await call('Input.dispatchMouseEvent', { type: 'mouseMoved', x: 0, y: 0 });
      const focused = await evaluate(
        `(async()=>{const list=document.querySelector('ul[tabindex="0"]');list.focus();const before=list.scrollLeft;await new Promise(r=>setTimeout(r,350));return list.scrollLeft-before})()`,
      );
      assert.equal(focused, 0);
    });
    await t.test('theme cookie restores dark mode and the switch persists changes', async () => {
      await call('Network.setCookie', { name: 'theme', value: 'dark', url: baseUrl, path: '/' });
      await navigate('/');
      await waitFor(
        'document.documentElement.dataset.theme === "dark" && document.querySelector("input[role=switch]").checked',
      );
      await evaluate(`document.querySelector('input[role=switch]').click()`);
      await waitFor('document.documentElement.dataset.theme === "light"');
      assert.equal(await evaluate('document.cookie.includes("theme=light")'), true);
    });
    await t.test('reduced motion renders the locked bricks without scrolling', async () => {
      await call('Emulation.setEmulatedMedia', { features: [{ name: 'prefers-reduced-motion', value: 'reduce' }] });
      await navigate('/');
      await waitFor('document.querySelector("[data-locked]")?.dataset.locked === "true"');
      assert.equal(await evaluate('scrollY'), 0);
      await evaluate(`document.querySelector('ul[tabindex="0"]').scrollIntoView({behavior:'instant',block:'center'})`);
      const still = await evaluate(
        `(async()=>{const list=document.querySelector('ul[tabindex="0"]');const before=list.scrollLeft;await new Promise(r=>setTimeout(r,350));return list.scrollLeft-before})()`,
      );
      assert.equal(still, 0, 'reduced motion must disable technology autoplay');
      assert.equal(
        await evaluate(`!!document.querySelector('button[aria-label="Pause technology scrolling"]')`),
        false,
      );
    });
    await t.test('project pages render highlights within their content and keep navigation functional', async () => {
      await navigate('/projects/metagenics-gecom');
      assert.ok(await evaluate('document.querySelectorAll("main span[class*=highlight]").length > 0'));
      assert.equal(await evaluate('document.querySelectorAll("nav span[class*=highlight]").length'), 0);
      assert.equal(
        await evaluate(`document.querySelector('nav a[href="/#projects"]')?.getAttribute('href')`),
        '/#projects',
      );
    });
    assert.deepEqual(browser.exceptions, []);
  } finally {
    await browser.close();
  }
});
