import { useEffect } from "react";

import { cn } from "@/shared/lib";

import styles from "./Toast.module.css";

export type ToastVariant = "success" | "error" | "info";

interface ToastProps {
  message: string;
  variant?: ToastVariant;
  visible: boolean;
  onClose: () => void;
  duration?: number;
}

export function Toast({
  message,
  variant = "info",
  visible,
  onClose,
  duration = 3000,
}: ToastProps) {
  useEffect(() => {
    if (!visible) return;
    const timer = setTimeout(onClose, duration);
    return () => clearTimeout(timer);
  }, [visible, duration, onClose]);

  if (!visible) return null;

  return (
    <div className={cn(styles.toast, styles[variant])}>
      <span className={styles.message}>{message}</span>
      <button className={styles.close} onClick={onClose} aria-label="Закрыть">
        ×
      </button>
    </div>
  );
}
