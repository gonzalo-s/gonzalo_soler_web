import StackIconLib from 'tech-stack-icons';
import styles from './stackIcon.module.scss';

type StackIconName = 'reactjs' | 'js' | 'nextjs2' | 'typescript' | 'html5' | 'css3' | 'sass' | 'jest';

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
      <StackIconLib
        name={props.stackIconName}
        style={{ width: sizeMap[props.size], height: sizeMap[props.size] }}
        grayscale={props?.grayscale}
      />{' '}
      {props.displayName}
    </span>
  );
}

export default StackIcon;
