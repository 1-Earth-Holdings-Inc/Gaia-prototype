/**
 * Custom hook for fetching and managing countries GeoJSON data
 */

import { useState, useEffect, useCallback } from 'react';
import { fetchCountriesData } from '../services/countriesApi';

/**
 * Custom hook to fetch and manage countries data
 * @returns {Object} Countries data state and methods
 */
export const useCountriesData = () => {
  const [countriesData, setCountriesData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastFetch, setLastFetch] = useState(null);

  /**
   * Fetch countries data from the API
   */
  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      console.log('Fetching countries data...');
      const data = await fetchCountriesData();
      
      setCountriesData(data);
      setLastFetch(new Date());
      setLoading(false);
      
      console.log(`Successfully loaded ${data.features?.length || 0} countries`);
      
    } catch (err) {
      console.error('Error fetching countries data:', err);
      setError(err.message || 'Failed to load countries data');
      setLoading(false);
    }
  }, []);

  /**
   * Refresh the countries data
   */
  const refreshData = useCallback(() => {
    fetchData();
  }, [fetchData]);

  /**
   * Clear the countries data
   */
  const clearData = useCallback(() => {
    setCountriesData(null);
    setError(null);
    setLastFetch(null);
  }, []);

  // Fetch data on mount
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return {
    countriesData,
    loading,
    error,
    lastFetch,
    refreshData,
    clearData,
    isDataLoaded: !!countriesData && !loading && !error
  };
};


