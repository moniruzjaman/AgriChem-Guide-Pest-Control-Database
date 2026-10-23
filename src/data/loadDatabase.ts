import { ChemicalProduct } from '../types';

/**
 * loadDatabase.ts — the SINGLE source of truth for the product catalogue.
 *
 * Merges curated products + the DAE register dump + extras from the
 * 5,485-row AgriChem/MoA PTAC master (bangladesh_pesticide_database.csv),
 * then overlays measured toxicity / PHI / formulation fields onto matching
 * registration numbers. Loaded through dynamic ``import()`` so heavy data
 * stays out of the application shell.
 */

export interface LoadedDatabase {
  /** Merged + deduplicated catalogue (curated first, then DAE-only rows). */
  products: ChemicalProduct[];
  /**
   * Number of built-in products (before user-imported customs are merged).
   * Used by the DatabaseView "+N custom" badge.
   */
  baselineCount: number;
  /** Unified crop list (base crops + every crop referenced by the data). */
  cropList: string[];
}

let loadPromise: Promise<LoadedDatabase> | null = null;

/**
 * Legacy type label used by a handful of curated store-grain entries. The
 * DAE register mapping uses ``Store Grain Insecticide``, so both labels are
 * normalised to a single canonical class at load time.
 */
function normalizeType(type: ChemicalProduct['type']): ChemicalProduct['type'] {
  return type === 'Stored Grain' ? 'Store Grain Insecticide' : type;
}

const WHO_COLOR_BY_TOX: Record<string, string> = {
  'Ia - Extremely Hazardous': '#dc2626',
  'Ib - Highly Hazardous': '#dc2626',
  'II - Moderately Hazardous': '#eab308',
  'III - Slightly Hazardous': '#3b82f6',
  'U - Unlikely to Present Hazard': '#10b981',
};

function applyBdOverlay(
  products: ChemicalProduct[],
  overlayByReg: Record<string, {
    toxicityClass?: ChemicalProduct['toxicityClass'];
    formulation?: string;
    phiDays?: number;
    reiHours?: number;
    resistanceRisk?: ChemicalProduct['resistanceRisk'];
    moaCode?: string;
  }>
): ChemicalProduct[] {
  return products.map((product) => {
    const overlay = overlayByReg[(product.registrationNo ?? '').trim().toUpperCase()];
    if (!overlay) return product;
    const next: ChemicalProduct = { ...product };
    if (overlay.toxicityClass) {
      next.toxicityClass = overlay.toxicityClass;
      next.whoColor = WHO_COLOR_BY_TOX[overlay.toxicityClass] ?? next.whoColor;
    }
    if (overlay.formulation && (!next.formulation || next.formulation === 'Unknown')) {
      next.formulation = overlay.formulation;
    }
    if (overlay.phiDays != null) next.phiDays = overlay.phiDays;
    if (overlay.reiHours != null) next.reiHours = overlay.reiHours;
    if (overlay.resistanceRisk) next.resistanceRisk = overlay.resistanceRisk;
    if (overlay.moaCode && !next.moaCode) next.moaCode = overlay.moaCode;
    return next;
  });
}

/**
 * Build a deduplicated master database. Curated entries are emitted first;
 * DAE entries are appended only when their registration number is not
 * already present in the curated set. This avoids duplicate cards while
 * still exposing the full DAE register (5,000+ rows).
 */
function mergeWithCurated(
  curated: ChemicalProduct[],
  daeProducts: ChemicalProduct[]
): ChemicalProduct[] {
  // Index DAE rows by registration number so curated entries can adopt
  // DAE-only fields during the merge (see below).
  const daeByRegNo = new Map<string, ChemicalProduct>();
  for (const p of daeProducts) {
    const regNo = (p.registrationNo ?? '').toLowerCase().trim();
    if (regNo && !daeByRegNo.has(regNo)) {
      daeByRegNo.set(regNo, p);
    }
  }

  const seenRegNos = new Set<string>();
  const merged: ChemicalProduct[] = [];

  // 1. Curated dataset first (authoritative), with legacy type normalised.
  //    Structured ``recommendations`` (crop | pest | dosage rows) exist only
  //    in the DAE register dump, so curated entries adopt them from their
  //    DAE twin — otherwise the detail modal would show "no recommendations"
  //    for ~1,000 curated products that ARE in the official register.
  for (const product of curated) {
    const regNo = (product.registrationNo ?? '').toLowerCase().trim();
    if (regNo && !seenRegNos.has(regNo)) {
      seenRegNos.add(regNo);
    }
    const enriched: ChemicalProduct = { ...product, type: normalizeType(product.type) };
    const daeTwin = regNo ? daeByRegNo.get(regNo) : undefined;
    if (daeTwin) {
      if (!enriched.recommendations?.length && daeTwin.recommendations?.length) {
        enriched.recommendations = daeTwin.recommendations;
      }
      if (!enriched.moaCode && daeTwin.moaCode) {
        enriched.moaCode = daeTwin.moaCode;
      }
      if (daeTwin.formulation && (!enriched.formulation || enriched.formulation === 'Unknown')) {
        enriched.formulation = daeTwin.formulation;
      }
    }
    merged.push(enriched);
  }

  // 2. DAE register dump — skip duplicates by registration number.
  for (const product of daeProducts) {
    const regNo = (product.registrationNo ?? '').toLowerCase().trim();
    if (regNo && seenRegNos.has(regNo)) {
      continue;
    }
    if (regNo) {
      seenRegNos.add(regNo);
    }
    merged.push(product);
  }

  return merged;
}

