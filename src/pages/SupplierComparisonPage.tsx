import { useMemo, useState } from 'react';
import { Award, ShieldCheck, Tag, Scale, CheckSquare, Square } from 'lucide-react';
import { SUPPLIER_COMPARISON_ROWS } from '../data/supplierData';
import { SupplierComparisonRow } from '../types/inventory';
import { SortableColumn, SortableTable } from '../components/tables/SortableTable';
import { ModalDialog } from '../components/common/ModalDialog';
import { DemoBadge } from '../components/common/DemoBadge';
import { formatInr } from '../utils/formatters';

export function SupplierComparisonPage() {
  const [supplierFilter, setSupplierFilter] = useState('All');
  const [cancellationFilter, setCancellationFilter] = useState('All');
  const [availabilityFilter, setAvailabilityFilter] = useState('All');
  const [typeFilter, setTypeFilter] = useState<'All' | 'Sightseeing' | 'Hotel'>('All');
  const [selectedIds, setSelectedIds] = useState<string[]>(['sc-1', 'sc-2', 'sc-3']);
  const [compareModalOpen, setCompareModalOpen] = useState(false);

  const suppliers = useMemo(
    () => ['All', ...Array.from(new Set(SUPPLIER_COMPARISON_ROWS.map((r) => r.supplier)))],
    []
  );

  const filteredRows = useMemo(() => {
    return SUPPLIER_COMPARISON_ROWS.filter((row) => {
      if (supplierFilter !== 'All' && row.supplier !== supplierFilter) return false;
      if (cancellationFilter !== 'All' && row.cancellation !== cancellationFilter) return false;
      if (availabilityFilter !== 'All' && row.availability !== availabilityFilter) return false;
      if (typeFilter !== 'All' && row.productType !== typeFilter) return false;
      return true;
    });
  }, [supplierFilter, cancellationFilter, availabilityFilter, typeFilter]);

  const lowestPriceRow = useMemo(() => {
    if (filteredRows.length === 0) return null;
    return filteredRows.reduce((min, cur) => (cur.priceInr < min.priceInr ? cur : min));
  }, [filteredRows]);

  const bestInclusionRow = useMemo(() => {
    if (filteredRows.length === 0) return null;
    return filteredRows.reduce((best, cur) =>
      cur.inclusionScore > best.inclusionScore ? cur : best
    );
  }, [filteredRows]);

  const mostFlexibleRow = useMemo(() => {
    if (filteredRows.length === 0) return null;
    return filteredRows.reduce((best, cur) =>
      cur.cancellationScore > best.cancellationScore ? cur : best
    );
  }, [filteredRows]);

  const toggleSelect = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id)
        ? prev.filter((item) => item !== id)
        : prev.length < 4
        ? [...prev, id]
        : prev
    );
  };

  const selectedRows = SUPPLIER_COMPARISON_ROWS.filter((r) => selectedIds.includes(r.id));

  const columns: SortableColumn<SupplierComparisonRow>[] = [
    {
      key: 'select',
      label: 'Pick',
      align: 'center',
      render: (row) => {
        const checked = selectedIds.includes(row.id);
        return (
          <button
            type="button"
            onClick={() => toggleSelect(row.id)}
            aria-label={`Select ${row.product} from ${row.supplier} for comparison`}
            aria-pressed={checked}
            className="p-1 text-[#1677E8] hover:bg-slate-100 rounded cursor-pointer"
          >
            {checked ? (
              <CheckSquare className="w-4 h-4" aria-hidden="true" />
            ) : (
              <Square className="w-4 h-4 text-slate-400" aria-hidden="true" />
            )}
          </button>
        );
      },
    },
    {
      key: 'supplier',
      label: 'Supplier',
      sortable: true,
      type: 'string',
      getSortValue: (r) => r.supplier,
      render: (r) => (
        <div>
          <span className="font-bold text-[#0B1530] block">{r.supplier}</span>
          <span className="text-[11px] text-[#7C899D]">{r.destination} · {r.productType}</span>
        </div>
      ),
    },
    {
      key: 'product',
      label: 'Product',
      sortable: true,
      type: 'string',
      getSortValue: (r) => r.product,
      render: (r) => (
        <div className="max-w-[240px]">
          <span className="font-semibold text-[#182338] block">{r.product}</span>
          <div className="flex flex-wrap gap-1 mt-1">
            {lowestPriceRow?.id === r.id && (
              <span className="px-1.5 py-0.5 rounded bg-[#1677E8]/15 text-[#1677E8] text-[10px] font-bold">
                Lowest Price
              </span>
            )}
            {bestInclusionRow?.id === r.id && (
              <span className="px-1.5 py-0.5 rounded bg-[#0D9B80]/15 text-[#0D9B80] text-[10px] font-bold">
                Best Inclusions
              </span>
            )}
            {mostFlexibleRow?.id === r.id && (
              <span className="px-1.5 py-0.5 rounded bg-[#14B8D4]/20 text-[#0E7490] text-[10px] font-bold">
                Most Flexible
              </span>
            )}
          </div>
        </div>
      ),
    },
    {
      key: 'price',
      label: 'Price',
      sortable: true,
      type: 'number',
      align: 'right',
      getSortValue: (r) => r.priceInr,
      render: (r) => (
        <span className="font-display font-extrabold text-[#0B1530]">
          {formatInr(r.priceInr)}
        </span>
      ),
    },
    {
      key: 'availability',
      label: 'Availability',
      sortable: true,
      type: 'string',
      getSortValue: (r) => r.availability,
      render: (r) => (
        <span
          className={`inline-flex px-2 py-0.5 rounded-full text-[11px] font-semibold ${
            r.availability === 'Instant'
              ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
              : r.availability === 'Limited'
              ? 'bg-amber-50 text-amber-800 border border-amber-200'
              : 'bg-slate-100 text-slate-700 border border-slate-200'
          }`}
        >
          {r.availability}
        </span>
      ),
    },
    {
      key: 'inclusions',
      label: 'Inclusions',
      sortable: true,
      type: 'number',
      getSortValue: (r) => r.inclusionScore,
      render: (r) => (
        <span className="text-xs text-slate-700 block max-w-[230px]">{r.inclusions}</span>
      ),
    },
    {
      key: 'cancellation',
      label: 'Cancellation',
      sortable: true,
      type: 'number',
      getSortValue: (r) => r.cancellationScore,
      render: (r) => (
        <span
          className={`text-xs font-semibold ${
            r.cancellation.startsWith('Free')
              ? 'text-[#0D9B80]'
              : r.cancellation === 'Partial Refund'
              ? 'text-amber-700'
              : 'text-rose-600'
          }`}
        >
          {r.cancellation}
        </span>
      ),
    },
    {
      key: 'paymentTerms',
      label: 'Payment Terms',
      sortable: true,
      type: 'string',
      getSortValue: (r) => r.paymentTerms,
      render: (r) => <span className="text-xs text-slate-600">{r.paymentTerms}</span>,
    },
    {
      key: 'reliability',
      label: 'Reliability',
      sortable: true,
      type: 'number',
      align: 'right',
      getSortValue: (r) => r.reliability,
      render: (r) => (
        <span className="font-semibold text-[#0B1530]">{r.reliability}%</span>
      ),
    },
    {
      key: 'matchConfidence',
      label: 'Match Conf.',
      sortable: true,
      type: 'number',
      align: 'right',
      getSortValue: (r) => r.matchConfidence,
      render: (r) => (
        <span className="font-bold text-[#0D9B80]">{r.matchConfidence}%</span>
      ),
    },
  ];

  return (
    <div className="space-y-5">
      {/* Three Separate Value Highlight Cards */}
      <section aria-label="Distinct value leaders" className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-2xl border-2 border-[#1677E8]/40 p-4 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-[#1677E8]">
              <Tag className="w-3.5 h-3.5" aria-hidden="true" /> Lowest Headline Price
            </span>
            <DemoBadge label="Demo Data" />
          </div>
          {lowestPriceRow ? (
            <div className="mt-2">
              <p className="font-display font-extrabold text-2xl text-[#0B1530]">
                {formatInr(lowestPriceRow.priceInr)}
              </p>
              <p className="text-xs font-bold text-[#182338] mt-0.5">{lowestPriceRow.supplier}</p>
              <p className="text-[11px] text-[#7C899D] mt-0.5 truncate">
                {lowestPriceRow.product} · {lowestPriceRow.cancellation}
              </p>
            </div>
          ) : (
            <p className="text-xs text-[#7C899D] mt-2">No offers match current filters.</p>
          )}
        </div>

        <div className="bg-white rounded-2xl border-2 border-[#0D9B80]/40 p-4 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-[#0D9B80]">
              <Award className="w-3.5 h-3.5" aria-hidden="true" /> Best Inclusion Package
            </span>
            <span className="text-[11px] font-bold text-[#0D9B80]">
              {bestInclusionRow ? `${bestInclusionRow.inclusionScore}/100` : '—'}
            </span>
          </div>
          {bestInclusionRow ? (
            <div className="mt-2">
              <p className="font-display font-extrabold text-2xl text-[#0B1530]">
                {formatInr(bestInclusionRow.priceInr)}
              </p>
              <p className="text-xs font-bold text-[#182338] mt-0.5">{bestInclusionRow.supplier}</p>
              <p className="text-[11px] text-[#7C899D] mt-0.5 truncate">
                {bestInclusionRow.inclusions}
              </p>
            </div>
          ) : (
            <p className="text-xs text-[#7C899D] mt-2">No offers match current filters.</p>
          )}
        </div>

        <div className="bg-white rounded-2xl border-2 border-[#14B8D4]/50 p-4 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-[#0E7490]">
              <ShieldCheck className="w-3.5 h-3.5" aria-hidden="true" /> Most Flexible Cancellation
            </span>
            <span className="text-[11px] font-bold text-[#0E7490]">
              {mostFlexibleRow?.cancellation ?? '—'}
            </span>
          </div>
          {mostFlexibleRow ? (
            <div className="mt-2">
              <p className="font-display font-extrabold text-2xl text-[#0B1530]">
                {mostFlexibleRow.cancellation}
              </p>
              <p className="text-xs font-bold text-[#182338] mt-0.5">{mostFlexibleRow.supplier}</p>
              <p className="text-[11px] text-[#7C899D] mt-0.5 truncate">
                {mostFlexibleRow.paymentTerms} · {mostFlexibleRow.reliability}% reliability
              </p>
            </div>
          ) : (
            <p className="text-xs text-[#7C899D] mt-2">No offers match current filters.</p>
          )}
        </div>
      </section>

      {/* Filter Bar + Compare Selected CTA */}
      <section className="bg-white rounded-2xl border border-slate-200 p-4 flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2.5 text-xs">
          <select
            aria-label="Filter by product type"
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value as 'All' | 'Sightseeing' | 'Hotel')}
            className="px-3 py-1.5 rounded-lg border border-slate-200 bg-[#F8FAFC] font-medium text-[#0B1530]"
          >
            <option value="All">All Inventory Types</option>
            <option value="Sightseeing">Sightseeing Only</option>
            <option value="Hotel">Hotels Only</option>
          </select>

          <select
            aria-label="Filter by supplier"
            value={supplierFilter}
            onChange={(e) => setSupplierFilter(e.target.value)}
            className="px-3 py-1.5 rounded-lg border border-slate-200 bg-[#F8FAFC] font-medium text-[#0B1530]"
          >
            {suppliers.map((s) => (
              <option key={s} value={s}>
                {s === 'All' ? 'All Suppliers' : s}
              </option>
            ))}
          </select>

          <select
            aria-label="Filter by cancellation policy"
            value={cancellationFilter}
            onChange={(e) => setCancellationFilter(e.target.value)}
            className="px-3 py-1.5 rounded-lg border border-slate-200 bg-[#F8FAFC] font-medium text-[#0B1530]"
          >
            <option value="All">All Cancellation Policies</option>
            <option value="Free (48h)">Free (48h)</option>
            <option value="Free (24h)">Free (24h)</option>
            <option value="Partial Refund">Partial Refund</option>
            <option value="Non-Refundable">Non-Refundable</option>
          </select>

          <select
            aria-label="Filter by availability"
            value={availabilityFilter}
            onChange={(e) => setAvailabilityFilter(e.target.value)}
            className="px-3 py-1.5 rounded-lg border border-slate-200 bg-[#F8FAFC] font-medium text-[#0B1530]"
          >
            <option value="All">All Availability</option>
            <option value="Instant">Instant</option>
            <option value="Limited">Limited</option>
            <option value="On Request">On Request</option>
          </select>
        </div>

        <button
          type="button"
          disabled={selectedRows.length < 2}
          onClick={() => setCompareModalOpen(true)}
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#0B1530] hover:bg-[#101C38] disabled:opacity-40 text-white text-xs font-bold cursor-pointer disabled:cursor-not-allowed"
        >
          <Scale className="w-3.5 h-3.5 text-[#14B8D4]" aria-hidden="true" />
          Compare Selected ({selectedRows.length})
        </button>
      </section>

      {/* Main Sortable Matrix */}
      <SortableTable
        caption="Multi-supplier inventory comparison matrix with price, availability, inclusions, cancellation, payment terms, reliability and match confidence"
        rows={filteredRows}
        getRowId={(r) => r.id}
        columns={columns}
        initialSortKey="price"
        initialSortDir="ascending"
      />

      {/* Side-by-Side Comparison Modal */}
      <ModalDialog
        open={compareModalOpen}
        onClose={() => setCompareModalOpen(false)}
        title={`Side-by-Side Supplier Offer Comparison (${selectedRows.length} Selected)`}
        subtitle="Evaluating headline price alongside inclusions, cancellation risk, payment terms and reliability."
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {selectedRows.map((row) => (
            <div
              key={row.id}
              className="rounded-xl border border-slate-200 bg-[#F8FAFC] p-4 space-y-2.5 text-xs"
            >
              <div className="flex items-center justify-between">
                <span className="font-bold text-[#1677E8]">{row.supplier}</span>
                <span className="font-bold text-[#0D9B80]">{row.matchConfidence}% match</span>
              </div>
              <h3 className="font-display font-bold text-sm text-[#0B1530]">{row.product}</h3>
              <p className="font-display font-extrabold text-2xl text-[#0B1530]">
                {formatInr(row.priceInr)}
              </p>
              <dl className="space-y-1.5 pt-2 border-t border-slate-200">
                <div className="flex justify-between gap-2">
                  <dt className="text-[#7C899D]">Availability</dt>
                  <dd className="font-semibold">{row.availability}</dd>
                </div>
                <div className="flex justify-between gap-2">
                  <dt className="text-[#7C899D]">Cancellation</dt>
                  <dd className="font-semibold">{row.cancellation}</dd>
                </div>
                <div className="flex justify-between gap-2">
                  <dt className="text-[#7C899D]">Payment</dt>
                  <dd className="font-semibold">{row.paymentTerms}</dd>
                </div>
                <div className="flex justify-between gap-2">
                  <dt className="text-[#7C899D]">Reliability</dt>
                  <dd className="font-semibold">{row.reliability}%</dd>
                </div>
              </dl>
              <div className="pt-2 border-t border-slate-200 text-[11px] text-slate-700">
                <strong>Inclusions:</strong> {row.inclusions}
              </div>
            </div>
          ))}
        </div>
      </ModalDialog>
    </div>
  );
}

