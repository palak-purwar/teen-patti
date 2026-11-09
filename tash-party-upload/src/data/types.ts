export type Level = 'plain' | 'easy' | 'medium' | 'hard';
export type Lang = 'hi' | 'en';
export type Bi = { hi: string; en: string };

export type Variant = {
  id: string;
  name: string;
  short: string;
  level: Level;
  cardsEach: number;
  twist: string;
  twistEn: string;
  setupSteps: Bi[];
  wild?: string[];
  wildNote?: Bi;
  readAloud?: Bi;
  summary: Bi;
  ranking: 'standard' | 'reversed' | 'custom';
  examples: { cards: string[]; result: string; note: Bi }[];
  inRoulette: boolean;
  status: 'confirmed' | 'check';
  max: number;
  deckCards?: number;
  draw?: 'rank' | 'suit' | 'color' | 'rankRange' | 'oddEven';
  houseRule?: Bi;
};
