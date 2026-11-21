export interface DestinationInfo {
  slug: string;
  name: string;
  state: string;
  tagline: string;
  description: string;
  image: string;
  experiencesCount: number;
  hotelsCount: number;
  bestSeason: string;
  startingPriceInr: number;
  highlights: string[];
  featuredExperienceId: string;
  featuredHotelId: string;
}

export const DESTINATIONS: DestinationInfo[] = [
  {
    slug: 'agra',
    name: 'Agra',
    state: 'Uttar Pradesh',
    tagline: 'Timeless Mughal Marble & Golden Sunrises',
    description:
      'Home to the Taj Mahal and imperial heritage stays overlooking manicured Mughal gardens.',
    image: '/images/taj-mahal.png',
    experiencesCount: 18,
    hotelsCount: 42,
    bestSeason: 'Oct – Mar',
    startingPriceInr: 1000,
    highlights: ['Taj Mahal East Gate Sunrise', 'Mehtab Bagh Riverfront', 'Agra Fort Heritage Circuit'],
    featuredExperienceId: 'taj-mahal-sunrise',
    featuredHotelId: 'grand-palace-agra',
  },
  {
    slug: 'jaipur',
    name: 'Jaipur',
    state: 'Rajasthan',
    tagline: 'Hilltop Forts, Pink Palaces & Royal Hospitality',
    description:
      'Explore sandstone ramparts at Amber Fort, City Palace courtyards, and grand heritage suites.',
    image: '/images/jaipur-city-palace.png',
    experiencesCount: 24,
    hotelsCount: 56,
    bestSeason: 'Oct – Feb',
    startingPriceInr: 1450,
    highlights: ['Amber Fort 4x4 Jeep Ascent', 'City Palace Royal Courtyard', 'Rajasthani Heritage Dining'],
    featuredExperienceId: 'jaipur-city-palace',
    featuredHotelId: 'rajvilas-heritage-jaipur',
  },
  {
    slug: 'goa',
    name: 'Goa',
    state: 'Goa',
    tagline: 'Tropical Sunsets, River Cruises & Beachfront Escapes',
    description:
      'Sail the Mandovi River at golden hour and unwind at palm-framed infinity pool resorts.',
    image: '/images/goa-cruise.png',
    experiencesCount: 31,
    hotelsCount: 74,
    bestSeason: 'Nov – Mar',
    startingPriceInr: 1100,
    highlights: ['Mandovi River Sunset Cruise', 'Candolim Beachfront Resorts', 'Coastal Konkan Cuisine'],
    featuredExperienceId: 'goa-sunset-cruise',
    featuredHotelId: 'azure-bay-goa',
  },
  {
    slug: 'delhi',
    name: 'Delhi',
    state: 'Delhi NCR',
    tagline: 'Centuries of Monuments & Metropolitan Grandeur',
    description:
      'Walk beneath Qutub Minar sandstone arches and stay minutes from Connaught Place.',
    image: '/images/qutub-minar.png',
    experiencesCount: 22,
    hotelsCount: 68,
    bestSeason: 'Oct – Mar',
    startingPriceInr: 850,
    highlights: ['Qutub Minar UNESCO Walk', 'Mehrauli Stepwells', 'Connaught Place Luxury Stays'],
    featuredExperienceId: 'qutub-minar-walk',
    featuredHotelId: 'connaught-grand-delhi',
  },
  {
    slug: 'mumbai',
    name: 'Mumbai',
    state: 'Maharashtra',
    tagline: 'Arabian Sea Promenades & Iconic Island Heritage',
    description:
      'Cross Apollo Bunder ferries to Elephanta Caves and experience South Mumbai business luxury.',
    image: '/images/gateway-of-india.png',
    experiencesCount: 19,
    hotelsCount: 61,
    bestSeason: 'Nov – Feb',
    startingPriceInr: 1200,
    highlights: ['Gateway of India Waterfront', 'Elephanta Caves UNESCO Ferry', 'Nariman Point Club Stays'],
    featuredExperienceId: 'gateway-of-india',
    featuredHotelId: 'marine-crest-mumbai',
  },
  {
    slug: 'kerala',
    name: 'Kerala',
    state: 'Kerala',
    tagline: 'Emerald Lagoons, Kettuvallam Boats & Lake Retreats',
    description:
      'Drift past coconut groves on private houseboats and dine beside Kumarakom lagoons.',
    image: '/images/kerala-backwaters.png',
    experiencesCount: 16,
    hotelsCount: 38,
    bestSeason: 'Sep – Mar',
    startingPriceInr: 2400,
    highlights: ['Alleppey Private Houseboat', 'Traditional Kerala Sadya', 'Kumarakom Plunge-Pool Villas'],
    featuredExperienceId: 'kerala-backwaters',
    featuredHotelId: 'malabar-lagoon-kerala',
  },
];

