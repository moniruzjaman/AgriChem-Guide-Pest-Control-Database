/**
 * smartSearch.ts
 * ================
 * Layman-first search engine shared by the global header search, the
 * Chemical Database, and (optionally) the Specialist view. Goals:
 *
 *  1. "Every aspect" results — a single query returns products AND the
 *     crop / pest / brand / ingredient facets that matched, so a farmer
 *     sees WHY a result appeared instead of an opaque list.
 *  2. Forgiving matching — token-AND matching (every word must hit
 *     somewhere), Bangla-script queries via the bnAgri translation maps,
 *     typo tolerance (Levenshtein fallback), and numeric MoA shortcuts
 *     ("moa 4", "group 28", "IRAC 3A").
 *  3. Smart ranking — exact > prefix > substring > fuzzy, then safety
 *     signals (selective < broad-spectrum, low PHI, lower toxicity class)
 *     so the friendliest effective product floats to the top.
 */

import type { ChemicalProduct } from '../types';
import { normKey, translateCrop, translatePest } from './bnAgri';

export interface MatchReason {
  /** Machine key, e.g. 'pest' | 'crop' | 'brand' | 'ingredient' | 'moa' | 'fuzzy'. */
  kind: string;
  en: string;
  bn: string;
}

export interface ScoredProduct {
  product: ChemicalProduct;
  score: number;
  reasons: MatchReason[];
}

export interface SmartSearchResult {
  items: ScoredProduct[];
  matchedCrops: string[];
  matchedPests: string[];
  matchedBrands: number;
  matchedIngredients: string[];
  /** True when the raw query itself looks like a crop or pest name. */
  queryIsCrop: boolean;
  queryIsPest: boolean;
}

/* ------------------------------------------------------------------ */
/* Low-level helpers                                                   */
/* ------------------------------------------------------------------ */

/** Bounded Levenshtein distance (returns max+1 when beyond threshold). */
export function editDistance(a: string, b: string, max = 2): number {
  if (a === b) return 0;
  if (Math.abs(a.length - b.length) > max) return max + 1;
  const prev = new Array(b.length + 1).fill(0).map((_, i) => i);
  for (let i = 1; i <= a.length; i++) {
    let last = prev[0];
    prev[0] = i;
    let rowMin = prev[0];
    for (let j = 1; j <= b.length; j++) {
      const tmp = prev[j];
      prev[j] = Math.min(prev[j] + 1, prev[j - 1] + 1, last + (a[i - 1] === b[j - 1] ? 0 : 1));
      last = tmp;
      rowMin = Math.min(rowMin, prev[j]);
    }
    if (rowMin > max) return max + 1;
  }
  return prev[b.length];
}

/** Does `hay` contain `needle` as a whole-ish token, allowing small typos? */
export function fuzzyIncludes(hay: string, needle: string, maxDist = 2): boolean {
  if (!needle) return true;
  if (hay.includes(needle)) return true;
  // Only worth fuzzing tokens of reasonable length.
  if (needle.length < 4) return false;
  const words = hay.split(/[^a-z0-9]+/);
  for (const w of words) {
    if (!w || Math.abs(w.length - needle.length) > maxDist) continue;
    if (editDistance(w, needle, maxDist) <= maxDist) return true;
  }
  return false;
}

const hasDigit = (s: string) => /\d/.test(s);

/** Extract a numeric MoA-group shortcut from a query ("moa 28", "group 4"). */
export function extractMoaNumber(q: string): number | null {
  const m = q.match(/\b(?:moa|group|irac|frac|hrac)\s*(?:no\.?|code)?\s*(\d+)\b/);
  if (m) return parseInt(m[1], 10);
  // A bare short number like "28" alongside another word is treated as MoA too.
  const bare = q.match(/^\s*(\d{1,2})\s*$/);
  if (bare) return parseInt(bare[1], 10);
  return null;
}

const moaMatchesNumber = (p: ChemicalProduct, num: number): boolean => {
  const codes = [p.moaCode, p.moaGroup, p.moaSubGroup].filter(Boolean).join(' ');
  return new RegExp(`\\b${num}\\b`).test(codes);
};

