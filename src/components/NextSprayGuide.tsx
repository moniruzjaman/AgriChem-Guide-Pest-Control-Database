import React, { useMemo, useState, useRef, useEffect } from 'react';
import { ChemicalProduct, MoAClassification } from '../types';
import { MOA_DATABASE } from '../data/moaData';
import { useLanguage } from '../context/LanguageContext';
import {
  Search,
  X,
  AlertTriangle,
  CheckCircle2,
  ShieldAlert,
  RotateCw,
  ChevronDown,
  ChevronUp,
  Info,
  Calculator,
  ShieldCheck,
  Sprout,
  Bug,
  Layers,
  Activity,
  Tag,
  HeartPulse,
  Sparkles,
  ArrowRight,
  ArrowLeftRight,
  Ban,
  Clock,
  TrendingDown,
  Medal,
  Award,
  FlaskConical,
  Leaf,
  Wheat,
  Atom,
  ListFilter,
  ChevronsUpDown,
  Check,
  Warehouse,
  MousePointerClick,
} from 'lucide-react';

// Crop emoji map for visual dropdown entries
const CROP_EMOJIS: Record<string, string> = {
  'Rice': '🌾',
  'Potato': '🥔',
  'Tomato': '🍅',
  'Brinjal': '🍆',
  'Mango': '🥭',
  'Tea': '🍵',
  'Jute': '🌱',
  'Cotton': '☁️',
  'Wheat': '🌾',
  'Mustard': '🌼',
  'Sugarcane': '🎋',
  'Bean': '🫛',
  'Cauliflower': '🥦',
  'Cabbage': '🥬',
  'Chilli': '🌶️',
  'Cucumber': '🥒',
  'Cucurbits': '🎃',
  'Maize': '🌽',
  'Onion': '🧅',
  'Garlic': '🧄',
  'Pulses': '🫘',
  'Groundnut': '🥜',
  'Citrus': '🍊',
  'All Crops': '🌟',
};

function getCropEmoji(crop: string): string {
  return CROP_EMOJIS[crop] || '🌱';
}

interface NextSprayGuideProps {
  products: ChemicalProduct[];
  onSelectProduct: (product: ChemicalProduct) => void;
  onOpenCalculator: (product: ChemicalProduct) => void;
  onOpenSafety: (product: ChemicalProduct) => void;
}

/**
 * Recommendation output for the next-spray guide.
 */
interface RecommendationResult {
  recommended: ChemicalProduct[];
  avoid: ChemicalProduct[];
  strategy?: MoAClassification;
  appliedProduct: ChemicalProduct;
  scopeCrop?: string;
  scopePest?: string;
}

/**
 * Compute ranked "next-spray" recommendations using IRAC/FRAC/HRAC MoA
 * rotation principles to prevent resistance selection.
 *
 * Algorithm:
 *  1. The applied product's MoA code becomes the "do not repeat" group.
 *  2. Candidates = same pesticide category (Insecticide→Insecticide etc.),
 *     DIFFERENT MoA code, and (when scoped) registered for the chosen
 *     crop and/or pest.
 *  3. Rank by:
 *       a. WHO safety band (green/blue > yellow > red > unknown)
 *       b. Resistance risk (Low > Medium > High)
 *       c. PHI (shorter = safer for harvest)
 *       d. Shares ≥1 target pest with the applied product (relevance)
 *  4. De-duplicate by active ingredient so we recommend diverse chemistries,
 *     not multiple brands of the same AI.
 */
function computeRecommendations(
  appliedProduct: ChemicalProduct,
  products: ChemicalProduct[],
  options: { crop?: string; pest?: string; limit?: number }
): RecommendationResult {
  const appliedMoA = appliedProduct.moaCode;
  const appliedType = appliedProduct.type;
  const limit = options.limit ?? 6;

  const strategy = MOA_DATABASE.find((m) => m.code === appliedMoA);

  // Same MoA group = AVOID (resistance selection pressure)
  const avoid = products.filter(
    (p) => p.id !== appliedProduct.id && p.moaCode === appliedMoA
  );

  // Candidate pool: different MoA, same category, scoped by crop/pest
  let candidates = products.filter((p) => {
    if (p.id === appliedProduct.id) return false;
    if (!p.moaCode) return false;
    if (p.moaCode === appliedMoA) return false;
    if (p.type !== appliedType) return false;

    if (options.crop && !p.crops.includes(options.crop)) return false;
    if (options.pest && !p.pests.includes(options.pest)) return false;

    return true;
  });

  const safetyRank = (p: ChemicalProduct): number => {
    const c = (p.whoColor || '').toLowerCase();
    if (c === '#10b981' || c === '#22c55e') return 0; // green
    if (c === '#3b82f6') return 1; // blue
    if (c === '#eab308') return 2; // yellow
    if (c === '#ef4444') return 3; // red
    return 4; // unknown
  };

  const riskRank = (p: ChemicalProduct): number => {
    switch (p.resistanceRisk) {
      case 'Low':
        return 0;
      case 'Low to Medium':
        return 1;
      case 'Medium':
        return 2;
      case 'Medium to High':
        return 3;
      case 'High':
        return 4;
      default:
        return 5;
    }
  };

  candidates = candidates.sort((a, b) => {
    const sa = safetyRank(a);
    const sb = safetyRank(b);
    if (sa !== sb) return sa - sb;

    const ra = riskRank(a);
    const rb = riskRank(b);
    if (ra !== rb) return ra - rb;

    const pa = a.phiDays ?? 999;
    const pb = b.phiDays ?? 999;
    if (pa !== pb) return pa - pb;

    const sharesPestA = a.pests.some((x) => appliedProduct.pests.includes(x)) ? 0 : 1;
    const sharesPestB = b.pests.some((x) => appliedProduct.pests.includes(x)) ? 0 : 1;
    return sharesPestA - sharesPestB;
  });

  // De-duplicate by active ingredient (one brand per AI)
  const seen = new Set<string>();
  const deduped = candidates.filter((p) => {
    const key = p.commonName.toLowerCase().trim();
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });

  return {
    recommended: deduped.slice(0, limit),
    avoid,
    strategy,
    appliedProduct,
    scopeCrop: options.crop,
    scopePest: options.pest,
  };
}

const WHO_BAND_META: Record<string, { labelEn: string; labelBn: string; cls: string }> = {
  '#10b981': { labelEn: 'Green — Low Hazard', labelBn: 'সবুজ — কম ঝুঁকি', cls: 'bg-emerald-500 text-white' },
  '#22c55e': { labelEn: 'Green — Low Hazard', labelBn: 'সবুজ — কম ঝুঁকি', cls: 'bg-emerald-500 text-white' },
  '#3b82f6': { labelEn: 'Blue — Moderate', labelBn: 'নীল — মাঝারি', cls: 'bg-blue-500 text-white' },
  '#eab308': { labelEn: 'Yellow — Moderately Hazardous', labelBn: 'হলুদ — মাঝারি বিপজ্জনক', cls: 'bg-yellow-500 text-white' },
  '#ef4444': { labelEn: 'Red — Highly Hazardous', labelBn: 'লাল — উচ্চ বিপজ্জনক', cls: 'bg-red-500 text-white' },
};

