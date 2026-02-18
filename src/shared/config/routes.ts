export const ROUTES = {
  HOME: "/",
  PRODUCTS: "/products",
  PRODUCT_CREATE: "/products/create",
  PRODUCT_EDIT: (id: string | number) => `/products/${id}/edit`,
} as const;
