import { describe, it, expect } from 'vitest';
import { VARIANTS, TAB_IDS } from '../data';
import { parseCard } from '../data/ranking';

describe('variants data', () => {
  it('has unique ids', () => {
    expect(new Set(VARIANTS.map((v) => v.id)).size).toBe(VARIANTS.length);
  });
  it('keeps Plain out of the pull deck', () => {
    expect(VARIANTS.find((v) => v.id === 'plain')!.inRoulette).toBe(false);
  });
  it('keeps wheel labels to 9 characters', () => {
    for (const v of VARIANTS) expect(v.short.length).toBeLessThanOrEqual(9);
  });
  it('parses every example card as rank plus suit', () => {
    for (const v of VARIANTS)
      for (const e of v.examples) for (const c of e.cards) expect(parseCard(c), `${v.id} ${c}`).not.toBeNull();
  });
  it('fits its maximum players in the deck', () => {
    for (const v of VARIANTS) expect(v.cardsEach * v.max).toBeLessThanOrEqual(v.deckCards ?? 52);
  });
  it('has 4 to 5 setup steps and Hinglish plus English text', () => {
    for (const v of VARIANTS) {
      expect(v.setupSteps.length).toBeGreaterThanOrEqual(4);
      expect(v.setupSteps.length).toBeLessThanOrEqual(5);
      for (const s of v.setupSteps) expect(s.hi && s.en).toBeTruthy();
    }
  });
  it('lists every picker variant exactly once', () => {
    const ids = Object.values(TAB_IDS).flat();
    expect(new Set(ids).size).toBe(ids.length);
    for (const id of ids) expect(VARIANTS.some((v) => v.id === id)).toBe(true);
    expect(ids.length).toBe(VARIANTS.length - 1);
    for (const [level, list] of Object.entries(TAB_IDS)) for (const id of list) expect(VARIANTS.find((v) => v.id === id)!.level).toBe(level);
  });
});
