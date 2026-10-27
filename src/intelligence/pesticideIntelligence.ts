/**
 * PesticideIntelligence — weather-driven pesticide recommendation engine.
 *
 * This module bridges the Krishi Weather Intelligence (KWI) engine with the
 * AgriChem pesticide database. It replaces the previous inline weather fetch
 * and spray-window calculation with the full KWI engine, which provides:
 *
 *  - Correct precipitationProbability (backfilled from hourly data)
 *  - Correct VPD formula (FAO Tetens convention)
 *  - LRU-bounded cache (no memory leaks)
 *  - Structured errors (WeatherTimeoutError, WeatherApiError, etc.)
 *  - Crop-stage-aware disease forecasting (12 crops, 507 lines of config)
 *  - 48-hour spray window scoring with crop-specific heat thresholds
 *
 * The public interface (PesticideIntelligenceResult) is unchanged so existing
 * UI components (PesticideIntelligenceView, NextSprayGuide) continue to work.
 */

import type { ChemicalProduct } from '../types';

// KWI engine imports
import {
  createWeatherIntelligence,
  createActiveCrop,
  type WeatherIntelligence,
  type WeatherIntelligenceResult,
  type OperationWindow,
} from '../lib/kwi/index.js';

// ────────────────────────────────────────────────────────────
// Public types (unchanged from original — backward compatible)
// ────────────────────────────────────────────────────────────

export interface IntelligenceLocation {
  latitude: number;
  longitude: number;
  name?: string;
  district?: string;
  country?: string;
}

export interface WeatherSnapshot {
  temperature: number;
  humidity: number;
  windSpeed: number;
  rainProbability: number;
  precipitation: number;
  dewPoint: number;
  uvIndex: number;
  et0: number;
  vpd: number;
  leafWetnessHours: number;
  fetchedAt: string;
}

export interface SprayWindow {
  start: string;
  end: string;
  score: number;
  suitable: boolean;
  reasons: string[];
  reasonsBn: string[];
}

export interface PesticideCandidate {
  product: ChemicalProduct;
  score: number;
  status: 'preferred' | 'acceptable' | 'avoid';
  reasons: string[];
  reasonsBn: string[];
  weatherFit: number;
  resistanceFit: number;
}

export interface PesticideIntelligenceResult {
  weather: WeatherSnapshot;
  sprayWindows: SprayWindow[];
  candidates: PesticideCandidate[];
  diseasePressure: number;
  diseasePressureLabel: 'low' | 'moderate' | 'high';
  warnings: string[];
  warningsBn: string[];
  /** NEW: KWI disease forecast (rice_blast, BLB, etc.) — null if no crops provided */
  diseaseForecast: KwiDiseaseSummary | null;
  /** NEW: crop calendar info (current stage, day in cycle) — null if no crops */
  cropCalendar: KwiCropSummary | null;
  /** NEW: cache metadata for transparency */
  cacheHit: boolean;
  generatedAt: string;
}

export interface KwiDiseaseSummary {
  overallFavorability: number;
  spreadRisk: string;
  diseases: Array<{
    name: string;
    nameBn: string;
    risk: number;
    level: string;
    preventiveActions: string[];
    curativeActions: string[];
  }>;
}

export interface KwiCropSummary {
  cropId: string;
  stage: string;
  dayOverall: number;
  isDelayed: boolean;
}

// ────────────────────────────────────────────────────────────
// KWI singleton (shared cache across all calls)
// ────────────────────────────────────────────────────────────

let _kwi: WeatherIntelligence | null = null;

function getKWI(): WeatherIntelligence {
  if (!_kwi) {
    _kwi = createWeatherIntelligence({
      cacheTtlSeconds: 300,      // 5-minute cache
      cacheMaxEntries: 256,     // LRU cap
    });
  }
  return _kwi;
}

// ────────────────────────────────────────────────────────────
// Helpers (preserved from original for backward compat)
// ────────────────────────────────────────────────────────────

const cropMatch = (p: ChemicalProduct, c: string) =>
  !c.trim() ||
  p.crops.some(
    (x) =>
      x.toLowerCase().includes(c.toLowerCase()) ||
      c.toLowerCase().includes(x.toLowerCase()),
  );

const pestMatch = (p: ChemicalProduct, c: string) =>
  !c.trim() ||
  p.pests.some(
    (x) =>
      x.toLowerCase().includes(c.toLowerCase()) ||
      c.toLowerCase().includes(x.toLowerCase()),
  );

