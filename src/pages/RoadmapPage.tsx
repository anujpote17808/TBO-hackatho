import { useState } from 'react';
import { CheckCircle2, Clock, Rocket, Sparkles } from 'lucide-react';
import { ROADMAP_MILESTONES } from '../data/roadmapData';

export function RoadmapPage() {
  const [phaseFilter, setPhaseFilter] = useState<'All' | '48-Hour Hackathon' | 'Post-Hackathon Production'>('All');

  const visible = ROADMAP_MILESTONES.filter(
    (m) => phaseFilter === 'All' || m.phase === phaseFilter
  );

  const completedCount = ROADMAP_MILESTONES.filter((m) => m.status === 'Completed').length;
  const hackathonTotal = ROADMAP_MILESTONES.filter(
    (m) => m.phase === '48-Hour Hackathon'
  ).length;

  return (
    <div className="space-y-5">
      {/* Header Progress Card */}
      <section className="bg-[#0B1530] text-white rounded-2xl p-5 border border-white/10 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#14B8D4]">
              TBO 48-Hour Global Open Innovation Hackathon
            </span>
            <h2 className="font-display font-extrabold text-xl mt-0.5">
              Implementation Roadmap & Post-Hackathon Scale Plan
            </h2>
          </div>

          <div className="flex flex-wrap items-center gap-1.5">
            {(['All', '48-Hour Hackathon', 'Post-Hackathon Production'] as const).map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => setPhaseFilter(tab)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer transition-colors ${
                  phaseFilter === tab
                    ? 'bg-[#14B8D4] text-[#0B1530]'
                    : 'bg-white/10 text-slate-200 hover:bg-white/15'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between text-xs mb-1.5">
            <span className="text-slate-300">
              48-Hour Hackathon Build Progress ({completedCount} of {hackathonTotal} milestones completed)
            </span>
            <span className="font-bold text-[#14B8D4]">
              {Math.round((completedCount / hackathonTotal) * 100)}%
            </span>
          </div>
          <div className="h-2 bg-white/10 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-[#14B8D4] to-[#0D9B80] rounded-full"
              style={{ width: `${(completedCount / hackathonTotal) * 100}%` }}
            />
          </div>
        </div>
      </section>

      {/* Timeline Grid */}
      <section aria-label="Implementation milestones" className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {visible.map((milestone) => {
          const isHackathon = milestone.phase === '48-Hour Hackathon';
          const statusStyle =
            milestone.status === 'Completed'
              ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
              : milestone.status === 'Active'
              ? 'bg-[#14B8D4]/15 text-[#0E7490] border-[#14B8D4]/40'
              : 'bg-slate-100 text-slate-700 border-slate-200';

          return (
            <article
              key={milestone.id}
              className={`rounded-2xl border p-5 shadow-xs flex flex-col justify-between gap-3 ${
                isHackathon
                  ? 'bg-white border-slate-200'
                  : 'bg-[#F8FAFC] border-[#1677E8]/25'
              }`}
            >
              <div>
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-[#1677E8]">
                    {isHackathon ? (
                      <Clock className="w-3.5 h-3.5" aria-hidden="true" />
                    ) : (
                      <Rocket className="w-3.5 h-3.5 text-[#0D9B80]" aria-hidden="true" />
                    )}
                    {milestone.window}
                  </span>
                  <span
                    className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold border ${statusStyle}`}
                  >
                    {milestone.status}
                  </span>
                </div>

                <h3 className="font-display font-bold text-base text-[#0B1530] mt-2">
                  {milestone.title}
                </h3>
                <p className="text-[11px] text-[#7C899D] mt-0.5">
                  {milestone.phase} · Track: {milestone.owner}
                </p>

                <ul className="mt-3 space-y-1.5 text-xs text-slate-700">
                  {milestone.deliverables.map((d) => (
                    <li key={d} className="flex items-start gap-2">
                      {milestone.status === 'Completed' ? (
                        <CheckCircle2
                          className="w-3.5 h-3.5 text-[#0D9B80] shrink-0 mt-0.5"
                          aria-hidden="true"
                        />
                      ) : (
                        <Sparkles
                          className="w-3.5 h-3.5 text-[#14B8D4] shrink-0 mt-0.5"
                          aria-hidden="true"
                        />
                      )}
                      <span>{d}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          );
        })}
      </section>
    </div>
  );
}

