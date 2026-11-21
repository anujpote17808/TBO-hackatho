import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import {
  ArrowLeft,
  MapPin,
  Clock,
  CheckCircle2,
  XCircle,
  ShieldCheck,
  Award,
  Sparkles,
} from 'lucide-react';
import { SIGHTSEEING_PRODUCTS } from '../data/sightseeingData';
import { SafeImage } from '../components/common/SafeImage';
import { DemoBadge } from '../components/common/DemoBadge';
import { OfferComparisonModal } from '../components/sightseeing/OfferComparisonModal';
import { useTrips } from '../context/TripContext';
import { formatInr } from '../utils/formatters';

export function ExperienceDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { addTripItem } = useTrips();

  const product =
    SIGHTSEEING_PRODUCTS.find((p) => p.id === id) ?? SIGHTSEEING_PRODUCTS[0];

  const [selectedOfferId, setSelectedOfferId] = useState(
    product.offers[1]?.id ?? product.offers[0].id
  );
  const [compareOpen, setCompareOpen] = useState(false);

  const selectedOffer =
    product.offers.find((o) => o.id === selectedOfferId) ?? product.offers[0];

  return (
    <div className="max-w-[1380px] mx-auto px-4 sm:px-6 py-8 space-y-8">
      {/* Breadcrumb */}
      <div className="flex flex-wrap items-center justify-between gap-2">
        <Link
          to="/experiences"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-[#1677FF] hover:underline"
        >
          <ArrowLeft className="w-4 h-4" aria-hidden="true" /> Back to Sightseeing Marketplace
        </Link>
        <DemoBadge label="Synthetic Multi-Supplier Demo Offers" />
      </div>

      {/* Hero Gallery + Summary */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        <div className="lg:col-span-8 space-y-6">
          <div className="relative h-[340px] sm:h-[420px] rounded-2xl overflow-hidden bg-[#101C35] shadow-md">
            <SafeImage
              src={product.image}
              alt={product.canonicalName}
              priority
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#101C35]/80 via-transparent to-transparent" />
            <div className="absolute top-4 left-4 flex flex-wrap gap-2">
              <span className="px-3 py-1 rounded-full bg-[#101C35]/80 text-white text-xs font-bold">
                {product.category}
              </span>
              <span className="px-3 py-1 rounded-full bg-[#0D9B80] text-white text-xs font-bold">
                {product.matchConfidence}% AI Entity Match
              </span>
            </div>
            <div className="absolute bottom-5 inset-x-6 text-white">
              <span className="inline-flex items-center gap-1 text-xs font-semibold text-[#19C5D8]">
                <MapPin className="w-3.5 h-3.5" aria-hidden="true" />
                {product.destination}
              </span>
              <h1 className="font-display font-extrabold text-2xl sm:text-4xl mt-1">
                {product.canonicalName}
              </h1>
            </div>
          </div>

          {/* Shared Attraction Intelligence Note */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-start gap-3 max-w-2xl">
              <Sparkles className="w-5 h-5 text-[#19C5D8] shrink-0 mt-0.5" aria-hidden="true" />
              <div className="text-xs sm:text-sm text-slate-700">
                <strong className="text-[#101C35]">Unified Attraction, Preserved Differences:</strong>{' '}
                {product.sharedAttractionNote}
              </div>
            </div>
            <button
              type="button"
              onClick={() => setCompareOpen(true)}
              className="px-4 py-2 rounded-xl bg-[#101C35] hover:bg-[#1677FF] text-white text-xs font-bold cursor-pointer transition-colors"
            >
              Compare All {product.offers.length} Offers
            </button>
          </div>

          {/* Selectable Supplier Offers */}
          <section className="space-y-3">
            <h2 className="font-display font-extrabold text-xl text-[#101C35]">
              Choose Your Bookable Supplier Package
            </h2>
            <div className="grid grid-cols-1 gap-4">
              {product.offers.map((offer) => {
                const active = offer.id === selectedOffer.id;
                return (
                  <div
                    key={offer.id}
                    onClick={() => setSelectedOfferId(offer.id)}
                    className={`rounded-2xl p-5 border-2 transition-all cursor-pointer ${
                      active
                        ? 'border-[#1677FF] bg-[#1677FF]/[0.03] shadow-sm'
                        : 'border-slate-200 bg-white hover:border-slate-300'
                    }`}
                  >
                    <div className="flex flex-wrap items-start justify-between gap-4">
                      <div className="space-y-2 flex-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="px-2.5 py-0.5 rounded-full bg-[#101C35] text-[#19C5D8] text-[10px] font-bold uppercase">
                            {offer.badge}
                          </span>
                          <span className="text-xs font-semibold text-[#748198]">
                            {offer.supplierTier}
                          </span>
                        </div>
                        <h3 className="font-display font-bold text-base text-[#101C35]">
                          {offer.supplierName}
                        </h3>
                        <div className="flex flex-wrap gap-3 text-xs text-slate-600">
                          <span className="inline-flex items-center gap-1">
                            <Clock className="w-3.5 h-3.5 text-[#1677FF]" aria-hidden="true" />
                            {offer.duration}
                          </span>
                          <span className="inline-flex items-center gap-1">
                            <ShieldCheck className="w-3.5 h-3.5 text-[#0D9B80]" aria-hidden="true" />
                            {offer.cancellationPolicy}
                          </span>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs">
                          <div>
                            <p className="font-bold text-[#101C35] mb-1">Included</p>
                            <ul className="space-y-1">
                              {offer.inclusions.map((inc) => (
                                <li key={inc} className="flex items-start gap-1.5 text-slate-700">
                                  <CheckCircle2 className="w-3.5 h-3.5 text-[#0D9B80] shrink-0 mt-0.5" aria-hidden="true" />
                                  <span>{inc}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                          <div>
                            <p className="font-bold text-[#101C35] mb-1">Not Included</p>
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
                      </div>

                      <div className="text-right shrink-0 space-y-2">
                        <p className="font-display font-extrabold text-2xl text-[#101C35]">
                          {formatInr(offer.priceInr)}
                        </p>
                        <span className="block text-[11px] text-[#748198]">Per Traveller (Demo)</span>
                        <span
                          className={`inline-block px-3 py-1 rounded-lg text-xs font-bold ${
                            active ? 'bg-[#1677FF] text-white' : 'bg-slate-100 text-[#101C35]'
                          }`}
                        >
                          {active ? 'Selected' : 'Select Option'}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        </div>

        {/* Sticky Booking Summary Panel */}
        <aside className="lg:col-span-4 bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-5 lg:sticky lg:top-[86px]">
          <div className="flex items-center justify-between">
            <span className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0D9B80]">
              <Award className="w-4 h-4" aria-hidden="true" />
              Selected Supplier Package
            </span>
            <span className="text-xs font-bold text-[#1677FF]">{selectedOffer.badge}</span>
          </div>

          <div>
            <h2 className="font-display font-bold text-lg text-[#101C35]">
              {selectedOffer.supplierName}
            </h2>
            <p className="font-display font-extrabold text-3xl text-[#101C35] mt-2">
              {formatInr(selectedOffer.priceInr)}
              <span className="text-xs font-normal text-[#748198]"> / traveller (demo)</span>
            </p>
          </div>

          <dl className="divide-y divide-slate-100 text-xs">
            <div className="py-2.5 flex justify-between gap-2">
              <dt className="text-[#748198]">Duration</dt>
              <dd className="font-semibold text-[#101C35]">{selectedOffer.duration}</dd>
            </div>
            <div className="py-2.5 flex justify-between gap-2">
              <dt className="text-[#748198]">Access Type</dt>
              <dd className="font-semibold text-[#101C35]">{selectedOffer.accessType}</dd>
            </div>
            <div className="py-2.5 flex justify-between gap-2">
              <dt className="text-[#748198]">Hotel Transfer</dt>
              <dd className="font-semibold text-[#101C35] text-right">
                {selectedOffer.transferAvailable ? 'Included' : 'Not Included'}
              </dd>
            </div>
            <div className="py-2.5 flex justify-between gap-2">
              <dt className="text-[#748198]">Meals</dt>
              <dd className="font-semibold text-[#101C35] text-right">
                {selectedOffer.mealAvailable ? 'Included' : 'Not Included'}
              </dd>
            </div>
            <div className="py-2.5 flex justify-between gap-2">
              <dt className="text-[#748198]">Cancellation</dt>
              <dd className="font-semibold text-[#0D9B80] text-right">
                {selectedOffer.cancellationPolicy}
              </dd>
            </div>
            <div className="py-2.5 flex justify-between gap-2">
              <dt className="text-[#748198]">Supplier Reliability</dt>
              <dd className="font-semibold text-[#101C35]">{selectedOffer.reliabilityScore}%</dd>
            </div>
          </dl>

          <button
            type="button"
            onClick={() =>
              addTripItem({
                id: `${product.id}-${selectedOffer.id}`,
                type: 'Experience',
                title: product.canonicalName,
                subtitle: `${selectedOffer.inclusions.slice(0, 2).join(' + ')} · ${selectedOffer.duration}`,
                supplier: selectedOffer.supplierName,
                destination: product.destination,
                image: product.image,
                priceInr: selectedOffer.priceInr,
                policy: selectedOffer.cancellationPolicy,
              })
            }
            className="w-full py-3 rounded-xl bg-[#1677FF] hover:bg-[#0F65E0] text-white text-sm font-bold shadow-md shadow-[#1677FF]/25 cursor-pointer transition-all"
          >
            Add Experience to My Trips
          </button>

          <button
            type="button"
            onClick={() => setCompareOpen(true)}
            className="w-full py-2.5 rounded-xl border border-slate-200 hover:border-[#101C35] text-xs font-bold text-[#101C35] cursor-pointer"
          >
            Open Full Supplier Matrix
          </button>
        </aside>
      </div>

      <OfferComparisonModal
        product={product}
        open={compareOpen}
        onClose={() => setCompareOpen(false)}
      />
    </div>
  );
}
