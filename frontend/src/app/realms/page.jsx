"use client";
import Map from '../../shared/components/Map';

export default function RealmsPage() {
  return (
    <div className="h-screen w-full">
      {/* Main Map Container - Full Screen */}
      <Map className="h-full w-full" />
    </div>
  );
}
