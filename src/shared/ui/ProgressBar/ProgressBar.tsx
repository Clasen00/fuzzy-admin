import styles from "./ProgressBar.module.css";

interface ProgressBarProps {
  loading: boolean;
}

export function ProgressBar({ loading }: ProgressBarProps) {
  if (!loading) return null;

  return (
    <div className={styles.wrapper}>
      <div className={styles.bar} />
    </div>
  );
}
