'use client';


import HeroContent from './HeroContent';
import ImageSlider from './ImageSlider';

export default function HeroSection() {
  return (
    <section className="relative bg-gradient-to-b from-gray-50 to-white py-12 lg:py-20 overflow-hidden dark:from-gray-950 dark:to-gray-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          {/* Left Column: Headline and Call-To-Actions */}
          <div className="order-2 lg:order-1">
            <HeroContent />
          </div>

          {/* Right Column: Autoplay Swiper Image Slider */}
          <div className="order-1 lg:order-2">
            <ImageSlider />
          </div>
        </div>
      </div>
    </section>
  );
}