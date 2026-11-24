import { describe, it, expect } from 'vitest';
import {
  canonicalMoaCode,
  moaCodeEquivalents,
  expandMoaQuery,
  parseMoaQuery,
  productMoaCodes,
} from '../moaUtils';
import { smartSearch } from '../smartSearch';
import type { ChemicalProduct } from '../../types';

const product = (moaCode: string, extra: Partial<ChemicalProduct> = {}): ChemicalProduct =>
  ({
    id: 'x',
    type: 'Insecticide',
    commonName: 'Abamectin',
    tradeName: 'Brand',
    registrationNo: 'AP-1',
    registrationHolder: 'Co',
    crops: ['Rice'],
    pests: ['BPH'],
    dosageRate: '1 ml/L',
    moaCode,
    ...extra,
  }) as ChemicalProduct;

describe('canonicalMoaCode', () => {
  it('folds FRAC zero padding', () => {
    expect(canonicalMoaCode('FRAC M03')).toBe('FRAC M3');
    expect(canonicalMoaCode('FRAC M01')).toBe('FRAC M1');
    expect(canonicalMoaCode('FRAC M3')).toBe('FRAC M3');
  });

  it('folds HRAC numeric codes to the legacy letter group', () => {
    expect(canonicalMoaCode('HRAC 15')).toBe('HRAC K3');
    expect(canonicalMoaCode('HRAC 2')).toBe('HRAC B');
    expect(canonicalMoaCode('HRAC K3')).toBe('HRAC K3');
  });

  it('leaves IRAC and unknown values alone', () => {
    expect(canonicalMoaCode('IRAC 3A')).toBe('IRAC 3A');
    expect(canonicalMoaCode('IRAC UN')).toBe('IRAC UN');
    expect(canonicalMoaCode('')).toBe('');
    expect(canonicalMoaCode(undefined)).toBe('');
  });
});

describe('moaCodeEquivalents', () => {
  it('lists both notations of a group', () => {
    expect(moaCodeEquivalents('FRAC M3')).toContain('FRAC M03');
    expect(moaCodeEquivalents('FRAC M03')).toContain('FRAC M3');
    expect(moaCodeEquivalents('HRAC K3')).toContain('HRAC 15');
    expect(moaCodeEquivalents('HRAC 15')).toContain('HRAC K3');
  });
});

describe('expandMoaQuery', () => {
  it('includes sub-groups of a parent group', () => {
    const known = ['FRAC 16', 'FRAC 16.1', 'FRAC 16.2', 'FRAC 3'];
    const expanded = expandMoaQuery('FRAC 16', known);
    expect(expanded).toContain('FRAC 16');
    expect(expanded).toContain('FRAC 16.1');
    expect(expanded).not.toContain('FRAC 3');
  });

  it('does not pull in the parent from a sub-group query', () => {
    const known = ['FRAC 16', 'FRAC 16.1'];
    expect(expandMoaQuery('FRAC 16.1', known)).not.toContain('FRAC 16');
  });
});

describe('parseMoaQuery', () => {
  const known = ['IRAC 3A', 'IRAC 1B', 'FRAC 16', 'FRAC 16.1', 'HRAC K3', 'FRAC M3'];

  it('reads a full group reference', () => {
    const q = parseMoaQuery('IRAC 3A', known);
    expect(q?.codes).toContain('IRAC 3A');
    expect(q?.label).toBe('IRAC 3A');
  });

  it('reads a numeric HRAC reference and folds it', () => {
    const q = parseMoaQuery('HRAC 15', known);
    expect(q?.codes).toContain('HRAC K3');
    expect(q?.codes).toContain('HRAC 15');
  });

  it('expands a parent group to its sub-groups', () => {
    const q = parseMoaQuery('FRAC 16', known);
    expect(q?.codes).toContain('FRAC 16');
    expect(q?.codes).toContain('FRAC 16.1');
  });

  it('returns null for an ordinary word', () => {
    expect(parseMoaQuery('rice', known)).toBeNull();
  });
});

describe('productMoaCodes', () => {
  it('collects every group a mixture product belongs to', () => {
    expect(productMoaCodes({ moaCode: 'FRAC M3', moaCodes: ['FRAC M3', 'FRAC 4'] }))
      .toEqual(['FRAC M3', 'FRAC 4']);
  });

  it('de-duplicates and canonicalises', () => {
    expect(productMoaCodes({ moaCode: 'FRAC M03', moaCodes: ['FRAC M3'] }))
      .toEqual(['FRAC M3']);
  });
});

describe('smartSearch — mode-of-action queries', () => {
  const products = [
    product('IRAC 3A'),
    product('FRAC 16.1'),
    product('HRAC K3'),
    product('FRAC M3'),
  ];

  it('matches a full group code instead of falling through to everything', () => {
    const r = smartSearch('IRAC 3A', products);
    expect(r.items).toHaveLength(1);
    expect(r.items[0].product.moaCode).toBe('IRAC 3A');
  });

  it('a parent group also returns its sub-groups, and nothing else', () => {
    const r = smartSearch('FRAC 16', products);
    expect(r.items).toHaveLength(1);
    expect(r.items[0].product.moaCode).toBe('FRAC 16.1');
  });

  it('folds a numeric HRAC reference onto the legacy letter group', () => {
    const r = smartSearch('HRAC 15', products);
    expect(r.items).toHaveLength(1);
    expect(r.items[0].product.moaCode).toBe('HRAC K3');
  });

  it('folds zero-padded FRAC codes', () => {
    const r = smartSearch('FRAC M03', products);
    expect(r.items).toHaveLength(1);
    expect(r.items[0].product.moaCode).toBe('FRAC M3');
  });

  it('matches a group code written without a space', () => {
    const r = smartSearch('FRAC16', products);
    expect(r.items).toHaveLength(1);
    expect(r.items[0].product.moaCode).toBe('FRAC 16.1');
  });

  it('matches a mixture product through any of its groups', () => {
    const mixture = [product('FRAC M3', { moaCodes: ['FRAC M3', 'FRAC 4'] })];
    expect(smartSearch('FRAC 4', mixture).items).toHaveLength(1);
    expect(smartSearch('FRAC M3', mixture).items).toHaveLength(1);
    expect(smartSearch('FRAC 7', mixture).items).toHaveLength(0);
  });

  it('still matches ordinary product searches', () => {
    const r = smartSearch('Abamectin', products);
    expect(r.items.length).toBeGreaterThan(0);
  });
});
