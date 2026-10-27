/**
 * MyFieldView — the "My Field" tab with built-in weather intelligence.
 *
 * Shows:
 *  - Current weather + all agricultural indices (ET₀, GDD, VPD, heat/cold
 *    stress, leaf wetness, soil moisture deficit, solar radiation)
 *  - 48-hour spray window scoring (crop-aware)
 *  - Disease pressure + disease forecast (rice_blast, BLB, etc.)
 *  - Pesticide candidate ranking (MoA rotation + weather fit)
 *  - Spray log + compliance check (from existing SprayLogView)
 *
 * The intelligence is fetched from the embedded KWI engine via the
 * useWeatherIntelligence hook. GPS auto-locates on first tap.
 */

import React, { useState, Suspense, lazy } from 'react';
import {
  Gauge, Droplets, Wind, CloudRain, ShieldAlert, Sun, Thermometer,
  Activity, Sprout, RefreshCw, LocateFixed, AlertTriangle, CheckCircle2,
  Clock, TrendingUp, Beaker, RotateCw, BrainCircuit, Zap, Leaf,
} from 'lucide-react';
import type { ChemicalProduct, AppTab } from '../types';
import { useLanguage } from '../context/LanguageContext';
import { useWeatherIntelligence } from '../hooks/useWeatherIntelligence';
import { useSprayHistory, lastMoaForCrop } from '../hooks/useSprayHistory';
import './MyFieldView.css';

// Lazy-load the spray log view (heavy: has label scanner + MoA compliance)
const SprayLogView = lazy(() =>
  import('./SprayLogView').then(m => ({ default: m.SprayLogView }))
);

// ────────────────────────────────────────────────────────────
// Helper: format number with locale
// ────────────────────────────────────────────────────────────
function fmt(n: number | undefined | null, digits = 1): string {
  if (n == null || Number.isNaN(n)) return '—';
  return n.toFixed(digits);
}

// ────────────────────────────────────────────────────────────
// Helper: risk level → color
// ────────────────────────────────────────────────────────────
function riskColor(score: number): string {
  if (score >= 75) return '#dc2626'; // red
  if (score >= 50) return '#f59e0b'; // amber
  if (score >= 25) return '#eab308'; // yellow
  return '#16a34a'; // green
}

// ────────────────────────────────────────────────────────────
// Helper: disease pressure → label
// ────────────────────────────────────────────────────────────
function pressureLabel(score: number, bn: boolean): { label: string; color: string } {
  if (score >= 65) return { label: bn ? 'উচ্চ' : 'High', color: '#dc2626' };
  if (score >= 35) return { label: bn ? 'মাঝারি' : 'Moderate', color: '#f59e0b' };
  return { label: bn ? 'কম' : 'Low', color: '#16a34a' };
}

// ────────────────────────────────────────────────────────────
// Main component
// ────────────────────────────────────────────────────────────

