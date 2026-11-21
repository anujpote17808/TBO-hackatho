# TravelIQ AI — Unified Travel Inventory Intelligence

**TBO Hackathon | 48-Hour Global Open Innovation Hackathon**

TravelIQ AI is an enterprise travel inventory intelligence OS prototype that transforms fragmented multi-supplier travel inventory into clean, comparable, intelligently ranked, and bookable products.

> **Demo Data Notice:** All KPI figures, supplier feeds, pricing, and evaluation metrics in this prototype are **illustrative synthetic demonstration data** created for the TBO Hackathon, not TBO production statistics.

## Modules Included

1. **Inventory Overview** — KPI strip (12,480 inventory / 2,140 duplicates / 8,620 matched / 24 suppliers), `CONSOLIDATE → MATCH → COMPARE → RANK` workflow, Taj Mahal Sunrise Tour hero with 96% Entity Resolution Panel, and Indian attraction showcase gallery.
2. **Sightseeing Inventory** — Multi-destination attraction catalog (Taj Mahal, Qutub Minar, Goa Sunset Cruise, Gateway of India, Jaipur City Palace, Kerala Backwaters) with interactive **View Differences** matrix preserving distinct ticket, guide, transfer, and meal inclusions.
3. **Hotel Inventory** — Property cards and attribute-level **Room Equivalence Comparison Matrix** (featuring Grand Palace Agra) preventing false merges between name-similar rooms with differing bed types, meal plans, or refund terms.
4. **AI Product Matching** — Live client-side matching engine performing lexical normalization, unigram/bigram cosine similarity, Jaccard token overlap, structured attribute comparison, configurable confidence thresholds, and transparent match explanations.
5. **Smart Ranking** — Proposed multi-factor ranking model (`30% Relevance + 25% Match Confidence + 20% Price + 15% Availability + 10% Reliability`) with live weight sliders, presets, and before-vs-after rank comparisons.
6. **Supplier Comparison** — Sortable and filterable multi-supplier matrix separately highlighting Lowest Price, Best Inclusion Package, and Most Flexible Cancellation, plus side-by-side product comparison.
7. **Content Quality** — Inventory hygiene scorecards, live chart, severity/issue filters, and remediation triggers.
8. **System Architecture** — Interactive 9-layer architecture diagram distinguishing implemented prototype components from proposed production scale.
9. **Business Impact** — Executive analytics and measurable evaluation KPIs (Precision, Recall, F1, Room Equivalence Accuracy, NDCG@10).
10. **Implementation Roadmap** — 48-hour hackathon milestones and post-hackathon production phases.
11. **9-Slide Presentation Mode** — Fullscreen hackathon judging deck with keyboard arrow navigation and slide progress controls.

## Local Development

```bash
npm install
npm run dev
```

## Production Build

```bash
npm run build
npm run preview
```

## Deploying to Vercel

1. Push this repository to GitHub (`https://github.com/anujpote17808/TBO-hackatho`).
2. Visit [vercel.com/new](https://vercel.com/new) and import `anujpote17808/TBO-hackatho`.
3. Vercel automatically detects Vite (`npm run build`, output directory `dist`). SPA routing is pre-configured via `vercel.json`.
4. Click **Deploy**.

