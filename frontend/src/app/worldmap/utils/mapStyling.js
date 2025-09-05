/**
 * Map Styling Utilities
 * Handles styling, colors, and visual effects for the world map
 */

/**
 * Vibrant country colors for realistic map
 */
export const COUNTRY_COLORS = {
  // North America
  'United States of America': '#4ade80',    // Green
  'Canada': '#22d3ee',                      // Cyan
  'Mexico': '#fbbf24',                      // Amber
  
  // South America
  'Brazil': '#10b981',                      // Emerald
  'Argentina': '#f59e0b',                   // Orange
  'Chile': '#ef4444',                       // Red
  
  // Europe
  'France': '#8b5cf6',                      // Violet
  'Germany': '#6366f1',                     // Indigo
  'United Kingdom': '#ec4899',              // Pink
  'Spain': '#f97316',                       // Orange
  'Italy': '#84cc16',                       // Lime
  
  // Asia
  'China': '#dc2626',                       // Red
  'India': '#059669',                       // Emerald
  'Japan': '#7c3aed',                       // Purple
  'Russia': '#1e40af',                      // Blue
  
  // Africa
  'South Africa': '#d97706',                // Amber
  'Nigeria': '#16a34a',                     // Green
  'Egypt': '#ca8a04',                       // Yellow
  
  // Oceania
  'Australia': '#dc2626',                   // Red
  'New Zealand': '#0891b2',                 // Cyan
};

/**
 * Default country styling configuration - vibrant and realistic
 */
export const DEFAULT_COUNTRY_STYLE = {
  fillColor: '#e2e8f0',      // Light gray for unknown countries
  weight: 1,                  // Visible border
  opacity: 1,                 // Full border opacity
  color: '#64748b',           // Slate border color
  dashArray: '',              // No dash pattern
  fillOpacity: 0.8            // Good fill opacity for visibility
};

/**
 * Hover state styling for countries - vibrant highlight
 */
export const HOVER_COUNTRY_STYLE = {
  fillColor: '#fbbf24',       // Bright gold for hover
  weight: 2,                  // Thicker border for emphasis
  opacity: 1,                 // Full opacity
  color: '#d97706',           // Darker gold border
  dashArray: '',              // No dash pattern
  fillOpacity: 0.9            // High fill opacity for vibrant effect
};

/**
 * Selected/clicked country styling - vibrant selection
 */
export const SELECTED_COUNTRY_STYLE = {
  fillColor: '#f59e0b',       // Bright amber for selected
  weight: 3,                  // Very thick border for emphasis
  opacity: 1,                 // Full opacity
  color: '#92400e',           // Dark amber border
  dashArray: '',              // No dash pattern
  fillOpacity: 0.95           // Very high fill opacity for vibrant effect
};

/**
 * Generate a style object for a country based on its state
 * @param {Object} feature - GeoJSON feature
 * @param {string} hoveredCountry - Name of currently hovered country
 * @param {string} selectedCountry - Name of currently selected country
 * @returns {Object} Leaflet style object
 */
export const getCountryStyle = (feature, hoveredCountry = null, selectedCountry = null) => {
  const countryName = getCountryName(feature);
  
  // Check if this country is selected
  if (selectedCountry && countryName === selectedCountry) {
    return SELECTED_COUNTRY_STYLE;
  }
  
  // Check if this country is being hovered
  if (hoveredCountry && countryName === hoveredCountry) {
    return HOVER_COUNTRY_STYLE;
  }
  
  // Default styling - vibrant colors for each country
  const countryColor = COUNTRY_COLORS[countryName] || getRandomVibrantColor(countryName);
  
  return {
    fillColor: countryColor,    // Vibrant country-specific color
    weight: 1,                  // Visible border
    opacity: 1,                 // Full border opacity
    color: '#374151',           // Dark border for contrast
    dashArray: '',              // No dash pattern
    fillOpacity: 0.8            // Good fill opacity for vibrant effect
  };
};

/**
 * Generate a random vibrant color for unknown countries
 * @param {string} countryName - Name of the country
 * @returns {string} Hex color code
 */
