import { Project } from '@/components/RenderSection/Projects';
import { StackIconProps } from '@/constants/StackIcon/StackIcon';
import getHrefGuard from '../utils/getHrefGuard';
import { replaceEscapedNewlines } from '../utils/replaceEscapedNewlines';
import { buildIcon } from '../utils/resolveIcon';
import type { CsvProjectRow, CsvProjectGoalRow, CsvProjectStackRow, CsvProjectExampleLinkRow } from '../types/csvTypes';

export async function parseProject(
  p: CsvProjectRow,
  projectGoalsRaw: Array<CsvProjectGoalRow>,
  projectStackRaw: Array<CsvProjectStackRow>,
  projectLinksRaw: Array<CsvProjectExampleLinkRow>,
  highlightWords: Array<string>,
): Promise<Project> {
  const goalsList = projectGoalsRaw.filter((g) => g.projectId === p.projectId).map((g) => g.goal);

  const stack = projectStackRaw
    .filter((s) => s.projectId === p.projectId)
    .map<StackIconProps>((s) => ({
      stackIconName: s.stackIconName,
      displayName: s.displayName,
      size: s.size,
    }));

  const exampleLinks = await Promise.all(
    projectLinksRaw
      .filter((l) => l.projectId === p.projectId)
      .map(async (l) => ({
        text: l.text,
        href: getHrefGuard({ hrefType: l.hrefType, hrefValue: l.hrefValue }),
        variant: l.variant,
        icon: await buildIcon(l.iconName, l.iconPre),
      })),
  );

  return {
    title: p.title,
    slug: p.slug,
    description: replaceEscapedNewlines(p.description),
    shortDescription: p.shortDescription,
    goalsDetail: replaceEscapedNewlines(p.goalsDetail),
    image: { src: p.imageSrc, alt: p.imageAlt },
    cta: {
      text: p.ctaText,
      href: getHrefGuard({ hrefType: p.ctaHrefType, hrefValue: p.ctaHrefValue }),
      variant: p.ctaVariant || undefined,
      icon: await buildIcon(p.ctaIconName, p.ctaIconPre),
    },
    goalsList,
    stack,
    exampleLinks,
    highlightWords,
  };
}
