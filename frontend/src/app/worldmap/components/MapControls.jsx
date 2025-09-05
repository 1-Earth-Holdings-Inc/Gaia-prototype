/**
 * MapControls Component
 * Custom navigation controls for the map
 */

import { memo, useState, useEffect } from 'react';

/**
 * MapControls Component
 * Provides custom pan and zoom controls for the map
 * 
 * @param {Object} props - Component props
 * @param {Function} props.onPan - Pan handler function
 * @param {Function} props.onZoom - Zoom handler function
 * @param {string} props.className - Additional CSS classes
 * @returns {JSX.Element} Map controls component
 */
const MapControls = memo(({ onPan, onZoom, className = '' }) => {
  const [currentZoom, setCurrentZoom] = useState(3); // Initial zoom level
  const [isAtMinZoom, setIsAtMinZoom] = useState(true); // Start at minimum zoom
  const [currentCenter, setCurrentCenter] = useState({ lat: 20, lng: 0 }); // Track map center

  // Update zoom level when map changes (this would need to be passed from parent)
  useEffect(() => {
    // This could be enhanced to receive zoom updates from the parent component
    // For now, we'll track it based on button clicks
  }, []);

  // Check if we're at vertical boundaries
  const isAtMaxLat = currentCenter.lat >= 85;
  const isAtMinLat = currentCenter.lat <= -85;

  const handleZoomOut = () => {
    if (isAtMinZoom) {
      console.log('Cannot zoom out further - at minimum zoom level');
      return;
    }
    onZoom('out');
    // Update local state (in a real implementation, this would come from the map instance)
    const newZoom = Math.max(3, currentZoom - 1);
    setCurrentZoom(newZoom);
    setIsAtMinZoom(newZoom === 3);
  };

  const handleZoomIn = () => {
    onZoom('in');
    // Update local state (in a real implementation, this would come from the map instance)
    const newZoom = Math.min(10, currentZoom + 1);
    setCurrentZoom(newZoom);
    setIsAtMinZoom(false);
  };

  const handlePanUp = () => {
    if (isAtMaxLat) {
      console.log('Cannot pan up further - at maximum latitude');
      return;
    }
    onPan('up');
    // Update local state
    const newLat = Math.min(85, currentCenter.lat + 5);
    setCurrentCenter(prev => ({ ...prev, lat: newLat }));
  };

  const handlePanDown = () => {
    if (isAtMinLat) {
      console.log('Cannot pan down further - at minimum latitude');
      return;
    }
    onPan('down');
    // Update local state
    const newLat = Math.max(-85, currentCenter.lat - 5);
    setCurrentCenter(prev => ({ ...prev, lat: newLat }));
  };

  const handlePanLeft = () => {
    onPan('left');
    // Update local state (longitude can wrap around)
    const newLng = currentCenter.lng - 5;
    setCurrentCenter(prev => ({ ...prev, lng: newLng }));
  };

  const handlePanRight = () => {
    onPan('right');
    // Update local state (longitude can wrap around)
    const newLng = currentCenter.lng + 5;
    setCurrentCenter(prev => ({ ...prev, lng: newLng }));
  };

  return (
    <div className={`absolute top-4 right-4 z-[1000] bg-white rounded-lg shadow-lg p-2 space-y-2 ${className}`}>
      {/* Navigation controls */}
      <div className="grid grid-cols-3 gap-1">
        <div></div>
        <button
          onClick={handlePanUp}
          disabled={isAtMaxLat}
          className={`w-8 h-8 rounded flex items-center justify-center transition-colors duration-200 ${
            isAtMaxLat 
              ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
              : 'bg-gray-100 hover:bg-gray-200 hover:scale-105'
          }`}
          title={isAtMaxLat ? "Cannot pan up further" : "Pan Up"}
          aria-label="Pan map up"
        >
          <svg className={`w-4 h-4 ${isAtMaxLat ? 'text-gray-400' : 'text-gray-600'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
          </svg>
        </button>
        <div></div>
        <button
          onClick={handlePanLeft}
          className="w-8 h-8 bg-gray-100 hover:bg-gray-200 rounded flex items-center justify-center transition-colors duration-200 hover:scale-105"
          title="Pan Left"
          aria-label="Pan map left"
        >
          <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <div className="w-8 h-8 bg-gray-50 rounded flex items-center justify-center">
          <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
        </div>
        <button
          onClick={handlePanRight}
          className="w-8 h-8 bg-gray-100 hover:bg-gray-200 rounded flex items-center justify-center transition-colors duration-200 hover:scale-105"
          title="Pan Right"
          aria-label="Pan map right"
        >
          <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
        <div></div>
        <button
          onClick={handlePanDown}
          disabled={isAtMinLat}
          className={`w-8 h-8 rounded flex items-center justify-center transition-colors duration-200 ${
            isAtMinLat 
              ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
              : 'bg-gray-100 hover:bg-gray-200 hover:scale-105'
          }`}
          title={isAtMinLat ? "Cannot pan down further" : "Pan Down"}
          aria-label="Pan map down"
        >
          <svg className={`w-4 h-4 ${isAtMinLat ? 'text-gray-400' : 'text-gray-600'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
        <div></div>
      </div>
      
      {/* Zoom controls */}
      <div className="border-t pt-2 space-y-1">
        <button
          onClick={handleZoomIn}
          className="w-full h-8 bg-blue-100 hover:bg-blue-200 rounded flex items-center justify-center transition-colors duration-200 hover:scale-105"
          title="Zoom In"
          aria-label="Zoom in"
        >
          <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
        </button>
        <button
          onClick={handleZoomOut}
          disabled={isAtMinZoom}
          className={`w-full h-8 rounded flex items-center justify-center transition-colors duration-200 ${
            isAtMinZoom 
              ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
              : 'bg-blue-100 hover:bg-blue-200 hover:scale-105'
          }`}
          title={isAtMinZoom ? "Cannot zoom out further" : "Zoom Out"}
          aria-label="Zoom out"
        >
          <svg className={`w-4 h-4 ${isAtMinZoom ? 'text-gray-400' : 'text-blue-600'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 12H6" />
          </svg>
        </button>
      </div>
      
      {/* Reset view button */}
      <div className="border-t pt-2">
        <button
          onClick={() => {
            console.log('Reset view button clicked');
            // This will be handled by the parent component
            if (window.mapResetHandler) {
              window.mapResetHandler();
            }
          }}
          className="w-full h-8 bg-green-100 hover:bg-green-200 rounded flex items-center justify-center transition-colors duration-200 hover:scale-105"
          title="Reset View"
          aria-label="Reset map view"
        >
          <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
        </button>
      </div>
    </div>
  );
});

MapControls.displayName = 'MapControls';

export default MapControls;


