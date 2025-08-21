"use client";
import AuthForms from '@/components/AuthForms';
import Link from 'next/link';

export default function RegisterPage() {
  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-gradient-to-b from-white to-sky-50">
      <AuthForms type="register" />
    </div>
  );
}


