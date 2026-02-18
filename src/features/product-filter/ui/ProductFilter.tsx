import { useEffect } from "react";

import { useAppDispatch, useAppSelector } from "@/app/hooks";

import {
  fetchCategories,
  setCategoryFilter,
  selectProductFilters,
  selectCategories,
  selectCategoriesLoading,
} from "@/entities/product";

import styles from "./ProductFilter.module.css";

export function ProductFilter() {
  const dispatch = useAppDispatch();
  const { category } = useAppSelector(selectProductFilters);
  const categories = useAppSelector(selectCategories);
  const loading = useAppSelector(selectCategoriesLoading);

  useEffect(() => {
    if (categories.length === 0) {
      dispatch(fetchCategories());
    }
  }, [dispatch, categories.length]);

  return (
    <select
      className={styles.select}
      value={category}
      onChange={(e) => dispatch(setCategoryFilter(e.target.value))}
      disabled={loading}
    >
      <option value="">Все категории</option>
      {categories.map((cat) => (
        <option key={cat.slug} value={cat.slug}>
          {cat.name}
        </option>
      ))}
    </select>
  );
}
