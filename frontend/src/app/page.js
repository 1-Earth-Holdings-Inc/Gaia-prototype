"use client";
import { useAuth } from "@/context/AuthContext";
import { useEffect } from "react";
import { 
  Hero, 
  DoomsdayClock, 
  Grid, 
  PlaceholderCard, 
  MissionSection, 
  StatsSection, 
  FeaturesSection,
  Footer
} from "@/components/homepage";
import Link from "next/link";

function PublicHome() {
  return (
    <div className="bg-white">
      <Hero />
      <div className="space-y-0">
        <MissionSection />
        <StatsSection />
        <FeaturesSection />
        <div className="px-6 py-20 space-y-16 max-w-6xl mx-auto">
          <DoomsdayClock />
          <Grid>
            <PlaceholderCard title="Selected Results to Questions" />
            <PlaceholderCard title="Breaking News" />
          </Grid>
        </div>
      </div>
      <Footer />
    </div>
  );
}

function LoggedInHome() {
  const { user } = useAuth();
  
  // Auto-open profile sidebar for new users
  useEffect(() => {
    // Check if this is a new user (first time landing on homepage)
    const isNewUser = sessionStorage.getItem('newUser');
    if (isNewUser) {
      // Remove the flag and open sidebar
      sessionStorage.removeItem('newUser');
      // Dispatch event to open profile sidebar
      window.dispatchEvent(new CustomEvent('openProfileSidebar'));
    }
  }, []);

  return (
    <div className="bg-white">
      <Hero />
      <div className="space-y-0">
        <MissionSection />
        <StatsSection />
        <FeaturesSection />
        <div className="px-6 py-20 space-y-16 max-w-6xl mx-auto">

  
          <DoomsdayClock />
          <Grid>
            <PlaceholderCard title="Generational Identity" />
            <PlaceholderCard title="Breaking News (Personalized)" />
          </Grid>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default function Home() {
  const { user, loading } = useAuth();
  if (loading) return <div className="min-h-screen grid place-items-center">Loading…</div>;
  if (!user) return <PublicHome />;
  return <LoggedInHome />;
}
