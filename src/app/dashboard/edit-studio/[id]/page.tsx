import AddNewStudio from '../../add-studio/page';

interface Props {
  params: Promise<{ id: string }>;
}

export default async function EditStudioPage({ params }: Props) {
  const { id } = await params;

  return <AddNewStudio studioId={id} />;
}