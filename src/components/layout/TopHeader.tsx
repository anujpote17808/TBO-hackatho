import { Menu, Presentation, Sparkles } from 'lucide-react';
import { NavItemConfig } from '../../types/inventory';

interface TopHeaderProps {
  currentModule: NavItemConfig;
  onOpenMobileMenu: () => void;
  onOpenPresentation: (slideIndex?: number) => void;
}

export function TopHeader({
  currentModule,
  onOpenMobileMenu,
  onOpenPresentation,
}: TopHeaderProps) {
  return (
    <header className="sticky top-0 z-20 bg-[#0B1530] text-white border-b border-white/10 px-4 lg:px-6 py-3">
      <div className="flex items-center justify-between gap-4">
        {/* Left: Mobile trigger + Module Identity */}
        <div className="flex items-center gap-3 min-w-0">
          <button
            type="button"
            onClick={onOpenMobileMenu}
            aria-label="Open navigation menu"
            className="lg:hidden p-2 rounded-lg text-slate-300 hover:text-white hover:bg-white/10 cursor-pointer"
          >
            <Menu className="w-5 h-5" aria-hidden="true" />
          </button>

          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-[#14B8D4]/15 border border-[#14B8D4]/35 text-[#14B8D4] text-[10px] font-bold tracking-wider uppercase">
                <Sparkles className="w-3 h-3" aria-hidden="true" />
                TRAVELIQ AI
              </span>
              <span className="text-slate-500 hidden sm:inline">•</span>
              <h1 className="font-display font-bold text-sm sm:text-base text-white truncate">
                {currentModule.title}
              </h1>
            </div>
            <p className="text-xs text-slate-300/80 truncate mt-0.5 max-w-2xl">
              {currentModule.subtitle}
            </p>
          </div>
        </div>

        {/* Right: Presentation Switcher + Prototype Mode + Profile */}
        <div className="flex items-center gap-2.5 shrink-0">
          <div className="hidden md:flex items-center bg-[#101C38] border border-white/10 rounded-full p-1">
            <button
              type="button"
              onClick={() => onOpenPresentation(0)}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gradient-to-r from-[#14B8D4] to-[#1677E8] text-white text-xs font-semibold shadow-sm hover:opacity-95 transition-opacity cursor-pointer"
            >
              <Presentation className="w-3.5 h-3.5" aria-hidden="true" />
              Presentation Mode
            </button>
            <button
              type="button"
              onClick={() => onOpenPresentation(5)}
              className="px-3 py-1 rounded-full text-xs font-medium text-slate-300 hover:text-white transition-colors cursor-pointer"
            >
              Smart Rank Slide
            </button>
          </div>

          <button
            type="button"
            onClick={() => onOpenPresentation(0)}
            className="md:hidden inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-[#1677E8] text-white text-xs font-semibold cursor-pointer"
          >
            <Presentation className="w-3.5 h-3.5" aria-hidden="true" />
            Present
          </button>

          <div className="hidden xl:flex flex-col items-end leading-tight pl-2 border-l border-white/10">
            <span className="text-xs font-semibold text-white">Prototype Demo</span>
            <span className="text-[10px] font-medium text-[#14B8D4]">
              Illustrative Data Mode
            </span>
          </div>

          <div
            title="TBO Hackathon Presenter"
            className="w-8 h-8 rounded-full bg-[#101C38] border border-[#14B8D4]/50 flex items-center justify-center text-xs font-bold text-[#14B8D4]"
          >
            IQ
          </div>
        </div>
      </div>
    </header>
  );
}

