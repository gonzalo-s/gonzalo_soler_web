import assert from 'node:assert/strict';
import { test } from 'node:test';
import { advanceAutoScroll } from '../../src/lib/ui/autoScroll.ts';

test('automatic scrolling moves at a gentle speed and reverses without jumping', () => {
  assert.deepEqual(advanceAutoScroll(20, 1, 100, 100), { position: 22, direction: 1, atEdge: false });
  assert.deepEqual(advanceAutoScroll(99, 1, 100, 100), { position: 100, direction: -1, atEdge: true });
  assert.deepEqual(advanceAutoScroll(1, -1, 100, 100), { position: 0, direction: 1, atEdge: true });
  assert.equal(advanceAutoScroll(50, 1, 30000, 100).position, 52, 'returning from a background tab must not leap');
  assert.equal(advanceAutoScroll(50, 1, 100, 0).position, 0, 'a list that fits must not move');
});
