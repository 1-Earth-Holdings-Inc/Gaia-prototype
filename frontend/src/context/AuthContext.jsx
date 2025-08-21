"use client";
import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { apiFetch } from '@/lib/api';
import { SuccessAlert } from '@/components/ui/Alert';

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
      apiFetch('/auth/me', { token: stored })
        .then((d) => setUser(d.user))
        .catch(() => setToken(null))
        .finally(() => setLoading(false));
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
        const { token: t, user: u } = await apiFetch('/auth/login', {
          method: 'POST',
          body: { email, password },
        });
        localStorage.setItem('gaia_token', t);
        setToken(t);
        setUser(u);
        setNotification({
          type: 'success',
          title: 'Welcome Back! 🌍',
          message: 'You have successfully signed in to Gaia Platform.'
        });
      },
      register: async (payload) => {
        const { token: t, user: u } = await apiFetch('/auth/register', {
          method: 'POST',
          body: payload,
        });
        localStorage.setItem('gaia_token', t);
        setToken(t);
        setUser(u);
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
        const { user: updated } = await apiFetch('/user/charter/sign', {
          method: 'POST',
          token,
        });
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


