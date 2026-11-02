
import { Camera, Lightbulb, Users } from "lucide-react";

const features = [
  {
    icon: Camera,
    title: "Creative Spaces",
    description:
      "Discover professional studios designed for photography, filmmaking, and content creation.",
  },
  {
    icon: Lightbulb,
    title: "Simple Booking",
    description:
      "Find your ideal space, check the details, and book your next creative session easily.",
  },
  {
    icon: Users,
    title: "Creator Community",
    description:
      "We connect creative professionals with spaces where their ideas can become reality.",
  },
];

export default function AboutStory() {
  return (
    <section className="py-20 px-5 bg-white dark:bg-gray-950">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-14 items-center">
        <div>
          <span className="text-sm uppercase tracking-widest text-gray-500 dark:text-gray-400">
            Our Story
          </span>

          <h2 className="text-3xl md:text-5xl font-bold text-black mt-4 dark:text-white">
            A Better Way to Find Your Creative Space
          </h2>

          <p className="text-gray-600 mt-6 leading-8 dark:text-gray-300">
            Finding the right studio shouldn't be difficult.
            We created StudioSpace to bring creative spaces and
            talented people together in one convenient platform.
          </p>

          <p className="text-gray-600 mt-4 leading-8 dark:text-gray-300">
            Whether you are a photographer, filmmaker, podcaster,
            or content creator, our goal is to help you find
            a space that matches your vision.
          </p>
        </div>

        <div className="grid gap-5">
          {features.map((feature) => {
            const Icon = feature.icon;

            return (
              <div
                key={feature.title}
                className="flex gap-5 p-6 border border-gray-200 rounded-2xl hover:border-black transition dark:border-gray-800 dark:hover:border-white dark:hover:bg-gray-900"
              >
                <div className="w-12 h-12 shrink-0 bg-black text-white rounded-xl flex items-center justify-center dark:bg-white dark:text-black">
                  <Icon size={23} />
                </div>

                <div>
                  <h3 className="text-lg font-bold text-black dark:text-white">
                    {feature.title}
                  </h3>
                  <p className="text-gray-500 mt-2 leading-7 dark:text-gray-400">
                    {feature.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
