export type StackIconName =
  | 'reactjs'
  | 'js'
  | 'nextjs2'
  | 'typescript'
  | 'html5'
  | 'css3'
  | 'sass'
  | 'jest'
  | 'contentful'
  | 'contentstack'
  | 'algolia'
  | 'commercetools'
  | 'tailwindcss'
  | 'ai'
  | 'github'
  | 'bitbucket'
  | 'figma'
  | 'jira'
  | 'vercel';

export type Size = 'small' | 'medium' | 'large';

export type StackIconProps = {
  stackIconName: StackIconName;
  displayName: string;
  size: Size;
  grayscale?: boolean;
};
