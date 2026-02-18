export const ROUTES = {
  HOME: "/",
  PRODUCTS: "/products",
  PRODUCT_DETAIL: "/products/:id",
  PRODUCT_CREATE: "/products/create",
  PRODUCT_EDIT: "/products/:id/edit",
  NOT_FOUND: "*",
} as const;

/* Хелперы для динамических путей */
export const buildProductDetailPath = (id: number) => `/products/${id}`;
export const buildProductEditPath = (id: number) => `/products/${id}/edit`;
