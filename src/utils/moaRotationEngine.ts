/**
 * MoA Rotation Compliance Engine
 * ─────────────────────────────────────────────────────────────────────────
 * Pure-function implementation of the IRAC MoA Rotation Guide §4.2 — the
 * "Decision Engine Logic & Compliance Algorithm" that validates a proposed
 * insecticide application against the field's spray history.
 *
 * The engine implements the three validation logics mandated by the guide:
 *
 *   Logic 1 — Dynamic Window Calculation & Sequential Check
 *     Determine the treatment window length for the target pest
 *     (15 days for fast-reproducing sucking pests, 30 days for standard
 *     multi-generational pests). Block any proposed product whose IRAC
 *     main group was applied within the preceding treatment window.
 *
 *   Logic 2 — Sub-Group Risk Flag
 *     If the proposed selection changes only the sub-group letter
 *     (e.g. 4A → 4C) while unexposed main numbered MoA classes exist in
 *     the available product registry, the engine emits a High Risk /
 *     Sub-Group Non-Compliance flag (warning, not block — the guide
 *     permits this only as an emergency exception).
 *
 *   Logic 3 — Cumulative Seasonal Exposure Cap
 *     Tracks historical applications within the active Field_Block_Season.
 *     Blocks the selection if cumulative window duration for that IRAC
 *     main group exceeds 50% of total crop cycle length OR if total
 *     applications for that MoA exceed 50% of total seasonal sprays
 *     against the target pest.
 *
 * The engine is intentionally framework-agnostic — it operates on plain
 * `ApplicationLogEntry` records and produces a structured `ComplianceResult`
 * that any UI (modal, banner, toast) can render.
 */
import { MoAClassification } from '../types';
import {
  MOA_DATABASE,
  TREATMENT_WINDOW_STANDARD_DAYS,
  TREATMENT_WINDOW_SUCKING_PEST_DAYS,
  SEASONAL_EXPOSURE_CAP_PCT,
} from '../data/moaData';

// ─── Types ──────────────────────────────────────────────────────────────

/**
 * A single application record — the persisted shape used by the engine.
 * Compatible with the existing `SprayEntry` from useSprayHistory via a
 * thin adapter, so the engine does not depend on React hooks.
 */
export interface ApplicationLogEntry {
  /** Stable unique id (e.g. `spray-<ts>-<rand>`). */
  id: string;
  /** ISO date the spray was applied (YYYY-MM-DD). */
  date: string;
  /** Trade name of the product applied. */
  productName: string;
  /** Common name (active ingredient label) of the product. */
  commonName: string;
  /** Full MoA code (e.g. "IRAC 4A", "IRAC 28", "FRAC 11"). */
  moaCode: string;
  /** Human-readable MoA group / target site description. */
  moaGroup: string;
  /** Chemical type ("Insecticide" | "Fungicide" | ...). */
  type: string;
  /** Crop the application was made on. */
  crop: string;
  /** Target pest / disease / weed (free text — matched against sucking-pest list). */
  pest: string;
  /** Optional field block name (for multi-block operations). */
  fieldLabel?: string;
}

/** Crop phase — used by the recommendation filter (Guide §3 + §4.2.4). */
export type CropPhase = 'Nursery' | 'Vegetative' | 'Reproductive' | 'Heading' | 'All';

/** Severity of a single compliance finding. */
export type FindingSeverity = 'PASS' | 'FLAG' | 'BLOCK';

/** One compliance finding — emitted by the engine for each failed/flagged check. */
export interface ComplianceFinding {
  /** Which validation logic produced the finding. */
  logic: 'WINDOW_ROTATION' | 'SUBGROUP_RISK' | 'SEASONAL_EXPOSURE_CAP' | 'CROP_PHASE_MISMATCH' | 'MAX_APPS_PER_WINDOW';
  /** Severity — BLOCK is a hard stop, FLAG is a warning. */
  severity: FindingSeverity;
  /** Short, user-facing reason code (English, code-stable). */
  code: string;
  /** English explanation shown in the warning modal. */
  messageEn: string;
  /** Bengali explanation shown in the warning modal. */
  messageBn: string;
}

