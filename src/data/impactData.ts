export const EVALUATION_KPIS = [
  {
    metric: 'Match Precision',
    illustrativeValue: '96.4%',
    targetBenchmark: '≥ 95.0%',
    definition: 'Share of system-grouped product matches confirmed as accurate by human review.',
  },
  {
    metric: 'Match Recall',
    illustrativeValue: '92.8%',
    targetBenchmark: '≥ 90.0%',
    definition: 'Share of true cross-supplier duplicates successfully identified by the engine.',
  },
  {
    metric: 'F1 Score',
    illustrativeValue: '94.6%',
    targetBenchmark: '≥ 92.5%',
    definition: 'Harmonic mean balancing high precision against broad duplicate coverage.',
  },
  {
    metric: 'Room Equivalence Accuracy',
    illustrativeValue: '94.1%',
    targetBenchmark: '≥ 93.0%',
    definition: 'Accuracy in distinguishing truly equivalent rooms vs name-similar commercial variants.',
  },
  {
    metric: 'NDCG@10 (Ranking)',
    illustrativeValue: '0.89',
    targetBenchmark: '≥ 0.85',
    definition: 'Normalized Discounted Cumulative Gain measuring top-10 ranking usefulness.',
  },
  {
    metric: 'Search-to-Booking Lift',
    illustrativeValue: '+6.5% – +11.0%',
    targetBenchmark: 'Illustrative Potential',
    definition: 'Projected conversion upside from cleaner results and transparent offer comparisons (not measured in production).',
  },
];

export const BEFORE_AFTER_QUALITY_DATA = [
  { metric: 'Duplicate Clutter', baseline: 17.1, travelIq: 1.8 },
  { metric: 'Policy Transparency', baseline: 58.0, travelIq: 94.5 },
  { metric: 'Room Match Accuracy', baseline: 69.0, travelIq: 94.1 },
  { metric: 'Top-5 Relevance', baseline: 64.0, travelIq: 91.2 },
];

export const MODEL_PRECISION_TREND = [
  { stage: 'Exact String', precision: 98, recall: 42, f1: 59 },
  { stage: '+ Normalization', precision: 95, recall: 68, f1: 79 },
  { stage: '+ Semantic Cosine', precision: 91, recall: 88, f1: 89 },
  { stage: '+ Attribute Rules', precision: 96.4, recall: 92.8, f1: 94.6 },
];

export const BUSINESS_VALUE_PILLARS = [
  {
    title: 'Cleaner Inventory Quality',
    description: 'Eliminates fragmented supplier clutter while flagging missing descriptions, duplicate images, and policy gaps before agents see them.',
    illustrativeGain: 'Up to 85% reduction in visible duplicate rows (illustrative)',
  },
  {
    title: 'Accurate Entity & Room Matching',
    description: 'Links identical monuments and properties across 24+ demo feeds without falsely collapsing distinct ticket, transfer, or meal-plan tiers.',
    illustrativeGain: 'Zero false merges on non-refundable vs breakfast-included rooms',
  },
  {
    title: 'Transparent Price Competitiveness',
    description: 'Highlights lowest headline rate, best inclusion package, and most flexible cancellation separately so agents avoid costly booking surprises.',
    illustrativeGain: 'Faster supplier comparison across multi-feed search results',
  },
  {
    title: 'Higher Search Relevance & Discoverability',
    description: 'Configurable multi-factor ranking elevates high-confidence, instant-confirm, reliable offers over cheap-but-unreliable non-refundable listings.',
    illustrativeGain: 'Potential search-to-booking conversion uplift (requires A/B test)',
  },
];

