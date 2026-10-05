[![AI Ready](https://img.shields.io/badge/AI--Ready-yes-brightgreen?style=flat)](https://github.com/johnpapa/ai-ready)

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

# ✨ Welcome to My Digital Resume! ✨

## About This Page

Hey there! 👋 This is my online resume – think of it as a chill space where I'll be showcasing all the awesome projects I've been a part of. 🚀

This app is designed to present my professional journey, skills, and projects in a structured and visually appealing way. While it might seem like overkill to use a dedicated `sections.ts` file for managing content, this approach is intentional. It mimics the architecture I would use if the data were coming from a CMS, ensuring scalability and maintainability for future enhancements.

## What You'll Find Here

- **Projects:** Check out the projects I've been involved in.
- **Skills:** Discover some of my favorite skills.
- **Example Work:** This page itself is a little sneak peek into my work! 😉

## My Goal

Basically, I'm hoping you'll find something cool and interesting here. 🤩 Feel free to take a look around and let me know what you think! ✌️

## Libraries and Languages Used

This project leverages the following technologies:

### Languages

- **TypeScript**: For type-safe JavaScript development.
- **SCSS**: For styling with advanced CSS features.

### Libraries and Frameworks

- **Next.js**: A React framework for building server-rendered and statically generated web applications.
- **React**: For building user interfaces.
- **React Icons**: For including scalable vector icons.
- **Sass**: For enhanced styling capabilities.

### Tools

- **ESLint**: For maintaining code quality and consistency.
- **Prettier**: For code formatting.
- **Vercel**: For deployment and hosting.
- **Vercel Analytics**: For tracking user interactions and analytics.

## Google Sheets as a Headless CMS (Static Content API)

This project uses **Google Sheets as a headless CMS** to manage all site content. The Google Sheet acts as a structured API source for static content, enabling non-developers to update the site easily.

### How It Works

- **Content Source:** All content (sections, projects, etc.) is stored in a Google Sheet, with each sheet tab representing a different content type.
- **Fetching & Parsing:** At build time, the site fetches CSV exports of each sheet using public URLs. Data is parsed and validated using strict TypeScript types and custom parsing logic for each section.
- **Type Safety:** Every row and field is typed (see `src/lib/services/types/csvTypes.ts` and `src/types/sections.ts`). Parsers ensure that all data is validated and transformed into the correct shape for rendering.
- **No Loading States:** Because content is fetched and parsed at build time (SSG), there are no loading spinners or delays for end users—pages are instantly available and SEO-friendly.

### Updating Content

- **Edit in Google Sheets:** Content editors can update the Google Sheet directly.
- **Deploy Button:** A custom deploy button is added to the Google Sheet, which triggers a Vercel Deploy Hook via Google Apps Script. This automatically rebuilds and redeploys the site, pulling in the latest content.
- **Why Not SSR/ISR?** Static generation is used for best UX and performance. Content is only updated on deploy, not on every request, ensuring fast loads and no flicker.

### Technical Highlights

- **TypeScript everywhere:** All content is strictly typed and parsed before use.
- **Custom parsers:** Each section has a dedicated parser to transform raw CSV rows into rich, type-safe objects.
- **Vercel Deploy Hook:** The deploy button in Google Sheets calls a Vercel Deploy Hook URL, triggering a new build and publish cycle.
- **No runtime API dependency:** The site does not depend on Google Sheets at runtime—content is baked into the static build.

---

For more details, see the code in `src/lib/services/parsers/`, `src/lib/services/types/csvTypes.ts`, and `src/types/sections.ts`.

## Contributing

1. Create a branch from `main`.
2. Make the smallest scoped change, including the matching content types, parser, and registration files when changing a content-backed section.
3. Run `npm run lint`, `npm run typecheck`, and `npm run build`.
4. Open a pull request describing the change and its Google Sheets/content-model impact.

See [AGENTS.md](./AGENTS.md) for project conventions and the full maintenance matrix.

## UI architecture and tests

Components follow atomic design: atoms, molecules, organisms, and page templates. See [UI architecture](docs/ui-architecture.md) for dependency rules, server/client boundaries, shared styling, and accessibility conventions.

Use Node 22.14 or newer. Run `npm test` for interaction contracts. For browser integration, start the production build and run `npm run test:browser` with `UI_TEST_BASE_URL` and `UI_TEST_CHROME` set to its URL and a Chromium executable. These checks do not capture screenshots.

## Content environment variables

Copy `.env.example` to `.env.local` before running or building locally. The example includes every public Google Sheets CSV endpoint. Configure the same variables in Vercel before deploying; content is fetched during static generation and requires a rebuild when URLs or sheet content change. Loaders import `contentUrls` from `src/config/content.ts`, which owns all content environment-variable reads. Missing required values fail the build with the variable name. Variables are server-side and do not need the `NEXT_PUBLIC_` prefix.

`STORYTELLING_CSV_URL` uses the combined storytelling tab. `STORYTELLING_SECTION_CSV_URL` and `STORYTELLING_ITEMS_CSV_URL` are optional separate-tab overrides and must be set together.
