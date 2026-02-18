import type { ReactNode } from "react";
import { useNavigate } from "react-router-dom";

import { buildProductDetailPath } from "@/shared/config";
import { Badge, Checkbox } from "@/shared/ui";
import { TableRow, TableCell } from "@/shared/ui";

import type { Product } from "../../model/types";

import styles from "./ProductRow.module.css";

interface ProductRowProps {
  product: Product;
  selected: boolean;
  onSelect: (id: number) => void;
  actions?: ReactNode;
}

export function ProductRow({ product, selected, onSelect, actions }: ProductRowProps) {
  const navigate = useNavigate();

  const statusBadge =
    product.stock > 0
      ? { label: "В наличии", variant: "success" as const }
      : { label: "Нет в наличии", variant: "danger" as const };

  const isLowRating = product.rating < 3;

  const handleRowClick = () => {
    navigate(buildProductDetailPath(product.id));
  };

  return (
    <TableRow selected={selected} onClick={handleRowClick} className={styles.row}>
      <TableCell onClick={(e) => e.stopPropagation()}>
        <Checkbox checked={selected} onChange={() => onSelect(product.id)} />
      </TableCell>

      <TableCell>
        <div className={styles.product}>
          <img className={styles.thumbnail} src={product.thumbnail} alt={product.title} />
          <div className={styles.info}>
            <span className={styles.title}>{product.title}</span>
            <span className={styles.brand}>{product.brand}</span>
          </div>
        </div>
      </TableCell>

      <TableCell>${product.price}</TableCell>

      <TableCell>{product.stock} шт.</TableCell>

      <TableCell>
        <Badge variant={statusBadge.variant}>{statusBadge.label}</Badge>
      </TableCell>

      <TableCell>
        <span className={isLowRating ? styles.ratingLow : styles.rating}>
          ⭐ {product.rating}
        </span>
      </TableCell>

      <TableCell onClick={(e) => e.stopPropagation()}>{actions}</TableCell>
    </TableRow>
  );
}
