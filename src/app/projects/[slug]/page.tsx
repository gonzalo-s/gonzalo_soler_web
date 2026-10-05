import fetchCsv from '@/lib/services/utils/fetchCsv';
import { contentUrls } from '@/config/content';
import type {
  CsvProjectRow,
  CsvProjectGoalRow,
  CsvProjectStackRow,
  CsvProjectExampleLinkRow,
} from '@/lib/services/types/csvTypes';
import ProjectDetails from '@/components/templates/ProjectDetails/ProjectDetails';
import { notFound } from 'next/navigation';
import { parseProject } from '@/lib/services/parsers/parseProject';
import parseHighlightWords from '@/lib/services/parsers/parseHighlightWords';

export async function generateStaticParams() {
  const projectsRaw: Array<CsvProjectRow> = await fetchCsv(contentUrls.project);
  return projectsRaw.map((project) => ({ slug: project.slug }));
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const [projectsRaw, projectGoalsRaw, projectStackRaw, projectLinksRaw, highlightWords] = await Promise.all([
    fetchCsv<CsvProjectRow>(contentUrls.project),
    fetchCsv<CsvProjectGoalRow>(contentUrls.projectGoals),
    fetchCsv<CsvProjectStackRow>(contentUrls.projectStack),
    fetchCsv<CsvProjectExampleLinkRow>(contentUrls.projectExampleLinks),
    parseHighlightWords(),
  ]);

  const p = projectsRaw.find((p) => p.slug === slug);
  if (!p) notFound();

  const project = await parseProject(p, projectGoalsRaw, projectStackRaw, projectLinksRaw, highlightWords);

  return <ProjectDetails project={project} />;
}
