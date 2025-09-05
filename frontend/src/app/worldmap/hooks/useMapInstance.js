/**
 * Custom hook for managing Leaflet map instance and interactions
 */

import { useState, useRef, useCallback, useEffect } from 'react';
import { MAP_CONFIG, panMap, zoomMap, handleKeyboardNavigation } from '../utils/mapInteractions';

/**
 * Custom hook to manage Leaflet map instance
 * @returns {Object} Map instance state and methods
 */
export const useMapInstance = () => {
  const [mapInstance, setMapInstance] = useState(null);
  const [isMapReady, setIsMapReady] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [hoveredCountry, setHoveredCountry] = useState(null);
  const mapRef = useRef(null);
  const isInitialized = useRef(false);

  /**
   * Handle map creation
   */
  const handleMapCreated = useCallback((instance) => {
    console.log('useMapInstance handleMapCreated called with instance:', instance);
    if (isInitialized.current) {
      console.warn('Map already initialized, ignoring duplicate creation');
      return;
    }
    
    console.log('Map instance created and setting state');
    setMapInstance(instance);
    setIsMapReady(true);
    mapRef.current = instance;
    isInitialized.current = true;
    console.log('Map instance state updated, isInitialized:', isInitialized.current);
  }, []);

  /**
   * Handle map destruction
   */
  const handleMapDestroyed = useCallback(() => {
    console.log('Map instance destroyed');
    if (mapRef.current) {
      mapRef.current.remove();
      mapRef.current = null;
    }
    setMapInstance(null);
    setIsMapReady(false);
    isInitialized.current = false;
  }, []);

  /**
   * Pan the map in a specific direction
   */
  const pan = useCallback((direction) => {
    console.log('Pan function called with direction:', direction, 'mapInstance:', mapInstance, 'isMapReady:', isMapReady);
    
    // If map is not ready, try again after a short delay
    if (!mapInstance || !isMapReady) {
      console.warn('Map not ready, retrying in 100ms...');
      setTimeout(() => {
        if (mapInstance && isMapReady) {
          panMap(mapInstance, direction);
        } else {
          console.warn('Map instance still not available for panning after retry');
        }
      }, 100);
      return;
    }
    
    panMap(mapInstance, direction);
  }, [mapInstance, isMapReady]);

  /**
   * Zoom the map in or out
   */
  const zoom = useCallback((direction) => {
    console.log('Zoom function called with direction:', direction, 'mapInstance:', mapInstance, 'isMapReady:', isMapReady);
    
    // If map is not ready, try again after a short delay
    if (!mapInstance || !isMapReady) {
      console.warn('Map not ready, retrying in 100ms...');
      setTimeout(() => {
        if (mapInstance && isMapReady) {
          zoomMap(mapInstance, direction);
        } else {
          console.warn('Map instance still not available for zooming after retry');
        }
      }, 100);
      return;
    }
    
    zoomMap(mapInstance, direction);
  }, [mapInstance, isMapReady]);

  /**
   * Set the selected country
   */
  const selectCountry = useCallback((countryName) => {
    setSelectedCountry(countryName);
  }, []);

  /**
   * Set the hovered country
   */
  const hoverCountry = useCallback((countryName) => {
    setHoveredCountry(countryName);
  }, []);

  /**
   * Clear selection
   */
  const clearSelection = useCallback(() => {
    setSelectedCountry(null);
  }, []);

  /**
   * Clear hover state
   */
  const clearHover = useCallback(() => {
    setHoveredCountry(null);
  }, []);

  /**
   * Reset map to initial view
   */
  const resetView = useCallback(() => {
    if (mapInstance) {
      mapInstance.setView(MAP_CONFIG.center, MAP_CONFIG.zoom);
    }
  }, [mapInstance]);

  /**
   * Get current map center
   */
  const getCurrentCenter = useCallback(() => {
    if (mapInstance) {
      return mapInstance.getCenter();
    }
    return null;
  }, [mapInstance]);

  /**
   * Get current zoom level
   */
  const getCurrentZoom = useCallback(() => {
    if (mapInstance) {
      return mapInstance.getZoom();
    }
    return null;
  }, [mapInstance]);

  /**
   * Set up keyboard navigation
   */
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (mapInstance) {
        handleKeyboardNavigation(event, mapInstance);
      }
    };

    if (isMapReady) {
      document.addEventListener('keydown', handleKeyDown);
      return () => {
        document.removeEventListener('keydown', handleKeyDown);
      };
    }
  }, [mapInstance, isMapReady]);

  /**
   * Cleanup on unmount
   */
  useEffect(() => {
    return () => {
      if (mapRef.current) {
        console.log('Cleaning up map instance on unmount');
        mapRef.current.remove();
        mapRef.current = null;
      }
      isInitialized.current = false;
    };
  }, []);

  return {
    mapInstance,
    isMapReady,
    selectedCountry,
    hoveredCountry,
    mapRef,
    handleMapCreated,
    handleMapDestroyed,
    pan,
    zoom,
    selectCountry,
    hoverCountry,
    clearSelection,
    clearHover,
    resetView,
    getCurrentCenter,
    getCurrentZoom
  };
};
