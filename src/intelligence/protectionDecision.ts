// ============================================================
// Protection Decision Engine (Task 3 + Task 8)
//
// A modular, engine-agnostic decision layer that consumes:
//   - KWI structured intelligence (risk categories, disease/pest
//     forecast, spray windows, freshness) — from pesticideIntelligence
//   - Field scouting observations (from the field ledger)
//   - Product eligibility results (from productEligibility)
//   - MoA stewardship / compliance results (from moaRotationEngine)
//
// Decision statuses (required by the directive):
//   MONITOR, SCOUT_REQUIRED, IPM_ACTION, PREVENTIVE_ACTION,
//   INTERVENTION_CONSIDERATION, CONDITIONS_UNSUITABLE, INSUFFICIENT_DATA
//
// Safety invariants (directive):
//   - High weather risk WITHOUT field evidence → SCOUT_REQUIRED, never an
//     automatic pesticide recommendation.
//   - Missing thresholds are explicitly disclosed.
//   - Weather risk alone never becomes a pesticide recommendation.
//   - IPM priority ladder: preventive → cultural → mechanical →
//     biological → monitoring/threshold → chemical consideration.
//
// Pure functions — no I/O, no React. Every field is explainable.
// ============================================================

import type { PesticideIntelligenceResult } from './pesticideIntelligence';
import type { EligibilityResult } from './productEligibility';
import type { ComplianceResult } from '../utils/moaRotationEngine';

// ─── Types ──────────────────────────────────────────────────

export type ProtectionDecisionStatus =
  | 'MONITOR'
  | 'SCOUT_REQUIRED'
  | 'IPM_ACTION'
  | 'PREVENTIVE_ACTION'
  | 'INTERVENTION_CONSIDERATION'
  | 'CONDITIONS_UNSUITABLE'
  | 'INSUFFICIENT_DATA';

export interface ScoutingObservation {
  /** ISO date of the observation */
  date: string;
  /** Target pest or disease being scouted (English name) */
  target: string;
  /** Observed incidence (0-100, % of plants affected) — null if not counted */
  incidencePct: number | null;
  /** Observed severity (0-100) — null if not scored */
  severityPct: number | null;
  /** Symptoms seen (free text) */
  symptoms: string;
  /** Is this a diagnosis confirmed by an officer/expert? */
  confirmedDiagnosis: boolean;
  notes?: string;
}

export interface DecisionInput {
  crop: string;
  growthStage?: string;
  /** KWI intelligence result — null when weather/KWI unavailable */
  intelligence: PesticideIntelligenceResult | null;
  /** Latest scouting observation for the target — null when not yet scouted */
  scouting: ScoutingObservation | null;
  /** Target pest/disease name (English) — the object of the decision */
  target?: string;
  /** Eligibility of candidate products (from productEligibility) */
  eligibility: EligibilityResult[];
  /** MoA compliance result for the proposed product — null if none proposed */
  compliance: ComplianceResult | null;
}

export interface DecisionReason {
  code: string;
  text: string;
  textBn: string;
  /** 'blocker' | 'caution' | 'info' */
  kind: 'blocker' | 'caution' | 'info';
}

export interface DecisionAction {
  /** IPM ladder tier: 1 preventive … 6 chemical */
  ipmTier: 1 | 2 | 3 | 4 | 5 | 6;
  action: string;
  actionBn: string;
  /** Is this a chemical action? (tier 6) */
  chemical: boolean;
}

export interface ProtectionDecision {
  status: ProtectionDecisionStatus;
  /** Human explanation (English) */
  explanation: string;
  explanationBn: string;
  reasons: DecisionReason[];
  /** Supporting evidence lines (weather values, observation values…) */
  evidence: string[];
  /** Missing information that limited this decision */
  missingInformation: string[];
  /** Immediate actions in IPM priority order */
  actions: DecisionAction[];
  /** Earliest reassessment date (ISO) or null */
  reassessAfter: string | null;
  /** Follow-up guidance */
  followUp: string;
  followUpBn: string;
  /** IPM ladder position of the recommendation (1-6; null = observe only) */
  ipmTier: 1 | 2 | 3 | 4 | 5 | 6 | null;
  /** Audit fields */
  decidedAt: string;
  engineVersion: string;
}

// ─── Decision logic ─────────────────────────────────────────

