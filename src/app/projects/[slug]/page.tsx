import { ProjectsSection } from '@/components/RenderSection/Projects';
import { SECTIONS } from '@/constants/sections';
import { notFound } from 'next/navigation';
import Project from '@/components/Project/Project';

type ProjectProps = {
  params: Promise<{ slug: string }>;
};

export default async function ProjectPage({ params }: ProjectProps) {
  const { slug } = await params;

  const section = SECTIONS.find((s): s is ProjectsSection => s.type === 'Projects' && 'projects' in s);
  const foundProject = section?.projects.find((p) => p.slug === slug);

  if (!foundProject) {
    notFound();
  }

  return <Project project={foundProject} />;
}
