import {
  AttributeComparisonRow,
  MatchResult,
  SupplierRecordInput,
} from '../types/inventory';

const SYNONYM_MAP: Record<string, string> = {
  dlx: 'deluxe',
  prem: 'premium',
  rm: 'room',
  bfast: 'breakfast',
  bkfst: 'breakfast',
  bb: 'breakfast included',
  ro: 'room only',
  xfer: 'transfer',
  pickup: 'transfer',
  drop: 'transfer',
  shuttle: 'transfer',
  nonref: 'non refundable',
  nr: 'non refundable',
  free: 'free',
  cxl: 'cancellation',
  cancel: 'cancellation',
  hr: 'hour',
  hrs: 'hour',
  hours: 'hour',
  tkt: 'ticket',
  entry: 'ticket',
  admission: 'ticket',
  guided: 'guide',
  tourguide: 'guide',
  early: 'sunrise',
  dawn: 'sunrise',
  morning: 'sunrise',
  taj: 'taj mahal',
  kingbed: 'king',
  queenbed: 'queen',
  dbl: 'double',
  twinbed: 'twin',
};

const STOP_WORDS = new Set([
  'the',
  'a',
  'an',
  'with',
  'and',
  'or',
  'of',
  'in',
  'at',
  'for',
  'to',
  'from',
  'by',
  'on',
  'is',
  'are',
  'per',
  'tour',
  'experience',
  'package',
]);

export function normalizeTravelText(raw: string): string {
  const cleaned = raw
    .toLowerCase()
    .replace(/[-_/+,()•|]/g, ' ')
    .replace(/[^a-z0-9\s]/g, '')
    .replace(/\s+/g, ' ')
    .trim();

  const expanded = cleaned
    .split(' ')
    .filter(Boolean)
    .map((tok) => SYNONYM_MAP[tok] ?? tok)
    .join(' ');

  return expanded.replace(/\s+/g, ' ').trim();
}

function tokenize(text: string): string[] {
  const normalized = normalizeTravelText(text);
  const words = normalized.split(' ').filter((w) => w.length > 1 && !STOP_WORDS.has(w));
  const bigrams: string[] = [];
  for (let i = 0; i < words.length - 1; i++) {
    bigrams.push(`${words[i]}_${words[i + 1]}`);
  }
  return [...words, ...bigrams];
}

function computeCosineSimilarity(tokensA: string[], tokensB: string[]): number {
  if (tokensA.length === 0 || tokensB.length === 0) return 0;
  const freqA = new Map<string, number>();
  const freqB = new Map<string, number>();

  for (const t of tokensA) freqA.set(t, (freqA.get(t) ?? 0) + 1);
  for (const t of tokensB) freqB.set(t, (freqB.get(t) ?? 0) + 1);

  const vocab = new Set([...freqA.keys(), ...freqB.keys()]);
  let dot = 0;
  let magA = 0;
  let magB = 0;

  for (const term of vocab) {
    const a = freqA.get(term) ?? 0;
    const b = freqB.get(term) ?? 0;
    // Slight boost for unigrams representing entities, balanced with bigrams
    const weight = term.includes('_') ? 1.25 : 1;
    dot += a * weight * (b * weight);
    magA += (a * weight) ** 2;
    magB += (b * weight) ** 2;
  }

  if (magA === 0 || magB === 0) return 0;
  return dot / (Math.sqrt(magA) * Math.sqrt(magB));
}

function computeWordOverlap(textA: string, textB: string) {
  const setA = new Set(
    normalizeTravelText(textA)
      .split(' ')
      .filter((w) => w.length > 1 && !STOP_WORDS.has(w))
  );
  const setB = new Set(
    normalizeTravelText(textB)
      .split(' ')
      .filter((w) => w.length > 1 && !STOP_WORDS.has(w))
  );

  const shared: string[] = [];
  const onlyA: string[] = [];
  const onlyB: string[] = [];

  for (const w of setA) {
    if (setB.has(w)) shared.push(w);
    else onlyA.push(w);
  }
  for (const w of setB) {
    if (!setA.has(w)) onlyB.push(w);
  }

  const unionSize = setA.size + setB.size - shared.length;
  const jaccard = unionSize === 0 ? 0 : shared.length / unionSize;

  return { shared, onlyA, onlyB, jaccard };
}

