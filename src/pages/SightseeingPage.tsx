import { useMemo, useState } from 'react';
import {
  MapPin,
  Search,
  SlidersHorizontal,
  CheckCircle2,
  XCircle,
  Clock,
  ShieldCheck,
} from 'lucide-react';
import { SIGHTSEEING_PRODUCTS } from '../data/sightseeingData';
import { SafeImage } from '../components/common/SafeImage';
import { DemoBadge } from '../components/common/DemoBadge';
import { DifferenceMatrixModal } from '../components/sightseeing/DifferenceMatrixModal';
import { formatInr } from '../utils/formatters';

export function SightseeingPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [destinationFilter, setDestinationFilter] = useState('All');
  const [selectedId, setSelectedId] = useState(SIGHTSEEING_PRODUCTS[0].id);
  const [diffOpen, setDiffOpen] = useState(false);

  const destinations = useMemo(
    () => ['All', ...Array.from(new Set(SIGHTSEEING_PRODUCTS.map((p) => p.destination.split(',')[0])))],
    []
  );

  const filteredProducts = useMemo(() => {
    return SIGHTSEEING_PRODUCTS.filter((p) => {
      const matchesDest =
        destinationFilter === 'All' || p.destination.startsWith(destinationFilter);
      const q = searchQuery.trim().toLowerCase();
      const matchesQuery =
        !q ||
        p.canonicalName.toLowerCase().includes(q) ||
        p.destination.toLowerCase().includes(q) ||
        p.inclusionSummary.toLowerCase().includes(q);
      return matchesDest && matchesQuery;
    });
  }, [searchQuery, destinationFilter]);

  const activeProduct =
    filteredProducts.find((p) => p.id === selectedId) ??
    filteredProducts[0] ??
    SIGHTSEEING_PRODUCTS[0];

  return (
    <div className="space-y-5">
      {/* Filter Toolbar */}
      <div className="bg-white rounded-xl border border-slate-200 p-4 flex flex-col lg:flex-row lg:items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2">
          <div className="relative min-w-[230px] flex-1 sm:flex-initial">
            <Search className="w-4 h-4 text-[#7C899D] absolute left-3 top-1/2 -translate-y-1/2" aria-hidden="true" />
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search attraction or inclusion..."
              aria-label="Search sightseeing inventory"
              className="w-full pl-9 pr-3 py-1.5 text-xs rounded-lg border border-slate-200 bg-[#F8FAFC] focus:outline-none focus:border-[#14B8D4]"
            />
          </div>
          <div className="flex flex-wrap items-center gap-1.5">
            {destinations.map((dest) => (
              <button
                key={dest}
                type="button"
                onClick={() => setDestinationFilter(dest)}
                className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                  destinationFilter === dest
                    ? 'bg-[#0B1530] text-white'
                    : 'bg-[#F3F6FA] text-[#475569] hover:bg-slate-200/70'
                }`}
              >
                {dest}
              </button>
            ))}
          </div>
        </div>
        <DemoBadge label="All Sightseeing Records Are Synthetic Demo Data" />
      </div>

      {/* Visual Sightseeing Image Cards */}
      <section aria-label="Sightseeing product catalog" className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {filteredProducts.map((product) => {
          const isSelected = product.id === activeProduct.id;
          return (
            <article
              key={product.id}
              className={`bg-white rounded-2xl overflow-hidden border transition-all flex flex-col ${
                isSelected
                  ? 'border-[#14B8D4] ring-2 ring-[#14B8D4]/25 shadow-md'
                  : 'border-slate-200 shadow-xs hover:border-slate-300'
              }`}
            >
              <div className="relative h-44 bg-[#101C38]">
                <SafeImage src={product.image} alt={product.canonicalName} />
                <div className="absolute top-2.5 left-2.5 px-2.5 py-0.5 rounded-full bg-[#0B1530]/80 text-white text-[10px] font-semibold backdrop-blur-xs">
                  {product.category}
                </div>
                <div className="absolute top-2.5 right-2.5 px-2.5 py-0.5 rounded-full bg-[#0D9B80] text-white text-[11px] font-bold">
                  {product.matchConfidence}% Match
                </div>
              </div>

              <div className="p-4 flex-1 flex flex-col justify-between gap-3">
                <div>
                  <div className="flex items-center justify-between gap-2 text-xs text-[#7C899D]">
                    <span className="inline-flex items-center gap-1 font-medium">
                      <MapPin className="w-3.5 h-3.5 text-[#14B8D4]" aria-hidden="true" />
                      {product.destination}
                    </span>
                    <span className="font-semibold text-[#1677E8]">
                      {product.supplierCount} Suppliers
                    </span>
                  </div>
                  <h2 className="font-display font-bold text-base text-[#0B1530] mt-1">
                    {product.canonicalName}
                  </h2>
                  <p className="text-xs text-[#7C899D] mt-1 leading-relaxed">
                    {product.inclusionSummary}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                  <div>
                    <span className="block text-[10px] uppercase tracking-wider text-[#7C899D] font-semibold">
                      Indicative From
                    </span>
                    <span className="font-display font-extrabold text-lg text-[#0B1530]">
                      {formatInr(product.priceRangeInr[0])}
                      <span className="text-xs font-normal text-[#7C899D]">
                        {' '}– {formatInr(product.priceRangeInr[1])}
                      </span>
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <button
                      type="button"
                      onClick={() => setSelectedId(product.id)}
                      className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold cursor-pointer transition-colors ${
                        isSelected
                          ? 'bg-[#0B1530] text-white'
                          : 'bg-[#F3F6FA] hover:bg-slate-200 text-[#0B1530]'
                      }`}
                    >
                      {isSelected ? 'Selected' : 'Compare'}
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedId(product.id);
                        setDiffOpen(true);
                      }}
                      className="px-2.5 py-1.5 rounded-lg bg-[#1677E8] hover:bg-[#1365C7] text-white text-xs font-semibold cursor-pointer"
                    >
                      View Differences
                    </button>
                  </div>
                </div>
              </div>
            </article>
          );
        })}
      </section>

      {/* Active Product Detail Comparison Panel */}
      <section
        aria-label="Selected sightseeing supplier comparison"
        className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden"
      >
        <div className="bg-[#0B1530] text-white px-5 py-4 flex flex-wrap items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#14B8D4]">
                Product Detail Comparison Panel
              </span>
              <span className="text-slate-500">•</span>
              <span className="text-xs text-slate-300">{activeProduct.destination}</span>
            </div>
            <h2 className="font-display font-extrabold text-xl mt-0.5">
              {activeProduct.canonicalName}
            </h2>
            <p className="text-xs text-slate-300 mt-0.5 max-w-3xl">
              {activeProduct.sharedAttractionNote}
            </p>
          </div>
          <button
            type="button"
            onClick={() => setDiffOpen(true)}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#14B8D4] hover:bg-[#11A3BC] text-[#0B1530] text-xs font-extrabold cursor-pointer"
          >
            <SlidersHorizontal className="w-4 h-4" aria-hidden="true" />
            View Differences Matrix
          </button>
        </div>

        <div className="p-5 grid grid-cols-1 lg:grid-cols-3 gap-4">
          {activeProduct.offers.map((offer) => (
            <div
              key={offer.id}
              className="rounded-xl border border-slate-200 bg-[#F8FAFC]/60 p-4 flex flex-col justify-between gap-3"
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-[#0B1530] text-[#14B8D4]">
                      {offer.badge}
                    </span>
                    <h3 className="font-display font-bold text-sm text-[#0B1530] mt-1.5">
                      {offer.supplierName}
                    </h3>
                    <p className="text-[11px] text-[#7C899D]">{offer.supplierTier}</p>
                  </div>
                  <div className="text-right">
                    <span className="font-display font-extrabold text-2xl text-[#0B1530]">
                      {formatInr(offer.priceInr)}
                    </span>
                    <span className="block text-[10px] text-[#7C899D]">Synthetic Demo</span>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-2 text-xs">
                  <span className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-white border border-slate-200 font-medium text-[#182338]">
                    <Clock className="w-3.5 h-3.5 text-[#1677E8]" aria-hidden="true" />
                    {offer.duration}
                  </span>
                  <span className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-white border border-slate-200 font-medium text-[#182338]">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#0D9B80]" aria-hidden="true" />
                    {offer.accessType}
                  </span>
                </div>

                <div className="space-y-1.5 text-xs">
                  <p className="font-semibold text-[#0B1530]">Inclusions</p>
                  <ul className="space-y-1">
                    {offer.inclusions.map((inc) => (
                      <li key={inc} className="flex items-start gap-1.5 text-slate-700">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#0D9B80] shrink-0 mt-0.5" aria-hidden="true" />
                        <span>{inc}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="space-y-1.5 text-xs">
                  <p className="font-semibold text-[#0B1530]">Exclusions</p>
                  <ul className="space-y-1">
                    {offer.exclusions.map((exc) => (
                      <li key={exc} className="flex items-start gap-1.5 text-slate-500">
                        <XCircle className="w-3.5 h-3.5 text-rose-400 shrink-0 mt-0.5" aria-hidden="true" />
                        <span>{exc}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-200 text-[11px] space-y-1">
                <p className="text-slate-600">
                  <strong>Transfer:</strong> {offer.transferDetails}
                </p>
                <p className="text-slate-600">
                  <strong>Meals:</strong> {offer.mealDetails}
                </p>
                <p className="text-slate-600">
                  <strong>Cancellation:</strong> {offer.cancellationPolicy}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <DifferenceMatrixModal
        product={activeProduct}
        open={diffOpen}
        onClose={() => setDiffOpen(false)}
      />
    </div>
  );
}

