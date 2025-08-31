"use client";
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { LoadingSpinner } from './index';

export default function AuthenticationWrapper({ user, loading, children }) {
  const router = useRouter();

  // Handle authentication redirect using useEffect
  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  // Don't render anything while checking authentication
  if (loading) {
    return <LoadingSpinner />;
  }

  // Don't render if no user (will redirect)
  if (!user) {
    return null;
  }

  return children;
}
