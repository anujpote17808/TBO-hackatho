import { useEffect, useState } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  Maximize2,
  Minimize2,
  X,
  Globe,
  CheckCircle2,
  Sparkles,
  ShieldCheck,
  TrendingUp,
  Layers,
  Milestone,
} from 'lucide-react';
import { OVERVIEW_KPIS, WORKFLOW_STEPS } from '../../data/overviewData';
import { SIGHTSEEING_PRODUCTS } from '../../data/sightseeingData';
import { HOTEL_PROPERTIES } from '../../data/hotelData';
import { ARCHITECTURE_LAYERS } from '../../data/architectureData';
import { EVALUATION_KPIS, BUSINESS_VALUE_PILLARS } from '../../data/impactData';
import { ROADMAP_MILESTONES } from '../../data/roadmapData';
import { RANKING_PRODUCTS } from '../../data/rankingData';
import { computeRankedInventory, DEFAULT_RANKING_WEIGHTS } from '../../utils/rankingEngine';
import { SUPPLIER_COMPARISON_ROWS } from '../../data/supplierData';
import { SafeImage } from '../common/SafeImage';
import { DemoBadge } from '../common/DemoBadge';
import { formatInr } from '../../utils/formatters';

interface PresentationOverlayProps {
  open: boolean;
  initialSlide: number;
  onClose: () => void;
}

const SLIDE_TITLES = [
  'Inventory Overview',
  'Sightseeing Intelligence',
  'Hotel Intelligence',
  'AI Product Matching',
  'Supplier Comparison',
  'Smart Ranking',
  'Technical Architecture',
  'Business Impact',
  'Roadmap & Conclusion',
];

