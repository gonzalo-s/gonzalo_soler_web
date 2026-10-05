# Contributor guidance

## Commands

- Install dependencies: `npm ci`
- Run locally: `npm run dev`
- Validate a change: `npm run lint`, `npm run typecheck`, and `npm run build`
- Check formatting without rewriting files: `npm run format:check`

## Project-specific conventions

- Site content is loaded from public Google Sheets CSV endpoints during the build; preserve static generation and fail clearly when a required content section is absent.
- Treat empty CSV cells as missing values when a fallback is intended, and use the existing parsing helpers for boolean and link values.
- Keep theme colors expressed through the CSS custom properties in `src/styles/theme-map.scss`; avoid duplicating palette literals in component styles.
- Preserve visible keyboard focus and reduced-motion behavior when changing interactive controls or animation.
- CMS icon names are untrusted input: resolve them only through the curated aliases or supported `react-icons` exports in `src/lib/services/utils/resolveIcon.tsx`.

## Adding content-backed UI

1. Define CSV and rendered shapes in `src/lib/services/types/csvTypes.ts` and `src/types/sections.ts`.
2. Add the sheet endpoint in `src/lib/services/config/csvUrls.ts` and a parser in `src/lib/services/parsers/`.
3. Register the parsed section in `src/lib/services/loadAllSections.ts`, `src/components/RenderSection/sections_components.ts`, and the `RenderSection` switch.
4. For stack icons, update `StackIconName` in `src/types/technology.ts`, the curated registry in `src/constants/StackIcon/lib/index.js`, and its SVG asset in `public/icons/stack/`.

## Maintenance matrix

| Change                               | Also update                                                                                         |
| ------------------------------------ | --------------------------------------------------------------------------------------------------- |
| Add or rename a content section      | CSV types, parser, `loadAllSections.ts`, section types, component registry, and `RenderSection.tsx` |
| Add a Google Sheets data source      | `csvUrls.ts`, its parser, input/output types, and every page that fetches the data directly         |
| Add a stack icon                     | `StackIconName`, the local SVG registry, and the matching Google Sheets icon name                   |
| Change a CMS-provided button or icon | CSV types, parser fallback behavior, and the matching component accessibility label                 |

## Done means

- `npm run lint`, `npm run typecheck`, and `npm run build` exit successfully.
- Any behavior change includes a regression test (`npm test` and relevant browser integration checks).
- UI composition follows the atomic layers documented in `docs/ui-architecture.md`; content contracts belong in `src/types`.

## Never merges without a human

A person has to have **read this diff** before it lands. Telling an agent "merge it when you're done" is approving a goal, not this change — so it does not count for anything on this list. Everywhere else it counts fine, which is the point of having a list.

- No repo-specific irreversible paths were found during this audit.
