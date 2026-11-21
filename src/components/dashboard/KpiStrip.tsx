import { Database, GitMerge, CheckCircle2, ShieldCheck } from 'lucide-react';
import { KpiMetric } from '../../types/inventory';

const ICON_MAP = {
  inventory: Database,
  duplicates: GitMerge,
  matched: CheckCircle2,
  suppliers: ShieldCheck,
};

const TONE_STYLES = {
  navy: {
    value: 'text-[#0B1530]',
    iconBg: 'bg-[#1677E8]/10 text-[#1677E8] border-[#1677E8]/20',
    delta: 'text-[#1677E8]',
  },
  red: {
    value: 'text-[#DC2626]',
    iconBg: 'bg-rose-50 text-rose-600 border-rose-200',
    delta: 'text-rose-600',
  },
  teal: {
    value: 'text-[#0D9B80]',
    iconBg: 'bg-[#0D9B80]/10 text-[#0D9B80] border-[#0D9B80]/25',
    delta: 'text-[#0D9B80]',
  },
  blue: {
    value: 'text-[#0B1530]',
    iconBg: 'bg-[#14B8D4]/12 text-[#0E8BA3] border-[#14B8D4]/30',
    delta: 'text-[#475569]',
  },
};

interface KpiStripProps {
  metrics: KpiMetric[];
}

export function KpiStrip({ metrics }: KpiStripProps) {
  return (
    <section aria-label="Inventory KPI summary" className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3.5">
      {metrics.map((kpi) => {
        const Icon = ICON_MAP[kpi.icon];
        const styles = TONE_STYLES[kpi.tone];
        return (
          <div
            key={kpi.id}
            className="bg-white rounded-xl border border-slate-200/90 shadow-xs px-4 py-3.5 flex items-start justify-between gap-3 hover:border-slate-300 transition-colors"
          >
            <div className="min-w-0">
              <p className="text-[11px] font-bold uppercase tracking-wider text-[#7C899D]">
                {kpi.label}
              </p>
              <p className={`text-2xl sm:text-[28px] font-display font-extrabold tracking-tight leading-tight mt-1 ${styles.value}`}>
                {kpi.value}
              </p>
              <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5 mt-1">
                <span className={`text-xs font-semibold ${styles.delta}`}>
                  {kpi.delta}
                </span>
                <span className="text-[10px] text-[#7C899D] bg-[#F3F6FA] px-1.5 py-0.5 rounded border border-slate-200/80">
                  {kpi.demoNote}
                </span>
              </div>
            </div>
            <div
              className={`w-9 h-9 rounded-lg border flex items-center justify-center shrink-0 mt-0.5 ${styles.iconBg}`}
            >
              <Icon className="w-4 h-4" aria-hidden="true" />
            </div>
          </div>
        );
      })}
    </section>
  );
}

