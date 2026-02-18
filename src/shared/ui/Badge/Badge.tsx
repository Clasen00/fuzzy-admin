import { cn } from "@/shared/lib";

import styles from "./Badge.module.css";

export type BadgeVariant = "primary" | "success" | "warning" | "danger" | "neutral";

export interface BadgeProps {
  children: React.ReactNode;
  variant?: BadgeVariant;
  className?: string;
}

export function Badge({ children, variant = "primary", className }: BadgeProps) {
  return <span className={cn(styles.badge, styles[variant], className)}>{children}</span>;
}
