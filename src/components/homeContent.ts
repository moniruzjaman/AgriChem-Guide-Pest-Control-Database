import type { LucideIcon } from 'lucide-react';
import {
  Bell,
  BookOpen,
  Calculator,
  Database,
  RotateCw,
  ShieldCheck,
} from 'lucide-react';
import type { AppTab } from '../types';

// ---------------------------------------------------------------------------
// homeContent — content data restored from the pre-PR#25 Home tab, so the
// redesigned home keeps every block the old page carried (feature dossiers,
// the field diagnostic matcher, popular crops, partner apps) while rendering
// in the new Bangladesh-palette editorial language.
// ---------------------------------------------------------------------------

// ── Cross-app partner branding ───────────────────────────────────────────────
// The partner apps (উদ্ভিদ গোয়েন্দা / Plant Detective and the Pesticide Act
// 2018 explorer) render their own live logo so the artwork always matches the
// partner app's latest deploy; the local PNG is only a cache/network fallback.
export const CABI_APP_URL = 'https://cabi.krishiai.live/';
export const CABI_APP_LOGO = 'https://cabi.krishiai.live/cabi-logo.png';
export const CABI_APP_LOGO_FALLBACK = '/partner-plant-detective-logo.png';
export const PESTICIDE_ACT_APP_URL = 'https://pesticideact2018.vercel.app/';
export const PESTICIDE_ACT_APP_LOGO =
  'https://pesticideact2018.vercel.app/apple-touch-icon.png';
export const PESTICIDE_ACT_APP_LOGO_FALLBACK =
  '/partner-pesticide-act-logo.png';

// ── Popular crops for quick database navigation ─────────────────────────────
export interface PopularCrop {
  en: string;
  bn: string;
  count: number;
}

export const POPULAR_CROPS: PopularCrop[] = [
  { en: 'Rice', bn: 'ধান', count: 28 },
  { en: 'Potato', bn: 'আলু', count: 18 },
  { en: 'Tomato', bn: 'টমেটো', count: 16 },
  { en: 'Brinjal', bn: 'বেগুন', count: 15 },
  { en: 'Mango', bn: 'আম', count: 12 },
  { en: 'Chilli', bn: 'মরিচ', count: 11 },
];

// ── Six core feature dossiers (grid + deep-dive previewer) ──────────────────
export type FeatureTone = 'green' | 'gold' | 'red';

export interface FeatureDossier {
  id: AppTab;
  titleEn: string;
  titleBn: string;
  subtitleEn: string;
  subtitleBn: string;
  descEn: string;
  descBn: string;
  icon: LucideIcon;
  badgeEn: string;
  badgeBn: string;
  tone: FeatureTone;
  statLabelEn: string;
  statLabelBn: string;
  statValue: string;
  highlightsEn: string[];
  highlightsBn: string[];
}

