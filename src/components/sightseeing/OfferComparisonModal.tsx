import { Award, CheckCircle2, Tag, XCircle, ShieldCheck } from 'lucide-react';
import { SightseeingProduct } from '../../types/inventory';
import { ModalDialog } from '../common/ModalDialog';
import { DemoBadge } from '../common/DemoBadge';
import { formatInr } from '../../utils/formatters';
import { useTrips } from '../../context/TripContext';

interface OfferComparisonModalProps {
  product: SightseeingProduct | null;
  open: boolean;
  onClose: () => void;
}

export function OfferComparisonModal({
  product,
  open,
  onClose,
}: OfferComparisonModalProps) {
  const { addTripItem } = useTrips();

  if (!product) return null;

  const cheapestOffer = product.offers.reduce((min, cur) =>
    cur.priceInr < min.priceInr ? cur : min
  );
  // Best value: balances guide/inclusions + flexible cancellation + reliability (never simply cheapest)
  const bestValueOffer = product.offers.reduce((best, cur) => {
    const score = (o: typeof cur) =>
      o.inclusions.length * 18 +
      (o.transferAvailable ? 22 : 0) +
      (o.mealAvailable ? 16 : 0) +
      (o.cancellationPolicy.toLowerCase().includes('free') ? 24 : 0) +
      o.reliabilityScore * 0.5 -
      o.priceInr / 150;
    return score(cur) > score(best) ? cur : best;
  });

  return (
    <ModalDialog
      open={open}
      onClose={onClose}
      title={`Compare Supplier Offers — ${product.canonicalName}`}
      subtitle={`${product.destination} · ${product.matchConfidence}% AI Entity Match · Bookable Differences Preserved`}
    >
      <div className="space-y-5">
        {/* Best Value vs Lowest Price Callout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div className="rounded-xl p-3.5 bg-[#0D9B80]/8 border border-[#0D9B80]/30 flex items-start gap-3">
            <Award className="w-5 h-5 text-[#0D9B80] shrink-0 mt-0.5" aria-hidden="true" />
            <div className="text-xs">
              <span className="font-bold uppercase tracking-wider text-[#0D9B80]">
                Recommended Best Value
              </span>
              <p className="font-bold text-[#101C35] mt-0.5">
                {bestValueOffer.supplierName} — {formatInr(bestValueOffer.priceInr)}
              </p>
              <p className="text-slate-600 mt-0.5">
                {bestValueOffer.duration} · {bestValueOffer.cancellationPolicy}
              </p>
            </div>
          </div>

          <div className="rounded-xl p-3.5 bg-[#1677FF]/8 border border-[#1677FF]/30 flex items-start gap-3">
            <Tag className="w-5 h-5 text-[#1677FF] shrink-0 mt-0.5" aria-hidden="true" />
            <div className="text-xs">
              <span className="font-bold uppercase tracking-wider text-[#1677FF]">
                Lowest Headline Price (Fewer Inclusions)
              </span>
              <p className="font-bold text-[#101C35] mt-0.5">
                {cheapestOffer.supplierName} — {formatInr(cheapestOffer.priceInr)}
              </p>
              <p className="text-slate-600 mt-0.5">
                {cheapestOffer.duration} · {cheapestOffer.cancellationPolicy}
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-slate-600">
          <p className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-[#0D9B80]" aria-hidden="true" />
            <span>{product.sharedAttractionNote}</span>
          </p>
          <DemoBadge label="Illustrative Demo Rates" />
        </div>

        {/* Comparison Table */}
        <div className="overflow-x-auto border border-slate-200 rounded-xl">
          <table className="w-full text-xs text-left border-collapse min-w-[660px]">
            <thead className="bg-[#101C35] text-white">
              <tr>
                <th scope="col" className="p-3 font-semibold w-40">
                  Comparison Factor
                </th>
                {product.offers.map((offer) => {
                  const isBestValue = offer.id === bestValueOffer.id;
                  const isCheapest = offer.id === cheapestOffer.id;
                  return (
                    <th key={offer.id} scope="col" className="p-3 font-semibold">
                      <div className="flex flex-wrap items-center gap-1.5 mb-1">
                        {isBestValue && (
                          <span className="px-2 py-0.5 rounded-full bg-[#0D9B80] text-white text-[10px] font-bold">
                            Best Value
                          </span>
                        )}
                        {isCheapest && (
                          <span className="px-2 py-0.5 rounded-full bg-[#1677FF] text-white text-[10px] font-bold">
                            Cheapest
                          </span>
                        )}
                      </div>
                      <span className="block text-sm">{offer.supplierName.split('—')[0]}</span>
                      <span className="block text-[11px] font-normal text-slate-300">
                        {offer.supplierName.split('—')[1]}
                      </span>
                    </th>
                  );
                })}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 bg-white">
              <tr>
                <th scope="row" className="p-3 font-semibold bg-[#F7F9FC] text-[#101C35]">
                  Price
                </th>
                {product.offers.map((o) => (
                  <td key={o.id} className="p-3 font-display font-extrabold text-base text-[#101C35]">
                    {formatInr(o.priceInr)}
                  </td>
                ))}
              </tr>
              <tr>
                <th scope="row" className="p-3 font-semibold bg-[#F7F9FC] text-[#101C35]">
                  Duration
                </th>
                {product.offers.map((o) => (
                  <td key={o.id} className="p-3 font-medium text-slate-700">
                    {o.duration}
                  </td>
                ))}
              </tr>
              <tr>
                <th scope="row" className="p-3 font-semibold bg-[#F7F9FC] text-[#101C35]">
                  Inclusions
                </th>
                {product.offers.map((o) => (
                  <td key={o.id} className="p-3 align-top">
                    <ul className="space-y-1">
                      {o.inclusions.map((inc) => (
                        <li key={inc} className="flex items-start gap-1.5 text-slate-700">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#0D9B80] shrink-0 mt-0.5" aria-hidden="true" />
                          <span>{inc}</span>
                        </li>
                      ))}
                    </ul>
                  </td>
                ))}
              </tr>
              <tr>
                <th scope="row" className="p-3 font-semibold bg-[#F7F9FC] text-[#101C35]">
                  Transfers
                </th>
                {product.offers.map((o) => (
                  <td key={o.id} className="p-3">
                    <span className="inline-flex items-start gap-1.5">
                      {o.transferAvailable ? (
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#0D9B80] shrink-0 mt-0.5" aria-hidden="true" />
                      ) : (
                        <XCircle className="w-3.5 h-3.5 text-rose-400 shrink-0 mt-0.5" aria-hidden="true" />
                      )}
                      <span>{o.transferDetails}</span>
                    </span>
                  </td>
                ))}
              </tr>
              <tr>
                <th scope="row" className="p-3 font-semibold bg-[#F7F9FC] text-[#101C35]">
                  Meals
                </th>
                {product.offers.map((o) => (
                  <td key={o.id} className="p-3">
                    <span className="inline-flex items-start gap-1.5">
                      {o.mealAvailable ? (
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#0D9B80] shrink-0 mt-0.5" aria-hidden="true" />
                      ) : (
                        <XCircle className="w-3.5 h-3.5 text-rose-400 shrink-0 mt-0.5" aria-hidden="true" />
                      )}
                      <span>{o.mealDetails}</span>
                    </span>
                  </td>
                ))}
              </tr>
              <tr>
                <th scope="row" className="p-3 font-semibold bg-[#F7F9FC] text-[#101C35]">
                  Cancellation
                </th>
                {product.offers.map((o) => (
                  <td key={o.id} className="p-3 font-medium text-slate-700">
                    {o.cancellationPolicy}
                  </td>
                ))}
              </tr>
              <tr>
                <th scope="row" className="p-3 font-semibold bg-[#F7F9FC] text-[#101C35]">
                  Match Confidence
                </th>
                {product.offers.map((o) => (
                  <td key={o.id} className="p-3 font-bold text-[#0D9B80]">
                    {product.matchConfidence}% Entity Match · {o.reliabilityScore}% Trust
                  </td>
                ))}
              </tr>
              <tr>
                <th scope="row" className="p-3 font-semibold bg-[#F7F9FC] text-[#101C35]">
                  Select Offer
                </th>
                {product.offers.map((o) => (
                  <td key={o.id} className="p-3">
                    <button
                      type="button"
                      onClick={() => {
                        addTripItem({
                          id: `${product.id}-${o.id}`,
                          type: 'Experience',
                          title: product.canonicalName,
                          subtitle: `${o.inclusions.slice(0, 2).join(' + ')} · ${o.duration}`,
                          supplier: o.supplierName,
                          destination: product.destination,
                          image: product.image,
                          priceInr: o.priceInr,
                          policy: o.cancellationPolicy,
                        });
                        onClose();
                      }}
                      className="w-full py-2 px-3 rounded-lg bg-[#1677FF] hover:bg-[#0F65E0] text-white font-bold text-xs transition-colors cursor-pointer"
                    >
                      Select {formatInr(o.priceInr)}
                    </button>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </ModalDialog>
  );
}
