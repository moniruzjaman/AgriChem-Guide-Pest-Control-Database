// Protection Decision Engine tests — directive Task 10 scenarios:
//  1. High weather risk + no field evidence → SCOUT_REQUIRED (never automatic pesticide)
//  2. Low risk / no symptoms → MONITOR
//  4. Missing validated threshold → disclosed
// 11. IPM ladder ordering + chemical only when justified
// 12/13. High wind / rain risk → conditions flagged
// 14. KWI unavailable → safe fallback
// 15. Stale weather → freshness warning
// 16. No GPS / no weather, crop-only → INSUFFICIENT_DATA safety
import { describe, expect, it } from 'vitest';
import { runProtectionDecision, type DecisionInput, type ScoutingObservation } from '../../intelligence/protectionDecision';
import type { PesticideIntelligenceResult } from '../../intelligence/pesticideIntelligence';

function intelFixture(over: Partial<PesticideIntelligenceResult> = {}): PesticideIntelligenceResult {
  return {
    weather: {
      temperature: 28, humidity: 80, windSpeed: 8, rainProbability: 20, precipitation: 0,
      dewPoint: 24, uvIndex: 6, et0: 3.2, vpd: 1.1, leafWetnessHours: 6, fetchedAt: new Date().toISOString(),
    },
    sprayWindows: [
      { start: new Date().toISOString(), end: new Date().toISOString(), score: 80, suitable: true, reasons: [], reasonsBn: [] },
    ],
    candidates: [],
    diseasePressure: 70,
    diseasePressureLabel: 'high',
    warnings: [],
    warningsBn: [],
    diseaseForecast: {
      overallFavorability: 72,
      spreadRisk: 'high',
      diseases: [
        {
          name: 'Rice Blast', nameBn: 'ধানের ব্লাস্ট', risk: 78, level: 'high',
          preventiveActions: ['Use resistant varieties'], curativeActions: ['Drain field'],
        },
      ],
    },
    cropCalendar: null,
    cacheHit: false,
    generatedAt: new Date().toISOString(),
    riskCategories: [
      { category: 'disease', score: 78, level: 'high', confidence: 0.7, explanation: '', explanationBn: '', evidence: [] },
    ],
    pestForecast: null,
    overallRiskScore: 74,
    riskAlerts: [],
    dataFreshness: { provider: 'open-meteo', fetchedAt: new Date().toISOString(), ageMinutes: 5, stale: false, cacheHit: false },
    confidence: { diseaseForecast: 0.7, pestForecast: null, note: '' },
    ...over,
  };
}

function scoutingFixture(over: Partial<ScoutingObservation> = {}): ScoutingObservation {
  return {
    date: new Date().toISOString().slice(0, 10),
    target: 'Rice Blast',
    incidencePct: 40,
    severityPct: 55,
    symptoms: 'diamond-shaped lesions',
    confirmedDiagnosis: false,
    ...over,
  };
}

const input = (over: Partial<DecisionInput> = {}): DecisionInput => ({
  crop: 'Rice',
  intelligence: intelFixture(),
  scouting: null,
  eligibility: [],
  compliance: null,
  ...over,
});

describe('scenario 1: high weather risk, no field evidence', () => {
  it('returns SCOUT_REQUIRED, not a pesticide recommendation', () => {
    const d = runProtectionDecision(input({ scouting: null }));
    expect(d.status).toBe('SCOUT_REQUIRED');
    expect(d.actions.some((a) => a.chemical)).toBe(false);
  });

  it('explains that weather alone never justifies application', () => {
    const d = runProtectionDecision(input({ scouting: null }));
    expect(d.explanation.toLowerCase()).toContain('scout');
    expect(d.reasons.some((r) => r.code === 'NO_FIELD_EVIDENCE' && r.kind === 'blocker')).toBe(true);
  });
});

describe('scenario 2: low risk, no symptoms', () => {
  it('returns MONITOR when weather risk is low and nothing scouted', () => {
    const d = runProtectionDecision(
      input({
        intelligence: intelFixture({ overallRiskScore: 20, riskCategories: [], diseasePressure: 20, diseasePressureLabel: 'low' }),
        scouting: null,
      }),
    );
    expect(d.status).toBe('MONITOR');
  });
});

describe('scenario 3 (pest forecast drives targeted scouting)', () => {
  it('names the forecast pest in the scout-required explanation', () => {
    const intel = intelFixture({
      diseaseForecast: null,
      pestForecast: {
        overallFavorability: 70, spreadRisk: 'high', confidence: 0.6,
        pests: [{ name: 'Brown Planthopper', nameBn: 'বাদামী গাছ ফড়িং', risk: 75, level: 'high', symptoms: [], economicThreshold: '1-2 per hill', preventiveActions: [], curativeActions: [] }],
      },
    });
    const d = runProtectionDecision(input({ intelligence: intel, scouting: null }));
    expect(d.status).toBe('SCOUT_REQUIRED');
    expect(d.explanation).toContain('Brown Planthopper');
  });
});

describe('scenario 4: missing validated threshold is disclosed', () => {
  it('lists the missing threshold in missingInformation whenever scouting exists', () => {
    const d = runProtectionDecision(input({ scouting: scoutingFixture() }));
    expect(d.missingInformation.some((m) => m.toLowerCase().includes('threshold'))).toBe(true);
  });
});

describe('unconfirmed + not severe → IPM first', () => {
  it('returns IPM_ACTION with non-chemical actions only', () => {
    const d = runProtectionDecision(
      input({ scouting: scoutingFixture({ confirmedDiagnosis: false, severityPct: 10, incidencePct: 5 }) }),
    );
    expect(d.status).toBe('IPM_ACTION');
    expect(d.actions.every((a) => !a.chemical)).toBe(true);
  });
});

