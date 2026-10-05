# UI architecture

The portfolio follows atomic design without forcing every element into a separate component.

| Layer                      | Responsibility                                                                   | Examples                                                                                 |
| -------------------------- | -------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------- |
| `src/components/atoms`     | Small reusable visual or interaction primitives, independent of content sections | Button, IconButton, Chip, StackIcon, Heading, Surface, EmailLink, HighlightedText        |
| `src/components/molecules` | Focused combinations of atoms with one purpose                                   | ProjectCard, ChipList, MobileNavigation, AudioPlayer                                     |
| `src/components/organisms` | Complete content sections and larger site regions                                | Introduction, Projects, AboutMe, Experience, Contact, Navigation, Footer, BrickAnimation |
| `src/components/templates` | Page composition and layout                                                      | PageShell, ProjectDetails                                                                |
| `src/app`                  | Next.js routes and data loading                                                  | Home and statically generated project pages                                              |

`RenderSection` is a server-side CMS adapter. Its registry and switch connect section types to organisms. It does not own animation or browser state.

## Dependency direction

Templates compose organisms and molecules. Organisms compose molecules and atoms. Atoms depend on shared types and utilities, never on content sections. Data parsers import contracts from `src/types`, rather than importing rendering components. Keep imports directed downward; use direct file imports for runtime components.

- Content models: `src/types/sections.ts`.
- Button/link contracts: `src/types/ui.ts`.
- Technology icon contracts: `src/types/technology.ts`.
- Pure interaction helpers: `src/lib/ui`.
- Browser hooks: `src/hooks`.
- Theme palette: `src/styles/theme-map.scss`.

## Server and client boundaries

Use server components for content, cards, headings, icons, and page layouts. Add `use client` only where browser events or state are required. Keep those boundaries small: Button, ThemeSwitch, EmailLink, MobileNavigation, AudioPlayer, DragScrollList, HashScrollHandler, and BrickAnimation. Render children on the server and pass them into interactive containers where possible.

The theme provider always renders its children. A small validated cookie bootstrap applies the theme before the page paints, while React manages the switch afterward. Pages retain static generation and their HTML remains usable before hydration.

## Shared design and accessibility

Chip owns the `8px 16px` padding. StackIcon owns its 8px rounded, clipped image wrapper. Surface owns shared glass material; consumers customize it through CSS properties rather than competing selectors. Heading owns the decorative icon semantics.

Use a native button for actions and a link for navigation. IconButton requires an accessible label. Disabled links cannot be activated or tabbed to. Hash navigation preserves modifier clicks and uses native scrolling with CSS scroll margins and reduced-motion support. Closed mobile navigation is inert; Escape closes it and restores trigger focus. PageShell includes a skip link. Technology lists hide their scrollbar and use slow automatic scrolling with a pause control; hover, focus, manual interaction, reduced motion, and an offscreen list suspend movement.

Highlights are rendered as React text and spans; never rewrite the React-owned DOM. EmailLink reveals only its own address, without selectors that modify other components. Audio playback state follows media events and playback failures are announced.

## Stack icons

Only the curated names in `src/types/technology.ts` may resolve through `src/constants/StackIcon/lib/index.js`. The corresponding SVG files live in `public/icons/stack`. Loading SVGs as images isolates their internal styles and avoids shipping a full vendor icon catalog to the client. Unknown CMS names keep their text label and produce no image.

`src/constants/StackIcon/StackIcon.tsx` remains a compatibility re-export; new UI code imports the atom directly. When adding an icon, update the type, registry, SVG asset, and sheet name together.

## Verification

Use Node 22.14 or newer for the built-in TypeScript test support.

- `npm test`: behavioral contracts for navigation, highlights, brick locking, icon lookup, and reduced-motion scrolling.
- `npm run lint`, `npm run typecheck`, `npm run build`: required validation.
- `npm run test:browser`: browser integration checks against a running production server. Set `UI_TEST_BASE_URL` and `UI_TEST_CHROME` to the server URL and local Chromium executable. Tests do not capture screenshots.

Avoid tests that only repeat CSS declarations. Add regression checks for real interaction changes, and keep the approved brick endpoint and reduced-motion behavior covered.
