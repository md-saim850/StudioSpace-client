'use client'
import { useState } from 'react';
import {
  Music,
  Calendar,
  Building2,
  Heart,
  Settings,
  LogOut,
  Menu,
  X,
} from 'lucide-react';
import Image from 'next/image';
import MyBookings from './MyBooking';
import MyStudioListings from './MyStudioListing';
import AddNewStudio from './AddNewStudio';

export default function UserDashboard() {
  const [activeTab, setActiveTab] = useState('My Bookings');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { name: 'My Bookings', icon: Calendar },
    { name: 'My Listings', icon: Building2 },
    { name: 'Add New Studio', icon: Music},
    { name: 'Favorites', icon: Heart },
    { name: 'Profile Settings', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col md:flex-row">
      {/* Mobile Top Navbar Bar */}
      <div className="md:hidden bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img
            src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=150&auto=format&fit=crop"
            alt="Sayeem Ahmad"
            className="w-9 h-9 rounded-full object-cover"
          />
          <div>
            <h4 className="font-semibold text-sm text-gray-900">Sayeem Ahmad</h4>
            <p className="text-xs text-gray-500">sayeem@gmail.com</p>
          </div>
        </div>
        <button
          type="button"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="p-2 text-gray-600 hover:text-black focus:outline-none"
        >
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Sidebar Component */}
      <aside
        className={`${
          isMobileMenuOpen ? 'block' : 'hidden'
        } md:block w-full md:w-64 bg-white border-r border-gray-200 p-6 flex-shrink-0 flex flex-col justify-between`}
      >
        <div>
          {/* User Profile Header (Desktop) */}
          <div className="hidden md:flex items-center gap-3 mb-8">
            <Image
              width={500}
              height={500}
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=150&auto=format&fit=crop"
              alt="Sayeem Ahmad"
              className="w-10 h-10 rounded-full object-cover border border-gray-100 shadow-sm"
            />
            <div className="overflow-hidden">
              <h4 className="font-bold text-sm text-gray-900 truncate">Sayeem Ahmad</h4>
              <p className="text-xs text-gray-500 truncate">sayeem@gmail.com</p>
            </div>
          </div>

          {/* Navigation Items */}
          <nav className="space-y-1.5">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.name;
              return (
                <button
                  key={item.name}
                  type="button"
                  onClick={() => {
                    setActiveTab(item.name);
                    setIsMobileMenuOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-gray-100 text-gray-900 font-semibold'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-gray-900' : 'text-gray-500'}`} />
                  {item.name}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Logout Button */}
        <div className="pt-6 border-t border-gray-100 mt-6">
          <button
            type="button"
            className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium text-gray-600 hover:bg-red-50 hover:text-red-600 transition-colors"
          >
            <LogOut className="w-4 h-4 text-gray-500 hover:text-red-600" />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-6 md:p-10 max-w-6xl w-full">

        {activeTab === 'My Bookings' && (
          <MyBookings />
        )}

        {activeTab === 'My Listings' && (
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              <MyStudioListings />
            </h1>
          </div>
        )}

        {activeTab === 'Add New Studio' && (
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              <AddNewStudio />
            </h1>
          </div>
        )}

        {activeTab === 'Favorites' && (
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              My Favorites
            </h1>
          </div>
        )}

        {activeTab === 'Profile Settings' && (
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Profile Settings
            </h1>
          </div>
        )}

      </main>

    </div>
  );
}