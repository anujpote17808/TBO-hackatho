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
import { TrendingUp, Info, CheckCircle2 } from 'lucide-react';
import {
  BEFORE_AFTER_QUALITY_DATA,
  BUSINESS_VALUE_PILLARS,
  EVALUATION_KPIS,
  MODEL_PRECISION_TREND,
} from '../data/impactData';
import { DemoBadge } from '../components/common/DemoBadge';

export function BusinessImpactPage() {
  return (
    <div className="space-y-5">
      {/* Transparent Disclaimer Banner */}
      <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-start gap-2.5 text-xs text-amber-950 max-w-3xl">
          <Info className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" aria-hidden="true" />
          <p>
            <strong>Evaluation Transparency Note:</strong> All KPIs, charts, and conversion ranges below are <strong>illustrative demonstration figures and proposed evaluation benchmarks</strong> — never measured TBO production results. Production validation requires offline labeled gold sets and controlled A/B testing.
          </p>
        </div>
        <DemoBadge label="Illustrative Demo Benchmarks" />
      </div>

      {/* Measurable Evaluation KPIs */}
      <section aria-label="Evaluation metrics framework" className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
        {EVALUATION_KPIS.map((kpi) => (
          <div
            key={kpi.metric}
            className="bg-white rounded-2xl border border-slate-200 p-4 shadow-xs flex flex-col justify-between"
          >
            <div className="flex items-center justify-between gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-[#7C899D]">
                {kpi.metric}
              </span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#0D9B80]/10 text-[#0D9B80]">
                Target: {kpi.targetBenchmark}
              </span>
            </div>
            <div className="flex items-baseline justify-between mt-2">
              <p className="font-display font-extrabold text-3xl text-[#0B1530]">
                {kpi.illustrativeValue}
              </p>
              <TrendingUp className="w-4 h-4 text-[#14B8D4]" aria-hidden="true" />
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
              <h2 className="font-display font-bold text-sm text-[#0B1530]">
                Illustrative Catalog Quality: Baseline vs TravelIQ AI (%)
              </h2>
              <p className="text-xs text-[#7C899D]">
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
                <Bar dataKey="travelIq" name="TravelIQ AI Illustrative (%)" fill="#1677E8" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </section>

        <section className="bg-white rounded-2xl border border-slate-200 p-5">
          <div className="flex items-center justify-between gap-2 mb-4">
            <div>
              <h2 className="font-display font-bold text-sm text-[#0B1530]">
                Matching Quality Progression Across Pipeline Stages (%)
              </h2>
              <p className="text-xs text-[#7C899D]">
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
                <Line type="monotone" dataKey="precision" name="Precision (%)" stroke="#0B1530" strokeWidth={2.5} dot={{ r: 4 }} />
                <Line type="monotone" dataKey="recall" name="Recall (%)" stroke="#14B8D4" strokeWidth={2.5} dot={{ r: 4 }} />
                <Line type="monotone" dataKey="f1" name="F1 Score (%)" stroke="#0D9B80" strokeWidth={3} dot={{ r: 5 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </section>
      </div>

      {/* Business Value Pillars */}
      <section aria-label="Business value pillars" className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {BUSINESS_VALUE_PILLARS.map((pillar) => (
          <div key={pillar.title} className="bg-white rounded-2xl border border-slate-200 p-5">
            <h3 className="font-display font-bold text-base text-[#0B1530] flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#0D9B80]" aria-hidden="true" />
              {pillar.title}
            </h3>
            <p className="text-xs text-slate-600 mt-2 leading-relaxed">{pillar.description}</p>
            <div className="mt-3 pt-3 border-t border-slate-100 text-xs font-semibold text-[#1677E8]">
              Potential Impact: {pillar.illustrativeGain}
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}

