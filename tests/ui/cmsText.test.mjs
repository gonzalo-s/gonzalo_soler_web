import assert from 'node:assert/strict';
import { test } from 'node:test';
import { splitCmsText, phraseScale } from '../../src/lib/ui/cmsText.ts';

test('CMS markers group only the selected phrase and preserve surrounding text', () => {
  assert.deepEqual(splitCmsText('Frontend Developer **Composable Commerce**'), [
    { text: 'Frontend Developer ', keepTogether: false },
    { text: 'Composable Commerce', keepTogether: true },
  ]);
  assert.deepEqual(
    splitCmsText('**One phrase** and **another phrase**').map((p) => p.keepTogether),
    [true, false, true],
  );
  assert.deepEqual(splitCmsText('Unfinished **phrase'), [{ text: 'Unfinished **phrase', keepTogether: false }]);
  assert.equal(splitCmsText('<script>text</script>')[0].text, '<script>text</script>');
});

test('phrases shrink only when the full phrase is wider than the container', () => {
  assert.equal(phraseScale(300, 600), 0.5);
  assert.equal(phraseScale(600, 300), 1);
  assert.equal(phraseScale(0, 300), 1);
  assert.equal(phraseScale(300, 0), 1);
});

test('fitting responds to resize and font loading, restores normal size, and cleans up', async () => {
  const { readFileSync } = await import('node:fs');
  const { createRequire } = await import('node:module');
  const { runInNewContext } = await import('node:vm');
  const require = createRequire(import.meta.url);
  const ts = require('typescript');
  const source = readFileSync(new URL('../../src/components/atoms/FitPhrase/FitPhrase.tsx', import.meta.url), 'utf8');
  const compiled = ts.transpileModule(source, {
    compilerOptions: { module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.ReactJSX },
  }).outputText;
  const container = { clientWidth: 300, parentElement: {} };
  const text = { style: {}, getBoundingClientRect: () => ({ width: 600 }) };
  const refs = [container, text];
  let effect,
    onResize,
    cleanup,
    disconnected = false,
    removed = false;
  const exports = {};
  runInNewContext(compiled, {
    exports,
    require: (name) => {
      if (name === 'react')
        return {
          useRef: () => ({ current: refs.shift() }),
          useEffect: (fn) => {
            effect = fn;
          },
        };
      if (name === '@/lib/ui/cmsText') return { phraseScale };
      if (name.endsWith('.scss')) return { default: {} };
      return require(name);
    },
    ResizeObserver: class {
      constructor(fn) {
        onResize = fn;
      }
      observe() {}
      disconnect() {
        disconnected = true;
      }
    },
    window: {
      addEventListener() {},
      removeEventListener() {
        removed = true;
      },
    },
    document: { fonts: { ready: Promise.resolve() } },
  });
  exports.default({ children: 'Composable Commerce' });
  cleanup = effect();
  assert.equal(text.style.fontSize, '50%');
  container.clientWidth = 900;
  onResize();
  assert.equal(text.style.fontSize, '100%');
  container.clientWidth = 150;
  await Promise.resolve();
  assert.equal(text.style.fontSize, '25%');
  cleanup();
  assert.equal(disconnected, true);
  assert.equal(removed, true);
});
