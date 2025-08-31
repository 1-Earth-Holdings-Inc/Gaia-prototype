"use client";
import Link from 'next/link';

export default function SignUpLink() {
  return (
    <div className="mt-8 text-center">
      <p className="text-gray-600 text-sm">
        Don't have an account?{' '}
        <Link 
          href="/register" 
          className="text-emerald-600 hover:text-emerald-800 font-medium"
        >
          Sign up
        </Link>
      </p>
    </div>
  );
}
