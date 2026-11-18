/**
 * useFieldRecords — field context + protection ledger (Task 7).
 *
 * One localStorage-backed store following the useSprayHistory pattern
 * (same pesticidenext_ namespace, quota-safe, capped). It links:
 *   Field → Crop/Season → Scouting → Decision → Application → Outcome
 *
 * Design points from the directive:
 *   - A field profile is OPTIONAL — basic Protection works crop-only.
 *   - Protection decisions are saved SEPARATELY from actual applications.
 *   - Timestamps + provenance are kept on every record.
 *   - No duplication of the existing spray history: applications recorded
 *     here are protection-ledger entries; the legacy
 *     pesticidenext_spray_history (SprayLogView) remains untouched and
 *     remains the source for MoA rotation compliance.
 */

import { useState, useEffect, useCallback } from 'react';

// ─── Types ──────────────────────────────────────────────────

export interface FieldProfile {
  id: string;
  /** Optional display name ("উত্তর জমি") */
  name: string;
  /** Farm/block label if any */
  farmBlock?: string;
  crop: string;
  variety?: string;
  season?: string;
  /** District or area name */
  location?: string;
  lat?: number;
  lon?: number;
  /** ISO date */
  plantingDate?: string;
  createdAt: string;
  updatedAt: string;
}

export interface ScoutingRecord {
  id: string;
  fieldId: string | null;
  crop: string;
  /** Target pest/disease being scouted (English name) */
  target: string;
  /** ISO date of observation */
  date: string;
  /** % of plants showing symptoms (null = not counted) */
  incidencePct: number | null;
  /** 0-100 severity (null = not scored) */
  severityPct: number | null;
  symptoms: string;
  notes?: string;
  /** Photo evidence — data URL kept ONLY with consent, size-capped */
  photoDataUrl?: string;
  /** Diagnosis confirmed by officer/expert? */
  confirmedDiagnosis: boolean;
  createdAt: string;
}

export interface SavedDecision {
  id: string;
  fieldId: string | null;
  crop: string;
  target?: string;
  /** Status from protectionDecision.ts */
  status: string;
  explanation: string;
  explanationBn: string;
  reasons: Array<{ code: string; kind: string; text: string; textBn: string }>;
  evidence: string[];
  missingInformation: string[];
  actions: Array<{ ipmTier: number; action: string; actionBn: string; chemical: boolean }>;
  reassessAfter: string | null;
  engineVersion: string;
  /** Intelligence snapshot provenance */
  weatherProvider?: string;
  weatherFetchedAt?: string;
  decidedAt: string;
}

export interface ApplicationRecord {
  id: string;
  fieldId: string | null;
  crop: string;
  target: string;
  /** Product identity from the registry */
  productName: string;
  commonName: string;
  registrationNo: string | null;
  moaCode: string | null;
  /** Actual dosage applied (user-entered, from the label) */
  actualDosage: string;
  treatedAreaValue: number | null;
  treatedAreaUnit: string | null;
  /** ISO date of application */
  date: string;
  /** Weather conditions at application (from KWI when available) */
  weatherConditions?: string;
  operator?: string;
  followUpDate?: string;
  /** Link to the decision that led to this application */
  decisionId?: string;
  notes?: string;
  createdAt: string;
}

export interface OutcomeRecord {
  id: string;
  applicationId: string;
  /** ISO date of the follow-up observation */
  date: string;
  /** Post-treatment incidence (null = not counted) */
  incidencePct: number | null;
  /** Post-treatment severity (null = not scored) */
  severityPct: number | null;
  /** Farmer's assessment of effectiveness */
  effectiveness: 'effective' | 'partial' | 'ineffective' | 'unclear';
  /** Crop response / phytotoxicity notes */
  cropResponse?: string;
  /** Did the pest/disease come back? */
  recurrence: boolean | null;
  /** Suspected resistance? (investigation trigger, NOT a diagnosis) */
  suspectedResistance: boolean;
  nextAction?: string;
  notes?: string;
  createdAt: string;
}

export interface FieldLedgerData {
  fields: FieldProfile[];
  scouting: ScoutingRecord[];
  decisions: SavedDecision[];
  applications: ApplicationRecord[];
  outcomes: OutcomeRecord[];
}

// ─── Storage ────────────────────────────────────────────────

const STORAGE_KEY = 'pesticidenext_field_ledger';
const MAX_RECORDS = 500;

function load(): FieldLedgerData {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return emptyData();
    const parsed = JSON.parse(raw) as Partial<FieldLedgerData>;
    return {
      fields: Array.isArray(parsed.fields) ? parsed.fields : [],
      scouting: Array.isArray(parsed.scouting) ? parsed.scouting : [],
      decisions: Array.isArray(parsed.decisions) ? parsed.decisions : [],
      applications: Array.isArray(parsed.applications) ? parsed.applications : [],
      outcomes: Array.isArray(parsed.outcomes) ? parsed.outcomes : [],
    };
  } catch {
    return emptyData();
  }
}

function emptyData(): FieldLedgerData {
  return { fields: [], scouting: [], decisions: [], applications: [], outcomes: [] };
}

function persist(data: FieldLedgerData): boolean {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    return true;
  } catch {
    // Quota exceeded — photos are the usual culprit. Drop photos from
    // scouting records older than 7 days and retry once.
    try {
      const cutoff = Date.now() - 7 * 86400000;
      const trimmed: FieldLedgerData = {
        ...data,
        scouting: data.scouting.map((s) =>
          s.photoDataUrl && new Date(s.createdAt).getTime() < cutoff
            ? { ...s, photoDataUrl: undefined }
            : s,
        ),
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(trimmed));
      return true;
    } catch {
      return false;
    }
  }
}

