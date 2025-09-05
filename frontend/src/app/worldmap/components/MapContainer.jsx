/**
 * MapContainer Component
 * Main container that initializes the Leaflet map
 */

import { MapContainer } from 'react-leaflet';
import { memo, useEffect, useRef } from 'react';
import { MAP_CONFIG } from '../utils/mapInteractions';
import TileLayerConfig from './TileLayerConfig';
import WorldMap from './WorldMap';
import MapControls from './MapControls';

// Global flag to prevent multiple map instances
let globalMapInstance = null;

/**
 * MapContainer Component
 * Initializes and manages the Leaflet map with all layers and controls
 * 
 * @param {Object} props - Component props
 * @param {Object} props.countriesData - GeoJSON FeatureCollection with countries
 * @param {Object} props.mapInstance - Map instance from useMapInstance hook
 * @param {string} props.selectedCountry - Currently selected country name
 * @param {string} props.hoveredCountry - Currently hovered country name
 * @param {Function} props.onCountrySelect - Callback for country selection
 * @param {Function} props.onCountryHover - Callback for country hover
 * @param {Function} props.onPan - Pan handler function
 * @param {Function} props.onZoom - Zoom handler function
 * @param {Function} props.onResetView - Reset view handler function
 * @param {string} props.tileLayer - Tile layer to use
 * @param {string} props.className - Additional CSS classes
 * @returns {JSX.Element} MapContainer component
 */
const MapContainerComponent = memo(({ 
  countriesData,
  mapInstance,
  selectedCountry,
  hoveredCountry,
  onCountrySelect,
  onCountryHover,
  onPan,
  onZoom,
  onResetView,
  tileLayer = 'cartoVoyager',
  className = ''
}) => {
  const mapContainerRef = useRef(null);

  // Set up global reset handler for MapControls
  useEffect(() => {
    window.mapResetHandler = onResetView;
    return () => {
      delete window.mapResetHandler;
    };
  }, [onResetView]);

  return (
    <div className={`relative h-full w-full ${className}`} ref={mapContainerRef}>
      <MapContainer
        center={MAP_CONFIG.center}
        zoom={MAP_CONFIG.zoom}
        minZoom={MAP_CONFIG.minZoom}
        maxZoom={MAP_CONFIG.maxZoom}
        zoomControl={MAP_CONFIG.zoomControl}
        attributionControl={MAP_CONFIG.attributionControl}
        worldCopyJump={MAP_CONFIG.worldCopyJump}
        maxBounds={MAP_CONFIG.maxBounds}
        maxBoundsViscosity={MAP_CONFIG.maxBoundsViscosity}
        className="h-full w-full z-0"
        whenCreated={(instance) => {
          console.log('MapContainer whenCreated called with instance:', instance);
          if (globalMapInstance) {
            console.warn('Global map instance already exists, destroying duplicate');
            instance.remove();
            return;
          }
          
          globalMapInstance = instance;
          mapInstance.handleMapCreated(instance);
        }}
        whenDestroyed={(instance) => {
          globalMapInstance = null;
          mapInstance.handleMapDestroyed();
        }}
        // Performance optimizations
        preferCanvas={MAP_CONFIG.preferCanvas}
        zoomSnap={MAP_CONFIG.zoomSnap}
        zoomDelta={MAP_CONFIG.zoomDelta}
        wheelPxPerZoomLevel={MAP_CONFIG.wheelPxPerZoomLevel}
        // Prevent multiple instances with stable key
        key="world-map-container-stable"
        // Force single instance
        style={{ height: '100%', width: '100%' }}
      >
        {/* Base tile layer */}
        <TileLayerConfig tileLayer={tileLayer} />
        
        {/* World countries layer */}
        <WorldMap
          countriesData={countriesData}
          mapInstance={mapInstance.mapInstance}
          selectedCountry={selectedCountry}
          hoveredCountry={hoveredCountry}
          onCountrySelect={onCountrySelect}
          onCountryHover={onCountryHover}
        />
      </MapContainer>
      
      {/* Custom map controls */}
      <MapControls
        onPan={onPan}
        onZoom={onZoom}
      />
      
    </div>
  );
});

MapContainerComponent.displayName = 'MapContainer';

export default MapContainerComponent;
