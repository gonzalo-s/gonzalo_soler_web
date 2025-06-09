import { ButtonVariant, ExternalHref, InternalHref } from '@/components/Button/Button';
import { ICONS } from '@/constants/icons';
import { Size, StackIconName } from '@/constants/StackIcon/StackIcon';

export type HrefType = keyof ExternalHref | keyof InternalHref;

export type CsvAboutMeSectionRow = {
  id: string;
  type: string;
  title: string;
  hrefType: HrefType;
  hrefValue: string;
  isMain: 'TRUE' | 'FALSE';
  isNav: 'TRUE' | 'FALSE';
  isFooter: 'TRUE' | 'FALSE';
  buttonVariant: ButtonVariant;
  headerHighlightText?: string;
  headerText?: string;
  descriptionHighlightText?: string;
  descriptionText?: string;
};

export type CsvContactSectionRow = {
  id: string;
  type: string;
  title: string;
  sectionTitle: string;
  hrefType: HrefType;
  hrefValue: string;
  isMain: 'TRUE' | 'FALSE';
  isNav: 'TRUE' | 'FALSE';
  isFooter: 'TRUE' | 'FALSE';
  buttonVariant: ButtonVariant;
  email: string; // comma-separated
  description?: string;
  ctaText: string;
  ctaHrefType: HrefType;
  ctaHrefValue: string;
  ctaVariant: ButtonVariant;
  ctaIconPre: 'TRUE' | 'FALSE';
  ctaIconName?: keyof typeof ICONS;
  iconPre: 'TRUE' | 'FALSE';
  iconName?: keyof typeof ICONS;
};

export type CsvExperienceSectionRow = {
  id: string;
  type: string;
  title: string;
  hrefType: HrefType;
  hrefValue: string;
  isMain: 'TRUE' | 'FALSE';
  isNav: 'TRUE' | 'FALSE';
  isFooter: 'TRUE' | 'FALSE';
  buttonVariant: ButtonVariant;
};

export type CsvExperienceItemRow = {
  id: string;
  experienceSectionId: string;
  company: string;
  position: string;
  duration: string;
  description: string;
};

export type CsvTechnologiesSectionRow = {
  id: string;
  type: string;
  title: string;
  hrefType: HrefType;
  hrefValue: string;
  isMain: 'TRUE' | 'FALSE';
  isNav: 'TRUE' | 'FALSE';
  isFooter: 'TRUE' | 'FALSE';
  buttonVariant: ButtonVariant;
};

export type CsvStackIconRow = {
  id: string;
  technologiesSectionId: string;
  stackIconName: StackIconName;
  displayName: string;
  size: Size;
  grayscale: 'TRUE' | 'FALSE';
};

export type CsvHighlightWordRow = {
  id: string;
  word: string;
};

export type CsvIntroductionSectionRow = {
  id: string;
  type: string;
  title: string;
  hrefType: HrefType;
  hrefValue: string;
  isMain: 'TRUE' | 'FALSE';
  isNav: 'TRUE' | 'FALSE';
  isFooter: 'TRUE' | 'FALSE';
  buttonVariant: ButtonVariant;
  descriptionHighlightText?: string;
  descriptionText?: string;
  ctaText: string;
  ctaHrefType: HrefType;
  ctaHrefValue: string;
  ctaVariant: ButtonVariant;
  ctaIconPre: 'TRUE' | 'FALSE';
  ctaIconName?: keyof typeof ICONS;
  imageSrc: string;
  imageAlt: string;
};

export type CsvProjectsSectionRow = {
  id: string;
  type: string;
  title: string;
  description: string;
  hrefType: HrefType;
  hrefValue: string;
  isMain: 'TRUE' | 'FALSE';
  isNav: 'TRUE' | 'FALSE';
  isFooter: 'TRUE' | 'FALSE';
  buttonVariant: ButtonVariant;
};

export type CsvProjectRow = {
  projectId: string;
  projectsSectionId: string;
  title: string;
  slug: string;
  description: string;
  shortDescription: string;
  goalsDetail: string;
  imageSrc: string;
  imageAlt: string;
  ctaText: string;
  ctaHrefType: HrefType;
  ctaHrefValue: string;
  ctaVariant: ButtonVariant;
  ctaIconPre: 'TRUE' | 'FALSE';
  ctaIconName?: keyof typeof ICONS;
};

export type CsvProjectGoalRow = {
  id: string;
  projectId: string;
  goal: string;
};

export type CsvProjectStackRow = {
  id: string;
  projectId: string;
  stackIconName: StackIconName;
  displayName: string;
  size: Size;
};

export type CsvProjectExampleLinkRow = {
  id: string;
  projectId: string;
  text: string;
  hrefType: HrefType;
  hrefValue: string;
  variant: ButtonVariant;
  iconPre: 'TRUE' | 'FALSE';
  iconName?: keyof typeof ICONS;
};

export type CsvLogoRow = {
  text: string;
  variant: ButtonVariant;
  hrefType: HrefType;
  hrefValue: string;
  iconPre: 'TRUE' | 'FALSE';
  iconName?: keyof typeof ICONS;
};

export type CsvFooterDetailsRow = {
  logoText: string;
  logoVariant: ButtonVariant;
  logoHrefType: HrefType;
  logoHrefValue: string;
  logoIconPre: 'TRUE' | 'FALSE';
  logoIconName?: keyof typeof ICONS;
  description: string;
  email: string;
  emailLast: string;
};

export type CsvSocialSectionRow = {
  id: string;
  type: 'Social';
  title: string;
  hrefType: HrefType;
  hrefValue: string;
  buttonVariant: ButtonVariant;
  isNav: 'TRUE' | 'FALSE';
  isFooter: 'TRUE' | 'FALSE';
  isMain: 'TRUE' | 'FALSE';
  iconPre: 'TRUE' | 'FALSE';
  iconName?: keyof typeof ICONS;
};