const sameMoa = (p: ChemicalProduct, last?: string) =>
  !!last &&
  !!p.moaCode &&
  (p.moaCode.toLowerCase().replace(/\s/g, '') ===
    last.toLowerCase().replace(/\s/g, '') ||
    p.moaCode
      .toLowerCase()
      .split(/[\\/]/)
      .some((x) => x && last.toLowerCase().includes(x)));

// ────────────────────────────────────────────────────────────
// Convert KWI weather → legacy WeatherSnapshot
// ────────────────────────────────────────────────────────────

function toWeatherSnapshot(result: WeatherIntelligenceResult): WeatherSnapshot {
  const w = result.weather;
  const ai = w.agriculturalIndices;
  return {
    temperature: w.current.temperature,
    humidity: w.current.humidity,
    windSpeed: w.current.windSpeed,
    rainProbability: w.current.precipitationProbability,
    precipitation: w.current.precipitation,
    dewPoint: w.current.dewPoint,
    uvIndex: w.current.uvIndex,
    et0: ai.et0,
    vpd: ai.vaporPressureDeficit,
    leafWetnessHours: ai.leafWetnessHours,
    fetchedAt: w.fetchedAt,
  };
}

// ────────────────────────────────────────────────────────────
// Convert KWI OperationWindow[] → legacy SprayWindow[]
// ────────────────────────────────────────────────────────────

function toSprayWindows(kwiWindows: OperationWindow[]): SprayWindow[] {
  if (kwiWindows.length === 0) {
    // Fallback: generate a single "current conditions" window
    // so the UI always has something to display.
    const start = new Date(Date.now() + 3_600_000).toISOString();
    const end = new Date(Date.now() + 7_200_000).toISOString();
    return [{
      start, end, score: 0, suitable: false,
      reasons: ['No suitable spray window in the next 48 hours.'],
      reasonsBn: ['পরবর্তী ৪৮ ঘণ্টায় স্প্রে করার উপযুক্ত সময় নেই।'],
    }];
  }
  return kwiWindows.map((w) => ({
    start: w.start,
    end: w.end,
    score: w.score,
    suitable: w.suitable,
    reasons: w.reasons,
    reasonsBn: w.reasonsBn,
  }));
}

// ────────────────────────────────────────────────────────────
// Disease pressure (derived from KWI disease forecast)
// ────────────────────────────────────────────────────────────

function computeDiseasePressure(result: WeatherIntelligenceResult): {
  pressure: number;
  label: 'low' | 'moderate' | 'high';
} {
  // If KWI has disease data, use it directly.
  if (result.disease.diseases.length > 0) {
    const fav = result.disease.overallFavorability;
    return {
      pressure: fav,
      label: fav >= 65 ? 'high' : fav >= 35 ? 'moderate' : 'low',
    };
  }

  // Fallback: derive from weather (same logic as original, but using
  // KWI's corrected data).
  const w = result.weather;
  let s = 0;
  if (w.current.humidity >= 85) s += 35;
  else if (w.current.humidity >= 75) s += 20;
  if (w.agriculturalIndices.leafWetnessHours >= 8) s += 30;
  else if (w.agriculturalIndices.leafWetnessHours >= 4) s += 18;
  if (w.current.temperature >= 18 && w.current.temperature <= 30) s += 20;
  if (w.current.precipitationProbability >= 50) s += 15;
  s = Math.min(100, s);
  return {
    pressure: s,
    label: s >= 65 ? 'high' : s >= 35 ? 'moderate' : 'low',
  };
}

// ────────────────────────────────────────────────────────────
// Pesticide candidate ranking (preserved from original)
// ────────────────────────────────────────────────────────────

