import { describe, expect, it } from 'vitest';
import { ChemicalProduct } from '../../types';
import {
  convertIndicDigits,
  detectScript,
  extractRegistrationNos,
  matchParsedLabel,
  matchScanResult,
  normalizeScanText,
  parseLabelScan,
  transliterateBnToEn,
} from '../scanUtils';

// Shared product catalogue fixture — mirrors the CSV shape populated by
// `allPesticidesData.ts` (tradeName = Brand Name, commonName/activeIngredients
// parsed from Common Name).
const fixtures: ChemicalProduct[] = [
  {
    id: 'mit-AP-4578-0001',
    type: 'Insecticide',
    commonName: 'Thiamethoxam (20%) + Acetamiprid (10%)',
    activeIngredients: ['Thiamethoxam', 'Acetamiprid'],
    tradeName: 'Taslon 25WG',
    registrationNo: 'AP-4578',
    registrationHolder: 'Alif Agro',
    crops: ['Rice', 'Chilli'],
    pests: ['BPH', 'Aphid'],
    dosageRate: '100 g/ha',
  },
  {
    id: 'miti-AP-5242-0001',
    type: 'Miticide',
    commonName: 'Ethion (5%)',
    activeIngredients: ['Ethion'],
    tradeName: 'Pithion 46.5EC',
    registrationNo: 'AP-5242',
    registrationHolder: 'Padma Oil Company Ltd.',
    crops: ['Chilli'],
    pests: ['Mites'],
    dosageRate: '2 ml/L of water',
  },
  {
    id: 'fung-AP-9999-0001',
    type: 'Fungicide',
    commonName: 'Buprofezin (25%)',
    activeIngredients: ['Buprofezin'],
    tradeName: 'Applaud 25SC',
    registrationNo: 'AP-9999',
    registrationHolder: 'Bayer',
    crops: ['Rice'],
    pests: ['Brown planthopper'],
    dosageRate: '50 g/ha',
    // Bengali transliteration of the active ingredient, used to bridge Bangla
    // label text onto the English catalogue.
    aiAliases: ['বুপ্রোফেজিন'],
  },
];

// ---------------------------------------------------------------------------
// Normalisation primitives
// ---------------------------------------------------------------------------

describe('convertIndicDigits', () => {
  it('converts Bengali digits to ASCII', () => {
    expect(convertIndicDigits('৪৬.৫')).toBe('46.5');
    expect(convertIndicDigits('০১২৩৪৫৬৭৮৯')).toBe('0123456789');
  });
  it('leaves non-Bengali characters untouched', () => {
    expect(convertIndicDigits('Dhanuka 25EC')).toBe('Dhanuka 25EC');
    expect(convertIndicDigits('abc ৪৫.৬ xyz')).toBe('abc 45.6 xyz');
  });
});

describe('detectScript', () => {
  it('classifies English input', () => {
    expect(detectScript('Taslon 25WG')).toBe('en');
  });
  it('classifies pure Bengali input', () => {
    expect(detectScript('থাক')).toBe('bn');
  });
  it('classifies mixed scripts', () => {
    expect(detectScript('Pithion ৪৬.৫ EC')).toBe('mixed');
  });
  it('returns none for empty / numeric-only input', () => {
    expect(detectScript('')).toBe('none');
    expect(detectScript('123')).toBe('none');
  });
});

describe('transliterateBnToEn', () => {
  it('transliterates a known Bengali word', () => {
    expect(transliterateBnToEn('বাংলা')).toBe('bangla');
  });
});

describe('normalizeScanText', () => {
  it('lowercases, trims and collapses whitespace', () => {
    expect(normalizeScanText('  Taslon   25WG  ')).toBe('taslon 25wg');
  });
  it('converts Bengali digits before lowercasing', () => {
    expect(normalizeScanText('Pithion ৪৬.৫EC')).toBe('pithion 46.5ec');
  });
});

// ---------------------------------------------------------------------------
// Brand matching
// ---------------------------------------------------------------------------

describe('matchScanResult — brand', () => {
  it('matches a brand exactly (case-insensitive)', () => {
    const m = matchScanResult('taslon 25WG', fixtures);
    expect(m).toHaveLength(1);
    expect(m[0].field).toBe('brand');
    expect(m[0].confidence).toBe('exact');
    expect(m[0].product.tradeName).toBe('Taslon 25WG');
  });

  it('matches a brand with Bengali digits', () => {
    // Scanned label printed "Taslon ২৫WG" using Bengali numerals.
    const m = matchScanResult('Taslon ২৫WG', fixtures);
    expect(m).toHaveLength(1);
    expect(m[0].field).toBe('brand');
    expect(m[0].confidence).toBe('exact');
  });

  it('scores a brand-prefix query as partial', () => {
    // Farmer types just the start of the brand name.
    const m = matchScanResult('tasl', fixtures);
    expect(m).toHaveLength(1);
    expect(m[0].field).toBe('brand');
    expect(m[0].confidence).toBe('partial');
  });

  it('scores a brand substring query as broad', () => {
    // "25wg" appears inside the brand but is not a leading token.
    const m = matchScanResult('25w', fixtures);
    const hit = m.find((x) => x.product.tradeName === 'Taslon 25WG');
    expect(hit).toBeDefined();
    expect(hit!.confidence).toBe('broad');
  });
});

