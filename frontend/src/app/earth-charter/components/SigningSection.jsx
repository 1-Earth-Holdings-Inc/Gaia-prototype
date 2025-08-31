"use client";
import { formatUserName, charterTextContent } from '../utils/charterUtils';

export default function SigningSection({ 
  user, 
  isSigningMode, 
  signatureText, 
  isSigning,
  onStartSigning, 
  onSignatureChange, 
  onSign, 
  onCancel,
  animationClass = '' 
}) {
  if (!isSigningMode) {
    return (
      <div className={`text-center mt-12 pt-8 border-t-2 border-amber-700 ${animationClass}`}>
        <button 
          onClick={onStartSigning}
          className="px-12 py-4 text-xl text-white bg-gradient-to-r from-amber-700 to-amber-900 border-2 border-amber-900 hover:from-amber-800 hover:to-amber-950 transition-all duration-300 shadow-lg transform hover:scale-105"
          style={{ fontFamily: 'Cinzel, serif', borderRadius: '4px' }}
        >
          ⚔️ Accept thy Sacred Calling ⚔️
        </button>
      </div>
    );
  }

  return (
    <div className="mt-12 pt-8 border-t-2 border-amber-700 bg-gradient-to-br from-amber-50 to-yellow-50 p-6 border-2 border-amber-600 rounded-lg">
      {/* Header */}
      <div className="text-center mb-6">
        <h3 className="text-2xl text-amber-900 font-bold">
          SIGN THY SACRED OATH
        </h3>
      </div>
      
      <div className="max-w-xl mx-auto space-y-4">
        {/* Declaration */}
        <div className="text-center">
          <p className="text-amber-800">
            By mine own hand and sacred word, I, <span className="font-bold text-amber-900">{formatUserName(user)}</span>, do solemnly swear:
          </p>
        </div>
        
        {/* Oath Text */}
        <div className="bg-yellow-50 p-4 border-2 border-amber-300 rounded-lg text-center">
          {charterTextContent.oath.map((line, index) => (
            <p key={index} className="text-amber-800 italic">"{line}"</p>
          ))}
        </div>
        
        {/* Signature Input */}
        <div className="pt-4 border-t border-amber-300">
          <p className="text-sm text-amber-700 mb-2 text-center">Sign below to confirm your oath:</p>
          <input 
            type="text"
            value={signatureText}
            onChange={(e) => onSignatureChange(e.target.value)}
            placeholder={`${user.firstName} ${user.lastName}`}
            className="w-full px-4 py-3 border-2 border-amber-700 bg-yellow-50 text-center rounded-lg focus:border-amber-900 focus:outline-none"
          />
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4 justify-center pt-2">
          <button 
            onClick={onSign}
            disabled={isSigning || !signatureText.trim()}
            className="px-6 py-3 text-white bg-gradient-to-r from-emerald-600 to-emerald-800 border-2 border-emerald-700 hover:from-emerald-700 hover:to-emerald-900 transition-all duration-200 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed font-normal"
          >
            {isSigning ? '⏳ Sealing...' : 'BECOME A PLANETARIAN'}
          </button>
          
          <button 
            onClick={onCancel}
            className="px-6 py-3 text-amber-900 bg-yellow-100 border-2 border-amber-700 hover:bg-yellow-200 transition-all duration-200 rounded-lg font-normal"
          >
            DECLINE
          </button>
        </div>
      </div>
    </div>
  );
}
