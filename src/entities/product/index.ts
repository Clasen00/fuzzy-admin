/*  Model  */
export {
  productReducer,
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
} from "./model";

export type {
  Product,
  ProductDimensions,
  ProductReview,
  ProductMeta,
  AvailabilityStatus,
  ProductFilters,
  ProductSortField,
  ProductsResponse,
  ProductState,
} from "./model";

/* API */
export { productApi } from "./api/productApi";
export type { CategoryListItem } from "./api/productApi";

/*  UI  */
export { ProductStatusBadge } from "./ui/ProductStatusBadge/ProductStatusBadge";
export { ProductRow } from "./ui/ProductRow/ProductRow";
