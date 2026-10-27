/**
 * useWeatherIntelligence — React hook for the built-in KWI weather engine.
 *
 * Fetches weather + agricultural indices + spray windows + disease forecast
 * from the KWI engine (embedded at src/lib/kwi/). The hook manages loading
 * state, error handling, GPS auto-location, and automatic refresh.
 *
 * Usage:
 *   const { weather, sprayWindows, disease, loading, error, refresh } = useWeatherIntelligence();
 *
 * The hook auto-fetches on mount if `autoFetch` is true (default).
 */

import { useState, useEffect, useCallback, useRef } from 'react';
import { runPesticideIntelligence, type PesticideIntelligenceResult } from '../intelligence/pesticideIntelligence';
import type { ChemicalProduct } from '../types';
import { useSprayHistory, lastMoaForCrop } from './useSprayHistory';

export interface WeatherIntelligenceState {
  result: PesticideIntelligenceResult | null;
  loading: boolean;
  error: string | null;
  /** GPS coordinates actually used (may differ from defaults if GPS auto-located) */
  latitude: number;
  longitude: number;
  /** Whether the last fetch was served from cache */
  cacheHit: boolean;
}

export interface UseWeatherIntelligenceOptions {
  /** Default latitude (default: Dhaka 23.8103) */
  defaultLatitude?: number;
  /** Default longitude (default: Dhaka 90.4125) */
  defaultLongitude?: number;
  /** Auto-fetch on mount (default: true) */
  autoFetch?: boolean;
  /** Auto-refresh interval in seconds (0 = disabled, default: 300 = 5 min) */
  refreshInterval?: number;
  /** Crop name for context (default: 'Rice') */
  crop?: string;
  /** Products to rank (required for pesticide candidate ranking) */
  products?: ChemicalProduct[];
}

export function useWeatherIntelligence(
  options: UseWeatherIntelligenceOptions = {},
): WeatherIntelligenceState & {
  refresh: () => Promise<void>;
  setLocation: (lat: number, lng: number) => void;
} {
  const {
    defaultLatitude = 23.8103,
    defaultLongitude = 90.4125,
    autoFetch = true,
    refreshInterval = 300,
    crop = 'Rice',
    products = [],
  } = options;

  const [state, setState] = useState<WeatherIntelligenceState>({
    result: null,
    loading: false,
    error: null,
    latitude: defaultLatitude,
    longitude: defaultLongitude,
    cacheHit: false,
  });

  const { entries: sprayHistory } = useSprayHistory();
  const abortRef = useRef<AbortController | null>(null);

  const fetch = useCallback(async () => {
    // Cancel any in-flight request
    abortRef.current?.abort();
    const controller = new AbortController();
    abortRef.current = controller;

    setState(prev => ({ ...prev, loading: true, error: null }));

    try {
      const lastMoa = lastMoaForCrop(sprayHistory, crop)?.moaCode;
      const result = await runPesticideIntelligence({
        location: {
          latitude: state.latitude,
          longitude: state.longitude,
          name: 'field',
          country: 'Bangladesh',
        },
        products,
        crop,
        lastMoa,
      });

      if (!controller.signal.aborted) {
        setState(prev => ({
          ...prev,
          result,
          loading: false,
          cacheHit: result.cacheHit,
        }));
      }
    } catch (err) {
      if (!controller.signal.aborted) {
        setState(prev => ({
          ...prev,
          loading: false,
          error: err instanceof Error ? err.message : String(err),
        }));
      }
    }
  }, [state.latitude, state.longitude, crop, products, sprayHistory]);

  const setLocation = useCallback((lat: number, lng: number) => {
    setState(prev => ({ ...prev, latitude: lat, longitude: lng }));
  }, []);

  const refresh = useCallback(async () => {
    await fetch();
  }, [fetch]);

  // Auto-fetch on mount
  useEffect(() => {
    if (autoFetch && products.length > 0) {
      fetch();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [autoFetch]);

  // Auto-refresh
  useEffect(() => {
    if (refreshInterval > 0 && products.length > 0) {
      const id = setInterval(() => {
        if (!state.loading) fetch();
      }, refreshInterval * 1000);
      return () => clearInterval(id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refreshInterval, state.loading]);

  return {
    ...state,
    refresh,
    setLocation,
  };
}
