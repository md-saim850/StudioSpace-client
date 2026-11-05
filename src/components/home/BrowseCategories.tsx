import { ArrowRight } from 'lucide-react';
import { CategoryType } from '@/type';
import Link from 'next/link';
import Empty from './Empty';
import StudioCategorySwiper from './StudioCategorySwiper';
import { API_URL } from '@/lib/config';

const getCategory = async (): Promise<CategoryType[]> => {
  try {
    const res = await fetch(`${API_URL}/category`, {
      next: {
        revalidate: 3600,
      },
    });

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
  const categoriesData: CategoryType[] = await getCategory();

  if (categoriesData.length === 0) {
    return <Empty />;
  }

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
      </div>

      {/* Swiper Auto Slider Component */}
      <StudioCategorySwiper categoriesData={categoriesData} />
    </section>
  );
}