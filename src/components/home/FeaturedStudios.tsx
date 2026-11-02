import type{ StudioType } from '@/type';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import StudiosCard from './StudiosCard';
import { headers } from 'next/headers';
import { auth } from '@/lib/auth';

const getStudios = async (): Promise<StudioType[]> => {
  const jwtToken = await auth.api.getToken({
    headers: await headers(),
  })
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/studios?limit=6`,{
        cache: "no-store",
        headers:{
          "Authorization":`Bearer ${jwtToken?.token}`
        }
      }
    );

    if (!res.ok) {
      throw new Error("Failed to fetch studios");
    }

    const studios: StudioType[] = await res.json();

    return studios;

  } catch (error) {
    console.error("Error fetching studios:", error);
    return [];

  }
};

export default async function FeaturedStudios() {
  const studiosData = await getStudios();

  return (
    <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 py-12">
      {/* Section Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight dark:text-white">
            Featured Studios
          </h2>
          <p className="text-sm text-gray-500 mt-1 dark:text-gray-400">
            Top rated and most popular studios on StudioSpace
          </p>
        </div>

        <Link
          href="/studios"
          className="inline-flex items-center gap-1 text-sm font-semibold text-gray-700 hover:text-black transition-colors dark:text-gray-300 dark:hover:text-white"
        >
          View All <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      {/* Studios Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3   gap-5">
        {studiosData.map((studio, index:number) => (
          <StudiosCard key={index} studio={studio} index={index}/>
        ))}
      </div>
    </section>
  );
}