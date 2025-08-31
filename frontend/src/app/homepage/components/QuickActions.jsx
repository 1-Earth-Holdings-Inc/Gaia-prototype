"use client";
import Link from "next/link";

export default function QuickActions({ user, onOpenProfile }) {
  return (
    <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
      <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Quick Actions</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Link 
          href="/earth-charter"
          className="flex items-center justify-center px-6 py-4 bg-emerald-600 text-white font-semibold rounded-xl hover:bg-emerald-700 transition-colors"
        >
          {user?.earthCharterSigned ? 'View Charter' : 'Sign Charter'}
        </Link>
        <button 
          onClick={onOpenProfile}
          className="flex items-center justify-center px-6 py-4 bg-sky-600 text-white font-semibold rounded-xl hover:bg-sky-700 transition-colors"
        >
          View Profile
        </button>
      </div>
    </div>
  );
}
