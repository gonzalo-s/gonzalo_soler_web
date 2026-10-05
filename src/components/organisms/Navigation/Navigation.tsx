import Button from '@/components/atoms/Button/Button';
import Surface from '@/components/atoms/Surface/Surface';
import { ThemeSwitch } from '@/components/atoms/ThemeSwitch/ThemeSwitch';
import NavigationLinks from '@/components/molecules/NavigationLinks/NavigationLinks';
import MobileNavigation from '@/components/molecules/MobileNavigation/MobileNavigation';
import type { Section } from '@/types/sections';
import type { ButtonProps } from '@/types/ui';
import styles from './navigation.module.scss';

type NavigationProps = { logo: ButtonProps; linkList: readonly Section[] };

export default function Navigation({ logo, linkList }: NavigationProps) {
  return (
    <Surface as="nav" className={styles.navigation} aria-label="Main navigation">
      <Button {...logo} />
      <div className={styles.desktop}>
        <ThemeSwitch />
        <NavigationLinks links={linkList} />
      </div>
      <MobileNavigation links={linkList} />
    </Surface>
  );
}