const getRandomVibrantColor = (countryName) => {
  const vibrantColors = [
    '#ef4444', '#f97316', '#f59e0b', '#eab308', '#84cc16', '#22c55e',
    '#10b981', '#14b8a6', '#06b6d4', '#0ea5e9', '#3b82f6', '#6366f1',
    '#8b5cf6', '#a855f7', '#d946ef', '#ec4899', '#f43f5e'
  ];
  
  // Use country name to get consistent color
  let hash = 0;
  for (let i = 0; i < countryName.length; i++) {
    hash = countryName.charCodeAt(i) + ((hash << 5) - hash);
  }
  
  return vibrantColors[Math.abs(hash) % vibrantColors.length];
};

/**
 * Extract country name from a GeoJSON feature
 * @param {Object} feature - GeoJSON feature
 * @returns {string} Country name or 'Unknown'
 */
export const getCountryName = (feature) => {
  if (!feature?.properties) {
    return 'Unknown';
  }
  
  const properties = feature.properties;
  
  // Try different possible name fields in order of preference
  const nameFields = ['name', 'NAME', 'NAME_EN', 'COUNTRY', 'country', 'ADMIN', 'admin'];
  
  for (const field of nameFields) {
    const value = properties[field];
    if (value && typeof value === 'string' && value.trim()) {
      return value.trim();
    }
  }
  
  return 'Unknown';
};

/**
 * Generate a popup content for a country
 * @param {Object} feature - GeoJSON feature
 * @returns {string} HTML content for the popup
 */
export const generateCountryPopup = (feature) => {
  const countryName = getCountryName(feature);
  const properties = feature.properties || {};
  
  // Try to get additional information from your GeoJSON structure
  const iso3 = properties['ISO3166-1-Alpha-3'] || properties.ISO_A3;
  const iso2 = properties['ISO3166-1-Alpha-2'] || properties.ISO_A2;
  
  let popupContent = `
    <div class="country-popup">
      <h3 class="font-bold text-lg text-gray-800 mb-2">${countryName}</h3>
  `;
  
  if (iso3) {
    popupContent += `<p class="text-sm text-gray-600 mb-1"><strong>ISO Code:</strong> ${iso3}</p>`;
  }
  
  if (iso2) {
    popupContent += `<p class="text-sm text-gray-600 mb-1"><strong>Country Code:</strong> ${iso2}</p>`;
  }
  
  popupContent += `
      <p class="text-xs text-gray-500 mt-2">Click to zoom to this country</p>
    </div>
  `;
  
  return popupContent;
};

/**
 * Generate a tooltip content for a country
 * @param {Object} feature - GeoJSON feature
 * @returns {string} HTML content for the tooltip
 */
export const generateCountryTooltip = (feature) => {
  const countryName = getCountryName(feature);
  return `<div class="font-semibold text-sm">${countryName}</div>`;
};

/**
 * Color palette for different map themes
 */
export const MAP_THEMES = {
  default: {
    background: '#f8fafc',
    country: '#e2e8f0',
    border: '#64748b',
    hover: '#fbbf24',
    selected: '#f59e0b'
  },
  dark: {
    background: '#1e293b',
    country: '#334155',
    border: '#64748b',
    hover: '#fbbf24',
    selected: '#f59e0b'
  },
  vibrant: {
    background: '#fef3c7',
    country: '#dbeafe',
    border: '#3b82f6',
    hover: '#fbbf24',
    selected: '#f59e0b'
  }
};

/**
 * Get theme colors
 * @param {string} themeName - Name of the theme
 * @returns {Object} Theme color object
 */
export const getThemeColors = (themeName = 'default') => {
  return MAP_THEMES[themeName] || MAP_THEMES.default;
};

/**
 * Generate CSS classes for map styling
 * @param {string} themeName - Name of the theme
 * @returns {string} CSS classes
 */
export const getMapCSSClasses = (themeName = 'default') => {
  const theme = getThemeColors(themeName);
  
  return `
    .leaflet-container {
      background-color: ${theme.background} !important;
    }
    
    .country-popup {
      font-family: system-ui, -apple-system, sans-serif;
    }
    
    .country-popup h3 {
      color: ${theme.border};
    }
  `;
};
