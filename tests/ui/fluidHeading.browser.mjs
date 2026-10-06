import assert from 'node:assert/strict';
import { test } from 'node:test';
import { startChromium } from '../helpers/chromium.mjs';

const baseUrl = process.env.UI_TEST_BASE_URL ?? 'http://localhost:3105';

test('CMS h1 distortion reuses its texture, follows layout changes, and retains the HTML fallback', async () => {
  const browser = await startChromium(process.env.UI_TEST_CHROME);
  const { call, evaluate, waitFor } = browser;
  try {
    await call('Emulation.setDeviceMetricsOverride', { width: 1280, height: 900, deviceScaleFactor: 1, mobile: false });
    await call('Page.navigate', { url: baseUrl });
    await waitFor('document.querySelector("[data-fluid-overlay]")?.dataset.fluidReady === "idle"');
    assert.equal(
      await evaluate(
        'document.querySelector("h1").hasAttribute("data-fluid-gradient") && getComputedStyle(document.querySelector("h1")).backgroundImage.includes("linear-gradient") && getComputedStyle(document.querySelector("h1 span")).webkitTextFillColor === "rgba(0, 0, 0, 0)"',
      ),
      true,
      'native CMS text uses the theme gradient before the GPU starts',
    );
    const originalText = await evaluate('document.querySelector("h1").textContent');
    const originalHeight = await evaluate('document.querySelector("h1").getBoundingClientRect().height');
    await evaluate(
      `window.headingRasterCalls=0;window.headingPaintColors=[];window.headingGradientStops=[];const addColorStop=CanvasGradient.prototype.addColorStop;CanvasGradient.prototype.addColorStop=function(offset,color){window.headingGradientStops.push([offset,color]);return addColorStop.call(this,offset,color)};window.headingTextureSizes=[];const fillText=CanvasRenderingContext2D.prototype.fillText;CanvasRenderingContext2D.prototype.fillText=function(...args){window.headingRasterCalls++;window.headingPaintColors.push(this.fillStyle);window.headingTextureSizes.push([this.canvas.width,this.canvas.height]);return fillText.apply(this,args);}`,
    );
    await call('Input.dispatchMouseEvent', { type: 'mouseMoved', x: 200, y: 250 });
    await waitFor('document.querySelector("[data-fluid-overlay]").dataset.fluidReady === "true"');
    await waitFor('window.headingRasterCalls > 0');
    assert.equal(
      await evaluate(
        'document.querySelector("[data-fluid-overlay]").width === document.querySelector("[data-fluid-overlay]").clientWidth',
      ),
      true,
      'renderer and displayed canvas must share the same viewport, excluding scrollbars',
    );
    const bounds = await evaluate(
      '(()=>{const rect=document.querySelector("h1").getBoundingClientRect();return {left:rect.left,top:rect.top,width:rect.width}})()',
    );
    const paint = async () => {
      for (let i = 0; i < 24; i++) {
        await call('Input.dispatchMouseEvent', {
          type: 'mouseMoved',
          x: bounds.left + 40 + i * 12,
          y: bounds.top + 35,
        });
        await evaluate('new Promise(resolve=>requestAnimationFrame(resolve))');
      }
    };
    await paint();
    await waitFor('document.querySelector("h1").dataset.fluidTextActive === "true"');
    assert.equal(await evaluate('document.querySelector("h1").textContent'), originalText);
    assert.equal(await evaluate('getComputedStyle(document.querySelector("h1")).opacity'), '0');
    assert.equal(await evaluate('document.querySelectorAll("canvas[data-fluid-overlay]").length'), 1);
    assert.ok(
      Math.abs((await evaluate('document.querySelector("h1").getBoundingClientRect().height')) - originalHeight) < 0.5,
    );
    const accessibility = await call('Accessibility.getFullAXTree');
    assert.ok(
      accessibility.nodes.some(
        (node) =>
          !node.ignored &&
          node.role?.value === 'heading' &&
          node.properties?.some((property) => property.name === 'level' && property.value.value === 1),
      ),
      'the semantic h1 must remain accessible during distortion',
    );
    const gpuHeadingMatchesTheme = async () =>
      evaluate(`new Promise(resolve=>requestAnimationFrame(()=>{
      const node=document.querySelector('h1 span').firstChild;
      const range=document.createRange();range.selectNodeContents(node);const rect=range.getBoundingClientRect();
      const canvas=document.querySelector('[data-fluid-overlay]');const gl=canvas.getContext('webgl2');
      const ratio=canvas.width/canvas.getBoundingClientRect().width;const x=Math.max(0,Math.floor((rect.left-16)*ratio));
      const y=Math.max(0,Math.floor((innerHeight-rect.bottom-16)*ratio));
      const width=Math.min(canvas.width-x,Math.ceil((rect.width+32)*ratio));const height=Math.min(canvas.height-y,Math.ceil((rect.height+32)*ratio));
      const pixels=new Uint8Array(width*height*4);gl.readPixels(x,y,width,height,gl.RGBA,gl.UNSIGNED_BYTE,pixels);
      const counts=new Map();for(let i=0;i<pixels.length;i+=4){if(pixels[i+3]>250){const key=[pixels[i],pixels[i+1],pixels[i+2]].join(',');counts.set(key,(counts.get(key)||0)+1);}}
      const mode=[...counts].sort((a,b)=>b[1]-a[1])[0]?.[0].split(',').map(Number);
      const theme=getComputedStyle(document.documentElement);const ctx=document.createElement('canvas').getContext('2d');const rgb=name=>{ctx.fillStyle=theme.getPropertyValue(name).trim();const hex=ctx.fillStyle;return [1,3,5].map(i=>parseInt(hex.slice(i,i+2),16))};const start=rgb('--brand-3'),end=rgb('--brand-2');
      resolve(!!mode&&mode.every((channel,index)=>channel>=Math.min(start[index],end[index])-3&&channel<=Math.max(start[index],end[index])+3));
    }))`);
    const captures = await evaluate('window.headingRasterCalls');
    await paint();
    assert.equal(await evaluate('window.headingRasterCalls'), captures, 'animation frames must reuse the texture');
    assert.equal(await evaluate('window.headingTextureSizes.every(size=>size[0]<=2048&&size[1]<=2048)'), true);
    await evaluate(
      'window.headingPaintColors=[];window.headingGradientStops=[];document.querySelector("input[role=switch]").click()',
    );
    await waitFor(`window.headingRasterCalls > ${captures}`);
    await waitFor('document.querySelector("h1").dataset.fluidTextActive === "true"');
    assert.equal(
      await evaluate(
        `(()=>{const theme=getComputedStyle(document.documentElement);return window.headingGradientStops.some(([offset,color])=>offset===0&&color===theme.getPropertyValue('--brand-3').trim())&&window.headingGradientStops.some(([offset,color])=>offset===1&&color===theme.getPropertyValue('--brand-2').trim())})()`,
      ),
      true,
      'texture must use settled theme colors',
    );
    assert.equal(await gpuHeadingMatchesTheme(), true, 'rendered GPU text must match the selected theme');
    const beforeRapidToggle = await evaluate('window.headingRasterCalls');
    await evaluate(
      'window.headingPaintColors=[];window.headingGradientStops=[];document.querySelector("input[role=switch]").click()',
    );
    await evaluate('new Promise(resolve=>requestAnimationFrame(()=>requestAnimationFrame(resolve)))');
    await evaluate('document.querySelector("input[role=switch]").click()');
    await waitFor(`window.headingRasterCalls > ${beforeRapidToggle}`);
    assert.equal(
      await evaluate(
        `(()=>{const theme=getComputedStyle(document.documentElement);return window.headingGradientStops.some(([offset,color])=>offset===0&&color===theme.getPropertyValue('--brand-3').trim())&&window.headingGradientStops.some(([offset,color])=>offset===1&&color===theme.getPropertyValue('--brand-2').trim())})()`,
      ),
      true,
      'rapid theme switches must paint the latest colors without reload',
    );
    assert.equal(await gpuHeadingMatchesTheme(), true, 'GPU texture must update after rapid theme switches');
    const beforeCmsChange = await evaluate('window.headingRasterCalls');
    await evaluate('document.querySelector("h1 span").firstChild.textContent="New CMS headline ";');
    await waitFor(`window.headingRasterCalls > ${beforeCmsChange}`);
    assert.ok((await evaluate('document.querySelector("h1").textContent')).includes('New CMS headline'));
    const beforeResize = await evaluate('window.headingRasterCalls');
    await call('Emulation.setDeviceMetricsOverride', { width: 1150, height: 900, deviceScaleFactor: 1, mobile: false });
    await waitFor(`window.headingRasterCalls > ${beforeResize}`);
    await paint();
    await waitFor('document.querySelector("h1").dataset.fluidTextActive === "true"');
    await evaluate('new Promise(resolve=>requestAnimationFrame(()=>requestAnimationFrame(resolve)))');
    assert.equal(
      await evaluate('document.querySelector("[data-fluid-overlay]").getContext("webgl2").getError()'),
      0,
      'resizing the text texture must not produce WebGL errors',
    );
    await evaluate('document.documentElement.style.scrollBehavior="auto";scrollTo(0,25);');
    await waitFor('!document.querySelector("h1").hasAttribute("data-fluid-text-active")');
    assert.equal(
      await evaluate('getComputedStyle(document.querySelector("h1")).opacity'),
      '1',
      'HTML heading stays fixed to document flow while scrolling',
    );
    await waitFor('document.querySelector("h1").dataset.fluidTextActive === "true"');
    await evaluate('scrollTo(0,1000);');
    await waitFor('!document.querySelector("h1").hasAttribute("data-fluid-text-active")');
    assert.equal(await evaluate('getComputedStyle(document.querySelector("h1")).opacity'), '1');
    await evaluate('scrollTo(0,0)');
    await waitFor('document.querySelector("h1").dataset.fluidTextActive === "true"');
    await waitFor('!document.querySelector("h1").hasAttribute("data-fluid-text-active")');
    assert.equal(await evaluate('getComputedStyle(document.querySelector("h1")).opacity'), '1');
    await paint();
    await waitFor('document.querySelector("h1").dataset.fluidTextActive === "true"');
    await evaluate(
      'const range=document.createRange();range.selectNodeContents(document.querySelector("h1"));getSelection().removeAllRanges();getSelection().addRange(range);',
    );
    await waitFor('!document.querySelector("h1").hasAttribute("data-fluid-text-active")');
    await evaluate('getSelection().removeAllRanges()');
    await call('Emulation.setEmulatedMedia', { features: [{ name: 'prefers-reduced-motion', value: 'reduce' }] });
    await waitFor('document.querySelector("[data-fluid-overlay]").dataset.fluidReady === "false"');
    assert.equal(await evaluate('getComputedStyle(document.querySelector("h1")).opacity'), '1');
    await call('Page.navigate', { url: `${baseUrl}/projects/metagenics-gecom` });
    await waitFor('!!document.querySelector("h1[data-fluid-heading]")');
    assert.equal(await evaluate('getComputedStyle(document.querySelector("h1")).opacity'), '1');
    assert.deepEqual(browser.exceptions, []);
  } finally {
    await browser.close();
  }
});