function getWhoBand(whoColor?: string) {
  if (!whoColor) return null;
  return WHO_BAND_META[whoColor.toLowerCase()] || null;
}

function getMoABadgeClass(moaCode?: string) {
  if (!moaCode) return 'bg-slate-800 text-slate-200 border-slate-700';
  if (moaCode.startsWith('IRAC')) return 'bg-emerald-900 text-emerald-200 border-emerald-700';
  if (moaCode.startsWith('FRAC')) return 'bg-sky-900 text-sky-200 border-sky-700';
  if (moaCode.startsWith('HRAC')) return 'bg-amber-900 text-amber-200 border-amber-700';
  return 'bg-slate-800 text-slate-200 border-slate-700';
}

function getRiskChipClass(risk?: string) {
  switch (risk) {
    case 'High':
      return 'bg-rose-100 text-rose-800 border-rose-200';
    case 'Medium to High':
      return 'bg-rose-100 text-rose-800 border-rose-200';
    case 'Medium':
      return 'bg-amber-100 text-amber-800 border-amber-200';
    case 'Low to Medium':
      return 'bg-amber-100 text-amber-800 border-amber-200';
    case 'Low':
      return 'bg-emerald-100 text-emerald-800 border-emerald-200';
    default:
      return 'bg-slate-100 text-slate-700 border-slate-200';
  }
}

function getCategoryIcon(type: string, className = 'w-4 h-4') {
  switch (type) {
    case 'Insecticide':
      return <Bug className={className} />;
    case 'Fungicide':
      return <Sprout className={className} />;
    case 'Herbicide':
      return <Layers className={className} />;
    case 'Miticide':
      return <Activity className={className} />;
    case 'Bio Pesticide':
      return <ShieldCheck className={className} />;
    case 'Stored Grain':
    case 'Store Grain Insecticide':
      return <Tag className={className} />;
    case 'Rodenticide':
      return <ShieldAlert className={className} />;
    case 'Public Health':
      return <HeartPulse className={className} />;
    default:
      return <Tag className={className} />;
  }
}

