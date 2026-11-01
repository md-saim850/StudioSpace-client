
import {
  TrendingUp,
  ArrowRight,
} from 'lucide-react';
import Image from 'next/image';

interface StatCard {
  id: string;
  title: string;
  value: string;
  growth: string;
}

interface Booking {
  id: string;
  title: string;
  dateTime: string;
  status: 'Confirmed' | 'Pending' | 'Cancelled';
  price: number;
  image: string;
}

const statsData: StatCard[] = [
  { id: '1', title: 'Total Bookings', value: '12', growth: '+ 20%' },
  { id: '2', title: 'Active Bookings', value: '3', growth: '+ 50%' },
  { id: '3', title: 'Total Spent', value: '$2,480', growth: '+ 12%' },
];

const bookingsData: Booking[] = [
  {
    id: '1',
    title: 'The Ivory Cyc Studio',
    dateTime: 'Nov 15, 2026 - 11:00 AM - 1:00 PM',
    status: 'Confirmed',
    price: 150,
    image: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?q=80&w=200&auto=format&fit=crop',
  },
  {
    id: '2',
    title: 'Urban Sound Stage',
    dateTime: 'Nov 20, 2026 - 2:00 PM - 6:00 PM',
    status: 'Pending',
    price: 480,
    image: 'https://images.unsplash.com/photo-1598653222000-6b7b7a552625?q=80&w=200&auto=format&fit=crop',
  },
  {
    id: '3',
    title: 'The Vibe Podcast Room',
    dateTime: 'Nov 28, 2026 - 10:00 AM - 12:00 PM',
    status: 'Confirmed',
    price: 90,
    image: 'https://images.unsplash.com/photo-1590602847861-f357a9332bbc?q=80&w=200&auto=format&fit=crop',
  },
];

export default function MyBookings() {
  return (
    <div className="space-y-8">

      {/* Page Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
          My Bookings
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          Manage and track all your studio bookings.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        {statsData.map((stat) => (
          <div
            key={stat.id}
            className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm"
          >
            <span className="text-xs font-semibold text-gray-500 tracking-wide uppercase">
              {stat.title}
            </span>

            <div className="mt-4">
              <h3 className="text-3xl font-bold text-gray-900">
                {stat.value}
              </h3>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Bookings Card */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">

        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-bold text-gray-900">
            All Bookings
          </h2>

          <span className="text-xs text-gray-500">
            {bookingsData.length} Bookings
          </span>
        </div>

        {/* Bookings List */}
        <div className="divide-y divide-gray-100">
          {bookingsData.map((booking) => (
            <div
              key={booking.id}
              className="py-4 first:pt-0 last:pb-0 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
            >
              {/* Booking Details */}
              <div className="flex items-center gap-4">
                <Image
                  width={200}
                  height={200}
                  src={booking.image}
                  alt={booking.title}
                  className="w-16 h-14 rounded-xl object-cover border border-gray-100 shrink-0"
                />

                <div>
                  <h3 className="font-bold text-sm text-gray-900">
                    {booking.title}
                  </h3>

                  <p className="text-xs text-gray-400 mt-0.5">
                    {booking.dateTime}
                  </p>
                </div>
              </div>

              {/* Status & Price */}
              <div className="flex items-center justify-between sm:justify-end gap-6 border-t sm:border-t-0 pt-2 sm:pt-0 border-gray-50">

                <span
                  className={`px-3 py-1 rounded-full text-xs font-semibold border ${
                    booking.status === 'Confirmed'
                      ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                      : booking.status === 'Pending'
                      ? 'bg-amber-50 text-amber-700 border-amber-200'
                      : 'bg-gray-50 text-gray-600 border-gray-200'
                  }`}
                >
                  {booking.status}
                </span>

                <span className="font-bold text-sm text-gray-900 min-w-[50px] text-right">
                  ${booking.price}
                </span>

              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
