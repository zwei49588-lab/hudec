import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { CityView } from './components/CityView.tsx';
import { DistrictView } from './components/DistrictView.tsx';

export default function App() {
  const [activeView, setActiveView] = useState<'city' | 'district'>('city');

  return (
    <main className="w-full h-screen bg-paper overflow-hidden">
      <AnimatePresence mode="wait">
        {activeView === 'city' ? (
          <CityView key="city" onEnterDistrict={() => setActiveView('district')} />
        ) : (
          <DistrictView key="district" onBack={() => setActiveView('city')} />
        )}
      </AnimatePresence>
    </main>
  );
}
