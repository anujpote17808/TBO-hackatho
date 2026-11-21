import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import {
  Compass,
  Building2,
  MapPin,
  Search,
  Calendar,
  Users,
  BedDouble,
} from 'lucide-react';
import { DESTINATIONS } from '../../data/destinationsData';

export function FloatingSearchPanel() {
  const navigate = useNavigate();
  const prefersReduced = useReducedMotion();
  const [activeTab, setActiveTab] = useState<'experiences' | 'hotels'>('experiences');

  // Experiences form state
  const [expDest, setExpDest] = useState('Agra');
  const [expQuery, setExpQuery] = useState('');
  const [expDate, setExpDate] = useState('2026-12-12');
  const [expTravellers, setExpTravellers] = useState('2 Travellers');

  // Hotels form state
  const [hotelDest, setHotelDest] = useState('Agra');
  const [checkIn, setCheckIn] = useState('2026-12-12');
  const [checkOut, setCheckOut] = useState('2026-12-14');
  const [guests, setGuests] = useState('2 Adults');
  const [rooms, setRooms] = useState('1 Room');

  const handleExperienceSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (expDest && expDest !== 'All') params.set('destination', expDest);
    if (expQuery.trim()) params.set('q', expQuery.trim());
    params.set('date', expDate);
    params.set('travellers', expTravellers);
    navigate(`/experiences?${params.toString()}`);
  };

  const handleHotelSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (hotelDest && hotelDest !== 'All') params.set('destination', hotelDest);
    params.set('checkIn', checkIn);
    params.set('checkOut', checkOut);
    params.set('guests', guests);
    params.set('rooms', rooms);
    navigate(`/hotels?${params.toString()}`);
  };

  return (
    <motion.div
      initial={prefersReduced ? false : { opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
      className="tiq-glass rounded-2xl border border-white/70 shadow-[0_24px_60px_rgba(16,28,53,0.22)] overflow-hidden"
    >
      {/* Two-Tab Header */}
      <div className="flex items-center justify-between gap-4 px-5 pt-4 pb-3 border-b border-slate-200/80 bg-white/60">
        <div role="tablist" aria-label="Search travel inventory type" className="flex items-center gap-2">
          <button
            type="button"
            role="tab"
            aria-selected={activeTab === 'experiences'}
            onClick={() => setActiveTab('experiences')}
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
              activeTab === 'experiences'
                ? 'bg-[#101C35] text-white shadow-sm'
                : 'text-[#475569] hover:bg-slate-100'
            }`}
          >
            <Compass className="w-4 h-4 text-[#19C5D8]" aria-hidden="true" />
            Experiences
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={activeTab === 'hotels'}
            onClick={() => setActiveTab('hotels')}
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
              activeTab === 'hotels'
                ? 'bg-[#101C35] text-white shadow-sm'
                : 'text-[#475569] hover:bg-slate-100'
            }`}
          >
            <Building2 className="w-4 h-4 text-[#19C5D8]" aria-hidden="true" />
            Hotels
          </button>
        </div>

        <span className="hidden md:inline-flex items-center gap-1.5 text-[11px] font-semibold text-[#0D9B80]">
          <span className="w-2 h-2 rounded-full bg-[#0D9B80]" aria-hidden="true" />
          24 Synthetic Supplier Feeds Indexed
        </span>
      </div>

      {/* Tab Panel 1: Experiences */}
      {activeTab === 'experiences' ? (
        <form
          onSubmit={handleExperienceSubmit}
          className="p-4 sm:p-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-3 items-end"
        >
          <div className="lg:col-span-3">
            <label htmlFor="hero-exp-dest" className="block text-[11px] font-bold uppercase tracking-wider text-[#748198] mb-1">
              Destination
            </label>
            <div className="relative">
              <MapPin className="w-4 h-4 text-[#1677FF] absolute left-3 top-1/2 -translate-y-1/2" aria-hidden="true" />
              <select
                id="hero-exp-dest"
                value={expDest}
                onChange={(e) => setExpDest(e.target.value)}
                className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-white border border-slate-200 text-sm font-semibold text-[#101C35] focus:outline-none focus:border-[#1677FF]"
              >
                <option value="All">All India Destinations</option>
                {DESTINATIONS.map((d) => (
                  <option key={d.slug} value={d.name}>
                    {d.name}, {d.state}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="lg:col-span-3">
            <label htmlFor="hero-exp-query" className="block text-[11px] font-bold uppercase tracking-wider text-[#748198] mb-1">
              Experience or Attraction
            </label>
            <div className="relative">
              <Search className="w-4 h-4 text-[#748198] absolute left-3 top-1/2 -translate-y-1/2" aria-hidden="true" />
              <input
                id="hero-exp-query"
                type="text"
                value={expQuery}
                onChange={(e) => setExpQuery(e.target.value)}
                placeholder="Taj Mahal, Cruise, Fort..."
                className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-white border border-slate-200 text-sm text-[#101C35] focus:outline-none focus:border-[#1677FF]"
              />
            </div>
          </div>

          <div className="lg:col-span-2">
            <label htmlFor="hero-exp-date" className="block text-[11px] font-bold uppercase tracking-wider text-[#748198] mb-1">
              Travel Date
            </label>
            <div className="relative">
              <Calendar className="w-4 h-4 text-[#748198] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" aria-hidden="true" />
              <input
                id="hero-exp-date"
                type="date"
                value={expDate}
                onChange={(e) => setExpDate(e.target.value)}
                className="w-full pl-9 pr-2.5 py-2.5 rounded-xl bg-white border border-slate-200 text-sm font-medium text-[#101C35] focus:outline-none focus:border-[#1677FF]"
              />
            </div>
          </div>

          <div className="lg:col-span-2">
            <label htmlFor="hero-exp-travellers" className="block text-[11px] font-bold uppercase tracking-wider text-[#748198] mb-1">
              Travellers
            </label>
            <div className="relative">
              <Users className="w-4 h-4 text-[#748198] absolute left-3 top-1/2 -translate-y-1/2" aria-hidden="true" />
              <select
                id="hero-exp-travellers"
                value={expTravellers}
                onChange={(e) => setExpTravellers(e.target.value)}
                className="w-full pl-9 pr-2.5 py-2.5 rounded-xl bg-white border border-slate-200 text-sm font-semibold text-[#101C35] focus:outline-none focus:border-[#1677FF]"
              >
                <option>1 Traveller</option>
                <option>2 Travellers</option>
                <option>4 Travellers</option>
                <option>6+ Group</option>
              </select>
            </div>
          </div>

          <div className="lg:col-span-2">
            <button
              type="submit"
              className="w-full py-2.5 px-4 rounded-xl bg-[#1677FF] hover:bg-[#0F65E0] text-white text-sm font-bold shadow-md shadow-[#1677FF]/30 transition-all cursor-pointer"
            >
              Explore Experiences
            </button>
          </div>
        </form>
      ) : (
        /* Tab Panel 2: Hotels */
        <form
          onSubmit={handleHotelSubmit}
          className="p-4 sm:p-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-3 items-end"
        >
          <div className="lg:col-span-3">
            <label htmlFor="hero-htl-dest" className="block text-[11px] font-bold uppercase tracking-wider text-[#748198] mb-1">
              Destination
            </label>
            <div className="relative">
              <MapPin className="w-4 h-4 text-[#1677FF] absolute left-3 top-1/2 -translate-y-1/2" aria-hidden="true" />
              <select
                id="hero-htl-dest"
                value={hotelDest}
                onChange={(e) => setHotelDest(e.target.value)}
                className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-white border border-slate-200 text-sm font-semibold text-[#101C35] focus:outline-none focus:border-[#1677FF]"
              >
                <option value="All">All India Cities</option>
                {DESTINATIONS.map((d) => (
                  <option key={d.slug} value={d.name}>
                    {d.name}, {d.state}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="lg:col-span-2">
            <label htmlFor="hero-htl-in" className="block text-[11px] font-bold uppercase tracking-wider text-[#748198] mb-1">
              Check-In
            </label>
            <input
              id="hero-htl-in"
              type="date"
              value={checkIn}
              onChange={(e) => setCheckIn(e.target.value)}
              className="w-full px-3 py-2.5 rounded-xl bg-white border border-slate-200 text-sm font-medium text-[#101C35] focus:outline-none focus:border-[#1677FF]"
            />
          </div>

          <div className="lg:col-span-2">
            <label htmlFor="hero-htl-out" className="block text-[11px] font-bold uppercase tracking-wider text-[#748198] mb-1">
              Check-Out
            </label>
            <input
              id="hero-htl-out"
              type="date"
              value={checkOut}
              onChange={(e) => setCheckOut(e.target.value)}
              className="w-full px-3 py-2.5 rounded-xl bg-white border border-slate-200 text-sm font-medium text-[#101C35] focus:outline-none focus:border-[#1677FF]"
            />
          </div>

          <div className="lg:col-span-2">
            <label htmlFor="hero-htl-guests" className="block text-[11px] font-bold uppercase tracking-wider text-[#748198] mb-1">
              Guests
            </label>
            <div className="relative">
              <Users className="w-4 h-4 text-[#748198] absolute left-3 top-1/2 -translate-y-1/2" aria-hidden="true" />
              <select
                id="hero-htl-guests"
                value={guests}
                onChange={(e) => setGuests(e.target.value)}
                className="w-full pl-9 pr-2 py-2.5 rounded-xl bg-white border border-slate-200 text-sm font-semibold text-[#101C35]"
              >
                <option>1 Adult</option>
                <option>2 Adults</option>
                <option>2 Adults, 1 Child</option>
                <option>4 Adults</option>
              </select>
            </div>
          </div>

          <div className="lg:col-span-1">
            <label htmlFor="hero-htl-rooms" className="block text-[11px] font-bold uppercase tracking-wider text-[#748198] mb-1">
              Rooms
            </label>
            <div className="relative">
              <BedDouble className="w-3.5 h-3.5 text-[#748198] absolute left-2.5 top-1/2 -translate-y-1/2 hidden xl:block" aria-hidden="true" />
              <select
                id="hero-htl-rooms"
                value={rooms}
                onChange={(e) => setRooms(e.target.value)}
                className="w-full px-2.5 xl:pl-7 py-2.5 rounded-xl bg-white border border-slate-200 text-sm font-semibold text-[#101C35]"
              >
                <option>1 Room</option>
                <option>2 Rooms</option>
                <option>3 Rooms</option>
              </select>
            </div>
          </div>

          <div className="lg:col-span-2">
            <button
              type="submit"
              className="w-full py-2.5 px-4 rounded-xl bg-[#1677FF] hover:bg-[#0F65E0] text-white text-sm font-bold shadow-md shadow-[#1677FF]/30 transition-all cursor-pointer"
            >
              Find Hotels
            </button>
          </div>
        </form>
      )}
    </motion.div>
  );
}

