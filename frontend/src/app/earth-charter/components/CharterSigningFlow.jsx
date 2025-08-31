"use client";
import { ClosedScroll, OpenedScroll, GoogleFonts } from './index';
import { scrollStyles } from '../utils/charterUtils';

export default function CharterSigningFlow({
  user,
  scrollOpened,
  scrollHeight,
  isSigningMode,
  signatureText,
  isSigning,
  onOpen,
  onStartSigning,
  onSignatureChange,
  onSign,
  onCancel
}) {
  return (
    <div className="min-h-screen py-12 px-4" style={{
      backgroundImage: scrollStyles.pageBackground
    }}>
      <div className="max-w-2xl mx-auto flex flex-col items-center">
        
        {/* Closed Scroll */}
        {!scrollOpened && (
          <ClosedScroll user={user} onOpen={onOpen} />
        )}

        {/* Opened Scroll with Animation */}
        {scrollOpened && (
          <OpenedScroll
            user={user}
            scrollHeight={scrollHeight}
            isSigningMode={isSigningMode}
            signatureText={signatureText}
            isSigning={isSigning}
            onStartSigning={onStartSigning}
            onSignatureChange={onSignatureChange}
            onSign={onSign}
            onCancel={onCancel}
          />
        )}
      </div>

      <GoogleFonts />
    </div>
  );
}