function rankCandidates(
  products: ChemicalProduct[],
  weather: WeatherSnapshot,
  crop: string,
  pest: string,
  lastMoa?: string,
): PesticideCandidate[] {
  return products
    .filter((p) => cropMatch(p, crop) && pestMatch(p, pest))
    .map((product) => {
      const wf =
        weather.windSpeed <= 15 && weather.rainProbability < 35 ? 100 : 45;
      const repeated = sameMoa(product, lastMoa);
      const rf = repeated
        ? 0
        : product.resistanceRisk === 'High'
          ? 45
          : 85;
      let score =
        wf * 0.35 +
        rf * 0.45 +
        (product.phiDays == null ? 60 : Math.max(0, 100 - product.phiDays)) * 0.2;
      const reasons: string[] = [];
      const reasonsBn: string[] = [];

      if (repeated) {
        score -= 60;
        reasons.push('Same MoA as the previous spray; rotate to a different group.');
        reasonsBn.push('আগের স্প্রের একই MoA; ভিন্ন গ্রুপে ঘূর্ণন করুন।');
      } else {
        reasons.push('Different MoA from the previous spray.');
        reasonsBn.push('আগের স্প্রের থেকে ভিন্ন MoA গ্রুপ।');
      }

      if (product.resistanceRisk === 'High') {
        reasons.push('Higher resistance risk; follow the label and field need.');
        reasonsBn.push('প্রতিরোধ ঝুঁকি বেশি; লেবেল ও মাঠের প্রয়োজন অনুযায়ী ব্যবহার করুন।');
      }

      if (product.dosageRate) {
        reasons.push('Label rate available: ' + product.dosageRate);
        reasonsBn.push('লেবেলভিত্তিক মাত্রা: ' + product.dosageRate);
      }

      const status: PesticideCandidate['status'] =
        repeated || weather.windSpeed > 20 || weather.rainProbability >= 70
          ? 'avoid'
          : score >= 72
            ? 'preferred'
            : 'acceptable';

      return {
        product,
        score: Math.round(Math.max(0, Math.min(100, score))),
        status,
        reasons,
        reasonsBn,
        weatherFit: wf,
        resistanceFit: rf,
      };
    })
    .sort((x, y) => y.score - x.score)
    .slice(0, 12);
}

// ────────────────────────────────────────────────────────────
// Warnings (derived from KWI data)
// ────────────────────────────────────────────────────────────

function buildWarnings(weather: WeatherSnapshot, diseasePressure: number): {
  warnings: string[];
  warningsBn: string[];
} {
  const warnings: string[] = [];
  const warningsBn: string[] = [];

  if (weather.windSpeed > 15) {
    warnings.push('Do not spray in strong wind; reassess the next suitable window.');
    warningsBn.push('বাতাস বেশি হলে স্প্রে করবেন না; পরবর্তী উপযুক্ত সময় পুনর্মূল্যায়ন করুন।');
  }
  if (weather.rainProbability >= 35) {
    warnings.push('Rain is possible; follow the product label rainfast requirement.');
    warningsBn.push('বৃষ্টির সম্ভাবনা আছে; পণ্যের লেবেলের rainfast সময় মানুন।');
  }
  if (diseasePressure >= 65) {
    warnings.push('Weather is disease-favorable; monitor the crop before choosing a fungicide.');
    warningsBn.push('আবহাওয়া রোগের অনুকূল; ছত্রাকনাশক বাছাইয়ের আগে মাঠ পর্যবেক্ষণ করুন।');
  }

  return { warnings, warningsBn };
}

// ────────────────────────────────────────────────────────────
// Main entry point — drop-in replacement for the original
// ────────────────────────────────────────────────────────────

