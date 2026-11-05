import { notFound } from "next/navigation";
import StudioDetails from "./StudioDetails";
import { StudioType } from "@/type";

interface Props {
  params: Promise<{ id: string }>;
}

async function getStudio(id: string): Promise<StudioType | null> {

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/studios/${id}`,{ 
    next:{
      revalidate:60,
    },
  });

  if (res.status === 404 || res.status === 204) {
    notFound(); 
  }

  if (!res.ok) {
    throw new Error("Failed to fetch studio");
  }

  const data = await res.json();

  if(!data){
    notFound();
  }

  return data;
}

export default async function StudioDetailsPage({params}: Props) {
  const { id } = await params;

  const studio = await getStudio(id);

  if (!studio) notFound();

  return <StudioDetails studio={studio} />;
}
