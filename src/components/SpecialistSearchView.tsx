/**
 * SpecialistSearchView.tsx
 * ========================
 * Specialist policy/HHP search over the 5,485-row enriched pesticide
 * database. Lets an agronomist / extension officer / regulator:
 *   - filter by Policy Risk Tier (GREEN / AMBER / RED)
 *   - filter by HHP Status (WHO/FAO Highly Hazardous Pesticide)
 *   - filter by EU / Global Regulatory Status (banned, restricted, approved)
 *   - filter by Bangladesh Policy Action (phase-out, restrict, promote, etc.)
 *   - filter by Scheme (IRAC / FRAC / HRAC) and MoA Group
 *   - filter by Formulation Code (EC, WP, SC, ...)
 *   - search by Common Name, Trade Name, Registration No, Active Ingredient
 *
 * The result table is sortable, paginated, and links each row into the
 * existing ProductDetailModal so specialists can drill into a product.
 */

import { useMemo, useState } from 'react';
import type * as React from 'react';
import type { ChemicalProduct } from '../types';
import { Search, Shield, ShieldCheck, ShieldAlert, Filter, X, Download } from 'lucide-react';

interface Props {
  products: ChemicalProduct[];
  onProductClick?: (p: ChemicalProduct) => void;
}

type RiskTier = 'ALL' | 'GREEN' | 'AMBER' | 'RED';
type HhpFilter = 'ALL' | 'HHP' | 'NON_HHP' | 'UNKNOWN';
type SortKey = 'tradeName' | 'commonName' | 'registrationNo' | 'policyRiskTier' | 'moaCode';

const PAGE_SIZE = 25;

const RISK_TIER_STYLES: Record<string, { bg: string; text: string; label: string; icon: typeof Shield }> = {
  GREEN: { bg: '#dcfce7', text: '#166534', label: 'GREEN', icon: ShieldCheck },
  AMBER: { bg: '#fef3c7', text: '#92400e', label: 'AMBER', icon: ShieldAlert },
  RED: { bg: '#fee2e2', text: '#991b1b', label: 'RED', icon: ShieldAlert },
};

