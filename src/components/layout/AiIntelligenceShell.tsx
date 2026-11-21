import { ReactNode } from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutGrid,
  GitCompareArrows,
  BedDouble,
  Scale,
  Sparkles,
  ShieldCheck,
  Network,
  TrendingUp,
  Milestone,
} from 'lucide-react';
import { DemoBadge } from '../common/DemoBadge';

const AI_SUBNAV = [
  { to: '/ai-intelligence', label: 'Inventory Overview', icon: LayoutGrid, end: true },
  { to: '/ai-intelligence/matching', label: 'Product Matching', icon: GitCompareArrows },
  { to: '/room-comparison', label: 'Room Mapping', icon: BedDouble },
  { to: '/ai-intelligence/suppliers', label: 'Supplier Comparison', icon: Scale },
  { to: '/ai-intelligence/ranking', label: 'Smart Ranking', icon: Sparkles },
  { to: '/ai-intelligence/quality', label: 'Duplicate & Quality', icon: ShieldCheck },
  { to: '/ai-intelligence/architecture', label: 'Architecture', icon: Network },
  { to: '/business-impact', label: 'Business Impact', icon: TrendingUp },
  { to: '/roadmap', label: 'Roadmap', icon: Milestone },
];

interface AiIntelligenceShellProps {
  title: string;
  subtitle: string;
  badge?: string;
  children: ReactNode;
}

export function AiIntelligenceShell({
  title,
  subtitle,
  badge = 'B2B Enterprise Intelligence OS',
  children,
}: AiIntelligenceShellProps) {
  return (
    <div>
      {/* Enterprise Dark Navy Command Header */}
      <section className="bg-[#101C35] text-white border-b border-white/10">
        <div className="max-w-[1380px] mx-auto px-4 sm:px-6 pt-7 pb-4">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#19C5D8]/15 border border-[#19C5D8]/35 text-[#19C5D8] text-[11px] font-bold uppercase tracking-wider">
                <Sparkles className="w-3 h-3" aria-hidden="true" />
                {badge}
              </span>
              <h1 className="font-display font-extrabold text-2xl sm:text-3xl tracking-tight mt-2">
                {title}
              </h1>
              <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-3xl">
                {subtitle}
              </p>
            </div>
            <DemoBadge variant="dark" label="Illustrative Synthetic Feeds · 24 Suppliers" />
          </div>

          {/* Horizontal Enterprise Sub-Navigation */}
          <nav
            aria-label="AI Inventory Intelligence sections"
            className="flex items-center gap-1.5 overflow-x-auto pt-5 pb-1 -mx-1 px-1"
          >
            {AI_SUBNAV.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.end}
                  className={({ isActive }) =>
                    `inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                      isActive
                        ? 'bg-[#1677FF] text-white shadow-sm'
                        : 'bg-white/5 text-slate-300 hover:bg-white/10 hover:text-white border border-white/10'
                    }`
                  }
                >
                  <Icon className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                  {item.label}
                </NavLink>
              );
            })}
          </nav>
        </div>
      </section>

      <div className="max-w-[1380px] mx-auto px-4 sm:px-6 py-6">{children}</div>
    </div>
  );
}

