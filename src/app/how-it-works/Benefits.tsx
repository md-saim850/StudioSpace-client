import {
  ShieldCheck,
  Clock,
  Users,
} from "lucide-react";

const benefits = [
  {
    icon: ShieldCheck,
    title: "Secure Booking",
    description: "Clear booking details and transparent pricing.",
  },
  {
    icon: Clock,
    title: "Save Time",
    description: "Find and book creative spaces without unnecessary hassle.",
  },
  {
    icon: Users,
    title: "Creative Community",
    description: "Connect studio owners with passionate creators.",
  },
];

export default function Benefits() {
  return (
    <section className="max-w-7xl mx-auto px-5 py-24">
      <div className="text-center mb-14">
        <p className="text-sm uppercase tracking-[0.25em] text-gray-500">
          Why StudioSpace
        </p>
        <h2 className="text-3xl sm:text-5xl font-bold mt-4">
          Made for creativity.
        </h2>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {benefits.map((benefit) => {
          const Icon = benefit.icon;

          return (
            <div key={benefit.title} className="text-center p-8">
              <Icon size={32} className="mx-auto mb-5" />
              <h3 className="text-xl font-bold">
                {benefit.title}
              </h3>
              <p className="text-gray-500 dark:text-gray-400 mt-3 leading-7">
                {benefit.description}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  )
}
