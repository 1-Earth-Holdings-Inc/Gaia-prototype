"use client";
import { 
  Hero, 
  DoomsdayClock, 
  Grid, 
  PlaceholderCard, 
  MissionSection, 
  StatsSection, 
  FeaturesSection,
  Footer
} from "./index";

export default function PublicHome() {
  return (
    <div className="bg-white">
      <Hero />
      <MissionSection />
      <div className="px-6 py-20 space-y-16 max-w-6xl mx-auto">
        <DoomsdayClock />
        <div className="text-center my-16">
          <h2 className="text-xl text-gray-600 mb-8">Everything you need to make a difference</h2>
        </div>
        <Grid>
          <PlaceholderCard title="Selected Results to Questions" />
          <PlaceholderCard title="Breaking News" />
        </Grid>
      </div>
      <Footer />
    </div>
  );
}
