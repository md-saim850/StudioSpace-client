import type{ Studio } from '@/type'
import { ArrowRight, MapPin, Star } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

interface Props{
  studio:Studio
}

export default function StudiosCard({studio}:Props) {
  return (
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
          href={`/studios/${studio._id}`}
          className="w-full mt-4 bg-black hover:bg-white hover:text-black hover:border text-white text-xs font-semibold py-2.5 px-3 rounded-xl flex items-center justify-center gap-1.5 transition-colors"
        >
          View Details
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  )
}
