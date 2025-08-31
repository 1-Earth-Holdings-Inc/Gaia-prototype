"use client";
import Link from 'next/link';

export default function FormFooter() {
  return (
    <div className="mt-6 text-center text-sm text-gray-600">
      Already have an account?{' '}
      <Link href="/login" className="text-emerald-600 hover:text-emerald-700 font-medium">
        Sign in
      </Link>
    </div>
  );
}