function compareAttributePair(
  attribute: string,
  valA: string,
  valB: string,
  impactIfDiff: string
): { row: AttributeComparisonRow; score: number } {
  const normA = normalizeTravelText(valA);
  const normB = normalizeTravelText(valB);

  if (normA === normB) {
    return {
      row: { attribute, valueA: valA, valueB: valB, status: 'match', impact: 'Aligned' },
      score: 1,
    };
  }

  const overlap = computeWordOverlap(valA, valB);
  if (overlap.jaccard >= 0.45) {
    return {
      row: {
        attribute,
        valueA: valA,
        valueB: valB,
        status: 'partial',
        impact: `Partial overlap — ${impactIfDiff}`,
      },
      score: 0.65,
    };
  }

  return {
    row: {
      attribute,
      valueA: valA,
      valueB: valB,
      status: 'diff',
      impact: impactIfDiff,
    },
    score: 0.15,
  };
}

export function runRealMatchingEngine(
  recordA: SupplierRecordInput,
  recordB: SupplierRecordInput,
  thresholds: { high: number; medium: number } = { high: 95, medium: 75 }
): MatchResult {
  const normalizedTitleA = normalizeTravelText(recordA.rawTitle);
  const normalizedTitleB = normalizeTravelText(recordB.rawTitle);
  const normalizedDescA = normalizeTravelText(recordA.rawDescription);
  const normalizedDescB = normalizeTravelText(recordB.rawDescription);

  const titleCosine = computeCosineSimilarity(
    tokenize(recordA.rawTitle),
    tokenize(recordB.rawTitle)
  );
  const descCosine = computeCosineSimilarity(
    tokenize(`${recordA.rawTitle} ${recordA.rawDescription} ${recordA.location}`),
    tokenize(`${recordB.rawTitle} ${recordB.rawDescription} ${recordB.location}`)
  );

  const semanticCosine = Math.min(1, titleCosine * 0.55 + descCosine * 0.45);
  const wordOverlap = computeWordOverlap(
    `${recordA.rawTitle} ${recordA.rawDescription}`,
    `${recordB.rawTitle} ${recordB.rawDescription}`
  );

  const locationCheck = compareAttributePair(
    'Entity & Location',
    recordA.location,
    recordB.location,
    'Different destination or landmark boundary'
  );
  const durationOrBedCheck = compareAttributePair(
    recordA.category === 'Hotel Room' ? 'Bed & Room Type' : 'Duration & Scope',
    recordA.attributes.durationOrBed,
    recordB.attributes.durationOrBed,
    'Core product specification differs'
  );
  const mealCheck = compareAttributePair(
    'Meal Plan / Inclusions',
    recordA.attributes.mealPlan,
    recordB.attributes.mealPlan,
    'Inclusions affect bookable value'
  );
  const transferCheck = compareAttributePair(
    'Transfers / Amenities',
    recordA.attributes.transfer,
    recordB.attributes.transfer,
    'Transfer or amenity coverage varies'
  );
  const cancelCheck = compareAttributePair(
    'Cancellation Policy',
    recordA.attributes.cancellation,
    recordB.attributes.cancellation,
    'Booking risk & refund terms differ'
  );
  const accessCheck = compareAttributePair(
    recordA.category === 'Hotel Room' ? 'Occupancy' : 'Access Type',
    recordA.attributes.accessOrOccupancy,
    recordB.attributes.accessOrOccupancy,
    'Access level or guest capacity differs'
  );

  const checks = [
    locationCheck,
    durationOrBedCheck,
    mealCheck,
    transferCheck,
    cancelCheck,
    accessCheck,
  ];

  const attributeDiffs = checks.map((c) => c.row);

  // Entity score weights location & title heavily; bookable equivalence weights commercial attributes
  const entityAlignment =
    locationCheck.score * 0.45 + semanticCosine * 0.4 + wordOverlap.jaccard * 0.15;

  const commercialAttrAvg =
    (durationOrBedCheck.score +
      mealCheck.score +
      transferCheck.score +
      cancelCheck.score +
      accessCheck.score) /
    5;

  const priceSpreadRatio =
    Math.abs(recordA.priceInr - recordB.priceInr) /
    Math.max(recordA.priceInr, recordB.priceInr, 1);

  const attributeScorePct = Math.round(commercialAttrAvg * 100);
  const cosinePct = Math.round(semanticCosine * 100);
  const jaccardPct = Math.round(wordOverlap.jaccard * 100);

  // Compute overall entity match confidence (0 - 99)
  const rawConfidence =
    locationCheck.score < 0.5
      ? Math.round((semanticCosine * 0.5 + commercialAttrAvg * 0.25) * 100)
      : Math.round(
          Math.min(
            99,
            entityAlignment * 62 +
              commercialAttrAvg * 28 +
              (1 - Math.min(priceSpreadRatio, 0.5)) * 10
          )
        );

  const confidenceScore = Math.max(12, Math.min(99, rawConfidence));

  let confidenceTier: 'High' | 'Medium' | 'Low' = 'Low';
  if (confidenceScore >= thresholds.high) confidenceTier = 'High';
  else if (confidenceScore >= thresholds.medium) confidenceTier = 'Medium';

  const commercialDiffCount = [
    durationOrBedCheck,
    mealCheck,
    transferCheck,
    cancelCheck,
    accessCheck,
  ].filter((c) => c.row.status === 'diff').length;

  let decision: MatchResult['decision'];
  if (locationCheck.score < 0.5 || confidenceScore < 55) {
    decision = 'Distinct Products (Do Not Merge)';
  } else if (confidenceScore >= thresholds.high && commercialDiffCount === 0) {
    decision = 'Equivalent Bookable Product';
  } else if (confidenceScore >= thresholds.medium && commercialDiffCount > 0) {
    decision = 'Same Entity — Distinct Experience (Preserve Both)';
  } else if (confidenceScore >= thresholds.medium) {
    decision = 'Equivalent Bookable Product';
  } else {
    decision = 'Manual Review Recommended';
  }

  const explanation: string[] = [
    `Normalized token cosine similarity is ${cosinePct}% with ${wordOverlap.shared.length} shared canonical tokens (${wordOverlap.shared.slice(0, 6).join(', ') || 'none'}).`,
    locationCheck.row.status === 'match'
      ? `Geographic entity lock confirmed for "${recordA.location}".`
      : `Location mismatch detected ("${recordA.location}" vs "${recordB.location}") — prevents false entity merge.`,
    commercialDiffCount > 0
      ? `Detected ${commercialDiffCount} material commercial/inclusion difference(s) (price spread ₹${Math.abs(recordA.priceInr - recordB.priceInr).toLocaleString('en-IN')}). TravelIQ groups the shared underlying entity while preserving distinct bookable offers.`
      : `All structured booking attributes align cleanly across suppliers, supporting canonical equivalence.`,
    `Classified as ${confidenceTier} Confidence under current demo thresholds (High ≥ ${thresholds.high}%, Medium ${thresholds.medium}–${thresholds.high - 1}%).`,
  ];

  return {
    normalizedTitleA,
    normalizedTitleB,
    normalizedDescA,
    normalizedDescB,
    sharedTokens: wordOverlap.shared,
    distinctTokensA: wordOverlap.onlyA,
    distinctTokensB: wordOverlap.onlyB,
    cosineSimilarity: cosinePct,
    jaccardSimilarity: jaccardPct,
    attributeScore: attributeScorePct,
    confidenceScore,
    confidenceTier,
    decision,
    explanation,
    attributeDiffs,
  };
}

