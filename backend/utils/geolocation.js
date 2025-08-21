// Geolocation utility functions

/**
 * Calculate distance between two points using Haversine formula
 * @param {number} lat1 - Latitude of first point
 * @param {number} lon1 - Longitude of first point
 * @param {number} lat2 - Latitude of second point
 * @param {number} lon2 - Longitude of second point
 * @returns {number} Distance in kilometers
 */
function calculateDistance(lat1, lon1, lat2, lon2) {
  const R = 6371; // Earth's radius in kilometers
  const dLat = toRadians(lat2 - lat1);
  const dLon = toRadians(lon2 - lon1);
  
  const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c;
  
  return distance;
}

/**
 * Convert degrees to radians
 * @param {number} degrees 
 * @returns {number} Radians
 */
function toRadians(degrees) {
  return degrees * (Math.PI / 180);
}

/**
 * Find users within a certain radius of a given location
 * @param {Object} centerLocation - { latitude, longitude }
 * @param {number} radiusKm - Radius in kilometers
 * @param {Array} users - Array of user objects with location data
 * @returns {Array} Users within the specified radius
 */
function findUsersWithinRadius(centerLocation, radiusKm, users) {
  return users.filter(user => {
    if (!user.location || !user.location.latitude || !user.location.longitude) {
      return false;
    }
    
    const distance = calculateDistance(
      centerLocation.latitude,
      centerLocation.longitude,
      user.location.latitude,
      user.location.longitude
    );
    
    return distance <= radiusKm;
  });
}

/**
 * Get approximate location name from coordinates (requires external service)
 * This is a placeholder for reverse geocoding functionality
 * @param {number} latitude 
 * @param {number} longitude 
 * @returns {Promise<string>} Location name
 */
async function reverseGeocode(latitude, longitude) {
  // This would typically use a service like Google Maps, OpenStreetMap Nominatim, etc.
  // For now, returning a placeholder
  return `Location: ${latitude.toFixed(4)}, ${longitude.toFixed(4)}`;
}

/**
 * Validate location data
 * @param {Object} location - Location object
 * @returns {boolean} Whether location is valid
 */
function isValidLocation(location) {
  if (!location || typeof location !== 'object') {
    return false;
  }
  
  const { latitude, longitude } = location;
  
  return (
    typeof latitude === 'number' &&
    typeof longitude === 'number' &&
    latitude >= -90 && latitude <= 90 &&
    longitude >= -180 && longitude <= 180
  );
}

module.exports = {
  calculateDistance,
  findUsersWithinRadius,
  reverseGeocode,
  isValidLocation
};