export default function SpecialistSearchView({ products, onProductClick }: Props) {
  // --- Filter state ----------------------------------------------------------
  const [query, setQuery] = useState('');
  const [riskTier, setRiskTier] = useState<RiskTier>('ALL');
  const [hhpFilter, setHhpFilter] = useState<HhpFilter>('ALL');
  const [schemeFilter, setSchemeFilter] = useState<string>('ALL');
  const [euStatusFilter, setEuStatusFilter] = useState<string>('ALL');
  const [policyActionFilter, setPolicyActionFilter] = useState<string>('ALL');
  const [formulationFilter, setFormulationFilter] = useState<string>('ALL');
  const [categoryFilter, setCategoryFilter] = useState<string>('ALL');
  const [sortKey, setSortKey] = useState<SortKey>('policyRiskTier');
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('asc');
  const [page, setPage] = useState(0);

  // --- Derived option lists --------------------------------------------------
  const schemes = useMemo(() => {
    const s = new Set<string>();
    products.forEach((p) => p.scheme && s.add(p.scheme));
    return ['ALL', ...Array.from(s).sort()];
  }, [products]);

  const euStatuses = useMemo(() => {
    const s = new Set<string>();
    products.forEach((p) => p.euGlobalRegulatoryStatus && s.add(p.euGlobalRegulatoryStatus));
    return ['ALL', ...Array.from(s).sort()];
  }, [products]);

  const policyActions = useMemo(() => {
    const s = new Set<string>();
    products.forEach((p) => p.bangladeshPolicyAction && s.add(p.bangladeshPolicyAction));
    return ['ALL', ...Array.from(s).sort()];
  }, [products]);

  const formulations = useMemo(() => {
    const s = new Set<string>();
    products.forEach((p) => p.formulationCode && s.add(p.formulationCode));
    return ['ALL', ...Array.from(s).sort()];
  }, [products]);

  const categories = useMemo(() => {
    const s = new Set<string>();
    products.forEach((p) => p.type && s.add(p.type));
    return ['ALL', ...Array.from(s).sort()];
  }, [products]);

  // --- Apply filters ---------------------------------------------------------
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return products.filter((p) => {
      // Text search across multiple fields
      if (q) {
        const hay = [
          p.commonName,
          p.tradeName,
          p.registrationNo,
          p.registrationHolder,
          p.moaCode,
          p.moaDescription,
          p.hazardousActivesMatched,
          ...(p.activeIngredients ?? []),
        ].filter(Boolean).join(' ').toLowerCase();
        if (!hay.includes(q)) return false;
      }

      if (riskTier !== 'ALL') {
        if (riskTier === 'RED' && p.policyRiskTier !== 'RED') return false;
        if (riskTier === 'AMBER' && p.policyRiskTier !== 'AMBER') return false;
        if (riskTier === 'GREEN' && p.policyRiskTier !== 'GREEN') return false;
      }

      if (hhpFilter !== 'ALL') {
        const hhp = (p.hhpStatus ?? '').toUpperCase();
        if (hhpFilter === 'HHP' && !hhp.includes('YES')) return false;
        if (hhpFilter === 'NON_HHP' && (!hhp || hhp.includes('YES'))) return false;
        if (hhpFilter === 'UNKNOWN' && hhp) return false;
      }

      if (schemeFilter !== 'ALL' && p.scheme !== schemeFilter) return false;
      if (euStatusFilter !== 'ALL' && p.euGlobalRegulatoryStatus !== euStatusFilter) return false;
      if (policyActionFilter !== 'ALL' && p.bangladeshPolicyAction !== policyActionFilter) return false;
      if (formulationFilter !== 'ALL' && p.formulationCode !== formulationFilter) return false;
      if (categoryFilter !== 'ALL' && p.type !== categoryFilter) return false;

      return true;
    });
  }, [products, query, riskTier, hhpFilter, schemeFilter, euStatusFilter,
      policyActionFilter, formulationFilter, categoryFilter]);

  // --- Sort ------------------------------------------------------------------
  const sorted = useMemo(() => {
    const arr = [...filtered];
    const dir = sortDir === 'asc' ? 1 : -1;
    const tierRank = (t: string | undefined) =>
      t === 'RED' ? 0 : t === 'AMBER' ? 1 : t === 'GREEN' ? 2 : 3;
    arr.sort((a, b) => {
      let av: string | number = '';
      let bv: string | number = '';
      switch (sortKey) {
        case 'tradeName': av = a.tradeName.toLowerCase(); bv = b.tradeName.toLowerCase(); break;
        case 'commonName': av = a.commonName.toLowerCase(); bv = b.commonName.toLowerCase(); break;
        case 'registrationNo': av = a.registrationNo.toLowerCase(); bv = b.registrationNo.toLowerCase(); break;
        case 'moaCode': av = (a.moaCode ?? '').toLowerCase(); bv = (b.moaCode ?? '').toLowerCase(); break;
        case 'policyRiskTier': av = tierRank(a.policyRiskTier); bv = tierRank(b.policyRiskTier); break;
      }
      if (av < bv) return -1 * dir;
      if (av > bv) return 1 * dir;
      return 0;
    });
    return arr;
  }, [filtered, sortKey, sortDir]);

  // --- Pagination ------------------------------------------------------------
  const totalPages = Math.ceil(sorted.length / PAGE_SIZE);
  const pageIdx = Math.min(page, Math.max(0, totalPages - 1));
  const pageRows = sorted.slice(pageIdx * PAGE_SIZE, pageIdx * PAGE_SIZE + PAGE_SIZE);

  // --- Stats -----------------------------------------------------------------
  const stats = useMemo(() => {
    const tier = { RED: 0, AMBER: 0, GREEN: 0, UNKNOWN: 0 };
    let hhpCount = 0;
    let policyEnrichedCount = 0;
    products.forEach((p) => {
      if (p.policyRiskTier === 'RED') tier.RED++;
      else if (p.policyRiskTier === 'AMBER') tier.AMBER++;
      else if (p.policyRiskTier === 'GREEN') tier.GREEN++;
      else tier.UNKNOWN++;
      if (p.hhpStatus && p.hhpStatus.toUpperCase().includes('YES')) hhpCount++;
      if (p.scheme) policyEnrichedCount++;
    });
    return { tier, hhpCount, policyEnrichedCount, total: products.length };
  }, [products]);

  // --- Render ----------------------------------------------------------------
  const toggleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortKey(key);
      setSortDir('asc');
    }
  };

  const clearFilters = () => {
    setQuery('');
    setRiskTier('ALL');
    setHhpFilter('ALL');
    setSchemeFilter('ALL');
    setEuStatusFilter('ALL');
    setPolicyActionFilter('ALL');
    setFormulationFilter('ALL');
    setCategoryFilter('ALL');
    setPage(0);
  };

  const exportCsv = () => {
    const headers = [
      'Registration No', 'Trade Name', 'Common Name', 'Category',
      'MoA Code', 'Scheme', 'Group No.', 'MoA Description',
      'Policy Risk Tier', 'HHP Status', 'Hazardous Active(s) Matched',
      'EU / Global Regulatory Status', 'Bangladesh Policy Action',
      'Formulation Code', 'Formulation Type (Physicality)',
      'Co-formulant / Inert Concern', 'Toxicity Class', 'PHI Days', 'REI Hours',
    ];
    const rows = sorted.map((p) => [
      p.registrationNo, p.tradeName, p.commonName, p.type,
      p.moaCode ?? '', p.scheme ?? '', p.groupNo ?? '', p.moaDescription ?? '',
      p.policyRiskTier ?? '', p.hhpStatus ?? '', p.hazardousActivesMatched ?? '',
      p.euGlobalRegulatoryStatus ?? '', p.bangladeshPolicyAction ?? '',
      p.formulationCode ?? '', p.formulationTypePhysicality ?? '',
      p.coFormulantInertConcern ?? '', p.toxicityClass ?? '',
      p.phiDays ?? '', p.reiHours ?? '',
    ]);
    const csv = [headers, ...rows]
      .map((r) => r.map((c) => `"${String(c).replace(/"/g, '""')}"`).join(','))
      .join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `pesticide_specialist_search_${Date.now()}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const activeFilterCount =
    (riskTier !== 'ALL' ? 1 : 0) +
    (hhpFilter !== 'ALL' ? 1 : 0) +
    (schemeFilter !== 'ALL' ? 1 : 0) +
    (euStatusFilter !== 'ALL' ? 1 : 0) +
    (policyActionFilter !== 'ALL' ? 1 : 0) +
    (formulationFilter !== 'ALL' ? 1 : 0) +
    (categoryFilter !== 'ALL' ? 1 : 0);

  return (
    <div className="specialist-search-view" style={{ padding: '16px', maxWidth: 1400, margin: '0 auto' }}>
      {/* Header */}
      <div className="pn-head" style={{ marginBottom: 16 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <Search size={28} color="#006a4e" />
          <div>
            <h1 style={{ margin: 0, fontSize: 24, color: '#006a4e', fontWeight: 700 }}>
              Specialist Search
            </h1>
            <p style={{ margin: '4px 0 0', fontSize: 13, color: '#4b5563' }}>
              Policy / HHP / MoA specialist query over {stats.total.toLocaleString()} registered pesticides
            </p>
          </div>
        </div>
      </div>

      {/* Stats Bar */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 12, marginBottom: 16 }}>
        <StatCard label="Total Products" value={stats.total} color="#1f2937" />
        <StatCard label="Policy Enriched" value={stats.policyEnrichedCount} color="#006a4e" />
        <StatCard label="RED Tier (Ban/Restrict)" value={stats.tier.RED} color="#991b1b" />
        <StatCard label="AMBER Tier (Caution)" value={stats.tier.AMBER} color="#92400e" />
        <StatCard label="GREEN Tier (Safe)" value={stats.tier.GREEN} color="#166534" />
        <StatCard label="WHO/FAO HHP" value={stats.hhpCount} color="#b91c1c" />
      </div>

      {/* Filter Panel */}
      <div style={{
        background: '#f5f8f5', border: '1px solid #d1fae5', borderRadius: 12,
        padding: 16, marginBottom: 16,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <Filter size={16} color="#006a4e" />
            <strong style={{ color: '#006a4e' }}>Filters {activeFilterCount > 0 && `(${activeFilterCount})`}</strong>
          </div>
          {activeFilterCount > 0 && (
            <button onClick={clearFilters} style={{
              background: 'transparent', border: 'none', color: '#991b1b',
              cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 4,
              fontSize: 13,
            }}>
              <X size={14} /> Clear all
            </button>
          )}
        </div>

        {/* Text search */}
        <input
          type="text"
          placeholder="Search by Common Name, Trade Name, Registration No, Active Ingredient..."
          value={query}
          onChange={(e) => { setQuery(e.target.value); setPage(0); }}
          style={{
            width: '100%', padding: '10px 14px', borderRadius: 8,
            border: '1px solid #d1d5db', fontSize: 14, marginBottom: 12,
            boxSizing: 'border-box',
          }}
        />

        {/* Dropdown filters — 4 per row */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 10 }}>
          <FilterSelect label="Policy Risk Tier" value={riskTier} onChange={(v) => { setRiskTier(v as RiskTier); setPage(0); }}
            options={['ALL', 'RED', 'AMBER', 'GREEN']} />

          <FilterSelect label="HHP Status" value={hhpFilter} onChange={(v) => { setHhpFilter(v as HhpFilter); setPage(0); }}
            options={[
              { value: 'ALL', label: 'All' },
              { value: 'HHP', label: 'HHP (YES — Hazardous)' },
              { value: 'NON_HHP', label: 'Non-HHP' },
              { value: 'UNKNOWN', label: 'Unknown / Not classified' },
            ]} />

          <FilterSelect label="Scheme" value={schemeFilter} onChange={(v) => { setSchemeFilter(v); setPage(0); }}
            options={schemes} />

          <FilterSelect label="Pesticide Category" value={categoryFilter} onChange={(v) => { setCategoryFilter(v); setPage(0); }}
            options={categories} />

          <FilterSelect label="EU / Global Regulatory Status" value={euStatusFilter} onChange={(v) => { setEuStatusFilter(v); setPage(0); }}
            options={euStatuses} />

          <FilterSelect label="Bangladesh Policy Action" value={policyActionFilter} onChange={(v) => { setPolicyActionFilter(v); setPage(0); }}
            options={policyActions} />

          <FilterSelect label="Formulation Code" value={formulationFilter} onChange={(v) => { setFormulationFilter(v); setPage(0); }}
            options={formulations} />
        </div>
      </div>

      {/* Results header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
        <div style={{ color: '#4b5563', fontSize: 14 }}>
          Showing <strong>{pageRows.length.toLocaleString()}</strong> of <strong>{sorted.length.toLocaleString()}</strong> matches
        </div>
        <button onClick={exportCsv} disabled={sorted.length === 0} style={{
          background: sorted.length === 0 ? '#d1d5db' : '#006a4e', color: 'white',
          border: 'none', borderRadius: 8, padding: '8px 14px', fontSize: 13,
          cursor: sorted.length === 0 ? 'not-allowed' : 'pointer',
          display: 'flex', alignItems: 'center', gap: 6,
        }}>
          <Download size={14} /> Export CSV
        </button>
      </div>

      {/* Results Table */}
      {pageRows.length === 0 ? (
        <div style={{ padding: 40, textAlign: 'center', color: '#6b7280', background: '#f9fafb', borderRadius: 12 }}>
          <Search size={40} style={{ margin: '0 auto 12px', opacity: 0.4 }} />
          <div>No products match these filters.</div>
        </div>
      ) : (
        <div style={{ overflowX: 'auto', background: 'white', borderRadius: 12, border: '1px solid #e5e7eb' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
            <thead>
              <tr style={{ background: '#f5f8f5', borderBottom: '2px solid #006a4e' }}>
                <Th onClick={() => toggleSort('tradeName')} active={sortKey === 'tradeName'} dir={sortDir}>Trade Name</Th>
                <Th onClick={() => toggleSort('commonName')} active={sortKey === 'commonName'} dir={sortDir}>Common Name</Th>
                <Th onClick={() => toggleSort('registrationNo')} active={sortKey === 'registrationNo'} dir={sortDir}>Reg. No</Th>
                <Th>Category</Th>
                <Th onClick={() => toggleSort('moaCode')} active={sortKey === 'moaCode'} dir={sortDir}>MoA</Th>
                <Th onClick={() => toggleSort('policyRiskTier')} active={sortKey === 'policyRiskTier'} dir={sortDir}>Risk Tier</Th>
                <Th>HHP</Th>
                <Th>EU Status</Th>
                <Th>BD Action</Th>
              </tr>
            </thead>
            <tbody>
              {pageRows.map((p) => {
                const tierStyle = p.policyRiskTier ? RISK_TIER_STYLES[p.policyRiskTier] : null;
                return (
                  <tr key={p.id}
                    onClick={() => onProductClick?.(p)}
                    style={{
                      cursor: 'pointer', borderBottom: '1px solid #f3f4f6',
                      transition: 'background 0.15s',
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.background = '#f5f8f5')}
                    onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
                  >
                    <td style={{ padding: '10px 8px', fontWeight: 600, color: '#006a4e' }}>{p.tradeName}</td>
                    <td style={{ padding: '10px 8px' }}>{p.commonName}</td>
                    <td style={{ padding: '10px 8px', fontFamily: 'monospace', fontSize: 12 }}>{p.registrationNo}</td>
                    <td style={{ padding: '10px 8px' }}>{p.type}</td>
                    <td style={{ padding: '10px 8px', fontFamily: 'monospace', fontSize: 12 }}>{p.moaCode ?? '—'}</td>
                    <td style={{ padding: '10px 8px' }}>
                      {tierStyle ? (
                        <span style={{
                          background: tierStyle.bg, color: tierStyle.text,
                          padding: '3px 10px', borderRadius: 12, fontSize: 11, fontWeight: 700,
                        }}>
                          {tierStyle.label}
                        </span>
                      ) : (
                        <span style={{ color: '#9ca3af', fontSize: 11 }}>—</span>
                      )}
                    </td>
                    <td style={{ padding: '10px 8px', fontSize: 12 }}>
                      {p.hhpStatus ? (
                        <span style={{
                          color: p.hhpStatus.toUpperCase().includes('YES') ? '#991b1b' : '#166534',
                          fontWeight: 600,
                        }}>
                          {p.hhpStatus.toUpperCase().includes('YES') ? '⚠ HHP' : 'No'}
                        </span>
                      ) : '—'}
                    </td>
                    <td style={{ padding: '10px 8px', fontSize: 11, color: '#4b5563' }}>
                      {p.euGlobalRegulatoryStatus ? (
                        <span title={p.euGlobalRegulatoryStatus}>
                          {p.euGlobalRegulatoryStatus.length > 40
                            ? p.euGlobalRegulatoryStatus.slice(0, 40) + '…'
                            : p.euGlobalRegulatoryStatus}
                        </span>
                      ) : '—'}
                    </td>
                    <td style={{ padding: '10px 8px', fontSize: 11, color: '#4b5563' }}>
                      {p.bangladeshPolicyAction ? (
                        <span title={p.bangladeshPolicyAction}>
                          {p.bangladeshPolicyAction.length > 30
                            ? p.bangladeshPolicyAction.slice(0, 30) + '…'
                            : p.bangladeshPolicyAction}
                        </span>
                      ) : '—'}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 8, marginTop: 16 }}>
          <button
            onClick={() => setPage((p) => Math.max(0, p - 1))}
            disabled={pageIdx === 0}
            style={{
              background: pageIdx === 0 ? '#e5e7eb' : '#006a4e', color: 'white',
              border: 'none', borderRadius: 6, padding: '6px 12px', fontSize: 13,
              cursor: pageIdx === 0 ? 'not-allowed' : 'pointer',
            }}
          >
            ← Prev
          </button>
          <span style={{ color: '#4b5563', fontSize: 13 }}>
            Page {pageIdx + 1} of {totalPages}
          </span>
          <button
            onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
            disabled={pageIdx >= totalPages - 1}
            style={{
              background: pageIdx >= totalPages - 1 ? '#e5e7eb' : '#006a4e', color: 'white',
              border: 'none', borderRadius: 6, padding: '6px 12px', fontSize: 13,
              cursor: pageIdx >= totalPages - 1 ? 'not-allowed' : 'pointer',
            }}
          >
            Next →
          </button>
        </div>
      )}
    </div>
  );
}

// ---------------------------------------------------------------------------
//  Sub-components
// ---------------------------------------------------------------------------

function StatCard({ label, value, color }: { label: string; value: number; color: string }) {
  return (
    <div style={{
      background: 'white', borderRadius: 10, padding: 14,
      border: '1px solid #e5e7eb', textAlign: 'center',
    }}>
      <div style={{ fontSize: 22, fontWeight: 700, color }}>{value.toLocaleString()}</div>
      <div style={{ fontSize: 11, color: '#6b7280', marginTop: 4 }}>{label}</div>
    </div>
  );
}

function FilterSelect({
  label, value, onChange, options,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: (string | { value: string; label: string })[];
}) {
  return (
    <label style={{ display: 'flex', flexDirection: 'column', gap: 4, fontSize: 12, color: '#374151' }}>
      <span style={{ fontWeight: 600 }}>{label}</span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        style={{
          padding: '8px 10px', borderRadius: 6, border: '1px solid #d1d5db',
          fontSize: 13, background: 'white',
        }}
      >
        {options.map((opt) => {
          const v = typeof opt === 'string' ? opt : opt.value;
          const l = typeof opt === 'string' ? opt : opt.label;
          return <option key={v} value={v}>{l}</option>;
        })}
      </select>
    </label>
  );
}

function Th({
  children, onClick, active, dir,
}: {
  children: React.ReactNode;
  onClick?: () => void;
  active?: boolean;
  dir?: 'asc' | 'desc';
}) {
  const sortable = !!onClick;
  return (
    <th
      onClick={onClick}
      style={{
        padding: '10px 8px', textAlign: 'left', fontSize: 11, fontWeight: 700,
        color: '#006a4e', cursor: sortable ? 'pointer' : 'default',
        userSelect: 'none', textTransform: 'uppercase', letterSpacing: 0.5,
      }}
    >
      {children} {active && dir && (dir === 'asc' ? '↑' : '↓')}
    </th>
  );
}
