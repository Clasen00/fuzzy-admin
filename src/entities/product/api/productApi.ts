import { baseApi } from "@/shared/api";

import type { ProductFilters, ProductsResponse, Product } from "../model/types";

function filtersToParams(filters: ProductFilters) {
  const skip = (filters.page - 1) * filters.perPage;
  return {
    limit: filters.perPage,
    skip,
    sortBy: filters.sortBy,
    order: filters.sortOrder,
  };
}

export const productApi = {
  getAll: async (filters: ProductFilters): Promise<ProductsResponse> => {
    const params = filtersToParams(filters);

    /* Поиск */
    if (filters.search) {
      const { data } = await baseApi.get<ProductsResponse>("/products/search", {
        params: { q: filters.search, ...params },
      });
      return data;
    }

    /* По категории */
    if (filters.category) {
      const { data } = await baseApi.get<ProductsResponse>(
        `/products/category/${encodeURIComponent(filters.category)}`,
        { params },
      );
      return data;
    }

    /* Все товары */
    const { data } = await baseApi.get<ProductsResponse>("/products", {
      params,
    });
    return data;
  },

  getById: async (id: number): Promise<Product> => {
    const { data } = await baseApi.get<Product>(`/products/${id}`);
    return data;
  },

  create: async (product: Omit<Product, "id" | "meta" | "reviews">): Promise<Product> => {
    const { data } = await baseApi.post<Product>("/products/add", product);
    return data;
  },

  update: async (
    id: number,
    product: Partial<Omit<Product, "id" | "meta" | "reviews">>,
  ): Promise<Product> => {
    const { data } = await baseApi.put<Product>(`/products/${id}`, product);
    return data;
  },

  delete: async (id: number): Promise<Product> => {
    const { data } = await baseApi.delete<Product>(`/products/${id}`);
    return data;
  },

  getCategories: async (): Promise<CategoryListItem[]> => {
    const { data } = await baseApi.get<CategoryListItem[]>("/products/categories");
    return data;
  },
};

/* DummyJSON возвращает массив объектов { slug, name, url } */
export interface CategoryListItem {
  slug: string;
  name: string;
  url: string;
}
