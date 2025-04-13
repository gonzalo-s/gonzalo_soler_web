import { ProjectsSection } from '@/components/RenderSection/Projects';
import { SECTIONS } from '@/constants/sections';
import { notFound } from 'next/navigation';
import Project from '@/components/Project/Project';

type ProjectProps = {
  params: { slug: string };
};

export default function ProjectPage({ params }: ProjectProps) {
  const { slug } = params;

  const section = SECTIONS.find((s): s is ProjectsSection => s.type === 'Projects' && 'projects' in s);
  const foundProject = section?.projects.find((p) => p.slug === slug);

  if (!foundProject) {
    notFound();
  }

  return <Project project={foundProject} />;
}
