"use client";
import WoodenRod from './WoodenRod';

export default function ClosedScroll({ user, onOpen }) {
  return (
    <div 
      className="cursor-pointer transform hover:scale-105 transition-all duration-300"
      onClick={onOpen}
    >
      {/* Top wooden rod */}
      <WoodenRod width="w-80" />
      
      {/* Rolled parchment */}
      <div className="w-80 h-32 bg-gradient-to-br from-yellow-50 to-amber-100 shadow-2xl border-4 border-amber-800 relative overflow-hidden my-2">
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
      <WoodenRod position="bottom" width="w-80" />
    </div>
  );
}
