import { KpiMetric, NavItemConfig, RegionalFeedStat } from '../types/inventory';

export const NAV_ITEMS: NavItemConfig[] = [
  {
    id: 'overview',
    path: '/',
    label: 'Overview',
    shortLabel: 'Overview',
    title: 'Inventory Intelligence Overview',
    subtitle: 'Unified multi-supplier catalog consolidation, deduplication & match confidence telemetry.',
  },
  {
    id: 'sightseeing',
    path: '/sightseeing',
    label: 'Sightseeing Inventory',
    shortLabel: 'Sightseeing',
    title: 'Sightseeing Inventory Intelligence',
    subtitle: 'Group shared attractions across suppliers while preserving distinct bookable experiences & inclusions.',
  },
  {
    id: 'hotels',
    path: '/hotels',
    label: 'Hotel Inventory',
    shortLabel: 'Hotels',
    title: 'Hotel & Room Equivalence Intelligence',
    subtitle: 'Attribute-level room normalization comparing bed type, occupancy, meal plans & cancellation terms.',
  },
  {
    id: 'matching',
    path: '/matching',
    label: 'Product Matching',
    shortLabel: 'Matching',
    title: 'AI Product Matching Engine',
    subtitle: 'Live lexical normalization, semantic cosine similarity & structured attribute diff workbench.',
    badge: 'AI',
  },
  {
    id: 'ranking',
    path: '/ranking',
    label: 'Smart Ranking',
    shortLabel: 'Ranking',
    title: 'Smart Ranking Intelligence',
    subtitle: 'Interactive multi-factor ranking model with real-time weight tuning & before-vs-after impact.',
    badge: 'LIVE',
  },
  {
    id: 'suppliers',
    path: '/suppliers',
    label: 'Supplier Comparison',
    shortLabel: 'Suppliers',
    title: 'Multi-Supplier Comparison Matrix',
    subtitle: 'Compare lowest price, richest inclusions, and cancellation flexibility side by side without conflating value.',
  },
  {
    id: 'quality',
    path: '/quality',
    label: 'Content Quality',
    shortLabel: 'Quality',
    title: 'Inventory Content Quality Monitor',
    subtitle: 'Detect missing descriptions, duplicate images, invalid room mappings & policy gaps across feeds.',
  },
  {
    id: 'architecture',
    path: '/architecture',
    label: 'System Architecture',
    shortLabel: 'Architecture',
    title: '9-Layer Technical Architecture',
    subtitle: 'End-to-end TravelIQ AI pipeline distinguishing implemented prototype modules from proposed production scale.',
  },
  {
    id: 'impact',
    path: '/impact',
    label: 'Business Impact',
    shortLabel: 'Impact',
    title: 'Executive Business Impact & Evaluation KPIs',
    subtitle: 'Illustrative evaluation framework covering Precision, Recall, F1, Room Equivalence Accuracy & NDCG@K.',
  },
  {
    id: 'roadmap',
    path: '/roadmap',
    label: 'Implementation Roadmap',
    shortLabel: 'Roadmap',
    title: '48-Hour Hackathon & Production Roadmap',
    subtitle: 'Execution milestones from initial catalog ingestion to live enterprise supplier deployment.',
  },
];

export const OVERVIEW_KPIS: KpiMetric[] = [
  {
    id: 'total-inventory',
    label: 'TOTAL INVENTORY',
    value: '12,480',
    delta: '+14.2% MoM',
    tone: 'navy',
    icon: 'inventory',
    demoNote: 'Illustrative Demo Data',
  },
  {
    id: 'duplicate-listings',
    label: 'DUPLICATE LISTINGS',
    value: '2,140',
    delta: '17.1% Flagged',
    tone: 'red',
    icon: 'duplicates',
    demoNote: 'Illustrative Demo Data',
  },
  {
    id: 'matched-products',
    label: 'MATCHED PRODUCTS',
    value: '8,620',
    delta: '96.4% Avg Confidence',
    tone: 'teal',
    icon: 'matched',
    demoNote: 'Illustrative Demo Data',
  },
  {
    id: 'connected-suppliers',
    label: 'CONNECTED SUPPLIERS',
    value: '24',
    delta: '5 Regional Hubs',
    tone: 'blue',
    icon: 'suppliers',
    demoNote: 'Illustrative Demo Data',
  },
];

export const REGIONAL_FEEDS: RegionalFeedStat[] = [
  { region: 'Agra', feeds: 5, listings: 2340 },
  { region: 'Goa', feeds: 8, listings: 4120 },
  { region: 'Jaipur', feeds: 4, listings: 2190 },
  { region: 'Mumbai', feeds: 4, listings: 2210 },
  { region: 'Kerala', feeds: 3, listings: 1620 },
];

export const WORKFLOW_STEPS = [
  {
    step: 1,
    code: 'CONSOLIDATE',
    detail: 'Ingest & normalize fragmented supplier feeds',
  },
  {
    step: 2,
    code: 'MATCH',
    detail: 'Resolve entities via embeddings + attribute rules',
  },
  {
    step: 3,
    code: 'COMPARE',
    detail: 'Preserve price, inclusion & policy differences',
  },
  {
    step: 4,
    code: 'RANK',
    detail: 'Score offers by relevance, trust & value',
  },
];

