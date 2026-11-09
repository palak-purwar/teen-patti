// Anonymous product events. No ids, cookies or personal data: just an event name and a few
// plain values (variant id, player count). Nothing is sent unless VITE_EVENTS_URL is set at
// build time, and a failed send is ignored so the app keeps working offline.
type Props = Record<string, string | number | boolean>;

const URL_ = import.meta.env.VITE_EVENTS_URL as string | undefined;

export function track(event: string, props: Props = {}) {
  if (!URL_) {
    if (import.meta.env.DEV) console.debug('[event]', event, props);
    return;
  }
  try {
    const body = JSON.stringify({ event, props, t: Date.now() });
    navigator.sendBeacon?.(URL_, new Blob([body], { type: 'text/plain' }));
  } catch {
    /* ignore */
  }
}

/** Once per visit (a visit is one browser-tab session). */
export function trackSessionStart() {
  try {
    if (sessionStorage.getItem('tp-session-started')) return;
    sessionStorage.setItem('tp-session-started', '1');
  } catch {
    /* if storage is blocked, still count the visit once per page load */
  }
  track('session_start');
}
