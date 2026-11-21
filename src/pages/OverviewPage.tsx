import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  MapPin,
  CheckCircle2,
  XCircle,
  ShieldCheck,
  Sparkles,
  ArrowUpRight,
  SlidersHorizontal,
} from 'lucide-react';
import { OVERVIEW_KPIS } from '../data/overviewData';
import { SIGHTSEEING_PRODUCTS } from '../data/sightseeingData';
import { KpiStrip } from '../components/dashboard/KpiStrip';
import { WorkflowBanner } from '../components/dashboard/WorkflowBanner';
import { SafeImage } from '../components/common/SafeImage';
import { DemoBadge } from '../components/common/DemoBadge';
import { DifferenceMatrixModal } from '../components/sightseeing/DifferenceMatrixModal';
import { formatInr } from '../utils/formatters';

export function OverviewPage() {
  const [selectedId, setSelectedId] = useState(SIGHTSEEING_PRODUCTS[0].id);
  const [diffModalOpen, setDiffModalOpen] = useState(false);

  const featured =
    SIGHTSEEING_PRODUCTS.find((p) => p.id === selectedId) ?? SIGHTSEEING_PRODUCTS[0];

  return (
    <div className="space-y-4">
      {/* Row 1: KPI Cards */}
      <KpiStrip metrics={OVERVIEW_KPIS} />

      {/* Row 2: Horizontal Intelligence Workflow */}
      <WorkflowBanner />

      {/* Row 3: Featured Sightseeing Hero + Right AI Entity Resolution Panel */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-4 items-stretch">
        {/* Left 8 Columns: Featured Sightseeing Card */}
        <section
          aria-label="Featured consolidated sightseeing product"
          className="xl:col-span-8 bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden flex flex-col"
        >
          {/* Dark Navy Product Header Strip */}
          <div className="bg-[#0B1530] text-white px-5 py-3.5 flex flex-wrap items-center justify-between gap-3">
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2 text-[11px]">
                <span className="px-2 py-0.5 rounded bg-[#14B8D4]/20 border border-[#14B8D4]/40 text-[#14B8D4] font-bold uppercase tracking-wider">
                  Sightseeing
                </span>
                <span className="inline-flex items-center gap-1 text-slate-300">
                  <MapPin className="w-3.5 h-3.5 text-[#14B8D4]" aria-hidden="true" />
                  {featured.destination}
                </span>
                <span className="text-slate-500">•</span>
                <span className="text-slate-300">
                  {featured.supplierCount} Supplier Listings Consolidated
                </span>
              </div>
              <h2 className="font-display font-extrabold text-xl sm:text-2xl tracking-tight mt-1">
                {featured.canonicalName}
              </h2>
            </div>

            <div className="flex items-center gap-2.5 shrink-0">
              <div className="bg-[#101C38] border border-white/10 rounded-xl px-3.5 py-1.5 text-right">
                <span className="block text-[9px] font-bold uppercase tracking-wider text-slate-400">
                  Indicative Price Range
                </span>
                <span className="font-display font-extrabold text-base text-[#14B8D4]">
                  {formatInr(featured.priceRangeInr[0])} – {formatInr(featured.priceRangeInr[1])}
                </span>
              </div>
              <span className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-[#0D9B80] text-white text-xs font-bold shadow-sm">
                <CheckCircle2 className="w-3.5 h-3.5" aria-hidden="true" />
                {featured.matchConfidence}% Match
              </span>
            </div>
          </div>

          {/* Large Editorial Travel Photograph */}
          <div className="relative h-[270px] sm:h-[320px] bg-[#101C38] overflow-hidden">
            <SafeImage
              src={featured.image}
              alt={`${featured.canonicalName} in ${featured.destination}`}
              priority
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#0B1530]/80 via-[#0B1530]/25 to-transparent pointer-events-none" />
            <div className="absolute top-3 left-3 flex flex-wrap items-center gap-2">
              <span className="px-2.5 py-1 rounded-full bg-[#0B1530]/80 backdrop-blur-xs text-white text-[11px] font-medium border border-white/15">
                ● Canonical Entity Matched · {featured.category}
              </span>
            </div>
            <div className="absolute bottom-3 inset-x-4 flex flex-wrap items-end justify-between gap-2">
              <p className="text-xs text-white/95 max-w-xl font-medium drop-shadow-xs">
                {featured.inclusionSummary}
              </p>
              <button
                type="button"
                onClick={() => setDiffModalOpen(true)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white text-[#0B1530] hover:bg-[#F3F6FA] text-xs font-bold shadow-md transition-colors cursor-pointer"
              >
                <SlidersHorizontal className="w-3.5 h-3.5 text-[#1677E8]" aria-hidden="true" />
                View Differences
              </button>
            </div>
          </div>

          {/* Horizontal Indian Attraction Showcase Gallery */}
          <div className="px-4 py-3 bg-[#F8FAFC] border-t border-slate-200">
            <div className="flex items-center justify-between gap-2 mb-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#7C899D]">
                Indian Attraction Gallery (Click to inspect canonical group)
              </span>
              <DemoBadge label="Illustrative Demo Data" />
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
              {SIGHTSEEING_PRODUCTS.map((item) => {
                const active = item.id === featured.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setSelectedId(item.id)}
                    className={`group flex items-center gap-2 p-1.5 rounded-xl border text-left transition-all cursor-pointer ${
                      active
                        ? 'bg-[#0B1530] text-white border-[#14B8D4] shadow-sm'
                        : 'bg-white text-[#182338] border-slate-200 hover:border-[#14B8D4]/60'
                    }`}
                  >
                    <div className="w-10 h-10 rounded-lg overflow-hidden shrink-0">
                      <SafeImage src={item.image} alt={item.canonicalName} />
                    </div>
                    <div className="min-w-0">
                      <span
                        className={`block text-[11px] font-bold truncate ${
                          active ? 'text-white' : 'text-[#0B1530]'
                        }`}
                      >
                        {item.canonicalName
                          .replace(' Sunrise Tour', '')
                          .replace(' Heritage Walk', '')
                          .replace(' Mandovi Sunset Cruise', ' Sunset')
                          .replace(' & Elephanta Tour', '')
                          .replace(' & Amber Fort Tour', '')
                          .replace(' Houseboat Cruise', '')}
                      </span>
                      <span
                        className={`block text-[10px] truncate ${
                          active ? 'text-[#14B8D4]' : 'text-[#7C899D]'
                        }`}
                      >
                        {item.destination.split(',')[0]}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </section>

        {/* Right 4 Columns: AI Intelligence Panel */}
        <aside
          aria-label="Entity resolution intelligence"
          className="xl:col-span-4 bg-white rounded-2xl border border-slate-200 shadow-xs p-5 flex flex-col justify-between gap-4"
        >
          <div className="space-y-4">
            {/* Score Header */}
            <div className="text-center pb-3 border-b border-slate-100">
              <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#7C899D]">
                Entity Resolution Score
              </p>
              <div className="flex items-baseline justify-center gap-2 mt-1">
                <span className="text-4xl font-display font-extrabold text-[#0D9B80]">
                  {featured.matchConfidence}%
                </span>
                <span className="text-xs font-semibold text-[#7C899D]">
                  Illustrative Match Confidence
                </span>
              </div>
            </div>

            {/* Confidence Guarantee Banner */}
            <div className="rounded-xl bg-gradient-to-r from-[#0D9B80] to-[#0E8BA3] text-white p-3.5 text-center shadow-xs">
              <div className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-white/90">
                <ShieldCheck className="w-3.5 h-3.5" aria-hidden="true" />
                Confidence Guarantee
              </div>
              <p className="font-display font-bold text-sm mt-1">
                &ldquo;Equivalent Entity — Differences Preserved&rdquo;
              </p>
              <p className="text-[11px] text-white/85 mt-0.5">
                Same underlying attraction grouped without erasing distinct bookable inclusions.
              </p>
            </div>

            {/* Key Insights */}
            <div>
              <h3 className="text-[11px] font-bold uppercase tracking-wider text-[#0B1530] flex items-center gap-1.5 mb-2.5">
                <Sparkles className="w-3.5 h-3.5 text-[#14B8D4]" aria-hidden="true" />
                Key Insights
              </h3>
              <dl className="divide-y divide-slate-100 text-xs">
                {featured.keyInsights.map((insight) => (
                  <div
                    key={insight.label}
                    className="py-2 flex items-center justify-between gap-2"
                  >
                    <dt className="text-[#7C899D]">{insight.label}</dt>
                    <dd
                      className={`font-semibold text-right ${
                        insight.highlight === 'teal'
                          ? 'text-[#0D9B80]'
                          : insight.highlight === 'amber'
                          ? 'text-amber-700'
                          : 'text-[#0B1530]'
                      }`}
                    >
                      {insight.value}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>

          {/* Dark Navy Automated Resolution Checklist */}
          <div className="rounded-xl bg-[#0B1530] text-white p-3.5 space-y-2">
            <p className="text-[10px] font-bold uppercase tracking-wider text-[#14B8D4]">
              Automated Resolution Checks
            </p>
            <ul className="space-y-1.5 text-xs text-slate-200">
              {featured.resolutionChecks.map((check) => (
                <li key={check} className="flex items-start gap-2">
                  <CheckCircle2
                    className="w-3.5 h-3.5 text-[#0D9B80] shrink-0 mt-0.5"
                    aria-hidden="true"
                  />
                  <span>{check}</span>
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </div>

      {/* Row 4: Supplier Comparison Matrix Preview (Differences Preserved) */}
      <section
        aria-label="Supplier offer differences preview"
        className="bg-white rounded-2xl border border-slate-200 shadow-xs p-5"
      >
        <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
          <div>
            <h2 className="font-display font-bold text-sm uppercase tracking-wider text-[#0B1530]">
              Supplier Comparison Matrix (Differences Preserved)
            </h2>
            <p className="text-xs text-[#7C899D] mt-0.5">
              {featured.offers.length} synthetic supplier listings reconciled for{' '}
              <strong className="text-[#182338]">{featured.canonicalName}</strong>
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setDiffModalOpen(true)}
              className="px-3 py-1.5 rounded-lg bg-[#F3F6FA] hover:bg-slate-200/70 border border-slate-200 text-xs font-semibold text-[#0B1530] cursor-pointer"
            >
              Inspect Full Matrix
            </button>
            <Link
              to="/suppliers"
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-[#1677E8] hover:bg-[#1365C7] text-white text-xs font-semibold"
            >
              All Suppliers <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {featured.offers.map((offer) => {
            const isLowest = offer.badge === 'Lowest Price';
            const isFull = offer.badge === 'Full Inclusions';
            return (
              <div
                key={offer.id}
                className={`rounded-xl p-4 border transition-all flex flex-col justify-between ${
                  isLowest
                    ? 'border-[#1677E8] bg-[#1677E8]/[0.02] ring-1 ring-[#1677E8]/20'
                    : isFull
                    ? 'border-[#0D9B80]/50 bg-[#0D9B80]/[0.02]'
                    : 'border-slate-200 bg-white'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-[#7C899D]">
                      {offer.supplierName.split('—')[0].trim()}
                    </span>
                    <span
                      className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                        isLowest
                          ? 'bg-[#1677E8] text-white'
                          : isFull
                          ? 'bg-[#0D9B80] text-white'
                          : 'bg-slate-100 text-[#0B1530]'
                      }`}
                    >
                      {offer.badge}
                    </span>
                  </div>
                  <h3 className="font-display font-bold text-sm text-[#0B1530] mt-1">
                    {offer.supplierName.split('—')[1]?.trim()}
                  </h3>

                  <div className="flex items-baseline justify-between mt-3 pb-3 border-b border-slate-100">
                    <span className="text-2xl font-display font-extrabold text-[#0B1530]">
                      {formatInr(offer.priceInr)}
                    </span>
                    <span className="text-[11px] font-medium text-[#7C899D]">
                      {offer.duration}
                    </span>
                  </div>

                  <ul className="mt-3 space-y-1.5 text-xs">
                    <li className="flex items-center gap-2 text-slate-700">
                      {offer.transferAvailable ? (
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#0D9B80] shrink-0" aria-hidden="true" />
                      ) : (
                        <XCircle className="w-3.5 h-3.5 text-rose-400 shrink-0" aria-hidden="true" />
                      )}
                      <span>
                        {offer.transferAvailable ? 'Hotel Transfer Included' : 'Hotel Transfer Not Included'}
                      </span>
                    </li>
                    <li className="flex items-center gap-2 text-slate-700">
                      {offer.mealAvailable ? (
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#0D9B80] shrink-0" aria-hidden="true" />
                      ) : (
                        <XCircle className="w-3.5 h-3.5 text-rose-400 shrink-0" aria-hidden="true" />
                      )}
                      <span>
                        {offer.mealAvailable ? `Meal: ${offer.mealDetails}` : 'Meals Not Included'}
                      </span>
                    </li>
                    <li className="text-[11px] text-[#7C899D] pt-1">
                      <strong>Includes:</strong> {offer.inclusions.slice(0, 2).join(', ')}
                    </li>
                  </ul>
                </div>

                <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-[11px]">
                  <span className="text-[#7C899D]">{offer.cancellationPolicy}</span>
                  <span className="font-semibold text-[#0D9B80]">
                    {offer.reliabilityScore}% trust
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <DifferenceMatrixModal
        product={featured}
        open={diffModalOpen}
        onClose={() => setDiffModalOpen(false)}
      />
    </div>
  );
}