export const MyFieldView: React.FC<{
  products: ChemicalProduct[];
  onNavigateTab: (tab: AppTab) => void;
}> = ({ products, onNavigateTab }) => {
  const { language } = useLanguage();
  const bn = language === 'bn';
  const { entries: sprayHistory } = useSprayHistory();
  const [crop, setCrop] = useState('Rice');
  const [showSprayLog, setShowSprayLog] = useState(false);

  const {
    result,
    loading,
    error,
    latitude,
    longitude,
    refresh,
    setLocation,
  } = useWeatherIntelligence({
    products,
    crop,
    autoFetch: products.length > 0,
    refreshInterval: 300,
  });

  // GPS auto-locate
  const locate = () => {
    navigator.geolocation?.getCurrentPosition(
      (pos) => {
        setLocation(
          Number(pos.coords.latitude.toFixed(4)),
          Number(pos.coords.longitude.toFixed(4)),
        );
        refresh();
      },
      () => {
        // Silent fail — keep defaults
      },
    );
  };

  // Available crops from the product database
  const availableCrops = React.useMemo(
    () => Array.from(new Set(products.flatMap(p => p.crops))).filter(Boolean).sort().slice(0, 80),
    [products],
  );

  const lastLogged = lastMoaForCrop(sprayHistory, crop);

  // ── Loading state ──
  if (loading && !result) {
    return (
      <div className="myfield-view">
        <div className="myfield-loading">
          <RefreshCw className="w-8 h-8 animate-spin text-emerald-600" />
          <p>{bn ? 'আবহাওয়া বুদ্ধিমত্তা লোড হচ্ছে…' : 'Loading weather intelligence…'}</p>
        </div>
      </div>
    );
  }

  // ── Error state ──
  if (error && !result) {
    return (
      <div className="myfield-view">
        <div className="myfield-error">
          <AlertTriangle className="w-8 h-8 text-rose-500" />
          <p className="font-bold">{bn ? 'আবহাওয়া ডেটা লোড করতে সমস্যা' : 'Failed to load weather data'}</p>
          <p className="text-sm text-slate-500">{error}</p>
          <button onClick={refresh} className="mt-3 px-4 py-2 rounded-xl bg-emerald-700 text-white font-bold text-sm">
            {bn ? 'আবার চেষ্টা করুন' : 'Try again'}
          </button>
        </div>
      </div>
    );
  }

  // ── Main render ──
  const w = result?.weather;
  const dp = result ? pressureLabel(result.diseasePressure, bn) : null;

  return (
    <div className="myfield-view">
      {/* ── Header ── */}
      <section className="myfield-header">
        <div className="myfield-header-content">
          <div className="myfield-header-badge">
            <BrainCircuit className="w-4 h-4" />
            <span>{bn ? 'আমার জমি' : 'My Field'}</span>
          </div>
          <h1>{bn ? 'মাঠের আবহাওয়া বুদ্ধিমত্তা' : 'Field Weather Intelligence'}</h1>
          <p>
            {bn
              ? 'KWI ইঞ্জিন দ্বারা চালিত — স্প্রে উইন্ডো, রোগ পূর্বাভাস, এবং কৃষি সূচক'
              : 'Powered by KWI engine — spray windows, disease forecast, and agri indices'}
          </p>
        </div>
        <div className="myfield-header-actions">
          <button onClick={locate} className="myfield-btn-locate" title={bn ? 'আমার অবস্থান' : 'My location'}>
            <LocateFixed className="w-4 h-4" />
          </button>
          <button onClick={refresh} disabled={loading} className="myfield-btn-refresh" title={bn ? 'রিফ্রেশ' : 'Refresh'}>
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          </button>
        </div>
      </section>

      {/* ── Crop selector + location ── */}
      <section className="myfield-controls">
        <label className="myfield-control">
          <span className="myfield-control-label">{bn ? 'ফসল' : 'Crop'}</span>
          <select value={crop} onChange={e => setCrop(e.target.value)} className="myfield-select">
            {availableCrops.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </label>
        <div className="myfield-coords">
          <span className="myfield-coord">{fmt(latitude, 4)}°, {fmt(longitude, 4)}°</span>
          {result?.cacheHit && (
            <span className="myfield-cache-badge">{bn ? 'ক্যাশ থেকে' : 'cached'}</span>
          )}
        </div>
      </section>

      {result && w && (
        <>
          {/* ── Weather snapshot (5 cards) ── */}
          <section className="myfield-weather-grid">
            {[
              { icon: <Thermometer />, label: bn ? 'তাপমাত্রা' : 'Temperature', value: `${fmt(w.temperature)}°C`, color: '#f97316' },
              { icon: <Droplets />, label: bn ? 'আর্দ্রতা' : 'Humidity', value: `${fmt(w.humidity, 0)}%`, color: '#3b82f6' },
              { icon: <Wind />, label: bn ? 'বাতাস' : 'Wind', value: `${fmt(w.windSpeed)} km/h`, color: '#06b6d4' },
              { icon: <CloudRain />, label: bn ? 'বৃষ্টি সম্ভাবনা' : 'Rain chance', value: `${fmt(w.rainProbability, 0)}%`, color: '#8b5cf6' },
              { icon: <ShieldAlert />, label: bn ? 'রোগ চাপ' : 'Disease pressure', value: `${fmt(result.diseasePressure, 0)}/100`, color: dp?.color || '#6b7280' },
            ].map((card, i) => (
              <div key={i} className="myfield-weather-card" style={{ borderTopColor: card.color }}>
                <div className="myfield-weather-icon" style={{ color: card.color }}>
                  {React.cloneElement(card.icon as React.ReactElement, { className: 'w-5 h-5' })}
                </div>
                <div className="myfield-weather-label">{card.label}</div>
                <div className="myfield-weather-value">{card.value}</div>
              </div>
            ))}
          </section>

          {/* ── Agricultural indices (7 cards) ── */}
          <section className="myfield-section">
            <h2 className="myfield-section-title">
              <Activity className="w-4 h-4" />
              {bn ? 'কৃষি সূচক' : 'Agricultural Indices'}
            </h2>
            <div className="myfield-indices-grid">
              {[
                { icon: <Zap />, label: 'ET₀', value: `${fmt(w.et0)} mm/day`, desc: bn ? 'রেফারেন্স ইভাপোট্রান্সপিরেশন' : 'Reference evapotranspiration' },
                { icon: <Sun />, label: 'VPD', value: `${fmt(w.vpd)} kPa`, desc: bn ? 'বাষ্প চাপ ঘাটতি' : 'Vapor pressure deficit' },
                { icon: <Droplets />, label: bn ? 'পাতা ভেজা' : 'Leaf wetness', value: `${fmt(w.leafWetnessHours, 0)} hrs`, desc: bn ? 'রোগের অনুকূলতার জন্য' : 'Hours of foliage moisture' },
                { icon: <Gauge />, label: 'GDD', value: fmt(w.et0 > 0 ? (w.temperature - 10) : 0, 1), desc: bn ? 'বৃদ্ধি ডিগ্রি দিন' : 'Growing degree days' },
                { icon: <Thermometer />, label: bn ? 'তাপ চাপ' : 'Heat stress', value: w.temperature > 35 ? `${bn ? 'উচ্চ' : 'High'}` : w.temperature > 30 ? `${bn ? 'মাঝারি' : 'Moderate'}` : `${bn ? 'কম' : 'Low'}`, desc: bn ? `তাপমাত্রা ${fmt(w.temperature)}°C` : `Temp ${fmt(w.temperature)}°C` },
                { icon: <Wind />, label: 'VPD status', value: w.vpd > 1.5 ? `${bn ? 'উচ্চ' : 'High'}` : w.vpd > 0.8 ? `${bn ? 'মাঝারি' : 'Moderate'}` : `${bn ? 'কম' : 'Low'}`, desc: bn ? 'বাষ্পীয় চাপ ঘাটতি' : 'Vapor pressure status' },
                { icon: <Sun />, label: bn ? 'সৌর বিকিরণ' : 'Solar radiation', value: `${fmt(w.uvIndex * 25, 0)} W/m²`, desc: bn ? 'UV থেকে অনুমান' : 'Estimated from UV' },
                { icon: <Leaf />, label: bn ? 'শিশিরাঙ্ক' : 'Dew point', value: `${fmt(w.dewPoint)}°C`, desc: bn ? 'ঘনীভবন বিন্দু' : 'Condensation point' },
              ].map((card, i) => (
                <div key={i} className="myfield-index-card">
                  <div className="myfield-index-header">
                    {React.cloneElement(card.icon as React.ReactElement, { className: 'w-4 h-4 text-slate-400' })}
                    <span className="myfield-index-label">{card.label}</span>
                  </div>
                  <div className="myfield-index-value">{card.value}</div>
                  <div className="myfield-index-desc">{card.desc}</div>
                </div>
              ))}
            </div>
          </section>

          {/* ── Spray windows (48-hour forecast) ── */}
          <section className="myfield-section">
            <h2 className="myfield-section-title">
              <Clock className="w-4 h-4" />
              {bn ? 'স্প্রে উইন্ডো (৪৮ ঘণ্টা)' : 'Spray Windows (48h)'}
            </h2>
            {result.sprayWindows.length === 0 ? (
              <div className="myfield-empty">
                <AlertTriangle className="w-5 h-5 text-amber-500" />
                <span>{bn ? 'পরবর্তী ৪৮ ঘণ্টায় কোনো উপযুক্ত স্প্রে উইন্ডো নেই।' : 'No suitable spray window in the next 48 hours.'}</span>
              </div>
            ) : (
              <div className="myfield-spray-list">
                {result.sprayWindows.map((win, i) => (
                  <div key={i} className={`myfield-spray-item ${win.suitable ? 'suitable' : 'unsuitable'}`}>
                    <div className="myfield-spray-header">
                      <span className="myfield-spray-time">
                        {new Date(win.start).toLocaleString(bn ? 'bn-BD' : 'en-US', {
                          weekday: 'short', hour: '2-digit', minute: '2-digit',
                        })}
                      </span>
                      <span className="myfield-spray-score" style={{ color: riskColor(win.score) }}>
                        {win.score}/100
                      </span>
                    </div>
                    {win.suitable ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 inline-block mr-1" />
                    ) : (
                      <AlertTriangle className="w-4 h-4 text-amber-500 inline-block mr-1" />
                    )}
                    <span className="myfield-spray-reason">
                      {(bn ? win.reasonsBn : win.reasons)[0] || ''}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </section>

          {/* ── Disease forecast ── */}
          {result.diseaseForecast && result.diseaseForecast.diseases.length > 0 && (
            <section className="myfield-section">
              <h2 className="myfield-section-title">
                <ShieldAlert className="w-4 h-4" />
                {bn ? 'রোগ পূর্বাভাস' : 'Disease Forecast'}
              </h2>
              <div className="myfield-disease-grid">
                {result.diseaseForecast.diseases.slice(0, 6).map((d, i) => (
                  <div key={i} className="myfield-disease-card" style={{ borderLeftColor: riskColor(d.risk) }}>
                    <div className="myfield-disease-header">
                      <span className="myfield-disease-name">{bn ? d.nameBn : d.name}</span>
                      <span className="myfield-disease-risk" style={{ color: riskColor(d.risk) }}>
                        {d.risk}/100
                      </span>
                    </div>
                    <div className="myfield-disease-level" style={{ color: riskColor(d.risk) }}>
                      {d.level}
                    </div>
                    {d.preventiveActions.length > 0 && (
                      <div className="myfield-disease-action">
                        <span className="myfield-disease-action-label">{bn ? 'প্রতিরোধ' : 'Preventive'}:</span>
                        <span>{(bn ? d.preventiveActions : d.preventiveActions)[0]}</span>
                      </div>
                    )}
                    {d.curativeActions.length > 0 && (
                      <div className="myfield-disease-action">
                        <span className="myfield-disease-action-label">{bn ? 'নিরাময়' : 'Curative'}:</span>
                        <span>{(bn ? d.curativeActions : d.curativeActions)[0]}</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* ── Pesticide candidates (top 6) ── */}
          <section className="myfield-section">
            <h2 className="myfield-section-title">
              <Beaker className="w-4 h-4" />
              {bn ? 'প্রস্তাবিত পণ্য' : 'Recommended Products'}
              {lastLogged?.moaCode && (
                <span className="myfield-last-moa">
                  {bn ? `শেষ MoA: ${lastLogged.moaCode}` : `Last MoA: ${lastLogged.moaCode}`}
                </span>
              )}
            </h2>
            <div className="myfield-candidates-grid">
              {result.candidates.slice(0, 6).map((c, i) => (
                <div key={i} className={`myfield-candidate ${c.status}`}>
                  <div className="myfield-candidate-header">
                    <span className="myfield-candidate-name">
                      {c.product.tradeName || c.product.commonName}
                    </span>
                    <span className="myfield-candidate-score">{c.score}</span>
                  </div>
                  <div className="myfield-candidate-meta">
                    {c.product.commonName} · {c.product.moaCode || 'MoA —'}
                  </div>
                  <div className="myfield-candidate-status">
                    {c.status === 'preferred' && <CheckCircle2 className="w-3 h-3 text-emerald-500" />}
                    {c.status === 'avoid' && <AlertTriangle className="w-3 h-3 text-rose-500" />}
                    {c.status === 'acceptable' && <RotateCw className="w-3 h-3 text-amber-500" />}
                    <span>{c.status}</span>
                  </div>
                  {(bn ? c.reasonsBn : c.reasons).slice(0, 2).map((r, j) => (
                    <div key={j} className="myfield-candidate-reason">• {r}</div>
                  ))}
                </div>
              ))}
            </div>
          </section>

          {/* ── Warnings ── */}
          {result.warnings.length > 0 && (
            <section className="myfield-warnings">
              <h2 className="myfield-section-title">
                <AlertTriangle className="w-4 h-4 text-amber-600" />
                {bn ? 'সতর্কতা' : 'Warnings'}
              </h2>
              {(bn ? result.warningsBn : result.warnings).map((w, i) => (
                <div key={i} className="myfield-warning-item">• {w}</div>
              ))}
            </section>
          )}

          {/* ── Crop calendar ── */}
          {result.cropCalendar && (
            <section className="myfield-section">
              <h2 className="myfield-section-title">
                <Sprout className="w-4 h-4" />
                {bn ? 'ফসল ক্যালেন্ডার' : 'Crop Calendar'}
              </h2>
              <div className="myfield-calendar">
                <div className="myfield-calendar-item">
                  <span className="myfield-calendar-label">{bn ? 'বর্তমান পর্যায়' : 'Current stage'}</span>
                  <span className="myfield-calendar-value">{result.cropCalendar.stage}</span>
                </div>
                <div className="myfield-calendar-item">
                  <span className="myfield-calendar-label">{bn ? 'মোট দিন' : 'Day in cycle'}</span>
                  <span className="myfield-calendar-value">{result.cropCalendar.dayOverall}</span>
                </div>
                {result.cropCalendar.isDelayed && (
                  <div className="myfield-calendar-delayed">
                    <AlertTriangle className="w-3 h-3" />
                    {bn ? 'বিলম্বিত কাজ' : 'Delayed tasks'}
                  </div>
                )}
              </div>
            </section>
          )}

          {/* ── Spray log toggle ── */}
          <section className="myfield-spray-log-toggle">
            <button
              onClick={() => setShowSprayLog(!showSprayLog)}
              className="myfield-btn-spray-log"
            >
              {showSprayLog
                ? (bn ? 'স্প্রে লগ লুকান' : 'Hide spray log')
                : (bn ? 'স্প্রে লগ দেখুন' : 'Show spray log')}
            </button>
          </section>

          {showSprayLog && (
            <Suspense fallback={<div className="myfield-loading"><RefreshCw className="w-6 h-6 animate-spin" /></div>}>
              <SprayLogView products={products} onNavigateTab={onNavigateTab} />
            </Suspense>
          )}

          {/* ── Disclaimer ── */}
          <p className="myfield-disclaimer">
            {bn
              ? 'এই তথ্য KWI ইঞ্জিন দ্বারা উৎপন্ন। লেবেল, নিবন্ধন, এবং মাঠ পর্যবেক্ষণের বিকল্প নয়।'
              : 'Generated by the KWI engine. Does not replace the product label, registration, or field scouting.'}
          </p>
        </>
      )}
    </div>
  );
};
