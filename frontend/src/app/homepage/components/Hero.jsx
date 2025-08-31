"use client";
import Image from 'next/image';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useAuth } from '@/shared/context/AuthContext';

export default function Hero() {
  const { user } = useAuth();
  
    return (
    <section className="relative w-full text-center h-screen flex flex-col justify-center py-20">
      {/* Simple Background */}
      <div className="absolute inset-0 bg-gradient-to-r from-sky-50 via-emerald-50 to-purple-50"></div>
      
      <div className="relative max-w-4xl mx-auto px-8 z-10">
                 <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="gaia-heading text-6xl font-bold tracking-tight text-gray-900 mb-6"
        >
          Gaia Platform
        </motion.h1>
        
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="mt-6 mb-8"
        >
          <div className="inline-block px-6 py-4 bg-white rounded-2xl shadow-sm border border-gray-100">
            <p className="text-base text-gray-700 font-medium">
              Everything is related to everything else.
            </p>
          </div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="max-w-2xl mx-auto mb-12"
        >
          <p className="text-base text-gray-600">
            Everyday we will broadcast a powerful message aligned with the mission of the Earth Cup initiative.
          </p>
        </motion.div>
      </div>
      
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.6 }}
        className="max-w-xl mx-auto relative z-20"
      >
        {user ? (
          user.earthCharterSigned ? (
            // User has signed the charter - Planetarian Status Confirmed
            <>
              <div className="text-center mb-8">
                <div className="inline-block px-6 py-3 bg-emerald-100 rounded-2xl mb-4">
                  <h2 className="text-2xl font-bold text-gray-900">Welcome to Gaia, {user.firstName}! 🌍</h2>
                </div>
                <div className="inline-block px-6 py-3 bg-emerald-100 rounded-2xl">
                  <p className="text-lg text-gray-700">You're now part of a global community dedicated to environmental stewardship and sustainable action.</p>
                </div>
              </div>
              
              <div className="bg-white rounded-3xl shadow-lg border border-gray-100 p-8">
                <div className="text-center mb-6">
                  <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">🌍</span>
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">Planetarian Status Confirmed</h2>
                  <p className="text-gray-600">You have successfully signed the Earth Charter and are now a recognized Planetarian.</p>
                </div>
                <div className="px-4">
                  <Link 
                    href="/earth-charter" 
                    className="w-full inline-flex items-center justify-center px-8 py-4 rounded-2xl bg-emerald-500 text-white font-bold text-lg shadow-md hover:shadow-lg transition-all duration-300"
                  >
                    View Signed Charter
                  </Link>
                </div>
              </div>
            </>
          ) : (
            // User hasn't signed yet - show signing card
            <>
              <div className="text-center mb-8">
                <div className="inline-block px-6 py-3 bg-emerald-100 rounded-2xl mb-4">
                  <h2 className="text-2xl font-bold text-gray-900">Welcome to Gaia, {user.firstName}! 🌍</h2>
                </div>
                <div className="inline-block px-6 py-3 bg-emerald-100 rounded-2xl">
                  <p className="text-lg text-gray-700">You're now part of a global community dedicated to environmental stewardship and sustainable action.</p>
                </div>
              </div>
              
              <div className="bg-white rounded-3xl shadow-lg border border-gray-100 p-8">
                <div className="text-center mb-6">
                  <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">📜</span>
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">Sign The Earth Charter</h2>
                  <p className="text-gray-600">Complete your journey by signing the sacred Earth Charter and officially become a Planetarian.</p>
                </div>
                <div className="px-4">
                  <Link 
                    href="/earth-charter" 
                    className="w-full inline-flex items-center justify-center px-8 py-4 rounded-2xl bg-amber-500 text-white font-bold text-lg shadow-md hover:shadow-lg transition-all duration-300"
                  >
                    Sign Earth Charter
                  </Link>
                </div>
              </div>
            </>
          )
        ) : (
          // Public user: Show Unite button
          <>
            <div className="text-center">
              <Link 
                href="/register" 
                className="inline-flex items-center justify-center px-12 py-4 rounded-2xl bg-gradient-to-r from-emerald-500 via-sky-600 to-purple-700 text-white font-bold text-lg shadow-md hover:shadow-lg transition-all duration-300"
              >
                <span className="font-semibold">Unite</span>
              </Link>
            </div>
            <p className="mt-8 text-sm text-gray-600">Already united? <Link href="/login" className="text-sky-600 hover:text-sky-700 font-medium">Sign in here</Link></p>
          </>
        )}
      </motion.div>
    </section>
  );
}


