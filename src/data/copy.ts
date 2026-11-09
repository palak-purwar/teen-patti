import type { Bi, Lang, Variant } from './types';

export const C = {
  eyebrow: { hi: 'TASH PARTY', en: 'TASH PARTY' },
  startTitle: { hi: 'Kitne log khel rahe hain?', en: 'How many are playing?' },
  startSub: { hi: 'Har diya ek kursi hai. Jitne log, utne diye.', en: 'Each diya is a seat. As many people, as many diyas.' },
  log: { hi: 'log', en: 'players' },
  range: { hi: '2 se 10 log', en: '2 to 10 players' },
  fewer: { hi: 'Ek kam', en: 'One fewer' },
  more: { hi: 'Ek zyada', en: 'One more' },
  next: { hi: 'Aage chalein', en: 'Continue' },
  footer: { hi: 'Patte aur chips aapke table par. App sirf guide karta hai.', en: 'Cards and chips stay on your table. The app only guides.' },
  hindiSoon: { hi: 'jald aa raha hai', en: 'coming soon' },
  bigText: { hi: 'Bada text', en: 'Big text' },
  back: { hi: 'Wapas', en: 'Back' },
  close: { hi: 'Band karein', en: 'Close' },
  chooseTitle: { hi: 'Kaunsa khel?', en: 'Which game?' },
  easy: { hi: 'Easy', en: 'Easy' },
  medium: { hi: 'Medium', en: 'Medium' },
  hard: { hi: 'Hard', en: 'Hard' },
  all: { hi: 'Sab', en: 'All' },
  played: { hi: 'KHEL LIYA', en: 'PLAYED' },
  roulette: { hi: 'Roulette', en: 'Roulette' },
  briefingBtn: { hi: 'Khel shuru karein', en: 'Start the game' },
  variantsLeft: { hi: 'variants bache hain', en: 'variants left' },
  rouletteLabel: { hi: 'ROULETTE', en: 'ROULETTE' }, pullHint: { hi: 'Ek patta chunein, palat kar dekhein.', en: 'Pick a card and turn it over.' }, pullCard: { hi: 'Patta', en: 'Card' },
  spin: { hi: 'Spin karo', en: 'Spin' },
  spinning: { hi: 'Ghoom raha hai...', en: 'Spinning...' },
  chosen: { hi: 'ROULETTE NE CHUNA', en: 'ROULETTE PICKED' },
  playThis: { hi: 'Yehi khelte hain', en: 'Let us play this' },
  spinAgain: { hi: 'Dusra spin (ye hata do)', en: 'Spin again (remove this one)' },
  allDone: { hi: 'Saare ho gaye!', en: 'All done!' },
  allDoneSub: { hi: 'Is level ke sab variants khel liye.', en: 'Every variant in this level has been played.' },
  refill: { hi: 'Dobara bharo', en: 'Fill it again' },
  forDealer: { hi: 'DEALER KE LIYE', en: 'FOR THE DEALER' },
  jokerCard: { hi: 'YE PATTE JOKER HAIN', en: 'THESE CARDS ARE JOKERS' },
  readAloud: { hi: 'BOLEIN', en: 'SAY IT' },
  setupDone: { hi: 'ho gaye', en: 'done' },
  of: { hi: 'of', en: 'of' },
  drawJoker: { hi: 'Joker nikaalo', en: 'Draw the joker' },
  drawAgain: { hi: 'Dobara nikaalo', en: 'Draw again' },
  bySuit: { hi: 'Suit se (13 joker)', en: 'By suit (13 jokers)' },
  byRank: { hi: 'Rank se (4 joker)', en: 'By rank (4 jokers)' },
  startRound: { hi: 'Round shuru karein', en: 'Start the round' },
  seeRules: { hi: 'Rules card dekho', en: 'See rules card' },
  rankLabel: { hi: 'BADE SE CHHOTA', en: 'HIGHEST TO LOWEST' },
  reversedLabel: { hi: 'CHHOTA JEETTA HAI', en: 'LOWEST WINS' },
  reversedNote: { hi: 'Yahan High card sabse achha, Trail sabse kharaab. Ek jaise hand mein chhote patte jeette.', en: 'Here High card is best and Trail is worst. Between hands of the same type, lower cards win.' },
  howWins: { hi: 'KAISE JEETTA HAI', en: 'HOW YOU WIN' },
  jokerLabel: { hi: 'JOKER', en: 'JOKER' },
  jokerLine: { hi: 'Kisi bhi patte ki jagah. Har suit ke.', en: 'Stands in for any card. Every suit.' },
  jokerLineDraw: { hi: 'Palte hue patte se joker tay hota hai.', en: 'The turned-up card sets the joker.' },
  example: { hi: 'MISAAL', en: 'EXAMPLE' },
  dealerNow: { hi: 'ABHI DEALER', en: 'DEALER NOW' },
  dealerNext: { hi: 'AGLA DEALER', en: 'NEXT DEALER' },
  seat: { hi: 'Kursi', en: 'Seat' },
  round: { hi: 'ROUND', en: 'ROUND' },
  nextRound: { hi: 'Agla round shuru karein', en: 'Start next round' },
  changeVariant: { hi: 'Variant badlein', en: 'Change variant' },
  laxmi: { hi: 'Laxmi aapke ghar aayi!', en: 'Laxmi has come home!' },
  notFound: { hi: 'Ye khel nahi mila.', en: 'Could not find that game.' },
  home: { hi: 'Shuru par jayein', en: 'Back to start' },
  diyaLit: { hi: 'Lit diya', en: 'Lit diya' },
  diyaUnlit: { hi: 'Unlit diya', en: 'Unlit diya' },
  maxPlayers: { hi: 'max', en: 'max' },
  tooMany: { hi: 'Is khel mein zyada se zyada <m> log khel sakte hain. Abhi <n> hain.', en: 'This game takes at most <m> players. You have <n>.' },
  drawCard: { hi: 'Patta nikaalo', en: 'Draw a card' },
  houseOn: { hi: 'Ghar ka niyam chalu', en: 'House rule on' },
  smallDeck: { hi: 'Chhoti gaddi', en: 'Small deck' },
  resetLink: { hi: 'Naya khel shuru karein', en: 'Start a new game' },
  resetTitle: { hi: 'Pura khel reset karein?', en: 'Reset the whole game?' },
  resetLine: { hi: 'Round <n>, dealer aur roulette ke nishan hat jayenge.', en: 'Round <n>, the dealer and the roulette marks will be cleared.' },
  resetYes: { hi: 'Haan, naya khel', en: 'Yes, new game' },
  resetNo: { hi: 'Wapas', en: 'Back' },
  inProgress: { hi: 'Pichla khel jaari hai', en: 'Last game is still going' },
  keepGoing: { hi: 'Jaari rakhein', en: 'Continue' },
  newGame: { hi: 'Naya khel', en: 'New game' },
  confirmSoon: { hi: 'Rules check baaki', en: 'Rules to be checked' },
} satisfies Record<string, Bi>;