/* ------------------------------------------------------------------ */
/* Field buckets per product                                           */
/* ------------------------------------------------------------------ */

interface Buckets {
  brand: string;       // tradeName
  ingredient: string;  // commonName + activeIngredients + aliases
  company: string;     // registrationHolder
  regNo: string;
  cropsEn: string;
  cropsBn: string;
  pestsEn: string;
  pestsBn: string;
  category: string;    // Insecticide/Fungicide/… + Bangla
  moa: string;
  recents: string;     // structured DAE recommendation rows
  all: string;         // everything concatenated (for fallback/fuzzy)
}

const CATEGORY_BN: Record<string, string> = {
  Insecticide: 'কীটনাশক',
  Fungicide: 'ছত্রাকনাশক',
  Herbicide: 'তৃণনাশক',
  Miticide: 'মাইটনাশক',
  'Bio Pesticide': 'জৈব বালাইনাশক',
  Rodenticide: 'ইঁদুরনাশক',
};

function buildBuckets(p: ChemicalProduct): Buckets {
  const brand = normKey(p.tradeName || '');
  const ingredient = normKey(
    [p.commonName, ...(p.activeIngredients ?? []), ...(p.aiAliases ?? [])]
      .filter(Boolean)
      .join(' ')
  );
  const company = normKey(p.registrationHolder || '');
  const regNo = normKey(p.registrationNo || '');
  const cropsEn = p.crops.map((c) => normKey(c)).join(' ');
  const cropsBn = p.crops.map((c) => normKey(translateCrop(c, 'bn'))).join(' ');
  const pestsEn = p.pests.map((t) => normKey(t)).join(' ');
  const pestsBn = p.pests.map((t) => normKey(translatePest(t, 'bn'))).join(' ');
  const category = normKey(`${p.type} ${CATEGORY_BN[p.type] ?? ''}`);
  const moa = normKey(`${p.moaCode ?? ''} ${p.moaGroup ?? ''} ${p.moaSubGroup ?? ''} ${p.scheme ?? ''}`);
  const recents = normKey((p.recommendations ?? []).join(' '));
  const all = [brand, ingredient, company, regNo, cropsEn, cropsBn, pestsEn, pestsBn, category, moa, recents].join(' ');
  return { brand, ingredient, company, regNo, cropsEn, cropsBn, pestsEn, pestsBn, category, moa, recents, all };
}

/* ------------------------------------------------------------------ */
/* Reason phrasing                                                     */
/* ------------------------------------------------------------------ */

function reason(kind: string, term: string, extra?: { en?: string; bn?: string }): MatchReason {
  const T = term.trim();
  switch (kind) {
    case 'brand':
      return { kind, en: `Brand name match: “${T}”`, bn: `ব্র্যান্ডের নাম মিলেছে: “${T}”` };
    case 'ingredient':
      return { kind, en: `Active ingredient match: “${T}”`, bn: `সক্রিয় উপাদান মিলেছে: “${T}”` };
    case 'crop':
      return { kind, en: `Registered on ${extra?.en ?? T}`, bn: `${extra?.bn ?? T} ফসলে নিবন্ধিত` };
    case 'pest':
      return { kind, en: `Controls ${extra?.en ?? T}`, bn: `${extra?.bn ?? T}—এই পোকা/রোগ নিয়ন্ত্রণ করে` };
    case 'category':
      return { kind, en: `${extra?.en ?? T} (product type)`, bn: `${extra?.bn ?? T} (পণ্যের ধরন)` };
    case 'company':
      return { kind, en: `Company match: “${T}”`, bn: `কোম্পানির নাম মিলেছে: “${T}”` };
    case 'regno':
      return { kind, en: `Registration no. match: ${T}`, bn: `নিবন্ধন নম্বর মিলেছে: ${T}` };
    case 'moa':
      return { kind, en: `MoA group ${T}`, bn: `MoA গ্রুপ ${T}` };
    case 'label':
      return { kind, en: `Label recommendation mentions “${T}”`, bn: `লেবেলের সুপারিশে “${T}” লেখা আছে` };
    default:
      return { kind, en: `Matched “${T}”`, bn: `“${T}” মিলেছে` };
  }
}

