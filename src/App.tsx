import { Suspense } from "react";
import { Provider } from "react-redux";
import { RouterProvider } from "react-router-dom";

import { Spinner } from "@/shared/ui";

import { router } from "./app/router";
import { store } from "./app/store";
import "@/app/styles/global.css";

export function App() {
  return (
    <Provider store={store}>
      <Suspense fallback={<Spinner fullscreen />}>
        <RouterProvider router={router} />
      </Suspense>
    </Provider>
  );
}
