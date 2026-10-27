/**
 * scanUtils.ts
 *
 * Pure helpers that turn raw camera/OCR/barcode output into ranked product
 * matches (for `ScanInputBox` -> `NextSprayGuide` / `RotationPlanner`).
 *
 * Pipeline:
 *   1. `detectScript`        — classify text as en / bn / mixed / none.
 *   2. `convertIndicDigits`  — Bengali (and other Indic) digits -> ASCII.
 *   3. `transliterateBnToEn` — best-effort Bengali-script -> Latin so Bangla
 *      label text can be matched against the English product catalogue.
 *   4. `normalizeScanText`    — digits + transliteration + lowercase + collapse.
 *   5. `matchScanResult`      — fuzzy, ranked match against brand, active
 *      ingredients, aliases, and registration number.
 *
 * None of these touch the DOM or run async work, so they are trivially
 * unit-testable with vitest.
 */
import { ChemicalProduct } from '../types';

export type DetectedScript = 'en' | 'bn' | 'mixed' | 'none';
export type ScanConfidence = 'exact' | 'partial' | 'broad';
export type ScanField = 'brand' | 'activeIngredient' | 'alias' | 'registration';

export interface ScanMatch {
  product: ChemicalProduct;
  /** Which searchable field produced the winning match. */
  field: ScanField;
  /** Quality of the match — results are sorted exact -> partial -> broad. */
  confidence: ScanConfidence;
}

export interface ScanOutcome {
  /** Detected script of the raw query. */
  script: DetectedScript;
  /** The original, unmodified query the matcher was given. */
  raw: string;
  /** Query after digit conversion + transliteration + lowercasing. */
  normalized: string;
  /** Ranked matches (empty when nothing matched). */
  matches: ScanMatch[];
}

// ---------------------------------------------------------------------------
// Script detection
// ---------------------------------------------------------------------------

/** Bengali Unicode block (including Bengali digits ০-৯ and the ৳ sign). */
const BENGALI_RANGE = /[\u0980-\u09FF]/;
const LATIN_RANGE = /[A-Za-z]/;
/** Bengali-indic digits only (০-৯), the most common OCR artifact in scans. */
const BENGALI_DIGIT = /[\u09E6-\u09EF]/;

export function detectScript(text: string): DetectedScript {
  if (!text || text.trim().length === 0) return 'none';
  const hasBn = BENGALI_RANGE.test(text);
  const hasLatin = LATIN_RANGE.test(text);
  if (hasBn && hasLatin) return 'mixed';
  if (hasBn) return 'bn';
  if (hasLatin) return 'en';
  return 'none';
}

// ---------------------------------------------------------------------------
// Digit conversion
// ---------------------------------------------------------------------------

const BENGALI_DIGITS = '০১২৩৪৫৬৭৮৯';

export function convertIndicDigits(text: string): string {
  let out = '';
  for (const ch of text) {
    const idx = BENGALI_DIGITS.indexOf(ch);
    out += idx >= 0 ? String(idx) : ch;
  }
  return out;
}

// ---------------------------------------------------------------------------
// Bengali -> Latin transliteration (best-effort, for matching only)
// ---------------------------------------------------------------------------

const BENGALI_INDEPENDENT: Record<string, string> = {
  'অ': 'o', 'আ': 'a', 'ই': 'i', 'ঈ': 'i', 'উ': 'u', 'ঊ': 'u',
  'ঋ': 'ri', 'এ': 'e', 'ঐ': 'ai', 'ও': 'o', 'ঔ': 'ou',
};

const BENGALI_SIGNS: Record<string, string> = {
  'া': 'a', 'ি': 'i', 'ী': 'i', 'ু': 'u', 'ূ': 'u',
  'ে': 'e', 'ৈ': 'ai', 'ো': 'o', 'ৌ': 'ou', 'ৗ': 'o',
};

