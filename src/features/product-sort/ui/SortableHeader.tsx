import { useAppDispatch, useAppSelector } from "@/app/hooks";

import type { ProductSortField } from "@/entities/product";
import { setSort, selectProductFilters } from "@/entities/product";

import { ChevronLeftIcon } from "@/shared/assets/icons";
import { cn } from "@/shared/lib";
import { Icon } from "@/shared/ui";

import styles from "./SortableHeader.module.css";

interface SortableHeaderProps {
  field: ProductSortField;
  children: React.ReactNode;
}

export function SortableHeader({ field, children }: SortableHeaderProps) {
  const dispatch = useAppDispatch();
  const { sortBy, sortOrder } = useAppSelector(selectProductFilters);

  const isActive = sortBy === field;

  const handleClick = () => {
    if (isActive) {
      dispatch(
        setSort({
          sortBy: field,
          sortOrder: sortOrder === "asc" ? "desc" : "asc",
        }),
      );
    } else {
      dispatch(setSort({ sortBy: field, sortOrder: "asc" }));
    }
  };

  return (
    <button className={styles.header} onClick={handleClick} type="button">
      <span>{children}</span>
      <span
        className={cn(
          styles.icon,
          isActive && styles.active,
          isActive && sortOrder === "asc" && styles.asc,
        )}
      >
        <Icon svg={ChevronLeftIcon} className={styles.iconDown} size="sm" />
      </span>
    </button>
  );
}
