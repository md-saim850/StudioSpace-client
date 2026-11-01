'use client';

import { useState } from 'react';
import { Camera, Menu, X } from 'lucide-react';
import Link from 'next/link';
import { authClient } from '@/lib/auth-client';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const{data:session} = authClient.useSession();

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Brand Logo */}
          <div className="flex items-center gap-2">
            <div className="bg-black text-white p-2 rounded-full flex items-center justify-center shadow-md">
              <Camera className="w-5 h-5 stroke-[2.5]" />
            </div>
            <span className="font-bold text-xl tracking-tight text-gray-950 font-sans">
              StudioSpace
            </span>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-8">
            <Link href="/" className="text-sm font-semibold text-gray-900 hover:text-black transition-colors">
              Home
            </Link>
            <Link href="/studios" className="text-sm font-medium text-gray-600 hover:text-gray-950 transition-colors">
              Explore Studios
            </Link>
            <Link href="#" className="text-sm font-medium text-gray-600 hover:text-gray-950 transition-colors">
              How It Works
            </Link>
            <Link href="#" className="text-sm font-medium text-gray-600 hover:text-gray-950 transition-colors">
              About Us
            </Link>
          </nav>

          {/* Right Action Items */}
          {session?.user ?(
            <Link href={'/dashboard'}>
              <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </Link>
          ):(
            <div className="hidden md:flex items-center gap-4">
              <Link href="sign-in" className="px-5 py-2.5 text-sm font-medium text-gray-800 hover:text-black border border-gray-300 hover:border-gray-400 rounded-lg transition-all">
                Login
              </Link>
              <Link href="sign-up" className="px-5 py-2.5 text-sm font-medium text-white bg-black hover:bg-gray-800 rounded-lg shadow-sm transition-all">
                Register
              </Link>
            </div>
          )}

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-gray-700 hover:text-black focus:outline-none"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-gray-200 px-4 pt-2 pb-6 space-y-4">
          <Link href="/" className="block py-2 text-base font-semibold text-gray-900">
            Home
          </Link>
          <Link href="/studios" className="block py-2 text-base font-medium text-gray-600">
            Explore Studios
          </Link>
          <Link href="#how-it-works" className="block py-2 text-base font-medium text-gray-600">
            How It Works
          </Link>
          <Link href="#about" className="block py-2 text-base font-medium text-gray-600">
            About Us
          </Link>

          <div className="pt-4 border-t border-gray-100 flex flex-col gap-2">
            {session?.user ?(
              <Link href={'/dashboard'}>
                <Avatar>
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </Link>
            ):(
              <div className="hidden md:flex items-center gap-4">
                <Link href="sign-in" className="px-5 py-2.5 text-sm font-medium text-gray-800 hover:text-black border border-gray-300 hover:border-gray-400 rounded-lg transition-all">
                  Login
                </Link>
                <Link href="sign-up" className="px-5 py-2.5 text-sm font-medium text-white bg-black hover:bg-gray-800 rounded-lg shadow-sm transition-all">
                  Register
                </Link>
              </div>
            )}
          </div>

        </div>
      )}
    </header>
  );
}