const BENGALI_CONSONANTS: Record<string, string> = {
  'ক': 'k', 'খ': 'kh', 'গ': 'g', 'ঘ': 'gh', 'ঙ': 'ng',
  'চ': 'c', 'ছ': 'ch', 'জ': 'j', 'ঝ': 'jh', 'ঞ': 'ny',
  'ট': 't', 'ঠ': 'th', 'ড': 'd', 'ঢ': 'dh', 'ণ': 'n',
  'ত': 't', 'থ': 'th', 'দ': 'd', 'ধ': 'dh', 'ন': 'n',
  'প': 'p', 'ফ': 'ph', 'ব': 'b', 'ভ': 'b', 'ম': 'm',
  'য': 'j', 'র': 'r', 'ল': 'l',
  'শ': 'sh', 'ষ': 'sh', 'স': 's', 'হ': 'h',
  'ড়': 'r', 'ঢ়': 'dh', 'য়': 'y',
  // retroflex flap / nukta consonants kept as plain mappings.
  'ড়': 'd', 'ঢ়': 'dh',
};

const BENGALI_DIACRITICS: Record<string, string> = {
  'ঁ': '',   // candrabindu — dropped
  'ং': 'ng', // anusvara
  'ঃ': 'h',  // visarga
  '\u200c': '', // zero-width non-joiner — dropped
  '\u200d': '', // zero-width joiner — dropped
};

// Virama (hasanta) — suppresses the inherent vowel of a consonant; used to
// build conjuncts (e.g. ক্ষ, ক্ল). Handled in the scanner loop, not here.
const VIRAMA = '্';

export function transliterateBnToEn(text: string): string {
  const chars = Array.from(text);
  let out = '';
  for (let i = 0; i < chars.length; i++) {
    const ch = chars[i];
    if (ch in BENGALI_DIACRITICS) {
      out += BENGALI_DIACRITICS[ch];
      continue;
    }
    if (ch === VIRAMA) continue; // conjunct handled via lookahead below
    if (ch in BENGALI_INDEPENDENT) {
      out += BENGALI_INDEPENDENT[ch];
      continue;
    }
    if (ch in BENGALI_CONSONANTS) {
      const base = BENGALI_CONSONANTS[ch];
      // Conjunct: consonant + virama + another consonant -> drop inherent 'o'.
      if (chars[i + 1] === VIRAMA) {
        out += base;
        continue;
      }
      // Ya-phala (য়) — a vowel-decorator, not an independent 'y' sound here.
      if (ch === 'য়') continue;
      // Vowel sign follows -> emit consonant letter + sign vowel.
      const sign = chars[i + 1];
      if (sign in BENGALI_SIGNS) {
        out += base + BENGALI_SIGNS[sign];
        i++;
        continue;
      }
      // No sign -> inherent 'o' (Bengali short 'o').
      out += base + 'o';
      continue;
    }
    if (ch in BENGALI_SIGNS) {
      // Stray vowel sign (no preceding consonant) — emit its vowel.
      out += BENGALI_SIGNS[ch];
      continue;
    }
    // Non-Bengali characters pass through untouched (digits handled later).
    out += ch;
  }
  return out;
}

// ---------------------------------------------------------------------------
// Normalization
// ---------------------------------------------------------------------------

export function normalizeScanText(text: string): string {
  return convertIndicDigits(transliterateBnToEn(text))
    .toLowerCase()
    .replace(/\s+/g, ' ')
    .trim();
}

// ---------------------------------------------------------------------------
// Field scoring
// ---------------------------------------------------------------------------

const RANK: Record<ScanConfidence, number> = { exact: 0, partial: 1, broad: 2 };

function scoreField(query: string, qTokens: string[], target: string): ScanConfidence | null {
  const t = normalizeScanText(target);
  if (!t) return null;
  if (t === query) return 'exact';

  const tTokens = t.split(/\s+/).filter((x) => x.length > 0);

  // Single-token query: token-level / prefix / substring checks.
  if (qTokens.length === 1) {
    const qk = qTokens[0];
    if (qk.length === 0) return null;
    if (tTokens.includes(qk)) return 'exact';
    // Prefix match (user typing the start of a brand).
    if (t.startsWith(qk) || (tTokens[0] ?? '').startsWith(qk)) return 'partial';
    // Substring inside a token (broad).
    if (qk.length > 2 && tTokens.some((tt) => tt.includes(qk))) return 'broad';
    return null;
  }

  // Multi-token query (e.g. brand + concentration, or a two-word AI).
  if (qTokens.every((qk) => tTokens.includes(qk))) return 'exact';
  if (qTokens.every((qk) => t.includes(qk))) return 'partial';
  if (qTokens.some((qk) => qk.length > 2 && t.includes(qk))) return 'broad';
  return null;
}

