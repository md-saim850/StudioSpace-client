
import StudioFilters from "./StudioFilters";
import type { StudioType } from "@/type"

interface PageProps {
  searchParams: Promise<{ category?: string }>;
}

const getStudios = async (): Promise<StudioType[]> => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/studios`,{
        next:{
          revalidate:60, 
        }
      }
    );

    if (!res.ok) {
      throw new Error("Failed to fetch studios");
    }

    return await res.json();
  } catch (error) {
    console.error("Error fetching studios:", error);
    return [];
  }
};

export default async function Page({ searchParams }: PageProps) {
  const { category } = await searchParams;

  const studiosData = await getStudios();
  console.log(studiosData.length);

  const categoryTitle = category 
  ? category.split("-").map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(" ")
  : "Explore Studios";

  return (
    <div className="min-h-screen max-w-7xl mx-auto p-5">

      {/* Header */}
      <div>
        <h1 className="font-bold text-3xl text-gray-900 dark:text-white">
          {categoryTitle}
        </h1>

        <p className="text-gray-800 dark:text-gray-200">
          Discover the perfect space for your creative project.
        </p>
      </div>

      {/* Search, Category Filter, Sorting and Cards */}
      <StudioFilters studios={studiosData} />

    </div>
  );
}
