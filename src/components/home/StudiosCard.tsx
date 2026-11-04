import type { StudioType } from '@/type'
import { ArrowRight, MapPin, Star } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

interface Props {
  studio: StudioType
  index: number
}

export default function StudiosCard({ studio, index }: Props) {
  return (
    <div
      key={index}
      className="flex flex-col bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow overflow-hidden group dark:bg-gray-900 dark:border-gray-800"
    >
      {/* Image & Badge Container */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-gray-100 dark:bg-gray-800">
        <Image
          width={400}
          height={300}
          src={studio.data.image}
          alt={studio.data.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />

        {/* Category Badge */}
        <div className="absolute top-3 left-3 bg-black/70 backdrop-blur-md text-white text-xs px-3 py-1 rounded-full font-medium">
          {studio.data.category}
        </div>

        {/* Rating Badge (Top Right) */}
        <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-md text-gray-900 text-xs px-2.5 py-1 rounded-full font-semibold flex items-center gap-1 shadow-sm dark:bg-gray-900/90 dark:text-gray-100">
          <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
          <span>{studio.data.rating || 4.5}</span>
        </div>
      </div>

      {/* Card Content */}
      <div className="p-4 flex flex-col flex-grow justify-between">
        <div>
          {/* Title */}
          <h3 className="font-semibold text-gray-900 text-base line-clamp-1 group-hover:text-black dark:text-gray-100 dark:group-hover:text-white">
            {studio.data.title}
          </h3>

          {/* Price */}
          <div className="mt-3 text-gray-900 dark:text-gray-100">
            <span className="text-lg font-bold">${studio.data.hourlyRate}</span>
            <span className="text-xs text-gray-500 font-normal dark:text-gray-400"> / hr</span>
          </div>

          {/* Location */}
          <div className="flex items-center gap-1 mt-2 text-xs text-gray-500 dark:text-gray-400">
            <MapPin className="w-3.5 h-3.5 text-gray-400 shrink-0 dark:text-gray-500" />
            <span className="truncate">{studio.data.location}</span>
          </div>
        </div>

        {/* Action Button */}
        <Link
          href={`/studios/${studio._id}`}
          className="w-full mt-4 bg-black hover:bg-white hover:text-black hover:border text-white text-xs font-semibold py-2.5 px-3 rounded-xl flex items-center justify-center gap-1.5 transition-colors dark:bg-white dark:text-black dark:hover:bg-gray-800 dark:hover:text-white dark:hover:border-gray-700"
        >
          View Details
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  )
}