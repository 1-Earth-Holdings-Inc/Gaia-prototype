/**
 * Geolocation utilities for registration form
 */

export const requestGeolocation = () => {
  return new Promise((resolve) => {
    if (!navigator.geolocation) {
      resolve(null);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          accuracy: position.coords.accuracy,
          timestamp: new Date()
        });
      },
      (error) => {
        console.log('Geolocation error:', error);
        resolve(null);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 60000
      }
    );
  });
};

export const formatLocationForDisplay = (location) => {
  if (!location) return 'Location not available';
  
  return `${location.latitude.toFixed(6)}, ${location.longitude.toFixed(6)}`;
};

export const getLocationAccuracyLevel = (accuracy) => {
  if (accuracy <= 10) return 'High';
  if (accuracy <= 100) return 'Medium';
  return 'Low';
};
