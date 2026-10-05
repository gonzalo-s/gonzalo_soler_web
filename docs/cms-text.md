# Keeping a CMS phrase together

Use paired double asterisks around the portion that must stay on one line:

```text
Frontend Developer **Composable Commerce**
```

Marked phrases start at 85% of the surrounding font size and use the theme’s tertiary text color, matching the second span in the About Me heading.

The marked phrase may move to the next line as a unit. If it is wider than its container, only that phrase shrinks to fit. Other text keeps its original size and normal wrapping. Multiple marked phrases are supported. Unpaired markers remain literal text. This is a phrase-grouping convention, not Markdown bold formatting.

Headings and section prose support this syntax, including project detail text with highlighted words. Other text renderers can opt in through the reusable `CmsText` atom. Text is rendered safely without accepting HTML.

Content is present in server-generated HTML. Fitting runs after hydration and after container, viewport, or font changes.
