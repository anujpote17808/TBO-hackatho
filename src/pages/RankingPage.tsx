import { useMemo, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import {
  RotateCcw,
  ArrowUpRight,
  ArrowDownRight,
  Minus,
  Search,
  Sparkles,
} from 'lucide-react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from 'recharts';
import { RANKING_PRODUCTS } from '../data/rankingData';
import {
  computeRankedInventory,
  DEFAULT_RANKING_WEIGHTS,
  FACTOR_LABELS,
} from '../utils/rankingEngine';
import { RankingWeights } from '../types/inventory';
import { AiIntelligenceShell } from '../components/layout/AiIntelligenceShell';
import { SafeImage } from '../components/common/SafeImage';
import { DemoBadge } from '../components/common/DemoBadge';
import { formatInr } from '../utils/formatters';

const PRESETS: { label: string; weights: RankingWeights }[] = [
  { label: 'Proposed Default (30/25/20/15/10)', weights: DEFAULT_RANKING_WEIGHTS },
  {
    label: 'Price-Led Discovery',
    weights: {
      searchRelevance: 20,
      matchConfidence: 15,
      priceCompetitiveness: 45,
      availability: 10,
      supplierReliability: 10,
      cancellationFlexibility: 0,
    },
  },
  {
    label: 'High-Trust & Flexible',
    weights: {
      searchRelevance: 20,
      matchConfidence: 20,
      priceCompetitiveness: 10,
      availability: 15,
      supplierReliability: 20,
      cancellationFlexibility: 15,
    },
  },
];

export function RankingPage() {
  const prefersReduced = useReducedMotion();
  const [weights, setWeights] = useState<RankingWeights>(DEFAULT_RANKING_WEIGHTS);
  const [categoryFilter, setCategoryFilter] = useState<'All' | 'Sightseeing' | 'Hotel'>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortMode, setSortMode] = useState<'smart' | 'baseline' | 'price'>('smart');

  const totalWeight = Object.values(weights).reduce((sum, v) => sum + v, 0);

  const rankedAll = useMemo(
    () => computeRankedInventory(RANKING_PRODUCTS, weights),
    [weights]
  );

  const visibleItems = useMemo(() => {
    const filtered = rankedAll.filter((item) => {
      const catOk = categoryFilter === 'All' || item.category === categoryFilter;
      const q = searchQuery.trim().toLowerCase();
      const qOk =
        !q ||
        item.name.toLowerCase().includes(q) ||
        item.supplier.toLowerCase().includes(q) ||
        item.destination.toLowerCase().includes(q);
      return catOk && qOk;
    });

    if (sortMode === 'baseline') {
      return [...filtered].sort((a, b) => a.baselineRank - b.baselineRank);
    }
    if (sortMode === 'price') {
      return [...filtered].sort((a, b) => a.priceInr - b.priceInr);
    }
    return filtered;
  }, [rankedAll, categoryFilter, searchQuery, sortMode]);

  const chartData = rankedAll.slice(0, 6).map((item) => ({
    name: item.name.split('—')[0].split('(')[0].trim().slice(0, 20),
    SmartScore: item.smartScore,
    PriceOnlyRankScore: Math.round(item.metrics.priceCompetitiveness),
  }));

  const updateWeight = (key: keyof RankingWeights, val: number) => {
    setWeights((prev) => ({ ...prev, [key]: val }));
  };

  return (
    <AiIntelligenceShell
      title="Intelligent Search. Better Travel Decisions."
      subtitle="Proposed multi-factor ranking model balancing search relevance, product match confidence, price competitiveness, availability, reliability, and cancellation flexibility."
      badge="Smart Search Ranking · Proposed Demonstration Model"
    >
      <div className="space-y-5">
        {/* Formula Banner */}
        <section className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200 flex flex-wrap items-center justify-between gap-3 shadow-xs">
          <div className="flex items-start gap-2.5 text-xs sm:text-sm text-[#101C35]">
            <Sparkles className="w-4 h-4 text-[#1677FF] shrink-0 mt-0.5" aria-hidden="true" />
            <p>
              <strong>Proposed Initial Formula:</strong> 30% Search Relevance + 25% Match Confidence + 20% Price Competitiveness + 15% Availability + 10% Supplier Reliability{' '}
              <span className="text-[#748198]">
                (proposed demonstration model, not TBO&apos;s production ranking algorithm).
              </span>
            </p>
          </div>
          <DemoBadge label="Live Weight Engine" />
        </section>

        <div className="grid grid-cols-1 xl:grid-cols-12 gap-5 items-start">
          {/* Left 4 Cols: Interactive Weight Controls */}
          <aside className="xl:col-span-4 bg-white rounded-2xl border border-slate-200 p-5 space-y-4 xl:sticky xl:top-[86px]">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="font-display font-bold text-sm text-[#101C35]">
                  Weight Adjustment Panel
                </h2>
                <p className="text-[11px] text-[#748198]">
                  Auto-normalized to 100% (Current sum: {totalWeight}%)
                </p>
              </div>
              <button
                type="button"
                onClick={() => setWeights(DEFAULT_RANKING_WEIGHTS)}
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#F7F9FC] hover:bg-slate-200 text-xs font-semibold text-[#101C35] cursor-pointer"
              >
                <RotateCcw className="w-3 h-3" aria-hidden="true" /> Reset
              </button>
            </div>

            <div className="flex flex-wrap gap-1.5">
              {PRESETS.map((preset) => (
                <button
                  key={preset.label}
                  type="button"
                  onClick={() => setWeights(preset.weights)}
                  className="px-2.5 py-1 rounded-lg bg-[#F7F9FC] hover:bg-[#1677FF]/10 border border-slate-200 text-[11px] font-semibold text-[#101C35] cursor-pointer"
                >
                  {preset.label}
                </button>
              ))}
            </div>

            <div className="space-y-3 pt-1">
              {(Object.keys(FACTOR_LABELS) as (keyof RankingWeights)[]).map((key) => {
                const raw = weights[key];
                const effectivePct =
                  totalWeight > 0 ? Math.round((raw / totalWeight) * 100) : 0;
                return (
                  <div key={key} className="space-y-1">
                    <div className="flex items-center justify-between text-xs">
                      <label htmlFor={`slider-${key}`} className="font-semibold text-[#192338]">
                        {FACTOR_LABELS[key]}
                      </label>
                      <span className="font-mono font-bold text-[#1677FF]">
                        {raw}%{' '}
                        <span className="text-[10px] text-[#748198] font-normal">
                          (eff. {effectivePct}%)
                        </span>
                      </span>
                    </div>
                    <input
                      id={`slider-${key}`}
                      type="range"
                      min={0}
                      max={60}
                      step={5}
                      value={raw}
                      onChange={(e) => updateWeight(key, Number(e.target.value))}
                      className="tiq-slider w-full"
                    />
                  </div>
                );
              })}
            </div>

            <div className="pt-4 border-t border-slate-100">
              <h3 className="text-xs font-bold text-[#101C35] mb-2">
                Smart Rank Score vs Price-Only Competitiveness
              </h3>
              <div className="h-48 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={chartData} layout="vertical" margin={{ left: 8, right: 12 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                    <XAxis type="number" domain={[0, 100]} tick={{ fontSize: 10 }} />
                    <YAxis dataKey="name" type="category" width={92} tick={{ fontSize: 10 }} />
                    <Tooltip />
                    <Bar dataKey="SmartScore" name="TripMatch Score" fill="#1677FF" radius={[0, 4, 4, 0]} />
                    <Bar dataKey="PriceOnlyRankScore" name="Price Score" fill="#CBD5E1" radius={[0, 4, 4, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </aside>

          {/* Right 8 Cols: Animated Ranked Result Cards */}
          <section className="xl:col-span-8 space-y-4">
            <div className="bg-white rounded-xl border border-slate-200 p-3.5 flex flex-wrap items-center justify-between gap-3">
              <div className="flex flex-wrap items-center gap-2">
                <div className="relative">
                  <Search className="w-3.5 h-3.5 text-[#748198] absolute left-3 top-1/2 -translate-y-1/2" aria-hidden="true" />
                  <input
                    type="search"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Filter ranked offers..."
                    aria-label="Filter ranked offers"
                    className="pl-8 pr-3 py-1.5 rounded-lg border border-slate-200 text-xs bg-[#F7F9FC]"
                  />
                </div>
                {(['All', 'Sightseeing', 'Hotel'] as const).map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setCategoryFilter(cat)}
                    className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold cursor-pointer ${
                      categoryFilter === cat
                        ? 'bg-[#101C35] text-white'
                        : 'bg-[#F7F9FC] text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              <div className="flex items-center gap-1.5 text-xs">
                <span className="text-[#748198] font-medium">View:</span>
                {(
                  [
                    ['smart', 'After (Smart Rank)'],
                    ['baseline', 'Before (Price-Only)'],
                    ['price', 'Lowest Price'],
                  ] as const
                ).map(([mode, label]) => (
                  <button
                    key={mode}
                    type="button"
                    onClick={() => setSortMode(mode)}
                    className={`px-2.5 py-1 rounded-lg font-semibold cursor-pointer ${
                      sortMode === mode
                        ? 'bg-[#1677FF] text-white'
                        : 'bg-[#F7F9FC] text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              {visibleItems.map((item) => (
                <motion.article
                  key={item.id}
                  layout={!prefersReduced}
                  transition={{ type: 'spring', stiffness: 320, damping: 30 }}
                  className="bg-white rounded-2xl border border-slate-200 shadow-xs p-4 flex flex-col md:flex-row gap-4 hover:border-[#19C5D8] transition-colors"
                >
                  <div className="flex items-center gap-3.5 md:w-56 shrink-0">
                    <div className="flex flex-col items-center justify-center w-12 h-12 rounded-xl bg-[#101C35] text-white shrink-0">
                      <span className="text-[9px] uppercase text-slate-400 leading-none">
                        Rank
                      </span>
                      <span className="font-display font-extrabold text-base text-[#19C5D8]">
                        #{item.smartRank}
                      </span>
                    </div>
                    <div className="w-24 h-20 rounded-xl overflow-hidden shrink-0 bg-[#101C35]">
                      <SafeImage src={item.image} alt={item.name} />
                    </div>
                  </div>

                  <div className="flex-1 min-w-0 space-y-2">
                    <div className="flex flex-wrap items-start justify-between gap-2">
                      <div className="min-w-0">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-[#F7F9FC] text-[#475569]">
                            {item.category} · {item.destination}
                          </span>
                          <span
                            className={`inline-flex items-center gap-0.5 text-[11px] font-bold px-2 py-0.5 rounded-full ${
                              item.rankDelta > 0
                                ? 'bg-emerald-50 text-emerald-700'
                                : item.rankDelta < 0
                                ? 'bg-rose-50 text-rose-700'
                                : 'bg-slate-100 text-slate-600'
                            }`}
                          >
                            {item.rankDelta > 0 ? (
                              <ArrowUpRight className="w-3 h-3" aria-hidden="true" />
                            ) : item.rankDelta < 0 ? (
                              <ArrowDownRight className="w-3 h-3" aria-hidden="true" />
                            ) : (
                              <Minus className="w-3 h-3" aria-hidden="true" />
                            )}
                            Before #{item.baselineRank} → After #{item.smartRank}
                          </span>
                        </div>
                        <h3 className="font-display font-bold text-sm sm:text-base text-[#101C35] mt-1">
                          {item.name}
                        </h3>
                        <p className="text-xs text-[#748198]">
                          {item.supplier} · {item.availabilityLabel} · {item.cancellationSummary}
                        </p>
                      </div>

                      <div className="text-right shrink-0">
                        <span className="block font-display font-extrabold text-xl text-[#101C35]">
                          {formatInr(item.priceInr)}
                        </span>
                        <span className="text-xs font-bold text-[#0D9B80]">
                          Score: {item.smartScore} / 100
                        </span>
                      </div>
                    </div>

                    {/* Animated Score Bar */}
                    <div className="w-full h-2.5 rounded-full bg-slate-100 overflow-hidden">
                      <motion.div
                        initial={false}
                        animate={{ width: `${Math.min(100, item.smartScore)}%` }}
                        transition={{ duration: prefersReduced ? 0 : 0.35, ease: 'easeOut' }}
                        className="h-full rounded-full bg-gradient-to-r from-[#1677FF] to-[#19C5D8]"
                      />
                    </div>

                    <div className="flex flex-wrap gap-1.5 text-[10px]">
                      {item.factorContributions
                        .filter((c) => c.points > 0)
                        .map((c) => (
                          <span
                            key={c.key}
                            className="px-2 py-0.5 rounded bg-[#F7F9FC] border border-slate-200 text-slate-600"
                          >
                            {c.label}: <strong className="text-[#101C35]">+{c.points}</strong>
                          </span>
                        ))}
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          </section>
        </div>
      </div>
    </AiIntelligenceShell>
  );
}
