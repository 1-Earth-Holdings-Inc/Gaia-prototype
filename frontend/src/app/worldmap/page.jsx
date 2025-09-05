"use client";
import { useState, useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';
import { useCountriesData } from './hooks/useCountriesData';
import { useMapInstance } from './hooks/useMapInstance';

// Dynamic import to avoid SSR issues with Leaflet
const MapContainer = dynamic(() => import('./components/MapContainer'), {
  ssr: false,
  loading: () => (
    <div className="h-full w-full flex items-center justify-center bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-gray-600 text-lg font-medium">Loading Interactive World Map...</p>
        <p className="text-gray-500 text-sm mt-2">Preparing countries data</p>
      </div>
    </div>
  )
});

/**
 * WorldMapPage Component
 * Main page component for the interactive world map
 */
export default function WorldMapPage() {
  // Custom hooks for data and map management
  const { countriesData, loading: dataLoading, error: dataError } = useCountriesData();
  const mapInstance = useMapInstance();
  
  // Local state for UI
  const [isClient, setIsClient] = useState(false);
  const pageInitialized = useRef(false);

  // Ensure client-side rendering and prevent multiple initializations
  useEffect(() => {
    if (!pageInitialized.current) {
      setIsClient(true);
      pageInitialized.current = true;
    }
  }, []);

  // Show loading state while data is loading or client is not ready
  if (!isClient || dataLoading) {
    return (
      <div className="h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg font-medium">Loading Interactive World Map...</p>
          <p className="text-gray-500 text-sm mt-2">
            {dataLoading ? 'Fetching countries data...' : 'Initializing map...'}
          </p>
        </div>
      </div>
    );
  }

  // Show error state if data loading failed
  if (dataError) {
    return (
      <div className="h-screen flex items-center justify-center bg-red-50">
        <div className="text-center max-w-md mx-auto p-6">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Failed to Load Map</h2>
          <p className="text-gray-600 mb-4">{dataError}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  // Show error if no data is available
  if (!countriesData || !countriesData.features || countriesData.features.length === 0) {
    return (
      <div className="h-screen flex items-center justify-center bg-yellow-50">
        <div className="text-center max-w-md mx-auto p-6">
          <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">No Map Data Available</h2>
          <p className="text-gray-600 mb-4">Unable to load countries data for the map.</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Reload Page
          </button>
        </div>
      </div>
    );
  }

  return (
    <div key="worldmap-page-container" className="h-screen w-full">
      {/* Main Map Container - Full Screen */}
      <MapContainer
        key="worldmap-map-container"
        countriesData={countriesData}
        mapInstance={mapInstance}
        selectedCountry={mapInstance.selectedCountry}
        hoveredCountry={mapInstance.hoveredCountry}
        onCountrySelect={mapInstance.selectCountry}
        onCountryHover={mapInstance.hoverCountry}
        onPan={mapInstance.pan}
        onZoom={mapInstance.zoom}
        onResetView={mapInstance.resetView}
        tileLayer="cartoVoyager"
        className="h-full w-full"
      />
    </div>
  );
}
