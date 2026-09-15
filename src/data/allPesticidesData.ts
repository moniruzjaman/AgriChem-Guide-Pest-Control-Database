/**
 * allPesticidesData.ts
 *
 * Maps the full DAE registered pesticides list (5,452 rows sourced from
 * `data_raw/all_pesticides.csv`, exposed via `./all_pesticides.ts`) into the
 * `ChemicalProduct[]` shape consumed by the rest of the app, then enriches
 * each entry with Mode-of-Action metadata, toxicity class, WHO color band,
 * formulation, PHI/REI defaults, and structured ``recommendations``.
 *
 * The CSV is grouped by ``Registration No`` + ``Brand Name`` so that multiple
 * recommendation lines for the same commercial product are merged into one
 * record with a ``recommendations: string[]`` array.
 *
 * This module is the bridge between the auto-generated CSV dump and the
 * curated legacy dataset (see ``pesticidesData.ts``). It is intentionally
 * side-effect free so it can be tree-shaken if unused.
 */

import { ChemicalProduct, ChemicalType, MoAClassification } from '../types';
import { pesticides, PesticideType } from './all_pesticides';
import { MOA_DATABASE } from './moaData';

// ---------------------------------------------------------------------------
//  MoA lookup helpers
// ---------------------------------------------------------------------------

/**
 * Map of MoA code (e.g. "IRAC 1B", "FRAC 11") -> MoAClassification record.
 * Built once at module load.
 */
const MOA_BY_CODE: Record<string, MoAClassification> = (() => {
  const map: Record<string, MoAClassification> = {};
  for (const entry of MOA_DATABASE) {
    map[entry.code] = entry;
  }
  return map;
})();

/**
 * Map of active-ingredient common name (lower-cased) -> MoAClassification.
 * Used as a fallback when the CSV does not specify a MoA Code for a product.
 */
const MOA_BY_ACTIVE: Record<string, MoAClassification> = (() => {
  const map: Record<string, MoAClassification> = {};
  for (const entry of MOA_DATABASE) {
    for (const active of entry.primaryActives ?? []) {
      // First-write-wins so curated entries take precedence over later bulk imports.
      if (!map[active.toLowerCase()]) {
        map[active.toLowerCase()] = entry;
      }
    }
  }
  return map;
})();

/**
 * Resolve the MoA classification for a given product. Strategy:
 *   1. If the CSV provides a MoA code, look it up directly.
 *   2. Otherwise, try to match the product's common name against the
 *      curated ``primaryActives`` lists in ``MOA_DATABASE``.
 *   3. As a last resort, attempt a fuzzy contains-match on the common name
 *      (handles combination actives such as "Imidacloprid (20%) + ...").
 *   4. If everything fails, return ``null`` and the caller will fall back to
 *      conservative defaults.
 */
function resolveMoa(
  csvMoaCode: string | null,
  commonName: string
): MoAClassification | null {
  if (csvMoaCode && csvMoaCode.trim()) {
    const code = csvMoaCode.trim();
    if (MOA_BY_CODE[code]) {
      return MOA_BY_CODE[code];
    }
    // Some CSV rows use compound codes like "IRAC 1B + 4A". Pick the first
    // leg so we still get *some* metadata for enrichment.
    const firstLeg = code.split(/[+/,]/)[0].trim();
    if (MOA_BY_CODE[firstLeg]) {
      return MOA_BY_CODE[firstLeg];
    }
  }

  const lc = commonName.toLowerCase().trim();
  if (MOA_BY_ACTIVE[lc]) {
    return MOA_BY_ACTIVE[lc];
  }

  // Fuzzy match: look for any curated active ingredient embedded in the
  // common name. This handles combination actives written with parentheses
  // and percentages, e.g. "Abamectin (1%) + Acetamiprid (3%)".
  for (const [active, entry] of Object.entries(MOA_BY_ACTIVE)) {
    if (lc.includes(active)) {
      return entry;
    }
  }
  return null;
}

// ---------------------------------------------------------------------------
//  Type mapping: PesticideType (CSV) -> ChemicalType (app)
// ---------------------------------------------------------------------------

const PESTICIDE_TYPE_TO_CHEMICAL: Record<PesticideType, ChemicalType> = {
  Insecticide: 'Insecticide',
  Fungicide: 'Fungicide',
  Herbicide: 'Herbicide',
  Miticide: 'Miticide',
  'Bio Pesticide': 'Bio Pesticide',
  'Store Grain Insecticide': 'Store Grain Insecticide',
  Rodenticide: 'Rodenticide',
  'Public Health': 'Public Health',
};

