"use client";
import { useEarthCharter } from './hooks/useEarthCharter';
import {
  AuthenticationWrapper,
  SignedCharterView,
  CharterSigningFlow
} from './components';

export default function EarthCharterPage() {
  const {
    user,
    loading,
    isSigningMode,
    signatureText,
    isSigning,
    scrollOpened,
    scrollHeight,
    setSignatureText,
    openScroll,
    startSigning,
    cancelSigning,
    handleSignature,
    goHome
  } = useEarthCharter();

  return (
    <AuthenticationWrapper user={user} loading={loading}>
      {user?.earthCharterSigned ? (
        <SignedCharterView user={user} onGoHome={goHome} />
      ) : (
        <CharterSigningFlow
          user={user}
          scrollOpened={scrollOpened}
          scrollHeight={scrollHeight}
          isSigningMode={isSigningMode}
          signatureText={signatureText}
          isSigning={isSigning}
          onOpen={openScroll}
          onStartSigning={startSigning}
          onSignatureChange={setSignatureText}
          onSign={handleSignature}
          onCancel={cancelSigning}
        />
      )}
    </AuthenticationWrapper>
  );
}