describe('prevention window', () => {
  it('returns PREVENTIVE_ACTION when scouted clean but weather rising', () => {
    const d = runProtectionDecision(
      input({
        scouting: scoutingFixture({ incidencePct: 0, severityPct: 0, symptoms: '' }),
        intelligence: intelFixture({ overallRiskScore: 65 }),
      }),
    );
    expect(d.status).toBe('PREVENTIVE_ACTION');
  });
});

describe('intervention consideration gating', () => {
  it('confirmed diagnosis + suitable window → INTERVENTION_CONSIDERATION with chemical action only when eligible products exist', () => {
    const d = runProtectionDecision(
      input({
        scouting: scoutingFixture({ confirmedDiagnosis: true }),
        eligibility: [
          // minimal EligibilityResult stub — decision only reads eligible + tradeName
          { product: { id: 'p1', tradeName: 'Sivic' }, eligible: true } as never,
        ],
      }),
    );
    expect(d.status).toBe('INTERVENTION_CONSIDERATION');
    expect(d.actions.some((a) => a.chemical)).toBe(true);
    expect(d.ipmTier).toBe(6);
  });

  it('no eligible products → chemical action suppressed', () => {
    const d = runProtectionDecision(
      input({ scouting: scoutingFixture({ confirmedDiagnosis: true }), eligibility: [] }),
    );
    expect(d.status).toBe('INTERVENTION_CONSIDERATION');
    expect(d.actions.some((a) => a.chemical)).toBe(false);
  });

  it('unsuitable weather → CONDITIONS_UNSUITABLE despite confirmed diagnosis', () => {
    const intel = intelFixture({ sprayWindows: [{ start: '', end: '', score: 0, suitable: false, reasons: [], reasonsBn: [] }] });
    const d = runProtectionDecision(
      input({ intelligence: intel, scouting: scoutingFixture({ confirmedDiagnosis: true }) }),
    );
    expect(d.status).toBe('CONDITIONS_UNSUITABLE');
    expect(d.reasons.some((r) => r.code === 'NO_SPRAY_WINDOW')).toBe(true);
  });
});

describe('scenario 12/13: weather safety constraints', () => {
  it('high wind → blocker reason present', () => {
    const intel = intelFixture({ weather: { ...intelFixture().weather, windSpeed: 18 } });
    const d = runProtectionDecision(input({ intelligence: intel }));
    expect(d.reasons.some((r) => r.code === 'HIGH_WIND' && r.kind === 'blocker')).toBe(true);
  });

  it('rain risk → blocker reason present', () => {
    const intel = intelFixture({ weather: { ...intelFixture().weather, rainProbability: 70 } });
    const d = runProtectionDecision(input({ intelligence: intel }));
    expect(d.reasons.some((r) => r.code === 'RAIN_RISK' && r.kind === 'blocker')).toBe(true);
  });
});

describe('scenario 14: KWI unavailable', () => {
  it('no intel + no scouting → INSUFFICIENT_DATA (safe fallback)', () => {
    const d = runProtectionDecision(input({ intelligence: null, scouting: null }));
    expect(d.status).toBe('INSUFFICIENT_DATA');
    expect(d.reasons.some((r) => r.code === 'KWI_UNAVAILABLE' || r.code === 'NO_INPUTS')).toBe(true);
  });

  it('no intel but scouting exists → decision still possible on field records', () => {
    const d = runProtectionDecision(input({ intelligence: null, scouting: scoutingFixture({ confirmedDiagnosis: true }) }));
    expect(['IPM_ACTION', 'INTERVENTION_CONSIDERATION']).toContain(d.status);
    expect(d.missingInformation.some((m) => m.includes('Weather intelligence unavailable'))).toBe(true);
  });
});

describe('scenario 15: stale weather', () => {
  it('stale data → freshness warning reason', () => {
    const intel = intelFixture({
      dataFreshness: { provider: 'open-meteo', fetchedAt: new Date(Date.now() - 3 * 3600_000).toISOString(), ageMinutes: 180, stale: true, cacheHit: true },
    });
    const d = runProtectionDecision(input({ intelligence: intel }));
    expect(d.reasons.some((r) => r.code === 'WEATHER_STALE')).toBe(true);
    expect(d.missingInformation.some((m) => m.includes('stale'))).toBe(true);
  });
});

describe('MoA compliance integration (scenario 10/11 support)', () => {
  it('BLOCK verdict → blocker reason, chemical action suppressed', () => {
    const d = runProtectionDecision(
      input({
        scouting: scoutingFixture({ confirmedDiagnosis: true }),
        eligibility: [{ product: { id: 'p1', tradeName: 'X' }, eligible: true } as never],
        compliance: {
          verdict: 'BLOCK',
          findings: [{ severity: 'BLOCK', code: 'WINDOW_ROTATION', messageEn: 'same group in window', messageBn: '' }],
        } as never,
      }),
    );
    expect(d.reasons.some((r) => r.code === 'MOA_BLOCKED' && r.kind === 'blocker')).toBe(true);
    expect(d.actions.some((a) => a.chemical)).toBe(false);
  });
});

describe('explainability', () => {
  it('every decision carries evidence, reassessment and follow-up', () => {
    const d = runProtectionDecision(input({ scouting: scoutingFixture() }));
    expect(d.evidence.length).toBeGreaterThan(0);
    expect(d.reassessAfter).toBeTruthy();
    expect(d.followUp.length).toBeGreaterThan(0);
    expect(d.engineVersion).toBe('protection-decision-1');
  });
});