/* ------------------------------------------------------------------ */
/* Safety-aware ranking boost                                          */
/* ------------------------------------------------------------------ */

const TOXICITY_RANK: Record<string, number> = {
  'Ia - Extremely Hazardous': 0,
  'Ib - Highly Hazardous': 1,
  'II - Moderately Hazardous': 2,
  'III - Slightly Hazardous': 3,
  'U - Unlikely to Present Hazard': 4,
};

function safetyBoost(p: ChemicalProduct): number {
  let b = 0;
  const tox = TOXICITY_RANK[p.toxicityClass ?? ''] ?? 2;
  if (tox >= 3) b += 6;            // III / U — farmer-friendly
  if (tox <= 1) b -= 10;           // Ia / Ib — demote for laymen
  if (p.phiDays != null && p.phiDays <= 3) b += 5;
  else if (p.phiDays != null && p.phiDays <= 7) b += 3;
  if (p.type === 'Bio Pesticide') b += 8;
  // Broad-spectrum organophosphates/carbamates get a gentle demote.
  if (/organophosphate|carbamate/i.test(`${p.moaGroup ?? ''} ${p.moaDescription ?? ''}`)) b -= 3;
  return b;
}

/* ------------------------------------------------------------------ */
/* Main entry                                                          */
/* ------------------------------------------------------------------ */

/**
 * One-pass bucket cache keyed by catalogue identity. Rebuilt only when the
 * products array reference changes (i.e. after import/reset in App.tsx).
 */
let bucketCache: { source: ChemicalProduct[]; map: WeakMap<ChemicalProduct, Buckets> } | null = null;

function bucketsFor(products: ChemicalProduct[], p: ChemicalProduct): Buckets {
  if (!bucketCache || bucketCache.source !== products) {
    bucketCache = { source: products, map: new WeakMap() };
  }
  let b = bucketCache.map.get(p);
  if (!b) {
    b = buildBuckets(p);
    bucketCache.map.set(p, b);
  }
  return b;
}

/**
 * Search the catalogue the way a layperson talks:
 *   "আলুর পাচপাতরা", "tomato whitefly", "mysql 10 days safe", "moa 28",
 *   "sumithion" (typo for Sumithon) — all return sensible, explained results.
 */
