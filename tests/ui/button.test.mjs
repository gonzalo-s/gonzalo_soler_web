import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import { runInNewContext } from 'node:vm';
import { test } from 'node:test';
import ts from 'typescript';
import * as hrefUtils from '../../src/lib/ui/getHref.ts';

const require = createRequire(import.meta.url);
const source = readFileSync(new URL('../../src/components/atoms/Button/Button.tsx', import.meta.url), 'utf8');
const compiled = ts.transpileModule(source, {
  compilerOptions: { module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.ReactJSX },
}).outputText;

// Isolate only router/browser dependencies; execute the real Button implementation.
function loadButton(pathname = '/', target = null) {
  const calls = { scroll: [], history: [] };
  const exports = {};
  const mockedRequire = (name) => {
    if (name === 'next/navigation') return { usePathname: () => pathname };
    if (name === 'next/link') return { __esModule: true, default: 'a' };
    if (name === './buttonUtils') return { getButtonClasses: () => 'button' };
    if (name.endsWith('.scss')) return { __esModule: true, default: { icon: 'icon' } };
    if (name === '@/lib/ui/getHref') return hrefUtils;
    if (name === '@/lib/ui/smoothScroll') return { smoothScrollTo: (value) => calls.scroll.push(value) };
    return require(name);
  };
  runInNewContext(compiled, {
    exports,
    require: mockedRequire,
    document: { getElementById: () => target },
    window: { history: { pushState: (...args) => calls.history.push(args) } },
  });
  return { Button: exports.default, calls };
}
function click(overrides = {}) {
  return {
    button: 0,
    metaKey: false,
    ctrlKey: false,
    shiftKey: false,
    altKey: false,
    defaultPrevented: false,
    preventDefault() {
      this.defaultPrevented = true;
    },
    ...overrides,
  };
}

test('native Button actions fire and do not accidentally submit forms', () => {
  const { Button } = loadButton();
  let count = 0;
  const element = Button({ text: 'Action', onClick: () => count++ });
  assert.equal(element.type, 'button');
  assert.equal(element.props.type, 'button');
  element.props.onClick(click());
  assert.equal(count, 1);
  assert.equal(Button({ text: 'Submit', type: 'submit' }).props.type, 'submit');
});

test('external links invoke callbacks and downloads remain in the current tab', () => {
  const { Button } = loadButton();
  let count = 0;
  const link = Button({ text: 'External', href: { external: 'https://example.com' }, onClick: () => count++ });
  link.props.onClick(click());
  assert.equal(count, 1);
  assert.equal(link.props.target, '_blank');
  const download = Button({ text: 'Download', href: { external: 'https://example.com/resume.pdf' }, download: true });
  assert.equal(download.props.download, true);
  assert.equal(download.props.target, undefined);
});

test('disabled links cannot activate their callbacks or navigate', () => {
  const { Button } = loadButton();
  let count = 0;
  const link = Button({
    text: 'Disabled',
    href: { external: 'https://example.com' },
    disabled: true,
    onClick: () => count++,
  });
  const event = click();
  link.props.onClick(event);
  assert.equal(link.props['aria-disabled'], true);
  assert.equal(link.props.tabIndex, -1);
  assert.equal(event.defaultPrevented, true);
  assert.equal(count, 0);
});

test('normal in-page links scroll once, preserve their URL hash, and honor modifiers', () => {
  const target = {};
  const { Button, calls } = loadButton('/', target);
  const link = Button({ text: 'Projects', href: { internal: '#projects' } });
  const normal = click();
  link.props.onClick(normal);
  assert.equal(normal.defaultPrevented, true);
  assert.equal(calls.scroll.length, 1);
  assert.equal(calls.history[0][2], '#projects');
  for (const modifier of ['metaKey', 'ctrlKey', 'shiftKey', 'altKey']) {
    const event = click({ [modifier]: true });
    link.props.onClick(event);
    assert.equal(event.defaultPrevented, false);
  }
  assert.equal(calls.scroll.length, 1);
  assert.equal(
    loadButton('/projects/example').Button({ text: 'Projects', href: { internal: '#projects' } }).props.href,
    '/#projects',
  );
});
