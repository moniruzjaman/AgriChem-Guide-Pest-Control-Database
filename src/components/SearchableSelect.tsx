import React, { useMemo, useState, useRef, useEffect, useCallback } from 'react';
import { Search, X, Check, ChevronDown } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

/**
 * A single option rendered inside the SearchableSelect dropdown.
 *  - value       : unique machine value emitted via onChange
 *  - label       : primary display text (always searchable)
 *  - sublabel    : secondary muted line (searchable when provided)
 *  - badge       : short right-aligned chip text (e.g. an IRAC/FRAC/HRAC MoA code)
 *  - badgeClass  : Tailwind classes for the chip
 *  - keywords    : extra free-text tokens included in search matching only
 */
export interface SearchableSelectOption {
  value: string;
  label: string;
  sublabel?: string;
  badge?: string;
  badgeClass?: string;
  keywords?: string;
}

interface SearchableSelectProps {
  id?: string;
  value: string;
  onChange: (value: string) => void;
  options: SearchableSelectOption[];
  /** Shown when nothing is selected. */
  placeholder?: string;
  /** Empty-state line when the query matches nothing. */
  emptyLabel?: string;
  /** Accessibility label for the trigger input. */
  ariaLabel?: string;
  disabled?: boolean;
  /** Visual size variant: "sm" for dense tool rows, "md" (default) for filter panels. */
  size?: 'sm' | 'md';
  /** Extra classes for the trigger wrapper (keeps layout parity with native selects). */
  triggerClassName?: string;
}

/**
 * SearchableSelect — a dynamic, type-to-filter dropdown used everywhere the
 * MoA Rotation tab needs product / crop / pest selection.
 *
 * Guarantees (mirrors the NextSprayGuide combobox behaviour):
 *  - Opens on focus / click, closes on outside mousedown, Escape, or pick.
 *  - Live substring filtering across label + sublabel + badge + keywords.
 *  - Keyboard support: ↑/↓ move the active row, Enter selects, Escape closes.
 *  - The selected option's label is echoed back into the trigger input.
 *  - Fully dynamic: options may change between renders (crop→pest cascade).
 */
