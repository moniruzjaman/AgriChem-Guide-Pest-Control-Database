import { useState, useEffect, useCallback } from 'react';

/**
 * useSprayHistory — persistent, localStorage-backed spray log.
 *
 * Lets a farmer record what they sprayed (product, MoA code, crop, area,
 * date) so the Home dialog's "change the group" advice has a concrete
 * target: the log surfaces the most recent MoA code used for each crop so
 * the next spray can avoid repeating it (which is what breeds resistance).
 *
 * Storage key: pesticidenext_spray_history (array of SprayEntry).
 */

export interface SprayEntry {
  id: string;
  ts: number;              // epoch ms when logged
  date: string;            // ISO date the spray was applied (YYYY-MM-DD)
  productName: string;
  commonName: string;
  moaCode: string;
  moaGroup: string;
  type: string;            // Insecticide / Fungicide / ...
  crop: string;
  areaValue: number;
  areaUnit: string;        // bigha / acre / hectare
  fieldLabel?: string;     // optional "my field" name
  notes?: string;
}

const STORAGE_KEY = 'pesticidenext_spray_history';
const MAX_ENTRIES = 500;

function loadEntries(): SprayEntry[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter((e): e is SprayEntry =>
      e && typeof e.id === 'string' && typeof e.ts === 'number'
    );
  } catch {
    return [];
  }
}

function saveEntries(entries: SprayEntry[]): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(entries.slice(-MAX_ENTRIES)));
  } catch {
    /* quota exceeded — silently drop, the app still works in-memory */
  }
}

export function useSprayHistory() {
  const [entries, setEntries] = useState<SprayEntry[]>([]);

  useEffect(() => {
    setEntries(loadEntries());
  }, []);

  const addEntry = useCallback((entry: Omit<SprayEntry, 'id' | 'ts'>) => {
    const full: SprayEntry = {
      ...entry,
      id: `spray-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      ts: Date.now(),
    };
    setEntries((prev) => {
      const next = [...prev, full].slice(-MAX_ENTRIES);
      saveEntries(next);
      return next;
    });
    return full;
  }, []);

  const removeEntry = useCallback((id: string) => {
    setEntries((prev) => {
      const next = prev.filter((e) => e.id !== id);
      saveEntries(next);
      return next;
    });
  }, []);

  const clearAll = useCallback(() => {
    setEntries([]);
    saveEntries([]);
  }, []);

  return { entries, addEntry, removeEntry, clearAll };
}

/**
 * Returns the most recent MoA code sprayed for a given crop, so the rotation
 * planner can warn "you just sprayed 3A on rice — pick a different group".
 */
export function lastMoaForCrop(entries: SprayEntry[], crop: string): SprayEntry | null {
  const sorted = [...entries].sort((a, b) => b.ts - a.ts);
  return sorted.find((e) => e.crop.toLowerCase() === crop.toLowerCase()) || null;
}

/**
 * Groups entries by crop and returns the last-sprayed MoA per crop.
 */
export function lastMoaByCrop(entries: SprayEntry[]): Record<string, SprayEntry> {
  const map: Record<string, SprayEntry> = {};
  for (const e of [...entries].sort((a, b) => a.ts - b.ts)) {
    map[e.crop.toLowerCase()] = e;
  }
  return map;
}
