import { ReactNode, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { NAV_ITEMS } from '../../data/overviewData';
import { Sidebar } from './Sidebar';
import { TopHeader } from './TopHeader';
import { PresentationOverlay } from '../presentation/PresentationOverlay';

interface AppShellProps {
  children: ReactNode;
}

export function AppShell({ children }: AppShellProps) {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [presentationOpen, setPresentationOpen] = useState(false);
  const [presentationSlide, setPresentationSlide] = useState(0);

  const currentModule =
    NAV_ITEMS.find((item) => item.path === location.pathname) ?? NAV_ITEMS[0];

  const handleOpenPresentation = (slideIndex = 0) => {
    setPresentationSlide(slideIndex);
    setPresentationOpen(true);
  };

  return (
    <div className="min-h-screen flex bg-[#F3F6FA] text-[#182338]">
      {/* Fixed Desktop Sidebar */}
      <div className="hidden lg:block fixed inset-y-0 left-0 z-30 w-[248px]">
        <Sidebar onOpenPresentation={handleOpenPresentation} />
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div
          className="lg:hidden fixed inset-0 z-40 flex"
          role="dialog"
          aria-modal="true"
          aria-label="Mobile navigation menu"
        >
          <div
            className="fixed inset-0 bg-[#0B1530]/60 backdrop-blur-xs"
            onClick={() => setMobileMenuOpen(false)}
          />
          <div className="relative z-10 h-full">
            <Sidebar
              onOpenPresentation={handleOpenPresentation}
              onNavigate={() => setMobileMenuOpen(false)}
              showCloseButton
              onCloseMobile={() => setMobileMenuOpen(false)}
            />
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 lg:pl-[248px]">
        <TopHeader
          currentModule={currentModule}
          onOpenMobileMenu={() => setMobileMenuOpen(true)}
          onOpenPresentation={handleOpenPresentation}
        />

        <main className="flex-1 p-4 sm:p-5 lg:p-6 max-w-[1480px] w-full mx-auto">
          {children}
        </main>
      </div>

      {/* Fullscreen Interactive Hackathon Presentation Mode */}
      <PresentationOverlay
        open={presentationOpen}
        initialSlide={presentationSlide}
        onClose={() => setPresentationOpen(false)}
      />
    </div>
  );
}

