import React from 'react';

/**
 * MoAGroupBadge — Visual Badging Standards component (Guide §4.3).
 *
 * Renders the IRAC "GROUP 28 INSECTICIDE" label format mandated by the
 * guide: sub-group letter is rendered in the SAME font size as the main
 * number, all caps, monospace font so the visual weight of "28A" is
 * identical to "28".
 *
 * Color-coding follows the IRAC label colour standard used by the rest
 * of the app: IRAC red, FRAC gold, HRAC green.
 */
export interface MoAGroupBadgeProps {
  /** Full MoA code (e.g. "IRAC 4A", "IRAC 28", "FRAC 11", "HRAC B"). */
  moaCode: string;
  /** Chemical type label ("Insecticide" | "Fungicide" | "Herbicide" | ...). */
  type: string;
  /** Visual size — small (compact chip) or large (full badge). */
  size?: 'sm' | 'md' | 'lg';
  /** Optional className for further customisation. */
  className?: string;
}

function schemeColor(moaCode: string): string {
  if (!moaCode) return '#475569';
  if (moaCode.startsWith('IRAC')) return '#b31d31';
  if (moaCode.startsWith('FRAC')) return '#8a6d1d';
  if (moaCode.startsWith('HRAC')) return '#006a4e';
  return '#475569';
}

/**
 * Strip the scheme prefix and return the bare group token (e.g. "4A", "28",
 * "11", "B"). For unparseable codes returns "UN".
 */
function bareGroupToken(moaCode: string): string {
  if (!moaCode) return 'UN';
  const stripped = moaCode.replace(/^(IRAC|FRAC|HRAC)\s+/i, '');
  if (!stripped) return 'UN';
  // Already in <group><sub> form?
  if (/^(\d{1,2}[A-Z]?|[A-Z]\d{0,2})$/.test(stripped)) return stripped;
  return 'UN';
}

export const MoAGroupBadge: React.FC<MoAGroupBadgeProps> = ({
  moaCode,
  type,
  size = 'md',
  className = '',
}) => {
  const groupToken = bareGroupToken(moaCode);
  const typeToken = (type || 'PESTICIDE').toUpperCase();
  const label = `GROUP ${groupToken} ${typeToken}`;
  const color = schemeColor(moaCode);

  const sizeClass =
    size === 'sm' ? 'acg-moa-badge--sm'
      : size === 'lg' ? 'acg-moa-badge--lg'
        : 'acg-moa-badge--md';

  return (
    <span
      className={`acg-moa-badge ${sizeClass} ${className}`}
      style={{ backgroundColor: color }}
      title={label}
    >
      {label}
    </span>
  );
};
