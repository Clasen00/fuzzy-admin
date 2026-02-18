import type { ComponentType, SVGProps } from "react";

import { cn } from "@/shared/lib";

import styles from "./Icon.module.css";

export type IconSize = "sm" | "md" | "lg";

export interface IconProps {
  svg: ComponentType<SVGProps<SVGSVGElement>>;
  size?: IconSize;
  className?: string;
}

export function Icon({ svg: SvgComponent, size = "md", className }: IconProps) {
  return (
    <SvgComponent
      className={cn(styles.icon, styles[size], className)}
      aria-hidden="true"
    />
  );
}