// ---------------------------------------------------------------------------
// Public matcher
// ---------------------------------------------------------------------------

function searchableFields(p: ChemicalProduct): { field: ScanField; target: string }[] {
  const out: { field: ScanField; target: string }[] = [];
  if (p.tradeName) out.push({ field: 'brand', target: p.tradeName });
  for (const ai of p.activeIngredients ?? []) {
    out.push({ field: 'activeIngredient', target: ai });
  }
  for (const alias of p.aiAliases ?? []) {
    out.push({ field: 'alias', target: alias });
  }
  if (p.registrationNo) out.push({ field: 'registration', target: p.registrationNo });
  return out;
}

/**
 * Match a scanned query against a list of products.
 *
 * A product matches when the normalized query equals one of its searchable
 * fields (brand, active ingredient, alias, or registration number) or shares a
 * high-signal token with it. Products are returned once, with the best
 * (lowest) confidence achieved by any field.
 *
 * Confidence tiers:
 *   - exact:  normalized field === normalized query (or a whole token matches).
 *   - partial: query is a prefix of the field, or every query token appears in it.
 *   - broad:  the query (or one of its tokens) is a substring of the field.
 */
export function matchScanResult(query: string, products: ChemicalProduct[]): ScanMatch[] {
  const q = normalizeScanText(query);
  if (!q) return [];
  const qTokens = q.split(/\s+/).filter((x) => x.length > 0);

  const results: ScanMatch[] = [];
  for (const p of products) {
    let bestConf: ScanConfidence | null = null;
    let bestField: ScanField | null = null;
    for (const { field, target } of searchableFields(p)) {
      const conf = scoreField(q, qTokens, target);
      if (!conf) continue;
      if (!bestConf || RANK[conf] < RANK[bestConf]) {
        bestConf = conf;
        bestField = field;
      }
    }
    if (bestConf && bestField) {
      results.push({ product: p, field: bestField, confidence: bestConf });
    }
  }

  return results.sort((a, b) => RANK[a.confidence] - RANK[b.confidence]);
}

/** Full outcome incl. script detection + normalized query (convenience). */
export function scanOutcome(query: string, products: ChemicalProduct[]): ScanOutcome {
  return {
    script: detectScript(query),
    raw: query,
    normalized: normalizeScanText(query),
    matches: matchScanResult(query, products),
  };
}

export interface ParsedLabelScan {
  raw: string;
  registrationNos: string[];
  moaCodes: string[];
  groupTokens: string[];
  tradeHints: string[];
  batchNo?: string;
  jsonPayload?: Record<string, string>;
}

