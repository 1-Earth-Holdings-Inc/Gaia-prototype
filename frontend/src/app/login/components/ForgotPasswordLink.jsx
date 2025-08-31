"use client";
import Link from 'next/link';

export default function ForgotPasswordLink() {
  return (
    <div className="mt-6 text-center">
      <Link 
        href="/forgot" 
        className="text-emerald-600 hover:text-emerald-800 text-sm font-medium"
      >
        Forgot your password?
      </Link>
    </div>
  );
}