function cap<T>(arr: T[]): T[] {
  return arr.length > MAX_RECORDS ? arr.slice(arr.length - MAX_RECORDS) : arr;
}

function rid(prefix: string): string {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

// ─── Hook ───────────────────────────────────────────────────

export function useFieldRecords() {
  const [data, setData] = useState<FieldLedgerData>(() => load());

  useEffect(() => {
    const onStorage = (e: StorageEvent) => {
      if (e.key === STORAGE_KEY) setData(load());
    };
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, []);

  const mutate = useCallback((fn: (d: FieldLedgerData) => FieldLedgerData): boolean => {
    let ok = false;
    setData((prev) => {
      const next = fn(prev);
      ok = persist(next);
      return next;
    });
    return ok;
  }, []);

  // ── Fields ──────────────────────────────────────────────
  const addField = useCallback(
    (f: Omit<FieldProfile, 'id' | 'createdAt' | 'updatedAt'>): FieldProfile | null => {
      const now = new Date().toISOString();
      const field: FieldProfile = { ...f, id: rid('field'), createdAt: now, updatedAt: now };
      return mutate((d) => ({ ...d, fields: cap([...d.fields, field]) })) ? field : null;
    },
    [mutate],
  );

  const updateField = useCallback(
    (id: string, patch: Partial<FieldProfile>): boolean => {
      return mutate((d) => ({
        ...d,
        fields: d.fields.map((f) =>
          f.id === id ? { ...f, ...patch, updatedAt: new Date().toISOString() } : f,
        ),
      }));
    },
    [mutate],
  );

  const removeField = useCallback(
    (id: string): boolean => {
      return mutate((d) => ({ ...d, fields: d.fields.filter((f) => f.id !== id) }));
    },
    [mutate],
  );

  // ── Scouting ────────────────────────────────────────────
  const addScouting = useCallback(
    (s: Omit<ScoutingRecord, 'id' | 'createdAt'>): ScoutingRecord | null => {
      const rec: ScoutingRecord = { ...s, id: rid('scout'), createdAt: new Date().toISOString() };
      return mutate((d) => ({ ...d, scouting: cap([...d.scouting, rec]) })) ? rec : null;
    },
    [mutate],
  );

  // ── Decisions (saved separately from applications) ──────
  const addDecision = useCallback(
    (dec: Omit<SavedDecision, 'id' | 'decidedAt'>): SavedDecision | null => {
      const rec: SavedDecision = { ...dec, id: rid('dec'), decidedAt: new Date().toISOString() };
      return mutate((d) => ({ ...d, decisions: cap([...d.decisions, rec]) })) ? rec : null;
    },
    [mutate],
  );

  // ── Applications ────────────────────────────────────────
  const addApplication = useCallback(
    (a: Omit<ApplicationRecord, 'id' | 'createdAt'>): ApplicationRecord | null => {
      const rec: ApplicationRecord = { ...a, id: rid('app'), createdAt: new Date().toISOString() };
      return mutate((d) => ({ ...d, applications: cap([...d.applications, rec]) })) ? rec : null;
    },
    [mutate],
  );

  // ── Outcomes ────────────────────────────────────────────
  const addOutcome = useCallback(
    (o: Omit<OutcomeRecord, 'id' | 'createdAt'>): OutcomeRecord | null => {
      const rec: OutcomeRecord = { ...o, id: rid('out'), createdAt: new Date().toISOString() };
      return mutate((d) => ({ ...d, outcomes: cap([...d.outcomes, rec]) })) ? rec : null;
    },
    [mutate],
  );

  // ── Query helpers ───────────────────────────────────────
  const latestScoutingFor = useCallback(
    (crop: string, target?: string): ScoutingRecord | null => {
      const candidates = data.scouting
        .filter((s) => s.crop === crop && (!target || s.target === target))
        .sort((a, b) => (a.date < b.date ? 1 : -1));
      return candidates[0] ?? null;
    },
    [data.scouting],
  );

  const applicationsFor = useCallback(
    (crop: string, target?: string): ApplicationRecord[] => {
      return data.applications
        .filter((a) => a.crop === crop && (!target || a.target === target))
        .sort((a, b) => (a.date < b.date ? 1 : -1));
    },
    [data.applications],
  );

  const outcomeFor = useCallback(
    (applicationId: string): OutcomeRecord | null => {
      return data.outcomes.find((o) => o.applicationId === applicationId) ?? null;
    },
    [data.outcomes],
  );

  const applicationsMissingOutcome = useCallback(
    (): Array<{ application: ApplicationRecord; daysSince: number }> => {
      const now = Date.now();
      return data.applications
        .filter((a) => !data.outcomes.some((o) => o.applicationId === a.id))
        .map((a) => ({
          application: a,
          daysSince: Math.floor((now - new Date(a.date).getTime()) / 86400000),
        }))
        .filter((x) => x.daysSince >= 2)
        .sort((a, b) => b.daysSince - a.daysSince);
    },
    [data.applications, data.outcomes],
  );

  return {
    data,
    addField,
    updateField,
    removeField,
    addScouting,
    addDecision,
    addApplication,
    addOutcome,
    latestScoutingFor,
    applicationsFor,
    outcomeFor,
    applicationsMissingOutcome,
  };
}

/** Non-hook helper for tests / server use. */
export function readFieldLedger(): FieldLedgerData {
  if (typeof localStorage === 'undefined') return emptyData();
  return load();
}