export function PresentationOverlay({
  open,
  initialSlide,
  onClose,
}: PresentationOverlayProps) {
  const [slideIndex, setSlideIndex] = useState(initialSlide);
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    setSlideIndex(initialSlide);
  }, [initialSlide, open]);

  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === 'PageDown') {
        e.preventDefault();
        setSlideIndex((prev) => Math.min(SLIDE_TITLES.length - 1, prev + 1));
      } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
        e.preventDefault();
        setSlideIndex((prev) => Math.max(0, prev - 1));
      } else if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [open, onClose]);

  useEffect(() => {
    const onFsChange = () => setIsFullscreen(Boolean(document.fullscreenElement));
    document.addEventListener('fullscreenchange', onFsChange);
    return () => document.removeEventListener('fullscreenchange', onFsChange);
  }, []);

  if (!open) return null;

  const toggleFullscreen = async () => {
    try {
      if (!document.fullscreenElement) {
        await document.documentElement.requestFullscreen();
      } else {
        await document.exitFullscreen();
      }
    } catch {
      // Fullscreen may be blocked in restricted frames
    }
  };

  const taj = SIGHTSEEING_PRODUCTS[0];
  const grandPalace = HOTEL_PROPERTIES[0];
  const topRanked = computeRankedInventory(RANKING_PRODUCTS, DEFAULT_RANKING_WEIGHTS).slice(0, 4);

  return (
    <div
      role="region"
      aria-label="TripMatch AI Hackathon Presentation Mode"
      className="fixed inset-0 z-50 bg-[#0B1530] text-white flex flex-col"
    >
      {/* Top Bar */}
      <div className="px-6 py-3.5 border-b border-white/10 flex items-center justify-between gap-4 bg-[#091128]">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#14B8D4] to-[#1677E8] flex items-center justify-center">
            <Globe className="w-4 h-4 text-white" aria-hidden="true" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-display font-bold text-sm">TripMatch AI</span>
              <span className="text-xs text-[#14B8D4] font-semibold">
                Slide {slideIndex + 1} / {SLIDE_TITLES.length} — {SLIDE_TITLES[slideIndex]}
              </span>
            </div>
            <p className="text-[11px] text-slate-400">
              TBO Hackathon Judging Deck · Use ← / → arrow keys to navigate
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <DemoBadge variant="dark" label="Illustrative Demo Data" />
          <button
            type="button"
            onClick={toggleFullscreen}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/15 text-xs font-medium cursor-pointer"
          >
            {isFullscreen ? (
              <>
                <Minimize2 className="w-3.5 h-3.5" aria-hidden="true" /> Exit Fullscreen
              </>
            ) : (
              <>
                <Maximize2 className="w-3.5 h-3.5" aria-hidden="true" /> Fullscreen
              </>
            )}
          </button>
          <button
            type="button"
            onClick={onClose}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-rose-500/20 hover:bg-rose-500/30 border border-rose-400/30 text-rose-200 text-xs font-semibold cursor-pointer"
          >
            <X className="w-3.5 h-3.5" aria-hidden="true" /> Exit Presentation
          </button>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="h-1 bg-white/10 w-full">
        <div
          className="h-full bg-gradient-to-r from-[#14B8D4] to-[#1677E8] transition-all duration-300"
          style={{ width: `${((slideIndex + 1) / SLIDE_TITLES.length) * 100}%` }}
        />
      </div>

      {/* Slide Body */}
      <div className="flex-1 overflow-y-auto p-6 lg:p-10 bg-[#F3F6FA] text-[#182338]">
        <div className="max-w-6xl mx-auto">
          {slideIndex === 0 && (
            <div className="space-y-6">
              <div className="bg-[#0B1530] text-white rounded-2xl p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <span className="text-xs font-bold uppercase tracking-widest text-[#14B8D4]">
                    Slide 01 · Unified Travel Inventory Intelligence
                  </span>
                  <h2 className="text-2xl lg:text-3xl font-display font-extrabold mt-1">
                    TripMatch AI — Enterprise Inventory OS
                  </h2>
                  <p className="text-sm text-slate-300 mt-1 max-w-2xl">
                    Transform fragmented multi-supplier travel inventory into clean, comparable, intelligently ranked and bookable products.
                  </p>
                </div>
                <DemoBadge variant="dark" />
              </div>

              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {OVERVIEW_KPIS.map((k) => (
                  <div key={k.id} className="bg-white rounded-xl p-5 border border-slate-200 shadow-sm">
                    <p className="text-[11px] font-bold tracking-wider uppercase text-[#7C899D]">
                      {k.label}
                    </p>
                    <p className="text-3xl font-display font-extrabold text-[#0B1530] mt-1.5">
                      {k.value}
                    </p>
                    <p className="text-xs font-semibold text-[#0D9B80] mt-1">{k.delta}</p>
                    <p className="text-[10px] text-[#7C899D] mt-1">{k.demoNote}</p>
                  </div>
                ))}
              </div>

              <div className="bg-[#101C38] text-white rounded-xl p-5 grid grid-cols-1 md:grid-cols-4 gap-4">
                {WORKFLOW_STEPS.map((w) => (
                  <div key={w.step} className="bg-white/5 border border-white/10 rounded-lg p-3.5">
                    <span className="text-[11px] font-bold text-[#14B8D4]">
                      0{w.step} · {w.code}
                    </span>
                    <p className="text-xs text-slate-200 mt-1">{w.detail}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {slideIndex === 1 && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-[#1677E8]">
                    Slide 02 · Sightseeing Intelligence
                  </span>
                  <h2 className="text-2xl font-display font-extrabold text-[#0B1530]">
                    Shared Attraction Matching Without Merging Distinct Experiences
                  </h2>
                </div>
                <DemoBadge />
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                <div className="lg:col-span-5 bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-sm">
                  <div className="h-56 relative">
                    <SafeImage src={taj.image} alt={taj.canonicalName} />
                    <span className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-[#0D9B80] text-white text-xs font-bold">
                      {taj.matchConfidence}% Match Confidence
                    </span>
                  </div>
                  <div className="p-5">
                    <h3 className="font-display font-bold text-lg text-[#0B1530]">
                      {taj.canonicalName}
                    </h3>
                    <p className="text-xs text-[#7C899D] mt-1">{taj.sharedAttractionNote}</p>
                  </div>
                </div>
                <div className="lg:col-span-7 grid grid-cols-1 gap-3.5">
                  {taj.offers.map((o) => (
                    <div
                      key={o.id}
                      className="bg-white rounded-xl p-4 border border-slate-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                    >
                      <div>
                        <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-[#14B8D4]/15 text-[#0B1530]">
                          {o.badge}
                        </span>
                        <h4 className="font-bold text-sm text-[#0B1530] mt-1.5">
                          {o.supplierName}
                        </h4>
                        <p className="text-xs text-[#7C899D] mt-0.5">
                          {o.duration} · {o.accessType} · {o.cancellationPolicy}
                        </p>
                        <p className="text-xs text-[#182338] mt-1.5">
                          <strong>Inclusions:</strong> {o.inclusions.join(', ')}
                        </p>
                      </div>
                      <div className="text-right shrink-0">
                        <div className="text-2xl font-display font-extrabold text-[#0B1530]">
                          {formatInr(o.priceInr)}
                        </div>
                        <span className="text-[11px] text-[#7C899D]">Synthetic Demo Rate</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {slideIndex === 2 && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-[#1677E8]">
                    Slide 03 · Hotel & Room Intelligence
                  </span>
                  <h2 className="text-2xl font-display font-extrabold text-[#0B1530]">
                    {grandPalace.name} — Attribute-Level Room Equivalence
                  </h2>
                </div>
                <DemoBadge />
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                {grandPalace.roomOffers.map((room, idx) => (
                  <div
                    key={room.id}
                    className={`bg-white rounded-2xl overflow-hidden border shadow-sm ${
                      room.equivalenceWarning
                        ? 'border-amber-300 ring-1 ring-amber-200'
                        : 'border-slate-200'
                    }`}
                  >
                    <div className="h-36">
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
                    </div>
                    <div className="p-4 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] font-semibold text-[#1677E8]">
                          {room.supplierName.split('—')[0]}
                        </span>
                        <span className="font-display font-extrabold text-lg text-[#0B1530]">
                          {formatInr(room.priceInr)}
                        </span>
                      </div>
                      <h3 className="font-bold text-sm text-[#0B1530]">{room.rawRoomName}</h3>
                      <ul className="text-xs text-slate-600 space-y-1">
                        <li>• Bed: {room.bedType}</li>
                        <li>• Meal Plan: {room.mealPlan}</li>
                        <li>• Cancellation: {room.cancellationTerms}</li>
                        <li>• Payment: {room.paymentTerms}</li>
                      </ul>
                      {room.equivalenceWarning && (
                        <div className="p-2.5 rounded-lg bg-amber-50 border border-amber-200 text-[11px] text-amber-900">
                          {room.equivalenceWarning}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {slideIndex === 3 && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-[#1677E8]">
                    Slide 04 · AI Product Matching Pipeline
                  </span>
                  <h2 className="text-2xl font-display font-extrabold text-[#0B1530]">
                    Transparent Normalization, Semantic Similarity & Attribute Guardrails
                  </h2>
                </div>
                <DemoBadge />
              </div>

              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5">
                {[
                  ['1. Normalization', 'Expand Dlx/BB/RO/Xfer/Cxl abbreviations & currencies'],
                  ['2. Entity Resolution', 'Geofence landmarks & properties across 24 demo feeds'],
                  ['3. Semantic Cosine', 'Unigram + bigram cosine similarity (dense embeddings at scale)'],
                  ['4. Attribute Diffs', 'Verify meals, bed type, transfers & refund terms before grouping'],
                ].map(([t, d]) => (
                  <div key={t} className="bg-white rounded-xl p-4 border border-slate-200 shadow-sm">
                    <Sparkles className="w-5 h-5 text-[#14B8D4] mb-2" aria-hidden="true" />
                    <h3 className="font-bold text-sm text-[#0B1530]">{t}</h3>
                    <p className="text-xs text-[#7C899D] mt-1">{d}</p>
                  </div>
                ))}
              </div>

              <div className="bg-white rounded-xl p-5 border border-slate-200 grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200">
                  <p className="text-xs font-bold text-emerald-800 uppercase">High Confidence · 95%+</p>
                  <p className="text-xs text-emerald-900 mt-1">
                    Auto-group canonical entity; verify attribute parity for instant equivalence.
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-amber-50 border border-amber-200">
                  <p className="text-xs font-bold text-amber-800 uppercase">Medium Confidence · 75–94%</p>
                  <p className="text-xs text-amber-900 mt-1">
                    Cluster under shared parent entity while highlighting commercial/inclusion deltas.
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-rose-50 border border-rose-200">
                  <p className="text-xs font-bold text-rose-800 uppercase">Low Confidence · &lt; 75%</p>
                  <p className="text-xs text-rose-900 mt-1">
                    Never auto-merge; route ambiguous pairs to human curation queue.
                  </p>
                </div>
              </div>
            </div>
          )}

          {slideIndex === 4 && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-[#1677E8]">
                    Slide 05 · Supplier Comparison Matrix
                  </span>
                  <h2 className="text-2xl font-display font-extrabold text-[#0B1530]">
                    Separate Lowest Price, Best Inclusions & Most Flexible Cancellation
                  </h2>
                </div>
                <DemoBadge />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white rounded-xl p-4 border-2 border-[#1677E8]">
                  <span className="text-[10px] font-bold uppercase text-[#1677E8]">Lowest Price</span>
                  <h3 className="font-bold text-base text-[#0B1530] mt-1">HeritagePass Direct</h3>
                  <p className="text-2xl font-display font-extrabold text-[#1677E8] mt-1">₹1,000</p>
                  <p className="text-xs text-[#7C899D] mt-1">Entry ticket only · Non-refundable &lt;24h</p>
                </div>
                <div className="bg-white rounded-xl p-4 border-2 border-[#0D9B80]">
                  <span className="text-[10px] font-bold uppercase text-[#0D9B80]">Best Inclusions</span>
                  <h3 className="font-bold text-base text-[#0B1530] mt-1">CrownLine Experiences</h3>
                  <p className="text-2xl font-display font-extrabold text-[#0D9B80] mt-1">₹2,200</p>
                  <p className="text-xs text-[#7C899D] mt-1">VIP Entry + Private Guide + AC Pickup + Breakfast</p>
                </div>
                <div className="bg-white rounded-xl p-4 border-2 border-[#14B8D4]">
                  <span className="text-[10px] font-bold uppercase text-[#0B8EA5]">Most Flexible Terms</span>
                  <h3 className="font-bold text-base text-[#0B1530] mt-1">ApexStay Distribution</h3>
                  <p className="text-2xl font-display font-extrabold text-[#0B1530] mt-1">Free 48h Cxl</p>
                  <p className="text-xs text-[#7C899D] mt-1">Agency Net 30 · 98% Supplier Reliability</p>
                </div>
              </div>

              <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
                <table className="w-full text-xs">
                  <thead className="bg-[#0B1530] text-white">
                    <tr>
                      <th className="p-3 text-left">Supplier</th>
                      <th className="p-3 text-left">Product</th>
                      <th className="p-3 text-right">Price</th>
                      <th className="p-3 text-left">Cancellation</th>
                      <th className="p-3 text-right">Reliability</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {SUPPLIER_COMPARISON_ROWS.slice(0, 5).map((r) => (
                      <tr key={r.id}>
                        <td className="p-3 font-semibold text-[#0B1530]">{r.supplier}</td>
                        <td className="p-3 text-slate-700">{r.product}</td>
                        <td className="p-3 text-right font-bold">{formatInr(r.priceInr)}</td>
                        <td className="p-3">{r.cancellation}</td>
                        <td className="p-3 text-right font-semibold text-[#0D9B80]">{r.reliability}%</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {slideIndex === 5 && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-[#1677E8]">
                    Slide 06 · Smart Ranking Intelligence (Proposed Model)
                  </span>
                  <h2 className="text-2xl font-display font-extrabold text-[#0B1530]">
                    30% Relevance + 25% Confidence + 20% Price + 15% Availability + 10% Reliability
                  </h2>
                </div>
                <DemoBadge label="Proposed Model · Demo Data" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {topRanked.map((item) => (
                  <div
                    key={item.id}
                    className="bg-white rounded-xl p-4 border border-slate-200 shadow-sm flex items-center gap-4"
                  >
                    <div className="w-20 h-20 rounded-lg overflow-hidden shrink-0">
                      <SafeImage src={item.image} alt={item.name} />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-xs font-bold text-[#1677E8]">
                          Rank #{item.smartRank}{' '}
                          <span className="text-[#0D9B80]">
                            ({item.rankDelta >= 0 ? `+${item.rankDelta}` : item.rankDelta} vs Price-Only)
                          </span>
                        </span>
                        <span className="text-lg font-display font-extrabold text-[#0B1530]">
                          {item.smartScore}
                        </span>
                      </div>
                      <h3 className="font-bold text-sm text-[#0B1530] truncate mt-0.5">{item.name}</h3>
                      <p className="text-xs text-[#7C899D]">
                        {item.supplier} · {formatInr(item.priceInr)} · {item.cancellationSummary}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {slideIndex === 6 && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-[#1677E8]">
                    Slide 07 · Technical Architecture
                  </span>
                  <h2 className="text-2xl font-display font-extrabold text-[#0B1530]">
                    9-Layer Unified Travel Inventory Pipeline
                  </h2>
                </div>
                <DemoBadge label="Prototype vs Proposed Scale" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {ARCHITECTURE_LAYERS.map((layer) => (
                  <div key={layer.step} className="bg-white rounded-xl p-4 border border-slate-200 shadow-sm">
                    <div className="flex items-center justify-between gap-2">
                      <span className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0B1530]">
                        <Layers className="w-3.5 h-3.5 text-[#14B8D4]" aria-hidden="true" />
                        Layer {layer.step}
                      </span>
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          layer.status === 'Implemented in Prototype'
                            ? 'bg-[#0D9B80]/15 text-[#0D9B80]'
                            : 'bg-slate-100 text-slate-600'
                        }`}
                      >
                        {layer.status === 'Implemented in Prototype' ? 'Implemented' : 'Proposed'}
                      </span>
                    </div>
                    <h3 className="font-bold text-sm text-[#0B1530] mt-1.5">{layer.name}</h3>
                    <p className="text-xs text-[#7C899D] mt-1">{layer.shortDesc}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {slideIndex === 7 && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-[#1677E8]">
                    Slide 08 · Business Impact & Measurable Evaluation KPIs
                  </span>
                  <h2 className="text-2xl font-display font-extrabold text-[#0B1530]">
                    Evaluation Framework & Projected Value Pillars
                  </h2>
                </div>
                <DemoBadge label="Illustrative Targets · Not Production Metrics" />
              </div>

              <div className="grid grid-cols-2 lg:grid-cols-3 gap-3.5">
                {EVALUATION_KPIS.map((kpi) => (
                  <div key={kpi.metric} className="bg-white rounded-xl p-4 border border-slate-200 shadow-sm">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold text-[#7C899D]">{kpi.metric}</span>
                      <TrendingUp className="w-4 h-4 text-[#0D9B80]" aria-hidden="true" />
                    </div>
                    <p className="text-2xl font-display font-extrabold text-[#0B1530] mt-1">
                      {kpi.illustrativeValue}
                    </p>
                    <p className="text-[11px] text-[#7C899D] mt-1">{kpi.definition}</p>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                {BUSINESS_VALUE_PILLARS.slice(0, 2).map((p) => (
                  <div key={p.title} className="bg-[#0B1530] text-white rounded-xl p-4">
                    <div className="flex items-center gap-2 text-[#14B8D4] font-bold text-sm">
                      <ShieldCheck className="w-4 h-4" aria-hidden="true" />
                      {p.title}
                    </div>
                    <p className="text-xs text-slate-300 mt-1.5">{p.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {slideIndex === 8 && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-[#1677E8]">
                    Slide 09 · Implementation Roadmap & Conclusion
                  </span>
                  <h2 className="text-2xl font-display font-extrabold text-[#0B1530]">
                    From 48-Hour Prototype to Enterprise Global Inventory OS
                  </h2>
                </div>
                <DemoBadge />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-sm space-y-3">
                  <h3 className="font-bold text-sm text-[#0B1530] flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#0D9B80]" aria-hidden="true" />
                    48-Hour Hackathon Delivery
                  </h3>
                  {ROADMAP_MILESTONES.filter((m) => m.phase === '48-Hour Hackathon').map((m) => (
                    <div key={m.id} className="flex items-start gap-2.5 text-xs">
                      <span className="font-mono font-bold text-[#1677E8] w-20 shrink-0">
                        {m.window}
                      </span>
                      <span className="text-slate-700 font-medium">{m.title}</span>
                    </div>
                  ))}
                </div>

                <div className="bg-[#0B1530] text-white rounded-xl p-5 space-y-3">
                  <h3 className="font-bold text-sm text-[#14B8D4] flex items-center gap-2">
                    <Milestone className="w-4 h-4" aria-hidden="true" />
                    Post-Hackathon Production Milestones
                  </h3>
                  {ROADMAP_MILESTONES.filter((m) => m.phase !== '48-Hour Hackathon').map((m) => (
                    <div key={m.id} className="bg-white/5 border border-white/10 rounded-lg p-3">
                      <span className="text-[11px] font-bold text-[#14B8D4]">{m.window}</span>
                      <p className="text-xs font-semibold text-white mt-0.5">{m.title}</p>
                      <p className="text-[11px] text-slate-300 mt-1">{m.deliverables[0]}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Bottom Controls */}
      <div className="px-6 py-3.5 border-t border-white/10 bg-[#091128] flex flex-wrap items-center justify-between gap-3">
        <button
          type="button"
          disabled={slideIndex === 0}
          onClick={() => setSlideIndex((i) => Math.max(0, i - 1))}
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-white/10 hover:bg-white/15 disabled:opacity-40 text-xs font-semibold cursor-pointer disabled:cursor-not-allowed"
        >
          <ChevronLeft className="w-4 h-4" aria-hidden="true" /> Previous
        </button>

        <div className="flex items-center gap-1.5 overflow-x-auto max-w-full py-1">
          {SLIDE_TITLES.map((title, i) => (
            <button
              key={title}
              type="button"
              onClick={() => setSlideIndex(i)}
              aria-label={`Go to slide ${i + 1}: ${title}`}
              className={`px-2.5 py-1 rounded-full text-[11px] font-semibold transition-colors cursor-pointer whitespace-nowrap ${
                i === slideIndex
                  ? 'bg-[#14B8D4] text-[#0B1530]'
                  : 'bg-white/10 text-slate-300 hover:bg-white/20'
              }`}
            >
              {i + 1}. {title.split(' ')[0]}
            </button>
          ))}
        </div>

        <button
          type="button"
          disabled={slideIndex === SLIDE_TITLES.length - 1}
          onClick={() =>
            setSlideIndex((i) => Math.min(SLIDE_TITLES.length - 1, i + 1))
          }
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#1677E8] hover:bg-[#1365C7] disabled:opacity-40 text-xs font-semibold cursor-pointer disabled:cursor-not-allowed"
        >
          Next <ChevronRight className="w-4 h-4" aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}

