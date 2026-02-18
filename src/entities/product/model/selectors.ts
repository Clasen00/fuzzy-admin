import type { ProductState } from "./productSlice";

interface RootState {
  products: ProductState;
}

export const selectProducts = (state: RootState) => state.products.items;
export const selectProductsTotal = (state: RootState) => state.products.total;
export const selectProductsLoading = (state: RootState) => state.products.loading;
export const selectProductsError = (state: RootState) => state.products.error;
export const selectProductFilters = (state: RootState) => state.products.filters;
export const selectSelectedIds = (state: RootState) => state.products.selectedIds;
export const selectCategories = (state: RootState) => state.products.categories;
export const selectCategoriesLoading = (state: RootState) =>
  state.products.categoriesLoading;

export const selectTotalPages = (state: RootState) => {
  const { total, filters } = state.products;
  return Math.ceil(total / filters.perPage);
};

export const selectIsAllSelected = (state: RootState) => {
  const { items, selectedIds } = state.products;
  return items.length > 0 && selectedIds.length === items.length;
};

export const selectIsSomeSelected = (state: RootState) => {
  const { items, selectedIds } = state.products;
  return selectedIds.length > 0 && selectedIds.length < items.length;
};
