/**
 * SearchSheet.tsx
 * ===============
 * Unified "Search / Scan" bottom-sheet opened from the BottomNav center
 * button (and the mobile header search icon). Built for layman farmers:
 *
 *  - Big input with persona-aware placeholder ("type your crop or pest…")
 *  - Voice input (Web Speech API) when the browser supports it — typing in
 *    a field with gloves is hard; speaking is easy.
 *  - Camera label-scan shortcut (Bangla OCR already exists in-app).
 *  - Live smart-search results (src/utils/smartSearch) with plain-language
 *    "why this matched" chips and every-aspect summary (crops, pests,
 *    brands, ingredients covered by the query).
 *  - Persona quick chips + "change who I am" switcher.
 */

import React, { useEffect, useMemo, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Search, Mic, MicOff, ScanLine, ArrowRight, BrainCircuit, Users } from 'lucide-react';
import type { ChemicalProduct, AppTab } from '../types';
import { useLanguage } from '../context/LanguageContext';
import { smartSearch } from '../utils/smartSearch';
import { PERSONAS, PERSONA_ORDER, type PersonaId } from '../utils/userCategories';
import './SearchSheet.css';

export interface SearchSheetProps {
  isOpen: boolean;
  onClose: () => void;
  products: ChemicalProduct[];
  /** Global query state so results stay in sync with the Database tab. */
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  onOpenScan: () => void;
  onSelectProduct: (p: ChemicalProduct) => void;
  persona: PersonaId;
  onPersonaChange: (id: PersonaId) => void;
  onNavigateTab: (tab: AppTab) => void;
}

const MAX_LIVE_RESULTS = 8;

