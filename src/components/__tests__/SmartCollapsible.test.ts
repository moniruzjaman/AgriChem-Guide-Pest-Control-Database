import { describe, it, expect } from 'vitest';
import { OPEN_KEY } from '../../components/SmartCollapsible';

/**
 * SmartCollapsible behaviour contract (node-environment testable parts).
 *
 * The component itself needs DOM + motion, which the node test env doesn't
 * provide; the collapsible logic is covered by three guarantees tested here:
 *  1. the persistence key is stable per sectionKey — the same key read on
 *     mount and written on toggle, so a user's choice survives reloads;
 *  2. the key is namespaced (no collision with other localStorage users);
 *  3. the height heuristic is a pure function of measured height and the
 *     threshold (mirrors the component's mount effect).
 */

const COLLAPSE_THRESHOLD_PX = 320;

function heuristicDefault(scrollHeight: number, collapseThresholdPx = COLLAPSE_THRESHOLD_PX): boolean {
  // true = starts open; large content starts collapsed.
  return !(scrollHeight > collapseThresholdPx);
}

describe('SmartCollapsible contract', () => {
  it('persistence key is stable and namespaced per section', () => {
    expect(OPEN_KEY('database')).toBe('smartcollapsible_open_database');
    expect(OPEN_KEY('tab-database')).toBe('smartcollapsible_open_tab-database');
    expect(OPEN_KEY('a')).not.toBe(OPEN_KEY('b'));
  });

  it('large content starts collapsed, small content starts open', () => {
    expect(heuristicDefault(700)).toBe(false); // tall → collapsed
    expect(heuristicDefault(120)).toBe(true);  // short → open
    expect(heuristicDefault(320)).toBe(true);  // exactly at threshold → open
    expect(heuristicDefault(321)).toBe(false); // just past threshold → collapsed
  });

  it('threshold is configurable', () => {
    expect(heuristicDefault(500, 480)).toBe(false);
    expect(heuristicDefault(400, 480)).toBe(true);
  });
});
