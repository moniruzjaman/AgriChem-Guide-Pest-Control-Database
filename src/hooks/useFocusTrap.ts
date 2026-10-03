import { useEffect, RefObject } from 'react';

/**
 * useFocusTrap — traps keyboard focus inside a container while active.
 *
 * When `active` is true:
 *  - On activation, moves focus to the first focusable element inside `containerRef`.
 *  - Tab / Shift+Tab cycles focus within the container only (never escapes to the
 *    page behind the overlay).
 *  - Restores focus to the previously-focused element when `active` becomes false.
 *
 * This is the WAI-ARIA "focus trap" pattern required for true modal dialogs.
 * Pass the overlay container ref (the `fixed inset-0 z-50` div).
 */
const FOCUSABLE_SELECTOR = [
  'a[href]',
  'button:not([disabled])',
  'input:not([disabled])',
  'select:not([disabled])',
  'textarea:not([disabled])',
  '[tabindex]:not([tabindex="-1"])',
].join(',');

export function useFocusTrap(
  containerRef: RefObject<HTMLElement | null>,
  active: boolean
) {
  useEffect(() => {
    if (!active || !containerRef.current) return;

    const container = containerRef.current;
    const previouslyFocused = document.activeElement as HTMLElement | null;

    // Move focus into the container on activation.
    const focusables = getFocusables(container);
    if (focusables.length > 0) {
      focusables[0].focus();
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return;
      const focusableEls = getFocusables(container);
      if (focusableEls.length === 0) return;

      const first = focusableEls[0];
      const last = focusableEls[focusableEls.length - 1];
      const activeEl = document.activeElement;

      if (e.shiftKey) {
        // Shift+Tab: if on first (or container itself), wrap to last
        if (activeEl === first || activeEl === container) {
          e.preventDefault();
          last.focus();
        }
      } else {
        // Tab: if on last, wrap to first
        if (activeEl === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    container.addEventListener('keydown', handleKeyDown);

    return () => {
      container.removeEventListener('keydown', handleKeyDown);
      // Restore focus to whatever opened the modal.
      if (previouslyFocused && typeof previouslyFocused.focus === 'function') {
        previouslyFocused.focus();
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active]);
}

function getFocusables(container: HTMLElement): HTMLElement[] {
  return Array.from(
    container.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR)
  ).filter((el) => {
    // Skip elements that are not visible
    return el.offsetParent !== null || el === document.activeElement;
  });
}
