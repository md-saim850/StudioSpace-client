
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function AboutHero() {
  return (
    <section className="bg-black text-white py-24 px-5 dark:bg-gray-900 dark:border-b dark:border-gray-800">
      <div className="max-w-7xl mx-auto text-center">
        <span className="text-sm uppercase tracking-[0.3em] text-gray-400">
          About StudioSpace
        </span>

        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mt-6 leading-tight">
          Find Your Space.
          <br />
          Create Your Vision.
        </h1>

        <p className="text-gray-400 max-w-2xl mx-auto mt-7 text-base md:text-lg leading-relaxed">
          We make it easier for creators, photographers, filmmakers,
          and professionals to discover and book the perfect creative space.
        </p>

        <Link
          href="/studios"
          className="inline-flex items-center gap-2 bg-white text-black px-7 py-3 rounded-full mt-9 font-semibold hover:bg-gray-200 transition"
        >
          Explore Studios <ArrowRight size={18} />
        </Link>
      </div>
    </section>
  );
}
