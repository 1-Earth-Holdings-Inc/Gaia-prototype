"use client";
import WelcomeHeader from './WelcomeHeader';
import EarthCharterCTA from './EarthCharterCTA';
import BenefitsGrid from './BenefitsGrid';
import QuickActions from './QuickActions';

export default function LoggedInHome({ user, onOpenProfile }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-sky-50 to-purple-50">
      <div className="max-w-6xl mx-auto px-6 py-20">
        <WelcomeHeader user={user} />
        <EarthCharterCTA user={user} />
        <BenefitsGrid />
        <QuickActions user={user} onOpenProfile={onOpenProfile} />
      </div>
    </div>
  );
}
