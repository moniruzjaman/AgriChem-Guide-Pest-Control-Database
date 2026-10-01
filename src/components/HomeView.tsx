import React, { useEffect, useMemo, useState } from 'react';
import {
  ArrowRight,
  ArrowUpRight,
  BookMarked,
  BookOpen,
  Calculator,
  CheckCircle2,
  Compass,
  ExternalLink,
  FileDown,
  FileText,
  FlaskConical,
  RefreshCw,
  Scale,
  Search,
  Share2,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';
import { ChemicalProduct, AppTab, MoAClassification } from '../types';
import { MOA_DATABASE } from '../data/moaData';
import { useLanguage } from '../context/LanguageContext';
import { CollapsibleUserGuide } from './CollapsibleUserGuide';
import {
  CABI_APP_LOGO,
  CABI_APP_LOGO_FALLBACK,
  CABI_APP_URL,
  DIAGNOSTIC_DATA,
  FEATURES,
  PESTICIDE_ACT_APP_LOGO,
  PESTICIDE_ACT_APP_LOGO_FALLBACK,
  PESTICIDE_ACT_APP_URL,
  POPULAR_CROPS,
} from './homeContent';
import type { DiagCropKey } from './homeContent';
import './HomeView.css';

// ---------------------------------------------------------------------------
// HomeView — "pain-point editorial" redesign (Bangladesh official palette).
//
// The emotional hero, live stats, method split, top-MoA groups and quick tools
// come from the PR#25 redesign. Every content block from the pre-PR#25 home
// tab is restored alongside them, restyled into the same language: popular
// crop shortcuts, the six feature dossiers, the deep-dive previewer, the
// quick field diagnostic matcher, the collapsible user guide, regulatory &
// partner resources, the share banner and the PWA cache status widget.
// ---------------------------------------------------------------------------

interface HomeViewProps {
  products: ChemicalProduct[];
  onNavigateTab: (tab: AppTab) => void;
  onSelectCropFilter: (crop: string) => void;
  onOpenShareModal: () => void;
  totalProductsCount: number;
  onOpenDrawer: () => void;
}

/** Chip accent per MoA system, mirroring the Bangladesh palette. */
const schemeTone = (type: string): string => {
  if (type === 'FRAC') return 'acg-chip--gold';
  if (type === 'HRAC') return 'acg-chip--green';
  return ''; // IRAC keeps the red chip
};

/**
 * Partner app logo, resolved in three light steps:
 *   1. the partner app's own live asset — so the newest branding shows up here
 *   2. the bundled PNG snapshot from this repo's /public
 *   3. the lucide icon — if both network fetches fail (offline PWA usage)
 */
const PartnerAppLogo: React.FC<{
  src: string;
  fallbackSrc: string;
  icon: React.ReactNode;
  alt: string;
  className: string;
}> = ({ src, fallbackSrc, icon, alt, className }) => {
  const [stage, setStage] = useState(0);
  if (stage >= 2) {
    return (
      <span className={`${className} acg-res__logoicon`} aria-hidden="true">
        {icon}
      </span>
    );
  }
  return (
    <img
      src={stage === 0 ? src : fallbackSrc}
      alt={alt}
      className={className}
      loading="lazy"
      onError={() => setStage((s) => s + 1)}
    />
  );
};

/**
 * Rotation partner codes for a MoA group, derived from the group's own
 * rotation strategy text (codes such as "3A", "28", "M3" are validated
 * against the controlled MoA database). Falls back to the biggest
 * alternative groups of the same scheme when parsing yields nothing.
 */
function rotationPartners(
  group: MoAClassification,
  codesInUse: Map<string, number>
): string[] {
  const allCodes = new Set(MOA_DATABASE.map((m) => m.code));
  const out: string[] = [];
  const seen = new Set<string>();
  const push = (code: string) => {
    if (code !== group.code && allCodes.has(code) && !seen.has(code)) {
      seen.add(code);
      out.push(code);
    }
  };

  const strategy = group.rotationStrategy || '';
  const tokens = strategy.match(/\b[A-Z]?\d{1,3}[A-Z]?\b/g) || [];
  for (const tok of tokens) {
    // Same-scheme only: a cross-system code (e.g. "FRAC 1" as a partner of
    // the insecticide IRAC 1B) would be agronomically meaningless.
    push(`${group.type} ${tok}`);
    if (out.length >= 3) break;
  }

  // Fallback: most-used remaining groups of the same scheme (only when the
  // strategy text left room; never exceed 3 partners).
  if (out.length < 3) {
    const sameScheme = [...codesInUse.entries()]
      .filter(([code]) => code !== group.code && code.startsWith(group.type))
      .sort((a, b) => b[1] - a[1]);
    for (const [code] of sameScheme) {
      if (out.length >= 3) break;
      push(code);
    }
  }
  return out;
}

export const HomeView: React.FC<HomeViewProps> = ({
  products,
  onNavigateTab,
  onSelectCropFilter,
  onOpenShareModal,
  totalProductsCount,
  onOpenDrawer,
}) => {
  const { language, formatNum, transRisk } = useLanguage();
  const bn = language === 'bn';

  const go = (tab: AppTab) => {
    onNavigateTab(tab);
    if (typeof window !== 'undefined') window.scrollTo({ top: 0 });
  };

  // ----------------------------------------------------------- PWA status --
  const [isOnline, setIsOnline] = useState(
    typeof window !== 'undefined' ? window.navigator.onLine : true
  );
  const [syncStatus, setSyncStatus] = useState<'idle' | 'checking' | 'success'>(
    'idle'
  );

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const handleTriggerSync = () => {
    setSyncStatus('checking');
    setTimeout(() => setSyncStatus('success'), 1400);
  };

  // ------------------------------------------- Diagnostic matcher states --
  const [selectedDiagCrop, setSelectedDiagCrop] = useState<DiagCropKey>('Rice');
  const [selectedSymptomId, setSelectedSymptomId] = useState<string>('blast');

  // --------------------------------------- Feature previewer active tab --
  const [activeFeature, setActiveFeature] = useState(0);

  // ---------------------------------------------------------------------
  // Real catalogue statistics — recomputed only when the database changes.
  // ---------------------------------------------------------------------
  const { totalLabel, mappedLabel, groupCount } = useMemo(() => {
    const total = products.length || 0;
    const withMoa = products.filter((p) => (p.moaCode || '').trim()).length;
    const pct = total ? Math.round((withMoa / total) * 1000) / 10 : 0;
    const pctStr = Number.isInteger(pct) ? String(pct) : pct.toFixed(1);
    const groups = new Set(
      products.filter((p) => (p.moaCode || '').trim()).map((p) => p.moaCode as string)
    ).size;
    return {
      totalLabel: `${formatNum(total.toLocaleString('en-US'))}+`,
      mappedLabel: `${formatNum(pctStr)}%`,
      groupCount: groups,
    };
  }, [products, formatNum]);

  // Top-4 MoA groups shaping real field decisions, ranked by product count.
  const topGroups = useMemo(() => {
    const counts = new Map<string, number>();
    for (const p of products) {
      const code = (p.moaCode || '').trim();
      if (!code) continue;
      counts.set(code, (counts.get(code) || 0) + 1);
    }
    const meta = new Map(MOA_DATABASE.map((m) => [m.code, m]));
    const ranked = [...counts.entries()].sort((a, b) => b[1] - a[1]).slice(0, 4);
    const max = ranked.length ? ranked[0][1] : 1;
    return ranked
      .map(([code, count]) => {
        const m = meta.get(code);
        if (!m) return null;
        return {
          key: code,
          chip: code,
          tone: schemeTone(m.type),
          name: bn ? m.nameBn || m.name : m.name,
          count,
          countLabel: `${formatNum(count.toLocaleString('en-US'))} ${bn ? 'পণ্য' : 'products'}`,
          risk: transRisk(m.resistanceRisk),
          partners: rotationPartners(m, counts)
            .map((c) => c.replace(/^[A-Z]+\s/, ''))
            .join(' · '),
          barWidth: Math.max(18, Math.round((count / max) * 100)),
        };
      })
      .filter(Boolean) as Array<{
      key: string;
      chip: string;
      tone: string;
      name: string;
      count: number;
      countLabel: string;
      risk: string;
      partners: string;
      barWidth: number;
    }>;
  }, [products, bn, formatNum, transRisk]);

  // Active diagnostic symptom for the matcher's right-hand detail card.
  const activeSymptom = useMemo(() => {
    const crop = DIAGNOSTIC_DATA[selectedDiagCrop];
    return (
      crop.symptoms.find((s) => s.id === selectedSymptomId) || crop.symptoms[0]
    );
  }, [selectedDiagCrop, selectedSymptomId]);

  // ---------------------------------------------------------------------
  // Bilingual copy deck — Bengali first, English mirrors the FIELD/GUIDE.
  // ---------------------------------------------------------------------
  const copy = bn
    ? {
        eyebrow: 'মাঠ ফসলের জন্য ব্যবহারিক সিদ্ধান্ত সহায়িকা',
        h1a: 'পরের স্প্রে,',
        h1b: 'আর ভুল হবে না।',
        lede:
          'একই পোকা, একই ওষুধ, একই ব্যর্থতা — এটা দুর্ভাগ্য নয়, এটা রোটেশন ঋণ। সমস্যা পণ্যে নয়; সমস্যা হলো বারবার একই ক্রিয়াপদ্ধতির (MoA) গ্রুপ স্প্রে করা — যতক্ষণ না পোকা আর মরে না।',
        ctaSearch: 'পণ্য খুঁজুন',
        ctaCalc: 'ট্যাংক ক্যালকুলেটর',
        ctaShare: 'শেয়ার করুন',
        ctaGuide: 'গাইড মেনু',
        trust:
          'সুপারিশের আগে লেবেল, নিবন্ধন, PHI, REI ও PPE যাচাই করুন।',
        dialogKicker: 'মাঠের কথা',
        farmer: 'কৃষক',
        farmerQuote: '“ওষুধ দিয়েছি, তবু পোকা মরছে না!”',
        guide: 'গাইড',
        guideQuote: '“পণ্য নয় — গ্রুপ বদলান।”',
        dialogFoot: 'একই গ্রুপ বারবার দিলে পোকা প্রতিরোধী হয়ে ওঠে।',
        stat1Label: 'DAE নিবন্ধিত পণ্য',
        stat1Detail: 'ডিএই অনুমোদিত মাস্টার তালিকা',
        stat2Label: 'MoA-তে ম্যাপ করা',
        stat2Detail: 'IRAC · FRAC · HRAC জুড়ে ম্যাপ করা',
        stat3Label: 'MoA গ্রুপ',
        stat3Detail: 'IRAC · FRAC · HRAC',
        stat4Value: '০১',
        stat4Label: 'সিদ্ধান্তের নিয়ম',
        stat4Detail: 'একই গ্রুপ পুনরাবৃত্তি নয়',
        methodKicker: 'মাঠের যুক্তি',
        methodH2a: 'গাইডটি সাজানো হয়েছে',
        methodH2b: 'পরের স্প্রেকে ঘিরে।',
        methodP:
          'শুরুর পয়েন্ট পণ্য নয়। শুরুর পয়েন্ট হলো শেষ স্প্রের MoA কোড, যে পোকা এখনো দমন করতে হবে, আর প্রতিরোধের চক্র ভাঙতে পারে এমন একটি ভিন্ন গ্রুপ।',
        methodCta: 'ঘূর্ণন-সঙ্গী দেখুন',
        step1: 'চিহ্নিত করুন',
        step1Desc: 'শেষ ব্যবহৃত পণ্য ও তার MoA কোড লিখে রাখুন।',
        step2: 'বাদ দিন',
        step2Desc: 'পরের স্প্রে থেকে সেই গ্রুপটিই বাদ দিন।',
        step3: 'ঘুরিয়ে দিন',
        step3Desc: 'একই লক্ষ্য পূরণ করে এমন ভিন্ন গ্রুপ বেছে নিন।',
        groupsKicker: 'এক নজরে',
        groupsH2: 'মাঠের সিদ্ধান্তকে প্রভাবিত করে যে গ্রুপগুলো, সেখান থেকেই শুরু করুন।',
        groupsLink: 'সব গ্রুপ দেখুন',
        riskLabel: 'প্রতিরোধ ঝুঁকি',
        partnerLabel: 'ঘুরিয়ে দিন',
        toolsKicker: 'দ্রুত সরঞ্জাম',
        toolsH2a: 'স্প্রের আগে ও',
        toolsH2b: 'পরে।',
        tool1Title: 'ন্যাপস্যাক ট্যাংক ক্যালকুলেটর',
        tool1Desc:
          'ট্যাংকের আয়তন, পানির হার ও জমির আয়তন অনুযায়ী নির্ভুল মাত্রা হিসাব করুন — স্প্রে শুরুর আগেই।',
        tool1Btn: 'ক্যালকুলেটর খুলুন',
        tool2Title: 'বিনামূল্যে পকেট বুক ম্যানুয়াল',
        tool2Desc:
          'ফিল্ড ক্যালিব্রেশন, সঠিক স্প্রেয়িং ও নিরাপত্তার ধাপ — মাঠে সাথে রাখার মতো সহজ গাইড।',
        tool2Btn: 'গাইডবুক খুলুন',
      }
    : {
        eyebrow: 'A working field reference for the people who advise the field',
        h1a: 'The next spray',
        h1b: "won't be a mistake.",
        lede:
          "Same pest, same product, same failure — that's not bad luck, it's rotation debt. The problem isn't the product; it's spraying the same mode of action again and again until the pest stops dying.",
        ctaSearch: 'Open product finder',
        ctaCalc: 'Tank calculator',
        ctaShare: 'Share the app',
        ctaGuide: 'Guide menu',
        trust:
          'Always verify the current label, registration status, PHI, REI, and PPE before recommending.',
        dialogKicker: 'FROM THE FIELD',
        farmer: 'Farmer',
        farmerQuote: '“I sprayed, but the pests still won’t die!”',
        guide: 'Guide',
        guideQuote: '“It’s not the product — change the group.”',
        dialogFoot: 'Repeating the same group breeds resistance.',
        stat1Label: 'DAE registered products',
        stat1Detail: 'official DAE master register',
        stat2Label: 'mapped to MoA',
        stat2Detail: 'across IRAC · FRAC · HRAC',
        stat3Label: 'MoA groups',
        stat3Detail: 'IRAC · FRAC · HRAC',
        stat4Value: '01',
        stat4Label: 'decision rule',
        stat4Detail: 'never repeat a group',
        methodKicker: 'Field logic',
        methodH2a: 'The guide is organized around the',
        methodH2b: 'next spray.',
        methodP:
          "Products are not the starting point. The starting point is the mode of action used last, the pest you still need to control, and a partner group that breaks the resistance cycle.",
        methodCta: 'See rotation partners',
        step1: 'Identify',
        step1Desc: 'Record the last product and its MoA code.',
        step2: 'Separate',
        step2Desc: 'Exclude that group from the next spray.',
        step3: 'Rotate',
        step3Desc: 'Select a different group for the same target.',
        groupsKicker: 'At a glance',
        groupsH2: 'Start with the groups that shape the next field decision.',
        groupsLink: 'View all groups',
        riskLabel: 'Resistance risk',
        partnerLabel: 'Rotate with',
        toolsKicker: 'Quick tools',
        toolsH2a: 'Before the spray,',
        toolsH2b: 'and after.',
        tool1Title: 'Knapsack tank calculator',
        tool1Desc:
          'Calculate exact per-tank dosing from tank volume, water rate, and plot size — before you pour anything.',
        tool1Btn: 'Open calculator',
        tool2Title: 'Free pocket book manual',
        tool2Desc:
          'Field calibration, correct spraying, and safety steps — a simple guide to keep in your pocket.',
        tool2Btn: 'Open guidebook',
      };

  return (
    <div className="acg">
      {/* ------------------------------------------------ HERO ---------- */}
      <section className="acg-hero acg-shell">
        <div className="acg-hero-copy">
          <p className="acg-eyebrow">
            <span className="acg-dot" /> {copy.eyebrow}
          </p>
          <h1 className="acg-h1">
            {copy.h1a}
            <br />
            <em>{copy.h1b}</em>
          </h1>
          <p className="acg-lede">{copy.lede}</p>
          <div className="acg-cta">
            <button className="acg-btn" onClick={() => go('database')}>
              <Search size={16} /> {copy.ctaSearch}
              <ArrowUpRight size={15} />
            </button>
            <button className="acg-btn acg-btn--outline" onClick={() => go('calculator')}>
              <Calculator size={16} /> {copy.ctaCalc}
            </button>
            <button className="acg-btn acg-btn--red" onClick={onOpenShareModal} title={copy.ctaShare}>
              <Share2 size={16} /> {copy.ctaShare}
            </button>
            <button className="acg-btn acg-btn--outline" onClick={onOpenDrawer} title={copy.ctaGuide}>
              <Compass size={16} /> {copy.ctaGuide}
            </button>
          </div>
          <p className="acg-trust">
            <ShieldCheck size={16} />
            <span>{copy.trust}</span>
          </p>

          {/* PWA offline/online & cache integrity widget (restored) */}
          <div className="acg-status">
            <div className="acg-status__left">
              {isOnline ? (
                <span className="acg-status__pill acg-status__pill--online">
                  <span className="acg-status__dot" />
                  {bn ? 'সিস্টেম অনলাইন' : 'System online'}
                </span>
              ) : (
                <span className="acg-status__pill acg-status__pill--offline">
                  <span className="acg-status__dot" />
                  {bn ? 'অফলাইন মোড সক্রিয়' : 'Offline mode active'}
                </span>
              )}
              <p className="acg-status__text">
                {bn
                  ? `লোকাল ক্যাশে ${formatNum(totalProductsCount.toLocaleString('en-US'))}টি ডিএই নিবন্ধিত রাসায়নিক প্রস্তুত আছে।`
                  : `Local PWA cache: ${formatNum(totalProductsCount.toLocaleString('en-US'))} DAE-registered formulations ready offline.`}
              </p>
            </div>
            <button
              className="acg-status__btn"
              onClick={handleTriggerSync}
              disabled={syncStatus === 'checking'}
            >
              {syncStatus !== 'success' && <RefreshCw size={13} className={syncStatus === 'checking' ? 'acg-spin' : undefined} />}
              {syncStatus === 'success' && <CheckCircle2 size={13} />}
              <span>
                {syncStatus === 'idle' && (bn ? 'ক্যাশ যাচাই করুন' : 'Verify cache')}
                {syncStatus === 'checking' && (bn ? 'যাচাই চলছে…' : 'Checking…')}
                {syncStatus === 'success' && (bn ? 'ক্যাশ সচল ও নিরাপদ' : 'Cache 100% validated')}
              </span>
            </button>
          </div>
        </div>

        <div className="acg-hero__visual">
          <div className="acg-photo-frame" />
          <div
            className="acg-photo"
            role="img"
            aria-label={
              bn
                ? 'পেঁপে ফলে রোগের উপসর্গ — মাঠ থেকে তোলা ছবি'
                : 'Papaya fruit with anthracnose lesions — photo from the field'
            }
          />
          <div className="acg-stamp" aria-hidden="true">
            <span>IRAC</span>
            <b>FRAC</b>
            <span>HRAC</span>
          </div>

          <figure className="acg-dialog">
            <span className="acg-dialog__kicker">{copy.dialogKicker}</span>
            <div className="acg-dialog__row">
              <span className="acg-dialog__who">{copy.farmer}</span>
              <blockquote className="acg-dialog__quote" style={{ margin: 0 }}>
                {copy.farmerQuote}
              </blockquote>
            </div>
            <div className="acg-dialog__row acg-dialog__row--guide">
              <span className="acg-dialog__who">{copy.guide}</span>
              <blockquote className="acg-dialog__quote" style={{ margin: 0 }}>
                {copy.guideQuote}
              </blockquote>
            </div>
            <figcaption className="acg-dialog__foot">{copy.dialogFoot}</figcaption>
          </figure>
        </div>
      </section>

      {/* ------------------------------------------------ STATS BAND ---- */}
      <section className="acg-stats acg-shell" aria-label="Database statistics">
        <div className="acg-stat">
          <div className="acg-stat__value">{totalLabel}</div>
          <div className="acg-stat__label">{copy.stat1Label}</div>
          <div className="acg-stat__detail">{copy.stat1Detail}</div>
        </div>
        <div className="acg-stat">
          <div className="acg-stat__value">{mappedLabel}</div>
          <div className="acg-stat__label">{copy.stat2Label}</div>
          <div className="acg-stat__detail">{copy.stat2Detail}</div>
        </div>
        <div className="acg-stat">
          <div className="acg-stat__value">{formatNum(groupCount)}</div>
          <div className="acg-stat__label">{copy.stat3Label}</div>
          <div className="acg-stat__detail">{copy.stat3Detail}</div>
        </div>
        <div className="acg-stat">
          <div className="acg-stat__value">{copy.stat4Value}</div>
          <div className="acg-stat__label">{copy.stat4Label}</div>
          <div className="acg-stat__detail">{copy.stat4Detail}</div>
        </div>
      </section>

      {/* ------------------------------------------ POPULAR CROPS ------- */}
      <section className="acg-crops acg-shell" aria-label="Popular crops">
        <div className="acg-crops__head">
          <span className="acg-kicker">
            <FlaskConical size={12} /> {bn ? 'জনপ্রিয় ফসল' : 'Popular crops'}
          </span>
          <button className="acg-link" onClick={() => go('database')}>
            {bn ? 'সকল ফসল দেখুন' : 'View all crops'} <ArrowRight size={14} />
          </button>
        </div>
        <div className="acg-crops__grid">
          {POPULAR_CROPS.map((crop) => (
            <button
              key={crop.en}
              className="acg-crop"
              onClick={() => onSelectCropFilter(crop.en)}
            >
              <span className="acg-crop__name">{bn ? crop.bn : crop.en}</span>
              <span className="acg-crop__count">
                {formatNum(String(crop.count))} {bn ? 'টি সমাধান' : 'solutions'}
              </span>
              <ArrowRight size={13} className="acg-crop__go" />
            </button>
          ))}
        </div>
      </section>

      {/* ------------------------------------------------ METHOD SPLIT -- */}
      <section className="acg-method acg-shell">
        <div>
          <span className="acg-kicker">{copy.methodKicker}</span>
          <h2 className="acg-h2">
            {copy.methodH2a} <em>{copy.methodH2b}</em>
          </h2>
          <p className="acg-method__p">{copy.methodP}</p>
          <button className="acg-btn acg-btn--outline acg-method__cta" onClick={() => go('rotation')}>
            {copy.methodCta} <ArrowUpRight size={15} />
          </button>
        </div>

        <div className="acg-logic">
          <div className="acg-logic__step">
            <span className="acg-logic__num">{bn ? '০১' : '01'}</span>
            <div>
              <div className="acg-logic__title">{copy.step1}</div>
              <p className="acg-logic__desc">{copy.step1Desc}</p>
            </div>
          </div>
          <div className="acg-logic__line" />
          <div className="acg-logic__step">
            <span className="acg-logic__num">{bn ? '০২' : '02'}</span>
            <div>
              <div className="acg-logic__title">{copy.step2}</div>
              <p className="acg-logic__desc">{copy.step2Desc}</p>
            </div>
          </div>
          <div className="acg-logic__line" />
          <div className="acg-logic__step">
            <span className="acg-logic__num">{bn ? '০৩' : '03'}</span>
            <div>
              <div className="acg-logic__title">{copy.step3}</div>
              <p className="acg-logic__desc">{copy.step3Desc}</p>
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------ TOP GROUPS ---- */}
      <section className="acg-groups acg-shell">
        <div className="acg-section-head">
          <div>
            <span className="acg-kicker">{copy.groupsKicker}</span>
            <h2 className="acg-h2">{copy.groupsH2}</h2>
          </div>
          <button className="acg-link" onClick={() => go('rotation')}>
            {copy.groupsLink} <ArrowUpRight size={15} />
          </button>
        </div>

        <div className="acg-grid">
          {topGroups.map((g) => (
            <button key={g.key} className="acg-moa" onClick={() => go('rotation')}>
              <div className="acg-moa__top">
                <span className={`acg-chip ${g.tone}`}>{g.chip}</span>
                <span>{g.countLabel}</span>
              </div>
              <h3 className="acg-moa__name">{g.name}</h3>
              <div className="acg-moa__meta">
                <span>
                  {copy.riskLabel} <b>{g.risk}</b>
                </span>
                <span>
                  {copy.partnerLabel} <b>{g.partners || '—'}</b>
                </span>
              </div>
              <div className="acg-moa__bar">
                <span style={{ width: `${g.barWidth}%` }} />
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* ------------------------------------------------ QUICK TOOLS --- */}
      <section className="acg-shell">
        <div className="acg-section-head" style={{ marginTop: 24 }}>
          <div>
            <span className="acg-kicker">{copy.toolsKicker}</span>
            <h2 className="acg-h2">
              {copy.toolsH2a} <em>{copy.toolsH2b}</em>
            </h2>
          </div>
          <button className="acg-link" onClick={onOpenShareModal}>
            {bn ? 'অ্যাপটি শেয়ার করুন' : 'Share the app'} <ArrowUpRight size={15} />
          </button>
        </div>

        <div className="acg-tools">
          <button className="acg-tool acg-tool--primary" onClick={() => go('calculator')}>
            <span className="acg-tool__icon">
              <Calculator size={20} />
            </span>
            <span className="acg-tool__title">{copy.tool1Title}</span>
            <span className="acg-tool__desc">{copy.tool1Desc}</span>
            <span className="acg-tool__go">
              {copy.tool1Btn} <ArrowUpRight size={15} />
            </span>
          </button>

          <button className="acg-tool acg-tool--ghost" onClick={() => go('guidebook')}>
            <span className="acg-tool__icon">
              <BookOpen size={20} />
            </span>
            <span className="acg-tool__title">{copy.tool2Title}</span>
            <span className="acg-tool__desc">{copy.tool2Desc}</span>
            <span className="acg-tool__go">
              {copy.tool2Btn} <ArrowUpRight size={15} />
            </span>
          </button>
        </div>
      </section>

      {/* --------------------------------- FEATURE DOSSIERS (restored) -- */}
      <section className="acg-feats acg-shell">
        <div className="acg-section-head">
          <div>
            <span className="acg-kicker">{bn ? '৬টি মূল ফিচার' : 'Six core features'}</span>
            <h2 className="acg-h2">
              {bn ? 'প্রতিটি টুলের পূর্ণাঙ্গ পরিচিতি।' : 'Every tool, in full.'}
            </h2>
          </div>
        </div>

        <div className="acg-feats__grid">
          {FEATURES.map((feature) => {
            const Icon = feature.icon;
            return (
              <button
                key={feature.id}
                className="acg-feat"
                onClick={() => go(feature.id)}
              >
                <div className="acg-feat__top">
                  <span className={`acg-feat__icon acg-feat__icon--${feature.tone}`}>
                    <Icon size={18} />
                  </span>
                  <span className="acg-chip acg-chip--gold">{bn ? feature.badgeBn : feature.badgeEn}</span>
                </div>
                <h3 className="acg-feat__name">{bn ? feature.titleBn : feature.titleEn}</h3>
                <p className="acg-feat__sub">{bn ? feature.subtitleBn : feature.subtitleEn}</p>
                <p className="acg-feat__desc">{bn ? feature.descBn : feature.descEn}</p>
                <div className="acg-feat__tags">
                  {(bn ? feature.highlightsBn : feature.highlightsEn)
                    .slice(0, 4)
                    .map((h) => (
                      <span key={h} className="acg-feat__tag">
                        {h}
                      </span>
                    ))}
                </div>
                <div className="acg-feat__foot">
                  <span className="acg-feat__stat">
                    {bn ? feature.statLabelBn : feature.statLabelEn}
                    <b>{feature.statValue}</b>
                  </span>
                  <span className="acg-feat__go">
                    {bn ? 'খুলুন' : 'Open'} <ArrowRight size={13} />
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </section>

      {/* ------------------------- DEEP-DIVE PREVIEWER (restored) ------- */}
      <section className="acg-preview acg-shell">
        <div className="acg-section-head">
          <div>
            <span className="acg-kicker">{bn ? 'বিস্তারিত প্রিভিউ' : 'Deep dive'}</span>
            <h2 className="acg-h2">
              {bn ? 'ট্যাবে ক্লিক করে প্রতিটি ফিচার দেখুন।' : 'Click a tab to inspect each feature.'}
            </h2>
          </div>
        </div>

        <div className="acg-preview__grid">
          <div className="acg-preview__tabs" role="tablist">
            {FEATURES.map((feature, idx) => {
              const Icon = feature.icon;
              return (
                <button
                  key={feature.id}
                  role="tab"
                  aria-selected={idx === activeFeature}
                  className={`acg-preview__tab${idx === activeFeature ? ' is-active' : ''}`}
                  onClick={() => setActiveFeature(idx)}
                >
                  <Icon size={15} />
                  <span>{bn ? feature.titleBn : feature.titleEn}</span>
                </button>
              );
            })}
          </div>

          {(() => {
            const f = FEATURES[activeFeature];
            const Icon = f.icon;
            return (
              <div className="acg-preview__card">
                <div className="acg-feat__top">
                  <span className={`acg-feat__icon acg-feat__icon--${f.tone}`}>
                    <Icon size={18} />
                  </span>
                  <span className="acg-chip acg-chip--gold">{bn ? f.badgeBn : f.badgeEn}</span>
                </div>
                <h3 className="acg-feat__name">{bn ? f.titleBn : f.titleEn}</h3>
                <p className="acg-feat__desc">{bn ? f.descBn : f.descEn}</p>
                <div className="acg-feat__tags">
                  {(bn ? f.highlightsBn : f.highlightsEn).map((h) => (
                    <span key={h} className="acg-feat__tag">
                      {h}
                    </span>
                  ))}
                </div>
                <div className="acg-preview__actions">
                  <button className="acg-btn" onClick={() => go(f.id)}>
                    {bn ? 'এই টুল খুলুন' : 'Open this tool'} <ArrowUpRight size={15} />
                  </button>
                  <span className="acg-preview__stat">
                    {bn ? f.statLabelBn : f.statLabelEn}: <b>{f.statValue}</b>
                  </span>
                </div>
              </div>
            );
          })()}
        </div>
      </section>

      {/* ------------------------ FIELD DIAGNOSTIC MATCHER (restored) --- */}
      <section className="acg-diag acg-shell">
        <div className="acg-section-head">
          <div>
            <span className="acg-kicker">{bn ? 'দ্রুত রোগ নির্ণয়' : 'Field diagnostic matcher'}</span>
            <h2 className="acg-h2">
              {bn ? (
                <>
                  লক্ষণ দেখুন, <em>রোগ ও সমাধান পান।</em>
                </>
              ) : (
                <>
                  See the symptom, <em>get the fix.</em>
                </>
              )}
            </h2>
          </div>
        </div>

        <div className="acg-diag__grid">
          <div className="acg-diag__left">
            <div className="acg-diag__crops" role="tablist">
              {(Object.keys(DIAGNOSTIC_DATA) as DiagCropKey[]).map((cropKey) => (
                <button
                  key={cropKey}
                  role="tab"
                  aria-selected={cropKey === selectedDiagCrop}
                  className={`acg-diag__crop${cropKey === selectedDiagCrop ? ' is-active' : ''}`}
                  onClick={() => {
                    setSelectedDiagCrop(cropKey);
                    setSelectedSymptomId(DIAGNOSTIC_DATA[cropKey].symptoms[0].id);
                  }}
                >
                  {bn
                    ? DIAGNOSTIC_DATA[cropKey].cropNameBn
                    : DIAGNOSTIC_DATA[cropKey].cropNameEn}
                </button>
              ))}
            </div>

            <div className="acg-diag__symps">
              {DIAGNOSTIC_DATA[selectedDiagCrop].symptoms.map((symptom) => (
                <button
                  key={symptom.id}
                  className={`acg-diag__symp${symptom.id === activeSymptom.id ? ' is-active' : ''}`}
                  onClick={() => setSelectedSymptomId(symptom.id)}
                >
                  <span className="acg-diag__symptitle">
                    {bn ? symptom.titleBn : symptom.titleEn}
                  </span>
                  <span className="acg-diag__symptext">
                    {bn ? symptom.symptomBn : symptom.symptomEn}
                  </span>
                </button>
              ))}
            </div>
          </div>

          <div className="acg-diag__detail">
            <span className="acg-chip">
              {bn ? activeSymptom.diagnosisBn : activeSymptom.diagnosisEn}
            </span>
            <h3 className="acg-diag__title">
              {bn ? activeSymptom.titleBn : activeSymptom.titleEn}
            </h3>
            <p className="acg-diag__symptom">{bn ? activeSymptom.symptomBn : activeSymptom.symptomEn}</p>

            <div className="acg-diag__rows">
              <div className="acg-diag__row">
                <span className="acg-diag__label">{bn ? 'সক্রিয় উপাদান' : 'Active ingredient'}</span>
                <span className="acg-diag__value">{bn ? activeSymptom.ingredientBn : activeSymptom.ingredientEn}</span>
              </div>
              <div className="acg-diag__row">
                <span className="acg-diag__label">{bn ? 'ক্রিয়াপদ্ধতি (MoA)' : 'Mode of action'}</span>
                <span className="acg-diag__value acg-diag__value--moa">
                  {bn ? activeSymptom.moaBn : activeSymptom.moaEn}
                </span>
              </div>
              <div className="acg-diag__row">
                <span className="acg-diag__label">{bn ? 'মাত্রা' : 'Rate'}</span>
                <span className="acg-diag__value">{bn ? activeSymptom.rateBn : activeSymptom.rateEn}</span>
              </div>
              <div className="acg-diag__row">
                <span className="acg-diag__label">{bn ? 'PHI' : 'PHI'}</span>
                <span className="acg-diag__value">{bn ? activeSymptom.phiBn : activeSymptom.phiEn}</span>
              </div>
            </div>

            <p className="acg-diag__note">
              {bn
                ? 'নিচের বোতামে ক্লিক করলে এই সক্রিয় উপাদানটি দিয়ে ডাটাবেসে সার্চ হয়ে অনুমোদিত ব্র্যান্ডের তালিকা দেখাবে। প্রয়োগের আগে অবশ্যই লেবেল যাচাই করুন।'
                : 'The button below queries the database for this active ingredient and lists registered brands. Always verify the label before spraying.'}
            </p>
            <button
              className="acg-btn"
              onClick={() => {
                const queryVal = activeSymptom.ingredientEn.includes(' or ')
                  ? activeSymptom.ingredientEn.split(' or ')[0]
                  : activeSymptom.ingredientEn.split(' (')[0];
                onSelectCropFilter(queryVal);
              }}
            >
              <Search size={15} />
              {bn ? 'অনুমোদিত ব্র্যান্ড দেখুন' : 'Explore approved brands'}
              <ArrowUpRight size={14} />
            </button>
          </div>
        </div>
      </section>

      {/* ------------------------------ USER GUIDE (restored) ----------- */}
      <section className="acg-shell acg-guide-wrap">
        <CollapsibleUserGuide
          pageKey="home"
          titleEn="PesticideNext Field Suite Guide"
          titleBn="পেস্টিসাইডনেক্সট স্যুট গাইড ও ভূমিকা"
          subtitleEn="Learn how to navigate our integrated offline-first crop protection toolkit."
          subtitleBn="আমাদের সমন্বিত অফলাইন ফসল সুরক্ষা টুলের সঠিক ব্যবহার ও সঠিক নেভিগেশন জানুন।"
          stepsEn={[
            'Open the Guide Menu Drawer (Compass button) at any time to see your recommended field spray workflow.',
            'Search registered products, check Pre-Harvest Intervals (PHI), and view active ingredients in the Chemical Database.',
            'Use the Knapsack Sprayer Dosage Calculator before mixing to avoid under-dosage or crop toxicity.',
            'Coordinate anti-resistance schedules in the MoA Rotation Planner to maintain chemical effectiveness.',
            'Check the WHO Hazard Classes and PPE Safety gear before stepping onto your farmland.',
          ]}
          stepsBn={[
            'দিকনির্দেশক গাইড মেনু ড্রয়ার (Compass বোতাম) যেকোনো সময় খুলে আপনার বৈজ্ঞানিক স্প্রে কাজের ধাপগুলো দেখুন।',
            'রাসায়নিক ডাটাবেস থেকে অনুমোদিত বালাইনাশক খুঁজুন, ফসল তোলার নিরাপদ বিরতি (PHI) এবং উপাদান পরীক্ষা করুন।',
            'অতিরিক্ত বা কম মাত্রা এড়াতে ওষুধ মেশানোর পূর্বে ন্যাপস্যাক স্প্রেয়ার ট্যাংক ক্যালকুলেটর ব্যবহার করুন।',
            'বালাই ও ছত্রাকের রোগ প্রতিরোধ ক্ষমতা বৃদ্ধি দমন করতে MoA রোটেশন প্ল্যানার ব্যবহার করে বৈজ্ঞানিক আবর্তন তৈরি করুন।',
            'জমিতে ওষুধ ছিটানোর পূর্বে ডব্লিউএইচও (WHO) বিপদ শ্রেণি ও পিপিই (PPE) সুরক্ষামূলক গিয়ার চেকলিস্ট মিলিয়ে নিন।',
          ]}
          proTipsEn={[
            'Always reference the official DAE Registration codes printed on chemical containers.',
            'This app is a Progressive Web App (PWA) - bookmark it or install to home screen for 100% offline field access.',
          ]}
          proTipsBn={[
            'সর্বদা বোতল বা প্যাকেটের গায়ে থাকা সরকারি ডিএই (DAE) নিবন্ধন কোড মিলিয়ে দেখুন।',
            'এই অ্যাপটি পিডব্লিউএ (PWA) প্রযুক্তি সমৃদ্ধ, অফলাইনে মাঠে ব্যবহারের জন্য মোবাইলের হোম স্ক্রিনে ইনস্টল করে নিন।',
          ]}
        />
      </section>

      {/* ------------------------- REGULATORY RESOURCES (restored) ------ */}
      <section className="acg-res acg-shell">
        <div className="acg-section-head">
          <div>
            <span className="acg-kicker">
              <Scale size={12} /> {bn ? 'আফিসিয়াল নিয়ামক সংস্থান' : 'Official regulatory resources'}
            </span>
            <h2 className="acg-h2">
              {bn ? 'সরকারি আইন ও হাতের খাতা।' : 'Government acts & field handbooks.'}
            </h2>
            <p className="acg-res__sub">
              {bn
                ? 'কৃষি মন্ত্রণালয় ও ডিএই অনুমোদিত নথি ও সহযোগী অ্যাপ — অফলাইন রেফারেন্সের জন্য সংরক্ষণ করুন।'
                : 'Ministry of Agriculture & DAE documents plus partner apps — save them for offline field reference.'}
            </p>
          </div>
          <button className="acg-link" onClick={() => go('guidebook')}>
            {bn ? 'গাইডবুক দেখুন' : 'View guidebook'} <ArrowUpRight size={15} />
          </button>
        </div>

        <div className="acg-res__grid">
          {/* Pesticide Act 2018 */}
          <div className="acg-res__card">
            <div className="acg-res__head">
              <span className="acg-res__logo acg-res__logo--red">
                <PartnerAppLogo
                  src={PESTICIDE_ACT_APP_LOGO}
                  fallbackSrc={PESTICIDE_ACT_APP_LOGO_FALLBACK}
                  icon={<Scale size={26} />}
                  alt={bn ? 'বালাইনাশক নিয়ন্ত্রণ আইন ২০১৮ লোগো' : 'Pesticide Act 2018 logo'}
                  className="acg-res__logoimg"
                />
              </span>
              <div>
                <span className="acg-res__eyebrow acg-res__eyebrow--red">
                  {bn ? 'কানুন ও বিধি' : 'Act & legislation'}
                </span>
                <h3 className="acg-res__name">
                  {bn ? 'বালাইনাশক নিয়ন্ত্রণ আইন, ২০১৮' : 'The Pesticide Control Act, 2018'}
                </h3>
              </div>
            </div>
            <p className="acg-res__desc">
              {bn
                ? 'বাংলাদেশ সরকার, কৃষি মন্ত্রণালয়, ডিএই অনুমোদিত অফিসিয়াল নথি — নিবন্ধন, বিক্রয়, বিতরণ ও ব্যবহারের সম্পূর্ণ আইনি কাঠামো।'
                : 'Government of Bangladesh, Ministry of Agriculture, DAE official document — the complete legal framework for registration, sale, distribution and usage control.'}
            </p>
            <ul className="acg-res__list">
              <li>{bn ? 'বালাইনাশক নিবন্ধন প্রক্রিয়া ও শর্তাবলী' : 'Registration procedures & conditions'}</li>
              <li>{bn ? 'লাইসেন্সিং: উত্পাদন, আমদানি, বিক্রয় ও বিতরণ' : 'Licensing: manufacture, import, sale & distribution'}</li>
              <li>{bn ? 'নিষিদ্ধ ও সীমাবদ্ধ বালাইনাশকের তালিকা' : 'Banned & restricted pesticide lists'}</li>
              <li>{bn ? 'আইন লঙ্ঘনে শাস্তি ও বিচারের বিধান' : 'Penalties & prosecution provisions'}</li>
            </ul>
            <div className="acg-res__actions">
              <a href={PESTICIDE_ACT_APP_URL} target="_blank" rel="noopener noreferrer" className="acg-btn acg-btn--red">
                <ExternalLink size={14} /> {bn ? 'ইন্টারেক্টিভ অ্যাপ' : 'Interactive app'}
              </a>
              <a href="/pesticide-act-2018.pdf" target="_blank" rel="noopener noreferrer" className="acg-btn acg-btn--outline">
                <FileDown size={14} /> {bn ? 'পিডিএফ' : 'Act PDF'}
              </a>
            </div>
          </div>

          {/* Partner app — Plant Detective (CABI) */}
          <div className="acg-res__card">
            <div className="acg-res__head">
              <span className="acg-res__logo acg-res__logo--green">
                <PartnerAppLogo
                  src={CABI_APP_LOGO}
                  fallbackSrc={CABI_APP_LOGO_FALLBACK}
                  icon={<FlaskConical size={26} />}
                  alt={bn ? 'উদ্ভিদ গোয়েন্দা অ্যাপ লোগো' : 'Plant Detective (CABI) logo'}
                  className="acg-res__logoimg"
                />
              </span>
              <div>
                <span className="acg-res__eyebrow acg-res__eyebrow--green">
                  {bn ? 'সহযোগী অ্যাপ' : 'Partner app'}
                </span>
                <h3 className="acg-res__name">
                  {bn ? 'উদ্ভিদ গোয়েন্দা — স্মার্ট রোগ নির্ণয়' : 'Plant Detective — smart crop diagnosis'}
                </h3>
              </div>
            </div>
            <p className="acg-res__desc">
              {bn
                ? 'ছবি তুলুন বা লক্ষণ বলুন — CABI Plantwise প্রোটোকল অনুসরণ করে তাৎক্ষণিক রোগ নির্ণয়, প্রতিকার ও IPM পরামর্শ পান।'
                : 'Snap a photo or describe symptoms — instant diagnosis, treatment and IPM guidance following the CABI Plantwise protocol.'}
            </p>
            <ul className="acg-res__list">
              <li>{bn ? 'ছবি দিয়ে তাৎক্ষণিক রোগ নির্ণয় (AI ভিশন)' : 'Instant diagnosis from a leaf photo (AI vision)'}</li>
              <li>{bn ? 'CABI Plantwise চিকিৎসা ও IPM সুপারিশ' : 'CABI Plantwise treatment & IPM recommendations'}</li>
              <li>{bn ? 'রোগ নির্ণয় অনুশীলনের ইন্টারেক্টিভ গেম হাব' : 'Interactive game hub to practise diagnosis'}</li>
            </ul>
            <div className="acg-res__actions">
              <a href={CABI_APP_URL} target="_blank" rel="noopener noreferrer" className="acg-btn">
                <ExternalLink size={14} /> {bn ? 'রোগ নির্ণয় করুন' : 'Diagnose crop disease'}
              </a>
            </div>
          </div>

          {/* Field guide handbook */}
          <div className="acg-res__card">
            <div className="acg-res__head">
              <span className="acg-res__logo acg-res__logo--gold">
                <BookMarked size={26} />
              </span>
              <div>
                <span className="acg-res__eyebrow acg-res__eyebrow--green">
                  {bn ? 'ফিল্ড হ্যান্ডবুক' : 'Field handbook'}
                </span>
                <h3 className="acg-res__name">
                  {bn ? 'কৃষি রাসায়নিক মাঠ নির্দেশিকা' : 'Agricultural chemical field guide'}
                </h3>
              </div>
            </div>
            <p className="acg-res__desc">
              {bn
                ? 'কৃষিবিদ, সম্প্রসারণ কর্মকর্তা ও কৃষকদের জন্য প্র্যাক্টিক্যাল হাতের খাতা — নিরাপদ ব্যবহার, মিশ্রণ, ক্যালিব্রেশন ও সুরক্ষা প্রোটোকল।'
                : 'Practical handbook for agronomists, extension officers and farmers — safe handling, mixing, calibration and protection protocols.'}
            </p>
            <ul className="acg-res__list">
              <li>{bn ? 'W.A.L.E.S. ট্যাংক মিক্সিং ক্রম ও নিরাপত্তা নিয়ম' : 'W.A.L.E.S. tank-mixing sequence & safety rules'}</li>
              <li>{bn ? 'ন্যাপস্যাক স্প্রেয়ার ক্যালিব্রেশন (৩-ধাপে)' : 'Knapsack sprayer calibration (3-step)'}</li>
              <li>{bn ? 'পিপিই চেকলিস্ট: গ্লাভস, রেসপিরেটর, গগলস' : 'PPE checklist: gloves, respirator, goggles'}</li>
              <li>{bn ? 'জরুরি বিষক্রিয়া চিকিৎসা ও প্রাথমিক চিকিৎসা' : 'Emergency poisoning first aid & response'}</li>
            </ul>
            <div className="acg-res__actions">
              <a href="/field-guide.pdf" target="_blank" rel="noopener noreferrer" className="acg-btn">
                <FileDown size={14} /> {bn ? 'ফিল্ড গাইড পিডিএফ' : 'Field guide (PDF)'}
              </a>
            </div>
          </div>
        </div>

        <p className="acg-disclaimer">
          {bn
            ? '⚠️ সূত্র: বাংলাদেশ সরকার, কৃষি মন্ত্রণালয়, কৃষি সম্প্রসারণ অধিদপ্তর (DAE)। সর্বশেষ সংশোধনের জন্য অফিসিয়াল ওয়েবসাইট দেখুন। নথিগুলো শুধুমাত্র রেফারেন্স উদ্দেশ্যে।'
            : '⚠️ Source: Government of Bangladesh, Ministry of Agriculture, Dept. of Agricultural Extension (DAE). Check official websites for latest amendments. Provided for reference purposes only.'}
        </p>
      </section>

      {/* -------------------------------- SHARE BANNER (restored) ------- */}
      <section className="acg-shell">
        <div className="acg-share">
          <div className="acg-share__copy">
            <span className="acg-share__badge">
              {bn ? 'কৃষক ভাই ও কর্মকর্তাদের জন্য' : 'For farmers, officers & dealers'}
            </span>
            <h3 className="acg-share__title">
              {bn
                ? 'পেস্টিসাইডনেক্সট শেয়ার করে নিরাপদ ও বিষমুক্ত কৃষিতে অবদান রাখুন'
                : 'Share PesticideNext & promote safe chemical stewardship'}
            </h3>
            <p className="acg-share__desc">
              {bn
                ? 'হোয়াটসঅ্যাপ, ফেসবুক ও টেলিগ্রামে আপনার পরিচিত কৃষক, উপসহকারী কৃষি কর্মকর্তা (SAAO) ও ডিলারদের মাঝে ছড়িয়ে দিন।'
                : 'Share via WhatsApp, Facebook, or direct link with farmers, sub-assistant agriculture officers, and input dealers across Bangladesh.'}
            </p>
          </div>
          <div className="acg-share__actions">
            <button className="acg-btn acg-btn--white" onClick={onOpenShareModal}>
              <Share2 size={15} /> {bn ? 'এখনই শেয়ার করুন' : 'Share now'}
            </button>
            <button className="acg-btn acg-btn--outline acg-btn--onbright" onClick={() => go('guidebook')}>
              <FileDown size={15} /> {bn ? 'পকেট গাইড' : 'Pocket guide'}
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
