import Image from 'next/image';
import UpdateBtn from './UpdateBtn';
import DeleteBtn from './DeleteBtn';

const getMyListing = async () => {
  try {
    const response = await fetch('http://localhost:5000/my-listing');
    
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
  return (
    <div className="space-y-8">

      {/* Page Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
          My listings
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          Manage and track all your studio listings.
        </p>
      </div>

      {/* Recent listings Card */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">

        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-bold text-gray-900">
            All listings
          </h2>

          <span className="text-xs text-gray-500">
            {listingData.length} listings
          </span>
        </div>

        {/* listings List */}
        <div className="divide-y divide-gray-100">
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
                  className="w-16 h-14 rounded-xl object-cover border border-gray-100 shrink-0"
                />

                <div>
                  <h3 className="font-bold text-sm text-gray-900">
                    {listing.data.title}
                  </h3>

                  <p className="text-xs text-gray-400 mt-0.5">
                    {listing.data.dateTime}
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap sm:flex-nowrap items-center justify-between sm:justify-end gap-3 sm:gap-4 border-t sm:border-t-0 pt-3 sm:pt-0 border-gray-100">
                {/* Hourly Rate */}
                <span className="font-bold text-sm text-gray-900 min-w-[50px] text-right tabular-nums">
                  ${listing.data.hourlyRate} <span className="text-xs text-gray-500 font-normal">/ hr</span>
                </span>

                {/* Actions Group */}
                <div className="flex items-center gap-2 shrink-0">
                  {/* Update Button */}
                  <UpdateBtn />

                  {/* Delete Button */}
                  <DeleteBtn id={listing._id} />

                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}