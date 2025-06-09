import fetchCsv from '@/lib/services/utils/fetchCsv';
import CSV_URLS from '@/lib/services/config/csvUrls';
import type {
  CsvProjectRow,
  CsvProjectGoalRow,
  CsvProjectStackRow,
  CsvProjectExampleLinkRow,
} from '@/lib/services/types/csvTypes';
import Project from '@/components/Project/Project';
import { notFound } from 'next/navigation';
import { parseProject } from '@/lib/services/parsers/parseProject';
import parseHighlightWords from '@/lib/services/parsers/parseHighlightWords';

export async function generateStaticParams() {
  const projectsRaw: Array<CsvProjectRow> = await fetchCsv(CSV_URLS.Project);
  return projectsRaw.map((project) => ({ slug: project.slug }));
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const [projectsRaw, projectGoalsRaw, projectStackRaw, projectLinksRaw, highlightWords] = await Promise.all([
    fetchCsv<CsvProjectRow>(CSV_URLS.Project),
    fetchCsv<CsvProjectGoalRow>(CSV_URLS.ProjectGoals),
    fetchCsv<CsvProjectStackRow>(CSV_URLS.ProjectStack),
    fetchCsv<CsvProjectExampleLinkRow>(CSV_URLS.ProjectExampleLinks),
    parseHighlightWords(),
  ]);

  const p = projectsRaw.find((p) => p.slug === slug);
  if (!p) notFound();

  const project = parseProject(p, projectGoalsRaw, projectStackRaw, projectLinksRaw, highlightWords);

  return <Project project={project} />;
}
