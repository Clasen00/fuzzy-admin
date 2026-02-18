import type { InputHTMLAttributes, ReactNode } from "react";

import { cn } from "@/shared/lib";

import styles from "./Input.module.css";

export type InputSize = "sm" | "md" | "lg";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  inputSize?: InputSize;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  error?: boolean;
}

export function Input({
  inputSize = "md",
  leftIcon,
  rightIcon,
  error = false,
  className,
  ...rest
}: InputProps) {
  return (
    <div
      className={cn(
        styles.wrapper,
        styles[inputSize],
        error && styles.error,
        rest.disabled && styles.disabled,
        className,
      )}
    >
      {leftIcon && <span className={styles.icon}>{leftIcon}</span>}
      <input className={styles.input} {...rest} />
      {rightIcon && <span className={styles.icon}>{rightIcon}</span>}
    </div>
  );
}
