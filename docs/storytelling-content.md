# Storytelling content

Storytelling is built statically alongside the existing homepage sections, immediately before Projects. The supplied combined Storytelling CSV is configured through `STORYTELLING_CSV_URL`. All CSV endpoints are listed in `.env.example` and loaded from environment variables.

Optional separate-tab overrides use both build-time environment variables:

- `STORYTELLING_SECTION_CSV_URL`: public CSV export for StorytellingSection.
- `STORYTELLING_ITEMS_CSV_URL`: public CSV export for StorytellingItems.

Without overrides, the published combined CSV is used. Configuring only one, an empty required tab, or incomplete story content fails the build. Rebuild after changing content or URLs.

## Expected CSV columns

StorytellingSection uses the existing section metadata (`id`, `title`, `hrefType`, `hrefValue`, `isMain`, `isNav`, `isFooter`, `buttonVariant`) plus `heading`, `introduction`, `ownershipClosingHeading`, and `ownershipClosing`.

`id`, `heading`, `introduction`, and `ownershipClosing` are required. Empty metadata defaults to title from heading, internal `#storytelling`, main enabled, navigation/footer disabled. An empty closing heading defaults to “Ownership beyond implementation”.

StorytellingItems columns: `id`, `storytellingSectionId`, `projectName`, `heading`, `challenge`, `ownership`, `outcome`, `displayOrder`, `linkText`, `linkHrefType`, `linkHrefValue`.

All columns through `displayOrder` are required. Only entries referencing the section ID are rendered. IDs must be unique within that section. Numeric display order is ascending; equal values retain sheet order. Links are optional; empty link text defaults to “View [project name] project”, and empty link type defaults to internal. Existing project pages can be linked directly. Literal escaped newlines are supported in narrative fields.

Content is independent of layout and there is no fixed story count. Native details/summary controls provide keyboard expansion without JavaScript or animation.

The published combined CSV uses `recordType` (`section` or `story`). Exactly one section record maps `sectionId`, `sectionTitle`, `sectionHrefType`, `sectionHrefValue`, `sectionIsMain`, `sectionIsNav`, `sectionIsFooter`, `sectionButtonVariant`, `sectionSectionTitle`, `sectionIntroduction`, `sectionClosingTitle`, and `sectionClosingText` into the shared contract above. Story records use the item columns above; `narrative` is retained in the source as reference, while the UI renders challenge, ownership, and outcome. These column names were verified against the supplied live CSV. Updated Introduction, About, Projects, Career History, and Let's talk copy continue to come from their existing tabs; activating a separate draft for those tabs also requires updating their environment variables.
