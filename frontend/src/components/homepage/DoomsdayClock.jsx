"use client";
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function DoomsdayClock() {
  const [now, setNow] = useState(new Date());
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);
  return (
    <motion.section id="clock"
      initial={{ opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-4xl mx-auto gaia-card p-8"
    >
              <div className="text-center mb-8">
          <h3 className="gaia-heading text-2xl font-semibold mb-2">Doomsday Clock</h3>
        </div>
      
      <div className="text-center space-y-4">
        <div>
          <p className="text-lg text-gray-700">It is now</p>
          <p className="text-2xl font-bold text-red-600">89 seconds to midnight</p>
        </div>
        
        <div className="space-y-2">
          <p className="text-sm text-gray-500 font-mono">{now.toLocaleString()}</p>
          <p className="text-sm text-gray-600">2025 Doomsday Clock Statement - Bulletin of the Atomic Scientists</p>
        </div>
        
        <div className="mt-6">
          <div className="flex items-center justify-between text-xs text-gray-600 mb-2">
            <span>Safe</span>
            <span>Midnight</span>
          </div>
          <div className="h-2 w-full rounded-full bg-gray-200 overflow-hidden">
            <div className="h-full bg-gradient-to-r from-green-500 via-yellow-500 to-red-600" style={{ width: '98%' }} />
          </div>
        </div>
      </div>
    </motion.section>
  );
}


