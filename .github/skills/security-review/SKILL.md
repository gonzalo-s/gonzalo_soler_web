---
name: security-review
description: Reviews the build-time Google Sheets content boundary and icon-rendering paths. Use when changing CSV loading, parsers, icon resolution, or inline SVG registry entries.
---

# Security review

## Trust boundaries in this repo

- `src/lib/services/config/csvUrls.ts` identifies the public Google Sheets CSV sources consumed at build time.
- `src/lib/services/utils/fetchCsv.ts` fetches and parses those sources; section parsers in `src/lib/services/parsers/` transform the rows before React renders them.
- `src/lib/services/utils/resolveIcon.tsx` maps CMS icon names to curated aliases or known `react-icons` module exports.
- `src/constants/StackIcon/lib/index.js` injects bundled SVG markup; only repository-reviewed SVG strings belong in that registry.

## Never

- Never turn a CMS string into raw SVG or HTML markup.
- Never broaden the icon resolver into arbitrary module or file loading.
- Never add a new remote image host without confirming it is required by authored project content.

## Before merging changes to content loading or icons

- Confirm the source remains a public, intended Google Sheets export and that failures produce a useful build error.
- Confirm CMS values are rendered as React text or pass through the existing curated icon resolution path.
- Confirm inline SVG additions are bundled registry entries reviewed in the diff, not data fetched from the CMS.