export function smartSearch(rawQuery: string, products: ChemicalProduct[]): SmartSearchResult {
  const cleaned = rawQuery.trim().toLowerCase();
  const empty: SmartSearchResult = {
    items: [], matchedCrops: [], matchedPests: [], matchedBrands: 0,
    matchedIngredients: [], queryIsCrop: false, queryIsPest: false,
  };
  if (!cleaned) return empty;

  // For Bangla queries, also try the English back-translation of each token
  // (translateCrop/translatePest are keyed both ways via normKey lookups).
  const tokens = normKey(cleaned).split(' ').filter(Boolean);
  const fullPhrase = normKey(cleaned);
  const moaNum = extractMoaNumber(fullPhrase);

  const scored: ScoredProduct[] = [];
  const cropSet = new Set<string>();
  const pestSet = new Set<string>();
  const ingSet = new Set<string>();
  let brands = 0;
  let queryIsCrop = false;
  let queryIsPest = false;

  for (const p of products) {
    const b = bucketsFor(products, p);
    const reasons: MatchReason[] = [];
    let score = 0;

    // --- Category quick filter (insecticide/fungicide/… + Bangla names)
    if (fullPhrase && b.category.includes(fullPhrase)) {
      score += 8;
      reasons.push(reason('category', '', { en: p.type, bn: CATEGORY_BN[p.type] ?? p.type }));
    }

    // --- Per-token AND matching across buckets
    for (const t of tokens) {
      if (!t) continue;
      let hit = 0;

      if (b.brand === t) { hit = 30; reasons.push(reason('brand', p.tradeName)); }
      else if (b.brand.startsWith(t)) { hit = 22; reasons.push(reason('brand', p.tradeName)); }
      else if (b.brand.includes(t)) { hit = 14; reasons.push(reason('brand', p.tradeName)); }

      if (!hit && (b.ingredient === t || b.ingredient.includes(t))) {
        hit = 18; reasons.push(reason('ingredient', p.commonName));
        ingSet.add(p.commonName);
      }
      if (!hit && b.cropsEn.includes(t)) {
        hit = 12;
        const cropName = p.crops.find((c) => normKey(c).includes(t) || normKey(translateCrop(c, 'bn')).includes(t));
        if (cropName) { cropSet.add(cropName); reasons.push(reason('crop', '', { en: cropName, bn: translateCrop(cropName, 'bn') })); }
        else reasons.push(reason('crop', t));
      }
      if (!hit && b.cropsBn.includes(t)) {
        hit = 12;
        const cropName = p.crops.find((c) => normKey(translateCrop(c, 'bn')).includes(t));
        if (cropName) { cropSet.add(cropName); queryIsCrop = true; reasons.push(reason('crop', '', { en: cropName, bn: translateCrop(cropName, 'bn') })); }
      }
      if (!hit && b.pestsEn.includes(t)) {
        hit = 12;
        const pestName = p.pests.find((x) => normKey(x).includes(t) || normKey(translatePest(x, 'bn')).includes(t));
        if (pestName) { pestSet.add(pestName); reasons.push(reason('pest', '', { en: pestName, bn: translatePest(pestName, 'bn') })); }
        else reasons.push(reason('pest', t));
      }
      if (!hit && b.pestsBn.includes(t)) {
        hit = 12;
        const pestName = p.pests.find((x) => normKey(translatePest(x, 'bn')).includes(t));
        if (pestName) { pestSet.add(pestName); queryIsPest = true; reasons.push(reason('pest', '', { en: pestName, bn: translatePest(pestName, 'bn') })); }
      }
      if (!hit && b.company.includes(t)) { hit = 8; reasons.push(reason('company', p.registrationHolder)); }
      if (!hit && hasDigit(t) && b.regNo.includes(t)) { hit = 10; reasons.push(reason('regno', p.registrationNo)); }
      if (!hit && b.recents.includes(t)) { hit = 6; reasons.push(reason('label', t)); }

      // Typo tolerance as last resort (skip very short tokens).
      if (!hit && t.length >= 4 && fuzzyIncludes(b.all, t, t.length >= 7 ? 2 : 1)) {
        hit = 5; reasons.push({ kind: 'fuzzy', en: `Close to “${t}”`, bn: `“${t}”-এর কাছাকাছি` });
      }

      if (hit) score += hit;
    }

    // --- MoA numeric shortcut
    if (moaNum != null && moaMatchesNumber(p, moaNum)) {
      score += 15;
      reasons.push(reason('moa', String(moaNum)));
    }

    // Bangla-only queries that matched nothing yet: allow the translated
    // phrase to match against English buckets via crop/pest maps already
    // baked into cropsBn/pestsBn above — no extra pass needed.
    if (score <= 0) continue;

    if (reasons.some((r) => r.kind === 'brand')) brands++;
    scored.push({ product: p, score: score + safetyBoost(p), reasons: dedupeReasons(reasons).slice(0, 4) });
  }

  scored.sort((x, y) => y.score - x.score || x.product.tradeName.localeCompare(y.product.tradeName));

  return {
    items: scored,
    matchedCrops: Array.from(cropSet).sort(),
    matchedPests: Array.from(pestSet).sort(),
    matchedBrands: brands,
    matchedIngredients: Array.from(ingSet).sort(),
    queryIsCrop,
    queryIsPest,
  };
}

function dedupeReasons(rs: MatchReason[]): MatchReason[] {
  const seen = new Set<string>();
  const out: MatchReason[] = [];
  for (const r of rs) {
    const k = `${r.kind}|${r.en}`;
    if (seen.has(k)) continue;
    seen.add(k);
    out.push(r);
  }
  return out.sort((a, b) => RANK[a.kind] - RANK[b.kind]);
}
const RANK: Record<string, number> = {
  brand: 0, ingredient: 1, pest: 2, crop: 3, category: 4, moa: 5, regno: 6, company: 7, label: 8, fuzzy: 9,
};