// ---------------------------------------------------------------------------
//  Formulation detection (ported from parse-csv-and-update.mjs)
// ---------------------------------------------------------------------------

const FORMULATION_PATTERNS: Array<[RegExp, string]> = [
  [/\bEC\b/, 'EC'],
  [/\bSC\b/, 'SC'],
  [/\bWP\b/, 'WP'],
  [/\bWG\b/, 'WDG'],
  [/\bWDG\b/, 'WDG'],
  [/\bDF\b/, 'DF'],
  [/\bGR\b/, 'GR'],
  [/\bSL\b/, 'SL'],
  [/\bSP\b/, 'SP'],
  [/\bULV\b/, 'ULV'],
  [/\bEW\b/, 'EW'],
  [/\bFS\b/, 'FS'],
  [/\bOD\b/, 'OD'],
  [/\bSE\b/, 'SE'],
  [/\bCS\b/, 'CS'],
  [/\bDC\b/, 'DC'],
  [/\bMC\b/, 'MC'],
  [/\bZC\b/, 'ZC'],
  [/\bSG\b/, 'SG'],
  [/\bAS\b/, 'AS'],
];

function detectFormulation(tradeName: string): string {
  const upper = tradeName.toUpperCase();
  // Check digit-prefixed codes like "46.5EC" — the regex above already
  // matches "EC" if a word boundary is present, but the digit prefix breaks
  // the boundary, so we run an explicit check first.
  for (const [pattern, code] of FORMULATION_PATTERNS) {
    if (pattern.test(upper) || upper.includes(code)) {
      return code;
    }
  }
  return 'Unknown';
}

// ---------------------------------------------------------------------------
//  Toxicity / PHI / REI defaults keyed by MoA resistance risk
// ---------------------------------------------------------------------------

interface ToxicityDefaults {
  toxicityClass: ChemicalProduct['toxicityClass'];
  whoColor: string;
  phiDays: number;
  reiHours: number;
}

const TOXICITY_BY_RESISTANCE: Record<NonNullable<ChemicalProduct['resistanceRisk']>, ToxicityDefaults> = {
  High: {
    toxicityClass: 'II - Moderately Hazardous',
    whoColor: '#eab308',
    phiDays: 14,
    reiHours: 24,
  },
  'Medium to High': {
    toxicityClass: 'II - Moderately Hazardous',
    whoColor: '#eab308',
    phiDays: 14,
    reiHours: 24,
  },
  Medium: {
    toxicityClass: 'III - Slightly Hazardous',
    whoColor: '#3b82f6',
    phiDays: 7,
    reiHours: 12,
  },
  'Low to Medium': {
    toxicityClass: 'III - Slightly Hazardous',
    whoColor: '#3b82f6',
    phiDays: 7,
    reiHours: 12,
  },
  Low: {
    toxicityClass: 'U - Unlikely to Present Hazard',
    whoColor: '#10b981',
    phiDays: 3,
    reiHours: 4,
  },
  Unknown: {
    toxicityClass: 'III - Slightly Hazardous',
    whoColor: '#3b82f6',
    phiDays: 14,
    reiHours: 24,
  },
};

// ---------------------------------------------------------------------------
//  Mapping: PesticideProduct -> ChemicalProduct
// ---------------------------------------------------------------------------

