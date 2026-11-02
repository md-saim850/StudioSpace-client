
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function AboutCTA() {
  return (
    <section className="px-5 py-20 bg-white dark:bg-gray-950">
      <div className="max-w-7xl mx-auto bg-black text-white rounded-3xl p-10 md:p-16 text-center dark:bg-gray-900 dark:border dark:border-gray-800">
        <h2 className="text-3xl md:text-5xl font-bold">
          Ready to Create Something Amazing?
        </h2>

        <p className="text-gray-400 max-w-xl mx-auto mt-5 leading-7">
          Discover inspiring creative spaces and find the perfect
          studio for your next project.
        </p>

        <Link
          href="/studios"
          className="inline-flex items-center gap-2 bg-white text-black px-7 py-3 rounded-full mt-8 font-semibold hover:bg-gray-200 transition"
        >
          Find Your Studio
          <ArrowRight size={18} />
        </Link>
      </div>
    </section>
  );
}
