import { ProjectsSection } from '@/components/RenderSection/Projects/Projects';
import { SECTIONS } from '@/constants/sections';
import { notFound } from 'next/navigation';

type ProjectProps = {
  params: { slug: string };
};

export default async function Project({ params }: ProjectProps) {
  const { slug } = await params;

  const section = SECTIONS.find((s): s is ProjectsSection => s.type === 'Projects' && 'projects' in s);

  if (!section) return notFound();

  const project = section.projects.find((p) => p.slug === slug);

  if (!project) return notFound();

  return <div>Project Page: {project.description}</div>;
}
