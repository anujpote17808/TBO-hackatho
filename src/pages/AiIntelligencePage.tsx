import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import {
  ArrowRight,
  CheckCircle2,
  GitCompareArrows,
  BedDouble,
  Scale,
  Sparkles,
  ShieldCheck,
  TrendingUp,
  Layers,
} from 'lucide-react';
import { AiIntelligenceShell } from '../components/layout/AiIntelligenceShell';
import { AnimatedCounter } from '../components/motion/MotionPrimitives';
import { DemoBadge } from '../components/common/DemoBadge';

const AI_WORKFLOW_STAGES = [
  {
    step: 1,
    code: 'SUPPLIER CATALOGS',
    status: 'Proposed Production Connector / Synthetic Demo Feeds',
    inputs: '24 heterogeneous hotel, bedbank, ticketing & DMC supplier feeds',
    outputs: 'Versioned JSON/XML inventory snapshots',
    summary:
      'Ingests raw multi-supplier sightseeing tours and hotel room catalogs across Agra, Goa, Jaipur, Mumbai, Delhi, and Kerala.',
    link: '/ai-intelligence/suppliers',
    cta: 'Inspect Supplier Matrix',
  },
  {
    step: 2,
    code: 'DATA NORMALIZATION',
    status: 'Implemented Live',
    inputs: 'Abbreviated strings (Dlx, BB, RO, Xfer, Cxl, Tkt) & multi-currency rates',
    outputs: 'Canonical travel tokens & standardized INR schema',
    summary:
      'Cleans noisy supplier descriptions, expands shorthand travel abbreviations, and aligns duration, bed, meal, and cancellation taxonomies.',
    link: '/ai-intelligence/matching',
    cta: 'Test Normalization Live',
  },
  {
    step: 3,
    code: 'ENTITY RESOLUTION',
    status: 'Implemented Live',
    inputs: 'Normalized landmark/property records + geo coordinates',
    outputs: 'Canonical master entities (Taj Mahal, Grand Palace Agra, etc.)',
    summary:
      'Applies geofencing and entity-core disentanglement so identical landmarks cluster cleanly while cross-city collisions are hard-blocked.',
    link: '/ai-intelligence/matching',
    cta: 'Inspect Entity Resolution',
  },
  {
    step: 4,
    code: 'AI PRODUCT MATCHING',
    status: 'Implemented Live (Cosine) / Dense Embeddings Proposed',
    inputs: 'Canonicalized entity pairs',
    outputs: 'Calibrated confidence score (High ≥ 95%, Medium 75–94%, Low < 75%)',
    summary:
      'Runs real-time unigram/bigram cosine similarity + overlap scoring in the browser, architected to scale with Sentence Transformers & pgvector.',
    link: '/ai-intelligence/matching',
    cta: 'Run Matching Engine',
  },
  {
    step: 5,
    code: 'ATTRIBUTE COMPARISON',
    status: 'Implemented Live',
    inputs: 'Matched supplier candidates',
    outputs: 'Structured inclusion, meal, bed & refundability diffs',
    summary:
      'Preserves every commercial difference so ticket-only tours never merge with private pickup tours and RO rooms never merge with BB King rooms.',
    link: '/room-comparison',
    cta: 'Open Room Comparison',
  },
  {
    step: 6,
    code: 'SUPPLIER SELECTION',
    status: 'Implemented Live',
    inputs: 'Reconciled supplier offers with reliability & terms',
    outputs: 'Separate Lowest Price, Best Inclusions & Most Flexible leaders',
    summary:
      'Prevents conflating cheapest headline price with best overall commercial value across B2B and B2C shopping flows.',
    link: '/ai-intelligence/suppliers',
    cta: 'Compare Suppliers',
  },
  {
    step: 7,
    code: 'SMART RANKING',
    status: 'Implemented Live (Proposed Model)',
    inputs: 'Relevance, Confidence, Price, Availability & Reliability vectors',
    outputs: 'Dynamically ranked inventory with explainable score breakdowns',
    summary:
      'Applies proposed 30/25/20/15/10 multi-factor weights with real-time sliders and before-vs-after rank delta tracking.',
    link: '/ai-intelligence/ranking',
    cta: 'Tune Ranking Weights',
  },
  {
    step: 8,
    code: 'UNIFIED TRAVEL INVENTORY',
    status: 'Implemented Live',
    inputs: 'Deduplicated, attribute-verified, ranked catalog',
    outputs: 'Consumer TripMatch AI Marketplace + B2B Intelligence OS',
    summary:
      'Powers both the MakeMyTrip/Booking.com-grade travel discovery storefront and the enterprise operations & quality console.',
    link: '/experiences',
    cta: 'View Live Storefront',
  },
];

