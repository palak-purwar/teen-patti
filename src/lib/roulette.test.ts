import { describe, it, expect } from 'vitest';
import { pickAndRotate } from './roulette';

describe('pickAndRotate', () => {
  it('lands the pointer inside the winning segment for n = 1..12', () => {
    for (let n = 1; n <= 12; n++) {
      let rot = 0;
      for (let i = 0; i < 400; i++) {
        const { winner, newRot } = pickAndRotate(n, rot);
        expect(winner).toBeGreaterThanOrEqual(0);
        expect(winner).toBeLessThan(n);
        const centre = (winner * 360) / n;
        // sector at angle th ends up at th + rot; the pointer is at 0 (top)
        const at = (((-newRot) % 360) + 360) % 360;
        let diff = at - centre;
        diff = ((diff + 540) % 360) - 180;
        expect(Math.abs(diff)).toBeLessThan(180 / n);
        expect(newRot).toBeGreaterThan(rot + 360 * 5 - 1e-9);
        rot = newRot;
      }
    }
  });

  it('is deterministic for a given random source', () => {
    const seq = [0.5, 0.5];
    const r = () => seq.shift()!;
    const out = pickAndRotate(4, 0, r);
    expect(out.winner).toBe(2);
    expect(out.newRot).toBe(360 * 5 + 180);
  });

  it('handles a single sector', () => {
    const { winner, newRot } = pickAndRotate(1, 123, () => 0.99);
    expect(winner).toBe(0);
    expect(newRot).toBeGreaterThan(123 + 1800 - 1);
  });
});