export type CopyKey = keyof typeof C;
export const tr = (k: CopyKey, lang: Lang) => C[k][lang];
export const bi = (b: Bi, lang: Lang) => b[lang];

export const ROUND_STEPS: Bi[] = [
  { hi: 'Gaddi pheento', en: 'Shuffle the deck' },
  { hi: 'Har ko <n> patte baantein', en: 'Deal <n> cards to each player' },
  { hi: 'Shagun daalein', en: 'Everyone puts in the boot' },
  { hi: 'Khelein: blind ya seen, chaal, pack', en: 'Play: blind or seen, chaal, pack' },
  { hi: 'Show karein', en: 'Show' },
];

export function roundStepText(i: number, v: Variant, lang: Lang) {
  const n = v.cardsEach;
  let s = ROUND_STEPS[i][lang];
  if (n === 1) s = s.replace('<n> patte', '<n> patta').replace('<n> cards', '<n> card');
  return s.replace('<n>', String(n));
}

export const pattes = (n: number, lang: Lang) =>
  lang === 'hi' ? `${n} ${n === 1 ? 'PATTA' : 'PATTE'}` : `${n} ${n === 1 ? 'CARD' : 'CARDS'}`;

export const twistOf = (v: Variant, lang: Lang) => {
  const base = lang === 'hi' ? v.twist : v.twistEn;
  const note = C.confirmSoon[lang];
  return v.status === 'check' && !base.includes(note) ? `${base}. ${note}` : base;
};

export const levelLabel = (v: Variant, lang: Lang) =>
  v.level === 'plain' ? (lang === 'hi' ? 'SEEDHA' : 'PLAIN') : v.level.toUpperCase();