/** Final structured result returned by `runComplianceCheck`. */
export interface ComplianceResult {
  /** Overall verdict — the worst severity across all findings. */
  verdict: FindingSeverity;
  /** All findings (PASS findings are omitted — only flags and blocks). */
  findings: ComplianceFinding[];
  /** Treatment window length in days used for the check (15 or 30). */
  windowDays: number;
  /** Proposed product's main MoA group number (e.g. "4" for "IRAC 4A"). */
  proposedMainGroup: string | null;
  /** Proposed product's sub-group letter (e.g. "A" for "IRAC 4A"). */
  proposedSubGroup: string | null;
  /** Comma-separated list of available alternative main groups. */
  alternativeMainGroups: string[];
}

// ─── Sucking pest detection (Guide §2.1) ───────────────────────────────

/**
 * Pest keywords that indicate a fast-reproducing sucking pest, mandating a
 * 15-day treatment window instead of the 30-day standard. Drawn from the
 * guide §2.1 list: "aphids, whiteflies, and mites" plus common rice
 * hoppers (BPH, GLH) which are biologically equivalent sucking pests.
 */
const SUCKING_PEST_KEYWORDS = [
  // English
  'aphid', 'aphids',
  'whitefly', 'whiteflies',
  'mite', 'mites',
  'thrip', 'thrips',
  'leafhopper', 'leafhoppers',
  'planthopper', 'planthoppers',
  'hopper',
  'scale',
  'mealybug',
  'psyllid',
  // Common Bengali spellings (transliterated)
  'মাজরা',
  'মাহু',
  'ব্রাউন প্ল্যান্টহপার',
  'বিপিএইচ',
  'সাদা মাছি',
  'আরশা',
  'জাব',
  'পাঁচপাতি',
];

/**
 * Determine whether a pest name describes a fast-reproducing sucking pest
 * (15-day window) or a standard multi-generational pest (30-day window).
 *
 * The match is case-insensitive substring on both English and Bengali
 * keywords, so "Brown Planthopper (BPH)" matches both "planthopper" and
 * "BPH" without requiring exact taxonomy.
 */
export function isSuckingPest(pest: string): boolean {
  if (!pest) return false;
  const lower = pest.toLowerCase();
  return SUCKING_PEST_KEYWORDS.some((kw) => lower.includes(kw.toLowerCase()));
}

/**
 * Treatment window length in days for a given pest. Mirrors Guide §2.1:
 * 15 days for fast-reproducing sucking pests, 30 days otherwise.
 */
export function getTreatmentWindowDays(pest: string): number {
  return isSuckingPest(pest)
    ? TREATMENT_WINDOW_SUCKING_PEST_DAYS
    : TREATMENT_WINDOW_STANDARD_DAYS;
}

// ─── MoA code parsing ───────────────────────────────────────────────────

/**
 * Parse a MoA code like "IRAC 4A", "IRAC 28", "FRAC 11", "HRAC B" into its
 * main group number/sub-group letter components.
 *
 * Returns `{ mainGroup, subGroup }` where `mainGroup` is the numeric main
 * MoA group ("4", "28", "11") — or a single letter for letter-only groups
 * (FRAC M01, HRAC B) — and `subGroup` is the capital sub-group letter
 * ("A", "B", "C") when present, otherwise `null`.
 *
 * Returns `{ mainGroup: null, subGroup: null }` for unparseable codes
 * (e.g. "IRAC UN", "Standard", "—").
 */
