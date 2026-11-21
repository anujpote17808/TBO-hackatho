import { ReactNode, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import {
  Globe,
  Menu,
  X,
  Briefcase,
  Sparkles,
  Presentation,
  Trash2,
  CheckCircle2,
  ArrowRight,
  Cpu,
} from 'lucide-react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { useTrips } from '../../context/TripContext';
import { PresentationOverlay } from '../presentation/PresentationOverlay';
import { ModalDialog } from '../common/ModalDialog';
import { SafeImage } from '../common/SafeImage';
import { DemoBadge } from '../common/DemoBadge';
import { formatInr } from '../../utils/formatters';

interface MarketplaceShellProps {
  children: ReactNode;
}

const CENTER_LINKS = [
  { to: '/', label: 'Explore', end: true },
  { to: '/hotels', label: 'Hotels' },
  { to: '/experiences', label: 'Experiences' },
  { to: '/destinations', label: 'Destinations' },
  { to: '/ai-intelligence/ranking', label: 'AI Recommendations' },
  { to: '/ai-intelligence', label: 'AI Inventory Intelligence', highlight: true },
];

export function MarketplaceShell({ children }: MarketplaceShellProps) {
  const location = useLocation();
  const prefersReduced = useReducedMotion();
  const { items, removeTripItem, clearTrips, tripsDrawerOpen, setTripsDrawerOpen } = useTrips();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [presentationOpen, setPresentationOpen] = useState(false);
  const [presentationSlide, setPresentationSlide] = useState(0);
  const [authModalMode, setAuthModalMode] = useState<'signin' | 'signup' | null>(null);
  const [authEmail, setAuthEmail] = useState('');
  const [authSuccess, setAuthSuccess] = useState(false);

  const totalTripValue = items.reduce((sum, item) => sum + item.priceInr, 0);

  const handleAuthSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setAuthSuccess(true);
  };

  const openPresentation = (slide = 0) => {
    setPresentationSlide(slide);
    setPresentationOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F7F9FC] text-[#192338]">
      {/* Sticky Clean White Marketplace Navigation Bar */}
      <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-[0_1px_12px_rgba(16,28,53,0.05)]">
        <div className="max-w-[1380px] mx-auto px-4 sm:px-6 h-[70px] flex items-center justify-between gap-4">
          {/* Left: TripMatch AI Brand */}
          <Link to="/" className="flex items-center gap-2.5 shrink-0 group">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#101C35] via-[#1677FF] to-[#19C5D8] flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform">
              <Globe className="w-5 h-5 text-white" aria-hidden="true" />
            </div>
            <div className="leading-tight">
              <div className="flex items-center gap-1.5">
                <span className="font-display font-extrabold text-[17px] tracking-tight text-[#101C35]">
                  TripMatch
                </span>
                <span className="px-1.5 py-0.5 rounded-md bg-[#1677FF]/10 text-[#1677FF] text-[10px] font-extrabold uppercase tracking-wider">
                  AI
                </span>
              </div>
              <span className="hidden sm:block text-[10px] font-medium text-[#748198] tracking-wide">
                Discover Better. Compare Smarter.
              </span>
            </div>
          </Link>

          {/* Center: Primary Navigation */}
          <nav aria-label="Main navigation" className="hidden xl:flex items-center gap-1">
            {CENTER_LINKS.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.end}
                className={({ isActive }) => {
                  const active =
                    link.to === '/ai-intelligence'
                      ? location.pathname === '/ai-intelligence' ||
                        location.pathname.startsWith('/ai-intelligence/matching') ||
                        location.pathname.startsWith('/ai-intelligence/suppliers') ||
                        location.pathname.startsWith('/ai-intelligence/quality') ||
                        location.pathname.startsWith('/ai-intelligence/architecture')
                      : isActive;

                  if (link.highlight) {
                    return `inline-flex items-center gap-1.5 px-3 py-2 rounded-full text-[13px] font-semibold transition-all ${
                      active
                        ? 'bg-[#101C35] text-white shadow-xs'
                        : 'bg-[#101C35]/5 text-[#101C35] hover:bg-[#101C35]/10'
                    }`;
                  }

                  return `px-3 py-2 rounded-full text-[13px] font-semibold transition-colors ${
                    active
                      ? 'text-[#1677FF] bg-[#1677FF]/8'
                      : 'text-[#475569] hover:text-[#101C35] hover:bg-slate-100/80'
                  }`;
                }}
              >
                {link.highlight && (
                  <Cpu className="w-3.5 h-3.5 text-[#19C5D8]" aria-hidden="true" />
                )}
                {link.label}
              </NavLink>
            ))}
          </nav>

          {/* Right: My Trips, Pitch Deck, Sign In, Get Started */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={() => openPresentation(0)}
              title="Open 9-Slide Hackathon Presentation Mode"
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-2 rounded-full border border-slate-200 hover:border-[#1677FF]/40 hover:bg-[#F7F9FC] text-xs font-semibold text-[#101C35] transition-colors cursor-pointer"
            >
              <Presentation className="w-3.5 h-3.5 text-[#1677FF]" aria-hidden="true" />
              <span className="hidden md:inline">Pitch Mode</span>
            </button>

            <button
              type="button"
              onClick={() => setTripsDrawerOpen(true)}
              className="relative inline-flex items-center gap-1.5 px-3 py-2 rounded-full hover:bg-slate-100 text-xs font-semibold text-[#101C35] transition-colors cursor-pointer"
            >
              <Briefcase className="w-4 h-4 text-[#1677FF]" aria-hidden="true" />
              <span className="hidden sm:inline">My Trips</span>
              {items.length > 0 && (
                <span className="inline-flex items-center justify-center min-w-[18px] h-[18px] px-1 rounded-full bg-[#0D9B80] text-white text-[10px] font-bold">
                  {items.length}
                </span>
              )}
            </button>

            <button
              type="button"
              onClick={() => {
                setAuthSuccess(false);
                setAuthModalMode('signin');
              }}
              className="hidden md:inline-flex px-3.5 py-2 rounded-full text-xs font-semibold text-[#192338] hover:bg-slate-100 transition-colors cursor-pointer"
            >
              Sign In
            </button>

            <button
              type="button"
              onClick={() => {
                setAuthSuccess(false);
                setAuthModalMode('signup');
              }}
              className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#1677FF] hover:bg-[#0F65E0] text-white text-xs font-bold shadow-sm shadow-[#1677FF]/25 transition-all cursor-pointer"
            >
              Get Started
            </button>

            <button
              type="button"
              onClick={() => setMobileMenuOpen((v) => !v)}
              aria-label="Toggle mobile menu"
              aria-expanded={mobileMenuOpen}
              className="xl:hidden p-2 rounded-xl text-[#101C35] hover:bg-slate-100 cursor-pointer"
            >
              {mobileMenuOpen ? (
                <X className="w-5 h-5" aria-hidden="true" />
              ) : (
                <Menu className="w-5 h-5" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>

        {/* Responsive Mobile Dropdown Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={prefersReduced ? false : { opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="xl:hidden border-t border-slate-200 bg-white overflow-hidden"
            >
              <div className="px-4 py-3 space-y-1">
                {CENTER_LINKS.map((link) => (
                  <NavLink
                    key={link.to}
                    to={link.to}
                    end={link.end}
                    onClick={() => setMobileMenuOpen(false)}
                    className={({ isActive }) =>
                      `block px-3.5 py-2.5 rounded-xl text-sm font-semibold ${
                        isActive
                          ? 'bg-[#1677FF]/10 text-[#1677FF]'
                          : 'text-[#192338] hover:bg-slate-50'
                      }`
                    }
                  >
                    {link.label}
                  </NavLink>
                ))}
                <div className="pt-2 mt-2 border-t border-slate-100 grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setMobileMenuOpen(false);
                      openPresentation(0);
                    }}
                    className="py-2 rounded-xl border border-slate-200 text-xs font-semibold text-[#101C35]"
                  >
                    9-Slide Pitch Mode
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setMobileMenuOpen(false);
                      setAuthSuccess(false);
                      setAuthModalMode('signup');
                    }}
                    className="py-2 rounded-xl bg-[#1677FF] text-white text-xs font-bold"
                  >
                    Get Started
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Main Content with Smooth Page Transition */}
      <main className="flex-1">
        <motion.div
          key={location.pathname}
          initial={prefersReduced ? false : { opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
        >
          {children}
        </motion.div>
      </main>

      {/* Enterprise Marketplace Footer */}
      <footer className="bg-[#101C35] text-slate-300 border-t border-white/10 mt-16">
        <div className="max-w-[1380px] mx-auto px-4 sm:px-6 py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#1677FF] to-[#19C5D8] flex items-center justify-center">
                <Globe className="w-5 h-5 text-white" aria-hidden="true" />
              </div>
              <div>
                <span className="font-display font-extrabold text-base text-white">
                  TripMatch AI
                </span>
                <span className="block text-[10px] uppercase tracking-widest text-[#19C5D8]">
                  Unified Travel Inventory OS
                </span>
              </div>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Discover Better. Compare Smarter. Travel Further. Built for the TBO 48-Hour Global Open Innovation Hackathon using synthetic illustrative travel inventory.
            </p>
            <DemoBadge variant="dark" label="Illustrative Demo Prototype" />
          </div>

          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-white mb-3">
              Travel Marketplace
            </h3>
            <ul className="space-y-2 text-xs">
              <li><Link to="/" className="hover:text-[#19C5D8] transition-colors">Explore Home</Link></li>
              <li><Link to="/destinations" className="hover:text-[#19C5D8] transition-colors">Incredible India Destinations</Link></li>
              <li><Link to="/experiences" className="hover:text-[#19C5D8] transition-colors">Sightseeing Experiences</Link></li>
              <li><Link to="/hotels" className="hover:text-[#19C5D8] transition-colors">Luxury & Business Hotels</Link></li>
              <li><Link to="/room-comparison" className="hover:text-[#19C5D8] transition-colors">Hotel Room Comparison</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-white mb-3">
              AI Inventory Intelligence
            </h3>
            <ul className="space-y-2 text-xs">
              <li><Link to="/ai-intelligence" className="hover:text-[#19C5D8] transition-colors">Inventory Overview & Workflow</Link></li>
              <li><Link to="/ai-intelligence/matching" className="hover:text-[#19C5D8] transition-colors">AI Product Matching Engine</Link></li>
              <li><Link to="/ai-intelligence/suppliers" className="hover:text-[#19C5D8] transition-colors">Supplier Comparison Matrix</Link></li>
              <li><Link to="/ai-intelligence/ranking" className="hover:text-[#19C5D8] transition-colors">Smart Search Ranking</Link></li>
              <li><Link to="/ai-intelligence/quality" className="hover:text-[#19C5D8] transition-colors">Duplicate & Content Quality</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-white mb-3">
              Hackathon Judging
            </h3>
            <ul className="space-y-2 text-xs">
              <li><Link to="/business-impact" className="hover:text-[#19C5D8] transition-colors">Business Impact & KPIs</Link></li>
              <li><Link to="/ai-intelligence/architecture" className="hover:text-[#19C5D8] transition-colors">9-Layer System Architecture</Link></li>
              <li><Link to="/roadmap" className="hover:text-[#19C5D8] transition-colors">48-Hour Implementation Roadmap</Link></li>
              <li>
                <button
                  type="button"
                  onClick={() => openPresentation(0)}
                  className="inline-flex items-center gap-1.5 text-[#19C5D8] hover:underline font-semibold cursor-pointer mt-1"
                >
                  <Sparkles className="w-3.5 h-3.5" aria-hidden="true" />
                  Launch 9-Slide Pitch Mode
                </button>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 py-4 px-4 sm:px-6 text-center text-[11px] text-slate-400">
          TripMatch AI · TBO Open Innovation Hackathon Prototype · All prices, supplier catalogs, guest ratings, and evaluation figures are illustrative synthetic demonstration data.
        </div>
      </footer>

      {/* My Trips Interactive Itinerary Dialog */}
      <ModalDialog
        open={tripsDrawerOpen}
        onClose={() => setTripsDrawerOpen(false)}
        title={`My Trips (${items.length} Saved)`}
        subtitle="Illustrative booking shortlist comparing verified supplier offers without losing policy transparency."
      >
        <div className="space-y-4">
          {items.length === 0 ? (
            <div className="text-center py-10 space-y-2">
              <Briefcase className="w-9 h-9 text-slate-300 mx-auto" aria-hidden="true" />
              <p className="font-semibold text-sm text-[#101C35]">Your trip shortlist is empty</p>
              <p className="text-xs text-[#748198]">
                Select any sightseeing experience or hotel room offer to compare and shortlist it here.
              </p>
            </div>
          ) : (
            <>
              <div className="space-y-3">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="flex flex-col sm:flex-row items-start sm:items-center gap-3.5 p-3.5 rounded-xl border border-slate-200 bg-[#F7F9FC]"
                  >
                    <div className="w-full sm:w-24 h-20 rounded-lg overflow-hidden shrink-0">
                      <SafeImage src={item.image} alt={item.title} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 rounded bg-[#1677FF]/10 text-[#1677FF] text-[10px] font-bold uppercase">
                          {item.type}
                        </span>
                        <span className="text-[11px] text-[#748198]">{item.destination}</span>
                      </div>
                      <h4 className="font-display font-bold text-sm text-[#101C35] mt-0.5">
                        {item.title}
                      </h4>
                      <p className="text-xs text-slate-600">{item.subtitle}</p>
                      <p className="text-[11px] text-[#0D9B80] font-medium mt-0.5">
                        {item.supplier} · {item.policy}
                      </p>
                    </div>
                    <div className="flex sm:flex-col items-center sm:items-end justify-between w-full sm:w-auto gap-2 shrink-0">
                      <span className="font-display font-extrabold text-lg text-[#101C35]">
                        {formatInr(item.priceInr)}
                      </span>
                      <button
                        type="button"
                        onClick={() => removeTripItem(item.id)}
                        className="inline-flex items-center gap-1 text-[11px] text-rose-600 hover:underline cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" aria-hidden="true" /> Remove
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="p-4 rounded-xl bg-[#101C35] text-white flex flex-wrap items-center justify-between gap-3">
                <div>
                  <span className="text-[11px] text-slate-300 block">
                    Estimated Demo Itinerary Total ({items.length} items)
                  </span>
                  <span className="font-display font-extrabold text-2xl text-[#19C5D8]">
                    {formatInr(totalTripValue)}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={clearTrips}
                    className="px-3 py-2 rounded-lg bg-white/10 hover:bg-white/15 text-xs font-semibold cursor-pointer"
                  >
                    Clear All
                  </button>
                  <button
                    type="button"
                    onClick={() => setTripsDrawerOpen(false)}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#0D9B80] hover:bg-[#0A846D] text-white text-xs font-bold cursor-pointer"
                  >
                    Continue Exploring <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </ModalDialog>

      {/* Sign In / Get Started Demo Modal */}
      <ModalDialog
        open={authModalMode !== null}
        onClose={() => setAuthModalMode(null)}
        title={authModalMode === 'signin' ? 'Sign In to TripMatch AI' : 'Get Started with TripMatch AI'}
        subtitle="Demo workspace access — explore consumer booking discovery and B2B AI Inventory Intelligence."
      >
        {authSuccess ? (
          <div className="py-6 text-center space-y-3">
            <CheckCircle2 className="w-10 h-10 text-[#0D9B80] mx-auto" aria-hidden="true" />
            <h3 className="font-display font-bold text-lg text-[#101C35]">
              Demo Session Ready
            </h3>
            <p className="text-xs text-[#748198] max-w-md mx-auto">
              Welcome{authEmail ? `, ${authEmail}` : ''}! This hackathon prototype provides full instant access to all marketplace search, comparison, matching, and ranking modules without external authentication.
            </p>
            <button
              type="button"
              onClick={() => setAuthModalMode(null)}
              className="px-5 py-2 rounded-xl bg-[#1677FF] text-white text-xs font-bold cursor-pointer"
            >
              Start Exploring
            </button>
          </div>
        ) : (
          <form onSubmit={handleAuthSubmit} className="space-y-4 max-w-md mx-auto">
            <div>
              <label htmlFor="demo-email" className="block text-xs font-semibold text-[#101C35] mb-1">
                Work or Travel Email
              </label>
              <input
                id="demo-email"
                type="email"
                required
                value={authEmail}
                onChange={(e) => setAuthEmail(e.target.value)}
                placeholder="agent@tripmatch.ai"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-[#1677FF]"
              />
            </div>
            <div className="rounded-xl bg-[#F7F9FC] border border-slate-200 p-3 text-[11px] text-[#748198]">
              Prototype demonstration mode: No real credentials or payment information are stored.
            </div>
            <button
              type="submit"
              className="w-full py-2.5 rounded-xl bg-[#1677FF] hover:bg-[#0F65E0] text-white text-sm font-bold cursor-pointer"
            >
              {authModalMode === 'signin' ? 'Continue to Demo Workspace' : 'Create Demo Profile'}
            </button>
          </form>
        )}
      </ModalDialog>

      {/* Fullscreen 9-Slide Presentation Mode */}
      <PresentationOverlay
        open={presentationOpen}
        initialSlide={presentationSlide}
        onClose={() => setPresentationOpen(false)}
      />
    </div>
  );
}

