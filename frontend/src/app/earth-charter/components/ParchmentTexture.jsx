"use client";

export default function ParchmentTexture() {
  return (
    <div className="absolute inset-0 pointer-events-none">
      <div className="absolute top-10 left-10 w-16 h-8 bg-amber-800 opacity-20 rounded-full blur-sm"></div>
      <div className="absolute top-32 right-16 w-12 h-6 bg-amber-700 opacity-25 rounded-full blur-sm"></div>
      <div className="absolute bottom-20 left-20 w-20 h-10 bg-amber-900 opacity-15 rounded-full blur-sm"></div>
    </div>
  );
}
