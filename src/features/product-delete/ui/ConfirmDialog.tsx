import { useEffect, useRef } from "react";

import { Button } from "@/shared/ui";

import styles from "./ConfirmDialog.module.css";

interface ConfirmDialogProps {
  title: string;
  description: string;
  confirmLabel: string;
  loading?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export function ConfirmDialog({
  title,
  description,
  confirmLabel,
  loading = false,
  onConfirm,
  onCancel,
}: ConfirmDialogProps) {
  const overlayRef = useRef<HTMLDivElement>(null);

  /* Close on Escape */
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onCancel();
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onCancel]);

  /* Close on overlay click */
  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === overlayRef.current) onCancel();
  };

  return (
    <div
      className={styles.overlay}
      ref={overlayRef}
      onClick={handleOverlayClick}
      role="dialog"
      aria-modal="true"
    >
      <div className={styles.dialog}>
        <h2 className={styles.title}>{title}</h2>
        <p className={styles.description}>{description}</p>

        <div className={styles.actions}>
          <Button variant="secondary" onClick={onCancel} disabled={loading}>
            Отмена
          </Button>
          <Button variant="danger" onClick={onConfirm} disabled={loading}>
            {loading ? "Удаление…" : confirmLabel}
          </Button>
        </div>
      </div>
    </div>
  );
}
