import React, { useState, useMemo } from 'react';
import {
  NotebookPen,
  Plus,
  Trash2,
  Sprout,
  Calendar,
  Beaker,
  RotateCw,
  AlertTriangle,
  CheckCircle2,
  Info,
  TrendingUp,
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useSprayHistory, lastMoaByCrop, type SprayEntry } from '../hooks/useSprayHistory';
import { ChemicalProduct, AppTab } from '../types';
import './SprayLogView.css';

interface SprayLogViewProps {
  products: ChemicalProduct[] | null;
  onNavigateTab: (tab: AppTab) => void;
}

export const SprayLogView: React.FC<SprayLogViewProps> = ({ products, onNavigateTab }) => {
  const { language } = useLanguage();
  const bn = language === 'bn';
  const { entries, addEntry, removeEntry, clearAll } = useSprayHistory();
  const [showForm, setShowForm] = useState(false);

  // Form state
  const [fProduct, setFProduct] = useState('');
  const [fCrop, setFCrop] = useState('');
  const [fArea, setFArea] = useState('1');
  const [fUnit, setFUnit] = useState('bigha');
  const [fDate, setFDate] = useState(new Date().toISOString().slice(0, 10));
  const [fField, setFField] = useState('');
  const [fNotes, setFNotes] = useState('');

  const lastByCrop = useMemo(() => lastMoaByCrop(entries), [entries]);

  // Quick product search for the form
  const productMatches = useMemo(() => {
    if (!fProduct.trim() || !products) return [];
    const q = fProduct.toLowerCase();
    return products
      .filter((p) =>
        p.tradeName.toLowerCase().includes(q) ||
        p.commonName.toLowerCase().includes(q)
      )
      .slice(0, 6);
  }, [fProduct, products]);

  const handleSelectProduct = (p: ChemicalProduct) => {
    setFProduct(p.tradeName);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Find the matching product to pull MoA info
    const matched = products?.find(
      (p) => p.tradeName.toLowerCase() === fProduct.toLowerCase()
    );
    addEntry({
      date: fDate,
      productName: fProduct,
      commonName: matched?.commonName || fProduct,
      moaCode: matched?.moaCode || '—',
      moaGroup: matched?.moaGroup || '—',
      type: matched?.type || '—',
      crop: fCrop || '—',
      areaValue: parseFloat(fArea) || 0,
      areaUnit: fUnit,
      fieldLabel: fField || undefined,
      notes: fNotes || undefined,
    });
    // Reset form
    setFProduct(''); setFCrop(''); setFArea('1'); setFField(''); setFNotes('');
    setShowForm(false);
  };

  // ---- copy ----
  const copy = {
    eyebrow: bn ? 'আমার জমি ও স্প্রে ইতিহাস' : 'MY FIELD & SPRAY HISTORY',
    h1: bn ? 'পরের স্প্রে কী হবে — জমি বলে দেবে।' : 'The next spray is decided by what the field remembers.',
    lede: bn
      ? 'প্রতিটি স্প্রে লগ করুন। অ্যাপ মনে রাখবে কোন গ্রুপ ব্যবহার হয়েছে — যাতে একই MoA বারবার না হয় এবং পোকা প্রতিরোধী না হয়।'
      : 'Log every spray. The app remembers which group was used — so the same MoA is not repeated and pests cannot build resistance.',
    empty: bn
      ? 'এখনো কোনো স্প্রে লগ করা হয়নি। প্রথম এন্ট্রি যোগ করুন।'
      : 'No sprays logged yet. Add your first entry to start tracking rotation.',
    addBtn: bn ? 'নতুন স্প্রে লগ করুন' : 'Log a spray',
    formTitle: bn ? 'স্প্রে এন্ট্রি' : 'Spray entry',
    product: bn ? 'পণ্যের নাম' : 'Product name',
    crop: bn ? 'ফসল' : 'Crop',
    area: bn ? 'জমির পরিমাণ' : 'Field area',
    unit: bn ? 'একক' : 'Unit',
    date: bn ? 'তারিখ' : 'Date',
    fieldLabel: bn ? 'জমির নাম (ঐচ্ছিক)' : 'Field name (optional)',
    notes: bn ? 'নোট (ঐচ্ছিক)' : 'Notes (optional)',
    save: bn ? 'সংরক্ষণ' : 'Save',
    cancel: bn ? 'বাতিল' : 'Cancel',
    clearAll: bn ? 'সব মুছুন' : 'Clear all',
    recent: bn ? 'সাম্প্রতিক স্প্রে' : 'Recent sprays',
    noRepeat: bn ? 'এই গ্রুপটি এড়িয়ে চলুন' : 'Avoid this group next',
    history: bn ? 'ইতিহাস' : 'History',
    rotationTip: bn
      ? 'প্রতিটি ফসলের জন্য সর্বশেষ ব্যবহৃত MoA কোড নিচে দেখানো হলো। পরবর্তী স্প্রেতে ভিন্ন গ্রুপ বেছে নিন।'
      : 'The last MoA code used per crop is shown below. Pick a different group for the next spray.',
    goRotation: bn ? 'রোটেশন প্ল্যানার খুলুন' : 'Open rotation planner',
  };

  const units = ['bigha', 'acre', 'hectare', 'katha'];

  return (
    <div className="acg-mf pn-tokens" id="myfield-view">
      <section className="pn-shell acg-mf-head">
        <p className="pn-eyebrow"><span className="pn-dot" /> {copy.eyebrow}</p>
        <h1 className="pn-h1">{copy.h1}</h1>
        <p className="pn-lede">{copy.lede}</p>

        <div className="acg-mf-cta">
          <button type="button" className="pn-btn" onClick={() => setShowForm((v) => !v)}>
            <Plus size={16} /> {copy.addBtn}
          </button>
          <button type="button" className="pn-linkbtn" onClick={() => onNavigateTab('rotation')}>
            <RotateCw size={14} /> {copy.goRotation}
          </button>
        </div>
      </section>

      {/* Add form */}
      {showForm && (
        <form className="acg-mf-form pn-card" onSubmit={handleSubmit}>
          <h2 className="pn-h2"><NotebookPen size={18} /> {copy.formTitle}</h2>

          <label className="acg-mf-field">
            <span>{copy.product}</span>
            <input
              value={fProduct}
              onChange={(e) => setFProduct(e.target.value)}
              required
              placeholder={bn ? 'যেমন: Virtako' : 'e.g. Virtako'}
              list="mf-products"
            />
            {productMatches.length > 0 && (
              <div className="acg-mf-suggestions">
                {productMatches.map((p) => (
                  <button type="button" key={p.id} onClick={() => handleSelectProduct(p)}>
                    <strong>{p.tradeName}</strong>
                    <span>{p.commonName} · {p.moaCode || '—'}</span>
                  </button>
                ))}
              </div>
            )}
          </label>

          <div className="acg-mf-row2">
            <label className="acg-mf-field">
              <span>{copy.crop}</span>
              <input value={fCrop} onChange={(e) => setFCrop(e.target.value)} required
                placeholder={bn ? 'যেমন: ধান' : 'e.g. Rice'} />
            </label>
            <label className="acg-mf-field">
              <span>{copy.date}</span>
              <input type="date" value={fDate} onChange={(e) => setFDate(e.target.value)} required />
            </label>
          </div>

          <div className="acg-mf-row2">
            <label className="acg-mf-field">
              <span>{copy.area}</span>
              <input type="number" step="0.1" min="0" value={fArea}
                onChange={(e) => setFArea(e.target.value)} required />
            </label>
            <label className="acg-mf-field">
              <span>{copy.unit}</span>
              <select value={fUnit} onChange={(e) => setFUnit(e.target.value)}>
                {units.map((u) => <option key={u} value={u}>{u}</option>)}
              </select>
            </label>
          </div>

          <label className="acg-mf-field">
            <span>{copy.fieldLabel}</span>
            <input value={fField} onChange={(e) => setFField(e.target.value)}
              placeholder={bn ? 'যেমন: উত্তর পাড়ার জমি' : 'e.g. North plot'} />
          </label>

          <label className="acg-mf-field">
            <span>{copy.notes}</span>
            <textarea value={fNotes} onChange={(e) => setFNotes(e.target.value)} rows={2} />
          </label>

          <div className="acg-mf-form-actions">
            <button type="submit" className="pn-btn">{copy.save}</button>
            <button type="button" className="pn-btn pn-btn--outline" onClick={() => setShowForm(false)}>
              {copy.cancel}
            </button>
          </div>
        </form>
      )}

      {/* Rotation advisory — last MoA per crop */}
      {Object.keys(lastByCrop).length > 0 && (
        <section className="acg-mf-advisory">
          <h2 className="pn-h2"><TrendingUp size={18} /> {bn ? 'পরবর্তী স্প্রে নির্দেশিকা' : 'Next-spray advisory'}</h2>
          <p className="acg-mf-advisory-p">{copy.rotationTip}</p>
          <div className="acg-mf-cropgrid">
            {Object.entries(lastByCrop).map(([crop, entry]: [string, SprayEntry]) => (
              <div key={crop} className="acg-mf-cropcard">
                <div className="acg-mf-cropcard-head">
                  <Sprout size={16} />
                  <span>{entry.crop}</span>
                </div>
                <div className="acg-mf-cropcard-moa">
                  <span className="acg-mf-moa-code">{entry.moaCode}</span>
                  <span className="acg-mf-moa-group">{entry.moaGroup}</span>
                </div>
                <div className="acg-mf-cropcard-warn">
                  <AlertTriangle size={12} />
                  <span>{copy.noRepeat}</span>
                </div>
                <div className="acg-mf-cropcard-date">
                  <Calendar size={11} />
                  <span>{entry.date}</span>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Empty state */}
      {entries.length === 0 ? (
        <section className="acg-mf-empty pn-card">
          <Info size={32} />
          <p>{copy.empty}</p>
          <button type="button" className="pn-btn" onClick={() => setShowForm(true)}>
            <Plus size={16} /> {copy.addBtn}
          </button>
        </section>
      ) : (
        <section className="acg-mf-history">
          <div className="acg-mf-history-head">
            <h2 className="pn-h2">{copy.recent} <span className="acg-mf-count">({entries.length})</span></h2>
            <button type="button" className="pn-linkbtn acg-mf-clear" onClick={clearAll}>
              <Trash2 size={13} /> {copy.clearAll}
            </button>
          </div>
          <div className="acg-mf-list">
            {[...entries].reverse().map((e: SprayEntry) => (
              <article key={e.id} className="acg-mf-entry pn-card">
                <div className="acg-mf-entry-main">
                  <div className="acg-mf-entry-top">
                    <span className="acg-mf-entry-prod">{e.productName}</span>
                    <span className="acg-mf-entry-chip">{e.moaCode}</span>
                  </div>
                  <div className="acg-mf-entry-meta">
                    <span><Sprout size={12} /> {e.crop}</span>
                    <span><Beaker size={12} /> {e.type}</span>
                    <span><Calendar size={12} /> {e.date}</span>
                    <span>{e.areaValue} {e.areaUnit}</span>
                    {e.fieldLabel && <span>{e.fieldLabel}</span>}
                  </div>
                  {e.notes && <p className="acg-mf-entry-notes">{e.notes}</p>}
                </div>
                <button
                  type="button"
                  className="acg-mf-entry-del"
                  onClick={() => removeEntry(e.id)}
                  aria-label={bn ? 'মুছুন' : 'Delete'}
                >
                  <Trash2 size={14} />
                </button>
              </article>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};
