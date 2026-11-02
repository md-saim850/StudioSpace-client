
import StudiosCard from "@/components/home/StudiosCard";
import { auth } from "@/lib/auth";
import type { StudioType } from "@/type";
import { headers } from "next/headers";

interface PageProps {searchParams: Promise<{category?: string;}>;}

const getStudios = async (category?: string): Promise<StudioType[]> => {
  try {
    const jwtToken = await auth.api.getToken({
      headers: await headers(),
    });

    const url = new URL(`${process.env.NEXT_PUBLIC_API_URL}/studios`);

    if (category) {
      url.searchParams.set("category", category);
    }

    const res = await fetch(url.toString(), {
      cache: "no-store",
      headers: {
        Authorization: `Bearer ${jwtToken?.token}`,
      },
    });

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

export default async function Page({ searchParams }: PageProps) {
  const { category } = await searchParams;

  const studiosData = await getStudios(category);

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

      {/* Studios */}
      {studiosData.length === 0 ? (
        <div className="text-center py-20">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            No studios found!
          </h2>
          <p className="text-gray-500 mt-2">
            Try exploring another category.
          </p>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 mt-5">
          {studiosData.map((data, indx) => (
            <StudiosCard
              key={data._id ?? indx}
              index={indx}
              studio={data}
            />
          ))}
        </div>
      )}
    </div>
  );
}
