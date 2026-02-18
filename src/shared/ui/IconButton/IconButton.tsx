import type { ButtonHTMLAttributes, ReactNode } from "react";

import { cn } from "@/shared/lib";

import styles from "./IconButton.module.css";

export type IconButtonSize = "sm" | "md" | "lg";
export type IconButtonVariant = "ghost" | "secondary" | "danger";

export interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon: ReactNode;
  size?: IconButtonSize;
  variant?: IconButtonVariant;
  label: string;
}

export function IconButton({
  icon,
  size = "md",
  variant = "ghost",
  label,
  className,
  ...rest
}: IconButtonProps) {
  return (
    <button
      className={cn(styles.iconButton, styles[size], styles[variant], className)}
      aria-label={label}
      title={label}
      {...rest}
    >
      {icon}
    </button>
  );
}
