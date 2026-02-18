import { Suspense, useEffect } from "react";
import { Provider } from "react-redux";
import { RouterProvider } from "react-router-dom";

import { checkAuth } from "@/entities/session";

import { Spinner } from "@/shared/ui";

import { router } from "./app/router";
import { store } from "./app/store";

import "./styles/global.css";

function AuthInitializer() {
  useEffect(() => {
    store.dispatch(checkAuth());
  }, []);
  return null;
}

export function App() {
  return (
    <Provider store={store}>
      <AuthInitializer />
      <Suspense fallback={<Spinner fullscreen />}>
        <RouterProvider router={router} />
      </Suspense>
    </Provider>
  );
}
