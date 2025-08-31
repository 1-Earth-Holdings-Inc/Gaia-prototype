"use client";

export default function WelcomeHeader({ user }) {
  return (
    <div className="text-center mb-16">
      <h1 className="text-5xl font-bold text-gray-900 mb-6">
        Welcome to Gaia, {user?.firstName || 'Planetarian'}! 🌍
      </h1>
      <p className="text-xl text-gray-600 max-w-3xl mx-auto">
        You're now part of a global community dedicated to environmental stewardship and sustainable action.
      </p>
    </div>
  );
}
