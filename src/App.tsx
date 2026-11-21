import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { AppShell } from './components/layout/AppShell';
import { OverviewPage } from './pages/OverviewPage';
import { SightseeingPage } from './pages/SightseeingPage';
import { HotelsPage } from './pages/HotelsPage';
import { MatchingPage } from './pages/MatchingPage';
import { RankingPage } from './pages/RankingPage';
import { SupplierComparisonPage } from './pages/SupplierComparisonPage';
import { ContentQualityPage } from './pages/ContentQualityPage';
import { ArchitecturePage } from './pages/ArchitecturePage';
import { BusinessImpactPage } from './pages/BusinessImpactPage';
import { RoadmapPage } from './pages/RoadmapPage';

export function App() {
  return (
    <BrowserRouter>
      <AppShell>
        <Routes>
          <Route path="/" element={<OverviewPage />} />
          <Route path="/sightseeing" element={<SightseeingPage />} />
          <Route path="/hotels" element={<HotelsPage />} />
          <Route path="/matching" element={<MatchingPage />} />
          <Route path="/ranking" element={<RankingPage />} />
          <Route path="/suppliers" element={<SupplierComparisonPage />} />
          <Route path="/quality" element={<ContentQualityPage />} />
          <Route path="/architecture" element={<ArchitecturePage />} />
          <Route path="/impact" element={<BusinessImpactPage />} />
          <Route path="/roadmap" element={<RoadmapPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AppShell>
    </BrowserRouter>
  );
}

export default App;

