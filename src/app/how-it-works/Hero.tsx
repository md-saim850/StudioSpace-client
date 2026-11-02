import Link from "next/link";
import {ArrowRight, Sparkles,} from "lucide-react";

export default function Hero() {
  return (
    <section className="max-w-7xl mx-auto px-5 pt-24 pb-20 text-center">
      <span className="inline-flex items-center gap-2 rounded-full border border-gray-300 dark:border-gray-700 px-4 py-2 text-sm">
        <Sparkles size={15} />
        Simple. Flexible. Creative.
      </span>

      <h1 className="mt-7 text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight">
        How StudioSpace
        <br />
        <span className="text-gray-400">Works.</span>
      </h1>

      <p className="max-w-2xl mx-auto mt-6 text-gray-600 dark:text-gray-400 text-base sm:text-lg leading-relaxed">
        Finding the perfect creative space or sharing your own studio
        has never been easier. Follow a few simple steps and make
        something extraordinary.
      </p>

      <div className="flex flex-wrap justify-center gap-4 mt-9">
        <Link
          href="/studios"
          className="inline-flex items-center gap-2 rounded-full bg-black text-white dark:bg-white dark:text-black px-7 py-3.5 font-semibold hover:opacity-80 transition"
        >
          Explore Studios <ArrowRight size={18} />
        </Link>

        <Link
          href="/add-studio"
          className="inline-flex items-center gap-2 rounded-full border border-gray-300 dark:border-gray-700 px-7 py-3.5 font-semibold hover:bg-gray-100 dark:hover:bg-gray-900 transition"
        >
          List Your Studio
        </Link>
      </div>
    </section>
  )
}
