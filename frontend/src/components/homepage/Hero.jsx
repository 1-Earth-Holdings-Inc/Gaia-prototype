"use client";
import Image from 'next/image';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';

export default function Hero() {
  const { user } = useAuth();
  
  return (
    <section className="relative w-full text-center h-screen flex flex-col justify-between py-20 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 via-sky-50 to-purple-50"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(16,185,129,0.1),transparent_50%)]"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(59,130,246,0.1),transparent_50%)]"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_40%_40%,rgba(168,85,247,0.05),transparent_50%)]"></div>
      
      {/* Floating Elements */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-emerald-200/20 to-transparent rounded-full blur-xl"></div>
      <div className="absolute top-40 right-20 w-24 h-24 bg-gradient-to-br from-sky-200/20 to-transparent rounded-full blur-xl"></div>
      <div className="absolute bottom-32 left-20 w-28 h-28 bg-gradient-to-br from-purple-200/20 to-transparent rounded-full blur-xl"></div>
      <div className="absolute bottom-20 right-10 w-20 h-20 bg-gradient-to-br from-emerald-200/20 to-transparent rounded-full blur-xl"></div>
      
      <div className="relative max-w-7xl mx-auto px-8 z-10">
        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="gaia-heading text-5xl sm:text-7xl font-bold tracking-tight text-gray-900"
        >
          Gaia Platform
        </motion.h1>
        
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="mt-6 mb-8"
        >
          <div className="inline-block px-6 py-4 bg-white/60 backdrop-blur-sm rounded-3xl border border-white/20 shadow-lg">
            <p className="text-base sm:text-lg text-gray-700 font-normal">
              Everything is related to everything else.
            </p>
          </div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="max-w-3xl mx-auto"
        >
          <p className="text-sm text-gray-600 leading-relaxed">
            Everyday we will broadcast a powerful message aligned with the mission of the Earth Cup initiative, 
    
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
            // User has signed the charter: Show "View Signed Charter" button
            <div className="relative group">
              <Link 
                href="/earth-charter" 
                className="inline-flex items-center justify-center w-full px-10 py-5 rounded-2xl bg-gradient-to-r from-emerald-500 via-emerald-600 to-emerald-700 text-white font-bold text-xl shadow-lg hover:shadow-xl transition-all duration-300 border-2 border-emerald-300"
              >
                <span className="font-extrabold tracking-wide">View Signed Charter</span>
              </Link>
              
              {/* Success Message */}
              <div className="mt-4 text-center">
                <p className="text-emerald-700 font-medium">
                  🌱 <span className="font-bold">Congratulations!</span> You are now a Planetarian
                </p>
              </div>
            </div>
          ) : (
            // User hasn't signed yet: Show "Sign The Earth Charter" button
            <div className="relative group">
              {/* Breathing Aura Effect - Makes button look alive and waiting */}
              <div className="absolute -inset-2 bg-gradient-to-r from-amber-400 via-orange-500 to-red-600 rounded-3xl blur opacity-40 animate-pulse"></div>
              <div className="absolute -inset-1 bg-gradient-to-r from-amber-300 via-orange-400 to-red-500 rounded-2xl blur opacity-60 animate-ping"></div>
              
              <Link 
                href="/earth-charter" 
                className="relative inline-flex items-center justify-center w-full px-10 py-5 rounded-2xl bg-gradient-to-r from-amber-500 via-orange-600 to-red-700 text-white font-bold text-xl shadow-lg hover:shadow-xl transition-all duration-300 border-2 border-amber-300"
              >
                <span className="font-extrabold tracking-wide">Sign The Earth Charter</span>
              </Link>
              
              {/* Urgency Message */}
              <div className="mt-4 text-center">
                <p className="text-amber-700 font-medium">
                  ⏰ <span className="font-bold">NOW</span> is the moment to become a Planetarian
                </p>
              </div>
            </div>
          )
        ) : (
          // Public user: Show Unite button
          <>
            <div className="text-center">
              
              <Link 
                href="/register" 
                className="inline-flex items-center justify-center w-full px-10 py-5 rounded-2xl bg-gradient-to-r from-emerald-500 via-sky-600 to-purple-700 text-white font-bold text-xl shadow-lg hover:shadow-xl transition-all duration-300 border-2 border-emerald-300"
              >
                <span className="font-extrabold tracking-wide">Unite</span>
              </Link>
              

            </div>
            <p className="mt-6 text-sm text-gray-700 relative z-20">Already united? <Link href="/login" className="text-sky-600 hover:text-sky-700 font-medium transition-colors">Sign in here</Link></p>
          </>
        )}
      </motion.div>
    </section>
  );
}


