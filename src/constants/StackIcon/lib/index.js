// Curated local assets: SVG styles stay isolated inside each image.
export const STACK_ICONS = Object.freeze({
  reactjs: '/icons/stack/reactjs.svg',
  js: '/icons/stack/js.svg',
  nextjs2: '/icons/stack/nextjs2.svg',
  typescript: '/icons/stack/typescript.svg',
  html5: '/icons/stack/html5.svg',
  css3: '/icons/stack/css3.svg',
  sass: '/icons/stack/sass.svg',
  jest: '/icons/stack/jest.svg',
  contentful: '/icons/stack/contentful.svg',
  contentstack: '/icons/stack/contentstack.svg',
  algolia: '/icons/stack/algolia.svg',
  commercetools: '/icons/stack/commercetools.svg',
  tailwindcss: '/icons/stack/tailwindcss.svg',
  ai: '/icons/stack/ai.svg',
  github: '/icons/stack/github.svg',
  bitbucket: '/icons/stack/bitbucket.svg',
  figma: '/icons/stack/figma.svg',
  jira: '/icons/stack/jira.svg',
  vercel: '/icons/stack/vercel.svg',
});

export function getStackIconSrc(name) {
  return Object.prototype.hasOwnProperty.call(STACK_ICONS, name) ? STACK_ICONS[name] : undefined;
}
