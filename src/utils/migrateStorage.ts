/**
 * localStorage / sessionStorage migration: agrichem_* → pesticidenext_*
 *
 * Context: the app was previously shipped as "AgriChem Pro". When the brand
 * was renamed to "PesticideNext" the storage keys (`agrichem_custom_products`,
 * `agrichem_lang`, `agrichem_alerts`, `agrichem_session_started`) and the
 * exported CSV file-name prefixes (`agrichem_approved_pesticides_template.csv`,
 * `agrichem_full_database_*.csv`) were left intact — that decision kept every
 * existing farmer's saved custom products, language preference and unread
 * alerts intact across the rename.
 *
 * This helper performs a one-time, idempotent copy-over: when a browser still
 * has data under the old `agrichem_*` keys, the values are copied to the new
 * `pesticidenext_*` keys, then a marker flag (`pesticidenext_migrated_v1`) is
 * written so the migration never runs again. Old keys are NOT deleted — that
 * way, if a user ever rolls back to a previous build, their data is still
 * there. The marker prevents re-copying (and thus overwriting newer data on
 * the new keys with stale old data on a subsequent boot).
 *
 * Run this synchronously before React mounts (see main.tsx) so the rest of
 * the app sees a single, consistent storage namespace from the first render.
 */

const MIGRATION_FLAG = 'pesticidenext_migrated_v1';

/** Map of { oldKey → newKey } for every storage identifier we want to migrate. */
const KEY_MAP: Record<string, string> = {
  agrichem_custom_products: 'pesticidenext_custom_products',
  agrichem_lang: 'pesticidenext_lang',
  agrichem_alerts: 'pesticidenext_alerts',
  // sessionStorage — also under window.sessionStorage
  agrichem_session_started: 'pesticidenext_session_started'
};

/**
 * Run the one-time migration. Safe to call on every boot — it short-circuits
 * as soon as it sees the MIGRATION_FLAG marker. Returns a small report so
 * callers (and tests) can verify what happened.
 */
export function migrateAgrichemToPesticideNext(): {
  ran: boolean;
  copied: string[];
  skipped: string[];
} {
  if (typeof window === 'undefined') {
    return { ran: false, copied: [], skipped: [] };
  }

  // Idempotent guard: never re-run after the first successful migration.
  // The flag lives in localStorage because sessionStorage would reset on
  // every new tab and trigger the migration repeatedly.
  if (window.localStorage.getItem(MIGRATION_FLAG) === 'done') {
    return { ran: false, copied: [], skipped: [] };
  }

  const copied: string[] = [];
  const skipped: string[] = [];

  for (const [oldKey, newKey] of Object.entries(KEY_MAP)) {
    // Pick the right storage backend per key — session-only keys stay in
    // sessionStorage, persistent keys in localStorage. The split is hard-coded
    // here so the migration never accidentally promotes a session-only flag
    // into a persistent one (or vice versa).
    const isSession = oldKey === 'agrichem_session_started';
    const store = isSession ? window.sessionStorage : window.localStorage;

    const oldValue = store.getItem(oldKey);
    if (oldValue === null) {
      skipped.push(oldKey);
      continue;
    }

    // Never overwrite data that already exists under the new key — the new
    // namespace is the source of truth once a single boot has happened.
    const existingNewValue = store.getItem(newKey);
    if (existingNewValue === null) {
      store.setItem(newKey, oldValue);
      copied.push(oldKey);
    } else {
      skipped.push(oldKey);
    }

    // Old key is intentionally NOT removed — preserving it lets a user
    // safely downgrade to an older build of the app and still see their
    // previously-saved data. The MIGRATION_FLAG below prevents us from
    // copying it again on the next boot.
  }

  // Mark the migration as complete regardless of whether anything was copied.
  // The flag means "we have scanned once and copied what we needed to"; it is
  // not a "we copied N items" counter.
  window.localStorage.setItem(MIGRATION_FLAG, 'done');

  return { ran: true, copied, skipped };
}
