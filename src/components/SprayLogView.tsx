import React, { useState, useMemo } from 'react';
import {
  NotebookPen,
  Plus,
  Trash2,
  Sprout,
  Calendar,
  Beaker,
  RotateCw,
  AlertTriangle,
  CheckCircle2,
  Info,
  TrendingUp,
  Bug,
  ShieldCheck,
  ShieldAlert,
  ScanLine,
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useSprayHistory, lastMoaByCrop, type SprayEntry } from '../hooks/useSprayHistory';
import { ChemicalProduct, AppTab } from '../types';
import {
  runComplianceCheck,
  type ComplianceResult,
  type ApplicationLogEntry,
  type CropPhase,
} from '../utils/moaRotationEngine';
import { MoAComplianceWarningModal } from './MoAComplianceWarningModal';
import { MoAGroupBadge } from './MoAGroupBadge';
import './SprayLogView.css';
import './MoAGroupBadge.css';

interface SprayLogViewProps {
  products: ChemicalProduct[] | null;
  onNavigateTab: (tab: AppTab) => void;
}

const CROP_PHASES: CropPhase[] = ['Nursery', 'Vegetative', 'Reproductive', 'Heading'];

/**
 * Adapter — converts the persisted SprayEntry (which predates the
 * compliance engine) into the engine's `ApplicationLogEntry` shape.
 * The two interfaces share all required fields, so this is a strict
 * structural cast. (Pest is absent from the legacy log; we default to
 * empty string — the engine treats unknown pest as a standard 30-day
 * window, which is the safe fallback.)
 */
function toLogEntry(e: SprayEntry): ApplicationLogEntry {
  return {
    id: e.id,
    date: e.date,
    productName: e.productName,
    commonName: e.commonName,
    moaCode: e.moaCode,
    moaGroup: e.moaGroup,
    type: e.type,
    crop: e.crop,
    pest: (e as SprayEntry & { pest?: string }).pest ?? '',
    fieldLabel: e.fieldLabel,
  };
}