export const SearchableSelect: React.FC<SearchableSelectProps> = ({
  id,
  value,
  onChange,
  options,
  placeholder = '— Select —',
  emptyLabel = 'No matches found',
  ariaLabel,
  disabled = false,
  size = 'md',
  triggerClassName = '',
}) => {
  const { language } = useLanguage();

  const [open, setOpen] = useState<boolean>(false);
  const [query, setQuery] = useState<string>('');
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  const selectedOption = useMemo(
    () => options.find((o) => o.value === value) || null,
    [options, value]
  );

  // Text echoed in the trigger: the live query while the user is typing,
  // otherwise the selected label (or placeholder).
  const displayText = query !== '' ? query : selectedOption ? selectedOption.label : '';

  const filtered = useMemo<SearchableSelectOption[]>(() => {
    const q = query.toLowerCase().trim();
    if (!q) return options;
    return options.filter((o) => {
      const haystack = [o.label, o.sublabel, o.badge, o.keywords]
        .filter(Boolean)
        .join(' ')
        .toLowerCase();
      return haystack.includes(q);
    });
  }, [options, query]);

  // Close on outside interaction (mousedown so dragging scrollbars still works).
  useEffect(() => {
    function handleOutside(e: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handleOutside);
    return () => document.removeEventListener('mousedown', handleOutside);
  }, []);

  // Keep the active row in view while keyboard-navigating.
  useEffect(() => {
    if (!open || !listRef.current) return;
    const el = listRef.current.children[activeIndex] as HTMLElement | undefined;
    el?.scrollIntoView({ block: 'nearest' });
  }, [activeIndex, open]);

  const openDropdown = useCallback(() => {
    if (disabled) return;
    setOpen(true);
    // Start the active row on the current selection when sensible.
    const idx = options.findIndex((o) => o.value === value);
    setActiveIndex(idx >= 0 ? idx : 0);
  }, [disabled, options, value]);

  const commitSelection = useCallback(
    (opt: SearchableSelectOption) => {
      onChange(opt.value);
      setQuery('');
      setOpen(false);
    },
    [onChange]
  );

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (disabled) return;
    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        if (!open) {
          openDropdown();
        } else {
          setActiveIndex((i) => Math.min(i + 1, filtered.length - 1));
        }
        break;
      case 'ArrowUp':
        e.preventDefault();
        if (open) {
          setActiveIndex((i) => Math.max(i - 1, 0));
        }
        break;
      case 'Enter':
        if (open && filtered[activeIndex]) {
          e.preventDefault();
          commitSelection(filtered[activeIndex]);
        }
        break;
      case 'Escape':
        setOpen(false);
        break;
      default:
        break;
    }
  };

  const sizeCls =
    size === 'sm'
      ? 'px-3 py-2 text-xs rounded-lg'
      : 'px-3.5 py-2.5 text-sm rounded-xl';

  return (
    <div className="relative" ref={wrapperRef}>
      {/* Trigger input — always typeable, doubles as the dropdown anchor */}
      <div className="relative">
        <Search
          className={`w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none ${
            size === 'sm' ? 'w-3.5 h-3.5' : ''
          }`}
        />
        <input
          id={id}
          ref={inputRef}
          type="text"
          role="combobox"
          aria-expanded={open}
          aria-controls={id ? `${id}-listbox` : undefined}
          aria-label={ariaLabel}
          autoComplete="off"
          disabled={disabled}
          value={displayText}
          placeholder={placeholder}
          onFocus={() => {
            openDropdown();
          }}
          onClick={() => {
            if (!open) openDropdown();
          }}
          onChange={(e) => {
            setQuery(e.target.value);
            setActiveIndex(0);
            setOpen(true);
          }}
          onKeyDown={handleKeyDown}
          className={`w-full ${sizeCls} pl-9 pr-16 bg-slate-50 border border-slate-300 font-semibold text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition ${triggerClassName}`}
        />

        {/* Right controls: clear selection OR open chevron */}
        <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
          {displayText !== '' && !disabled && (
            <button
              type="button"
              tabIndex={-1}
              onClick={() => {
                onChange('');
                setQuery('');
                setOpen(false);
                inputRef.current?.focus();
              }}
              className="p-1 text-slate-400 hover:text-rose-600 transition cursor-pointer"
              title={language === 'bn' ? 'মুছুন' : 'Clear'}
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
          <ChevronDown
            className={`w-4 h-4 text-slate-400 transition-transform ${open ? 'rotate-180' : ''}`}
          />
        </div>
      </div>

      {/* Dropdown panel */}
      {open && !disabled && (
        <ul
          id={id ? `${id}-listbox` : undefined}
          ref={listRef}
          role="listbox"
          className="absolute z-40 mt-1 w-full bg-white border border-slate-200 rounded-xl shadow-xl max-h-64 overflow-y-auto"
        >
          {filtered.length === 0 ? (
            <li className="p-4 text-xs text-slate-500 text-center" role="status">
              {emptyLabel}
            </li>
          ) : (
            filtered.map((opt, idx) => {
              const isSelected = opt.value === value;
              const isActive = idx === activeIndex;
              return (
                <li
                  key={opt.value}
                  role="option"
                  aria-selected={isSelected}
                  onMouseEnter={() => setActiveIndex(idx)}
                  onMouseDown={(e) => {
                    // mousedown beats the input's blur/outside handler
                    e.preventDefault();
                    commitSelection(opt);
                  }}
                  className={`px-3 py-2.5 cursor-pointer transition flex items-center justify-between gap-3 ${
                    isActive ? 'bg-emerald-50/70' : 'bg-white'
                  } ${isSelected ? 'ring-1 ring-inset ring-emerald-200' : ''}`}
                >
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-1.5">
                      {isSelected && <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />}
                      <span className="font-bold text-sm text-slate-900 truncate">{opt.label}</span>
                    </div>
                    {opt.sublabel && (
                      <div className="text-[10px] text-slate-500 truncate">{opt.sublabel}</div>
                    )}
                  </div>
                  {opt.badge && (
                    <span
                      className={`px-1.5 py-0.5 rounded text-[10px] font-mono font-black border shrink-0 ${
                        opt.badgeClass || 'bg-slate-100 text-slate-700 border-slate-200'
                      }`}
                    >
                      {opt.badge}
                    </span>
                  )}
                </li>
              );
            })
          )}
        </ul>
      )}
    </div>
  );
};
