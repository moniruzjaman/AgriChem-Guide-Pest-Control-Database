import React, { useRef, useState } from 'react';
import {
  AlertOctagon,
  AlertTriangle,
  CheckCircle2,
  X,
  Info,
  FileDown,
  ShieldAlert,
  ArrowRight,
} from 'lucide-react';
import { useFocusTrap } from '../hooks/useFocusTrap';
import { useLanguage } from '../context/LanguageContext';
import {
  ComplianceResult,
  ComplianceFinding,
  formatGroupBadgeLabel,
} from '../utils/moaRotationEngine';
import './MoAComplianceWarningModal.css';

interface MoAComplianceWarningModalProps {
  /** Result of `runComplianceCheck` for the proposed application. */
  result: ComplianceResult | null;
  /** Full MoA code of the proposed product (e.g. "IRAC 4A"). */
  proposedMoACode: string;
  /** Chemical type label ("Insecticide" | "Fungicide" | ...). */
  proposedType: string;
  /** Trade name of the proposed product. */
  proposedProductName: string;
  /** Called when the user dismisses the modal without overriding. */
  onClose: () => void;
  /**
   * Called when the user explicitly overrides a BLOCK by entering an
   * agronomic justification. Per Guide §4.3, overriding a block requires
   * a mandatory agronomic justification entry log — only available for
   * FLAG severity (not BLOCK). BLOCK is strictly non-dismissible.
   */
  onOverride?: (justification: string) => void;
}

/**
 * MoA Rotation Compliance Warning Modal — Guide §4.3 "Warning Modal Workflows".
 *
 * The modal is rendered as a non-dismissible overlay when the compliance
 * engine returns BLOCK. Attempting to log an invalid chemistry triggers
 * this un-dismissable warning displaying exact failure mechanics
 * (e.g. "Non-Compliant: MoA Group 28 was applied 10 days ago within
 * Window 1. Sequential multi-generational exposure is prohibited.").
 *
 * For FLAG severity the modal is dismissible and offers an "Override
 * with justification" workflow — overriding requires the user to enter
 * a mandatory agronomic justification, exactly as the guide specifies.
 */
