import Image from 'next/image';
import Link from 'next/link';
import DeleteBtn from './DeleteBtn';

interface StatCard {
  id: string;
  title: string;
  value: string;
}

const getMyBooking = async () => {
  try {
    const response = await fetch('http://localhost:5000/my-booking');
    
    if (!response.ok) {
      throw new Error('Failed to fetch bookings');
    }
    
    const data = await response.json();
    return data;

  } catch (error) {
    console.error('Error fetching bookings:', error);
    return [];
  }
};

export default async function MyBookings() {

  const bookingsData = await getMyBooking();

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
          {bookingsData.map((booking, index:number) => (
            <div
              key={index}
              className="py-4 first:pt-0 last:pb-0 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
            >
              {/* Booking Details */}
              <Link href={`/studios/${booking.studio._id}`} className="flex items-center gap-4">
                <Image
                  width={200}
                  height={200}
                  src={booking.studio.data.image}
                  alt={booking.studio.data.title}
                  className="w-16 h-14 rounded-xl object-cover border border-gray-100 shrink-0"
                />

                <div>
                  <h3 className="font-bold text-sm text-gray-900">
                    {booking.studio.data.title}
                  </h3>

                  <p className="text-xs text-gray-400 mt-0.5">
                    {`${booking.date} ${booking.time}`}
                  </p>
                </div>
              </Link>

              {/* Status Badge */}
              <div className="flex flex-wrap sm:flex-nowrap items-center justify-between sm:justify-end gap-3 sm:gap-4 border-t sm:border-t-0 pt-3 sm:pt-0 border-gray-100">
                <span
                  className={`px-3 py-1 rounded-full text-xs font-semibold border inline-flex items-center justify-center shrink-0 ${
                    booking.status === 'Confirmed'
                      ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                      : booking.status === 'Pending'
                      ? 'bg-amber-50 text-amber-700 border-amber-200'
                      : 'bg-gray-50 text-gray-600 border-gray-200'
                  }`}
                >
                  {booking.status}
                </span>

                {/* Hourly Rate */}
                <span className="font-bold text-sm text-gray-900 shrink-0 tabular-nums">
                  ${booking.studio.data.hourlyRate} <span className="text-xs text-gray-500 font-normal">/ hr</span>
                </span>

                {/* Cancel Action Button */}
                <DeleteBtn id={booking._id}/>
              </div>

            </div>
          ))}
        </div>
      </div>

    </div>
  );
}