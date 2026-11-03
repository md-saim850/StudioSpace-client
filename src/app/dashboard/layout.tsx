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
import { authClient } from '@/lib/auth-client';
import { redirect } from 'next/navigation';


export default function DashboardLayout({children,}: {children: React.ReactNode}) {
  const [activeTab, setActiveTab] = useState('My Bookings');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const {data:session, isPending} = authClient.useSession();

  const navItems = [
    { name: 'My Bookings', icon: Calendar , link:"my-booking"},
    { name: 'My Listings', icon: Building2, link:"my-listings"},
    { name: 'Add New Studio', icon: Music, link:"add-studio"},
    { name: 'Favorites', icon: Heart },
    { name: 'Profile Settings', icon: Settings },
  ];

  
  const handleSignOut = async() =>{
    await authClient.signOut();
    redirect('/sign-in');
  }
  return (
    <div>
      <div className="min-h-screen bg-gray-50 flex flex-col md:flex-row dark:bg-gray-950">
        {/* Mobile Top Navbar Bar */}
        <div className="md:hidden bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between dark:bg-gray-900 dark:border-gray-800">
          <div className="flex items-center gap-3">
              {!isPending &&(
                <div>
                  <h4 className="font-semibold text-sm text-gray-900 dark:text-white">{session?.user.name}</h4>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{session?.user.email}</p>
                </div>
              )}
          </div>
          <button
            type="button"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 text-gray-600 hover:text-black focus:outline-none dark:text-gray-400 dark:hover:text-white"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Sidebar Component */}
        <aside
          className={`${
            isMobileMenuOpen ? 'block' : 'hidden'
          } md:block w-full md:w-64 bg-white border-r border-gray-200 p-6 flex-shrink-0 flex flex-col justify-between dark:bg-gray-900 dark:border-gray-800`}
        >
          <div>
            {/* User Profile Header (Desktop) */}
            <div className="hidden md:flex items-center gap-3 mb-8">
              {!isPending && (
                <div className="overflow-hidden">
                  <h4 className="font-bold text-sm text-gray-900 truncate dark:text-white">{session?.user.name}</h4>
                  <p className="text-xs text-gray-500 truncate dark:text-gray-400">{session?.user.email}</p>
                </div>
              )}
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
                      redirect(`/dashboard/${item.link}`);
                    }}
                    className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                      isActive
                        ? 'bg-gray-100 text-gray-900 font-semibold dark:bg-gray-800 dark:text-white'
                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-white'
                    }`}
                  >
                    <Icon className={`w-4 h-4 ${isActive ? 'text-gray-900 dark:text-white' : 'text-gray-500 dark:text-gray-400'}`} />
                    {item.name}
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Logout Button */}
          <div className="pt-6 border-t border-gray-100 mt-6 dark:border-gray-800">
            <button
              onClick={handleSignOut}
              type="button"
              className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium text-gray-600 hover:bg-red-50 hover:text-red-600 transition-colors dark:text-gray-400 dark:hover:bg-red-950/40 dark:hover:text-red-400"
            >
              <LogOut className="w-4 h-4 text-gray-500 hover:text-red-600 dark:text-gray-400 dark:hover:text-red-400" />
              Logout
            </button>
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 p-6 md:p-10 max-w-6xl w-full">
          {children}
        </main>

      </div>
    </div >
  )
}