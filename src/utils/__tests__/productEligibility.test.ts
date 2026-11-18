// Product Eligibility Engine tests — directive Task 10 scenarios:
//  5. crop mismatch → excluded
//  6. target mismatch → excluded
//  7. unverified registration → no verified eligibility claim
//  8. missing dosage → no fabricated dosage
//  + missing MoA disclosure, regNo format validation, policy ban,
//    eligible-only filtering, exclusion explanations.
import { describe, expect, it } from 'vitest';
import {
  evaluateProductEligibility,
  filterEligibleProducts,
  explainExclusions,
} from '../../intelligence/productEligibility';
import type { ChemicalProduct } from '../../types';

function product(over: Partial<ChemicalProduct> = {}): ChemicalProduct {
  return {
    id: 'p1',
    type: 'Fungicide',
    commonName: 'Tricyclazole',
    tradeName: 'Sivic 75WP',
    registrationNo: 'AP-5242',
    registrationHolder: 'ACI',
    crops: ['Rice'],
    pests: ['Rice Blast', 'Brown Spot'],
    dosageRate: '15 g/10L water',
    moaCode: 'FRAC P1',
    formulation: 'WP',
    ...over,
  } as ChemicalProduct;
}

const ctx = { crop: 'Rice', target: 'Rice Blast' };

describe('scenario: fully verified product', () => {
  it('is eligible with verified registration, dosage and MoA', () => {
    const r = evaluateProductEligibility(product(), ctx);
    expect(r.eligible).toBe(true);
    expect(r.registrationNo).toBe('AP-5242');
    expect(r.cropMatch).toBe(true);
    expect(r.targetMatch).toBe(true);
    expect(r.dosage).toBe('15 g/10L water');
    expect(r.moaCode).toBe('FRAC P1');
    expect(r.exclusions).toHaveLength(0);
  });
});

describe('scenario 5: crop mismatch', () => {
  it('excluded with CROP_NOT_REGISTERED', () => {
    const r = evaluateProductEligibility(product({ crops: ['Potato', 'Tomato'] }), ctx);
    expect(r.eligible).toBe(false);
    expect(r.cropMatch).toBe(false);
    expect(r.exclusions.some((e) => e.code === 'CROP_NOT_REGISTERED')).toBe(true);
  });
});

describe('scenario 6: target mismatch', () => {
  it('excluded with TARGET_NOT_REGISTERED', () => {
    const r = evaluateProductEligibility(product({ pests: ['Sheath Blight'] }), ctx);
    expect(r.eligible).toBe(false);
    expect(r.targetMatch).toBe(false);
    expect(r.exclusions.some((e) => e.code === 'TARGET_NOT_REGISTERED')).toBe(true);
  });
});

describe('scenario 7: unverified registration', () => {
  it('missing regNo → excluded, no verified claim', () => {
    const r = evaluateProductEligibility(product({ registrationNo: '' }), ctx);
    expect(r.eligible).toBe(false);
    expect(r.exclusions.some((e) => e.code === 'MISSING_REGISTRATION_NO')).toBe(true);
  });

  it('malformed regNo → excluded (DAE format check)', () => {
    const r = evaluateProductEligibility(product({ registrationNo: 'AP5615' }), ctx);
    expect(r.eligible).toBe(false);
    expect(r.exclusions.some((e) => e.code === 'INVALID_REGISTRATION_NO')).toBe(true);
  });

  it('policy ban → excluded', () => {
    const r = evaluateProductEligibility(
      product({ bangladeshPolicyAction: 'Banned for rice use — withdrawal 2025' } as Partial<ChemicalProduct>),
      ctx,
    );
    expect(r.eligible).toBe(false);
    expect(r.exclusions.some((e) => e.code === 'POLICY_BANNED')).toBe(true);
  });
});

describe('scenario 8: missing dosage', () => {
  it('no fabricated dosage — disclosed as missing', () => {
    const r = evaluateProductEligibility(product({ dosageRate: '' }), ctx);
    expect(r.dosage).toBeNull();
    expect(r.eligible).toBe(false);
    expect(r.exclusions.some((e) => e.code === 'NO_DOSAGE_DATA')).toBe(true);
    expect(r.missingData.some((m) => m.toLowerCase().includes('dosage'))).toBe(true);
  });
});

describe('scenario 9 (unknown MoA stewardship uncertainty)', () => {
  it('missing MoA → disclosed, not silently safe', () => {
    const r = evaluateProductEligibility(product({ moaCode: '' }), ctx);
    expect(r.eligible).toBe(false);
    expect(r.exclusions.some((e) => e.code === 'MISSING_MOA')).toBe(true);
    expect(r.missingData.some((m) => m.includes('MoA'))).toBe(true);
  });
});

describe('missing crop/target data (registry gap ~50%)', () => {
  it('empty crops list → CROP_DATA_MISSING, never a pass', () => {
    const r = evaluateProductEligibility(product({ crops: [] }), ctx);
    expect(r.cropMatch).toBeNull();
    expect(r.eligible).toBe(false);
    expect(r.exclusions.some((e) => e.code === 'CROP_DATA_MISSING')).toBe(true);
  });

  it('empty pests list → TARGET_DATA_MISSING, never a pass', () => {
    const r = evaluateProductEligibility(product({ pests: [] }), ctx);
    expect(r.targetMatch).toBeNull();
    expect(r.eligible).toBe(false);
    expect(r.exclusions.some((e) => e.code === 'TARGET_DATA_MISSING')).toBe(true);
  });
});

describe('PHI/REI disclosure', () => {
  it('missing PHI/REI disclosed, never treated as zero', () => {
    const r = evaluateProductEligibility(product({ phiDays: undefined, reiHours: undefined }), ctx);
    expect(r.phiDays).toBeNull();
    expect(r.reiHours).toBeNull();
    expect(r.missingData.some((m) => m.includes('PHI'))).toBe(true);
    expect(r.missingData.some((m) => m.includes('REI'))).toBe(true);
  });
});

describe('filterEligibleProducts', () => {
  it('returns only eligible products', () => {
    const products = [
      product(),
      product({ id: 'p2', tradeName: 'Wrong Crop', crops: ['Potato'] }),
      product({ id: 'p3', tradeName: 'No Reg', registrationNo: '' }),
    ];
    const eligible = filterEligibleProducts(products, ctx);
    expect(eligible).toHaveLength(1);
    expect(eligible[0].product.id).toBe('p1');
  });
});

describe('explainExclusions', () => {
  it('explains why alternatives were excluded', () => {
    const products = [
      product({ id: 'p2', tradeName: 'Wrong Crop', crops: ['Potato'] }),
    ];
    const explained = explainExclusions(products, ctx);
    expect(explained).toHaveLength(1);
    expect(explained[0].reasons.length).toBeGreaterThan(0);
  });
});
