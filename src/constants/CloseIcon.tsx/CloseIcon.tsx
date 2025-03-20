import { FaSlash } from 'react-icons/fa';
import styles from './closeIcon.module.scss';

export default function CloseIcon() {
  return (
    <span className={styles.close_icon}>
      <FaSlash className={styles.slash} size="20px" />
      <FaSlash className={styles.slash_rotated} size="20px" />
    </span>
  );
}
