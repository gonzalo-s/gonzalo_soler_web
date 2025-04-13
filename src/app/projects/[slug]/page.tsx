import Project from '@/components/Project/Project';

type ProjectProps = {
  params: Promise<{ slug: string }>;
};

export default async function ProjectPage({ params }: ProjectProps) {
  const { slug } = await params;

  return <Project slug={slug} />;
}
