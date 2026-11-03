import Image from 'next/image';
import Link from 'next/link';
import DeleteBtn from './DeleteBtn';
import { auth } from '@/lib/auth';
import Empty from '@/components/home/Empty';
import { CalendarDays, Clock } from 'lucide-react';
import type{ Booking } from '@/type';
import { headers } from 'next/headers';

export const dynamic = "force-dynamic";

const getMyBooking = async () => {
  try {
    const jwtToken = await auth.api.getToken({
      headers: await headers(),
    })

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/my-booking`,{
      headers:{
        "Authorization": `Bearer ${jwtToken?.token}`
      }
    });
    
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

const calculateTotalHours = (startTime: string, endTime: string) => {
  const [startHour, startMinute] = startTime.split(":").map(Number);
  const [endHour, endMinute] = endTime.split(":").map(Number);

  const start = startHour * 60 + startMinute;
  const end = endHour * 60 + endMinute;

  return (end - start) / 60;
};

export default async function MyBookings() {

  const bookingsData = await getMyBooking();

  if(bookingsData.length === 0){
    return <Empty />
  }

  return (
    <div className="space-y-8">

      {/* Page Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
          My Bookings
        </h1>
        <p className="text-sm text-gray-500 mt-1 dark:text-gray-400">
          Manage and track all your studio bookings.
        </p>
      </div>

      {/* Recent Bookings Card */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 dark:bg-gray-900 dark:border-gray-800">

        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-bold text-gray-900 dark:text-white">
            All Bookings
          </h2>

          <span className="text-xs text-gray-500 dark:text-gray-400">
            {bookingsData.length} Bookings
          </span>
        </div>

        {/* Bookings List */}
        <div className="divide-y divide-gray-100 dark:divide-gray-800">

          {bookingsData.map((booking:Booking, index:number) => {
            const totalHours = calculateTotalHours(
              booking.startTime,
              booking.endTime
            );

            const totalPrice = totalHours * Number(booking.studio.hourlyRate);

            return(
              <div
                key={index}
                className="py-4 first:pt-0 last:pb-0 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                {/* Booking Details */}
                <Link href={`/studios/${booking.studio._id}`} className="flex items-center gap-4">
                  <Image
                    width={200}
                    height={200}
                    src={booking.studio.image}
                    alt={booking.studio.title}
                    className="w-16 h-14 rounded-xl object-cover border border-gray-100 shrink-0 dark:border-gray-800"
                  />

                  <div>
                    <h3 className="font-bold text-sm text-gray-900 dark:text-white">
                      {booking.studio.title}
                    </h3>

                    <div className="text-xs text-gray-400 mt-0.5 flex">
                      <div className='flex gap-4'>
                        <div className="flex gap-1    ">
                          <CalendarDays size={15} className='text-yellow-300'/> {booking.date}
                        </div> 
                          <div className="flex gap-1 items-center">
                            <Clock size={15} className="text-yellow-300" />
                            {booking.startTime} - {booking.endTime}
                            <span className="text-gray-500">
                              ({totalHours.toFixed(2)} hrs)
                            </span>
                          </div>
                      </div>
                    </div>
                  </div>
                </Link>

                {/* Status Badge */}
                <div className="flex flex-wrap sm:flex-nowrap items-center justify-between sm:justify-end gap-3 sm:gap-4 border-t sm:border-t-0 pt-3 sm:pt-0 border-gray-100 dark:border-gray-800">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold border inline-flex items-center justify-center shrink-0 ${
                      booking.status === 'Confirmed'
                        ? 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-400 dark:border-emerald-800'
                        : booking.status === 'Pending'
                        ? 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/40 dark:text-amber-400 dark:border-amber-800'
                        : 'bg-gray-50 text-gray-600 border-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700'
                    }`}
                  >
                    {booking.status}
                  </span>

                  {/* Hourly Rate */}
                  <span className="font-bold text-sm text-gray-900 shrink-0 tabular-nums dark:text-white">

                    <span className="font-bold text-sm text-gray-900 dark:text-white">
                      ${totalPrice.toFixed(2)} <span className="text-xs text-gray-500 font-normal dark:text-gray-400">/ hr</span>
                    </span>
                  </span>

                  {booking.status !== "Confirmed" && (
                    <DeleteBtn id={booking._id}/>
                  )}
                </div>

              </div>
            )
          })}
        </div>
      </div>

    </div>
  );
}