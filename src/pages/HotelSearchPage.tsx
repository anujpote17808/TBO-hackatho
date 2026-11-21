import { useMemo, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import {
  MapPin,
  Star,
  SlidersHorizontal,
  CheckCircle2,
  RotateCcw,
  BedDouble,
  ShieldCheck,
} from 'lucide-react';
import { HOTEL_PROPERTIES } from '../data/hotelData';
import { SafeImage } from '../components/common/SafeImage';
import { DemoBadge } from '../components/common/DemoBadge';
import { formatInr } from '../utils/formatters';

export function HotelSearchPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialDest = searchParams.get('destination') ?? 'All';

  const [destination, setDestination] = useState(initialDest);
  const [maxPrice, setMaxPrice] = useState(15000);
  const [starFilter, setStarFilter] = useState<number>(0);
  const [breakfastOnly, setBreakfastOnly] = useState(false);
  const [freeCancelOnly, setFreeCancelOnly] = useState(false);
  const [poolOnly, setPoolOnly] = useState(false);
  const [propertyType, setPropertyType] = useState<'All' | 'Palace & Heritage' | 'Resort' | 'Business'>('All');
  const [minRating, setMinRating] = useState(0);

  const getPropertyType = (name: string) => {
    const n = name.toLowerCase();
    if (n.includes('palace') || n.includes('heritage')) return 'Palace & Heritage';
    if (n.includes('resort') || n.includes('retreat')) return 'Resort';
    return 'Business';
  };

  const getGuestRating = (confidence: number) =>
    confidence >= 96 ? 4.8 : confidence >= 95 ? 4.7 : 4.5;

  const filteredHotels = useMemo(() => {
    return HOTEL_PROPERTIES.filter((h) => {
      if (
        destination !== 'All' &&
        !h.location.toLowerCase().includes(destination.toLowerCase())
      ) {
        return false;
      }
      if (h.lowestPriceInr > maxPrice) return false;
      if (starFilter > 0 && h.starRating !== starFilter) return false;
      if (propertyType !== 'All' && getPropertyType(h.name) !== propertyType) return false;
      if (getGuestRating(h.propertyMatchConfidence) < minRating) return false;

      if (
        breakfastOnly &&
        !h.roomOffers.some((r) => r.mealPlan.toLowerCase().includes('breakfast'))
      ) {
        return false;
      }
      if (freeCancelOnly && !h.roomOffers.some((r) => r.refundable)) return false;
      if (
        poolOnly &&
        !h.roomOffers.some((r) =>
          r.amenities.join(' ').toLowerCase().includes('pool')
        )
      ) {
        return false;
      }
      return true;
    });
  }, [
    destination,
    maxPrice,
    starFilter,
    breakfastOnly,
    freeCancelOnly,
    poolOnly,
    propertyType,
    minRating,
  ]);

  const resetFilters = () => {
    setDestination('All');
    setMaxPrice(15000);
    setStarFilter(0);
    setBreakfastOnly(false);
    setFreeCancelOnly(false);
    setPoolOnly(false);
    setPropertyType('All');
    setMinRating(0);
    setSearchParams({});
  };

  return (
    <div className="max-w-[1380px] mx-auto px-4 sm:px-6 py-8 space-y-6">
      {/* Header */}
      <div className="bg-[#101C35] text-white rounded-2xl p-6 flex flex-wrap items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-[#19C5D8]">
            Premium Hotel Discovery & Room Intelligence
          </span>
          <h1 className="font-display font-extrabold text-2xl sm:text-3xl mt-1">
            Find Your Perfect Stay{destination !== 'All' ? ` in ${destination}` : ''}
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 mt-1">
            Booking.com-style search backed by attribute-verified room mapping so bed types, breakfast, and refundability stay crystal clear.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Link
            to="/room-comparison"
            className="px-4 py-2 rounded-xl bg-[#19C5D8] hover:bg-[#14B2C4] text-[#101C35] text-xs font-extrabold"
          >
            Room Equivalence Lab
          </Link>
          <DemoBadge variant="dark" label="Illustrative Demo Rates" />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Filter Panel */}
        <aside
          aria-label="Filter hotels"
          className="lg:col-span-3 bg-white rounded-2xl border border-slate-200 p-5 space-y-5 lg:sticky lg:top-[86px]"
        >
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h2 className="font-display font-bold text-sm text-[#101C35] flex items-center gap-2">
              <SlidersHorizontal className="w-4 h-4 text-[#1677FF]" aria-hidden="true" />
              Filter Stays
            </h2>
            <button
              type="button"
              onClick={resetFilters}
              className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#1677FF] hover:underline cursor-pointer"
            >
              <RotateCcw className="w-3 h-3" aria-hidden="true" /> Reset
            </button>
          </div>

          <div>
            <label htmlFor="htl-dest" className="block text-xs font-bold text-[#101C35] mb-1.5">
              City / Hub
            </label>
            <select
              id="htl-dest"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-[#F7F9FC] text-xs font-semibold"
            >
              {['All', 'Agra', 'Goa', 'Jaipur', 'Mumbai', 'Delhi', 'Kerala'].map((c) => (
                <option key={c} value={c}>
                  {c === 'All' ? 'All India Cities' : c}
                </option>
              ))}
            </select>
          </div>

          <div>
            <div className="flex items-center justify-between text-xs mb-1">
              <label htmlFor="htl-price" className="font-bold text-[#101C35]">
                Max Nightly Rate
              </label>
              <span className="font-bold text-[#1677FF]">{formatInr(maxPrice)}</span>
            </div>
            <input
              id="htl-price"
              type="range"
              min={4500}
              max={15000}
              step={500}
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="tiq-slider w-full"
            />
          </div>

          <div>
            <span className="block text-xs font-bold text-[#101C35] mb-1.5">Hotel Category</span>
            <div className="flex gap-1.5">
              {[0, 4, 5].map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => setStarFilter(s)}
                  className={`flex-1 py-1.5 rounded-lg text-xs font-semibold border cursor-pointer ${
                    starFilter === s
                      ? 'bg-[#101C35] text-white border-[#101C35]'
                      : 'bg-[#F7F9FC] text-slate-600 border-slate-200'
                  }`}
                >
                  {s === 0 ? 'All' : `${s}-Star`}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label htmlFor="htl-type" className="block text-xs font-bold text-[#101C35] mb-1.5">
              Property Type
            </label>
            <select
              id="htl-type"
              value={propertyType}
              onChange={(e) =>
                setPropertyType(
                  e.target.value as 'All' | 'Palace & Heritage' | 'Resort' | 'Business'
                )
              }
              className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-[#F7F9FC] text-xs font-semibold"
            >
              <option value="All">All Property Types</option>
              <option value="Palace & Heritage">Palace & Heritage</option>
              <option value="Resort">Luxury Resort</option>
              <option value="Business">Business Hotel</option>
            </select>
          </div>

          <div className="space-y-2 text-xs">
            <span className="block font-bold text-[#101C35]">Amenities & Policies</span>
            {[
              { label: 'Breakfast Included Options', checked: breakfastOnly, set: setBreakfastOnly },
              { label: 'Free Cancellation Options', checked: freeCancelOnly, set: setFreeCancelOnly },
              { label: 'Swimming Pool Access', checked: poolOnly, set: setPoolOnly },
            ].map((item) => (
              <label key={item.label} className="flex items-center gap-2 cursor-pointer text-slate-700">
                <input
                  type="checkbox"
                  checked={item.checked}
                  onChange={(e) => item.set(e.target.checked)}
                  className="rounded border-slate-300 text-[#1677FF]"
                />
                <span>{item.label}</span>
              </label>
            ))}
          </div>

          <div>
            <span className="block text-xs font-bold text-[#101C35] mb-1.5">
              Guest Rating (Illustrative)
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
                  {r === 0 ? 'Any' : `${r}+`}
                </button>
              ))}
            </div>
          </div>
        </aside>

        {/* Booking.com-Style Horizontal Hotel Cards */}
        <section className="lg:col-span-9 space-y-5">
          <div className="flex items-center justify-between text-xs text-[#748198]">
            <span>
              <strong className="text-[#101C35]">{filteredHotels.length}</strong> properties matched across multiple wholesale & direct feeds
            </span>
            <span>Guest ratings are illustrative demo indicators</span>
          </div>

          {filteredHotels.map((hotel) => {
            const guestRating = getGuestRating(hotel.propertyMatchConfidence);
            const allAmenities = Array.from(
              new Set(hotel.roomOffers.flatMap((r) => r.amenities))
            ).slice(0, 5);
            const hasFreeCancel = hotel.roomOffers.some((r) => r.refundable);

            return (
              <article
                key={hotel.id}
                className="bg-white rounded-2xl border border-slate-200 shadow-xs hover:shadow-lg transition-all overflow-hidden grid grid-cols-1 md:grid-cols-12"
              >
                <Link
                  to={`/hotels/${hotel.id}`}
                  className="md:col-span-4 relative min-h-[230px] bg-[#101C35] overflow-hidden group"
                >
                  <SafeImage
                    src={hotel.image}
                    alt={hotel.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-[#101C35]/80 text-white text-[10px] font-bold">
                    {getPropertyType(hotel.name)}
                  </span>
                </Link>

                <div className="md:col-span-5 p-5 flex flex-col justify-between gap-3">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="inline-flex items-center gap-0.5 text-amber-400">
                        {Array.from({ length: hotel.starRating }).map((_, i) => (
                          <Star key={i} className="w-3.5 h-3.5 fill-amber-400" aria-hidden="true" />
                        ))}
                      </span>
                      <span className="text-[11px] font-bold text-[#0D9B80]">
                        {hotel.propertyMatchConfidence}% Property Match
                      </span>
                    </div>

                    <Link to={`/hotels/${hotel.id}`}>
                      <h2 className="font-display font-extrabold text-xl text-[#101C35] hover:text-[#1677FF] transition-colors">
                        {hotel.name}
                      </h2>
                    </Link>

                    <p className="text-xs text-[#748198] inline-flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-[#1677FF]" aria-hidden="true" />
                      {hotel.location}
                    </p>

                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {allAmenities.map((am) => (
                        <span
                          key={am}
                          className="px-2 py-0.5 rounded-md bg-[#F7F9FC] border border-slate-200 text-[11px] text-slate-700"
                        >
                          {am}
                        </span>
                      ))}
                    </div>

                    <div className="flex flex-wrap gap-3 pt-1 text-xs">
                      {hasFreeCancel && (
                        <span className="inline-flex items-center gap-1 font-semibold text-[#0D9B80]">
                          <CheckCircle2 className="w-3.5 h-3.5" aria-hidden="true" />
                          Free Cancellation Available
                        </span>
                      )}
                      <span className="inline-flex items-center gap-1 text-slate-600">
                        <BedDouble className="w-3.5 h-3.5 text-[#1677FF]" aria-hidden="true" />
                        {hotel.roomOffers.length} Supplier Room Tiers
                      </span>
                    </div>
                  </div>
                </div>

                {/* Right Booking.com Price & Rating Column */}
                <div className="md:col-span-3 bg-[#F7F9FC] border-t md:border-t-0 md:border-l border-slate-200 p-5 flex flex-col justify-between gap-4">
                  <div className="flex items-center justify-between md:justify-end gap-2.5">
                    <div className="text-right">
                      <span className="block text-xs font-bold text-[#101C35]">Exceptional</span>
                      <span className="block text-[10px] text-[#748198]">Illustrative Rating</span>
                    </div>
                    <span className="w-10 h-10 rounded-xl bg-[#101C35] text-white font-display font-extrabold text-sm flex items-center justify-center">
                      {guestRating.toFixed(1)}
                    </span>
                  </div>

                  <div className="md:text-right space-y-2">
                    <div>
                      <span className="inline-flex items-center gap-1 text-[10px] font-bold text-[#0D9B80]">
                        <ShieldCheck className="w-3 h-3" aria-hidden="true" />
                        {hotel.roomOffers[0].availability}
                      </span>
                      <p className="font-display font-extrabold text-2xl text-[#101C35] mt-0.5">
                        {formatInr(hotel.lowestPriceInr)}
                      </p>
                      <span className="block text-[11px] text-[#748198]">
                        Starting / night · {hotel.supplierCount} suppliers
                      </span>
                    </div>

                    <div className="flex flex-col gap-2 pt-1">
                      <Link
                        to={`/hotels/${hotel.id}`}
                        className="w-full py-2.5 px-4 rounded-xl bg-[#1677FF] hover:bg-[#0F65E0] text-white text-xs font-bold text-center shadow-xs transition-colors"
                      >
                        View Rooms
                      </Link>
                      <Link
                        to={`/room-comparison?hotel=${hotel.id}`}
                        className="w-full py-2 px-3 rounded-xl border border-slate-200 bg-white hover:border-[#101C35] text-[11px] font-bold text-[#101C35] text-center transition-colors"
                      >
                        Compare Equivalent Rooms
                      </Link>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </section>
      </div>
    </div>
  );
}

