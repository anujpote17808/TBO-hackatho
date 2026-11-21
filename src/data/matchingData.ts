import { MatchingSamplePair } from '../types/inventory';

export const MATCHING_SAMPLE_PAIRS: MatchingSamplePair[] = [
  {
    id: 'pair-taj-sunrise',
    label: 'Taj Mahal Sunrise: Ticket vs Guided Pickup',
    scenario: 'Same Attraction · Distinct Bookable Inclusions (Preserve Differences)',
    recordA: {
      id: 'SUP-A-901',
      supplier: 'Supplier A — HeritagePass Direct',
      category: 'Sightseeing',
      rawTitle: 'Taj Sunrise Entry Tkt - Agra Early Morning',
      rawDescription:
        'Timed early morning entry ticket for Taj Mahal Agra monument. 2 hr self guided access via East Gate.',
      location: 'Agra, India',
      priceInr: 1000,
      attributes: {
        durationOrBed: '2 hours (Self-guided)',
        mealPlan: 'No meal included',
        transfer: 'No hotel transfer',
        cancellation: 'Non-refundable within 24h',
        accessOrOccupancy: 'Standard Timed Entry',
      },
    },
    recordB: {
      id: 'SUP-C-442',
      supplier: 'Supplier C — CrownLine Experiences',
      category: 'Sightseeing',
      rawTitle: 'Taj Mahal Sunrise Tour w/ Licensed Guide & Hotel Pickup',
      rawDescription:
        'Private sunrise tour of Taj Mahal in Agra with ASI guide, AC hotel pickup, breakfast and 4 hrs itinerary.',
      location: 'Agra, India',
      priceInr: 2200,
      attributes: {
        durationOrBed: '4 hours (Private guide)',
        mealPlan: 'Breakfast included',
        transfer: 'Private AC hotel pickup & drop',
        cancellation: 'Free cancellation up to 48h',
        accessOrOccupancy: 'VIP Priority Entry + Shuttle',
      },
    },
  },
  {
    id: 'pair-grand-palace-rooms',
    label: 'Grand Palace Agra: Deluxe King BB vs Deluxe Room RO',
    scenario: 'Similar Room Name · Commercial Attribute Mismatch (Do Not Blindly Merge)',
    recordA: {
      id: 'HTL-A-204',
      supplier: 'Supplier A — GlobalBedBank Direct',
      category: 'Hotel Room',
      rawTitle: 'Grand Palace Agra - Dlx King Rm (Bfast Incl, Free Cxl)',
      rawDescription:
        'Deluxe King Room at Grand Palace Agra with guaranteed King bed, buffet breakfast included and free cancellation 24h.',
      location: 'Agra, India',
      priceInr: 5000,
      attributes: {
        durationOrBed: '1 King Bed (38 sqm)',
        mealPlan: 'Breakfast Included (BB)',
        transfer: 'Wi-Fi, Pool, Minibar included',
        cancellation: 'Free cancellation up to 24h',
        accessOrOccupancy: '2 Adults, 1 Child',
      },
    },
    recordB: {
      id: 'HTL-B-817',
      supplier: 'Supplier B — RatePulse Wholesale',
      category: 'Hotel Room',
      rawTitle: 'Grand Palace Agra - Deluxe Room RO Non-Ref',
      rawDescription:
        'Deluxe Room at Grand Palace Agra room only rate, run-of-house queen or twin bed, non-refundable prepay.',
      location: 'Agra, India',
      priceInr: 4800,
      attributes: {
        durationOrBed: 'Queen or Twin (Unassigned)',
        mealPlan: 'Room Only (RO)',
        transfer: 'Wi-Fi, Pool included',
        cancellation: 'Non-refundable',
        accessOrOccupancy: '2 Adults',
      },
    },
  },
  {
    id: 'pair-exact-match',
    label: 'Grand Palace Agra: Premium King BB (True Equivalent)',
    scenario: 'High Confidence Canonical Equivalent Across Feeds',
    recordA: {
      id: 'HTL-C-511',
      supplier: 'Supplier C — ApexStay Distribution',
      category: 'Hotel Room',
      rawTitle: 'Grand Palace Agra - Prem King Rm w/ Bfast & Free Cxl 48h',
      rawDescription:
        'Premium King Room with balcony, buffet breakfast included, free cancellation up to 48 hours, 2 adults.',
      location: 'Agra, India',
      priceInr: 5400,
      attributes: {
        durationOrBed: '1 King Bed + Balcony (46 sqm)',
        mealPlan: 'Breakfast Included (BB)',
        transfer: 'Wi-Fi, Pool, Spa Access',
        cancellation: 'Free cancellation up to 48h',
        accessOrOccupancy: '2 Adults, 2 Children',
      },
    },
    recordB: {
      id: 'HTL-D-119',
      supplier: 'Supplier D — DirectHotel Connect',
      category: 'Hotel Room',
      rawTitle: 'Grand Palace Agra Premium King Room Breakfast Included',
      rawDescription:
        'Premium King Room at Grand Palace Agra featuring private balcony, daily breakfast included and 48h free cancellation.',
      location: 'Agra, India',
      priceInr: 5450,
      attributes: {
        durationOrBed: '1 King Bed + Balcony (46 sqm)',
        mealPlan: 'Breakfast Included (BB)',
        transfer: 'Wi-Fi, Pool, Spa Access',
        cancellation: 'Free cancellation up to 48h',
        accessOrOccupancy: '2 Adults, 2 Children',
      },
    },
  },
  {
    id: 'pair-qutub-review',
    label: 'Qutub Minar Walk vs Old Delhi Full-Day Tour',
    scenario: 'Medium/Low Confidence · Flagged for Human Review',
    recordA: {
      id: 'DEL-A-108',
      supplier: 'Supplier A — DelhiPass Hub',
      category: 'Sightseeing',
      rawTitle: 'Qutub Minar Guided Heritage Walk Delhi',
      rawDescription:
        '2.5 hr guided heritage walk inside Qutub Minar Mehrauli archaeological complex in South Delhi.',
      location: 'Delhi, India',
      priceInr: 1350,
      attributes: {
        durationOrBed: '2.5 hours (Walking tour)',
        mealPlan: 'No meal included',
        transfer: 'No hotel transfer',
        cancellation: 'Free cancellation up to 24h',
        accessOrOccupancy: 'Small-Group Guided Entry',
      },
    },
    recordB: {
      id: 'DEL-E-602',
      supplier: 'Supplier E — MetroSightseeing',
      category: 'Sightseeing',
      rawTitle: 'Old & New Delhi Full Day Combo incl Red Fort & Qutub',
      rawDescription:
        '8 hour city bus combo covering Red Fort, Jama Masjid, India Gate and brief Qutub Minar stop in Delhi.',
      location: 'Delhi, India',
      priceInr: 2800,
      attributes: {
        durationOrBed: '8 hours (Multi-stop coach)',
        mealPlan: 'Buffet lunch included',
        transfer: 'Central hotel coach pickup',
        cancellation: 'Non-refundable',
        accessOrOccupancy: 'Coach Group Entry',
      },
    },
  },
  {
    id: 'pair-distinct-nonmatch',
    label: 'Goa Mandovi Cruise vs Kerala Backwaters Houseboat',
    scenario: 'Low Confidence · Distinct Destinations (Hard Reject Merge)',
    recordA: {
      id: 'GOA-B-310',
      supplier: 'Supplier B — CoastalVibe Tours',
      category: 'Sightseeing',
      rawTitle: 'Goa Mandovi River Sunset Dinner Cruise',
      rawDescription:
        '2.5 hr upper deck sunset river cruise on Mandovi River in Panjim Goa with buffet dinner and folk dance.',
      location: 'Goa, India',
      priceInr: 1850,
      attributes: {
        durationOrBed: '2.5 hours (Upper deck)',
        mealPlan: 'Goan Dinner Buffet',
        transfer: 'Self check-in at Panjim Jetty',
        cancellation: 'Free cancellation up to 24h',
        accessOrOccupancy: 'Shared Upper Deck',
      },
    },
    recordB: {
      id: 'KER-B-709',
      supplier: 'Supplier B — EmeraldCanals DMC',
      category: 'Sightseeing',
      rawTitle: 'Alleppey Kerala Backwaters Private Houseboat Day Cruise',
      rawDescription:
        '5.5 hr private AC wooden Kettuvallam backwater day cruise in Alleppey Kerala with traditional Sadya lunch.',
      location: 'Alleppey, Kerala',
      priceInr: 3600,
      attributes: {
        durationOrBed: '5.5 hours (Private boat)',
        mealPlan: 'Kerala Sadya Lunch',
        transfer: 'Punnamada Pier Boarding',
        cancellation: 'Free cancellation up to 48h',
        accessOrOccupancy: 'Private Charter Vessel',
      },
    },
  },
];

export const PIPELINE_STAGES = [
  { step: 1, title: 'Supplier Data', desc: 'Raw JSON/XML feeds from 24 demo catalogs' },
  { step: 2, title: 'Normalization', desc: 'Abbreviations, currencies, units & taxonomy cleanup' },
  { step: 3, title: 'Entity Resolution', desc: 'Geo-fencing, property & attraction canonical IDs' },
  { step: 4, title: 'Semantic Similarity', desc: 'Token + bigram cosine / embedding vector match' },
  { step: 5, title: 'Attribute Comparison', desc: 'Meal plans, bed types, transfers & cancellation diffs' },
  { step: 6, title: 'Confidence Scoring', desc: 'Calibrated score against configurable thresholds' },
  { step: 7, title: 'Duplicate Grouping', desc: 'Cluster shared entities while preserving distinct offers' },
  { step: 8, title: 'Human Review', desc: 'Low/ambiguous edge cases routed to curation queue' },
];