const MODULE_TILES = [
  {
    title: 'AI Product Matching Workbench',
    desc: 'Run live lexical normalization, cosine similarity & attribute guardrails on editable supplier pairs.',
    to: '/ai-intelligence/matching',
    icon: GitCompareArrows,
    badge: 'Live Engine',
  },
  {
    title: 'Hotel Room Equivalence Mapping',
    desc: 'Compare Grand Palace Agra & 5 more hotels across bed type, size, meal plan & cancellation.',
    to: '/room-comparison',
    icon: BedDouble,
    badge: 'No False Merges',
  },
  {
    title: 'Multi-Supplier Comparison Matrix',
    desc: 'Sort, filter & compare offers with separate Lowest Price, Best Inclusions & Most Flexible callouts.',
    to: '/ai-intelligence/suppliers',
    icon: Scale,
    badge: 'Sortable Matrix',
  },
  {
    title: 'Smart Search Ranking Analytics',
    desc: 'Adjust proposed multi-factor ranking weights live and inspect before-vs-after rank shifts.',
    to: '/ai-intelligence/ranking',
    icon: Sparkles,
    badge: 'Interactive',
  },
  {
    title: 'Duplicate Detection & Content Quality',
    desc: 'Audit missing descriptions, duplicate images, invalid room mappings & run one-click auto-fixes.',
    to: '/ai-intelligence/quality',
    icon: ShieldCheck,
    badge: 'Hygiene Monitor',
  },
  {
    title: 'Business Impact & Evaluation KPIs',
    desc: 'Inspect Precision, Recall, F1, Room Equivalence Accuracy & NDCG@10 with transparent demo labels.',
    to: '/business-impact',
    icon: TrendingUp,
    badge: 'Executive View',
  },
];

