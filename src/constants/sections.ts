import { ButtonHref, ButtonIcon, ButtonProps, ButtonVariant } from '@/components/Button/Button';
import { ICONS } from './icons';
import { FooterProps } from '@/components/Footer/Footer';

export type Sections = Array<{
  title: string;
  type: 'Introduction' | 'Projects' | 'About me' | 'Contact' | 'Social';
  href: ButtonHref;
  buttonVariant: ButtonVariant;
  isNav?: boolean;
  isFooter?: boolean;
  icon?: ButtonIcon;
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
  description: 'Frontend Developer',
  email: 'gonzalosoler@gmail.com',
};
