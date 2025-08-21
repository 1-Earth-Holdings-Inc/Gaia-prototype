"use client";
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';

export default function Navbar() {
  const { user, logout } = useAuth();
  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-white/90 border-b border-gray-200/50 shadow-sm">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="relative">
            <div className="h-9 w-9 rounded-full bg-gradient-to-br from-emerald-500 to-sky-500 shadow-lg ring-2 ring-emerald-500/20 group-hover:ring-emerald-500/40 transition-all duration-300" />
            <div className="absolute inset-0 h-9 w-9 rounded-full bg-gradient-to-br from-emerald-400 to-sky-400 animate-pulse opacity-50" />
          </div>
          <span className="gaia-heading text-xl font-bold tracking-tight text-gray-900 group-hover:text-gray-700 transition-colors">Gaia Platform</span>
        </Link>
        
        <nav className="flex items-center gap-6">
          <Link 
            href="/earth-charter" 
            className="text-gray-700 hover:text-emerald-600 hover:bg-emerald-50 px-3 py-2 rounded-lg transition-all duration-200 text-sm font-medium"
          >
            Earth Charter
          </Link>
          <Link 
            href="#clock" 
            className="text-gray-700 hover:text-emerald-600 hover:bg-emerald-50 px-3 py-2 rounded-lg transition-all duration-200 text-sm font-medium"
          >
            Doomsday Clock
          </Link>
          <Link 
            href="#news" 
            className="text-gray-700 hover:text-emerald-600 hover:bg-emerald-50 px-3 py-2 rounded-lg transition-all duration-200 text-sm font-medium"
          >
            News
          </Link>
          {user ? (
            <div className="flex items-center gap-3">
              {user.earthCharterSigned && (
                <span className="bg-gradient-to-r from-amber-400 to-amber-600 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
                  🌍 Planetarian
                </span>
              )}
              
              {/* Gmail-style user avatar */}
              <div 
                className="w-8 h-8 bg-gradient-to-br from-emerald-600 to-emerald-800 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-lg hover:shadow-xl transition-all duration-200 cursor-pointer"
                onClick={() => {
                  // Trigger sidebar open by dispatching a custom event
                  window.dispatchEvent(new CustomEvent('openProfileSidebar'));
                }}
              >
                {user.firstName.charAt(0).toUpperCase()}
              </div>
              

            </div>
          ) : (
            <>
              <Link 
                href="/login" 
                className="text-gray-700 hover:text-emerald-600 hover:bg-emerald-50 px-3 py-2 rounded-lg transition-all duration-200 text-sm font-medium"
              >
                Login
              </Link>
              <Link 
                href="/register" 
                className="rounded-xl bg-gradient-to-r from-emerald-500 to-sky-600 text-white px-4 py-2 text-sm font-medium shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              >
                Unite
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}


