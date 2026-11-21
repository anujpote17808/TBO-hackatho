import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import {
  MapPin,
  Calendar,
  ArrowRight,
  Star,
  CheckCircle2,
  Compass,
  Building2,
} from 'lucide-react';
import { DESTINATIONS } from '../data/destinationsData';
import { SIGHTSEEING_PRODUCTS } from '../data/sightseeingData';
import { HOTEL_PROPERTIES } from '../data/hotelData';
import { SightseeingProduct } from '../types/inventory';
import { SafeImage } from '../components/common/SafeImage';
import { DemoBadge } from '../components/common/DemoBadge';
import { OfferComparisonModal } from '../components/sightseeing/OfferComparisonModal';
import { RevealSection, TiltCard3D } from '../components/motion/MotionPrimitives';
import { formatInr } from '../utils/formatters';

export function DestinationsPage() {
  const { slug } = useParams<{ slug?: string }>();
  const [compareProduct, setCompareProduct] = useState<SightseeingProduct | null>(null);

  const activeDestination = slug
    ? DESTINATIONS.find((d) => d.slug === slug.toLowerCase()) ?? DESTINATIONS[0]
    : null;

  const matchingExperiences = activeDestination
    ? SIGHTSEEING_PRODUCTS.filter((p) =>
        p.destination.toLowerCase().includes(activeDestination.name.toLowerCase()) ||
        p.state.toLowerCase().includes(activeDestination.name.toLowerCase())
      )
    : SIGHTSEEING_PRODUCTS;

  const matchingHotels = activeDestination
    ? HOTEL_PROPERTIES.filter((h) =>
        h.location.toLowerCase().includes(activeDestination.name.toLowerCase())
      )
    : HOTEL_PROPERTIES;

  return (
    <div className="space-y-12 pb-8">
      {/* Expedia-Style Editorial Destination Hero */}
      <section className="relative h-[340px] sm:h-[390px] w-full bg-[#101C35] overflow-hidden flex items-end">
        <SafeImage
          src={activeDestination ? activeDestination.image : '/images/jaipur-city-palace.png'}
          alt={activeDestination ? activeDestination.name : 'Explore Incredible India'}
          priority
          className="w-full h-full object-cover absolute inset-0"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#101C35]/90 via-[#101C35]/45 to-[#101C35]/20" />

        <div className="relative z-10 max-w-[1380px] w-full mx-auto px-4 sm:px-6 pb-8 text-white space-y-3">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-[#19C5D8]/20 border border-[#19C5D8]/40 text-[#94F0FA] text-xs font-bold">
              {activeDestination ? `${activeDestination.state}, India` : 'Incredible India Discovery'}
            </span>
            {activeDestination && (
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-white/15 text-xs font-medium">
                <Calendar className="w-3.5 h-3.5 text-[#19C5D8]" aria-hidden="true" />
                Best Season: {activeDestination.bestSeason}
              </span>
            )}
            <DemoBadge variant="dark" />
          </div>

          <h1 className="font-display font-extrabold text-3xl sm:text-5xl tracking-tight">
            {activeDestination
              ? `Discover ${activeDestination.name}`
              : 'Explore Incredible India'}
          </h1>
          <p className="text-sm sm:text-base text-slate-200 max-w-2xl">
            {activeDestination
              ? `${activeDestination.tagline} — ${activeDestination.description}`
              : 'Select any destination hub below to explore verified multi-supplier sightseeing experiences and luxury stays.'}
          </p>
        </div>
      </section>

      <div className="max-w-[1380px] mx-auto px-4 sm:px-6 space-y-12">
        {/* Destination Switcher Pills */}
        <div className="flex flex-wrap items-center gap-2">
          <Link
            to="/destinations"
            className={`px-4 py-2 rounded-full text-xs font-bold transition-colors ${
              !activeDestination
                ? 'bg-[#101C35] text-white'
                : 'bg-white border border-slate-200 text-[#192338] hover:border-[#1677FF]'
            }`}
          >
            All 6 Hubs
          </Link>
          {DESTINATIONS.map((d) => (
            <Link
              key={d.slug}
              to={`/destinations/${d.slug}`}
              className={`px-4 py-2 rounded-full text-xs font-bold transition-colors ${
                activeDestination?.slug === d.slug
                  ? 'bg-[#1677FF] text-white shadow-xs'
                  : 'bg-white border border-slate-200 text-[#192338] hover:border-[#1677FF]'
              }`}
            >
              {d.name}
            </Link>
          ))}
        </div>

        {/* All-Destinations Overview Grid when viewing /destinations */}
        {!activeDestination && (
          <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {DESTINATIONS.map((dest) => (
              <RevealSection key={dest.slug}>
                <TiltCard3D>
                  <Link
                    to={`/destinations/${dest.slug}`}
                    className="group block relative h-[280px] rounded-2xl overflow-hidden bg-[#101C35] shadow-md"
                  >
                    <SafeImage
                      src={dest.image}
                      alt={dest.name}
                      className="w-full h-full object-cover group-hover:scale-106 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#101C35]/90 via-[#101C35]/25 to-transparent" />
                    <div className="absolute bottom-4 inset-x-5 text-white">
                      <span className="text-[11px] font-bold text-[#19C5D8]">
                        {dest.experiencesCount} Experiences · {dest.hotelsCount} Hotels
                      </span>
                      <h2 className="font-display font-extrabold text-2xl mt-0.5">
                        {dest.name}
                      </h2>
                      <p className="text-xs text-slate-200 mt-0.5 line-clamp-2">
                        {dest.description}
                      </p>
                    </div>
                  </Link>
                </TiltCard3D>
              </RevealSection>
            ))}
          </section>
        )}

        {/* Active Destination Highlights */}
        {activeDestination && (
          <section className="bg-white rounded-2xl border border-slate-200 p-6 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div className="space-y-2">
              <h2 className="font-display font-bold text-lg text-[#101C35]">
                Signature Highlights in {activeDestination.name}
              </h2>
              <div className="flex flex-wrap gap-2">
                {activeDestination.highlights.map((h) => (
                  <span
                    key={h}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#F7F9FC] border border-slate-200 text-xs font-semibold text-[#101C35]"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#0D9B80]" aria-hidden="true" />
                    {h}
                  </span>
                ))}
              </div>
            </div>
            <div className="flex flex-wrap gap-2.5 shrink-0">
              <Link
                to={`/experiences?destination=${activeDestination.name}`}
                className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-[#1677FF] hover:bg-[#0F65E0] text-white text-xs font-bold"
              >
                <Compass className="w-4 h-4" aria-hidden="true" />
                All {activeDestination.name} Experiences
              </Link>
              <Link
                to={`/hotels?destination=${activeDestination.name}`}
                className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-[#101C35] hover:bg-[#1E2E52] text-white text-xs font-bold"
              >
                <Building2 className="w-4 h-4" aria-hidden="true" />
                {activeDestination.name} Hotels
              </Link>
            </div>
          </section>
        )}

        {/* Curated Experiences in Destination */}
        <section className="space-y-4">
          <div className="flex items-center justify-between gap-2">
            <h2 className="font-display font-extrabold text-2xl text-[#101C35]">
              {activeDestination
                ? `Top Experiences in ${activeDestination.name}`
                : 'Featured Multi-Supplier Experiences'}
            </h2>
            <Link
              to={
                activeDestination
                  ? `/experiences?destination=${activeDestination.name}`
                  : '/experiences'
              }
              className="inline-flex items-center gap-1 text-xs font-bold text-[#1677FF]"
            >
              View Marketplace <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {matchingExperiences.map((exp) => (
              <article
                key={exp.id}
                className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-md transition-shadow flex flex-col"
              >
                <Link to={`/experiences/${exp.id}`} className="h-48 block relative overflow-hidden">
                  <SafeImage src={exp.image} alt={exp.canonicalName} />
                  <span className="absolute top-3 right-3 px-2.5 py-0.5 rounded-full bg-[#0D9B80] text-white text-[11px] font-bold">
                    {exp.matchConfidence}% Match
                  </span>
                </Link>
                <div className="p-5 flex-1 flex flex-col justify-between gap-3">
                  <div>
                    <span className="text-xs text-[#748198] inline-flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-[#1677FF]" aria-hidden="true" />
                      {exp.destination} · {exp.supplierCount} Suppliers
                    </span>
                    <h3 className="font-display font-bold text-base text-[#101C35] mt-1">
                      {exp.canonicalName}
                    </h3>
                    <p className="text-xs text-[#748198] mt-1">{exp.inclusionSummary}</p>
                  </div>
                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                    <span className="font-display font-extrabold text-lg text-[#101C35]">
                      {formatInr(exp.priceRangeInr[0])}
                      <span className="text-xs font-normal text-[#748198]">
                        {' '}– {formatInr(exp.priceRangeInr[1])}
                      </span>
                    </span>
                    <div className="flex items-center gap-1.5">
                      <button
                        type="button"
                        onClick={() => setCompareProduct(exp)}
                        className="px-2.5 py-1.5 rounded-lg border border-slate-200 text-xs font-semibold text-[#101C35] cursor-pointer hover:border-[#1677FF]"
                      >
                        Compare
                      </button>
                      <Link
                        to={`/experiences/${exp.id}`}
                        className="px-3 py-1.5 rounded-lg bg-[#1677FF] text-white text-xs font-bold"
                      >
                        Details
                      </Link>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Verified Hotels in Destination */}
        <section className="space-y-4">
          <div className="flex items-center justify-between gap-2">
            <h2 className="font-display font-extrabold text-2xl text-[#101C35]">
              {activeDestination
                ? `Verified Stays in ${activeDestination.name}`
                : 'Handpicked Hotels Across India'}
            </h2>
            <Link
              to={activeDestination ? `/hotels?destination=${activeDestination.name}` : '/hotels'}
              className="inline-flex items-center gap-1 text-xs font-bold text-[#1677FF]"
            >
              Browse All Hotels <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {matchingHotels.map((hotel) => (
              <article
                key={hotel.id}
                className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-md transition-shadow flex flex-col"
              >
                <Link to={`/hotels/${hotel.id}`} className="h-48 block relative overflow-hidden">
                  <SafeImage src={hotel.image} alt={hotel.name} />
                  <span className="absolute top-3 left-3 inline-flex items-center gap-0.5 px-2 py-0.5 rounded-full bg-[#101C35]/80 text-amber-300 text-[10px]">
                    {Array.from({ length: hotel.starRating }).map((_, i) => (
                      <Star key={i} className="w-2.5 h-2.5 fill-amber-300" aria-hidden="true" />
                    ))}
                  </span>
                </Link>
                <div className="p-5 flex-1 flex flex-col justify-between gap-3">
                  <div>
                    <span className="text-xs text-[#748198]">{hotel.location}</span>
                    <h3 className="font-display font-bold text-base text-[#101C35] mt-0.5">
                      {hotel.name}
                    </h3>
                    <p className="text-xs text-[#0D9B80] font-semibold mt-1">
                      {hotel.propertyMatchConfidence}% Property Match · {hotel.supplierCount} Suppliers
                    </p>
                  </div>
                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                    <span className="font-display font-extrabold text-lg text-[#101C35]">
                      {formatInr(hotel.lowestPriceInr)}
                      <span className="text-xs font-normal text-[#748198]"> / night</span>
                    </span>
                    <Link
                      to={`/hotels/${hotel.id}`}
                      className="px-3.5 py-1.5 rounded-lg bg-[#101C35] hover:bg-[#1677FF] text-white text-xs font-bold transition-colors"
                    >
                      View Rooms
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>
      </div>

      <OfferComparisonModal
        product={compareProduct}
        open={compareProduct !== null}
        onClose={() => setCompareProduct(null)}
      />
    </div>
  );
}

