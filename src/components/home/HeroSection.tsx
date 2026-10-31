'use client';

import React from 'react';
import HeroContent from './HeroContent';
import ImageSlider from './ImageSlider';

export default function HeroSection() {
  return (
    <section className="relative bg-gradient-to-b from-gray-50 to-white py-12 lg:py-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          {/* Left Column: Headline and Call-To-Actions */}
          <HeroContent />

          {/* Right Column: Autoplay Swiper Image Slider */}
          <ImageSlider />
        </div>
      </div>
    </section>
  );
}