export function parseMoACode(code: string): { mainGroup: string | null; subGroup: string | null } {
  if (!code) return { mainGroup: null, subGroup: null };
  // Strip the scheme prefix ("IRAC ", "FRAC ", "HRAC ").
  const stripped = code.replace(/^(IRAC|FRAC|HRAC)\s+/i, '');
  if (!stripped) return { mainGroup: null, subGroup: null };

  // Match either "28A", "4A", "11" or "M01", "B" — capture group + sub.
  // Numeric main groups (1-2 digits) optionally followed by capital letter:
  const numericMatch = stripped.match(/^(\d{1,2})([A-Z])?$/);
  if (numericMatch) {
    return { mainGroup: numericMatch[1], subGroup: numericMatch[2] ?? null };
  }
  // Letter-only main groups (FRAC M01, HRAC B, FRAC P07): take the whole
  // token as the main group — sub-groups are not used in these schemes.
  const letterMatch = stripped.match(/^([A-Z]\d{0,2})$/);
  if (letterMatch) {
    return { mainGroup: letterMatch[1], subGroup: null };
  }
  // Unknown / UN / UNB / UNF — no parseable main group.
  return { mainGroup: null, subGroup: null };
}

/**
 * Convenience: extract just the main group from a MoA code.
 * Returns `null` if the code is unparseable or for "UN" groups.
 */
export function getMainGroup(code: string): string | null {
  return parseMoACode(code).mainGroup;
}

/**
 * Convenience: extract just the sub-group letter from a MoA code.
 * Returns `null` if the code has no sub-group or is unparseable.
 */
export function getSubGroup(code: string): string | null {
  return parseMoACode(code).subGroup;
}

// ─── Date helpers (no external date library — pure ISO date arithmetic) ──

/**
 * Parse an ISO date string (YYYY-MM-DD) to a UTC epoch ms timestamp.
 * Returns `NaN` for invalid input.
 */
function toEpochMs(isoDate: string): number {
  if (!isoDate) return NaN;
  // Force UTC interpretation to avoid local-timezone drift.
  const m = isoDate.match(/^(\d{4})-(\d{2})-(\d{2})/);
  if (!m) return NaN;
  return Date.UTC(+m[1], +m[2] - 1, +m[3]);
}

/**
 * Add `days` calendar days to an ISO date string and return a new ISO date.
 * Pure — no mutation, no Date-object timezone drift.
 */
export function addDays(isoDate: string, days: number): string {
  const base = toEpochMs(isoDate);
  if (Number.isNaN(base)) return isoDate;
  const shifted = base + days * 24 * 60 * 60 * 1000;
  return new Date(shifted).toISOString().slice(0, 10);
}

/**
 * Calendar days between two ISO dates (a - b). Positive if `a` is later.
 */
export function daysBetween(aIso: string, bIso: string): number {
  const a = toEpochMs(aIso);
  const b = toEpochMs(bIso);
  if (Number.isNaN(a) || Number.isNaN(b)) return 0;
  return Math.round((a - b) / (24 * 60 * 60 * 1000));
}

// ─── Logic 1 — Window Check (Guide §4.2.1) ───────────────────────────────

/**
 * Find all applications logged within the [start, end] date window
 * (inclusive on both ends) for a given crop + field block.
 *
 * `fieldLabel` filters to a specific block — pass `undefined` to ignore
 * block filtering (useful when the user has not labelled their fields).
 */
export function findApplicationsInWindow(
  log: ApplicationLogEntry[],
  startIso: string,
  endIso: string,
  crop: string,
  fieldLabel?: string
): ApplicationLogEntry[] {
  const startMs = toEpochMs(startIso);
  const endMs = toEpochMs(endIso);
  if (Number.isNaN(startMs) || Number.isNaN(endMs)) return [];
  return log.filter((e) => {
    if (e.crop.toLowerCase() !== crop.toLowerCase()) return false;
    if (fieldLabel && (e.fieldLabel || '').toLowerCase() !== fieldLabel.toLowerCase()) return false;
    const t = toEpochMs(e.date);
    if (Number.isNaN(t)) return false;
    return t >= startMs && t <= endMs;
  });
}

/**
 * Logic 1 — Dynamic Window Calculation & Sequential Check.
 *
 * Computes the preceding treatment window relative to the proposed spray
 * date (proposedDate - windowDays to proposedDate - 1) and checks whether
 * any application in that window shares the proposed product's IRAC main
 * group. If so, the proposed selection is BLOCKED — "Sequential
 * multi-generational exposure is prohibited" per Guide §2.2 rule #1.
 */
