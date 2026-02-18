import type { ReactNode } from "react";

import { formatPrice } from "@/shared/lib";
import { Checkbox } from "@/shared/ui";
import { TableRow, TableCell } from "@/shared/ui";

import type { Product } from "../../model/types";
import { ProductStatusBadge } from "../ProductStatusBadge/ProductStatusBadge";

import styles from "./ProductRow.module.css";

interface ProductRowProps {
  product: Product;
  selected: boolean;
  onSelect: (id: number) => void;
  actions?: ReactNode;
}

export function ProductRow({ product, selected, onSelect, actions }: ProductRowProps) {
  return (
    <TableRow selected={selected}>
      <TableCell>
        <Checkbox checked={selected} onChange={() => onSelect(product.id)} />
      </TableCell>

      <TableCell>
        <div className={styles.productInfo}>
          <img src={product.thumbnail} alt={product.title} className={styles.image} />
          <div>
            <div className={styles.name}>{product.title}</div>
            <div className={styles.meta}>
              {product.brand} · {product.category}
            </div>
          </div>
        </div>
      </TableCell>

      <TableCell>{formatPrice(product.price)}</TableCell>

      <TableCell>{product.stock}</TableCell>

      <TableCell>
        <ProductStatusBadge status={product.availabilityStatus} />
      </TableCell>

      <TableCell>{product.rating.toFixed(1)} ★</TableCell>

      {actions && <TableCell>{actions}</TableCell>}
    </TableRow>
  );
}
