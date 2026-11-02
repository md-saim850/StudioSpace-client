import Link from "next/link";
import {ArrowRight} from "lucide-react";

const ownerSteps = [
  {
    number: "01",
    title: "Create Your Listing",
    description:
      "Add your studio details, photos, pricing, location, and available amenities.",
  },
  {
    number: "02",
    title: "Receive Bookings",
    description:
      "Let creators discover your space and receive booking requests from potential customers.",
  },
  {
    number: "03",
    title: "Manage Your Studio",
    description:
      "Manage your listings and bookings from your personal dashboard.",
  },
  {
    number: "04",
    title: "Grow Your Business",
    description:
      "Make your creative space more visible and connect with more creators.",
  },
];

export default function Owner() {
  return (
    <section className="bg-gray-50 dark:bg-[#101010] py-24">
      <div className="max-w-7xl mx-auto px-5">
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          <div>
            <p className="text-sm uppercase tracking-[0.25em] text-gray-500">
              For Studio Owners
            </p>

            <h2 className="text-3xl sm:text-5xl font-bold mt-4 leading-tight">
              Turn your creative space into an opportunity.
            </h2>

            <p className="text-gray-500 dark:text-gray-400 mt-6 leading-7">
              Have a photography studio, podcast room, or production
              space? Share your space with creators and grow your
              business through StudioSpace.
            </p>

            <Link
              href="/add-studio"
              className="inline-flex items-center gap-2 mt-8 bg-black text-white dark:bg-white dark:text-black px-7 py-3.5 rounded-full font-semibold hover:opacity-80 transition"
            >
              List Your Studio <ArrowRight size={18} />
            </Link>
          </div>

          <div className="space-y-7">
            {ownerSteps.map((step) => (
              <div key={step.number} className="flex gap-5">
                <div className="w-12 h-12 shrink-0 rounded-full border border-gray-300 dark:border-gray-700 flex items-center justify-center font-bold">
                  {step.number}
                </div>

                <div>
                  <h3 className="text-xl font-semibold">
                    {step.title}
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-2 leading-7">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>

  )
}
