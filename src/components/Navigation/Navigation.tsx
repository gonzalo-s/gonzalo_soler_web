import Button from "../Button/Button";
import styles from "./navigation.module.scss";

function Navigation() {
  return (
    <nav className={styles.navigation}>
      <Button text="Gonzalo Soler" variant="primary" href="/" />
      <div className={styles.links}>
        <Button text="Projects" variant="primary" href="/" />
        <Button text="About Me" variant="primary" href="/" />
        <Button text="Reach Out!" variant="primary" href="/" />
      </div>
    </nav>
  );
}

export default Navigation;