export function checkWindowRotation(
  log: ApplicationLogEntry[],
  proposedDate: string,
  proposedMoACode: string,
  crop: string,
  fieldLabel: string | undefined,
  windowDays: number
): ComplianceFinding | null {
  const proposedMain = getMainGroup(proposedMoACode);
  if (!proposedMain) return null; // unknown MoA — cannot block

  // Preceding window = [proposedDate - windowDays, proposedDate - 1]
  const windowStart = addDays(proposedDate, -windowDays);
  const windowEnd = addDays(proposedDate, -1);
  const priorApps = findApplicationsInWindow(log, windowStart, windowEnd, crop, fieldLabel);

  const conflict = priorApps.find((a) => {
    const appMain = getMainGroup(a.moaCode);
    return appMain !== null && appMain === proposedMain;
  });

  if (!conflict) return null;

  const daysAgo = daysBetween(proposedDate, conflict.date);
  return {
    logic: 'WINDOW_ROTATION',
    severity: 'BLOCK',
    code: 'WINDOW_REPEAT',
    messageEn:
      `Non-Compliant: MoA Group ${proposedMain} was applied ${daysAgo} day(s) ago ` +
      `within the preceding ${windowDays}-day treatment window. ` +
      `Sequential multi-generational exposure to the same IRAC main group is prohibited.`,
    messageBn:
      `অনুমোদনযোগ্য নয়: ${proposedDate} এর মধ্যে MoA গ্রুপ ${proposedMain} আগে ${conflict.date} ` +
      `(${daysAgo} দিন আগে) প্রয়োগ করা হয়েছে। একই IRAC মূল গ্রুপের পরপর ব্যবহার নিষিদ্ধ — ` +
      `পরবর্তী প্রজন্মে রেজিসট্যান্স তৈরি হবে।`,
  };
}

// ─── Logic 2 — Sub-Group Risk Flag (Guide §4.2.2) ────────────────────────

/**
 * Logic 2 — Sub-Group Risk Flag.
 *
 * Triggers a High Risk / Sub-Group Non-Compliance warning when:
 *   1. The previous application used a MoA code from the SAME main group
 *      but a DIFFERENT sub-group (e.g. 4A → 4C), AND
 *   2. There exist unexposed main numbered MoA classes available in the
 *      product registry for this crop+pest combination.
 *
 * Per Guide §2.3 "Sub-Group Constraints": rotating between sub-groups of
 * the same main group is permitted only as an emergency exception when
 * no distinct main classes are available. When alternatives exist, this
 * function returns a FLAG (not a BLOCK) so the user can proceed with an
 * explicit agronomic justification.
 */
