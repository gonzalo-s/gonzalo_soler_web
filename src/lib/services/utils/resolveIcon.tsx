import 'server-only';
import { JSX } from 'react';
import type { IconType } from 'react-icons';
import type { ButtonIcon } from '@/components/Button/Button';
import { ICONS } from '@/constants/icons';

// Module namespaces also carry a `default` export, so the values are widened to
// `unknown` and the looked-up entry is narrowed back to IconType at use.
type IconModule = Record<string, unknown>;

/**
 * Maps a react-icons export prefix to the sub-packages to search, newest variant
 * first (e.g. `Fa` lives in both `fa6` and `fa`). Build-time, server-only resolution
 * keeps the icon packs out of the client bundle — the parsers render the icon to an
 * element that is serialized across the RSC boundary, so only the SVG ships.
 */
const PACK_LOADERS: Record<string, Array<() => Promise<IconModule>>> = {
  Ai: [() => import('react-icons/ai')],
  Bi: [() => import('react-icons/bi')],
  Bs: [() => import('react-icons/bs')],
  Cg: [() => import('react-icons/cg')],
  Ci: [() => import('react-icons/ci')],
  Di: [() => import('react-icons/di')],
  Fa: [() => import('react-icons/fa6'), () => import('react-icons/fa')],
  Fc: [() => import('react-icons/fc')],
  Fi: [() => import('react-icons/fi')],
  Gi: [() => import('react-icons/gi')],
  Go: [() => import('react-icons/go')],
  Gr: [() => import('react-icons/gr')],
  Hi: [() => import('react-icons/hi2'), () => import('react-icons/hi')],
  Im: [() => import('react-icons/im')],
  Io: [() => import('react-icons/io5'), () => import('react-icons/io')],
  Lia: [() => import('react-icons/lia')],
  Lu: [() => import('react-icons/lu')],
  Md: [() => import('react-icons/md')],
  Pi: [() => import('react-icons/pi')],
  Ri: [() => import('react-icons/ri')],
  Rx: [() => import('react-icons/rx')],
  Si: [() => import('react-icons/si')],
  Sl: [() => import('react-icons/sl')],
  Tb: [() => import('react-icons/tb')],
  Tfi: [() => import('react-icons/tfi')],
  Ti: [() => import('react-icons/ti')],
  Vsc: [() => import('react-icons/vsc')],
  Wi: [() => import('react-icons/wi')],
};

const warned = new Set<string>();

function warnOnce(name: string) {
  if (warned.has(name)) return;
  warned.add(name);
  // eslint-disable-next-line no-console
  console.warn(
    `[resolveIcon] Unknown icon "${name}" — not a curated alias nor a resolvable react-icons name. Rendering no icon.`,
  );
}

/**
 * Resolves a CMS-provided icon name to a rendered element.
 * - First honours the curated aliases in ICONS (backward compatible, e.g. "linkedin").
 * - Otherwise treats the value as a react-icons export name (e.g. "FaDownload",
 *   "MdEmail") and looks it up in the matching pack(s).
 * Returns undefined for empty/unknown names so a bad value never breaks the build.
 */
export async function resolveIcon(name?: string): Promise<JSX.Element | undefined> {
  if (!name) return undefined;

  if (name in ICONS) return ICONS[name as keyof typeof ICONS];

  const prefix = name.match(/^[A-Z][a-z]*/)?.[0];
  const loaders = prefix ? PACK_LOADERS[prefix] : undefined;

  if (loaders) {
    for (const load of loaders) {
      const pack = await load();
      const Icon = pack[name] as IconType | undefined;
      if (Icon) return <Icon />;
    }
  }

  warnOnce(name);
  return undefined;
}

/**
 * Builds the `{ pre, icon }` shape used by buttons/sections, or undefined when the
 * name is missing/unresolvable. Accepts the CSV "TRUE"/"FALSE" string or a boolean.
 */
export async function buildIcon(name?: string, pre?: string | boolean): Promise<ButtonIcon | undefined> {
  const icon = await resolveIcon(name);
  if (!icon) return undefined;
  return { pre: pre === true || pre === 'TRUE', icon };
}
