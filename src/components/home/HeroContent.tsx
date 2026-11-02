'use client';

import React from 'react';
import { ArrowRight } from 'lucide-react';

export default function HeroContent() {
  return (
    <div className="flex flex-col justify-center py-8 lg:py-16 pr-0 lg:pr-8">
      {/* Category Badge */}
      <span className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-4 block dark:text-gray-400">
        Creative Spaces. Real Opportunities.
      </span>

      {/* Main Headline */}
      <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-950 tracking-tight leading-[1.1] mb-6 dark:text-white">
        Find the Perfect Studio for Your Next Project
      </h1>

      {/* Subtitle */}
      <p className="text-base sm:text-lg text-gray-600 leading-relaxed mb-8 max-w-xl dark:text-gray-300">
        From photography cyc walls to recording suites — discover and book creative spaces for your next shoot, session or event.
      </p>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
        {/* Button 1: Primary Action */}
        <button className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-black hover:bg-gray-800 text-white font-medium text-base rounded-xl transition-all shadow-md group dark:bg-white dark:text-black dark:hover:bg-gray-200">
          <span>Explore Studios</span>
          <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
        </button>

        {/* Button 2: Secondary Action */}
        <button className="inline-flex items-center justify-center px-7 py-3.5 bg-white hover:bg-gray-50 text-gray-900 border border-gray-300 font-medium text-base rounded-xl transition-all shadow-sm dark:bg-gray-900 dark:text-gray-100 dark:border-gray-700 dark:hover:bg-gray-800">
          Host Your Space
        </button>
      </div>
    </div>
  );
}