/** Wind speed above which spraying is unsafe (drift) — km/h. BADC/DAE guidance. */
const UNSAFE_WIND_KMH = 15;
/** Rain probability above which spraying is restricted (%) */
const RAIN_RISK_PCT = 50;
/** Disease pressure ≥ this → elevated */
const ELEVATED_DISEASE_PRESSURE = 60;
/** KWI category risk score ≥ this → high category risk */
const HIGH_CATEGORY_RISK = 70;

function bn(v: number): string {
  // Convert to Bengali numerals for the bn strings.
  const digits = '০১২৩৪৫৬৭৮৯';
  return String(v).replace(/[0-9]/g, (d) => digits[Number(d)]);
}

/**
 * Run the 12-step protection decision sequence.
 *
 * Steps (directive Task 3):
 *  1 assess crop/stage · 2 weather+KWI risk · 3 data completeness
 *  4 scouting required? · 5 field observations/diagnosis · 6 thresholds
 *  7 IPM priority · 8 pesticide eligibility (only if justified)
 *  9 resistance stewardship · 10 weather/safety constraints
 *  11 explainable decision · 12 reassessment guidance
 */
export function runProtectionDecision(input: DecisionInput): ProtectionDecision {
  const now = new Date().toISOString();
  const reasons: DecisionReason[] = [];
  const evidence: string[] = [];
  const missing: string[] = [];
  const actions: DecisionAction[] = [];

  const intel = input.intelligence;
  const scout = input.scouting;
  const crop = input.crop || '—';

  // ── Step 1: crop & stage ─────────────────────────────────
  if (input.growthStage) {
    evidence.push(`Crop: ${crop}, stage: ${input.growthStage}`);
  } else {
    evidence.push(`Crop: ${crop}`);
    missing.push('Growth stage not provided — stage-specific thresholds unavailable');
  }

  // ── Step 2 & 15-style guards: KWI availability & freshness ──
  let weatherRisk = 0;
  let categoryHigh = false;
  let sprayWindowOk = false;
  if (!intel) {
    missing.push('Weather intelligence unavailable — decision based on field records only');
    reasons.push({
      code: 'KWI_UNAVAILABLE',
      text: 'Weather intelligence is unavailable.',
      textBn: 'আবহাওয়া ইন্টেলিজেন্স পাওয়া যাচ্ছে না।',
      kind: 'caution',
    });
  } else {
    const w = intel.weather;
    evidence.push(
      `Weather: ${Math.round(w.temperature)}°C, RH ${Math.round(w.humidity)}%, wind ${Math.round(w.windSpeed)} km/h, rain ${Math.round(w.rainProbability)}%`,
    );
    if (intel.dataFreshness?.stale) {
      missing.push(`Weather data is stale (${intel.dataFreshness.ageMinutes} min old)`);
      reasons.push({
        code: 'WEATHER_STALE',
        text: `Weather data is ${intel.dataFreshness.ageMinutes} minutes old — treat spray-window advice with caution.`,
        textBn: `আবহাওয়ার তথ্য ${bn(intel.dataFreshness.ageMinutes)} মিনিট পুরনো — স্প্রে পরামর্শ সাবধানে নিন।`,
        kind: 'caution',
      });
    }
    weatherRisk = intel.overallRiskScore ?? 0;
    if (intel.riskCategories) {
      const disease = intel.riskCategories.find((r) => r.category === 'disease');
      if (disease) evidence.push(`KWI disease-risk category: ${disease.score} (${disease.level})`);
      const spray = intel.riskCategories.find((r) => r.category === 'spray_window');
      if (spray) evidence.push(`KWI spray-window category: ${spray.score} (${spray.level})`);
      categoryHigh = intel.riskCategories.some((r) => r.score >= HIGH_CATEGORY_RISK);
    }
    if (intel.diseaseForecast && intel.diseaseForecast.diseases.length > 0) {
      const top = intel.diseaseForecast.diseases[0];
      evidence.push(`Top disease risk: ${top.name} ${top.risk}/100 (${top.level})`);
    }
    if (intel.pestForecast && intel.pestForecast.pests.length > 0) {
      const top = intel.pestForecast.pests[0];
      evidence.push(`Top pest risk: ${top.name} ${top.risk}/100 (${top.level})`);
    }
    // Spray window suitability (next 48h)
    sprayWindowOk = intel.sprayWindows.some((s) => s.suitable);
    const suitableCount = intel.sprayWindows.filter((s) => s.suitable).length;
    evidence.push(`Suitable spray windows in next 48h: ${suitableCount}`);
  }

  // ── Step 3: data completeness ────────────────────────────
  if (!scout) {
    missing.push('No scouting observation recorded for this field');
  }

  // ── Steps 4-6: scouting & thresholds ─────────────────────
  let fieldEvidence = false;
  let confirmedTarget = false;
  let severeField = false;
  if (scout) {
    fieldEvidence = true;
    evidence.push(
      `Scouting ${scout.date}: target ${scout.target}, incidence ${scout.incidencePct != null ? scout.incidencePct + '%' : 'not counted'}, severity ${scout.severityPct != null ? scout.severityPct + '%' : 'not scored'}`,
    );
    if (scout.confirmedDiagnosis) {
      confirmedTarget = true;
      evidence.push('Diagnosis confirmed by officer/expert');
    } else {
      missing.push('Diagnosis not confirmed — identification is provisional');
    }
    if (scout.severityPct != null && scout.severityPct >= 50) severeField = true;
    if (scout.incidencePct != null && scout.incidencePct >= 30) severeField = true;
    // Step 6: validated thresholds — the KWI engines publish per-disease
    // economicThreshold strings, but no validated numeric threshold table
    // exists for Bangladesh crops in this codebase. We must disclose this.
    missing.push(
      'No validated numeric economic threshold available for this crop/target — threshold-based action cannot be verified',
    );
  }

  // ── Decision tree ────────────────────────────────────────
  let status: ProtectionDecisionStatus;
  let explanation = '';
  let explanationBn = '';
  let ipmTier: ProtectionDecision['ipmTier'] = null;

  const highWeatherRisk = weatherRisk >= 60 || categoryHigh;

  if (!intel && !scout) {
    // Nothing to decide on.
    status = 'INSUFFICIENT_DATA';
    explanation =
      'Neither weather intelligence nor a field scouting record is available. Record a scouting observation (and allow weather access) before a protection decision can be made.';
    explanationBn =
      'আবহাওয়ার তথ্য বা ক্ষেত পর্যবেক্ষণ — কোনোটিই নেই। সুরক্ষা সিদ্ধান্ত নেওয়ার আগে ক্ষেত পর্যবেক্ষণ রেকর্ড করুন (এবং আবহাওয়া অ্যাক্সেস দিন)।';
    reasons.push({
      code: 'NO_INPUTS',
      text: 'No weather and no scouting data.',
      textBn: 'আবহাওয়া ও ক্ষেত পর্যবেক্ষণ দুটোই নেই।',
      kind: 'blocker',
    });
    actions.push(scoutAction());
  } else if (!scout && highWeatherRisk) {
    // SAFETY INVARIANT: high weather risk + no field evidence → SCOUT.
    status = 'SCOUT_REQUIRED';
    explanation =
      `Weather conditions favor ${intel?.diseaseForecast?.diseases?.[0]?.name || intel?.pestForecast?.pests?.[0]?.name || 'pest/disease development'} (risk ${weatherRisk}/100), but there is no field scouting record. Scouting first — weather risk alone never justifies a pesticide application.`;
    explanationBn =
      `আবহাওয়া ${intel?.diseaseForecast?.diseases?.[0]?.nameBn || intel?.pestForecast?.pests?.[0]?.nameBn || 'রোগ/পোকার বিস্তারে'} অনুকূল (ঝুঁকি ${bn(weatherRisk)}/১০০), কিন্তু ক্ষেত পর্যবেক্ষণ নেই। আগে ক্ষেত পর্যবেক্ষণ করুন — শুধু আবহাওয়ার ঝুঁকি কখনোই কীটনাশক প্রয়োগের যথেষ্ট নয়।`;
    reasons.push({
      code: 'NO_FIELD_EVIDENCE',
      text: 'High weather risk but no scouting observation — field verification required before any intervention.',
      textBn: 'আবহাওয়ার ঝুঁকি বেশি কিন্তু ক্ষেত পর্যবেক্ষণ নেই — যেকোনো হস্তক্ষেপের আগে ক্ষেত যাচাই প্রয়োজন।',
      kind: 'blocker',
    });
    actions.push(scoutAction());
    // Preventive actions from the KWI forecast are still safe to show.
    pushPreventive(actions, intel);
    ipmTier = 1;
  } else if (!scout) {
    // Weather present, low risk, no scouting: keep watching.
    status = 'MONITOR';
    explanation =
      `Weather risk is low (${weatherRisk}/100) and no symptoms have been scouted. Continue monitoring; scout if conditions change.`;
    explanationBn =
      `আবহাওয়ার ঝুঁকি কম (${bn(weatherRisk)}/১০০) এবং কোনো লক্ষণ পর্যবেক্ষণ করা যায়নি। নজরদারি চালিয়ে যান; অবস্থা বদলালে ক্ষেত পর্যবেক্ষণ করুন।`;
    reasons.push({
      code: 'LOW_RISK_NO_SYMPTOMS',
      text: 'Low weather risk and no field symptoms recorded.',
      textBn: 'আবহাওয়ার ঝুঁকি কম এবং ক্ষেতে কোনো লক্ষণ নেই।',
      kind: 'info',
    });
    actions.push(monitorAction());
    pushPreventive(actions, intel);
    ipmTier = 1;
  } else {
    // We have a scouting record. Assess observations & diagnosis.
    const noSymptomsObserved =
      (scout.incidencePct === 0 || scout.severityPct === 0) &&
      !scout.symptoms?.trim();
    if (noSymptomsObserved && (highWeatherRisk || weatherRisk >= 40)) {
      // Scouted, nothing found, but weather is becoming favorable →
      // prevention window (IPM tier 1), not curative action.
      status = 'PREVENTIVE_ACTION';
      explanation =
        `Field scouted on ${scout.date}: no ${scout.target} symptoms found, but weather favorability is rising (risk ${weatherRisk}/100). This is the prevention window — apply preventive (non-chemical) measures now to avoid an outbreak.`;
      explanationBn =
        `${scout.date} তারিখে ক্ষেত পর্যবেক্ষণ: ${scout.target}-এর কোনো লক্ষণ পাওয়া যায়নি, কিন্তু আবহাওয়ার অনুকূলতা বাড়ছে (ঝুঁকি ${bn(weatherRisk)}/১০০)। এটি প্রতিরোধের সময় — প্রাদুর্ভাব এড়াতে এখনই প্রতিরোধমূলক (অ-রাসায়নিক) ব্যবস্থা নিন।`;
      reasons.push({
        code: 'PREVENTION_WINDOW',
        text: 'No symptoms yet with rising weather favorability — prevention window.',
        textBn: 'এখনো লক্ষণ নেই কিন্তু আবহাওয়ার ঝুঁকি বাড়ছে — প্রতিরোধের সময়।',
        kind: 'info',
      });
      actions.push(monitorAction());
      pushPreventive(actions, intel);
      ipmTier = 1;
    } else if (!confirmedTarget && !severeField) {
      // Unconfirmed, not severe: IPM first.
      status = 'IPM_ACTION';
      explanation =
        `Field observation recorded for ${scout.target}, but the diagnosis is not confirmed and severity/incidence are below acute levels. Apply IPM (non-chemical) measures first; pesticide consideration requires a confirmed diagnosis or threshold-level incidence.`;
      explanationBn =
        `${scout.target}-এর জন্য ক্ষেত পর্যবেক্ষণ রেকর্ড হয়েছে, কিন্তু রোগ নিশ্চিত নয় এবং তীব্রতা তীব্র পর্যায়ের নিচে। আগে IPM (অ-রাসায়নিক) ব্যবস্থা নিন; কীটনাশক বিবেচনার জন্য নিশ্চিত রোগ নির্ণয় বা সীমা-স্তরের আক্রমণ প্রয়োজন।`;
      reasons.push({
        code: 'DIAGNOSIS_UNCONFIRMED',
        text: 'Diagnosis not confirmed and severity below acute — IPM measures precede chemical consideration.',
        textBn: 'রোগ নিশ্চিত নয় এবং তীব্রতা কম — রাসায়নিক ব্যবস্থার আগে IPM।',
        kind: 'caution',
      });
      actions.push(...ipmLadderActions(scout, intel));
      ipmTier = 2;
    } else if (!sprayWindowOk && intel) {
      // Justified intervention but weather unsuitable.
      status = 'CONDITIONS_UNSUITABLE';
      explanation =
        `Intervention may be justified (${confirmedTarget ? 'confirmed diagnosis' : 'high severity'}, but no suitable spray window in the next 48h (wind/rain restrictions). Wait for a suitable window; keep monitoring.`;
      explanationBn =
        `হস্তক্ষেপ প্রয়োজন হতে পারে (${confirmedTarget ? 'রোগ নিশ্চিত' : 'তীব্রতা বেশি'}), কিন্তু আগামী ৪৮ ঘণ্টায় উপযুক্ত স্প্রে সময় নেই (বাতাস/বৃষ্টি বিধিনিষেধ)। উপযুক্ত সময়ের জন্য অপেক্ষা করুন; নজরদারি চালিয়ে যান।`;
      reasons.push({
        code: 'NO_SPRAY_WINDOW',
        text: 'No suitable spray window in the next 48 hours.',
        textBn: 'আগামী ৪৮ ঘণ্টায় উপযুক্ত স্প্রে সময় নেই।',
        kind: 'blocker',
      });
      actions.push(monitorAction());
      actions.push(...ipmLadderActions(scout, intel));
      ipmTier = 2;
    } else {
      // Justified: confirmed or severe, window OK (or weather unknown).
      status = 'INTERVENTION_CONSIDERATION';
      explanation =
        `${confirmedTarget ? 'Diagnosis confirmed' : 'High severity/incidence recorded'}${intel ? (sprayWindowOk ? ' and a suitable spray window exists' : '') : ' (weather unavailable — verify conditions at the field)'}. Chemical intervention may be considered, but IPM alternatives remain first choice. Check product eligibility and MoA rotation below before any application.`;
      explanationBn =
        `${confirmedTarget ? 'রোগ নিশ্চিত' : 'উচ্চ তীব্রতা/আক্রমণ রেকর্ড হয়েছে'}${intel ? (sprayWindowOk ? ' এবং উপযুক্ত স্প্রে সময় আছে' : '') : ' (আবহাওয়ার তথ্য নেই — ক্ষেতে অবস্থা যাচাই করুন)'}। রাসায়নিক হস্তক্ষেপ বিবেচনা করা যেতে পারে, তবে IPM বিকল্প এখনও প্রথম পছন্দ। প্রয়োগের আগে নিচের পণ্যের যোগ্যতা ও MoA রোটেশন দেখুন।`;
      reasons.push({
        code: 'INTERVENTION_JUSTIFIED',
        text: 'Field evidence justifies intervention consideration.',
        textBn: 'ক্ষেতের প্রমাণ হস্তক্ষেপ বিবেচনার যোগ্য।',
        kind: 'info',
      });
      // Steps 8-9: eligibility + stewardship notes flow in as reasons.
      const eligible = input.eligibility.filter((e) => e.eligible);
      if (eligible.length === 0) {
        reasons.push({
          code: 'NO_ELIGIBLE_PRODUCT',
          text: 'No eligible registered product for this crop/target — chemical option unavailable.',
          textBn: 'এই ফসল/লক্ষ্যের জন্য কোনো যোগ্য নিবন্ধিত পণ্য নেই — রাসায়নিক বিকল্প অনুপলব্ধ।',
          kind: 'blocker',
        });
      }
      if (input.compliance && input.compliance.verdict === 'BLOCK') {
        reasons.push({
          code: 'MOA_BLOCKED',
          text: `MoA stewardship blocks the proposed product: ${input.compliance.findings.filter((f) => f.severity === 'BLOCK').map((f) => f.messageEn).join('; ')}`,
          textBn: `MoA রোটেশন নিয়ম প্রস্তাবিত পণ্য আটকে দিয়েছে: ${input.compliance.findings.filter((f) => f.severity === 'BLOCK').map((f) => f.messageBn || f.messageEn).join('; ')}`,
          kind: 'blocker',
        });
      } else if (input.compliance && input.compliance.verdict === 'FLAG') {
        reasons.push({
          code: 'MOA_FLAGGED',
          text: 'MoA stewardship flags the proposed product — review before applying.',
          textBn: 'MoA রোটেশন নিয়ম প্রস্তাবিত পণ্যে সতর্কতা দিয়েছে — প্রয়োগের আগে পর্যালোচনা করুন।',
          kind: 'caution',
        });
      }
      actions.push(...ipmLadderActions(scout, intel));
      if (eligible.length > 0 && (!input.compliance || input.compliance.verdict !== 'BLOCK')) {
        actions.push({
          ipmTier: 6,
          action: `Consider a registered product ONLY after checking eligibility & MoA rotation (e.g. ${eligible[0].product.tradeName})`,
          actionBn: `শুধুমাত্র যোগ্যতা ও MoA রোটেশন যাচাই করে নিবন্ধিত পণ্য বিবেচনা করুন (যেমন ${eligible[0].product.tradeName})`,
          chemical: true,
        });
        ipmTier = 6;
      }
    }
  }

  // ── Step 10: weather & safety constraints (apply to any status) ──
  if (intel) {
    const w = intel.weather;
    if (w.windSpeed >= UNSAFE_WIND_KMH) {
      reasons.push({
        code: 'HIGH_WIND',
        text: `Wind ${Math.round(w.windSpeed)} km/h — spraying unsafe (drift risk).`,
        textBn: `বাতাসের গতি ${bn(Math.round(w.windSpeed))} কিমি/ঘণ্টা — স্প্রে অনিরাপদ (প্রবাহ/ড্রিফট ঝুঁকি)।`,
        kind: 'blocker',
      });
    }
    if (w.rainProbability >= RAIN_RISK_PCT) {
      reasons.push({
        code: 'RAIN_RISK',
        text: `Rain probability ${Math.round(w.rainProbability)}% — application restricted.`,
        textBn: `বৃষ্টির সম্ভাবনা ${bn(Math.round(w.rainProbability))}% — প্রয়োগ সীমিত।`,
        kind: 'blocker',
      });
    }
  }

  // ── Step 12: reassessment guidance ───────────────────────
  let reassessAfter: string | null = null;
  let followUp = '';
  let followUpBn = '';
  switch (status) {
    case 'SCOUT_REQUIRED':
      reassessAfter = addDays(now, 1);
      followUp = 'Scout within 24 hours and record the observation here.';
      followUpBn = '২৪ ঘণ্টার মধ্যে ক্ষেত পর্যবেক্ষণ করে এখানে রেকর্ড করুন।';
      break;
    case 'MONITOR':
      reassessAfter = addDays(now, 3);
      followUp = 'Re-check weather and field in 3 days, or after any weather change.';
      followUpBn = '৩ দিন পর বা আবহাওয়া বদলালে আবার দেখুন।';
      break;
    case 'IPM_ACTION':
      reassessAfter = addDays(now, 3);
      followUp = 'Apply IPM measures, then re-scout in 3 days to check the response.';
      followUpBn = 'IPM ব্যবস্থা নিন, তারপর ৩ দিন পর প্রতিক্রিয়া দেখতে আবার ক্ষেত পর্যবেক্ষণ করুন।';
      break;
    case 'INTERVENTION_CONSIDERATION':
      reassessAfter = addDays(now, 2);
      followUp =
        'If applying, record the application — the follow-up observation (5-7 days) will verify effectiveness and feed resistance monitoring.';
      followUpBn =
        'প্রয়োগ করলে তা রেকর্ড করুন — ফলো-আপ পর্যবেক্ষণ (৫-৭ দিন) কার্যকারিতা যাচাই করবে এবং রেজিস্ট্যান্স পর্যবেক্ষণে সাহায্য করবে।';
      break;
    case 'CONDITIONS_UNSUITABLE':
      reassessAfter = addDays(now, 1);
      followUp = 'Re-check the spray window tomorrow; apply only in a suitable window.';
      followUpBn = 'কাল আবার স্প্রে সময় দেখুন; শুধু উপযুক্ত সময়ে প্রয়োগ করুন।';
      break;
    case 'INSUFFICIENT_DATA':
      reassessAfter = addDays(now, 1);
      followUp = 'Add a scouting observation (and location for weather) to enable a decision.';
      followUpBn = 'সিদ্ধান্তের জন্য ক্ষেত পর্যবেক্ষণ (ও আবহাওয়ার জন্য অবস্থান) যোগ করুন।';
      break;
    case 'PREVENTIVE_ACTION':
      reassessAfter = addDays(now, 5);
      followUp = 'Continue preventive measures and monitor.';
      followUpBn = 'প্রতিরোধমূলক ব্যবস্থা চালিয়ে যান এবং নজর রাখুন।';
      break;
  }

  return {
    status,
    explanation,
    explanationBn,
    reasons,
    evidence,
    missingInformation: Array.from(new Set(missing)),
    actions,
    reassessAfter,
    followUp,
    followUpBn,
    ipmTier,
    decidedAt: now,
    engineVersion: 'protection-decision-1',
  };
}

