"use client";

export default function LoadingSpinner() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-amber-50 to-yellow-50">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-amber-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-amber-800 text-xl font-semibold">Loading Earth Charter...</p>
      </div>
    </div>
  );
}
