import { CheckCircle2, XCircle, ShieldAlert } from 'lucide-react';
import { SightseeingProduct } from '../../types/inventory';
import { ModalDialog } from '../common/ModalDialog';
import { DemoBadge } from '../common/DemoBadge';
import { formatInr } from '../../utils/formatters';

interface DifferenceMatrixModalProps {
  product: SightseeingProduct | null;
  open: boolean;
  onClose: () => void;
}

export function DifferenceMatrixModal({
  product,
  open,
  onClose,
}: DifferenceMatrixModalProps) {
  if (!product) return null;

  const attributeRows: {
    label: string;
    render: (offer: SightseeingProduct['offers'][number]) => string;
  }[] = [
    { label: 'Indicative Price', render: (o) => formatInr(o.priceInr) },
    { label: 'Duration', render: (o) => o.duration },
    { label: 'Access Type', render: (o) => o.accessType },
    { label: 'Inclusions', render: (o) => o.inclusions.join(' · ') },
    { label: 'Exclusions', render: (o) => o.exclusions.join(' · ') },
    {
      label: 'Transfer Availability',
      render: (o) => `${o.transferAvailable ? 'Included — ' : 'Not Included — '}${o.transferDetails}`,
    },
    {
      label: 'Meal Availability',
      render: (o) => `${o.mealAvailable ? 'Included — ' : 'Not Included — '}${o.mealDetails}`,
    },
    { label: 'Activity Options', render: (o) => o.activityOptions.join(' · ') },
    { label: 'Cancellation Policy', render: (o) => o.cancellationPolicy },
  ];

  return (
    <ModalDialog
      open={open}
      onClose={onClose}
      title={`${product.canonicalName} — Attribute & Inclusion Differences`}
      subtitle={`${product.destination} · ${product.offers.length} Consolidated Supplier Offers · Shared Attraction Preserved`}
    >
      <div className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-2 bg-[#F3F6FA] border border-slate-200 rounded-xl p-3.5">
          <div className="flex items-start gap-2.5 text-xs text-[#182338]">
            <ShieldAlert className="w-4 h-4 text-[#0D9B80] shrink-0 mt-0.5" aria-hidden="true" />
            <p>
              <strong>Differences Preserved:</strong> {product.sharedAttractionNote}
            </p>
          </div>
          <DemoBadge label="Synthetic Demo Data" />
        </div>

        <div className="overflow-x-auto border border-slate-200 rounded-xl">
          <table className="w-full text-xs text-left border-collapse min-w-[640px]">
            <thead className="bg-[#0B1530] text-white">
              <tr>
                <th scope="col" className="p-3 font-semibold w-44">
                  Bookable Attribute
                </th>
                {product.offers.map((offer) => (
                  <th key={offer.id} scope="col" className="p-3 font-semibold">
                    <div className="flex items-center justify-between gap-2">
                      <span>{offer.supplierName.split('—')[0].trim()}</span>
                      <span className="px-2 py-0.5 rounded bg-[#14B8D4]/20 text-[#94E8F5] text-[10px]">
                        {offer.badge}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-300 font-normal mt-0.5">
                      {offer.supplierName.split('—')[1]?.trim()}
                    </p>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 bg-white">
              {attributeRows.map((row) => (
                <tr key={row.label} className="hover:bg-slate-50">
                  <th
                    scope="row"
                    className="p-3 font-semibold text-[#0B1530] bg-[#F8FAFC] align-top"
                  >
                    {row.label}
                  </th>
                  {product.offers.map((offer) => {
                    const value = row.render(offer);
                    const isTransfer = row.label === 'Transfer Availability';
                    const isMeal = row.label === 'Meal Availability';
                    return (
                      <td key={offer.id} className="p-3 text-slate-700 align-top">
                        {(isTransfer || isMeal) && (
                          <span className="inline-flex items-center gap-1 font-semibold mb-0.5 mr-1">
                            {(isTransfer ? offer.transferAvailable : offer.mealAvailable) ? (
                              <CheckCircle2 className="w-3.5 h-3.5 text-[#0D9B80]" aria-hidden="true" />
                            ) : (
                              <XCircle className="w-3.5 h-3.5 text-rose-500" aria-hidden="true" />
                            )}
                          </span>
                        )}
                        <span className={row.label === 'Indicative Price' ? 'font-display font-extrabold text-sm text-[#0B1530]' : ''}>
                          {value}
                        </span>
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </ModalDialog>
  );
}

