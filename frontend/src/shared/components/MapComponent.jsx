"use client";
import { useEffect, useState, useRef, useCallback, memo } from 'react';
import { MapContainer, TileLayer, GeoJSON } from 'react-leaflet';

// Vibrant realm colors for WWF Biogeographic Realms
const REALM_COLORS = {
  'Afrotropical': '#FF6B35',      // Vibrant Orange-red
  'Australasia': '#8A4FFF',       // Vibrant Purple  
  'Indomalayan': '#22C55E',       // Vibrant Green
  'Nearctic': '#EC4899',          // Vibrant Pink
  'Neotropical': '#06B6D4',       // Vibrant Cyan
  'Palearctic': '#EAB308',        // Vibrant Yellow
  'Oceania': '#8B5CF6',           // Vibrant Violet
  'Antarctic': '#0EA5E9'          // Vibrant Light blue
};

// Map Controls Component - memoized to prevent re-renders
const MapControls = memo(({ onPan, onZoom }) => {
  const [currentZoom, setCurrentZoom] = useState(2.7); // Initial zoom level
  const [isAtMinZoom, setIsAtMinZoom] = useState(true); // Start at minimum zoom
  const [currentCenter, setCurrentCenter] = useState({ lat: 20, lng: 0 }); // Track map center

      // Check if we're at vertical boundaries
    const isAtMaxLat = currentCenter.lat >= 85;
    const isAtMinLat = currentCenter.lat <= -85;

  const handleZoomOut = () => {
    if (isAtMinZoom) {
      console.log('Cannot zoom out further - at minimum zoom level');
      return;
    }
    onZoom('out');
    // Update local state
    const newZoom = Math.max(2.7, currentZoom - 1);
    setCurrentZoom(newZoom);
    setIsAtMinZoom(newZoom === 2.7);
  };

  const handleZoomIn = () => {
    onZoom('in');
    // Update local state
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
    <div className="absolute top-4 right-4 z-[1000] bg-white rounded-lg shadow-lg p-2 space-y-2">
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
        >
          <svg className={`w-4 h-4 ${isAtMinZoom ? 'text-gray-400' : 'text-blue-600'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 12H6" />
          </svg>
        </button>
      </div>
    </div>
  );
});

MapControls.displayName = 'MapControls';

// Legend Component - memoized to prevent re-renders
const MapLegend = memo(({ selectedRealm, onRealmSelect }) => (
  <div className="absolute bottom-4 left-4 z-[1000] bg-white/95 backdrop-blur-sm rounded-lg shadow-xl p-4 max-w-sm border border-gray-200">
    <h3 className="font-bold text-sm mb-3 text-gray-800">
      <span className="bg-green-100 px-2 py-1 rounded text-green-800">WWF Biogeographic Realms</span>
    </h3>
    <div className="space-y-2 max-h-64 overflow-y-auto">
      {['Afrotropical', 'Australasia', 'Indomalayan', 'Nearctic', 'Neotropical', 'Palearctic', 'Oceania', 'Antarctic'].map((realm) => (
        <div 
          key={realm} 
          className={`flex items-center space-x-3 cursor-pointer transition-all duration-200 hover:bg-gray-50 rounded px-2 py-1 ${
            selectedRealm && selectedRealm !== realm ? 'opacity-50' : 'opacity-100'
          } ${
            selectedRealm === realm ? 'bg-green-100' : ''
          }`}
          onClick={() => onRealmSelect(selectedRealm === realm ? null : realm)}
        >
          <div 
            className="w-4 h-4 rounded border border-gray-300 flex-shrink-0"
            style={{ backgroundColor: REALM_COLORS[realm] || '#64748B' }}
          ></div>
          <span className="text-sm text-gray-700 font-medium">{realm}</span>
        </div>
      ))}
    </div>
    {selectedRealm && (
      <div className="mt-3 pt-2 border-t border-gray-200">
        <p className="text-xs text-green-600 font-medium">
          Selected: {selectedRealm}
        </p>
        <p className="text-xs text-gray-500 mt-1">
          Click on a realm to highlight it. Click again to deselect.
        </p>
      </div>
    )}
  </div>
));

MapLegend.displayName = 'MapLegend';

// Main MapComponent - contains all Leaflet logic
const MapComponent = memo(() => {
  const [geoJsonData, setGeoJsonData] = useState(null);
  const [selectedRealm, setSelectedRealm] = useState(null);
  const [hoveredRealm, setHoveredRealm] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const mapRef = useRef(null);
  const geoJsonLayerRef = useRef(null);

  // Load GeoJSON data once with preloading
  useEffect(() => {
    let isMounted = true;
    
    const loadGeoJsonData = async () => {
      try {
        // Preload the realms data to ensure it's ready
        const response = await fetch('/data/realms_web_final.geojson', {
          cache: 'force-cache',
          headers: {
            'Cache-Control': 'max-age=31536000'
          }
        });
        if (!response.ok) {
          throw new Error(`Failed to load GeoJSON: ${response.statusText}`);
        }
        const data = await response.json();
        
        // Ensure data is fully loaded before setting state
        if (isMounted && data && data.features && data.features.length > 0) {
          setGeoJsonData(data);
          setLoading(false);
        }
      } catch (err) {
        console.error('Error loading GeoJSON:', err);
        if (isMounted) {
          setError(err instanceof Error ? err.message : 'Failed to load map data');
          setLoading(false);
        }
      }
    };

    loadGeoJsonData();
    
    return () => {
      isMounted = false;
    };
  }, []);

  // Style function for GeoJSON features - Vibrant realm colors
  const getFeatureStyle = useCallback((feature) => {
    if (!feature?.properties?.realm_name) return {
      fillColor: '#E5E7EB',
      weight: 0.5,
      opacity: 0.5,
      color: '#9CA3AF',
      fillOpacity: 0.3
    };
    
    const realmName = feature.properties.realm_name;
    const realmColor = REALM_COLORS[realmName] || '#64748B';
    const isSelected = selectedRealm === realmName;
    const isHovered = hoveredRealm === realmName;
    
    return {
      fillColor: realmColor,
      weight: isSelected ? 2.5 : isHovered ? 1.5 : 0.8,
      opacity: 1,
      color: isSelected ? '#000000' : isHovered ? '#000000' : '#FFFFFF',
      dashArray: undefined,
      fillOpacity: isSelected ? 0.9 : isHovered ? 0.85 : 0.8,
      // Enhanced visual feedback
      className: isSelected ? 'realm-selected' : isHovered ? 'realm-hovered' : 'realm-default'
    };
  }, [selectedRealm, hoveredRealm]);

  // Event handlers for GeoJSON features
  const onEachFeature = useCallback((feature, layer) => {
    if (!feature?.properties?.realm_name) return;

    layer.on({
      mouseover: (e) => {
        setHoveredRealm(feature.properties.realm_name);
        const targetLayer = e.target;
        const realmColor = REALM_COLORS[feature.properties.realm_name] || '#64748B';
        targetLayer.setStyle({
          weight: 1.5,
          fillOpacity: 0.85,
          fillColor: realmColor,
          color: '#000000'
        });
        
        // Create clear, visible tooltip
        targetLayer.bindTooltip(
          `<div style="font-weight: 700; font-size: 14px; color: #000000; text-shadow: 1px 1px 2px rgba(255,255,255,0.8);">${feature.properties.realm_name}</div>`,
          {
            permanent: false,
            direction: 'top',
            className: 'realm-tooltip-clear',
            offset: [0, -10]
          }
        ).openTooltip();
      },
      mouseout: (e) => {
        setHoveredRealm(null);
        const targetLayer = e.target;
        targetLayer.setStyle(getFeatureStyle(feature));
        targetLayer.closeTooltip();
      },
      click: (e) => {
        const newSelectedRealm = selectedRealm === feature.properties.realm_name 
          ? null 
          : feature.properties.realm_name;
        setSelectedRealm(newSelectedRealm);
        
        // Fit bounds to the clicked feature with smooth animation
        const targetLayer = e.target;
        const bounds = targetLayer.getBounds();
        if (mapRef.current) {
          mapRef.current.fitBounds(bounds, { 
            padding: [30, 30],
            animate: true,
            duration: 0.5 
          });
        }
      }
    });
  }, [selectedRealm, getFeatureStyle]);

  // Map navigation functions
  const handlePan = useCallback((direction) => {
    if (!mapRef.current) return;
    
    const map = mapRef.current;
    const currentCenter = map.getCenter();
    const panDistance = 5; // Increased for faster, smoother scrolling
    
    let newLat = currentCenter.lat;
    let newLng = currentCenter.lng;
    
    switch (direction) {
      case 'up':
        newLat = Math.min(85, newLat + panDistance);
        // Prevent going beyond the map boundaries
        if (newLat > 85) {
          console.log('Reached maximum latitude, cannot pan up further');
          return;
        }
        break;
      case 'down':
        newLat = Math.max(-85, newLat - panDistance);
        // Prevent going beyond the map boundaries
        if (newLat < -85) {
          console.log('Reached minimum latitude, cannot pan down further');
          return;
        }
        break;
      case 'left':
        newLng -= panDistance;
        // For infinite scrolling, let Leaflet handle the wrapping automatically
        break;
      case 'right':
        newLng += panDistance;
        // For infinite scrolling, let Leaflet handle the wrapping automatically
        break;
    }
    
    map.setView([newLat, newLng], map.getZoom(), {
      animate: true,
      duration: 0.3, // Smooth animation duration
      easeLinearity: 0.1 // Smooth easing
    });
  }, []);

  const handleZoom = useCallback((direction) => {
    if (!mapRef.current) return;
    
    const map = mapRef.current;
    const currentZoom = map.getZoom();
    const minZoom = 2.7; // Set minimum zoom level to match initial zoom
    const maxZoom = 10; // Set maximum zoom level
    
    let newZoom;
    if (direction === 'in') {
      newZoom = Math.min(maxZoom, currentZoom + 1);
    } else {
      newZoom = Math.max(minZoom, currentZoom - 1);
      
      // Check if we're already at minimum zoom
      if (newZoom === minZoom && currentZoom === minZoom) {
        console.log('Already at minimum zoom level, cannot zoom out further');
        return;
      }
    }
    
    map.setZoom(newZoom, {
      animate: true,
      duration: 0.3 // Smooth zoom animation
    });
  }, []);

  const handleRealmSelect = useCallback((realm) => {
    setSelectedRealm(realm);
  }, []);

  if (loading) {
    return (
      <div className="h-full w-full flex items-center justify-center bg-slate-100">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading WWF Terrestrial Realms...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-full w-full flex items-center justify-center bg-red-50">
        <div className="text-center text-red-600">
          <p className="text-lg font-semibold mb-2">Error Loading Map</p>
          <p className="text-sm">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <style jsx>{`
        /* Simple, clean styling - no overrides */
        .realms-map-container .leaflet-interactive {
          stroke-width: 1px;
          fill-opacity: 0.8;
          transition: all 0.2s ease;
        }
        
        .realms-map-container .leaflet-interactive:hover {
          stroke: #000000;
          stroke-width: 2px;
          fill-opacity: 0.9;
        }
      `}</style>
      <div className="realms-map-container h-full w-full">
        <MapContainer
        ref={mapRef}
        center={[20, 0]}
        zoom={2.7}
        minZoom={2.7}
        maxZoom={10}
        className="h-full w-full z-0"
        zoomControl={false}
        attributionControl={true}
        worldCopyJump={true}
        maxBounds={[[-85, -180], [85, 180]]}
        maxBoundsViscosity={0.3}
        // Performance optimizations
        preferCanvas={true}
        zoomSnap={0.5}
        zoomDelta={0.5}
        wheelPxPerZoomLevel={120}
        whenCreated={(mapInstance) => {
          mapRef.current = mapInstance;
        }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          subdomains="abc"
          maxZoom={19}
        />
        
        {geoJsonData && (
          <GeoJSON
            ref={geoJsonLayerRef}
            data={geoJsonData}
            style={getFeatureStyle}
            onEachFeature={onEachFeature}
            // Performance optimizations
            key="realms-geojson"
            uniqueId={(feature) => {
              const props = feature.properties || {};
              return `${props.realm_name || 'unknown'}-${props.realm_code || 'unknown'}`;
            }}
            interactive={true}
            // Smooth scrolling optimizations
            smoothFactor={1.0}
            simplifyFactor={1.0}
            precision={5}
            // Ensure immediate rendering
            updateWhenZooming={false}
            updateWhenIdle={false}
            // Prevent late color loading
            rendererOptions={{
              padding: 0.5
            }}
          />
        )}
      </MapContainer>
      
        <MapControls onPan={handlePan} onZoom={handleZoom} />
        <MapLegend selectedRealm={selectedRealm} onRealmSelect={handleRealmSelect} />
      </div>
    </>
  );
});

MapComponent.displayName = 'MapComponent';

export default MapComponent;