export function checkSubGroupRotation(
  log: ApplicationLogEntry[],
  proposedDate: string,
  proposedMoACode: string,
  crop: string,
  fieldLabel: string | undefined,
  availableMoACodes: string[]
): ComplianceFinding | null {
  const proposed = parseMoACode(proposedMoACode);
  if (!proposed.mainGroup || !proposed.subGroup) return null;

  // Look back over the past 60 days — covers 2 standard windows — to find
  // a prior application from the same main group with a different sub-group.
  const lookbackStart = addDays(proposedDate, -60);
  const lookbackEnd = addDays(proposedDate, -1);
  const priorApps = findApplicationsInWindow(log, lookbackStart, lookbackEnd, crop, fieldLabel);

  const subGroupRotation = priorApps.find((a) => {
    const prior = parseMoACode(a.moaCode);
    return (
      prior.mainGroup === proposed.mainGroup &&
      prior.subGroup !== null &&
      prior.subGroup !== proposed.subGroup
    );
  });

  if (!subGroupRotation) return null;

  // Are there unexposed main groups available?
  const usedMainGroups = new Set(
    priorApps
      .map((a) => getMainGroup(a.moaCode))
      .filter((g): g is string => g !== null)
  );
  usedMainGroups.add(proposed.mainGroup);

  const alternativeMainGroups = Array.from(
    new Set(
      availableMoACodes
        .map((c) => getMainGroup(c))
        .filter((g): g is string => g !== null && !usedMainGroups.has(g))
    )
  ).sort((a, b) => Number(a) - Number(b));

  // If no alternatives exist, sub-group rotation is permitted as exception.
  if (alternativeMainGroups.length === 0) return null;

  const priorSub = getSubGroup(subGroupRotation.moaCode);
  return {
    logic: 'SUBGROUP_RISK',
    severity: 'FLAG',
    code: 'SUBGROUP_NONCOMPLIANCE',
    messageEn:
      `High Risk / Sub-Group Non-Compliance: proposed selection changes only the ` +
      `sub-group (${proposed.mainGroup}${priorSub} → ${proposed.mainGroup}${proposed.subGroup}). ` +
      `Unexposed main MoA groups are available (${alternativeMainGroups.join(', ')}). ` +
      `Sub-group rotation is permitted only as an emergency exception.`,
    messageBn:
      `উচ্চ ঝুঁকি / সাব-গ্রুপ অনুমোদন নয়: শুধুমাত্র সাব-গ্রুপ পরিবর্তন ` +
      `(${proposed.mainGroup}${priorSub} → ${proposed.mainGroup}${proposed.subGroup})। ` +
      `বিকল্প মূল MoA গ্রুপ উপলব্ধ (${alternativeMainGroups.join(', ')}). ` +
      `সাব-গ্রুপ ঘূর্ণন শুধুমাত্র জরুরি ব্যতিক্রম হিসেবে অনুমোদিত।`,
  };
}

// ─── Logic 3 — Seasonal Exposure Cap (Guide §4.2.3) ───────────────────────

/**
 * Inputs for the seasonal exposure cap check — Guide §2.3.
 */
export interface SeasonalExposureInput {
  /** Full spray log for the active season. */
  log: ApplicationLogEntry[];
  /** ISO date of the proposed application. */
  proposedDate: string;
  /** Full MoA code of the proposed product. */
  proposedMoACode: string;
  /** Crop the application targets. */
  crop: string;
  /** Optional field block label. */
  fieldLabel: string | undefined;
  /** ISO date the crop cycle started (sowing/transplant). */
  cropCycleStart: string;
  /** ISO date the crop cycle ends (harvest). */
  cropCycleEnd: string;
  /** Window days (15 or 30) — used to count window-duration per app. */
  windowDays: number;
}

/**
 * Logic 3 — Cumulative Seasonal Exposure Cap.
 *
 * Blocks the proposed selection when EITHER:
 *   (a) Cumulative window duration for the proposed MoA main group would
 *       exceed 50% of the total crop cycle length, OR
 *   (b) Total applications for that MoA main group would exceed 50% of
 *       the total seasonal sprays against the target pest.
 *
 * Per Guide §2.3 — the "50% Exposure Cap" rule.
 */
