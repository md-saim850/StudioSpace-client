import Image from 'next/image'
import React from 'react'

export default function Main() {
  return (
    <section className="max-w-7xl mx-auto px-5">
      <div className="relative h-[300px] sm:h-[450px] overflow-hidden rounded-3xl">
        <Image
          fill
          src="https://images.unsplash.com/photo-1497366754035-f200968a6e72"
          alt="Creative studio workspace"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/35 flex items-end p-8 sm:p-12">
          <div className="text-white max-w-xl">
            <p className="text-sm uppercase tracking-[0.3em] mb-3">
              Your Space. Your Vision.
            </p>
            <h2 className="text-3xl sm:text-5xl font-bold">
              Everything starts with the right space.
            </h2>
          </div>
        </div>
      </div>
    </section>
  )
}
