import { lazy } from "react";
import { createBrowserRouter, Navigate } from "react-router-dom";

import { AppLayout } from "@/widgets/layout";

import { AuthGuard } from "@/features/auth-guard";

import { ROUTES } from "@/shared/config";

const LoginPage = lazy(() => import("@/pages/login"));
const ProductsPage = lazy(() => import("@/pages/products"));
const ProductDetailPage = lazy(() => import("@/pages/product-detail"));
const ProductCreatePage = lazy(() => import("@/pages/product-create"));
const ProductEditPage = lazy(() => import("@/pages/product-edit"));
const NotFoundPage = lazy(() => import("@/pages/not-found"));

export const router = createBrowserRouter([
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    element: <AuthGuard redirectTo="/login" />,
    children: [
      {
        element: <AppLayout />,
        children: [
          {
            path: ROUTES.HOME,
            element: <Navigate to={ROUTES.PRODUCTS} replace />,
          },
          {
            path: ROUTES.PRODUCTS,
            element: <ProductsPage />,
          },
          {
            path: ROUTES.PRODUCT_CREATE,
            element: <ProductCreatePage />,
          },
          {
            path: ROUTES.PRODUCT_DETAIL,
            element: <ProductDetailPage />,
          },
          {
            path: ROUTES.PRODUCT_EDIT,
            element: <ProductEditPage />,
          },
          {
            path: ROUTES.NOT_FOUND,
            element: <NotFoundPage />,
          },
        ],
      },
    ],
  },
]);
