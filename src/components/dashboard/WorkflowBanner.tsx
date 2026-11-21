import { ArrowRight, Check } from 'lucide-react';
import { WORKFLOW_STEPS } from '../../data/overviewData';

export function WorkflowBanner() {
  return (
    <section
      aria-label="TravelIQ Inventory Intelligence Workflow"
      className="bg-[#0B1530] text-white rounded-xl px-4 py-3.5 border border-white/10 shadow-sm"
    >
      <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-3">
        <div className="flex items-center gap-2.5 shrink-0">
          <span className="px-2 py-0.5 rounded bg-[#0D9B80]/20 border border-[#0D9B80]/40 text-[#4FD1B8] text-[10px] font-bold uppercase tracking-wider">
            How It Works
          </span>
          <span className="font-display font-bold text-xs sm:text-sm text-white">
            TravelIQ Intelligence Flow:
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-2 lg:gap-3 flex-1 xl:justify-center">
          {WORKFLOW_STEPS.map((step, idx) => (
            <div key={step.step} className="flex items-center gap-2">
              <div className="flex items-center gap-2 bg-[#101C38] border border-white/10 rounded-lg px-2.5 py-1.5">
                <span className="w-5 h-5 rounded-full bg-[#14B8D4]/20 border border-[#14B8D4]/50 text-[#14B8D4] text-[11px] font-bold flex items-center justify-center shrink-0">
                  {step.step}
                </span>
                <div className="leading-tight">
                  <span className="text-[11px] font-extrabold tracking-wide text-[#14B8D4]">
                    {step.code}
                  </span>
                  <span className="hidden sm:inline text-[11px] text-slate-300 ml-1.5">
                    {step.detail}
                  </span>
                </div>
              </div>
              {idx < WORKFLOW_STEPS.length - 1 && (
                <ArrowRight
                  className="w-3.5 h-3.5 text-slate-500 hidden sm:block shrink-0"
                  aria-hidden="true"
                />
              )}
            </div>
          ))}
        </div>

        <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#0D9B80]/15 border border-[#0D9B80]/40 text-[#4FD1B8] text-xs font-semibold shrink-0 self-start xl:self-auto">
          <Check className="w-3.5 h-3.5" aria-hidden="true" />
          Unified Catalog
        </div>
      </div>
    </section>
  );
}

