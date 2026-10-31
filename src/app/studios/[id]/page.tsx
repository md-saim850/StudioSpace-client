
import { notFound } from "next/navigation";
import StudioDetails, { Studio } from "./StudioDetails";

interface Props {
  params: Promise<{ id: string }>;
}

async function getStudio(id: string): Promise<Studio | null> {

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/studios/${id}`,
    { cache: "no-store" }
  );

  if (res.status === 404) return null;

  if (!res.ok) {
    throw new Error("Failed to fetch studio");
  }

  const data = await res.json();

  return data.studio;
}

export default async function StudioDetailsPage({
  params,
}: Props) {
  const { id } = await params;

  const studio = await getStudio(id);

  if (!studio) notFound();

  return <StudioDetails studio={studio} />;
}
