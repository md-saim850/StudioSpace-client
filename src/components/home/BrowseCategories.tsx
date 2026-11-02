import { ArrowRight } from 'lucide-react';
import Image from 'next/image';
import { CategoryType } from '@/type';
import Link from 'next/link';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';

const getCategory = async (): Promise<CategoryType[]> => {
  const jwtToken = await auth.api.getToken({
    headers: await headers(),
  })
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/category?limit=6`,{
        cache: "no-store",
        headers:{
          "Authorization": `Bearer ${jwtToken?.token}`
        }
      }
    );

    if (!res.ok) {
      throw new Error("Failed to fetch category");
    }

    const category: CategoryType[] = await res.json();
    return category;

  } catch (error) {
    console.error("Error fetching category:", error);
    return [];

  }
};

export default async function BrowseCategories() {
  const categoriesData:CategoryType[] = await getCategory();

  return (
    <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 py-12">
      {/* Header Section */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight dark:text-white">
            Browse by Studio Categories
          </h2>
          <p className="text-sm text-gray-500 mt-1 dark:text-gray-400">
            Find the perfect space for your creative vision
          </p>
        </div>
        <Link
          href="/studios"
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-gray-700 hover:text-black transition-colors dark:text-gray-300 dark:hover:text-white"
        >
          View All <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-5">
        {categoriesData.map((category, indx:number) => (
          <Link
            key={indx}
            href={`/studios?category=${category.name.toLowerCase().replace(/\s+/g, "-")}`}
            className="group relative rounded-2xl overflow-hidden aspect-[4/3] sm:aspect-[3/4] shadow-sm hover:shadow-xl transition-all duration-300 block"
          >
            {/* Background Image with Zoom Effect */}
            <Image
              width={500}
              height={500}
              src={category.image}
              alt={category.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />

            {/* Dark Gradient Overlay for Contrast */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent transition-opacity group-hover:from-black/90" />

            {/* Overlay Text Content */}
            <div className="absolute bottom-0 left-0 right-0 p-5 flex flex-col justify-end text-white">
              <h3 className="text-lg font-bold tracking-wide drop-shadow-sm group-hover:translate-x-1 transition-transform duration-300">
                {category.name}
              </h3>
              <p className="text-xs text-gray-300 font-medium mt-1">
                {category.count}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}