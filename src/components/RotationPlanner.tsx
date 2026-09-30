import React, { useState, useMemo } from 'react';
import { ChemicalProduct, SprayRotationStep } from '../types';
import { MOA_DATABASE } from '../data/moaData';
import {
  AlertTriangle,
  Bug,
  CheckCircle2,
  ChevronDown,
  ExternalLink,
  FileDown,
  Layers,
  ScrollText,
  ShieldAlert,
  Sparkles,
  Sprout
} from 'lucide-react';
import { exportRotationSchedulePDF } from '../utils/pdfExport';
import { useLanguage } from '../context/LanguageContext';
import { CollapsibleUserGuide } from './CollapsibleUserGuide';
import { NextSprayGuide } from './NextSprayGuide';
import { SearchableSelect, SearchableSelectOption } from './SearchableSelect';
import './RotationPlanner.css';

interface RotationPlannerProps {
  products: ChemicalProduct[];
  /** Opens the full product datasheet modal (wired by App.tsx). */
  onSelectProduct?: (product: ChemicalProduct) => void;
  /** Opens the dosage / tank-mix calculator modal (wired by App.tsx). */
  onOpenCalculator?: (product: ChemicalProduct) => void;
  /** Opens the PPE safety checklist modal (wired by App.tsx). */
  onOpenSafety?: (product: ChemicalProduct) => void;
}

/**
 * Light chip styling for MoA codes inside searchable dropdown rows — the
 * same scheme-tone language as the Home tab, but as Tailwind classes
 * (official palette: IRAC red tint, FRAC golden tint, HRAC green tint).
 */
function moaBadgeClass(code?: string): string {
  if (!code) return 'bg-[#e7eee8] text-[#5d6f64] border-[#dfe5dd]';
  if (code.startsWith('IRAC')) return 'bg-[#fde4e7] text-[#b31d31] border-[#f5bfc8]';
  if (code.startsWith('FRAC')) return 'bg-[#f6eccf] text-[#8a6d1d] border-[#ead9a5]';
  if (code.startsWith('HRAC')) return 'bg-[#dcece4] text-[#006a4e] border-[#c5ddd0]';
  return 'bg-[#e7eee8] text-[#5d6f64] border-[#dfe5dd]';
}

/** Scheme tone → small chip class in the .acg-rp design system. */
function schemeChipClass(code?: string): string {
  if (!code) return 'acg-rp-chip';
  if (code.startsWith('FRAC')) return 'acg-rp-chip acg-rp-chip--gold';
  if (code.startsWith('HRAC')) return 'acg-rp-chip acg-rp-chip--green';
  return 'acg-rp-chip'; // IRAC keeps the red chip
}

/**
 * Official classification-table order (IRAC/FRAC/HRAC code lists): numbered
 * groups first in numeric order, then M (multi-site), then P (plant
 * activators), then U (uncertain biology). Letters after the number keep
 * sub-groups in order (1A < 1B < 2A…).
 */
function moaSortKey(code: string): [number, number, number, string] {
  // Trailing "(K3)" style legacy HRAC letter codes are kept for display but
  // ignored for ordering.
  const m = code.match(/^(IRAC|FRAC|HRAC)\s+([MPU])?(\d+)([A-Z]*)(?:\s*\(.+\))?$/);
  if (!m) return [3, 9, 9999, code];
  const schemeRank = m[1] === 'IRAC' ? 0 : m[1] === 'FRAC' ? 1 : 2;
  const prefixRank = m[2] === 'M' ? 1 : m[2] === 'P' ? 2 : m[2] === 'U' ? 3 : 0;
  return [schemeRank, prefixRank, parseInt(m[3], 10), m[4]];
}

function moaCompare(a: string, b: string): number {
  const ka = moaSortKey(a);
  const kb = moaSortKey(b);
  return ka[0] - kb[0] || ka[1] - kb[1] || ka[2] - kb[2] || ka[3].localeCompare(kb[3]);
}

/** Resistance risk → 3 context buckets driving the badge colour. */
function riskBucket(risk?: string): 'high' | 'mid' | 'low' {
  if (risk === 'High' || risk === 'Medium to High') return 'high';
  if (risk === 'Low') return 'low';
  return 'mid'; // Medium, Low to Medium, Unknown
}

function riskLabel(risk: string | undefined, lang: 'bn' | 'en'): string {
  if (!risk) return lang === 'bn' ? 'অজানা' : 'Unknown';
  if (lang === 'en') return risk;
  switch (risk) {
    case 'High': return 'উচ্চ';
    case 'Medium to High': return 'মধ্যম-উচ্চ';
    case 'Medium': return 'মধ্যম';
    case 'Low to Medium': return 'নিম্ন-মধ্যম';
    case 'Low': return 'নিম্ন';
    default: return 'অজানা';
  }
}

function schemeOf(code?: string): 'IRAC' | 'FRAC' | 'HRAC' | null {
  if (!code) return null;
  if (code.startsWith('IRAC')) return 'IRAC';
  if (code.startsWith('FRAC')) return 'FRAC';
  if (code.startsWith('HRAC')) return 'HRAC';
  return null;
}

/**
 * Rotation partners parsed from the committee's own rotationStrategy text —
 * same parsing language the Home tab uses for its MoA stickers. Same-scheme
 * codes only; at most 3 partners per group.
 */
function strategyPartners(code: string): string[] {
  const entry = MOA_DATABASE.find((m) => m.code === code);
  if (!entry) return [];
  const allCodes = new Set(MOA_DATABASE.map((m) => m.code));
  const out: string[] = [];
  const tokens = (entry.rotationStrategy || '').match(/\b[A-Z]?\d{1,3}[A-Z]?\b/g) || [];
  for (const tok of tokens) {
    const full = `${entry.type} ${tok}`;
    if (full !== code && allCodes.has(full) && !out.includes(full)) out.push(full);
    if (out.length >= 3) break;
  }
  return out;
}

