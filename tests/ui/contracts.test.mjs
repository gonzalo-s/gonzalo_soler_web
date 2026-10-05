import assert from 'node:assert/strict';
import { test } from 'node:test';
import { access } from 'node:fs/promises';
import { getId, getInternalHref, isPlainPrimaryClick } from '../../src/lib/ui/getHref.ts';
import { getBrickLockState, LOCKED_LIFT, LOCKED_ROTATION } from '../../src/lib/ui/brickLock.ts';
import { splitHighlightedText } from '../../src/lib/ui/highlightText.ts';
import { smoothScrollTo } from '../../src/lib/ui/smoothScroll.ts';
import { STACK_ICONS, getStackIconSrc } from '../../src/constants/StackIcon/lib/index.js';

test('only local anchors produce section IDs, and cross-route anchors retain their destination', () => {
  assert.equal(getId({ internal: '#projects' }), 'projects');
  for (const href of [
    undefined,
    { external: 'https://example.com' },
    { internal: '/projects/example' },
    { internal: '#' },
  ])
    assert.equal(getId(href), undefined);
  assert.equal(getInternalHref('#projects', '/projects/example'), '/#projects');
  assert.equal(getInternalHref('#projects', '/'), '#projects');
  assert.equal(getInternalHref('/projects/example', '/'), '/projects/example');
});

test('modified link clicks keep native browser behavior', () => {
  const primary = { button: 0, metaKey: false, ctrlKey: false, shiftKey: false, altKey: false };
  assert.equal(isPlainPrimaryClick(primary), true);
  for (const modifier of ['metaKey', 'ctrlKey', 'shiftKey', 'altKey'])
    assert.equal(isPlainPrimaryClick({ ...primary, [modifier]: true }), false);
  assert.equal(isPlainPrimaryClick({ ...primary, button: 1 }), false);
});

test('brick motion clamps to the approved endpoint and activates light only when locked', () => {
  assert.deepEqual(getBrickLockState(0, 800, 900), { lift: '-30%', rotation: '-2deg', locked: false });
  const middle = getBrickLockState(330, 800, 900);
  assert.equal(middle.locked, false);
  assert.ok(parseFloat(middle.lift) > -30 && parseFloat(middle.lift) < parseFloat(LOCKED_LIFT));
  for (const state of [
    getBrickLockState(490, 800, 900),
    getBrickLockState(5000, 800, 900),
    getBrickLockState(0, 800, 900, true),
  ]) {
    assert.deepEqual(state, { lift: LOCKED_LIFT, rotation: LOCKED_ROTATION, locked: true });
  }
  assert.equal(getBrickLockState(0, 800, 900).locked, false, 'scrolling back restores the initial state');
});

test('highlighting preserves text, escapes punctuation, and prefers complete multiword phrases', () => {
  const text = 'React Native, React, Next.js, C++ and reactor.';
  const result = splitHighlightedText(text, ['React', 'React Native', 'Next.js', 'C++', '']);
  assert.equal(result.map((part) => part.text).join(''), text);
  assert.deepEqual(
    result.filter((part) => part.highlighted).map((part) => part.text),
    ['React Native', 'React', 'Next.js', 'C++'],
  );
  assert.deepEqual(splitHighlightedText('<script>alert(1)</script>', []), [
    { text: '<script>alert(1)</script>', highlighted: false },
  ]);
  assert.equal(splitHighlightedText('REACT React', ['React']).filter((part) => part.highlighted).length, 2);
});

test('the icon registry rejects untrusted names and all supported local assets exist', async () => {
  for (const name of ['__proto__', 'constructor', '../../secrets', 'unsupported'])
    assert.equal(getStackIconSrc(name), undefined);
  assert.equal(Object.keys(STACK_ICONS).length, 19);
  await Promise.all(Object.values(STACK_ICONS).map((path) => access(new URL(`../../public${path}`, import.meta.url))));
});

test('native section scrolling respects reduced motion and CSS scroll margins', () => {
  const previous = globalThis.window;
  let reduced = false;
  globalThis.window = { matchMedia: () => ({ matches: reduced }) };
  const calls = [];
  const target = { scrollIntoView: (options) => calls.push(options) };
  try {
    smoothScrollTo(target);
    reduced = true;
    smoothScrollTo(target);
    assert.deepEqual(calls, [
      { behavior: 'smooth', block: 'start' },
      { behavior: 'instant', block: 'start' },
    ]);
  } finally {
    globalThis.window = previous;
  }
});
