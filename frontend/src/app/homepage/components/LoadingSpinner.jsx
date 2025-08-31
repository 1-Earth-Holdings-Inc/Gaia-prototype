"use client";

export default function LoadingSpinner() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-50 via-sky-50 to-purple-50">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-emerald-800 text-xl font-semibold">Loading Gaia...</p>
      </div>
    </div>
  );
}