export const RotationPlanner: React.FC<RotationPlannerProps> = ({
  products,
  onSelectProduct = () => {},
  onOpenCalculator = () => {},
  onOpenSafety = () => {}
}) => {
  const { language, transCrop, transPest, formatNum } = useLanguage();

  // Mobile header collapse — the emotional lede, framework chips and trust
  // list hide behind a toggle on small screens (CSS forces them open on md+).
  const [headOpen, setHeadOpen] = useState(false);

  // Available crops
  const availableCrops = useMemo(() => {
    const set = new Set<string>();
    products.forEach((p) => p.crops.forEach((c) => set.add(c)));
    return Array.from(set).sort();
  }, [products]);

  const [selectedCrop, setSelectedCrop] = useState<string>('Rice');

  // Available pests for the selected crop
  const availablePests = useMemo(() => {
    const set = new Set<string>();
    products
      .filter((p) => p.crops.includes(selectedCrop))
      .forEach((p) => p.pests.forEach((pest) => set.add(pest)));
    return Array.from(set).sort();
  }, [products, selectedCrop]);

  const [selectedPest, setSelectedPest] = useState<string>('');

  // Auto-select first pest when crop changes
  React.useEffect(() => {
    if (availablePests.length > 0) {
      // Prefer common ones like BPH, Late blight, or first available
      const preferred = availablePests.find(
        (p) => p.includes('BPH') || p.includes('Late blight') || p.includes('borer') || p.includes('mite')
      );
      setSelectedPest(preferred || availablePests[0]);
    } else {
      setSelectedPest('');
    }
  }, [availablePests, selectedCrop]);

  // Products matching selected crop and pest
  const eligibleProducts = useMemo(() => {
    if (!selectedPest) return [];
    return products.filter(
      (p) => p.crops.includes(selectedCrop) && p.pests.includes(selectedPest)
    );
  }, [products, selectedCrop, selectedPest]);

  // Unique MoA groups available for this pest
  const availableMoAGroups = useMemo(() => {
    const map = new Map<string, ChemicalProduct[]>();
    eligibleProducts.forEach((p) => {
      const code = p.moaCode || 'Standard';
      if (!map.has(code)) map.set(code, []);
      map.get(code)!.push(p);
    });
    return Array.from(map.entries());
  }, [eligibleProducts]);

  // -----------------------------------------------------------------
  // CONTEXT-AWARE COLOURS — the tab's accent follows the chemistry
  // family of the current crop × pest selection (IRAC → red,
  // FRAC → golden, HRAC → green, mixed → neutral green).
  // -----------------------------------------------------------------
  const contextScheme = useMemo<'irac' | 'frac' | 'hrac' | ''>(() => {
    const counts: Record<'IRAC' | 'FRAC' | 'HRAC', number> = { IRAC: 0, FRAC: 0, HRAC: 0 };
    eligibleProducts.forEach((p) => {
      const s = schemeOf(p.moaCode);
      if (s) counts[s] += 1;
    });
    const present = (Object.entries(counts) as ['IRAC' | 'FRAC' | 'HRAC', number][])
      .filter(([, n]) => n > 0)
      .sort((a, b) => b[1] - a[1]);
    if (!present.length) return '';
    if (present.length > 1 && present[0][1] === present[1][1]) return '';
    return present[0][0].toLowerCase() as 'irac' | 'frac' | 'hrac';
  }, [eligibleProducts]);

  // Arsenal grouped per scheme family, rows in official table order.
  const schemeTables = useMemo(() => {
    const families: ('IRAC' | 'FRAC' | 'HRAC')[] = ['IRAC', 'FRAC', 'HRAC'];
    return families
      .map((scheme) => ({
        scheme,
        rows: availableMoAGroups
          .filter(([code]) => code.startsWith(scheme))
          .sort(([a], [b]) => moaCompare(a, b))
      }))
      .filter((t) => t.rows.length > 0);
  }, [availableMoAGroups]);

  const unclassifiedGroups = useMemo(
    () => availableMoAGroups.filter(([code]) => !schemeOf(code)),
    [availableMoAGroups]
  );

  // Multi-step spray rotation sequence state (up to 4 sprays)
  const [rotationSteps, setRotationSteps] = useState<{
    sprayNumber: number;
    sprayWindow: string;
    productId: string;
  }[]>([
    { sprayNumber: 1, sprayWindow: 'শৈশবাবস্থা / চারা রোপণ', productId: '' },
    { sprayNumber: 2, sprayWindow: 'সক্রিয় শীর্ষবিভাজন / বৃদ্ধি', productId: '' },
    { sprayNumber: 3, sprayWindow: 'মুকুল / শীষ / ফল গঠন', productId: '' }
  ]);

  // Auto-populate initial rotation steps when eligible products change
  React.useEffect(() => {
    if (eligibleProducts.length >= 2) {
      // Pick two products with distinct MoA codes if possible
      const p1 = eligibleProducts[0];
      const p2 = eligibleProducts.find((p) => p.moaCode !== p1.moaCode) || eligibleProducts[1] || p1;
      const p3 = eligibleProducts.find((p) => p.moaCode !== p1.moaCode && p.moaCode !== p2.moaCode) || p1;

      setRotationSteps([
        { sprayNumber: 1, sprayWindow: language === 'bn' ? 'প্রাথমিক বৃদ্ধি / চারা অবস্থা' : 'Early Vegetative / Seedling', productId: p1.id },
        { sprayNumber: 2, sprayWindow: language === 'bn' ? 'কুশি / দ্রুত দৈহিক বৃদ্ধি' : 'Active Tillering / Growth', productId: p2.id },
        { sprayNumber: 3, sprayWindow: language === 'bn' ? 'ফুল / শীষ / ফল গঠন পর্যায়' : 'Flowering / Panicle / Fruit', productId: p3.id }
      ]);
    } else if (eligibleProducts.length === 1) {
      setRotationSteps([
        { sprayNumber: 1, sprayWindow: language === 'bn' ? 'একক প্রয়োগ' : 'Primary Application', productId: eligibleProducts[0].id }
      ]);
    }
  }, [eligibleProducts, language]);

  // Analyze the sequence for MoA conflicts
  const analyzedSteps: SprayRotationStep[] = useMemo(() => {
    return rotationSteps.map((step, idx) => {
      const prod = products.find((p) => p.id === step.productId);
      if (!prod) {
        return {
          sprayNumber: step.sprayNumber,
          sprayWindow: step.sprayWindow,
          productId: '',
          productName: language === 'bn' ? 'অনির্বাচিত' : 'Unassigned',
          commonName: '',
          moaCode: '',
          moaGroup: '',
          status: 'valid'
        };
      }

      // Check if previous step had the same MoA code
      let conflict = false;
      let reason = '';
      if (idx > 0) {
        const prevStep = rotationSteps[idx - 1];
        const prevProd = products.find((p) => p.id === prevStep.productId);
        if (prevProd && prod.moaCode && prevProd.moaCode && prod.moaCode === prevProd.moaCode) {
          conflict = true;
          reason = language === 'bn'
            ? `ধারাবাহিক স্প্রে #${formatNum(idx)} ও #${formatNum(idx + 1)} উভয় ক্ষেত্রেই একই MoA ${prod.moaCode} ব্যবহৃত হয়েছে! একই ক্রিয়াপদ্ধতি বারবার ব্যবহারে বালাইয়ে প্রতিরোধ ক্ষমতা বা রেজিসট্যান্স দ্রুত তৈরি হয়।`
            : `Consecutive spray #${idx} & #${idx + 1} both use MoA ${prod.moaCode}. Repeated applications of the same mode of action select for resistant mutant strains!`;
        }
      }

      return {
        sprayNumber: step.sprayNumber,
        sprayWindow: step.sprayWindow,
        productId: prod.id,
        productName: prod.tradeName,
        commonName: prod.commonName,
        moaCode: prod.moaCode || 'অজানা',
        moaGroup: prod.moaGroup || 'শ্রেণিবহির্ভূত',
        status: conflict ? 'conflict' : 'valid',
        conflictReason: reason
      };
    });
  }, [rotationSteps, products, language, formatNum]);

  const hasConflict = analyzedSteps.some((s) => s.status === 'conflict');

  // ---------------------------------------------------------------------------
  // Searchable dynamic dropdown option lists (crop / pest / per-spray product)
  // Mirrors the NextSprayGuide combobox: every picker in this tab is type-to-
  // filter, so no plain native <select> remains in the MoA Rotation tab.
  // ---------------------------------------------------------------------------
  const cropOptions = useMemo<SearchableSelectOption[]>(
    () => availableCrops.map((c) => ({ value: c, label: transCrop(c), keywords: c })),
    [availableCrops, transCrop]
  );

  const pestOptions = useMemo<SearchableSelectOption[]>(
    () => availablePests.map((p) => ({ value: p, label: transPest(p), keywords: p })),
    [availablePests, transPest]
  );

  const productOptions = useMemo<SearchableSelectOption[]>(
    () =>
      eligibleProducts.map((p) => ({
        value: p.id,
        label: p.tradeName,
        sublabel: `${p.commonName} · ${p.registrationNo}`,
        badge: p.moaCode || 'UN',
        badgeClass: moaBadgeClass(p.moaCode),
        keywords: `${p.commonName} ${p.moaCode || ''} ${p.moaGroup || ''} ${p.registrationNo}`
      })),
    [eligibleProducts]
  );

  return (
    <div id="rotation-planner-container" className={`acg-rp${contextScheme ? ` acg-rp--ctx-${contextScheme}` : ''}`}>
      <div className="acg-rp-shell">
        {/* -------------------------------------------- EDITORIAL HEADER --
            The old blue gradient banner is gone. The tab now opens the way
            the Home tab does: red mono eyebrow, pain-point Hind Siliguri
            headline, and the resistance story in the farmer's own words.
            On mobile the lede + framework chips + trust list collapse
            behind a "show details" toggle; md+ always shows them. */}
        <header className={`acg-rp-head${headOpen ? ' acg-rp-head--open' : ''}`}>
          <div>
            <p className="acg-rp-eyebrow">
              <span className="acg-rp-dot" />
              {language === 'bn'
                ? 'ঘূর্ণ পরিবর্তন ইঞ্জিন • IRAC – FRAC – HRAC'
                : 'Rotation engine • IRAC – FRAC – HRAC'}
            </p>
            <h1 className="acg-rp-h1">
              {language === 'bn' ? (
                <>একই ওষুধ বারবার — <em>আর কাজ করে না।</em></>
              ) : (
                <>Same spray, again and again — <em>and it stops working.</em></>
              )}
            </h1>

            <div className="acg-rp-head__more">
              <p className="acg-rp-lede">
                {language === 'bn'
                  ? 'পরপর স্প্রেতে একই MoA গ্রুপ গেলে বালাই প্রতিরোধী হয়ে ওঠে — ওষুধ দোষ দেয় না, ক্রমই দোষী। ফসল ও বালাই বেছে নিন, প্রতিটি স্প্রে উইন্ডোতে ভিন্ন ক্রিয়াপদ্ধতির ওষুধ বসান — সংঘাত ধরা পড়লেই লাল সতর্কতা দেখাবে এখানেই।'
                  : 'Repeat the same Mode-of-Action group in consecutive sprays and the pest turns resistant — the product is not at fault, the sequence is. Pick your crop and pest, assign a different chemistry to each spray window, and get an instant red conflict alert the moment two consecutive sprays share a group.'}
              </p>

              <div className="acg-rp-frame">
                <span className="acg-rp-frame__chip">
                  IRAC — {language === 'bn' ? 'কীটনাশক' : 'Insecticides'}
                </span>
                <span className="acg-rp-frame__chip acg-rp-frame__chip--gold">
                  FRAC — {language === 'bn' ? 'ছত্রাকনাশক' : 'Fungicides'}
                </span>
                <span className="acg-rp-frame__chip acg-rp-frame__chip--green">
                  HRAC — {language === 'bn' ? 'আগাছানাশক' : 'Herbicides'}
                </span>
              </div>

              <ul className="acg-rp-trust">
                <li>
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  {language === 'bn'
                    ? 'প্রতিটি স্প্রে উইন্ডোর MoA কোড স্বয়ংক্রিয়ভাবে যাচাই হয়'
                    : 'Every spray window gets its MoA code validated automatically'}
                </li>
                <li>
                  <AlertTriangle className="w-3.5 h-3.5" />
                  {language === 'bn'
                    ? 'সংঘাত শনাক্ত হলে সঙ্গে সঙ্গে লাল রেজিসট্যান্স সতর্কতা'
                    : 'Instant red resistance alert the moment a conflict is detected'}
                </li>
                <li>
                  <FileDown className="w-3.5 h-3.5" />
                  {language === 'bn'
                    ? 'চূড়ান্ত ঘূর্ণন শিডিউল এক ক্লিকে PDF ডাউনলোড'
                    : 'Export the final rotation schedule as a one-click PDF'}
                </li>
              </ul>
            </div>

            <button
              type="button"
              className="acg-rp-head__toggle"
              aria-expanded={headOpen}
              onClick={() => setHeadOpen((o) => !o)}
            >
              {headOpen
                ? (language === 'bn' ? 'কমিয়ে দেখুন' : 'Show less')
                : (language === 'bn' ? 'বিস্তারিত দেখুন' : 'Show details')}
              <ChevronDown className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Window-strategy sticker card — teaches this tab's core rule the
              way the Home stamp teaches the frameworks. Desktop only. */}
          <aside className="acg-rp-win" aria-hidden="true">
            <p className="acg-rp-win__kicker">
              {language === 'bn'
                ? 'উইন্ডো স্ট্র্যাটেজি — কীভাবে ঘুরিয়ে স্প্রে করবেন'
                : 'Window strategy — what a safe rotation looks like'}
            </p>
            <div className="acg-rp-win__row">
              <span className="acg-rp-win__num">{language === 'bn' ? '০১' : '01'}</span>
              <span className="acg-rp-chip acg-rp-chip--gold">FRAC 11</span>
              <span className="acg-rp-win__label">
                {language === 'bn' ? 'প্রথম স্প্রে — একক-সাইট সিস্টেমিক' : 'First spray — single-site systemic'}
              </span>
            </div>
            <div className="acg-rp-win__row">
              <span className="acg-rp-win__num">{language === 'bn' ? '০২' : '02'}</span>
              <span className="acg-rp-chip acg-rp-chip--green">FRAC M03</span>
              <span className="acg-rp-win__label">
                {language === 'bn' ? 'দ্বিতীয় স্প্রে — মাল্টি-সাইট রক্ষাকবচ' : 'Second spray — multi-site anchor'}
              </span>
            </div>
            <div className="acg-rp-win__row">
              <span className="acg-rp-win__num">{language === 'bn' ? '০৩' : '03'}</span>
              <span className="acg-rp-chip acg-rp-chip--gold">FRAC 7</span>
              <span className="acg-rp-win__label">
                {language === 'bn' ? 'তৃতীয় স্প্রে — সম্পূর্ণ ভিন্ন গ্রুপ' : 'Third spray — a completely different group'}
              </span>
            </div>
            <p className="acg-rp-win__foot">
              <CheckCircle2 className="w-4 h-4" />
              {language === 'bn'
                ? 'প্রতি উইন্ডোতে ভিন্ন MoA — রেজিসট্যান্স ঝুঁকি নেই'
                : 'A different MoA in every window — no resistance pressure'}
            </p>
          </aside>
        </header>

        {/* ============================================================
            DYNAMIC FIELD GUIDE CARD (MoA Rotation tab)
            The next-spray recommendation engine AND the Interactive
            Spray Rotation Sequence builder live TOGETHER inside one
            aligned card. All callbacks route to the global modals
            (datasheet, dosage calculator, safety).
            ============================================================ */}
        <div className="acg-rp-main">
          <NextSprayGuide
            products={products}
            onSelectProduct={onSelectProduct}
            onOpenCalculator={onOpenCalculator}
            onOpenSafety={onOpenSafety}
          >
            {/* Section divider: mono label on hairlines — the editorial
                transition from the next-spray engine to the season
                rotation builder. */}
            <div className="acg-rp-divider">
              <span className="acg-rp-divider__label">
                <Layers className="w-3 h-3" />
                {language === 'bn'
                  ? 'অথবা সম্পূর্ণ মৌসুমের স্প্রে ক্রম তৈরি করুন'
                  : 'Or build your full-season rotation'}
              </span>
            </div>

            {/* ---- Step 1: crop + pest scope pickers + DAE advisory ---- */}
            <div className="acg-rp-panel">
              <p className="acg-rp-panel__kicker">
                {language === 'bn' ? 'ধাপ ১ — সুযোগ নির্ধারণ' : 'Step 1 — set the scope'}
              </p>
              <h3 className="acg-rp-panel__title">
                {language === 'bn' ? 'ফসল ও বালাই বেছে নিন' : 'Pick the crop and the target pest'}
              </h3>

              <div className="acg-rp-scope">
                <div>
                  <p className="acg-rp-fieldlabel">
                    <Sprout className="w-3.5 h-3.5" />
                    {language === 'bn' ? '১. ফসল নির্বাচন করুন' : '1. Select target crop'}
                  </p>
                  <SearchableSelect
                    id="rotation-crop-select"
                    value={selectedCrop}
                    onChange={(v) => setSelectedCrop(v)}
                    options={cropOptions}
                    ariaLabel={language === 'bn' ? 'ফসল নির্বাচন' : 'Select target crop'}
                    placeholder={language === 'bn' ? 'ফসল সার্চ করুন…' : 'Search crops…'}
                    emptyLabel={language === 'bn' ? 'কোনো মিল পাওয়া যায়নি' : 'No crops match your search'}
                  />
                </div>

                <div>
                  <p className="acg-rp-fieldlabel acg-rp-fieldlabel--red">
                    <Bug className="w-3.5 h-3.5" />
                    {language === 'bn' ? '২. লক্ষ্য বালাই / রোগ / আগাছা নির্বাচন করুন' : '2. Select target pest / disease / weed'}
                  </p>
                  <SearchableSelect
                    id="rotation-pest-select"
                    value={selectedPest}
                    onChange={(v) => setSelectedPest(v)}
                    options={pestOptions}
                    ariaLabel={language === 'bn' ? 'লক্ষ্য বালাই নির্বাচন' : 'Select target pest'}
                    placeholder={language === 'bn' ? 'বালাই / রোগ সার্চ করুন…' : 'Search pests / diseases…'}
                    emptyLabel={language === 'bn' ? 'কোনো মিল পাওয়া যায়নি' : 'No pests match your search'}
                  />
                </div>
              </div>

              <div className="acg-rp-advisory">
                <ShieldAlert className="w-4 h-4" />
                <div>
                  <strong>
                    {language === 'bn'
                      ? 'অফিসিয়াল ডিএই পরামর্শ সতর্কতা ও নির্দেশিকা:'
                      : 'Official DAE Rotation Advisory Disclaimer:'}
                  </strong>
                  <p>
                    {language === 'bn'
                      ? 'এখানে তৈরিকৃত আবর্তন বা স্প্রে শিডিউল শুধুমাত্র বালাই প্রতিরোধ ব্যবস্থাপনার বৈজ্ঞানিক নীতির ওপর ভিত্তি করে তৈরি। বাস্তবে জমিতে ওষুধ ছিটানোর পূর্বে সর্বদা আপনার স্থানীয় উপ-সহকারী কৃষি কর্মকর্তা বা কৃষি সম্প্রসারণ অধিদপ্তর (DAE) কর্মকর্তার সরাসরি অনুমোদন ও প্রেসক্রিপশন গ্রহণ করুন।'
                      : 'The generated spray sequence is based purely on anti-resistance scientific principles. Always consult with your local Department of Agricultural Extension (DAE) officials or agricultural field extension officers before execution.'}
                  </p>
                </div>
              </div>
            </div>

            {/* ---- Step 2: approved MoA groups for the selection ---- */}
            <div className="acg-rp-panel acg-rp-panel--accent">
              <p className="acg-rp-panel__kicker">
                {language === 'bn' ? 'ধাপ ২ — অস্ত্রাগার, শ্রেণি-ছক অনুসারে' : 'Step 2 — your arsenal, in classification-table order'}
              </p>
              <h3 className="acg-rp-panel__title">
                {language === 'bn'
                  ? `${transCrop(selectedCrop)}-এ ${transPest(selectedPest)}-এর জন্য অনুমোদিত MoA গ্রুপসমূহ`
                  : `Approved MoA groups for ${transPest(selectedPest)} on ${transCrop(selectedCrop)}`}
              </h3>
              <p className="acg-rp-panel__sub">
                {language === 'bn'
                  ? `মোট ${formatNum(eligibleProducts.length)} টি নিবন্ধিত বালাইনাশক এবং ${formatNum(availableMoAGroups.length)} টি স্বতন্ত্র MoA গ্রুপ — আন্তর্জাতিক শ্রেণিবিন্যাস ছকের ক্রমে সাজানো।`
                  : `${eligibleProducts.length} registered products across ${availableMoAGroups.length} distinct MoA groups — listed in official classification-table order.`}
              </p>

              {/* Risk legend — the colours on every row badge, explained. */}
              <div className="acg-rp-risklegend">
                <span className="acg-rp-risk acg-rp-risk--high">{language === 'bn' ? 'উচ্চ ঝুঁকি' : 'High risk'}</span>
                <span className="acg-rp-risklegend__sep">·</span>
                <span className="acg-rp-risk acg-rp-risk--mid">{language === 'bn' ? 'মধ্যম ঝুঁকি' : 'Medium risk'}</span>
                <span className="acg-rp-risklegend__sep">·</span>
                <span className="acg-rp-risk acg-rp-risk--low">{language === 'bn' ? 'নিম্ন ঝুঁকি' : 'Low risk'}</span>
                <span className="acg-rp-risklegend__note">
                  {language === 'bn' ? '— ঝুঁকি = রেজিসট্যান্স তৈরির প্রবণতা' : '— risk = tendency to develop resistance'}
                </span>
              </div>

              {/* Crop-stage strategy cards — the same three windows the
                  Step-3 builder uses, so grouping and workflow match. */}
              <div className="acg-rp-stages">
                {[
                  {
                    num: language === 'bn' ? '০১' : '01',
                    title: language === 'bn' ? 'চারা / প্রাথমিক বৃদ্ধি' : 'Seedling / early growth',
                    body: language === 'bn'
                      ? 'প্রতিরক্ষামূলক ভিত্তি: মাল্টি-সাইট (M-গ্রুপ) বা নিম্ন-ঝুঁকির গ্রুপ দিয়ে শুরু করুন; ক্ষতিকারক সীমা (ETL) অতিক্রম করলেই স্প্রে।'
                      : 'Protective base: start with a multi-site (M) or low-risk group; spray once the ETL is crossed.'
                  },
                  {
                    num: language === 'bn' ? '০২' : '02',
                    title: language === 'bn' ? 'সক্রিয় বৃদ্ধি / কুশি' : 'Active growth / tillering',
                    body: language === 'bn'
                      ? 'সর্বোচ্চ কার্যকারিতার উইন্ডো: একটি শক্তিশালী একক-সাইট সিস্টেমিক গ্রুপ বেছে নিন এবং কোন গ্রুপ ব্যবহার করলেন তা লিখে রাখুন।'
                      : 'Peak-efficacy window: pick one strong single-site systemic and record which group you used.'
                  },
                  {
                    num: language === 'bn' ? '০৩' : '03',
                    title: language === 'bn' ? 'মুকুল / শীষ / ফল গঠন' : 'Flowering / panicle / fruit set',
                    body: language === 'bn'
                      ? 'সম্পূর্ণ ভিন্ন গ্রুপে ঘোরান এবং ফসল তোলার অপেক্ষাকাল (PHI) মেনে চলুন।'
                      : 'Rotate to a completely different group and respect the pre-harvest interval (PHI).'
                  }
                ].map((stage, i) => {
                  const liveChip = analyzedSteps[i]?.moaCode;
                  return (
                    <div key={stage.num} className="acg-rp-stage">
                      <div className="acg-rp-stage__top">
                        <span className="acg-rp-stage__num">{stage.num}</span>
                        <span className="acg-rp-stage__title">{stage.title}</span>
                      </div>
                      <p className="acg-rp-stage__body">{stage.body}</p>
                      {liveChip && (
                        <span className="acg-rp-stage__live">
                          <i className={schemeChipClass(liveChip)}>{liveChip}</i>
                          {language === 'bn' ? 'এই উইন্ডোতে নির্বাচিত' : 'assigned below'}
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Pest life-cycle strip — one row per chemistry family present,
                  so the grouping mirrors how resistance actually builds. */}
              {schemeTables.map(({ scheme }) => {
                const cycle = {
                  IRAC: {
                    stages: language === 'bn' ? ['ডিম', 'কীড় / নিম্ফ', 'পিউপা', 'প্রাপ্তবয়স্ক'] : ['Egg', 'Larva / nymph', 'Pupa', 'Adult'],
                    tip: language === 'bn'
                      ? 'একই প্রজন্মের (~৩০ দিন) ভেতরে একই MoA নয় — অল্প বয়সী কীড়/নিম্ফে স্প্রে সবচেয়ে কার্যকর।'
                      : 'Never repeat one MoA within a generation (~30 days) — early larva / nymph is the most effective window.'
                  },
                  FRAC: {
                    stages: language === 'bn' ? ['স্পোর অঙ্কুরোদ্গম', 'সংক্রমণ', 'উপসর্গ', 'বীজগণিত বিস্তার'] : ['Spore germination', 'Infection', 'Symptoms', 'Sporulation'],
                    tip: language === 'bn'
                      ? 'সংক্রমণের আগে মাল্টি-সাইট প্রতিরক্ষামূলক (M-গ্রুপ), প্রাথমিক উপসর্গে একক-সাইট সিস্টেমিক — পরের প্রজন্মে গ্রুপ বদলান।'
                      : 'Multi-site protectants (M groups) before infection, single-site systemics at early symptoms — then switch groups next generation.'
                  },
                  HRAC: {
                    stages: language === 'bn' ? ['অঙ্কুরোদ্গম-পূর্ব', 'চারা', 'কুশি', 'পরিণত'] : ['Pre-emergence', 'Seedling', 'Tillering', 'Mature'],
                    tip: language === 'bn'
                      ? 'অঙ্কুরোদ্গম-পূর্ব আগাছানাশকের পরে ভিন্ন HRAC গ্রুপের পোস্ট-ইমার্জেন্ট প্রয়োগ করুন।'
                      : 'Follow pre-emergence chemistry with a post-emergence spray from a different HRAC group.'
                  }
                }[scheme];
                return (
                  <div key={scheme} className={`acg-rp-cycle acg-rp-cycle--${scheme.toLowerCase()}`}>
                    <p className="acg-rp-cycle__label">
                      {language === 'bn'
                        ? `${scheme === 'IRAC' ? 'কীট' : scheme === 'FRAC' ? 'রোগ' : 'আগাছা'}-এর জীবনচক্র — কখন স্প্রে কাজ করে`
                        : `${scheme === 'IRAC' ? 'Insect' : scheme === 'FRAC' ? 'Disease' : 'Weed'} life cycle — when a spray actually works`}
                    </p>
                    <div className="acg-rp-cycle__stages">
                      {cycle.stages.map((s, i) => (
                        <React.Fragment key={s}>
                          {i > 0 && <span className="acg-rp-cycle__arrow">→</span>}
                          <span className="acg-rp-cycle__stage">{s}</span>
                        </React.Fragment>
                      ))}
                    </div>
                    <p className="acg-rp-cycle__tip">{cycle.tip}</p>
                  </div>
                );
              })}

              {/* Classification tables — one per chemistry family, rows in
                  official code-list order. Scrolls horizontally on mobile. */}
              {schemeTables.map(({ scheme, rows }) => (
                <div key={scheme} className={`acg-rp-tgroup acg-rp-tgroup--${scheme.toLowerCase()}`}>
                  <div className="acg-rp-tgroup__head">
                    <span className={schemeChipClass(`${scheme} 0`)}>{scheme}</span>
                    <span className="acg-rp-tgroup__count">
                      {language === 'bn'
                        ? `${formatNum(rows.length)} টি গ্রুপ`
                        : `${rows.length} groups`}
                    </span>
                  </div>
                  <div className="acg-rp-tablewrap">
                    <table className="acg-rp-table">
                      <thead>
                        <tr>
                          <th>{language === 'bn' ? 'MoA কোড' : 'MoA code'}</th>
                          <th>{language === 'bn' ? 'রাসায়নিক গোত্র' : 'Chemical group'}</th>
                          <th>{language === 'bn' ? 'ক্রিয়ার লক্ষ্য' : 'Target site'}</th>
                          <th>{language === 'bn' ? 'ঝুঁকি' : 'Risk'}</th>
                          <th>{language === 'bn' ? 'ঘূর্ণন সঙ্গী' : 'Rotation partners'}</th>
                          <th>{language === 'bn' ? 'পণ্য' : 'Products'}</th>
                        </tr>
                      </thead>
                      <tbody>
                        {rows.map(([code, prods]) => {
                          const info = MOA_DATABASE.find((m) => m.code === code);
                          const partners = strategyPartners(code);
                          return (
                            <tr key={code}>
                              <td><span className={schemeChipClass(code)}>{code}</span></td>
                              <td className="acg-rp-table__name">
                                {language === 'bn'
                                  ? (info?.nameBn || prods[0].moaGroup || '—')
                                  : (info?.name || prods[0].moaGroup || '—')}
                              </td>
                              <td className="acg-rp-table__site">
                                {language === 'bn'
                                  ? (info?.targetSiteBn || '—')
                                  : (info?.targetSite || '—')}
                              </td>
                              <td>
                                <span className={`acg-rp-risk acg-rp-risk--${riskBucket(info?.resistanceRisk)}`}>
                                  {riskLabel(info?.resistanceRisk, language === 'bn' ? 'bn' : 'en')}
                                </span>
                              </td>
                              <td>
                                {partners.length > 0 ? (
                                  <span className="acg-rp-table__partners">
                                    {partners.map((p) => (
                                      <i key={p}>{p}</i>
                                    ))}
                                  </span>
                                ) : '—'}
                              </td>
                              <td className="acg-rp-table__prods">
                                {formatNum(prods.length)}
                                <span title={prods.map((p) => p.tradeName).join(', ')}>
                                  {' '}· {prods.slice(0, 2).map((p) => p.tradeName).join(', ')}{prods.length > 2 ? '…' : ''}
                                </span>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              ))}

              {unclassifiedGroups.length > 0 && (
                <p className="acg-rp-unclass">
                  {language === 'bn'
                    ? `${formatNum(unclassifiedGroups.reduce((n, [, ps]) => n + ps.length, 0))} টি পণ্যের নিবন্ধন-তালিকায় MoA কোড পাওয়া যায়নি (${unclassifiedGroups.flatMap(([, ps]) => ps.slice(0, 2).map((p) => p.tradeName)).slice(0, 3).join(', ')}) — প্যাকেটের লেবেল দেখে গ্রুপ যাচাই করুন।`
                    : `${unclassifiedGroups.reduce((n, [, ps]) => n + ps.length, 0)} product(s) carry no MoA code in the register (${unclassifiedGroups.flatMap(([, ps]) => ps.slice(0, 2).map((p) => p.tradeName)).slice(0, 3).join(', ')}) — verify the group from the pack label.`}
                </p>
              )}
            </div>

            {/* ---- Step 3: interactive spray rotation sequence ---- */}
            <div className="acg-rp-panel">
              <div className="acg-rp-panel__headrow">
                <div>
                  <p className="acg-rp-panel__kicker">
                    {language === 'bn' ? 'ধাপ ৩ — ক্রম বসান' : 'Step 3 — set the sequence'}
                  </p>
                  <h3 className="acg-rp-panel__title">
                    {language === 'bn' ? 'ইন্টারেক্টিভ স্প্রে আবর্তন ক্রম' : 'Interactive Spray Rotation Sequence'}
                  </h3>
                  <p className="acg-rp-panel__sub">
                    {language === 'bn'
                      ? 'ফসলের বিভিন্ন বৃদ্ধি ধাপে বিকল্প রাসায়নিক গ্রুপ নির্বাচন করে পূর্ণাঙ্গ স্প্রে শিডিউল তৈরি করুন।'
                      : 'Build a sequential spray schedule across crop development stages to maintain chemical susceptibility.'}
                  </p>
                </div>

                <button
                  id="export-rotation-pdf-btn"
                  onClick={() => exportRotationSchedulePDF(selectedCrop, selectedPest, analyzedSteps)}
                  className="acg-rp-btn"
                >
                  <FileDown className="w-4 h-4" />
                  <span>
                    {language === 'bn' ? 'শিডিউল ডাউনলোড (PDF)' : 'Export Schedule (PDF)'}
                  </span>
                </button>
              </div>

              {/* Verdict banner — conflict (red) or validated (green) */}
              {hasConflict ? (
                <div className="acg-rp-verdict acg-rp-verdict--bad">
                  <AlertTriangle className="w-4 h-4" />
                  <div>
                    <h4>
                      {language === 'bn'
                        ? 'রেজিসট্যান্স সতর্কতা: একই MoA গ্রুপ একাধিকবার শনাক্ত হয়েছে!'
                        : 'Resistance Alert: Repeated Mode of Action Detected!'}
                    </h4>
                    <p>
                      {language === 'bn'
                        ? 'আপনি পরপর দুটি স্প্রেতে একই MoA গ্রুপের কীটনাশক নির্বাচন করেছেন। একই ক্রিয়াপদ্ধতির বিষ বারবার প্রয়োগ করলে বালাই খুব দ্রুত বিষের প্রতি প্রতিরোধী হয়ে ওঠে। লাল চিহ্নিত স্প্রেতে ড্রপডাউন থেকে অন্য কোনো MoA কোডের ওষুধ বাছাই করুন।'
                        : 'You have selected identical MoA groups in consecutive spray windows. Using the same chemical mode of action repeatedly will accelerate pest resistance. Please switch the flagged spray to a product with a different MoA code from the dropdown.'}
                    </p>
                  </div>
                </div>
              ) : (
                <div className="acg-rp-verdict acg-rp-verdict--ok">
                  <CheckCircle2 className="w-4 h-4" />
                  <div>
                    <h4>
                      {language === 'bn'
                        ? 'বিজ্ঞানসম্মত রেজিসট্যান্স-মুক্ত স্প্রে ক্রম নির্ভুলভাবে যাচাইকৃত'
                        : 'Optimal Anti-Resistance Sequence Validated'}
                    </h4>
                    <p>
                      {language === 'bn'
                        ? 'প্রতিটি ধারাবাহিক স্প্রে ভিন্ন ভিন্ন জৈবরাসায়নিক সাইটকে লক্ষ্যবস্তু করে। এই আবর্তন বালাই দমন ক্ষমতা দীর্ঘস্থায়ী ও সর্বোচ্চ রাখবে।'
                        : 'Each sequential spray window employs a distinct biochemical mode of action. This rotation maximizes control efficacy and safeguards chemical life.'}
                    </p>
                  </div>
                </div>
              )}

              {/* Steps */}
              <div className="acg-rp-steps">
                {rotationSteps.map((step, index) => {
                  const analyzed = analyzedSteps[index];
                  const currentProd = products.find((p) => p.id === step.productId);

                  return (
                    <div
                      key={step.sprayNumber}
                      className={`acg-rp-step${analyzed.status === 'conflict' ? ' acg-rp-step--conflict' : ''}`}
                    >
                      <div className="acg-rp-step__top">
                        <div className="acg-rp-step__id">
                          <span className="acg-rp-step__num">{formatNum(step.sprayNumber)}</span>
                          <input
                            type="text"
                            value={step.sprayWindow}
                            onChange={(e) => {
                              const next = [...rotationSteps];
                              next[index].sprayWindow = e.target.value;
                              setRotationSteps(next);
                            }}
                            className="acg-rp-step__win"
                            aria-label={
                              language === 'bn'
                                ? `স্প্রে ${formatNum(step.sprayNumber)}-এর উইন্ডো নাম`
                                : `Spray #${step.sprayNumber} window name`
                            }
                          />
                        </div>

                        <div className="acg-rp-step__flags">
                          {analyzed.moaCode && (
                            <span className={schemeChipClass(analyzed.moaCode)}>
                              {analyzed.moaCode}
                            </span>
                          )}
                          {analyzed.status === 'conflict' && (
                            <span className="acg-rp-step__conflictchip">
                              <AlertTriangle className="w-3 h-3" />
                              {language === 'bn' ? 'সংঘাত' : 'Conflict'}
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="acg-rp-step__grid">
                        <div>
                          <p className="acg-rp-fieldlabel">
                            {language === 'bn'
                              ? `স্প্রে #${formatNum(step.sprayNumber)}-এর জন্য বালাইনাশক নির্বাচন`
                              : `Choose chemical for spray #${step.sprayNumber}`}
                          </p>
                          <SearchableSelect
                            value={step.productId}
                            onChange={(v) => {
                              const next = [...rotationSteps];
                              next[index].productId = v;
                              setRotationSteps(next);
                            }}
                            options={productOptions}
                            size="sm"
                            ariaLabel={language === 'bn' ? `স্প্রে ${formatNum(step.sprayNumber)}-এর বালাইনাশক` : `Chemical for spray #${step.sprayNumber}`}
                            placeholder={
                              language === 'bn'
                                ? 'বালাইনাশক সার্চ করুন (ব্র্যান্ড / উপাদান / MoA)…'
                                : 'Search chemical (brand / AI / MoA)…'
                            }
                            emptyLabel={
                              language === 'bn' ? 'কোনো মিল পাওয়া যায়নি' : 'No chemicals match your search'
                            }
                          />
                        </div>

                        {currentProd && (
                          <div className="acg-rp-step__prodinfo">
                            <div>
                              <b>{currentProd.tradeName}</b>
                              <p className="acg-rp-step__proddose">
                                {currentProd.commonName} | {language === 'bn' ? 'মাত্রা:' : 'Rate:'} {currentProd.dosageRate}
                              </p>
                            </div>
                            <span className="acg-rp-step__regno">{currentProd.registrationNo}</span>
                          </div>
                        )}
                      </div>

                      {analyzed.conflictReason && (
                        <p className="acg-rp-step__reason">{analyzed.conflictReason}</p>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Sequence control actions */}
              <div className="acg-rp-stepctrl">
                {rotationSteps.length < 4 && (
                  <button
                    onClick={() => {
                      setRotationSteps([
                        ...rotationSteps,
                        {
                          sprayNumber: rotationSteps.length + 1,
                          sprayWindow: language === 'bn' ? `স্প্রে পর্যায় #${formatNum(rotationSteps.length + 1)}` : `Spray Window #${rotationSteps.length + 1}`,
                          productId: eligibleProducts[0]?.id || ''
                        }
                      ]);
                    }}
                    className="acg-rp-linkbtn"
                  >
                    + {language === 'bn' ? 'আরেকটি প্রয়োগ পর্যায় যোগ করুন' : 'Add another application window'}
                  </button>
                )}

                {rotationSteps.length > 2 && (
                  <button
                    onClick={() => {
                      setRotationSteps(rotationSteps.slice(0, rotationSteps.length - 1));
                    }}
                    className="acg-rp-linkbtn acg-rp-linkbtn--muted"
                  >
                    {language === 'bn' ? 'সর্বশেষ পর্যায়টি বাতিল করুন' : 'Remove last window'}
                  </button>
                )}
              </div>
            </div>
          </NextSprayGuide>
        </div>

        {/* Collapsible user guide — kept BELOW the workflow card, wrapped in
            the Home tab's emerald → official-green remap scope. */}
        <div className="acg-guide-wrap">
          <CollapsibleUserGuide
            pageKey="rotation"
            titleEn="Scientific Spray Rotation Guide"
            titleBn="বালাইনাশক বৈজ্ঞানিক আবর্তন নির্দেশিকা"
            subtitleEn="Understand how to rotate chemical groups to prevent insect and fungal resistance mutation."
            subtitleBn="কীটপতঙ্গ ও ছত্রাকের রোগ প্রতিরোধ ক্ষমতা বা মিউটেশন এড়াতে রাসায়নিক গোত্র পরিবর্তনের নিয়ম।"
            stepsEn={[
              "Select your target Crop (e.g., Rice, Tomato) and then select the target Pest or Disease you wish to control.",
              "The planner will automatically load a recommended sequence of spraying windows (Spray #1, #2, #3, etc.).",
              "Choose a pesticide brand for each spray window using the searchable dynamic dropdown fields - type to filter by brand name, active ingredient, registration number, or MoA code.",
              "Observe the validation status indicators: the system automatically computes IRAC (insecticide), FRAC (fungicide), or HRAC (herbicide) codes.",
              "If consecutive windows use the same active group code, a red Conflict warning will trigger - change one chemical to resolve."
            ]}
            stepsBn={[
              "প্রথমে লক্ষ্যভুক্ত ফসল (যেমন: ধান, টমেটো) এবং এরপর যে বালাই বা রোগটি দমন করতে চান সেটি নির্বাচন করুন।",
              "ক্যালকুলেটরটি স্বয়ংক্রিয়ভাবে একটি প্রস্তাবিত পর্যায়ক্রমিক স্প্রে উইন্ডো বা সূচি লোড করবে (স্প্রে #১, #২, #৩ ইত্যাদি)।",
              "প্রতিটি স্প্রে উইন্ডোর সার্চযোগ্য ডায়নামিক ড্রপডাউন থেকে ব্র্যান্ডের নাম, উপাদান, রেজি নম্বর বা MoA কোড টাইপ করে খুঁজে আপনার পছন্দের বাণিজ্যিক বালাইনাশক নির্বাচন করুন।",
              "স্ট্যাটাস ইন্ডিকেটরগুলো লক্ষ করুন: সিস্টেম স্বয়ংক্রিয়ভাবে উপাদানগুলোর IRAC, FRAC বা HRAC বৈজ্ঞানিক গ্রুপ কোড হিসাব করবে।",
              "পরপর দুটি স্প্রে-তে যদি একই গোত্র বা কোড ব্যবহৃত হয়, তবে লাল রঙের 'Conflict' সতর্কতা দেখাবে - সেটি পরিবর্তন করুন।"
            ]}
            proTipsEn={[
              "Resistance is a genetic change. Repeated exposure to group 1A insect-killers will breed insects immune to all 1A chemistry.",
              "Always check the MoA code on physical packaging. It is displayed clearly on the label header (e.g. 'FRAC Group 11')."
            ]}
            proTipsBn={[
              "বালাইয়ের রেজিসট্যান্স ক্ষমতা একটি বংশগত পরিবর্তন। বারবার একই ওষুধ ছিটানো হলে ক্ষতিকর পোকারা ইমিউন হয়ে যায়।",
              "বাস্তব বোতল বা প্যাকেটের লেবেলের মাথায় ইংরেজি বড় হরফে MoA কোড যেমন: 'FRAC Group 11' বা 'Group 1A' লেখা থাকে।"
            ]}
          />
        </div>

        {/* -------------------------------- THE 4 GOLDEN RULES (deep green)
            Same emotional weight as the Home logic card: bottle-green
            panel, golden mono numbers, golden offset shadow. */}
        <div className="acg-rp-rules">
          <h3 className="acg-rp-rules__title">
            <Sparkles className="w-5 h-5" />
            {language === 'bn'
              ? 'বালাইনাশক প্রতিরোধ (MoA) ব্যবস্থাপনার ৪টি সুবর্ণ নিয়ম'
              : 'The 4 Golden Rules of MoA Resistance Management'}
          </h3>
          <div className="acg-rp-rules__grid">
            <div className="acg-rp-rules__card">
              <span className="acg-rp-rules__num">{language === 'bn' ? `নিয়ম ${formatNum(1)}` : `Rule ${formatNum(1)}`}</span>
              <p>
                <b>{language === 'bn' ? 'উইন্ডো স্ট্র্যাটেজি (পর্যায় নীতি)' : 'The Window Strategy'}</b>
                {language === 'bn'
                  ? 'বালাইয়ের একটি প্রজন্মে (সাধারণত ৩০ দিন) একটি MoA প্রয়োগ শেষ করে পরবর্তী প্রজন্মের জন্য সম্পূর্ণ ভিন্ন MoA গ্রুপে চলে যান।'
                  : 'Treat all sprays within a pest generation (typically 30 days) with the same MoA, then switch completely to a different group for the next generation.'}
              </p>
            </div>
            <div className="acg-rp-rules__card">
              <span className="acg-rp-rules__num">{language === 'bn' ? `নিয়ম ${formatNum(2)}` : `Rule ${formatNum(2)}`}</span>
              <p>
                <b>{language === 'bn' ? 'মাল্টি-সাইট রক্ষাকবচ' : 'Multi-Site Anchors'}</b>
                {language === 'bn'
                  ? 'ম্যানকোজেব (M03), কপার (M01) বা সালফার (M02)-এর মতো বহুমুখী স্পর্শক বালাইনাশক ব্যবহার করুন যা একক-সাইট বিষকে প্রতিরোধ হতে রক্ষা করে।'
                  : 'Incorporate multi-site protectants like Mancozeb (FRAC M03), Copper (FRAC M01), or Sulfur (FRAC M02) to shield single-site systemic chemicals.'}
              </p>
            </div>
            <div className="acg-rp-rules__card">
              <span className="acg-rp-rules__num">{language === 'bn' ? `নিয়ম ${formatNum(3)}` : `Rule ${formatNum(3)}`}</span>
              <p>
                <b>{language === 'bn' ? 'কম মাত্রায় প্রয়োগ নিষিদ্ধ' : 'Never Underdose'}</b>
                {language === 'bn'
                  ? 'অনুমোদিত মাত্রার চেয়ে কম বিষ দিলে বালাই না মরে বরং প্রতিরোধ ক্ষমতা অর্জন করে বংশবৃদ্ধি ঘটায়, যা দ্রুত ওষুধের কার্যকারিতা নষ্ট করে।'
                  : 'Applying sub-lethal concentrations lets marginally tolerant individuals survive and reproduce, accelerating resistance development.'}
              </p>
            </div>
            <div className="acg-rp-rules__card">
              <span className="acg-rp-rules__num">{language === 'bn' ? `নিয়ম ${formatNum(4)}` : `Rule ${formatNum(4)}`}</span>
              <p>
                <b>{language === 'bn' ? 'সমন্বিত বালাই ব্যবস্থাপনা (IPM)' : 'Integrated Tactics (IPM)'}</b>
                {language === 'bn'
                  ? 'রাসায়নিক বিষের ওপর একক নির্ভরতা কমাতে সেক্স ফেরোমোন ট্র্যাপ (Cuelure), বন্ধু পোকা ও পরভোজী সংরক্ষণ এবং প্রতিরোধী জাত চাষ করুন।'
                  : 'Combine chemical sprays with sex pheromone traps (Cuelure), natural biological predators, and resistant crop varieties to reduce spray frequency.'}
              </p>
            </div>
          </div>
        </div>

        {/* ------------------------------------ SOURCES & DISCLAIMER --
            Every MoA code on this tab is somebody's published science.
            Show the receipts: the three resistance-action committees and
            the DAE register, each with a direct link. */}
        <div className="acg-rp-src">
          <p className="acg-rp-src__title">
            <ScrollText className="w-4 h-4" />
            {language === 'bn' ? 'তথ্যসূত্র ও দাবিত্যাগ' : 'Sources & disclaimer'}
          </p>
          <p className="acg-rp-src__body">
            {language === 'bn'
              ? 'এই ট্যাবের MoA শ্রেণিবিন্যাস IRAC (কীটনাশক), FRAC (ছত্রাকনাশক) ও HRAC (আগাছানাশক) — আন্তর্জাতিক প্রতিরোধ-ব্যবস্থাপনা কমিটির প্রকাশিত শ্রেণি-ছক অনুসরণ করে; নিবন্ধিত বালাইনাশকের তথ্য বাংলাদেশ কৃষি সম্প্রসারণ অধিদপ্তরের (DAE) তালিকা থেকে নেওয়া। সবকিছু শিক্ষামূলক রেফারেন্স মাত্র — এটি প্রেসক্রিপশন নয়। প্রয়োগের আগে প্যাকেটের লেবেল ও স্থানীয় DAE কর্মকর্তার পরামর্শই চূড়ান্ত কথা।'
              : 'The MoA classification on this tab follows the published code lists of IRAC (insecticides), FRAC (fungicides) and HRAC (herbicides); registered product data comes from the Bangladesh Department of Agricultural Extension (DAE) register. Everything here is an educational reference — not a prescription. The product label and your local DAE officer always have the final say.'}
          </p>
          <ul className="acg-rp-src__links">
            <li>
              <a href="https://irac-online.org/modes-of-action/" target="_blank" rel="noopener noreferrer">
                IRAC — {language === 'bn' ? 'কীটনাশক MoA শ্রেণিবিন্যাস' : 'Insecticide MoA Classification'}
                <ExternalLink className="w-3 h-3" />
              </a>
            </li>
            <li>
              <a href="https://www.frac.info/" target="_blank" rel="noopener noreferrer">
                FRAC — {language === 'bn' ? 'ছত্রাকনাশক কোড তালিকা ও প্রস্তাবনা' : 'Fungicide Code List & Recommendations'}
                <ExternalLink className="w-3 h-3" />
              </a>
            </li>
            <li>
              <a href="https://hracglobal.com/tools/group-classification/" target="_blank" rel="noopener noreferrer">
                HRAC — {language === 'bn' ? 'আগাছানাশক গোত্র শ্রেণিবিন্যাস' : 'Global Herbicide Classification'}
                <ExternalLink className="w-3 h-3" />
              </a>
            </li>
            <li>
              <a href="https://dae.gov.bd/" target="_blank" rel="noopener noreferrer">
                {language === 'bn' ? 'কৃষি সম্প্রসারণ অধিদপ্তর (DAE) — নিবন্ধিত বালাইনাশক তালিকা' : 'Department of Agricultural Extension (DAE) — registered pesticide list'}
                <ExternalLink className="w-3 h-3" />
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
