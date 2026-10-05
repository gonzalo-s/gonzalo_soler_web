import assert from 'node:assert/strict';
import { test } from 'node:test';
import { advanceAutoScroll } from '../../src/lib/ui/autoScroll.ts';

test('automatic scrolling advances right-to-left and loops without reversing', () => {
  assert.equal(advanceAutoScroll(20, 100, 100), 22);
  assert.equal(advanceAutoScroll(99, 100, 100), 1);
  assert.equal(advanceAutoScroll(100, 100, 100), 2);
  assert.equal(advanceAutoScroll(50, 30000, 100), 52, 'returning from a background tab must not leap');
  assert.equal(advanceAutoScroll(50, 100, 0), 0);
});