export function checkSeasonalExposureCap(
  input: SeasonalExposureInput
): ComplianceFinding | null {
  const { log, proposedDate, proposedMoACode, crop, fieldLabel,
    cropCycleStart, cropCycleEnd, windowDays } = input;

  const proposedMain = getMainGroup(proposedMoACode);
  if (!proposedMain) return null;

  // Filter log to this crop+field, restricted to the active season window.
  const cycleStartMs = toEpochMs(cropCycleStart);
  const cycleEndMs = toEpochMs(cropCycleEnd);
  if (Number.isNaN(cycleStartMs) || Number.isNaN(cycleEndMs)) return null;

  const seasonApps = log.filter((e) => {
    if (e.crop.toLowerCase() !== crop.toLowerCase()) return false;
    if (fieldLabel && (e.fieldLabel || '').toLowerCase() !== fieldLabel.toLowerCase()) return false;
    const t = toEpochMs(e.date);
    if (Number.isNaN(t)) return false;
    return t >= cycleStartMs && t <= cycleEndMs;
  });

  // ── (a) Duration cap ──
  // Count: existing apps of this main group + 1 (the proposed app),
  // multiplied by windowDays = cumulative exposure duration.
  const sameGroupApps = seasonApps.filter((a) => getMainGroup(a.moaCode) === proposedMain);
  const cumDurationDays = (sameGroupApps.length + 1) * windowDays;
  const cycleLengthDays = daysBetween(cropCycleEnd, cropCycleStart);
  if (cycleLengthDays <= 0) return null;
  const durationPct = (cumDurationDays / cycleLengthDays) * 100;

  // ── (b) Application count cap ──
  // Count of proposed main-group apps / total season apps (incl. proposed).
  const totalApps = seasonApps.length + 1; // +1 for the proposed
  const groupAppsAfter = sameGroupApps.length + 1;
  const appCountPct = (groupAppsAfter / totalApps) * 100;

  const cap = SEASONAL_EXPOSURE_CAP_PCT;

  if (durationPct > cap) {
    return {
      logic: 'SEASONAL_EXPOSURE_CAP',
      severity: 'BLOCK',
      code: 'SEASONAL_DURATION_EXCEEDED',
      messageEn:
        `Non-Compliant: cumulative treatment-window duration for MoA Group ${proposedMain} ` +
        `would reach ${Math.round(durationPct)}% of the crop cycle (cap: ${cap}%). ` +
        `Seasonal over-reliance on this mode of action is prohibited.`,
      messageBn:
        `অনুমোদনযোগ্য নয়: MoA গ্রুপ ${proposedMain} এর মৌসুমীক প্রয়োগ মোট ফসল চক্রের ` +
        `${Math.round(durationPct)}% ছাড়িয়ে যাবে (সীমা: ${cap}%)। একই গ্রুপের ওপর মৌসুমজুড়ে ` +
        `অতিরিক্ত নির্ভরতা নিষিদ্ধ।`,
    };
  }

  if (appCountPct > cap) {
    return {
      logic: 'SEASONAL_EXPOSURE_CAP',
      severity: 'BLOCK',
      code: 'SEASONAL_APP_COUNT_EXCEEDED',
      messageEn:
        `Non-Compliant: MoA Group ${proposedMain} applications would reach ` +
        `${Math.round(appCountPct)}% of total seasonal sprays (cap: ${cap}%). ` +
        `Diversify your chemistry across distinct main numbered MoA groups.`,
      messageBn:
        `অনুমোদনযোগ্য নয়: MoA গ্রুপ ${proposedMain} এর প্রয়োগ মোট মৌসুমী স্প্রের ` +
        `${Math.round(appCountPct)}% ছাড়িয়ে যাবে (সীমা: ${cap}%)। ভিন্ন মূল MoA গ্রুপ ব্যবহার করুন।`,
    };
  }

  return null;
}

// ─── Max apps per window check (Guide §2.2 rule #2) ──────────────────────

/**
 * Within-Window Limits — Guide §2.2 rule #2.
 *
 * Multiple applications (generally 1-2, strictly max <3) of the same MoA
 * group are permissible within a single window only if they target the
 * same single pest generation and their combined residual activity does
 * not exceed the window's temporal limit.
 *
 * Here we use the `maxAppsPerWindow` field stored on each MoA entry (set
 * from the guide in PR #49) — BLOCK if adding this application would
 * exceed the per-window app count for that MoA.
 */
