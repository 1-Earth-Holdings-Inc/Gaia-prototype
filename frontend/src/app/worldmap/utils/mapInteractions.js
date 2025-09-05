/**
 * Map Interaction Utilities
 * Handles user interactions, event handling, and map behavior
 */

/**
 * Default map configuration
 */
export const MAP_CONFIG = {
  center: [20, 0],           // Center coordinates [lat, lng]
  zoom: 3,                   // Initial zoom level (increased for partial world view)
  minZoom: 3,                // Minimum zoom level - same as initial zoom
  maxZoom: 10,               // Maximum zoom level
  zoomControl: false,        // Disable default zoom control (we'll use custom)
  attributionControl: true,  // Keep attribution control
  worldCopyJump: true,       // Enable world copy jump for infinite scrolling
  maxBounds: null,           // Remove bounds to allow infinite scrolling
  maxBoundsViscosity: 0.0,   // No bounds enforcement
  // Performance optimizations
  preferCanvas: true,        // Use canvas for better performance
  zoomSnap: 0.5,            // Smoother zoom levels
  zoomDelta: 0.5,           // Smoother zoom increments
  wheelPxPerZoomLevel: 120,  // Smoother mouse wheel zooming
  // Smooth panning
  panningInertia: true,      // Enable inertia for smooth panning
  panningInertiaOptions: {
    decay: 0.9,              // Decay rate for inertia
    maxSpeed: 3,             // Maximum pan speed
    easeLinearity: 0.1       // Smooth easing
  }
};

/**
 * Pan distance for navigation controls (in degrees)
 */
export const PAN_DISTANCE = 5; // Increased for faster, smoother scrolling

/**
 * Zoom step for zoom controls
 */
export const ZOOM_STEP = 1;

/**
 * Handle panning the map in a specific direction
 * @param {Object} mapInstance - Leaflet map instance
 * @param {string} direction - Direction to pan ('up', 'down', 'left', 'right')
 */
export const panMap = (mapInstance, direction) => {
  console.log('panMap called with direction:', direction, 'mapInstance:', mapInstance);
  if (!mapInstance) {
    console.warn('Map instance not available for panning');
    return;
  }

  const currentCenter = mapInstance.getCenter();
  console.log('Current center:', currentCenter);
  let newLat = currentCenter.lat;
  let newLng = currentCenter.lng;

  switch (direction) {
    case 'up':
      newLat = Math.min(85, newLat + PAN_DISTANCE);
      // Prevent going beyond the map boundaries
      if (newLat > 85) {
        console.log('Reached maximum latitude, cannot pan up further');
        return;
      }
      break;
    case 'down':
      newLat = Math.max(-85, newLat - PAN_DISTANCE);
      // Prevent going beyond the map boundaries
      if (newLat < -85) {
        console.log('Reached minimum latitude, cannot pan down further');
        return;
      }
      break;
    case 'left':
      newLng -= PAN_DISTANCE;
      // For infinite scrolling, let Leaflet handle the wrapping automatically
      break;
    case 'right':
      newLng += PAN_DISTANCE;
      // For infinite scrolling, let Leaflet handle the wrapping automatically
      break;
    default:
      console.warn(`Unknown pan direction: ${direction}`);
      return;
  }

  console.log('Setting new view to:', [newLat, newLng], 'zoom:', mapInstance.getZoom());
  mapInstance.setView([newLat, newLng], mapInstance.getZoom(), {
    animate: true,
    duration: 0.3, // Smooth animation duration
    easeLinearity: 0.1 // Smooth easing
  });
};

/**
 * Handle zooming the map in or out
 * @param {Object} mapInstance - Leaflet map instance
 * @param {string} direction - Direction to zoom ('in' or 'out')
 */
export const zoomMap = (mapInstance, direction) => {
  console.log('zoomMap called with direction:', direction, 'mapInstance:', mapInstance);
  if (!mapInstance) {
    console.warn('Map instance not available for zooming');
    return;
  }

  const currentZoom = mapInstance.getZoom();
  console.log('Current zoom:', currentZoom);
  let newZoom;

  if (direction === 'in') {
    newZoom = Math.min(MAP_CONFIG.maxZoom, currentZoom + ZOOM_STEP);
  } else if (direction === 'out') {
    newZoom = Math.max(MAP_CONFIG.minZoom, currentZoom - ZOOM_STEP);
    
    // Check if we're already at minimum zoom
    if (newZoom === MAP_CONFIG.minZoom && currentZoom === MAP_CONFIG.minZoom) {
      console.log('Already at minimum zoom level, cannot zoom out further');
      return;
    }
  } else {
    console.warn(`Unknown zoom direction: ${direction}`);
    return;
  }

  console.log('Setting new zoom to:', newZoom);
  mapInstance.setZoom(newZoom, {
    animate: true,
    duration: 0.3 // Smooth zoom animation
  });
};

/**
 * Fit map bounds to a specific country
 * @param {Object} mapInstance - Leaflet map instance
 * @param {Object} countryFeature - GeoJSON feature of the country
 * @param {Object} options - Options for fitting bounds
 */
