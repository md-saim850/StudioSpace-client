import React, { useState } from 'react';
import { Plus, Eye, Calendar, DollarSign } from 'lucide-react';
import Image from 'next/image';

interface ListingItem {
  id: string;
  title: string;
  dateTime: string;
  status: 'Confirmed' | 'Pending' | 'Canceled';
  price: number;
  image: string;
  tabCategory: 'upcoming' | 'past' | 'canceled';
}

const allListingsData: ListingItem[] = [
  {
    id: '1',
    title: 'The Ivory Cyc Studio',
    dateTime: 'Nov 15, 2026 - 11:00 AM - 1:00 PM',
    status: 'Confirmed',
    price: 150,
    image: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?q=80&w=200&auto=format&fit=crop',
    tabCategory: 'upcoming',
  },
  {
    id: '2',
    title: 'Urban Sound Stage',
    dateTime: 'Nov 20, 2026 - 2:00 PM - 6:00 PM',
    status: 'Pending',
    price: 480,
    image: 'https://images.unsplash.com/photo-1598653222000-6b7b7a552625?q=80&w=200&auto=format&fit=crop',
    tabCategory: 'upcoming',
  },
  {
    id: '3',
    title: 'The Vibe Podcast Room',
    dateTime: 'Nov 28, 2026 - 10:00 AM - 12:00 PM',
    status: 'Confirmed',
    price: 90,
    image: 'https://images.unsplash.com/photo-1590602847861-f357a9332bbc?q=80&w=200&auto=format&fit=crop',
    tabCategory: 'upcoming',
  },
  {
    id: '4',
    title: 'Echo Recording Studio',
    dateTime: 'Oct 10, 2026 - 1:00 PM - 5:00 PM',
    status: 'Confirmed',
    price: 360,
    image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=200&auto=format&fit=crop',
    tabCategory: 'past',
  },
  {
    id: '5',
    title: 'The Canvas Workshop',
    dateTime: 'Sep 05, 2026 - 9:00 AM - 1:00 PM',
    status: 'Canceled',
    price: 240,
    image: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?q=80&w=200&auto=format&fit=crop',
    tabCategory: 'canceled',
  },
];

export default function MyStudioListings() {
  const [activeTab, setActiveTab] = useState<'upcoming' | 'past' | 'canceled'>('upcoming');

  const filteredListings = allListingsData.filter(
    (item) => item.tabCategory === activeTab
  );

  return (
    <div className="w-full max-w-6xl mx-auto p-4 sm:p-6 bg-gray-50 min-h-screen">
      {/* Top Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
            My Studio Listings
          </h1>
          <p className="text-sm text-gray-500 mt-0.5">
            Manage your studio spaces and availability.
          </p>
        </div>

        {/* Add New Studio Button */}
        <button
          type="button"
          className="inline-flex items-center justify-center gap-2 bg-black hover:bg-gray-800 text-white text-xs font-semibold px-4 py-2.5 rounded-xl shadow-sm transition-colors self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          Add New Studio
        </button>
      </div>

      {/* Tabs Filter */}
      <div className="flex items-center gap-2 mb-6">
        {[
          { key: 'upcoming', label: 'Upcoming' },
          { key: 'past', label: 'Past' },
          { key: 'canceled', label: 'Canceled' },
        ].map((tab) => (
          <button
            key={tab.key}
            type="button"
            onClick={() => setActiveTab(tab.key as any)}
            className={`px-5 py-2 rounded-xl text-xs font-semibold transition-colors border ${
              activeTab === tab.key
                ? 'bg-black text-white border-black'
                : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-100'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Listings Container Card */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 sm:p-6">
        {filteredListings.length > 0 ? (
          <div className="divide-y divide-gray-100">
            {filteredListings.map((listing) => (
              <div
                key={listing.id}
                className="py-4 first:pt-0 last:pb-0 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                {/* Left Side: Thumbnail & Details */}
                <div className="flex items-center gap-4">
                  <Image
                    width={500}
                    height={500}
                    src={listing.image}
                    alt={listing.title}
                    className="w-16 h-14 rounded-xl object-cover border border-gray-100 shrink-0"
                  />
                  <div>
                    <h3 className="font-bold text-sm text-gray-900">{listing.title}</h3>
                    <p className="text-xs text-gray-400 mt-0.5 flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {listing.dateTime}
                    </p>
                  </div>
                </div>

                {/* Right Side: Status Badge, Price & Action Button */}
                <div className="flex items-center justify-between sm:justify-end gap-6 border-t sm:border-t-0 pt-3 sm:pt-0 border-gray-50">
                  {/* Status Pill */}
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold border ${
                      listing.status === 'Confirmed'
                        ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                        : listing.status === 'Pending'
                        ? 'bg-amber-50 text-amber-700 border-amber-200'
                        : 'bg-rose-50 text-rose-700 border-rose-200'
                    }`}
                  >
                    {listing.status}
                  </span>

                  {/* Price */}
                  <span className="font-bold text-sm text-gray-900 min-w-[50px] text-right">
                    ${listing.price}
                  </span>

                  {/* View Details Button */}
                  <button
                    type="button"
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg border border-gray-200 hover:border-black text-xs font-semibold text-gray-700 hover:text-black transition-colors"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 text-gray-400 text-sm">
            No {activeTab} listings found.
          </div>
        )}
      </div>
    </div>
  );
}