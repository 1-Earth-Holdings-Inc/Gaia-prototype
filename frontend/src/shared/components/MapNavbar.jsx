"use client";
import Link from 'next/link';
import { Globe, Home, ArrowLeft } from 'lucide-react';

const MapNavbar = ({ 
  title = "WWF Terrestrial Biogeographic Realms",
  showBackButton = true,
  backHref = "/"
}) => {
  return (
    <nav className="bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 shadow-lg relative z-[1001]">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left section */}
          <div className="flex items-center space-x-4">
            {showBackButton && (
              <Link
                href={backHref}
                className="flex items-center space-x-2 px-3 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors duration-200"
              >
                <ArrowLeft className="w-4 h-4" />
                <span className="text-sm font-medium">Back</span>
              </Link>
            )}
            
            <div className="flex items-center space-x-3">
              <Globe className="w-8 h-8 text-white" />
              <div>
                <h1 className="text-lg font-bold text-white">{title}</h1>
                <p className="text-xs text-white/80">Explore Earth's major biogeographic regions</p>
              </div>
            </div>
          </div>

          {/* Center section - could add search or filters later */}
          <div className="hidden md:flex items-center space-x-4">
            <div className="text-white/90 text-sm">
              Interactive World Map
            </div>
          </div>

          {/* Right section */}
          <div className="flex items-center space-x-4">
            <Link
              href="/"
              className="flex items-center space-x-2 px-3 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors duration-200"
            >
              <Home className="w-4 h-4" />
              <span className="hidden sm:inline text-sm font-medium">Home</span>
            </Link>
          </div>
        </div>
      </div>
      
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent pointer-events-none"></div>
    </nav>
  );
};

export default MapNavbar;


