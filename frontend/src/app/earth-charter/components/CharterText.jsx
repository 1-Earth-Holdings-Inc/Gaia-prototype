"use client";
import { charterTextContent } from '../utils/charterUtils';

export default function CharterText({ animationClass = '' }) {
  return (
    <div className={`text-amber-900 leading-relaxed text-lg space-y-6 ${animationClass}`} style={{ 
      fontFamily: 'var(--font-unifraktur-cook)',
      fontSize: '1.25rem'
    }}>
      {charterTextContent.paragraphs.map((paragraph, index) => (
        <p key={index} className="text-center mb-8">
          {paragraph}
        </p>
      ))}

      <div className="text-center mt-12 mb-8">
        <p className="text-2xl" style={{ fontFamily: 'var(--font-unifraktur-maguntia)', fontWeight: '600' }}>
          {charterTextContent.signature.yours}
        </p>
        <p className="text-xl mt-2" style={{ fontFamily: 'var(--font-unifraktur-maguntia)', fontWeight: '600' }}>
          {charterTextContent.signature.author}
        </p>
      </div>
    </div>
  );
}
