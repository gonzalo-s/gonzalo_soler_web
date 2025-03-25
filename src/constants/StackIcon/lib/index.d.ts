import { FC, CSSProperties } from 'react';
import iconsData from '../icons.json';
type MyType = (typeof iconsData)[number]['name'];
interface StackIconProps {
  name: MyType;
  className?: string;
  style?: CSSProperties;
  grayscale?: boolean;
}
declare const StackIcon2: FC<StackIconProps>;
export default StackIcon2;