/** Base crop filter list, always exposed in this order first. */
const BASE_CROP_LIST: string[] = [
  'All Crops',
  'Rice',
  'Potato',
  'Tomato',
  'Brinjal',
  'Mango',
  'Jute',
  'Tea',
  'Cabbage',
  'Cauliflower',
  'Chili',
  'Chilli',
  'Bean',
  'Wheat',
  'Sugarcane',
  'Onion',
  'Cotton',
  'Maize',
  'Cucumber',
  'Bitter Gourd',
  'Pointed Gourd',
  'Mustard',
  'Groundnut',
  'Store & Field',
  'Warehouse',
];

/** Augment the base list with the union of all crops present in the data. */
function buildCropList(products: ChemicalProduct[]): string[] {
  const seen = new Set<string>(BASE_CROP_LIST.map((c) => c.toLowerCase()));
  const extras: string[] = [];
  for (const product of products) {
    for (const crop of product.crops ?? []) {
      const key = crop.toLowerCase().trim();
      if (key && !seen.has(key)) {
        seen.add(key);
        extras.push(crop.trim());
      }
    }
  }
  extras.sort((a, b) => a.localeCompare(b));
  return [...BASE_CROP_LIST, ...extras];
}

/** Read user-imported custom products persisted in localStorage. */
function loadCustomProducts(baseline: ChemicalProduct[]): ChemicalProduct[] {
  if (typeof window === 'undefined') return [];
  const saved = window.localStorage.getItem('pesticidenext_custom_products');
  if (!saved) return [];
  try {
    const parsed = JSON.parse(saved) as ChemicalProduct[];
    const existingNos = new Set(
      baseline.map((p) => p.registrationNo.toLowerCase().trim())
    );
    return parsed.filter(
      (p) =>
        p.registrationNo && !existingNos.has(p.registrationNo.toLowerCase().trim())
    );
  } catch (e) {
    console.warn('Failed to parse custom products:', e);
    return [];
  }
}

/**
 * Dynamically import the heavy data modules (curated databases + the full
 * DAE register mapping), merge and deduplicate them, and attach any
 * user-imported custom products. The result is memoised so repeated calls
 * (e.g. StrictMode double-mount) share a single network fetch.
 */
export function loadDatabase(): Promise<LoadedDatabase> {
  if (loadPromise) return loadPromise;

  loadPromise = (async () => {
    // Both heavy modules live in separate async chunks thanks to dynamic
    // import: curatedData pulls the five curated databases and
    // allPesticidesData pulls the 2.7 MB all_pesticides register dump —
    // Rollup extracts both subtrees from the main bundle entirely.
    const [{ CURATED_DATABASE }, { ALL_PESTICIDES_DATABASE }, { BD_OVERLAY_BY_REG, BD_REGISTER_EXTRAS }] =
      await Promise.all([
        import('./curatedData'),
        import('./allPesticidesData'),
        import('./bdRegisterLatest'),
      ]);

    const merged = applyBdOverlay(
      mergeWithCurated(CURATED_DATABASE, ALL_PESTICIDES_DATABASE),
      BD_OVERLAY_BY_REG
    );

    const seenRegNos = new Set(
      merged.map((p) => (p.registrationNo ?? '').toLowerCase().trim()).filter(Boolean)
    );
    for (const extra of BD_REGISTER_EXTRAS) {
      const regNo = (extra.registrationNo ?? '').toLowerCase().trim();
      if (regNo && seenRegNos.has(regNo)) continue;
      if (regNo) seenRegNos.add(regNo);
      merged.push({ ...extra, type: normalizeType(extra.type) });
    }

    const custom = loadCustomProducts(merged);

    if (typeof console !== 'undefined' && console.debug) {
      console.debug(
        `[loadDatabase] curated=${CURATED_DATABASE.length} ` +
          `daeTotal=${ALL_PESTICIDES_DATABASE.length} extras=${BD_REGISTER_EXTRAS.length} ` +
          `merged=${merged.length} custom=${custom.length}`
      );
    }

    return {
      products: [...merged, ...custom],
      baselineCount: merged.length,
      cropList: buildCropList(merged),
    };
  })();

  // If an async chunk fails to load (e.g. offline before first precache),
  // reset the memo so a retry can start fresh.
  loadPromise.catch(() => {
    loadPromise = null;
  });

  return loadPromise;
}
