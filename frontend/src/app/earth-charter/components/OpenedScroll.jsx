"use client";
import WoodenRod from './WoodenRod';
import ParchmentTexture from './ParchmentTexture';
import CharterHeader from './CharterHeader';
import CharterText from './CharterText';
import SigningSection from './SigningSection';
import { scrollStyles } from '../utils/charterUtils';

export default function OpenedScroll({ 
  user,
  scrollHeight,
  isSigningMode,
  signatureText,
  isSigning,
  onStartSigning,
  onSignatureChange,
  onSign,
  onCancel
}) {
  return (
    <div className="w-full max-w-3xl animate-in slide-in-from-top duration-700">
      {/* Top wooden rod - Animated entrance */}
      <WoodenRod animationClass="animate-in slide-in-from-top duration-500 delay-200" />
      
      {/* Main Scroll Content - Animated Unroll */}
      <div 
        className="bg-gradient-to-br from-yellow-50 to-amber-100 shadow-2xl border-4 border-amber-800 relative overflow-hidden my-4"
        style={{
          background: scrollStyles.background,
          transform: `scaleY(${scrollHeight / 100})`,
          transformOrigin: 'top',
          transition: 'transform 1.5s cubic-bezier(0.4, 0, 0.2, 1)'
        }}
      >
        {/* Aged parchment texture overlay */}
        <ParchmentTexture />
        
        {/* Content */}
        <div className="p-12 relative z-10">
          {/* Header with user's name */}
          <CharterHeader 
            user={user} 
            animationClass="animate-in fade-in duration-1000 delay-500" 
          />

          {/* Charter Text */}
          <CharterText animationClass="animate-in fade-in duration-1000 delay-700" />

          {/* Signing Section */}
          <SigningSection
            user={user}
            isSigningMode={isSigningMode}
            signatureText={signatureText}
            isSigning={isSigning}
            onStartSigning={onStartSigning}
            onSignatureChange={onSignatureChange}
            onSign={onSign}
            onCancel={onCancel}
            animationClass="animate-in fade-in duration-1000 delay-1000"
          />
        </div>
      </div>
      
      {/* Bottom wooden rod */}
      <WoodenRod position="bottom" />
    </div>
  );
}
