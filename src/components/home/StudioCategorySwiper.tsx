'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, FreeMode } from 'swiper/modules';
import Image from 'next/image';
import Link from 'next/link';
import { CategoryType } from '@/type';

import 'swiper/css';
import 'swiper/css/free-mode';

export default function StudioCategorySwiper({
  categoriesData,
}: {
  categoriesData: CategoryType[];
}) {
  // Repeat items to ensure enough slides for a seamless loop
  const categories = [
    ...categoriesData,
    ...categoriesData,
    ...categoriesData,
  ];

  return (
    <div className="w-full overflow-hidden">
      <Swiper
        modules={[Autoplay, FreeMode]}
        slidesPerView="auto"
        spaceBetween={20}
        loop
        speed={3500}
        freeMode={{
          enabled: true,
          momentum: false,
        }}
        autoplay={{
          delay: 0,
          disableOnInteraction: false,
          pauseOnMouseEnter: false,
        }}
        allowTouchMove={false}
        className="studio-swiper"
      >
        {categories.map((category, index) => (
          <SwiperSlide
            key={`${category.name}-${index}`}
            className="!w-[200px] sm:!w-[230px]"
          >
            <Link
              href={`/studios?category=${category.name
                .toLowerCase()
                .replace(/\s+/g, '-')}`}
              className="group relative block aspect-[3/4] overflow-hidden rounded-2xl"
            >
              <Image
                src={category.image}
                alt={category.name}
                width={500}
                height={500}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

              <div className="absolute bottom-0 p-5 text-white">
                <h3 className="text-lg font-bold">{category.name}</h3>
                <p className="mt-1 text-xs text-gray-300">
                  {category.count}
                </p>
              </div>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}