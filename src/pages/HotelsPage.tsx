import { useState } from 'react';
import {
  MapPin,
  Star,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  BedDouble,
  Building2,
} from 'lucide-react';
import { HOTEL_PROPERTIES } from '../data/hotelData';
import { SafeImage } from '../components/common/SafeImage';
import { DemoBadge } from '../components/common/DemoBadge';
import { formatInr } from '../utils/formatters';

export function HotelsPage() {
  const [selectedHotelId, setSelectedHotelId] = useState(HOTEL_PROPERTIES[0].id);
  const [selectedGalleryIdx, setSelectedGalleryIdx] = useState(0);

  const selectedHotel =
    HOTEL_PROPERTIES.find((h) => h.id === selectedHotelId) ?? HOTEL_PROPERTIES[0];

  const handleSelectHotel = (id: string) => {
    setSelectedHotelId(id);
    setSelectedGalleryIdx(0);
  };

  const activePhoto =
    selectedHotel.galleryImages[selectedGalleryIdx]?.src ?? selectedHotel.image;

  return (
    <div className="space-y-5">
      {/* Header Banner */}
      <div className="bg-white rounded-xl border border-slate-200 p-4 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-start gap-2.5 text-xs text-[#182338] max-w-3xl">
          <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" aria-hidden="true" />
          <p>
            <strong>Attribute-First Room Equivalence:</strong> TripMatch AI never assumes two rooms are equivalent just because their names look similar (e.g., &ldquo;Deluxe King Room&rdquo; vs &ldquo;Deluxe Room&rdquo;). Every bed type, occupancy, meal plan, and cancellation policy is explicitly compared.
          </p>
        </div>
        <DemoBadge label="Synthetic Hotel Demo Feeds" />
      </div>

      {/* Hotel Property Cards Grid */}
      <section aria-label="Consolidated hotel properties" className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {HOTEL_PROPERTIES.map((hotel) => {
          const isSelected = hotel.id === selectedHotel.id;
          return (
            <button
              key={hotel.id}
              type="button"
              onClick={() => handleSelectHotel(hotel.id)}
              className={`text-left bg-white rounded-2xl overflow-hidden border transition-all flex flex-col cursor-pointer ${
                isSelected
                  ? 'border-[#14B8D4] ring-2 ring-[#14B8D4]/25 shadow-md'
                  : 'border-slate-200 shadow-xs hover:border-slate-300'
              }`}
            >
              <div className="relative h-44 w-full bg-[#101C38]">
                <SafeImage src={hotel.image} alt={hotel.name} />
                <div className="absolute top-2.5 left-2.5 inline-flex items-center gap-0.5 px-2 py-0.5 rounded-full bg-[#0B1530]/80 text-amber-300 text-[10px] font-bold">
                  {Array.from({ length: hotel.starRating }).map((_, i) => (
                    <Star key={i} className="w-2.5 h-2.5 fill-amber-300" aria-hidden="true" />
                  ))}
                </div>
                <div className="absolute top-2.5 right-2.5 px-2.5 py-0.5 rounded-full bg-[#0D9B80] text-white text-[11px] font-bold">
                  {hotel.propertyMatchConfidence}% Property Match
                </div>
              </div>

              <div className="p-4 flex-1 flex flex-col justify-between w-full gap-3">
                <div>
                  <div className="flex items-center justify-between text-xs text-[#7C899D]">
                    <span className="inline-flex items-center gap-1 truncate">
                      <MapPin className="w-3.5 h-3.5 text-[#14B8D4] shrink-0" aria-hidden="true" />
                      <span className="truncate">{hotel.location}</span>
                    </span>
                  </div>
                  <h2 className="font-display font-bold text-base text-[#0B1530] mt-1">
                    {hotel.name}
                  </h2>
                  <div className="flex items-center gap-3 mt-2 text-xs text-[#475569]">
                    <span className="inline-flex items-center gap-1">
                      <Building2 className="w-3.5 h-3.5 text-[#1677E8]" aria-hidden="true" />
                      {hotel.supplierCount} Suppliers
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <BedDouble className="w-3.5 h-3.5 text-[#0D9B80]" aria-hidden="true" />
                      {hotel.roomCount} Rooms
                    </span>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                  <div>
                    <span className="block text-[10px] uppercase tracking-wider text-[#7C899D] font-semibold">
                      Indicative Lowest Rate
                    </span>
                    <span className="font-display font-extrabold text-lg text-[#0B1530]">
                      {formatInr(hotel.lowestPriceInr)}
                      <span className="text-xs font-normal text-[#7C899D]"> / night</span>
                    </span>
                  </div>
                  <span
                    className={`px-2.5 py-1 rounded-lg text-xs font-semibold ${
                      isSelected
                        ? 'bg-[#0B1530] text-white'
                        : 'bg-[#F3F6FA] text-[#0B1530]'
                    }`}
                  >
                    {isSelected ? 'Inspecting Rooms' : 'View Matrix'}
                  </span>
                </div>
              </div>
            </button>
          );
        })}
      </section>

      {/* Selected Property Spotlight + Interactive Gallery */}
      <section className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-12">
          <div className="lg:col-span-5 relative bg-[#101C38] min-h-[260px]">
            <SafeImage src={activePhoto} alt={selectedHotel.name} />
            <div className="absolute bottom-3 inset-x-3 flex items-center gap-1.5 overflow-x-auto pb-1">
              {selectedHotel.galleryImages.map((img, idx) => (
                <button
                  key={img.label}
                  type="button"
                  onClick={() => setSelectedGalleryIdx(idx)}
                  className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold whitespace-nowrap backdrop-blur-xs cursor-pointer transition-colors ${
                    idx === selectedGalleryIdx
                      ? 'bg-[#14B8D4] text-[#0B1530]'
                      : 'bg-[#0B1530]/75 text-white hover:bg-[#0B1530]'
                  }`}
                >
                  {img.label}
                </button>
              ))}
            </div>
          </div>

          <div className="lg:col-span-7 p-5 flex flex-col justify-between gap-4">
            <div>
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="px-2.5 py-0.5 rounded-full bg-[#1677E8]/10 text-[#1677E8] text-[11px] font-bold">
                  Canonical Hotel Profile · {selectedHotel.propertyMatchConfidence}% Match
                </span>
                <DemoBadge label="Illustrative Demo Rates" />
              </div>
              <h2 className="font-display font-extrabold text-2xl text-[#0B1530] mt-2">
                {selectedHotel.name}
              </h2>
              <p className="text-xs text-[#7C899D] mt-0.5">{selectedHotel.location}</p>

              <ul className="mt-3 space-y-1.5">
                {selectedHotel.highlights.map((h) => (
                  <li key={h} className="flex items-start gap-2 text-xs text-slate-700">
                    <CheckCircle2 className="w-4 h-4 text-[#0D9B80] shrink-0 mt-0.5" aria-hidden="true" />
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Quick Offer Summary Strip */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {selectedHotel.roomOffers.map((offer) => (
                <div
                  key={offer.id}
                  className={`rounded-xl p-3 border ${
                    offer.equivalenceWarning
                      ? 'border-amber-300 bg-amber-50/60'
                      : 'border-slate-200 bg-[#F8FAFC]'
                  }`}
                >
                  <span className="text-[10px] font-bold uppercase text-[#1677E8]">
                    {offer.supplierName.split('—')[0]}
                  </span>
                  <p className="font-bold text-xs text-[#0B1530] mt-0.5 truncate">
                    {offer.rawRoomName}
                  </p>
                  <p className="font-display font-extrabold text-lg text-[#0B1530] mt-1">
                    {formatInr(offer.priceInr)}
                  </p>
                  <p className="text-[11px] text-slate-600 mt-0.5">{offer.mealPlan}</p>
                  <p className="text-[11px] text-slate-500">{offer.cancellationTerms}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Full Room Equivalence Comparison Matrix */}
        <div className="border-t border-slate-200 p-5">
          <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
            <div>
              <h3 className="font-display font-bold text-base text-[#0B1530]">
                Room Equivalence Comparison Matrix — {selectedHotel.name}
              </h3>
              <p className="text-xs text-[#7C899D]">
                Comparing structured room attributes and commercial booking conditions across suppliers.
              </p>
            </div>
          </div>

          {/* Warnings for name-similar non-equivalent offers */}
          {selectedHotel.roomOffers
            .filter((o) => o.equivalenceWarning)
            .map((o) => (
              <div
                key={o.id}
                className="mb-3 p-3 rounded-xl bg-amber-50 border border-amber-200 flex items-start gap-2.5 text-xs text-amber-900"
              >
                <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" aria-hidden="true" />
                <div>
                  <strong>Non-Equivalence Guardrail ({o.supplierName}):</strong>{' '}
                  {o.equivalenceWarning}
                </div>
              </div>
            ))}

          <div
            tabIndex={0}
            role="region"
            aria-label={`Room equivalence comparison matrix for ${selectedHotel.name}`}
            className="tiq-table-region border border-slate-200"
          >
            <table className="tiq-table text-xs text-left">
              <thead className="bg-[#0B1530] text-white">
                <tr>
                  <th scope="col" className="p-3 font-semibold w-44">
                    Room Attribute
                  </th>
                  {selectedHotel.roomOffers.map((offer) => (
                    <th key={offer.id} scope="col" className="p-3 font-semibold">
                      <div className="flex items-center justify-between gap-2">
                        <span>{offer.rawRoomName}</span>
                        <span className="px-2 py-0.5 rounded bg-white/10 text-[#14B8D4] text-[10px]">
                          {offer.equivalenceGroup}
                        </span>
                      </div>
                      <span className="block text-[11px] font-normal text-slate-300 mt-0.5">
                        {offer.supplierName}
                      </span>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 bg-white">
                <tr>
                  <th scope="row" className="p-3 font-semibold bg-[#F8FAFC] text-[#0B1530]">
                    Room Category
                  </th>
                  {selectedHotel.roomOffers.map((o) => (
                    <td key={o.id} className="p-3 font-medium text-[#0B1530]">
                      {o.canonicalCategory} ({o.roomSizeSqm} m²)
                    </td>
                  ))}
                </tr>
                <tr>
                  <th scope="row" className="p-3 font-semibold bg-[#F8FAFC] text-[#0B1530]">
                    Bed Type
                  </th>
                  {selectedHotel.roomOffers.map((o) => (
                    <td key={o.id} className="p-3">
                      {o.bedType}
                    </td>
                  ))}
                </tr>
                <tr>
                  <th scope="row" className="p-3 font-semibold bg-[#F8FAFC] text-[#0B1530]">
                    Occupancy
                  </th>
                  {selectedHotel.roomOffers.map((o) => (
                    <td key={o.id} className="p-3">
                      {o.occupancy}
                    </td>
                  ))}
                </tr>
                <tr>
                  <th scope="row" className="p-3 font-semibold bg-[#F8FAFC] text-[#0B1530]">
                    Amenities
                  </th>
                  {selectedHotel.roomOffers.map((o) => (
                    <td key={o.id} className="p-3">
                      <div className="flex flex-wrap gap-1">
                        {o.amenities.map((a) => (
                          <span
                            key={a}
                            className="px-2 py-0.5 rounded bg-[#F3F6FA] text-slate-700 border border-slate-200 text-[11px]"
                          >
                            {a}
                          </span>
                        ))}
                      </div>
                    </td>
                  ))}
                </tr>
                <tr>
                  <th scope="row" className="p-3 font-semibold bg-[#F8FAFC] text-[#0B1530]">
                    Meal Plan
                  </th>
                  {selectedHotel.roomOffers.map((o) => (
                    <td key={o.id} className="p-3 font-semibold">
                      <span
                        className={
                          o.mealPlan.includes('Room Only')
                            ? 'text-amber-700'
                            : 'text-[#0D9B80]'
                        }
                      >
                        {o.mealPlan}
                      </span>
                    </td>
                  ))}
                </tr>
                <tr>
                  <th scope="row" className="p-3 font-semibold bg-[#F8FAFC] text-[#0B1530]">
                    Indicative Price
                  </th>
                  {selectedHotel.roomOffers.map((o) => (
                    <td key={o.id} className="p-3 font-display font-extrabold text-base text-[#0B1530]">
                      {formatInr(o.priceInr)}
                    </td>
                  ))}
                </tr>
                <tr>
                  <th scope="row" className="p-3 font-semibold bg-[#F8FAFC] text-[#0B1530]">
                    Availability
                  </th>
                  {selectedHotel.roomOffers.map((o) => (
                    <td key={o.id} className="p-3">
                      <span
                        className={`inline-flex px-2 py-0.5 rounded-full text-[11px] font-semibold ${
                          o.availability.startsWith('Available')
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                            : 'bg-amber-50 text-amber-800 border border-amber-200'
                        }`}
                      >
                        {o.availability}
                      </span>
                    </td>
                  ))}
                </tr>
                <tr>
                  <th scope="row" className="p-3 font-semibold bg-[#F8FAFC] text-[#0B1530]">
                    Cancellation Terms
                  </th>
                  {selectedHotel.roomOffers.map((o) => (
                    <td key={o.id} className="p-3">
                      <span className="inline-flex items-center gap-1.5 font-medium">
                        {o.refundable ? (
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#0D9B80]" aria-hidden="true" />
                        ) : (
                          <XCircle className="w-3.5 h-3.5 text-rose-500" aria-hidden="true" />
                        )}
                        {o.cancellationTerms}
                      </span>
                    </td>
                  ))}
                </tr>
                <tr>
                  <th scope="row" className="p-3 font-semibold bg-[#F8FAFC] text-[#0B1530]">
                    Payment Terms
                  </th>
                  {selectedHotel.roomOffers.map((o) => (
                    <td key={o.id} className="p-3 text-slate-700">
                      {o.paymentTerms}
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </div>
  );
}

