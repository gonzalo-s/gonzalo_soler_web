# Fluid overlay

The site uses Three.js and `three-fluid-fx` to adapt the library’s [minimal GLSL overlay](https://three-fluid-fx.artcreativecode.com/tutorials/glsl/minimal/overlay/). A density-only simulation renders a transparent, theme-colored cursor trail over the page. The DOM remains statically generated and all controls receive pointer input normally. Rendering, pointer normalization, and heading projection use the canvas’s displayed dimensions, excluding scrollbars, so switching between HTML and GPU text does not shift the heading.

Both the trail and heading distortion are desktop-only (1100px and wider). Narrowing the viewport disposes the simulation and restores HTML headings; returning to desktop enables lazy initialization on mouse movement. Mobile/tablet layouts never load or initialize the WebGL implementation.

`FluidOverlay` loads the WebGL implementation only after mouse movement. Trail colors follow the settings in `createFluidOverlay.ts`; theme changes update the shader uniforms. The shader caps trail opacity at 30% to preserve readability. Heading colors are sampled from their computed CSS styles.

The current balanced profile uses a 256px simulation grid, twelve pressure iterations, and a pixel ratio capped at 1.5. Frames stop after four seconds without movement and while the document is hidden. Reduced motion disables the effect and releases GPU resources. Touch input does not paint or prevent scrolling. Unsupported WebGL gracefully leaves the page usable.

The component cleans up observers, event listeners, animation frames, and GPU resources on unmount and preference changes. WebGL context loss stops the effect.

Run the focused integration check against a production server with:

```sh
UI_TEST_BASE_URL=http://localhost:3105 UI_TEST_CHROME=/path/to/chrome node --test tests/ui/fluid.browser.mjs
```

## CMS heading distortion

Homepage and project h1 elements marked with `data-fluid-heading` can be warped by the same simulation. The original HTML, text spans, and layout remain intact for SEO, accessibility, selection, and fallback. During active animation, the shared shader draws the cached heading behind the content layer; the HTML heading is temporarily transparent. It returns immediately when the effect idles, the heading leaves the viewport, text is selected, WebGL is lost, or reduced motion is enabled.

Text is rasterized with the browser’s loaded fonts and measured DOM text ranges, preserving CMS phrases, wrapping, font sizes, weights, tracking, and colors. Rasterization waits for fonts to be ready. One sRGB canvas texture is reused, with a maximum 2048px dimension, a 1.5 pixel-ratio cap, and no mipmap generation. A cache signature prevents duplicate rasterization and GPU uploads. No text rasterization, DOM layout reads, or texture uploads happen in the simulation’s per-frame loop.

Resize, font, content, and theme changes refresh the cache. Scrolling temporarily shows native HTML text, preventing GPU/compositor position lag. Distortion resumes 120ms after scrolling settles, updating only the heading’s viewport rectangle. During inherited color transitions, HTML remains visible and the cache is explicitly invalidated. Capture waits for the actual CSS color transitions to finish; rapid switches cancel obsolete refreshes. Navigation discovers the new page’s marked heading. There is one WebGL renderer, one simulation, and one draw pass; velocity/text sampling is limited to the heading rectangle. Displacement is bounded to 12 CSS pixels and decays with the fluid.

Browsers lacking the required 2D text metrics or letter-spacing support retain HTML text while the fluid overlay continues. This implementation warps text; it does not create particle letters. The implementation follows the [Three.js canvas texture API](https://threejs.org/docs/pages/CanvasTexture.html).

The footer signature marked with `data-fluid-footer` uses the same distortion and cached texture. Its gradient is painted from the current theme variables. Scrolling selects the visible heading or footer; it does not create another renderer or simulation. Canvas, pointer, and text coordinates use measured displayed-canvas dimensions, including scrollbar changes.

Storytelling disclosures use a reversible 260ms native height animation. Content becomes inert during closing, rapid toggles reverse from the current height, and reduced motion switches immediately. Native details/summary behavior remains available before JavaScript loads.

The marked h1 elements use the same theme gradient as the footer (`--brand-3` to `--brand-2`). CSS clips the gradient to native text, including CMS spans, while the cached GPU texture paints identical gradient stops. This remains visible on mobile and with reduced motion, where distortion is disabled.

All H1–H6 elements in the page shell share the theme gradient, including nested CMS text spans. Only the marked H1 and footer participate in fluid distortion.
