import styles from "./TransitionButton.module.css";

export default function TransitionButton({btnRef, handleToggle, name1, name2}) {
  return (
    <div className={styles.formButton}>
      <div ref={btnRef} className={styles.btnTransition} />
      <button className={styles.button} onClick={handleToggle}>
        {name1}
      </button>
      <button className={styles.button} onClick={handleToggle}>
        {name2}
      </button>
    </div>
  );
}
