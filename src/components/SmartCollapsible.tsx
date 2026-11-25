import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'motion/react';
import { ChevronDown } from 'lucide-react';

/**
 * SmartCollapsible
 * ================
 * Content-height-aware collapsible section: content taller than the
 * threshold starts collapsed, shorter content starts open; either way the
 * user can toggle. Long data blocks no longer push the next section off the
 * screen, small ones stay visible without an extra click.
 *
 * The body stays mounted (the animation only drives its height), so the
 * content height is measurable on mount. Once the user toggles a section,
 * their choice is persisted in localStorage and wins over the heuristic.
 */

interface SmartCollapsibleProps {
  /** Stable key for persistence + test targeting. */
  sectionKey: string;
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  /** px above which content starts collapsed (default 320). */
  collapseThresholdPx?: number;
  defaultOpen?: boolean;
  children: React.ReactNode;
  className?: string;
}

export const OPEN_KEY = (sectionKey: string) => `smartcollapsible_open_${sectionKey}`;

export const SmartCollapsible: React.FC<SmartCollapsibleProps> = ({
  sectionKey,
  title,
  subtitle,
  collapseThresholdPx = 320,
  defaultOpen,
  children,
  className = '',
}) => {
  const bodyRef = useRef<HTMLDivElement | null>(null);
  const [isOpen, setIsOpen] = useState<boolean>(() => {
    if (typeof window === 'undefined') return defaultOpen ?? true;
    const saved = localStorage.getItem(OPEN_KEY(sectionKey));
    if (saved !== null) return saved === 'true';
    return defaultOpen ?? true;
  });
  const [isTall, setIsTall] = useState(false);
  const measuredRef = useRef(false);

  // Measure once on mount; apply the height heuristic only when the user
  // hasn't already stored a preference for this section.
  useEffect(() => {
    if (measuredRef.current) return;
    const el = bodyRef.current;
    if (!el) return;
    measuredRef.current = true;
    const tall = el.scrollHeight > collapseThresholdPx;
    setIsTall(tall);
    const hasSaved = typeof window !== 'undefined' && localStorage.getItem(OPEN_KEY(sectionKey)) !== null;
    if (!hasSaved && defaultOpen === undefined) {
      setIsOpen(!tall);
    }
  }, [sectionKey, collapseThresholdPx, defaultOpen]);

  const toggle = () => {
    setIsOpen((prev) => {
      const next = !prev;
      if (typeof window !== 'undefined') {
        localStorage.setItem(OPEN_KEY(sectionKey), String(next));
      }
      return next;
    });
  };

  return (
    <section
      data-testid={`smart-collapsible-${sectionKey}`}
      data-open={isOpen ? 'true' : 'false'}
      className={`border border-slate-200 bg-white rounded-xl overflow-hidden ${className}`}
    >
      <button
        type="button"
        onClick={toggle}
        aria-expanded={isOpen}
        className="w-full flex items-center justify-between gap-3 px-4 py-3 text-left cursor-pointer hover:bg-slate-50 transition-colors"
      >
        <span className="min-w-0 flex items-center gap-2">
          <span className="font-semibold text-sm text-slate-800 truncate">{title}</span>
          {subtitle && <span className="text-[11px] text-slate-500 truncate hidden sm:inline">{subtitle}</span>}
          {isTall && !isOpen && (
            <span className="text-[10px] font-medium px-1.5 py-0.5 rounded bg-slate-100 text-slate-500 shrink-0">
              …
            </span>
          )}
        </span>
        <ChevronDown
          className={`w-4 h-4 text-slate-500 shrink-0 transition-transform ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>
      {/* Always mounted so scrollHeight is measurable; the animation only
          drives its height, so closed sections stay in the DOM at 0 height. */}
      <motion.div
        initial={false}
        animate={{ height: isOpen ? 'auto' : 0, opacity: isOpen ? 1 : 0 }}
        transition={{ duration: 0.22, ease: 'easeInOut' }}
        className="overflow-hidden"
        style={{ pointerEvents: isOpen ? 'auto' : 'none' }}
      >
        <div ref={bodyRef} className="px-4 pb-4 pt-1">
          {children}
        </div>
      </motion.div>
    </section>
  );
};
