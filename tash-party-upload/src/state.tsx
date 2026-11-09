import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import type { Lang } from './data/types';

type Persisted = {
  players: number;
  selectedId: string;
  playedIds: string[];
  round: number;
  dealerIndex: number;
  briefTicks: Record<string, number[]>;
  roundTicks: number[];
  lang: Lang;
  bigText: boolean;
  activeId: string | null;
};

const KEY = 'diwali-patti';
const DEFAULTS: Persisted = {
  players: 6,
  selectedId: 'plain',
  playedIds: [],
  round: 1,
  dealerIndex: 0,
  briefTicks: {},
  roundTicks: [],
  lang: 'hi',
  bigText: false,
  activeId: null,
};

function load(): Persisted {
  try {
    const raw = sessionStorage.getItem(KEY);
    if (raw) return { ...DEFAULTS, ...JSON.parse(raw) };
  } catch {
    /* sessionStorage may be unavailable */
  }
  return DEFAULTS;
}

type Ctx = Persisted & {
  setPlayers: (n: number) => void;
  setSelectedId: (id: string) => void;
  addPlayed: (id: string) => void;
  clearPlayed: (ids: string[]) => void;
  toggleBrief: (variantId: string, i: number) => void;
  toggleRoundStep: (i: number) => void;
  nextRound: () => void;
  setLang: (l: Lang) => void;
  setBigText: (b: boolean) => void;
  setActive: (id: string) => void;
  resetGame: () => void;
};

const StateCtx = createContext<Ctx | null>(null);

export function StateProvider({ children }: { children: ReactNode }) {
  const [s, setS] = useState<Persisted>(load);

  useEffect(() => {
    try {
      sessionStorage.setItem(KEY, JSON.stringify(s));
    } catch {
      /* ignore */
    }
  }, [s]);

  useEffect(() => {
    document.documentElement.style.setProperty('--text-scale', s.bigText ? '1.25' : '1');
    document.documentElement.lang = s.lang === 'en' ? 'en' : 'hi-Latn';
  }, [s.bigText, s.lang]);

  const toggle = (arr: number[], i: number) => (arr.includes(i) ? arr.filter((x) => x !== i) : [...arr, i]);

  const value = useMemo<Ctx>(
    () => ({
      ...s,
      setPlayers: (n) => setS((p) => ({ ...p, players: n, dealerIndex: p.dealerIndex % n })),
      setSelectedId: (id) => setS((p) => ({ ...p, selectedId: id })),
      addPlayed: (id) => setS((p) => (p.playedIds.includes(id) ? p : { ...p, playedIds: [...p.playedIds, id] })),
      clearPlayed: (ids) => setS((p) => ({ ...p, playedIds: p.playedIds.filter((x) => !ids.includes(x)) })),
      toggleBrief: (vid, i) =>
        setS((p) => ({ ...p, briefTicks: { ...p.briefTicks, [vid]: toggle(p.briefTicks[vid] ?? [], i) } })),
      toggleRoundStep: (i) => setS((p) => ({ ...p, roundTicks: toggle(p.roundTicks, i) })),
      nextRound: () =>
        setS((p) => ({ ...p, round: p.round + 1, dealerIndex: (p.dealerIndex + 1) % p.players, roundTicks: [] })),
      setLang: (lang) => setS((p) => ({ ...p, lang })),
      setBigText: (bigText) => setS((p) => ({ ...p, bigText })),
      setActive: (id) => setS((p) => (p.activeId === id ? p : { ...p, activeId: id })),
      resetGame: () => setS((p) => ({ ...DEFAULTS, lang: p.lang, bigText: p.bigText })),
    }),
    [s],
  );

  return <StateCtx.Provider value={value}>{children}</StateCtx.Provider>;
}

export function useApp() {
  const c = useContext(StateCtx);
  if (!c) throw new Error('StateProvider missing');
  return c;
}
