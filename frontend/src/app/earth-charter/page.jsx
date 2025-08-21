"use client";
import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import Head from 'next/head';

export default function EarthCharterPage() {
  const { user, signEarthCharter, loading } = useAuth();
  const router = useRouter();
  const [isSigningMode, setIsSigningMode] = useState(false);
  const [signatureText, setSignatureText] = useState('');
  const [isSigning, setIsSigning] = useState(false);
  const [scrollOpened, setScrollOpened] = useState(false);
  const [scrollHeight, setScrollHeight] = useState(0);

  // Handle authentication redirect using useEffect
  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  // Don't render anything while checking authentication
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-amber-50 to-yellow-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-amber-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-amber-800 text-xl font-semibold">Loading Earth Charter...</p>
        </div>
      </div>
    );
  }

  // Don't render if no user (will redirect)
  if (!user) {
    return null;
  }

  if (user?.earthCharterSigned) {
    return (
      <div className="min-h-screen py-12 px-4" style={{
        backgroundImage: `
          radial-gradient(circle at 25% 25%, rgba(210, 180, 140, 0.3) 0%, transparent 50%),
          radial-gradient(circle at 75% 75%, rgba(245, 222, 179, 0.3) 0%, transparent 50%),
          linear-gradient(135deg, #F5DEB3 0%, #F4A460 50%, #DEB887 100%)
        `
      }}>
        <div className="max-w-3xl mx-auto flex flex-col items-center">
          
          {/* Top wooden rod */}
          <div className="w-full h-8 bg-gradient-to-r from-amber-900 via-amber-800 to-amber-700 rounded-full shadow-2xl border-2 border-amber-950 mb-4 relative">
            <div className="absolute inset-0 bg-gradient-to-b from-amber-950 to-transparent opacity-30 rounded-full"></div>
            <div className="absolute -left-2 top-1/2 transform -translate-y-1/2 w-4 h-6 bg-amber-950 rounded-full shadow-lg"></div>
            <div className="absolute -right-2 top-1/2 transform -translate-y-1/2 w-4 h-6 bg-amber-950 rounded-full shadow-lg"></div>
          </div>
          
          {/* Main Scroll Content - Same styling as original */}
          <div className="w-full bg-gradient-to-br from-yellow-50 to-amber-100 shadow-2xl border-4 border-amber-800 relative overflow-hidden" style={{
            background: `
              linear-gradient(135deg, #F5F5DC 0%, #F5DEB3 25%, #DEB887 50%, #D2B48C 75%, #BC8F8F 100%),
              radial-gradient(circle at 20% 20%, rgba(139, 69, 19, 0.15) 0%, transparent 30%),
              radial-gradient(circle at 80% 20%, rgba(160, 82, 45, 0.12) 0%, transparent 30%),
              radial-gradient(circle at 40% 60%, rgba(210, 180, 140, 0.2) 0%, transparent 40%),
              radial-gradient(circle at 60% 40%, rgba(245, 222, 179, 0.1) 0%, transparent 40%),
              url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23A0522D' fill-opacity='0.08'%3E%3Cpath d='M30 30c0-16.569 13.431-30 30-30v60C46.569 60 30 46.569 30 30z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")
            `
          }}>
            {/* Aged parchment texture overlay */}
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute top-10 left-10 w-16 h-8 bg-amber-800 opacity-20 rounded-full blur-sm"></div>
              <div className="absolute top-32 right-16 w-12 h-6 bg-amber-700 opacity-25 rounded-full blur-sm"></div>
              <div className="absolute bottom-20 left-20 w-20 h-10 bg-amber-900 opacity-15 rounded-full blur-sm"></div>
            </div>
            
            {/* Content */}
            <div className="p-12 relative z-10">
              {/* Header with user's name */}
              <div className="text-center mb-12">
                <h1 className="text-5xl mb-6 text-amber-900" style={{ 
                  fontFamily: 'var(--font-unifraktur-maguntia)',
                  lineHeight: '1.2'
                }}>
                  Dear Guardian,
                </h1>
                <p className="text-2xl text-amber-800 mb-4" style={{ fontFamily: 'var(--font-unifraktur-cook)', fontWeight: '700' }}>
                  A special message for <span className="font-bold text-amber-900">{user.firstName.toUpperCase()} {user.lastName.toUpperCase()}</span>
                </p>
              </div>

              {/* Charter Text - Same content as original */}
              <div className="text-amber-900 leading-relaxed text-lg space-y-6" style={{ 
                fontFamily: 'var(--font-unifraktur-cook)',
                fontSize: '1.25rem'
              }}>
                <p className="text-center mb-8">
                  Thou art hereby invited to join ranks with the Knights of Gaia and pledge thy sacred oath to our Mother Earth. Here thou wilt be greeted with wisdom of ancient ways, knowledge of the natural world, and sacred bonds that tie all living beings to the eternal cycle of life.
                </p>

                <p className="text-center mb-8">
                  By the power vested in us by the ancient spirits of forest, mountain, and sea, we call upon thee to become a Guardian of the Sacred Realm. Shouldst thou accept this calling, thy name shall be inscribed in the Great Book of Planetarians, and thou shalt be granted the title of Earth's Protector.
                </p>

                <p className="text-center mb-8">
                  Upon reading this scroll, please tell thy local Earth Knight if thou wilt or wilt not take up our offering of peace, harmony, and sacred duty to preserve the natural order for generations yet unborn.
                </p>

                <div className="text-center mt-12 mb-8">
                  <p className="text-2xl" style={{ fontFamily: 'var(--font-unifraktur-maguntia)', fontWeight: '600' }}>
                    Yours truly,
                  </p>
                  <p className="text-xl mt-2" style={{ fontFamily: 'var(--font-unifraktur-maguntia)', fontWeight: '600' }}>
                    King Gaia of the Sacred Order
                  </p>
                </div>
              </div>
              
              {/* Signature Confirmation */}
              <div className="mt-12 pt-8 border-t-2 border-amber-700 bg-gradient-to-r from-emerald-50 to-emerald-100 p-4 rounded-lg border-2 border-emerald-300 text-center">
                <h3 className="text-lg font-bold text-emerald-800 mb-2">Charter Signed</h3>
                <p className="text-emerald-700 text-sm mb-2">
                  Signed by <span className="font-bold">{user.firstName} {user.lastName}</span>
                </p>
                <p className="text-emerald-600 text-xs mb-2">
                  {new Date().toLocaleDateString('en-US', { 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </p>
                <div className="inline-block px-3 py-1 bg-emerald-600 text-white rounded text-sm font-medium">
                  Planetarian Status Confirmed
                </div>
              </div>
            </div>
            
            {/* Bottom wooden rod */}
            <div className="w-full h-8 bg-gradient-to-r from-amber-900 via-amber-800 to-amber-700 rounded-full shadow-2xl border-2 border-amber-950 mt-4 relative">
              <div className="absolute inset-0 bg-gradient-to-t from-amber-950 to-transparent opacity-30 rounded-full"></div>
              <div className="absolute -left-2 top-1/2 transform -translate-y-1/2 w-4 h-6 bg-amber-950 rounded-full shadow-lg"></div>
              <div className="absolute -right-2 top-1/2 transform -translate-y-1/2 w-4 h-6 bg-amber-950 rounded-full shadow-lg"></div>
            </div>
          </div>
          
          {/* Return Button */}
          <div className="mt-8 text-center">
            <button 
              onClick={() => router.push('/')}
              className="px-8 py-4 text-xl text-white bg-gradient-to-r from-amber-700 to-amber-900 border-2 border-amber-900 hover:from-amber-800 hover:to-amber-950 transition-all duration-300 shadow-lg rounded-lg"
              style={{ fontFamily: 'Cinzel, serif' }}
            >
              Return to Home
            </button>
          </div>
        </div>
      </div>
    );
  }

  const handleSign = async () => {
    if (!signatureText.trim()) {
      alert('Thou must inscribe thy name upon this sacred parchment.');
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

  return (
    <div className="min-h-screen py-12 px-4" style={{
      backgroundImage: `
        radial-gradient(circle at 25% 25%, rgba(210, 180, 140, 0.3) 0%, transparent 50%),
        radial-gradient(circle at 75% 75%, rgba(245, 222, 179, 0.3) 0%, transparent 50%),
        linear-gradient(135deg, #F5DEB3 0%, #F4A460 50%, #DEB887 100%)
      `
    }}>
      <div className="max-w-2xl mx-auto flex flex-col items-center">
        
        {/* Closed Scroll */}
        {!scrollOpened && (
          <div 
            className="cursor-pointer transform hover:scale-105 transition-all duration-300"
            onClick={() => {
              setScrollOpened(true);
              // Animate scroll height
              setTimeout(() => setScrollHeight(100), 100);
            }}
          >
            {/* Top wooden rod */}
            <div className="w-80 h-8 bg-gradient-to-r from-amber-900 via-amber-800 to-amber-700 rounded-full shadow-2xl border-2 border-amber-950 mb-2 relative">
              <div className="absolute inset-0 bg-gradient-to-b from-amber-950 to-transparent opacity-30 rounded-full"></div>
              <div className="absolute -left-2 top-1/2 transform -translate-y-1/2 w-4 h-6 bg-amber-950 rounded-full shadow-lg"></div>
              <div className="absolute -right-2 top-1/2 transform -translate-y-1/2 w-4 h-6 bg-amber-950 rounded-full shadow-lg"></div>
            </div>
            
            {/* Rolled parchment */}
            <div className="w-80 h-32 bg-gradient-to-br from-yellow-50 to-amber-100 shadow-2xl border-4 border-amber-800 relative overflow-hidden">
              {/* Parchment texture */}
              <div className="absolute inset-0 opacity-20">
                <div className="w-full h-px bg-amber-800 absolute top-1/4"></div>
                <div className="w-full h-px bg-amber-700 absolute top-1/2"></div>
                <div className="w-full h-px bg-amber-800 absolute top-3/4"></div>
              </div>
              
              {/* Royal wax seal */}
              <div className="absolute top-4 right-4 w-12 h-12 bg-gradient-to-br from-red-700 to-red-900 rounded-full border-2 border-red-950 shadow-lg">
                <div className="w-full h-full flex items-center justify-center text-white text-lg">👑</div>
              </div>
              
              {/* User's name display */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
                <h2 className="text-2xl text-amber-900 mb-2" style={{ fontFamily: 'Old Standard TT, serif', fontWeight: '700' }}>
                  Dear {user.firstName},
                </h2>
                <p className="text-amber-700 text-sm" style={{ fontFamily: 'Old Standard TT, serif' }}>
                  Click to open the Sacred Charter
                </p>
              </div>
            </div>
            
            {/* Bottom wooden rod */}
            <div className="w-80 h-8 bg-gradient-to-r from-amber-900 via-amber-800 to-amber-700 rounded-full shadow-2xl border-2 border-amber-950 mt-2 relative">
              <div className="absolute inset-0 bg-gradient-to-t from-amber-950 to-transparent opacity-30 rounded-full"></div>
              <div className="absolute -left-2 top-1/2 transform -translate-y-1/2 w-4 h-6 bg-amber-950 rounded-full shadow-lg"></div>
              <div className="absolute -right-2 top-1/2 transform -translate-y-1/2 w-4 h-6 bg-amber-950 rounded-full shadow-lg"></div>
            </div>
          </div>
        )}

        {/* Opened Scroll with Animation */}
        {scrollOpened && (
          <div className="w-full max-w-3xl animate-in slide-in-from-top duration-700">
            {/* Top wooden rod - Animated entrance */}
            <div className="w-full h-8 bg-gradient-to-r from-amber-900 via-amber-800 to-amber-700 rounded-full shadow-2xl border-2 border-amber-950 mb-4 relative animate-in slide-in-from-top duration-500 delay-200">
              <div className="absolute inset-0 bg-gradient-to-b from-amber-950 to-transparent opacity-30 rounded-full"></div>
              <div className="absolute -left-2 top-1/2 transform -translate-y-1/2 w-4 h-6 bg-amber-950 rounded-full shadow-lg"></div>
              <div className="absolute -right-2 top-1/2 transform -translate-y-1/2 w-4 h-6 bg-amber-950 rounded-full shadow-lg"></div>
            </div>
            
            {/* Main Scroll Content - Animated Unroll */}
            <div 
              className="bg-gradient-to-br from-yellow-50 to-amber-100 shadow-2xl border-4 border-amber-800 relative overflow-hidden"
              style={{
                background: `
                  linear-gradient(135deg, #F5F5DC 0%, #F5DEB3 25%, #DEB887 50%, #D2B48C 75%, #BC8F8F 100%),
                  radial-gradient(circle at 20% 20%, rgba(139, 69, 19, 0.15) 0%, transparent 30%),
                  radial-gradient(circle at 80% 20%, rgba(160, 82, 45, 0.12) 0%, transparent 30%),
                  radial-gradient(circle at 40% 60%, rgba(210, 180, 140, 0.2) 0%, transparent 40%),
                  radial-gradient(circle at 60% 40%, rgba(245, 222, 179, 0.1) 0%, transparent 40%),
                  url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23A0522D' fill-opacity='0.08'%3E%3Cpath d='M30 30c0-16.569 13.431-30 30-30v60C46.569 60 30 46.569 30 30z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")
                `,
                transform: `scaleY(${scrollHeight / 100})`,
                transformOrigin: 'top',
                transition: 'transform 1.5s cubic-bezier(0.4, 0, 0.2, 1)'
              }}
            >
              {/* Aged parchment texture overlay */}
              <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-10 left-10 w-16 h-8 bg-amber-800 opacity-20 rounded-full blur-sm"></div>
                <div className="absolute top-32 right-16 w-12 h-6 bg-amber-700 opacity-25 rounded-full blur-sm"></div>
                <div className="absolute bottom-20 left-20 w-20 h-10 bg-amber-900 opacity-15 rounded-full blur-sm"></div>
              </div>
              
              {/* Content */}
              <div className="p-12 relative z-10">
                {/* Header with user's name */}
                <div className="text-center mb-12 animate-in fade-in duration-1000 delay-500">
                  <h1 className="text-5xl mb-6 text-amber-900" style={{ 
                    fontFamily: 'var(--font-unifraktur-maguntia)',
                    lineHeight: '1.2'
                  }}>
                    Dear Guardian,
                  </h1>
                  <p className="text-2xl text-amber-800 mb-4" style={{ fontFamily: 'var(--font-unifraktur-cook)', fontWeight: '700' }}>
                    A special message for <span className="font-bold text-amber-900">{user.firstName.toUpperCase()} {user.lastName.toUpperCase()}</span>
                  </p>
                </div>

                {/* Charter Text */}
                <div className="text-amber-900 leading-relaxed text-lg space-y-6 animate-in fade-in duration-1000 delay-700" style={{ 
                  fontFamily: 'var(--font-unifraktur-cook)',
                  fontSize: '1.25rem'
                }}>
                  <p className="text-center mb-8">
                    Thou art hereby invited to join ranks with the Knights of Gaia and pledge thy sacred oath to our Mother Earth. Here thou wilt be greeted with wisdom of ancient ways, knowledge of the natural world, and sacred bonds that tie all living beings to the eternal cycle of life.
                  </p>

                  <p className="text-center mb-8">
                    By the power vested in us by the ancient spirits of forest, mountain, and sea, we call upon thee to become a Guardian of the Sacred Realm. Shouldst thou accept this calling, thy name shall be inscribed in the Great Book of Planetarians, and thou shalt be granted the title of Earth's Protector.
                  </p>

                  <p className="text-center mb-8">
                    Upon reading this scroll, please tell thy local Earth Knight if thou wilt or wilt not take up our offering of peace, harmony, and sacred duty to preserve the natural order for generations yet unborn.
                  </p>

                  <div className="text-center mt-12 mb-8 animate-in fade-in duration-1000 delay-900">
                    <p className="text-2xl" style={{ fontFamily: 'var(--font-unifraktur-maguntia)', fontWeight: '600' }}>
                      Yours truly,
                    </p>
                    <p className="text-xl mt-2" style={{ fontFamily: 'var(--font-unifraktur-maguntia)', fontWeight: '600' }}>
                      King Gaia of the Sacred Order
                    </p>
                  </div>
                </div>

                {/* Signing Section */}
                {!isSigningMode ? (
                  <div className="text-center mt-12 pt-8 border-t-2 border-amber-700 animate-in fade-in duration-1000 delay-1000">
                    <button 
                      onClick={() => setIsSigningMode(true)}
                      className="px-12 py-4 text-xl text-white bg-gradient-to-r from-amber-700 to-amber-900 border-2 border-amber-900 hover:from-amber-800 hover:to-amber-950 transition-all duration-300 shadow-lg transform hover:scale-105"
                      style={{ fontFamily: 'Cinzel, serif', borderRadius: '4px' }}
                    >
                      ⚔️ Accept thy Sacred Calling ⚔️
                    </button>
                  </div>
                ) : (
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
                          By mine own hand and sacred word, I, <span className="font-bold text-amber-900">{user.firstName.toUpperCase()} {user.lastName.toUpperCase()}</span>, do solemnly swear:
                        </p>
                      </div>
                      
                      {/* Signature Input - Last */}
                      <div className="pt-4 border-t border-amber-300">
                        <p className="text-sm text-amber-700 mb-2 text-center">Sign below to confirm your oath:</p>
                        <input 
                          type="text"
                          value={signatureText}
                          onChange={(e) => setSignatureText(e.target.value)}
                          placeholder={`${user.firstName} ${user.lastName}`}
                          className="w-full px-4 py-3 border-2 border-amber-700 bg-yellow-50 text-center rounded-lg focus:border-amber-900 focus:outline-none"
                        />
                      </div>
                      
                      {/* Oath Text */}
                      <div className="bg-yellow-50 p-4 border-2 border-amber-300 rounded-lg text-center">
                        <p className="text-amber-800 italic">"I pledge to uphold the sacred ways of Mother Earth,</p>
                        <p className="text-amber-800 italic">to protect and cherish all living creatures,</p>
                        <p className="text-amber-800 italic">and to stand as Guardian of Gaia for all time."</p>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex gap-4 justify-center pt-2">
                        <button 
                          onClick={handleSign}
                          disabled={isSigning || !signatureText.trim()}
                          className="px-6 py-3 text-white bg-gradient-to-r from-emerald-600 to-emerald-800 border-2 border-emerald-700 hover:from-emerald-700 hover:to-emerald-900 transition-all duration-200 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed font-normal"
                        >
                          {isSigning ? '⏳ Sealing...' : 'BECOME A PLANETARIAN'}
                        </button>
                        
                        <button 
                          onClick={() => setIsSigningMode(false)}
                          className="px-6 py-3 text-amber-900 bg-yellow-100 border-2 border-amber-700 hover:bg-yellow-200 transition-all duration-200 rounded-lg font-normal"
                        >
                          DECLINE
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
            
            {/* Bottom wooden rod */}
            <div className="w-full h-8 bg-gradient-to-r from-amber-900 via-amber-800 to-amber-700 rounded-full shadow-2xl border-2 border-amber-950 mt-4 relative">
              <div className="absolute inset-0 bg-gradient-to-t from-amber-950 to-transparent opacity-30 rounded-full"></div>
              <div className="absolute -left-2 top-1/2 transform -translate-y-1/2 w-4 h-6 bg-amber-950 rounded-full shadow-lg"></div>
              <div className="absolute -right-2 top-1/2 transform -translate-y-1/2 w-4 h-6 bg-amber-950 rounded-full shadow-lg"></div>
            </div>
          </div>
        )}
      </div>

      {/* Add Google Fonts */}
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;500;600;700&family=UnifrakturMaguntia&family=UnifrakturCook:wght@700&display=swap');
      `}</style>
    </div>
  );
}
