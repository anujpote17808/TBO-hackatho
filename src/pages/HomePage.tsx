import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import {
  ArrowRight,
  MapPin,
  Star,
  Sparkles,
  CheckCircle2,
  ShieldCheck,
  Layers,
  Scale,
  TrendingUp,
  Cpu,
  AlertTriangle,
} from 'lucide-react';
import { DESTINATIONS } from '../data/destinationsData';
import { SIGHTSEEING_PRODUCTS } from '../data/sightseeingData';
import { HOTEL_PROPERTIES } from '../data/hotelData';
import { SightseeingProduct } from '../types/inventory';
import { FloatingSearchPanel } from '../components/search/FloatingSearchPanel';
import { OfferComparisonModal } from '../components/sightseeing/OfferComparisonModal';
import { SafeImage } from '../components/common/SafeImage';
import { DemoBadge } from '../components/common/DemoBadge';
import {
  AnimatedCounter,
  RevealSection,
  TiltCard3D,
} from '../components/motion/MotionPrimitives';
import { formatInr } from '../utils/formatters';

export function HomePage() {
  const prefersReduced = useReducedMotion();
  const [compareProduct, setCompareProduct] = useState<SightseeingProduct | null>(null);

  return (
    <div className="space-y-20 pb-8">
      {/* HERO SECTION: Immersive Full-Width Editorial Destination Photography */}
      <section className="relative">
        <div className="tiq-parallax-wrap relative min-h-[540px] lg:min-h-[610px] w-full flex items-center bg-[#101C35]">
          {/* Parallax Background Image (LCP Priority) */}
          <div className="absolute inset-0 overflow-hidden">
            <motion.div
              initial={prefersReduced ? false : { scale: 1.09, opacity: 0.7 }}
              animate={{ scale: 1.04, opacity: 1 }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              className="w-full h-full tiq-parallax-bg"
            >
              <SafeImage
                src="/images/taj-mahal.png"
                alt="Taj Mahal in Agra at golden sunrise"
                priority
                className="w-full h-full object-cover object-center"
              />
            </motion.div>
            {/* Sophisticated Dark Editorial Vignette */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#101C35]/72 via-[#101C35]/48 to-[#101C35]/85" />
          </div>

          {/* Hero Copy & Floating Search Panel */}
          <div className="relative z-10 max-w-[1380px] w-full mx-auto px-4 sm:px-6 pt-12 pb-16 lg:pt-16 lg:pb-20 space-y-8">
            <motion.div
              initial={prefersReduced ? false : { opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              className="max-w-3xl space-y-4 text-white"
            >
              <div className="inline-flex flex-wrap items-center gap-2 px-3.5 py-1.5 rounded-full tiq-glass-dark border border-white/20 text-xs font-semibold text-[#94F0FA]">
                <Sparkles className="w-3.5 h-3.5 text-[#19C5D8]" aria-hidden="true" />
                <span>TravelIQ AI · Unified Multi-Supplier Travel Discovery</span>
                <span className="text-white/40">|</span>
                <span className="text-white/85">Illustrative Demo Data</span>
              </div>

              <h1 className="font-display font-extrabold text-4xl sm:text-5xl lg:text-[58px] leading-[1.06] tracking-tight drop-shadow-sm">
                Your Next Journey Starts Here.
              </h1>

              <p className="text-base sm:text-lg text-slate-100/90 max-w-2xl leading-relaxed font-normal">
                Discover extraordinary destinations, compare the best travel experiences and find the right stay with intelligent travel discovery.
              </p>
            </motion.div>

            {/* Floating Glassmorphic Search Panel */}
            <FloatingSearchPanel />

            {/* Subtle Trust Strip */}
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-slate-200/90 pt-1">
              <span className="inline-flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#19C5D8]" aria-hidden="true" />
                Differences preserved across every supplier offer
              </span>
              <span className="inline-flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-[#0D9B80]" aria-hidden="true" />
                Attribute-verified hotel room equivalence
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-[#19C5D8]" aria-hidden="true" />
                Transparent AI ranking & matching confidence
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* PHASE 3: EXPLORE INCREDIBLE INDIA (3D Perspective Destination Grid) */}
      <section className="max-w-[1380px] mx-auto px-4 sm:px-6 space-y-6">
        <RevealSection className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-[0.14em] text-[#1677FF]">
              Destination Discovery
            </span>
            <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-[#101C35] mt-1">
              Explore Incredible India
            </h2>
            <p className="text-sm text-[#748198] mt-1">
              Curated iconic hubs with deduplicated multi-supplier experiences and verified stays.
            </p>
          </div>
          <Link
            to="/destinations"
            className="inline-flex items-center gap-1.5 text-sm font-bold text-[#1677FF] hover:text-[#0F65E0]"
          >
            View All Destinations <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </Link>
        </RevealSection>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {DESTINATIONS.map((dest, idx) => (
            <RevealSection key={dest.slug} delay={idx * 0.05}>
              <TiltCard3D>
                <Link
                  to={`/destinations/${dest.slug}`}
                  className="group block relative h-[300px] rounded-2xl overflow-hidden bg-[#101C35] shadow-md hover:shadow-xl transition-shadow"
                >
                  <SafeImage
                    src={dest.image}
                    alt={`${dest.name}, ${dest.state}`}
                    className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#101C35]/90 via-[#101C35]/30 to-transparent group-hover:via-[#101C35]/40 transition-colors" />

                  {/* Floating Top Badges */}
                  <div className="absolute top-4 inset-x-4 flex items-center justify-between gap-2">
                    <span className="px-3 py-1 rounded-full tiq-glass-dark border border-white/20 text-white text-[11px] font-bold">
                      {dest.experiencesCount} Experiences · {dest.hotelsCount} Stays
                    </span>
                    <span className="px-2.5 py-1 rounded-full bg-white/95 text-[#101C35] text-[11px] font-extrabold shadow-xs">
                      From {formatInr(dest.startingPriceInr)}
                    </span>
                  </div>

                  {/* Floating Bottom Editorial Label */}
                  <div className="absolute bottom-4 inset-x-5 text-white space-y-1.5">
                    <div className="flex items-center gap-1.5 text-[11px] font-semibold text-[#19C5D8]">
                      <MapPin className="w-3.5 h-3.5" aria-hidden="true" />
                      {dest.state} · Best {dest.bestSeason}
                    </div>
                    <div className="flex items-end justify-between gap-3">
                      <div>
                        <h3 className="font-display font-extrabold text-2xl tracking-tight">
                          {dest.name}
                        </h3>
                        <p className="text-xs text-slate-200/90 line-clamp-2 mt-0.5">
                          {dest.description}
                        </p>
                      </div>
                      <span className="inline-flex items-center gap-1 px-3.5 py-2 rounded-xl bg-white text-[#101C35] group-hover:bg-[#1677FF] group-hover:text-white text-xs font-bold shrink-0 transition-colors">
                        Explore <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                      </span>
                    </div>
                  </div>
                </Link>
              </TiltCard3D>
            </RevealSection>
          ))}
        </div>
      </section>

      {/* FEATURED EXPERIENCES (MakeMyTrip-Style Multi-Supplier Showcase) */}
      <section className="max-w-[1380px] mx-auto px-4 sm:px-6 space-y-6">
        <RevealSection className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-[0.14em] text-[#0D9B80]">
              Multi-Supplier Sightseeing Marketplace
            </span>
            <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-[#101C35] mt-1">
              Top Experiences — Differences Preserved
            </h2>
            <p className="text-sm text-[#748198] mt-1">
              Same iconic monument matched across suppliers while clearly comparing tickets, guides, transfers & refund terms.
            </p>
          </div>
          <Link
            to="/experiences"
            className="inline-flex items-center gap-1.5 text-sm font-bold text-[#1677FF] hover:text-[#0F65E0]"
          >
            Browse All Experiences <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </Link>
        </RevealSection>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SIGHTSEEING_PRODUCTS.slice(0, 3).map((exp) => (
            <RevealSection key={exp.id}>
              <article className="bg-white rounded-2xl border border-slate-200/90 shadow-xs hover:shadow-lg transition-all overflow-hidden flex flex-col h-full group">
                <Link to={`/experiences/${exp.id}`} className="relative h-52 block overflow-hidden bg-[#101C35]">
                  <SafeImage
                    src={exp.image}
                    alt={exp.canonicalName}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-[#101C35]/80 text-white text-[11px] font-semibold backdrop-blur-xs">
                    {exp.category}
                  </span>
                  <span className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-[#0D9B80] text-white text-[11px] font-bold">
                    {exp.matchConfidence}% AI Match
                  </span>
                </Link>

                <div className="p-5 flex-1 flex flex-col justify-between gap-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs text-[#748198]">
                      <span className="inline-flex items-center gap-1 font-medium">
                        <MapPin className="w-3.5 h-3.5 text-[#1677FF]" aria-hidden="true" />
                        {exp.destination}
                      </span>
                      <span className="font-semibold text-[#1677FF]">
                        {exp.supplierCount} Supplier Offers
                      </span>
                    </div>

                    <Link to={`/experiences/${exp.id}`} className="block">
                      <h3 className="font-display font-bold text-lg text-[#101C35] group-hover:text-[#1677FF] transition-colors">
                        {exp.canonicalName}
                      </h3>
                    </Link>

                    <p className="text-xs text-[#748198] leading-relaxed">
                      {exp.inclusionSummary}
                    </p>

                    {/* Mini Supplier Tier Pills */}
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {exp.offers.map((o) => (
                        <span
                          key={o.id}
                          className="px-2 py-1 rounded-lg bg-[#F7F9FC] border border-slate-200 text-[11px] font-semibold text-[#101C35]"
                        >
                          {o.supplierName.split('—')[0].trim()}: {formatInr(o.priceInr)}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-3">
                    <div>
                      <span className="block text-[10px] uppercase tracking-wider text-[#748198] font-semibold">
                        Demo Offers From
                      </span>
                      <span className="font-display font-extrabold text-xl text-[#101C35]">
                        {formatInr(exp.priceRangeInr[0])}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => setCompareProduct(exp)}
                        className="px-3 py-2 rounded-xl border border-slate-200 hover:border-[#1677FF] text-xs font-bold text-[#101C35] transition-colors cursor-pointer"
                      >
                        Compare Offers
                      </button>
                      <Link
                        to={`/experiences/${exp.id}`}
                        className="px-3.5 py-2 rounded-xl bg-[#1677FF] hover:bg-[#0F65E0] text-white text-xs font-bold transition-colors"
                      >
                        View Details
                      </Link>
                    </div>
                  </div>
                </div>
              </article>
            </RevealSection>
          ))}
        </div>
      </section>

      {/* FEATURED LUXURY & HERITAGE STAYS (Booking.com-Style Showcase) */}
      <section className="max-w-[1380px] mx-auto px-4 sm:px-6 space-y-6">
        <RevealSection className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-[0.14em] text-[#1677FF]">
              Verified Hotel & Room Discovery
            </span>
            <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-[#101C35] mt-1">
              Handpicked Stays with Transparent Room Mapping
            </h2>
            <p className="text-sm text-[#748198] mt-1">
              Compare room size, bed guarantee, breakfast & refund policies across suppliers without misleading name merges.
            </p>
          </div>
          <Link
            to="/hotels"
            className="inline-flex items-center gap-1.5 text-sm font-bold text-[#1677FF] hover:text-[#0F65E0]"
          >
            Find Your Perfect Stay <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </Link>
        </RevealSection>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {HOTEL_PROPERTIES.slice(0, 3).map((hotel) => (
            <RevealSection key={hotel.id}>
              <article className="bg-white rounded-2xl border border-slate-200/90 shadow-xs hover:shadow-lg transition-all overflow-hidden flex flex-col h-full group">
                <Link to={`/hotels/${hotel.id}`} className="relative h-52 block overflow-hidden bg-[#101C35]">
                  <SafeImage
                    src={hotel.image}
                    alt={hotel.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 inline-flex items-center gap-0.5 px-2.5 py-1 rounded-full bg-[#101C35]/80 text-amber-300 text-[10px] font-bold">
                    {Array.from({ length: hotel.starRating }).map((_, i) => (
                      <Star key={i} className="w-3 h-3 fill-amber-300" aria-hidden="true" />
                    ))}
                  </div>
                  <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-white/95 text-[#101C35] text-[11px] font-extrabold">
                    4.8 ★ <span className="font-normal text-[#748198]">Demo</span>
                  </div>
                </Link>

                <div className="p-5 flex-1 flex flex-col justify-between gap-4">
                  <div className="space-y-2">
                    <span className="inline-flex items-center gap-1 text-xs text-[#748198]">
                      <MapPin className="w-3.5 h-3.5 text-[#1677FF]" aria-hidden="true" />
                      {hotel.location}
                    </span>
                    <Link to={`/hotels/${hotel.id}`}>
                      <h3 className="font-display font-bold text-lg text-[#101C35] group-hover:text-[#1677FF] transition-colors">
                        {hotel.name}
                      </h3>
                    </Link>
                    <p className="text-xs text-[#748198]">{hotel.highlights[0]}</p>
                  </div>

                  <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-2">
                    <div>
                      <span className="block text-[10px] uppercase tracking-wider text-[#748198] font-semibold">
                        From / Night (Demo)
                      </span>
                      <span className="font-display font-extrabold text-xl text-[#101C35]">
                        {formatInr(hotel.lowestPriceInr)}
                      </span>
                    </div>
                    <Link
                      to={`/hotels/${hotel.id}`}
                      className="px-4 py-2 rounded-xl bg-[#101C35] hover:bg-[#1677FF] text-white text-xs font-bold transition-colors"
                    >
                      View Rooms
                    </Link>
                  </div>
                </div>
              </article>
            </RevealSection>
          ))}
        </div>
      </section>

      {/* PHASE 10: PRODUCT INNOVATION SHOWCASE (THE PROBLEM / SOLUTION / INNOVATION / IMPACT) */}
      <section className="bg-[#101C35] text-white py-16">
        <div className="max-w-[1380px] mx-auto px-4 sm:px-6 space-y-10">
          <RevealSection className="flex flex-wrap items-end justify-between gap-4">
            <div className="max-w-2xl">
              <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.15em] text-[#19C5D8]">
                <Cpu className="w-4 h-4" aria-hidden="true" />
                Powered by TravelIQ AI Inventory Intelligence OS
              </span>
              <h2 className="font-display font-extrabold text-2xl sm:text-4xl mt-2 leading-tight">
                Consumer-Grade Discovery Backed by Enterprise AI Inventory Intelligence
              </h2>
            </div>
            <div className="flex flex-wrap items-center gap-2.5">
              <Link
                to="/ai-intelligence"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#1677FF] hover:bg-[#0F65E0] text-white text-xs sm:text-sm font-bold transition-colors"
              >
                Open AI Intelligence OS <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </Link>
              <Link
                to="/business-impact"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 border border-white/15 text-white text-xs sm:text-sm font-semibold transition-colors"
              >
                Business Impact & KPIs
              </Link>
            </div>
          </RevealSection>

          {/* Animated KPI Strip */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { label: 'Total Catalog Listings', value: 12480, suffix: '', note: 'Illustrative Demo Data' },
              { label: 'Duplicate Listings Flagged', value: 2140, suffix: '', note: 'Illustrative Demo Data' },
              { label: 'Matched Canonical Products', value: 8620, suffix: '', note: '96.4% Avg Demo Confidence' },
              { label: 'Connected Supplier Feeds', value: 24, suffix: '', note: '5 Regional Demo Hubs' },
            ].map((stat) => (
              <div
                key={stat.label}
                className="rounded-2xl bg-white/5 border border-white/10 p-5"
              >
                <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                  {stat.label}
                </p>
                <p className="font-display font-extrabold text-3xl sm:text-4xl text-[#19C5D8] mt-1.5">
                  <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                </p>
                <p className="text-[11px] text-slate-400 mt-1">{stat.note}</p>
              </div>
            ))}
          </div>

          {/* 4-Pillar Problem -> Solution -> Innovation -> Impact */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="rounded-2xl bg-white/[0.06] border border-white/10 p-5 space-y-2.5">
              <span className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-amber-300">
                <AlertTriangle className="w-4 h-4" aria-hidden="true" /> The Problem
              </span>
              <h3 className="font-display font-bold text-base text-white">
                Fragmented & Duplicate Supply
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Multi-supplier feeds flood travel search with duplicate attractions and hotels. Similar room or tour names routinely hide different inclusions, transfers, and non-refundable terms.
              </p>
            </div>

            <div className="rounded-2xl bg-white/[0.06] border border-white/10 p-5 space-y-2.5">
              <span className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-[#19C5D8]">
                <Layers className="w-4 h-4" aria-hidden="true" /> The Solution
              </span>
              <h3 className="font-display font-bold text-base text-white">
                Unify Entities, Preserve Differences
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                TravelIQ AI consolidates supplier catalogs, resolves shared landmarks and properties, preserves bookable policy differences, and ranks offers by holistic commercial value.
              </p>
            </div>

            <div className="rounded-2xl bg-white/[0.06] border border-white/10 p-5 space-y-2.5">
              <span className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-[#0D9B80]">
                <Scale className="w-4 h-4" aria-hidden="true" /> The Innovation
              </span>
              <h3 className="font-display font-bold text-base text-white">
                Semantic + Attribute Guardrails
              </h3>
              <ul className="text-xs text-slate-300 space-y-1">
                <li>• Cross-supplier entity resolution</li>
                <li>• Disentangled semantic matching</li>
                <li>• Attribute-level room equivalence</li>
                <li>• Configurable multi-factor ranking</li>
              </ul>
            </div>

            <div className="rounded-2xl bg-white/[0.06] border border-white/10 p-5 space-y-2.5">
              <span className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-[#60A5FA]">
                <TrendingUp className="w-4 h-4" aria-hidden="true" /> The Impact
              </span>
              <h3 className="font-display font-bold text-base text-white">
                Measurable Evaluation Framework
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Designed to evaluate Precision, Recall, F1, Duplicate Reduction, Room Equivalence Accuracy, NDCG@10, and Search-to-Booking lift. All prototype figures are clearly marked illustrative.
              </p>
              <div className="pt-1">
                <DemoBadge variant="dark" label="Illustrative Targets Only" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <OfferComparisonModal
        product={compareProduct}
        open={compareProduct !== null}
        onClose={() => setCompareProduct(null)}
      />
    </div>
  );
}
