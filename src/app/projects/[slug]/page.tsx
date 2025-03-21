import { ProjectsSection } from '@/components/RenderSection/Projects/Projects';
import { SECTIONS } from '@/constants/sections';
import { notFound } from 'next/navigation';

type ProjectProps = {
  params: { slug: string };
};

export default function Project(props: ProjectProps) {
  const { slug } = props.params;

  const projects = SECTIONS.find((section) => section.type === 'Projects');

  if (!projects) {
    return notFound();
  }

  const project = (projects as ProjectsSection).projects.find((project) => project.title === slug);

  return <div>Project Page</div>;
}
