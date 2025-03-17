import Navigation from "../components/Navigation/Navigation";
import styles from "./page.module.scss";

export default function Home() {
  return (
    <div className={styles.page}>
      <Navigation />
      <main className={styles.main}>MAIN</main>
      <footer className={styles.footer}>FOOTER</footer>
    </div>
  );
}
