import { useMemo, useState } from 'react';
import { CheckCircle2, Wrench, Search } from 'lucide-react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from 'recharts';
import { QUALITY_ISSUES, QUALITY_SCORECARDS } from '../data/qualityData';
import { QualityIssue } from '../types/inventory';
import { SortableColumn, SortableTable } from '../components/tables/SortableTable';
import { DemoBadge } from '../components/common/DemoBadge';

export function ContentQualityPage() {
  const [issues, setIssues] = useState<QualityIssue[]>(QUALITY_ISSUES);
  const [typeFilter, setTypeFilter] = useState('All');
  const [severityFilter, setSeverityFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [resolvedIds, setResolvedIds] = useState<string[]>([]);

  const issueTypes = useMemo(
    () => ['All', ...Array.from(new Set(QUALITY_ISSUES.map((i) => i.issueType)))],
    []
  );

  const filteredIssues = useMemo(() => {
    return issues.filter((item) => {
      if (typeFilter !== 'All' && item.issueType !== typeFilter) return false;
      if (severityFilter !== 'All' && item.severity !== severityFilter) return false;
      const q = searchQuery.trim().toLowerCase();
      if (
        q &&
        !item.productName.toLowerCase().includes(q) &&
        !item.supplier.toLowerCase().includes(q) &&
        !item.sku.toLowerCase().includes(q)
      ) {
        return false;
      }
      return true;
    });
  }, [issues, typeFilter, severityFilter, searchQuery]);

  const chartData = useMemo(() => {
    const counts = new Map<string, number>();
    for (const i of issues) {
      if (resolvedIds.includes(i.id)) continue;
      counts.set(i.issueType, (counts.get(i.issueType) ?? 0) + i.affectedListings);
    }
    return Array.from(counts.entries()).map(([name, affected]) => ({
      name: name.replace('Missing ', 'No ').replace('Inconsistent ', 'Inconsist. '),
      affected,
    }));
  }, [issues, resolvedIds]);

  const handleResolveIssue = (id: string) => {
    setResolvedIds((prev) => (prev.includes(id) ? prev : [...prev, id]));
  };

  const handleResetDemo = () => {
    setResolvedIds([]);
    setIssues(QUALITY_ISSUES);
  };

  const columns: SortableColumn<QualityIssue>[] = [
    {
      key: 'sku',
      label: 'SKU / Product',
      sortable: true,
      type: 'string',
      getSortValue: (r) => r.productName,
      render: (r) => (
        <div>
          <span className="font-mono text-[11px] font-bold text-[#1677E8]">{r.sku}</span>
          <span className="block font-semibold text-xs text-[#0B1530]">{r.productName}</span>
          <span className="text-[11px] text-[#7C899D]">
            {r.supplier} · {r.destination}
          </span>
        </div>
      ),
    },
    {
      key: 'issueType',
      label: 'Issue Type',
      sortable: true,
      type: 'string',
      getSortValue: (r) => r.issueType,
      render: (r) => (
        <span className="px-2 py-0.5 rounded bg-[#F3F6FA] border border-slate-200 text-xs font-semibold text-[#0B1530] whitespace-nowrap">
          {r.issueType}
        </span>
      ),
    },
    {
      key: 'severity',
      label: 'Severity',
      sortable: true,
      type: 'string',
      getSortValue: (r) => r.severity,
      render: (r) => {
        const cls =
          r.severity === 'Critical'
            ? 'bg-rose-50 text-rose-700 border-rose-200'
            : r.severity === 'High'
            ? 'bg-amber-50 text-amber-800 border-amber-200'
            : r.severity === 'Medium'
            ? 'bg-blue-50 text-blue-700 border-blue-200'
            : 'bg-slate-100 text-slate-700 border-slate-200';
        return (
          <span className={`inline-flex px-2 py-0.5 rounded-full text-[11px] font-bold border ${cls}`}>
            {r.severity}
          </span>
        );
      },
    },
    {
      key: 'affected',
      label: 'Listings',
      sortable: true,
      type: 'number',
      align: 'right',
      getSortValue: (r) => r.affectedListings,
      render: (r) => <span className="font-bold text-[#0B1530]">{r.affectedListings}</span>,
    },
    {
      key: 'action',
      label: 'Recommended Remediation',
      render: (r) => (
        <span className="text-xs text-slate-600 block max-w-[260px]">{r.suggestedAction}</span>
      ),
    },
    {
      key: 'status',
      label: 'Action',
      align: 'right',
      render: (r) => {
        const isDone = resolvedIds.includes(r.id);
        return isDone ? (
          <span className="inline-flex items-center gap-1 text-xs font-bold text-[#0D9B80]">
            <CheckCircle2 className="w-3.5 h-3.5" aria-hidden="true" /> Remediated
          </span>
        ) : (
          <button
            type="button"
            onClick={() => handleResolveIssue(r.id)}
            className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-[#0B1530] hover:bg-[#1677E8] text-white text-[11px] font-semibold transition-colors cursor-pointer whitespace-nowrap"
          >
            <Wrench className="w-3 h-3" aria-hidden="true" />
            {r.status === 'Auto-Fix Ready' ? 'Run Auto-Fix' : 'Mark Resolved'}
          </button>
        );
      },
    },
  ];

  return (
    <div className="space-y-5">
      {/* Quality Scorecards */}
      <section aria-label="Content quality scorecards" className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {QUALITY_SCORECARDS.map((card, idx) => (
          <div
            key={card.label}
            className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs flex flex-col justify-between"
          >
            <div className="flex items-center justify-between gap-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#7C899D]">
                {card.label}
              </span>
              <DemoBadge label="Demo" />
            </div>
            <p className="font-display font-extrabold text-3xl text-[#0B1530] mt-2">
              {idx === 3 ? Math.max(0, 142 - resolvedIds.length * 14) : card.score}
            </p>
            <p className="text-xs text-[#7C899D] mt-1">{card.sub}</p>
          </div>
        ))}
      </section>

      {/* Breakdown Chart + Filter Controls */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-4">
        <div className="xl:col-span-5 bg-white rounded-2xl border border-slate-200 p-5">
          <div className="flex items-center justify-between mb-3">
            <div>
              <h2 className="font-display font-bold text-sm text-[#0B1530]">
                Affected Demo Listings by Issue Type
              </h2>
              <p className="text-xs text-[#7C899D]">Updates live when remediation actions run</p>
            </div>
          </div>
          <div className="h-56 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} layout="vertical" margin={{ left: 12, right: 16 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                <XAxis type="number" tick={{ fontSize: 11 }} />
                <YAxis dataKey="name" type="category" width={125} tick={{ fontSize: 10 }} />
                <Tooltip />
                <Bar dataKey="affected" name="Affected Listings" fill="#14B8D4" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="xl:col-span-7 bg-white rounded-2xl border border-slate-200 p-5 flex flex-col justify-between gap-4">
          <div className="space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div>
                <h2 className="font-display font-bold text-sm text-[#0B1530]">
                  Automated Catalog Hygiene Checks
                </h2>
                <p className="text-xs text-[#7C899D]">
                  Monitors missing descriptions, duplicate photography, invalid room mappings, and cancellation policy omissions.
                </p>
              </div>
              {resolvedIds.length > 0 && (
                <button
                  type="button"
                  onClick={handleResetDemo}
                  className="px-3 py-1 rounded-lg bg-[#F3F6FA] hover:bg-slate-200 text-xs font-semibold text-[#0B1530] cursor-pointer"
                >
                  Restore Demo Alerts ({resolvedIds.length} fixed)
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-xs">
              <div className="relative">
                <Search className="w-3.5 h-3.5 text-[#7C899D] absolute left-3 top-1/2 -translate-y-1/2" aria-hidden="true" />
                <input
                  type="search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search SKU or supplier..."
                  aria-label="Search quality issues"
                  className="w-full pl-8 pr-3 py-2 rounded-lg border border-slate-200 bg-[#F8FAFC]"
                />
              </div>

              <select
                aria-label="Filter by issue type"
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
                className="px-3 py-2 rounded-lg border border-slate-200 bg-[#F8FAFC] font-medium"
              >
                {issueTypes.map((t) => (
                  <option key={t} value={t}>
                    {t === 'All' ? 'All Issue Types' : t}
                  </option>
                ))}
              </select>

              <select
                aria-label="Filter by severity"
                value={severityFilter}
                onChange={(e) => setSeverityFilter(e.target.value)}
                className="px-3 py-2 rounded-lg border border-slate-200 bg-[#F8FAFC] font-medium"
              >
                <option value="All">All Severities</option>
                <option value="Critical">Critical</option>
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-xs">
            {(['Critical', 'High', 'Medium', 'Low'] as const).map((sev) => {
              const count = issues.filter(
                (i) => i.severity === sev && !resolvedIds.includes(i.id)
              ).length;
              return (
                <button
                  key={sev}
                  type="button"
                  onClick={() => setSeverityFilter(severityFilter === sev ? 'All' : sev)}
                  className={`p-3 rounded-xl border text-left cursor-pointer transition-colors ${
                    severityFilter === sev
                      ? 'bg-[#0B1530] text-white border-[#14B8D4]'
                      : 'bg-[#F8FAFC] border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <span className="block text-[10px] font-bold uppercase opacity-75">{sev}</span>
                  <span className="font-display font-extrabold text-xl mt-0.5 block">{count}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Issue Table */}
      <SortableTable
        caption="Inventory content quality issues table with filtering and remediation"
        rows={filteredIssues}
        getRowId={(r) => r.id}
        columns={columns}
        initialSortKey="affected"
        initialSortDir="descending"
      />
    </div>
  );
}

