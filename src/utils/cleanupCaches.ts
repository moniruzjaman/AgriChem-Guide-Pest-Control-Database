/**
 * One-shot PWA cache cleanup.
 *
 * When the Workbox `cacheId` is bumped (e.g. from the default
 * `workbox-precache-v2` to `pn-v2-precache-v2`), the new service worker
 * populates a fresh cache namespace and the old cache becomes orphaned.
 * `cleanupOutdatedCaches: true` in vite.config.ts only purges caches with
 * the Workbox-recognized outdated format — it does NOT purge arbitrary
 * old cache IDs. This helper deletes any cache whose name doesn't start
 * with the current `pn-v2` prefix, reclaiming disk space and ensuring
 * returning users can never accidentally fall back to a stale precache.
 *
 * Safe to call on every boot — it only deletes caches that don't match
 * the current prefix. If a user has multiple tabs open and another tab
 * is mid-flight populating a cache, that cache will already start with
 * the `pn-v2` prefix so it survives.
 *
 * Run this BEFORE the service worker registers so the old cache is gone
 * by the time the new SW tries to populate its own cache.
 */
const CURRENT_CACHE_PREFIX = 'pn-v2';

export async function deleteOldCachesIfAny(): Promise<string[]> {
  if (typeof window === 'undefined' || !('caches' in window)) {
    return [];
  }

  const deleted: string[] = [];
  try {
    const keys = await window.caches.keys();
    for (const key of keys) {
      // Keep the current precache + any runtime caches that also use the
      // pn-v2 prefix. Drop everything else (old `workbox-precache-v2`,
      // old `workbox-runtime-*`, etc.).
      if (!key.startsWith(CURRENT_CACHE_PREFIX)) {
        const ok = await window.caches.delete(key);
        if (ok) deleted.push(key);
      }
    }
  } catch (err) {
    // Cache Storage API can throw in private-browsing modes or when the
    // user has disabled storage. Silently ignore — the app still works
    // without offline cache.
    if (typeof console !== 'undefined' && console.warn) {
      console.warn('PWA cache cleanup skipped:', err);
    }
  }
  return deleted;
}
