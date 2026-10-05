import type { ButtonHref, ButtonIcon, ButtonProps, ButtonVariant } from './ui';
import type { StackIconProps } from './technology';

export type SectionType =
  | 'Introduction'
  | 'Projects'
  | 'AboutMe'
  | 'Contact'
  | 'Social'
  | 'Technologies'
  | 'Experience';
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
export type IntroductionSection = Section & {
  type: Extract<SectionType, 'Introduction'>;
  description: { highlightText?: string; text?: string };
  cta: ButtonProps;
  image?: { src: string; alt: string };
};

export type AboutMeSection = Section & {
  type: Extract<SectionType, 'AboutMe'>;
  description: {
    highlightText?: string;
    text?: string;
  };
  header: {
    highlightText?: string;
    text?: string;
  };
  image?: {
    src: string;
    alt: string;
  };
};

export type ExperienceSection = Section & {
  type: Extract<SectionType, 'Experience'>;
  experience: Array<{
    company: string;
    position: string;
    duration: string;
    description: string;
  }>;
};

export type TechnologiesSection = Section & {
  type: Extract<SectionType, 'Technologies'>;
  stack: Array<StackIconProps>;
};

export type ContactSection = Section & {
  type: Extract<SectionType, 'Contact'>;
  sectionTitle: string;
  email: Array<string>;
  cta: ButtonProps;
  resume?: ButtonProps;
  spokenResume?: { url: string; title: string; caption?: string };
  description?: string;
};

export type Project = {
  title: string;
  description: string;
  stack: Array<StackIconProps>;
  shortDescription: string;
  slug: string;
  image: {
    src: string;
    alt: string;
  };
  cta: ButtonProps;
  goalsDetail: string;
  goalsList?: Array<string>;
  exampleLinks?: Array<ButtonProps>;
  highlightWords?: Array<string>;
};

export type ProjectsSection = Section & {
  type: 'Projects';
  title: string;
  description: string;
  projects: Array<Project>;
};

export type FooterProps = {
  linkList: Sections;
  details: {
    logo: ButtonProps;
    description: string;
    email: Array<string>;
  };
};
export type ContentSection =
  | IntroductionSection
  | ProjectsSection
  | AboutMeSection
  | TechnologiesSection
  | ExperienceSection
  | ContactSection;
export type Sections = Array<ContentSection | Section>;
