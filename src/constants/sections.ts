import { ButtonHref, ButtonIcon, ButtonProps, ButtonVariant } from '@/components/Button/Button';
import { ICONS } from './icons';
import { FooterProps } from '@/components/Footer/Footer';
import { IntroductionSection } from '@/components/RenderSection/Introduction/Introduction';
import { ProjectsSection } from '@/components/RenderSection/Projects/Projects';

export type SectionType = 'Introduction' | 'Projects' | 'AboutMe' | 'Contact' | 'Social';

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

export type Sections = Array<IntroductionSection | ProjectsSection | Section>;

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
    description: 'A collection of my featured projects showcasing my work and skills.',
    projects: [
      {
        title: 'BSN SPORTS',
        description: 'Project 1 description',
        image: {
          src: 'https://i.postimg.cc/QCCvxRPJ/bsn-sports.png',
          alt: 'Project 1',
        },
        cta: {
          text: 'View Project 1',
          href: { internal: '/projects/project-1' },
          variant: 'primary',
          icon: { pre: false, icon: ICONS.arrowAltRight },
        },
      },
      {
        title: 'CAA QUEBEC',
        description: 'Project 2 description',
        image: {
          src: 'https://i.postimg.cc/tJcw1BGQ/caa-quebec.png',
          alt: 'Project 2',
        },
        cta: {
          text: 'View Project 2',
          href: { internal: '/projects/project-2' },
          variant: 'primary',
          icon: { pre: false, icon: ICONS.arrowAltRight },
        },
      },
      {
        title: 'US GAMES',
        description: 'Project 3 description',
        image: {
          src: 'https://i.postimg.cc/ryZvYw0n/us-games.png',
          alt: 'Project 3',
        },
        cta: {
          text: 'View Project 3',
          href: { internal: '/projects/project-3' },
          variant: 'primary',
          icon: { pre: false, icon: ICONS.arrowAltRight },
        },
      },
    ],
  },

  {
    href: { internal: '#about-me' },
    title: 'About me',
    isNav: true,
    isFooter: true,
    isMain: true,
    type: 'AboutMe',
    buttonVariant: 'primary',
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
