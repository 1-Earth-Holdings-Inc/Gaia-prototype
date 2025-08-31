"use client";
import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { apiFetch } from '@/shared/lib/api';
import { SuccessAlert } from '@/shared/components/ui/Alert';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    const stored = typeof window !== 'undefined' ? localStorage.getItem('gaia_token') : null;
    if (stored) {
      setToken(stored);
      // Add a small delay to ensure database consistency after registration
      setTimeout(() => {
        console.log('🔄 Attempting to fetch profile with token:', stored ? 'Present' : 'Missing');
        
        apiFetch('/auth/me', { token: stored })
          .then((response) => {
            console.log('📄 Profile response:', response);
            
            // Extract user from the response data
            const userData = response.data?.user || response.user;
            
            if (!userData) {
              throw new Error('Profile response missing user data');
            }
            
            console.log('✅ Profile fetched successfully:', userData);
            setUser(userData);
          })
          .catch((error) => {
            console.error('❌ Failed to fetch user profile:', error);
            console.error('   Error details:', error.message);
            
            // Only clear token if it's an authentication error, not a "user not found" error
            if (error.message.includes('401') || error.message.includes('403')) {
              console.log('🔄 Clearing token due to auth error');
              setToken(null);
              localStorage.removeItem('gaia_token');
            } else {
              console.log('⚠️  Keeping token, but profile fetch failed');
            }
          })
          .finally(() => setLoading(false));
      }, 200); // Increased delay to 200ms
    } else {
      setLoading(false);
    }
  }, []);

  const value = useMemo(
    () => ({
      token,
      user,
      loading,
      login: async (email, password) => {
        const response = await apiFetch('/auth/login', {
          method: 'POST',
          body: { email, password },
        });
        
        // Extract token and user from the response data
        const { token: t, user: u } = response.data || response;
        
        if (!t || !u) {
          throw new Error('Login response missing token or user data');
        }
        
        console.log('🔑 Storing login token in localStorage:', t ? 'Present' : 'Missing');
        localStorage.setItem('gaia_token', t);
        setToken(t);
        setUser(u);
        
        // Verify storage
        const storedToken = localStorage.getItem('gaia_token');
        console.log('✅ Login token stored in localStorage:', storedToken ? 'Success' : 'Failed');
        setNotification({
          type: 'success',
          title: 'Welcome Back! 🌍',
          message: 'You have successfully signed in to Gaia Platform.'
        });
      },
      register: async (payload) => {
        console.log('🚀 Starting registration...');
        const response = await apiFetch('/auth/register', {
          method: 'POST',
          body: payload,
        });
        
        console.log('📄 Registration response:', response);
        
        // Extract token and user from the response data
        const { token: t, user: u } = response.data || response;
        
        console.log('🔑 Token extracted:', t ? 'Yes' : 'No');
        console.log('👤 User extracted:', u ? 'Yes' : 'No');
        
        if (!t || !u) {
          console.error('❌ Missing token or user in response:', { token: !!t, user: !!u });
          throw new Error('Registration response missing token or user data');
        }
        
        console.log('✅ Registration successful, setting token and user...');
        console.log('🔑 Storing token in localStorage:', t ? 'Present' : 'Missing');
        console.log('👤 Storing user in state:', u ? 'Present' : 'Missing');
        
        localStorage.setItem('gaia_token', t);
        setToken(t);
        setUser(u);
        
        // Verify storage
        const storedToken = localStorage.getItem('gaia_token');
        console.log('✅ Token stored in localStorage:', storedToken ? 'Success' : 'Failed');
        
        // Ensure user is set before any subsequent operations
        await new Promise(resolve => setTimeout(resolve, 100));
        
        console.log('✅ User and token set, showing notification...');
        setNotification({
          type: 'success',
          title: 'Welcome to Gaia! 🎉',
          message: 'Your account has been created successfully. Welcome to the community!'
        });
      },
      logout: () => {
        localStorage.removeItem('gaia_token');
        setToken(null);
        setUser(null);
        setNotification({
          type: 'success',
          title: 'Signed Out',
          message: 'You have been successfully signed out. Come back soon!'
        });
      },
      signEarthCharter: async () => {
        if (!token) return;
        const response = await apiFetch('/user/charter/sign', {
          method: 'POST',
          token,
        });
        
        // Extract user from the response data
        const { user: updated } = response.data || response;
        
        if (!updated) {
          throw new Error('Charter signing response missing user data');
        }
        
        setUser(updated);
        setNotification({
          type: 'success',
          title: 'Earth Charter Signed! 🌱',
          message: 'Thank you for committing to our shared values and principles.'
        });
      },
    }),
    [token, user, loading]
  );

  return (
    <AuthContext.Provider value={value}>
      {children}
      {notification && (
        <SuccessAlert
          title={notification.title}
          message={notification.message}
          duration={4000}
          onDismiss={() => setNotification(null)}
        />
      )}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}


