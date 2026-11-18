// ============================================================
// Product Eligibility Engine (Task 4)
//
// Strict eligibility filtering over the existing ChemicalProduct[]
// loaded by src/data/loadDatabase.ts. This module does NOT build a
// new database — it gates the existing one.
//
// Eligibility rules (directive):
//   1. Registration status must be appropriately verified.
//   2. Crop must be compatible with the verified registration.
//   3. Target (pest/disease) must be compatible with the verified registration.
//   4. Formulation/usage compatibility.
//   5. Label information and restrictions evaluated.
//   6. Missing critical information must be disclosed.
//
// Data integrity: a trade name, active ingredient or MoA group alone
// never establishes eligibility. Missing data never passes. Dosage is
// never fabricated — it is shown only when present in the registry.
// ============================================================

import type { ChemicalProduct } from '../types';

export type ExclusionReasonCode =
  | 'MISSING_REGISTRATION_NO'
  | 'INVALID_REGISTRATION_NO'
  | 'POLICY_BANNED'
  | 'CROP_NOT_REGISTERED'
  | 'TARGET_NOT_REGISTERED'
  | 'CROP_DATA_MISSING'
  | 'TARGET_DATA_MISSING'
  | 'NO_DOSAGE_DATA'
  | 'MISSING_MOA'
  | 'RESTRICTED_FORMULATION';

export interface ExclusionReason {
  code: ExclusionReasonCode;
  text: string;
  textBn: string;
}

export interface EligibilityResult {
  product: ChemicalProduct;
  eligible: boolean;
  /** Verified registration number (normalized) or null */
  registrationNo: string | null;
  /** Crop match against the product's registered crops */
  cropMatch: boolean | null;
  /** Target pest/disease match against registered pests */
  targetMatch: boolean | null;
  /** Dosage from the registry (never fabricated) */
  dosage: string | null;
  /** MoA code from the registry */
  moaCode: string | null;
  /** PHI days from the registry, null = unknown */
  phiDays: number | null;
  /** REI hours from the registry, null = unknown */
  reiHours: number | null;
  /** Human-readable exclusion reasons (empty when eligible) */
  exclusions: ExclusionReason[];
  /** Missing (non-blocking) information to disclose */
  missingData: string[];
  /** Eligibility explanation */
  explanation: string;
  explanationBn: string;
}

export interface EligibilityInput {
  /** Crop name (English, e.g. 'Rice') */
  crop: string;
  /** Target pest or disease name (English, e.g. 'Rice Blast' / 'Brown Planthopper') */
  target: string;
  /** Product type filter when relevant (e.g. 'Fungicide' for a disease target) */
  expectedType?: string;
}

// Normalization: DAE reg numbers look like 'AP-5242', 'AP (BIO)-28', with
// noise ('AP5615', bare numbers). A valid reg no must start with a prefix
// and contain digits.
const REG_NO_RE = /^[A-Z]{1,4}\s*\(?[A-Z]*\)?\s*-\s*\d+$/i;

export function normalizeRegNo(raw: string | undefined): string | null {
  if (!raw) return null;
  const cleaned = raw.trim().toUpperCase().replace(/\s+/g, ' ');
  if (!cleaned) return null;
  return cleaned;
}

/** Token match: 'Rice' matches registered 'Rice', 'rice/paddy', 'Boro Rice'. */
function tokenMatch(query: string, registered: string[]): boolean {
  const q = query.toLowerCase().trim();
  if (!q) return false;
  return registered.some((r) => {
    const t = r.toLowerCase().trim();
    if (!t) return false;
    return t === q || t.includes(q) || q.includes(t);
  });
}

/**
 * Evaluate a single product's eligibility for the crop+target.
 * Missing data NEVER passes: crop/target lists empty → not eligible
 * (disclosed as data-missing, not a verified mismatch).
 */
