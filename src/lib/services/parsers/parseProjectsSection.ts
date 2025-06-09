import { ProjectsSection, Project } from '@/components/RenderSection/Projects';
import fetchCsv from '../utils/fetchCsv';
import CSV_URLS from '../config/csvUrls';
import type {
  CsvProjectsSectionRow,
  CsvProjectRow,
  CsvProjectGoalRow,
  CsvProjectStackRow,
  CsvProjectExampleLinkRow,
} from '../types/csvTypes';
import parseHighlightWords from './parseHighlightWords';
import { toBoolean } from '../utils/toBoolean';
import getHrefGuard from '../utils/getHrefGuard';
import { parseProject } from './parseProject';

export default async function parseProjectsSection(): Promise<ProjectsSection> {
  const projectsSectionRaw: CsvProjectsSectionRow[] = await fetchCsv(CSV_URLS.ProjectsSection);
  const projectsRaw: CsvProjectRow[] = await fetchCsv(CSV_URLS.Project);
  const projectGoalsRaw: CsvProjectGoalRow[] = await fetchCsv(CSV_URLS.ProjectGoals);
  const projectStackRaw: CsvProjectStackRow[] = await fetchCsv(CSV_URLS.ProjectStack);
  const projectLinksRaw: CsvProjectExampleLinkRow[] = await fetchCsv(CSV_URLS.ProjectExampleLinks);
  const projectHighlightWords = await parseHighlightWords();

  if (!projectsSectionRaw.length) throw new Error('No ProjectsSection rows found.');

  const sectionRow = projectsSectionRaw[0];

  const projects: Array<Project> = projectsRaw.map((p) =>
    parseProject(p, projectGoalsRaw, projectStackRaw, projectLinksRaw, projectHighlightWords),
  );

  const section: ProjectsSection = {
    type: 'Projects',
    title: sectionRow.title,
    description: sectionRow.description,
    href: getHrefGuard({ hrefType: sectionRow.hrefType, hrefValue: sectionRow.hrefValue }),
    isMain: toBoolean(sectionRow.isMain),
    isNav: toBoolean(sectionRow.isNav),
    isFooter: toBoolean(sectionRow.isFooter),
    buttonVariant: sectionRow.buttonVariant || undefined,
    projects,
  };

  return section;
}
