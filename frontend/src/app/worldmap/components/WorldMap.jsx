/**
 * WorldMap Component
 * Renders the world countries GeoJSON layer with interactions
 */

import { GeoJSON } from 'react-leaflet';
import { useCallback, useMemo } from 'react';
import { 
  getCountryStyle, 
  generateCountryPopup, 
  generateCountryTooltip 
} from '../utils/mapStyling';
import { 
  handleCountryClick, 
  handleCountryHover, 
  handleCountryMouseOut 
} from '../utils/mapInteractions';

/**
 * WorldMap Component
 * Displays world countries as interactive GeoJSON layer
 * 
 * @param {Object} props - Component props
 * @param {Object} props.countriesData - GeoJSON FeatureCollection with countries
 * @param {Object} props.mapInstance - Leaflet map instance
 * @param {string} props.selectedCountry - Currently selected country name
 * @param {string} props.hoveredCountry - Currently hovered country name
 * @param {Function} props.onCountrySelect - Callback for country selection
 * @param {Function} props.onCountryHover - Callback for country hover
 * @returns {JSX.Element} GeoJSON component or null
 */
const WorldMap = ({ 
  countriesData, 
  mapInstance, 
  selectedCountry, 
  hoveredCountry, 
  onCountrySelect, 
  onCountryHover 
}) => {
  // Memoize the style function to prevent unnecessary re-renders
  const getFeatureStyle = useCallback((feature) => {
    return getCountryStyle(feature, hoveredCountry, selectedCountry);
  }, [hoveredCountry, selectedCountry]);

  // Memoize the event handlers to prevent unnecessary re-renders
  const onEachFeature = useCallback((feature, layer) => {
    // Click event handler
    layer.on('click', (event) => {
      handleCountryClick(
        event, 
        feature, 
        mapInstance, 
        onCountrySelect, 
        selectedCountry
      );
    });

    // Hover event handlers
    layer.on('mouseover', (event) => {
      handleCountryHover(
        event, 
        feature, 
        onCountryHover, 
        getFeatureStyle
      );
    });

    layer.on('mouseout', (event) => {
      handleCountryMouseOut(
        event, 
        feature, 
        onCountryHover, 
        getFeatureStyle, 
        selectedCountry
      );
    });

    // Add beautiful popup to each country
    layer.bindPopup(generateCountryPopup(feature), {
      className: 'country-popup-vibrant',
      closeButton: true,
      autoPan: true,
      keepInView: true,
      maxWidth: 300,
      minWidth: 200
    });

    // Add elegant tooltip for hover
    layer.bindTooltip(generateCountryTooltip(feature), {
      permanent: false,
      direction: 'top',
      className: 'country-tooltip-vibrant',
      offset: [0, -10]
    });

  }, [mapInstance, selectedCountry, onCountrySelect, onCountryHover, getFeatureStyle]);

  // Don't render if no data
  if (!countriesData || !countriesData.features || countriesData.features.length === 0) {
    return null;
  }

  return (
    <GeoJSON
      data={countriesData}
      style={getFeatureStyle}
      onEachFeature={onEachFeature}
      // Performance optimizations
      key="world-countries-geojson"
      // Prevent duplicate rendering
      uniqueId={(feature) => {
        // Use a combination of properties to create unique ID
        const props = feature.properties || {};
        return `${props.name || props.NAME || props.ADMIN || 'unknown'}-${props['ISO3166-1-Alpha-3'] || props.ISO_A3 || 'unknown'}`;
      }}
      // Ensure clean rendering
      interactive={true}
      // Smooth scrolling optimizations
      smoothFactor={1.0}
      // Reduce rendering load
      simplifyFactor={1.0}
      // Better performance
      precision={5}
    />
  );
};

export default WorldMap;
