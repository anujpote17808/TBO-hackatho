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
  incl: 'included',
  w: 'with',
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
  'via',
  'day',
]);

export function normalizeTravelText(raw: string): string {
  const cleaned = raw
    .toLowerCase()
    .replace(/[-_/+,()•|&]/g, ' ')
    .replace(/[^a-z0-9\s]/g, '')
    .replace(/\s+/g, ' ')
    .trim();

  const expanded = cleaned
    .split(' ')
    .filter(Boolean)
    .map((tok) => SYNONYM_MAP[tok] ?? tok)
    .join(' ');

  // Deduplicate adjacent identical tokens (e.g., "taj mahal mahal" -> "taj mahal")
  const tokens = expanded.split(' ').filter(Boolean);
  const deduped: string[] = [];
  for (const t of tokens) {
    if (deduped[deduped.length - 1] !== t) deduped.push(t);
  }
  return deduped.join(' ');
}

const COMMERCIAL_MODIFIERS = new Set([
  'ticket',
  'guide',
  'licensed',
  'private',
  'transfer',
  'hotel',
  'breakfast',
  'included',
  'only',
  'non',
  'refundable',
  'free',
  'cancellation',
  '24h',
  '48h',
  'hour',
  'hours',
  'saver',
  'vip',
]);

function getCoreWords(text: string): string[] {
  return normalizeTravelText(text)
    .split(' ')
    .filter((w) => w.length > 1 && !STOP_WORDS.has(w));
}

function getEntityWords(text: string): string[] {
  return getCoreWords(text).filter((w) => !COMMERCIAL_MODIFIERS.has(w));
}

function tokenizeWithBigrams(text: string): string[] {
  const words = getCoreWords(text);
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
    const weight = term.includes('_') ? 1.15 : 1;
    dot += a * weight * (b * weight);
    magA += (a * weight) ** 2;
    magB += (b * weight) ** 2;
  }

  if (magA === 0 || magB === 0) return 0;
  return dot / (Math.sqrt(magA) * Math.sqrt(magB));
}

function computeWordOverlap(textA: string, textB: string) {
  const setA = new Set(getCoreWords(textA));
  const setB = new Set(getCoreWords(textB));

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
  const minSize = Math.min(setA.size, setB.size);
  const jaccard = unionSize === 0 ? 0 : shared.length / unionSize;
  // Szymkiewicz-Simpson overlap coefficient handles short-title vs verbose-title supplier feeds
  const overlapCoeff = minSize === 0 ? 0 : shared.length / minSize;

  return { shared, onlyA, onlyB, jaccard, overlapCoeff };
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
    tokenizeWithBigrams(recordA.rawTitle),
    tokenizeWithBigrams(recordB.rawTitle)
  );
  const fullCosine = computeCosineSimilarity(
    tokenizeWithBigrams(`${recordA.rawTitle} ${recordA.rawDescription} ${recordA.location}`),
    tokenizeWithBigrams(`${recordB.rawTitle} ${recordB.rawDescription} ${recordB.location}`)
  );

  // Disentangled entity-core similarity (strips commercial modifiers like breakfast/transfer/non-refundable)
  const entityWordsA = getEntityWords(recordA.rawTitle);
  const entityWordsB = getEntityWords(recordB.rawTitle);
  const entitySetA = new Set(entityWordsA);
  const entitySetB = new Set(entityWordsB);
  const entityShared = [...entitySetA].filter((w) => entitySetB.has(w));
  const entityOverlap =
    Math.min(entitySetA.size, entitySetB.size) === 0
      ? 0
      : entityShared.length / Math.min(entitySetA.size, entitySetB.size);
  const entityCosine = computeCosineSimilarity(entityWordsA, entityWordsB);

  const fullOverlap = computeWordOverlap(
    `${recordA.rawTitle} ${recordA.rawDescription}`,
    `${recordB.rawTitle} ${recordB.rawDescription}`
  );

  const semanticScore = Math.min(
    1,
    entityOverlap * 0.42 +
      entityCosine * 0.28 +
      titleCosine * 0.15 +
      fullCosine * 0.15
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

  const commercialAttrAvg =
    (durationOrBedCheck.score +
      mealCheck.score +
      transferCheck.score +
      cancelCheck.score +
      accessCheck.score) /
    5;

  const attributeScorePct = Math.round(commercialAttrAvg * 100);
  const cosinePct = Math.round(semanticScore * 100);
  const jaccardPct = Math.round(fullOverlap.jaccard * 100);

  // Entity Resolution Confidence: Location lock + Entity-core Semantic score + Attribute reinforcement
  const rawConfidence =
    locationCheck.score < 0.5
      ? Math.round(semanticScore * 30)
      : Math.round(
          Math.min(
            99,
            locationCheck.score * 30 +
              semanticScore * 55 +
              commercialAttrAvg * 15
          )
        );

  const confidenceScore = Math.max(8, Math.min(99, rawConfidence));

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
  if (locationCheck.score < 0.5 || confidenceScore < 50) {
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
    `Blended lexical semantic similarity is ${cosinePct}% (Jaccard ${jaccardPct}%) across ${fullOverlap.shared.length} shared canonical tokens (${fullOverlap.shared.slice(0, 6).join(', ') || 'none'}).`,
    locationCheck.row.status === 'match'
      ? `Geographic entity lock confirmed for "${recordA.location}".`
      : `Location mismatch detected ("${recordA.location}" vs "${recordB.location}") — hard guardrail prevents false entity merge.`,
    commercialDiffCount > 0
      ? `Detected ${commercialDiffCount} material commercial/inclusion difference(s) (price spread ₹${Math.abs(recordA.priceInr - recordB.priceInr).toLocaleString('en-IN')}). TripMatch AI groups the shared entity while preserving distinct bookable offers.`
      : `All structured booking attributes align cleanly across suppliers (${attributeScorePct}% parity), supporting canonical equivalence.`,
    `Classified as ${confidenceTier} Confidence under active demo thresholds (High ≥ ${thresholds.high}%, Medium ${thresholds.medium}–${thresholds.high - 1}%).`,
  ];

  return {
    normalizedTitleA,
    normalizedTitleB,
    normalizedDescA,
    normalizedDescB,
    sharedTokens: fullOverlap.shared,
    distinctTokensA: fullOverlap.onlyA,
    distinctTokensB: fullOverlap.onlyB,
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
