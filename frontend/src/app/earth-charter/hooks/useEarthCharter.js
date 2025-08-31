import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/shared/context/AuthContext';
import { validateSignature } from '../utils/charterUtils';

/**
 * Custom hook for Earth Charter logic
 */
export const useEarthCharter = () => {
  const router = useRouter();
  const { user, signEarthCharter, loading } = useAuth();
  const [isSigningMode, setIsSigningMode] = useState(false);
  const [signatureText, setSignatureText] = useState('');
  const [isSigning, setIsSigning] = useState(false);
  const [scrollOpened, setScrollOpened] = useState(false);
  const [scrollHeight, setScrollHeight] = useState(0);

  const openScroll = () => {
    setScrollOpened(true);
    // Animate scroll height
    setTimeout(() => setScrollHeight(100), 100);
  };

  const startSigning = () => {
    setIsSigningMode(true);
  };

  const cancelSigning = () => {
    setIsSigningMode(false);
    setSignatureText('');
  };

  const handleSignature = async () => {
    const validation = validateSignature(signatureText, user);
    
    if (!validation.isValid) {
      alert(validation.error);
      return;
    }
    
    setIsSigning(true);
    try {
      await signEarthCharter();
      router.push('/');
    } catch (error) {
      console.error('Failed to sign Earth Charter:', error);
      alert('The signing hath failed. Try once more, noble soul.');
    } finally {
      setIsSigning(false);
    }
  };

  const goHome = () => {
    router.push('/');
  };

  return {
    // State
    user,
    loading,
    isSigningMode,
    signatureText,
    isSigning,
    scrollOpened,
    scrollHeight,
    
    // Actions
    setSignatureText,
    openScroll,
    startSigning,
    cancelSigning,
    handleSignature,
    goHome
  };
};
