import { useMemo, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import {
  MapPin,
  Clock,
  CheckCircle2,
  SlidersHorizontal,
  Star,
  ShieldCheck,
  Search,
  RotateCcw,
} from 'lucide-react';
import { SIGHTSEEING_PRODUCTS } from '../data/sightseeingData';
import { SightseeingProduct } from '../types/inventory';
import { SafeImage } from '../components/common/SafeImage';
import { DemoBadge } from '../components/common/DemoBadge';
import { OfferComparisonModal } from '../components/sightseeing/OfferComparisonModal';
import { DifferenceMatrixModal } from '../components/sightseeing/DifferenceMatrixModal';
import { useTrips } from '../context/TripContext';
import { formatInr } from '../utils/formatters';

export function SightseeingSearchPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { addTripItem } = useTrips();

  const initialDest = searchParams.get('destination') ?? 'All';
  const initialQuery = searchParams.get('q') ?? '';

  const [destination, setDestination] = useState(initialDest);
  const [query, setQuery] = useState(initialQuery);
  const [maxPrice, setMaxPrice] = useState(5000);
  const [durationFilter, setDurationFilter] = useState<'All' | 'Short' | 'HalfDay' | 'FullDay'>('All');
  const [tourType, setTourType] = useState('All');
  const [pickupOnly, setPickupOnly] = useState(false);
  const [guideOnly, setGuideOnly] = useState(false);
  const [mealsOnly, setMealsOnly] = useState(false);
  const [freeCancelOnly, setFreeCancelOnly] = useState(false);
  const [supplierFilter, setSupplierFilter] = useState('All');
  const [minRating, setMinRating] = useState(0);

  const [compareModalProduct, setCompareModalProduct] = useState<SightseeingProduct | null>(null);
  const [inclusionsModalProduct, setInclusionsModalProduct] = useState<SightseeingProduct | null>(null);

  const destinations = useMemo(
    () => ['All', 'Agra', 'Delhi', 'Goa', 'Mumbai', 'Jaipur', 'Kerala'],
    []
  );

  const categories = useMemo(
    () => ['All', ...Array.from(new Set(SIGHTSEEING_PRODUCTS.map((p) => p.category)))],
    []
  );

  const suppliers = useMemo(() => {
    const set = new Set<string>();
    SIGHTSEEING_PRODUCTS.forEach((p) =>
      p.offers.forEach((o) => set.add(o.supplierName.split('—')[1]?.trim() ?? o.supplierName))
    );
    return ['All', ...Array.from(set)];
  }, []);

  const filteredProducts = useMemo(() => {
    return SIGHTSEEING_PRODUCTS.filter((p) => {
      if (
        destination !== 'All' &&
        !p.destination.toLowerCase().includes(destination.toLowerCase()) &&
        !p.state.toLowerCase().includes(destination.toLowerCase())
      ) {
        return false;
      }

      const q = query.trim().toLowerCase();
      if (
        q &&
        !p.canonicalName.toLowerCase().includes(q) &&
        !p.destination.toLowerCase().includes(q) &&
        !p.inclusionSummary.toLowerCase().includes(q)
      ) {
        return false;
      }

      if (tourType !== 'All' && p.category !== tourType) return false;
      if (p.priceRangeInr[0] > maxPrice) return false;

      const anyMatchingOffer = p.offers.some((o) => {
        if (o.priceInr > maxPrice) return false;
        if (pickupOnly && !o.transferAvailable) return false;
        if (mealsOnly && !o.mealAvailable) return false;
        if (
          guideOnly &&
          !o.inclusions.join(' ').toLowerCase().includes('guide') &&
          !o.inclusions.join(' ').toLowerCase().includes('historian')
        ) {
          return false;
        }
        if (freeCancelOnly && !o.cancellationPolicy.toLowerCase().includes('free')) {
          return false;
        }
        if (
          supplierFilter !== 'All' &&
          !o.supplierName.toLowerCase().includes(supplierFilter.toLowerCase())
        ) {
          return false;
        }
        if (durationFilter !== 'All') {
          const hrs = parseFloat(o.duration) || 3;
          if (durationFilter === 'Short' && hrs > 2.5) return false;
          if (durationFilter === 'HalfDay' && (hrs < 2.5 || hrs > 5)) return false;
          if (durationFilter === 'FullDay' && hrs < 5) return false;
        }
        return true;
      });

      if (!anyMatchingOffer) return false;
      const illustrativeRating = p.matchConfidence >= 95 ? 4.8 : 4.6;
      if (illustrativeRating < minRating) return false;

      return true;
    });
  }, [
    destination,
    query,
    maxPrice,
    durationFilter,
    tourType,
    pickupOnly,
    guideOnly,
    mealsOnly,
    freeCancelOnly,
    supplierFilter,
    minRating,
  ]);

  const resetFilters = () => {
    setDestination('All');
    setQuery('');
    setMaxPrice(5000);
    setDurationFilter('All');
    setTourType('All');
    setPickupOnly(false);
    setGuideOnly(false);
    setMealsOnly(false);
    setFreeCancelOnly(false);
    setSupplierFilter('All');
    setMinRating(0);
    setSearchParams({});
  };

  const headingLabel =
    destination !== 'All'
      ? `Explore Experiences in ${destination}`
      : 'Explore Experiences in Agra & Across India';

  return (
    <div className="max-w-[1380px] mx-auto px-4 sm:px-6 py-8 space-y-6">
      {/* Page Header */}
      <div className="bg-[#101C35] text-white rounded-2xl p-6 flex flex-wrap items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-[#19C5D8]">
            Sightseeing Experience Marketplace
          </span>
          <h1 className="font-display font-extrabold text-2xl sm:text-3xl mt-1">
            {headingLabel}
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 mt-1">
            Shared attractions consolidated across suppliers while preserving ticket, guide, pickup, meal, and cancellation differences.
          </p>
        </div>
        <DemoBadge variant="dark" label="Illustrative Demo Rates" />
      </div>

      {/* Main Split: Left Filters + Experience Marketplace Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Filter Panel */}
        <aside
          aria-label="Filter sightseeing experiences"
          className="lg:col-span-3 bg-white rounded-2xl border border-slate-200 p-5 space-y-5 lg:sticky lg:top-[86px]"
        >
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h2 className="font-display font-bold text-sm text-[#101C35] flex items-center gap-2">
              <SlidersHorizontal className="w-4 h-4 text-[#1677FF]" aria-hidden="true" />
              Filter Experiences
            </h2>
            <button
              type="button"
              onClick={resetFilters}
              className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#1677FF] hover:underline cursor-pointer"
            >
              <RotateCcw className="w-3 h-3" aria-hidden="true" /> Reset
            </button>
          </div>

          {/* Search */}
          <div>
            <label htmlFor="exp-search" className="block text-xs font-bold text-[#101C35] mb-1.5">
              Search Attraction
            </label>
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-[#748198] absolute left-3 top-1/2 -translate-y-1/2" aria-hidden="true" />
              <input
                id="exp-search"
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Taj Mahal, Sunset..."
                className="w-full pl-8 pr-3 py-2 rounded-xl border border-slate-200 bg-[#F7F9FC] text-xs"
              />
            </div>
          </div>

          {/* Destination */}
          <div>
            <label htmlFor="exp-dest" className="block text-xs font-bold text-[#101C35] mb-1.5">
              Destination
            </label>
            <select
              id="exp-dest"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-[#F7F9FC] text-xs font-semibold"
            >
              {destinations.map((d) => (
                <option key={d} value={d}>
                  {d === 'All' ? 'All India Hubs' : d}
                </option>
              ))}
            </select>
          </div>

          {/* Price Range */}
          <div>
            <div className="flex items-center justify-between text-xs mb-1">
              <label htmlFor="exp-price" className="font-bold text-[#101C35]">
                Max Price
              </label>
              <span className="font-bold text-[#1677FF]">{formatInr(maxPrice)}</span>
            </div>
            <input
              id="exp-price"
              type="range"
              min={1000}
              max={5000}
              step={200}
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="tiq-slider w-full"
            />
          </div>

          {/* Duration */}
          <div>
            <span className="block text-xs font-bold text-[#101C35] mb-1.5">Duration</span>
            <div className="grid grid-cols-2 gap-1.5 text-[11px]">
              {(
                [
                  ['All', 'Any'],
                  ['Short', 'Up to 2.5h'],
                  ['HalfDay', '3–5 hrs'],
                  ['FullDay', '5+ hrs'],
                ] as const
              ).map(([val, label]) => (
                <button
                  key={val}
                  type="button"
                  onClick={() => setDurationFilter(val)}
                  className={`py-1.5 px-2 rounded-lg font-semibold border cursor-pointer ${
                    durationFilter === val
                      ? 'bg-[#101C35] text-white border-[#101C35]'
                      : 'bg-[#F7F9FC] text-slate-600 border-slate-200'
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          {/* Tour Type */}
          <div>
            <label htmlFor="exp-type" className="block text-xs font-bold text-[#101C35] mb-1.5">
              Tour Type
            </label>
            <select
              id="exp-type"
              value={tourType}
              onChange={(e) => setTourType(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-[#F7F9FC] text-xs font-semibold"
            >
              {categories.map((c) => (
                <option key={c} value={c}>
                  {c === 'All' ? 'All Categories' : c}
                </option>
              ))}
            </select>
          </div>

          {/* Inclusions & Policy Checkboxes */}
          <div className="space-y-2 text-xs">
            <span className="block font-bold text-[#101C35]">Inclusions & Flexibility</span>
            {[
              { label: 'Hotel Pickup Included', checked: pickupOnly, set: setPickupOnly },
              { label: 'Professional Guide Included', checked: guideOnly, set: setGuideOnly },
              { label: 'Meals Included', checked: mealsOnly, set: setMealsOnly },
              { label: 'Free Cancellation Available', checked: freeCancelOnly, set: setFreeCancelOnly },
            ].map((opt) => (
              <label key={opt.label} className="flex items-center gap-2 cursor-pointer text-slate-700">
                <input
                  type="checkbox"
                  checked={opt.checked}
                  onChange={(e) => opt.set(e.target.checked)}
                  className="rounded border-slate-300 text-[#1677FF] focus:ring-[#1677FF]"
                />
                <span>{opt.label}</span>
              </label>
            ))}
          </div>

          {/* Supplier Filter */}
          <div>
            <label htmlFor="exp-sup" className="block text-xs font-bold text-[#101C35] mb-1.5">
              Supplier
            </label>
            <select
              id="exp-sup"
              value={supplierFilter}
              onChange={(e) => setSupplierFilter(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-[#F7F9FC] text-xs font-semibold"
            >
              {suppliers.map((s) => (
                <option key={s} value={s}>
                  {s === 'All' ? 'All 24 Demo Suppliers' : s}
                </option>
              ))}
            </select>
          </div>

          {/* Illustrative Rating */}
          <div>
            <span className="block text-xs font-bold text-[#101C35] mb-1.5">
              Minimum Rating (Illustrative)
            </span>
            <div className="flex gap-1.5">
              {[0, 4.5, 4.7].map((r) => (
                <button
                  key={r}
                  type="button"
                  onClick={() => setMinRating(r)}
                  className={`flex-1 py-1.5 rounded-lg text-[11px] font-semibold border cursor-pointer ${
                    minRating === r
                      ? 'bg-[#1677FF] text-white border-[#1677FF]'
                      : 'bg-[#F7F9FC] text-slate-600 border-slate-200'
                  }`}
                >
                  {r === 0 ? 'Any' : `${r}+ ★`}
                </button>
              ))}
            </div>
          </div>
        </aside>

        {/* Right Main Results Feed */}
        <section className="lg:col-span-9 space-y-5">
          <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-[#748198]">
            <span>
              Showing <strong className="text-[#101C35]">{filteredProducts.length}</strong> consolidated experiences across multiple suppliers
            </span>
            <span>Match confidence & differences preserved per offer</span>
          </div>

          {filteredProducts.length === 0 ? (
            <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center space-y-3">
              <p className="font-display font-bold text-base text-[#101C35]">
                No experiences match your active filters
              </p>
              <button
                type="button"
                onClick={resetFilters}
                className="px-4 py-2 rounded-xl bg-[#1677FF] text-white text-xs font-bold cursor-pointer"
              >
                Reset All Filters
              </button>
            </div>
          ) : (
            filteredProducts.map((product) => {
              const rating = product.matchConfidence >= 95 ? '4.8' : '4.6';
              const balancedOffer = product.offers[1] ?? product.offers[0];
              return (
                <article
                  key={product.id}
                  className="bg-white rounded-2xl border border-slate-200 shadow-xs hover:shadow-lg transition-all overflow-hidden grid grid-cols-1 md:grid-cols-12"
                >
                  {/* Large Editorial Photo */}
                  <Link
                    to={`/experiences/${product.id}`}
                    className="md:col-span-5 relative min-h-[240px] bg-[#101C35] overflow-hidden group"
                  >
                    <SafeImage
                      src={product.image}
                      alt={product.canonicalName}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-[#101C35]/80 text-white text-[11px] font-semibold backdrop-blur-xs">
                      {product.category}
                    </span>
                    <span className="absolute bottom-3 left-3 px-2.5 py-1 rounded-full bg-[#0D9B80] text-white text-[11px] font-bold">
                      {product.matchConfidence}% AI Entity Match
                    </span>
                  </Link>

                  {/* Content & Multiple Supplier Offers */}
                  <div className="md:col-span-7 p-5 flex flex-col justify-between gap-4">
                    <div className="space-y-2.5">
                      <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
                        <span className="inline-flex items-center gap-1 font-semibold text-[#1677FF]">
                          <MapPin className="w-3.5 h-3.5" aria-hidden="true" />
                          {product.destination}
                        </span>
                        <span className="inline-flex items-center gap-1 font-bold text-[#101C35] bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-full">
                          <Star className="w-3 h-3 fill-amber-400 text-amber-400" aria-hidden="true" />
                          {rating} <span className="font-normal text-[#748198]">(Illustrative)</span>
                        </span>
                      </div>

                      <Link to={`/experiences/${product.id}`}>
                        <h2 className="font-display font-extrabold text-xl text-[#101C35] hover:text-[#1677FF] transition-colors">
                          {product.canonicalName}
                        </h2>
                      </Link>

                      <p className="text-xs text-[#748198] leading-relaxed">
                        {product.sharedAttractionNote}
                      </p>

                      {/* Key Feature Tags */}
                      <div className="flex flex-wrap items-center gap-2 text-[11px] text-slate-700">
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#F7F9FC] border border-slate-200 font-medium">
                          <Clock className="w-3.5 h-3.5 text-[#1677FF]" aria-hidden="true" />
                          {product.offers[0].duration.split(' ')[0]} – {product.offers[product.offers.length - 1].duration}
                        </span>
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#F7F9FC] border border-slate-200 font-medium">
                          <ShieldCheck className="w-3.5 h-3.5 text-[#0D9B80]" aria-hidden="true" />
                          Free Cancellation Options
                        </span>
                      </div>

                      {/* Multi-Supplier Offer Strip (Supplier A / B / C) */}
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-1">
                        {product.offers.map((offer) => (
                          <div
                            key={offer.id}
                            className="p-2.5 rounded-xl bg-[#F7F9FC] border border-slate-200 flex flex-col justify-between"
                          >
                            <div>
                              <div className="flex items-center justify-between gap-1">
                                <span className="text-[10px] font-bold uppercase text-[#748198]">
                                  {offer.supplierName.split('—')[0].trim()}
                                </span>
                                <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-[#1677FF]/10 text-[#1677FF]">
                                  {offer.badge}
                                </span>
                              </div>
                              <p className="font-display font-extrabold text-base text-[#101C35] mt-0.5">
                                {formatInr(offer.priceInr)}
                              </p>
                              <p className="text-[10px] text-slate-600 mt-0.5 line-clamp-2">
                                {offer.inclusions.slice(0, 2).join(' + ')}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2">
                      <div className="flex flex-wrap items-center gap-2">
                        <Link
                          to={`/experiences/${product.id}`}
                          className="px-3 py-2 rounded-xl border border-slate-200 hover:border-[#101C35] text-xs font-bold text-[#101C35] transition-colors"
                        >
                          View Details
                        </Link>
                        <button
                          type="button"
                          onClick={() => setCompareModalProduct(product)}
                          className="px-3 py-2 rounded-xl bg-[#101C35] hover:bg-[#1E2E52] text-white text-xs font-bold transition-colors cursor-pointer"
                        >
                          Compare Offers
                        </button>
                        <button
                          type="button"
                          onClick={() => setInclusionsModalProduct(product)}
                          className="px-3 py-2 rounded-xl bg-[#F7F9FC] hover:bg-slate-200/70 text-xs font-semibold text-[#192338] transition-colors cursor-pointer"
                        >
                          View Inclusions
                        </button>
                      </div>

                      <button
                        type="button"
                        onClick={() =>
                          addTripItem({
                            id: `${product.id}-${balancedOffer.id}`,
                            type: 'Experience',
                            title: product.canonicalName,
                            subtitle: `${balancedOffer.inclusions.slice(0, 2).join(' + ')} · ${balancedOffer.duration}`,
                            supplier: balancedOffer.supplierName,
                            destination: product.destination,
                            image: product.image,
                            priceInr: balancedOffer.priceInr,
                            policy: balancedOffer.cancellationPolicy,
                          })
                        }
                        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#1677FF] hover:bg-[#0F65E0] text-white text-xs font-bold shadow-xs cursor-pointer"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5" aria-hidden="true" />
                        Select Experience
                      </button>
                    </div>
                  </div>
                </article>
              );
            })
          )}
        </section>
      </div>

      <OfferComparisonModal
        product={compareModalProduct}
        open={compareModalProduct !== null}
        onClose={() => setCompareModalProduct(null)}
      />

      <DifferenceMatrixModal
        product={inclusionsModalProduct}
        open={inclusionsModalProduct !== null}
        onClose={() => setInclusionsModalProduct(null)}
      />
    </div>
  );
}