export const SearchSheet: React.FC<SearchSheetProps> = ({
  isOpen,
  onClose,
  products,
  searchQuery,
  setSearchQuery,
  onOpenScan,
  onSelectProduct,
  persona,
  onPersonaChange,
  onNavigateTab,
}) => {
  const { language } = useLanguage();
  const bn = language === 'bn';
  const [draft, setDraft] = useState(searchQuery);
  const [debounced, setDebounced] = useState(searchQuery);
  const [listening, setListening] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const recRef = useRef<any>(null);
  const [voiceSupported] = useState(
    () => typeof window !== 'undefined' && !!((window as any).SpeechRecognition || (window as any).webkitSpeechRecognition)
  );

  // Keep draft synced when opened from elsewhere with a pre-filled query.
  useEffect(() => {
    if (isOpen) {
      setDraft(searchQuery);
      setDebounced(searchQuery);
      const t = setTimeout(() => inputRef.current?.focus(), 120);
      return () => clearTimeout(t);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  // Debounce live search (250 ms keeps 9k rows smooth on low-end phones).
  useEffect(() => {
    const t = setTimeout(() => setDebounced(draft), 250);
    return () => clearTimeout(t);
  }, [draft]);

  const result = useMemo(
    () => (debounced.trim() ? smartSearch(debounced, products) : null),
    [debounced, products]
  );

  const p = PERSONAS[persona];
  const placeholder = bn ? p.searchPlaceholderBn : p.searchPlaceholderEn;

  const startSearch = (q: string) => {
    setDraft(q);
    setDebounced(q);
    setSearchQuery(q);
  };

  const submit = () => {
    setSearchQuery(draft);
    if (draft.trim()) {
      onNavigateTab('database');
      onClose();
    }
  };

  const toggleVoice = () => {
    const SR = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SR) return;
    if (listening) {
      recRef.current?.stop();
      setListening(false);
      return;
    }
    const rec = new SR();
    rec.lang = bn ? 'bn-BD' : 'en-US';
    rec.interimResults = false;
    rec.maxAlternatives = 1;
    rec.onresult = (e: any) => {
      const said = e.results[0][0].transcript as string;
      setDraft((d) => (d ? `${d} ${said}` : said));
    };
    rec.onend = () => setListening(false);
    rec.onerror = () => setListening(false);
    recRef.current = rec;
    setListening(true);
    rec.start();
  };

  const totalMatches = result?.items.length ?? 0;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="pn-sheet-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            aria-hidden="true"
          />
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={bn ? 'খোঁজ ও স্ক্যান' : 'Search & Scan'}
            className="pn-sheet"
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 32, stiffness: 380 }}
          >
            <div className="pn-sheet__grabber" />

            {/* Header row: persona chip + close */}
            <div className="pn-sheet__head">
              <button
                type="button"
                className="pn-sheet__persona"
                onClick={() => {
                  const idx = PERSONA_ORDER.indexOf(persona);
                  onPersonaChange(PERSONA_ORDER[(idx + 1) % PERSONA_ORDER.length]);
                }}
                title={bn ? 'ব্যবহারকারীর ধরন বদলান' : 'Switch user category'}
              >
                <Users className="w-3.5 h-3.5" />
                <span>{p.emoji} {bn ? p.labelBn : p.labelEn}</span>
                <span className="pn-sheet__persona-hint">{bn ? 'পরিবর্তন' : 'change'}</span>
              </button>
              <button type="button" className="pn-sheet__close" onClick={onClose} aria-label={bn ? 'বন্ধ করুন' : 'Close'}>
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Big input row */}
            <div className="pn-sheet__inputrow">
              <div className="pn-sheet__inputwrap">
                <Search className="w-5 h-5 text-slate-400" />
                <input
                  ref={inputRef}
                  id="sheet-search-input"
                  value={draft}
                  onChange={(e) => setDraft(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && submit()}
                  placeholder={placeholder}
                  className="pn-sheet__input"
                  inputMode="search"
                  autoComplete="off"
                />
                {voiceSupported && (
                  <button
                    type="button"
                    onClick={toggleVoice}
                    className={`pn-sheet__mic ${listening ? 'is-listening' : ''}`}
                    aria-label={bn ? 'কথায় খুঁজুন' : 'Search by voice'}
                  >
                    {listening ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
                  </button>
                )}
              </div>
              <button type="button" className="pn-sheet__scan" onClick={onOpenScan}>
                <ScanLine className="w-5 h-5" />
                <span>{bn ? 'স্ক্যান' : 'Scan'}</span>
              </button>
            </div>

            {/* Quick chips for the current persona */}
            {!draft.trim() && (
              <div className="pn-sheet__chips">
                {p.quickSearches.map((q) => (
                  <button key={q.query} type="button" className="pn-chip" onClick={() => startSearch(q.query)}>
                    {bn ? q.bn : q.en}
                  </button>
                ))}
                <button type="button" className="pn-chip pn-chip--intel" onClick={() => { onNavigateTab('intelligence'); onClose(); }}>
                  <BrainCircuit className="w-3.5 h-3.5" />
                  {bn ? 'আবহাওয়া-স্মার্ট পরামর্শ' : 'Weather-smart advice'}
                </button>
              </div>
            )}

            {/* Live results */}
            {result && (
              <div className="pn-sheet__results">
                {totalMatches === 0 ? (
                  <div className="pn-sheet__empty">
                    <p className="font-bold">
                      {bn ? 'কিছু খুঁজে পাওয়া যায়নি। বাংলায় বা সহজ ইংরেজিতে লিখে দেখান—যেমন “ধান গাঁটপোকা”।' : 'Nothing found. Try plain words like “rice stem borer”, or Bangla like “ধান গাঁটপোকা”.'}
                    </p>
                    <button type="button" className="pn-sheet__fallback" onClick={onOpenScan}>
                      <ScanLine className="w-4 h-4" /> {bn ? 'বোতলের লেবেল স্ক্যান করুন' : 'Scan the bottle label instead'}
                    </button>
                  </div>
                ) : (
                  <>
                    {/* Every-aspect summary strip */}
                    <div className="pn-sheet__summary">
                      <strong>{bn ? `${totalMatches}টি পণ্য` : `${totalMatches} products`}</strong>
                      {result.matchedPests.length > 0 && (
                        <span>· {bn ? 'পোকা/রোগ' : 'pests'}: {result.matchedPests.slice(0, 3).join(', ')}</span>
                      )}
                      {result.matchedCrops.length > 0 && (
                        <span>· {bn ? 'ফসল' : 'crops'}: {result.matchedCrops.slice(0, 3).join(', ')}</span>
                      )}
                      {result.matchedIngredients.length > 0 && (
                        <span>· {bn ? 'উপাদান' : 'ingredients'}: {result.matchedIngredients.slice(0, 2).join(', ')}</span>
                      )}
                    </div>

                    {result.items.slice(0, MAX_LIVE_RESULTS).map(({ product, reasons }) => (
                      <button
                        key={product.id}
                        type="button"
                        className="pn-result"
                        onClick={() => { onSelectProduct(product); onClose(); }}
                      >
                        <div className="pn-result__main">
                          <span className="pn-result__brand">{product.tradeName}</span>
                          <span className="pn-result__ai">{product.commonName} · {product.type}</span>
                          <div className="pn-result__reasons">
                            {reasons.slice(0, 2).map((r) => (
                              <span key={r.kind + r.en} className="pn-reason">{bn ? r.bn : r.en}</span>
                            ))}
                          </div>
                        </div>
                        <ArrowRight className="w-4 h-4 text-slate-400 shrink-0" />
                      </button>
                    ))}

                    {totalMatches > MAX_LIVE_RESULTS && (
                      <button type="button" className="pn-sheet__more" onClick={submit}>
                        {bn ? `আর ${totalMatches - MAX_LIVE_RESULTS}টি দেখুন — পূর্ণ ফিল্টার সহ` : `See ${totalMatches - MAX_LIVE_RESULTS} more — with full filters`}
                      </button>
                    )}
                  </>
                )}
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
