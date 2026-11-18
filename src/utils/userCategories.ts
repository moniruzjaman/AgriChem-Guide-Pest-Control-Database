/**
 * userCategories.ts
 * ==================
 * Lightweight "who is using this app?" persona system. A farmer, a DAE/
 * extension Cadre officer, a Researcher, or a Policy person can declare
 * themselves once; the choice then:
 *   - swaps the search placeholder to plain language for that persona,
 *   - suggests persona-specific quick searches on Home / Search,
 *   - deep-links the Specialist tab with pre-set filters for officers,
 *     researchers and policy staff (Cadre = phase-out watch, Researcher =
 *     MoA/resistance view, Policy = HHP & EU-status view).
 *
 * The persona is stored in localStorage and mirrored into the URL hash
 * (`#specialist?persona=policy`) so shared links keep the context.
 */

import type { AppTab } from '../types';

export type PersonaId = 'farmer' | 'cadre' | 'researcher' | 'policy';

export interface PersonaQuickSearch {
  en: string;
  bn: string;
  /** Query text placed into the global search box when tapped. */
  query: string;
}

export interface Persona {
  id: PersonaId;
  labelEn: string;
  labelBn: string;
  descEn: string;
  descBn: string;
  emoji: string;
  /** Where the "start here" button sends this persona. */
  landingTab: AppTab;
  startEn: string;
  startBn: string;
  searchPlaceholderEn: string;
  searchPlaceholderBn: string;
  quickSearches: PersonaQuickSearch[];
}