const REG_NO_RE = /\bAP(?:\s*\(\s*BIO\s*\))?[\s-]*\d+\b/gi;
const MOA_CODE_RE = /\b(?:IRAC|FRAC|HRAC)\s+\d{1,2}[A-Z]?(?:\s*[+/]\s*(?:IRAC|FRAC|HRAC)?\s*\d{1,2}[A-Z]?)?\b/gi;
const GROUP_LABEL_RE = /\bGROUP\s+(\d{1,2}[A-Z]?)\s+(INSECTICIDE|FUNGICIDE|HERBICIDE|MITICIDE|PESTICIDE)\b/gi;
const BATCH_RE = /\b(?:BATCH|LOT|ব্যাচ)[:\s#.-]*([A-Z0-9-]{3,})\b/i;

function normalizeRegNo(raw: string): string {
  const compact = convertIndicDigits(raw).replace(/\s+/g, '').toUpperCase();
  const digits = compact.replace(/[^0-9]/g, '');
  if (!digits) return compact;
  return /BIO/.test(compact) ? `AP(Bio)-${digits}` : `AP-${digits}`;
}

function unique(values: string[]): string[] {
  const seen = new Set<string>();
  const out: string[] = [];
  for (const value of values) {
    const key = value.trim();
    if (!key) continue;
    const folded = key.toLowerCase();
    if (seen.has(folded)) continue;
    seen.add(folded);
    out.push(key);
  }
  return out;
}

function tryParseJsonPayload(raw: string): Record<string, string> | undefined {
  const start = raw.indexOf('{');
  const end = raw.lastIndexOf('}');
  if (start < 0 || end <= start) return undefined;
  try {
    const parsed = JSON.parse(raw.slice(start, end + 1)) as Record<string, unknown>;
    const out: Record<string, string> = {};
    for (const [key, value] of Object.entries(parsed)) {
      if (value == null) continue;
      out[key] = String(value);
    }
    return Object.keys(out).length ? out : undefined;
  } catch {
    return undefined;
  }
}

export function extractRegistrationNos(text: string): string[] {
  const converted = convertIndicDigits(text);
  const hits = converted.match(REG_NO_RE) ?? [];
  return unique(hits.map(normalizeRegNo));
}

export function parseLabelScan(raw: string): ParsedLabelScan {
  const text = convertIndicDigits(raw || '');
  const jsonPayload = tryParseJsonPayload(text);
  const registrationNos = unique([
    ...extractRegistrationNos(text),
    jsonPayload?.registrationNo ? normalizeRegNo(jsonPayload.registrationNo) : '',
    jsonPayload?.regNo ? normalizeRegNo(jsonPayload.regNo) : '',
  ]);
  const moaCodes = unique([
    ...(text.match(MOA_CODE_RE) ?? []).map((x) => x.replace(/\s+/g, ' ').trim()),
    jsonPayload?.moaCode ?? '',
  ]);
  const groupTokens = unique(
    [...text.matchAll(GROUP_LABEL_RE)].map((m) => (m[1] || '').toUpperCase())
  );
  const tradeHints = unique([
    jsonPayload?.tradeName ?? '',
    jsonPayload?.brand ?? '',
    jsonPayload?.productName ?? '',
  ]);
  const batchHit = text.match(BATCH_RE);
  return {
    raw,
    registrationNos,
    moaCodes,
    groupTokens,
    tradeHints,
    batchNo: jsonPayload?.batchNo || jsonPayload?.batch || batchHit?.[1],
    jsonPayload,
  };
}

function matchByRegistration(regNos: string[], products: ChemicalProduct[]): ScanMatch[] {
  if (!regNos.length) return [];
  const wanted = new Set(regNos.map((r) => r.toLowerCase()));
  return products
    .filter((p) => wanted.has((p.registrationNo || '').toLowerCase()))
    .map((product) => ({ product, field: 'registration' as const, confidence: 'exact' as const }));
}

export function matchParsedLabel(parsed: ParsedLabelScan, products: ChemicalProduct[]): ScanMatch[] {
  const byReg = matchByRegistration(parsed.registrationNos, products);
  if (byReg.length) return byReg;

  const queries = unique([
    ...parsed.tradeHints,
    ...parsed.moaCodes,
    parsed.raw,
  ]);
  const ranked: ScanMatch[] = [];
  const seen = new Set<string>();
  for (const query of queries) {
    for (const hit of matchScanResult(query, products)) {
      if (seen.has(hit.product.id)) continue;
      seen.add(hit.product.id);
      ranked.push(hit);
    }
  }
  return ranked.sort((a, b) => RANK[a.confidence] - RANK[b.confidence]);
}

const SCAN_QUEUE_KEY = 'pesticidenext_scan_queue';

export interface QueuedScan {
  id: string;
  ts: number;
  mode: 'qr' | 'ocr';
  raw: string;
  registrationNos: string[];
  synced: boolean;
}

export function enqueueOfflineScan(entry: Omit<QueuedScan, 'id' | 'ts' | 'synced'>): QueuedScan {
  const full: QueuedScan = {
    ...entry,
    id: `scan-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    ts: Date.now(),
    synced: false,
  };
  if (typeof window === 'undefined') return full;
  try {
    const raw = window.localStorage.getItem(SCAN_QUEUE_KEY);
    const prev: QueuedScan[] = raw ? JSON.parse(raw) : [];
    const next = [...prev, full].slice(-200);
    window.localStorage.setItem(SCAN_QUEUE_KEY, JSON.stringify(next));
  } catch {
    /* quota / private mode */
  }
  return full;
}

export function readOfflineScanQueue(): QueuedScan[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = window.localStorage.getItem(SCAN_QUEUE_KEY);
    return raw ? (JSON.parse(raw) as QueuedScan[]) : [];
  } catch {
    return [];
  }
}
