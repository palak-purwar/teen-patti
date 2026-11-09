# Tash Party

A Teen Patti table companion for the dealer. The group plays with a **real deck and their own chips**; this app is only a guide on one phone. It never deals cards, holds chips, counts a pot or keeps scores. Offline-first PWA, no backend, no accounts, no network calls after the first load.

## Run, build, deploy

```bash
npm install
npm run dev        # http://localhost:5173
npm test           # Vitest: roulette maths + variants data checks
npm run build      # type-check + production build into dist/
npm run preview    # serve dist/ locally
npm run icons      # re-render public/icons from the diya SVG (needs sharp, already a devDependency)
```

Deploy: upload `dist/` to any static host (Netlify, GitHub Pages, S3, plain nginx). All paths are relative (`base: './'`), so it works from a sub-folder. Serve over HTTPS so the service worker can install. Rules cards open from their own link, for example `https://host/#/rules/ak47`.

## Add a variant

Edit `src/data/variants.json` and add an object with the same shape as the others (`src/data/types.ts` documents it). Then add its id to the right tab in `TAB_IDS` in `src/data/index.ts`. Keep `short` at 9 characters or fewer, give 4 to 5 `setupSteps` ending with the winner rule, and set `inRoulette: true` for anything that should be pickable. `npm test` checks all of this.

## Decisions

- Language control: **EN** toggles English and Hinglish (pressing it again returns to Hinglish). The **हिं** option is disabled with the tooltip "jald aa raha hai" because Devanagari copy was not provided.
- "Bada text" scales the root font size by 1.25; all type uses `rem`.
- Fonts come from `@fontsource` packages (Latin and Devanagari subsets, copied into `public/fonts`). Suit symbols fall back to the system font, as neither face includes them.
- Variants with a `custom` ranking (Matha, 21, Faceoff, Kissing Missing) show their winner rule on the rules card instead of the six-row ranking.
- The Joker variant has no fixed wild ranks, so its rules card shows a one-line joker note instead of chips. The suit/rank choice defaults to "Suit se".
- Muflis rules card reverses the standard list, renumbers it 1 to 6 in the new order, and adds a note.
- Pot Blind is marked `confirmed` (standard ranking assumed), so it sits on the wheel.
- The roulette "Dusra spin (ye hata do)" leaves the picked variant as the current selection.
- Changing the player count keeps the dealer seat when it still exists, otherwise wraps it.
- With `prefers-reduced-motion`, the wheel jumps to its result (50 ms) instead of waiting 4.4 s.
- The round checklist lets the dealer tick any step in any order; the "current" highlight is the first unticked one.
- Session state (`players`, `selectedId`, `playedIds`, `round`, `dealerIndex`, ticks, language, text size) lives in one `sessionStorage` key. Nothing else is stored.

- **Single play screen:** the dealer briefing and the round screen are merged into `#/round/<id>`. `#/briefing/<id>` still works and opens the same screen. It shows the dealer card, joker chips, read-aloud line, a card draw where the variant needs one, a collapsible "how the game works" (open in round 1) and the round checklist. "Variant badlein" is a full-width outlined button below the primary "Agla round shuru karein".
- 36 variants plus Plain. Variants have a `max` player count (a warning shows when the Start count is higher) and some a `deckCards`, `draw` mode and `houseRule` toggle. Status `check` means rules unsettled; they are still pickable in the roulette (their result shows "Rules check baaki").
- Marriage Jokers example changed to `4♠ 5♦ 8♣` (the source example used 3♠, which is not a joker when 5 is pulled).
- The wheel uses radial labels when more than 6 sectors, so the all-levels wheel (25 sectors) stays readable. Some shorts differ from the brief to fit 9 characters (HiLoSplit, SuitJoker, HighJoker, PairsJkr, JokerHunt).

## Rules that still need a family to confirm

- Every variant with status `check` in `variants.json`: Red & Black, High-Low Split, Kiss-Miss-Bliss, Folding Joker, Pairs Are Jokers, Joker Hunt, Rotating Jokers, Plus Sign, In-Out, Zhandu, Community Teen Patti.
- **Pot Blind**: whether the standard ranking decides the show.
- **Odd Even Joker**: the pulled card is our assumption for choosing odd or even.
- **Joker (rank) vs Suit Joker**: both are kept, as apps differ on what "Joker" means.

## How I checked

Ran:
- `npm test`: 10 tests pass (roulette lands inside the winning segment for n = 1 to 12 over 400 spins each; unique ids; `inRoulette` only for confirmed variants; labels of 9 characters or fewer; every example card parses; `cardsEach * 10 <= 52`).
- `npm run build`: succeeds; service worker precaches 32 files, including all fonts and icons; no `http(s)` URLs in the built HTML or CSS.
- In the in-app browser at 390 x 844: Start (count and lit diyas), Choose (tabs, selection), roulette sheet (spin, landing, result), briefing (AK47 chips, Joker card draw), rules card (AK47 fits one screen, no scroll), round (tick, Laxmi moment, Kursi 1 to Kursi 2, ticks cleared).
- At 320 x 640: no horizontal overflow on Start, Choose, Briefing, Rules, Round.
- Grep for currency symbols, "bet", "paisa", "UPI", `fetch(`, `localStorage`, analytics: nothing found (the only `$` hit is a regex anchor).

Not run:
- **Offline reload and Lighthouse PWA audit.** The in-app browser would not register the service worker, so I could only verify the precache list statically. Please do the DevTools Offline reload once on a real browser.
- "Dobara bharo" and "Dusra spin" were not clicked through; "Dusra spin" and the refill are covered only by code review.
- No screen reader or keyboard-only pass.

## Events (optional)

`src/lib/analytics.ts` sends five anonymous events: `session_start` (once per tab session), `plain_chosen` / `variant_chosen` (tap on "Khel shuru karein", or accepting a roulette result), `roulette_spin`, `roulette_accepted`, `round_next`, and `players_set` (the count when leaving Start). Payloads hold only an event name, a variant id or number, and a timestamp: no ids, cookies or names. Nothing is sent unless `VITE_EVENTS_URL` is set when building (see `.env.example`); events go out with `navigator.sendBeacon` and failures are ignored, so the app still works offline. This replaces the original "no network calls" rule on request. It also adds one session-storage key, `tp-session-started`.
