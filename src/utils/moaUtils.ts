/**
 * moaUtils.ts
 * ===========
 * One place that knows how mode-of-action codes are written.
 *
 * The same IRAC/FRAC/HRAC group is expressed in several notations across the
 * register, the policy sidecar and the labels an extension officer actually
 * holds:
 *
 *   FRAC  "M03"  and  "M3"     the same group, written two ways
 *   HRAC  "15"   and  "K3"     legacy letter vs. the modern numeric scheme
 *   FRAC  "16"   covers  "16.1"  a parent group contains its sub-groups
 *
 * Searching on the raw string therefore misses products that plainly belong
 * to the group the user asked for. Everything here folds those notations
 * into one canonical form ("FRAC M3", "HRAC K3") and expands a query into
 * the full set of codes it should match.
 *
 * Pure functions — no React, no data access — so they are safe to use from
 * the search engine, the rotation engine and the UI alike.
 */

/** Modern HRAC/WSSA number -> legacy HRAC letter group. */
export const HRAC_LETTER_BY_NUMBER: Record<string, string> = {
  '1': 'A', '2': 'B', '3': 'K1', '4': 'O', '5': 'C1', '6': 'C3', '7': 'C2',
  '9': 'G', '10': 'H', '12': 'F1', '13': 'F4', '14': 'E', '15': 'K3',
  '18': 'I', '19': 'P', '20': 'L', '22': 'D', '23': 'K2', '24': 'M',
  '27': 'F2', '29': 'L', '30': 'Q', '32': 'S', '33': 'T', '0': 'Z',
};

/** Legacy HRAC letter -> modern number. */
export const HRAC_NUMBER_BY_LETTER: Record<string, string> = Object.fromEntries(
  Object.entries(HRAC_LETTER_BY_NUMBER).map(([num, letter]) => [letter, num]),
);

/** The three classification schemes. */
export type MoaScheme = 'IRAC' | 'FRAC' | 'HRAC';

export interface ParsedMoaQuery {
  /** Canonical codes the query should match (already expanded). */
  codes: string[];
  /** Human-readable label for the chip / reason line. */
  label: string;
  /** The scheme the query names, when it named one. */
  scheme?: MoaScheme;
}

/**
 * Fold a single MoA code into the canonical "AUTH CODE" form.
 * Returns '' for empty input; passes through anything it cannot parse.
 */
export function canonicalMoaCode(code: string | undefined | null): string {
  if (!code) return '';
  const trimmed = String(code).trim();
  if (!trimmed) return '';

  const m = trimmed.match(/^(IRAC|FRAC|HRAC)\s+(.+)$/i);
  if (!m) return trimmed;

  const scheme = m[1].toUpperCase() as MoaScheme;
  let body = m[2].trim();

  if (scheme === 'HRAC' && HRAC_LETTER_BY_NUMBER[body]) {
    body = HRAC_LETTER_BY_NUMBER[body];
  }
  if (scheme === 'FRAC') {
    const mm = body.match(/^(M\s?)?0*(\d+)$/i);
    if (mm) body = (mm[1] ? mm[1].replace(/\s/g, '') : '') + mm[2];
  }
  return `${scheme} ${body}`;
}

/** Every code a product carries, canonicalised and de-duplicated. */
export function productMoaCodes(product: {
  moaCode?: string;
  moaCodes?: string[];
}): string[] {
  const raw = [product.moaCode ?? '', ...(product.moaCodes ?? [])];
  const out: string[] = [];
  for (const c of raw) {
    const canon = canonicalMoaCode(c);
    if (canon && !out.includes(canon)) out.push(canon);
  }
  return out;
}

/** Separators that join two groups inside one combination moaCode string. */
const MOA_COMBO_SPLIT = /\s*(?:\+|&|;|,|\/|\band\b|\bor\b)\s*/i;

/**
 * Unique atomic MoA groups behind a set of (possibly combined) code strings.
 *
 * Combination products carry strings like "FRAC M03 + 4" or
 * "HRAC 2 + 15 (B + K3)". Counting raw strings treats every combination and
 * every notation variant as a group of its own; counting groups should not.
 * This strips parenthetical alternate-notation suffixes, splits on combination
 * separators, folds each part through canonicalMoaCode() and de-duplicates —
 * so "FRAC M03", "FRAC M3" and the M03 inside "FRAC M03 + 4" all count once.
 */
