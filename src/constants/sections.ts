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
  href?: ButtonHref;
  buttonVariant?: ButtonVariant;
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
    // we also used commercetools in this project
    description:
      'BSN Sports is a major marketer, manufacturer, and distributor of sporting goods, including apparel, footwear, equipment, and team uniforms. Headquartered in Dallas, Texas, the company primarily serves institutional and team sports customers across the United States, such as colleges, universities, middle and high schools, and recreational programs. Its main purpose is to provide a comprehensive, one-stop shopping experience for athletic programs, offering a wide range of products and services to support their needs. \n \n  I was part of the team that developed the new website for BSN Sports. The project was built using Next.js and React, with TypeScript as the main language. The website was designed to be fully responsive and accessible, with a focus on performance and SEO. The project was developed using CommerceTools, Contentstack, and a search engine, Algolia, to provide a fast and reliable search experience for users. The website was also integrated with Google Analytics and Google Tag Manager to track user interactions and gather data.',
    shortDescription: 'B2B - B2C - Composable commerce',
    stack: [
      { stackIconName: 'nextjs2', displayName: 'Next.js', size: 'small' },
      { stackIconName: 'reactjs', displayName: 'React', size: 'small' },
      { stackIconName: 'typescript', displayName: 'Typescript', size: 'small' },
      { stackIconName: 'html5', displayName: 'HTML5', size: 'small' },
      { stackIconName: 'sass', displayName: 'SASS', size: 'small' },
      { stackIconName: 'js', displayName: 'JS', size: 'small' },
      { stackIconName: 'jest', displayName: 'Jest', size: 'small' },
      { stackIconName: 'commercetools', displayName: 'Commercetools', size: 'small' },
      { stackIconName: 'contentstack', displayName: 'Contentstack', size: 'small' },
      { stackIconName: 'algolia', displayName: 'Algolia', size: 'small' },
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
    description:
      'CAA-Québec is a not-for-profit organization that serves members within the Canadian province of Quebec. Originating from the merging of earlier automobile clubs, its history traces back to the early 1900s, with formal unification occurring in 1984. Headquartered in Quebec City, the company delivers a broad spectrum of services, including roadside assistance, insurance, travel planning, and automotive services. Their focus is on providing reliable support and benefits to their members throughout Quebec. \n \n I was part of the team that developed the new website for CAA-Québec. The project was built using Next.js and React, with TypeScript as the main language. The website was designed to be fully responsive and accessible, with a focus on performance and SEO. The project was developed using a headless CMS, Contentstack, and a search engine, Algolia, to provide a fast and reliable search experience for users. The website was also integrated with Google Analytics and Google Tag Manager to track user interactions and gather data',
    shortDescription: 'B2C - Composable commerce',
    stack: [
      { stackIconName: 'nextjs2', displayName: 'Next.js', size: 'small' },
      { stackIconName: 'reactjs', displayName: 'React', size: 'small' },
      { stackIconName: 'typescript', displayName: 'Typescript', size: 'small' },
      { stackIconName: 'html5', displayName: 'HTML5', size: 'small' },
      { stackIconName: 'sass', displayName: 'SASS', size: 'small' },
      { stackIconName: 'js', displayName: 'JS', size: 'small' },
      { stackIconName: 'jest', displayName: 'Jest', size: 'small' },
      { stackIconName: 'contentstack', displayName: 'Contentstack', size: 'small' },
      { stackIconName: 'algolia', displayName: 'Algolia', size: 'small' },
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
    description:
      'US Games (sports equipment) is a line of physical education and recreational sports equipment. 1  While not a standalone, headquartered company in the traditional sense, its products are distributed by major sporting goods providers, notably BSN Sports. Its main purpose is to supply schools, recreational facilities, and individuals with a broad range of equipment designed to facilitate and encourage participation in physical activities and sports. \n \n I was part of the team that developed the new website for US Games. The project was built using Next.js and React, with TypeScript as the main language. The website was designed to be fully responsive and accessible, with a focus on performance and SEO. The project was developed using CommerceTools, Contentstack, and a search engine, Algolia, to provide a fast and reliable search experience for users. The website was also integrated with Google Analytics and Google Tag Manager to track user interactions and gather data.',
    shortDescription: 'B2B - B2C - Composable commerce',
    stack: [
      { stackIconName: 'nextjs2', displayName: 'Next.js', size: 'small' },
      { stackIconName: 'reactjs', displayName: 'React', size: 'small' },
      { stackIconName: 'typescript', displayName: 'Typescript', size: 'small' },
      { stackIconName: 'html5', displayName: 'HTML5', size: 'small' },
      { stackIconName: 'sass', displayName: 'SASS', size: 'small' },
      { stackIconName: 'js', displayName: 'JS', size: 'small' },
      { stackIconName: 'jest', displayName: 'Jest', size: 'small' },
      { stackIconName: 'commercetools', displayName: 'Commercetools', size: 'small' },
      { stackIconName: 'contentstack', displayName: 'Contentstack', size: 'small' },
      { stackIconName: 'algolia', displayName: 'Algolia', size: 'small' },
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
        'With hands-on experience in composable commerce and a strong foundation in React and modern JavaScript libraries. Proficient in creating dynamic, user-focused web applications while adapting to diverse business requirements.',
      text: 'Eager to leverage my expertise in responsive design, cross-browser compatibility, and performance optimization to drive innovative solutions in a forward-thinking team. Committed to continuous learning and applying best practices in software development to contribute significantly to the success of visionary tech initiatives.',
    },
  },
  {
    type: 'Technologies',
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
