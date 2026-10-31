import React from 'react';
import { ArrowRight } from 'lucide-react';
import Image from 'next/image';

interface Category {
  id: string;
  name: string;
  count: string;
  image: string;
}

const categoriesData: Category[] = [
  {
    id: '1',
    name: 'Photo Studios',
    count: '52+ studios',
    image: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?q=80&w=800&auto=format&fit=crop',
  },
  {
    id: '2',
    name: 'Sound Stages',
    count: '18+ studios',
    image: 'https://images.unsplash.com/photo-1598653222000-6b7b7a552625?q=80&w=800&auto=format&fit=crop',
  },
  {
    id: '3',
    name: 'Podcast Rooms',
    count: '24+ studios',
    image: 'https://images.unsplash.com/photo-1590602847861-f357a9332bbc?q=80&w=800&auto=format&fit=crop',
  },
  {
    id: '4',
    name: 'Music Suites',
    count: '14+ studios',
    image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=800&auto=format&fit=crop',
  },
  {
    id: '5',
    name: 'Art Workshops',
    count: '14+ studios',
    image: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?q=80&w=800&auto=format&fit=crop',
  },
];

export default function BrowseCategories() {
  return (
    <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 py-12">
      {/* Header Section */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">
            Browse by Studio Categories
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            Find the perfect space for your creative vision
          </p>
        </div>
        <a
          href="#categories"
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-gray-700 hover:text-black transition-colors"
        >
          View All <ArrowRight className="w-4 h-4" />
        </a>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5">
        {categoriesData.map((category) => (
          <a
            key={category.id}
            href={`#${category.name.toLowerCase().replace(/\s+/g, '-')}`}
            className="group relative rounded-2xl overflow-hidden aspect-[4/3] sm:aspect-[3/4] shadow-sm hover:shadow-xl transition-all duration-300 block"
          >
            {/* Background Image with Zoom Effect */}
            <Image
              width={500}
              height={500}
              src={category.image}
              alt={category.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />

            {/* Dark Gradient Overlay for Contrast */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent transition-opacity group-hover:from-black/90" />

            {/* Overlay Text Content */}
            <div className="absolute bottom-0 left-0 right-0 p-5 flex flex-col justify-end text-white">
              <h3 className="text-lg font-bold tracking-wide drop-shadow-sm group-hover:translate-x-1 transition-transform duration-300">
                {category.name}
              </h3>
              <p className="text-xs text-gray-300 font-medium mt-1">
                {category.count}
              </p>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}