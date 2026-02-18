import type { PayloadAction } from "@reduxjs/toolkit";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { productApi } from "../api/productApi";
import type { CategoryListItem } from "../api/productApi";

import type { Product, ProductFilters, ProductsResponse } from "./types";

/* State */
export interface ProductState {
  items: Product[];
  total: number;
  loading: boolean;
  error: string | null;
  selectedIds: number[];
  filters: ProductFilters;
  categories: CategoryListItem[];
  categoriesLoading: boolean;
}

const initialFilters: ProductFilters = {
  search: "",
  category: "",
  sortBy: "title",
  sortOrder: "asc",
  page: 1,
  perPage: 10,
};

const initialState: ProductState = {
  items: [],
  total: 0,
  loading: false,
  error: null,
  selectedIds: [],
  filters: initialFilters,
  categories: [],
  categoriesLoading: false,
};

/* Async thunks */
export const fetchProducts = createAsyncThunk<
  ProductsResponse,
  void,
  { state: { products: ProductState } }
>("products/fetchProducts", async (_, { getState }) => {
  const { filters } = getState().products;
  return productApi.getAll(filters);
});

export const fetchCategories = createAsyncThunk<CategoryListItem[]>(
  "products/fetchCategories",
  async () => {
    return productApi.getCategories();
  },
);

export const deleteProduct = createAsyncThunk<number, number>(
  "products/deleteProduct",
  async (id) => {
    await productApi.delete(id);
    return id;
  },
);

/* Slice */
const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    /* Filters */
    setSearch(state, action: PayloadAction<string>) {
      state.filters.search = action.payload;
      state.filters.page = 1;
    },

    setCategoryFilter(state, action: PayloadAction<string>) {
      state.filters.category = action.payload;
      state.filters.page = 1;
    },

    setSort(
      state,
      action: PayloadAction<{
        sortBy: ProductFilters["sortBy"];
        sortOrder: ProductFilters["sortOrder"];
      }>,
    ) {
      state.filters.sortBy = action.payload.sortBy;
      state.filters.sortOrder = action.payload.sortOrder;
      state.filters.page = 1;
    },

    setPage(state, action: PayloadAction<number>) {
      state.filters.page = action.payload;
    },

    setPerPage(state, action: PayloadAction<number>) {
      state.filters.perPage = action.payload;
      state.filters.page = 1;
    },

    resetFilters(state) {
      state.filters = initialFilters;
    },

    /* Selection */
    toggleSelected(state, action: PayloadAction<number>) {
      const id = action.payload;
      const index = state.selectedIds.indexOf(id);
      if (index === -1) {
        state.selectedIds.push(id);
      } else {
        state.selectedIds.splice(index, 1);
      }
    },

    selectAll(state) {
      state.selectedIds = state.items.map((item) => item.id);
    },

    deselectAll(state) {
      state.selectedIds = [];
    },
  },

  extraReducers: (builder) => {
    builder
      /* fetchProducts  */
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload.products;
        state.total = action.payload.total;
        state.selectedIds = [];
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? "Ошибка загрузки товаров";
      })

      /* fetchCategories */
      .addCase(fetchCategories.pending, (state) => {
        state.categoriesLoading = true;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.categoriesLoading = false;
        state.categories = action.payload;
      })
      .addCase(fetchCategories.rejected, (state) => {
        state.categoriesLoading = false;
      })

      /* deleteProduct */
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.items = state.items.filter((item) => item.id !== action.payload);
        state.selectedIds = state.selectedIds.filter((id) => id !== action.payload);
        state.total -= 1;
      });
  },
});

export const {
  setSearch,
  setCategoryFilter,
  setSort,
  setPage,
  setPerPage,
  resetFilters,
  toggleSelected,
  selectAll,
  deselectAll,
} = productSlice.actions;

export default productSlice.reducer;
