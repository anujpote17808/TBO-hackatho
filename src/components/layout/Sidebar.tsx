import { NavLink } from 'react-router-dom';
import {
  LayoutGrid,
  Compass,
  Building2,
  GitCompareArrows,
  Sparkles,
  Scale,
  ShieldCheck,
  Network,
  TrendingUp,
  Milestone,
  Database,
  Presentation,
  X,
  Globe,
} from 'lucide-react';
import { NAV_ITEMS, REGIONAL_FEEDS } from '../../data/overviewData';
import { ModuleRouteId } from '../../types/inventory';

const ICON_MAP: Record<ModuleRouteId, typeof LayoutGrid> = {
  overview: LayoutGrid,
  sightseeing: Compass,
  hotels: Building2,
  matching: GitCompareArrows,
  ranking: Sparkles,
  suppliers: Scale,
  quality: ShieldCheck,
  architecture: Network,
  impact: TrendingUp,
  roadmap: Milestone,
};

interface SidebarProps {
  onOpenPresentation: (slideIndex?: number) => void;
  onNavigate?: () => void;
  showCloseButton?: boolean;
  onCloseMobile?: () => void;
}

export function Sidebar({
  onOpenPresentation,
  onNavigate,
  showCloseButton = false,
  onCloseMobile,
}: SidebarProps) {
  return (
    <aside
      aria-label="Primary dashboard navigation"
      className="w-[248px] shrink-0 bg-[#0B1530] text-slate-200 flex flex-col h-full border-r border-white/10 select-none"
    >
      {/* Brand Block */}
      <div className="px-4 py-4 border-b border-white/10 flex items-center justify-between gap-2">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#14B8D4] to-[#1677E8] flex items-center justify-center shadow-lg shadow-[#14B8D4]/20 shrink-0">
            <Globe className="w-5 h-5 text-white" aria-hidden="true" />
          </div>
          <div className="leading-tight">
            <div className="flex items-center gap-1.5">
              <span className="font-display font-extrabold text-[15px] tracking-tight text-white">
                TripMatch
              </span>
              <span className="text-[11px] font-bold px-1.5 py-0.5 rounded bg-[#14B8D4]/20 text-[#14B8D4]">
                AI
              </span>
            </div>
            <p className="text-[10px] font-semibold tracking-[0.12em] uppercase text-slate-400 mt-0.5">
              INVENTORY OS
            </p>
          </div>
        </div>
        {showCloseButton && onCloseMobile && (
          <button
            type="button"
            onClick={onCloseMobile}
            aria-label="Close navigation menu"
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 cursor-pointer"
          >
            <X className="w-4 h-4" aria-hidden="true" />
          </button>
        )}
      </div>

      {/* Presentation Quick Launchers */}
      <div className="px-3.5 pt-3.5 pb-2">
        <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-slate-400 mb-2 px-1">
          Presentation Views
        </p>
        <div className="grid grid-cols-2 gap-1.5">
          <button
            type="button"
            onClick={() => {
              onOpenPresentation(0);
              onNavigate?.();
            }}
            className="text-left px-2.5 py-2 rounded-lg bg-[#14B8D4]/15 hover:bg-[#14B8D4]/25 border border-[#14B8D4]/40 transition-colors cursor-pointer"
          >
            <span className="block text-[9px] font-bold uppercase tracking-wider text-[#14B8D4]">
              Slide 1
            </span>
            <span className="block text-xs font-semibold text-white truncate mt-0.5">
              Inventory
            </span>
          </button>
          <button
            type="button"
            onClick={() => {
              onOpenPresentation(5);
              onNavigate?.();
            }}
            className="text-left px-2.5 py-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 transition-colors cursor-pointer"
          >
            <span className="block text-[9px] font-bold uppercase tracking-wider text-slate-400">
              Slide 6
            </span>
            <span className="block text-xs font-semibold text-slate-200 truncate mt-0.5">
              Smart Rank
            </span>
          </button>
        </div>
      </div>

      {/* 10 Navigation Modules */}
      <nav className="flex-1 overflow-y-auto px-3 py-2 space-y-0.5">
        <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-slate-400 mb-1.5 px-2">
          Navigation
        </p>
        {NAV_ITEMS.map((item) => {
          const Icon = ICON_MAP[item.id];
          return (
            <NavLink
              key={item.id}
              to={item.path}
              end={item.path === '/'}
              onClick={onNavigate}
              className={({ isActive }) =>
                `group flex items-center justify-between gap-2 px-2.5 py-2 rounded-lg text-[13px] font-medium transition-all ${
                  isActive
                    ? 'bg-gradient-to-r from-[#1677E8]/25 to-[#14B8D4]/15 text-white border border-[#14B8D4]/45 shadow-sm'
                    : 'text-slate-300/85 hover:text-white hover:bg-white/5 border border-transparent'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <span className="flex items-center gap-2.5 min-w-0">
                    <Icon
                      className={`w-4 h-4 shrink-0 ${
                        isActive
                          ? 'text-[#14B8D4]'
                          : 'text-slate-400 group-hover:text-slate-200'
                      }`}
                      aria-hidden="true"
                    />
                    <span className="truncate">{item.label}</span>
                  </span>
                  {item.badge && (
                    <span
                      className={`text-[9px] font-bold px-1.5 py-0.5 rounded uppercase tracking-wider shrink-0 ${
                        isActive
                          ? 'bg-[#14B8D4] text-[#0B1530]'
                          : 'bg-white/10 text-slate-300'
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </>
              )}
            </NavLink>
          );
        })}

        {/* Compact Regional Feeds Stats */}
        <div className="pt-4 pb-2 px-1">
          <div className="rounded-xl bg-[#101C38] border border-white/10 p-3">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-300">
                Regional Feeds
              </span>
              <span className="text-[11px] font-semibold text-[#14B8D4]">
                24 Feeds
              </span>
            </div>
            <ul className="space-y-1.5">
              {REGIONAL_FEEDS.map((hub) => (
                <li
                  key={hub.region}
                  className="flex items-center justify-between text-xs text-slate-300/90"
                >
                  <span className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#14B8D4]" aria-hidden="true" />
                    {hub.region}
                  </span>
                  <span className="font-mono text-[11px] text-slate-400">
                    {hub.feeds}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </nav>

      {/* Bottom Demo Indicator + Full Deck CTA */}
      <div className="p-3 border-t border-white/10 space-y-2 bg-[#091229]">
        <button
          type="button"
          onClick={() => {
            onOpenPresentation(0);
            onNavigate?.();
          }}
          className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-lg bg-[#1677E8] hover:bg-[#1365C7] text-white text-xs font-semibold transition-colors cursor-pointer"
        >
          <Presentation className="w-3.5 h-3.5" aria-hidden="true" />
          Launch 9-Slide Pitch Mode
        </button>
        <div className="rounded-lg bg-[#101C38] border border-white/10 p-2.5">
          <div className="flex items-center justify-between gap-2">
            <span className="flex items-center gap-1.5 text-[11px] font-semibold text-slate-200">
              <Database className="w-3.5 h-3.5 text-[#14B8D4]" aria-hidden="true" />
              24 Demo Feeds
            </span>
            <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-[#0D9B80]/20 text-[#4FD1B8] border border-[#0D9B80]/30">
              Demo Data
            </span>
          </div>
          <p className="text-[10px] text-slate-400 leading-relaxed mt-1">
            Illustrative synthetic travel inventory simulation for TBO Hackathon.
          </p>
        </div>
      </div>
    </aside>
  );
}