/* eslint-disable indent */
export const FEATURES: FeatureDossier[] = [
  {
    id: 'database' as AppTab,
    titleEn: 'DAE Registered Chemical Database',
    titleBn: 'ডিএই নিবন্ধিত রাসায়নিক ডাটাবেস',
    subtitleEn: 'Approved formulations & active ingredients',
    subtitleBn: 'অনুমোদিত সক্রিয় উপাদান ও বাণিজ্য নাম',
    descEn: 'Instant search across Bangladesh DAE-registered insecticides, fungicides, herbicides, and miticides. Includes verified trade names, target pests, label application rates, PHI (Pre-Harvest Interval) and REI safety windows.',
    descBn: 'কৃষি সম্প্রসারণ অধিদপ্তর (DAE) নিবন্ধিত কীটনাশক, ছত্রাকনাশক, আগাছানাশক ও মাকড়নাশকের পূর্ণাঙ্গ তালিকা। অনুমোদিত বাণিজ্য নাম, লক্ষ্য বালাই, প্রতি হেক্টরে সঠিক প্রয়োগ মাত্রা, ফসল তোলার নিরাপদ বিরতি (PHI) ও রি-এন্ট্রি সময়কাল দেখুন।',
    icon: Database,
    badgeEn: 'Official register',
    badgeBn: 'অফিসিয়াল রেজিস্টার',
    tone: 'green',
    statLabelEn: 'Active Ingredients',
    statLabelBn: 'সক্রিয় উপাদান',
    statValue: '5,711+',
    highlightsEn: [
      'Official DAE Registration',
      'PHI & REI Safety Windows',
      'Target Pest Index',
      'Trade Names Dossier',
    ],
    highlightsBn: [
      'ডিএই অফিসিয়াল নিবন্ধন',
      'PHI ও REI নিরাপদ সময়',
      'বালাই ও রোগের পূর্ণাঙ্গ তালিকা',
      'ব্র্যান্ড ও বাণিজ্য নাম',
    ],
  },
  {
    id: 'calculator' as AppTab,
    titleEn: 'Knapsack Sprayer & Dosage Calculator',
    titleBn: 'মাঠপর্যায়ের মাত্রা ও ট্যাংক ক্যালকুলেটর',
    subtitleEn: 'Knapsack 16L, 10L, 20L & land unit conversions',
    subtitleBn: '১৬L, ১০L, ২০L স্প্রেয়ার ও শতক/বিঘা হিসাব',
    descEn: 'Never over-spray or under-dose chemicals. Calibrate knapsack sprayers for 16L, 10L, or 20L tanks. Convert between Decimal/Shatak, Katha, Bigha, Acre, and Hectares with accurate active ingredient grams/milliliters and water volumes.',
    descBn: 'অতিরিক্ত বা কম বালাইনাশক ব্যবহারের ঝুঁকি দূর করুন। ১৬ লিটার, ১০ লিটার ও ২০ লিটার ন্যাপস্যাক স্প্রেয়ারের জন্য শতক, কাঠা, বিঘা বা একর জমিতে মোট কয় ট্যাংক স্প্রে প্রয়োজন এবং প্রতি ট্যাংকে ঠিক কত মিলি বা গ্রাম ওষুধ মেশাতে হবে তা এক নিমিষে হিসাব করুন।',
    icon: Calculator,
    badgeEn: 'Tank math',
    badgeBn: 'ট্যাংক মিশ্রণ',
    tone: 'gold',
    statLabelEn: 'Sprayer Sizes',
    statLabelBn: 'ট্যাংক সাইজ',
    statValue: '10L/16L/20L',
    highlightsEn: [
      '16L / 20L Knapsack Math',
      'Shatak & Bigha Conversions',
      'Total Water Volume Check',
      'Tank Count Estimation',
    ],
    highlightsBn: [
      '১৬L ও ২০L ট্যাংক মিশ্রণ',
      'শতক ও বিঘা রূপান্তর',
      'মোট পানির সঠিক পরিমাণ',
      'প্রয়োজনীয় স্প্রেয়ার সংখ্যা',
    ],
  },
  {
    id: 'rotation' as AppTab,
    titleEn: 'MoA Resistance Rotation Planner',
    titleBn: 'MoA ক্রিয়া-কৌশল ঘূর্ণন পরিকল্পনা',
    subtitleEn: 'IRAC, FRAC & HRAC scientific spray schedules',
    subtitleBn: 'IRAC, FRAC ও HRAC বৈজ্ঞানিক স্প্রে ক্রম',
    descEn: 'Stop pest and fungal resistance before it destroys crop yields. Plan rotational spray schedules categorized by IRAC (insecticides), FRAC (fungicides), and HRAC (herbicides). Built-in validation detects consecutive applications of the same mode of action.',
    descBn: 'একই গ্রুপের ওষুধ বারবার ব্যবহারে পোকা ও রোগের প্রতিরোধ ক্ষমতা তৈরি হয়। IRAC, FRAC ও HRAC আন্তর্জাতিক বৈজ্ঞানিক শ্রেণিবিন্যাস অনুযায়ী স্প্রে ক্রম তৈরি করুন। পরপর একই MoA গ্রুপের প্রয়োগ ঘটলে সিস্টেম স্বয়ংক্রিয়ভাবে সতর্কতা প্রদান করে।',
    icon: RotateCw,
    badgeEn: 'Resistance guard',
    badgeBn: 'প্রতিরোধ রোধ',
    tone: 'green',
    statLabelEn: 'Committees Covered',
    statLabelBn: 'আন্তর্জাতিক কমিটি',
    statValue: 'IRAC/FRAC/HRAC',
    highlightsEn: [
      'Prevent Pest Resistance',
      'Real-time Conflict Detection',
      'Crop Lifecycle Windows',
      'Action Mechanism Grouping',
    ],
    highlightsBn: [
      'বালাই প্রতিরোধ ক্ষমতা দমন',
      'একই গ্রুপের ব্যবহারে সতর্কতা',
      'ফসলের জীবনচক্রভিত্তিক ধাপ',
      'সক্রিয় ক্রিয়া-কৌশল গ্রুপ',
    ],
  },
  {
    id: 'safety' as AppTab,
    titleEn: 'WHO Hazard Classes & PPE Checklists',
    titleBn: 'নিরাপত্তা, পিপিই ও জরুরি চিকিৎসা',
    subtitleEn: 'WHO color bands, protective gear & first-aid',
    subtitleBn: 'WHO কালার ব্যান্ড, সুরক্ষামূলক গিয়ার ও প্রতিষেধক',
    descEn: 'Protect human life and the agricultural ecosystem. Features WHO toxicity color bands (Red, Yellow, Blue, Green), an interactive pre-spray PPE gear checklist, safe chemical mixing instructions, and emergency poisoning first-aid protocols.',
    descBn: 'কৃষক ও স্প্রেয়ার কর্মীদের স্বাস্থ্য সুরক্ষা নিশ্চিত করুন। WHO আন্তর্জাতিক বিপদ কালার ব্যান্ড (লাল, হলুদ, নীল, সবুজ), স্প্রে করার পূর্বে পিপিই সরঞ্জামের ইন্টারেক্টিভ চেকলিস্ট, বিষক্রিয়া প্রতিরোধের নিয়মাবলি এবং জরুরি চিকিৎসার বিস্তারিত প্রোটোকল।',
    icon: ShieldCheck,
    badgeEn: 'WHO standards',
    badgeBn: 'ডব্লিউএইচও মানদণ্ড',
    tone: 'gold',
    statLabelEn: 'Toxicity Bands',
    statLabelBn: 'বিপদ শ্রেণি',
    statValue: 'Ia, Ib, II, III, U',
    highlightsEn: [
      'WHO Hazard Bands (Ia-U)',
      'Pre-Spray PPE Checklist',
      'Emergency Poisoning Protocol',
      'Safe Disposal Guidance',
    ],
    highlightsBn: [
      'WHO বিপদ শ্রেণি (Ia-U)',
      'স্প্রে-পূর্ব পিপিই চেকলিস্ট',
      'জরুরি প্রাথমিক চিকিৎসা',
      'নিরাপদ বোতল অপসারণ',
    ],
  },
  {
    id: 'guidebook' as AppTab,
    titleEn: 'A5 Field Pocket Guidebook & Mixing Order',
    titleBn: 'মাঠ পকেট বুক গাইড ও W.A.L.E.S. নিয়ম',
    subtitleEn: 'Printable A5 field manual & nozzle calibration',
    subtitleBn: 'মুদ্রণযোগ্য A5 পকেট বুক ও নোজল ক্যালিব্রেশন',
    descEn: 'Carry the field handbook right in your pocket. Features the golden W.A.L.E.S. rule for safe tank mixing sequences, nozzle spray calibration formulas, crop-by-crop chemical tables, and 1-click printable A5 PDF export for offline field work.',
    descBn: 'মাঠে ইন্টারনেট ছাড়াই ব্যবহার করুন। একাধিক বালাইনাশক সঠিকভাবে মেশানোর বৈজ্ঞানিক W.A.L.E.S. ক্রমানুসার, নোজল ক্যালিব্রেশন পদ্ধতি এবং মাঠপর্যায়ে ব্যবহারের জন্য সরাসরি এক ক্লিকে ডাউনলোডযোগ্য ও মুদ্রণযোগ্য A5 ফিল্ড পকেট বুক (PDF)।',
    icon: BookOpen,
    badgeEn: 'Printable A5 PDF',
    badgeBn: 'মুদ্রণযোগ্য A5 PDF',
    tone: 'green',
    statLabelEn: 'Offline Access',
    statLabelBn: 'অফলাইন সুবিধা',
    statValue: '100% PWA',
    highlightsEn: [
      'W.A.L.E.S. Mixing Sequence',
      'Nozzle Flow Rate Math',
      'Downloadable A5 PDF',
      'Compact Field Format',
    ],
    highlightsBn: [
      'W.A.L.E.S. মিশ্রণের নিয়ম',
      'নোজল স্প্রে ক্যালিব্রেশন',
      'ডাউনলোডযোগ্য A5 PDF',
      'সহজ বহনযোগ্য পকেট সাইজ',
    ],
  },
  {
    id: 'alerts' as AppTab,
    titleEn: 'Regulatory Alerts & Seasonal Outbreaks',
    titleBn: 'নিয়ন্ত্রক নোটিশ ও মৌসুমি সতর্কতা',
    subtitleEn: 'Banned pesticides, outbreak warnings & PHI notices',
    subtitleBn: 'নিষিদ্ধ তালিকা, আক্রমণের পূর্বাভাস ও সতর্কবার্তা',
    descEn: 'Stay legally compliant and environmentally responsible. Real-time updates on seasonal pest outbreaks (e.g. Fall Armyworm, BPH, Late Blight), official lists of banned pesticides in Bangladesh, and pre-harvest safety interval reminders.',
    descBn: 'সরকারি আইন ও পরিবেশগত নিয়ম মেনে চলুন। মৌসুমি বালাই আক্রমণ (যেমন: ধানের মাজরা, কারেন্ট পোকা, আলুর মড়ক রোগ) এর সময়োপযোগী পূর্বাভাস, বাংলাদেশে নিষিদ্ধ বা নিয়ন্ত্রিত বালাইনাশকের হালনাগাদ তালিকা ও ফসল তোলার বিরতি সতর্কতা।',
    icon: Bell,
    badgeEn: 'Compliance & alerts',
    badgeBn: 'জরুরি সতর্কতা',
    tone: 'red',
    statLabelEn: 'Regulatory Status',
    statLabelBn: 'নিয়ন্ত্রক তথ্য',
    statValue: 'DAE / MoA',
    highlightsEn: [
      'Seasonal Outbreak Alerts',
      'Banned Pesticide Warnings',
      'Pre-Harvest Notifications',
      'Compliance Check',
    ],
    highlightsBn: [
      'মৌসুমি বালাই পূর্বাভাস',
      'নিষিদ্ধ বালাইনাশক তালিকা',
      'ফসল কাটার বিরতি নোটিশ',
      'আইনগত নির্দেশনা',
    ],
  },
];
/* eslint-enable indent */

