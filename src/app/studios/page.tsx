import StudiosCard from '@/components/home/StudiosCard';
import type{ StudioType } from '@/type';

const getStudios = async (): Promise<StudioType[]> => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/studios`,{
        cache: "no-store",
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

export default async function page() {

  const studiosData = await getStudios();

  return (
    <div className="min-h-screen max-w-7xl mx-auto p-5">
      <div className="">
        <h1 className='font-bold text-3xl'>Explore Studios</h1>
        <p className='text-gray-800'>Descover the perfect space for your creative project.</p>
      </div>

      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 mt-5">
        {studiosData?.map((data, indx) => (
          <StudiosCard key={indx} index={indx} studio={data}/>
        ))}
      </div>
      
    </div>
  )
}
