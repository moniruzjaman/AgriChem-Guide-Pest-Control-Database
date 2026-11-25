/**
 * ProtectionView — the Protection Intelligence tab (Task 6).
 *
 * One connected workflow (directive):
 *   A. Risk Overview        — KWI disease/pest cards, weather constraints,
 *                             spray windows, crop stage, confidence, freshness
 *   B. Field Scouting       — observation form (target, symptoms, incidence,
 *                             severity, date, notes, photo)
 *   C. Protection Decision  — status, explanation, evidence, missing data,
 *                             actions (IPM-ordered), reassessment date
 *   D. Product Eligibility  — eligible products only, with reg no, AI,
 *                             formulation, MoA, PHI/REI, dosage, exclusion
 *                             reasons for near-miss alternatives
 *   E. Application Record   — record the actual application (after the
 *                             decision), linking field→decision→product
 *   F. Outcome & Follow-up  — post-treatment observation, effectiveness,
 *                             recurrence, resistance suspicion (trigger
 *                             investigation, never a diagnosis)
 *
 * UI follows the existing pn-tokens design language (like DatabaseView /
 * SafetyView) and the app's Bangla-first i18n. No field profile is required
 * to use basic functionality — crop-only works.
 */

import { useState, useEffect, useMemo, useCallback } from 'react';
import {
  runPesticideIntelligence,
  type PesticideIntelligenceResult,
  type IntelligenceLocation,
} from '../intelligence/pesticideIntelligence';
import {
  runProtectionDecision,
  type ProtectionDecision,
  type ScoutingObservation,
} from '../intelligence/protectionDecision';
import {
  filterEligibleProducts,
  evaluateProductEligibility,
  explainExclusions,
} from '../intelligence/productEligibility';
import { runComplianceCheck, type ComplianceResult } from '../utils/moaRotationEngine';
import { useFieldRecords, type FieldProfile } from '../hooks/useFieldRecords';
import { useSprayHistory } from '../hooks/useSprayHistory';
import { loadDatabase } from '../data/loadDatabase';
import {
  loadRegistryImportMeta,
  type RegistryImportMeta,
} from '../data/registryMeta';
import type { ChemicalProduct } from '../types';
import { useLanguage } from '../context/LanguageContext';
import './ProtectionView.css';

const STATUS_STYLES: Record<string, { bg: string; fg: string; label: string; labelBn: string }> = {
  MONITOR: { bg: '#e0f2fe', fg: '#075985', label: 'Monitor', labelBn: 'নজরদারি' },
  SCOUT_REQUIRED: { bg: '#fef3c7', fg: '#92400e', label: 'Scout required', labelBn: 'ক্ষেত পর্যবেক্ষণ দরকার' },
  IPM_ACTION: { bg: '#dcfce7', fg: '#166534', label: 'IPM action', labelBn: 'IPM ব্যবস্থা' },
  PREVENTIVE_ACTION: { bg: '#d1fae5', fg: '#065f46', label: 'Preventive action', labelBn: 'প্রতিরোধমূলক ব্যবস্থা' },
  INTERVENTION_CONSIDERATION: { bg: '#ffedd5', fg: '#9a3412', label: 'Intervention consideration', labelBn: 'হস্তক্ষেপ বিবেচনা' },
  CONDITIONS_UNSUITABLE: { bg: '#fee2e2', fg: '#991b1b', label: 'Conditions unsuitable', labelBn: 'পরিস্থিতি অনুপযুক্ত' },
  INSUFFICIENT_DATA: { bg: '#f1f5f9', fg: '#475569', label: 'Insufficient data', labelBn: 'তথ্য অপর্যাপ্ত' },
};

const CROPS = ['Rice', 'Wheat', 'Jute', 'Potato', 'Tomato', 'Brinjal', 'Chili', 'Onion', 'Maize', 'Cotton', 'Mango', 'Banana'];

