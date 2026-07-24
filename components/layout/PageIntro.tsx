import styles from "./PageIntro.module.css";

export function PageIntro({ title, index }: { title: string; index: string }) {
  return (
    <header className={styles.intro}>
      <p>[ badretd ] / {index}</p>
      <h1>{title}</h1>
      <span aria-hidden="true" />
    </header>
  );
}
