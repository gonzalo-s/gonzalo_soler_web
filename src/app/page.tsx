import Navigation from "../components/Navigation/Navigation";
import styles from "./page.module.scss";

export default function Home() {
  return (
    <section className={styles["page-wrapper"]}>
      <div className={styles.content}>
        <Navigation />
        <main className={styles.main}>MAIN</main>
        <footer className={styles.footer}>FOOTER</footer>
      </div>
    </section>
  );
}
