"use client";
import AuthForms from '@/components/AuthForms';
import Link from 'next/link';

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-gradient-to-br from-emerald-50 via-sky-50 to-purple-50">
      <AuthForms type="login" />
    </div>
  );
}


