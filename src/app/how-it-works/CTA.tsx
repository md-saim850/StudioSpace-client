import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

export default function CTA() {
  return (
    <section className="max-w-7xl mx-auto px-5 pb-24">
      <div className="bg-black dark:bg-white text-white dark:text-black rounded-3xl p-10 sm:p-16 text-center">
        <h2 className="text-3xl sm:text-5xl font-bold">
          Ready to create something?
        </h2>

        <p className="mt-5 text-gray-300 dark:text-gray-600 max-w-xl mx-auto">
          Your next creative project deserves the perfect space.
          Discover yours today.
        </p>

        <Link
          href="/studios"
          className="inline-flex items-center gap-2 mt-8 rounded-full bg-white text-black dark:bg-black dark:text-white px-8 py-4 font-semibold hover:opacity-80 transition"
        >
          Find Your Studio <ArrowRight size={18} />
        </Link>
      </div>
    </section>
  )
}
