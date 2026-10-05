import type { ProjectsSection, Project } from '@/types/sections';
import fetchCsv from '../utils/fetchCsv';
import { contentUrls } from '@/config/content';
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
  const projectsSectionRaw: CsvProjectsSectionRow[] = await fetchCsv(contentUrls.projectsSection);
  const projectsRaw: CsvProjectRow[] = await fetchCsv(contentUrls.project);
  const projectGoalsRaw: CsvProjectGoalRow[] = await fetchCsv(contentUrls.projectGoals);
  const projectStackRaw: CsvProjectStackRow[] = await fetchCsv(contentUrls.projectStack);
  const projectLinksRaw: CsvProjectExampleLinkRow[] = await fetchCsv(contentUrls.projectExampleLinks);
  const projectHighlightWords = await parseHighlightWords();

  if (!projectsSectionRaw.length) throw new Error('No ProjectsSection rows found.');

  const sectionRow = projectsSectionRaw[0];

  const projects: Array<Project> = await Promise.all(
    projectsRaw.map((p) => parseProject(p, projectGoalsRaw, projectStackRaw, projectLinksRaw, projectHighlightWords)),
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
