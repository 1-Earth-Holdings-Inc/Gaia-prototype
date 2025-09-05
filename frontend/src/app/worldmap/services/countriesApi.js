/**
 * Countries API Service
 * Handles communication with the backend for world countries GeoJSON data
 */

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE || 'http://localhost:5001/api';

/**
 * Fetch world countries GeoJSON data from the backend
 * @returns {Promise<Object>} GeoJSON FeatureCollection with world countries
 */
export const fetchCountriesData = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/countries`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      // Add cache control for better performance
      cache: 'force-cache',
      next: { revalidate: 3600 } // Revalidate every hour
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    
    // Validate the response structure
    if (!result.success || !result.data) {
      throw new Error('Invalid API response format');
    }

    // Validate GeoJSON structure
    const geoJsonData = result.data;
    if (geoJsonData.type !== 'FeatureCollection' || !Array.isArray(geoJsonData.features)) {
      throw new Error('Invalid GeoJSON format received from API');
    }

    console.log(`Successfully fetched ${geoJsonData.features.length} countries from API`);
    return geoJsonData;

  } catch (error) {
    console.error('Error fetching countries data:', error);
    
    // Fallback: try to load from local public directory
    try {
      console.log('Attempting fallback to local GeoJSON file...');
      const fallbackResponse = await fetch('/data/world.geojson');
      
      if (!fallbackResponse.ok) {
        throw new Error(`Fallback failed: ${fallbackResponse.status}`);
      }
      
      const fallbackData = await fallbackResponse.json();
      console.log(`Fallback successful: loaded ${fallbackData.features?.length || 0} countries from local file`);
      return fallbackData;
      
    } catch (fallbackError) {
      console.error('Fallback also failed:', fallbackError);
      throw new Error(`Failed to load countries data: ${error.message}`);
    }
  }
};

/**
 * Fetch countries statistics from the backend
 * @returns {Promise<Object>} Statistics about the countries data
 */
export const fetchCountriesStats = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/countries/stats`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    
    if (!result.success || !result.data) {
      throw new Error('Invalid API response format');
    }

    return result.data;

  } catch (error) {
    console.error('Error fetching countries stats:', error);
    throw new Error(`Failed to load countries statistics: ${error.message}`);
  }
};

/**
 * Get country by name from the GeoJSON data
 * @param {Object} geoJsonData - The GeoJSON FeatureCollection
 * @param {string} countryName - Name of the country to find
 * @returns {Object|null} The country feature or null if not found
 */
export const findCountryByName = (geoJsonData, countryName) => {
  if (!geoJsonData?.features || !Array.isArray(geoJsonData.features)) {
    return null;
  }

  return geoJsonData.features.find(feature => {
    const properties = feature.properties || {};
    
    // Check multiple possible name fields
    const nameFields = ['name', 'NAME', 'NAME_EN', 'COUNTRY', 'country'];
    
    return nameFields.some(field => {
      const value = properties[field];
      return value && value.toLowerCase() === countryName.toLowerCase();
    });
  }) || null;
};

/**
 * Get all unique country names from the GeoJSON data
 * @param {Object} geoJsonData - The GeoJSON FeatureCollection
 * @returns {Array<string>} Array of country names
 */
export const getAllCountryNames = (geoJsonData) => {
  if (!geoJsonData?.features || !Array.isArray(geoJsonData.features)) {
    return [];
  }

  const names = new Set();
  
  geoJsonData.features.forEach(feature => {
    const properties = feature.properties || {};
    
    // Try to get the best name field
    const nameFields = ['name', 'NAME', 'NAME_EN', 'COUNTRY', 'country'];
    
    for (const field of nameFields) {
      const value = properties[field];
      if (value && typeof value === 'string' && value.trim()) {
        names.add(value.trim());
        break;
      }
    }
  });

  return Array.from(names).sort();
};