export const MoAComplianceWarningModal: React.FC<MoAComplianceWarningModalProps> = ({
  result,
  proposedMoACode,
  proposedType,
  proposedProductName,
  onClose,
  onOverride,
}) => {
  const overlayRef = useRef<HTMLDivElement>(null);
  const { language } = useLanguage();
  const bn = language === 'bn';
  const [justification, setJustification] = useState('');
  const [showJustificationBox, setShowJustificationBox] = useState(false);

  // Always call the hook — Rules of Hooks. Active only when result is non-null.
  useFocusTrap(overlayRef, !!result);

  if (!result) return null;

  const isBlock = result.verdict === 'BLOCK';
  const isFlag = result.verdict === 'FLAG';

  const findings = result.findings;
  const blockFindings = findings.filter((f) => f.severity === 'BLOCK');
  const flagFindings = findings.filter((f) => f.severity === 'FLAG');

  const handleOverride = () => {
    if (!onOverride) return;
    const trimmed = justification.trim();
    if (trimmed.length < 10) return; // require a meaningful justification
    onOverride(trimmed);
    setJustification('');
    setShowJustificationBox(false);
  };

  const verdictCopy = {
    BLOCK: {
      icon: AlertOctagon,
      eyebrow: bn ? 'MoA কমপ্লায়েন্স ইঞ্জিন — অবরুদ্ধ' : 'MoA COMPLIANCE ENGINE — BLOCKED',
      title: bn
        ? `এই প্রয়োগটি অনুমোদনযোগ্য নয়`
        : `This application is non-compliant`,
      sub: bn
        ? 'IRAC MoA রোটেশন গাইডের নিয়ম অনুযায়ী এই প্রয়োগ নিষিদ্ধ। এই ব্লক ওভাররাইড করার কোনো অপশন নেই।'
        : 'Per the IRAC MoA Rotation Guide, this application is prohibited. There is no override option for a hard block.',
    },
    FLAG: {
      icon: AlertTriangle,
      eyebrow: bn ? 'MoA কমপ্লায়েন্স ইঞ্জিন — উচ্চ ঝুঁকি' : 'MoA COMPLIANCE ENGINE — HIGH RISK FLAG',
      title: bn
        ? `এই প্রয়োগে উচ্চ ঝুঁকি রয়েছে`
        : `This application carries a high-risk flag`,
      sub: bn
        ? 'গাইড অনুযায়ী এই প্রয়োগ শুধুমাত্র জরুরি ব্যতিক্রম হিসেবে অনুমোদিত। ওভাররাইড করতে চাইলে একটি কৃষিগত কারণ লিখুন।'
        : 'The guide permits this only as an emergency exception. To override, you must enter a mandatory agronomic justification.',
    },
    PASS: {
      icon: CheckCircle2,
      eyebrow: bn ? 'MoA কমপ্লায়েন্স ইঞ্জিন — অনুমোদিত' : 'MoA COMPLIANCE ENGINE — APPROVED',
      title: bn
        ? `প্রয়োগটি কমপ্লায়েন্ট`
        : `Application is compliant`,
      sub: bn
        ? 'কোনো রোটেশন নিয়ম লঙ্ঘন হয়নি।'
        : 'No rotation rule violations detected.',
    },
  } as const;

  const v = verdictCopy[result.verdict];
  const VerdictIcon = v.icon;

  const badgeLabel = formatGroupBadgeLabel(proposedMoACode, proposedType);

  return (
    <div
      ref={overlayRef}
      className="acg-moa-modal-overlay"
      role="dialog"
      aria-modal="true"
      aria-labelledby="moa-compliance-title"
    >
      <div
        className={`acg-moa-modal acg-moa-modal--${result.verdict.toLowerCase()}`}
      >
        {/* ── Header ───────────────────────────────────────────────── */}
        <header className="acg-moa-modal__header">
          <div className="acg-moa-modal__eyebrow-row">
            <VerdictIcon className="acg-moa-modal__verdict-icon" />
            <p className="acg-moa-modal__eyebrow">{v.eyebrow}</p>
            {/* Only PASS and FLAG are user-dismissible. BLOCK hides the X. */}
            {!isBlock && (
              <button
                type="button"
                className="acg-moa-modal__close"
                onClick={onClose}
                aria-label={bn ? 'বন্ধ করুন' : 'Close'}
              >
                <X size={18} />
              </button>
            )}
          </div>
          <h2 id="moa-compliance-title" className="acg-moa-modal__title">
            {v.title}
          </h2>
          <p className="acg-moa-modal__sub">{v.sub}</p>

          {/* ── Proposed-application badge ────────────────────────── */}
          {/* Visual Badging Standards — Guide §4.3. Sub-group letter is
              rendered in the SAME font size as the main number, all caps. */}
          <div className="acg-moa-modal__proposal">
            <div className="acg-moa-modal__proposal-label">
              {bn ? 'প্রস্তাবিত প্রয়োগ' : 'Proposed application'}
            </div>
            <div className="acg-moa-modal__proposal-row">
              <span className="acg-moa-modal__group-badge">
                {badgeLabel}
              </span>
              <span className="acg-moa-modal__proposal-product">
                {proposedProductName}
              </span>
            </div>
            {result.proposedMainGroup && (
              <div className="acg-moa-modal__proposal-meta">
                <span>
                  {bn ? 'মূল গ্রুপ:' : 'Main group:'}{' '}
                  <strong>{result.proposedMainGroup}</strong>
                </span>
                <span>
                  {bn ? 'সাব-গ্রুপ:' : 'Sub-group:'}{' '}
                  <strong>{result.proposedSubGroup ?? '—'}</strong>
                </span>
                <span>
                  {bn ? 'উইন্ডো দৈর্ঘ্য:' : 'Window length:'}{' '}
                  <strong>{result.windowDays} {bn ? 'দিন' : 'days'}</strong>
                </span>
              </div>
            )}
          </div>
        </header>

        {/* ── Findings list ────────────────────────────────────────── */}
        {findings.length > 0 && (
          <section className="acg-moa-modal__findings">
            <p className="acg-moa-modal__findings-head">
              <ShieldAlert size={14} />
              {bn
                ? `কমপ্লায়েন্স ইঞ্জিন ফলাফল (${findings.length})`
                : `Compliance engine findings (${findings.length})`}
            </p>
            <ul className="acg-moa-modal__findings-list">
              {blockFindings.map((f) => (
                <FindingItem key={f.code} finding={f} bn={bn} />
              ))}
              {flagFindings.map((f) => (
                <FindingItem key={f.code} finding={f} bn={bn} />
              ))}
            </ul>
          </section>
        )}

        {/* ── Alternative main groups recommendation ─────────────── */}
        {result.alternativeMainGroups.length > 0 && (
          <section className="acg-moa-modal__alternatives">
            <p className="acg-moa-modal__alternatives-head">
              <ArrowRight size={14} />
              {bn
                ? `বিকল্প অনুমোদিত মূল গ্রুপসমূহ`
                : `Available alternative main groups`}
            </p>
            <div className="acg-moa-modal__alternatives-chips">
              {result.alternativeMainGroups.map((g) => (
                <span key={g} className="acg-moa-modal__alt-chip">
                  GROUP {g}
                </span>
              ))}
            </div>
            <p className="acg-moa-modal__alternatives-note">
              {bn
                ? 'এই গ্রুপগুলো সম্পূর্ণ ভিন্ন নাম্বারযুক্ত MoA — রোটেশন কমপ্লায়েন্স নিশ্চিত করবে।'
                : 'These are distinct numbered MoA classes — rotating to one of them keeps you compliant.'}
            </p>
          </section>
        )}

        {/* ── Footer / actions ───────────────────────────────────── */}
        <footer className="acg-moa-modal__footer">
          {isBlock && (
            <>
              <div className="acg-moa-modal__block-note">
                <AlertOctagon size={14} />
                <span>
                  {bn
                    ? 'এই ব্লক ওভাররাইড করা যাবে না। অনুমোদিত বিকল্প বেছে নিন।'
                    : 'This block cannot be overridden. Choose an approved alternative.'}
                </span>
              </div>
              <button
                type="button"
                className="acg-moa-modal__btn acg-moa-modal__btn--primary"
                onClick={onClose}
              >
                {bn ? 'ঠিক আছে, বিকল্প বাছব' : 'OK, choose an alternative'}
              </button>
            </>
          )}

          {isFlag && !showJustificationBox && (
            <>
              <button
                type="button"
                className="acg-moa-modal__btn acg-moa-modal__btn--secondary"
                onClick={onClose}
              >
                {bn ? 'বাতিল করুন' : 'Cancel'}
              </button>
              <button
                type="button"
                className="acg-moa-modal__btn acg-moa-modal__btn--primary"
                onClick={() => setShowJustificationBox(true)}
              >
                {bn ? 'জরুরি ওভাররাইড করুন' : 'Override as emergency'}
              </button>
            </>
          )}

          {isFlag && showJustificationBox && (
            <div className="acg-moa-modal__override">
              <label className="acg-moa-modal__override-label">
                <Info size={14} />
                {bn
                  ? 'কৃষিগত কারণ (কমপক্ষে ১০ অক্ষর)'
                  : 'Agronomic justification (min 10 characters)'}
              </label>
              <textarea
                className="acg-moa-modal__override-input"
                value={justification}
                onChange={(e) => setJustification(e.target.value)}
                rows={3}
                placeholder={bn
                  ? 'যেমন: এলাকায় অন্য কোনো অনুমোদিত মূল গ্রুপ পাওয়া যাচ্ছে না, জরুরি প্রয়োজন।'
                  : 'e.g. No other approved main group is locally available for this pest; emergency use.'}
                autoFocus
              />
              <div className="acg-moa-modal__override-actions">
                <button
                  type="button"
                  className="acg-moa-modal__btn acg-moa-modal__btn--secondary"
                  onClick={() => {
                    setShowJustificationBox(false);
                    setJustification('');
                  }}
                >
                  {bn ? 'ফিরে যান' : 'Back'}
                </button>
                <button
                  type="button"
                  className="acg-moa-modal__btn acg-moa-modal__btn--primary"
                  onClick={handleOverride}
                  disabled={justification.trim().length < 10}
                >
                  {bn ? 'ওভাররাইড নিশ্চিত করুন' : 'Confirm override'}
                </button>
              </div>
            </div>
          )}

          {result.verdict === 'PASS' && (
            <button
              type="button"
              className="acg-moa-modal__btn acg-moa-modal__btn--primary"
              onClick={onClose}
            >
              {bn ? 'চালিয়ে যান' : 'Continue'}
            </button>
          )}
        </footer>

        {/* ── Reference footer ────────────────────────────────────── */}
        <p className="acg-moa-modal__reference">
          <FileDown size={11} />
          <span>
            {bn
              ? 'IRAC MoA রোটেশন গাইড §4.2 — ডিসিশন ইঞ্জিন লজিক অনুসারে'
              : 'Per IRAC MoA Rotation Guide §4.2 — Decision Engine Logic'}
          </span>
        </p>
      </div>
    </div>
  );
};

// ── Single finding row ──────────────────────────────────────────────────

const FindingItem: React.FC<{ finding: ComplianceFinding; bn: boolean }> = ({
  finding,
  bn,
}) => {
  const isBlock = finding.severity === 'BLOCK';
  const Icon = isBlock ? AlertOctagon : AlertTriangle;
  return (
    <li className={`acg-moa-modal__finding acg-moa-modal__finding--${finding.severity.toLowerCase()}`}>
      <Icon className="acg-moa-modal__finding-icon" />
      <div className="acg-moa-modal__finding-body">
        <p className="acg-moa-modal__finding-code">
          {finding.logic.replace(/_/g, ' ')}
          <span className="acg-moa-modal__finding-severity">
            {finding.severity}
          </span>
        </p>
        <p className="acg-moa-modal__finding-message">
          {bn ? finding.messageBn : finding.messageEn}
        </p>
      </div>
    </li>
  );
};
