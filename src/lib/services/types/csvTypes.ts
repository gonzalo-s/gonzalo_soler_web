import { ButtonVariant, ExternalHref, InternalHref } from '@/components/Button/Button';

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
