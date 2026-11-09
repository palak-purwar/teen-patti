import raw from './variants.json';
import type { Variant, Level } from './types';

export const VARIANTS = raw as unknown as Variant[];
export const byId = (id: string | undefined) => VARIANTS.find((v) => v.id === id);

export const TAB_IDS: Record<'easy' | 'medium' | 'hard', string[]> = {
  easy: ['muflis', 'potblind', 'matha', 'twentyone', 't999', 'faceoff', 'potluck', 'redblack', 'twoopen', 'hilosplit', 'bestfour', 'oneeyed'],
  medium: ['joker', 'suitjoker', 'ak47', 'y1947', 'ekduje', 'y1942', 'lowjoker', 'highjoker', 'marriage', 'oddeven', 'lallan', 'hilo'],
  hard: ['revolving', 'kissing', 'kissmissbliss', 'three21', 'folding', 'pairsjokers', 'jokerhunt', 'rotating', 'plussign', 'inout', 'zhandu', 'community'],
};

export const tabVariants = (level: 'easy' | 'medium' | 'hard') =>
  TAB_IDS[level].map((id) => byId(id)!).filter(Boolean);

export const LEVEL_COLOR: Record<Level, string> = {
  plain: 'var(--gold)',
  easy: 'var(--peacock)',
  medium: 'var(--marigold)',
  hard: 'var(--rani)',
};
export const LEVEL_LIT: Record<Level, number> = { plain: 0, easy: 1, medium: 2, hard: 3 };
