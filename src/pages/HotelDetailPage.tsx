import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import {
  ArrowLeft,
  MapPin,
  Star,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  BedDouble,
  Users,
  Maximize2,
} from 'lucide-react';
import { HOTEL_PROPERTIES } from '../data/hotelData';
import { SafeImage } from '../components/common/SafeImage';
import { DemoBadge } from '../components/common/DemoBadge';
import { useTrips } from '../context/TripContext';
import { formatInr } from '../utils/formatters';

export function HotelDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { addTripItem } = useTrips();

  const hotel = HOTEL_PROPERTIES.find((h) => h.id === id) ?? HOTEL_PROPERTIES[0];
  const [activePhotoIdx, setActivePhotoIdx] = useState(0);

  const gallery =
    hotel.galleryImages.length > 0
      ? hotel.galleryImages
      : [{ label: hotel.name, src: hotel.image }];

  const allAmenities = Array.from(
    new Set(hotel.roomOffers.flatMap((r) => r.amenities))
  );

  return (
    <div className="max-w-[1380px] mx-auto px-4 sm:px-6 py-8 space-y-8">
      {/* Top Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <Link
          to="/hotels"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-[#1677FF] hover:underline"
        >
          <ArrowLeft className="w-4 h-4" aria-hidden="true" /> Back to Hotel Search
        </Link>
        <div className="flex items-center gap-2">
          <Link
            to={`/room-comparison?hotel=${hotel.id}`}
            className="px-3.5 py-1.5 rounded-xl bg-[#101C35] text-white text-xs font-bold"
          >
            Open Full Room Comparison Matrix
          </Link>
          <DemoBadge label="Synthetic Hotel Demo Inventory" />
        </div>
      </div>

      {/* Property Title Header */}
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-0.5 text-amber-400">
              {Array.from({ length: hotel.starRating }).map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-amber-400" aria-hidden="true" />
              ))}
            </span>
            <span className="px-2.5 py-0.5 rounded-full bg-[#0D9B80]/12 text-[#0D9B80] text-xs font-bold">
              {hotel.propertyMatchConfidence}% Property Match · {hotel.supplierCount} Suppliers
            </span>
          </div>
          <h1 className="font-display font-extrabold text-3xl sm:text-4xl text-[#101C35] mt-1.5">
            {hotel.name}
          </h1>
          <p className="text-sm text-[#748198] inline-flex items-center gap-1.5 mt-1">
            <MapPin className="w-4 h-4 text-[#1677FF]" aria-hidden="true" />
            {hotel.location} · {hotel.roomCount} Total Rooms
          </p>
        </div>

        <div className="text-right">
          <span className="block text-xs text-[#748198]">Illustrative Starting Rate</span>
          <span className="font-display font-extrabold text-3xl text-[#101C35]">
            {formatInr(hotel.lowestPriceInr)}
            <span className="text-xs font-normal text-[#748198]"> / night</span>
          </span>
        </div>
      </div>

      {/* Interactive Large Image Gallery */}
      <section aria-label="Hotel photo gallery" className="grid grid-cols-1 lg:grid-cols-12 gap-3">
        <div className="lg:col-span-8 relative h-[340px] sm:h-[430px] rounded-2xl overflow-hidden bg-[#101C35] shadow-md">
          <SafeImage
            src={gallery[activePhotoIdx]?.src ?? hotel.image}
            alt={gallery[activePhotoIdx]?.label ?? hotel.name}
            priority
            className="w-full h-full object-cover"
          />
          <span className="absolute bottom-4 left-4 px-3 py-1.5 rounded-xl bg-[#101C35]/80 text-white text-xs font-bold backdrop-blur-xs">
            {gallery[activePhotoIdx]?.label} ({activePhotoIdx + 1} / {gallery.length})
          </span>
        </div>

        <div className="lg:col-span-4 grid grid-cols-2 gap-3">
          {gallery.slice(0, 4).map((photo, idx) => (
            <button
              key={photo.label}
              type="button"
              onClick={() => setActivePhotoIdx(idx)}
              className={`relative h-[160px] lg:h-[208px] rounded-2xl overflow-hidden border-2 transition-all cursor-pointer text-left ${
                activePhotoIdx === idx
                  ? 'border-[#1677FF] ring-2 ring-[#1677FF]/25'
                  : 'border-transparent hover:opacity-90'
              }`}
            >
              <SafeImage
                src={photo.src}
                alt={photo.label}
                hiddenAboveFold={idx > 0}
                className="w-full h-full object-cover"
              />
              <span className="absolute bottom-2 left-2 px-2 py-0.5 rounded-md bg-[#101C35]/75 text-white text-[10px] font-semibold">
                {photo.label}
              </span>
            </button>
          ))}
        </div>
      </section>

      {/* Property Description & Amenities */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200 p-6 space-y-3">
          <h2 className="font-display font-bold text-lg text-[#101C35]">
            Property Highlights & Intelligence Notes
          </h2>
          <ul className="space-y-2 text-sm text-slate-700">
            {hotel.highlights.map((h) => (
              <li key={h} className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#0D9B80] shrink-0 mt-1" aria-hidden="true" />
                <span>{h}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="lg:col-span-5 bg-white rounded-2xl border border-slate-200 p-6 space-y-3">
          <h2 className="font-display font-bold text-lg text-[#101C35]">
            Verified Amenities
          </h2>
          <div className="flex flex-wrap gap-2">
            {allAmenities.map((am) => (
              <span
                key={am}
                className="px-3 py-1.5 rounded-xl bg-[#F7F9FC] border border-slate-200 text-xs font-semibold text-[#101C35]"
              >
                {am}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Room Selection & Cross-Supplier Equivalence Cards */}
      <section className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div>
            <h2 className="font-display font-extrabold text-2xl text-[#101C35]">
              Available Room Offers Across Suppliers
            </h2>
            <p className="text-xs text-[#748198]">
              TripMatch AI compares bed type, occupancy, room size, breakfast, refundability, and payment terms — never merging non-equivalent room types.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          {hotel.roomOffers.map((room, idx) => (
            <article
              key={room.id}
              className={`bg-white rounded-2xl overflow-hidden border shadow-xs flex flex-col justify-between ${
                room.equivalenceWarning
                  ? 'border-amber-300 ring-1 ring-amber-200'
                  : 'border-slate-200'
              }`}
            >
              <div>
                <div className="h-44 relative bg-[#101C35]">
                  <SafeImage
                    src={
                      idx === 0
                        ? '/images/hotel-room-standard.png'
                        : idx === 1
                        ? '/images/hotel-exterior.png'
                        : '/images/hotel-room-premium.png'
                    }
                    alt={room.rawRoomName}
                  />
                  <span className="absolute top-3 left-3 px-2.5 py-0.5 rounded-full bg-[#101C35]/85 text-[#19C5D8] text-[10px] font-bold">
                    {room.equivalenceGroup}
                  </span>
                </div>

                <div className="p-5 space-y-3">
                  <div>
                    <span className="text-[11px] font-bold text-[#1677FF]">
                      {room.supplierName}
                    </span>
                    <h3 className="font-display font-extrabold text-lg text-[#101C35] mt-0.5">
                      {room.rawRoomName}
                    </h3>
                    <p className="text-xs text-[#748198]">{room.canonicalCategory}</p>
                  </div>

                  <div className="flex flex-wrap gap-2 text-[11px] text-slate-700">
                    <span className="inline-flex items-center gap-1 px-2 py-1 rounded-lg bg-[#F7F9FC] border border-slate-200">
                      <BedDouble className="w-3.5 h-3.5 text-[#1677FF]" aria-hidden="true" />
                      {room.bedType}
                    </span>
                    <span className="inline-flex items-center gap-1 px-2 py-1 rounded-lg bg-[#F7F9FC] border border-slate-200">
                      <Users className="w-3.5 h-3.5 text-[#1677FF]" aria-hidden="true" />
                      {room.occupancy}
                    </span>
                    <span className="inline-flex items-center gap-1 px-2 py-1 rounded-lg bg-[#F7F9FC] border border-slate-200">
                      <Maximize2 className="w-3.5 h-3.5 text-[#1677FF]" aria-hidden="true" />
                      {room.roomSizeSqm} m²
                    </span>
                  </div>

                  <dl className="text-xs space-y-1.5 pt-2 border-t border-slate-100">
                    <div className="flex justify-between gap-2">
                      <dt className="text-[#748198]">Meal Plan</dt>
                      <dd className="font-semibold text-[#101C35]">{room.mealPlan}</dd>
                    </div>
                    <div className="flex justify-between gap-2">
                      <dt className="text-[#748198]">Cancellation</dt>
                      <dd className="font-semibold inline-flex items-center gap-1 text-right">
                        {room.refundable ? (
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#0D9B80]" aria-hidden="true" />
                        ) : (
                          <XCircle className="w-3.5 h-3.5 text-rose-500" aria-hidden="true" />
                        )}
                        {room.cancellationTerms}
                      </dd>
                    </div>
                    <div className="flex justify-between gap-2">
                      <dt className="text-[#748198]">Payment</dt>
                      <dd className="font-medium text-slate-700 text-right">{room.paymentTerms}</dd>
                    </div>
                  </dl>

                  {room.equivalenceWarning && (
                    <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-[11px] text-amber-900 flex items-start gap-2">
                      <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" aria-hidden="true" />
                      <span>{room.equivalenceWarning}</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="px-5 py-4 bg-[#F7F9FC] border-t border-slate-200 flex items-center justify-between gap-3">
                <div>
                  <span className="block text-[10px] text-[#748198] uppercase font-semibold">
                    {room.availability}
                  </span>
                  <span className="font-display font-extrabold text-2xl text-[#101C35]">
                    {formatInr(room.priceInr)}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() =>
                    addTripItem({
                      id: `${hotel.id}-${room.id}`,
                      type: 'Hotel',
                      title: `${hotel.name} — ${room.rawRoomName}`,
                      subtitle: `${room.bedType} · ${room.mealPlan} · ${room.roomSizeSqm} m²`,
                      supplier: room.supplierName,
                      destination: hotel.location,
                      image: hotel.image,
                      priceInr: room.priceInr,
                      policy: room.cancellationTerms,
                    })
                  }
                  className="px-4 py-2.5 rounded-xl bg-[#1677FF] hover:bg-[#0F65E0] text-white text-xs font-bold cursor-pointer transition-colors"
                >
                  Select Room
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}

