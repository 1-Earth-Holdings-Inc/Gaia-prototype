"use client";
import Link from "next/link";
import { Github, Twitter, Mail, Globe, Heart, Shield } from "lucide-react";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="relative mt-32 bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(16,185,129,0.1),transparent_50%)]"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_70%,rgba(59,130,246,0.1),transparent_50%)]"></div>
      
      {/* Top border gradient */}
      <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-emerald-400 via-sky-500 to-purple-600"></div>
      
      <div className="relative">
        {/* Main footer content */}
        <div className="max-w-7xl mx-auto px-6 pt-16 pb-8">
          <div className="grid gap-12 lg:grid-cols-4 md:grid-cols-2">
            {/* Brand section */}
            <div className="lg:col-span-2">
              <div className="flex items-center gap-3 mb-6">
                <div className="relative">
                  <div className="h-12 w-12 rounded-full bg-gradient-to-br from-emerald-500 to-sky-500 shadow-lg"></div>
                  <div className="absolute inset-0 h-12 w-12 rounded-full bg-gradient-to-br from-emerald-400 to-sky-400 animate-pulse opacity-50"></div>
                </div>
                <div>
                  <h3 className="gaia-heading text-2xl font-bold">Gaia Platform</h3>
                  <p className="text-gray-400 text-sm">Everything is related to everything else</p>
                </div>
              </div>
              <p className="text-gray-300 text-base leading-relaxed max-w-md mb-6">
                Building a united, compassionate, and sustainable future for all life on Earth through collective wisdom and global collaboration.
              </p>
              
              {/* Mission highlights */}
              <div className="flex gap-3 mb-8 max-w-md">
                <div className="text-center p-2 rounded-lg bg-white/5 backdrop-blur-sm flex-1">
                  <Globe className="h-5 w-5 text-emerald-400 mx-auto mb-1" />
                  <p className="text-xs text-gray-300">Global Unity</p>
                </div>
                <div className="text-center p-2 rounded-lg bg-white/5 backdrop-blur-sm flex-1">
                  <Shield className="h-5 w-5 text-sky-400 mx-auto mb-1" />
                  <p className="text-xs text-gray-300">Planet Protection</p>
                </div>
                <div className="text-center p-2 rounded-lg bg-white/5 backdrop-blur-sm flex-1">
                  <Heart className="h-5 w-5 text-purple-400 mx-auto mb-1" />
                  <p className="text-xs text-gray-300">Compassion</p>
                </div>
              </div>
            </div>

            {/* Navigation links */}
            <div>
              <h4 className="gaia-heading text-lg font-semibold mb-6 text-white">Explore</h4>
              <nav className="space-y-3">
                <Link href="#charter" className="block text-gray-300 hover:text-emerald-400 transition-colors duration-200">
                  Earth Charter
                </Link>
                <Link href="#clock" className="block text-gray-300 hover:text-emerald-400 transition-colors duration-200">
                  Doomsday Clock
                </Link>
                <Link href="#news" className="block text-gray-300 hover:text-emerald-400 transition-colors duration-200">
                  Breaking News
                </Link>
                <Link href="#mission" className="block text-gray-300 hover:text-emerald-400 transition-colors duration-200">
                  Our Mission
                </Link>
              </nav>
            </div>

            {/* Account & social */}
            <div>
              <h4 className="gaia-heading text-lg font-semibold mb-6 text-white">Connect</h4>
              <nav className="space-y-3 mb-8">
                <Link href="/login" className="block text-gray-300 hover:text-sky-400 transition-colors duration-200">
                  Sign In
                </Link>
                <Link href="/register" className="block text-gray-300 hover:text-sky-400 transition-colors duration-200">
                  Join the Movement
                </Link>
                <Link href="/forgot" className="block text-gray-300 hover:text-sky-400 transition-colors duration-200">
                  Forgot Password
                </Link>
              </nav>
              
              {/* Social links */}
              <div>
                <p className="text-sm font-medium text-gray-400 mb-4">Follow Us</p>
                <div className="flex items-center gap-3">
                  <a 
                    href="#" 
                    className="group flex h-10 w-10 items-center justify-center rounded-full bg-white/10 backdrop-blur-sm hover:bg-emerald-500 transition-all duration-300"
                    aria-label="Github"
                  >
                    <Github className="h-5 w-5 text-gray-300 group-hover:text-white transition-colors" />
                  </a>
                  <a 
                    href="#" 
                    className="group flex h-10 w-10 items-center justify-center rounded-full bg-white/10 backdrop-blur-sm hover:bg-sky-500 transition-all duration-300"
                    aria-label="Twitter"
                  >
                    <Twitter className="h-5 w-5 text-gray-300 group-hover:text-white transition-colors" />
                  </a>
                  <a 
                    href="#" 
                    className="group flex h-10 w-10 items-center justify-center rounded-full bg-white/10 backdrop-blur-sm hover:bg-purple-500 transition-all duration-300"
                    aria-label="Email"
                  >
                    <Mail className="h-5 w-5 text-gray-300 group-hover:text-white transition-colors" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10">
          <div className="max-w-7xl mx-auto px-6 py-6">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <p className="text-sm text-gray-400">
                © {year} Gaia Platform. All rights reserved. Made with ❤️ for our planet.
              </p>
              <div className="flex items-center gap-6 text-sm text-gray-400">
                <Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link>
                <Link href="#" className="hover:text-white transition-colors">Terms of Service</Link>
                <Link href="#" className="hover:text-white transition-colors">Contact</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
