
import Link from "next/link";
import {
  ArrowRight,
  Camera,
  CalendarCheck,
  Users,
  Sparkles,
} from "lucide-react";

const features = [
  {
    icon: Camera,
    title: "Creative Spaces",
    description: "Discover professional studios for every creative project.",
  },
  {
    icon: CalendarCheck,
    title: "Easy Booking",
    description: "Find and book your ideal studio in just a few clicks.",
  },
  {
    icon: Users,
    title: "Built for Creators",
    description: "A platform connecting creative people and studio owners.",
  },
];

export default function AboutSection() {
  return (
    <section className="py-20 px-5 bg-white">
      <div className="max-w-7xl mx-auto">

        {/* Section Header */}
        <div className="grid lg:grid-cols-2 gap-12 items-center">

          <div>
            <span className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-widest text-gray-500">
              <Sparkles size={16} />
              About StudioSpace
            </span>

            <h2 className="text-3xl md:text-5xl font-bold text-black mt-5 leading-tight">
              Your Creative Space,
              <span className="text-gray-400"> Your Next Big Idea.</span>
            </h2>

            <p className="text-gray-600 leading-8 mt-6 max-w-xl">
              StudioSpace makes finding and booking creative spaces
              easier than ever. Whether you're a photographer,
              filmmaker, podcaster, or content creator, discover
              the perfect environment to bring your ideas to life.
            </p>

            <Link
              href="/about"
              className="inline-flex items-center gap-3 bg-black text-white px-7 py-3.5 rounded-full mt-8 font-semibold hover:bg-gray-800 transition-all group"
            >
              Learn More About Us
              <ArrowRight
                size={18}
                className="group-hover:translate-x-1 transition-transform"
              />
            </Link>
          </div>

          {/* Feature Cards */}
          <div className="grid sm:grid-cols-2 gap-5">

            {features.map((feature, index) => {
              const Icon = feature.icon;

              return (
                <div
                  key={feature.title}
                  className={`p-7 rounded-2xl border border-gray-200 hover:border-black transition-all duration-300 hover:shadow-lg ${
                    index === 0 ? "sm:col-span-2" : ""
                  }`}
                >
                  <div className="w-12 h-12 rounded-xl bg-black text-white flex items-center justify-center">
                    <Icon size={23} />
                  </div>

                  <h3 className="text-xl font-bold mt-5 text-black">
                    {feature.title}
                  </h3>

                  <p className="text-gray-500 mt-2 leading-7">
                    {feature.description}
                  </p>
                </div>
              );
            })}

          </div>
        </div>

        {/* Bottom Highlight */}
        <div className="mt-16 border-t border-gray-200 pt-8 flex flex-col md:flex-row justify-between gap-4 items-start md:items-center">
          <p className="text-gray-500 text-sm">
            Making creative spaces accessible to everyone.
          </p>

          <Link
            href="/about"
            className="text-black font-semibold inline-flex items-center gap-2 hover:gap-3 transition-all"
          >
            Discover Our Story <ArrowRight size={17} />
          </Link>
        </div>

      </div>
    </section>
  );
}
