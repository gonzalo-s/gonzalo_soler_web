import { ProjectsSection, Project } from '@/components/RenderSection/Projects';
import fetchCsv from '../utils/fetchCsv';
import CSV_URLS from '../config/csvUrls';
import { ICONS } from '@/constants/icons';
import { StackIconProps } from '@/constants/StackIcon/StackIcon';
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

export default async function parseProjectsSection(): Promise<ProjectsSection> {
  const projectsSectionRaw: CsvProjectsSectionRow[] = await fetchCsv(CSV_URLS.ProjectsSection);
  const projectsRaw: CsvProjectRow[] = await fetchCsv(CSV_URLS.Project);
  const projectGoalsRaw: CsvProjectGoalRow[] = await fetchCsv(CSV_URLS.ProjectGoals);
  const projectStackRaw: CsvProjectStackRow[] = await fetchCsv(CSV_URLS.ProjectStack);
  const projectLinksRaw: CsvProjectExampleLinkRow[] = await fetchCsv(CSV_URLS.ProjectExampleLinks);
  const projectHighlightWords = await parseHighlightWords();

  if (!projectsSectionRaw.length) throw new Error('No ProjectsSection rows found.');

  const sectionRow = projectsSectionRaw[0];

  const projects: Array<Project> = projectsRaw.map((p) => {
    const goalsList = projectGoalsRaw.filter((g) => g.projectId === p.projectId).map((g) => g.goal);

    const stack = projectStackRaw
      .filter((s) => s.projectId === p.projectId)
      .map<StackIconProps>((s) => ({
        stackIconName: s.stackIconName,
        displayName: s.displayName,
        size: s.size,
      }));

    const exampleLinks = projectLinksRaw
      .filter((l) => l.projectId === p.projectId)
      .map((l) => ({
        text: l.text,
        href: getHrefGuard({ hrefType: l.hrefType, hrefValue: l.hrefValue }),
        variant: l.variant,
        icon: l.iconName ? { pre: toBoolean(l.iconPre), icon: ICONS[l.iconName] } : undefined,
      }));

    return {
      title: p.title,
      slug: p.slug,
      description: p.description,
      shortDescription: p.shortDescription,
      goalsDetail: p.goalsDetail,
      image: { src: p.imageSrc, alt: p.imageAlt },
      cta: {
        text: p.ctaText,
        href: getHrefGuard({ hrefType: p.ctaHrefType, hrefValue: p.ctaHrefValue }),
        variant: p.ctaVariant || undefined,
        icon: p.ctaIconName ? { pre: toBoolean(p.ctaIconPre), icon: ICONS[p.ctaIconName] } : undefined,
      },
      goalsList,
      stack,
      exampleLinks,
      highlightWords: projectHighlightWords,
    };
  });

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
