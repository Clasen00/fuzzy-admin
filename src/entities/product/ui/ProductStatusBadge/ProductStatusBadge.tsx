import { Badge } from "@/shared/ui";
import type { BadgeVariant } from "@/shared/ui";

import type { AvailabilityStatus } from "../../model/types";

const STATUS_MAP: Record<AvailabilityStatus, { label: string; variant: BadgeVariant }> = {
  "In Stock": { label: "В наличии", variant: "success" },
  "Low Stock": { label: "Мало", variant: "warning" },
  "Out of Stock": { label: "Нет в наличии", variant: "danger" },
};

interface ProductStatusBadgeProps {
  status: AvailabilityStatus;
  className?: string;
}

export function ProductStatusBadge({ status, className }: ProductStatusBadgeProps) {
  const { label, variant } = STATUS_MAP[status];

  return (
    <Badge variant={variant} className={className}>
      {label}
    </Badge>
  );
}
