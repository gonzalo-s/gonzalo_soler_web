import { ProjectsSection, Project } from '@/components/RenderSection/Projects';
import fetchCsv from '../utils/fetchCsv';
import CSV_URLS from '../config/csvUrls';
import { ICONS } from '@/constants/icons';
import { StackIconProps } from '@/constants/StackIcon/StackIcon';
import parseHighlightWords from './parseHighlightWords';

export default async function parseProjectsSection(): Promise<ProjectsSection> {
  const projectsSectionRaw = await fetchCsv<any>(CSV_URLS.ProjectsSection);
  const projectsRaw = await fetchCsv<any>(CSV_URLS.Project);
  const projectGoalsRaw = await fetchCsv<any>(CSV_URLS.ProjectGoals);
  const projectStackRaw = await fetchCsv<any>(CSV_URLS.ProjectStack);
  const projectLinksRaw = await fetchCsv<any>(CSV_URLS.ProjectExampleLinks);
  const projectHighlightWords = await parseHighlightWords();

  if (!projectsSectionRaw.length) throw new Error('No ProjectsSection rows found.');

  const sectionRow = projectsSectionRaw[0];

  const projects: Project[] = projectsRaw.map((p) => {
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
        href: { [l.hrefType]: l.hrefValue },
        variant: l.variant,
        icon: { pre: l.iconPre === 'TRUE', icon: ICONS[l.iconName as keyof typeof ICONS] },
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
        href: p.ctaHrefValue ? { [p.ctaHrefType]: p.ctaHrefValue } : undefined,
        variant: p.ctaVariant || undefined,
        icon: p.ctaIconName
          ? { pre: p.ctaIconPre === 'TRUE', icon: ICONS[p.ctaIconName as keyof typeof ICONS] }
          : undefined,
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
    href: sectionRow.hrefValue ? { [sectionRow.hrefType]: sectionRow.hrefValue } : undefined,
    isMain: sectionRow.isMain === 'TRUE',
    isNav: sectionRow.isNav === 'TRUE',
    isFooter: sectionRow.isFooter === 'TRUE',
    buttonVariant: sectionRow.buttonVariant || undefined,
    projects,
  };

  return section;
}
