import { useEffect, useState } from "react";

import { useAppDispatch, useAppSelector } from "@/app/hooks";

import { setSearch, selectProductFilters } from "@/entities/product";

import { SearchIcon } from "@/shared/assets/icons";
import { Input, Icon } from "@/shared/ui";

import styles from "./ProductSearch.module.css";

export function ProductSearch() {
  const dispatch = useAppDispatch();
  const { search } = useAppSelector(selectProductFilters);
  const [value, setValue] = useState(search);

  /* Debounce 400ms */
  useEffect(() => {
    const timer = setTimeout(() => {
      if (value !== search) {
        dispatch(setSearch(value));
      }
    }, 400);

    return () => clearTimeout(timer);
  }, [value, search, dispatch]);

  /* Sync external reset */
  useEffect(() => {
    setValue(search);
  }, [search]);

  return (
    <Input
      className={styles.search}
      inputSize="md"
      placeholder="Поиск товаров…"
      leftIcon={<Icon svg={SearchIcon} size="sm" />}
      value={value}
      onChange={(e) => setValue(e.target.value)}
    />
  );
}