export async function runPesticideIntelligence(input: {
  location: IntelligenceLocation;
  products: ChemicalProduct[];
  crop: string;
  pest?: string;
  lastMoa?: string;
  /** NEW: crop sowing date for KWI crop-stage awareness (optional) */
  sowingDate?: string;
  /** NEW: current crop growth stage (optional) */
  growthStage?: string;
}): Promise<PesticideIntelligenceResult> {
  const kwi = getKWI();

  // Build optional active crop for KWI disease + calendar engines
  let activeCrops: ReturnType<typeof createActiveCrop>[] = [];
  let kwiResult: WeatherIntelligenceResult;

  if (input.sowingDate && input.growthStage) {
    // Try to create an active crop using KWI's crop configs.
    // Map the pesticide app's crop name to a KWI cropId.
    const cropId = mapCropName(input.crop);
    if (cropId) {
      try {
        const crop = createActiveCrop({
          cropId,
          sowingDate: input.sowingDate,
          currentStage: input.growthStage as 'sowing' | 'seedling' | 'vegetative' | 'flowering' | 'harvest',
        });
        activeCrops = [crop];
      } catch {
        // Unknown cropId or invalid date — proceed without crop context.
        // KWI will still return weather + operation windows.
      }
    }
  }

  // Run KWI analyze
  kwiResult = await kwi.analyze({
    location: {
      latitude: input.location.latitude,
      longitude: input.location.longitude,
      name: input.location.name || '',
      district: input.location.district,
      country: input.location.country || 'Bangladesh',
    },
    activeCrops: activeCrops.length > 0 ? activeCrops : undefined,
  });

  // Convert KWI result → legacy interfaces
  const weather = toWeatherSnapshot(kwiResult);
  const sprayWindows = toSprayWindows(kwiResult.operationWindows.spray);
  const { pressure, label } = computeDiseasePressure(kwiResult);
  const candidates = rankCandidates(
    input.products,
    weather,
    input.crop,
    input.pest || '',
    input.lastMoa,
  );
  const { warnings, warningsBn } = buildWarnings(weather, pressure);

  // Extract KWI disease forecast summary (new feature)
  let diseaseForecast: KwiDiseaseSummary | null = null;
  if (kwiResult.disease.diseases.length > 0) {
    diseaseForecast = {
      overallFavorability: kwiResult.disease.overallFavorability,
      spreadRisk: kwiResult.disease.spreadRisk,
      diseases: kwiResult.disease.diseases.map((d) => ({
        name: d.disease.name,
        nameBn: d.disease.nameBn,
        risk: d.risk,
        level: d.level,
        preventiveActions: d.preventiveActions,
        curativeActions: d.curativeActions,
      })),
    };
  }

  // Extract crop calendar summary (new feature)
  let cropCalendar: KwiCropSummary | null = null;
  if (kwiResult.calendar.length > 0) {
    const cal = kwiResult.calendar[0];
    cropCalendar = {
      cropId: activeCrops[0]?.cropId || '',
      stage: cal.stage,
      dayOverall: cal.dayOverall,
      isDelayed: cal.isDelayed,
    };
  }

  return {
    weather,
    sprayWindows,
    candidates,
    diseasePressure: pressure,
    diseasePressureLabel: label,
    warnings,
    warningsBn,
    diseaseForecast,
    cropCalendar,
    cacheHit: kwiResult.metadata.cacheHit,
    generatedAt: kwiResult.metadata.generatedAt,
  };
}

// ────────────────────────────────────────────────────────────
// Crop name → KWI cropId mapping
// ────────────────────────────────────────────────────────────

const CROP_NAME_MAP: Record<string, string> = {
  // English
  rice: 'rice', paddy: 'rice', dhan: 'rice',
  wheat: 'wheat',
  jute: 'jute',
  potato: 'potato',
  mustard: 'mustard', rapeseed: 'mustard',
  peanut: 'peanut', groundnut: 'peanut',
  lentil: 'lentil', masur: 'lentil',
  chickpea: 'chickpea', gram: 'chickpea',
  mungbean: 'mungbean', mung: 'mungbean', moong: 'mungbean',
  sesame: 'sesame', til: 'sesame',
  chili: 'chili', chilli: 'chili', pepper: 'chili',
  onion: 'onion',
  maize: 'rice', corn: 'rice', // fallback — maize not yet configured
  // Bengali
  'ধান': 'rice', 'চাল': 'rice',
  'গম': 'wheat',
  'পাট': 'jute',
  'আলু': 'potato',
  'সরিষা': 'mustard',
  'চীনাবাদাম': 'peanut',
  'মসুর': 'lentil',
  'ছোলা': 'chickpea',
  'মুগ': 'mungbean',
  'তিল': 'sesame',
  'মরিচ': 'chili',
  'পেঁয়াজ': 'onion',
};

function mapCropName(name: string): string | null {
  const key = name.toLowerCase().trim();
  return CROP_NAME_MAP[key] || null;
}

// ────────────────────────────────────────────────────────────
// Convenience: fetch weather only (for the server API route)
// ────────────────────────────────────────────────────────────

export async function fetchWeather(
  location: IntelligenceLocation,
): Promise<WeatherSnapshot> {
  const kwi = getKWI();
  const weather = await kwi.getWeather({
    latitude: location.latitude,
    longitude: location.longitude,
    name: location.name || '',
    district: location.district,
    country: location.country || 'Bangladesh',
  });
  return toWeatherSnapshot({
    weather,
    risks: {} as never,
    disease: {} as never,
    recommendations: [],
    calendar: [],
    dailyPlan: {} as never,
    weeklyPlan: {} as never,
    operationWindows: {} as never,
    metadata: {} as never,
  });
}