// ── Quick Field Diagnostic Matcher ──────────────────────────────────────────
export type DiagCropKey = 'Rice' | 'Potato' | 'Tomato' | 'Mango';

export interface DiagSymptom {
  id: string;
  titleEn: string;
  titleBn: string;
  symptomEn: string;
  symptomBn: string;
  diagnosisEn: string;
  diagnosisBn: string;
  ingredientEn: string;
  ingredientBn: string;
  moaEn: string;
  moaBn: string;
  rateEn: string;
  rateBn: string;
  phiEn: string;
  phiBn: string;
}

export interface DiagCrop {
  cropNameEn: string;
  cropNameBn: string;
  symptoms: DiagSymptom[];
}

export const DIAGNOSTIC_DATA: Record<DiagCropKey, DiagCrop> = {
  Rice: {
    cropNameEn: 'Rice',
    cropNameBn: 'ধান',
    symptoms: [
      {
        id: 'blast',
        titleEn: 'Leaf Blast Disease',
        titleBn: 'ধানের ব্লাস্ট রোগ',
        symptomEn: 'Diamond or eye-shaped spots on leaves, grey centers with reddish-brown margins. Severe cases lead to neck rot and blank heads.',
        symptomBn: 'পাতায় চোখ বা হীরা আকৃতির দাগ, মাঝখানে ধূসর ও চারপাশ বাদামী রঙের ক্ষতের সৃষ্টি হয়। মারাত্মক আক্রমণে গলার অংশ পচে বা শুকিয়ে শীষ ভেঙে পড়ে।',
        diagnosisEn: 'Rice Blast (Magnaporthe oryzae / Pyricularia oryzae fungus)',
        diagnosisBn: 'ধানের ব্লাস্ট রোগ (ছত্রাকজনিত বালাই)',
        ingredientEn: 'Tricyclazole (e.g. Trooper 75 WP) or Pyroquilon',
        ingredientBn: 'ট্রাইসাইক্লাজল অথবা পাইরোকুইলন',
        moaEn: 'FRAC Group 16.1 / 16.2 (Melanin Biosynthesis Inhibitor - MBI)',
        moaBn: 'FRAC গ্রুপ ১৬.১ / ১৬.২ (মেলানিন তৈরি বাধাগ্রস্তকারী)',
        rateEn: '0.8g per Litre of water (approx. 13g per 16L Knapsack tank)',
        rateBn: '০.৮ গ্রাম প্রতি লিটার পানি (১৬ লিটার স্প্রেয়ারে প্রায় ১৩ গ্রাম)',
        phiEn: '21 Days safe pre-harvest interval',
        phiBn: 'ফসল তোলার ২১ দিন পূর্বে স্প্রে বন্ধ করুন',
      },
      {
        id: 'bph',
        titleEn: 'Brown Plant Hopper (BPH)',
        titleBn: 'বাদামী গাছ ফড়িং (কারেন্ট পোকা)',
        symptomEn: 'Circular patches of dried, straw-colored rice plants. Large numbers of tiny brown bugs visible at the base of the stems.',
        symptomBn: 'ধান খেতে বৃত্তাকার আকারে গাছ হঠাৎ শুকিয়ে খড়ের মতো পুড়ে যাওয়া রং ধারণ করে। গাছের গোড়ায় শত শত ছোট ছোট বাদামী ফড়িং বা পোকা দেখা যায়।',
        diagnosisEn: 'Brown Plant Hopper (Nilaparvata lugens)',
        diagnosisBn: 'বাদামী গাছ ফড়িং / কারেন্ট পোকা (শোষক পোকা বালাই)',
        ingredientEn: 'Pymetrozine (e.g. Plenum 50 WG) or Imidacloprid',
        ingredientBn: 'পাইমেট্রোজিন অথবা ইমিডাক্লোপ্রিড',
        moaEn: 'IRAC Group 9B / 4A (Selective Feeding Blocker / Neonicotinoid)',
        moaBn: 'IRAC গ্রুপ ৯বি / ৪এ (আহার বন্ধকারী / স্নায়ুতন্ত্রের নিকোটিনিক রিসেপ্টর ব্লক)',
        rateEn: '0.6g per Litre of water (approx. 10g per 16L Knapsack tank)',
        rateBn: '০.৬ গ্রাম প্রতি লিটার পানি (১৬ লিটার স্প্রেয়ারে ১০ গ্রাম)',
        phiEn: '14 Days safe pre-harvest interval',
        phiBn: 'ফসল তোলার ১৪ দিন পূর্বে স্প্রে বন্ধ করুন',
      },
      {
        id: 'stemborer',
        titleEn: 'Yellow Stem Borer',
        titleBn: 'ধানের মাজরা পোকা',
        symptomEn: "Dead central leaf whorl in vegetative stage ('dead heart') or white, papery, empty grain heads in reproductive stage ('white head').",
        symptomBn: "বাড়ন্ত অবস্থায় মাঝখানের কুশি শুকিয়ে যায় যাকে 'ডেড হার্ট' বলে। শীষ আসার পর সমস্ত দানা চিটা ও সাদা হয়ে খড়া থাকে যাকে 'হোয়াইট হেড' বলে।",
        diagnosisEn: 'Yellow Stem Borer (Scirpophaga incertulas larva)',
        diagnosisBn: 'ধানের হলুদ মাজরা পোকা (লার্ভা আক্রান্ত বালাই)',
        ingredientEn: 'Cartap Hydrochloride (e.g. Suntaf 50 SP) or Chlorantraniliprole',
        ingredientBn: 'কারটাপ হাইড্রোক্লোরাইড অথবা ক্লোরেন্ট্রানিলিপ্রোল',
        moaEn: 'IRAC Group 14 / 28 (Nicotinic acetylcholine receptor blocker / Ryanodine receptor modulator)',
        moaBn: 'IRAC গ্রুপ ১৪ / ২৮ (নিকোটিনিক রিসেপ্টর ব্লকার / পেশী সংকোচন সংকেত বন্ধকারী)',
        rateEn: '2.0g per Litre (Cartap) or 0.15g per Litre',
        rateBn: '২.০ গ্রাম প্রতি লিটার (কারটাপ) অথবা ০.১৫ গ্রাম প্রতি লিটার',
        phiEn: '21 Days safe pre-harvest interval',
        phiBn: 'ফসল তোলার ২১ দিন পূর্বে স্প্রে বন্ধ করুন',
      },
    ],
  },
  Potato: {
    cropNameEn: 'Potato',
    cropNameBn: 'আলু',
    symptoms: [
      {
        id: 'lateblight',
        titleEn: 'Late Blight Disease',
        titleBn: 'আলুর লেট ব্লাইট (মড়ক)',
        symptomEn: 'Rapidly spreading water-soaked dark green/brown spots starting at tips. Fuzzy white mold grows on the underside of leaves under high moisture.',
        symptomBn: 'পাতার ডগা থেকে শুরু হওয়া দ্রুত ছড়িয়ে পড়া ভেজা পচা গন্ধযুক্ত কালচে দাগ। কুয়াশাচ্ছন্ন ও স্যাঁতসেঁতে আবহাওয়ায় পাতার নিচে সাদা সুতার মতো ছত্রাক জন্মে।',
        diagnosisEn: 'Late Blight (Phytophthora infestans oomycete - highly destructive)',
        diagnosisBn: 'আলুর লেট ব্লাইট / মড়ক রোগ (উওমাইসিট বালাই)',
        ingredientEn: 'Mancozeb + Metalaxyl (e.g. Ridomil Gold) or Cymoxanil',
        ingredientBn: 'ম্যানকোজেব + মেটালাক্সিল অথবা সাইমোক্সানিল',
        moaEn: 'FRAC Group M03 + 4 (Multi-site contact activity + Systemic RNA Polymerase I)',
        moaBn: 'FRAC গ্রুপ M03 + ৪ (বহু-মুখী কন্টাক্ট অ্যাকশন + সিস্টেমিক আরএনএ পলিমারেজ ১)',
        rateEn: '2.0g per Litre of water (approx. 32g per 16L Knapsack tank)',
        rateBn: '২.০ গ্রাম প্রতি লিটার (১৬ লিটার স্প্রেয়ারে ৩২ গ্রাম)',
        phiEn: '14 Days safe pre-harvest interval',
        phiBn: 'আলু তোলার ১৪ দিন পূর্বে স্প্রে বন্ধ করুন',
      },
      {
        id: 'earlyblight',
        titleEn: 'Early Blight Disease',
        titleBn: 'আলুর আগাম ধসা রোগ',
        symptomEn: 'Target-board like concentric dark rings or spots on older leaves near the base of the plant.',
        symptomBn: 'গাছের নিচের বয়স্ক পাতায় লক্ষ্যবস্তু বা টার্গেট-বোর্ডের মতো বৃত্তাকার বলয়যুক্ত কালচে বা বাদামী দাগ দেখা যায়।',
        diagnosisEn: 'Early Blight (Alternaria solani fungus)',
        diagnosisBn: 'আলুর আগাম ধসা রোগ (অল্টারনারিয়া ছত্রাকজনিত বালাই)',
        ingredientEn: 'Difenoconazole + Azoxystrobin (e.g. Amistar Top)',
        ingredientBn: 'ডিফেনোকোনাজল + অ্যাজক্সিস্ট্রবিন',
        moaEn: 'FRAC Group 3 + 11 (Demethylation Inhibitor - DMI + Quinone Outside Inhibitor - QoI)',
        moaBn: 'FRAC গ্রুপ ৩ + ১১ (স্টেরল বায়োসিন্থেসিস দমন + কুইনোন রেসপিরেটরি বাধা)',
        rateEn: '1.0ml per Litre of water (approx. 16ml per 16L Knapsack tank)',
        rateBn: '১.০ মিলি প্রতি লিটার (১৬ লিটার স্প্রেয়ারে ১৬ মিলি)',
        phiEn: '14 Days safe pre-harvest interval',
        phiBn: 'আলু তোলার ১৪ দিন পূর্বে স্প্রে বন্ধ করুন',
      },
    ],
  },
  Tomato: {
    cropNameEn: 'Tomato',
    cropNameBn: 'টমেটো',
    symptoms: [
      {
        id: 'leafminer',
        titleEn: 'Tuta absoluta Leaf Miner',
        titleBn: 'টমেটোর টুটা পাতা সুরঙ্গকারী',
        symptomEn: 'Large white blotchy mines or galleries in the leaves. Small holes at the base of tomatoes with dark frass.',
        symptomBn: 'পাতার মাঝে বড় সুড়ঙ্গ বা গ্যালারির মতো ফ্যাকাশে দাগ। টমেটোর বোঁটার চারপাশে বা গায়ে ছোট ছিদ্র এবং কালো রঙের বিষ্ঠা দেখা যায়।',
        diagnosisEn: 'Tuta absoluta (South American Tomato Pinworm larva)',
        diagnosisBn: 'টমেটোর টুটা অ্যাবসোলুটা পোকা (লার্ভা বালাই)',
        ingredientEn: 'Emamectin Benzoate (e.g. Proclaim 5 SG) or Spinosad',
        ingredientBn: 'এমামেক্টিন বেনজয়েট অথবা স্পিনোস্যাড',
        moaEn: 'IRAC Group 6 / 5 (Glutamate-gated chloride channel activator / Nicotinic acetylcholine modulator)',
        moaBn: 'IRAC গ্রুপ ৬ / ৫ (স্নায়ুতন্ত্র ও পেশী পক্ষাঘাতকারী এবং কর্ডোটোনাল অ্যাক্টিভেটর)',
        rateEn: '1.0g per Litre (Emamectin) or 0.4ml per Litre',
        rateBn: '১.০ গ্রাম প্রতি লিটার (এমামেক্টিন) অথবা ০.৪ মিলি প্রতি লিটার',
        phiEn: '7 Days short safe pre-harvest interval',
        phiBn: 'টমেটো তোলার ৭ দিন পূর্বে স্প্রে বন্ধ করুন',
      },
      {
        id: 'wilt',
        titleEn: 'Bacterial Wilt',
        titleBn: 'টমেটোর ব্যাকটেরিয়াজনিত ঢলে পড়া',
        symptomEn: 'Rapid wilting of entire plant during daytime while leaves remain green. Stems show brown discoloration when cut.',
        symptomBn: 'সবুজ পাতা থাকা সত্ত্বেও দিনের বেলায় হঠাৎ সম্পূর্ণ গাছটি ঢলে পড়ে ও মরে যায়। আক্রান্ত কাণ্ড কাটলে ভেতরের নালী বাদামী রঙের দেখায়।',
        diagnosisEn: 'Bacterial Wilt (Ralstonia solanacearum bacteria)',
        diagnosisBn: 'টমেটোর ব্যাকটেরিয়াজনিত ঢলে পড়া রোগ (ব্যাকটেরিয়া বালাই)',
        ingredientEn: 'Copper Oxychloride (e.g. Cupravit) + Agricultural Streptomycin',
        ingredientBn: 'কপার অক্সিক্লোরাইড এবং কৃষিজাত স্ট্রেপ্টোমাইসিন সালফেট',
        moaEn: 'FRAC Group M01 (Multi-site inorganic copper) + FRAC Group 25 (Hexopyranoside antibiotic)',
        moaBn: 'FRAC গ্রুপ M01 (মাল্টি-সাইট কপার) + FRAC গ্রুপ ২৫ (অ্যান্টিবায়োটিক দমন)',
        rateEn: '4.0g per Litre of water (Copper Oxychloride)',
        rateBn: '৪.০ গ্রাম প্রতি লিটার পানি (কপার অক্সিক্লোরাইড)',
        phiEn: '7 Days safe pre-harvest interval',
        phiBn: 'টমেটো তোলার ৭ দিন পূর্বে স্প্রে বন্ধ করুন',
      },
    ],
  },
  Mango: {
    cropNameEn: 'Mango',
    cropNameBn: 'আম',
    symptoms: [
      {
        id: 'hopper',
        titleEn: 'Mango Hopper Insect',
        titleBn: 'আমের হপার পোকা',
        symptomEn: 'Large numbers of tiny brown wedge-shaped insects jumping from flower panicles. Black sticky honey-dew soot on leaves.',
        symptomBn: 'মুকুল ও কচি ডালে বসে রস চুষে খাওয়া শত শত ছোট ধূসর-বাদামী পোকা। পাতা ও মুকুলে আঠালো তরল নিঃসৃত করে যার ওপর কালো ছাইয়ের মতো ছত্রাক জন্মে।',
        diagnosisEn: 'Mango Leaf Hopper (Idioscopus clypealis)',
        diagnosisBn: 'আমের শোষক হপার পোকা (রস চোষক বালাই)',
        ingredientEn: 'Imidacloprid (e.g. Admire) or Thiamethoxam',
        ingredientBn: 'ইমিডাক্লোপ্রিড অথবা থায়ামেথক্সাম',
        moaEn: 'IRAC Group 4A (Neonicotinoid Systemic Insecticide)',
        moaBn: 'IRAC গ্রুপ ৪এ (পদ্ধতিগত অন্তর্বাহী শোষক নিষ্ক্রিয়কারী)',
        rateEn: '0.25ml or 0.2g per Litre of water',
        rateBn: '০.২৫ মিলি অথবা ০.২ গ্রাম প্রতি লিটার পানি',
        phiEn: '14 Days safe pre-harvest interval',
        phiBn: 'ফল সংগ্রহের ১৪ দিন পূর্বে স্প্রে বন্ধ করুন',
      },
      {
        id: 'mango-anthracnose',
        titleEn: 'Mango Anthracnose',
        titleBn: 'আমের অ্যানথ্রাকনোজ (কালো দাগ)',
        symptomEn: 'Irregular black or dark brown spots on flowers, young leaves, and developing green mangoes causing fruit drop.',
        symptomBn: 'মুকুল, পাতা ও কচি আমের ওপর ছোট কালো বা কালচে বাদামী রঙের ছোপ ছোপ পচা দাগ পড়ে যার কারণে ফল ঝরে যায়।',
        diagnosisEn: 'Mango Anthracnose (Colletotrichum gloeosporioides fungus)',
        diagnosisBn: 'আমের অ্যানথ্রাকনোজ রোগ (ছত্রাকজনিত কালো পচা বালাই)',
        ingredientEn: 'Carbendazim (e.g. Autostin) or Azoxystrobin',
        ingredientBn: 'কার্বেন্ডাজিম অথবা অ্যাজক্সিস্ট্রবিন',
        moaEn: 'FRAC Group 1 / 11 (MBC - Methyl Benzimidazole Carbamate / QoI)',
        moaBn: 'FRAC গ্রুপ ১ / ১১ (কোষ বিভাজন ব্যাহতকারী / শ্বাস-প্রশ্বাস নিষ্ক্রিয়কারী)',
        rateEn: '1.0g per Litre (Carbendazim) or 1.0ml per Litre (Azoxystrobin)',
        rateBn: '১.০ গ্রাম প্রতি লিটার (কার্বেন্ডাজিম) অথবা ১.০ মিলি প্রতি লিটার (অ্যাজক্সিস্ট্রবিন)',
        phiEn: '15 Days safe pre-harvest interval',
        phiBn: 'ফল সংগ্রহের ১৫ দিন পূর্বে স্প্রে বন্ধ করুন',
      },
    ],
  },
};