// ─── Helpers: IPM ladder actions (Task 8) ───────────────────

function scoutAction(): DecisionAction {
  return {
    ipmTier: 5,
    action: 'Scout the field now: count incidence, score severity, photograph symptoms',
    actionBn: 'এখনই ক্ষেত পর্যবেক্ষণ করুন: আক্রমণের হার গুনুন, তীব্রতা নির্ণয় করুন, ছবি তুলুন',
    chemical: false,
  };
}

function monitorAction(): DecisionAction {
  return {
    ipmTier: 5,
    action: 'Continue monitoring weather + field; re-check in 3 days',
    actionBn: 'আবহাওয়া ও ক্ষেত পর্যবেক্ষণ চালিয়ে যান; ৩ দিন পর আবার দেখুন',
    chemical: false,
  };
}

/** Push KWI-engine preventive actions (tier 1) when a forecast exists. */
function pushPreventive(actions: DecisionAction[], intel: PesticideIntelligenceResult | null): void {
  if (!intel) return;
  const diseaseTop = intel.diseaseForecast?.diseases?.[0];
  const pestTop = intel.pestForecast?.pests?.[0];
  const src = diseaseTop ?? pestTop;
  if (src && src.preventiveActions?.length) {
    const srcBn = diseaseTop
      ? (intel.diseaseForecast?.diseases?.[0] as unknown as { preventiveActionsBn?: string[] })
      : (intel.pestForecast?.pests?.[0] as unknown as { preventiveActionsBn?: string[] });
    actions.push({
      ipmTier: 1,
      action: src.preventiveActions[0],
      actionBn: srcBn?.preventiveActionsBn?.[0] || src.preventiveActions[0],
      chemical: false,
    });
  }
}

