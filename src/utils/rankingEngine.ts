import {
  RankedProductResult,
  RankingProductItem,
  RankingWeights,
} from '../types/inventory';

export const DEFAULT_RANKING_WEIGHTS: RankingWeights = {
  searchRelevance: 30,
  matchConfidence: 25,
  priceCompetitiveness: 20,
  availability: 15,
  supplierReliability: 10,
  cancellationFlexibility: 0,
};

export const FACTOR_LABELS: Record<keyof RankingWeights, string> = {
  searchRelevance: 'Search Relevance',
  matchConfidence: 'Match Confidence',
  priceCompetitiveness: 'Price Competitiveness',
  availability: 'Availability',
  supplierReliability: 'Supplier Reliability',
  cancellationFlexibility: 'Cancellation Flexibility',
};

export function computeRankedInventory(
  items: RankingProductItem[],
  weights: RankingWeights
): RankedProductResult[] {
  const weightKeys = Object.keys(weights) as (keyof RankingWeights)[];
  const totalWeight = weightKeys.reduce((acc, k) => acc + weights[k], 0);
  const divisor = totalWeight > 0 ? totalWeight : 1;

  const scored = items.map((item) => {
    const contributions = weightKeys.map((key) => {
      const normalizedWeight = weights[key] / divisor;
      const points = Number((item.metrics[key] * normalizedWeight).toFixed(1));
      return {
        key,
        label: FACTOR_LABELS[key],
        points,
      };
    });

    const smartScore = Number(
      contributions.reduce((sum, c) => sum + c.points, 0).toFixed(1)
    );

    return {
      ...item,
      smartScore,
      smartRank: 0,
      rankDelta: 0,
      factorContributions: contributions,
    };
  });

  scored.sort((a, b) => b.smartScore - a.smartScore || a.priceInr - b.priceInr);

  return scored.map((item, idx) => {
    const smartRank = idx + 1;
    return {
      ...item,
      smartRank,
      rankDelta: item.baselineRank - smartRank,
    };
  });
}

