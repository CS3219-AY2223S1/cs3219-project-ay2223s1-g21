import styles from "./page.module.css";

export default function Page(props) {
  return (
    <div className={styles.pageContainer}>
      <div className={styles.contentContainer}>{props.children}</div>
    </div>
  );
}
