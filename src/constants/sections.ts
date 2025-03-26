import { ButtonHref, ButtonIcon, ButtonProps, ButtonVariant } from '@/components/Button/Button';
import { ICONS } from './icons';
import { FooterProps } from '@/components/Footer/Footer';
import { IntroductionSection } from '@/components/RenderSection/Introduction/Introduction';
import { Project, ProjectsSection } from '@/components/RenderSection/Projects/Projects';
import { AboutMeSection } from '@/components/RenderSection/AboutMe';
import { TechnologiesSection } from '@/components/RenderSection/Technologies';

export type SectionType = 'Introduction' | 'Projects' | 'AboutMe' | 'Contact' | 'Social' | 'Technologies';

export type Section = {
  title: string;
  type: SectionType;
  href: ButtonHref;
  buttonVariant: ButtonVariant;
  isNav?: boolean;
  isFooter?: boolean;
  icon?: ButtonIcon;
  isMain?: boolean;
};

export type Sections = Array<IntroductionSection | ProjectsSection | AboutMeSection | TechnologiesSection | Section>;

const projects: Array<Project> = [
  {
    title: 'BSN SPORTS',
    slug: 'bsn-sports',
    description: 'Project 1 description',
    shortDescription: 'Project 1 short description',
    stack: [
      { stackIconName: 'nextjs2', displayName: 'Next.js', size: 'small' },
      { stackIconName: 'reactjs', displayName: 'React', size: 'small' },
      { stackIconName: 'typescript', displayName: 'Typescript', size: 'small' },
      { stackIconName: 'html5', displayName: 'HTML5', size: 'small' },
      { stackIconName: 'sass', displayName: 'SASS', size: 'small' },
      { stackIconName: 'js', displayName: 'JS', size: 'small' },
      { stackIconName: 'jest', displayName: 'Jest', size: 'small' },
      { stackIconName: 'commercetools', displayName: 'Commercetools', size: 'small' },
      { stackIconName: 'algolia', displayName: 'Algolia', size: 'small' },
      { stackIconName: 'contentstack', displayName: 'Contentstack', size: 'small' },
    ],
    image: {
      src: 'https://i.postimg.cc/QCCvxRPJ/bsn-sports.png',
      alt: 'Project 1',
    },
    cta: {
      text: 'View Project 1',
      href: { internal: '/projects/bsn-sports' },
      variant: 'primary',
      icon: { pre: false, icon: ICONS.arrowAltRight },
    },
  },
  {
    title: 'CAA QUEBEC',
    slug: 'caa-quebec',
    description: 'Project 2 description',
    shortDescription: 'Project 2 short description',
    stack: [
      { stackIconName: 'nextjs2', displayName: 'Next.js', size: 'small' },
      { stackIconName: 'reactjs', displayName: 'React', size: 'small' },
      { stackIconName: 'typescript', displayName: 'Typescript', size: 'small' },
      { stackIconName: 'html5', displayName: 'HTML5', size: 'small' },
      { stackIconName: 'sass', displayName: 'SASS', size: 'small' },
      { stackIconName: 'js', displayName: 'JS', size: 'small' },
      { stackIconName: 'jest', displayName: 'Jest', size: 'small' },
    ],
    image: {
      src: 'https://i.postimg.cc/tJcw1BGQ/caa-quebec.png',
      alt: 'Project 2',
    },
    cta: {
      text: 'View Project 2',
      href: { internal: '/projects/caa-quebec' },
      variant: 'primary',
      icon: { pre: false, icon: ICONS.arrowAltRight },
    },
  },
  {
    title: 'US GAMES',
    slug: 'us-games',
    description: 'Project 3 description',
    shortDescription: 'Project 3 short description',
    stack: [
      { stackIconName: 'nextjs2', displayName: 'Next.js', size: 'small' },
      { stackIconName: 'reactjs', displayName: 'React', size: 'small' },
      { stackIconName: 'typescript', displayName: 'Typescript', size: 'small' },
      { stackIconName: 'html5', displayName: 'HTML5', size: 'small' },
      { stackIconName: 'sass', displayName: 'SASS', size: 'small' },
      { stackIconName: 'js', displayName: 'JS', size: 'small' },
      { stackIconName: 'jest', displayName: 'Jest', size: 'small' },
    ],
    image: {
      src: 'https://i.postimg.cc/ryZvYw0n/us-games.png',
      alt: 'Project 3',
    },
    cta: {
      text: 'View Project 3',
      href: { internal: '/projects/us-games' },
      variant: 'primary',
      icon: { pre: false, icon: ICONS.arrowAltRight },
    },
  },
];

const TECHNOLOGIES = Array.from(
  new Map(projects.flatMap((project) => project.stack).map((tech) => [tech.displayName, tech])).values(),
);

export const SECTIONS: Sections = [
  {
    href: { internal: '#introduction' },
    title: 'Introduction',
    isMain: true,
    type: 'Introduction',
    buttonVariant: 'primary',
    image: {
      alt: '',
      src: 'https://i.postimg.cc/qRqcRJmZ/3dlego01-jpg-removebg-preview.png',
    },
    description: {
      highlightText: 'Highligh text',
      text: 'Some other text with some more data and blah',
    },
    cta: {
      text: 'Check my LinkedIn',
      href: {
        external: 'https://www.linkedin.com/in/gonzalo-soler/',
      },
      variant: 'accent',
      icon: { icon: ICONS.arrowAltRight, pre: false },
    },
  },
  {
    href: { internal: '#projects' },
    title: 'Projects',
    isNav: true,
    isFooter: true,
    isMain: true,
    type: 'Projects',
    buttonVariant: 'primary',
    description: 'Some of my coolest projects!',
    projects: projects,
  },

  {
    href: { internal: '#about-me' },
    title: 'About me',
    isNav: true,
    isFooter: true,
    isMain: true,
    type: 'AboutMe',
    buttonVariant: 'primary',
    header: {
      highlightText: 'About Me',
      text: 'Frontend Developer',
    },
    description: {
      highlightText:
        'With hands-on experience in composable commerce and a strong foundation in React and modern JavaScript libraries. Proficient in creating dynamic, user-focused web applications while adapting to diverse business requirements. Experienced in demonstrating new features to clients.',
      text: 'Eager to leverage my expertise in responsive design, cross-browser compatibility, and performance optimization to drive innovative solutions in a forward-thinking team. Committed to continuous learning and applying best practices in software development to contribute significantly to the success of visionary tech initiatives.',
    },
  },
  {
    type: 'Technologies',
    buttonVariant: 'primary',
    href: { internal: '#technologies' },
    title: 'Technologies',
    isMain: true,
    stack: TECHNOLOGIES,
  },
  {
    href: { internal: '#contact' },
    title: 'Contact',
    isNav: true,
    isMain: true,
    type: 'Contact',
    icon: { pre: false, icon: ICONS.arrowAltRight },
    buttonVariant: 'primary',
  },
  {
    href: { external: 'https://www.linkedin.com/in/gonzalo-soler/' },
    title: 'Linkedin',
    isFooter: true,
    icon: { pre: true, icon: ICONS.linkedin },
    type: 'Social',
    buttonVariant: 'primary',
  },
];

export const LOGO: ButtonProps = {
  text: 'Gonzalo Soler',
  variant: 'primary',
  href: { internal: '/' },
  icon: { pre: true, icon: ICONS.logo },
};

export const FOOTER_DETAILS: FooterProps['details'] = {
  logo: LOGO,
  description: "I'm a Frontend Developer focused on details and user experience.",
  email: 'gonzalosoler@gmail.com',
};
