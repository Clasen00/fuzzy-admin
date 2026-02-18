import { useNavigate } from "react-router-dom";

import { useAppSelector } from "@/app/hooks";

import { DeleteSelectedButton } from "@/features/product-delete";
import { ProductFilter } from "@/features/product-filter";
import { ProductSearch } from "@/features/product-search";

import { selectSelectedIds } from "@/entities/product";

import { PlusIcon } from "@/shared/assets/icons";
import { ROUTES } from "@/shared/config";
import { Button, Icon } from "@/shared/ui";

import styles from "./ProductToolbar.module.css";

interface ProductToolbarProps {
  onDeleted?: () => void;
}

export function ProductToolbar({ onDeleted }: ProductToolbarProps) {
  const navigate = useNavigate();
  const selectedIds = useAppSelector(selectSelectedIds);

  return (
    <div className={styles.toolbar}>
      <div className={styles.left}>
        <ProductSearch />
        <ProductFilter />
      </div>

      <div className={styles.right}>
        {selectedIds.length > 0 && <DeleteSelectedButton onDeleted={onDeleted} />}

        <Button
          variant="primary"
          size="md"
          leftIcon={<Icon svg={PlusIcon} size="sm" />}
          onClick={() => navigate(ROUTES.PRODUCT_CREATE)}
        >
          Добавить товар
        </Button>
      </div>
    </div>
  );
}
