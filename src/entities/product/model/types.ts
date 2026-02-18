/*  Product  */
export interface Product {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  tags: string[];
  brand: string;
  sku: string;
  weight: number;
  dimensions: ProductDimensions;
  warrantyInformation: string;
  shippingInformation: string;
  availabilityStatus: AvailabilityStatus;
  reviews: ProductReview[];
  returnPolicy: string;
  minimumOrderQuantity: number;
  meta: ProductMeta;
  thumbnail: string;
  images: string[];
}

export interface ProductDimensions {
  width: number;
  height: number;
  depth: number;
}

export interface ProductReview {
  rating: number;
  comment: string;
  date: string;
  reviewerName: string;
  reviewerEmail: string;
}

export interface ProductMeta {
  createdAt: string;
  updatedAt: string;
  barcode: string;
  qrCode: string;
}

export type AvailabilityStatus = "In Stock" | "Low Stock" | "Out of Stock";

/*  API response  */
export interface ProductsResponse {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
}

/* Filters (внутренние, для нашего UI)  */
export interface ProductFilters {
  search: string;
  category: string;
  sortBy: ProductSortField;
  sortOrder: "asc" | "desc";
  page: number;
  perPage: number;
}

export type ProductSortField = "title" | "price" | "rating" | "stock";
