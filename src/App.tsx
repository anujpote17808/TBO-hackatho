import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { TripProvider } from './context/TripContext';
import { MarketplaceShell } from './components/layout/MarketplaceShell';
import { AiIntelligenceShell } from './components/layout/AiIntelligenceShell';

// Consumer Travel Marketplace Pages (TravelIQ AI 2.0)
import { HomePage } from './pages/HomePage';
import { DestinationsPage } from './pages/DestinationsPage';
import { SightseeingSearchPage } from './pages/SightseeingSearchPage';
import { ExperienceDetailPage } from './pages/ExperienceDetailPage';
import { HotelSearchPage } from './pages/HotelSearchPage';
import { HotelDetailPage } from './pages/HotelDetailPage';
import { RoomComparisonPage } from './pages/RoomComparisonPage';

// Enterprise AI Inventory Intelligence Pages
import { AiIntelligencePage } from './pages/AiIntelligencePage';
import { MatchingPage } from './pages/MatchingPage';
import { SupplierComparisonPage } from './pages/SupplierComparisonPage';
import { RankingPage } from './pages/RankingPage';
import { ContentQualityPage } from './pages/ContentQualityPage';
import { ArchitecturePage } from './pages/ArchitecturePage';
import { BusinessImpactPage } from './pages/BusinessImpactPage';
import { RoadmapPage } from './pages/RoadmapPage';

export function App() {
  return (
    <TripProvider>
      <BrowserRouter>
        <MarketplaceShell>
          <Routes>
            {/* 1. Premium Home */}
            <Route path="/" element={<HomePage />} />

            {/* 2. Destination Discovery */}
            <Route path="/destinations" element={<DestinationsPage />} />
            <Route path="/destinations/:slug" element={<DestinationsPage />} />

            {/* 3. Sightseeing Search & 4. Experience Details */}
            <Route path="/experiences" element={<SightseeingSearchPage />} />
            <Route path="/experiences/:id" element={<ExperienceDetailPage />} />

            {/* 5. Hotel Search, 6. Hotel Details & 7. Room Comparison */}
            <Route path="/hotels" element={<HotelSearchPage />} />
            <Route path="/hotels/:id" element={<HotelDetailPage />} />
            <Route path="/room-comparison" element={<RoomComparisonPage />} />

            {/* 8. AI Inventory Intelligence Dashboard */}
            <Route path="/ai-intelligence" element={<AiIntelligencePage />} />

            {/* 9. Product Matching */}
            <Route
              path="/ai-intelligence/matching"
              element={
                <AiIntelligenceShell
                  title="AI Product Matching Workbench"
                  subtitle="Live lexical normalization, entity-core vs commercial-modifier disentanglement, cosine similarity, and structured attribute comparison."
                  badge="Real Client-Side Matching Engine"
                >
                  <MatchingPage />
                </AiIntelligenceShell>
              }
            />

            {/* 10. Supplier Intelligence */}
            <Route
              path="/ai-intelligence/suppliers"
              element={
                <AiIntelligenceShell
                  title="Multi-Supplier Intelligence Matrix"
                  subtitle="Sort, filter, and compare synthetic supplier offers while separating Lowest Headline Price, Best Inclusions, and Most Flexible Cancellation."
                  badge="Supplier Selection Intelligence"
                >
                  <SupplierComparisonPage />
                </AiIntelligenceShell>
              }
            />

            {/* 11. Smart Ranking */}
            <Route path="/ai-intelligence/ranking" element={<RankingPage />} />

            {/* Duplicate Detection & Content Quality */}
            <Route
              path="/ai-intelligence/quality"
              element={
                <AiIntelligenceShell
                  title="Duplicate Detection & Content Quality Monitor"
                  subtitle="Audit missing descriptions, duplicate photography, invalid room mappings, and cancellation policy omissions across 24 demo feeds."
                  badge="Catalog Hygiene Engine"
                >
                  <ContentQualityPage />
                </AiIntelligenceShell>
              }
            />

            {/* 9-Layer System Architecture */}
            <Route
              path="/ai-intelligence/architecture"
              element={
                <AiIntelligenceShell
                  title="9-Layer TravelIQ Technical Architecture"
                  subtitle="Interactive pipeline blueprint clearly separating implemented prototype capabilities from proposed global production scale."
                  badge="System Architecture"
                >
                  <ArchitecturePage />
                </AiIntelligenceShell>
              }
            />

            {/* 12. Business Impact & Roadmap */}
            <Route path="/business-impact" element={<BusinessImpactPage />} />
            <Route
              path="/roadmap"
              element={
                <AiIntelligenceShell
                  title="48-Hour Hackathon & Production Roadmap"
                  subtitle="Execution milestones from initial catalog ingestion to global multi-supplier deployment."
                  badge="Implementation Plan"
                >
                  <RoadmapPage />
                </AiIntelligenceShell>
              }
            />

            {/* Backward-compatible route redirects from v1 */}
            <Route path="/sightseeing" element={<Navigate to="/experiences" replace />} />
            <Route path="/matching" element={<Navigate to="/ai-intelligence/matching" replace />} />
            <Route path="/ranking" element={<Navigate to="/ai-intelligence/ranking" replace />} />
            <Route path="/suppliers" element={<Navigate to="/ai-intelligence/suppliers" replace />} />
            <Route path="/quality" element={<Navigate to="/ai-intelligence/quality" replace />} />
            <Route path="/architecture" element={<Navigate to="/ai-intelligence/architecture" replace />} />
            <Route path="/impact" element={<Navigate to="/business-impact" replace />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </MarketplaceShell>
      </BrowserRouter>
    </TripProvider>
  );
}

export default App;
