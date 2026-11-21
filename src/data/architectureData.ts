import { ArchitectureLayer } from '../types/inventory';

export const ARCHITECTURE_LAYERS: ArchitectureLayer[] = [
  {
    step: 1,
    name: 'Supplier APIs & Catalogs',
    shortDesc: 'Multi-supplier hotel, sightseeing & DMC feeds',
    status: 'Proposed Production Architecture',
    technologies: ['REST / XML Connectors', 'Webhook Sync', 'Scheduled Feed Pull'],
    inputs: '24+ heterogeneous supplier catalogs (synthetic demo feeds in prototype)',
    outputs: 'Raw supplier listing payloads',
    details:
      'Connects bedbanks, direct hotel CRS feeds, local sightseeing DMCs, and ticketing aggregators via fault-tolerant ingestion adapters.',
  },
  {
    step: 2,
    name: 'Data Ingestion Layer',
    shortDesc: 'Schema validation, lineage tagging & dead-letter queues',
    status: 'Proposed Production Architecture',
    technologies: ['Python', 'FastAPI', 'PostgreSQL', 'Async Queues'],
    inputs: 'Raw JSON/XML feeds',
    outputs: 'Versioned, immutable supplier snapshots',
    details:
      'Validates mandatory booking fields, captures supplier timestamps, and isolates malformed records before downstream indexing.',
  },
  {
    step: 3,
    name: 'Data Normalization',
    shortDesc: 'Currency, unit, synonym & travel taxonomy standardization',
    status: 'Implemented in Prototype',
    technologies: ['TypeScript NLP Pipeline', 'Travel Synonym Lexicon', 'Python FastAPI (Target)'],
    inputs: 'Raw titles, descriptions, rates & room strings',
    outputs: 'Canonicalized tokens & standardized INR attributes',
    details:
      'Expands shorthand like "Dlx King BB Non-Ref" or "Taj Sunrise Tkt w/ Xfer" into clean canonical tokens and structured fields.',
  },
  {
    step: 4,
    name: 'Entity Resolution',
    shortDesc: 'Landmark geofencing & canonical hotel/attraction clustering',
    status: 'Implemented in Prototype',
    technologies: ['Geo-Boundary Matching', 'Canonical Entity IDs', 'PostgreSQL + PostGIS (Target)'],
    inputs: 'Normalized property & attraction records',
    outputs: 'Canonical parent entity groups (e.g., Taj Mahal, Grand Palace Agra)',
    details:
      'Prevents cross-city collisions and links spelling variants (e.g., Qutub / Qutb / Qutab) to one master entity.',
  },
  {
    step: 5,
    name: 'Semantic Matching',
    shortDesc: 'Vector similarity & token/bigram cosine scoring',
    status: 'Implemented in Prototype',
    technologies: ['Cosine & Jaccard Similarity (Live)', 'Sentence Transformers / Embeddings (Target)'],
    inputs: 'Normalized titles & descriptions',
    outputs: 'Pairwise semantic similarity scores (0–100%)',
    details:
      'Implemented live in-browser with unigram/bigram cosine similarity; designed to scale with Sentence Transformer embeddings and vector ANN search.',
  },
  {
    step: 6,
    name: 'Attribute & Policy Comparison',
    shortDesc: 'Preserves meal, bed, transfer, guide & refund differences',
    status: 'Implemented in Prototype',
    technologies: ['Structured Diff Engine', 'Room Equivalence Rules'],
    inputs: 'Candidate matched pairs',
    outputs: 'Attribute diff matrix & merge/preserve verdict',
    details:
      'Ensures TripMatch AI never falsely merges non-refundable Room Only listings with Breakfast-Included King rooms or ticket-only vs guided tours.',
  },
  {
    step: 7,
    name: 'Supplier Selection',
    shortDesc: 'Value-aware comparison across price, inclusions & flexibility',
    status: 'Implemented in Prototype',
    technologies: ['Multi-Criteria Evaluator', 'React Comparison Matrix'],
    inputs: 'Reconciled supplier offers',
    outputs: 'Best Price, Best Inclusions & Most Flexible badges',
    details:
      'Separates lowest headline rate from overall commercial value so travel agents make transparent booking decisions.',
  },
  {
    step: 8,
    name: 'Ranking Engine',
    shortDesc: 'Configurable multi-factor scoring model',
    status: 'Implemented in Prototype',
    technologies: ['Weighted Multi-Factor Scorer (Live)', 'Elasticsearch / OpenSearch (Target)'],
    inputs: 'Relevance, confidence, price, availability & reliability signals',
    outputs: 'Intelligently ranked inventory with explainable score bars',
    details:
      'Applies proposed 30/25/20/15/10 weighting with live interactive sliders; designed for OpenSearch learning-to-rank in production.',
  },
  {
    step: 9,
    name: 'Unified Inventory Output',
    shortDesc: 'Enterprise OS dashboard, booking APIs & analytics',
    status: 'Implemented in Prototype',
    technologies: ['React', 'TypeScript', 'Tailwind CSS', 'Recharts'],
    inputs: 'Canonical products, reconciled offers & rankings',
    outputs: 'Interactive TripMatch AI OS & Presentation Mode',
    details:
      'Delivers clean, deduplicated, comparable, and intelligently ranked travel inventory to B2B travel agents and partner channels.',
  },
];

export const TECH_STACK_GROUPS = [
  {
    category: 'Frontend (Implemented)',
    status: 'Implemented',
    items: ['React 18', 'TypeScript', 'Tailwind CSS v4', 'React Router', 'Lucide Icons', 'Recharts'],
  },
  {
    category: 'AI & Matching Logic',
    status: 'Hybrid (Client Live / ML Proposed)',
    items: ['Token & Bigram Cosine Similarity (Live)', 'Structured Attribute Comparator (Live)', 'Sentence Transformers & Dense Embeddings (Proposed)'],
  },
  {
    category: 'Backend & Data (Proposed Scale)',
    status: 'Proposed Production',
    items: ['Python 3.12', 'FastAPI', 'PostgreSQL + pgvector', 'Elasticsearch / OpenSearch'],
  },
];

