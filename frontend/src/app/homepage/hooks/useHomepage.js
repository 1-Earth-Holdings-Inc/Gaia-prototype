import { useEffect } from 'react';
import { useAuth } from '@/shared/context/AuthContext';

/**
 * Custom hook for homepage logic
 */
export const useHomepage = () => {
  const { user, loading } = useAuth();

  useEffect(() => {
    // Check if this is a new user and open profile sidebar
    const isNewUser = sessionStorage.getItem('newUser');
    if (isNewUser) {
      sessionStorage.removeItem('newUser');
      window.dispatchEvent(new CustomEvent('openProfileSidebar'));
    }
  }, []);

  const openProfileSidebar = () => {
    window.dispatchEvent(new CustomEvent('openProfileSidebar'));
  };

  return {
    user,
    loading,
    openProfileSidebar
  };
};