export const fitMapToCountry = (mapInstance, countryFeature, options = {}) => {
  if (!mapInstance || !countryFeature) {
    console.warn('Map instance or country feature not available');
    return;
  }

  try {
    // Create a temporary layer to get bounds
    const tempLayer = L.geoJSON(countryFeature);
    const bounds = tempLayer.getBounds();
    
    // Default options
    const fitOptions = {
      padding: [20, 20],
      maxZoom: 6,
      ...options
    };

    mapInstance.fitBounds(bounds, fitOptions);
    
    // Clean up temporary layer
    tempLayer.remove();
    
  } catch (error) {
    console.error('Error fitting map to country:', error);
  }
};

/**
 * Handle country click event
 * @param {Object} event - Leaflet click event
 * @param {Object} feature - GeoJSON feature
 * @param {Object} mapInstance - Leaflet map instance
 * @param {Function} onCountrySelect - Callback function for country selection
 * @param {string} selectedCountry - Currently selected country name
 */
export const handleCountryClick = (event, feature, mapInstance, onCountrySelect, selectedCountry) => {
  const countryName = getCountryName(feature);
  
  // Toggle selection
  const newSelectedCountry = selectedCountry === countryName ? null : countryName;
  onCountrySelect(newSelectedCountry);
  
  // Fit map to country if selecting
  if (newSelectedCountry) {
    fitMapToCountry(mapInstance, feature);
  }
};

/**
 * Handle country hover event
 * @param {Object} event - Leaflet hover event
 * @param {Object} feature - GeoJSON feature
 * @param {Function} onCountryHover - Callback function for country hover
 * @param {Function} getCountryStyle - Function to get country style
 */
export const handleCountryHover = (event, feature, onCountryHover, getCountryStyle) => {
  const countryName = getCountryName(feature);
  const layer = event.target;
  
  // Set hover state
  onCountryHover(countryName);
  
  // Update layer style
  layer.setStyle(getCountryStyle(feature, countryName));
  
  // Create beautiful tooltip
  layer.bindTooltip(
    generateCountryTooltip(feature),
    {
      permanent: false,
      direction: 'top',
      className: 'country-tooltip-vibrant'
    }
  ).openTooltip();
};

/**
 * Handle country mouse out event
 * @param {Object} event - Leaflet mouse out event
 * @param {Object} feature - GeoJSON feature
 * @param {Function} onCountryHover - Callback function for country hover
 * @param {Function} getCountryStyle - Function to get country style
 * @param {string} selectedCountry - Currently selected country name
 */
export const handleCountryMouseOut = (event, feature, onCountryHover, getCountryStyle, selectedCountry) => {
  const layer = event.target;
  
  // Clear hover state
  onCountryHover(null);
  
  // Reset layer style
  layer.setStyle(getCountryStyle(feature, null, selectedCountry));
  
  // Close tooltip
  layer.closeTooltip();
};

/**
 * Get country name from feature (helper function)
 * @param {Object} feature - GeoJSON feature
 * @returns {string} Country name
 */
const getCountryName = (feature) => {
  if (!feature?.properties) {
    return 'Unknown';
  }
  
  const properties = feature.properties;
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
 * Generate country tooltip (helper function)
 * @param {Object} feature - GeoJSON feature
 * @returns {string} Tooltip HTML
 */
const generateCountryTooltip = (feature) => {
  const countryName = getCountryName(feature);
  return `<div class="font-semibold text-sm">${countryName}</div>`;
};

/**
 * Keyboard navigation handlers
 */
export const KEYBOARD_NAVIGATION = {
  // Arrow keys for panning
  ArrowUp: (mapInstance) => panMap(mapInstance, 'up'),
  ArrowDown: (mapInstance) => panMap(mapInstance, 'down'),
  ArrowLeft: (mapInstance) => panMap(mapInstance, 'left'),
  ArrowRight: (mapInstance) => panMap(mapInstance, 'right'),
  
  // Plus/minus for zooming
  '+': (mapInstance) => zoomMap(mapInstance, 'in'),
  '=': (mapInstance) => zoomMap(mapInstance, 'in'), // For keyboards without separate + key
  '-': (mapInstance) => zoomMap(mapInstance, 'out'),
  
  // Number keys for specific zoom levels
  '1': (mapInstance) => mapInstance.setZoom(1),
  '2': (mapInstance) => mapInstance.setZoom(2),
  '3': (mapInstance) => mapInstance.setZoom(3),
  '4': (mapInstance) => mapInstance.setZoom(4),
  '5': (mapInstance) => mapInstance.setZoom(5),
};

/**
 * Handle keyboard navigation
 * @param {KeyboardEvent} event - Keyboard event
 * @param {Object} mapInstance - Leaflet map instance
 */
export const handleKeyboardNavigation = (event, mapInstance) => {
  if (!mapInstance) return;
  
  const handler = KEYBOARD_NAVIGATION[event.key];
  if (handler) {
    event.preventDefault();
    handler(mapInstance);
  }
};
