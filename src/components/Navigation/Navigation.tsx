import Button from "../Button/Button";
import styles from "./navigation.module.scss";

function Navigation() {
  return (
    <nav className={styles.navigation}>
      <Button text="Logo" variant="primary" />
    </nav>
  );
}

export default Navigation;
