'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination, EffectFade } from 'swiper/modules';
import { ChevronLeft, ChevronRight } from 'lucide-react';

// Swiper core styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';
import Image from 'next/image';

const SLIDES = [
  {
    id: 1,
    title: 'Neon Creative Studio',
    image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=1200&auto=format&fit=crop',
  },
  {
    id: 2,
    title: 'Vibrant RGB Lighting Stage',
    image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=1200&auto=format&fit=crop',
  },
  {
    id: 3,
    title: 'Colorful Music & Audio Lab',
    image: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?q=80&w=1200&auto=format&fit=crop',
  },
  {
    id: 4,
    title: 'Cyberpunk Podcast & Live Suite',
    image: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?q=80&w=1200&auto=format&fit=crop',
  },
  {
    id: 5,
    title: 'Photo Studio',
    image: 'https://images.unsplash.com/photo-1664817550969-5e76adc4a3fe?q=80&w=2070&auto=format&fit=crop',
  },
];

export default function ImageSlider() {
  return (
    <div className="relative w-full h-[400px] sm:h-[480px] lg:h-[540px] rounded-2xl overflow-hidden shadow-2xl bg-gray-950 group">
      <Swiper
        modules={[Autoplay, Navigation, Pagination, EffectFade]}
        spaceBetween={0}
        slidesPerView={1}
        loop={true}
        speed={800}
        autoplay={{
          delay: 3500,
          disableOnInteraction: false,
          reverseDirection: false, // Right to Left sliding direction
        }}
        pagination={{
          type: 'fraction',
          el: '.custom-swiper-pagination',
        }}
        navigation={{
          prevEl: '.custom-prev-btn',
          nextEl: '.custom-next-btn',
        }}
        className="w-full h-full"
      >
        {SLIDES.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div className="relative w-full h-full">
              <Image  
                fill
                unoptimized
                src={slide.image}
                alt={slide.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Floating Bottom Navigation Controls */}
      <div className="absolute bottom-6 right-6 z-20 flex items-center gap-3 bg-black/80 backdrop-blur-md text-white px-4 py-2 rounded-full border border-white/20 shadow-lg">
        {/* Previous Button */}
        <button
          className="custom-prev-btn p-1.5 hover:text-gray-300 transition-colors focus:outline-none"
          aria-label="Previous Slide"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        {/* Fraction Pagination (e.g. 1/3) */}
        <div className="custom-swiper-pagination text-xs font-semibold tracking-wider px-2 font-mono" />

        {/* Next Button */}
        <button
          className="custom-next-btn p-1.5 hover:text-gray-300 transition-colors focus:outline-none"
          aria-label="Next Slide"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}