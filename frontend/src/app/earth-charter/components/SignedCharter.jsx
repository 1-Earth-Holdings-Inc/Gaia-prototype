"use client";
import WoodenRod from './WoodenRod';
import ParchmentTexture from './ParchmentTexture';
import CharterHeader from './CharterHeader';
import CharterText from './CharterText';
import SignatureConfirmation from './SignatureConfirmation';
import { scrollStyles } from '../utils/charterUtils';

export default function SignedCharter({ user, onGoHome }) {
  return (
    <div className="max-w-3xl mx-auto flex flex-col items-center">
      {/* Top wooden rod */}
      <WoodenRod />
      
      {/* Main Scroll Content - Same styling as original */}
      <div className="w-full bg-gradient-to-br from-yellow-50 to-amber-100 shadow-2xl border-4 border-amber-800 relative overflow-hidden my-4" style={{
        background: scrollStyles.background
      }}>
        {/* Aged parchment texture overlay */}
        <ParchmentTexture />
        
        {/* Content */}
        <div className="p-12 relative z-10">
          {/* Header with user's name */}
          <CharterHeader user={user} />

          {/* Charter Text - Same content as original */}
          <CharterText />
          
          {/* Signature Confirmation */}
          <SignatureConfirmation user={user} />
        </div>
        
        {/* Bottom wooden rod */}
        <WoodenRod position="bottom" />
      </div>
      
      {/* Return Button */}
      <div className="mt-8 text-center">
        <button 
          onClick={onGoHome}
          className="px-8 py-4 text-xl text-white bg-gradient-to-r from-amber-700 to-amber-900 border-2 border-amber-900 hover:from-amber-800 hover:to-amber-950 transition-all duration-300 shadow-lg rounded-lg"
          style={{ fontFamily: 'Cinzel, serif' }}
        >
          Return to Home
        </button>
      </div>
    </div>
  );
}
