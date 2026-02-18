import { useAppDispatch, useAppSelector } from "@/app/hooks";

import { DeleteProductButton } from "@/features/product-delete";
import { SortableHeader } from "@/features/product-sort";

import { ProductRow } from "@/entities/product";
import {
  selectProducts,
  selectProductsLoading,
  selectProductsError,
  selectSelectedIds,
  selectIsAllSelected,
  selectIsSomeSelected,
  selectTotalPages,
  selectProductFilters,
  toggleSelected,
  selectAll,
  deselectAll,
  setPage,
} from "@/entities/product";

import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableHeadCell,
  Checkbox,
  Pagination,
} from "@/shared/ui";

import styles from "./ProductTable.module.css";

interface ProductTableProps {
  onDeleted?: () => void;
}

export function ProductTable({ onDeleted }: ProductTableProps) {
  const dispatch = useAppDispatch();

  const products = useAppSelector(selectProducts);
  const loading = useAppSelector(selectProductsLoading);
  const error = useAppSelector(selectProductsError);
  const selectedIds = useAppSelector(selectSelectedIds);
  const isAllSelected = useAppSelector(selectIsAllSelected);
  const isSomeSelected = useAppSelector(selectIsSomeSelected);
  const totalPages = useAppSelector(selectTotalPages);
  const { page } = useAppSelector(selectProductFilters);

  const handleSelectAll = () => {
    if (isAllSelected || isSomeSelected) {
      dispatch(deselectAll());
    } else {
      dispatch(selectAll());
    }
  };

  const handleSelect = (id: number) => {
    dispatch(toggleSelected(id));
  };

  const handlePageChange = (newPage: number) => {
    dispatch(setPage(newPage));
  };

  if (loading) {
    return <div className={styles.state}>Загрузка товаров…</div>;
  }

  if (error) {
    return <div className={styles.stateError}>Ошибка: {error}</div>;
  }

  if (products.length === 0) {
    return <div className={styles.state}>Товары не найдены</div>;
  }

  return (
    <div className={styles.wrapper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableHeadCell style={{ width: 44 }}>
              <Checkbox
                checked={isAllSelected}
                indeterminate={isSomeSelected}
                onChange={handleSelectAll}
              />
            </TableHeadCell>

            <TableHeadCell>
              <SortableHeader field="title">Товар</SortableHeader>
            </TableHeadCell>

            <TableHeadCell>
              <SortableHeader field="price">Цена</SortableHeader>
            </TableHeadCell>

            <TableHeadCell>
              <SortableHeader field="stock">Остаток</SortableHeader>
            </TableHeadCell>

            <TableHeadCell>Статус</TableHeadCell>

            <TableHeadCell>
              <SortableHeader field="rating">Рейтинг</SortableHeader>
            </TableHeadCell>

            <TableHeadCell style={{ width: 48 }} />
          </TableRow>
        </TableHead>

        <TableBody>
          {products.map((product) => (
            <ProductRow
              key={product.id}
              product={product}
              selected={selectedIds.includes(product.id)}
              onSelect={handleSelect}
              actions={
                <DeleteProductButton
                  productId={product.id}
                  productTitle={product.title}
                  onDeleted={onDeleted}
                />
              }
            />
          ))}
        </TableBody>
      </Table>

      <div className={styles.footer}>
        <span className={styles.info}>
          Выбрано: {selectedIds.length} из {products.length}
        </span>

        <Pagination
          currentPage={page}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
}