test('footer gradient shares the fluid renderer and disclosures animate reversibly', async () => {
  const browser = await startChromium(process.env.UI_TEST_CHROME);
  const { call, evaluate, waitFor } = browser;
  try {
    await call('Emulation.setDeviceMetricsOverride', { width: 1280, height: 900, deviceScaleFactor: 1, mobile: false });
    await call('Page.navigate', { url: baseUrl });
    await waitFor('document.querySelector("[data-fluid-overlay]")?.dataset.fluidReady === "idle"');
    await evaluate(
      'document.documentElement.style.scrollBehavior="auto";window.disclosure=document.querySelector("[data-animated-disclosure]");window.closedHeight=disclosure.getBoundingClientRect().height;disclosure.querySelector("summary").click()',
    );
    assert.equal(await evaluate('disclosure.open && disclosure.getAnimations().length === 1'), true);
    await waitFor('disclosure.getBoundingClientRect().height > closedHeight + 10');
    await waitFor('disclosure.getAnimations().length === 0');
    await evaluate(
      'window.openHeight=disclosure.getBoundingClientRect().height;disclosure.querySelector("summary").click()',
    );
    assert.equal(
      await evaluate('disclosure.open && disclosure.getAnimations().length === 1 && disclosure.lastElementChild.inert'),
      true,
    );
    await waitFor('disclosure.getBoundingClientRect().height < openHeight - 10');
    await evaluate('disclosure.querySelector("summary").click()');
    await waitFor('disclosure.getAnimations().length === 0');
    assert.equal(await evaluate('disclosure.open && !disclosure.lastElementChild.inert'), true);
    await evaluate('disclosure.querySelector("summary").click()');
    await waitFor('!disclosure.open');
    assert.ok(Math.abs(await evaluate('disclosure.getBoundingClientRect().height - closedHeight')) < 1);
    await evaluate('scrollTo(0,document.documentElement.scrollHeight)');
    await evaluate('new Promise(resolve=>setTimeout(resolve,180))');
    const rect = await evaluate(
      '(()=>{const r=document.querySelector("[data-fluid-footer]").getBoundingClientRect();return {x:r.left+50,y:r.top+30}})()',
    );
    for (let i = 0; i < 10; i++) {
      await call('Input.dispatchMouseEvent', { type: 'mouseMoved', x: rect.x + i * 15, y: rect.y });
      await evaluate('new Promise(resolve=>requestAnimationFrame(resolve))');
    }
    await waitFor('document.querySelector("[data-fluid-footer]").dataset.fluidTextActive === "true"');
    assert.equal(await evaluate('document.querySelectorAll("canvas[data-fluid-overlay]").length'), 1);
    assert.equal(await evaluate('getComputedStyle(document.querySelector("[data-fluid-footer]")).opacity'), '0');
    assert.equal(
      await evaluate(
        'getComputedStyle(document.querySelector("[data-fluid-footer]")).backgroundImage.includes("linear-gradient")',
      ),
      true,
    );
    assert.equal(await evaluate('document.querySelector("h1").hasAttribute("data-fluid-text-active")'), false);
    assert.equal(await evaluate('document.querySelector("[data-fluid-overlay]").getContext("webgl2").getError()'), 0);
    await call('Emulation.setEmulatedMedia', { features: [{ name: 'prefers-reduced-motion', value: 'reduce' }] });
    await waitFor('!document.querySelector("[data-fluid-footer]").hasAttribute("data-fluid-text-active")');
    await evaluate('disclosure.querySelector("summary").click()');
    assert.equal(await evaluate('disclosure.open && disclosure.getAnimations().length === 0'), true);
    assert.equal(await evaluate('getComputedStyle(document.querySelector("[data-fluid-footer]")).opacity'), '1');
    assert.deepEqual(browser.exceptions, []);
  } finally {
    await browser.close();
  }
});
