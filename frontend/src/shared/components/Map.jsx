"use client";
import { useEffect, useState, useRef, memo } from 'react';
import dynamic from 'next/dynamic';

// Single dynamic import for the entire map component to prevent multiple instances
const DynamicMapComponent = dynamic(
  () => import('./MapComponent'),
  { 
    ssr: false,
    loading: () => (
      <div className="h-full w-full bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg font-medium">Loading Interactive Map...</p>
          <p className="text-gray-500 text-sm mt-2">Preparing WWF Terrestrial Realms</p>
        </div>
      </div>
    )
  }
);

// Main Map wrapper component - memoized to prevent unnecessary re-renders
const Map = memo(({ className = '' }) => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return (
      <div className={`${className} bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 flex items-center justify-center`}>
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg font-medium">Initializing Map...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`${className} relative`}>
      <DynamicMapComponent />
    </div>
  );
});

Map.displayName = 'Map';

export default Map;