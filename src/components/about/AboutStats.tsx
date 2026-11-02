
const stats = [
  { number: "100+", label: "Creative Studios" },
  { number: "500+", label: "Happy Creators" },
  { number: "1K+", label: "Bookings Made" },
  { number: "24/7", label: "Online Access" },
];

export default function AboutStats() {
  return (
    <section className="bg-gray-100 py-20 px-5">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-black">
            Our Impact
          </h2>
          <p className="text-gray-500 mt-3">
            Bringing creative ideas and spaces together.
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <h3 className="text-4xl md:text-5xl font-bold text-black">
                {stat.number}
              </h3>
              <p className="text-gray-500 mt-3">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
