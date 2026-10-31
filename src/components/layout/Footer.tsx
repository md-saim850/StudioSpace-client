"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Camera} from "lucide-react";
import { FaInstagram, FaYoutube, FaLinkedin } from "react-icons/fa";

// Custom X (formerly Twitter) Icon component
const TwitterXIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    fill="currentColor"
    viewBox="0 0 24 24"
    aria-hidden="true"
  >
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

export const Footer= () => {
  const [email, setEmail] = useState("");

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    // Add your newsletter subscription logic here
    console.log("Subscribed email:", email);
    setEmail("");
  };

  return (
    <footer className="w-full bg-[#0a0d12] text-white border-t border-white/10 font-sans">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-12">
          
          {/* Column 1: Brand & Tagline & Social Links */}
          <div className="lg:col-span-4 space-y-4">
            {/* Logo */}
            <div className="flex items-center gap-2">
              <div className="bg-white text-black p-2 rounded-full flex items-center justify-center shadow-md">
                <Camera className="w-5 h-5 stroke-[2.5]" />
              </div>
              <span className="font-bold text-xl tracking-tight text-white font-sans">
                StudioSpace
              </span>
            </div>

            {/* Description */}
            <div className="text-sm text-gray-400 space-y-1 font-light">
              <p>Creative spaces for creators, by creators.</p>
              <p>Book studios, make magic.</p>
            </div>

            {/* Social Icons */}
            <div className="flex items-center gap-4 pt-2">
              <a
                href="https://x.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="X (Twitter)"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <TwitterXIcon className="w-4 h-4" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <FaInstagram className="w-4 h-4" />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <FaYoutube className="w-4 h-4" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <FaLinkedin className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="lg:col-span-2 space-y-4">
            <h3 className="text-sm font-semibold text-white tracking-wider">Quick Links</h3>
            <ul className="space-y-2.5 text-sm text-gray-400">
              <li>
                <Link href="/" className="hover:text-white transition-colors">Home</Link>
              </li>
              <li>
                <Link href="/explore" className="hover:text-white transition-colors">Explore Studios</Link>
              </li>
              <li>
                <Link href="/how-it-works" className="hover:text-white transition-colors">How It Works</Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-white transition-colors">About Us</Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition-colors">Contact</Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Popular Categories */}
          <div className="lg:col-span-2 space-y-4">
            <h3 className="text-sm font-semibold text-white tracking-wider">
              Popular Categories
            </h3>
            <ul className="space-y-2.5 text-sm text-gray-400">
              <li>
                <Link href="/explore?cat=photo" className="hover:text-white transition-colors">Photo Studios</Link>
              </li>
              <li>
                <Link href="/explore?cat=sound" className="hover:text-white transition-colors">Sound Stages</Link>
              </li>
              <li>
                <Link href="/explore?cat=podcast" className="hover:text-white transition-colors">Podcast Rooms</Link>
              </li>
              <li>
                <Link href="/explore?cat=music" className="hover:text-white transition-colors">Music Suites</Link>
              </li>
              <li>
                <Link href="/explore?cat=art" className="hover:text-white transition-colors">Art Workshops</Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Newsletter */}
          <div className="lg:col-span-4 space-y-4">
            <h3 className="text-sm font-semibold text-white tracking-wider">
              Newsletter
            </h3>
            <p className="text-sm text-gray-400 font-light leading-relaxed">
              Get the latest studios, deals and creative news.
            </p>

            {/* Newsletter Form */}
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2 pt-1">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                required
                className="w-full px-4 py-2.5 text-sm bg-white text-gray-900 placeholder-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 border-none"
              />
              <button
                type="submit"
                className="px-5 py-2.5 text-sm font-semibold text-gray-900 bg-white hover:bg-gray-100 rounded-lg transition-colors whitespace-nowrap shadow-sm"
              >
                Subscribe
              </button>
            </form>
          </div>

        </div>

        {/* Bottom Bar Separator Line */}
        <div className="mt-12 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-400 gap-4">
          {/* Copyright */}
          <div>
            © {new Date().getFullYear()} StudioSpace. All rights reserved.
          </div>

          {/* Legal / Policy Links */}
          <div className="flex items-center gap-6">
            <Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
            <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <button
              onClick={() => {}}
              className="hover:text-white transition-colors focus:outline-none"
            >
              Cookie Settings
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};