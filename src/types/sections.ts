import { IntroductionSection } from '@/components/RenderSection/Introduction/Introduction';
import { ProjectsSection } from '@/components/RenderSection/Projects/Projects';
import { AboutMeSection } from '@/components/RenderSection/AboutMe';
import { TechnologiesSection } from '@/components/RenderSection/Technologies';
import { ExperienceSection } from '@/components/RenderSection/Experience';
import { ContactSection } from '@/components/RenderSection/Contact';
import { ButtonHref, ButtonIcon, ButtonVariant } from '@/components/Button/Button';

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

export type Sections = Array<
  | IntroductionSection
  | ProjectsSection
  | AboutMeSection
  | TechnologiesSection
  | ExperienceSection
  | ContactSection
  | Section
>;
