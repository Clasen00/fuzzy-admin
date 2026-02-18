export {
  default as productReducer,
  fetchProducts,
  fetchCategories,
  deleteProduct,
  setSearch,
  setCategoryFilter,
  setSort,
  setPage,
  setPerPage,
  resetFilters,
  toggleSelected,
  selectAll,
  deselectAll,
} from "./productSlice";

export type { ProductState } from "./productSlice";

export {
  selectProducts,
  selectProductsTotal,
  selectProductsLoading,
  selectProductsError,
  selectProductFilters,
  selectSelectedIds,
  selectCategories,
  selectCategoriesLoading,
  selectTotalPages,
  selectIsAllSelected,
  selectIsSomeSelected,
} from "./selectors";

export type {
  Product,
  ProductDimensions,
  ProductReview,
  ProductMeta,
  AvailabilityStatus,
  ProductFilters,
  ProductSortField,
  ProductsResponse,
} from "./types";
