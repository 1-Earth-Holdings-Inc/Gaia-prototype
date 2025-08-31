"use client";

export default function WoodenRod({ position = 'top', width = 'w-full', animationClass = '' }) {
  const gradientDirection = position === 'top' 
    ? 'bg-gradient-to-b from-amber-950 to-transparent' 
    : 'bg-gradient-to-t from-amber-950 to-transparent';

  return (
    <div className={`${width} h-8 bg-gradient-to-r from-amber-900 via-amber-800 to-amber-700 rounded-full shadow-2xl border-2 border-amber-950 relative ${animationClass}`}>
      <div className={`absolute inset-0 ${gradientDirection} opacity-30 rounded-full`}></div>
      <div className="absolute -left-2 top-1/2 transform -translate-y-1/2 w-4 h-6 bg-amber-950 rounded-full shadow-lg"></div>
      <div className="absolute -right-2 top-1/2 transform -translate-y-1/2 w-4 h-6 bg-amber-950 rounded-full shadow-lg"></div>
    </div>
  );
}
