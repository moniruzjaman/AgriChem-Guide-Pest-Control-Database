import React, { useMemo } from 'react';
import {
  ArrowUpRight,
  BookOpen,
  Calculator,
  Search,
  ShieldCheck,
} from 'lucide-react';
import { ChemicalProduct, AppTab, MoAClassification } from '../types';
import { MOA_DATABASE } from '../data/moaData';
import { useLanguage } from '../context/LanguageContext';
import './HomeView.css';

// ---------------------------------------------------------------------------
// HomeView — "pain-point editorial" redesign.
//
// The home tab now opens the way the FIELD/GUIDE reference site does: it
// names the farmer's silent frustration ("ওষুধ দিয়েছি, তবু পোকা মরছে না!"),
// reframes the blame (it is not the product — it is repeating the same MoA
// group), and then hands over the tools that break the cycle.
//
// Every number on the page is computed live from the merged product
// catalogue that App.tsx hydrates (curated + DAE register), and every CTA
// navigates through the app's real tab switch — no dead buttons.
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
  onOpenShareModal,
}) => {
  const { language, formatNum, transRisk } = useLanguage();
  const bn = language === 'bn';

  const go = (tab: AppTab) => {
    onNavigateTab(tab);
    if (typeof window !== 'undefined') window.scrollTo({ top: 0 });
  };

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

  // ---------------------------------------------------------------------
  // Bilingual copy deck — Bengali first, English mirrors the FIELD/GUIDE.
  // ---------------------------------------------------------------------
  const copy = bn
    ? {
        eyebrow: 'মাঠ ফসলের জন্য ব্যবহারিক সিদ্ধান্ত সহায়িকা',
        h1a: 'পরের স্প্রে',
        h1b: 'ভুল আর হবে না।',
        lede:
          'একই পোকা, একই ওষুধ, একই ব্যর্থতা — এটা দুর্ভাগ্য নয়, এটা রোটেশন ঋণ। সমস্যা পণ্যে নয়; সমস্যা হলো বারবার একই ক্রিয়াপদ্ধতির (MoA) গ্রুপ স্প্রে করা — যতক্ষণ না পোকা আর মরে না।',
        ctaSearch: 'পণ্য খুঁজুন',
        ctaCalc: 'ট্যাংক ক্যালকুলেটর',
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
          </div>
          <p className="acg-trust">
            <ShieldCheck size={16} />
            <span>{copy.trust}</span>
          </p>
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
    </div>
  );
};
