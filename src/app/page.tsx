import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>MAIN</main>
      <footer className={styles.footer}>FOOTER</footer>
    </div>
  );
}
