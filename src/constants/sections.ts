import { ButtonHref, ButtonVariant } from '@/components/Button/Button';
import { ICONS } from './icons';
import { JSX } from 'react';

export type Sections = Array<{
  title: string;
  type: 'Introduction' | 'Projects' | 'About me' | 'Contact' | 'Social';
  href: ButtonHref;
  buttonVariant: ButtonVariant;
  isNav?: boolean;
  isFooter?: boolean;
  icon?: JSX.Element;
  isMain?: boolean;
}>;

export const SECTIONS: Sections = [
  {
    href: { internal: 'introduction' },
    title: 'Introduction',
    isMain: true,
    type: 'Introduction',
    buttonVariant: 'primary',
  },
  {
    href: { internal: 'projects' },
    title: 'Projects',
    isNav: true,
    isFooter: true,
    isMain: true,
    type: 'Projects',
    buttonVariant: 'primary',
  },
  {
    href: { internal: 'about-me' },
    title: 'About me',
    isNav: true,
    isFooter: true,
    isMain: true,
    type: 'About me',
    buttonVariant: 'primary',
  },
  {
    href: { internal: 'contact' },
    title: 'Contact',
    isNav: true,
    isMain: true,
    type: 'Contact',
    icon: ICONS.arrowAltRight,
    buttonVariant: 'primary',
  },
  {
    href: { external: 'https://www.linkedin.com/in/gonzalo-soler/' },
    title: 'Linkedin',
    isFooter: true,
    icon: ICONS.linkedin,
    type: 'Social',
    buttonVariant: 'primary',
  },
];