function toChemicalProduct(
  p: (typeof pesticides)[number],
  index: number
): ChemicalProduct {
  const moa = resolveMoa(p.moaCode, p.commonName);
  const resistanceRisk = moa?.resistanceRisk ?? 'Unknown';
  const toxicity = TOXICITY_BY_RESISTANCE[resistanceRisk];

  // Honour the CSV's MoA code when available; otherwise fall back to the
  // MoA database code. This keeps the displayed MoA code consistent with
  // the official DAE register while still allowing enrichment.
  const moaCode = p.moaCode ?? moa?.code ?? '';

  // Water volume: tea requires higher spray volumes; default to 500 L/ha
  // for field crops (rice, jute, vegetables) and 1000 L/ha for tea.
  const hasTea = p.recommendedCrops.some((c) => c.toLowerCase() === 'tea');
  const waterVolumeLPerHa = hasTea ? 1000 : 500;

  // Split recommendations string on newline into a structured array.
  // Empty / whitespace-only entries are filtered out.
  const recommendationLines = p.recommendations
    .split('\n')
    .map((line) => line.trim())
    .filter((line) => line.length > 0);

  // Stable ID: <type-prefix>-<registrationNo>-<seq>
  // The registration number is already unique per product in the DAE
  // register, but we append a sequence digit to defend against the rare
  // case where the same registration number is reused for different
  // formulations of the same brand.
  const typePrefix = p.pesticideType.toLowerCase().replace(/[^a-z]/g, '').slice(0, 4) || 'chem';
  const safeRegNo = (p.registrationNo || `X${index}`).replace(/[^a-zA-Z0-9]/g, '');
  const id = `${typePrefix}-${safeRegNo}-${String(index + 1).padStart(4, '0')}`;

  return {
    id,
    type: PESTICIDE_TYPE_TO_CHEMICAL[p.pesticideType],
    commonName: p.commonName,
    tradeName: p.brandName,
    registrationNo: p.registrationNo,
    registrationHolder: p.registrationHolder,
    crops: p.recommendedCrops,
    pests: p.recommendedPests,
    dosageRate: p.dosageRate,
    moaCode,
    moaGroup: moa?.name,
    moaSubGroup: moa?.subGroup,
    moaTargetSite: moa?.targetSite,
    resistanceRisk,
    toxicityClass: toxicity.toxicityClass,
    whoColor: toxicity.whoColor,
    formulation: detectFormulation(p.brandName),
    phiDays: toxicity.phiDays,
    reiHours: toxicity.reiHours,
    waterVolumeLPerHa,
    safetyNotes: [],
    rotationNotes: moa?.rotationStrategy ?? '',
    recommendations: recommendationLines,
    source: 'dae-register',
  };
}

// ---------------------------------------------------------------------------
//  Deduplication: merge rows that share registration no + brand name
// ---------------------------------------------------------------------------

/**
 * Merge two ChemicalProduct records that share the same registration number
 * + brand name. Crops, pests, and structured ``recommendations`` arrays are
 * unioned (de-duplicated, preserving order). The first-seen dosage rate is
 * preserved, but additional dosage strings are appended with a separator.
 */
function mergeProducts(a: ChemicalProduct, b: ChemicalProduct): ChemicalProduct {
  const union = <T>(xs: T[], ys: T[]): T[] => {
    const seen = new Set<T>();
    const out: T[] = [];
    for (const x of [...xs, ...ys]) {
      const key = (typeof x === 'string' ? x.toLowerCase().trim() : String(x)) as T;
      if (!seen.has(key)) {
        seen.add(key);
        out.push(x);
      }
    }
    return out;
  };

  const mergedRecs = union(a.recommendations ?? [], b.recommendations ?? []);
  const mergedCrops = union(a.crops, b.crops);
  const mergedPests = union(a.pests, b.pests);

  // Preserve existing dosageRate; if the duplicate carries a different
  // rate string, append it after a separator so users see both options.
  let dosageRate = a.dosageRate;
  if (b.dosageRate && b.dosageRate.trim() && !dosageRate.includes(b.dosageRate.trim())) {
    dosageRate = `${dosageRate}; ${b.dosageRate.trim()}`;
  }

  return {
    ...a,
    crops: mergedCrops,
    pests: mergedPests,
    dosageRate,
    recommendations: mergedRecs,
  };
}

// ---------------------------------------------------------------------------
//  Build the exported dataset
// ---------------------------------------------------------------------------

/**
 * Full DAE registered pesticides dataset, mapped to ``ChemicalProduct`` and
 * enriched with MoA + toxicity metadata. Rows are deduplicated by
 * ``registrationNo + tradeName`` so that the same commercial product with
 * multiple recommendation lines appears only once in the database.
 */
export const ALL_PESTICIDES_DATABASE: ChemicalProduct[] = (() => {
  const map = new Map<string, ChemicalProduct>();

  pesticides.forEach((p, idx) => {
    const product = toChemicalProduct(p, idx);
    const key = `${product.registrationNo}|${product.tradeName}`.toLowerCase().trim();
    const existing = map.get(key);
    if (!existing) {
      map.set(key, product);
    } else {
      map.set(key, mergeProducts(existing, product));
    }
  });

  return Array.from(map.values());
})();

/**
 * Convenience re-export of the curated MoA classification database. Useful
 * for components that need to display the MoA group details next to a
 * product (e.g. Rotation Planner) without re-importing from moaData.ts.
 */
export { MOA_DATABASE } from './moaData';