// ---------------------------------------------------------------------------
// Active-ingredient (AI) matching
// ---------------------------------------------------------------------------

describe('matchScanResult — active ingredient', () => {
  it('matches an active ingredient exactly', () => {
    const m = matchScanResult('buprofezin', fixtures);
    expect(m).toHaveLength(1);
    expect(m[0].field).toBe('activeIngredient');
    expect(m[0].confidence).toBe('exact');
    expect(m[0].product.tradeName).toBe('Applaud 25SC');
  });

  it('matches an active ingredient case-insensitively', () => {
    const m = matchScanResult('THIAMETHOXAM', fixtures);
    expect(m).toHaveLength(1);
    expect(m[0].field).toBe('activeIngredient');
    expect(m[0].confidence).toBe('exact');
  });

  it('scores a single AI prefix query as partial', () => {
    const m = matchScanResult('thia', fixtures);
    expect(m).toHaveLength(1);
    expect(m[0].field).toBe('activeIngredient');
    expect(m[0].confidence).toBe('partial');
  });

  it('scores an AI substring query as broad', () => {
    // "methox" appears inside the AI but is not a leading token.
    const m = matchScanResult('methox', fixtures);
    const hit = m.find((x) => x.field === 'activeIngredient');
    expect(hit).toBeDefined();
    expect(hit!.confidence).toBe('broad');
  });

  it('does not match a brand when only the AI is queried', () => {
    // "ethion" is the AI, not the brand ("Pithion 46.5EC").
    const m = matchScanResult('ethion', fixtures);
    expect(m).toHaveLength(1);
    expect(m[0].field).toBe('activeIngredient');
    expect(m[0].product.tradeName).toBe('Pithion 46.5EC');
  });
});

// ---------------------------------------------------------------------------
// Bengali / alias path
// ---------------------------------------------------------------------------

describe('matchScanResult — Bengali aliases', () => {
  it('matches a Bengali transliterated AI alias against the English catalogue', () => {
    // The scanned label reads the AI in Bengali script.
    const m = matchScanResult('বুপ্রোফেজিন', fixtures);
    expect(m).toHaveLength(1);
    expect(m[0].product.tradeName).toBe('Applaud 25SC');
  });
});

// ---------------------------------------------------------------------------
// Ranking & negatives
// ---------------------------------------------------------------------------

describe('matchScanResult — ranking & negatives', () => {
  it('ranks exact above partial above broad', () => {
    // "buprofezin" -> exact; "buprof" -> partial prefix; "profe" -> broad.
    const exact = matchScanResult('buprofezin', fixtures)[0];
    const partial = matchScanResult('buprof', fixtures)[0];
    const broad = matchScanResult('profe', fixtures)[0];
    expect(exact.confidence).toBe('exact');
    expect(partial.confidence).toBe('partial');
    expect(broad.confidence).toBe('broad');
  });

  it('returns nothing for an unknown brand', () => {
    expect(matchScanResult('totally unknown thing', fixtures)).toHaveLength(0);
  });

  it('returns nothing for a pure stopword query', () => {
    expect(matchScanResult('the', fixtures)).toHaveLength(0);
  });
});

describe('pipeline surface (regression)', () => {
  it('exposes script + normalized pipeline around matchScanResult', () => {
    const m = matchScanResult('taslon 25wg', fixtures);
    expect(m[0].confidence).toBe('exact');
    expect(detectScript('taslon 25wg')).toBe('en');
    expect(normalizeScanText('Pithion ৪৬.৫ EC')).toBe('pithion 46.5 ec');
  });
});

describe('parseLabelScan / QR payload', () => {
  it('extracts registration numbers including Bengali digits', () => {
    expect(extractRegistrationNos('নিবন্ধন নং এপি-৪৫৭৮ AP-4578')).toContain('AP-4578');
    expect(extractRegistrationNos('AP 5242')).toEqual(['AP-5242']);
  });

  it('parses GROUP 4A INSECTICIDE badges and MoA codes', () => {
    const parsed = parseLabelScan('GROUP 4A INSECTICIDE  IRAC 4A  AP-4578  BATCH: L24-09');
    expect(parsed.registrationNos).toContain('AP-4578');
    expect(parsed.moaCodes.some((c) => /IRAC\s*4A/i.test(c))).toBe(true);
    expect(parsed.groupTokens).toContain('4A');
    expect(parsed.batchNo).toBe('L24-09');
  });

  it('matches a JSON QR payload by registration number', () => {
    const raw = JSON.stringify({
      registrationNo: 'AP-4578',
      tradeName: 'Taslon 25WG',
      moaCode: 'IRAC 4A',
      batchNo: 'B-11',
    });
    const parsed = parseLabelScan(raw);
    const hits = matchParsedLabel(parsed, fixtures);
    expect(hits).toHaveLength(1);
    expect(hits[0].field).toBe('registration');
    expect(hits[0].product.tradeName).toBe('Taslon 25WG');
  });

  it('falls back to brand matching when no registration number is present', () => {
    const parsed = parseLabelScan('Taslon 25WG GROUP 4A INSECTICIDE');
    const hits = matchParsedLabel(parsed, fixtures);
    expect(hits[0].product.tradeName).toBe('Taslon 25WG');
  });
});
