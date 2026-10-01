import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import { LanguageProvider } from './context/LanguageContext';
import { migrateAgrichemToPesticideNext } from './utils/migrateStorage';
import './index.css';

// One-time storage migration: copy any data still living under the legacy
// `agrichem_*` keys into the new `pesticidenext_*` namespace before React
// mounts. Idempotent — short-circuits on subsequent boots via a marker flag.
migrateAgrichemToPesticideNext();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <LanguageProvider>
      <App />
    </LanguageProvider>
  </StrictMode>,
);

