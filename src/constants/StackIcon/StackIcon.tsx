import styles from './stackIcon.module.scss';
import StackIcon2 from './lib';

export type StackIconName =
  | 'reactjs'
  | 'js'
  | 'nextjs2'
  | 'typescript'
  | 'html5'
  | 'css3'
  | 'sass'
  | 'jest'
  | 'contentstack'
  | 'algolia'
  | 'commercetools'
  | 'tailwindcss'
  | 'ai'
  | 'github'
  | 'bitbucket'
  | 'vercel';

export type Size = 'small' | 'medium' | 'large';

export type StackIconProps = {
  stackIconName: StackIconName;
  displayName: string;
  size: Size;
  grayscale?: boolean;
};

const sizeMap = {
  small: '2rem',
  medium: '2rem',
  large: '3rem',
};

function StackIcon(props: StackIconProps) {
  return (
    <span className={styles['stack-icon']}>
      <StackIcon2
        name={props.stackIconName}
        style={{ width: sizeMap[props.size], height: sizeMap[props.size] }}
        grayscale={props?.grayscale}
      />{' '}
      {props.displayName}
    </span>
  );
}

export default StackIcon;
