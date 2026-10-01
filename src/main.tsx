import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import { LanguageProvider } from './context/LanguageContext';
import { migrateAgrichemToPesticideNext } from './utils/migrateStorage';
import { deleteOldCachesIfAny } from './utils/cleanupCaches';
import './index.css';

// One-time storage migration: copy any data still living under the legacy
// `agrichem_*` keys into the new `pesticidenext_*` namespace before React
// mounts. Idempotent — short-circuits on subsequent boots via a marker flag.
migrateAgrichemToPesticideNext();

// PWA cache cleanup: delete any cache whose name doesn't start with the
// current `pn-v2` prefix. This purges the orphaned `workbox-precache-v2`
// cache from the previous build so returning users always see the new
// bundle (new OG image, new tagline, post-rename branding). Run BEFORE
// the service worker registers so the old cache is gone by the time the
// new SW tries to populate its own cache. Fire-and-forget — the app
// doesn't need to wait for this to finish before rendering.
deleteOldCachesIfAny();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <LanguageProvider>
      <App />
    </LanguageProvider>
  </StrictMode>,
);

