import { CalendarCheck, Camera, CreditCard, Search } from 'lucide-react';

const renterSteps = [
  {
    number: "01",
    icon: Search,
    title: "Discover Your Space",
    description:
      "Explore photography studios, film stages, podcast lounges, and creative spaces that match your vision.",
  },
  {
    number: "02",
    icon: CalendarCheck,
    title: "Choose Your Schedule",
    description:
      "Select your preferred studio, date, and booking time. Review the details before confirming.",
  },
  {
    number: "03",
    icon: CreditCard,
    title: "Confirm Your Booking",
    description:
      "Submit your booking request and follow the booking instructions to secure your creative space.",
  },
  {
    number: "04",
    icon: Camera,
    title: "Create Something Amazing",
    description:
      "Arrive at your booked studio and bring your creative ideas to life.",
  },
];

export default function Renter() {
  return (
    <section className="max-w-7xl mx-auto px-5 py-24">
      <div className="mb-14">
        <p className="text-sm uppercase tracking-[0.25em] text-gray-500">
          For Creators
        </p>
        <h2 className="text-3xl sm:text-5xl font-bold mt-4">
          Book a studio in 4 steps.
        </h2>
        <p className="text-gray-500 dark:text-gray-400 mt-4 max-w-xl">
          From discovering your ideal space to starting your next
          creative project.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {renterSteps.map((step) => {
          const Icon = step.icon;

          return (
            <div
              key={step.number}
              className="border border-gray-200 dark:border-gray-800 rounded-2xl p-7 hover:border-black dark:hover:border-white transition group"
            >
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-400 font-semibold">
                  STEP {step.number}
                </span>
                <Icon
                  size={25}
                  className="text-gray-500 group-hover:text-black dark:group-hover:text-white transition"
                />
              </div>

              <h3 className="text-xl font-bold mt-12">
                {step.title}
              </h3>

              <p className="text-sm text-gray-500 dark:text-gray-400 leading-7 mt-4">
                {step.description}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  )
}