export function atomicMoaGroups(codes: Iterable<string | undefined | null>): string[] {
  const out: string[] = [];
  for (const raw of codes) {
    const s = (raw ?? '').trim();
    if (!s) continue;
    const stripped = s
      .replace(/\s*\([^)]*\)\s*/g, ' ') // "(B + K3)" = notation, not a group
      .replace(/\s*\[[^\]]*\]\s*/g, ' ') // "2 [B]" — same, square-bracket form
      .trim();
    let lastScheme = '';
    for (const part of stripped.split(MOA_COMBO_SPLIT)) {
      if (!part) continue;
      const explicit = part.match(/^(IRAC|FRAC|HRAC)\b/i);
      // combination notation omits the scheme on later parts ("FRAC M03 + 4"):
      // inherit the scheme of the last part that carried one.
      const canon = canonicalMoaCode(
        explicit ? part : lastScheme ? `${lastScheme} ${part}` : part
      );
      if (explicit) lastScheme = explicit[1].toUpperCase();
      if (canon && !out.includes(canon)) out.push(canon);
    }
  }
  return out;
}

/**
 * All notations that denote the same group as `code`.
 * "FRAC M3" -> ["FRAC M3", "FRAC M03"]; "HRAC K3" -> ["HRAC K3", "HRAC 15"].
 */
export function moaCodeEquivalents(code: string): string[] {
  const canon = canonicalMoaCode(code);
  if (!canon) return [];
  const out = [canon];
  const m = canon.match(/^(IRAC|FRAC|HRAC)\s+(.+)$/);
  if (!m) return out;

  const scheme = m[1] as MoaScheme;
  const body = m[2];

  if (scheme === 'HRAC') {
    const num = HRAC_NUMBER_BY_LETTER[body];
    if (num) out.push(`HRAC ${num}`);
  }
  if (scheme === 'FRAC') {
    const mm = body.match(/^M(\d+)$/);
    if (mm) out.push(`FRAC M${mm[1].padStart(2, '0')}`);
  }
  return out;
}

/**
 * Every code a query for `code` should match:
 *   - the code itself and its equivalent notations
 *   - plus its sub-groups ("FRAC 16" also matches "FRAC 16.1")
 */
export function expandMoaQuery(code: string, knownCodes: string[] = []): string[] {
  const canon = canonicalMoaCode(code);
  if (!canon) return [];
  const out = new Set<string>(moaCodeEquivalents(canon));
  for (const known of knownCodes) {
    const k = canonicalMoaCode(known);
    // a sub-group belongs to its parent: "FRAC 16.1" -> parent "FRAC 16"
    if (k.startsWith(`${canon}.`)) out.add(k);
  }
  return [...out];
}

/**
 * Parse a query that names a mode-of-action group.
 * Accepts "FRAC 16", "FRAC16", "irac 3a", "HRAC K3", "moa 28", "group 4".
 * Returns null when the query is not an MoA reference.
 */
export function parseMoaQuery(rawQuery: string, knownCodes: string[] = []): ParsedMoaQuery | null {
  const q = String(rawQuery ?? '').trim();
  if (!q) return null;

  // explicit scheme + code, e.g. "IRAC 3A", "FRAC M03", "HRAC K3"
  let m = q.match(/^(IRAC|FRAC|HRAC)\s*([A-Z]?\s?\d{1,2}(?:\.\d)?[A-Z]?)$/i);
  if (m) {
    const code = canonicalMoaCode(`${m[1].toUpperCase()} ${m[2].replace(/\s/g, '')}`);
    return {
      codes: expandMoaQuery(code, knownCodes),
      label: code,
      scheme: m[1].toUpperCase() as MoaScheme,
    };
  }

  // "moa 28" / "group 4" / "irac 28" — the number names the group
  m = q.match(/^(?:moa|group)\s*(?:no\.?|code)?\s*(\d{1,2}[A-Z]?)$/i);
  if (!m) m = q.match(/^(?:irac|frac|hrac)\s*(?:no\.?|code)?\s*(\d{1,2}[A-Z]?)$/i);
  if (m) {
    const num = m[1].toUpperCase();
    const scheme = /^(IRAC|FRAC|HRAC)/i.test(q) ? (q.match(/^(IRAC|FRAC|HRAC)/i)![1].toUpperCase() as MoaScheme) : undefined;
    const hits = knownCodes
      .map(canonicalMoaCode)
      .filter(c => scheme ? c.startsWith(`${scheme} `) : true)
      .filter(c => {
        const body = c.split(' ')[1] ?? '';
        return body === num || body.split('.')[0] === num;
      });
    if (hits.length) {
      const codes = new Set<string>();
      for (const h of hits) for (const e of moaCodeEquivalents(h)) codes.add(e);
      return { codes: [...codes], label: hits.join(' / '), scheme };
    }
  }

  // a bare number, when a real group carries it
  m = q.match(/^\d{1,2}([A-Z]?)$/i);
  if (m) {
    const body = m[1].toUpperCase();
    const hits = knownCodes.map(canonicalMoaCode).filter(c => {
      const b = c.split(' ')[1] ?? '';
      return b === body || b.split('.')[0] === body;
    });
    if (hits.length) {
      const codes = new Set<string>();
      for (const h of hits) for (const e of moaCodeEquivalents(h)) codes.add(e);
      return { codes: [...codes], label: hits.join(' / ') };
    }
  }
  return null;
}
