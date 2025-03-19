import { Sections } from '@/constants/sections';
import Button, { ButtonProps } from '../Button/Button';
import styles from './navigation.module.scss';

type NavigationProps = {
  logo: ButtonProps;
  linkList: Sections;
};

function Navigation(props: NavigationProps) {
  return (
    <nav className={styles.navigation}>
      <Button {...props.logo} />
      <div className={styles.links}>
        {props.linkList.map((listLink) => {
          return (
            <Button
              key={listLink.title}
              text={listLink.title}
              variant={listLink.buttonVariant}
              icon={listLink.icon}
              href={listLink.href}
            />
          );
        })}
      </div>
    </nav>
  );
}

export default Navigation;
