import type { InputHTMLAttributes } from "react";

import { cn } from "@/shared/lib";

import styles from "./Checkbox.module.css";

export interface CheckboxProps extends Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "type"
> {
  indeterminate?: boolean;
  label?: string;
}

export function Checkbox({
  indeterminate = false,
  label,
  className,
  checked,
  ...rest
}: CheckboxProps) {
  return (
    <label className={cn(styles.wrapper, className)}>
      <span
        className={cn(
          styles.box,
          checked && styles.checked,
          indeterminate && styles.indeterminate,
        )}
      >
        <input
          type="checkbox"
          className={styles.input}
          checked={checked}
          ref={(el) => {
            if (el) el.indeterminate = indeterminate;
          }}
          {...rest}
        />

        {indeterminate ? (
          <svg className={styles.icon} viewBox="0 0 16 16" aria-hidden="true">
            <line
              x1="4"
              y1="8"
              x2="12"
              y2="8"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        ) : checked ? (
          <svg className={styles.icon} viewBox="0 0 16 16" aria-hidden="true">
            <polyline
              points="3.5 8 6.5 11 12.5 5"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        ) : null}
      </span>

      {label && <span className={styles.label}>{label}</span>}
    </label>
  );
}
