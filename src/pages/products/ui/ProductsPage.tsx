import { useEffect } from "react";

import { useAppDispatch, useAppSelector } from "@/app/hooks";

import { ProductToolbar } from "@/widgets/product-toolbar";
import { ProductTable } from "@/widgets/products-table";

import { fetchProducts, selectProductFilters } from "@/entities/product";

import styles from "./ProductsPage.module.css";

function ProductsPage() {
  const dispatch = useAppDispatch();
  const filters = useAppSelector(selectProductFilters);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch, filters]);

  const handleDeleted = () => {
    dispatch(fetchProducts());
  };

  return (
    <div className={styles.page}>
      <h1 className={styles.title}>Товары</h1>
      <ProductToolbar onDeleted={handleDeleted} />
      <ProductTable onDeleted={handleDeleted} />
    </div>
  );
}

export default ProductsPage;
