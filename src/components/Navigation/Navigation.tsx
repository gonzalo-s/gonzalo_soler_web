import Button from "../Button/Button";
import styles from "./navigation.module.scss";

function Navigation() {
  return (
    <nav className={styles.navigation}>
       <Button text="Gonzalo Soler" variant="primary" href={{ internal: "/" }} /> 
      <div className={styles.links}>
        <Button text="Projects" variant="primary" href={{ internal: "/" }} />
        <Button text="About Me" variant="secondary" href={{ internal: "/" }} /> 
        <Button text="Reach Out!" variant="secondary" 
        
         href={{ internal: "/" }} 
         />
      </div>
    </nav>
  );
}

export default Navigation;