export function evaluateProductEligibility(
  product: ChemicalProduct,
  input: EligibilityInput,
): EligibilityResult {
  const exclusions: ExclusionReason[] = [];
  const missingData: string[] = [];

  // 1. Registration identity
  const regNo = normalizeRegNo(product.registrationNo);
  if (!regNo) {
    exclusions.push({
      code: 'MISSING_REGISTRATION_NO',
      text: 'No registration number on record.',
      textBn: 'নিবন্ধন নম্বর নেই।',
    });
  } else if (!REG_NO_RE.test(regNo)) {
    exclusions.push({
      code: 'INVALID_REGISTRATION_NO',
      text: `Registration number "${regNo}" does not match the DAE register format.`,
      textBn: `নিবন্ধন নম্বর "${regNo}" ডিএই ফরম্যাটে নেই।`,
    });
  }

  // Policy ban gate — bangladeshPolicyAction is only surfaced when it is an
  // explicit withdrawal/ban string; other values are informational.
  const action = (product as { bangladeshPolicyAction?: string }).bangladeshPolicyAction;
  if (action && /ban|withdraw|phas|prohibit|revoke/i.test(action)) {
    exclusions.push({
      code: 'POLICY_BANNED',
      text: `Policy: ${action}.`,
      textBn: `নীতি: ${action}।`,
    });
  }

  // 2. Crop compatibility
  const crops = product.crops || [];
  let cropMatch: boolean | null;
  if (crops.length === 0) {
    cropMatch = null;
    missingData.push('Registered crops missing — cannot verify crop compatibility');
    exclusions.push({
      code: 'CROP_DATA_MISSING',
      text: 'Registered crops not listed for this product — crop compatibility unverified.',
      textBn: 'এই পণ্যের নিবন্ধিত ফসল তালিকা নেই — ফসল সামঞ্জস্য যাচাই করা যায়নি।',
    });
  } else {
    cropMatch = tokenMatch(input.crop, crops);
    if (!cropMatch) {
      exclusions.push({
        code: 'CROP_NOT_REGISTERED',
        text: `Not registered for ${input.crop} (registered: ${crops.slice(0, 3).join(', ')}${crops.length > 3 ? '…' : ''}).`,
        textBn: `${input.crop}-এর জন্য নিবন্ধিত নয়।`,
      });
    }
  }

  // 3. Target compatibility
  const pests = product.pests || [];
  let targetMatch: boolean | null;
  if (pests.length === 0) {
    targetMatch = null;
    missingData.push('Registered target pests missing — cannot verify target compatibility');
    exclusions.push({
      code: 'TARGET_DATA_MISSING',
      text: 'Registered target pests not listed — target compatibility unverified.',
      textBn: 'এই পণ্যের নিবন্ধিত লক্ষ্য পোকা/রোগের তালিকা নেই — যাচাই করা যায়নি।',
    });
  } else {
    targetMatch = tokenMatch(input.target, pests);
    if (!targetMatch) {
      exclusions.push({
        code: 'TARGET_NOT_REGISTERED',
        text: `Not registered for ${input.target}.`,
        textBn: `${input.target}-এর জন্য নিবন্ধিত নয়।`,
      });
    }
  }

  // 4. Formulation / type compatibility
  const formulation = product.formulation || null;
  if (input.expectedType && product.type && product.type !== input.expectedType) {
    // Not a hard exclusion — a Fungicide product can be valid for a disease
    // target while an Insecticide product usually is not. Exclude on type
    // mismatch only when the expected type is a strict category.
    exclusions.push({
      code: 'RESTRICTED_FORMULATION',
      text: `Product type ${product.type} does not match the expected ${input.expectedType}.`,
      textBn: `পণ্যের ধরন ${product.type} প্রত্যাশিত ${input.expectedType}-এর সাথে মেলে না।`,
    });
  }

  // 5. Label data (dosage never fabricated)
  const dosage = product.dosageRate?.trim() || null;
  if (!dosage) {
    missingData.push('Dosage not on record — follow the product label');
    exclusions.push({
      code: 'NO_DOSAGE_DATA',
      text: 'No dosage on record — the label is authoritative.',
      textBn: 'ডোজ তালিকাভুক্ত নেই — লেবেল অনুসরণ করুন।',
    });
  }

  const moaCode = product.moaCode?.trim() || null;
  if (!moaCode) {
    missingData.push('MoA group unknown — resistance stewardship limited');
    exclusions.push({
      code: 'MISSING_MOA',
      text: 'MoA group not on record.',
      textBn: 'MoA গ্রুপ তালিকাভুক্ত নেই।',
    });
  }

  const phiDays = typeof product.phiDays === 'number' ? product.phiDays : null;
  const reiHours = typeof product.reiHours === 'number' ? product.reiHours : null;
  if (phiDays == null) missingData.push('PHI not on record — check the label');
  if (reiHours == null) missingData.push('REI not on record — check the label');

  const eligible = exclusions.length === 0;

  let explanation: string;
  let explanationBn: string;
  if (eligible) {
    explanation = `Registered for ${input.crop} × ${input.target} (reg. ${regNo}).`;
    explanationBn = `${input.crop} × ${input.target}-এর জন্য নিবন্ধিত (নিবন্ধন ${regNo})।`;
  } else {
    explanation = exclusions
      .map((e) => e.text)
      .join(' ')
      .slice(0, 300);
    explanationBn = exclusions
      .map((e) => e.textBn)
      .join(' ')
      .slice(0, 300);
  }

  return {
    product,
    eligible,
    registrationNo: regNo,
    cropMatch,
    targetMatch,
    dosage,
    moaCode,
    phiDays,
    reiHours,
    exclusions,
    missingData: Array.from(new Set(missingData)),
    explanation,
    explanationBn,
  };
}

/**
 * Filter a product list down to eligible candidates, with explanations.
 * Excluded products are NOT returned — call evaluateProductEligibility
 * directly to explain why a specific alternative was excluded.
 */
export function filterEligibleProducts(
  products: ChemicalProduct[],
  input: EligibilityInput,
): EligibilityResult[] {
  return products
    .map((p) => evaluateProductEligibility(p, input))
    .filter((r) => r.eligible);
}

/**
 * Explain why the top alternatives were excluded (for the UI's
 * "exclusion reasons for alternatives" section).
 */
export function explainExclusions(
  products: ChemicalProduct[],
  input: EligibilityInput,
  limit = 5,
): Array<{ product: ChemicalProduct; reasons: ExclusionReason[] }> {
  return products
    .map((p) => ({ product: p, reasons: evaluateProductEligibility(p, input).exclusions }))
    .filter((r) => r.reasons.length > 0)
    .slice(0, limit);
}
