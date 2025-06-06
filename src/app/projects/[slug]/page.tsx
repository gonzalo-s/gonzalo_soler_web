// import { ProjectsSection } from '@/components/RenderSection/Projects';
// import { SECTIONS } from '@/constants/sections';
import { notFound } from 'next/navigation';
import Project from '@/components/Project/Project';
import parseProjectsSection from '@/lib/services/parsers/parseProjectsSection';

type ProjectProps = {
  params: Promise<{ slug: string }>;
};

export default async function ProjectPage({ params }: ProjectProps) {
  const { slug } = await params;

  const googleSheetProjectData = await parseProjectsSection();

  const projectMatched = googleSheetProjectData.projects.find((p) => p.slug === slug);

  // const section = SECTIONS.find((s): s is ProjectsSection => s.type === 'Projects' && 'projects' in s);

  // const foundProject = section?.projects.find((p) => p.slug === slug);

  if (!projectMatched) {
    notFound();
  }

  return <Project project={projectMatched} />;
}
