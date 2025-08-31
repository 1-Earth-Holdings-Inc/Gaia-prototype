"use client";
import Link from "next/link";

export default function EarthCharterCTA({ user }) {
  if (user?.earthCharterSigned) {
    return (
      <div className="bg-white rounded-3xl shadow-2xl p-8 mb-16 border border-gray-100">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-emerald-100 rounded-full mb-6">
            <span className="text-3xl">🌍</span>
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Planetarian Status Confirmed
          </h2>
          <p className="text-lg text-gray-600 mb-6">
            You have successfully signed the Earth Charter and are now a recognized Planetarian.
          </p>
          <Link 
            href="/earth-charter"
            className="inline-flex items-center px-8 py-4 bg-emerald-600 text-white font-semibold rounded-xl hover:bg-emerald-700 transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-1"
          >
            View Signed Charter
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-3xl shadow-2xl p-8 mb-16 border border-gray-100">
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-20 h-20 bg-amber-100 rounded-full mb-6">
          <span className="text-3xl">📜</span>
        </div>
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          Sign The Earth Charter
        </h2>
        <p className="text-lg text-gray-600 mb-6">
          Complete your journey by signing the sacred Earth Charter and officially become a Planetarian.
        </p>
        <Link 
          href="/earth-charter"
          className="inline-flex items-center px-8 py-4 bg-amber-600 text-white font-semibold rounded-xl hover:bg-amber-700 transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-1"
        >
          Sign Earth Charter
        </Link>
      </div>
    </div>
  );
}
