---
name: shipping-a-change
description: What to update when changing this content-driven Next.js portfolio, and what done requires. Use before opening a pull request.
---

# Shipping a change

## Add a content-backed section

1. `src/lib/services/types/csvTypes.ts` and `src/types/sections.ts` — define the source and rendered shapes.
2. `src/lib/services/config/csvUrls.ts` and `src/lib/services/parsers/` — add the endpoint and transform its rows.
3. `src/lib/services/loadAllSections.ts` — load the parser result.
4. `src/components/RenderSection/sections_components.ts` and `src/components/RenderSection/RenderSection.tsx` — register and render the component.
5. `npm run lint`, `npm run typecheck`, and `npm run build` — verify the change.

## When you change this, also change that

| Change               | Also update                                                                     |
| -------------------- | ------------------------------------------------------------------------------- |
| Content section      | CSV types, parser, loader, section types, component registry, and render switch |
| Google Sheets source | `csvUrls.ts`, parser, types, and direct page consumers                          |
| Stack icon           | `StackIconName`, bundled SVG registry, and the matching sheet value             |
| CMS button or icon   | CSV types, parser fallbacks, and component accessibility labels                 |

## Done

- `npm run lint`, `npm run typecheck`, and `npm run build` exit successfully.
- Any behavior change includes a test that would fail without that change, once a test runner is established.