export const SprayLogView: React.FC<SprayLogViewProps> = ({ products, onNavigateTab }) => {
  const { language } = useLanguage();
  const bn = language === 'bn';
  const { entries, addEntry, removeEntry, clearAll } = useSprayHistory();
  const [showForm, setShowForm] = useState(false);

  // Compliance engine state — the result of `runComplianceCheck` for the
  // most recent submit attempt. When non-null, the warning modal renders.
  const [complianceResult, setComplianceResult] = useState<ComplianceResult | null>(null);
  // The proposed application metadata captured at submit time, used by
  // the modal header to display the group badge and product name.
  const [proposedMeta, setProposedMeta] = useState<{
    moaCode: string;
    type: string;
    productName: string;
    // Pending spray entry — saved only if the user overrides a FLAG.
    pendingEntry?: Omit<SprayEntry, 'id' | 'ts'>;
  } | null>(null);

  // Form state — original fields + new MoA rotation guide inputs.
  const [fProduct, setFProduct] = useState('');
  const [fCrop, setFCrop] = useState('');
  const [fArea, setFArea] = useState('1');
  const [fUnit, setFUnit] = useState('bigha');
  const [fDate, setFDate] = useState(new Date().toISOString().slice(0, 10));
  const [fField, setFField] = useState('');
  const [fNotes, setFNotes] = useState('');
  // New fields for the compliance engine (Guide §4.1 data schema):
  const [fPest, setFPest] = useState('');                      // pest_species
  const [fCropPhase, setFCropPhase] = useState<CropPhase>('Vegetative'); // crop_phase
  const [fCropCycleStart, setFCropCycleStart] = useState('');  // window_id start
  const [fCropCycleEnd, setFCropCycleEnd] = useState('');       // window_id end

  const lastByCrop = useMemo(() => lastMoaByCrop(entries), [entries]);

  // Quick product search for the form
  const productMatches = useMemo(() => {
    if (!fProduct.trim() || !products) return [];
    const q = fProduct.toLowerCase();
    return products
      .filter((p) =>
        p.tradeName.toLowerCase().includes(q) ||
        p.commonName.toLowerCase().includes(q)
      )
      .slice(0, 6);
  }, [fProduct, products]);

  const handleSelectProduct = (p: ChemicalProduct) => {
    setFProduct(p.tradeName);
    // Pre-fill pest from the product's pest list when available, to reduce
    // friction and improve the engine's pest-window selection accuracy.
    if (!fPest && p.pests.length > 0) setFPest(p.pests[0]);
  };

  // Build the pending spray entry from the current form state. Used by
  // both the compliance check (synthetic log includes this entry for cap
  // math) and the actual save on PASS / override.
  const buildPendingEntry = (matched?: ChemicalProduct): Omit<SprayEntry, 'id' | 'ts'> => {
    const pest = fPest.trim() || matched?.pests[0] || '';
    return {
      date: fDate,
      productName: fProduct,
      commonName: matched?.commonName || fProduct,
      moaCode: matched?.moaCode || '—',
      moaGroup: matched?.moaGroup || '—',
      type: matched?.type || '—',
      crop: fCrop || '—',
      areaValue: parseFloat(fArea) || 0,
      areaUnit: fUnit,
      fieldLabel: fField || undefined,
      notes: (fNotes || undefined) as string | undefined,
      // Persist the pest as an extra field — kept on the SprayEntry via a
      // TS cast at load time so legacy entries without pest still work.
      // (Stored alongside the standard fields in localStorage.)
      // We piggy-back through a property that survives JSON serialization.
      ...((pest ? { pest } : {}) as object),
    } as Omit<SprayEntry, 'id' | 'ts'>;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Find the matching product to pull MoA info
    const matched = products?.find(
      (p) => p.tradeName.toLowerCase() === fProduct.toLowerCase()
    );
    const proposedMoACode = matched?.moaCode || '—';
    const proposedType = matched?.type || 'Insecticide';

    // ── Run the compliance engine ───────────────────────────────────
    // Convert the existing log to engine entries, then run all 5 checks.
    // The result drives the modal: BLOCK → not saved; FLAG → save with
    // override justification; PASS → save immediately.
    const logEntries = entries.map(toLogEntry);
    // Available MoA codes for the selected crop+pest — used by the
    // sub-group rotation check to determine if alternatives exist.
    const availableMoACodes = (products || [])
      .filter((p) => p.crops.includes(fCrop) && (!fPest || p.pests.includes(fPest)))
      .map((p) => p.moaCode || '—')
      .filter((c) => c !== '—');

    const result = runComplianceCheck({
      log: logEntries,
      proposedDate: fDate,
      proposedMoACode,
      crop: fCrop || '—',
      pest: fPest || '',
      fieldLabel: fField || undefined,
      cropCycleStart: fCropCycleStart || undefined,
      cropCycleEnd: fCropCycleEnd || undefined,
      currentPhase: fCropPhase,
      availableMoACodes,
    });

    const pendingEntry = buildPendingEntry(matched);

    // Always capture metadata for the modal — even on PASS the modal
    // renders a brief "Approved" confirmation, mirroring the guide's
    // §4.3 "Warning Modal Workflows" which expects a modal on every
    // validation event.
    setProposedMeta({
      moaCode: proposedMoACode,
      type: proposedType,
      productName: fProduct,
      pendingEntry,
    });
    setComplianceResult(result);

    // On PASS, save immediately and reset the form. The modal will still
    // render as a confirmation toast (auto-dismissable via "Continue").
    if (result.verdict === 'PASS') {
      addEntry(pendingEntry);
      // Reset form (keep crop + pest + phase for fast consecutive entries)
      setFProduct(''); setFArea('1'); setFField(''); setFNotes('');
      setShowForm(false);
    }
    // On FLAG, the user must explicitly override in the modal — the
    // override handler saves the entry with the justification appended.
    // On BLOCK, the entry is never saved.
  };

  // Called by the modal when the user confirms an emergency override
  // of a FLAG. The justification text is appended to the entry's notes
  // field so the audit trail is preserved in localStorage.
  const handleOverride = (justification: string) => {
    if (!proposedMeta?.pendingEntry) return;
    const overrideNote = bn
      ? `[জরুরি ওভাররাইড — ${justification}]`
      : `[EMERGENCY OVERRIDE — ${justification}]`;
    const notes = proposedMeta.pendingEntry.notes
      ? `${proposedMeta.pendingEntry.notes} ${overrideNote}`
      : overrideNote;
    addEntry({ ...proposedMeta.pendingEntry, notes });
    // Reset
    setComplianceResult(null);
    setProposedMeta(null);
    setFProduct(''); setFArea('1'); setFField(''); setFNotes('');
    setShowForm(false);
  };

  // Close the modal — used for BLOCK ("OK, choose an alternative"),
  // FLAG ("Cancel"), and PASS ("Continue"). For BLOCK the form is kept
  // open so the user can immediately pick a different product.
  const handleCloseModal = () => {
    setComplianceResult(null);
    setProposedMeta(null);
  };

  // ---- copy ----
  const copy = {
    eyebrow: bn ? 'আমার জমি ও স্প্রে ইতিহাস' : 'MY FIELD & SPRAY HISTORY',
    h1: bn ? 'পরের স্প্রে কী হবে — জমি বলে দেবে।' : 'The next spray is decided by what the field remembers.',
    lede: bn
      ? 'প্রতিটি স্প্রে লগ করুন। অ্যাপ মনে রাখবে কোন গ্রুপ ব্যবহার হয়েছে — যাতে একই MoA বারবার না হয় এবং পোকা প্রতিরোধী না হয়।'
      : 'Log every spray. The app remembers which group was used — so the same MoA is not repeated and pests cannot build resistance.',
    empty: bn
      ? 'এখনো কোনো স্প্রে লগ করা হয়নি। প্রথম এন্ট্রি যোগ করুন।'
      : 'No sprays logged yet. Add your first entry to start tracking rotation.',
    addBtn: bn ? 'নতুন স্প্রে লগ করুন' : 'Log a spray',
    formTitle: bn ? 'স্প্রে এন্ট্রি' : 'Spray entry',
    product: bn ? 'পণ্যের নাম' : 'Product name',
    crop: bn ? 'ফসল' : 'Crop',
    area: bn ? 'জমির পরিমাণ' : 'Field area',
    unit: bn ? 'একক' : 'Unit',
    date: bn ? 'তারিখ' : 'Date',
    fieldLabel: bn ? 'জমির নাম (ঐচ্ছিক)' : 'Field name (optional)',
    notes: bn ? 'নোট (ঐচ্ছিক)' : 'Notes (optional)',
    save: bn ? 'সংরক্ষণ' : 'Save',
    cancel: bn ? 'বাতিল' : 'Cancel',
    clearAll: bn ? 'সব মুছুন' : 'Clear all',
    recent: bn ? 'সাম্প্রতিক স্প্রে' : 'Recent sprays',
    noRepeat: bn ? 'এই গ্রুপটি এড়িয়ে চলুন' : 'Avoid this group next',
    history: bn ? 'ইতিহাস' : 'History',
    rotationTip: bn
      ? 'প্রতিটি ফসলের জন্য সর্বশেষ ব্যবহৃত MoA কোড নিচে দেখানো হলো। পরবর্তী স্প্রেতে ভিন্ন গ্রুপ বেছে নিন।'
      : 'The last MoA code used per crop is shown below. Pick a different group for the next spray.',
    goRotation: bn ? 'রোটেশন প্ল্যানার খুলুন' : 'Open rotation planner',
    // MoA Rotation Compliance Engine copy
    engineBanner: bn
      ? 'MoA রোটেশন কমপ্লায়েন্স ইঞ্জিন চালু — গাইড §4.2 অনুযায়ী প্রতিটি নতুন স্প্রে IRAC নিয়ম দিয়ে যাচাই হবে: ট্রিটমেন্ট উইন্ডো (১৫/৩০ দিন), ৫০% মৌসুমী এক্সপোজার ক্যাপ, সাব-গ্রুপ ঘূর্ণন ঝুঁকি এবং ফসল পর্যায় সুপারিশ।'
      : 'MoA Rotation Compliance Engine is live — every new spray is validated against the IRAC rules from Guide §4.2: treatment windows (15/30 days), 50% seasonal exposure cap, sub-group rotation risk and crop-phase advisory.',
    pest: bn ? 'লক্ষ্য বালাই / পোকা' : 'Target pest',
    cropPhase: bn ? 'ফসলের বর্তমান পর্যায়' : 'Current crop phase',
    cropCycle: bn ? 'ফসল চক্র (ঐচ্ছিক — মৌসুমী ক্যাপ যাচাইয়ের জন্য)' : 'Crop cycle (optional — for seasonal cap check)',
    cropCycleStart: bn ? 'শুরু (রোপণ তারিখ)' : 'Start (sowing date)',
    cropCycleEnd: bn ? 'শেষ (কাটা তারিখ)' : 'End (harvest date)',
    saveWithCheck: bn ? 'কমপ্লায়েন্স যাচাই সহ সংরক্ষণ' : 'Save with compliance check',
  };

  const units = ['bigha', 'acre', 'hectare', 'katha'];

  return (
    <div className="acg-mf pn-tokens" id="myfield-view">
      <section className="pn-shell acg-mf-head">
        <p className="pn-eyebrow"><span className="pn-dot" /> {copy.eyebrow}</p>
        <h1 className="pn-h1">{copy.h1}</h1>
        <p className="pn-lede">{copy.lede}</p>

        {/* MoA Rotation Compliance Engine banner */}
        <div className="acg-mf-engine-banner">
          <ShieldCheck size={16} />
          <p>{copy.engineBanner}</p>
        </div>

        <div className="acg-mf-cta">
          <button type="button" className="pn-btn" onClick={() => setShowForm((v) => !v)}>
            <Plus size={16} /> {copy.addBtn}
          </button>
          <button type="button" className="pn-linkbtn" onClick={() => onNavigateTab('rotation')}>
            <RotateCw size={14} /> {copy.goRotation}
          </button>
        </div>
      </section>

      {/* Add form */}
      {showForm && (
        <form className="acg-mf-form pn-card" onSubmit={handleSubmit}>
          <h2 className="pn-h2"><NotebookPen size={18} /> {copy.formTitle}</h2>

          <label className="acg-mf-field">
            <span>{copy.product}</span>
            <input
              value={fProduct}
              onChange={(e) => setFProduct(e.target.value)}
              required
              placeholder={bn ? 'যেমন: Virtako' : 'e.g. Virtako'}
              list="mf-products"
            />
            {productMatches.length > 0 && (
              <div className="acg-mf-suggestions">
                {productMatches.map((p) => (
                  <button type="button" key={p.id} onClick={() => handleSelectProduct(p)}>
                    <strong>{p.tradeName}</strong>
                    <span>{p.commonName} · {p.moaCode || '—'}</span>
                  </button>
                ))}
              </div>
            )}
          </label>

          <div className="acg-mf-row2">
            <label className="acg-mf-field">
              <span>{copy.crop}</span>
              <input value={fCrop} onChange={(e) => setFCrop(e.target.value)} required
                placeholder={bn ? 'যেমন: ধান' : 'e.g. Rice'} />
            </label>
            <label className="acg-mf-field">
              <span>{copy.pest}</span>
              <input value={fPest} onChange={(e) => setFPest(e.target.value)}
                placeholder={bn ? 'যেমন: ব্রাউন প্ল্যান্টহপার' : 'e.g. Brown Planthopper'} />
            </label>
          </div>

          <div className="acg-mf-row2">
            <label className="acg-mf-field">
              <span>{copy.date}</span>
              <input type="date" value={fDate} onChange={(e) => setFDate(e.target.value)} required />
            </label>
            <label className="acg-mf-field">
              <span>{copy.cropPhase}</span>
              <select value={fCropPhase} onChange={(e) => setFCropPhase(e.target.value as CropPhase)}>
                {CROP_PHASES.map((p) => <option key={p} value={p}>{p}</option>)}
              </select>
            </label>
          </div>

          {/* Crop cycle dates — optional, used by Logic 3 (50% seasonal cap) */}
          <div className="acg-mf-cycle">
            <p className="acg-mf-cycle-label">
              <ScanLine size={13} />
              {copy.cropCycle}
            </p>
            <div className="acg-mf-row2">
              <label className="acg-mf-field">
                <span>{copy.cropCycleStart}</span>
                <input type="date" value={fCropCycleStart}
                  onChange={(e) => setFCropCycleStart(e.target.value)} />
              </label>
              <label className="acg-mf-field">
                <span>{copy.cropCycleEnd}</span>
                <input type="date" value={fCropCycleEnd}
                  onChange={(e) => setFCropCycleEnd(e.target.value)} />
              </label>
            </div>
          </div>

          <div className="acg-mf-row2">
            <label className="acg-mf-field">
              <span>{copy.area}</span>
              <input type="number" step="0.1" min="0" value={fArea}
                onChange={(e) => setFArea(e.target.value)} required />
            </label>
            <label className="acg-mf-field">
              <span>{copy.unit}</span>
              <select value={fUnit} onChange={(e) => setFUnit(e.target.value)}>
                {units.map((u) => <option key={u} value={u}>{u}</option>)}
              </select>
            </label>
          </div>

          <label className="acg-mf-field">
            <span>{copy.fieldLabel}</span>
            <input value={fField} onChange={(e) => setFField(e.target.value)}
              placeholder={bn ? 'যেমন: উত্তর পাড়ার জমি' : 'e.g. North plot'} />
          </label>

          <label className="acg-mf-field">
            <span>{copy.notes}</span>
            <textarea value={fNotes} onChange={(e) => setFNotes(e.target.value)} rows={2} />
          </label>

          <div className="acg-mf-form-actions">
            <button type="submit" className="pn-btn">
              <ShieldCheck size={14} />
              {copy.saveWithCheck}
            </button>
            <button type="button" className="pn-btn pn-btn--outline" onClick={() => setShowForm(false)}>
              {copy.cancel}
            </button>
          </div>
        </form>
      )}

      {/* MoA Rotation Compliance Warning Modal — Guide §4.3 */}
      <MoAComplianceWarningModal
        result={complianceResult}
        proposedMoACode={proposedMeta?.moaCode ?? '—'}
        proposedType={proposedMeta?.type ?? 'Insecticide'}
        proposedProductName={proposedMeta?.productName ?? ''}
        onClose={handleCloseModal}
        onOverride={handleOverride}
      />

      {/* Rotation advisory — last MoA per crop */}
      {Object.keys(lastByCrop).length > 0 && (
        <section className="acg-mf-advisory">
          <h2 className="pn-h2"><TrendingUp size={18} /> {bn ? 'পরবর্তী স্প্রে নির্দেশিকা' : 'Next-spray advisory'}</h2>
          <p className="acg-mf-advisory-p">{copy.rotationTip}</p>
          <div className="acg-mf-cropgrid">
            {Object.entries(lastByCrop).map(([crop, entry]: [string, SprayEntry]) => (
              <div key={crop} className="acg-mf-cropcard">
                <div className="acg-mf-cropcard-head">
                  <Sprout size={16} />
                  <span>{entry.crop}</span>
                </div>
                <div className="acg-mf-cropcard-moa">
                  <span className="acg-mf-moa-code">{entry.moaCode}</span>
                  <span className="acg-mf-moa-group">{entry.moaGroup}</span>
                </div>
                <div className="acg-mf-cropcard-warn">
                  <AlertTriangle size={12} />
                  <span>{copy.noRepeat}</span>
                </div>
                <div className="acg-mf-cropcard-date">
                  <Calendar size={11} />
                  <span>{entry.date}</span>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Empty state */}
      {entries.length === 0 ? (
        <section className="acg-mf-empty pn-card">
          <Info size={32} />
          <p>{copy.empty}</p>
          <button type="button" className="pn-btn" onClick={() => setShowForm(true)}>
            <Plus size={16} /> {copy.addBtn}
          </button>
        </section>
      ) : (
        <section className="acg-mf-history">
          <div className="acg-mf-history-head">
            <h2 className="pn-h2">{copy.recent} <span className="acg-mf-count">({entries.length})</span></h2>
            <button type="button" className="pn-linkbtn acg-mf-clear" onClick={clearAll}>
              <Trash2 size={13} /> {copy.clearAll}
            </button>
          </div>
          <div className="acg-mf-list">
            {[...entries].reverse().map((e: SprayEntry) => (
              <article key={e.id} className="acg-mf-entry pn-card">
                <div className="acg-mf-entry-main">
                  <div className="acg-mf-entry-top">
                    <span className="acg-mf-entry-prod">{e.productName}</span>
                    {/* Visual Badging Standards — Guide §4.3 */}
                    {e.moaCode && e.moaCode !== '—' ? (
                      <MoAGroupBadge moaCode={e.moaCode} type={e.type} size="sm" />
                    ) : (
                      <span className="acg-mf-entry-chip">{e.moaCode}</span>
                    )}
                  </div>
                  <div className="acg-mf-entry-meta">
                    <span><Sprout size={12} /> {e.crop}</span>
                    <span><Beaker size={12} /> {e.type}</span>
                    <span><Calendar size={12} /> {e.date}</span>
                    <span>{e.areaValue} {e.areaUnit}</span>
                    {e.fieldLabel && <span>{e.fieldLabel}</span>}
                  </div>
                  {e.notes && <p className="acg-mf-entry-notes">{e.notes}</p>}
                </div>
                <button
                  type="button"
                  className="acg-mf-entry-del"
                  onClick={() => removeEntry(e.id)}
                  aria-label={bn ? 'মুছুন' : 'Delete'}
                >
                  <Trash2 size={14} />
                </button>
              </article>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};
