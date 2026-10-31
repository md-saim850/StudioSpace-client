import { Star, MapPin, ArrowRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

interface Studio {
  id: string;
  title: string;
  category: string;
  image: string;
  rating: number;
  reviewsCount: number;
  pricePerHour: number;
  location: string;
}

const studiosData: Studio[] = [
  {
    id: '1',
    title: 'The Ivory Cyc Studio',
    category: 'Photography',
    image: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?q=80&w=600&auto=format&fit=crop',
    rating: 4.9,
    reviewsCount: 104,
    pricePerHour: 75,
    location: 'Brooklyn, NY',
  },
  {
    id: '2',
    title: 'Urban Sound Stage',
    category: 'Sound Stage',
    image: 'https://images.unsplash.com/photo-1598653222000-6b7b7a552625?q=80&w=600&auto=format&fit=crop',
    rating: 4.8,
    reviewsCount: 184,
    pricePerHour: 120,
    location: 'Los Angeles, CA',
  },
  {
    id: '3',
    title: 'The Vibe Podcast Room',
    category: 'Podcast',
    image: 'https://images.unsplash.com/photo-1590602847861-f357a9332bbc?q=80&w=600&auto=format&fit=crop',
    rating: 4.9,
    reviewsCount: 113,
    pricePerHour: 45,
    location: 'Austin, TX',
  },
  {
    id: '4',
    title: 'Echo Recording Studio',
    category: 'Music',
    image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=600&auto=format&fit=crop',
    rating: 4.9,
    reviewsCount: 133,
    pricePerHour: 90,
    location: 'San Francisco, CA',
  },
  {
    id: '5',
    title: 'The Canvas Workshop',
    category: 'Art',
    image: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?q=80&w=600&auto=format&fit=crop',
    rating: 4.8,
    reviewsCount: 108,
    pricePerHour: 60,
    location: 'Chicago, IL',
  },
  {
    id: '6',
    title: 'Lumen Photo Studio',
    category: 'Photography',
    image: 'https://images.unsplash.com/photo-1768818928341-3b31b8965c6d?q=80&w=627&auto=format&fit=crop',
    rating: 4.8,
    reviewsCount: 154,
    pricePerHour: 95,
    location: 'Chicago, IL',
  },
];

export default function FeaturedStudios() {
  return (
    <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 py-12">
      {/* Section Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">
            Featured Studios
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            Top rated and most popular studios on StudioSpace
          </p>
        </div>

        <Link
          href="#all-studios"
          className="inline-flex items-center gap-1 text-sm font-semibold text-gray-700 hover:text-black transition-colors"
        >
          View All <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      {/* Studios Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
        {studiosData.map((studio) => (
          <div
            key={studio.id}
            className="flex flex-col bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow overflow-hidden group"
          >
            {/* Image & Badge Container */}
            <div className="relative aspect-[4/3] w-full overflow-hidden bg-gray-100">
              <Image
                width={400}
                height={300}
                src={studio.image}
                alt={studio.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />

              {/* Category Badge */}
              <div className="absolute top-3 left-3 bg-black/70 backdrop-blur-md text-white text-xs px-3 py-1 rounded-full font-medium">
                {studio.category}
              </div>
            </div>

            {/* Card Content */}
            <div className="p-4 flex flex-col flex-grow justify-between">
              <div>
                {/* Title */}
                <h3 className="font-semibold text-gray-900 text-base line-clamp-1 group-hover:text-black">
                  {studio.title}
                </h3>

                {/* Rating */}
                <div className="flex items-center gap-1.5 mt-1.5 text-xs text-gray-600">
                  <Star className="w-3.5 h-3.5 fill-black text-black" />
                  <span className="font-semibold text-gray-900">{studio.rating}</span>
                  <span className="text-gray-400">({studio.reviewsCount})</span>
                </div>

                {/* Price */}
                <div className="mt-3 text-gray-900">
                  <span className="text-lg font-bold">${studio.pricePerHour}</span>
                  <span className="text-xs text-gray-500 font-normal"> / hr</span>
                </div>

                {/* Location */}
                <div className="flex items-center gap-1 mt-2 text-xs text-gray-500">
                  <MapPin className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                  <span className="truncate">{studio.location}</span>
                </div>
              </div>

              {/* Action Button */}
              <Link
                href="#"
                className="w-full mt-4 bg-black hover:bg-white hover:text-black hover:border   text-white text-xs font-semibold py-2.5 px-3 rounded-xl flex items-center justify-center gap-1.5 transition-colors"
              >
                View Details
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}