export function checkMaxAppsPerWindow(
  log: ApplicationLogEntry[],
  proposedDate: string,
  proposedMoACode: string,
  crop: string,
  fieldLabel: string | undefined,
  windowDays: number
): ComplianceFinding | null {
  const proposedMain = getMainGroup(proposedMoACode);
  if (!proposedMain) return null;

  // Look up the per-window cap from the MoA database.
  const moaInfo = MOA_DATABASE.find((m) => m.code === proposedMoACode);
  const cap = moaInfo?.maxAppsPerWindow;
  if (!cap || cap < 1) return null;

  const windowStart = addDays(proposedDate, -(windowDays - 1));
  const windowEnd = proposedDate;
  const windowApps = findApplicationsInWindow(log, windowStart, windowEnd, crop, fieldLabel);
  const sameGroupCount = windowApps.filter(
    (a) => getMainGroup(a.moaCode) === proposedMain
  ).length;

  // +1 for the proposed application.
  if (sameGroupCount + 1 > cap) {
    return {
      logic: 'MAX_APPS_PER_WINDOW',
      severity: 'BLOCK',
      code: 'WINDOW_APP_LIMIT_EXCEEDED',
      messageEn:
        `Non-Compliant: MoA ${proposedMoACode} permits a maximum of ${cap} application(s) ` +
        `per ${windowDays}-day treatment window. ${sameGroupCount} already logged; adding ` +
        `this entry would exceed the within-window limit.`,
      messageBn:
        `অনুমোদনযোগ্য নয়: MoA ${proposedMoACode} প্রতি ${windowDays}-দিনের উইন্ডোতে সর্বোচ্চ ` +
        `${cap} বার প্রয়োগ করার অনুমতি দেয়। ইতিমধ্যে ${sameGroupCount} বার লগ করা হয়েছে — ` +
        `আর একটি যোগ করলে উইন্ডোর সীমা অতিক্রম হবে।`,
    };
  }
  return null;
}

// ─── Crop phase recommendation filter (Guide §3 + §4.2.4) ────────────────

/**
 * Recommendation Filtering — Guide §4.2.4.
 *
 * Returns a FLAG when the proposed product's `recommendedCropPhase` does
 * not match the user's current crop phase. This is informational — the
 * guide does not block on phase mismatch, but advises the agronomist
 * that a more effective chemistry exists for the current phase.
 *
 * `proposedMoACode` is matched against the MoA database. `currentPhase`
 * is the user-declared phase of the field. If either is missing or
 * `recommendedCropPhase === 'All'`, no finding is emitted.
 */
export function checkCropPhaseAlignment(
  proposedMoACode: string,
  currentPhase: CropPhase | undefined
): ComplianceFinding | null {
  if (!currentPhase) return null;
  const moaInfo = MOA_DATABASE.find((m) => m.code === proposedMoACode);
  if (!moaInfo?.recommendedCropPhase) return null;
  if (moaInfo.recommendedCropPhase === 'All') return null;
  if (moaInfo.recommendedCropPhase === currentPhase) return null;

  return {
    logic: 'CROP_PHASE_MISMATCH',
    severity: 'FLAG',
    code: 'PHASE_NOT_OPTIMAL',
    messageEn:
      `Advisory: ${proposedMoACode} is optimally deployed during the ` +
      `${moaInfo.recommendedCropPhase} phase. Current field phase is ${currentPhase}. ` +
      `A different chemistry may give better efficacy for this growth stage.`,
    messageBn:
      `পরামর্শ: ${proposedMoACode} সবচেয়ে কার্যকর ${moaInfo.recommendedCropPhase} পর্যায়ে। ` +
      `বর্তমান ফসল পর্যায় ${currentPhase} — এই স্টেজে অন্য রসায়ন বেশি কার্যকর হতে পারে।`,
  };
}

// ─── Orchestrator — run all logics in order ──────────────────────────────

export interface ComplianceCheckInput {
  log: ApplicationLogEntry[];
  proposedDate: string;
  proposedMoACode: string;
  crop: string;
  pest: string;
  fieldLabel?: string;
  cropCycleStart?: string;
  cropCycleEnd?: string;
  currentPhase?: CropPhase;
  /** All MoA codes available in the product registry for this crop+pest. */
  availableMoACodes: string[];
}

/**
 * Run all five compliance checks in priority order and return the
 * aggregated result. The verdict is the worst severity across all
 * findings (BLOCK > FLAG > PASS).
 *
 * Findings are returned in priority order — window rotation block first
 * (most severe), then seasonal cap, then sub-group risk flag, then
 * within-window app limit, then crop-phase advisory.
 */
