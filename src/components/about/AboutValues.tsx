
import {
  Heart,
  ShieldCheck,
  Zap,
  Sparkles,
} from "lucide-react";

const values = [
  {
    icon: Heart,
    title: "Creator First",
    description:
      "Everything we build starts with the needs of creative people.",
  },
  {
    icon: ShieldCheck,
    title: "Trust & Safety",
    description:
      "We aim to make finding and booking studios a reliable experience.",
  },
  {
    icon: Zap,
    title: "Simplicity",
    description:
      "We make discovering and reserving creative spaces simple.",
  },
  {
    icon: Sparkles,
    title: "Innovation",
    description:
      "We continuously improve the way people discover creative spaces.",
  },
];

export default function AboutValues() {
  return (
    <section className="py-20 px-5 bg-white dark:bg-gray-950">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-14">
          <span className="text-sm uppercase tracking-widest text-gray-500 dark:text-gray-400">
            What We Believe
          </span>
          <h2 className="text-3xl md:text-5xl font-bold mt-4 text-black dark:text-white">
            Our Core Values
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((value) => {
            const Icon = value.icon;

            return (
              <div
                key={value.title}
                className="p-8 border border-gray-200 rounded-2xl hover:bg-black hover:text-white transition duration-300 group dark:border-gray-800 dark:hover:bg-gray-800"
              >
                <Icon
                  size={32}
                  className="text-black group-hover:text-white dark:text-white"
                />

                <h3 className="text-xl font-bold mt-6">
                  {value.title}
                </h3>

                <p className="text-gray-500 group-hover:text-gray-300 mt-3 leading-7 dark:text-gray-400">
                  {value.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