/**
 * IPM priority ladder (Task 8):
 * 1 preventive · 2 cultural · 3 mechanical/physical · 4 biological ·
 * 5 monitoring/threshold · 6 chemical consideration.
 * Only tier actions with reliable, context-specific content are emitted;
 * no generic AI advice is presented as verified guidance.
 */
function ipmLadderActions(scout: ScoutingObservation, intel: PesticideIntelligenceResult | null): DecisionAction[] {
  const acts: DecisionAction[] = [];
  // Tier 1-2: preventive + cultural (from the KWI engines' own actions —
  // these are the disease/pest-specific agronomic actions, engine-sourced).
  const diseaseTop = intel?.diseaseForecast?.diseases?.[0];
  const pestTop = intel?.pestForecast?.pests?.[0];
  const src = diseaseTop ?? pestTop;
  if (src?.preventiveActions?.length) {
    acts.push({
      ipmTier: 1,
      action: `Preventive: ${src.preventiveActions[0]}`,
      actionBn: `প্রতিরোধ: ${src.preventiveActions[0]}`,
      chemical: false,
    });
  }
  if (src?.curativeActions?.length) {
    // Curative non-chemical actions from the engine (drain field, remove
    // infected plants…) map to cultural/mechanical tiers.
    acts.push({
      ipmTier: 2,
      action: `Cultural/mechanical: ${src.curativeActions[0]}`,
      actionBn: `কালচারাল/যান্ত্রিক: ${src.curativeActions[0]}`,
      chemical: false,
    });
  }
  // Tier 4: biological — only suggested where the engine itself lists
  // biological control among preventive actions (e.g. conserve natural
  // predators for BPH). Otherwise omitted — never generic advice.
  if (pestTop?.preventiveActions?.some((a) => /predator|parasitoid|natural enem|biocontrol|Trichogramma/i.test(a))) {
    acts.push({
      ipmTier: 4,
      action: 'Biological: conserve natural enemies (avoid broad-spectrum insecticides)',
      actionBn: 'জৈবিক: প্রাকৃতিক শত্রু সংরক্ষণ করুন (বিস্তৃত-বর্ণালী কীটনাশক এড়িয়ে চলুন)',
      chemical: false,
    });
  }
  // Tier 5: monitoring with threshold discipline.
  acts.push({
    ipmTier: 5,
    action: `Monitor: re-scout in 3 days; count incidence/severity for ${scout.target}`,
    actionBn: `পর্যবেক্ষণ: ৩ দিন পর আবার দেখুন; ${scout.target}-এর আক্রমণ/তীব্রতা গুনুন`,
    chemical: false,
  });
  return acts;
}

function addDays(iso: string, days: number): string {
  const d = new Date(iso);
  d.setDate(d.getDate() + days);
  return d.toISOString();
}
