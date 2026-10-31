import React from 'react';
import { 
  Search, 
  Calendar, 
  CreditCard, 
  Music, 
  ShieldCheck, 
  UserCheck, 
  Sparkles, 
  Headphones 
} from 'lucide-react';

interface Step {
  id: number;
  title: string;
  description: string;
  icon: React.ElementType;
}

interface Feature {
  id: number;
  title: string;
  description: string;
  icon: React.ElementType;
}

const stepsData: Step[] = [
  {
    id: 1,
    title: '1. Discover Spaces',
    description: 'Browse through our curated list of creative studios.',
    icon: Search,
  },
  {
    id: 2,
    title: '2. Select Shoot Hours',
    description: 'Choose your preferred date, time and duration.',
    icon: Calendar,
  },
  {
    id: 3,
    title: '3. Book Instantly',
    description: 'Confirm your booking with secure payment.',
    icon: CreditCard,
  },
  {
    id: 4,
    title: '4. Create & Produce',
    description: "Focus on your craft, we'll handle the rest.",
    icon: Music,
  },
];

const featuresData: Feature[] = [
  {
    id: 1,
    title: 'Liability Protection',
    description: 'All bookings include liability coverage for peace of mind.',
    icon: ShieldCheck,
  },
  {
    id: 2,
    title: 'Verified Profiles',
    description: 'We verify all hosts and creators for a safer community.',
    icon: UserCheck,
  },
  {
    id: 3,
    title: 'Equipment Safety',
    description: 'Studios are checked for professional-grade equipment.',
    icon: Sparkles,
  },
  {
    id: 4,
    title: '24/7 Support',
    description: 'Our team is here to help you, anytime.',
    icon: Headphones,
  },
];

export default function HowItWorks() {
  return (
    <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 py-12">
      {/* Top Section: Header & 4 Steps */}
      <div className="mb-10">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">
          How Booking Works
        </h2>
        <p className="text-sm text-gray-500 mt-1">
          Get started in just a few simple steps
        </p>

        {/* 4 Steps Container */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-5 mt-8">
          {stepsData.map((step, index) => {
            const Icon = step.icon;
            return (
              <div
                key={step.id}
                className={`flex flex-col items-start bg-gray-100 p-5 rounded-2xl`} 
              >
                {/* Icon Circle */}
                <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center mb-4">
                  <Icon className="w-5 h-5 text-gray-800" />
                </div>

                {/* Step Title & Subtitle */}
                <h3 className="font-bold text-gray-900 text-base mb-1">
                  {step.title}
                </h3>
                <p className="text-sm text-gray-500 leading-relaxed">
                  {step.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Bottom Dark Card: Host Guarantee & Creator Support */}
      <div className="bg-black text-white rounded-2xl p-6 sm:p-10 shadow-lg">
        {/* Banner Header */}
        <h3 className="text-xl sm:text-2xl font-bold tracking-tight">
          Host Guarantee & Creator Support
        </h3>
        <p className="text-xs sm:text-sm text-gray-400 mt-1 mb-8">
          Your safety and success are our priority
        </p>

        {/* Banner Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {featuresData.map((feature) => {
            const Icon = feature.icon;
            return (
              <div key={feature.id} className="flex flex-col items-start">
                {/* Icon Circle (Dark Theme) */}
                <div className="w-11 h-11 rounded-full bg-neutral-900 border border-neutral-800 flex items-center justify-center mb-3">
                  <Icon className="w-5 h-5 text-gray-200" />
                </div>

                {/* Feature Content */}
                <h4 className="font-semibold text-white text-base mb-1">
                  {feature.title}
                </h4>
                <p className="text-xs text-gray-400 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}