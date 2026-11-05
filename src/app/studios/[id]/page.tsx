import { notFound } from "next/navigation";
import StudioDetails from "./StudioDetails";
import { StudioType } from "@/type";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { API_URL } from "@/lib/config";


interface Props {
  params: Promise<{ id: string }>;
}

async function getStudio(id: string): Promise<StudioType | null> {
  const jwtToken = await auth.api.getToken({
    headers: await headers(),
  })

  const res = await fetch(`${API_URL}/studios/${id}`,{ 
    next:{
      revalidate:60,
    },
    headers:{
      "Authorization": `Bearer ${jwtToken?.token}`
    }
  });

  if (res.status === 404) return null;

  if (!res.ok) {
    throw new Error("Failed to fetch studio");
  }

  const data = await res.json();
  return data;
}

export default async function StudioDetailsPage({params}: Props) {
  const { id } = await params;

  const studio = await getStudio(id);

  if (!studio) notFound();

  return <StudioDetails studio={studio} />;
}
