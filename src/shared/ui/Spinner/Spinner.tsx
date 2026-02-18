import { cn } from "@/shared/lib";

import styles from "./Spinner.module.css";

interface SpinnerProps {
  /** Размер спиннера */
  size?: "sm" | "md" | "lg";
  /** Растянуть на весь экран с оверлеем */
  fullscreen?: boolean;
  /** Дополнительный класс */
  className?: string;
}

export function Spinner({ size = "md", fullscreen = false, className }: SpinnerProps) {
  const spinner = (
    <div
      className={cn(styles.spinner, styles[size], className)}
      role="status"
      aria-label="Загрузка"
    >
      <svg className={styles.svg} viewBox="0 0 50 50" xmlns="http://www.w3.org/2000/svg">
        <circle
          className={styles.circle}
          cx="25"
          cy="25"
          r="20"
          fill="none"
          strokeWidth="4"
        />
      </svg>
    </div>
  );

  if (fullscreen) {
    return <div className={styles.fullscreen}>{spinner}</div>;
  }

  return spinner;
}