export const PERSONAS: Record<PersonaId, Persona> = {
  farmer: {
    id: 'farmer',
    labelEn: 'Farmer / Grower',
    labelBn: 'কৃষক',
    descEn: 'Plain-language answers: which medicine, how much, when to stop before harvest.',
    descBn: 'সহজ ভাষায় উত্তর: কোন ওষুধ, কতটা, ফসল তোলার আগে কত দিন থামবেন।',
    emoji: '🌾',
    landingTab: 'home',
    startEn: 'Start — ask by crop or pest',
    startBn: 'শুরু করুন — ফসল বা পোকার নাম লিখুন',
    searchPlaceholderEn: 'Type your crop or pest problem, e.g. “tomato whitefly”…',
    searchPlaceholderBn: 'ফসল বা পোকার সমস্যার নাম লিখুন, যেমন “আলুর মাকড়াসী” …',
    quickSearches: [
      { en: 'Rice — stem borer', bn: 'ধান — গাঁটপোকা', query: 'rice stem borer' },
      { en: 'Tomato — leaf miner', bn: 'টমেটো — পাতা খননকারী', query: 'tomato leaf miner' },
      { en: 'Chili — fruit borer', bn: 'মরিচ — ফল ছিদ্রকারী', query: 'chili fruit borer' },
      { en: 'Safe 7-day spray', bn: '৭ দিনে নিরাপদ স্প্রে', query: 'bio pesticide' },
    ],
  },
  cadre: {
    id: 'cadre',
    labelEn: 'DAE / Extension Cadre',
    labelBn: 'উপজেলা ক্যাডার অফিসার',
    descEn: 'Block-level advisory: registration validity, banned list watch, season-wise recommendations.',
    descBn: 'ব্লক-পর্যায়ের পরামর্শ: নিবন্ধন বৈধতা, নিষিদ্ধ তালিকা, মৌসুমভিত্তিক সুপারিশ।',
    emoji: '🏛️',
    landingTab: 'specialist',
    startEn: 'Open Cadre desk (phase-out watch)',
    startBn: 'ক্যাডার ডেস্ক খুলুন (নিষিদ্ধ/ফেজ-আউট নজর)',
    searchPlaceholderEn: 'Search brand, AI, reg. no. — cadre mode…',
    searchPlaceholderBn: 'ব্র্যান্ড, উপাদান, নিবন্ধন নম্বর — ক্যাডার মোড…',
    quickSearches: [
      { en: 'Phase-out actions', bn: 'ফেজ-আউট পদক্ষেপ', query: 'phase out' },
      { en: 'Restricted brands', bn: 'সীমাবদ্ধ ব্র্যান্ড', query: 'restricted' },
      { en: 'Registered 2024–25', bn: '২০২৪–২৫ নিবন্ধিত', query: 'registered' },
      { en: 'Store grain pesticides', bn: 'গودাম খাদ্য বালাইনাশক', query: 'stored grain' },
    ],
  },
  researcher: {
    id: 'researcher',
    labelEn: 'Researcher / Agronomist',
    labelBn: 'গবেষক',
    descEn: 'MoA groups, resistance risk, rotation sets, formulation chemistry for trials.',
    descBn: 'MoA গ্রুপ, প্রতিরোধ ঝুঁকি, রোটেশন সেট, ফর্মুলেশন রসায়ন—গবেষণার জন্য।',
    emoji: '🔬',
    landingTab: 'specialist',
    startEn: 'Open research desk (MoA matrix)',
    startBn: 'গবেষণা ডেস্ক খুলুন (MoA ম্যাট্রিক্স)',
    searchPlaceholderEn: 'Search active ingredient, MoA code/group, FRAC/IRAC…',
    searchPlaceholderBn: 'সক্রিয় উপাদান, MoA কোড/গ্রুপ, FRAC/IRAC খুঁজুন…',
    quickSearches: [
      { en: 'IRAC group 28', bn: 'IRAC গ্রুপ ২৮', query: 'moa 28' },
      { en: 'FRAC fungicides', bn: 'FRAC ছত্রাকনাশক', query: 'fungicide frac' },
      { en: 'High resistance risk', bn: 'উচ্চ প্রতিরোধ ঝুঁকি', query: 'resistance high' },
      { en: 'Chlorantraniliprole', bn: 'ক্লোরান্ট্রানিলিপ্রোল', query: 'chlorantraniliprole' },
    ],
  },
  policy: {
    id: 'policy',
    labelEn: 'Policy / Regulatory',
    labelBn: 'নীতিমালা কর্মকর্তা',
    descEn: 'HHP status, WHO class, EU/global bans, Bangladesh policy actions for dossiers.',
    descBn: 'HHP অবস্থা, WHO শ্রেণি, EU/বৈশ্বিক নিষেধ, বাংলাদেশের নীতিগত পদক্ষেপ—কাজের জন্য।',
    emoji: '📜',
    landingTab: 'specialist',
    startEn: 'Open policy desk (HHP & tiers)',
    startBn: 'নীতি ডেস্ক খুলুন (HHP ও টায়ার)',
    searchPlaceholderEn: 'Search HHP actives, risk tier, regulatory status…',
    searchPlaceholderBn: 'HHP উপাদান, ঝুঁকি টায়ার, নিয়ন্ত্রক অবস্থা খুঁজুন…',
    quickSearches: [
      { en: 'WHO Class Ia/Ib', bn: 'WHO শ্রেণি Ia/Ib', query: 'highly hazardous' },
      { en: 'EU banned in BD', bn: 'EU-নিষিদ্ধ কিন্তু BD-তে', query: 'banned' },
      { en: 'RED tier products', bn: 'RED টায়ার পণ্য', query: 'red tier' },
      { en: 'HHP list', bn: 'HHP তালিকা', query: 'hhp' },
    ],
  },
};

export const PERSONA_ORDER: PersonaId[] = ['farmer', 'cadre', 'researcher', 'policy'];

const STORAGE_KEY = 'pesticidenext_persona';

export function loadPersona(): PersonaId {
  if (typeof window === 'undefined') return 'farmer';
  try {
    const v = window.localStorage.getItem(STORAGE_KEY);
    if (v && v in PERSONAS) return v as PersonaId;
  } catch {
    /* storage blocked — default silently */
  }
  return 'farmer';
}

export function savePersona(id: PersonaId): void {
  try {
    if (typeof window !== 'undefined') window.localStorage.setItem(STORAGE_KEY, id);
  } catch {
    /* ignore */
  }
}

/** Preset Specialist-view filter intent carried via hash, e.g. #specialist?tier=RED */
export function specialistPresetFor(id: PersonaId): Record<string, string> {
  switch (id) {
    case 'policy':
      return { tier: 'RED' };
    case 'cadre':
      return { action: 'phase-out' };
    case 'researcher':
      return { sort: 'moaCode' };
    default:
      return {};
  }
}
