"use client";
import { formatUserName } from '../utils/charterUtils';

export default function CharterHeader({ user, animationClass = '' }) {
  return (
    <div className={`text-center mb-12 ${animationClass}`}>
      <h1 className="text-5xl mb-6 text-amber-900" style={{ 
        fontFamily: 'var(--font-unifraktur-maguntia)',
        lineHeight: '1.2'
      }}>
        Dear Guardian,
      </h1>
      <p className="text-2xl text-amber-800 mb-4" style={{ fontFamily: 'var(--font-unifraktur-cook)', fontWeight: '700' }}>
        A special message for <span className="font-bold text-amber-900">{formatUserName(user)}</span>
      </p>
    </div>
  );
}
