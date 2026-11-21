export type ModuleRouteId =
  | 'overview'
  | 'sightseeing'
  | 'hotels'
  | 'matching'
  | 'ranking'
  | 'suppliers'
  | 'quality'
  | 'architecture'
  | 'impact'
  | 'roadmap';

export interface NavItemConfig {
  id: ModuleRouteId;
  path: string;
  label: string;
  shortLabel: string;
  title: string;
  subtitle: string;
  badge?: string;
}

export interface KpiMetric {
  id: string;
  label: string;
  value: string;
  delta: string;
  tone: 'navy' | 'red' | 'teal' | 'blue';
  icon: 'inventory' | 'duplicates' | 'matched' | 'suppliers';
  demoNote: string;
}

export interface RegionalFeedStat {
  region: string;
  feeds: number;
  listings: number;
}

export interface SightseeingSupplierOffer {
  id: string;
  supplierName: string;
  supplierTier: string;
  badge: string;
  priceInr: number;
  duration: string;
  inclusions: string[];
  exclusions: string[];
  transferAvailable: boolean;
  transferDetails: string;
  mealAvailable: boolean;
  mealDetails: string;
  activityOptions: string[];
  accessType: string;
  cancellationPolicy: string;
  instantConfirm: boolean;
  reliabilityScore: number;
}

export interface SightseeingProduct {
  id: string;
  canonicalName: string;
  destination: string;
  state: string;
  category: string;
  image: string;
  supplierCount: number;
  matchConfidence: number;
  priceRangeInr: [number, number];
  inclusionSummary: string;
  sharedAttractionNote: string;
  keyInsights: {
    label: string;
    value: string;
    highlight?: 'teal' | 'amber' | 'navy';
  }[];
  resolutionChecks: string[];
  offers: SightseeingSupplierOffer[];
}

export interface HotelRoomOffer {
  id: string;
  supplierName: string;
  rawRoomName: string;
  canonicalCategory: string;
  bedType: string;
  occupancy: string;
  roomSizeSqm: number;
  amenities: string[];
  mealPlan: string;
  priceInr: number;
  availability: 'Available (6 rooms)' | 'Available (2 rooms)' | 'Limited (1 room)' | 'On Request';
  cancellationTerms: string;
  refundable: boolean;
  paymentTerms: string;
  matchConfidence: number;
  equivalenceGroup: string;
  equivalenceWarning?: string;
}

export interface HotelProperty {
  id: string;
  name: string;
  location: string;
  starRating: number;
  image: string;
  galleryImages: { label: string; src: string }[];
  supplierCount: number;
  propertyMatchConfidence: number;
  roomCount: number;
  lowestPriceInr: number;
  highlights: string[];
  roomOffers: HotelRoomOffer[];
}

export interface SupplierRecordInput {
  id: string;
  supplier: string;
  category: 'Sightseeing' | 'Hotel Room';
  rawTitle: string;
  rawDescription: string;
  location: string;
  priceInr: number;
  attributes: {
    durationOrBed: string;
    mealPlan: string;
    transfer: string;
    cancellation: string;
    accessOrOccupancy: string;
  };
}

export interface MatchingSamplePair {
  id: string;
  label: string;
  scenario: string;
  recordA: SupplierRecordInput;
  recordB: SupplierRecordInput;
}

export interface AttributeComparisonRow {
  attribute: string;
  valueA: string;
  valueB: string;
  status: 'match' | 'partial' | 'diff';
  impact: string;
}

export interface MatchResult {
  normalizedTitleA: string;
  normalizedTitleB: string;
  normalizedDescA: string;
  normalizedDescB: string;
  sharedTokens: string[];
  distinctTokensA: string[];
  distinctTokensB: string[];
  cosineSimilarity: number;
  jaccardSimilarity: number;
  attributeScore: number;
  confidenceScore: number;
  confidenceTier: 'High' | 'Medium' | 'Low';
  decision:
    | 'Equivalent Bookable Product'
    | 'Same Entity — Distinct Experience (Preserve Both)'
    | 'Manual Review Recommended'
    | 'Distinct Products (Do Not Merge)';
  explanation: string[];
  attributeDiffs: AttributeComparisonRow[];
}

export interface SupplierComparisonRow {
  id: string;
  supplier: string;
  product: string;
  productType: 'Sightseeing' | 'Hotel';
  destination: string;
  priceInr: number;
  availability: 'Instant' | 'Limited' | 'On Request';
  inclusions: string;
  inclusionScore: number;
  cancellation: 'Free (48h)' | 'Free (24h)' | 'Partial Refund' | 'Non-Refundable';
  cancellationScore: number;
  paymentTerms: string;
  reliability: number;
  matchConfidence: number;
}

export interface RankingWeights {
  searchRelevance: number;
  matchConfidence: number;
  priceCompetitiveness: number;
  availability: number;
  supplierReliability: number;
  cancellationFlexibility: number;
}

export interface RankingProductItem {
  id: string;
  name: string;
  supplier: string;
  category: 'Sightseeing' | 'Hotel';
  destination: string;
  image: string;
  priceInr: number;
  baselineRank: number;
  cancellationSummary: string;
  availabilityLabel: string;
  metrics: {
    searchRelevance: number;
    matchConfidence: number;
    priceCompetitiveness: number;
    availability: number;
    supplierReliability: number;
    cancellationFlexibility: number;
  };
}

export interface RankedProductResult extends RankingProductItem {
  smartScore: number;
  smartRank: number;
  rankDelta: number;
  factorContributions: {
    key: keyof RankingWeights;
    label: string;
    points: number;
  }[];
}

export interface QualityIssue {
  id: string;
  sku: string;
  productName: string;
  supplier: string;
  destination: string;
  issueType:
    | 'Missing Description'
    | 'Duplicate Photograph'
    | 'Missing Hotel Amenities'
    | 'Inconsistent Attraction Name'
    | 'Invalid Room Mapping'
    | 'Missing Cancellation Policy'
    | 'Incomplete Supplier Info';
  severity: 'Critical' | 'High' | 'Medium' | 'Low';
  affectedListings: number;
  suggestedAction: string;
  status: 'Open' | 'Auto-Fix Ready' | 'In Review';
}

export interface ArchitectureLayer {
  step: number;
  name: string;
  shortDesc: string;
  status: 'Implemented in Prototype' | 'Proposed Production Architecture';
  technologies: string[];
  inputs: string;
  outputs: string;
  details: string;
}

export interface RoadmapMilestone {
  id: string;
  window: string;
  title: string;
  phase: '48-Hour Hackathon' | 'Post-Hackathon Production';
  status: 'Completed' | 'Active' | 'Planned';
  deliverables: string[];
  owner: string;
}

