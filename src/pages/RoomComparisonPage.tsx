import { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import {
  AlertTriangle,
  CheckCircle2,
  XCircle,
  ArrowRight,
  BedDouble,
} from 'lucide-react';
import { HOTEL_PROPERTIES } from '../data/hotelData';
import { AiIntelligenceShell } from '../components/layout/AiIntelligenceShell';
import { SafeImage } from '../components/common/SafeImage';
import { useTrips } from '../context/TripContext';
import { formatInr } from '../utils/formatters';

export function RoomComparisonPage() {
  const [searchParams] = useSearchParams();
  const { addTripItem } = useTrips();
  const initialId = searchParams.get('hotel') ?? HOTEL_PROPERTIES[0].id;

  const [selectedHotelId, setSelectedHotelId] = useState(
    HOTEL_PROPERTIES.some((h) => h.id === initialId) ? initialId : HOTEL_PROPERTIES[0].id
  );

  const hotel =
    HOTEL_PROPERTIES.find((h) => h.id === selectedHotelId) ?? HOTEL_PROPERTIES[0];

  return (
    <AiIntelligenceShell
      title="Hotel Room Equivalence & Attribute Comparison"
      subtitle="Compare bed type, occupancy, room size, amenities, meal plans, refundability, and payment conditions across suppliers without blindly merging name-similar rooms."
      badge="AI Room Mapping Engine"
    >
      <div className="space-y-6">
        {/* Property Switcher */}
        <div className="bg-white rounded-2xl border border-slate-200 p-4 flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-2">
            {HOTEL_PROPERTIES.map((h) => (
              <button
                key={h.id}
                type="button"
                onClick={() => setSelectedHotelId(h.id)}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  h.id === hotel.id
                    ? 'bg-[#101C35] text-white shadow-xs'
                    : 'bg-[#F7F9FC] text-slate-700 hover:bg-slate-200/70'
                }`}
              >
                {h.name}
              </button>
            ))}
          </div>
          <Link
            to={`/hotels/${hotel.id}`}
            className="inline-flex items-center gap-1 text-xs font-bold text-[#1677FF] hover:underline"
          >
            Open Property Page <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
          </Link>
        </div>

        {/* Property Header Strip */}
        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden grid grid-cols-1 lg:grid-cols-12">
          <div className="lg:col-span-4 h-52 lg:h-auto bg-[#101C35]">
            <SafeImage src={hotel.image} alt={hotel.name} />
          </div>
          <div className="lg:col-span-8 p-5 flex flex-col justify-between gap-4">
            <div>
              <span className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0D9B80]">
                <BedDouble className="w-4 h-4" aria-hidden="true" />
                {hotel.propertyMatchConfidence}% Property Match · {hotel.supplierCount} Connected Demo Feeds
              </span>
              <h2 className="font-display font-extrabold text-2xl text-[#101C35] mt-1">
                {hotel.name}
              </h2>
              <p className="text-xs text-[#748198]">{hotel.location}</p>
            </div>

            {hotel.roomOffers
              .filter((r) => r.equivalenceWarning)
              .map((r) => (
                <div
                  key={r.id}
                  className="p-3.5 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-950 flex items-start gap-2.5"
                >
                  <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" aria-hidden="true" />
                  <div>
                    <strong>Non-Equivalence Guardrail ({r.supplierName}):</strong>{' '}
                    {r.equivalenceWarning}
                  </div>
                </div>
              ))}
          </div>
        </div>

        {/* Full Side-by-Side Room Matrix */}
        <div
          tabIndex={0}
          role="region"
          aria-label={`Room equivalence comparison matrix for ${hotel.name}`}
          className="tiq-table-region border border-slate-200 bg-white shadow-xs"
        >
          <table className="tiq-table text-xs text-left">
            <thead className="bg-[#101C35] text-white">
              <tr>
                <th scope="col" className="p-3.5 font-semibold w-44">
                  Room Attribute
                </th>
                {hotel.roomOffers.map((offer) => (
                  <th key={offer.id} scope="col" className="p-3.5 font-semibold">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-sm">{offer.rawRoomName}</span>
                      <span className="px-2 py-0.5 rounded bg-[#19C5D8]/20 text-[#94F0FA] text-[10px]">
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
            <tbody className="divide-y divide-slate-200">
              <tr>
                <th scope="row" className="p-3.5 font-bold bg-[#F7F9FC] text-[#101C35]">
                  Indicative Price
                </th>
                {hotel.roomOffers.map((o) => (
                  <td key={o.id} className="p-3.5 font-display font-extrabold text-lg text-[#101C35]">
                    {formatInr(o.priceInr)} <span className="text-[11px] font-normal text-[#748198]">/ night</span>
                  </td>
                ))}
              </tr>
              <tr>
                <th scope="row" className="p-3.5 font-bold bg-[#F7F9FC] text-[#101C35]">
                  Canonical Category
                </th>
                {hotel.roomOffers.map((o) => (
                  <td key={o.id} className="p-3.5 font-medium text-[#101C35]">{o.canonicalCategory}</td>
                ))}
              </tr>
              <tr>
                <th scope="row" className="p-3.5 font-bold bg-[#F7F9FC] text-[#101C35]">
                  Bed Type
                </th>
                {hotel.roomOffers.map((o) => (
                  <td key={o.id} className="p-3.5">{o.bedType}</td>
                ))}
              </tr>
              <tr>
                <th scope="row" className="p-3.5 font-bold bg-[#F7F9FC] text-[#101C35]">
                  Occupancy
                </th>
                {hotel.roomOffers.map((o) => (
                  <td key={o.id} className="p-3.5">{o.occupancy}</td>
                ))}
              </tr>
              <tr>
                <th scope="row" className="p-3.5 font-bold bg-[#F7F9FC] text-[#101C35]">
                  Room Size
                </th>
                {hotel.roomOffers.map((o) => (
                  <td key={o.id} className="p-3.5 font-semibold">{o.roomSizeSqm} m²</td>
                ))}
              </tr>
              <tr>
                <th scope="row" className="p-3.5 font-bold bg-[#F7F9FC] text-[#101C35]">
                  Amenities
                </th>
                {hotel.roomOffers.map((o) => (
                  <td key={o.id} className="p-3.5">
                    <div className="flex flex-wrap gap-1">
                      {o.amenities.map((a) => (
                        <span key={a} className="px-2 py-0.5 rounded bg-[#F7F9FC] border border-slate-200 text-[11px]">
                          {a}
                        </span>
                      ))}
                    </div>
                  </td>
                ))}
              </tr>
              <tr>
                <th scope="row" className="p-3.5 font-bold bg-[#F7F9FC] text-[#101C35]">
                  Breakfast / Meal Plan
                </th>
                {hotel.roomOffers.map((o) => (
                  <td key={o.id} className="p-3.5 font-semibold">
                    <span className={o.mealPlan.includes('Room Only') ? 'text-amber-700' : 'text-[#0D9B80]'}>
                      {o.mealPlan}
                    </span>
                  </td>
                ))}
              </tr>
              <tr>
                <th scope="row" className="p-3.5 font-bold bg-[#F7F9FC] text-[#101C35]">
                  Refundability & Deadlines
                </th>
                {hotel.roomOffers.map((o) => (
                  <td key={o.id} className="p-3.5">
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
                <th scope="row" className="p-3.5 font-bold bg-[#F7F9FC] text-[#101C35]">
                  Payment Terms
                </th>
                {hotel.roomOffers.map((o) => (
                  <td key={o.id} className="p-3.5 text-slate-700">{o.paymentTerms}</td>
                ))}
              </tr>
              <tr>
                <th scope="row" className="p-3.5 font-bold bg-[#F7F9FC] text-[#101C35]">
                  Action
                </th>
                {hotel.roomOffers.map((o) => (
                  <td key={o.id} className="p-3.5">
                    <button
                      type="button"
                      onClick={() =>
                        addTripItem({
                          id: `${hotel.id}-${o.id}`,
                          type: 'Hotel',
                          title: `${hotel.name} — ${o.rawRoomName}`,
                          subtitle: `${o.bedType} · ${o.mealPlan}`,
                          supplier: o.supplierName,
                          destination: hotel.location,
                          image: hotel.image,
                          priceInr: o.priceInr,
                          policy: o.cancellationTerms,
                        })
                      }
                      className="px-3.5 py-2 rounded-xl bg-[#1677FF] hover:bg-[#0F65E0] text-white font-bold text-xs cursor-pointer"
                    >
                      Select Room ({formatInr(o.priceInr)})
                    </button>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </AiIntelligenceShell>
  );
}

