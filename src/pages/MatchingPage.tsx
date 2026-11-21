import { useState } from 'react';
import {
  Play,
  RotateCcw,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  ArrowRight,
  Sparkles,
  Sliders,
} from 'lucide-react';
import { MATCHING_SAMPLE_PAIRS, PIPELINE_STAGES } from '../data/matchingData';
import { runRealMatchingEngine } from '../utils/matchingEngine';
import { MatchResult, SupplierRecordInput } from '../types/inventory';
import { DemoBadge } from '../components/common/DemoBadge';
import { formatInr } from '../utils/formatters';

export function MatchingPage() {
  const [selectedPairId, setSelectedPairId] = useState(MATCHING_SAMPLE_PAIRS[0].id);
  const [recordA, setRecordA] = useState<SupplierRecordInput>(
    MATCHING_SAMPLE_PAIRS[0].recordA
  );
  const [recordB, setRecordB] = useState<SupplierRecordInput>(
    MATCHING_SAMPLE_PAIRS[0].recordB
  );
  const [highThreshold, setHighThreshold] = useState(95);
  const [mediumThreshold, setMediumThreshold] = useState(75);
  const [result, setResult] = useState<MatchResult>(() =>
    runRealMatchingEngine(
      MATCHING_SAMPLE_PAIRS[0].recordA,
      MATCHING_SAMPLE_PAIRS[0].recordB,
      { high: 95, medium: 75 }
    )
  );
  const [runCount, setRunCount] = useState(1);

  const handleSelectSample = (pairId: string) => {
    const pair = MATCHING_SAMPLE_PAIRS.find((p) => p.id === pairId);
    if (!pair) return;
    setSelectedPairId(pair.id);
    setRecordA(pair.recordA);
    setRecordB(pair.recordB);
    setResult(
      runRealMatchingEngine(pair.recordA, pair.recordB, {
        high: highThreshold,
        medium: mediumThreshold,
      })
    );
    setRunCount((c) => c + 1);
  };

  const handleRunMatching = () => {
    const computed = runRealMatchingEngine(recordA, recordB, {
      high: highThreshold,
      medium: mediumThreshold,
    });
    setResult(computed);
    setRunCount((c) => c + 1);
  };

  const handleReset = () => {
    handleSelectSample(MATCHING_SAMPLE_PAIRS[0].id);
    setHighThreshold(95);
    setMediumThreshold(75);
  };

  const tierStyles = {
    High: 'bg-emerald-50 text-emerald-800 border-emerald-200',
    Medium: 'bg-amber-50 text-amber-800 border-amber-200',
    Low: 'bg-rose-50 text-rose-800 border-rose-200',
  };

  return (
    <div className="space-y-5">
      {/* 8-Stage Pipeline Flow */}
      <section className="bg-[#0B1530] text-white rounded-2xl p-5 border border-white/10">
        <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
          <div>
            <h2 className="font-display font-bold text-base">
              8-Stage AI Product Matching Pipeline
            </h2>
            <p className="text-xs text-slate-300 mt-0.5">
              Live lexical normalization, unigram/bigram cosine similarity & structured attribute comparison running client-side.
            </p>
          </div>
          <DemoBadge
            variant="dark"
            label="Configurable Illustrative Thresholds (Not Production Standards)"
          />
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 xl:grid-cols-8 gap-2">
          {PIPELINE_STAGES.map((stage, i) => (
            <div
              key={stage.step}
              className="relative bg-[#101C38] border border-white/10 rounded-xl p-2.5 flex flex-col justify-between"
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold text-[#14B8D4]">
                  STEP 0{stage.step}
                </span>
                {i < PIPELINE_STAGES.length - 1 && (
                  <ArrowRight className="w-3 h-3 text-slate-500 hidden xl:block" aria-hidden="true" />
                )}
              </div>
              <p className="text-xs font-bold text-white mt-1 leading-snug">
                {stage.title}
              </p>
              <p className="text-[10px] text-slate-400 mt-1 leading-relaxed">
                {stage.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Scenario Selector + Threshold Controls */}
      <section className="bg-white rounded-2xl border border-slate-200 p-4 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="font-display font-bold text-sm text-[#0B1530]">
              Interactive Matching Workbench
            </h2>
            <p className="text-xs text-[#7C899D]">
              Select a synthetic supplier pair or edit titles, descriptions & attributes directly, then run the matching engine.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleReset}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-[#F3F6FA] hover:bg-slate-200/70 text-xs font-semibold text-[#0B1530] cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" aria-hidden="true" /> Reset
            </button>
            <button
              type="button"
              onClick={handleRunMatching}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#1677E8] hover:bg-[#1365C7] text-white text-xs font-bold shadow-xs cursor-pointer"
            >
              <Play className="w-3.5 h-3.5 fill-white" aria-hidden="true" />
              Run Matching Demo
            </button>
          </div>
        </div>

        {/* Sample Scenario Pills */}
        <div className="flex flex-wrap gap-2">
          {MATCHING_SAMPLE_PAIRS.map((pair) => (
            <button
              key={pair.id}
              type="button"
              onClick={() => handleSelectSample(pair.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all cursor-pointer ${
                selectedPairId === pair.id
                  ? 'bg-[#0B1530] text-white border-[#14B8D4]'
                  : 'bg-[#F8FAFC] text-[#182338] border-slate-200 hover:border-[#14B8D4]'
              }`}
            >
              {pair.label}
            </button>
          ))}
        </div>

        {/* Editable Supplier Records A & B */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {[
            { label: 'Supplier Record A', rec: recordA, setter: setRecordA },
            { label: 'Supplier Record B', rec: recordB, setter: setRecordB },
          ].map(({ label, rec, setter }) => (
            <div
              key={label}
              className="rounded-xl border border-slate-200 bg-[#F8FAFC] p-4 space-y-2.5"
            >
              <div className="flex items-center justify-between gap-2">
                <span className="text-xs font-bold text-[#0B1530] uppercase tracking-wider">
                  {label} · {rec.supplier}
                </span>
                <span className="font-display font-bold text-sm text-[#1677E8]">
                  {formatInr(rec.priceInr)}
                </span>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-[#7C899D] mb-1">
                  Raw Supplier Title
                </label>
                <input
                  type="text"
                  value={rec.rawTitle}
                  onChange={(e) => setter({ ...rec, rawTitle: e.target.value })}
                  className="w-full px-3 py-1.5 rounded-lg bg-white border border-slate-200 text-xs text-[#0B1530] focus:outline-none focus:border-[#14B8D4]"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-[#7C899D] mb-1">
                  Raw Supplier Description
                </label>
                <textarea
                  rows={2}
                  value={rec.rawDescription}
                  onChange={(e) => setter({ ...rec, rawDescription: e.target.value })}
                  className="w-full px-3 py-1.5 rounded-lg bg-white border border-slate-200 text-xs text-[#0B1530] focus:outline-none focus:border-[#14B8D4]"
                />
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs">
                <div>
                  <label className="block text-[10px] font-semibold text-[#7C899D] mb-0.5">
                    Location
                  </label>
                  <input
                    type="text"
                    value={rec.location}
                    onChange={(e) => setter({ ...rec, location: e.target.value })}
                    className="w-full px-2.5 py-1 rounded bg-white border border-slate-200 text-xs"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-semibold text-[#7C899D] mb-0.5">
                    Cancellation
                  </label>
                  <input
                    type="text"
                    value={rec.attributes.cancellation}
                    onChange={(e) =>
                      setter({
                        ...rec,
                        attributes: { ...rec.attributes, cancellation: e.target.value },
                      })
                    }
                    className="w-full px-2.5 py-1 rounded bg-white border border-slate-200 text-xs"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Configurable Confidence Thresholds */}
        <div className="rounded-xl bg-[#F3F6FA] border border-slate-200 p-3.5 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-xs font-bold text-[#0B1530]">
            <Sliders className="w-4 h-4 text-[#1677E8]" aria-hidden="true" />
            Configurable Demo Confidence Thresholds:
          </div>
          <div className="flex flex-wrap items-center gap-5 text-xs">
            <label className="flex items-center gap-2">
              <span className="font-semibold text-emerald-700">High ≥ {highThreshold}%</span>
              <input
                type="range"
                min={85}
                max={98}
                value={highThreshold}
                onChange={(e) => {
                  const val = Number(e.target.value);
                  setHighThreshold(val);
                  setResult(
                    runRealMatchingEngine(recordA, recordB, {
                      high: val,
                      medium: mediumThreshold,
                    })
                  );
                }}
                className="tiq-slider w-24"
              />
            </label>
            <label className="flex items-center gap-2">
              <span className="font-semibold text-amber-700">
                Medium {mediumThreshold}–{highThreshold - 1}%
              </span>
              <input
                type="range"
                min={55}
                max={highThreshold - 5}
                value={mediumThreshold}
                onChange={(e) => {
                  const val = Number(e.target.value);
                  setMediumThreshold(val);
                  setResult(
                    runRealMatchingEngine(recordA, recordB, {
                      high: highThreshold,
                      medium: val,
                    })
                  );
                }}
                className="tiq-slider w-24"
              />
            </label>
            <span className="font-semibold text-rose-700">Low &lt; {mediumThreshold}%</span>
          </div>
        </div>
      </section>

      {/* Computed Match Output */}
      <section
        aria-label="Live matching engine results"
        className="grid grid-cols-1 xl:grid-cols-12 gap-4"
      >
        {/* Left: Scores & Transparent Explanation */}
        <div className="xl:col-span-5 bg-white rounded-2xl border border-slate-200 p-5 space-y-4">
          <div className="flex items-center justify-between gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#7C899D]">
              Computed Match Result (Run #{runCount})
            </span>
            <span
              className={`px-2.5 py-0.5 rounded-full text-xs font-bold border ${tierStyles[result.confidenceTier]}`}
            >
              {result.confidenceTier} Confidence
            </span>
          </div>

          <div className="grid grid-cols-3 gap-2.5 text-center">
            <div className="rounded-xl bg-[#0B1530] text-white p-3">
              <span className="block text-[10px] uppercase text-slate-400">Overall</span>
              <span className="font-display font-extrabold text-2xl text-[#14B8D4]">
                {result.confidenceScore}%
              </span>
            </div>
            <div className="rounded-xl bg-[#F8FAFC] border border-slate-200 p-3">
              <span className="block text-[10px] uppercase text-[#7C899D]">Cosine Sim</span>
              <span className="font-display font-extrabold text-2xl text-[#0B1530]">
                {result.cosineSimilarity}%
              </span>
            </div>
            <div className="rounded-xl bg-[#F8FAFC] border border-slate-200 p-3">
              <span className="block text-[10px] uppercase text-[#7C899D]">Attr Parity</span>
              <span className="font-display font-extrabold text-2xl text-[#0D9B80]">
                {result.attributeScore}%
              </span>
            </div>
          </div>

          <div className="rounded-xl bg-[#F3F6FA] border border-slate-200 p-3.5">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#7C899D]">
              Final Match Decision
            </span>
            <p className="font-display font-bold text-base text-[#0B1530] mt-0.5">
              {result.decision}
            </p>
          </div>

          <div className="space-y-2 text-xs">
            <p className="font-bold text-[#0B1530] flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#14B8D4]" aria-hidden="true" />
              Normalized Canonical Text
            </p>
            <div className="p-2.5 rounded-lg bg-[#F8FAFC] border border-slate-200 font-mono text-[11px] text-slate-700">
              <span className="font-bold text-[#1677E8]">A:</span> {result.normalizedTitleA}
            </div>
            <div className="p-2.5 rounded-lg bg-[#F8FAFC] border border-slate-200 font-mono text-[11px] text-slate-700">
              <span className="font-bold text-[#0D9B80]">B:</span> {result.normalizedTitleB}
            </div>
          </div>

          <div className="space-y-2 text-xs">
            <p className="font-bold text-[#0B1530]">Transparent Match Explanation</p>
            <ul className="space-y-1.5 text-slate-700">
              {result.explanation.map((line) => (
                <li key={line} className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#0D9B80] shrink-0 mt-0.5" aria-hidden="true" />
                  <span>{line}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Right: Structured Attribute Diff Table */}
        <div className="xl:col-span-7 bg-white rounded-2xl border border-slate-200 p-5 flex flex-col justify-between gap-4">
          <div>
            <div className="flex items-center justify-between gap-2 mb-3">
              <div>
                <h3 className="font-display font-bold text-base text-[#0B1530]">
                  Structured Attribute Comparison
                </h3>
                <p className="text-xs text-[#7C899D]">
                  Jaccard token overlap: <strong>{result.jaccardSimilarity}%</strong> · Shared canonical terms:{' '}
                  <strong>{result.sharedTokens.slice(0, 8).join(', ') || 'None'}</strong>
                </p>
              </div>
            </div>

            <div className="overflow-x-auto border border-slate-200 rounded-xl">
              <table className="w-full text-xs text-left">
                <thead className="bg-[#0B1530] text-white">
                  <tr>
                    <th scope="col" className="p-3 font-semibold">Attribute</th>
                    <th scope="col" className="p-3 font-semibold">Record A</th>
                    <th scope="col" className="p-3 font-semibold">Record B</th>
                    <th scope="col" className="p-3 font-semibold">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {result.attributeDiffs.map((row) => (
                    <tr key={row.attribute} className="hover:bg-slate-50">
                      <th scope="row" className="p-3 font-semibold text-[#0B1530] bg-[#F8FAFC]">
                        {row.attribute}
                      </th>
                      <td className="p-3 text-slate-700">{row.valueA}</td>
                      <td className="p-3 text-slate-700">{row.valueB}</td>
                      <td className="p-3">
                        <span
                          className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-semibold ${
                            row.status === 'match'
                              ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                              : row.status === 'partial'
                              ? 'bg-amber-50 text-amber-800 border border-amber-200'
                              : 'bg-rose-50 text-rose-700 border border-rose-200'
                          }`}
                        >
                          {row.status === 'match' ? (
                            <CheckCircle2 className="w-3 h-3" aria-hidden="true" />
                          ) : row.status === 'partial' ? (
                            <AlertTriangle className="w-3 h-3" aria-hidden="true" />
                          ) : (
                            <XCircle className="w-3 h-3" aria-hidden="true" />
                          )}
                          {row.status === 'match'
                            ? 'Aligned'
                            : row.status === 'partial'
                            ? 'Partial'
                            : 'Difference'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div className="p-3 rounded-xl bg-[#F8FAFC] border border-slate-200">
              <span className="font-bold text-[#1677E8] block mb-1">
                Distinct Tokens in Record A
              </span>
              <div className="flex flex-wrap gap-1">
                {result.distinctTokensA.length > 0 ? (
                  result.distinctTokensA.slice(0, 10).map((t) => (
                    <span key={t} className="px-2 py-0.5 rounded bg-white border border-slate-200 font-mono text-[11px]">
                      {t}
                    </span>
                  ))
                ) : (
                  <span className="text-[#7C899D]">None</span>
                )}
              </div>
            </div>
            <div className="p-3 rounded-xl bg-[#F8FAFC] border border-slate-200">
              <span className="font-bold text-[#0D9B80] block mb-1">
                Distinct Tokens in Record B
              </span>
              <div className="flex flex-wrap gap-1">
                {result.distinctTokensB.length > 0 ? (
                  result.distinctTokensB.slice(0, 10).map((t) => (
                    <span key={t} className="px-2 py-0.5 rounded bg-white border border-slate-200 font-mono text-[11px]">
                      {t}
                    </span>
                  ))
                ) : (
                  <span className="text-[#7C899D]">None</span>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