export function AiIntelligencePage() {
  const prefersReduced = useReducedMotion();
  const [activeStageIdx, setActiveStageIdx] = useState(3);
  const activeStage = AI_WORKFLOW_STAGES[activeStageIdx];

  return (
    <AiIntelligenceShell
      title="AI Inventory Intelligence Control Center"
      subtitle="Consolidate fragmented multi-supplier travel feeds, detect duplicates, verify attribute equivalence, and power intelligent marketplace search ranking."
    >
      <div className="space-y-6">
        {/* Animated Enterprise KPI Grid */}
        <section aria-label="AI inventory intelligence metrics" className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-3.5">
          {[
            { label: 'Total Inventory', value: 12480, suffix: '', color: 'text-[#101C35]' },
            { label: 'Duplicate Listings', value: 2140, suffix: '', color: 'text-rose-600' },
            { label: 'Matched Products', value: 8620, suffix: '', color: 'text-[#0D9B80]' },
            { label: 'Connected Suppliers', value: 24, suffix: '', color: 'text-[#1677FF]' },
            { label: 'Match Confidence', value: 96, suffix: '%', color: 'text-[#0D9B80]' },
            { label: 'Inventory Quality', value: 86, suffix: '%', color: 'text-[#101C35]' },
          ].map((k) => (
            <div
              key={k.label}
              className="bg-white rounded-2xl border border-slate-200 p-4 shadow-xs"
            >
              <span className="block text-[10px] font-bold uppercase tracking-wider text-[#748198]">
                {k.label}
              </span>
              <span className={`block font-display font-extrabold text-2xl sm:text-3xl mt-1 ${k.color}`}>
                <AnimatedCounter value={k.value} suffix={k.suffix} />
              </span>
              <span className="block text-[10px] text-[#748198] mt-1">
                Illustrative Demo Data
              </span>
            </div>
          ))}
        </section>

        {/* Interactive 8-Stage Intelligence Workflow */}
        <section className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-5">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div>
              <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#1677FF]">
                <Layers className="w-4 h-4" aria-hidden="true" />
                Interactive End-to-End Intelligence Pipeline
              </span>
              <h2 className="font-display font-extrabold text-xl text-[#101C35] mt-0.5">
                Click Any Stage to Inspect Live Pipeline Behavior
              </h2>
            </div>
            <DemoBadge label="Click Stages 1–8" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
            {/* Left 7 Cols: Interactive Stage Flow Grid */}
            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {AI_WORKFLOW_STAGES.map((stage, idx) => {
                const active = idx === activeStageIdx;
                return (
                  <motion.button
                    key={stage.step}
                    type="button"
                    whileHover={prefersReduced ? undefined : { y: -2 }}
                    onClick={() => setActiveStageIdx(idx)}
                    className={`text-left p-3.5 rounded-xl border transition-all cursor-pointer ${
                      active
                        ? 'bg-[#101C35] text-white border-[#19C5D8] shadow-md'
                        : 'bg-[#F7F9FC] text-[#192338] border-slate-200 hover:border-[#1677FF]'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span
                        className={`text-[10px] font-bold uppercase tracking-wider ${
                          active ? 'text-[#19C5D8]' : 'text-[#1677FF]'
                        }`}
                      >
                        Stage 0{stage.step}
                      </span>
                      <CheckCircle2
                        className={`w-3.5 h-3.5 ${
                          active ? 'text-[#0D9B80]' : 'text-slate-400'
                        }`}
                        aria-hidden="true"
                      />
                    </div>
                    <p className="font-display font-bold text-xs sm:text-sm mt-1">
                      {stage.code}
                    </p>
                  </motion.button>
                );
              })}
            </div>

            {/* Right 5 Cols: Active Stage Deep-Dive Inspector */}
            <motion.div
              key={activeStage.step}
              initial={prefersReduced ? false : { opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.25 }}
              className="lg:col-span-5 rounded-2xl bg-[#101C35] text-white p-5 space-y-4"
            >
              <div className="flex items-center justify-between gap-2">
                <span className="text-xs font-bold text-[#19C5D8] uppercase tracking-wider">
                  Stage 0{activeStage.step} Detail
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-[#0D9B80]/20 border border-[#0D9B80]/40 text-[#4FD1B8] text-[10px] font-bold">
                  {activeStage.status}
                </span>
              </div>

              <div>
                <h3 className="font-display font-extrabold text-xl">
                  {activeStage.code}
                </h3>
                <p className="text-xs text-slate-300 mt-1.5 leading-relaxed">
                  {activeStage.summary}
                </p>
              </div>

              <div className="space-y-2 text-xs">
                <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                  <span className="block text-[10px] font-bold uppercase text-slate-400">
                    Stage Input
                  </span>
                  <p className="text-slate-100 mt-0.5">{activeStage.inputs}</p>
                </div>
                <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                  <span className="block text-[10px] font-bold uppercase text-slate-400">
                    Stage Output
                  </span>
                  <p className="text-slate-100 mt-0.5">{activeStage.outputs}</p>
                </div>
              </div>

              <Link
                to={activeStage.link}
                className="inline-flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-xl bg-[#1677FF] hover:bg-[#0F65E0] text-white text-xs font-bold transition-colors"
              >
                {activeStage.cta} <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </Link>
            </motion.div>
          </div>
        </section>

        {/* Direct Access Cards to All AI Intelligence Modules */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {MODULE_TILES.map((tile) => {
            const Icon = tile.icon;
            return (
              <Link
                key={tile.title}
                to={tile.to}
                className="group bg-white rounded-2xl border border-slate-200 hover:border-[#1677FF] p-5 shadow-xs hover:shadow-md transition-all flex flex-col justify-between gap-4"
              >
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 rounded-xl bg-[#1677FF]/10 text-[#1677FF] flex items-center justify-center">
                      <Icon className="w-5 h-5" aria-hidden="true" />
                    </div>
                    <span className="px-2.5 py-0.5 rounded-full bg-[#F7F9FC] border border-slate-200 text-[10px] font-bold text-[#101C35]">
                      {tile.badge}
                    </span>
                  </div>
                  <h3 className="font-display font-bold text-base text-[#101C35] group-hover:text-[#1677FF] transition-colors">
                    {tile.title}
                  </h3>
                  <p className="text-xs text-[#748198] leading-relaxed">{tile.desc}</p>
                </div>

                <span className="inline-flex items-center gap-1 text-xs font-bold text-[#1677FF]">
                  Open Module <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
                </span>
              </Link>
            );
          })}
        </section>
      </div>
    </AiIntelligenceShell>
  );
}

