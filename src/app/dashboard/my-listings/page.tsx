import Image from 'next/image';
import DeleteBtn from './DeleteBtn';
import { headers } from 'next/headers';
import { auth } from '@/lib/auth';
import Link from 'next/link';
import Empty from '@/components/home/Empty';
import { Pencil, SquareArrowOutUpRight } from 'lucide-react';

const getMyListing = async () => {
  const jwtToken = await auth.api.getToken({
    headers: await headers(),
  })
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/my-listings`,{
      headers: {
        "Authorization": `Bearer ${jwtToken?.token}`
      },
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch listings');
    }
    
    const data = await response.json();

    return data;

  } catch (error) {
    console.error('Error fetching listings:', error);
    return [];
  }
};

export default async function Mylistings() {
  const listingData = await getMyListing();

  if(listingData.length === 0){
    return <Empty />
  }

  return (
    <div className="space-y-8">

      {/* Page Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
          My listings
        </h1>
        <p className="text-sm text-gray-500 mt-1 dark:text-gray-400">
          Manage and track all your studio listings.
        </p>
      </div>

      {/* Recent listings Card */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 dark:bg-gray-900 dark:border-gray-800">

        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-bold text-gray-900 dark:text-white">
            All listings
          </h2>

          <span className="text-xs text-gray-500 dark:text-gray-400">
            {listingData.length} listings
          </span>
        </div>

        {/* listings List */}
        <div className="divide-y divide-gray-100 dark:divide-gray-800">
          {listingData.map((listing, indx:number) => (
            <div
              key={indx}
              className="py-4 first:pt-0 last:pb-0 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
            >
              {/* listing Details */}
              <div className="flex items-center gap-4">
                <Image
                  width={200}
                  height={200}
                  src={listing.data.image}
                  alt={listing.data.title}
                  className="w-16 h-14 rounded-xl object-cover border border-gray-100 shrink-0 dark:border-gray-800"
                />

                <div>
                  <h3 className="font-bold text-sm text-gray-900 dark:text-white">
                    {listing.data.title}
                  </h3>

                  <p className="text-xs text-gray-400 mt-0.5 dark:text-gray-500">
                    {listing.data.dateTime}
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap sm:flex-nowrap items-center justify-between sm:justify-end gap-3 sm:gap-4 border-t sm:border-t-0 pt-3 sm:pt-0 border-gray-100 dark:border-gray-800">
                {/* Hourly Rate */}
                <span className="font-bold text-sm text-gray-900 min-w-[50px] text-right tabular-nums dark:text-white">
                  ${listing.data.hourlyRate} <span className="text-xs text-gray-500 font-normal dark:text-gray-400">/ hr</span>
                </span>

                {/* Actions Group */}
                <div className="flex items-center gap-2 shrink-0">
                  {/* Update Button */}
                  <Link
                    href={`/dashboard/edit-studio/${listing._id}`}
                    className="flex items-center gap-1 text-sm rounded-lg bg-black px-3 py-1 text-white dark:bg-white dark:text-black"
                  >
                    <Pencil size={13}/>
                    Update
                  </Link>

                  {/* Delete Button */}
                  <DeleteBtn id={listing._id} />

                  <Link href={`/studios/${listing._id}`}><SquareArrowOutUpRight size={18}/></Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}