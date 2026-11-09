import { useEffect, useState } from 'react';

export type Route =
  | { name: 'start' }
  | { name: 'choose' }
  | { name: 'rules' | 'round'; id: string };

export function parseHash(hash: string): Route {
  const parts = hash.replace(/^#\/?/, '').split('/').filter(Boolean);
  const [name, id] = parts;
  if (name === 'choose') return { name: 'choose' };
  if (name === 'briefing' && id) return { name: 'round', id };
  if ((name === 'rules' || name === 'round') && id) return { name, id };
  return { name: 'start' };
}

export function useRoute(): Route {
  const [route, setRoute] = useState<Route>(() => parseHash(window.location.hash));
  useEffect(() => {
    const on = () => {
      setRoute(parseHash(window.location.hash));
      window.scrollTo(0, 0);
    };
    window.addEventListener('hashchange', on);
    return () => window.removeEventListener('hashchange', on);
  }, []);
  return route;
}

export const go = (path: string) => {
  window.location.hash = path;
};
export const href = (path: string) => `#${path}`;
