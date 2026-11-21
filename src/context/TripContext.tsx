import { createContext, ReactNode, useContext, useState } from 'react';

export interface SavedTripItem {
  id: string;
  type: 'Experience' | 'Hotel';
  title: string;
  subtitle: string;
  supplier: string;
  destination: string;
  image: string;
  priceInr: number;
  policy: string;
}

interface TripContextValue {
  items: SavedTripItem[];
  addTripItem: (item: SavedTripItem) => void;
  removeTripItem: (id: string) => void;
  clearTrips: () => void;
  tripsDrawerOpen: boolean;
  setTripsDrawerOpen: (open: boolean) => void;
}

const TripContext = createContext<TripContextValue | null>(null);

const INITIAL_DEMO_TRIPS: SavedTripItem[] = [
  {
    id: 'demo-taj-sup-b',
    type: 'Experience',
    title: 'Taj Mahal Sunrise Tour',
    subtitle: 'Entry + ASI-licensed guide · 3-hour duration',
    supplier: 'Supplier B — BharatGuides Pro',
    destination: 'Agra, India',
    image: '/images/taj-mahal.png',
    priceInr: 1500,
    policy: 'Free cancellation up to 24 hours',
  },
];

export function TripProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<SavedTripItem[]>(INITIAL_DEMO_TRIPS);
  const [tripsDrawerOpen, setTripsDrawerOpen] = useState(false);

  const addTripItem = (item: SavedTripItem) => {
    setItems((prev) => {
      if (prev.some((existing) => existing.id === item.id)) return prev;
      return [item, ...prev];
    });
    setTripsDrawerOpen(true);
  };

  const removeTripItem = (id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const clearTrips = () => setItems([]);

  return (
    <TripContext.Provider
      value={{
        items,
        addTripItem,
        removeTripItem,
        clearTrips,
        tripsDrawerOpen,
        setTripsDrawerOpen,
      }}
    >
      {children}
    </TripContext.Provider>
  );
}

export function useTrips() {
  const ctx = useContext(TripContext);
  if (!ctx) throw new Error('useTrips must be used inside TripProvider');
  return ctx;
}