export function runComplianceCheck(input: ComplianceCheckInput): ComplianceResult {
  const {
    log, proposedDate, proposedMoACode, crop, pest, fieldLabel,
    cropCycleStart, cropCycleEnd, currentPhase, availableMoACodes,
  } = input;

  const findings: ComplianceFinding[] = [];
  const windowDays = getTreatmentWindowDays(pest);
  const proposed = parseMoACode(proposedMoACode);

  // Logic 1 — Window rotation (BLOCK)
  const windowFinding = checkWindowRotation(
    log, proposedDate, proposedMoACode, crop, fieldLabel, windowDays
  );
  if (windowFinding) findings.push(windowFinding);

  // Logic 3 — Seasonal exposure cap (BLOCK) — only if crop cycle is known
  if (cropCycleStart && cropCycleEnd) {
    const seasonalFinding = checkSeasonalExposureCap({
      log, proposedDate, proposedMoACode, crop, fieldLabel,
      cropCycleStart, cropCycleEnd, windowDays,
    });
    if (seasonalFinding) findings.push(seasonalFinding);
  }

  // Within-window app limit (BLOCK)
  const maxAppsFinding = checkMaxAppsPerWindow(
    log, proposedDate, proposedMoACode, crop, fieldLabel, windowDays
  );
  if (maxAppsFinding) findings.push(maxAppsFinding);

  // Logic 2 — Sub-group risk flag (FLAG)
  const subGroupFinding = checkSubGroupRotation(
    log, proposedDate, proposedMoACode, crop, fieldLabel, availableMoACodes
  );
  if (subGroupFinding) findings.push(subGroupFinding);

  // Crop phase advisory (FLAG)
  const phaseFinding = checkCropPhaseAlignment(proposedMoACode, currentPhase);
  if (phaseFinding) findings.push(phaseFinding);

  // Compute alternative main groups for the verdict summary.
  const usedMainGroups = new Set(
    findApplicationsInWindow(
      log,
      addDays(proposedDate, -60),
      addDays(proposedDate, -1),
      crop,
      fieldLabel
    )
      .map((a) => getMainGroup(a.moaCode))
      .filter((g): g is string => g !== null)
  );
  if (proposed.mainGroup) usedMainGroups.add(proposed.mainGroup);
  const alternativeMainGroups = Array.from(
    new Set(
      availableMoACodes
        .map((c) => getMainGroup(c))
        .filter((g): g is string => g !== null && !usedMainGroups.has(g))
    )
  ).sort((a, b) => Number(a) - Number(b));

  const verdict: FindingSeverity = findings.some((f) => f.severity === 'BLOCK')
    ? 'BLOCK'
    : findings.some((f) => f.severity === 'FLAG')
      ? 'FLAG'
      : 'PASS';

  return {
    verdict,
    findings,
    windowDays,
    proposedMainGroup: proposed.mainGroup,
    proposedSubGroup: proposed.subGroup,
    alternativeMainGroups,
  };
}

// ─── Visual badge — Guide §4.3 (rendered as a string for reuse) ──────────

/**
 * Returns a label string in the IRAC "GROUP 28 INSECTICIDE" format
 * required by Guide §4.3 (Visual Badging Standards). The sub-group
 * letter is rendered in the same token as the main number, all caps.
 *
 *   "IRAC 4A" → "GROUP 4A INSECTICIDE"
 *   "IRAC 28" → "GROUP 28 INSECTICIDE"
 *   "FRAC 11" → "GROUP 11 FUNGICIDE"
 *   "HRAC B"  → "GROUP B HERBICIDE"
 */
export function formatGroupBadgeLabel(moaCode: string, type: string): string {
  const parsed = parseMoACode(moaCode);
  if (!parsed.mainGroup) {
    // Unknown / UN — fall back to a generic label rather than mislead.
    return `GROUP UN ${type.toUpperCase()}`;
  }
  const groupToken = parsed.subGroup
    ? `${parsed.mainGroup}${parsed.subGroup}`
    : `${parsed.mainGroup}`;
  const typeToken = type.toUpperCase();
  return `GROUP ${groupToken} ${typeToken}`;
}

/**
 * Resolve the MoA database entry for a given code (helper for the UI).
 */
export function findMoAInfo(moaCode: string): MoAClassification | undefined {
  return MOA_DATABASE.find((m) => m.code === moaCode);
}
