import { Project } from '@/components/RenderSection/Projects';
import { ICONS } from '@/constants/icons';
import { StackIconProps } from '@/constants/StackIcon/StackIcon';
import { toBoolean } from '../utils/toBoolean';
import getHrefGuard from '../utils/getHrefGuard';
import { replaceEscapedNewlines } from '../utils/replaceEscapedNewlines';
import type { CsvProjectRow, CsvProjectGoalRow, CsvProjectStackRow, CsvProjectExampleLinkRow } from '../types/csvTypes';

export function parseProject(
  p: CsvProjectRow,
  projectGoalsRaw: Array<CsvProjectGoalRow>,
  projectStackRaw: Array<CsvProjectStackRow>,
  projectLinksRaw: Array<CsvProjectExampleLinkRow>,
  highlightWords: Array<string>,
): Project {
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
    description: replaceEscapedNewlines(p.description),
    shortDescription: p.shortDescription,
    goalsDetail: replaceEscapedNewlines(p.goalsDetail),
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
    highlightWords,
  };
}