export function ProtectionView() {
  const { language } = useLanguage();
  const bn = language === 'bn';
  const t = (en: string, bnn: string) => (bn ? bnn : en);

  // ── Data stores ─────────────────────────────────────────
  const ledger = useFieldRecords();
  const { entries: sprayHistory } = useSprayHistory();

  // ── Products + registry meta ────────────────────────────
  const [products, setProducts] = useState<ChemicalProduct[]>([]);
  const [meta, setMeta] = useState<RegistryImportMeta | null>(null);
  useEffect(() => {
    let alive = true;
    loadDatabase().then((db) => {
      if (alive) setProducts(db.products);
    });
    loadRegistryImportMeta().then((m) => {
      if (alive) setMeta(m);
    });
    return () => {
      alive = false;
    };
  }, []);

  // ── Workflow context (Section A/C input) ────────────────
  const [crop, setCrop] = useState('Rice');
  const [fieldId, setFieldId] = useState<string | null>(null);
  const [target, setTarget] = useState('');
  const [growthStage, setGrowthStage] = useState('');
  const [sowingDate, setSowingDate] = useState('');
  const [useGps, setUseGps] = useState(false);

  const field = useMemo(() => ledger.data.fields.find((f) => f.id === fieldId) ?? null, [ledger.data.fields, fieldId]);

  // Selected field context drives crop when a field is chosen.
  useEffect(() => {
    if (field?.crop) setCrop(field.crop);
    if (field?.variety) setGrowthStage((s) => s);
    if (field?.plantingDate) setSowingDate(field.plantingDate);
  }, [field?.crop, field?.variety, field?.plantingDate]);

  // ── Intelligence (Section A) ────────────────────────────
  const [intel, setIntel] = useState<PesticideIntelligenceResult | null>(null);
  const [intelLoading, setIntelLoading] = useState(false);
  const [intelError, setIntelError] = useState<string | null>(null);
  const [coords, setCoords] = useState<{ lat: number; lon: number } | null>(null);

  const runIntel = useCallback(async () => {
    setIntelLoading(true);
    setIntelError(null);
    try {
      let location: IntelligenceLocation;
      if (useGps && navigator.geolocation && coords) {
        location = { latitude: coords.lat, longitude: coords.lon, name: 'field', country: 'Bangladesh' };
      } else if (useGps && navigator.geolocation) {
        // Ask for position once; fall back to Dhaka on denial (crop-only workflow).
        const pos = await new Promise<GeolocationPosition | null>((resolve) => {
          navigator.geolocation.getCurrentPosition(
            (p) => resolve(p),
            () => resolve(null),
            { timeout: 6000 },
          );
        });
        location = pos
          ? { latitude: pos.coords.latitude, longitude: pos.coords.longitude, name: 'field', country: 'Bangladesh' }
          : { latitude: 23.8103, longitude: 90.4125, name: 'Dhaka (default)', country: 'Bangladesh' };
      } else {
        location = { latitude: 23.8103, longitude: 90.4125, name: 'Dhaka (default)', country: 'Bangladesh' };
      }
      const lastMoa = [...sprayHistory]
        .reverse()
        .find((e) => e.crop === crop && e.moaCode)?.moaCode;
      const result = await runPesticideIntelligence({
        location,
        products,
        crop,
        pest: target || undefined,
        lastMoa,
        sowingDate: sowingDate || undefined,
        growthStage: growthStage || undefined,
      });
      setIntel(result);
    } catch (err) {
      setIntelError(err instanceof Error ? err.message : String(err));
    } finally {
      setIntelLoading(false);
    }
  }, [useGps, coords, products, crop, target, sprayHistory, sowingDate, growthStage]);

  useEffect(() => {
    if (products.length > 0) runIntel();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [products.length > 0, crop]);

  // ── Section B: scouting form ────────────────────────────
  const [scoutForm, setScoutForm] = useState({
    target: '',
    date: new Date().toISOString().slice(0, 10),
    incidencePct: '',
    severityPct: '',
    symptoms: '',
    notes: '',
    confirmedDiagnosis: false,
  });
  const [photoDataUrl, setPhotoDataUrl] = useState<string | undefined>(undefined);
  const [scoutSaved, setScoutSaved] = useState(false);

  const saveScouting = () => {
    if (!scoutForm.target.trim()) return;
    ledger.addScouting({
      fieldId,
      crop,
      target: scoutForm.target.trim(),
      date: scoutForm.date,
      incidencePct: scoutForm.incidencePct === '' ? null : Number(scoutForm.incidencePct),
      severityPct: scoutForm.severityPct === '' ? null : Number(scoutForm.severityPct),
      symptoms: scoutForm.symptoms,
      notes: scoutForm.notes || undefined,
      photoDataUrl,
      confirmedDiagnosis: scoutForm.confirmedDiagnosis,
    });
    setScoutSaved(true);
    setTimeout(() => setScoutSaved(false), 2500);
    if (!target) setTarget(scoutForm.target.trim());
  };

  const latestScout = useMemo(
    () => ledger.latestScoutingFor(crop, target || undefined),
    [ledger, crop, target],
  );

  // ── Sections C/D inputs: eligibility + compliance ───────
  const eligibility = useMemo(() => {
    if (!target.trim() || products.length === 0) return [];
    const expectedType = /blast|blight|rot|spot|rust|powdery|downy|mold|smut|scab/i.test(target)
      ? 'Fungicide'
      : /hopper|borer|worm|aphid|thrips|beetle|fly|bug|mite|weevil|cutworm|armyworm/i.test(target)
        ? 'Insecticide'
        : undefined;
    return filterEligibleProducts(products, { crop, target: target.trim(), expectedType });
  }, [products, crop, target]);

  const excludedAlternatives = useMemo(() => {
    if (!target.trim() || products.length === 0) return [];
    const expectedType = /blast|blight|rot|spot|rust|powdery|downy|mold|smut|scab/i.test(target)
      ? 'Fungicide'
      : undefined;
    return explainExclusions(
      products.filter((p) => (p.crops || []).some((c) => c.toLowerCase().includes(crop.toLowerCase()))).slice(0, 40),
      { crop, target: target.trim(), expectedType },
      4,
    );
  }, [products, crop, target]);

  // MoA compliance for the top eligible product (proposed treatment).
  const compliance: ComplianceResult | null = useMemo(() => {
    if (!target.trim() || eligibility.length === 0) return null;
    const proposed = eligibility[0];
    if (!proposed.moaCode) return null;
    const log = sprayHistory
      .filter((e) => e.crop === crop)
      .map((e) => ({
        id: e.id,
        date: e.date,
        productName: e.productName,
        commonName: e.commonName,
        moaCode: e.moaCode || '',
        moaGroup: e.moaGroup || '',
        type: e.type,
        crop: e.crop,
        pest: (e as unknown as { pest?: string }).pest || '',
      }));
    try {
      return runComplianceCheck({
        log,
        proposedDate: new Date().toISOString().slice(0, 10),
        proposedMoACode: proposed.moaCode,
        crop,
        pest: target.trim(),
        availableMoACodes: eligibility.map((e) => e.moaCode).filter(Boolean) as string[],
      });
    } catch {
      return null;
    }
  }, [eligibility, sprayHistory, crop, target]);

  // ── Section C: the decision ─────────────────────────────
  const decision: ProtectionDecision = useMemo(() => {
    const scouting: ScoutingObservation | null = latestScout
      ? {
          date: latestScout.date,
          target: latestScout.target,
          incidencePct: latestScout.incidencePct,
          severityPct: latestScout.severityPct,
          symptoms: latestScout.symptoms,
          confirmedDiagnosis: latestScout.confirmedDiagnosis,
        }
      : null;
    return runProtectionDecision({
      crop,
      growthStage: growthStage || undefined,
      intelligence: intel,
      scouting,
      target: target || undefined,
      eligibility,
      compliance,
    });
  }, [crop, growthStage, intel, latestScout, target, eligibility, compliance]);

  const saveDecision = () => {
    ledger.addDecision({
      fieldId,
      crop,
      target: target || undefined,
      status: decision.status,
      explanation: decision.explanation,
      explanationBn: decision.explanationBn,
      reasons: decision.reasons.map((r) => ({ code: r.code, kind: r.kind, text: r.text, textBn: r.textBn })),
      evidence: decision.evidence,
      missingInformation: decision.missingInformation,
      actions: decision.actions.map((a) => ({ ipmTier: a.ipmTier, action: a.action, actionBn: a.actionBn, chemical: a.chemical })),
      reassessAfter: decision.reassessAfter,
      engineVersion: decision.engineVersion,
      weatherProvider: intel?.dataFreshness.provider,
      weatherFetchedAt: intel?.dataFreshness.fetchedAt,
    });
  };

  // ── Section E: application record ───────────────────────
  const [appForm, setAppForm] = useState({
    productName: '',
    date: new Date().toISOString().slice(0, 10),
    actualDosage: '',
    areaValue: '',
    areaUnit: 'bigha',
    operator: '',
    followUpDate: '',
    notes: '',
  });
  const [appSaved, setAppSaved] = useState(false);

  const proposedProducts = eligibility.slice(0, 12);
  const recordApplication = () => {
    if (!appForm.productName || !target.trim()) return;
    const product = products.find((p) => p.tradeName === appForm.productName);
    const reg = product ? evaluateProductEligibility(product, { crop, target: target.trim() }) : null;
    ledger.addApplication({
      fieldId,
      crop,
      target: target.trim(),
      productName: appForm.productName,
      commonName: product?.commonName || '',
      registrationNo: reg?.registrationNo ?? product?.registrationNo ?? null,
      moaCode: product?.moaCode || null,
      actualDosage: appForm.actualDosage,
      treatedAreaValue: appForm.areaValue === '' ? null : Number(appForm.areaValue),
      treatedAreaUnit: appForm.areaUnit,
      date: appForm.date,
      weatherConditions: intel
        ? `${Math.round(intel.weather.temperature)}°C, RH ${Math.round(intel.weather.humidity)}%, wind ${Math.round(intel.weather.windSpeed)} km/h`
        : undefined,
      operator: appForm.operator || undefined,
      followUpDate: appForm.followUpDate || undefined,
      notes: appForm.notes || undefined,
    });
    setAppSaved(true);
    setTimeout(() => setAppSaved(false), 2500);
  };

  // ── Section F: outcome ──────────────────────────────────
  const [outcomeForm, setOutcomeForm] = useState({
    applicationId: '',
    date: new Date().toISOString().slice(0, 10),
    incidencePct: '',
    severityPct: '',
    effectiveness: 'unclear' as 'effective' | 'partial' | 'ineffective' | 'unclear',
    cropResponse: '',
    recurrence: '' as '' | 'yes' | 'no',
    suspectedResistance: false,
    nextAction: '',
  });

  const pendingOutcomes = ledger.applicationsMissingOutcome();
  const recordOutcome = () => {
    if (!outcomeForm.applicationId) return;
    ledger.addOutcome({
      applicationId: outcomeForm.applicationId,
      date: outcomeForm.date,
      incidencePct: outcomeForm.incidencePct === '' ? null : Number(outcomeForm.incidencePct),
      severityPct: outcomeForm.severityPct === '' ? null : Number(outcomeForm.severityPct),
      effectiveness: outcomeForm.effectiveness,
      cropResponse: outcomeForm.cropResponse || undefined,
      recurrence: outcomeForm.recurrence === '' ? null : outcomeForm.recurrence === 'yes',
      suspectedResistance: outcomeForm.suspectedResistance,
      nextAction: outcomeForm.nextAction || undefined,
    });
  };

  // ── Render ──────────────────────────────────────────────
  const statusStyle = STATUS_STYLES[decision.status] ?? STATUS_STYLES.INSUFFICIENT_DATA;

  return (
    <div className="acg-pv pn-tokens">
      <header className="pn-head">
        <div>
          <p className="eyebrow">{t('PROTECTION INTELLIGENCE', 'সুরক্ষা ইন্টেলিজেন্স')}</p>
          <h1>{t('Crop Protection Workflow', 'ফসল সুরক্ষা কর্মপ্রবাহ')}</h1>
          <p className="sub">
            {t(
              'Set your crop, inspect the field, review the evidence and follow the steps below. Weather risk alone never triggers a pesticide recommendation.',
              'ফসল নির্বাচন করুন, মাঠ পর্যবেক্ষণ লিখুন, প্রমাণ যাচাই করুন এবং নিচের ধাপগুলো অনুসরণ করুন। শুধু আবহাওয়ার ঝুঁকি কখনোই বালাইনাশক প্রয়োগের নির্দেশনা নয়।',
            )}
          </p>
        </div>
      </header>

      {/* Essential context first; optional field details stay collapsed. */}
      <section className="pn-card context-bar">
        <label>
          <span>{t('Crop', 'ফসল')}</span>
          <select value={crop} onChange={(e) => setCrop(e.target.value)}>
            {Array.from(new Set([...CROPS, crop])).map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </label>
        <label className="grow">
          <span>{t('What problem do you see?', 'কী সমস্যা দেখছেন?')}</span>
          <input
            value={target}
            onChange={(e) => setTarget(e.target.value)}
            placeholder={t('Enter pest or disease, if known', 'পোকা বা রোগের নাম জানা থাকলে লিখুন')}
          />
        </label>
        <button className="pn-btn" onClick={runIntel} disabled={intelLoading}>
          {intelLoading ? t('Updating…', 'হালনাগাদ হচ্ছে…') : t('Update field information', 'তথ্য হালনাগাদ করুন')}
        </button>
        <details className="context-more">
          <summary>{t('Optional field details', 'অতিরিক্ত তথ্য (ঐচ্ছিক)')}</summary>
          <div className="context-more-grid">
            <label>
              <span>{t('Field', 'জমি')}</span>
              <select value={fieldId ?? ''} onChange={(e) => setFieldId(e.target.value || null)}>
                <option value="">{t('— crop only —', '— শুধু ফসল —')}</option>
                {ledger.data.fields.map((f: FieldProfile) => (
                  <option key={f.id} value={f.id}>{f.name} · {f.crop}</option>
                ))}
              </select>
            </label>
            <label>
              <span>{t('Growth stage', 'ফসলের পর্যায়')}</span>
              <select value={growthStage} onChange={(e) => setGrowthStage(e.target.value)}>
                <option value="">{t('Unknown', 'অজানা')}</option>
                {['sowing', 'seedling', 'vegetative', 'flowering', 'harvest'].map((stage) => (
                  <option key={stage} value={stage}>{stage}</option>
                ))}
              </select>
            </label>
            <label className="gps-toggle">
              <input type="checkbox" checked={useGps} onChange={(e) => setUseGps(e.target.checked)} />
              <span>{t('Use device location', 'ডিভাইসের অবস্থান ব্যবহার')}</span>
            </label>
          </div>
        </details>
      </section>

      {/* ── SECTION A — Risk Overview ─────────────────────── */}
      <details className="pn-card pn-step" open>
        <summary className="pn-step-summary">
          <span className="pn-step-number">01</span>
          <div className="pn-step-heading">
            <h2>{t('Risk Overview', 'ঝুঁকির সারসংক্ষেপ')}</h2>
            <p>{t('Review crop and local conditions. Risk alone is never a spray instruction.', 'ফসল ও অবস্থান অনুযায়ী আবহাওয়ার তথ্য দেখুন। শুধু ঝুঁকি দেখে স্প্রে করবেন না।')}</p>
          </div>
          <span className="pn-step-chevron" aria-hidden="true">⌄</span>
        </summary>
        {intelError && (
          <div className="callout warn">
            {t('Weather unavailable:', 'আবহাওয়া পাওয়া যাচ্ছে না:')} {intelError}
            {t(' — protection continues on field records only.', ' — ক্ষেত রেকর্ডের ভিত্তিতে সুরক্ষা চালিয়ে যাচ্ছে।')}
          </div>
        )}
        {intel ? (
          <>
            <div className="stat-row">
              <div className="stat">
                <span className="num">{Math.round(intel.weather.temperature)}°C</span>
                <span className="lbl">{t('Temp', 'তাপমাত্রা')}</span>
              </div>
              <div className="stat">
                <span className="num">{Math.round(intel.weather.humidity)}%</span>
                <span className="lbl">{t('Humidity', 'আর্দ্রতা')}</span>
              </div>
              <div className="stat">
                <span className="num">{Math.round(intel.weather.windSpeed)}</span>
                <span className="lbl">{t('Wind km/h', 'বাতাস কিমি/ঘ')}</span>
              </div>
              <div className="stat">
                <span className="num">{Math.round(intel.weather.rainProbability)}%</span>
                <span className="lbl">{t('Rain prob.', 'বৃষ্টি সম্ভাবনা')}</span>
              </div>
              <div className="stat">
                <span className="num">{intel.overallRiskScore != null ? Math.round(intel.overallRiskScore) : '—'}</span>
                <span className="lbl">{t('Overall risk', 'সামগ্রিক ঝুঁকি')}</span>
              </div>
              <div className={`stat ${intel.dataFreshness.stale ? 'stale' : ''}`}>
                <span className="num">{intel.dataFreshness.ageMinutes}m</span>
                <span className="lbl">{t('Data age', 'তথ্যের বয়স')}</span>
              </div>
            </div>
            {intel.dataFreshness.stale && (
              <div className="callout warn">
                {t(
                  `Weather data is ${intel.dataFreshness.ageMinutes} minutes old (source: ${intel.dataFreshness.provider}) — spray-window advice may be outdated.`,
                  `আবহাওয়ার তথ্য ${intel.dataFreshness.ageMinutes} মিনিট পুরনো (উৎস: ${intel.dataFreshness.provider}) — স্প্রে-সময় পরামর্শ পুরনো হতে পারে।`,
                )}
              </div>
            )}
            <div className="grid-2">
              <div>
                <h3>{t('Disease risk', 'রোগের ঝুঁকি')}</h3>
                {intel.diseaseForecast && intel.diseaseForecast.diseases.length > 0 ? (
                  intel.diseaseForecast.diseases.slice(0, 4).map((d) => (
                    <div key={d.name} className="risk-card">
                      <div className="risk-head">
                        <strong>{bn ? d.nameBn : d.name}</strong>
                        <span className={`pill ${d.level}`}>{d.risk}</span>
                      </div>
                      {d.preventiveActions[0] && (
                        <p className="hint">{bn ? d.preventiveActions[0] : d.preventiveActions[0]}</p>
                      )}
                    </div>
                  ))
                ) : (
                  <p className="hint">
                    {t(
                      'No stage-aware disease forecast — add sowing date/growth stage for specific diseases.',
                      'স্টেজ-সচেতন রোগ পূর্বাভাস নেই — নির্দিষ্ট রোগের জন্য বপন তারিখ/পর্যায় দিন।',
                    )}
                  </p>
                )}
              </div>
              <div>
                <h3>{t('Pest forecast', 'পোকার পূর্বাভাস')}</h3>
                {intel.pestForecast && intel.pestForecast.pests.length > 0 ? (
                  intel.pestForecast.pests.slice(0, 4).map((p) => (
                    <div key={p.name} className="risk-card">
                      <div className="risk-head">
                        <strong>{bn ? p.nameBn : p.name}</strong>
                        <span className={`pill ${p.level}`}>{p.risk}</span>
                      </div>
                      {p.economicThreshold && (
                        <p className="hint">{t('Threshold', 'সীমা')}: {p.economicThreshold}</p>
                      )}
                    </div>
                  ))
                ) : (
                  <p className="hint">{t('Pest forecast needs crop stage context.', 'পোকার পূর্বাভাসে ফসলের পর্যায় দরকার।')}</p>
                )}
                <h3>{t('Spray windows (48h)', 'স্প্রে সময় (৪৮ ঘণ্টা)')}</h3>
                {intel.sprayWindows.filter((w) => w.suitable).slice(0, 3).map((w) => (
                  <div key={w.start} className="risk-card ok">
                    ✓ {new Date(w.start).toLocaleString(bn ? 'bn-BD' : 'en-GB', { dateStyle: 'short', timeStyle: 'short' })}
                  </div>
                ))}
                {intel.sprayWindows.every((w) => !w.suitable) && (
                  <div className="callout warn">{t('No suitable spray window in the next 48h.', 'আগামী ৪৮ ঘণ্টায় উপযুক্ত স্প্রে সময় নেই।')}</div>
                )}
              </div>
            </div>
          </>
        ) : (
          <p className="hint">
            {intelLoading
              ? t('Loading weather intelligence…', 'আবহাওয়া ইন্টেলিজেন্স লোড হচ্ছে…')
              : t('Weather intelligence unavailable — the workflow continues on field records.', 'আবহাওয়া ইন্টেলিজেন্স অনুপলব্ধ — ক্ষেত রেকর্ডের ভিত্তিতে চলবে।')}
          </p>
        )}
        {meta && (
          <p className="meta-line">
            {t('Registry', 'রেজিস্ট্রি')}: {meta.runtimeDatabase?.productCount ?? '—'} {t('products', 'পণ্য')} ·
            {' '}{t('generated', 'তৈরি')} {new Date(meta.generatedAt).toLocaleDateString(bn ? 'bn-BD' : 'en-GB')} ·
            {' '}{t('source checksum', 'উৎস চেকসাম')} {meta.source.sha256.slice(0, 8)}…
          </p>
        )}
      </details>

      {/* ── SECTION B — Field Scouting ────────────────────── */}
      <details className="pn-card pn-step">
        <summary className="pn-step-summary">
          <span className="pn-step-number">02</span>
          <div className="pn-step-heading">
            <h2>{t('Field Scouting', 'ক্ষেত পর্যবেক্ষণ')}</h2>
            <p>{t('Inspect the crop and record the symptoms you actually observe.', 'গাছ, পাতা ও বালাইয়ের লক্ষণ নিজে দেখে তথ্য লিখুন।')}</p>
          </div>
          <span className="pn-step-chevron" aria-hidden="true">⌄</span>
        </summary>
        <p className="hint">
          {t(
            'Record what you see in the field. A scouting record is required before any chemical consideration.',
            'ক্ষেতে যা দেখছেন তা রেকর্ড করুন। রাসায়নিক বিবেচনার আগে ক্ষেত পর্যবেক্ষণ রেকর্ড প্রয়োজন।',
          )}
        </p>
        <div className="form-grid">
          <label>
            <span>{t('Target', 'লক্ষ্য')}</span>
            <input value={scoutForm.target} onChange={(e) => setScoutForm({ ...scoutForm, target: e.target.value })} />
          </label>
          <label>
            <span>{t('Observation date', 'পর্যবেক্ষণ তারিখ')}</span>
            <input type="date" value={scoutForm.date} onChange={(e) => setScoutForm({ ...scoutForm, date: e.target.value })} />
          </label>
          <label>
            <span>{t('Incidence % (plants affected)', 'আক্রমণ % (গাছের হার)')}</span>
            <input type="number" min={0} max={100} value={scoutForm.incidencePct} onChange={(e) => setScoutForm({ ...scoutForm, incidencePct: e.target.value })} />
          </label>
          <label>
            <span>{t('Severity (0-100)', 'তীব্রতা (০-১০০)')}</span>
            <input type="number" min={0} max={100} value={scoutForm.severityPct} onChange={(e) => setScoutForm({ ...scoutForm, severityPct: e.target.value })} />
          </label>
          <label className="grow">
            <span>{t('Symptoms seen', 'দেখা লক্ষণ')}</span>
            <input value={scoutForm.symptoms} onChange={(e) => setScoutForm({ ...scoutForm, symptoms: e.target.value })} />
          </label>
          <label className="check">
            <input
              type="checkbox"
              checked={scoutForm.confirmedDiagnosis}
              onChange={(e) => setScoutForm({ ...scoutForm, confirmedDiagnosis: e.target.checked })}
            />
            <span>{t('Diagnosis confirmed (officer/expert)', 'রোগ নিশ্চিত (কর্মকর্তা/বিশেষজ্ঞ)')}</span>
          </label>
          <label className="check">
            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (!file) return;
                if (file.size > 400_000) {
                  alert(t('Photo too large (max ~400KB) — skipped.', 'ছবি খুব বড় (সর্বোচ্চ ~৪০০কিবি) — বাদ দেওয়া হলো।'));
                  return;
                }
                const reader = new FileReader();
                reader.onload = () => setPhotoDataUrl(String(reader.result));
                reader.readAsDataURL(file);
              }}
            />
            <span>{photoDataUrl ? t('Photo attached ✓', 'ছবি সংযুক্ত ✓') : t('Photo evidence (optional)', 'ছবি প্রমাণ (ঐচ্ছিক)')}</span>
          </label>
        </div>
        <button className="pn-btn" onClick={saveScouting} disabled={!scoutForm.target.trim()}>
          {t('Save scouting record', 'ক্ষেত পর্যবেক্ষণ সংরক্ষণ')}
        </button>
        {scoutSaved && <span className="saved-note">✓ {t('Saved', 'সংরক্ষিত')}</span>}
        {latestScout && (
          <div className="latest-scout">
            <strong>{t('Latest record', 'সর্বশেষ রেকর্ড')}:</strong>{' '}
            {latestScout.date} · {latestScout.target} ·{' '}
            {t('incidence', 'আক্রমণ')} {latestScout.incidencePct != null ? `${latestScout.incidencePct}%` : t('not counted', 'গোনা হয়নি')} ·{' '}
            {latestScout.confirmedDiagnosis ? t('diagnosis confirmed', 'রোগ নিশ্চিত') : t('unconfirmed', 'অনিশ্চিত')}
          </div>
        )}
      </details>

      {/* ── SECTION C — Protection Decision ───────────────── */}
      <details className="pn-card pn-step">
        <summary className="pn-step-summary">
          <span className="pn-step-number">03</span>
          <div className="pn-step-heading">
            <h2>{t('Protection Decision', 'সুরক্ষা সিদ্ধান্ত')}</h2>
            <p>{t('Review observations, evidence and missing information before acting.', 'পর্যবেক্ষণ, প্রমাণ ও অনুপস্থিত তথ্য দেখে পরবর্তী পদক্ষেপ বুঝুন।')}</p>
          </div>
          <span className="pn-step-chevron" aria-hidden="true">⌄</span>
        </summary>
        <div className="verdict" style={{ background: statusStyle.bg, color: statusStyle.fg }}>
          <span className="status">{bn ? statusStyle.labelBn : statusStyle.label}</span>
          <span className="engine">protection-decision-1</span>
        </div>
        <p className="decision-text">{bn ? decision.explanationBn : decision.explanation}</p>
        {decision.reasons.length > 0 && (
          <div className="reasons">
            {decision.reasons.map((r) => (
              <div key={r.code} className={`reason ${r.kind}`}>
                {r.kind === 'blocker' ? '⛔' : r.kind === 'caution' ? '⚠' : 'ℹ'} {bn ? r.textBn : r.text}
              </div>
            ))}
          </div>
        )}
        <div className="grid-2">
          <div>
            <h3>{t('Evidence', 'প্রমাণ')}</h3>
            <ul className="evidence-list">
              {decision.evidence.map((e, i) => <li key={i}>{e}</li>)}
            </ul>
          </div>
          <div>
            <h3>{t('Missing information', 'অনুপস্থিত তথ্য')}</h3>
            {decision.missingInformation.length === 0 ? (
              <p className="hint">{t('None — decision inputs complete.', 'কিছু নেই — সিদ্ধান্তের ইনপুট সম্পূর্ণ।')}</p>
            ) : (
              <ul className="missing-list">
                {decision.missingInformation.map((m, i) => <li key={i}>⚠ {m}</li>)}
              </ul>
            )}
          </div>
        </div>
        <h3>{t('Actions (IPM order)', 'করণীয় (IPM ক্রমে)')}</h3>
        <ol className="actions-list">
          {decision.actions.map((a, i) => (
            <li key={i} className={a.chemical ? 'chemical' : ''}>
              <span className="tier">T{a.ipmTier}</span> {bn ? a.actionBn : a.action}
            </li>
          ))}
        </ol>
        <p className="reassess">
          🔁 {t('Reassess after', 'পুনর্মূল্যায়ন')}:{' '}
          {decision.reassessAfter
            ? new Date(decision.reassessAfter).toLocaleDateString(bn ? 'bn-BD' : 'en-GB')
            : '—'}
          {' · '}{bn ? decision.followUpBn : decision.followUp}
        </p>
        <button className="pn-btn secondary" onClick={saveDecision}>
          {t('Save decision to ledger', 'সিদ্ধান্ত লেজারে সংরক্ষণ')}
        </button>
      </details>

      {/* ── SECTION D — Product Eligibility & Safety ──────── */}
      <details className="pn-card pn-step">
        <summary className="pn-step-summary">
          <span className="pn-step-number">04</span>
          <div className="pn-step-heading">
            <h2>{t('Product Eligibility & Safety', 'পণ্যের যোগ্যতা ও নিরাপত্তা')}</h2>
            <p>{t('Check registration, crop-target match, dose and safety information.', 'নিবন্ধন, ফসল-বালাই মিল, মাত্রা ও নিরাপত্তা যাচাই করুন।')}</p>
          </div>
          <span className="pn-step-chevron" aria-hidden="true">⌄</span>
        </summary>
        {!target.trim() ? (
          <p className="hint">{t('Enter a target pest/disease above to check products.', 'পণ্য দেখতে উপরে লক্ষ্য পোকা/রোগ লিখুন।')}</p>
        ) : eligibility.length === 0 ? (
          <div className="callout warn">
            {t(
              'No eligible registered product for this crop × target. Unverified products are never shown as approved.',
              'এই ফসল × লক্ষ্যের জন্য কোনো যোগ্য নিবন্ধিত পণ্য নেই। অযাচাইকৃত পণ্য কখনোই অনুমোদিত দেখানো হয় না।',
            )}
          </div>
        ) : (
          <div className="product-list">
            {proposedProducts.map((e) => (
              <div key={e.product.id} className="product-card">
                <div className="product-head">
                  <strong>{e.product.tradeName}</strong>
                  <span className="reg">#{e.registrationNo}</span>
                </div>
                <div className="product-ai">
                  {e.product.commonName}
                  {e.product.formulation ? ` · ${e.product.formulation}` : ''}
                </div>
                <div className="product-facts">
                  {e.moaCode && <span className="chip">{e.moaCode}</span>}
                  {e.dosage && <span className="chip">{e.dosage}</span>}
                  <span className={`chip ${e.phiDays != null ? '' : 'warn'}`}>
                    PHI {e.phiDays != null ? `${e.phiDays}d` : t('unknown — label', 'অজানা — লেবেল')}
                  </span>
                  <span className={`chip ${e.reiHours != null ? '' : 'warn'}`}>
                    REI {e.reiHours != null ? `${e.reiHours}h` : t('unknown — label', 'অজানা — লেবেল')}
                  </span>
                </div>
                {e.missingData.length > 0 && (
                  <p className="hint">⚠ {e.missingData.map((m) => t(m, m)).join(' · ')}</p>
                )}
              </div>
            ))}
          </div>
        )}
        {compliance && (
          <div className={`callout ${compliance.verdict === 'BLOCK' ? 'danger' : compliance.verdict === 'FLAG' ? 'warn' : 'ok'}`}>
            <strong>{t('MoA stewardship', 'MoA রোটেশন')} — {compliance.verdict}</strong>
            {compliance.findings.map((f, i) => (
              <div key={i}>· {bn ? (f.messageBn || f.messageEn) : f.messageEn}</div>
            ))}
            {compliance.findings.length === 0 && <div>✓ {t('No rotation conflicts found.', 'কোনো রোটেশন সংঘাত নেই।')}</div>}
          </div>
        )}
        {excludedAlternatives.length > 0 && (
          <details className="excluded">
            <summary>{t('Why alternatives were excluded', 'বিকল্পগুলো বাদ কেন')}</summary>
            {excludedAlternatives.map((x) => (
              <div key={x.product.id} className="excluded-row">
                <strong>{x.product.tradeName}</strong>
                <span> — {x.reasons.map((r) => (bn ? r.textBn : r.text)).join(' ')}</span>
              </div>
            ))}
          </details>
        )}
      </details>

      {/* ── SECTION E — Application Record ────────────────── */}
      <details className="pn-card pn-step">
        <summary className="pn-step-summary">
          <span className="pn-step-number">05</span>
          <div className="pn-step-heading">
            <h2>{t('Application Record', 'প্রয়োগ রেকর্ড')}</h2>
            <p>{t('Record only what was actually applied in the field.', 'বাস্তবে যা প্রয়োগ করেছেন শুধু সেটিই সংরক্ষণ করুন।')}</p>
          </div>
          <span className="pn-step-chevron" aria-hidden="true">⌄</span>
        </summary>
        <p className="hint">
          {t(
            'Record only what was actually applied. Dosage comes from the label — the app never invents it.',
            'শুধু প্রকৃত প্রয়োগ রেকর্ড করুন। ডোজ লেবেল থেকে — অ্যাপ কখনোই তা বানায় না।',
          )}
        </p>
        <div className="form-grid">
          <label>
            <span>{t('Product', 'পণ্য')}</span>
            <select value={appForm.productName} onChange={(e) => setAppForm({ ...appForm, productName: e.target.value })}>
              <option value="">{t('Select…', 'নির্বাচন…')}</option>
              {eligibility.map((e) => (
                <option key={e.product.id} value={e.product.tradeName}>{e.product.tradeName}</option>
              ))}
              <option value="__custom">{t('Other (typed below)', 'অন্য (নিচে লিখুন)')}</option>
            </select>
          </label>
          <label>
            <span>{t('Actual dosage (from label)', 'প্রকৃত ডোজ (লেবেল অনুযায়ী)')}</span>
            <input value={appForm.actualDosage} onChange={(e) => setAppForm({ ...appForm, actualDosage: e.target.value })} />
          </label>
          <label>
            <span>{t('Date', 'তারিখ')}</span>
            <input type="date" value={appForm.date} onChange={(e) => setAppForm({ ...appForm, date: e.target.value })} />
          </label>
          <label>
            <span>{t('Treated area', 'প্রয়োগকৃত এলাকা')}</span>
            <div className="area-row">
              <input type="number" value={appForm.areaValue} onChange={(e) => setAppForm({ ...appForm, areaValue: e.target.value })} />
              <select value={appForm.areaUnit} onChange={(e) => setAppForm({ ...appForm, areaUnit: e.target.value })}>
                <option value="bigha">bigha</option>
                <option value="acre">acre</option>
                <option value="hectare">hectare</option>
              </select>
            </div>
          </label>
          <label>
            <span>{t('Operator', 'প্রয়োগকারী')}</span>
            <input value={appForm.operator} onChange={(e) => setAppForm({ ...appForm, operator: e.target.value })} />
          </label>
          <label>
            <span>{t('Follow-up date', 'ফলো-আপ তারিখ')}</span>
            <input type="date" value={appForm.followUpDate} onChange={(e) => setAppForm({ ...appForm, followUpDate: e.target.value })} />
          </label>
        </div>
        <button
          className="pn-btn"
          onClick={recordApplication}
          disabled={!appForm.productName || !target.trim() || appForm.productName === '__custom'}
        >
          {t('Record application', 'প্রয়োগ রেকর্ড করুন')}
        </button>
        {appSaved && <span className="saved-note">✓ {t('Recorded — add a follow-up outcome in section F', 'রেকর্ড হয়েছে — ফলাফল যোগ করুন (অংশ গ)')}</span>}
      </details>

      {/* ── SECTION F — Outcome & Follow-up ───────────────── */}
      <details className="pn-card pn-step">
        <summary className="pn-step-summary">
          <span className="pn-step-number">06</span>
          <div className="pn-step-heading">
            <h2>{t('Outcome & Follow-up', 'ফলাফল ও ফলো-আপ')}</h2>
            <p>{t('Record effectiveness and whether the problem returns.', 'পরবর্তী পর্যবেক্ষণে কার্যকারিতা ও পুনরায় বালাই দেখা যাচ্ছে কি না লিখুন।')}</p>
          </div>
          <span className="pn-step-chevron" aria-hidden="true">⌄</span>
        </summary>
        {pendingOutcomes.length === 0 && ledger.data.applications.length === 0 ? (
          <p className="hint">{t('No applications recorded yet.', 'এখনো কোনো প্রয়োগ রেকর্ড নেই।')}</p>
        ) : pendingOutcomes.length === 0 ? (
          <p className="hint">✓ {t('All recorded applications have follow-up outcomes.', 'সব প্রয়োগের ফলো-আপ ফলাফল রেকর্ড হয়েছে।')}</p>
        ) : (
          <div className="callout warn">
            {t('Applications awaiting follow-up', 'ফলো-আপের অপেক্ষায় প্রয়োগ')}:
            {pendingOutcomes.slice(0, 4).map((p) => (
              <div key={p.application.id}>
                · {p.application.date} · {p.application.productName} → {t('target', 'লক্ষ্য')} {p.application.target} ({p.daysSince}d)
              </div>
            ))}
          </div>
        )}
        {ledger.data.applications.length > 0 && (
          <>
            <div className="form-grid">
              <label>
                <span>{t('Application', 'প্রয়োগ')}</span>
                <select
                  value={outcomeForm.applicationId}
                  onChange={(e) => setOutcomeForm({ ...outcomeForm, applicationId: e.target.value })}
                >
                  <option value="">{t('Select…', 'নির্বাচন…')}</option>
                  {ledger.data.applications.map((a) => (
                    <option key={a.id} value={a.id}>
                      {a.date} · {a.productName} · {a.target}
                    </option>
                  ))}
                </select>
              </label>
              <label>
                <span>{t('Observation date', 'পর্যবেক্ষণ তারিখ')}</span>
                <input type="date" value={outcomeForm.date} onChange={(e) => setOutcomeForm({ ...outcomeForm, date: e.target.value })} />
              </label>
              <label>
                <span>{t('Incidence % now', 'বর্তমান আক্রমণ %')}</span>
                <input type="number" min={0} max={100} value={outcomeForm.incidencePct} onChange={(e) => setOutcomeForm({ ...outcomeForm, incidencePct: e.target.value })} />
              </label>
              <label>
                <span>{t('Severity now', 'বর্তমান তীব্রতা')}</span>
                <input type="number" min={0} max={100} value={outcomeForm.severityPct} onChange={(e) => setOutcomeForm({ ...outcomeForm, severityPct: e.target.value })} />
              </label>
              <label>
                <span>{t('Effectiveness', 'কার্যকারিতা')}</span>
                <select
                  value={outcomeForm.effectiveness}
                  onChange={(e) => setOutcomeForm({ ...outcomeForm, effectiveness: e.target.value as typeof outcomeForm.effectiveness })}
                >
                  <option value="effective">{t('Effective', 'কার্যকর')}</option>
                  <option value="partial">{t('Partial', 'আংশিক')}</option>
                  <option value="ineffective">{t('Ineffective', 'অকার্যকর')}</option>
                  <option value="unclear">{t('Unclear', 'অস্পষ্ট')}</option>
                </select>
              </label>
              <label>
                <span>{t('Recurrence?', 'পুনরাবৃত্তি?')}</span>
                <select value={outcomeForm.recurrence} onChange={(e) => setOutcomeForm({ ...outcomeForm, recurrence: e.target.value as '' | 'yes' | 'no' })}>
                  <option value="">{t('Unknown', 'অজানা')}</option>
                  <option value="yes">{t('Yes', 'হ্যাঁ')}</option>
                  <option value="no">{t('No', 'না')}</option>
                </select>
              </label>
              <label className="check">
                <input
                  type="checkbox"
                  checked={outcomeForm.suspectedResistance}
                  onChange={(e) => setOutcomeForm({ ...outcomeForm, suspectedResistance: e.target.checked })}
                />
                <span>{t('Suspected resistance — needs investigation', 'রেজিস্ট্যান্স সন্দেহ — তদন্ত দরকার')}</span>
              </label>
              <label className="grow">
                <span>{t('Crop response / notes', 'ফসলের প্রতিক্রিয়া / নোট')}</span>
                <input value={outcomeForm.cropResponse} onChange={(e) => setOutcomeForm({ ...outcomeForm, cropResponse: e.target.value })} />
              </label>
            </div>
            <button className="pn-btn" onClick={recordOutcome} disabled={!outcomeForm.applicationId}>
              {t('Record outcome', 'ফলাফল রেকর্ড করুন')}
            </button>
          </>
        )}
        {outcomeForm.suspectedResistance && (
          <div className="callout warn">
            {t(
              'Resistance is NOT diagnosed here. Suspected resistance after correct dosage + correct timing should be reported to the local DAE office for investigation (insecticide resistance monitoring).',
              'রেজিস্ট্যান্স এখানে নির্ণয় করা হয় না। সঠিক ডোজ ও সময়ে প্রয়োগের পরেও ব্যর্থতা হলে তদন্তের জন্য স্থানীয় কৃষি সম্প্রসারণ অফিসে জানান।',
            )}
          </div>
        )}
      </details>

      <p className="disclaimer">
        {t(
          'Advisory tool. Does not replace the product label, DAE registration, or professional field scouting. Weather risk alone never triggers a pesticide recommendation.',
          'পরামর্শমূলক টুল। পণ্যের লেবেল, ডিএই নিবন্ধন বা পেশাদার ক্ষেত পর্যবেক্ষণের বিকল্প নয়। শুধু আবহাওয়ার ঝুঁকি কখনোই কীটনাশক সুপারিশ করে না।',
        )}
      </p>
    </div>
  );
}

export default ProtectionView;
