"use client";

export default function SubmitButton({ isSubmitting }) {
  return (
    <button
      type="submit"
      disabled={isSubmitting}
      className="w-full bg-emerald-600 text-white py-3 px-4 rounded-lg hover:bg-emerald-700 focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium"
    >
      {isSubmitting ? 'Signing In...' : 'Sign In'}
    </button>
  );
}
