import type { Bi } from './types';

export type RankRow = { rank: number; name: Bi; cards: string[] };

export const STANDARD_RANKING: RankRow[] = [
  { rank: 1, name: { hi: 'Trail', en: 'Three of a kind' }, cards: ['7♠', '7♥', '7♦'] },
  { rank: 2, name: { hi: 'Pure sequence', en: 'Straight flush' }, cards: ['4♥', '5♥', '6♥'] },
  { rank: 3, name: { hi: 'Sequence', en: 'Straight' }, cards: ['4♠', '5♦', '6♣'] },
  { rank: 4, name: { hi: 'Colour', en: 'Flush' }, cards: ['K♣', '9♣', '2♣'] },
  { rank: 5, name: { hi: 'Pair', en: 'Pair' }, cards: ['Q♥', 'Q♠', '5♦'] },
  { rank: 6, name: { hi: 'High card', en: 'High card' }, cards: ['K♦', '9♠', '3♥'] },
];

const SUITS = '♠♥♦♣';
export const RED_SUITS = '♥♦';

/** Splits "A♠" or "10♥" into rank and suit; returns null when it does not parse. */
export function parseCard(c: string): { rank: string; suit: string } | null {
  const m = /^(A|K|Q|J|10|[2-9])([♠♥♦♣])$/.exec(c);
  if (!m || !SUITS.includes(m[2])) return null;
  return { rank: m[1], suit: m[2] };
}
export const isRed = (suit: string) => RED_SUITS.includes(suit);
