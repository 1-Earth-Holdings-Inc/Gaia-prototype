"use client";
import { SignedCharter, GoogleFonts } from './index';
import { scrollStyles } from '../utils/charterUtils';

export default function SignedCharterView({ user, onGoHome }) {
  return (
    <div className="min-h-screen py-12 px-4" style={{
      backgroundImage: scrollStyles.pageBackground
    }}>
      <SignedCharter user={user} onGoHome={onGoHome} />
      <GoogleFonts />
    </div>
  );
}