export const NextSprayGuide: React.FC<NextSprayGuideProps> = ({
  products,
  onSelectProduct,
  onOpenCalculator,
  onOpenSafety,
}) => {
  const { language, transCrop, transCat, transRisk, transPest, transDose, formatNum } = useLanguage();

  // ---------- Searchable applied-pesticide combobox state ----------
  const [appliedQuery, setAppliedQuery] = useState<string>('');
  const [appliedProduct, setAppliedProduct] = useState<ChemicalProduct | null>(null);
  const [comboOpen, setComboOpen] = useState<boolean>(false);
  const comboRef = useRef<HTMLDivElement>(null);

  // ---------- Quick-pick category filter chip state ----------
  const [activeCategoryChip, setActiveCategoryChip] = useState<string>('all');

  // ---------- Optional scope filters ----------
  const [scopeCrop, setScopeCrop] = useState<string>('');
  const [scopePest, setScopePest] = useState<string>('');

  // ---------- Custom icon-dropdown open state for crop & pest ----------
  const [cropDropdownOpen, setCropDropdownOpen] = useState<boolean>(false);
  const [pestDropdownOpen, setPestDropdownOpen] = useState<boolean>(false);
  const [cropSearch, setCropSearch] = useState<string>('');
  const [pestSearch, setPestSearch] = useState<string>('');
  const cropDropdownRef = useRef<HTMLDivElement>(null);
  const pestDropdownRef = useRef<HTMLDivElement>(null);

  // ---------- Available crops / pests (derived from full catalog) ----------
  const availableCrops = useMemo(() => {
    const set = new Set<string>();
    products.forEach((p) => p.crops.forEach((c) => set.add(c)));
    return Array.from(set).sort();
  }, [products]);

  const availablePests = useMemo(() => {
    const set = new Set<string>();
    products.forEach((p) => p.pests.forEach((p2) => set.add(p2)));
    return Array.from(set).sort();
  }, [products]);

  // ---------- Crop & pest counts for dropdown badges ----------
  const cropCounts = useMemo(() => {
    const m: Record<string, number> = {};
    products.forEach((p) => p.crops.forEach((c) => { m[c] = (m[c] || 0) + 1; }));
    return m;
  }, [products]);
  const pestCounts = useMemo(() => {
    const m: Record<string, number> = {};
    products.forEach((p) => p.pests.forEach((pe) => { m[pe] = (m[pe] || 0) + 1; }));
    return m;
  }, [products]);

  // ---------- Category list for quick-pick chips ----------
  const categoryChips = useMemo(() => {
    const set = new Set<string>();
    products.forEach((p) => p.type && set.add(p.type));
    return Array.from(set).sort();
  }, [products]);

  // ---------- Combobox search results (filtered by active category chip) ----------
  const searchResults = useMemo<ChemicalProduct[]>(() => {
    const q = appliedQuery.toLowerCase().trim();
    let pool = products;
    if (activeCategoryChip !== 'all') {
      pool = pool.filter((p) => p.type === activeCategoryChip);
    }
    if (!q) {
      // Show some sensible defaults (a mix of common categories) when nothing is typed
      return pool.slice(0, 10);
    }
    return pool
      .filter((p) => {
        return (
          p.tradeName.toLowerCase().includes(q) ||
          p.commonName.toLowerCase().includes(q) ||
          p.registrationNo.toLowerCase().includes(q) ||
          (p.moaCode || '').toLowerCase().includes(q) ||
          p.crops.some((c) => c.toLowerCase().includes(q)) ||
          p.pests.some((pest) => pest.toLowerCase().includes(q))
        );
      })
      .slice(0, 14);
  }, [appliedQuery, products, activeCategoryChip]);

  // ---------- Group search results by category for the rich dropdown ----------
  const groupedSearchResults = useMemo(() => {
    const map = new Map<string, ChemicalProduct[]>();
    searchResults.forEach((p) => {
      if (!map.has(p.type)) map.set(p.type, []);
      map.get(p.type)!.push(p);
    });
    return Array.from(map.entries()).sort((a, b) => a[0].localeCompare(b[0]));
  }, [searchResults]);

  // ---------- Filtered crop / pest dropdown options ----------
  const filteredCrops = useMemo(() => {
    const q = cropSearch.toLowerCase().trim();
    if (!q) return availableCrops;
    return availableCrops.filter((c) => c.toLowerCase().includes(q) || transCrop(c).toLowerCase().includes(q));
  }, [availableCrops, cropSearch, transCrop]);

  const filteredPests = useMemo(() => {
    const q = pestSearch.toLowerCase().trim();
    if (!q) return availablePests;
    return availablePests.filter((p) => p.toLowerCase().includes(q) || transPest(p).toLowerCase().includes(q));
  }, [availablePests, pestSearch, transPest]);

  // ---------- Close dropdowns on outside click ----------
  useEffect(() => {
    function handleOutside(e: MouseEvent) {
      if (comboRef.current && !comboRef.current.contains(e.target as Node)) setComboOpen(false);
      if (cropDropdownRef.current && !cropDropdownRef.current.contains(e.target as Node)) setCropDropdownOpen(false);
      if (pestDropdownRef.current && !pestDropdownRef.current.contains(e.target as Node)) setPestDropdownOpen(false);
    }
    document.addEventListener('mousedown', handleOutside);
    return () => document.removeEventListener('mousedown', handleOutside);
  }, []);

  // ---------- Recommendations computation ----------
  const recommendation = useMemo<RecommendationResult | null>(() => {
    if (!appliedProduct) return null;
    return computeRecommendations(appliedProduct, products, {
      crop: scopeCrop || undefined,
      pest: scopePest || undefined,
      limit: 6,
    });
  }, [appliedProduct, products, scopeCrop, scopePest]);

  const handlePickProduct = (p: ChemicalProduct) => {
    setAppliedProduct(p);
    setAppliedQuery(p.tradeName);
    setComboOpen(false);
  };

  // Swap: re-run the guide with a recommended product as the new applied pesticide
  const handleSwapApplied = (p: ChemicalProduct) => {
    setAppliedProduct(p);
    setAppliedQuery(p.tradeName);
    // Smooth-scroll back to the top of the guide so the user sees the new state
    if (typeof window !== 'undefined') {
      const el = document.getElementById('next-spray-guide');
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleClearApplied = () => {
    setAppliedProduct(null);
    setAppliedQuery('');
    setScopeCrop('');
    setScopePest('');
    setActiveCategoryChip('all');
  };

  // ---------- Render helpers ----------
  const renderRankBadge = (rank: number) => {
    // Top 3 get medal icons (gold/silver/bronze), rest get numbered circles
    if (rank === 1) {
      return (
        <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-gradient-to-br from-yellow-400 to-amber-500 text-white shadow-md shrink-0" title={language === 'bn' ? 'শীর্ষ সুপারিশ' : 'Top recommendation'}>
          <Medal className="w-4 h-4" />
        </span>
      );
    }
    if (rank === 2) {
      return (
        <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-gradient-to-br from-slate-300 to-slate-400 text-white shadow-md shrink-0" title={language === 'bn' ? 'দ্বিতীয় সুপারিশ' : 'Second pick'}>
          <Award className="w-4 h-4" />
        </span>
      );
    }
    if (rank === 3) {
      return (
        <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-gradient-to-br from-orange-400 to-amber-700 text-white shadow-md shrink-0" title={language === 'bn' ? 'তৃতীয় সুপারিশ' : 'Third pick'}>
          <Award className="w-4 h-4" />
        </span>
      );
    }
    return (
      <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-emerald-700 text-white text-[11px] font-black shrink-0">
        {formatNum(rank)}
      </span>
    );
  };

  const renderProductRow = (p: ChemicalProduct, rank?: number) => {
    const whoBand = getWhoBand(p.whoColor);
    return (
      <div
        key={p.id}
        className="py-3 flex flex-col lg:flex-row lg:items-center justify-between gap-3 text-xs border-b border-slate-100 last:border-b-0 px-2 rounded-lg hover:bg-slate-50/60 transition-colors"
      >
        {/* Col 1: rank medal + brand + AI */}
        <div className="space-y-1 min-w-[220px] flex-1">
          <div className="flex items-baseline gap-2">
            {typeof rank === 'number' && renderRankBadge(rank)}
            <h4 className="font-bold text-sm text-slate-900">{p.tradeName}</h4>
            {p.formulation && (
              <span className="bg-slate-100 text-slate-700 px-1.5 py-0.2 rounded text-[10px] font-bold border border-slate-200">
                {p.formulation}
              </span>
            )}
          </div>
          <div className="text-[11px] text-slate-500 font-medium flex flex-wrap items-center gap-x-2 gap-y-0.5">
            <span className="inline-flex items-center gap-1">
              <FlaskConical className="w-3 h-3 text-slate-400" />
              {language === 'bn' ? 'উপাদান:' : 'AI:'} <strong className="text-slate-700">{p.commonName}</strong>
            </span>
            <span className="text-slate-300">|</span>
            <span>{language === 'bn' ? 'রেজি নং:' : 'Reg:'} <strong className="font-mono text-slate-700">{p.registrationNo}</strong></span>
          </div>
        </div>

        {/* Col 2: MoA badge with atom icon */}
        <div className="bg-slate-50 p-2 rounded-lg border border-slate-100 min-w-[130px] shrink-0">
          <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">
            <Atom className="w-2.5 h-2.5" />
            {p.moaCode?.startsWith('IRAC') ? 'IRAC MoA' : p.moaCode?.startsWith('FRAC') ? 'FRAC MoA' : p.moaCode?.startsWith('HRAC') ? 'HRAC MoA' : 'MoA'}
          </span>
          <span className={`inline-block mt-0.5 px-2 py-0.5 rounded text-[11px] font-mono font-black border ${getMoABadgeClass(p.moaCode)}`}>
            {p.moaCode || 'UN'}
          </span>
          <span className="text-[10px] text-slate-500 truncate block max-w-[140px] mt-0.5" title={p.moaGroup}>
            {language === 'bn' ? (MOA_DATABASE.find((m) => m.code === p.moaCode)?.nameBn || p.moaGroup) : p.moaGroup}
          </span>
        </div>

        {/* Col 3: dosage + PHI with icons */}
        <div className="grid grid-cols-2 gap-4 text-[11px] md:max-w-xs w-full md:w-auto bg-slate-50 p-2 rounded-lg border border-slate-100">
          <div>
            <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">
              <Calculator className="w-2.5 h-2.5" />
              {language === 'bn' ? 'প্রয়োগ মাত্রা' : 'Dosage'}
            </span>
            <span className="font-bold text-slate-800 truncate block max-w-[110px]" title={p.dosageRate}>{transDose(p.dosageRate)}</span>
          </div>
          <div>
            <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">
              <Clock className="w-2.5 h-2.5" />
              {language === 'bn' ? 'তোলার বিরতি' : 'PHI Days'}
            </span>
            <span className="font-bold text-slate-800 block">
              {p.phiDays ? `${formatNum(p.phiDays)} ${language === 'bn' ? 'দিন' : 'days'}` : '—'}
            </span>
          </div>
        </div>

        {/* Col 4: WHO band + risk with shield/leaf icons */}
        <div className="flex flex-col gap-1 min-w-[120px] shrink-0">
          {whoBand && (
            <span className={`inline-flex items-center justify-center gap-1 px-2 py-0.5 rounded text-[9px] font-bold ${whoBand.cls}`} title={language === 'bn' ? whoBand.labelBn : whoBand.labelEn}>
              <ShieldCheck className="w-2.5 h-2.5" />
              {language === 'bn' ? whoBand.labelBn : whoBand.labelEn}
            </span>
          )}
          {p.resistanceRisk && (
            <span className={`inline-flex items-center justify-center gap-1 px-2 py-0.5 rounded text-[9px] font-bold border ${getRiskChipClass(p.resistanceRisk)}`}>
              <TrendingDown className="w-2.5 h-2.5" />
              {language === 'bn' ? transRisk(p.resistanceRisk) : `${transRisk(p.resistanceRisk)} Risk`}
            </span>
          )}
        </div>

        {/* Col 5: actions — swap + dosage + safety + details */}
        <div className="flex items-center gap-1.5 shrink-0 self-end lg:self-auto pt-2 lg:pt-0">
          {typeof rank === 'number' && (
            <button
              onClick={() => handleSwapApplied(p)}
              className="p-2 bg-violet-50 hover:bg-violet-100 border border-violet-200/70 text-violet-700 rounded-lg font-bold transition flex items-center gap-1 cursor-pointer"
              title={language === 'bn' ? 'এটিকে নতুন "প্রয়োগকৃত" হিসেবে ব্যবহার করুন' : 'Use this as the new "applied" pesticide'}
            >
              <ArrowLeftRight className="w-4 h-4" />
              <span className="text-[10px] font-bold hidden xl:inline">{language === 'bn' ? 'অদল' : 'Swap'}</span>
            </button>
          )}
          <button
            onClick={() => onOpenCalculator(p)}
            className="p-2 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200/70 text-emerald-700 rounded-lg font-bold transition flex items-center gap-1 cursor-pointer"
            title={language === 'bn' ? 'হিসাবকারী স্টেশন খুলুন' : 'Open Dosage Station'}
          >
            <Calculator className="w-4 h-4" />
            <span className="text-[10px] font-bold hidden xl:inline">{language === 'bn' ? 'ডোজ হিসাব' : 'Dosage'}</span>
          </button>
          <button
            onClick={() => onOpenSafety(p)}
            className="p-2 bg-indigo-50 hover:bg-indigo-100 border border-indigo-200/70 text-indigo-700 rounded-lg font-bold transition flex items-center gap-1 cursor-pointer"
            title={language === 'bn' ? 'নিরাপত্তা চেকলিস্ট' : 'Safety Protocols'}
          >
            <ShieldCheck className="w-4 h-4" />
            <span className="text-[10px] font-bold hidden xl:inline">{language === 'bn' ? 'নিরাপত্তা' : 'Safety'}</span>
          </button>
          <button
            onClick={() => onSelectProduct(p)}
            className="p-2 bg-slate-100 hover:bg-slate-200 border border-slate-200 text-slate-700 rounded-lg font-bold transition flex items-center gap-1 cursor-pointer"
            title={language === 'bn' ? 'বিস্তারিত তথ্য' : 'Product Technical Datasheet'}
          >
            <Info className="w-4 h-4" />
          </button>
        </div>
      </div>
    );
  };

  return (
    <div id="next-spray-guide" className="bg-gradient-to-br from-emerald-900 via-emerald-800 to-teal-900 rounded-3xl p-5 sm:p-7 shadow-lg relative overflow-hidden">
      {/* Decorative leaf accent */}
      <div className="absolute -top-12 -right-12 w-48 h-48 rounded-full bg-emerald-700/30 blur-2xl pointer-events-none" />
      <div className="absolute -bottom-16 -left-16 w-56 h-56 rounded-full bg-teal-700/20 blur-3xl pointer-events-none" />

      <div className="relative z-10 space-y-5">
        {/* ---------------- Header ---------------- */}
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/70 border border-emerald-700 text-emerald-200 text-[11px] font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            {language === 'bn'
              ? 'ডায়নামিক ফিল্ড গাইড — কোন বালাইনাশক এরপর প্রয়োগ করবেন'
              : 'Dynamic Field Guide — Which Pesticide to Apply Next'}
          </div>
          <h2 className="text-xl sm:text-2xl font-black tracking-tight text-white leading-tight">
            {language === 'bn'
              ? 'প্রয়োগকৃত বালাইনাশক দিন → পরবর্তী স্প্রের সুপারিশ পান'
              : 'Enter the Pesticide You Applied → Get the Next Spray Recommendation'}
          </h2>
          <p className="text-xs sm:text-sm text-emerald-100 leading-relaxed max-w-3xl">
            {language === 'bn'
              ? 'আপনি সবেমাত্র জমিতে যে বালাইনাশক প্রয়োগ করেছেন সেটি নির্বাচন করুন। সিস্টেমটি IRAC/FRAC/HRAC ক্রিয়াপদ্ধতি (MoA) অনুযায়ী এমন একটি ভিন্ন গ্রুপের বালাইনাশক সুপারিশ করবে যা রেজিস্ট্যান্স প্রতিরোধ করবে এবং একই বালাই দমন করবে।'
              : 'Select the pesticide you just sprayed in the field. The system uses IRAC/FRAC/HRAC Mode-of-Action (MoA) rotation to recommend a different chemical group that prevents resistance buildup while still controlling the same pest.'}
          </p>
        </div>

        {/* ---------------- Search + scope filters ---------------- */}
        <div className="bg-white/95 backdrop-blur rounded-2xl p-4 sm:p-5 shadow-md space-y-4 text-slate-900">

          {/* Quick-pick category filter chips — narrows the combobox below */}
          <div className="space-y-1.5">
            <label className="block text-[11px] font-bold text-slate-500 flex items-center gap-1.5 uppercase tracking-wider">
              <ListFilter className="w-3 h-3 text-emerald-600" />
              {language === 'bn' ? 'দ্রুত ক্যাটাগরি ফিল্টার' : 'Quick Category Filter'}
            </label>
            <div className="flex flex-wrap gap-1.5">
              {/* "All" chip */}
              <button
                onClick={() => setActiveCategoryChip('all')}
                className={`inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-[11px] font-bold border transition-all cursor-pointer ${
                  activeCategoryChip === 'all'
                    ? 'bg-emerald-800 text-white border-emerald-800 shadow-xs'
                    : 'bg-white text-slate-700 border-slate-200 hover:border-emerald-300 hover:bg-emerald-50/50'
                }`}
              >
                <Sparkles className="w-3 h-3" />
                {language === 'bn' ? 'সকল শ্রেণী' : 'All Classes'}
              </button>
              {categoryChips.map((cat) => {
                const isActive = activeCategoryChip === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => setActiveCategoryChip(cat)}
                    className={`inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-[11px] font-bold border transition-all cursor-pointer ${
                      isActive
                        ? 'bg-emerald-800 text-white border-emerald-800 shadow-xs'
                        : 'bg-white text-slate-700 border-slate-200 hover:border-emerald-300 hover:bg-emerald-50/50'
                    }`}
                  >
                    {getCategoryIcon(cat, `w-3 h-3 ${isActive ? 'text-emerald-200' : 'text-slate-400'}`)}
                    {transCat(cat)}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Applied-pesticide searchable combobox (rich, grouped, with icons) */}
          <div className="space-y-1.5" ref={comboRef}>
            <label className="block text-xs font-bold text-slate-700 flex items-center gap-1.5">
              <Search className="w-3.5 h-3.5 text-emerald-600" />
              {language === 'bn' ? 'প্রয়োগকৃত বালাইনাশক (সার্চ করুন)' : 'Applied Pesticide (search by brand, AI, reg. no, crop, or pest)'}
              <span className="text-rose-500">*</span>
            </label>
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={appliedQuery}
                onChange={(e) => {
                  setAppliedQuery(e.target.value);
                  setComboOpen(true);
                  if (appliedProduct) setAppliedProduct(null);
                }}
                onFocus={() => setComboOpen(true)}
                placeholder={
                  language === 'bn'
                    ? 'যেমন: Karate, Imidacloprid, Reg-1234…'
                    : 'e.g. Karate, Imidacloprid, Reg-1234…'
                }
                className="w-full pl-10 pr-10 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-600 transition font-medium"
              />
              {appliedQuery && (
                <button
                  onClick={handleClearApplied}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-rose-600 p-1"
                  title={language === 'bn' ? 'মুছুন' : 'Clear'}
                >
                  <X className="w-4 h-4" />
                </button>
              )}

              {/* Rich grouped dropdown results */}
              {comboOpen && (
                <div className="absolute z-30 mt-1 w-full bg-white border border-slate-200 rounded-xl shadow-xl max-h-80 overflow-y-auto">
                  {groupedSearchResults.length === 0 ? (
                    <div className="p-6 text-xs text-slate-500 text-center space-y-1">
                      <AlertTriangle className="w-5 h-5 text-amber-400 mx-auto" />
                      <p className="font-bold">{language === 'bn' ? 'কোনো মিল পাওয়া যায়নি' : 'No matches found'}</p>
                      <p className="text-[10px] text-slate-400">{language === 'bn' ? 'অন্য নাম বা ক্যাটাগরি চেষ্টা করুন' : 'Try a different name or category'}</p>
                    </div>
                  ) : (
                    groupedSearchResults.map(([cat, items]) => (
                      <div key={cat} className="border-b border-slate-100 last:border-b-0">
                        {/* Group header */}
                        <div className="sticky top-0 bg-slate-50 px-3 py-1.5 text-[10px] font-black uppercase tracking-wider text-slate-500 flex items-center gap-1.5 border-b border-slate-100">
                          {getCategoryIcon(cat, 'w-3 h-3 text-slate-400')}
                          {transCat(cat)}
                          <span className="ml-auto bg-slate-200 text-slate-600 px-1.5 py-0.5 rounded text-[9px] font-bold">
                            {formatNum(items.length)}
                          </span>
                        </div>
                        {/* Items */}
                        <ul className="divide-y divide-slate-50">
                          {items.map((p) => {
                            const whoBand = getWhoBand(p.whoColor);
                            return (
                              <li key={p.id}>
                                <button
                                  onClick={() => handlePickProduct(p)}
                                  className="w-full px-3 py-2.5 text-left hover:bg-emerald-50/60 transition flex items-center justify-between gap-3 cursor-pointer"
                                >
                                  <div className="min-w-0 flex-1">
                                    <div className="flex items-center gap-1.5 flex-wrap">
                                      <span className="font-bold text-sm text-slate-900 truncate">{p.tradeName}</span>
                                      {p.formulation && (
                                        <span className="bg-slate-100 text-slate-600 px-1 py-0.2 rounded text-[9px] font-bold border border-slate-200">
                                          {p.formulation}
                                        </span>
                                      )}
                                      {/* WHO color dot */}
                                      {p.whoColor && (
                                        <span
                                          className="inline-block w-2 h-2 rounded-full border border-slate-300 shrink-0"
                                          style={{ backgroundColor: p.whoColor }}
                                          title={whoBand ? (language === 'bn' ? whoBand.labelBn : whoBand.labelEn) : ''}
                                        />
                                      )}
                                    </div>
                                    <div className="text-[10px] text-slate-500 truncate flex items-center gap-1">
                                      <FlaskConical className="w-2.5 h-2.5 shrink-0" />
                                      {p.commonName}
                                      <span className="text-slate-300">·</span>
                                      <span className="font-mono">{p.registrationNo}</span>
                                    </div>
                                  </div>
                                  {p.moaCode && (
                                    <span className={`px-1.5 py-0.5 rounded text-[10px] font-mono font-black border shrink-0 ${getMoABadgeClass(p.moaCode)}`}>
                                      {p.moaCode}
                                    </span>
                                  )}
                                </button>
                              </li>
                            );
                          })}
                        </ul>
                      </div>
                    ))
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Scope filters — custom icon dropdowns with search */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {/* Crop scope dropdown */}
            <div className="space-y-1" ref={cropDropdownRef}>
              <label className="block text-[11px] font-semibold text-slate-500 flex items-center gap-1">
                <Sprout className="w-3 h-3 text-emerald-600" />
                {language === 'bn' ? 'সুপারিশ এই ফসলের জন্য সীমাবদ্ধ করুন (ঐচ্ছিক)' : 'Scope recommendation to this crop (optional)'}
              </label>
              <div className="relative">
                <button
                  onClick={() => { setCropDropdownOpen(!cropDropdownOpen); setPestDropdownOpen(false); }}
                  className="w-full flex items-center justify-between gap-2 px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-semibold text-slate-700 hover:bg-white hover:border-emerald-400 transition cursor-pointer"
                >
                  <span className="flex items-center gap-2 min-w-0">
                    <span className="text-base leading-none shrink-0">{scopeCrop ? getCropEmoji(scopeCrop) : '🌟'}</span>
                    <span className="truncate">{scopeCrop ? transCrop(scopeCrop) : (language === 'bn' ? 'সকল ফসল' : 'All crops')}</span>
                    {scopeCrop && cropCounts[scopeCrop] && (
                      <span className="bg-slate-200 text-slate-600 px-1.5 py-0.5 rounded text-[9px] font-bold shrink-0">
                        {formatNum(cropCounts[scopeCrop])}
                      </span>
                    )}
                  </span>
                  <ChevronsUpDown className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                </button>
                {cropDropdownOpen && (
                  <div className="absolute z-30 mt-1 w-full bg-white border border-slate-200 rounded-lg shadow-xl">
                    <div className="p-2 border-b border-slate-100 relative">
                      <Search className="w-3 h-3 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                      <input
                        type="text"
                        value={cropSearch}
                        onChange={(e) => setCropSearch(e.target.value)}
                        placeholder={language === 'bn' ? 'ফসল খুঁজুন…' : 'Search crop…'}
                        className="w-full pl-7 pr-2 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded focus:bg-white focus:outline-none focus:ring-1 focus:ring-emerald-500"
                        autoFocus
                      />
                    </div>
                    <div className="max-h-56 overflow-y-auto">
                      {/* "All crops" option */}
                      <button
                        onClick={() => { setScopeCrop(''); setCropDropdownOpen(false); setCropSearch(''); }}
                        className={`w-full flex items-center gap-2 px-3 py-2 text-left text-xs hover:bg-emerald-50/60 transition cursor-pointer ${!scopeCrop ? 'bg-emerald-50/60 font-bold text-emerald-800' : 'text-slate-700'}`}
                      >
                        <span className="text-base leading-none">🌟</span>
                        <span className="flex-1">{language === 'bn' ? 'সকল ফসল' : 'All crops'}</span>
                        {!scopeCrop && <Check className="w-3.5 h-3.5 text-emerald-600" />}
                      </button>
                      {filteredCrops.map((c) => (
                        <button
                          key={c}
                          onClick={() => { setScopeCrop(c); setCropDropdownOpen(false); setCropSearch(''); }}
                          className={`w-full flex items-center gap-2 px-3 py-2 text-left text-xs hover:bg-emerald-50/60 transition cursor-pointer ${scopeCrop === c ? 'bg-emerald-50/60 font-bold text-emerald-800' : 'text-slate-700'}`}
                        >
                          <span className="text-base leading-none">{getCropEmoji(c)}</span>
                          <span className="flex-1 truncate">{transCrop(c)}</span>
                          <span className="bg-slate-100 text-slate-500 px-1.5 py-0.5 rounded text-[9px] font-bold shrink-0">
                            {formatNum(cropCounts[c] || 0)}
                          </span>
                          {scopeCrop === c && <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />}
                        </button>
                      ))}
                      {filteredCrops.length === 0 && (
                        <div className="p-3 text-[10px] text-slate-400 text-center">{language === 'bn' ? 'কোনো ফসল মেলেনি' : 'No crop matches'}</div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Pest scope dropdown */}
            <div className="space-y-1" ref={pestDropdownRef}>
              <label className="block text-[11px] font-semibold text-slate-500 flex items-center gap-1">
                <Bug className="w-3 h-3 text-rose-600" />
                {language === 'bn' ? 'সুপারিশ এই বালাইয়ের জন্য সীমাবদ্ধ করুন (ঐচ্ছিক)' : 'Scope recommendation to this pest (optional)'}
              </label>
              <div className="relative">
                <button
                  onClick={() => { setPestDropdownOpen(!pestDropdownOpen); setCropDropdownOpen(false); }}
                  className="w-full flex items-center justify-between gap-2 px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-semibold text-slate-700 hover:bg-white hover:border-rose-400 transition cursor-pointer"
                >
                  <span className="flex items-center gap-2 min-w-0">
                    <Bug className={`w-3.5 h-3.5 shrink-0 ${scopePest ? 'text-rose-600' : 'text-slate-400'}`} />
                    <span className="truncate">{scopePest ? transPest(scopePest) : (language === 'bn' ? 'সকল বালাই' : 'All pests')}</span>
                    {scopePest && pestCounts[scopePest] && (
                      <span className="bg-slate-200 text-slate-600 px-1.5 py-0.5 rounded text-[9px] font-bold shrink-0">
                        {formatNum(pestCounts[scopePest])}
                      </span>
                    )}
                  </span>
                  <ChevronsUpDown className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                </button>
                {pestDropdownOpen && (
                  <div className="absolute z-30 mt-1 w-full bg-white border border-slate-200 rounded-lg shadow-xl">
                    <div className="p-2 border-b border-slate-100 relative">
                      <Search className="w-3 h-3 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                      <input
                        type="text"
                        value={pestSearch}
                        onChange={(e) => setPestSearch(e.target.value)}
                        placeholder={language === 'bn' ? 'বালাই খুঁজুন…' : 'Search pest…'}
                        className="w-full pl-7 pr-2 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded focus:bg-white focus:outline-none focus:ring-1 focus:ring-rose-500"
                        autoFocus
                      />
                    </div>
                    <div className="max-h-56 overflow-y-auto">
                      <button
                        onClick={() => { setScopePest(''); setPestDropdownOpen(false); setPestSearch(''); }}
                        className={`w-full flex items-center gap-2 px-3 py-2 text-left text-xs hover:bg-rose-50/60 transition cursor-pointer ${!scopePest ? 'bg-rose-50/60 font-bold text-rose-800' : 'text-slate-700'}`}
                      >
                        <Sparkles className="w-3.5 h-3.5" />
                        <span className="flex-1">{language === 'bn' ? 'সকল বালাই' : 'All pests'}</span>
                        {!scopePest && <Check className="w-3.5 h-3.5 text-rose-600" />}
                      </button>
                      {filteredPests.map((p) => (
                        <button
                          key={p}
                          onClick={() => { setScopePest(p); setPestDropdownOpen(false); setPestSearch(''); }}
                          className={`w-full flex items-center gap-2 px-3 py-2 text-left text-xs hover:bg-rose-50/60 transition cursor-pointer ${scopePest === p ? 'bg-rose-50/60 font-bold text-rose-800' : 'text-slate-700'}`}
                        >
                          <Bug className={`w-3.5 h-3.5 ${scopePest === p ? 'text-rose-600' : 'text-slate-400'}`} />
                          <span className="flex-1 truncate">{transPest(p)}</span>
                          <span className="bg-slate-100 text-slate-500 px-1.5 py-0.5 rounded text-[9px] font-bold shrink-0">
                            {formatNum(pestCounts[p] || 0)}
                          </span>
                          {scopePest === p && <Check className="w-3.5 h-3.5 text-rose-600 shrink-0" />}
                        </button>
                      ))}
                      {filteredPests.length === 0 && (
                        <div className="p-3 text-[10px] text-slate-400 text-center">{language === 'bn' ? 'কোনো বালাই মেলেনি' : 'No pest matches'}</div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Hint: empty state */}
          {!appliedProduct && (
            <div className="bg-emerald-50/70 border border-emerald-200/70 rounded-xl p-3.5 flex items-start gap-3 text-xs">
              <MousePointerClick className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <p className="text-emerald-900 font-medium leading-relaxed">
                {language === 'bn'
                  ? 'শুরু করতে উপরের সার্চ বক্সে আপনার প্রয়োগকৃত বালাইনাশকের নাম লিখুন অথবা তালিকা থেকে নির্বাচন করুন। সিস্টেমটি স্বয়ংক্রিয়ভাবে ভিন্ন MoA গ্রুপের পরবর্তী স্প্রে সুপারিশ করবে।'
                  : 'To begin, type the name of the pesticide you just applied (or pick from the dropdown). The system will automatically recommend next sprays from a different MoA group.'}
              </p>
            </div>
          )}
        </div>

        {/* ---------------- Recommendation output ---------------- */}
        {recommendation && (
          <div className="space-y-5">
            {/* Applied-pesticide summary card */}
            <div className="bg-white rounded-2xl p-4 sm:p-5 shadow-md border-l-4 border-emerald-600">
              <div className="flex items-center justify-between mb-3 pb-2 border-b border-slate-100">
                <h3 className="text-xs font-black text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  {language === 'bn' ? 'আপনি যে বালাইনাশক প্রয়োগ করেছেন' : 'Applied Pesticide'}
                </h3>
                <button
                  onClick={handleClearApplied}
                  className="text-[10px] font-bold text-rose-600 hover:underline flex items-center gap-1 cursor-pointer"
                >
                  <X className="w-3 h-3" />
                  {language === 'bn' ? 'পরিবর্তন করুন' : 'Change'}
                </button>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-4 gap-3 text-xs">
                {/* Brand + AI */}
                <div className="lg:col-span-2 space-y-1">
                  <div className="flex items-baseline gap-2 flex-wrap">
                    <h4 className="font-black text-base text-slate-900">{recommendation.appliedProduct.tradeName}</h4>
                    {recommendation.appliedProduct.formulation && (
                      <span className="bg-slate-100 text-slate-700 px-1.5 py-0.2 rounded text-[10px] font-bold border border-slate-200">
                        {recommendation.appliedProduct.formulation}
                      </span>
                    )}
                    <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.2 rounded-full border bg-amber-50 text-amber-800 border-amber-200">
                      {getCategoryIcon(recommendation.appliedProduct.type, 'w-3 h-3')}
                      {transCat(recommendation.appliedProduct.type)}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-600">
                    <strong className="text-slate-800">{recommendation.appliedProduct.commonName}</strong>
                    {' · '}
                    {language === 'bn' ? 'রেজি নং' : 'Reg No'}: <span className="font-mono">{recommendation.appliedProduct.registrationNo}</span>
                    {' · '}
                    {recommendation.appliedProduct.registrationHolder}
                  </p>
                </div>

                {/* MoA + risk + PHI */}
                <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-100 space-y-1.5">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[9px] font-bold text-slate-400 uppercase">MoA</span>
                    <span className={`inline-block px-2 py-0.5 rounded text-[11px] font-mono font-black border ${getMoABadgeClass(recommendation.appliedProduct.moaCode)}`}>
                      {recommendation.appliedProduct.moaCode || 'UN'}
                    </span>
                  </div>
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[9px] font-bold text-slate-400 uppercase">{language === 'bn' ? 'ঝুঁকি' : 'Risk'}</span>
                    <span className={`text-[9px] font-bold px-2 py-0.5 rounded border ${getRiskChipClass(recommendation.appliedProduct.resistanceRisk)}`}>
                      {language === 'bn' ? transRisk(recommendation.appliedProduct.resistanceRisk || 'Unknown') : `${transRisk(recommendation.appliedProduct.resistanceRisk || 'Unknown')}`}
                    </span>
                  </div>
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[9px] font-bold text-slate-400 uppercase">PHI</span>
                    <span className="text-[11px] font-bold text-slate-800">
                      {recommendation.appliedProduct.phiDays ? `${formatNum(recommendation.appliedProduct.phiDays)} ${language === 'bn' ? 'দিন' : 'd'}` : '—'}
                    </span>
                  </div>
                </div>

                {/* Scope summary */}
                <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-100 space-y-1.5 text-[10px]">
                  <div className="flex items-start gap-1.5">
                    <Sprout className="w-3 h-3 text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      <div className="font-bold text-slate-400 uppercase text-[9px]">{language === 'bn' ? 'ফসল সুপারিশ' : 'Crop Scope'}</div>
                      <div className="font-bold text-slate-800">
                        {recommendation.scopeCrop ? transCrop(recommendation.scopeCrop) : (language === 'bn' ? 'সকল ফসল' : 'All crops')}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-start gap-1.5">
                    <Bug className="w-3 h-3 text-rose-600 shrink-0 mt-0.5" />
                    <div>
                      <div className="font-bold text-slate-400 uppercase text-[9px]">{language === 'bn' ? 'বালাই সুপারিশ' : 'Pest Scope'}</div>
                      <div className="font-bold text-slate-800">
                        {recommendation.scopePest ? transPest(recommendation.scopePest) : (language === 'bn' ? 'সকল বালাই' : 'All pests')}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Rotation strategy advisory */}
            {recommendation.strategy && (
              <div className="bg-amber-50 border-l-4 border-amber-400 rounded-r-2xl p-4 sm:p-5 shadow-sm">
                <h3 className="text-xs font-black text-amber-900 uppercase tracking-wider flex items-center gap-1.5 mb-2">
                  <RotateCw className="w-4 h-4 text-amber-600" />
                  {language === 'bn' ? `${recommendation.appliedProduct.moaCode} গ্রুপের ঘূর্ণন কৌশল` : `Rotation Strategy for ${recommendation.appliedProduct.moaCode}`}
                </h3>
                <p className="text-xs text-amber-900 leading-relaxed font-medium">
                  {language === 'bn' ? recommendation.strategy.rotationStrategyBn || recommendation.strategy.rotationStrategy : recommendation.strategy.rotationStrategy}
                </p>
                <div className="mt-2 text-[10px] text-amber-800/80 font-semibold">
                  {language === 'bn' ? 'লক্ষ্যস্থান:' : 'Target site:'} {language === 'bn' ? (recommendation.strategy.targetSiteBn || recommendation.strategy.targetSite) : recommendation.strategy.targetSite}
                </div>
              </div>
            )}

            {/* RECOMMENDED NEXT SPRAYS panel */}
            <div className="bg-white rounded-2xl p-4 sm:p-5 shadow-md">
              <div className="flex items-center justify-between mb-3 pb-2 border-b border-emerald-100">
                <h3 className="text-xs font-black text-emerald-800 uppercase tracking-wider flex items-center gap-1.5">
                  <ArrowRight className="w-4 h-4 text-emerald-600" />
                  {language === 'bn' ? 'পরবর্তী স্প্রের জন্য সুপারিশকৃত বালাইনাশক' : 'Recommended Next Sprays'}
                </h3>
                <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full">
                  {formatNum(recommendation.recommended.length)} {language === 'bn' ? 'টি বিকল্প' : 'options'}
                </span>
              </div>

              {recommendation.recommended.length === 0 ? (
                <div className="text-center py-8 text-xs text-slate-500 space-y-2">
                  <AlertTriangle className="w-8 h-8 text-amber-400 mx-auto" />
                  <p className="font-bold">
                    {language === 'bn'
                      ? scopeCrop || scopePest
                        ? 'এই ফসল/বালাই সুপারিশের জন্য কোনো ভিন্ন MoA গ্রুপের বালাইনাশক পাওয়া যায়নি। সুপারিশ স্কোপ পরিবর্তন করে দেখুন।'
                        : 'কোনো ভিন্ন MoA গ্রুপের বালাইনাশক পাওয়া যায়নি।'
                      : scopeCrop || scopePest
                        ? 'No different-MoA product found for the chosen crop/pest scope. Try widening the scope filters.'
                        : 'No different-MoA alternative found in the catalog.'}
                  </p>
                </div>
              ) : (
                <div className="space-y-1">
                  {recommendation.recommended.map((p, idx) => renderProductRow(p, idx + 1))}
                </div>
              )}
            </div>

            {/* AVOID — same MoA group warning */}
            {recommendation.avoid.length > 0 && (
              <div className="bg-rose-50 border border-rose-200 rounded-2xl p-4 sm:p-5 shadow-sm">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-xs font-black text-rose-800 uppercase tracking-wider flex items-center gap-1.5">
                    <Ban className="w-4 h-4 text-rose-600" />
                    {language === 'bn' ? `এড়িয়ে চলুন — একই MoA (${recommendation.appliedProduct.moaCode})` : `Avoid — Same MoA (${recommendation.appliedProduct.moaCode})`}
                  </h3>
                  <span className="text-[10px] font-bold text-rose-700 bg-white border border-rose-200 px-2 py-0.5 rounded-full">
                    {formatNum(recommendation.avoid.length)} {language === 'bn' ? 'টি পণ্য' : 'products'}
                  </span>
                </div>
                <p className="text-[11px] text-rose-800 leading-relaxed mb-3 font-medium">
                  {language === 'bn'
                    ? `এই পণ্যগুলোর ${recommendation.appliedProduct.moaCode} গ্রুপ আপনার প্রয়োগকৃত বালাইনাশকের মতো একই ক্রিয়াপদ্ধতি ব্যবহার করে। পরপর একই গ্রুপ ব্যবহার করলে বালাইয়ে রেজিস্ট্যান্স তৈরি হয় এবং ওষুধ কাজ করা বন্ধ করে দেয়।`
                    : `These products share the ${recommendation.appliedProduct.moaCode} group with your applied pesticide — same mode of action. Repeating the same group selects for resistant pest populations and the chemical will stop working.`}
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                  {recommendation.avoid.slice(0, 12).map((p) => (
                    <button
                      key={p.id}
                      onClick={() => onSelectProduct(p)}
                      className="flex items-center gap-2 px-2.5 py-1.5 bg-white border border-rose-200 rounded-lg text-[10px] text-left hover:bg-rose-100/70 transition cursor-pointer"
                      title={language === 'bn' ? 'বিস্তারিত দেখুন' : 'View details'}
                    >
                      <Ban className="w-3 h-3 text-rose-500 shrink-0" />
                      <div className="min-w-0">
                        <div className="font-bold text-slate-900 truncate">{p.tradeName}</div>
                        <div className="text-[9px] text-slate-500 truncate">{p.commonName}</div>
                      </div>
                    </button>
                  ))}
                  {recommendation.avoid.length > 12 && (
                    <div className="flex items-center justify-center px-2.5 py-1.5 bg-rose-100/50 border border-rose-200 border-dashed rounded-lg text-[10px] font-bold text-rose-700">
                      +{formatNum(recommendation.avoid.length - 12)} {language === 'bn' ? 'আরও' : 'more'}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* ---------------- Disclaimer (always visible inside the guide) ---------------- */}
            <div className="bg-slate-900/80 backdrop-blur border border-slate-700 rounded-2xl p-4 sm:p-5">
              <div className="flex items-start gap-3">
                <ShieldAlert className="w-5 h-5 text-amber-300 shrink-0 mt-0.5" />
                <div className="text-[11px] space-y-1.5 text-slate-200">
                  <strong className="block text-white font-bold text-xs">
                    {language === 'bn' ? 'সতর্কতামূলক দাবিত্যাগ ও পরামর্শ নোট:' : 'Recommendation Disclaimer & Advisory Note:'}
                  </strong>
                  <p className="leading-relaxed font-medium text-slate-300">
                    {language === 'bn'
                      ? 'এই সুপারিশটি একটি স্বয়ংক্রিয় রেজিস্ট্যান্স-প্রতিরোধ সহায়ক হিসেবে কাজ করে — এটি কৃষি সম্প্রসারণ অধিদপ্তর (DAE) বা উদ্ভিদ সংরক্ষণ উইং-এর প্রত্যক্ষ প্রেসক্রিপশনের বিকল্প নয়। সকল তথ্য DAE-এর গেজেটেড নিবন্ধিত বালাইনাশক তালিকা থেকে সংগৃহীত। প্রয়োগের পূর্বে অবশ্যই পণ্যের লেবেলে খোদাইকৃত রেজি. নম্বর মিলিয়ে নিন এবং নিকটস্থ উপ-সহকারী কৃষি কর্মকর্তা বা DAE ফিল্ড অফিসারের পরামর্শ গ্রহণ করুন। লেবেলের নির্দেশনা এই সরঞ্জামের সুপারিশের চেয়ে অগ্রাধিকার পাবে।'
                      : 'This recommendation acts as an automated resistance-prevention aid — it is NOT a substitute for a direct prescription by the Department of Agricultural Extension (DAE) or Plant Protection Wing. All data is sourced from the DAE gazetted register of approved pesticides. Before spraying, always cross-verify the registration number printed on the product label and consult your nearest Sub-Assistant Agriculture Officer or DAE Field Officer. The instructions on the product label always supersede this tool\'s recommendation.'}
                  </p>
                  <div className="flex flex-wrap items-center gap-3 pt-1.5 text-[10px] text-slate-400 font-semibold border-t border-slate-700 mt-1.5">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {language === 'bn' ? 'PHI মেনে চলুন' : 'Respect PHI'}
                    </span>
                    <span className="flex items-center gap-1">
                      <TrendingDown className="w-3 h-3" />
                      {language === 'bn' ? 'ভিন্ন MoA দিয়ে ঘূর্ণন করুন' : 'Rotate MoA groups'}
                    </span>
                    <span className="flex items-center gap-1">
                      <ShieldCheck className="w-3 h-3" />
                      {language === 'bn' ? 'সম্পূর্ণ PPE পরিধান করুন' : 'Wear full PPE'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
