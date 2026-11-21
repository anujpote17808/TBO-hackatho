import { Link } from 'react-router-dom';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
} from 'recharts';
import {
  TrendingUp,
  Info,
  CheckCircle2,
  AlertTriangle,
  Layers,
  Scale,
  ArrowRight,
} from 'lucide-react';
import {
  BEFORE_AFTER_QUALITY_DATA,
  BUSINESS_VALUE_PILLARS,
  EVALUATION_KPIS,
  MODEL_PRECISION_TREND,
} from '../data/impactData';
import { AiIntelligenceShell } from '../components/layout/AiIntelligenceShell';
import { DemoBadge } from '../components/common/DemoBadge';

export function BusinessImpactPage() {
  return (
    <AiIntelligenceShell
      title="Business Impact & Measurable AI Evaluation"
      subtitle="Clear problem-solution-innovation story with measurable offline and online evaluation KPIs. All figures are illustrative demo targets, not measured production metrics."
      badge="Executive & Hackathon Judging View"
    >
      <div className="space-y-6">
        {/* Transparent Disclaimer Banner */}
        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-start gap-2.5 text-xs text-amber-950 max-w-3xl">
            <Info className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" aria-hidden="true" />
            <p>
              <strong>Illustrative vs Measured Results:</strong> All KPIs, charts, and conversion ranges below are{' '}
              <strong>illustrative demonstration figures and evaluation targets</strong> — never measured TBO production results. Real production validation requires labeled gold datasets and controlled A/B experiments.
            </p>
          </div>
          <DemoBadge label="Illustrative Demo Targets" />
        </div>

        {/* The Problem / Solution / Innovation Story Strip */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="bg-white rounded-2xl border border-slate-200 p-5 space-y-2">
            <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase text-amber-700">
              <AlertTriangle className="w-4 h-4" aria-hidden="true" /> The Problem
            </span>
            <h2 className="font-display font-bold text-base text-[#101C35]">
              Fragmented Supplier Inventory
            </h2>
            <p className="text-xs text-slate-600 leading-relaxed">
              Multi-supplier feeds produce duplicate attractions and hotels. Name-similar packages frequently hide critical differences in transfers, guides, breakfast, and refundability.
            </p>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 p-5 space-y-2">
            <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase text-[#1677FF]">
              <Layers className="w-4 h-4" aria-hidden="true" /> The Solution
            </span>
            <h2 className="font-display font-bold text-base text-[#101C35]">
              Consolidate Without Flattening Value
            </h2>
            <p className="text-xs text-slate-600 leading-relaxed">
              TripMatch AI resolves shared entities across suppliers, surfaces structured diffs side by side, separates cheapest from best-value offers, and applies explainable multi-factor ranking.
            </p>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 p-5 space-y-2">
            <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase text-[#0D9B80]">
              <Scale className="w-4 h-4" aria-hidden="true" /> The Innovation
            </span>
            <h2 className="font-display font-bold text-base text-[#101C35]">
              Entity-vs-Attribute Disentanglement
            </h2>
            <p className="text-xs text-slate-600 leading-relaxed">
              Combines cross-supplier entity resolution, semantic similarity, room equivalence guardrails, supplier intelligence, and configurable search ranking optimization.
            </p>
          </div>
        </section>

        {/* Measurable Evaluation KPIs */}
        <section aria-label="Evaluation metrics framework" className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
          {EVALUATION_KPIS.map((kpi) => (
            <div
              key={kpi.metric}
              className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs flex flex-col justify-between"
            >
              <div className="flex items-center justify-between gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-[#748198]">
                  {kpi.metric}
                </span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#0D9B80]/10 text-[#0D9B80]">
                  Target: {kpi.targetBenchmark}
                </span>
              </div>
              <div className="flex items-baseline justify-between mt-2">
                <p className="font-display font-extrabold text-3xl text-[#101C35]">
                  {kpi.illustrativeValue}
                </p>
                <TrendingUp className="w-4 h-4 text-[#19C5D8]" aria-hidden="true" />
              </div>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed">{kpi.definition}</p>
            </div>
          ))}
        </section>

        {/* Recharts Visualizations */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">
          <section className="bg-white rounded-2xl border border-slate-200 p-5">
            <div className="flex items-center justify-between gap-2 mb-4">
              <div>
                <h2 className="font-display font-bold text-sm text-[#101C35]">
                  Illustrative Catalog Quality: Baseline vs TripMatch AI (%)
                </h2>
                <p className="text-xs text-[#748198]">
                  Lower duplicate clutter alongside stronger policy transparency and room accuracy.
                </p>
              </div>
              <DemoBadge label="Illustrative" />
            </div>
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={BEFORE_AFTER_QUALITY_DATA} margin={{ top: 8, right: 12, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                  <XAxis dataKey="metric" tick={{ fontSize: 11 }} />
                  <YAxis domain={[0, 100]} tick={{ fontSize: 11 }} />
                  <Tooltip />
                  <Legend wrapperStyle={{ fontSize: 12 }} />
                  <Bar dataKey="baseline" name="Fragmented Baseline (%)" fill="#94A3B8" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="travelIq" name="TripMatch AI Illustrative (%)" fill="#1677FF" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </section>

          <section className="bg-white rounded-2xl border border-slate-200 p-5">
            <div className="flex items-center justify-between gap-2 mb-4">
              <div>
                <h2 className="font-display font-bold text-sm text-[#101C35]">
                  Matching Quality Progression Across Pipeline Stages (%)
                </h2>
                <p className="text-xs text-[#748198]">
                  Combining semantic similarity with attribute guardrails recovers precision without sacrificing recall.
                </p>
              </div>
              <DemoBadge label="Illustrative" />
            </div>
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={MODEL_PRECISION_TREND} margin={{ top: 8, right: 16, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                  <XAxis dataKey="stage" tick={{ fontSize: 11 }} />
                  <YAxis domain={[30, 100]} tick={{ fontSize: 11 }} />
                  <Tooltip />
                  <Legend wrapperStyle={{ fontSize: 12 }} />
                  <Line type="monotone" dataKey="precision" name="Precision (%)" stroke="#101C35" strokeWidth={2.5} dot={{ r: 4 }} />
                  <Line type="monotone" dataKey="recall" name="Recall (%)" stroke="#19C5D8" strokeWidth={2.5} dot={{ r: 4 }} />
                  <Line type="monotone" dataKey="f1" name="F1 Score (%)" stroke="#0D9B80" strokeWidth={3} dot={{ r: 5 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </section>
        </div>

        {/* Business Value Pillars + Roadmap Link */}
        <section aria-label="Business value pillars" className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {BUSINESS_VALUE_PILLARS.map((pillar) => (
            <div key={pillar.title} className="bg-white rounded-2xl border border-slate-200 p-5">
              <h3 className="font-display font-bold text-base text-[#101C35] flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#0D9B80]" aria-hidden="true" />
                {pillar.title}
              </h3>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed">{pillar.description}</p>
              <div className="mt-3 pt-3 border-t border-slate-100 text-xs font-semibold text-[#1677FF]">
                Potential Impact: {pillar.illustrativeGain}
              </div>
            </div>
          ))}
        </section>

        <div className="bg-[#101C35] text-white rounded-2xl p-5 flex flex-wrap items-center justify-between gap-4">
          <div>
            <h3 className="font-display font-bold text-base">
              Want to see the 48-Hour Hackathon Build Plan & Production Rollout?
            </h3>
            <p className="text-xs text-slate-300 mt-0.5">
              Review all milestone windows from initial ingestion to global multi-supplier deployment.
            </p>
          </div>
          <Link
            to="/roadmap"
            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-[#19C5D8] hover:bg-[#14B2C4] text-[#101C35] text-xs font-extrabold"
          >
            View Implementation Roadmap <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </AiIntelligenceShell>
  );
}
