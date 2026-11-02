'use client';

import { useState } from 'react';
import { Camera, Menu, X } from 'lucide-react';
import Link from 'next/link';
import Auth from './Auth';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-100  dark:bg-gray-950 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Brand Logo */}
          <div className="flex items-center gap-2">
            <div className="bg-black text-white p-2 rounded-full flex items-center justify-center shadow-md dark:bg-white dark:text-black">
              <Camera className="w-5 h-5 stroke-[2.5]" />
            </div>
            <span className="font-bold text-xl tracking-tight text-gray-950 dark:text-white font-sans">
              StudioSpace
            </span> 
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-8">
            <Link href="/" className="text-sm font-semibold text-gray-900 hover:text-black transition-colors dark:text-gray-100 dark:hover:text-white">
              Home
            </Link>
            <Link href="/studios" className="text-sm font-medium text-gray-600 hover:text-gray-950 transition-colors dark:text-gray-300 dark:hover:text-white">
              Explore Studios
            </Link>
            <Link href="/how-it-works" className="text-sm font-medium text-gray-600 hover:text-gray-950 transition-colors dark:text-gray-300 dark:hover:text-white">
              How It Works
            </Link>
            <Link href="/about" className="text-sm font-medium text-gray-600 hover:text-gray-950 transition-colors dark:text-gray-300 dark:hover:text-white">
              About Us
            </Link>
          </nav>

          {/* Right Action Items */}
          <Auth />

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-gray-700 hover:text-black focus:outline-none dark:text-gray-300 dark:hover:text-white"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-gray-200 px-4 pt-2 pb-6 space-y-4 dark:bg-gray-950 dark:border-gray-800">
          <Link href="/" className="block py-2 text-base font-semibold text-gray-900 dark:text-gray-100">
            Home
          </Link>
          <Link href="/studios" className="block py-2 text-base font-medium text-gray-600 dark:text-gray-300">
            Explore Studios
          </Link>
          <Link href="/how-it-works" className="block py-2 text-base font-medium text-gray-600 dark:text-gray-300">
            How It Works
          </Link>
          <Link href="/about" className="block py-2 text-base font-medium text-gray-600 dark:text-gray-300">
            About Us
          </Link>

          <div className="pt-4 border-t border-gray-100 flex flex-col gap-2 dark:border-gray-800">
            <Auth />
          </div>

        </div>
      )}
    </header>
  );
}