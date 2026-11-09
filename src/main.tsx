import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { registerSW } from 'virtual:pwa-register';
import './styles/tokens.css';
import './styles/global.css';
import { App } from './App';
import { StateProvider } from './state';
import { trackSessionStart } from './lib/analytics';

registerSW({ immediate: true });
trackSessionStart();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <StateProvider>
      <App />
    </StateProvider>
  </StrictMode>,
);
