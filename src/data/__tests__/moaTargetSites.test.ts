import { describe, it, expect } from 'vitest';
import { atomicMoaGroups, canonicalMoaCode } from '../../utils/moaUtils';
import { MOA_DATABASE } from '../../data/moaData';
import { MOA_TARGET_SITES } from '../../data/moaTargetSites';

describe('MoA target-site data (moaTargetSites.ts)', () => {
  it('every extension entry carries a non-empty targetSite and targetSiteBn', () => {
    for (const m of MOA_TARGET_SITES) {
      expect(m.targetSite, `${m.code} targetSite`).toBeTruthy();
      expect(m.targetSiteBn, `${m.code} targetSiteBn`).toBeTruthy();
      expect(m.rotationStrategy, `${m.code} rotationStrategy`).toBeTruthy();
      expect(Array.isArray(m.primaryActives)).toBe(true);
    }
  });

  it('extension codes do not shadow curated MOA_DATABASE entries', () => {
    const curated = new Set(MOA_DATABASE.map((m) => canonicalMoaCode(m.code) ?? m.code));
    for (const m of MOA_TARGET_SITES) {
      const c = canonicalMoaCode(m.code) ?? m.code;
      // Only the deliberate duplicate rows (Rodenticide aliases) may overlap.
      if (curated.has(c)) {
        expect(['Rodenticide', 'Second-generation Anticoagulant', 'FRAC 12', 'FRAC P1'])
          .toContain(m.code);
      }
    }
  });

  it('union of both sources resolves a target site for every atomic group in the catalogue fixture', () => {
    // Atomic fixture of the catalogue's real MoA spelling space — combos,
    // notation variants and bare scheme-less codes all included.
    const catalogueCodes = [
      'IRAC 1A', 'IRAC 1B', 'IRAC 2A', 'IRAC 2B', 'IRAC 3A', 'IRAC 4A', 'IRAC 4C', 'IRAC 4D',
      'IRAC 4E', 'IRAC 5', 'IRAC 6', 'IRAC 7C', 'IRAC 8A', 'IRAC 9B', 'IRAC 9C', 'IRAC 9D',
      'IRAC 10A', 'IRAC 10B', 'IRAC 11A', 'IRAC 12A', 'IRAC 12B', 'IRAC 12C', 'IRAC 13', 'IRAC 14',
      'IRAC 15', 'IRAC 16', 'IRAC 17', 'IRAC 18', 'IRAC 19', 'IRAC 20A', 'IRAC 21', 'IRAC 21A',
      'IRAC 22A', 'IRAC 23', 'IRAC 24A', 'IRAC 24B', 'IRAC 28', 'IRAC 30', 'IRAC 31', 'IRAC 34',
      'IRAC UN', 'IRAC UNF', 'FRAC 1', 'FRAC 2', 'FRAC 3', 'FRAC 4', 'FRAC 5', 'FRAC 6',
      'FRAC 7', 'FRAC 11', 'FRAC 12', 'FRAC 14', 'FRAC 24', 'FRAC 25', 'FRAC 26', 'FRAC 27',
      'FRAC 28', 'FRAC 33', 'FRAC 40', 'FRAC 43', 'FRAC BM02', 'FRAC M01', 'FRAC M02',
      'FRAC M03', 'FRAC M05', 'FRAC P05', 'FRAC P07', 'FRAC U8', 'FRAC U18', 'FRAC NC', 'FRAC UN',
      'FRAC 16.1', 'FRAC P1', 'HRAC A', 'HRAC B', 'HRAC C1', 'HRAC C3', 'HRAC D', 'HRAC E', 'HRAC F2',
      'HRAC F3', 'HRAC G', 'HRAC H', 'HRAC I', 'HRAC K1', 'HRAC K2', 'HRAC K3', 'HRAC L',
      'HRAC O', 'HRAC Q', 'BIO', 'IPM', 'Nema UN', 'Metabolic Acute', 'Acute Metabolic Toxin',
      'Anticoagulant FGAR', 'Second-generation Anticoagulant', 'Pheromone Mating Disruption',
      'IPM Biological Pheromone', 'Rodenticide',
    ];

    const index = new Map<string, { targetSite?: string }>();
    for (const m of [...MOA_DATABASE, ...MOA_TARGET_SITES]) {
      const c = canonicalMoaCode(m.code) ?? m.code;
      if (!index.has(c) || !index.get(c)?.targetSite) index.set(c, { targetSite: m.targetSite });
      index.set(m.code, { targetSite: m.targetSite });
    }

    const missing: string[] = [];
    for (const code of catalogueCodes) {
      const atoms = atomicMoaGroups([code]);
      for (const a of atoms) {
        if (!index.get(a)?.targetSite) missing.push(`${code} -> ${a}`);
      }
    }
    expect(missing).toEqual([]);
  });

  it('combination codes still resolve every component group to a target site', () => {
    const index = new Map<string, { targetSite?: string }>();
    for (const m of [...MOA_DATABASE, ...MOA_TARGET_SITES]) {
      const c = canonicalMoaCode(m.code) ?? m.code;
      if (!index.has(c) || !index.get(c)?.targetSite) index.set(c, { targetSite: m.targetSite });
      index.set(m.code, { targetSite: m.targetSite });
    }
    const combos = ['IRAC 1B + 3A', 'FRAC M03 + 4', 'HRAC 2 + 15 (B + K3)', 'FRAC 11 + 3'];
    for (const combo of combos) {
      const atoms = atomicMoaGroups([combo]);
      expect(atoms.length).toBeGreaterThan(1);
      for (const a of atoms) {
        expect(index.get(a)?.targetSite, `${combo} -> ${a}`).toBeTruthy();
      }
    }
  });
});
